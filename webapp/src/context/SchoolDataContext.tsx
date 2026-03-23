import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'
import {
  type ExamResult,
  type FeeInvoice,
  type MessageThread,
  type SchoolData,
  type Student,
  buildRollForDate,
  createInitialSchoolData,
  deriveFeeStatus,
  gradeFromScore,
  todayIsoDate,
} from '../data/mockData'

export type NewStudentInput = Omit<Student, 'id' | 'admissionNo'> & { admissionNo?: string }
export type NewFeeInput = {
  studentId: string
  term: string
  amount: number
  paid: number
  due: string
}
export type NewExamInput = {
  studentId: string
  subject: string
  term: string
  score: number
  max: number
}
export type NewMessageInput = { from: string; preview: string; channel: MessageThread['channel'] }

const STORAGE_KEY = 'sd_school_data_v1'

type Action =
  | { type: 'HYDRATE'; payload: SchoolData }
  | { type: 'RESET' }
  | {
      type: 'ADD_STUDENT'
      payload: Omit<Student, 'id' | 'admissionNo'> & { admissionNo?: string }
    }
  | { type: 'REMOVE_STUDENT'; studentId: string }
  | {
      type: 'ADD_FEE'
      payload: {
        studentId: string
        term: string
        amount: number
        paid: number
        due: string
      }
    }
  | {
      type: 'ADD_EXAM'
      payload: {
        studentId: string
        subject: string
        term: string
        score: number
        max: number
      }
    }
  | {
      type: 'ADD_MESSAGE'
      payload: { from: string; preview: string; channel: MessageThread['channel'] }
    }
  | { type: 'TOGGLE_ATTENDANCE'; id: string }
  | { type: 'SYNC_ROLL'; date: string }

function nextAdmissionNo(students: Student[]): string {
  const year = new Date().getFullYear()
  const prefix = `SD-${year}-`
  let max = 0
  for (const s of students) {
    if (s.admissionNo.startsWith(prefix)) {
      const n = parseInt(s.admissionNo.slice(prefix.length), 10)
      if (!Number.isNaN(n)) max = Math.max(max, n)
    }
  }
  return `${prefix}${String(max + 1).padStart(3, '0')}`
}

function nextInvoiceId(invoices: FeeInvoice[]): string {
  let max = 100
  for (const f of invoices) {
    const m = /^F-(\d+)$/.exec(f.id)
    if (m) max = Math.max(max, parseInt(m[1], 10))
  }
  return `F-${max + 1}`
}

function nextExamId(exams: ExamResult[]): string {
  let max = 0
  for (const e of exams) {
    const m = /^E-(\d+)$/.exec(e.id)
    if (m) max = Math.max(max, parseInt(m[1], 10))
  }
  return `E-${max + 1}`
}

function reducer(state: SchoolData, action: Action): SchoolData {
  switch (action.type) {
    case 'HYDRATE':
      return action.payload
    case 'RESET':
      return createInitialSchoolData()
    case 'ADD_STUDENT': {
      const id = crypto.randomUUID()
      const admissionNo = action.payload.admissionNo?.trim() || nextAdmissionNo(state.students)
      const student: Student = {
        id,
        admissionNo,
        name: action.payload.name.trim(),
        className: action.payload.className.trim(),
        stream: action.payload.stream.trim(),
        guardian: action.payload.guardian.trim(),
        phone: action.payload.phone.trim(),
        status: action.payload.status,
      }
      let attendance = state.attendance
      if (student.status === 'active') {
        const d = todayIsoDate()
        const has = attendance.some((r) => r.studentId === id && r.date === d)
        if (!has) {
          attendance = [
            ...attendance,
            {
              id: `A-${d}-${id}`,
              studentId: id,
              studentName: student.name,
              className: student.className,
              date: d,
              present: true,
            },
          ]
        }
      }
      return { ...state, students: [...state.students, student], attendance }
    }
    case 'REMOVE_STUDENT': {
      const id = action.studentId
      return {
        ...state,
        students: state.students.filter((s) => s.id !== id),
        feeInvoices: state.feeInvoices.filter((f) => f.studentId !== id),
        exams: state.exams.filter((e) => e.studentId !== id),
        attendance: state.attendance.filter((a) => a.studentId !== id),
      }
    }
    case 'ADD_FEE': {
      const student = state.students.find((s) => s.id === action.payload.studentId)
      if (!student) return state
      const { amount, paid, due, term } = action.payload
      const inv: FeeInvoice = {
        id: nextInvoiceId(state.feeInvoices),
        studentId: student.id,
        studentName: student.name,
        term: term.trim(),
        amount,
        paid,
        due,
        status: deriveFeeStatus(amount, paid, due),
      }
      return { ...state, feeInvoices: [...state.feeInvoices, inv] }
    }
    case 'ADD_EXAM': {
      const student = state.students.find((s) => s.id === action.payload.studentId)
      if (!student) return state
      const { score, max, subject, term } = action.payload
      const exam: ExamResult = {
        id: nextExamId(state.exams),
        studentId: student.id,
        studentName: student.name,
        subject: subject.trim(),
        term: term.trim(),
        score,
        max,
        grade: gradeFromScore(score, max),
      }
      return { ...state, exams: [...state.exams, exam] }
    }
    case 'ADD_MESSAGE': {
      const msg: MessageThread = {
        id: `M-${crypto.randomUUID().slice(0, 8)}`,
        from: action.payload.from.trim(),
        preview: action.payload.preview.trim(),
        channel: action.payload.channel,
        sentAt: new Date().toISOString(),
      }
      return { ...state, messages: [msg, ...state.messages] }
    }
    case 'SYNC_ROLL': {
      const date = action.date
      const merged = buildRollForDate(state.students, date, state.attendance)
      const other = state.attendance.filter((r) => r.date !== date)
      return { ...state, attendance: [...other, ...merged] }
    }
    case 'TOGGLE_ATTENDANCE':
      return {
        ...state,
        attendance: state.attendance.map((r) =>
          r.id === action.id ? { ...r, present: !r.present } : r,
        ),
      }
    default:
      return state
  }
}

function loadStored(): SchoolData {
  const fallback = createInitialSchoolData()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return fallback
    const data = JSON.parse(raw) as Partial<SchoolData>
    if (!data?.students || !Array.isArray(data.students)) return fallback
    return {
      students: data.students,
      feeInvoices: Array.isArray(data.feeInvoices) ? data.feeInvoices : fallback.feeInvoices,
      attendance: Array.isArray(data.attendance) ? data.attendance : fallback.attendance,
      exams: Array.isArray(data.exams) ? data.exams : fallback.exams,
      messages: Array.isArray(data.messages) ? data.messages : fallback.messages,
    }
  } catch {
    return fallback
  }
}

type SchoolDataContextValue = {
  data: SchoolData
  addStudent: (input: NewStudentInput) => void
  removeStudent: (studentId: string) => void
  addFee: (input: NewFeeInput) => void
  addExam: (input: NewExamInput) => void
  addMessage: (input: NewMessageInput) => void
  syncRollForDate: (date: string) => void
  toggleAttendance: (id: string) => void
  resetToDefaults: () => void
}

const SchoolDataContext = createContext<SchoolDataContextValue | null>(null)

export function SchoolDataProvider({ children }: { children: ReactNode }) {
  const [data, dispatch] = useReducer(reducer, undefined, loadStored)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const addStudent = useCallback((payload: NewStudentInput) => {
    dispatch({ type: 'ADD_STUDENT', payload })
  }, [])

  const removeStudent = useCallback((studentId: string) => {
    dispatch({ type: 'REMOVE_STUDENT', studentId })
  }, [])

  const addFee = useCallback((payload: NewFeeInput) => {
    dispatch({ type: 'ADD_FEE', payload })
  }, [])

  const addExam = useCallback((payload: NewExamInput) => {
    dispatch({ type: 'ADD_EXAM', payload })
  }, [])

  const addMessage = useCallback((payload: NewMessageInput) => {
    dispatch({ type: 'ADD_MESSAGE', payload })
  }, [])

  const syncRollForDate = useCallback((date: string) => {
    dispatch({ type: 'SYNC_ROLL', date })
  }, [])

  const toggleAttendance = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_ATTENDANCE', id })
  }, [])

  const resetToDefaults = useCallback(() => {
    dispatch({ type: 'RESET' })
  }, [])

  const value = useMemo(
    () => ({
      data,
      addStudent,
      removeStudent,
      addFee,
      addExam,
      addMessage,
      syncRollForDate,
      toggleAttendance,
      resetToDefaults,
    }),
    [
      data,
      addStudent,
      removeStudent,
      addFee,
      addExam,
      addMessage,
      syncRollForDate,
      toggleAttendance,
      resetToDefaults,
    ],
  )

  return <SchoolDataContext.Provider value={value}>{children}</SchoolDataContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components -- hook paired with provider
export function useSchoolData(): SchoolDataContextValue {
  const ctx = useContext(SchoolDataContext)
  if (!ctx) throw new Error('useSchoolData must be used within SchoolDataProvider')
  return ctx
}
