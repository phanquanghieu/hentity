const path = require('path')
const { isEmpty } = require('lodash')
const loadFolder = require('./loadFolder')

const features = ['entity_builder', 'entity_manager', 'upload']

module.exports = async (folderName, hentity) => {
  let adminFolderData = {}
  for (const feature of features) {
    const folderData = await loadFolder(path.join(hentity.dirname, 'server', feature))

    if (folderData) {
      adminFolderData[feature] = folderData
    }
  }
  return isEmpty(adminFolderData) ? null : adminFolderData
}
