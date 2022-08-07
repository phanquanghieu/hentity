const path = require('path')
const fse = require('fs-extra')
const { string } = require('../../utils')

const loadJsFile = (file) => {
  try {
    return require(file)
  } catch (error) {
    throw new Error(`Could not load js config file ${file}: ${error.message}`)
  }
}

const loadJSONFile = async (file) => {
  try {
    return await fse.readJson(file)
  } catch (error) {
    throw new Error(`Could not load json config file ${file}: ${error.message}`)
  }
}

module.exports = async (file) => {
  const ext = path.extname(file)
  const base = path.basename(file, ext)

  if (!['.js', '.json'].includes(ext)) return null

  if (!string.isSnakeCase(base)) {
    throw new Error(`File name is not SnakeCase: ${file}`)
  }

  switch (ext) {
    case '.js':
      return loadJsFile(file)
    case '.json':
      return await loadJSONFile(file)
    default:
      return null
  }
}
