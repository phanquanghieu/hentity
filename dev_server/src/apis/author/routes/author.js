module.exports = {
  find: {
    method: 'GET',
    path: '/authors',
    handler: 'api.author.author.find',
    middlewares: [],
  },

  findOne: {
    method: 'GET',
    path: '/authors/:id',
    handler: 'api.author.author.findOne',
    middlewares: [],
  },

  create: {
    method: 'POST',
    path: '/authors',
    handler: 'api.author.author.create',
    middlewares: [],
  },

  update: {
    method: 'PUT',
    path: '/authors/:id',
    handler: 'api.author.author.update',
    middlewares: [],
  },

  delete: {
    method: 'DELETE',
    path: '/authors/:id',
    handler: 'api.author.author.delete',
    middlewares: [],
  },
}
