const { Controller } = require('salak')

class Test extends Controller {
  async actionIndex () {
    const { username } = this.query
    const user = await this.service('user').createUser(username)

    this.sendJson(0, 'ok', {
      username: user.username
    })
  }
}

module.exports = Test
