const { Sequelize, DataTypes, Op } = require('sequelize')
const { createModels, transformModels, createModelColumn, connectionOptions } = require('./utils')

module.exports = async (options) => {
  const modelColumnCreator = createModelColumn(options.configs.admin)

  const models = transformModels(options.models)
  console.log(models)
  const connection = new Sequelize(options.configs.database.connectionString, connectionOptions)

  await createModels(connection, models, modelColumnCreator)

  return {
    get connection() {
      return connection
    },
    get models() {
      return connection.models
    },
  }
}
