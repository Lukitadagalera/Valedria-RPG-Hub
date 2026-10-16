const assert = require('node:assert/strict')
const express = require('express')
const session = require('express-session')
const { MongoStore } = require('connect-mongo')
const mongoose = require('mongoose')
const passport = require('passport')
const { startTestMongo } = require('./test-mongo.cjs')

async function main() {
  const previous = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  }
  process.env.GOOGLE_CLIENT_ID = 'test-client-id'
  process.env.GOOGLE_CLIENT_SECRET = 'test-client-secret'
  process.env.GOOGLE_CALLBACK_URL = 'http://localhost/auth/google/callback'

  const mongo = await startTestMongo()
  let server
  try {
    await mongoose.connect(mongo.uri)
    const configurePassport = require('../config/passport')
    assert.equal(configurePassport(passport), true)
    const User = require('../models/User')
    const CharacterSheet = require('../models/CharacterSheet')
    const user = await User.create({
      googleId: 'test-google-user',
      name: 'Aventureira',
      email: 'aventureira@example.com',
    })

    const app = express()
    app.use(express.json())
    app.use(
      session({
        name: 'valedria.sid',
        secret: 'session-test-secret-that-is-long-enough',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
          client: mongoose.connection.getClient(),
          collectionName: 'sessions-test',
        }),
        cookie: { httpOnly: true, sameSite: 'lax' },
      }),
    )
    app.use(passport.initialize())
    app.use(passport.session())
    app.locals.passportEnabled = true
    app.post('/__test/login', (req, res, next) => {
      req.login(user, (error) => (error ? next(error) : res.sendStatus(204)))
    })
    app.use('/', require('../routes'))

    server = app.listen(0, '127.0.0.1')
    await new Promise((resolve) => server.once('listening', resolve))
    const origin = `http://127.0.0.1:${server.address().port}`
    const login = await fetch(`${origin}/__test/login`, { method: 'POST' })
    assert.equal(login.status, 204)
    const cookie = login.headers.get('set-cookie')?.split(';')[0]
    assert.match(cookie, /^valedria\.sid=/)

    const status = await fetch(`${origin}/auth/status`, { headers: { Cookie: cookie } })
    assert.equal(status.status, 200)
    assert.deepEqual((await status.json()).user, {
      id: String(user._id),
      name: 'Aventureira',
      email: 'aventureira@example.com',
      accountType: 'visitor',
    })

    const sessionStatus = await fetch(`${origin}/api/session`, {
      headers: { Cookie: cookie },
    })
    assert.equal(sessionStatus.status, 200)
    assert.deepEqual(await sessionStatus.json(), {
      user: {
        id: String(user._id),
        name: 'Aventureira',
        email: 'aventureira@example.com',
        accountType: 'visitor',
      },
      entitlement: { status: 'inactive' },
    })

    const create = await fetch(`${origin}/api/fichas`, {
      method: 'POST',
      headers: {
        Cookie: cookie,
        Origin: origin,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome: 'Aelric', raca: 'Humano' }),
    })
    assert.equal(create.status, 201)
    const created = (await create.json()).ficha
    assert.equal(created.userId, String(user._id))

    const list = await fetch(`${origin}/api/fichas`, {
      headers: { Cookie: cookie },
    })
    assert.equal(list.status, 200)
    assert.equal((await list.json()).fichas[0].nome, 'Aelric')

    const loaded = await fetch(`${origin}/api/fichas/${created._id}`, {
      headers: { Cookie: cookie },
    })
    assert.equal(loaded.status, 200)
    assert.equal((await loaded.json()).ficha.atributos.forca, 1)

    const updated = await fetch(`${origin}/api/fichas/${created._id}`, {
      method: 'PUT',
      headers: {
        Cookie: cookie,
        Origin: origin,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: 'Aelric atualizado',
        nivel: 2,
        atributos: { forca: 2, destreza: 3, constituicao: 4, sabedoria: 5, carisma: 1 },
      }),
    })
    assert.equal(updated.status, 200)
    assert.equal((await updated.json()).ficha.nome, 'Aelric atualizado')

    const foreignSheet = await CharacterSheet.create({
      userId: 'another-player',
      nome: 'Ficha privada',
    })
    const forbiddenRead = await fetch(`${origin}/api/fichas/${foreignSheet.id}`, {
      headers: { Cookie: cookie },
    })
    assert.equal(forbiddenRead.status, 404)

    const deleted = await fetch(`${origin}/api/fichas/${created._id}`, {
      method: 'DELETE',
      headers: { Cookie: cookie, Origin: origin },
    })
    assert.equal(deleted.status, 200)
    const listAfterDelete = await fetch(`${origin}/api/fichas`, {
      headers: { Cookie: cookie },
    })
    assert.equal((await listAfterDelete.json()).fichas.length, 0)

    const logout = await fetch(`${origin}/auth/logout`, {
      headers: { Cookie: cookie },
      redirect: 'manual',
    })
    assert.equal(logout.status, 302)
    const statusAfterLogout = await fetch(`${origin}/auth/status`, {
      headers: { Cookie: cookie },
    })
    assert.equal(statusAfterLogout.status, 401)
    console.log('PASS: Passport MongoDB sessions, protected ficha ownership, status and logout.')
  } finally {
    if (server?.listening) {
      await new Promise((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve())),
      )
    }
    await mongoose.disconnect()
    await mongo.stop()
    for (const [key, value] of Object.entries(previous)) {
      const name = { clientId: 'GOOGLE_CLIENT_ID', clientSecret: 'GOOGLE_CLIENT_SECRET', callbackURL: 'GOOGLE_CALLBACK_URL' }[key]
      if (value === undefined) delete process.env[name]
      else process.env[name] = value
    }
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
