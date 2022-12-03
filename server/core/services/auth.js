const { get } = require('lodash')

const adminStrategy = {
  async authenticationCheck(req) {
    try {
      const token = h.services.admin.core.jwt.getToken(req)
      if (!token)
        return {
          isInvalidToken: true,
        }

      const payload = h.services.admin.core.jwt.verify(token)
      if (!payload)
        return {
          isInvalidToken: true,
        }

      const admin = await h.query.admin.findOne({ where: { id: payload.id } })
      if (!admin)
        return {
          isInvalidToken: true,
        }

      return {
        isInvalidToken: false,
      }
    } catch (error) {
      console.log(error)
      return {
        isInvalidToken: true,
      }
    }
  },
  authorizationCheck() {
    return true
  },
}

const apiStrategy = {
  async authenticationCheck(req) {
    try {
      const token = h.services.admin.core.jwt.getToken(req)
      if (!token) {
        return {
          isInvalidToken: false,
          user: null,
        }
      }
      const payload = h.services.admin.core.jwt.verify(token)
      if (!payload) {
        return {
          isInvalidToken: true,
          user: null,
        }
      }
      const user = await h.query.user.findOne({ where: { id: payload.id } })
      return {
        isInvalidToken: false,
        user,
      }
    } catch (error) {
      console.log(error)
      return {
        isInvalidToken: false,
        user,
      }
    }
  },

  async authorizationCheck(req) {
    const route = get(req, 'state.route')
    let publicRole = await h.query.role.findOne({
      where: { type: 'public' },
      include: ['permissions'],
    })
    let hasPublicPermission = publicRole.permissions.some(
      (permission) => permission.action === route.action
    )
    if (hasPublicPermission) return true

    const user = get(req, 'state.user')
    if (!user) return false

    let userRole = await user.getRole({ include: ['permissions'] })
    let hasPermission = userRole.permissions.some(
      (permission) => permission.action === route.action
    )
    if (hasPermission) return true

    return false
  },
}

module.exports = {
  admin: adminStrategy,
  api: apiStrategy,
}
