/**
 * Integration tests for /api/metrics (system and hospital stats).
 */
import request from 'supertest' // sends HTTP requests to the app in memory
import app from '../src/app.js' // the Express app, no port needed
import { describe, it, expect } from 'vitest' // test functions

describe('Metrics API', () => {
  it('GET /api/metrics returns hospital counts and system stats', async () => {
    const res = await request(app).get('/api/metrics') // read the stats
    expect(res.status).toBe(200) // OK
    expect(res.body.hospital).toEqual({ doctors: 2, patients: 2, appointments: 1 }) // the seed data, counted
    expect(res.body.system.uptime).toBeTypeOf('number') // seconds since start
    expect(res.body.system.node).toBe(process.version) // runtime version
  })

  it('GET /api/metrics counts a doctor added through the API', async () => {
    await request(app).post('/api/doctors').send({ name: 'Dr. Count', specialty: 'Dermatology' }) // one more doctor
    const res = await request(app).get('/api/metrics') // read the stats again
    expect(res.body.hospital.doctors).toBe(3) // the count follows the data
  })
})
