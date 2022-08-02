const express = require('express')
const path = require('path')
const addResponseMethods = require('./utils/addResponseMethods')
const errorsMiddleware = require('./middlewares/errors')

module.exports = () => {
  const cwd = process.cwd()
  const app = express()

  addResponseMethods(app)

  app.use('/admin', express.static(path.resolve(cwd, 'build')))

  app.get('/api', (req, res) => {
    console.log(hentity.middlewares)
    res.ok({ sss: hentity.middleware('global::sss www') })
  })

  app.use(errorsMiddleware())

  app.listen(9322, () => console.log('Listening on http://localhost:9322/admin'))
}
