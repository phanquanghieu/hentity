module.exports = [
  {
    method: 'GET',
    path: '/entity_builder/entities',
    handler: 'admin.entity_builder.entity_builder.find',
    middlewares: [],
    auth: {
      strategy: 'admin',
    },
  },
]
