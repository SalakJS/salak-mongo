const mongoose = require('mongoose')
const assert = require('assert')
const is = require('is-type-of')

mongoose.Promise = global.Promise

module.exports = ({
  dirname = 'model',
  client,
  clients,
  options
} = {}, app) => {
  assert(dirname, 'salak-mongo must be provide dirname like mongo or model')

  const createDatabase = (client) => {
    const db = mongoose.createConnection(client.uri, Object.assign({
      useNewUrlParser: true
    }, options, client.options))

    db.on('error', (err) => {
      app.logger.error(err)
    })

    return db
  }

  assert(is.object(client || clients), 'salak-mongo must provide client or clients which should be object.')

  const db = client && createDatabase(client)
  const dbs = {}

  if (db) {
    app.mongo = db
  }

  if (clients) {
    for (let key in clients) {
      dbs[key] = createDatabase(clients[key])
    }

    app.mongos = dbs
  }

  app.beforeClose(async () => {
    await mongoose.disconnect()
  })

  app.models = app.loader.loadFiles(app.modules, dirname, {
    call: (obj) => {
      if (is.function(obj)) {
        return obj({
          db,
          dbs,
          Schema: mongoose.Schema
        }, app)
      }

      return obj
    }
  })

  return {
    service: {
      [dirname] (name, module) {
        if (!module) {
          module = this.module
        }

        const models = this.app.models[module]
        if (!models || !models[name]) {
          this.app.logger.error(`cannot find model: ${name}`)
          return
        }

        return models[name]
      }
    }
  }
}

module.exports.mongoose = mongoose
