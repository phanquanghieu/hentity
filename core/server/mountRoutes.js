const { Router } = require('express')
const { toLower, trim } = require('lodash')
const coreMiddlewares = require('../middlewares')

module.exports = (app, hentity) => {
  const routes = hentity.routes

  app.use('/admin_api', createRouter(routes.admin, hentity))
  app.use('/api', createRouter(routes.api, hentity))
}

const createRouter = (routes = {}, hentity) => {
  const router = Router()

  Object.values(routes).forEach((routesFiles) => {
    Object.values(routesFiles).forEach((routesFile) => {
      routesFile.forEach((route) => {
        mountRoute(router, route, hentity)
      })
    })
  })

  return router
}

const mountRoute = (router, route, hentity) => {
  const method = toLower(trim(route.method))
  const path = route.path

  const middlewares = route.middlewares.map((middleware) => hentity.middleware(middleware))
  const handler = hentity.controller(route.handler)

  router[method](
    path,
    coreMiddlewares.routeInfo(route),
    coreMiddlewares.authentication,
    coreMiddlewares.authorization,
    coreMiddlewares.query,
    ...middlewares,
    handlerCatcher(handler)
  )
}

const handlerCatcher = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next)
  } catch (error) {
    console.log(error)
    res.badRequest(error.message)
  }
}
