module.exports = [
  {
    method: 'GET',
    path: '/cates',
    handler: 'api.cate.cate.find',
    middlewares: []
  },
  {
    method: 'GET',
    path: '/cates/:id',
    handler: 'api.cate.cate.findOne',
    middlewares: []
  },
  {
    method: 'POST',
    path: '/cates',
    handler: 'api.cate.cate.create',
    middlewares: []
  },
  {
    method: 'PUT',
    path: '/cates/:id',
    handler: 'api.cate.cate.update',
    middlewares: []
  },
  {
    method: 'DELETE',
    path: '/cates/:id',
    handler: 'api.cate.cate.delete',
    middlewares: []
  }
]
