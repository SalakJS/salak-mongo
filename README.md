# salak-mongo

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![David deps][david-image]][david-url]
[![NPM download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/salak-mongo.svg?style=flat-square
[npm-url]: https://npmjs.org/package/salak-mongo
[travis-image]: https://img.shields.io/travis/SalakJS/salak-mongo.svg?style=flat-square
[travis-url]: https://travis-ci.org/SalakJS/salak-mongo
[david-image]: https://img.shields.io/david/SalakJS/salak-mongo.svg?style=flat-square
[david-url]: https://david-dm.org/SalakJS/salak-mongo
[download-image]: https://img.shields.io/npm/dm/salak-mongo.svg?style=flat-square
[download-url]: https://npmjs.org/package/salak-mongo

Mongoose for SalakJS 2.0, support for multiple mongodb.

## Install

```sh
$ npm install --save salak-mongo
```

## Usage

### Config

In plugin:

```javascript
module.exports = {
  plugin: [
    {
      name: 'mongo',
      package: 'salak-mongo'
    }
  ],
  mongo: {
    client: {
      uri: 'mongodb://localhost:27017/yourdb'
    }
  }
}
```

### Model

Salak will autoload the model directory from all modules.

Such as common/model/user.js:

```javascript
module.exports = ({ db, Schema }, app) => {
  const User = new Schema({
    username: {
      type: String,
      unique: true
    }
  })

  return db.model('User', User, 'User')
}
```

### Use in Service or Controller

common/service/user.js

```javascript
const { Service } = require('salak')

class User extends Service {
  async createUser (username) {
    const user = await this.model('user').create({
      username
    })

    return user
  }
}

module.exports = User
```

## API

### Options

- dirname {String} directory for storing models, default `model`
- extend {Array<String>} extend properties, default `['service']`
- client {Object} mongoose connection info, like { uri: '', options: {} }
- client.options {Object} default `{ useNewUrlParser: true, server: { reconnectTries: 60 * 60 * 24, reconnectInterval: 1000 } }`
- clients {Object} mongoose connections, { key: client }
- options {Object} mongoose global connection options

### mongoose

Ref to [mongoose](https://github.com/Automattic/mongoose)

### Service.prototype.model(name, module)

The function which register on Service

- name {String} model filename
- module {String} the model located in, default: the current module

@return model

## License

MIT
