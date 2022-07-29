const Hentity = require('./Hentity')

module.exports = (options) => {
  const hentity = new Hentity(options)
  global.hentity = hentity
  return hentity
}
