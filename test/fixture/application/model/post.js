module.exports = ({ dbs, Schema }, app) => {
  const db = dbs['blog']
  const Post = new Schema({
    title: { type: String }
  })

  return db.model('Post', Post, 'Post')
}
