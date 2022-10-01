const loadFolder = require('./utils/loadFolder')

module.exports = async (h) => {
  const globalMiddlewares = await loadFolder(h.dirs.middlewares)

  h.middlewaresContainer.set('global', globalMiddlewares)
}
