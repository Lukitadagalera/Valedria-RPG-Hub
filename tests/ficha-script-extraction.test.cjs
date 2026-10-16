const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')

const html = fs.readFileSync('ficha.html', 'utf8')
const scriptTags = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]

assert.ok(scriptTags.length > 0, 'Ficha should continue loading its scripts.')
assert.ok(
  scriptTags.every(([, attributes, body]) => /\bsrc\s*=/.test(attributes) && !body.trim()),
  'Ficha HTML should contain only external script references.',
)
assert.doesNotMatch(html, /\son[a-z]+\s*=/i, 'Ficha HTML should not use inline event handlers.')
assert.match(html, /assets\/js\/ficha\.js/)
assert.match(html, /assets\/js\/theme-init\.js/)

for (const file of ['assets/js/ficha.js', 'assets/js/theme-init.js']) {
  const source = fs.readFileSync(file, 'utf8')
  assert.doesNotThrow(() => new vm.Script(source, { filename: file }))
}

const fichaScript = fs.readFileSync('assets/js/ficha.js', 'utf8')
const accountFichasScript = fs.readFileSync('assets/js/account-fichas.js', 'utf8')
const accountHtml = fs.readFileSync('conta.html', 'utf8')
assert.match(fichaScript, /query\.get\('nova'\) === '1'/)
assert.match(fichaScript, /currentSheetId \? 'Salvar alterações' : 'Salvar ficha na conta'/)
assert.match(fichaScript, /beforeunload/)
assert.match(fichaScript, /Tem certeza de que deseja sair sem salvar as alterações\?/)
assert.match(accountFichasScript, /setAttribute\('aria-label', `Editar ficha/)
assert.match(accountFichasScript, /ficha\.html\?ficha=/)
assert.match(accountHtml, /href="ficha\.html\?nova=1">Criar nova ficha/)

console.log('PASS: ficha HTML loads external JavaScript only, with no inline handlers.')
