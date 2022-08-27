module.exports = {
  async find(req, res) {
    const result = await hentity.services.api.system_config.system_config.find()
    res.ok(result)
  },

  async upsert(req, res) {
    const { body: data } = req
    const result = await hentity.services.api.system_config.system_config.upsert(data)
    res.ok(result)
  },

  async delete(req, res) {
    const result = await hentity.services.api.system_config.system_config.delete()
    res.ok(result)
  },
}
