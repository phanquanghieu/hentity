const fse = require('fs-extra')
const execa = require('execa')
const path = require('path')

const calcEnvVariables = (configs, env) => {
  return [
    '--env',
    `ENV=${env}`,
    '--env',
    `ADMIN_PATH=${configs.admin.adminPath}`,
    '--env',
    `BACKEND_URL=${configs.server.backendUrl}`,
  ]
}

const shouldBuildAdmin = (configs, env) => {
  const cacheOldConfigsPath = path.resolve(__dirname, '.cache', 'oldConfigs')
  fse.ensureFileSync(cacheOldConfigsPath)
  const oldConfigsData = fse.readFileSync(cacheOldConfigsPath, { encoding: 'utf-8' })

  const newConfigsData = configs.admin.adminPath + configs.server.backendUrl + env
  if (oldConfigsData === newConfigsData) {
    return false
  }
  fse.writeFileSync(cacheOldConfigsPath, newConfigsData)
  return true
}

const buildAdmin = async ({ cwd, configs, env, forceBuildAmin = false }) => {
  try {
    const buildDir = path.resolve(cwd, 'build')

    if (forceBuildAmin || shouldBuildAdmin(configs, env) || !fse.pathExistsSync(buildDir)) {
      console.log('Build Admin Starting!')
      await fse.emptyDir(path.resolve(__dirname, 'build'))

      console.log('Installing...')
      await execa('yarn', ['install'], { cwd: __dirname })

      console.log('Building...')
      await execa('yarn', ['build', ...calcEnvVariables(configs, env)], {
        cwd: __dirname,
      })

      await fse.copy(path.join(__dirname, 'build'), buildDir)

      console.log('Build Admin Done!')
    }
  } catch (error) {
    return console.error(error)
  }
}

module.exports = { buildAdmin }
