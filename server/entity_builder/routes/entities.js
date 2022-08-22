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
    handler: 'admin.entity_builder.entities.save',
    middlewares: [],
  },
  {
    method: 'DELETE',
    path: '/entity_builder/entities/:singularName',
    handler: 'admin.entity_builder.entities.delete',
    middlewares: [],
  },
]
