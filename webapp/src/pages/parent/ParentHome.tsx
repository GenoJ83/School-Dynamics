import { Link } from 'react-router-dom'
import { useParentAuth } from '../../context/ParentAuthContext'
import { useSchoolData } from '../../context/SchoolDataContext'
import { formatUgx, MOCK_SCHOOL } from '../../data/mockData'

export function ParentHome() {
  const { session } = useParentAuth()
  const { data } = useSchoolData()

  const children = data.students.filter((s) => session?.studentIds.includes(s.id))

  return (
    <div className="stack-lg">
      <div>
        <h1 className="page-title">Welcome</h1>
        <p className="muted">
          {MOCK_SCHOOL.name} · {children.length} learner{children.length === 1 ? '' : 's'} on this account.
        </p>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-label">Quick link</span>
          <span className="stat-value stat-value-sm">Fees</span>
          <Link to="/parents/fees" className="stat-link">
            Balances & invoices →
          </Link>
        </div>
        <div className="stat-card">
          <span className="stat-label">Quick link</span>
          <span className="stat-value stat-value-sm">Attendance</span>
          <Link to="/parents/attendance" className="stat-link">
            Recent records →
          </Link>
        </div>
        <div className="stat-card">
          <span className="stat-label">Quick link</span>
          <span className="stat-value stat-value-sm">Grades</span>
          <Link to="/parents/grades" className="stat-link">
            Exam results →
          </Link>
        </div>
      </div>

      <section className="panel">
        <h2 className="panel-title">Your learners</h2>
        <ul className="list-plain">
          {children.map((s) => {
            const fees = data.feeInvoices.filter((f) => f.studentId === s.id)
            const balance = fees.reduce((sum, f) => sum + (f.amount - f.paid), 0)
            const lastAtt = [...data.attendance]
              .filter((a) => a.studentId === s.id)
              .sort((a, b) => b.date.localeCompare(a.date))[0]
            return (
              <li key={s.id} className="list-row parent-child-row">
                <div>
                  <strong>{s.name}</strong>
                  <div className="muted small">
                    {s.admissionNo} · {s.className} {s.stream}
                  </div>
                </div>
                <div className="muted small">
                  Balance: <strong>{formatUgx(balance)}</strong>
                  <br />
                  Last attendance:{' '}
                  {lastAtt ? (
                    <>
                      {lastAtt.date} — {lastAtt.present ? 'Present' : 'Absent'}
                    </>
                  ) : (
                    '—'
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
