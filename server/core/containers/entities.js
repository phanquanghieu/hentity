const { has } = require('lodash')

module.exports = () => {
  const entities = {}

  return {
    get(entityName) {
      return entities[entityName]
    },

    getAll() {
      return entities
    },

    set(_entities) {
      for (const [entityName, entity] of Object.entries(_entities)) {
        if (has(entityName, entities)) {
          throw new Error(`Entity already exist: ${entityName}`)
        }
        entities[entityName] = entity
      }
      return this
    },
  }
}
