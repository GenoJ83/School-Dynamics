import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type User = {
  email: string
  name: string
  role: 'admin' | 'teacher' | 'bursar'
}

type AuthContextValue = {
  user: User | null
  login: (email: string, password: string) => boolean
  logout: () => void
}

const STORAGE_KEY = 'sd_auth_user'

const AuthContext = createContext<AuthContextValue | null>(null)

function loadStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as User
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => loadStoredUser())

  const login = useCallback((email: string, password: string) => {
    void password
    const trimmed = email.trim().toLowerCase()
    if (!trimmed) return false
    const next: User = {
      email: trimmed,
      name: trimmed.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Staff',
      role: trimmed.includes('bursar') ? 'bursar' : trimmed.includes('teacher') ? 'teacher' : 'admin',
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setUser(next)
    return true
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({ user, login, logout }),
    [user, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
