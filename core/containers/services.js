const { get, set } = require('lodash')

module.exports = () => {
  const services = {}

  return {
    get(path) {
      const service = get(services, path)
      if (!service) {
        throw Error(`Service not found: ${path}`)
      }
      return service
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
