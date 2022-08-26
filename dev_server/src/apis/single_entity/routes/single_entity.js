module.exports = [
  {
    method: 'GET',
    path: '/single_entity',
    handler: 'api.single_entity.single_entity.find',
    middlewares: []
  },
  {
    method: 'PUT',
    path: '/single_entity',
    handler: 'api.single_entity.single_entity.upsert',
    middlewares: []
  },
  {
    method: 'DELETE',
    path: '/single_entity/:id',
    handler: 'api.single_entity.single_entity.delete',
    middlewares: []
  }
]
