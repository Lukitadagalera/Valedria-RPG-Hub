const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')

const script = fs.readFileSync('assets/js/protected-account.js', 'utf8')

async function runGuard(sessionValue, serverResponse = { ok: false }) {
  let redirectedTo = null
  const stored = new Map()
  const window = {
    localStorage: {
      getItem(key) {
        assert.equal(key, 'valedria-google-session')
        return sessionValue
      },
      setItem(key, value) {
        stored.set(key, value)
      },
    },
    location: {
      replace(destination) {
        redirectedTo = destination
      },
    },
  }

  vm.runInNewContext(
    script,
    {
      window,
      JSON,
      Promise,
      fetch: async (url, options) => {
        assert.equal(url, '/auth/status')
        assert.equal(options.credentials, 'same-origin')
        return { ...serverResponse, json: async () => serverResponse.body }
      },
      console,
    },
  )
  await window.VALEDRIA_ACCOUNT_USER
  return { redirectedTo, stored, window }
}

async function main() {
  assert.equal((await runGuard(null)).redirectedTo, 'login.html')
  assert.equal(
    (await runGuard(JSON.stringify({ id: 'user-id', email: 'user@example.com' }))).redirectedTo,
    null,
  )
  assert.equal((await runGuard(JSON.stringify({ email: 'user@example.com' }))).redirectedTo, 'login.html')

  const serverSession = await runGuard(null, {
    ok: true,
    body: {
      success: true,
      user: { id: 'server-user', email: 'server@example.com', name: 'Aventureiro' },
    },
  })
  assert.equal(serverSession.redirectedTo, null)
  assert.equal(serverSession.window.VALEDRIA_SERVER_SESSION, true)
  assert.deepEqual(
    JSON.parse(serverSession.stored.get('valedria-google-session')),
    serverSession.window.VALEDRIA_ACCOUNT_USER
      ? await serverSession.window.VALEDRIA_ACCOUNT_USER
      : null,
  )
  console.log('PASS: account page accepts local Google credentials and bootstraps Passport sessions.')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
