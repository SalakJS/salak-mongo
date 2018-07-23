const Salak = require('salak')

const app = new Salak({
  baseDir: __dirname,
  opts: {
    root: 'application',
    runtime: false
  }
})

module.exports = app
