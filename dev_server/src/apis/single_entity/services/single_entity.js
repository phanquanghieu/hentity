module.exports = {
  async find() {
    return await hentity.entityQuery('single_entity').findOne(1)
  },

  async upsert(data) {
    return await hentity.entityQuery('single_entity').upsert({ ...data, id: 1 })
  },

  async delete() {
    return await hentity.entityQuery('single_entity').delete(1)
  },
}
