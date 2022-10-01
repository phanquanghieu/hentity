const { Op, Sequelize } = require('sequelize')

module.exports = (connectionString) => {
  const connection = new Sequelize(connectionString, {
    define: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    logging: false,
    operatorsAliases: {
      $and: Op.and,
      $or: Op.or,
      $eq: Op.eq,
      $ne: Op.ne,
      $is: Op.is,
      $not: Op.not,
      $or: Op.or,
      $col: Op.col,
      $gt: Op.gt,
      $gte: Op.gte,
      $lt: Op.lt,
      $lte: Op.lte,
      $between: Op.between,
      $notBetween: Op.notBetween,
      $all: Op.all,
      $in: Op.in,
      $notIn: Op.notIn,
      $like: Op.like,
      $notLike: Op.notLike,
      $startsWith: Op.startsWith,
      $endsWith: Op.endsWith,
      $substring: Op.substring,
      $iLike: Op.iLike,
      $notILike: Op.notILike,
      $regexp: Op.regexp,
      $notRegexp: Op.notRegexp,
      $iRegexp: Op.iRegexp,
      $notIRegexp: Op.notIRegexp,
      $any: Op.any,
      $match: Op.match,
    },
  })

  connection.query = function () {
    return Sequelize.prototype.query.apply(this, arguments).catch((err) => {
      console.log(err)
      throw err?.original?.message || err
    })
  }

  return connection
}
