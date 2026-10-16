const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { createServer } = require('./index.cjs')
const { startTestMongo } = require('./test-mongo.cjs')

const temporaryDirectory = fs.mkdtempSync(path.join(os.tmpdir(), 'valedria-content-'))
const publicDirectory = path.join(temporaryDirectory, 'public')
const privateDirectory = path.join(temporaryDirectory, 'private')
const origin = 'http://127.0.0.1:4183'

fs.mkdirSync(publicDirectory)
fs.mkdirSync(privateDirectory)
fs.writeFileSync(path.join(temporaryDirectory, 'library.json'), '{}')
fs.writeFileSync(path.join(publicDirectory, 'book.html'), 'PREVIEW')
fs.writeFileSync(path.join(privateDirectory, 'book.html'), 'PRIVATE_FULL_TEXT')
fs.writeFileSync(path.join(privateDirectory, 'data.js'), 'PRIVATE_DATA')
fs.writeFileSync(
  path.join(privateDirectory, 'manifest.json'),
  JSON.stringify({
    '/book.html': {
      rank: 3,
      type: 'text/html',
      privateFile: 'book.html',
      publicFile: 'book.html',
    },
    '/data.js': {
      rank: 3,
      type: 'text/javascript',
      privateFile: 'data.js',
    },
  }),
)

async function main() {
  const mongo = await startTestMongo()
  const server = createServer({
    origin,
    mongoUri: mongo.uri,
    publicDir: publicDirectory,
    contentDir: privateDirectory,
    libraryPath: path.join(temporaryDirectory, 'library.json'),
  })

  await server.ready
  await new Promise((resolve) => server.listen(4183, '127.0.0.1', resolve))

  try {
    let response = await fetch(origin + '/book.html')
    assert.equal(response.status, 403)
    assert.equal(await response.text(), 'PREVIEW')
    assert.equal((await fetch(origin + '/data.js')).status, 403)

    const staleCookie = { headers: { Cookie: 'valedria_session=' + 'a'.repeat(64) } }
    response = await fetch(origin + '/book.html', staleCookie)
    assert.equal(response.status, 403)
    assert.equal(await response.text(), 'PREVIEW')
    assert.equal((await fetch(origin + '/data.js', staleCookie)).status, 403)
    assert.equal(
      (await fetch(origin + '/book.html', { ...staleCookie, method: 'POST' })).status,
      405,
    )

    console.log(
      'PASS: private content remains inaccessible without the removed authentication flow.',
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
