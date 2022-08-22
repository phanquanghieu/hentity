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

  const query = connection.models
  const entityQuery = createEntityQuery(query, models)

  return {
    connection,
    query,
    entityQuery,
  }
}
