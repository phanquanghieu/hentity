module.exports = {
  find: {
    method: 'GET',
    path: '/books',
    handler: 'api.book.book.find',
    middlewares: [],
  },

  findOne: {
    method: 'GET',
    path: '/books/:id',
    handler: 'api.book.book.findOne',
    middlewares: [],
  },

  create: {
    method: 'POST',
    path: '/books',
    handler: 'api.book.book.create',
    middlewares: [],
  },

  update: {
    method: 'PUT',
    path: '/books/:id',
    handler: 'api.book.book.update',
    middlewares: [],
  },

  delete: {
    method: 'DELETE',
    path: '/books/:id',
    handler: 'api.book.book.delete',
    middlewares: [],
  },
}
