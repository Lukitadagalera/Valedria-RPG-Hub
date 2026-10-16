const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')

const html = fs.readFileSync('conta.html', 'utf8')
const script = fs.readFileSync('assets/js/account-navigation.js', 'utf8')
const sectionIds = ['dados', 'seguranca', 'atendimento', 'mensagens', 'assinatura', 'fichas']

assert.match(html, /class="account-workspace"/)
assert.match(html, /id="fichas" role="region"[^]*id="account-fichas-list"/)
for (const id of sectionIds) {
  assert.match(html, new RegExp(`href="#${id}"[^>]*aria-controls="${id}"`))
  assert.match(html, new RegExp(`id="${id}" role="region"`))
}

class Element {
  constructor(id, hash = '') {
    this.id = id
    this.hash = hash
    this.hidden = id !== 'account-private'
    this.attributes = new Map()
    this.listeners = new Map()
  }

  setAttribute(name, value) {
    this.attributes.set(name, value)
  }

  removeAttribute(name) {
    this.attributes.delete(name)
  }

  addEventListener(name, listener) {
    this.listeners.set(name, listener)
  }

  click() {
    this.listeners.get('click')()
  }
}

const account = new Element('account-private')
const workspace = {
  style: {
    values: new Map(),
    setProperty(name, value) { this.values.set(name, value) },
  },
}
let menuHeight = 348
const menu = {
  getBoundingClientRect() {
    return { height: menuHeight }
  },
}
const links = sectionIds.map(id => new Element(`account-tab-${id}`, `#${id}`))
const panels = sectionIds.map(id => new Element(id))
const windowListeners = new Map()
const window = {
  location: { hash: '#seguranca', replace(path) { this.replacedWith = path } },
  localStorage: {
    getItem(key) {
      assert.equal(key, 'valedria-google-session')
      return JSON.stringify({ id: 'user-1', email: 'user@example.com' })
    },
  },
  addEventListener(name, listener) {
    windowListeners.set(name, listener)
  },
}
const document = {
  querySelector(selector) {
    return ({
      '#account-private': account,
      '.account-menu': menu,
      '#account-workspace': workspace,
    })[selector] || null
  },
  querySelectorAll(selector) {
    if (selector === '.account-menu a[aria-controls]') return links
    if (selector === '.account-content [role="region"]') return panels
    return []
  },
}

vm.runInNewContext(script, { document, window, console, decodeURIComponent })

assert.equal(workspace.style.values.get('--account-menu-height'), '348px')
menuHeight = 420
windowListeners.get('resize')()
assert.equal(workspace.style.values.get('--account-menu-height'), '420px')
assert.equal(account.hidden, false)
assert.equal(panels.find(panel => !panel.hidden).id, 'seguranca')
assert.equal(links.find(link => link.attributes.has('aria-current')).id, 'account-tab-seguranca')

links.find(link => link.hash === '#atendimento').click()
assert.equal(panels.find(panel => !panel.hidden).id, 'atendimento')
assert.equal(links.find(link => link.attributes.has('aria-current')).id, 'account-tab-atendimento')

window.location.hash = '#mensagens'
windowListeners.get('hashchange')()
assert.equal(panels.find(panel => !panel.hidden).id, 'mensagens')

window.location.hash = '#fichas'
windowListeners.get('hashchange')()
assert.equal(panels.find(panel => !panel.hidden).id, 'fichas')

window.location.hash = '#invalid'
windowListeners.get('hashchange')()
assert.equal(panels.find(panel => !panel.hidden).id, 'dados')
console.log('PASS: account sidebar opens each section, syncs URL hashes and defaults safely.')
