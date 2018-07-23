const request = require('supertest')
const assert = require('assert')
const salakMongo = require('..')
const app = require('./fixture/index')

describe('Test salak-mongo', () => {
  // 清理数据
  afterAll(async () => {
    await app.mongo.dropDatabase()
    for (let key in app.mongos) {
      await app.mongos[key].dropDatabase()
    }
    await app.close()
  })

  describe('exports mongo', () => {
    it('should expose function', () => {
      assert.equal(typeof salakMongo, 'function')
      assert(salakMongo.mongoose)
    })
  })

  describe('load model', () => {
    it('should load model', async () => {
      const res = await request.agent(await app.callback()).get('/test?username=wengeek&title=salak').expect(200)

      assert.deepEqual({ code: 0, msg: 'ok', data: { username: 'wengeek', title: 'salak' } }, JSON.parse(res.text))
    })
  })
})
