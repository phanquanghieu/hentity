const {
  createEntityQuery,
  createModelColumn,
  createModels,
  transformModels,
  createConnection,
} = require('./utils')

module.exports = async (options) => {
  const modelColumnCreator = createModelColumn()

  const models = transformModels(options.models)
  const connection = createConnection(options.configs.database.connectionString)
  await createModels(connection, models, modelColumnCreator)

  const dbModels = connection.models
  const entityQuery = createEntityQuery(dbModels, models)

  return {
    connection,
    query: dbModels,
    entityQuery,
  }
}
