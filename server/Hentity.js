const src = require('./src')

class Hentity {
  constructor(options = {}) {
    const rootDir = options.dir || process.cwd()
  }

  run() {
    src()
  }
}

module.exports = Hentity
