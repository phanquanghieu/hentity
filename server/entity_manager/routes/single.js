module.exports = [
  {
    method: 'GET',
    path: '/entity_manager/single/:singularName',
    handler: 'admin.entity_manager.single.find',
    middlewares: [],
  },
  {
    method: 'PUT',
    path: '/entity_manager/single/:singularName',
    handler: 'admin.entity_manager.single.upsert',
    middlewares: [],
  },
]
