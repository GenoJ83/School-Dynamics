import type { Student } from '../data/mockData'

function normalizeDigits(s: string): string {
  return s.replace(/\D/g, '')
}

/** Match by admission number or registered contact phone digits. */
export function findStudentsForParentLookup(input: string, students: Student[]): Student[] {
  const q = input.trim()
  if (!q) return []

  const byAdmission = students.filter(
    (s) => s.admissionNo.toLowerCase() === q.toLowerCase(),
  )
  if (byAdmission.length) return byAdmission

  const digits = normalizeDigits(q)
  if (digits.length < 7) return []

  return students.filter((s) => {
    const p = normalizeDigits(s.phone)
    return p === digits || p.endsWith(digits) || p.includes(digits)
  })
}
