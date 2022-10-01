const { Router } = require('express')
const { toLower, trim } = require('lodash')
const coreMiddlewares = require('../middlewares')

module.exports = (app, h) => {
  const routesAdmin = h.routesContainer.getRoutesMapByType('admin')
  const routesApi = h.routesContainer.getRoutesMapByType('api')

  app.use('/admin_api', createRouter(routesAdmin, h))
  app.use('/api', createRouter(routesApi, h))
}

const createRouter = (routes = {}, h) => {
  const router = Router()
  Object.keys(routes).forEach((action) => {
    mountRoute(router, { action, ...routes[action] }, h)
  })

  return router
}

const mountRoute = (router, route, h) => {
  const method = toLower(trim(route.method))
  const path = route.path

  const middlewares = route.middlewares.map((middleware) => h.middleware(middleware))
  const handler = h.controller(route.handler)

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
