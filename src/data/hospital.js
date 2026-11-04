/**
 * In-memory hospital data shared by the routes, so /api/metrics counts what the other routes store.
 * It resets when the server restarts; a database (MongoDB, sessions 2 and 3) would replace it.
 */

export const doctors = [ // seed doctors, as in the sheet (§3.2)
  { id: 1, name: 'Dr. Sarah Lee', specialty: 'Cardiology' }, // first doctor
  { id: 2, name: 'Dr. Amir Khan', specialty: 'Pediatrics' } // second doctor
]

export const patients = [ // seed patients, as in the sheet (§3.3)
  { id: 1, name: 'Alice', age: 30 }, // first patient
  { id: 2, name: 'John', age: 45 } // second patient
]

export const appointments = [ // seed visit between doctor 1 and patient 1
  { id: 1, doctorId: 1, patientId: 1, date: '2026-11-10' } // one booked visit
]

// Next free id: one more than the highest, so ids stay unique even if items are removed later.
export const nextId = (list) => Math.max(0, ...list.map((item) => item.id)) + 1 // 0 for an empty list gives id 1
