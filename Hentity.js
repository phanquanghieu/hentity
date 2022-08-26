const containers = require('./core/containers')
const loaders = require('./core/loaders')
const { createDatabase } = require('./core/database')
const { createServer } = require('./core/server')
const { createDirs } = require('./core/utils')
const { buildAdmin } = require('./admin')
class Hentity {
  constructor(options = {}) {
    this.apisContainer = containers.createApisContainer(this)
    this.routesContainer = containers.createRoutesContainer(this)
    this.middlewaresContainer = containers.createMiddlewaresContainer(this)
    this.controllersContainer = containers.createControllersContainer(this)
    this.servicesContainer = containers.createServicesContainer(this)
    this.entitiesContainer = containers.createEntitiesContainer(this)

    this.dirname = __dirname
    this.dirs = createDirs(options.dir || process.cwd())
    this.configs = null
    this.db = null
    this.query = null
    this.entityQuery = null
    this.server = createServer(this)
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
    this.db = await createDatabase({ configs: this.configs, models: this.entities })
    this.query = this.db.query
    this.entityQuery = this.db.entityQuery
    this.server.mount()
  }

  async start() {
    try {
      await this.register()
      await this.bootstrap()
      // await buildAdmin({ cwd: this.dirs.cwd, configs: this.configs })

      this.server.listen()


      // console.log(hentity.services.api.book.book)
      // console.log(this.entityQuery)

      // console.log(await hentity.models.cates.findAll({ raw: false }))
    } catch (error) {
      console.log(error)
    }
  }

  get all() {
    return {
      apisContainer: this.apisContainer.getAll(),
      routesContainer: this.routesContainer.getAll(),
      middlewaresContainer: this.middlewaresContainer.getAll(),
      controllersContainer: this.controllersContainer.getAll(),
      servicesContainer: this.servicesContainer.getAll(),
      entitiesContainer: this.entitiesContainer.getAll(),
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

  get entities() {
    return this.entitiesContainer.getAll()
  }
  entity(path) {
    return this.entitiesContainer.get(path)
  }

  cErr(message) {
    // createError
    return { error: true, message }
  }
}

module.exports = (options) => {
  const hentity = new Hentity(options)
  global.hentity = hentity
  return hentity
}

    