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

Mongoose for SalakJS.

## Install

```sh
$ npm install --save salak-mongo
```

## Usage

### Config

In middleware:

```javascript
module.exports = {
  middleware: [
    {
      name: 'mongo',
      package: require('salak-mongo')
    }
  ],
  mongo: {
    uri: 'mongodb://localhost:27017/yourdb'
  }
}
```

### Model

Salak will autoload the model directory from all modules.

Such as common/model/user.js:

```javascript
const { mongoose } = require('salak-mongo')
const Schema = mongoose.Schema

const User = new Schema({
  username: {
    type: String,
    unique: true
  }
})

module.exports = mongoose.model('User', User, 'User')
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

### mongoose

Ref to [mongoose](https://github.com/Automattic/mongoose)

### BaseContext.prototype.model(name, module)

The function which register on BaseContext

- name: model filename
- module: the model located in, default: the current module

@return model

## License

MIT
