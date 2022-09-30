module.exports = {
  async find(query) {
    return await hentity.entityQuery('permission').find(query)
  },

  async findOne(id, query) {
    return await hentity.entityQuery('permission').findOne(id, query)
  },

  async create(data) {
    return await hentity.entityQuery('permission').create(data)
  },

  async update(id, data) {
    return await hentity.entityQuery('permission').update(id, data)
  },

  async delete(id) {
    return await hentity.entityQuery('permission').delete(id)
  },
}
