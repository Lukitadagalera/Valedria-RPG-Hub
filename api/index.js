const app = require('../server')

function restoreOriginalPath(req) {
  const url = new URL(req.url, 'http://localhost')
  const originalPath = url.searchParams.get('__path')
  if (!originalPath || !/^\/(?:api|auth)\//.test(originalPath)) return

  url.searchParams.delete('__path')
  req.url = `${originalPath}${url.search}`
}

module.exports = (req, res) => {
  restoreOriginalPath(req)
  return app(req, res)
}
module.exports.restoreOriginalPath = restoreOriginalPath
