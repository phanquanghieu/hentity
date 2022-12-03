const bcrypt = require('bcrypt')
const saltRounds = 5

module.exports = {
  async login(email, password) {
    let user = await h.query.user.findOne({ where: { email } })
    if (!user) return h.cErr('User Not Found', 404)
    if (!bcrypt.compareSync(password, user.password)) return h.cErr('Password Incorrect', 400)
    return {
      token: h.services.admin.core.jwt.sign({ id: user.id }),
    }
  },

  async register(email, password) {
    let user = await h.query.user.findOne({ where: { email } })
    if (user) return h.cErr('User Exist', 400)

    const hash = bcrypt.hashSync(password, saltRounds)
    let userCreated = await h.query.user.create({ email, password: hash })
    let authRole = await h.query.role.findOne({ where: { type: 'authenticated' } })
    userCreated.setRole(authRole)
    return {
      token: h.services.admin.core.jwt.sign({ id: userCreated.id }),
    }
  },
}
