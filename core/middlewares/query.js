const { min, has, get, set } = require('lodash')

module.exports = (req, res, next) => {
  const { defaultLimit, maxLimit } = hentity.configs.api

  const limit = parseInt(req.query.pageSize || req.query.limit) || defaultLimit
  req.query.limit = min([limit, maxLimit])

  const page = parseInt(req.query.page)
  req.query.offset = page && page > 0 ? (page - 1) * limit : parseInt(req.query.offset || 0)

  if (!has(req.query, 'include')) set(req.query, 'include.all', true)
  next()
}
