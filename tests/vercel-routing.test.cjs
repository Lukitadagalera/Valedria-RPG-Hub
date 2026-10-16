const assert = require('node:assert/strict')
const fs = require('node:fs')

const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'))
const builds = config.builds
const routes = config.routes
const apiBuild = builds.find((build) => build.src === 'api/index.js')
const staticBuild = builds.find((build) => build.src === 'package.json')
const apiRoute = routes.findIndex((route) => route.src === '/api/(.*)')
const authRoute = routes.findIndex((route) => route.src === '/auth/(.*)')
const filesystemRoute = routes.findIndex((route) => route.handle === 'filesystem')
const fallbackRoute = routes.findIndex((route) => route.dest === '/index.html')

assert.equal(apiBuild?.use, '@vercel/node')
assert.equal(staticBuild?.use, '@vercel/static-build')
assert.equal(staticBuild?.config?.distDir, 'public')
assert.ok(apiRoute >= 0 && apiRoute < filesystemRoute)
assert.ok(authRoute >= 0 && authRoute < filesystemRoute)
assert.ok(filesystemRoute < fallbackRoute)
assert.match(routes[apiRoute].dest, /^\/api\/index\.js\?__path=\/api\//)
assert.match(routes[authRoute].dest, /^\/api\/index\.js\?__path=\/auth\//)
const apiHandler = require('../api/index')
assert.equal(typeof apiHandler, 'function')
const request = {
  url: '/api/index.js?__path=%2Fapi%2Fauth%2Fconfig&theme=dark',
}
apiHandler.restoreOriginalPath(request)
assert.equal(request.url, '/api/auth/config?theme=dark')
assert.equal(typeof require('../server'), 'function')
console.log('PASS: Vercel routes API and OAuth to Node before static files and the homepage fallback.')
