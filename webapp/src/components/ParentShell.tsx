import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useParentAuth } from '../context/ParentAuthContext'
import { MOCK_SCHOOL } from '../data/mockData'

const nav = [
  { to: '/parents/home', label: 'Home' },
  { to: '/parents/fees', label: 'Fees' },
  { to: '/parents/attendance', label: 'Attendance' },
  { to: '/parents/grades', label: 'Grades' },
]

export function ParentShell() {
  const { session, logout } = useParentAuth()
  const navigate = useNavigate()

  return (
    <div className="app-shell parent-shell">
      <aside className="sidebar parent-sidebar" aria-label="Parent navigation">
        <div className="sidebar-brand">
          <img src="/logo.png" alt="" className="sidebar-logo" width={40} height={40} />
          <div>
            <div className="sidebar-title">Parent portal</div>
            <div className="sidebar-sub">{MOCK_SCHOOL.name}</div>
          </div>
        </div>
        <nav className="sidebar-nav">
          {nav.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              end={to === '/parents/home'}
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
              navigate('/parents/login', { replace: true })
            }}
          >
            Log out
          </button>
        </div>
      </aside>

      <div className="app-main">
        <header className="topbar">
          <div className="topbar-school">
            <span className="muted">{session?.label}</span>
            <Link to="/" className="topbar-portal-link muted small">
              Portals
            </Link>
          </div>
          <div className="topbar-user topbar-actions">
            <button
              type="button"
              className="btn btn-sm"
              onClick={() => {
                logout()
                navigate('/parents/login', { replace: true })
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
