module.exports = {
  find: {
    method: 'GET',
    path: '/abcs',
    handler: 'api.abc.abc.find',
    middlewares: [],
  },

  findOne: {
    method: 'GET',
    path: '/abcs/:id',
    handler: 'api.abc.abc.findOne',
    middlewares: [],
  },

  create: {
    method: 'POST',
    path: '/abcs',
    handler: 'api.abc.abc.create',
    middlewares: [],
  },

  update: {
    method: 'PUT',
    path: '/abcs/:id',
    handler: 'api.abc.abc.update',
    middlewares: [],
  },

  delete: {
    method: 'DELETE',
    path: '/abcs/:id',
    handler: 'api.abc.abc.delete',
    middlewares: [],
  },
}
