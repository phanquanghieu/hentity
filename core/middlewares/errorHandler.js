module.exports = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  res.internalServerError('Internal Server Error', err.stack)
}
