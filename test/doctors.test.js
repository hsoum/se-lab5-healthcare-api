/**
 * Integration tests for /api/doctors (Doctor Management).
 */
import request from 'supertest' // sends HTTP requests to the app in memory
import app from '../src/app.js' // the Express app, no port needed
import { describe, it, expect } from 'vitest' // test functions

describe('Doctors API', () => {
  it('GET /api/doctors returns the list of doctors', async () => {
    const res = await request(app).get('/api/doctors') // read the collection
    expect(res.status).toBe(200) // OK
    expect(Array.isArray(res.body)).toBe(true) // a JSON array
    expect(res.body[0]).toEqual({ id: 1, name: 'Dr. Sarah Lee', specialty: 'Cardiology' }) // the seed data
  })

  it('POST /api/doctors adds a new doctor', async () => {
    const res = await request(app).post('/api/doctors').send({ name: 'Dr. Julie', specialty: 'Neurology' }) // a valid body
    expect(res.status).toBe(201) // Created
    expect(res.body).toHaveProperty('id') // the server gave it an id
    expect(res.body).toMatchObject({ name: 'Dr. Julie', specialty: 'Neurology' }) // fields stored as sent
  })

  it('POST /api/doctors refuses a missing field', async () => {
    const res = await request(app).post('/api/doctors').send({ name: 'Dr. No Specialty' }) // specialty missing
    expect(res.status).toBe(400) // Bad Request
    expect(res.body).toEqual({ error: 'Missing required fields' }) // the message the client can show
  })
})
