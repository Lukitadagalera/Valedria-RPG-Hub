const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { createServer } = require('./index.cjs')
const { startTestMongo } = require('./test-mongo.cjs')

const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'valedria-auth-removal-'))
const origin = 'http://127.0.0.1:4181'
fs.writeFileSync(path.join(temporaryDirectory, 'library.json'), '{}')

async function main() {
  const mongo = await startTestMongo()
  const server = createServer({
    origin,
    mongoUri: mongo.uri,
    publicDir: path.resolve(__dirname, '../dist'),
    libraryPath: path.join(temporaryDirectory, 'library.json'),
  })

  await server.ready
  await new Promise((resolve) => server.listen(4181, '127.0.0.1', resolve))

  try {
    const removedModels = ['Session', 'GoogleOAuthState']
    for (const modelName of removedModels) {
      assert.equal(server.models[modelName], undefined)
    }

    assert.equal(server.models.User, undefined)

    const removedGetRoutes = [
      '/api/auth/signin/google',
      '/api/auth/callback/google',
      '/api/session',
    ]
    for (const route of removedGetRoutes) {
      const response = await fetch(origin + route)
      assert.equal(response.status, 404, route)
    }

    const removedPostRoutes = ['/api/login', '/api/register', '/api/logout']
    for (const route of removedPostRoutes) {
      const response = await fetch(origin + route, {
        method: 'POST',
        headers: {
          Origin: origin,
          'Content-Type': 'application/json',
        },
        body: '{}',
      })
      assert.equal(response.status, 404, route)
    }

    const unauthenticatedRoutes = ['/api/library', '/api/account/profile']
    for (const route of unauthenticatedRoutes) {
      const response = await fetch(origin + route, {
        headers: { Cookie: 'valedria_session=' + 'a'.repeat(64) },
      })
      assert.equal(response.status, 401, route)
    }

    console.log(
      'PASS: OAuth, login and session routes/models are removed; protected APIs reject legacy cookies.',
    )
  } finally {
    await new Promise((resolve) => server.close(resolve))
    await server.mongo.close()
    await mongo.stop()
    fs.rmSync(temporaryDirectory, { recursive: true, force: true })
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
