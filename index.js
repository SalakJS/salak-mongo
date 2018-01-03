const mongoose = require('mongoose')
const Promise = require('bluebird')
mongoose.Promise = Promise

module.exports = ({ uri, options } = {}, app) => {
  if (!uri) {
    app.logger.app.error('mongo uri must be provided.')
    process.exit(-1)
  }

  options = Object.assign({}, {
    useMongoClient: true
  }, options)

  mongoose.connect(uri, options, function (error) {
    if (error) {
      app.logger.app.error(error)
      process.exit(-1)
    }
  })

  app.models = app.loader.loadDir(app.modules, 'model')
  app.BaseContext.prototype.model = function (name, module) {
    if (!module) {
      module = this.module
    }

    const models = this.app.models[module]
    if (!models || !models[name]) {
      this.logger.app.error(`cannot find model: ${name}`)
      return
    }

    return models[name]
  }
}

module.exports.mongoose = mongoose
