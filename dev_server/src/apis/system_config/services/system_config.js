module.exports = {
  async find() {
    return await hentity.entityQuery('system_config').findOne(1)
  },

  async upsert(data) {
    return await hentity.entityQuery('system_config').upsert({ ...data, id: 1 })
  },

  async delete() {
    return await hentity.entityQuery('system_config').delete(1)
  },
}
