module.exports = {
  async find(query) {
    return await hentity.entityQuery('category').find(query)
  },

  async findOne(id) {
    return await hentity.entityQuery('category').findOne(id)
  },

  async create(data) {
    return await hentity.entityQuery('category').create(data)
  },

  async update(id, data) {
    return await hentity.entityQuery('category').update(id, data)
  },

  async delete(id) {
    return await hentity.entityQuery('category').delete(id)
  },
}
