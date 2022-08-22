const collectionType = ({ singularName }) => `module.exports = {
  async find(query) {
    return await hentity.entityQuery('${singularName}').find(query)
  },

  async findOne(id) {
    return await hentity.entityQuery('${singularName}').findOne(id)
  },

  async create(data) {
    return await hentity.entityQuery('${singularName}').create(data)
  },

  async update(id, data) {
    return await hentity.entityQuery('${singularName}').update(id, data)
  },

  async delete(id) {
    return await hentity.entityQuery('${singularName}').delete(id)
  },
}
`

const singleType = ({ singularName }) => `module.exports = {
  async find() {
    return await hentity.entityQuery('${singularName}').findOne(1)
  },

  async upsert(data) {
    return await hentity.entityQuery('${singularName}').upsert({ ...data, id: 1 })
  },

  async delete() {
    return await hentity.entityQuery('${singularName}').delete(1)
  },
}
`

module.exports = (entity) => {
  if (entity.type === 'collection') return collectionType(entity)
  if (entity.type === 'single') return singleType(entity)
}
