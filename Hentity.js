const containers = require('./core/containers')
const loaders = require('./core/loaders')
const { createServer } = require('./core/server')
const { createDirs } = require('./core/utils')

class Hentity {
  constructor(options = {}) {
    // this.configsContainer = containers.createConfigsContainer(this)
    this.apisContainer = containers.createApisContainer(this)
    this.routesContainer = containers.createRoutesContainer(this)
    this.middlewaresContainer = containers.createMiddlewaresContainer(this)
    this.controllersContainer = containers.createControllersContainer(this)
    this.servicesContainer = containers.createServicesContainer(this)
    this.entitiesContainer = containers.createEntitiesContainer(this)

    // this.isLoaded = false
    this.configs = null
    this.dirname = __dirname
    this.dirs = createDirs(options.dir || process.cwd())
    this.server = createServer(this)
    this.db = null
  }

  async register() {
    await Promise.all([
      loaders.configsLoader(this),
      loaders.adminLoader(this),
      loaders.middlewaresLoader(this),
      loaders.apisLoader(this),
    ])
  }

  async bootstrap() {
    this.server.mount()
  }

  async start() {
    try {
      await this.register()
      await this.bootstrap()

      this.server.listen()
      return this
    } catch (error) {
      console.log(error)
    }
  }

  get all() {
    return {
      // configsContainer: this.configsContainer.getAll(),
      entitiesContainer: this.entitiesContainer.getAll(),
      servicesContainer: this.servicesContainer.getAll(),
      middlewaresContainer: this.middlewaresContainer.getAll(),
      controllersContainer: this.controllersContainer.getAll(),
      routesContainer: this.routesContainer.getAll(),
      apisContainer: this.apisContainer.getAll(),
    }
  }

  get apis() {
    return this.apisContainer.getAll()
  }
  api(path) {
    return this.apisContainer.get(path)
  }

  get routes() {
    return this.routesContainer.getAll()
  }
  route(path) {
    return this.routesContainer.get(path)
  }

  get middlewares() {
    return this.middlewaresContainer.getAll()
  }
  middleware(path) {
    return this.middlewaresContainer.get(path)
  }

  get controllers() {
    return this.controllersContainer.getAll()
  }
  controller(path) {
    return this.controllersContainer.get(path)
  }

  get services() {
    return this.servicesContainer.getAll()
  }
  service(path) {
    return this.servicesContainer.get(path)
  }
}

module.exports = (options) => {
  const hentity = new Hentity(options)
  global.hentity = hentity
  return hentity
}
