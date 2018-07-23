module.exports = {
  logger: {
    defaultLevel: 'error'
  },
  swagger: {
    enable: false
  },
  plugin: [
    {
      name: 'mongo',
      package: require('../../../..')
    }
  ],
  mongo: {
    client: {
      uri: 'mongodb://127.0.0.1:27017/salak-mongo'
    },
    clients: {
      blog: {
        uri: 'mongodb://127.0.0.1:27017/salak-mongo-blog'
      }
    }
  }
}
