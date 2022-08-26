module.exports = [
  {
    method: 'GET',
    path: '/movies',
    handler: 'api.movie.movie.find',
    middlewares: []
  },
  {
    method: 'GET',
    path: '/movies/:id',
    handler: 'api.movie.movie.findOne',
    middlewares: []
  },
  {
    method: 'POST',
    path: '/movies',
    handler: 'api.movie.movie.create',
    middlewares: []
  },
  {
    method: 'PUT',
    path: '/movies/:id',
    handler: 'api.movie.movie.update',
    middlewares: []
  },
  {
    method: 'DELETE',
    path: '/movies/:id',
    handler: 'api.movie.movie.delete',
    middlewares: []
  }
]
