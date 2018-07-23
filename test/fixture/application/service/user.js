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
