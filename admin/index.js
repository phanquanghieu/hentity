const fse = require('fs-extra')
const execa = require('execa')
const path = require('path')

const build = async ({ cwd }) => {
  try {
    const buildDir = path.resolve(cwd, 'build')
    await fse.emptyDir(buildDir)
    await fse.emptyDir(path.resolve(__dirname, 'build'))

    console.log('Installing...')
    await execa('yarn', ['install'], { cwd: __dirname })
    console.log('Building...')
    await execa('yarn', ['build'], { cwd: __dirname })

    await fse.copy(path.join(__dirname, 'build'), path.join(buildDir))
    return console.log('Done!')
  } catch (error) {
    return console.error(error)
  }
}

module.exports = { build }
