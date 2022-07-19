const express = require('express')
const path = require('path')
const addResponseMethods = require('./utils/addResponseMethods')
const errorsMiddleware = require('./middleware/errors')

const cwd = process.cwd()
const app = express()

addResponseMethods(app)
app.use(express.static(path.resolve(cwd, '../admin/build')))
app.get('/admin', (req, res) => {
  // const data = { ssss: JSON.stringify(Object.getPrototypeOf(Object.getPrototypeOf(res))) }
  res.sendFile(path.resolve(cwd, '../admin/build/index.html'))
})

app.use(errorsMiddleware())

app.listen(9322, () => console.log('listening on port 9322'))
