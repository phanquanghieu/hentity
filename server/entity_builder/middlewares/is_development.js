module.exports = (req, res, next) => {
  if (process.env.ENV === 'development') {
    return next()
  }
  return res.badRequest('Action only allowed in development mode')
}
