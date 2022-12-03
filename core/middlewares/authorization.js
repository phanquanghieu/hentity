const { get } = require('lodash')

module.exports = async (req, res, next) => {
  const strategy = get(req, 'state.route.authStrategy')
  if (!strategy) return next()

  const isAuthorized = await hentity.services.admin.core.auth[strategy].authorizationCheck(req)
  if (!isAuthorized) return res.forbidden()

  next()
}
