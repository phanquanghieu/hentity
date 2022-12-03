module.exports = {
  find: {
    method: 'GET',
    path: '/products',
    handler: 'api.product.product.find',
    middlewares: [],
  },

  findOne: {
    method: 'GET',
    path: '/products/:id',
    handler: 'api.product.product.findOne',
    middlewares: [],
  },

  create: {
    method: 'POST',
    path: '/products',
    handler: 'api.product.product.create',
    middlewares: [],
  },

  update: {
    method: 'PUT',
    path: '/products/:id',
    handler: 'api.product.product.update',
    middlewares: [],
  },

  delete: {
    method: 'DELETE',
    path: '/products/:id',
    handler: 'api.product.product.delete',
    middlewares: [],
  },
}
