import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useSchoolData } from '../context/SchoolDataContext'
import { formatUgx, MOCK_SCHOOL, todayIsoDate } from '../data/mockData'

export function DashboardHome() {
  const { data } = useSchoolData()
  const { students, feeInvoices, exams, attendance } = data

  const today = todayIsoDate()
  const attendanceToday = useMemo(
    () => attendance.filter((a) => a.date === today),
    [attendance, today],
  )

  const activeStudents = students.filter((s) => s.status === 'active').length
  const presentToday = attendanceToday.filter((a) => a.present).length
  const feeOutstanding = feeInvoices.reduce((sum, f) => sum + (f.amount - f.paid), 0)
  const recentExams = exams.slice(0, 4)

  return (
    <div className="stack-lg">
      <div>
        <h1 className="page-title">Dashboard</h1>
        <p className="muted">
          <strong>{MOCK_SCHOOL.name}</strong> — at-a-glance summary.
        </p>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-label">Active students</span>
          <span className="stat-value">{activeStudents}</span>
          <Link to="/app/students" className="stat-link">
            View registry →
          </Link>
        </div>
        <div className="stat-card">
          <span className="stat-label">Present today</span>
          <span className="stat-value">
            {attendanceToday.length ? `${presentToday}/${attendanceToday.length}` : '—'}
          </span>
          <Link to="/app/attendance" className="stat-link">
            Mark attendance →
          </Link>
        </div>
        <div className="stat-card">
          <span className="stat-label">Fees outstanding</span>
          <span className="stat-value stat-value-sm">{formatUgx(feeOutstanding)}</span>
          <Link to="/app/fees" className="stat-link">
            Open invoices →
          </Link>
        </div>
        <div className="stat-card">
          <span className="stat-label">Exam records</span>
          <span className="stat-value">{exams.length}</span>
          <Link to="/app/exams" className="stat-link">
            Gradebook →
          </Link>
        </div>
      </div>

      <div className="two-col">
        <section className="panel">
          <div className="panel-head">
            <h2 className="panel-title">Attendance today</h2>
            <Link to="/app/attendance" className="link-inline">
              Full list
            </Link>
          </div>
          {attendanceToday.length === 0 ? (
            <p className="muted">No register for today yet. Open Attendance to sync the roll.</p>
          ) : (
            <ul className="list-plain">
              {attendanceToday.map((a) => (
                <li key={a.id} className="list-row">
                  <span>{a.studentName}</span>
                  <span className="muted">{a.className}</span>
                  <span className={a.present ? 'badge badge-ok' : 'badge badge-warn'}>
                    {a.present ? 'Present' : 'Absent'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="panel">
          <div className="panel-head">
            <h2 className="panel-title">Recent results</h2>
            <Link to="/app/exams" className="link-inline">
              All results
            </Link>
          </div>
          <ul className="list-plain">
            {recentExams.map((e) => (
              <li key={e.id} className="list-row">
                <span>{e.studentName}</span>
                <span className="muted">{e.subject}</span>
                <span>
                  {e.score}/{e.max} · {e.grade}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
