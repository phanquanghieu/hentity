module.exports = {
  async find(req, res) {
    res.ok('oke')
  },
  async findOne(req, res) {
    const { id } = req.params
    res.ok({ id })
  },
  async create(req, res) {
    const { data } = req.body
    res.ok({ data })
  },
  async update(req, res) {
    const { id } = req.params
    const { data } = req.body
    res.ok({ id, data })
  },
  async delete(req, res) {
    const { id } = req.params
    res.ok({ id })
  },
}
