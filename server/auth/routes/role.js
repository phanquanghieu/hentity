module.exports = {
  find: {
    method: 'GET',
    path: '/auth/roles',
    handler: 'admin.auth.role.find',
    middlewares: [],
  },

  create: {
    method: 'POST',
    path: '/auth/roles',
    handler: 'admin.auth.role.create',
    middlewares: [],
  },

  update: {
    method: 'PUT',
    path: '/auth/roles/:id',
    handler: 'admin.auth.role.update',
    middlewares: [],
  },

  delete: {
    method: 'DELETE',
    path: '/auth/roles/:id',
    handler: 'admin.auth.role.delete',
    middlewares: [],
  },
}
