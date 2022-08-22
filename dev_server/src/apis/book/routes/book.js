module.exports = [
  {
    method: 'GET',
    path: '/books',
    handler: 'api.book.book.find',
    middlewares: [],
  },
  {
    method: 'PUT',
    path: '/books',
    handler: 'api.book.book.upsert',
    middlewares: [],
  },
  {
    method: 'DELETE',
    path: '/books',
    handler: 'api.book.book.delete',
    middlewares: [],
  },
]
