const loadFolder = require('./utils/loadFolder')

module.exports = async (hentity) => {
  const globalMiddlewares = await loadFolder(hentity.dirs.middlewares)

  hentity.middlewaresContainer.set('global', globalMiddlewares)
}
