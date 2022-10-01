module.exports = {
  find: {
    method: 'GET',
    path: '/users',
    handler: 'admin.auth.user.find',
    middlewares: [],
  },

  findOne: {
    method: 'GET',
    path: '/users/:id',
    handler: 'admin.auth.user.findOne',
    middlewares: [],
  },

  create: {
    method: 'POST',
    path: '/users',
    handler: 'admin.auth.user.create',
    middlewares: [],
  },

  update: {
    method: 'PUT',
    path: '/users/:id',
    handler: 'admin.auth.user.update',
    middlewares: [],
  },

  delete: {
    method: 'DELETE',
    path: '/users/:id',
    handler: 'admin.auth.user.delete',
    middlewares: [],
  },
}
