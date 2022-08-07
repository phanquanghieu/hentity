const { get, set, defaults } = require('lodash')

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
      const routeType = path[0]
      Object.values(route).forEach((subRoute) => {
        subRoute.forEach((subR) => {
          defaults(subR, { auth: { strategy: routeType }, type: routeType })
        })
      })
      set(routes, path, route)
      return this
    },
  }
}
