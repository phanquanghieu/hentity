const cluster = require('cluster')
const chokidar = require('chokidar')
const path = require('path')

const Hentity = require('../Hentity')

const run = () => {
  if (cluster.isMaster) {
    cluster.on('message', (worker, message) => {
      switch (message) {
        case 'restart':
          console.log('\nServer restarting...')
          worker.send('kill')
          break
        case 'killed':
          cluster.fork()
          break
        case 'prevent_restart':
          worker.send('prevent_restart')
          break
      }
    })

    cluster.fork()
  } else {
    let preventRestart = false
    process.on('message', (message) => {
      switch (message) {
        case 'kill':
          process.send('killed')
          process.exit()
          break
        case 'prevent_restart':
          preventRestart = true
          break
      }
    })

    const watcher = chokidar.watch(path.resolve('../'), {
      ignoreInitial: true,
      ignored: [/(^|[/\\])\../, '**/node_modules/**', '**/build/**', '**/admin/**'],
    })

    watcher.on('all', (event, path) => {
      console.log(`File ${event}: ${path}`)

      if (!preventRestart) process.send('restart')
    })

    Hentity().start({ env: 'development', forceBuildAdmin: true })
  }
}

run()
