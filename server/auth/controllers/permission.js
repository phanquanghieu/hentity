const { pick, get } = require('lodash')

module.exports = {
  async find(req, res) {
    const routesMap = h.routesContainer.getRoutesMap()
    let permissions = await hentity.services.admin.auth.permission.find()
    permissions = permissions.map((permission) => ({
      ...permission.dataValues,
      ...pick(routesMap[permission.action], ['method', 'path', 'name']),
      is_public: !Boolean(get(routesMap[permission.action], 'authStrategy')),
    }))
    res.ok(permissions)
  },
}
