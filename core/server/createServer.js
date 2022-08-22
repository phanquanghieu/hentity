const express = require('express')
const path = require('path')
const mountRoutes = require('./mountRoutes')
const coreMiddlewares = require('../middlewares')
const addResponseMethods = require('./utils/addResponseMethods')

module.exports = (hentity) => {
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

      const adminPath = hentity.configs.admin.adminPath
      const buildPath = path.resolve(hentity.dirs.cwd, 'build')
      app.use(adminPath, express.static(buildPath))
      app.get(`${adminPath}/*`, (_, res) => {
        res.sendFile(path.resolve(buildPath, 'index.html'))
      })

      // app.get('/admin_api/api', (req, res) => {
      //   console.log(req)
      //   const p = hentity.services.admin.core.jwt.verify()

      //   res.ok(hentity.routes.admin)
      // })

      mountRoutes(app, hentity)

      app.use(coreMiddlewares.errorHandler)
    },

    listen() {
      // console.log(hentity.services.admin.core)
      // console.log(hentity.all.routesContainer.api)
      // console.log(hentity.all.controllersContainer.api)
      // console.log(process)
      return app.listen(9322, () => console.log('Running on\nhttp://localhost:9322/api'))
    },
  }
}
