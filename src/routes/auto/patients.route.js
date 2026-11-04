/**
 * Patient Management: GET /api/patients lists the patients, POST /api/patients adds one.
 * Auto-mounted at "/" by app.js, so the full path is written here.
 */
import { Router } from 'express' // Express router
import { patients, nextId } from '../../data/hospital.js' // shared in-memory data
import { hasMissing } from '../../utils/validate.js' // missing-field check

const router = Router() // this file's routes

router.get('/api/patients', (_req, res) => res.status(200).json(patients)) // 200 with every patient

router.post('/api/patients', (req, res) => {
  if (hasMissing(req.body, ['name', 'age'])) return res.status(400).json({ error: 'Missing required fields' }) // both fields are required
  const { name, age } = req.body // the two fields
  if (!Number.isInteger(age) || age < 0 || age > 130) return res.status(400).json({ error: 'age must be a whole number from 0 to 130' }) // 0 is a newborn, so it is allowed
  const patient = { id: nextId(patients), name, age } // only the known fields are kept
  patients.push(patient) // store it
  res.status(201).json(patient) // 201 Created with the new patient
})

export default router
