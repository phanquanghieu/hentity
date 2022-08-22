const collectionType = ({ singularName, pluralName }) => `module.exports = [
  {
    method: 'GET',
    path: '/${pluralName}',
    handler: 'api.${singularName}.${singularName}.find',
    middlewares: []
  },
  {
    method: 'GET',
    path: '/${pluralName}/:id',
    handler: 'api.${singularName}.${singularName}.findOne',
    middlewares: []
  },
  {
    method: 'POST',
    path: '/${pluralName}',
    handler: 'api.${singularName}.${singularName}.create',
    middlewares: []
  },
  {
    method: 'PUT',
    path: '/${pluralName}/:id',
    handler: 'api.${singularName}.${singularName}.update',
    middlewares: []
  },
  {
    method: 'DELETE',
    path: '/${pluralName}/:id',
    handler: 'api.${singularName}.${singularName}.delete',
    middlewares: []
  }
]
`

const singleType = ({ singularName }) => `module.exports = [
  {
    method: 'GET',
    path: '/${singularName}',
    handler: 'api.${singularName}.${singularName}.find',
    middlewares: []
  },
  {
    method: 'PUT',
    path: '/${singularName}',
    handler: 'api.${singularName}.${singularName}.upsert',
    middlewares: []
  },
  {
    method: 'DELETE',
    path: '/${singularName}/:id',
    handler: 'api.${singularName}.${singularName}.delete',
    middlewares: []
  }
]
`

module.exports = (entity) => {
  if (entity.type === 'collection') return collectionType(entity)
  if (entity.type === 'single') return singleType(entity)
}
