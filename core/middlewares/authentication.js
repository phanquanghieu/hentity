const { get, set } = require('lodash')

module.exports = async (req, res, next) => {
  const strategy = get(req, 'state.route.authStrategy')
  if (!strategy) return next()

  const { isInvalidToken, user } = await hentity.services.admin.core.auth[
    strategy
  ].authenticationCheck(req)
  if (isInvalidToken) return res.unauthorized('Unauthorized')

  set(req, 'state.user', user)
  next()
}
