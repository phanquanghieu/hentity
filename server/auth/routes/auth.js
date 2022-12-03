module.exports = {
  login: {
    method: 'POST',
    path: '/auth/login',
    handler: 'admin.auth.auth.login',
    middlewares: [],
    type: 'api',
    authStrategy: false,
  },

  register: {
    method: 'POST',
    path: '/auth/register',
    handler: 'admin.auth.auth.register',
    middlewares: [],
    type: 'api',
    authStrategy: false,
  },
}
