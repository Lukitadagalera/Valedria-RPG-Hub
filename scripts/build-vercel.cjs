const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
const output = path.resolve(root, 'public')
if (path.dirname(output) !== root || path.basename(output) !== 'public') {
  throw Error('Invalid Vercel static output directory.')
}

fs.rmSync(output, { recursive: true, force: true })
fs.mkdirSync(output, { recursive: true })

for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
  if (entry.isFile() && /\.(?:html|ico)$/i.test(entry.name)) {
    fs.copyFileSync(path.join(root, entry.name), path.join(output, entry.name))
  }
}
fs.cpSync(path.join(root, 'assets'), path.join(output, 'assets'), { recursive: true })

console.log('Vercel static pages and assets prepared in public/.')
