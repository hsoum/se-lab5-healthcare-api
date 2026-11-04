/**
 * Metrics: GET /api/metrics returns hospital counts and system stats.
 * Auto-mounted at "/" by app.js, so the full path is written here.
 */
import { Router } from 'express' // Express router
import { appointments, doctors, patients } from '../../data/hospital.js' // shared in-memory data
import { getRuntimeInfo } from '../../utils/appInfo.js' // Node version and uptime, already in the starter

const router = Router() // this file's routes

router.get('/api/metrics', (_req, res) => {
  res.status(200).json({ // 200 with two groups of numbers
    hospital: { doctors: doctors.length, patients: patients.length, appointments: appointments.length }, // what the API stores
    system: getRuntimeInfo() // { node, uptime } of the running process
  })
})

export default router
