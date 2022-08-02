const src = require('./server/core')

// const { createContainer } = require('./server/core/container')
const containers = require('./server/core/containers')
const loaders = require('./server/core/loaders')
const { createDirs } = require('./server/core/utils')

class Hentity {
  constructor(options = {}) {
    // this.container = createContainer(this)
    // this.container.register('configs', configsRegistry(this))
    // this.container.register('entities', entitiesRegistry(this))
    // this.container.register('services', servicesRegistry(this))
    // // this.container.register('middlewares', middlewaresRegistry(this))
    // this.container.register('controllers', controllersRegistry(this))
    // this.container.register('apis', apisRegistry(this))

    this.configsContainer = containers.createConfigsContainer(this)
    this.entitiesContainer = containers.createEntitiesContainer(this)
    this.servicesContainer = containers.createServicesContainer(this)
    this.middlewaresContainer = containers.createMiddlewaresContainer(this)
    this.controllersContainer = containers.createControllersContainer(this)
    this.apisContainer = containers.createApisContainer(this)

    // this.isLoaded = false
    this.dirname = __dirname
    this.dirs = createDirs(options.dir || process.cwd())
    this.server = null
    this.db = null
  }

  async register() {
    await Promise.all([
      loaders.adminLoader(this),
      loaders.middlewaresLoader(this),
      loaders.apisLoader(this),
    ])
  }

  async bootstrap() {
    src()
  }

  async start() {
    try {
      await this.register()
      await this.bootstrap()

      console.log(this.all)
      // await this.listen()
      return this
    } catch (error) {
      console.log(error)
      // return this.stopWithError(error)
    }
  }

  get all() {
    return {
      // configsContainer: this.configsContainer.getAll(),
      entitiesContainer: this.entitiesContainer.getAll(),
      servicesContainer: this.servicesContainer.getAll(),
      middlewaresContainer: this.middlewaresContainer.getAll(),
      controllersContainer: this.controllersContainer.getAll(),
      apisContainer: this.apisContainer.getAll(),
    }
  }

  get apis() {
    return this.apisContainer.getAll()
  }
  api(uid) {
    return this.apisContainer.get(uid)
  }

  get middlewares() {
    return this.middlewaresContainer.getAll()
  }
  middleware(uid) {
    return this.middlewaresContainer.get(uid)
  }
}

module.exports = (options) => {
  const hentity = new Hentity(options)
  global.hentity = hentity
  return hentity
}
