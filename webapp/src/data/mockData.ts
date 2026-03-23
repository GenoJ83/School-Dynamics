export type Student = {
  id: string
  admissionNo: string
  name: string
  className: string
  stream: string
  guardian: string
  phone: string
  status: 'active' | 'inactive'
}

export type FeeInvoice = {
  id: string
  studentId: string
  studentName: string
  term: string
  amount: number
  paid: number
  due: string
  status: 'paid' | 'partial' | 'overdue'
}

export type AttendanceRow = {
  id: string
  studentId: string
  studentName: string
  className: string
  date: string
  present: boolean
}

export type ExamResult = {
  id: string
  studentId: string
  studentName: string
  subject: string
  term: string
  score: number
  max: number
  grade: string
}

export type MessageThread = {
  id: string
  from: string
  preview: string
  channel: 'sms' | 'email' | 'whatsapp' | 'internal'
  sentAt: string
}

export type SchoolData = {
  students: Student[]
  feeInvoices: FeeInvoice[]
  attendance: AttendanceRow[]
  exams: ExamResult[]
  messages: MessageThread[]
}

export const MOCK_SCHOOL = {
  name: 'St. Mary’s School',
  location: 'Kampala, Uganda',
}

const SEED_STUDENTS: Student[] = [
  {
    id: '1',
    admissionNo: 'SD-2024-001',
    name: 'Sarah Nabukeera',
    className: 'P.6',
    stream: 'East',
    guardian: 'James Nabukeera',
    phone: '+256 701 234 567',
    status: 'active',
  },
  {
    id: '2',
    admissionNo: 'SD-2024-014',
    name: 'John Okello',
    className: 'S.2',
    stream: 'Science',
    guardian: 'Mary Okello',
    phone: '+256 772 888 901',
    status: 'active',
  },
  {
    id: '3',
    admissionNo: 'SD-2023-088',
    name: 'Mary Atwine',
    className: 'P.4',
    stream: 'West',
    guardian: 'Peter Atwine',
    phone: '+256 703 456 789',
    status: 'active',
  },
  {
    id: '4',
    admissionNo: 'SD-2022-201',
    name: 'David Mukasa',
    className: 'S.4',
    stream: 'Arts',
    guardian: 'Grace Mukasa',
    phone: '+256 750 111 222',
    status: 'inactive',
  },
]

function seedAttendanceFor(students: Student[], date: string): AttendanceRow[] {
  return students
    .filter((s) => s.status === 'active')
    .map((s, i) => ({
      id: `A-${date}-${s.id}`,
      studentId: s.id,
      studentName: s.name,
      className: s.className,
      date,
      present: i !== 1,
    }))
}

export const todayIsoDate = () => new Date().toISOString().slice(0, 10)

const SEED_FEES: FeeInvoice[] = [
  {
    id: 'F-101',
    studentId: '1',
    studentName: 'Sarah Nabukeera',
    term: 'Term 1 · 2025',
    amount: 1_200_000,
    paid: 1_200_000,
    due: '2025-02-01',
    status: 'paid',
  },
  {
    id: 'F-102',
    studentId: '2',
    studentName: 'John Okello',
    term: 'Term 1 · 2025',
    amount: 1_450_000,
    paid: 800_000,
    due: '2025-02-01',
    status: 'partial',
  },
  {
    id: 'F-103',
    studentId: '3',
    studentName: 'Mary Atwine',
    term: 'Term 1 · 2025',
    amount: 980_000,
    paid: 0,
    due: '2025-01-15',
    status: 'overdue',
  },
]

const SEED_EXAMS: ExamResult[] = [
  {
    id: 'E-1',
    studentId: '1',
    studentName: 'Sarah Nabukeera',
    subject: 'Mathematics',
    term: 'Term 1 · 2025',
    score: 82,
    max: 100,
    grade: 'A',
  },
  {
    id: 'E-2',
    studentId: '1',
    studentName: 'Sarah Nabukeera',
    subject: 'English',
    term: 'Term 1 · 2025',
    score: 76,
    max: 100,
    grade: 'B+',
  },
  {
    id: 'E-3',
    studentId: '2',
    studentName: 'John Okello',
    subject: 'Mathematics',
    term: 'Term 1 · 2025',
    score: 91,
    max: 100,
    grade: 'A',
  },
]

const SEED_MESSAGES: MessageThread[] = [
  {
    id: 'M-1',
    from: 'James Nabukeera',
    preview: 'Please confirm Term 1 fees receipt for Sarah.',
    channel: 'whatsapp',
    sentAt: new Date().toISOString(),
  },
  {
    id: 'M-2',
    from: 'Mary Okello',
    preview: 'John was absent yesterday — any homework to catch up?',
    channel: 'sms',
    sentAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'M-3',
    from: 'School office',
    preview: 'PTA meeting this Friday 4pm. All parents welcome.',
    channel: 'internal',
    sentAt: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
]

export function createInitialSchoolData(): SchoolData {
  const students = structuredClone(SEED_STUDENTS)
  return {
    students,
    feeInvoices: structuredClone(SEED_FEES),
    attendance: seedAttendanceFor(students, todayIsoDate()),
    exams: structuredClone(SEED_EXAMS),
    messages: structuredClone(SEED_MESSAGES),
  }
}

export function deriveFeeStatus(amount: number, paid: number, due: string): FeeInvoice['status'] {
  if (paid >= amount) return 'paid'
  const dueTime = new Date(due).setHours(23, 59, 59, 999)
  if (Date.now() > dueTime) return 'overdue'
  return 'partial'
}

export function gradeFromScore(score: number, max: number): string {
  if (max <= 0) return '—'
  const p = score / max
  if (p >= 0.9) return 'A'
  if (p >= 0.8) return 'B+'
  if (p >= 0.7) return 'B'
  if (p >= 0.6) return 'C'
  if (p >= 0.5) return 'D'
  return 'E'
}

export function formatUgx(n: number): string {
  return new Intl.NumberFormat('en-UG', {
    style: 'currency',
    currency: 'UGX',
    maximumFractionDigits: 0,
  }).format(n)
}

export function formatMessageTime(iso: string): string {
  const d = new Date(iso)
  const now = new Date()
  if (d.toDateString() === now.toDateString()) {
    return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
  }
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

/** Attendance rows for active students on `date`; merges with existing `present` flags when ids match. */
export function buildRollForDate(
  students: Student[],
  date: string,
  existing: AttendanceRow[],
): AttendanceRow[] {
  const byKey = new Map(existing.filter((r) => r.date === date).map((r) => [r.studentId, r]))
  return students
    .filter((s) => s.status === 'active')
    .map((s) => {
      const prev = byKey.get(s.id)
      if (prev) return prev
      return {
        id: `A-${date}-${s.id}`,
        studentId: s.id,
        studentName: s.name,
        className: s.className,
        date,
        present: true,
      }
    })
}
