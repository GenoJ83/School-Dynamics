import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { findStudentsForParentLookup } from '../lib/parentLookup'
import type { Student } from '../data/mockData'

export type ParentSession = {
  studentIds: string[]
  label: string
}

type ParentAuthContextValue = {
  session: ParentSession | null
  loginWithLookup: (students: Student[], input: string) => boolean
  logout: () => void
}

const STORAGE_KEY = 'sd_parent_session'

const ParentAuthContext = createContext<ParentAuthContextValue | null>(null)

function loadSession(): ParentSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const s = JSON.parse(raw) as ParentSession
    if (!s?.studentIds?.length) return null
    return s
  } catch {
    return null
  }
}

export function ParentAuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<ParentSession | null>(() => loadSession())

  const loginWithLookup = useCallback((students: Student[], input: string) => {
    const matched = findStudentsForParentLookup(input, students)
    if (!matched.length) return false
    const studentIds = matched.map((s) => s.id)
    const label =
      matched.length === 1
        ? `${matched[0].guardian} · ${matched[0].name}`
        : `${matched[0].guardian} (${matched.length} children)`
    const next: ParentSession = { studentIds, label }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setSession(next)
    return true
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setSession(null)
  }, [])

  const value = useMemo(
    () => ({ session, loginWithLookup, logout }),
    [session, loginWithLookup, logout],
  )

  return <ParentAuthContext.Provider value={value}>{children}</ParentAuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components -- hook paired with provider
export function useParentAuth(): ParentAuthContextValue {
  const ctx = useContext(ParentAuthContext)
  if (!ctx) throw new Error('useParentAuth must be used within ParentAuthProvider')
  return ctx
}
