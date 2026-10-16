const { OAuth2Client } = require('google-auth-library')
const Entitlement = require('../models/Entitlement')
const User = require('../models/User')

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    picture: user.picture,
    accountType: user.accountType || 'visitor',
  }
}

async function findOrCreateGoogleUser(profile) {
  const emailRecord = profile.emails?.find(
    (entry) => entry.value && (entry.verified === true || profile._json?.email_verified === true),
  )
  const email = emailRecord?.value?.toLowerCase()
  if (!profile.id || !email) throw Error('Google profile is missing a verified email.')

  const name = profile.displayName || email
  const picture = profile.photos?.[0]?.value
  let user = await User.findOne({ googleId: profile.id })

  if (!user) {
    user = await User.findOne({ email })
    if (user) {
      user.googleId = profile.id
      user.name = name || user.name
      user.picture = picture || user.picture
      await user.save()
    } else {
      user = await User.create({
        googleId: profile.id,
        name,
        email,
        picture,
      })
    }
  } else {
    const googleName = name || user.name
    const googlePicture = picture || user.picture
    if (user.name !== googleName || user.picture !== googlePicture) {
      user.name = googleName
      user.picture = googlePicture
      await user.save()
    }
  }
  return user
}

function getGoogleConfig(req, res) {
  return res.json({ clientId: process.env.GOOGLE_CLIENT_ID })
}

async function authenticateGoogle(req, res) {
  const { token } = req.body || {}
  if (typeof token !== 'string' || token.length > 8192) {
    return res.status(400).json({ success: false, message: 'Credencial inválida.' })
  }

  let profile
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    const payload = ticket.getPayload()
    if (!payload?.sub || !payload.email || payload.email_verified !== true) {
      return res.status(401).json({ success: false, message: 'Credencial inválida.' })
    }
    profile = {
      id: payload.sub,
      displayName: payload.name,
      emails: [{ value: payload.email, verified: payload.email_verified }],
      photos: payload.picture ? [{ value: payload.picture }] : [],
    }
  } catch (error) {
    console.error('Google token verification failed:', error.name)
    return res.status(401).json({ success: false, message: 'Credencial inválida.' })
  }

  try {
    const user = await findOrCreateGoogleUser(profile)
    if (req.app.locals.passportEnabled) {
      return req.login(user, (error) => {
        if (error) {
          console.error('Google session creation failed:', error.message)
          return res.status(500).json({
            success: false,
            message: 'Não foi possível iniciar uma sessão segura.',
          })
        }
        return res.json({ success: true, user: publicUser(user) })
      })
    }
    return res.json({ success: true, user: publicUser(user) })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: 'Esta conta já está cadastrada.' })
    }
    console.error('Google user lookup failed:', error.message)
    return res
      .status(500)
      .json({ success: false, message: 'Não foi possível concluir o login agora.' })
  }
}

function loginSucesso(req, res) {
  if (req.isAuthenticated?.()) {
    return res.status(200).json({ success: true, user: publicUser(req.user) })
  }
  return res.status(401).json({ success: false, message: 'Não logado' })
}

async function getSession(req, res) {
  if (!req.isAuthenticated?.()) {
    return res.json({ user: null, entitlement: { status: 'inactive' } })
  }

  try {
    const entitlement = await Entitlement.findOne({
      userId: String(req.user._id),
      expires: { $gt: Date.now() },
    }).lean()
    return res.json({
      user: publicUser(req.user),
      entitlement: entitlement
        ? { status: 'active', plan: entitlement.plan }
        : { status: 'inactive' },
    })
  } catch (error) {
    console.error('Session status lookup failed:', error.message)
    return res.status(500).json({ success: false, message: 'Não foi possível consultar a sessão.' })
  }
}

function logout(req, res, next) {
  const finish = () => {
    if (req.session) {
      return req.session.destroy((error) => {
        if (error) return next(error)
        res.clearCookie('valedria.sid', { path: '/' })
        return res.redirect('/')
      })
    }
    res.clearCookie('valedria.sid', { path: '/' })
    return res.redirect('/')
  }

  if (!req.isAuthenticated?.()) return finish()
  req.logout((error) => {
    if (error) return next(error)
    return finish()
  })
}

module.exports = {
  authenticateGoogle,
  findOrCreateGoogleUser,
  getGoogleConfig,
  getSession,
  loginSucesso,
  logout,
}
