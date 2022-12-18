const collectionType = ({ singularName, pluralName }) => `module.exports = {
  find: {
    method: 'GET',
    path: '/${pluralName}',
    handler: 'api.${singularName}.${singularName}.find',
    middlewares: [],
  },

  count: {
    method: 'GET',
    path: '/${pluralName}/count',
    handler: 'api.${singularName}.${singularName}.count',
    middlewares: [],
  },

  findOne: {
    method: 'GET',
    path: '/${pluralName}/:id',
    handler: 'api.${singularName}.${singularName}.findOne',
    middlewares: [],
  },

  create: {
    method: 'POST',
    path: '/${pluralName}',
    handler: 'api.${singularName}.${singularName}.create',
    middlewares: [],
  },

  update: {
    method: 'PUT',
    path: '/${pluralName}/:id',
    handler: 'api.${singularName}.${singularName}.update',
    middlewares: [],
  },

  delete: {
    method: 'DELETE',
    path: '/${pluralName}/:id',
    handler: 'api.${singularName}.${singularName}.delete',
    middlewares: [],
  },
}
`

const singleType = ({ singularName }) => `module.exports = {
  find: {
    method: 'GET',
    path: '/${singularName}',
    handler: 'api.${singularName}.${singularName}.find',
    middlewares: [],
  },

  upsert: {
    method: 'PUT',
    path: '/${singularName}',
    handler: 'api.${singularName}.${singularName}.upsert',
    middlewares: [],
  },

  delete: {
    method: 'DELETE',
    path: '/${singularName}/:id',
    handler: 'api.${singularName}.${singularName}.delete',
    middlewares: [],
  },
}
`

module.exports = (entity) => {
  if (entity.type === 'collection') return collectionType(entity)
  if (entity.type === 'single') return singleType(entity)
}
