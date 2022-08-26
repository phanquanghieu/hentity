module.exports = {
  async find(req, res) {
    const result = await hentity.services.api.single_entity.single_entity.find()
    res.ok(result)
  },

  async upsert(req, res) {
    const { body: data } = req
    const result = await hentity.services.api.single_entity.single_entity.upsert(data)
    res.ok(result)
  },

  async delete(req, res) {
    const result = await hentity.services.api.single_entity.single_entity.delete()
    res.ok(result)
  },
}
