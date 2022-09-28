module.exports = [
  {
    method: 'GET',
    path: '/abcs',
    handler: 'api.abc.abc.find',
    middlewares: []
  },
  {
    method: 'GET',
    path: '/abcs/:id',
    handler: 'api.abc.abc.findOne',
    middlewares: []
  },
  {
    method: 'POST',
    path: '/abcs',
    handler: 'api.abc.abc.create',
    middlewares: []
  },
  {
    method: 'PUT',
    path: '/abcs/:id',
    handler: 'api.abc.abc.update',
    middlewares: []
  },
  {
    method: 'DELETE',
    path: '/abcs/:id',
    handler: 'api.abc.abc.delete',
    middlewares: []
  }
]
