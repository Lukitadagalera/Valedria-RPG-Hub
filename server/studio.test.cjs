const assert = require('node:assert/strict'),
  mongoose = require('mongoose'),
  studio = require('../controllers/studioController'),
  { createModels } = require('../models'),
  { startTestMongo } = require('./test-mongo.cjs')
async function main() {
  const mongo = await startTestMongo(),
    connection = await mongoose.createConnection(mongo.uri).asPromise(),
    models = createModels(connection)
  try {
    await Promise.all(Object.values(models).map((model) => model.init()))
    for (const plan of ['contador', 'mestre', 'deus'])
      await models.Entitlement.create({
        userId: plan,
        expires: Date.now() + 60000,
        source: 'test',
        plan,
      })
    async function call(user, route, data) {
      let result
      try {
        await studio.handle({
          req: { method: data === undefined ? 'GET' : 'POST' },
          res: {},
          url: new URL('http://localhost/api' + route),
          data,
          models,
          user,
          config: { libraryPath: require('node:path').resolve('assets/demo/library.json') },
          reply: (_, status, body) => (result = { status, body }),
        })
        return result
      } catch (error) {
        if (!error.status) throw error
        return { status: error.status }
      }
    }
    assert.equal((await call(null, '/studio/documents/campaigns')).status, 401)
    assert.equal((await call('contador', '/studio/documents/campaigns')).status, 403)
    assert.equal((await call('mestre', '/studio/documents/atlas')).status, 403)
    const document = {
      id: 'example',
      name: 'Campanha',
      sessions: [
        { id: 's', name: 'Pública', summary: 'Visível', secret: 'SEGREDO', revealed: true },
        { id: 'h', name: 'Oculta', revealed: false },
      ],
      npcs: [],
      quests: [],
      inventory: [],
      encounter: [
        { id: 'e', name: 'Rival', hp: 99, initiative: 4, conditions: '', revealed: true },
      ],
    }
    assert.equal(
      (await call('mestre', '/studio/documents/campaigns', { version: 0, documents: [document] }))
        .status,
      200,
    )
    assert.equal(
      (await call('mestre', '/studio/documents/campaigns', { version: 0, documents: [] })).status,
      409,
    )
    assert.deepEqual((await call('deus', '/studio/documents/campaigns')).body.documents, [])
    assert.equal((await call('deus', '/studio/share', { campaignId: 'example' })).status, 404)
    const token = (await call('mestre', '/studio/share', { campaignId: 'example' })).body.token,
      view = (await call(null, '/table/' + token)).body
    assert.equal(view.sessions.length, 1)
    assert.ok(!JSON.stringify(view).includes('SEGREDO'))
    assert.ok(!Object.hasOwn(view.encounter[0], 'hp'))
    await models.Entitlement.updateOne({ userId: 'mestre' }, { $set: { expires: 0 } })
    assert.equal((await call(null, '/table/' + token)).status, 403)
    await models.Entitlement.updateOne(
      { userId: 'mestre' },
      { $set: { expires: Date.now() + 60000 } },
    )
    await call('mestre', '/studio/share', { campaignId: 'example', revoke: true })
    assert.equal((await call(null, '/table/' + token)).status, 404)
    assert.equal(
      (
        await call('deus', '/studio/documents/atlas', {
          version: 0,
          documents: [
            {
              id: 'a',
              name: 'Atlas',
              locations: [{ id: 'x', name: 'Lugar', x: 101, y: 0 }],
              routes: [],
            },
          ],
        })
      ).status,
      400,
    )
    assert.equal(
      (
        await call('deus', '/studio/documents/adventures', {
          version: 0,
          documents: [
            { id: 'a', name: 'Aventura', scenes: [{ id: 'x', name: 'Cena', next: ['missing'] }] },
          ],
        })
      ).status,
      400,
    )
    assert.equal(
      (
        await call('deus', '/studio/documents/creations', {
          version: 0,
          documents: [{ id: 'a', name: 'Modelo' }],
        })
      ).status,
      400,
    )
    for (const [plan, count] of [
      ['contador', 2],
      ['mestre', 4],
      ['deus', 6],
    ])
      assert.equal((await call(plan, '/studio/resources')).body.kits.length, count)
    const chronicle = require('../assets/js/living-chronicle.js').create('chronicle', 'Crônica')
    for (const user of ['contador', 'mestre']) {
      assert.equal((await call(user, '/studio/documents/chronicles')).status, 403)
      assert.equal(
        (await call(user, '/studio/documents/chronicles', { version: 0, documents: [chronicle] }))
          .status,
        403,
      )
    }
    assert.equal(
      (await call('deus', '/studio/documents/chronicles', { version: 0, documents: [chronicle] }))
        .status,
      200,
    )
    assert.equal(
      (await call('deus', '/studio/documents/chronicles')).body.documents[0].name,
      'Crônica',
    )
    assert.equal(
      (await call('deus', '/studio/documents/chronicles', { version: 0, documents: [] })).status,
      409,
    )
    assert.equal(
      (
        await call('deus', '/studio/documents/chronicles', {
          version: 1,
          documents: [{ ...chronicle, session: -1 }],
        })
      ).status,
      400,
    )
    await models.Entitlement.updateOne({ userId: 'deus' }, { $set: { expires: 0 } })
    assert.equal((await call('deus', '/studio/documents/chronicles')).status, 403)
    console.log(
      'PASS: MongoDB tiers, ownership, conflicts, private fields, expiration, revocation and document validation.',
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
