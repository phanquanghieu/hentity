const { get, set } = require('lodash')

module.exports = () => {
  const routes = {}

  return {
    get(path) {
      return get(routes, path)
    },

    getAll() {
      return routes
    },

    set(path, route) {
      set(routes, path, route)
      return this
    },
  }
}
