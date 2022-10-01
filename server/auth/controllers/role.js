module.exports = {
  async find(req, res) {
    const query = { include: ['permissions'] }
    const result = await hentity.services.admin.auth.role.find(query)
    res.ok(result)
  },

  async create(req, res) {
    const { body: data } = req
    const result = await hentity.services.admin.auth.role.create(data)
    res.ok(result)
  },

  async update(req, res) {
    const {
      params: { id },
      body: data,
    } = req
    const result = await hentity.services.admin.auth.role.update(id, data)
    res.ok(result)
  },

  async delete(req, res) {
    const { id } = req.params
    const result = await hentity.services.admin.auth.role.delete(id)
    res.ok(result)
  },
}
