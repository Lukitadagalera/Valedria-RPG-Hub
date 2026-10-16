const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/User')
const authController = require('../controllers/authController')

function configurePassport(passport) {
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => done(null, user || false), done)
  })

  if (!process.env.GOOGLE_CLIENT_SECRET) return false

  const callbackURL =
    process.env.GOOGLE_CALLBACK_URL || 'https://valedria.lat/auth/google/callback'
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL,
      },
      (accessToken, refreshToken, profile, done) => {
        authController
          .findOrCreateGoogleUser(profile)
          .then((user) => done(null, user), done)
      },
    ),
  )
  return true
}

module.exports = configurePassport
