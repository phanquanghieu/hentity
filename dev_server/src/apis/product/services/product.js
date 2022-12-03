module.exports = {
  async find(query) {
    return await hentity.entityQuery('product').find(query)
  },

  async findOne(id, query) {
    return await hentity.entityQuery('product').findOne(id, query)
  },

  async create(data) {
    return await hentity.entityQuery('product').create(data)
  },

  async update(id, data) {
    return await hentity.entityQuery('product').update(id, data)
  },

  async delete(id) {
    return await hentity.entityQuery('product').delete(id)
  },
}
