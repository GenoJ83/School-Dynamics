import { Navigate, useLocation } from 'react-router-dom'
import { useParentAuth } from '../context/ParentAuthContext'

export function ProtectedParentRoute({ children }: { children: React.ReactNode }) {
  const { session } = useParentAuth()
  const location = useLocation()

  if (!session) {
    return <Navigate to="/parents/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
