module.exports = [
  {
    method: 'GET',
    path: '/permissions',
    handler: 'api.permission.permission.find',
    middlewares: []
  },
  {
    method: 'GET',
    path: '/permissions/:id',
    handler: 'api.permission.permission.findOne',
    middlewares: []
  },
  {
    method: 'POST',
    path: '/permissions',
    handler: 'api.permission.permission.create',
    middlewares: []
  },
  {
    method: 'PUT',
    path: '/permissions/:id',
    handler: 'api.permission.permission.update',
    middlewares: []
  },
  {
    method: 'DELETE',
    path: '/permissions/:id',
    handler: 'api.permission.permission.delete',
    middlewares: []
  }
]
