const path = require('path')
const fse = require('fs-extra')
const loadApiFolder = require('./utils/loadApiFolder')
const { string } = require('../../utils')

module.exports = async (hentity) => {
  const apis = {}
  const apisFolders = await fse.readdir(hentity.dirs.apis, { withFileTypes: true })

  for (const apisFolder of apisFolders) {
    if (!apisFolder.isDirectory()) continue
    const apiName = apisFolder.name

    if (!string.isSnakeCase(apiName)) {
      throw new Error(`Api name is not SnakeCase: ${apiName}`)
    }

    const apiFolderData = await loadApiFolder(path.join(hentity.dirs.apis, apiName))

    if (apiFolderData) {
      apis[apiName] = apiFolderData
    }
  }
  console.log(apis)
  hentity.apisContainer.set(apis)
}
