const { pick } = require('lodash')

module.exports = {
  async find(req, res) {
    const routesMap = h.routesContainer.getRoutesMap()
    let permissions = await hentity.services.admin.auth.permission.find()
    permissions = permissions.map((permission) => ({
      ...permission.dataValues,
      ...pick(routesMap[permission.action], ['method', 'path', 'name']),
    }))
    res.ok(permissions)
  },
}
