// Lab 5, part 2: JavaScript practice (2.5 is in hospitalData.js and main.js)

// 2.1 Variables and data types
console.log('--- 2.1 Variables and data types ---')
const hospitalName = 'Central Hospital'
const numberOfDoctors = 12
let isOpen = true
if (isOpen) console.log(`Welcome to ${hospitalName}! We have ${numberOfDoctors} doctors currently available.`)
isOpen = false // the hospital closes
if (!isOpen) console.log(`Sorry, ${hospitalName} is closed right now.`)

// 2.2 Arrays and loops
console.log('--- 2.2 Arrays and loops ---')
const doctors = ['Dr. Lee', 'Dr. Khan', 'Dr. Martin', 'Dr. Dubois', 'Dr. Rossi'] // five doctors
let index = 1 // numbering starts at 1
for (const doctor of doctors) {
  console.log(`Doctor #${index}: ${doctor}`) // Doctor #1: Dr. Lee
  index++ // next number
}
doctors.push('Dr. Novak') // add a doctor
console.log('Number of doctors:', doctors.length) // updated count
function findDoctor (name) {
  return doctors.includes(name) ? 'Doctor found' : 'Doctor not found'
}
console.log(findDoctor('Dr. Khan')) // Doctor found

// 2.3 Objects and nested data
console.log('--- 2.3 Objects and nested data ---')
const patient = {
  name: 'Alice Martin',
  age: 34,
  conditions: ['diabetes', 'hypertension'],
  doctor: { name: 'Dr. Lee', specialty: 'Cardiology' }
}
console.log(patient.doctor.name)
console.log(patient.conditions.length) // number of conditions
console.log(`${patient.name} is treated by ${patient.doctor.name} (${patient.doctor.specialty}).`)
patient.conditions.push('anxiety') // new condition
console.log(patient)
// 2.4 Functions and array filtering
console.log('--- 2.4 Functions and array filtering ---')
const patients = [
  { id: 1, name: 'Alice', age: 34 },
  { id: 2, name: 'John', age: 45 },
  { id: 3, name: 'Marie', age: 29 }
]
function filterByAge (minAge) {
  return patients.filter((p) => p.age > minAge) // patients older than minAge
}
function addPatient (name, age) {
  patients.push({ id: patients.length + 1, name, age }) // next id
}
console.log(filterByAge(30))
addPatient('Karim', 52) // a new patient
console.log(patients)

// 2.6 Error handling and validation
console.log('--- 2.6 Error handling and validation ---')
function createAppointment (doctor, patient, date) {
  if (!doctor || !patient || !date) {
    throw new Error('Missing required fields')
  }
  return { doctor, patient, date }
}
try {
  console.log(createAppointment('Dr. Lee', 'Alice', '2025-03-15')) // works
  console.log(createAppointment('Dr. Lee')) // workn't
} catch (err) {
  console.error('Error:', err.message)
}

// 2.7 Asynchronous code
console.log('--- 2.7 Asynchronous code ---')
function getHospitalData () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ name: 'Central Hospital', uptime: 1234 }) // the data, after 1 s
    }, 1000)
  })
}
async function showData () {
  console.log('Fetching hospital data...')
  const data = await getHospitalData() // waits for the promise
  console.log('Data loaded:', data)
}
showData()
