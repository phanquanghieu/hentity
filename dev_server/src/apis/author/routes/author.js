module.exports = [
  {
    method: 'GET',
    path: '/authors',
    handler: 'api.author.author.find',
    middlewares: []
  },
  {
    method: 'GET',
    path: '/authors/:id',
    handler: 'api.author.author.findOne',
    middlewares: []
  },
  {
    method: 'POST',
    path: '/authors',
    handler: 'api.author.author.create',
    middlewares: []
  },
  {
    method: 'PUT',
    path: '/authors/:id',
    handler: 'api.author.author.update',
    middlewares: []
  },
  {
    method: 'DELETE',
    path: '/authors/:id',
    handler: 'api.author.author.delete',
    middlewares: []
  }
]
