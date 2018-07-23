module.exports = ({ db, Schema }, app) => {
  const User = new Schema({
    username: {
      type: String,
      unique: true,
      required: true
    }
  })

  return db.model('User', User, 'User')
}
