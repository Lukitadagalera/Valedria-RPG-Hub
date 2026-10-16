const assert = require('node:assert/strict')
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const Ficha = require('../models/Ficha')
const routes = require('../routes')

async function main() {
  const validFicha = new Ficha({
    nomePersonagem: 'Aventureira',
    raca: 'Humano',
    UserId: new mongoose.Types.ObjectId(),
  })
  await validFicha.validate()
  assert.ok(validFicha.UserId)
  await assert.rejects(
    new Ficha({ nomePersonagem: 'Invalida', raca: 'Elfo', UserId: new mongoose.Types.ObjectId() }).validate(),
    (error) => Boolean(error.errors.raca),
  )
  await assert.rejects(
    new Ficha({ nomePersonagem: 'Sem jogador', raca: 'Humano' }).validate(),
    (error) => Boolean(error.errors.UserId),
  )

  const app = express()
  app.use(express.json())
  app.use(passport.initialize())
  app.locals.passportEnabled = false
  app.use('/', routes)
  const server = app.listen(0, '127.0.0.1')
  try {
    await new Promise((resolve) => server.once('listening', resolve))
    const origin = `http://127.0.0.1:${server.address().port}`
    const [config, auth, createSheet, listSheets, passportLogin, sessionStatus] = await Promise.all([
      fetch(`${origin}/api/auth/config`),
      fetch(`${origin}/api/auth/google`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({}),
      }),
      fetch(`${origin}/api/fichas`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({}),
      }),
      fetch(`${origin}/api/fichas/jogador/${new mongoose.Types.ObjectId()}`),
      fetch(`${origin}/auth/google`),
      fetch(`${origin}/api/session`),
    ])
    assert.equal(config.status, 200)
    assert.equal(auth.status, 400)
    assert.equal(createSheet.status, 401)
    assert.equal(listSheets.status, 404)
    assert.equal(passportLogin.status, 503)
    assert.deepEqual(await sessionStatus.json(), {
      user: null,
      entitlement: { status: 'inactive' },
    })
  } finally {
    await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())))
  }
  console.log('PASS: MVC routes preserve Google token endpoints and protect fichas behind authenticated sessions.')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
