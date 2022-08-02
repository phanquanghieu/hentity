const path = require('path')
const { isEmpty } = require('lodash')
const loadFolder = require('./loadFolder')

const subFolders = ['entities', 'routes', 'controllers', 'services', 'middlewares']

module.exports = async (folderDir) => {
  let apiFolderData = {}
  for (const subFolder of subFolders) {
    const folderData = await loadFolder(path.join(folderDir, subFolder))
    if (!folderData) continue
    apiFolderData[subFolder] = folderData
  }
  return isEmpty(apiFolderData) ? null : apiFolderData
}
