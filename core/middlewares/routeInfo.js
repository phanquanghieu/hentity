const { set } = require('lodash')

module.exports = (routeInfo) => (req, res, next) => {
  set(req, 'state.route', routeInfo)
  next()
}
