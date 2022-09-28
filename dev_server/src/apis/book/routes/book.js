module.exports = [
  {
    method: 'GET',
    path: '/books',
    handler: 'api.book.book.find',
    middlewares: []
  },
  {
    method: 'GET',
    path: '/books/:id',
    handler: 'api.book.book.findOne',
    middlewares: []
  },
  {
    method: 'POST',
    path: '/books',
    handler: 'api.book.book.create',
    middlewares: []
  },
  {
    method: 'PUT',
    path: '/books/:id',
    handler: 'api.book.book.update',
    middlewares: []
  },
  {
    method: 'DELETE',
    path: '/books/:id',
    handler: 'api.book.book.delete',
    middlewares: []
  }
]
