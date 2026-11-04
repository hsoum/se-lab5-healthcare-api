/**
 * Integration tests for /api/appointments (scheduling a visit between a doctor and a patient).
 */
import request from 'supertest' // sends HTTP requests to the app in memory
import app from '../src/app.js' // the Express app, no port needed
import { describe, it, expect } from 'vitest' // test functions

describe('Appointments API', () => {
  it('GET /api/appointments returns the list of appointments', async () => {
    const res = await request(app).get('/api/appointments') // read the collection
    expect(res.status).toBe(200) // OK
    expect(Array.isArray(res.body)).toBe(true) // a JSON array
    expect(res.body[0]).toEqual({ id: 1, doctorId: 1, patientId: 1, date: '2026-11-10' }) // the seed data
  })

  it('POST /api/appointments books a visit between an existing doctor and patient', async () => {
    const res = await request(app).post('/api/appointments').send({ doctorId: 2, patientId: 2, date: '2026-11-20' }) // a valid body
    expect(res.status).toBe(201) // Created
    expect(res.body).toHaveProperty('id') // the server gave it an id
    expect(res.body).toMatchObject({ doctorId: 2, patientId: 2, date: '2026-11-20' }) // fields stored as sent
  })

  it('POST /api/appointments refuses a missing field', async () => {
    const res = await request(app).post('/api/appointments').send({ doctorId: 1, patientId: 1 }) // date missing
    expect(res.status).toBe(400) // Bad Request
    expect(res.body).toEqual({ error: 'Missing required fields' }) // the message the client can show
  })

  it('POST /api/appointments refuses a date that is not YYYY-MM-DD', async () => {
    const res = await request(app).post('/api/appointments').send({ doctorId: 1, patientId: 1, date: '20/11/2026' }) // day-first text
    expect(res.status).toBe(400) // Bad Request
    expect(res.body).toEqual({ error: 'date must be a real day written YYYY-MM-DD' }) // says what is wrong
  })

  it('POST /api/appointments answers 404 for an unknown doctor or patient', async () => {
    const res = await request(app).post('/api/appointments').send({ doctorId: 999, patientId: 1, date: '2026-11-20' }) // no doctor 999
    expect(res.status).toBe(404) // Not Found
    expect(res.body).toEqual({ error: 'Doctor or patient not found' }) // the reference is wrong, not the format
  })
})
