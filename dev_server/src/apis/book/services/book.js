module.exports = {
  async find(query) {
    return await hentity.entityQuery('book').find(query)
  },

  async findOne(id) {
    return await hentity.entityQuery('book').findOne(id)
  },

  async create(data) {
    return await hentity.entityQuery('book').create(data)
  },

  async update(id, data) {
    return await hentity.entityQuery('book').update(id, data)
  },

  async delete(id) {
    return await hentity.entityQuery('book').delete(id)
  },
}
