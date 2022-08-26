module.exports = [
  {
    method: 'GET',
    path: '/entity_manager/collection/:singularName',
    handler: 'admin.entity_manager.collection.find',
    middlewares: [],
  },
  {
    method: 'POST',
    path: '/entity_manager/collection/:singularName',
    handler: 'admin.entity_manager.collection.create',
    middlewares: [],
  },
  {
    method: 'PUT',
    path: '/entity_manager/collection/:singularName/:id',
    handler: 'admin.entity_manager.collection.update',
    middlewares: [],
  },
  {
    method: 'DELETE',
    path: '/entity_manager/collection/:singularName/:id',
    handler: 'admin.entity_manager.collection.delete',
    middlewares: [],
  },
]
