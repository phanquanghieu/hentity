const { cloneDeep } = require('lodash')

module.exports = (rawModels) => {
  return cloneDeep(Object.values(rawModels))
}
