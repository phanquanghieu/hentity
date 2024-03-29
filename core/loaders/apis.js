const path = require('path')
const fse = require('fs-extra')
const loadResourceFolder = require('./utils/loadResourceFolder')
const { string } = require('../utils')

module.exports = async (h) => {
  try {
    const apis = {}
    const apisFolders = await fse.readdir(h.dirs.apis, { withFileTypes: true })

    for (const apisFolder of apisFolders) {
      if (!apisFolder.isDirectory()) continue
      const apiName = apisFolder.name

      if (!string.isSnakeCase(apiName)) {
        throw new Error(`Entity name is not SnakeCase: ${apiName}`)
      }

      const apiFolderData = await loadResourceFolder(path.join(h.dirs.apis, apiName))

      if (apiFolderData) {
        apis[apiName] = apiFolderData
      }
    }
    h.apisContainer.set(apis)
  } catch (error) {
    console.error(error)
  }
}
