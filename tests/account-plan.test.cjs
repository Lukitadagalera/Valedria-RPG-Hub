const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')

const script = fs.readFileSync('assets/js/account-plan.js', 'utf8')
const planElement = { textContent: 'Visitante' }
const titleElement = { textContent: 'Minha conta' }
const window = {
  localStorage: {
    getItem(key) {
      assert.equal(key, 'valedria-google-session')
      return JSON.stringify({
        name: 'Lucas Lopes',
        accountType: 'mestre',
      })
    },
  },
}
const document = {
  querySelector(selector) {
    if (selector === '#account-plan-name') return planElement
    if (selector === '#account-view-title') return titleElement
    return null
  },
}

vm.runInNewContext(script, { document, window, Object, JSON, console })

assert.equal(titleElement.textContent, 'Olá, Lucas Lopes')
assert.equal(planElement.textContent, 'Mestre das Aventuras')
console.log('PASS: account heading greets the Google user and shows their plan.')
