const express = require('express')
const path = require('path')
const mountRoutes = require('./mountRoutes')
const coreMiddlewares = require('../middlewares')
const addResponseMethods = require('./utils/addResponseMethods')

module.exports = (h) => {
  const app = express()

  addResponseMethods(app)

  process.on('uncaughtException', (err, origin) => {
    console.error(err, origin)
  })

  return {
    // app,

    mount() {
      app.use(coreMiddlewares.logRequest)
      app.use(coreMiddlewares.cors())
      app.use(express.json())
      app.use(express.urlencoded({ extended: true }))

      const adminPath = h.configs.admin.adminPath
      const buildPath = path.resolve(h.dirs.cwd, 'build')
      app.use(adminPath, express.static(buildPath))
      app.get(`${adminPath}/*`, (_, res) => {
        res.sendFile(path.resolve(buildPath, 'index.html'))
      })
      app.get('/', (_, res) => {
        res.redirect('/admin')
      })

      mountRoutes(app, h)

      app.use(coreMiddlewares.errorHandler)
      app.use(coreMiddlewares.notFound)
    },

    listen() {
      const port = h.configs.server.port
      const adminPath = h.configs.admin.adminPath
      return app.listen(port, () =>
        console.log(
          `Running on\nhttp://localhost:${port}/api\nhttp://localhost:${port}${adminPath}\n\n`
        )
      )
    },
  }
}
