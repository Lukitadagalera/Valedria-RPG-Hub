const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')

let clickHandler
let credentialCallback
let postedCredential
let redirectedTo
let savedSession
const logMessages = []

const button = {
  disabled: false,
  addEventListener(eventName, handler) {
    assert.equal(eventName, 'click')
    clickHandler = handler
  },
}
const status = { textContent: '' }
const window = {
  localStorage: {
    setItem(key, value) {
      assert.equal(key, 'valedria-google-session')
      savedSession = JSON.parse(value)
    },
  },
  location: {
    assign(destination) {
      redirectedTo = destination
    },
  },
}
const document = {
  querySelector(selector) {
    if (selector === '#google-login-button') return button
    if (selector === '#login-status') return status
    return null
  },
  createElement(elementName) {
    assert.equal(elementName, 'script')
    return {
      set src(value) {
        assert.equal(value, 'https://accounts.google.com/gsi/client')
      },
      set async(value) {
        assert.equal(value, true)
      },
      onload: null,
      onerror: null,
    }
  },
  head: {
    append(script) {
      window.google = {
        accounts: {
          id: {
            initialize(options) {
              credentialCallback = options.callback
            },
            prompt() {
              credentialCallback({ credential: 'signed-google-credential' })
            },
          },
        },
      }
      script.onload()
    },
  },
}

async function fetch(url, options) {
  if (url === '/api/auth/config') {
    return { ok: true, json: async () => ({ clientId: 'google-client-id' }) }
  }

  if (url === '/api/auth/google') {
    postedCredential = JSON.parse(options.body).token
    return {
      ok: true,
      json: async () => ({
        success: true,
        user: {
          id: 'user-id',
          name: 'Tester',
          email: 'tester@example.com',
          accountType: 'visitor',
        },
      }),
    }
  }

  throw Error(`Unexpected request: ${url}`)
}

async function main() {
  const script = fs.readFileSync('assets/js/login.js', 'utf8')
  vm.runInNewContext(script, {
    document,
    window,
    fetch,
    Promise,
    Error,
    console: {
      log(...message) {
        logMessages.push(message)
      },
      error() {},
    },
  })

  await new Promise((resolve) => setImmediate(resolve))
  assert.equal(typeof clickHandler, 'function')

  await clickHandler()
  await new Promise((resolve) => setImmediate(resolve))

  assert.equal(postedCredential, 'signed-google-credential')
  assert.deepEqual(savedSession, {
    id: 'user-id',
    name: 'Tester',
    email: 'tester@example.com',
    accountType: 'visitor',
  })
  assert.deepEqual(logMessages[0], ['login realizado com sucesso'])
  assert.equal(redirectedTo, '/conta.html')
  console.log('PASS: Google login button submits its credential and redirects to Minha conta.')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
