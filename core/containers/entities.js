const { has } = require('lodash')

module.exports = () => {
  let entities = {}

  return {
    get(entityName) {
      return entities[entityName]
    },

    getAll() {
      return entities
    },

    set(_entities) {
      Object.keys(_entities).forEach((entityName) => {
        if (has(entities, entityName)) {
          throw new Error(`Entity already exist: ${entityName}`)
        }
        entities[entityName] = _entities[entityName]
      })
    },
  }
}
