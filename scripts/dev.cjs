const fs = require('node:fs')
const path = require('node:path')
const { spawn, execFile } = require('node:child_process')

const projectRoot = path.resolve(__dirname, '..')
const port = Number(process.env.PORT || 3000)
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw Error('PORT must be an integer between 1 and 65535.')
}

const url = `http://localhost:${port}/login.html`
let server
let reloadTimer
let restartTimer
let restartRequested = false
const watchers = []
let output = ''
let browserOpened = false

function openBrowser() {
  if (browserOpened) return
  browserOpened = true

  const command =
    process.platform === 'win32'
      ? ['cmd.exe', ['/d', '/s', '/c', `start "" "${url}"`]]
      : process.platform === 'darwin'
        ? ['open', [url]]
        : ['xdg-open', [url]]

  execFile(command[0], command[1], (error) => {
    if (error) console.error(`Could not open browser automatically: ${error.message}`)
  })
}

function startServer() {
  const child = spawn(process.execPath, ['server.js', '--dev'], {
    cwd: projectRoot,
    stdio: ['inherit', 'pipe', 'pipe', 'ipc'],
    env: process.env,
  })
  server = child

  child.stdout.on('data', (chunk) => {
    process.stdout.write(chunk)
    output = (output + chunk.toString()).slice(-2048)
    if (output.includes(`http://localhost:${port}`)) openBrowser()
  })
  child.stderr.pipe(process.stderr)
  child.on('error', (error) => {
    console.error(`Could not start the development server: ${error.message}`)
    process.exitCode = 1
  })
  child.on('exit', (code, signal) => {
    if (server !== child) return
    server = null

    if (restartRequested) {
      restartRequested = false
      startServer()
      return
    }

    for (const watcher of watchers) watcher.close()
    if (signal) process.exitCode = signal === 'SIGINT' ? 130 : 143
    else process.exitCode = code ?? 1
  })
}

function scheduleReload(filename) {
  clearTimeout(reloadTimer)
  reloadTimer = setTimeout(() => {
    console.log(`\nChanged ${filename || 'frontend source'}; reloading open pages.`)
    if (server?.connected) server.send({ type: 'reload' })
  }, 200)
}

function scheduleRestart(filename) {
  clearTimeout(restartTimer)
  restartTimer = setTimeout(() => {
    if (!server) return
    console.log(`\nChanged ${filename || 'backend source'}; restarting Express.`)
    restartRequested = true
    server.kill()
  }, 250)
}

function watchSources() {
  const rootWatcher = fs.watch(projectRoot, (_eventType, changedFile) => {
    const filename = changedFile?.toString()
    if (['server.js', '.env', 'package.json', 'package-lock.json'].includes(filename)) {
      scheduleRestart(filename)
    } else if (!filename || /\.(html|css|js)$/i.test(filename)) {
      scheduleReload(filename)
    }
  })
  const assetsWatcher = fs.watch(
    path.join(projectRoot, 'assets'),
    { recursive: true },
    (_eventType, filename) => {
      if (!filename || /\.(html|css|js)$/i.test(filename.toString())) {
        scheduleReload(filename?.toString())
      }
    },
  )
  for (const directory of ['api', 'config', 'controllers', 'models', 'routes', 'server']) {
    const watcher = fs.watch(
      path.join(projectRoot, directory),
      { recursive: true },
      (_eventType, changedFile) => {
        const filename = changedFile?.toString()
        if (!filename || /\.(?:c?js|json)$/i.test(filename)) {
          scheduleRestart(`${directory}${filename ? `/${filename}` : ''}`)
        }
      },
    )
    watchers.push(watcher)
  }

  rootWatcher.on('error', (error) => console.error(`Project watcher failed: ${error.message}`))
  assetsWatcher.on('error', (error) => console.error(`Assets watcher failed: ${error.message}`))
  watchers.push(rootWatcher, assetsWatcher)
}

startServer()
watchSources()

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    clearTimeout(reloadTimer)
    clearTimeout(restartTimer)
    for (const watcher of watchers) watcher.close()
    if (server?.connected) server.kill(signal)
    else process.exitCode = signal === 'SIGINT' ? 130 : 143
  })
}
