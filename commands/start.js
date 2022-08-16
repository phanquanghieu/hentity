const Hentity = require('../Hentity')
const { build } = require('../admin')

module.exports = async () => {
  // const cwd = process.cwd()
  // await build({ cwd })
  return Hentity().start()
}
