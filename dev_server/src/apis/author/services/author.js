module.exports = {
  async find(query) {
    return await hentity.entityQuery('author').find(query)
  },

  async findOne(id, query) {
    return await hentity.entityQuery('author').findOne(id, query)
  },

  async create(data) {
    return await hentity.entityQuery('author').create(data)
  },

  async update(id, data) {
    return await hentity.entityQuery('author').update(id, data)
  },

  async delete(id) {
    return await hentity.entityQuery('author').delete(id)
  },
}
