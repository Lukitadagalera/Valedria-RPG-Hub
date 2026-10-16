const assert = require('node:assert/strict')
const fs = require('node:fs')

const styles = fs.readFileSync('assets/css/reference.css', 'utf8')

assert.match(styles, /\.reference-header\{position:fixed;inset:0 0 auto;z-index:80\}/)
assert.match(styles, /body:has\(> \.reference-header\)\{padding-top:52px\}/)
assert.match(styles, /@media\(max-width:850px\)\{body:has\(> \.reference-header\)\{padding-top:64px\}\}/)

console.log('PASS: site header stays fixed while reserving its space on desktop and mobile.')
