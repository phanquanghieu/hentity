const jwt = require('jsonwebtoken')
const { toLower } = require('lodash')

module.exports = {
  sign(payload) {
    return jwt.sign(payload, h.configs.api.jwtSecret)
  },
  verify(token) {
    try {
      return jwt.verify(token, h.configs.api.jwtSecret)
    } catch (error) {
      return null
    }
  },
  getToken(req) {
    const authorization = req.get('authorization')
    if (!authorization) return null
    const parts = authorization.split(/\s+/)
    if (parts.length === 2 && toLower(parts[0]) === 'bearer') return parts[1]

    return null
  },
}
