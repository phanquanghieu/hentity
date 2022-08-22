const collectionType = ({ singularName }) => `module.exports = {
  async find(req, res) {
    const { query } = req
    const result = await hentity.services.api.${singularName}.${singularName}.find(query)
    res.ok(result)
  },

  async findOne(req, res) {
    const { id } = req.params
    const result = await hentity.services.api.${singularName}.${singularName}.findOne(id)
    res.ok(result)
  },

  async create(req, res) {
    const { body: data } = req
    const result = await hentity.services.api.${singularName}.${singularName}.create(data)
    res.ok(result)
  },

  async update(req, res) {
    const {
      params: { id },
      body: data,
    } = req
    const result = await hentity.services.api.${singularName}.${singularName}.update(id, data)
    res.ok(result)
  },

  async delete(req, res) {
    const { id } = req.params
    const result = await hentity.services.api.${singularName}.${singularName}.delete(id)
    res.ok(result)
  },
}
`

const singleType = ({ singularName }) => `module.exports = {
  async find(req, res) {
    const result = await hentity.services.api.${singularName}.${singularName}.find()
    res.ok(result)
  },

  async upsert(req, res) {
    const { body: data } = req
    const result = await hentity.services.api.${singularName}.${singularName}.upsert(data)
    res.ok(result)
  },

  async delete(req, res) {
    const result = await hentity.services.api.${singularName}.${singularName}.delete()
    res.ok(result)
  },
}
`

module.exports = (entity) => {
  if (entity.type === 'collection') return collectionType(entity)
  if (entity.type === 'single') return singleType(entity)
}
