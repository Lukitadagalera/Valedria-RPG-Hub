const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')

const html = fs.readFileSync('conta.html', 'utf8')
const script = fs.readFileSync('assets/js/account-navigation.js', 'utf8')
const styles = fs.readFileSync('assets/css/account.css', 'utf8')
const sectionIds = ['dados', 'seguranca', 'atendimento', 'mensagens', 'assinatura', 'fichas']

assert.match(html, /class="account-workspace"/)
assert.match(html, /id="fichas" role="region"[^]*id="account-fichas-list"/)
assert.doesNotMatch(styles, /account-content\{[^}]*overflow-y:auto/)
assert.doesNotMatch(styles, /account-content\{[^}]*overflow-x:hidden/)
assert.doesNotMatch(styles, /account-content\{[^}]*height:var\(--account-menu-height/)
assert.doesNotMatch(script, /syncMenuHeight|ResizeObserver|account-menu-height/)
assert.match(html, /<select class="account-menu-select" id="account-menu-select"[^>]*>\s*<option value="fichas" selected>Minhas fichas<\/option>/)
assert.match(styles, /\.account-menu-select\{display:block/)
assert.match(styles, /\.account-page \.account-menu-select\{[^}]*background:#f5efdf;color:#111/)
assert.match(styles, /\.account-page \.account-menu-select:focus-visible\{border-color:#c8bda8;outline:2px solid #514b40/)
assert.match(html, /account\.css\?v=20261015b/)
assert.match(html, /account-navigation\.js\?v=20261015b/)
assert.match(html, /account-fichas\.js\?v=20261015b/)
assert.match(styles, /\.account-menu-link\{display:none\}/)
assert.match(styles, /border-radius:18px!important/)
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
const selector = new Element('account-menu-select')
const menu = {
  getBoundingClientRect() {
    return { height: 348 }
  },
}
const links = sectionIds.map(id => new Element(`account-tab-${id}`, `#${id}`))
const panels = sectionIds.map(id => new Element(id))
const windowListeners = new Map()
const dispatchedEvents = []
const window = {
  location: { hash: '#seguranca', replace(path) { this.replacedWith = path } },
  dispatchEvent(event) { dispatchedEvents.push(event.type) },
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
  querySelector(query) {
    return ({
      '#account-private': account,
      '.account-menu': menu,
      '#account-menu-select': selector,
      '#account-workspace': {},
    })[query] || null
  },
  querySelectorAll(selector) {
    if (selector === '.account-menu a[aria-controls]') return links
    if (selector === '.account-content [role="region"]') return panels
    return []
  },
}

vm.runInNewContext(script, {
  document,
  window,
  console,
  decodeURIComponent,
  Event: class { constructor(type) { this.type = type } },
})

assert.equal(account.hidden, false)
assert.equal(panels.find(panel => !panel.hidden).id, 'seguranca')
assert.equal(links.find(link => link.attributes.has('aria-current')).id, 'account-tab-seguranca')
assert.equal(selector.value, 'seguranca')
assert.equal(dispatchedEvents.at(-1), 'valedria:account-section-change')

links.find(link => link.hash === '#atendimento').click()
assert.equal(panels.find(panel => !panel.hidden).id, 'atendimento')
assert.equal(links.find(link => link.attributes.has('aria-current')).id, 'account-tab-atendimento')
assert.equal(selector.value, 'atendimento')

selector.value = 'assinatura'
selector.listeners.get('change')()
assert.equal(window.location.hash, '#assinatura')
assert.equal(panels.find(panel => !panel.hidden).id, 'assinatura')

window.location.hash = '#mensagens'
windowListeners.get('hashchange')()
assert.equal(panels.find(panel => !panel.hidden).id, 'mensagens')
assert.equal(selector.value, 'mensagens')

window.location.hash = '#fichas'
windowListeners.get('hashchange')()
assert.equal(panels.find(panel => !panel.hidden).id, 'fichas')

window.location.hash = '#invalid'
windowListeners.get('hashchange')()
assert.equal(panels.find(panel => !panel.hidden).id, 'fichas')
assert.equal(selector.value, 'fichas')
assert.match(script, /dispatchEvent\(new Event\('valedria:account-section-change'\)\)/)
console.log('PASS: account sidebar opens each section, syncs URL hashes and defaults safely.')
