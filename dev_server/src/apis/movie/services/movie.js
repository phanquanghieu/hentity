module.exports = {
  async find(query) {
    return await hentity.entityQuery('movie').find(query)
  },

  async findOne(id) {
    return await hentity.entityQuery('movie').findOne(id)
  },

  async create(data) {
    return await hentity.entityQuery('movie').create(data)
  },

  async update(id, data) {
    return await hentity.entityQuery('movie').update(id, data)
  },

  async delete(id) {
    return await hentity.entityQuery('movie').delete(id)
  },
}
