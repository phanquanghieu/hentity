module.exports = {
  login: {
    method: 'POST',
    path: '/login',
    handler: 'admin.core.admin.login',
    middlewares: [],
    authStrategy: false,
  },
}
