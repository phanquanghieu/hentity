const bcrypt = require('bcrypt')

module.exports = {
  async login(username, password) {
    let admin = await h.query.admin.findOne({ where: { username } })
    if (!admin) return h.cErr('User Not Found', 404)
    if (!bcrypt.compareSync(password, admin.password)) return h.cErr('Password Incorrect', 400)
    return {
      token: h.services.admin.core.jwt.sign({ id: admin.id }),
    }
  },
}
