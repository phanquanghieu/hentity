const { DataTypes } = require('sequelize')

module.exports = async (connection, models, modelColumnCreator) => {
  try {
    Object.values(models).map((model) => {
      connection.define(
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

    // const book = connection.define('book', {
    //   name: { type: DataTypes.STRING, allowNull: false },
    //   price: DataTypes.INTEGER,
    // })
    // const author = connection.define('author', { name: DataTypes.STRING })
    // book.hasOne(author, { foreignKey: 'book_id' })
    // author.belongsTo(book, { foreignKey: 'book_id' })

    await connection.sync({ alter: true })

    // const bookI = await connection.models.book.create({ name: 'book1', price: 1000 })
    // await connection.models.book.create({ name: 'book2', price: 2000 })
    // await connection.models.book.create({ name: 'book3', price: 3000 })
    // const authorI = await connection.models.author.create(
    //   {
    //     name: 'author1',
    //     book: { name: 'book4' },
    //   },
    //   { include: 'book' }
    // )
    // await connection.models.author.create({ name: 'author2', book: 1 }, { include: 'book' })

    // authorI.setBook(bookI)
    // await connection.models.author.destroy({ where: { id: 1 } })
    // console.log(await authorI.getBook())
    // console.log(await bookI.setAuthor(authorI))
    // console.log(JSON.parse(JSON.stringify(await connection.models.author.findAll({ include: 'book' }))))
    console.log('All models were synchronized successfully')
  } catch (error) {
    console.error(error)
  }
}
