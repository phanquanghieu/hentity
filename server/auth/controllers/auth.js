module.exports = {
  async login(req, res) {
    const {
      body: { email, password },
    } = req
    if (!email || !password) return res.invalidParams()
    const result = await hentity.services.admin.auth.auth.login(email, password)
    res.ok(result)
  },

  async register(req, res) {
    const {
      body: { email, password },
    } = req
    if (!email || !password) return res.invalidParams()
    const result = await hentity.services.admin.auth.auth.register(email, password)
    res.ok(result)
  },
}
