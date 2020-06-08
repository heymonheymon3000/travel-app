const app = require('../../server/app') 
const supertest = require('supertest')
const request = supertest(app)

describe('Get all trips', () => {
  it('gets the test endpoint', async done => {
    const response = await request.get('/api/allTrips')
    expect(response.status).toBe(200)
    expect(response.body).toEqual([]);
    done()
  })
})