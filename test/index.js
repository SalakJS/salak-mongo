const request = require('supertest')
const assert = require('assert')
const salakMongo = require('..')
const app = require('./fixture/index')

describe('Test salak-mongo', () => {
  // 清理数据
  afterAll(async () => {
    await salakMongo.mongoose.connection.dropDatabase()
    await salakMongo.mongoose.disconnect()
  })

  describe('exports mongo', () => {
    it('should expose function', () => {
      assert.equal(typeof salakMongo, 'function')
      assert(salakMongo.mongoose)
    })
  })

  describe('load model', () => {
    it('should load model', (done) => {
      request.agent(app.callback())
        .get('/test?username=wengeek')
        .expect(200, (err, res) => {
          if (err) {
            done(err)
            return
          }

          assert.deepEqual({ code: 0, msg: 'ok', data: { username: 'wengeek' } }, JSON.parse(res.text))
          done()
        })
    })
  })
})
