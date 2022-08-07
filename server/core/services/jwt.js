const jwt = require('jsonwebtoken')
const { toLower } = require('lodash')

module.exports = {
  sign(payload) {
    return jwt.sign(payload, hentity.configs.api.jwtSecret)
  },
  verify(token) {
    try {
      return jwt.verify(token, hentity.configs.api.jwtSecret)
    } catch (error) {
      return null
    }
  },
  getTokenPayload(req) {
    const authorization = req.get('authorization')
    if (!authorization) return null
    const parts = authorization.split(/\s+/)
    if (parts.length !== 2 && toLower(parts[0]) === 'bearer') return null

    return this.verify(parts[1])
  },
}
