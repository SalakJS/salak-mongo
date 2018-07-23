const { Controller } = require('salak')

class Test extends Controller {
  async actionIndex () {
    const { username, title } = this.query
    const user = await this.service('user').createUser(username)
    const post = await this.service('post').createPost(title)

    this.ctx.body = {
      code: 0,
      msg: 'ok',
      data: {
        username: user.username,
        title: post.title
      }
    }
  }
}

module.exports = Test
