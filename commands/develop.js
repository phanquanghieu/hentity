const cluster = require('cluster')
const chokidar = require('chokidar')

const Hentity = require('../Hentity')

module.exports = () => {
  const watchFile = () => {
    const restart = () => {
      process.send('restart')
    }

    const watcher = chokidar.watch(process.cwd(), {
      ignoreInitial: true,
      ignored: [/(^|[/\\])\../, '**/node_modules/**', '**/build/**'],
    })

    watcher
      .on('add', (path) => {
        console.log(`File created: ${path}`)
        restart()
      })
      .on('change', (path) => {
        console.log(`File changed: ${path}`)
        restart()
      })
      .on('unlink', (path) => {
        console.log(`File deleted: ${path}`)
        restart()
      })
  }

  if (cluster.isMaster) {
    cluster.on('message', (worker, message) => {
      switch (message) {
        case 'restart':
          console.log('Server restarting...')
          worker.send('kill')
          break
        case 'killed':
          cluster.fork()
          break
      }
    })

    cluster.fork()
  } else {
    process.on('message', (message) => {
      if (message === 'kill') {
        process.send('killed')
        process.exit()
      }
    })

    watchFile()

    Hentity().start({ env: 'development', forceBuildAdmin: true })
  }
}
