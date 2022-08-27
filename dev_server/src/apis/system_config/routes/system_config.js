module.exports = [
  {
    method: 'GET',
    path: '/system_config',
    handler: 'api.system_config.system_config.find',
    middlewares: []
  },
  {
    method: 'PUT',
    path: '/system_config',
    handler: 'api.system_config.system_config.upsert',
    middlewares: []
  },
  {
    method: 'DELETE',
    path: '/system_config/:id',
    handler: 'api.system_config.system_config.delete',
    middlewares: []
  }
]
