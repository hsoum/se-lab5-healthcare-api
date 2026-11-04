// Vitest settings. Vitest reads this file, not a "vitest" block in package.json, so the coverage limits live here.
import { defineConfig } from 'vitest/config' // typed config helper

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8', // V8's built-in coverage
      include: ['src/**/*.js'], // every source file counts, tested or not
      exclude: ['src/index.js'], // only starts the server (app.listen); the tests use app.js directly
      thresholds: { lines: 80, functions: 80, branches: 70, statements: 80 } // the lab's limits: below them `npm test -- --coverage` fails, so CI fails
    }
  }
})
