module.exports = (hentity) => {
  const apis = {}

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
        if (api.entities) hentity.entitiesContainer.set(api.entities)
        if (api.controllers) hentity.controllersContainer.set(['api', apiName], api.controllers)
        if (api.middlewares) hentity.middlewaresContainer.set(['api', apiName], api.middlewares)
        if (api.routes) hentity.routesContainer.set(['api', apiName], api.routes)
        if (api.services) hentity.servicesContainer.set(['api', apiName], api.services)
      }
    },
  }
}
