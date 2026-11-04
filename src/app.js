/**
 * Express app configuration.
 * Responsibilities:
 *  - Base routes (/, /health)
 *  - Auto-mount all routers in src/routes/auto/*.route.js
 *  - Global error handler (consistent JSON for errors)
 */
import express from 'express'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { errorHandler } from './utils/errorHandler.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Parse JSON bodies before any route reads req.body (sheet §3.1.1); without it every POST body is undefined
app.use(express.json())

// Simple root + health endpoints
app.get('/', (_req, res) => res.json({ ok: true, message: 'Hello from CI/CD demo 👋' }))
app.get('/health', (_req, res) => res.status(200).send('OK'))

// Auto-mount all routers placed under src/routes/auto
const autoDir = path.join(__dirname, 'routes', 'auto')
if (fs.existsSync(autoDir)) {
  const files = fs.readdirSync(autoDir).filter(f => f.endsWith('.route.js')).sort() // sorted: the same mount order on every OS
  for (const f of files) {
    const mod = await import(pathToFileURL(path.join(autoDir, f)).href) // import(), not require(): Vitest then sees the file and counts its coverage
    if (mod.default) app.use('/', mod.default) // each route file exports its router as default
  }
}

// Global error middleware last
app.use(errorHandler)

export default app
