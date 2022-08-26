const fse = require('fs-extra')
const { resolve } = require('path')
const { saveApiFiles, createDataApiFiles } = require('../utils')

module.exports = {
  async createApiFile(entity) {
    const { singularName } = entity
    const apiPath = resolve(hentity.dirs.apis, singularName)
    
    await Promise.all([
      saveApiFiles(apiPath, 'entities', singularName, entity),
      saveApiFiles(apiPath, 'routes', singularName, createDataApiFiles('routes', entity)),
      saveApiFiles(apiPath, 'controllers', singularName, createDataApiFiles('controllers', entity)),
      saveApiFiles(apiPath, 'services', singularName, createDataApiFiles('services', entity)),
      saveApiFiles(apiPath, 'middlewares'),
    ])
  },

  async updateApiFile(singularName, entity) {
    const apiPath = resolve(hentity.dirs.apis, singularName)

    await saveApiFiles(apiPath, 'entities', singularName, entity)
  },
  
  async deleteApiFile(singularName) {
    const apiPath = resolve(hentity.dirs.apis, singularName)
    await fse.remove(apiPath)
    await fse.appendFile(resolve(hentity.dirname, 'Hentity.js'), ' ')
  },
}
