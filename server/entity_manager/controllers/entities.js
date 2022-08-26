module.exports = {
  async find(req, res) {
    // process.exit(1)
    res.ok(Object.values(hentity.entities).filter((entity) => !entity.hidden))
  },
}
