const { join } = require('path')

module.exports = (cwd) => ({
  cwd,
  configs: join(cwd, 'configs'),
  src: join(cwd, 'src'),
  apis: join(cwd, 'src', 'apis'),
  components: join(cwd, 'src', 'components'),
  middlewares: join(cwd, 'src', 'middlewares'),
})
