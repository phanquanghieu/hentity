module.exports = {
  find: {
    method: 'GET',
    path: '/entity_manager/collection/:singularName',
    handler: 'admin.entity_manager.collection.find',
    middlewares: [],
  },
  create: {
    method: 'POST',
    path: '/entity_manager/collection/:singularName',
    handler: 'admin.entity_manager.collection.create',
    middlewares: [],
  },
  update: {
    method: 'PUT',
    path: '/entity_manager/collection/:singularName/:id',
    handler: 'admin.entity_manager.collection.update',
    middlewares: [],
  },
  delete: {
    method: 'DELETE',
    path: '/entity_manager/collection/:singularName/:id',
    handler: 'admin.entity_manager.collection.delete',
    middlewares: [],
  },
}
