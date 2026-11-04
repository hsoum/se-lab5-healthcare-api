// Lab 5, 2.5: imports from hospitalData.js and calls the function. Run: node main.js
import { doctors, addDoctor } from './hospitalData.js'

addDoctor('Dr. Martin') // a new doctor
console.log('Updated doctors:', doctors)
