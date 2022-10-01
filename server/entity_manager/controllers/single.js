module.exports = {
  async find(req, res) {
    const { singularName } = req.params
    const results = await h.query[singularName].findByPk(1)
    return res.ok(results)
  },

  async upsert(req, res) {
    const {
      params: { singularName },
      body,
    } = req
    const results = await h.query[singularName].upsert({ ...body, id: 1 })
    return res.ok(results[0])
  },
}
