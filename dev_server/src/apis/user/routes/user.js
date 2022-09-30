module.exports = [
  {
    method: 'GET',
    path: '/users',
    handler: 'api.user.user.find',
    middlewares: []
  },
  {
    method: 'GET',
    path: '/users/:id',
    handler: 'api.user.user.findOne',
    middlewares: []
  },
  {
    method: 'POST',
    path: '/users',
    handler: 'api.user.user.create',
    middlewares: []
  },
  {
    method: 'PUT',
    path: '/users/:id',
    handler: 'api.user.user.update',
    middlewares: []
  },
  {
    method: 'DELETE',
    path: '/users/:id',
    handler: 'api.user.user.delete',
    middlewares: []
  }
]
