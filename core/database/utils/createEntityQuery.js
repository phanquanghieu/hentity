const { set, cloneDeep } = require('lodash')

module.exports = (query, models) => (modelName) => {
  const model = models[modelName]
  if (!model) throw Error(`Entity not exist: ${modelName}`)

  const coreQuery = query[modelName]
  return {
    async find(params = {}) {
      let options = cloneDeep(params)

      return await coreQuery.findAll(options)
    },

    async findOne(id, params = {}) {
      let options = cloneDeep(params)
      set(options, 'where.id', id)
      return await coreQuery.findOne(options)
    },

    async count(params) {
      let options = cloneDeep(params)
      return await coreQuery.count(options)
    },

    async create(data, params = {}) {
      let options = cloneDeep(params)
      return await coreQuery.create(data, options)
    },

    async update(id, data, params = {}) {
      let options = cloneDeep(params)
      set(options, 'where.id', id)
      await coreQuery.update(data, options)
      return await this.findOne(id)
    },

    async upsert(data, params = {}) {
      return (await coreQuery.upsert(data, params))[0]
    },

    async delete(id, params = {}) {
      let options = cloneDeep(params)
      set(options, 'where.id', id)
      return await coreQuery.destroy(options)
    },
  }
}
