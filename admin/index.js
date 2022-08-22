const fse = require('fs-extra')
const execa = require('execa')
const path = require('path')

const calcEnvVariables = (configs) => {
  return [
    '--env',
    `ADMIN_PATH=${configs.admin.adminPath}`,
    '--env',
    `BACKEND_URL=${configs.server.backendUrl}`,
  ]
}

const buildAdmin = async ({ cwd, configs }) => {
  try {
    console.log(cwd, configs)
    const buildDir = path.resolve(cwd, 'build')
    // if (!fse.pathExistsSync(buildDir)) {
    await fse.emptyDir(path.resolve(__dirname, 'build'))

    console.log('Installing...')
    await execa('yarn', ['install'], { cwd: __dirname })
    
    console.log('Building...')
    await execa('yarn', ['build', ...calcEnvVariables(configs)], { cwd: __dirname })

    await fse.copy(path.join(__dirname, 'build'), path.join(buildDir))
    // }
    return console.log('Done!')
  } catch (error) {
    return console.error(error)
  }
}

module.exports = { buildAdmin }
