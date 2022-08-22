const fse = require('fs-extra')
const { join } = require('path')

const saveHandler = {
  middlewares: async (apiPath) => {
    await fse.ensureFile(join(apiPath, 'middlewares', '.gitkeep'))
  },
  routes: async (apiPath, fileName, data) => {
    const filePath = join(apiPath, 'routes', `${fileName}.js`)
    await fse.ensureFile(filePath)
    await fse.writeFile(filePath, data)
  },
  controllers: async (apiPath, fileName, data) => {
    const filePath = join(apiPath, 'controllers', `${fileName}.js`)
    await fse.ensureFile(filePath)
    await fse.writeFile(filePath, data)
  },
  services: async (apiPath, fileName, data) => {
    const filePath = join(apiPath, 'services', `${fileName}.js`)
    await fse.ensureFile(filePath)
    await fse.writeFile(filePath, data)
  },
  entities: async (apiPath, fileName, data) => {
    const filePath = join(apiPath, 'entities', `${fileName}.json`)
    await fse.ensureFile(filePath)
    await fse.writeJSON(filePath, data, { spaces: 2 })
  },
}

module.exports = async (apiPath, folderName, fileName, data) => {
  await fse.ensureDir(apiPath)

  await saveHandler[folderName]?.(apiPath, fileName, data)
}
