const { upperFirst } = require('lodash')

const calcJunctionModelName = (model1, model2) =>
  model1 > model2 ? `__${model1}_${model2}` : `__${model2}_${model1}`

const calcForeignKey = (name) => `__${name}_id`

const calcMethodName = (method, name) => `${method}${upperFirst(name)}`

module.exports = {
  calcJunctionModelName,
  calcForeignKey,
  calcMethodName,
}
