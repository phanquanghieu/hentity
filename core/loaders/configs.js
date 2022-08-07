const dotenv = require('dotenv')
const loadFolder = require('./utils/loadFolder')

dotenv.config({ path: process.env.ENV_PATH })

module.exports = async (hentity) => {
  const configs = await loadFolder(hentity.dirs.configs)
  hentity.configs = configs
}
