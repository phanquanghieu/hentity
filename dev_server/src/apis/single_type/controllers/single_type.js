module.exports = {
  async find(req, res) {
    const result = await hentity.services.api.single_type.single_type.find()
    res.ok(result)
  },

  async upsert(req, res) {
    const { body: data } = req
    const result = await hentity.services.api.single_type.single_type.upsert(data)
    res.ok(result)
  },

  async delete(req, res) {
    const result = await hentity.services.api.single_type.single_type.delete()
    res.ok(result)
  },
}
