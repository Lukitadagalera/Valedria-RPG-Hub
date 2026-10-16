require('dotenv').config({ path: require('node:path').resolve(__dirname, '.env'), quiet: true })
const path = require('node:path')
const fs = require('node:fs')
const { createHmac } = require('node:crypto')
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const { MongoStore } = require('connect-mongo')
const passport = require('passport')
const connectDatabase = require('./config/database')
const configurePassport = require('./config/passport')

if (!(process.env.MONGO_URI || process.env.MONGODB_URI) || !process.env.GOOGLE_CLIENT_ID) {
  throw Error('MONGO_URI (or MONGODB_URI) and GOOGLE_CLIENT_ID are required in .env')
}

const app = express()
app.set('trust proxy', process.env.TRUST_PROXY === 'true' ? 1 : false)
app.use('/api/fichas', express.json({ limit: '8mb' }))
app.use(express.json({ limit: '8kb' }))
const passportStrategyEnabled = configurePassport(passport)
const isDev = process.argv.includes('--dev')
const staticRoot = __dirname
const reloadClients = new Set()

if (isDev) {
  app.get('/__dev/events', (req, res) => {
    res.set({
      'Cache-Control': 'no-cache',
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
    })
    res.flushHeaders()
    res.write('retry: 1000\n\n')
    reloadClients.add(res)
    req.on('close', () => reloadClients.delete(res))
  })

  app.use((req, res, next) => {
    if (req.method !== 'GET') return next()

    let file
    try {
      const pathname = decodeURIComponent(req.path)
      const htmlPath = pathname === '/' ? '/index.html' : pathname
      if (!/\.html$/i.test(htmlPath)) return next()
      file = path.resolve(staticRoot, `.${htmlPath}`)
    } catch (error) {
      return next(error)
    }

    if (!file.startsWith(staticRoot + path.sep)) return next()

    fs.readFile(file, 'utf8', (error, html) => {
      if (error) return next(error)

      const reloadScript =
        '<script>new EventSource("/__dev/events").onmessage=()=>location.reload()</script>'
      const bodyClose = /<\/body\s*>/i
      res.set('Cache-Control', 'no-store')
      res.type('html').send(
        bodyClose.test(html) ? html.replace(bodyClose, `${reloadScript}</body>`) : `${html}${reloadScript}`,
      )
    })
  })

  process.on('message', (message) => {
    if (message?.type !== 'reload') return
    for (const client of reloadClients) client.write('data: reload\n\n')
  })
}

const port = Number(process.env.PORT || 3000)
connectDatabase()
  .then(() => {
    let sessionSecret = process.env.SESSION_SECRET
    if (!sessionSecret && process.env.GOOGLE_CLIENT_SECRET) {
      sessionSecret = createHmac('sha256', process.env.GOOGLE_CLIENT_SECRET)
        .update('valedria-express-session-v1')
        .digest('hex')
      console.warn('SESSION_SECRET is not set; set a dedicated secret for production sessions.')
    }
    const sessionsEnabled = Boolean(sessionSecret && passportStrategyEnabled)
    if (sessionSecret) {
      app.set('trust proxy', process.env.TRUST_PROXY === 'true' ? 1 : false)
      app.use(
        session({
          name: 'valedria.sid',
          secret: sessionSecret,
          resave: false,
          saveUninitialized: false,
          store: MongoStore.create({
            client: mongoose.connection.getClient(),
            collectionName: 'sessions',
            ttl: 7 * 24 * 60 * 60,
          }),
          cookie: {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60 * 1000,
          },
        }),
      )
    }
    app.use(passport.initialize())
    if (sessionsEnabled) app.use(passport.session())
    app.locals.passportEnabled = sessionsEnabled
    app.use('/', require('./routes/index'))
    app.use((req, res, next) => {
      if (!['GET', 'HEAD'].includes(req.method)) return next()

      let pathname
      try {
        pathname = decodeURIComponent(req.path)
      } catch (error) {
        return next(error)
      }

      if (
        pathname === '/' ||
        /^\/[^/]+\.(?:html|css|js|ico)$/i.test(pathname) ||
        pathname.startsWith('/assets/')
      ) {
        return next()
      }
      return res.sendStatus(404)
    })
    app.use(express.static(staticRoot))

    app.listen(port, 'localhost', () => {
      console.log(`Valedria server listening on http://localhost:${port}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message)
    process.exitCode = 1
  })
