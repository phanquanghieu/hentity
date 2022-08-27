module.exports = [
  {
    method: 'GET',
    path: '/categories',
    handler: 'api.category.category.find',
    middlewares: []
  },
  {
    method: 'GET',
    path: '/categories/:id',
    handler: 'api.category.category.findOne',
    middlewares: []
  },
  {
    method: 'POST',
    path: '/categories',
    handler: 'api.category.category.create',
    middlewares: []
  },
  {
    method: 'PUT',
    path: '/categories/:id',
    handler: 'api.category.category.update',
    middlewares: []
  },
  {
    method: 'DELETE',
    path: '/categories/:id',
    handler: 'api.category.category.delete',
    middlewares: []
  }
]
