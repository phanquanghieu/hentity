const { createDatabase } = require('./core/database')
let models = [
  {
    type: 'collection',
    tableName: 'files',
    singularName: 'file',
    pluralName: 'files',
    displayName: 'File',
    attributes: {
      name: {
        type: 'string',
        configurable: false,
        required: true,
      },
      alternativeText: {
        type: 'string',
        configurable: false,
      },
      caption: {
        type: 'string',
        configurable: false,
      },
      width: {
        type: 'integer',
        configurable: false,
      },
      height: {
        type: 'integer',
        configurable: false,
      },
      formats: {
        type: 'json',
        configurable: false,
      },
      hash: {
        type: 'string',
        configurable: false,
        required: true,
      },
      ext: {
        type: 'string',
        configurable: false,
      },
      mime: {
        type: 'string',
        configurable: false,
        required: true,
      },
      size: {
        type: 'decimal',
        configurable: false,
        required: true,
      },
      url: {
        type: 'string',
        configurable: false,
        required: true,
      },
      previewUrl: {
        type: 'string',
        configurable: false,
      },
      provider: {
        type: 'string',
        configurable: false,
        required: true,
      },
      provider_metadata: {
        type: 'json',
        configurable: false,
      },
      // related: {
      //   type: 'relation',
      //   relation: 'morphToMany',
      //   configurable: false,
      // },
    },
  },
  {
    type: 'collection',
    tableName: 'pros',
    singularName: 'pro',
    pluralName: 'pros',
    displayName: 'File',
    attributes: {
      data: {
        type: 'datetime',
        configurable: false,
      },
    },
  },
]

const run = async () => {
  const configs = {
    database: {
      connectionString: 'mysql://root:password@localhost:3306/test',
    },
  }
  const db = await createDatabase({ configs, models })
  console.log(db.models)
  // const r = await db.models
  // const r = await db.models.movies.create(
  //   { name: 'movie1', actor: { name: 'actor1' } },
  //   { include: 'actor' }
  // )
  const r = await db.models.movies.findOne({
    include: 'actor',
  })
  // r.setActor(1)
  console.log(JSON.parse(JSON.stringify(r)))
  // await db.models.movies.drop()
  // await db.models.actors.drop()
}

run()
