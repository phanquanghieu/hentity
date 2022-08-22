module.exports = {
  async find() {
    return await hentity.entityQuery('book').findOne(1)
  },

  async upsert(data) {
    return await hentity.entityQuery('book').upsert({ ...data, id: 1 })
  },

  async delete() {
    return await hentity.entityQuery('book').delete(1)
  },
}
