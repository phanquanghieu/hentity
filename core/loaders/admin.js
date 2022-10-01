const path = require('path')
const loadResourceFolder = require('./utils/loadResourceFolder')

const featureNames = ['core', 'entity_builder', 'entity_manager', 'upload', 'auth']

module.exports = async (h) => {
  const adminFeatures = {}

  for (const featureName of featureNames) {
    const resourceFolderData = await loadResourceFolder(
      path.join(h.dirname, 'server', featureName)
    )

    if (resourceFolderData) {
      adminFeatures[featureName] = resourceFolderData
    }
  }

  for (const [featureName, adminFeature] of Object.entries(adminFeatures)) {
    if (adminFeature.entities) h.entitiesContainer.set(adminFeature.entities)
    if (adminFeature.routes)
      h.routesContainer.set(['admin', featureName], adminFeature.routes)
    if (adminFeature.middlewares)
      h.middlewaresContainer.set(['admin', featureName], adminFeature.middlewares)
    if (adminFeature.controllers)
      h.controllersContainer.set(['admin', featureName], adminFeature.controllers)
    if (adminFeature.services)
      h.servicesContainer.set(['admin', featureName], adminFeature.services)
  }
}
