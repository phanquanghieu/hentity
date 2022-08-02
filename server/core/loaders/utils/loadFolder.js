const path = require('path')
const fse = require('fs-extra')
const { isEmpty } = require('lodash')
const loadFile = require('./loadFile')

module.exports = async (folderDir) => {
  if (!fse.pathExistsSync(folderDir)) return null

  let folderData = {}
  const files = await fse.readdir(folderDir, { withFileTypes: true })

  for (const file of files) {
    if (!file.isFile()) continue

    const base = path.basename(file.name, path.extname(file.name))

    const fileData = await loadFile(path.resolve(folderDir, file.name))
    if (fileData) folderData[base] = fileData
  }

  return isEmpty(folderData) ? null : folderData
}
