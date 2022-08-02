const { get, set } = require('lodash')

module.exports = () => {
  const controllers = {}

  return {
    get(path) {
      return get(controllers, path)
    },

    getAll() {
      return controllers
    },

    set(path, controller) {
      set(controllers, path, controller)
      return this
    },
  }
}
