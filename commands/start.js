const hentity = require('../server')
const { build } = require('../admin')

module.exports = async () => {
  const cwd = process.cwd()
  await build({ cwd })
  return hentity().run()
}
