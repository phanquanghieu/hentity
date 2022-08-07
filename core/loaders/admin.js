const path = require('path')
const loadResourceFolder = require('./utils/loadResourceFolder')

const featureNames = ['core', 'entity_builder', 'entity_manager', 'upload']

module.exports = async (hentity) => {
  const adminFeatures = {}

  for (const featureName of featureNames) {
    const resourceFolderData = await loadResourceFolder(
      path.join(hentity.dirname, 'server', featureName)
    )

    if (resourceFolderData) {
      adminFeatures[featureName] = resourceFolderData
    }
  }

  for (const [featureName, adminFeature] of Object.entries(adminFeatures)) {
    if (adminFeature.entities) hentity.entitiesContainer.set(adminFeature.entities)
    if (adminFeature.routes)
      hentity.routesContainer.set(['admin', featureName], adminFeature.routes)
    if (adminFeature.middlewares)
      hentity.middlewaresContainer.set(['admin', featureName], adminFeature.middlewares)
    if (adminFeature.controllers)
      hentity.controllersContainer.set(['admin', featureName], adminFeature.controllers)
    if (adminFeature.services)
      hentity.servicesContainer.set(['admin', featureName], adminFeature.services)
  }
}
