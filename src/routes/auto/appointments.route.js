/**
 * Appointments: GET /api/appointments lists the visits, POST /api/appointments books one between a doctor and a patient.
 * Auto-mounted at "/" by app.js, so the full path is written here.
 */
import { Router } from 'express' // Express router
import { appointments, doctors, patients, nextId } from '../../data/hospital.js' // shared in-memory data
import { hasMissing, isCalendarDay } from '../../utils/validate.js' // input checks

const router = Router() // this file's routes

router.get('/api/appointments', (_req, res) => res.status(200).json(appointments)) // 200 with every appointment

router.post('/api/appointments', (req, res) => {
  if (hasMissing(req.body, ['doctorId', 'patientId', 'date'])) return res.status(400).json({ error: 'Missing required fields' }) // all three are required
  const { doctorId, patientId, date } = req.body // the three fields
  if (!isCalendarDay(date)) return res.status(400).json({ error: 'date must be a real day written YYYY-MM-DD' }) // one unambiguous date format
  const known = doctors.some((d) => d.id === doctorId) && patients.some((p) => p.id === patientId) // both people must exist
  if (!known) return res.status(404).json({ error: 'Doctor or patient not found' }) // a wrong reference, not a wrong format
  const appointment = { id: nextId(appointments), doctorId, patientId, date } // only the known fields are kept
  appointments.push(appointment) // store it
  res.status(201).json(appointment) // 201 Created with the new appointment
})

export default router
