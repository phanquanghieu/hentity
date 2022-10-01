module.exports = {
  async find(req, res) {
    res.ok(Object.values(h.entities).filter((entity) => !entity.hidden))
  },

  async upsert(req, res) {
    const entity = req.body
    res.ok(entity)
    await getService().entities.upsertEntity(entity)
  },

  async delete(req, res) {
    const { singularName } = req.params
    res.ok(singularName)
    await getService().entities.deleteEntity(singularName)
  },
}

const getService = () => h.services.admin.entity_builder
