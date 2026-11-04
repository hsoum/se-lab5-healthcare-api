/**
 * Small input checks shared by the routes.
 */

// True when at least one of the named fields is absent, null or an empty string (0 and false count as present).
export const hasMissing = (body, fields) => fields.some((field) => body?.[field] === undefined || body[field] === null || body[field] === '') // body may be undefined

// True for a real calendar day written YYYY-MM-DD (2026-02-30 is refused).
export const isCalendarDay = (text) =>
  /^\d{4}-\d{2}-\d{2}$/.test(text) && // the shape first
  new Date(`${text}T00:00:00Z`).toISOString().slice(0, 10) === text // then the day must survive a round trip through Date
