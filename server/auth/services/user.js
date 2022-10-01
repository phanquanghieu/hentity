module.exports = {
  async find(query) {
    return await hentity.entityQuery('user').find(query)
  },

  async findOne(id, query) {
    return await hentity.entityQuery('user').findOne(id, query)
  },

  async create(data) {
    return await hentity.entityQuery('user').create(data)
  },

  async update(id, data) {
    return await hentity.entityQuery('user').update(id, data)
  },

  async delete(id) {
    return await hentity.entityQuery('user').delete(id)
  },
}
