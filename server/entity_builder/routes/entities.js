module.exports = {
  find: {
    method: 'GET',
    path: '/entity_builder/entities',
    handler: 'admin.entity_builder.entities.find',
    middlewares: [],
  },
  upsert: {
    method: 'PUT',
    path: '/entity_builder/entities',
    handler: 'admin.entity_builder.entities.upsert',
    middlewares: ['admin.entity_builder.is_development'],
  },
  delete: {
    method: 'DELETE',
    path: '/entity_builder/entities/:singularName',
    handler: 'admin.entity_builder.entities.delete',
    middlewares: ['admin.entity_builder.is_development'],
  },
}
