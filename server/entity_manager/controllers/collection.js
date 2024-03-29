module.exports = {
  async find(req, res) {
    const {
      params: { singularName },
      query = {},
    } = req
    const results = await h.query[singularName].findAndCountAll(query)
    res.ok(results.rows, { count: results.count })
  },

  async create(req, res) {
    const {
      params: { singularName },
      body,
    } = req
    const results = await h.entityQuery(singularName).create(body)
    res.ok(results)
  },

  async update(req, res) {
    const {
      params: { singularName, id },
      body,
    } = req
    const results = await h.entityQuery(singularName).update(id, body)
    res.ok(results)
  },

  async delete(req, res) {
    const { singularName, id } = req.params
    const results = await h.query[singularName].destroy({ where: { id } })
    res.ok(results)
  },
}
