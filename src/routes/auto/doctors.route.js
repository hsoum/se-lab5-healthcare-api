/**
 * Doctor Management: GET /api/doctors lists the doctors, POST /api/doctors adds one.
 * Auto-mounted at "/" by app.js, so the full path is written here.
 */
import { Router } from 'express' // Express router
import { doctors, nextId } from '../../data/hospital.js' // shared in-memory data
import { hasMissing } from '../../utils/validate.js' // missing-field check

const router = Router()

router.get('/api/doctors', (_req, res) => res.status(200).json(doctors))

router.post('/api/doctors', (req, res) => {
  if (hasMissing(req.body, ['name', 'specialty'])) return res.status(400).json({ error: 'Missing required fields' })
  const doctor = { id: nextId(doctors), name: req.body.name, specialty: req.body.specialty }
  doctors.push(doctor)
  res.status(201).json(doctor)
})

export default router
