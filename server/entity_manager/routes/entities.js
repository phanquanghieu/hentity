module.exports = {
  find: {
    method: 'GET',
    path: '/entity_manager/entities',
    handler: 'admin.entity_manager.entities.find',
    middlewares: [],
  },
}
