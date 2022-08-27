module.exports = [
  {
    method: 'GET',
    path: '/entity_builder/entities',
    handler: 'admin.entity_builder.entities.find',
    middlewares: [],
  },
  {
    method: 'PUT',
    path: '/entity_builder/entities',
    handler: 'admin.entity_builder.entities.upsert',
    middlewares: ['admin.entity_builder.is_development'],
  },
  {
    method: 'DELETE',
    path: '/entity_builder/entities/:singularName',
    handler: 'admin.entity_builder.entities.delete',
    middlewares: ['admin.entity_builder.is_development'],
  },
]
