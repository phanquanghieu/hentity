module.exports = {
  async find() {
    return await hentity.entityQuery('single_type').findOne(1)
  },

  async upsert(data) {
    return await hentity.entityQuery('single_type').upsert({ ...data, id: 1 })
  },

  async delete() {
    return await hentity.entityQuery('single_type').delete(1)
  },
}
