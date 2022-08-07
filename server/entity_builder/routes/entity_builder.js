module.exports = [
  {
    method: 'GET',
    path: '/e',
    handler: 'admin.entity_builder.entity_builder.find',
    middlewares: ['admin.entity_builder.mid'],
    auth: {
      strategy: 'admin',
    },
  },
]
