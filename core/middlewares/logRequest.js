module.exports = (req, res, next) => {
  const startTime = new Date()

  next()

  const time = new Date().getTime() - startTime.getTime()
  const startTimeView = startTime.toISOString().replace('T', '  ').replace('Z', '')
  console.log(`[${startTimeView}] ${req.method} ${req.originalUrl} (${time}ms)`)
}
