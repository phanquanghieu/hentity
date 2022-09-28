const { DataTypes } = require('sequelize')
const { calcForeignKey, calcJunctionModelName } = require('../../utils/modelName')

module.exports = async (connection, models, modelColumnCreator) => {
  try {
    let dbModels = {}
    Object.values(models).forEach((model) => {
      dbModels[model.singularName] = connection.define(
        model.singularName,
        model.attributes.reduce((acc, attribute) => {
          if (modelColumnCreator[attribute.type]) {
            return {
              ...acc,
              [attribute.columnName]: modelColumnCreator[attribute.type](attribute),
            }
          }
          return acc
        }, {}),
        { tableName: model.tableName }
      )
    })

    Object.values(models).forEach((model) => {
      model.attributes.forEach((attribute) => {
        if (attribute.type === 'relation') {
          const options = calcAssociationOptions(model, attribute)
          dbModels[model.singularName][attribute.association](
            dbModels[attribute.reference],
            options
          )
        }
      })
    })
    // console.log(dbModels, models)

    // const book = connection.define('book', {
    //   name: { type: DataTypes.STRING, allowNull: false },
    //   price: DataTypes.INTEGER,
    // })
    // const author = connection.define('author', { name: DataTypes.STRING })
    // book.hasOne(author, { foreignKey: '__book_id', as: 'my_author' })
    // author.belongsTo(book, { foreignKey: '__book_id', as: 'my_book' })

    await connection.sync({ force: true })

    const book1 = await connection.models.book.create({ name: 'book1', price: 1000 })
    const author1 = await connection.models.author.create({ name: 'author1' })
    await connection.models.author.create({ name: 'author 2' })
    await connection.models.book.create({ name: 'book2', price: 3000 })
    // const authorI = await connection.models.author.create(
    //   {
    //     name: 'author1',
    //     my_book: { name: 'book4' },
    //   },
    //   { include: 'my_book' }
    // )
    // await connection.models.author.create({ name: 'author2', book: 1 }, { include: 'book' })

    // author1.setBooks([1,2])
    // await connection.models.author.destroy({ where: { id: 1 } })
    // console.log(Object.getPrototypeOf(book1))
    // console.log(await bookI.setAuthor(authorI))
    // console.log(JSON.parse(JSON.stringify(await connection.models.author.findAll({ include: 'book' }))))
    console.log('All models were synchronized successfully')
  } catch (error) {
    console.error(error)
  }
}

const calcAssociationOptions = (model, attribute) => {
  const modelSourceName = model.singularName
  const modelTargetName = attribute.reference
  let options = {}
  if (attribute.relation === 'oneToOne') {
    options = {
      foreignKey:
        attribute.association === 'hasOne'
          ? calcForeignKey(modelSourceName)
          : calcForeignKey(modelTargetName),
      as: attribute.columnName,
    }
  }
  if (attribute.relation === 'oneToMany') {
    options = {
      foreignKey:
        attribute.association === 'hasMany'
          ? calcForeignKey(modelSourceName)
          : calcForeignKey(modelTargetName),
      as: attribute.columnName,
    }
  }
  if (attribute.relation === 'manyToMany') {
    options = {
      through: calcJunctionModelName(modelSourceName, modelTargetName),
      foreignKey: calcForeignKey(modelSourceName),
      otherKey: calcForeignKey(modelTargetName),
      as: attribute.columnName,
      timestamps: false,
    }
  }
  return options
}
