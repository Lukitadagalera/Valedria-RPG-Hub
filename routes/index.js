const express = require('express')
const passport = require('passport')
const authController = require('../controllers/authController')
const accountController = require('../controllers/accountController')
const contentController = require('../controllers/contentController')
const fichaController = require('../controllers/fichaController')
const studioController = require('../controllers/studioController')
const fs = require('node:fs')
const path = require('node:path')

const router = express.Router()

function passportRequired(req, res, next) {
  if (!req.app.locals.passportEnabled) {
    return res.status(503).json({ error: 'Google web authentication is not configured.' })
  }
  return next()
}

function requireLogin(req, res, next) {
  if (!req.isAuthenticated?.()) {
    return res.status(401).json({ success: false, message: 'Não logado' })
  }
  return next()
}

function requireSameOrigin(req, res, next) {
  const origin = req.get('origin')
  if (!origin) return res.status(403).json({ error: 'Origin required.' })
  try {
    const expectedProtocol =
      req.protocol === 'https' || req.get('x-forwarded-proto') === 'https' ? 'https:' : 'http:'
    const parsedOrigin = new URL(origin)
    if (parsedOrigin.host !== req.get('host') || parsedOrigin.protocol !== expectedProtocol) {
      return res.status(403).json({ error: 'Cross-origin request rejected.' })
    }
  } catch {
    return res.status(403).json({ error: 'Invalid origin.' })
  }
  return next()
}

router.get('/api/auth/config', authController.getGoogleConfig)
router.post('/api/auth/google', authController.authenticateGoogle)
router.get('/api/session', authController.getSession)

router.get(
  '/auth/google',
  passportRequired,
  passport.authenticate('google', { scope: ['profile', 'email'] }),
)
router.get(
  '/auth/google/callback',
  passportRequired,
  passport.authenticate('google', { failureRedirect: '/login.html?login=failed' }),
  (req, res) => res.redirect('/conta.html'),
)
router.get('/auth/status', authController.loginSucesso)
router.get('/auth/logout', authController.logout)

router.get('/api/fichas', requireLogin, fichaController.listarFichasDoJogador)
router.post('/api/fichas', requireLogin, requireSameOrigin, fichaController.criarFicha)
router.get('/api/fichas/:id', requireLogin, fichaController.obterFicha)
router.put('/api/fichas/:id', requireLogin, requireSameOrigin, fichaController.atualizarFicha)
router.delete('/api/fichas/:id', requireLogin, requireSameOrigin, fichaController.excluirFicha)

function createPrivateRouter({ models, config }) {
  const privateRouter = express.Router()
  const reply = (res, status, data) => res.status(status).json(data)
  const mime = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.woff2': 'font/woff2',
  }

  privateRouter.use(async (req, res, next) => {
    try {
      const url = new URL(req.originalUrl, 'http://localhost')
      if (!url.pathname.startsWith('/api/')) {
        if (
          await contentController.serve({
            req,
            res,
            url,
            config,
            models,
            user: null,
          })
        ) {
          return
        }
        if (!['GET', 'HEAD'].includes(req.method)) return res.sendStatus(405)
        const directory = path.resolve(config.publicDir)
        const file = path.resolve(
          directory,
          '.' + decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname),
        )
        if (
          !file.startsWith(directory + path.sep) ||
          !fs.existsSync(file) ||
          !fs.statSync(file).isFile()
        ) {
          return res.sendStatus(404)
        }
        const type = mime[path.extname(file)]
        if (!type) return res.sendStatus(404)
        res.type(type)
        if (req.method === 'HEAD') return res.sendStatus(200)
        return fs.createReadStream(file).pipe(res)
      }

      if (req.method === 'GET' && url.pathname === '/api/library') {
        return reply(res, 401, { error: 'authentication_required' })
      }
      if (req.method === 'GET') {
        if (
          await accountController.handle({
            req,
            res,
            url,
            models,
            user: null,
            reply,
          })
        ) {
          return
        }
        if (
          await studioController.handle({
            req,
            res,
            url,
            models,
            user: null,
            config,
            reply,
          })
        ) {
          return
        }
      }
      if (req.method !== 'POST') return reply(res, 404, { error: 'not_found' })
      const data = req.body || {}
      if (!data || typeof data !== 'object' || Array.isArray(data)) {
        return reply(res, 400, { error: 'invalid_body' })
      }
      if (
        await studioController.handle({
          req,
          res,
          url,
          data,
          models,
          user: null,
          config,
          reply,
        })
      ) {
        return
      }
      if (
        await accountController.handle({
          req,
          res,
          url,
          data,
          models,
          user: null,
          reply,
        })
      ) {
        return
      }
      return reply(res, 404, { error: 'not_found' })
    } catch (error) {
      return next(error)
    }
  })

  return privateRouter
}

module.exports = router
module.exports.createPrivateRouter = createPrivateRouter
