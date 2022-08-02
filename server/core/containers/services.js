const { get, set } = require('lodash')

module.exports = () => {
  const services = {}

  return {
    get(path) {
      return get(services, path)
    },

    getAll() {
      return services
    },

    set(path, service) {
      set(services, path, service)
      return this
    },
  }
}
