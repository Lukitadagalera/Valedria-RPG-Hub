const assert = require('node:assert/strict'),
  mongoose = require('mongoose'),
  account = require('../controllers/accountController'),
  { createModels } = require('../models'),
  { startTestMongo } = require('../server/test-mongo.cjs')
async function main() {
  const mongo = await startTestMongo(),
    connection = await mongoose.createConnection(mongo.uri).asPromise(),
    models = createModels(connection)
  try {
    const call = async (user, path, data) => {
      let result
      await account.handle({
        req: { method: data ? 'POST' : 'GET' },
        res: {},
        url: { pathname: '/api/account/' + path },
        data,
        models,
        user,
        reply: (_, status, body) => (result = { status, body }),
      })
      return result
    }
    const prefs = {
      bio: 'Minha jornada',
      experience: 'Estou começando',
      playStyle: 'Como jogador',
      availability: 'Sábados',
    }
    assert.equal((await call('a', 'preferences', prefs)).status, 200)
    assert.deepEqual((await call('a', 'preferences')).body, prefs)
    assert.deepEqual((await call('b', 'preferences')).body, {})
    assert.equal((await call(null, 'preferences')).status, 401)
    assert.equal((await call('a', 'preferences', { ...prefs, bio: 'x'.repeat(501) })).status, 400)
    const ticket = (await call('a', 'tickets', { subject: 'Teste', message: 'Preciso de ajuda' }))
      .body.id
    assert.equal((await call('b', 'ticket-status', { id: ticket, status: 'closed' })).status, 404)
    assert.equal((await call('a', 'ticket-status', { id: ticket, status: 'closed' })).status, 200)
    assert.equal((await call('a', 'reply', { id: ticket, message: 'Resposta' })).status, 400)
    assert.equal((await call('a', 'ticket-status', { id: ticket, status: 'open' })).status, 200)
    assert.equal((await call('a', 'reply', { id: ticket, message: 'Resposta' })).status, 201)
    assert.equal((await call('a', 'ticket-status', { id: ticket, status: 'bad' })).status, 400)
    console.log(
      'PASS: MongoDB preferences, validation, isolation, ticket ownership, close and reopen.',
    )
  } finally {
    await connection.close()
    await mongo.stop()
  }
}
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
