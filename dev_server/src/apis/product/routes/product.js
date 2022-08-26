module.exports = [
  {
    method: 'GET',
    path: '/products',
    handler: 'api.product.product.find',
    middlewares: []
  },
  {
    method: 'GET',
    path: '/products/:id',
    handler: 'api.product.product.findOne',
    middlewares: []
  },
  {
    method: 'POST',
    path: '/products',
    handler: 'api.product.product.create',
    middlewares: []
  },
  {
    method: 'PUT',
    path: '/products/:id',
    handler: 'api.product.product.update',
    middlewares: []
  },
  {
    method: 'DELETE',
    path: '/products/:id',
    handler: 'api.product.product.delete',
    middlewares: []
  }
]
