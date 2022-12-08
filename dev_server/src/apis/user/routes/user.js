module.exports = {
  find: {
    method: 'GET',
    path: '/users',
    handler: 'api.user.user.find',
    middlewares: [],
  },

  findOne: {
    method: 'GET',
    path: '/users/:id',
    handler: 'api.user.user.findOne',
    middlewares: [],
  },

  create: {
    method: 'POST',
    path: '/users',
    handler: 'api.user.user.create',
    middlewares: [],
  },

  update: {
    method: 'PUT',
    path: '/users/:id',
    handler: 'api.user.user.update',
    middlewares: [],
  },

  delete: {
    method: 'DELETE',
    path: '/users/:id',
    handler: 'api.user.user.delete',
    middlewares: [],
  },
}
