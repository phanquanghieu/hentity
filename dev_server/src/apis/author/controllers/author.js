module.exports = {
  async find(req, res) {
    const { query } = req
    const result = await hentity.services.api.author.author.find(query)
    res.ok(result)
  },

  async findOne(req, res) {
    const { id } = req.params
    const { query } = req
    const result = await hentity.services.api.author.author.findOne(id, query)
    res.ok(result)
  },

  async create(req, res) {
    const { body: data } = req
    const result = await hentity.services.api.author.author.create(data)
    res.ok(result)
  },

  async update(req, res) {
    const {
      params: { id },
      body: data,
    } = req
    const result = await hentity.services.api.author.author.update(id, data)
    res.ok(result)
  },

  async delete(req, res) {
    const { id } = req.params
    const result = await hentity.services.api.author.author.delete(id)
    res.ok(result)
  },
}
