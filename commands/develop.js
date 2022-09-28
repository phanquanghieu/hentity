const cluster = require('cluster')
const chokidar = require('chokidar')

const Hentity = require('../Hentity')

module.exports = () => {
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

    const watcher = chokidar.watch(process.cwd(), {
      ignoreInitial: true,
      ignored: [/(^|[/\\])\../, '**/node_modules/**', '**/build/**'],
    })

    watcher.on('all', (event, path) => {
      console.log(`\nFile ${event}: ${path}`)

      if (!preventRestart) process.send('restart')
    })

    Hentity().start({ env: 'development', forceBuildAdmin: true })
  }
  // const watchFile = () => {
  //   const restart = () => {
  //     process.send('restart')
  //   }

  //   const watcher = chokidar.watch(process.cwd(), {
  //     ignoreInitial: true,
  //     ignored: [/(^|[/\\])\../, '**/node_modules/**', '**/build/**'],
  //   })

  //   watcher.on('all', (event, path) => {
  //     console.log(`File ${event}: ${path}`)
  //     restart()
  //   })
  // }

  // if (cluster.isMaster) {
  //   cluster.on('message', (worker, message) => {
  //     switch (message) {
  //       case 'restart':
  //         console.log('Server restarting...')
  //         worker.send('kill')
  //         break
  //       case 'killed':
  //         cluster.fork()
  //         break
  //     }
  //   })

  //   cluster.fork()
  // } else {
  //   process.on('message', (message) => {
  //     if (message === 'kill') {
  //       process.send('killed')
  //       process.exit()
  //     }
  //   })

  //   watchFile()

  //   Hentity().start({ env: 'development', forceBuildAdmin: true })
  // }
}
