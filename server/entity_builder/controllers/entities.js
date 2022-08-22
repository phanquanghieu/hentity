const { getService } = require('../utils')

module.exports = {
  async find(req, res) {
    res.ok(Object.values(hentity.entities).filter((entity) => !entity.hidden))
  },
  async save(req, res) {
    const entity = req.body
    const checkExist = Object.values(hentity.entities).find(
      (e) => e.singularName === entity.singularName
    )
    res.ok(entity)
    if (checkExist) await getService().entities.updateApiFile(entity.singularName, entity)
    else await getService().entities.createApiFile(entity)
  },
  async update(req, res) {
    const { singularName } = req.params
    const entity = req.body
    res.ok(singularName, entity)
    await getService().entities.updateApiFile(singularName, entity)
  },
  async delete(req, res) {
    const { singularName } = req.params
    res.ok(singularName)
    await getService().entities.deleteApiFile(singularName)
  },
}
