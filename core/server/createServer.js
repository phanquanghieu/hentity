const express = require('express')
const path = require('path')
const mountRoutes = require('./mountRoutes')
const coreMiddlewares = require('../middlewares')
const addResponseMethods = require('./utils/addResponseMethods')

module.exports = (hentity) => {
  const app = express()

  addResponseMethods(app)

  return {
    // app,

    mount() {
      app.use(coreMiddlewares.logRequest)

      app.use('/admin', express.static(path.resolve(hentity.dirs.cwd, 'build')))
      app.get(['/', '/admin/*'], (_, res) => {
        res.redirect('/admin')
      })
      app.get('/api', (req, res) => {
        const p = hentity.services.admin.core.jwt.verify()

        res.ok(hentity.routes.admin)
      })

      mountRoutes(app, hentity)

      app.use(coreMiddlewares.errorHandler)
    },

    listen() {
      // console.log(hentity.services.admin.core)
      // console.log(hentity.routes.admin)
      return app.listen(9322, () =>
        console.log(
          'Running on\nhttp://localhost:9322\nhttp://localhost:9322/api\nhttp://localhost:9322/admin-api'
        )
      )
    },
  }
}
