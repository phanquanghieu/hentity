const fse = require('fs-extra')
const { cloneDeep } = require('lodash')
const { resolve } = require('path')
const { saveApiFiles, createDataApiFiles } = require('../utils')

module.exports = {
  async upsertEntity(entity) {
    process.send('prevent_restart')

    let _entities = removeOldRelation(entity.singularName)
    _entities = addNewRelation(_entities, entity)
    await upsertApiFile(_entities)

    process.send('restart')
  },

  async deleteEntity(singularName) {
    process.send('prevent_restart')

    let _entities = removeOldRelation(singularName)
    console.log(_entities, singularName)
    await Promise.all([upsertApiFile(_entities), deleteApiFile(singularName)])

    process.send('restart')
  },
}

const upsertApiFile = async (entities) => {
  const createApiFile = async (entity) => {
    const { singularName } = entity
    const apiPath = resolve(h.dirs.apis, singularName)

    await Promise.all([
      saveApiFiles(apiPath, 'entities', singularName, entity),
      saveApiFiles(apiPath, 'routes', singularName, createDataApiFiles('routes', entity)),
      saveApiFiles(apiPath, 'controllers', singularName, createDataApiFiles('controllers', entity)),
      saveApiFiles(apiPath, 'services', singularName, createDataApiFiles('services', entity)),
      saveApiFiles(apiPath, 'middlewares'),
    ])
  }
  const updateApiFile = async (singularName, entity) => {
    const apiPath = resolve(h.dirs.apis, singularName)

    await saveApiFiles(apiPath, 'entities', singularName, entity)
  }

  const promise = []
  for (let entity of entities) {
    const checkExist = Object.values(h.entities).find((e) => e.singularName === entity.singularName)
    if (checkExist) promise.push(updateApiFile(entity.singularName, entity))
    else promise.push(createApiFile(entity))
  }
  await Promise.all(promise)
}

const deleteApiFile = async (singularName) => {
  const apiPath = resolve(h.dirs.apis, singularName)
  await fse.remove(apiPath)
}

const removeOldRelation = (singularName) => {
  const oldEntities = Object.values(h.entities).filter(
    (e) => !e.isAdminEntity && e.type === 'collection'
  )
  // console.log(oldEntities)
  let _entities = cloneDeep(
    oldEntities.filter((oldEntity) => oldEntity.singularName !== singularName)
  )

  _entities.forEach((_entity) => {
    _entity.attributes = _entity.attributes.filter(
      (_entityAttribute) =>
        _entityAttribute.type !== 'relation' || _entityAttribute.reference !== singularName
    )
  })
  return _entities
}

const addNewRelation = (_entities, entityEdit) => {
  const calcAssociation = (relation, association) => {
    if (relation === 'oneToOne') {
      if (association === 'hasOne') return 'belongsTo'
      if (association === 'belongsTo') return 'hasOne'
    }
    if (relation === 'oneToMany') {
      if (association === 'hasMany') return 'belongsTo'
      if (association === 'belongsTo') return 'hasMany'
    }
    if (relation === 'manyToMany') return 'belongsToMany'
  }

  let entityEditRelationAttributes = entityEdit.attributes.filter(
    (attribute) => attribute.type === 'relation'
  )

  entityEditRelationAttributes.forEach((relationAttribute) => {
    _entities
      .find((_entity) => _entity.singularName === relationAttribute.reference)
      .attributes.push({
        type: 'relation',
        columnName: relationAttribute.referenceColumnName,
        displayName: relationAttribute.referenceDisplayName,
        relation: relationAttribute.relation,
        association: calcAssociation(relationAttribute.relation, relationAttribute.association),
        reference: entityEdit.singularName,
        referenceColumnName: relationAttribute.columnName,
        referenceDisplayName: relationAttribute.displayName,
      })
  })

  return [..._entities, entityEdit]
}
