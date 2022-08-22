module.exports = {
  async find(req, res) {
    const result = await hentity.services.api.book.book.find()
    res.ok(result)
  },

  async upsert(req, res) {
    const { body: data } = req
    const result = await hentity.services.api.book.book.upsert(data)
    res.ok(result)
  },

  async delete(req, res) {
    const result = await hentity.services.api.book.book.delete()
    res.ok(result)
  },
}
