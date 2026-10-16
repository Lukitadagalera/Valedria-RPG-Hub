const assert = require('node:assert/strict')
const fs = require('node:fs')

const app = require('../server')
const packageJson = require('../package.json')
const serverSource = fs.readFileSync('server.js', 'utf8')

assert.equal(typeof app, 'function')
assert.equal(typeof app.use, 'function')
assert.match(serverSource, /module\.exports = app/)
assert.match(serverSource, /require\.main === module/)
assert.equal(packageJson.scripts.build, 'node scripts/build-vercel.cjs')
assert.ok(fs.existsSync('scripts/build-vercel.cjs'))
console.log('PASS: the Vercel entry exports Express and keeps the local server startup guarded.')
