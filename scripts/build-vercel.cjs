const fs = require('node:fs')
const path = require('node:path')
const { spawnSync } = require('node:child_process')

const root = path.resolve(__dirname, '..')
const output = path.resolve(root, 'public')
if (path.dirname(output) !== root || path.basename(output) !== 'public') {
  throw Error('Invalid Vercel static output directory.')
}

const build = spawnSync(process.execPath, [path.join(root, 'build.cjs')], {
  cwd: root,
  stdio: 'inherit',
})
if (build.error) throw build.error
if (build.status !== 0) process.exit(build.status || 1)

fs.rmSync(output, { recursive: true, force: true })
fs.cpSync(path.join(root, 'dist'), output, { recursive: true })
console.log('Vercel static assets copied to public/.')
