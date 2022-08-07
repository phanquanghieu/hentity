const fse = require('fs-extra')
const { join, resolve } = require('path')
const crypto = require('crypto')
const { set } = require('lodash')

const generateSecret = () => crypto.randomBytes(16).toString('base64')

const createEnvFile = () => `HOST=0.0.0.0
PORT=1337
ADMIN_JWT_SECRET=${generateSecret()}
JWT_SECRET=${generateSecret()}`

const createPackageJSONFile = () => {
  const packageJSON = require(resolve('package.json'))

  set(packageJSON, 'scripts.start', 'hentity start')

  return packageJSON
}

module.exports = async () => {
  const cwd = process.cwd()
  console.log(`Creating a new Hentity application at ${cwd}`)

  const resources = join(__dirname, 'resources')

  try {
    await fse.copy(join(resources, 'files'), cwd)
    await fse.writeFile(join(cwd, '.env'), createEnvFile())
    const dotFiles = await fse.readdir(join(resources, 'dot-files'))
    await Promise.all(
      dotFiles.map((dotFile) =>
        fse.copy(join(resources, 'dot-files', dotFile), join(cwd, `.${dotFile}`))
      )
    )

    await fse.writeJSON(resolve('package.json'), createPackageJSONFile(), {
      spaces: 2,
    })
  } catch (err) {
    console.error(err)
  }
}
