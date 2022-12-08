const { min, has, get, set, isNil } = require('lodash')

module.exports = (req, res, next) => {
  const { defaultLimit, maxLimit } = h.configs.api

  const limit = parseInt(req.query.pageSize || req.query.limit) || defaultLimit
  req.query.limit = min([limit, maxLimit])

  const page = parseInt(req.query.page)
  req.query.offset = page && page > 0 ? (page - 1) * limit : parseInt(req.query.offset || 0)

  if (!has(req.query, 'include')) set(req.query, 'include.all', true)

  const includeAll = get(req.query, 'include.all')
  if (!isNil(includeAll)) set(req.query, 'include.all', Boolean(includeAll))

  const includeNested = get(req.query, 'include.nested')
  if (!isNil(includeNested)) set(req.query, 'include.nested', Boolean(includeNested))

  next()
}
