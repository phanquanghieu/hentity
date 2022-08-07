const adminStrategy = {
  authenticationCheck(req) {
    try {
      const token = hentity.services.admin.core.jwt.getToken(req)
      if (token) {
      }
      return {
        authenticated: true,
      }
    } catch (error) {
      return { authenticated: false }
    }
  },
  authorizationCheck() {},
}

const apiStrategy = {
  authenticationCheck() {},
  authorizationCheck() {},
}

module.exports = {
  admin: adminStrategy,
  api: apiStrategy,
}
