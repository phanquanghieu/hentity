module.exports = (hentity) => async (err, req, res, next) => {
  console.log(err)
  res.internalServerError('Internal Server Error', err.stack)
}
