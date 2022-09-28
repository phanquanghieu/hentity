module.exports = [
  {
    method: 'GET',
    path: '/single_type',
    handler: 'api.single_type.single_type.find',
    middlewares: []
  },
  {
    method: 'PUT',
    path: '/single_type',
    handler: 'api.single_type.single_type.upsert',
    middlewares: []
  },
  {
    method: 'DELETE',
    path: '/single_type/:id',
    handler: 'api.single_type.single_type.delete',
    middlewares: []
  }
]
