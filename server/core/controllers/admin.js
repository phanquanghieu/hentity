module.exports = {
  async login(req, res) {
    const {
      body: { username, password },
    } = req
    if (!username || !password) return res.invalidParams()
    const result = await hentity.services.admin.core.admin.login(username, password)
    res.ok(result)
  },
}
