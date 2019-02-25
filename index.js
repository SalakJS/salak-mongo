const mongoose = require('mongoose')
const assert = require('assert')
const is = require('is-type-of')

const { Schema } = mongoose
mongoose.Promise = global.Promise

const ALLOW_EXTENDS = ['base', 'controller', 'service', 'schedule']

module.exports = ({
  dirname = 'model',
  extend = ['service'],
  client,
  clients,
  options
} = {}, app) => {
  assert(dirname, 'salak-mongo must be provide dirname like mongo or model')

  const createDatabase = (client) => {
    const db = mongoose.createConnection(client.uri, Object.assign({
      useNewUrlParser: true,
      useCreateIndex: true,
      // retry in one day
      reconnectTries: 60 * 60 * 24,
      reconnectInterval: 1000
    }, options, client.options))

    db.on('error', (err) => {
      app.emit('error', err)
    })

    db.Schema = Schema
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
          Schema
        }, app)
      }

      return obj
    }
  })

  const extension = {}

  extend = Array.isArray(extend) ? extend : [extend]
  extend = extend.filter((item) => ALLOW_EXTENDS.indexOf(item) !== -1)
  extend = extend.length ? extend : ['service']

  extend.forEach((item) => {
    extension[item] = {
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
  })

  return extension
}

module.exports.mongoose = mongoose
