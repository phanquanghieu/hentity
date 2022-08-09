const { DataTypes } = require('sequelize')

module.exports = async (connection, models, modelColumnCreator) => {
  try {
    for (const model of models) {
      connection.define(
        model.tableName,
        Object.keys(model.attributes).reduce((acc, cur) => {
          const attribute = model.attributes[cur]
          if (modelColumnCreator[attribute.type]) {
            return {
              ...acc,
              [cur]: modelColumnCreator[attribute.type](attribute),
            }
          }
          return acc
        }, {})
      )
    }

    // const Movie = connection.define('movies', { name: DataTypes.STRING })
    // const Actor = connection.define('actors', { name: DataTypes.STRING })
    // Movie.hasOne(Actor)
    // Actor.belongsTo(Movie)

    await connection.sync({ alter: true })

    console.log('All models were synchronized successfully')
  } catch (error) {
    console.error(error.message)
  }
}
