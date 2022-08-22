const { get, set } = require('lodash')

module.exports = (req, res, next) => {
  const route = get(req, 'state.route')

  if (!route.auth) return next()

  const strategy = get(route, 'auth.strategy')
  // const { isAuthenticated } = hentity.services.admin.core.auth[strategy].authenticationCheck(req)
  // if (!isAuthenticated) return res.unauthorized('Missing or invalid credentials')

  set(req, 'state.isAuthenticated', true)
  next()
}
