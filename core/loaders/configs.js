const dotenv = require('dotenv')
const loadFolder = require('./utils/loadFolder')

dotenv.config({ path: process.env.ENV_PATH })

module.exports = async (h) => {
  const configs = await loadFolder(h.dirs.configs)
  h.configs = configs
}
