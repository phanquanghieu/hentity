const { get, set } = require('lodash')

module.exports = () => {
  const controllers = {}

  return {
    get(path) {
      const controller = get(controllers, path)
      if (!controller) {
        throw Error(`Controller not found: ${path}`)
      }
      return controller
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
