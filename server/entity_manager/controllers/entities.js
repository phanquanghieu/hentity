module.exports = {
  async find(req, res) {
    res.ok(Object.values(h.entities))
  },
}
