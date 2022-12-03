const { Op } = require('sequelize')
const bcrypt = require('bcrypt')
const saltRounds = 5

module.exports = async (h, { models: dbModels }, models) => {
  await initAdmin(dbModels.admin)
  await initRole(dbModels.role)
  await initPermission(dbModels.permission, h)
}

const initAdmin = async (adminModel) => {
  const ADMINS = [
    {
      username: 'admin',
      password: 'admin',
    },
  ]
  for (const ADMIN of ADMINS) {
    let admin = await adminModel.findOne({ where: { username: ADMIN.username } })
    if (admin) continue

    const hash = bcrypt.hashSync(ADMIN.password, saltRounds)
    await adminModel.create({ username: ADMIN.username, password: hash })
  }
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
