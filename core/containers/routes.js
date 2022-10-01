const { get, set, defaults, pickBy } = require('lodash')

module.exports = () => {
  let routes = {}
  let routesMap = null

  return {
    get(path) {
      return get(routes, path)
    },

    getAll() {
      return routes
    },

    getRoutesMap() {
      if (!routesMap) {
        routesMap = {}
        Object.keys(routes).forEach((routeTypeKey) => {
          const routeType = routes[routeTypeKey]
          Object.keys(routeType).forEach((routeFolderKey) => {
            const routeFolder = routeType[routeFolderKey]
            Object.keys(routeFolder).forEach((routeFileKey) => {
              const routeFile = routeFolder[routeFileKey]
              Object.keys(routeFile).forEach((actionKey) => {
                const key = `${routeTypeKey}.${routeFolderKey}.${routeFileKey}.${actionKey}`
                routesMap[key] = routeFile[actionKey]
              })
            })
          })
        })
      }
      return routesMap
    },

    getRoutesMapByType(routeType) {
      if (!routesMap) this.getRoutesMap()
      return pickBy(routesMap, (_, k) => k.startsWith(routeType))
    },

    set(path, routeFolder) {
      Object.keys(routeFolder).forEach((routeFileKey) => {
        const routeFile = routeFolder[routeFileKey]
        Object.keys(routeFile).forEach((actionKey) => {
          let action = routeFile[actionKey]
          let [routeType, routeFolderKey] = path
          defaults(action, { authStrategy: routeType, type: routeType, name: actionKey })
          set(routes, [action.type, routeFolderKey, routeFileKey, actionKey], action)
        })
      })
    },
  }
}
