const { cloneDeep } = require('lodash')

module.exports = (rawModels) => {
  return cloneDeep(rawModels)
}
