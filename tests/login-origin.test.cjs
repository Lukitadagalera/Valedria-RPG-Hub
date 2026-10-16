const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')

let clickHandler
const button = {
  disabled: false,
  addEventListener(eventName, handler) {
    assert.equal(eventName, 'click')
    clickHandler = handler
  },
}
const status = { textContent: '' }
const window = {
  location: { origin: 'https://lukitadagalera.github.io' },
}
const document = {
  querySelector(selector) {
    if (selector === '#google-login-button') return button
    if (selector === '#login-status') return status
    return null
  },
  createElement() {
    return { async: false, onload: null, onerror: null }
  },
  head: {
    append(script) {
      window.google = {
        accounts: {
          id: {
            initialize() {},
            prompt(onMoment) {
              onMoment({
                isNotDisplayed: () => true,
                isSkippedMoment: () => false,
                getNotDisplayedReason: () => 'unregistered_origin',
              })
            },
          },
        },
      }
      script.onload()
    },
  },
}

async function fetch(url) {
  assert.equal(url, '/api/auth/config')
  return { ok: true, json: async () => ({ clientId: 'google-client-id' }) }
}

async function main() {
  const script = fs.readFileSync('assets/js/login.js', 'utf8')
  vm.runInNewContext(script, { document, window, fetch, Promise, Error })
  await new Promise((resolve) => setImmediate(resolve))

  await clickHandler()
  assert.match(status.textContent, /https:\/\/lukitadagalera\.github\.io/)
  assert.match(status.textContent, /origem JavaScript autorizada/)
  assert.equal(button.disabled, false)
  console.log('PASS: Google origin mismatch reports the exact origin to authorize.')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
