module.exports = {
  async find(req, res) {
    const { query } = req
    const result = await hentity.services.api.category.category.find(query)
    res.ok(result)
  },

  async findOne(req, res) {
    const { id } = req.params
    const result = await hentity.services.api.category.category.findOne(id)
    res.ok(result)
  },

  async create(req, res) {
    const { body: data } = req
    const result = await hentity.services.api.category.category.create(data)
    res.ok(result)
  },

  async update(req, res) {
    const {
      params: { id },
      body: data,
    } = req
    const result = await hentity.services.api.category.category.update(id, data)
    res.ok(result)
  },

  async delete(req, res) {
    const { id } = req.params
    const result = await hentity.services.api.category.category.delete(id)
    res.ok(result)
  },
}
