module.exports = (h) => {
  let apis = {}

  return {
    get(apiName) {
      return apis[apiName]
    },
    getAll() {
      return apis
    },

    set(_apis) {
      for (const [apiName, api] of Object.entries(_apis)) {
        apis[apiName] = api
        if (api.entities) h.entitiesContainer.set(api.entities)
        if (api.routes) h.routesContainer.set(['api', apiName], api.routes)
        if (api.middlewares) h.middlewaresContainer.set(['api', apiName], api.middlewares)
        if (api.controllers) h.controllersContainer.set(['api', apiName], api.controllers)
        if (api.services) h.servicesContainer.set(['api', apiName], api.services)
      }
    },
  }
}
