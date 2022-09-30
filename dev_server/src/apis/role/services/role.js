module.exports = {
  async find(query) {
    return await hentity.entityQuery('role').find(query)
  },

  async findOne(id, query) {
    return await hentity.entityQuery('role').findOne(id, query)
  },

  async create(data) {
    return await hentity.entityQuery('role').create(data)
  },

  async update(id, data) {
    return await hentity.entityQuery('role').update(id, data)
  },

  async delete(id) {
    return await hentity.entityQuery('role').delete(id)
  },
}
