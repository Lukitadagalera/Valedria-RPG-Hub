// Private API. Run behind HTTPS; never run on GitHub Pages.
require('dotenv').config({ path: require('node:path').resolve(__dirname, '../.env'), quiet: true })
const http = require('node:http')
const path = require('node:path')
const { isIP } = require('node:net')
const express = require('express')
const mongoose = require('mongoose')
const { createModels } = require('../models')
const { createPrivateRouter } = require('../routes')

const repository = path.resolve(__dirname, '..')

function outsideRepository(file) {
  const relative = path.relative(repository, path.resolve(file))
  if (!relative.startsWith('..' + path.sep) && !path.isAbsolute(relative)) {
    throw Error('Private files must live outside the public repository.')
  }
}

function createServer(config) {
  const origin = new URL(config.origin)
  if (origin.protocol !== 'https:' && !['127.0.0.1', 'localhost'].includes(origin.hostname)) {
    throw Error('HTTPS site origin required.')
  }
  if (!config.mongoUri) throw Error('MongoDB connection URI required.')
  outsideRepository(config.libraryPath)
  if (config.contentDir) outsideRepository(config.contentDir)

  const connection = mongoose.createConnection(config.mongoUri, {
    serverSelectionTimeoutMS: 10000,
  })
  const models = createModels(connection)
  const ready = connection
    .asPromise()
    .then(() => Promise.all(Object.values(models).map((model) => model.init())))
  const limits = new Map()
  const app = express()

  function rate(key, max, window = 900000) {
    const now = Date.now()
    if (limits.size > 10000) {
      for (const [entry, value] of limits) if (value.until < now) limits.delete(entry)
    }
    let limit = limits.get(key)
    if (!limit || limit.until < now) {
      limit = { count: 0, until: now + window }
      limits.set(key, limit)
    }
    if (++limit.count > max) throw Object.assign(Error(), { status: 429 })
  }

  function reply(res, status, data) {
    res.status(status).json(data)
  }

  app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store')
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('Referrer-Policy', 'no-referrer')
    ready.then(() => next(), next)
  })

  app.use((req, res, next) => {
    try {
      const url = new URL(req.originalUrl, 'http://localhost')
      if (!url.pathname.startsWith('/api/')) return next()
      if (req.headers.origin && req.headers.origin !== origin.origin) {
        throw Object.assign(Error(), { status: 403 })
      }
      if (req.headers['sec-fetch-site'] === 'cross-site') {
        throw Object.assign(Error(), { status: 403 })
      }
      const forwarded = req.headers['x-forwarded-for']
      const ip =
        config.trustProxy && typeof forwarded === 'string' && isIP(forwarded)
          ? forwarded
          : req.socket.remoteAddress
      rate('all:' + ip, 2000, 60000)
      if (req.method === 'POST' && req.headers.origin !== origin.origin) {
        throw Object.assign(Error(), { status: 403 })
      }
      if (req.method === 'POST' && !req.headers['content-type']?.startsWith('application/json')) {
        throw Object.assign(Error(), { status: 415 })
      }
      return next()
    } catch (error) {
      return next(error)
    }
  })

  app.use((req, res, next) => {
    if (req.method !== 'POST' || !req.url.startsWith('/api/')) return next()
    const limit = req.url.startsWith('/api/studio/') ? 1500000 : 8192
    return express.json({ limit })(req, res, next)
  })

  app.use(createPrivateRouter({ models, config }))
  app.use((error, req, res, next) => {
    if (res.headersSent) return next(error)
    reply(res, error.status || 503, {
      error: error.status === 429 ? 'rate_limited' : 'request_failed',
    })
  })

  const server = http.createServer(app)
  server.ready = ready
  server.mongo = connection
  server.models = models
  server.on('close', () => {
    void connection.close()
  })
  return server
}

if (require.main === module) {
  const required = ['MASTER_ORIGIN', 'MONGODB_URI', 'MASTER_LIBRARY']
  for (const key of required) if (!process.env[key]) throw Error('Missing ' + key + ' in .env')
  const server = createServer({
    origin: process.env.MASTER_ORIGIN,
    mongoUri: process.env.MONGODB_URI,
    libraryPath: process.env.MASTER_LIBRARY,
    publicDir: path.join(repository, 'dist'),
    contentDir: process.env.MASTER_CONTENT,
    trustProxy: process.env.MASTER_TRUST_PROXY === 'true',
  })
  server.ready
    .then(() =>
      server.listen(Number(process.env.PORT || 4180), '127.0.0.1', () =>
        console.log('Master service ready on loopback; HTTPS reverse proxy required.'),
      ),
    )
    .catch((error) => {
      console.error('MongoDB connection failed:', error.message)
      process.exitCode = 1
    })
}

module.exports = { createServer }
