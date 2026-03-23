import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { MOCK_SCHOOL } from '../data/mockData'

const nav = [
  { to: '/app/dashboard', label: 'Dashboard' },
  { to: '/app/students', label: 'Students' },
  { to: '/app/fees', label: 'Fees' },
  { to: '/app/attendance', label: 'Attendance' },
  { to: '/app/exams', label: 'Exams' },
  { to: '/app/messages', label: 'Messages' },
  { to: '/app/settings', label: 'Settings' },
]

export function AppShell() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Main navigation">
        <div className="sidebar-brand">
          <img src="/logo.png" alt="" className="sidebar-logo" width={40} height={40} />
          <div>
            <div className="sidebar-title">School Dynamics</div>
            <div className="sidebar-sub">{MOCK_SCHOOL.name}</div>
          </div>
        </div>
        <nav className="sidebar-nav">
          {nav.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              end={to === '/app/dashboard'}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button
            type="button"
            className="btn-text"
            onClick={() => {
              logout()
              navigate('/login', { replace: true })
            }}
          >
            Sign out
          </button>
        </div>
      </aside>

      <div className="app-main">
        <header className="topbar">
          <div className="topbar-school">
            <span className="muted">{MOCK_SCHOOL.location}</span>
            <Link to="/" className="topbar-portal-link muted small">
              Portals
            </Link>
            <Link to="/parents/login" className="topbar-portal-link muted small">
              Parent portal
            </Link>
          </div>
          <div className="topbar-user topbar-actions">
            <span className="user-pill">
              <span className="user-name">{user?.name}</span>
              <span className="user-role">{user?.role}</span>
            </span>
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => {
                logout()
                navigate('/login', { replace: true })
              }}
            >
              Log out
            </button>
          </div>
        </header>
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
