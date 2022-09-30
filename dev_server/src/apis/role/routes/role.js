module.exports = [
  {
    method: 'GET',
    path: '/roles',
    handler: 'api.role.role.find',
    middlewares: []
  },
  {
    method: 'GET',
    path: '/roles/:id',
    handler: 'api.role.role.findOne',
    middlewares: []
  },
  {
    method: 'POST',
    path: '/roles',
    handler: 'api.role.role.create',
    middlewares: []
  },
  {
    method: 'PUT',
    path: '/roles/:id',
    handler: 'api.role.role.update',
    middlewares: []
  },
  {
    method: 'DELETE',
    path: '/roles/:id',
    handler: 'api.role.role.delete',
    middlewares: []
  }
]
