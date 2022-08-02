const path = require('path')
const loadApiFolder = require('./utils/loadApiFolder')

const featureNames = ['entity_builder', 'entity_manager', 'upload']

module.exports = async (hentity) => {
  const adminFeatures = {}

  for (const featureName of featureNames) {
    const apiFolderData = await loadApiFolder(path.join(hentity.dirname, 'server', featureName))

    if (apiFolderData) {
      adminFeatures[featureName] = apiFolderData
    }
  }

  for (const [featureName, adminFeature] of Object.entries(adminFeatures)) {
    if (adminFeature.entities) hentity.entitiesContainer.set(adminFeature.entities)
    if (adminFeature.controllers)
      hentity.controllersContainer.set(['admin', featureName], adminFeature.controllers)
    if (adminFeature.middlewares)
      hentity.middlewaresContainer.set(['admin', featureName], adminFeature.middlewares)
    if (adminFeature.routes)
      hentity.routesContainer.set(['admin', featureName], adminFeature.routes)
    if (adminFeature.services)
      hentity.servicesContainer.set(['admin', featureName], adminFeature.services)
  }
}
