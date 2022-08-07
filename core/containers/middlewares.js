const { get, set } = require('lodash')

module.exports = () => {
  const middlewares = {}

  return {
    get(path) {
      return get(middlewares, path)
    },

    getAll() {
      return middlewares
    },

    set(path, middleware) {
      set(middlewares, path, middleware)
      return this
    },
  }
}
