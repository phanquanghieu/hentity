module.exports = {
  async find(query) {
    return await hentity.entityQuery('abc').find(query)
  },

  async findOne(id) {
    return await hentity.entityQuery('abc').findOne(id)
  },

  async create(data) {
    return await hentity.entityQuery('abc').create(data)
  },

  async update(id, data) {
    return await hentity.entityQuery('abc').update(id, data)
  },

  async delete(id) {
    return await hentity.entityQuery('abc').delete(id)
  },
}
