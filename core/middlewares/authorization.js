const { get } = require('lodash')

module.exports = (req, res, next) => {
  const route = get(req, 'state.route')
  if (!route.auth) return next()

  const strategy = get(route, 'auth.strategy')
  const isAuthorized = hentity.services.admin.core.auth[strategy].authorizationCheck(req)
  // if (!isAuthorized) return res.forbidden()

  next()
}
