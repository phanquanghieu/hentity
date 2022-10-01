const { Op } = require('sequelize')

module.exports = async (h, { models: dbModels }, models) => {
  // dbModel
  await initRole(dbModels.role)
  await initPermission(dbModels.permission, h)
  // console.log(h.routesContainer.getRoutesMap())
  // console.log(h.entities)
}

const initRole = async (roleModel) => {
  const ROLES = [
    {
      name: 'Authenticated',
      description: 'Default role given to authenticated user.',
      type: 'authenticated',
    },
    {
      name: 'Public',
      description: 'Default role given to unauthenticated user.',
      type: 'public',
    },
  ]
  for (const ROLE of ROLES) {
    const check = await roleModel.findOne({ where: { type: ROLE.type } })
    if (!check) {
      await roleModel.create(ROLE)
    }
  }
}

const initPermission = async (permissionModel, h) => {
  const apiRoutes = h.routesContainer.getRoutesMapByType('api')
  const actions = Object.keys(apiRoutes)
  const permissions = actions.map((action) => ({ action }))

  await permissionModel.destroy({ where: { action: { [Op.notIn]: actions } } })

  for (const permission of permissions) {
    const check = await permissionModel.findOne({ where: { action: permission.action } })
    if (!check) {
      await permissionModel.create(permission)
    }
  }
}
