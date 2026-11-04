/**
 * Integration tests for /api/patients (Patient Management).
 */
import request from 'supertest' // sends HTTP requests to the app in memory
import app from '../src/app.js' // the Express app, no port needed
import { describe, it, expect } from 'vitest' // test functions

describe('Patients API', () => {
  it('GET /api/patients returns the list of patients', async () => {
    const res = await request(app).get('/api/patients') // read the collection
    expect(res.status).toBe(200) // OK
    expect(Array.isArray(res.body)).toBe(true) // a JSON array
    expect(res.body[0]).toEqual({ id: 1, name: 'Alice', age: 30 }) // the seed data
  })

  it('POST /api/patients adds a new patient', async () => {
    const res = await request(app).post('/api/patients').send({ name: 'Marie', age: 29 }) // a valid body
    expect(res.status).toBe(201) // Created
    expect(res.body).toHaveProperty('id') // the server gave it an id
    expect(res.body).toMatchObject({ name: 'Marie', age: 29 }) // fields stored as sent
  })

  it('POST /api/patients refuses a missing field', async () => {
    const res = await request(app).post('/api/patients').send({ name: 'No Age' }) // age missing
    expect(res.status).toBe(400) // Bad Request
    expect(res.body).toEqual({ error: 'Missing required fields' }) // the message the client can show
  })

  it('POST /api/patients refuses an age that is not a whole number from 0 to 130', async () => {
    const res = await request(app).post('/api/patients').send({ name: 'Bad Age', age: 'thirty' }) // text instead of a number
    expect(res.status).toBe(400) // Bad Request
    expect(res.body).toEqual({ error: 'age must be a whole number from 0 to 130' }) // says what is wrong
  })
})
