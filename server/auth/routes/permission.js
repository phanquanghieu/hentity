module.exports = {
  find: {
    method: 'GET',
    path: '/auth/permissions',
    handler: 'admin.auth.permission.find',
    middlewares: [],
  },
}
