const { set, cloneDeep, has } = require('lodash')
const { calcMethodName } = require('../../utils/modelName')

module.exports = (dbModels, models) => (modelName) => {
  const model = models[modelName]
  if (!model) throw Error(`Entity not exist: ${modelName}`)

  const dbModel = dbModels[modelName]
  return {
    async find(params = {}) {
      let results = await dbModel.findAll(params)
      console.log(results)
      return results
    },

    async findOne(id, params = {}) {
      let options = cloneDeep(params)
      set(options, 'where.id', id)
      return await dbModel.findOne(options)
    },

    async count(params) {
      return await dbModel.count(params)
    },

    async create(data) {
      const instance = await dbModel.create(data)

      await setRelation(model, instance, data)

      return true
    },

    async update(id, data) {
      const instance = await this.findOne(id)
      if (!instance) throw Error('Data not found')

      await instance.update(data)

      await setRelation(model, instance, data)

      return true
    },

    async upsert(data) {
      return (await dbModel.upsert(data))[0]
    },

    async delete(id) {
      return Boolean(await dbModel.destroy({ where: { id } }))
    },
  }
}

const setRelation = async (model, instance, data) => {
  const attributesRelation = model.attributes.filter((attribute) => attribute.type === 'relation')
  for (let attributeRelation of attributesRelation) {
    if (has(data, attributeRelation.columnName)) {
      await instance[calcMethodName('set', attributeRelation.columnName)](
        data[attributeRelation.columnName]
      )
    }
  }
}
