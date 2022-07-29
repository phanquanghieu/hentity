const express = require('express')
const path = require('path')
const addResponseMethods = require('./utils/addResponseMethods')
const errorsMiddleware = require('./middleware/errors')

module.exports = () => {
  const cwd = process.cwd()
  const app = express()

  addResponseMethods(app)

  app.use('/admin', express.static(path.resolve(cwd, 'build')))

  app.get('/api', (req, res) => {
    res.ok({ sss: 333 })
  })

  app.use(errorsMiddleware())

  app.listen(9322, () => console.log('Listening on http://localhost:9322/admin'))
}
