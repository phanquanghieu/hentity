const { min } = require('lodash')

module.exports = (req, res, next) => {
  const { defaultLimit, maxLimit } = hentity.configs.api
  const page = parseInt(req.query.page) || 1
  const pageSize = parseInt(req.query.pageSize) || defaultLimit
  req.query.limit = min([pageSize, maxLimit])
  req.query.offset = (page - 1) * req.query.limit
  next()
}
