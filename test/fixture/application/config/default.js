module.exports = {
  swagger: {
    enable: false
  },
  logger: {
    defaultLevel: 'error'
  },
  middleware: [
    {
      name: 'mongo',
      package: require('../../../..')
    }
  ],
  mongo: {
    uri: 'mongodb://127.0.0.1:27017/salak-mongo'
  }
}
