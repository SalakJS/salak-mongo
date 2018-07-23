const { Service } = require('salak')

class Post extends Service {
  async createPost (title) {
    const post = await this.model('post').create({
      title
    })

    return post
  }
}

module.exports = Post
