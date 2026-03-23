import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useParentAuth } from '../context/ParentAuthContext'
import { MOCK_SCHOOL } from '../data/mockData'

export function LandingPage() {
  const { user } = useAuth()
  const { session: parentSession } = useParentAuth()

  return (
    <div className="landing">
      <header className="landing-header">
        <div className="landing-header-inner">
          <div className="landing-brand">
            <img src="/logo.png" alt="" width={48} height={48} className="landing-logo" />
            <div>
              <span className="landing-brand-name">School Dynamics</span>
              <span className="landing-brand-tag muted small">{MOCK_SCHOOL.name}</span>
            </div>
          </div>
          <p className="landing-tagline muted small">{MOCK_SCHOOL.location}</p>
        </div>
      </header>

      <main className="landing-main">
        <div className="landing-hero">
          <h1 className="landing-title">Choose your portal</h1>
          <p className="landing-lead muted">
            Staff run the school day-to-day. Parents stay informed on fees, attendance, and academics.
          </p>
        </div>

        {(user || parentSession) && (
          <div className="landing-continue card-elevated">
            <span className="muted small">Signed in</span>
            <div className="landing-continue-links">
              {user ? (
                <Link to="/app/dashboard" className="btn btn-primary btn-sm">
                  Staff dashboard
                </Link>
              ) : null}
              {parentSession ? (
                <Link to="/parents/home" className="btn btn-sm" style={{ borderColor: 'var(--border)' }}>
                  Parent home
                </Link>
              ) : null}
            </div>
          </div>
        )}

        <div className="landing-portals">
          <article className="landing-card card-elevated">
            <div className="landing-card-kicker">Administrators & teachers</div>
            <h2 className="landing-card-title">Staff portal</h2>
            <p className="landing-card-desc muted">
              Students, fees, attendance, exams, messaging, and school settings in one place.
            </p>
            <ul className="landing-card-list muted small">
              <li>Secure access with your school email</li>
              <li>Central record-keeping and reporting</li>
              <li>Aligned with what parents see in their portal</li>
            </ul>
            <Link to="/login" className="btn btn-primary landing-card-cta">
              Staff sign in
            </Link>
          </article>

          <article className="landing-card card-elevated landing-card-parent">
            <div className="landing-card-kicker landing-card-kicker-teal">Parents & guardians</div>
            <h2 className="landing-card-title">Parent portal</h2>
            <p className="landing-card-desc muted">
              Clear view of fees, attendance, and published grades for your children.
            </p>
            <ul className="landing-card-list muted small">
              <li>Sign in with admission number or registered phone</li>
              <li>See all children linked to your account</li>
              <li>Stay up to date with the school</li>
            </ul>
            <Link to="/parents/login" className="btn landing-card-cta landing-cta-parent">
              Parent sign in
            </Link>
          </article>
        </div>
      </main>

      <footer className="landing-footer muted small">
        © {new Date().getFullYear()} School Dynamics · {MOCK_SCHOOL.location}
      </footer>
    </div>
  )
}
