import { useMemo, useState } from 'react'
import { useSchoolData } from '../context/SchoolDataContext'
import { todayIsoDate } from '../data/mockData'

export function Attendance() {
  const { data, syncRollForDate, toggleAttendance } = useSchoolData()
  const [viewDate, setViewDate] = useState(todayIsoDate)

  const rows = useMemo(
    () => data.attendance.filter((r) => r.date === viewDate),
    [data.attendance, viewDate],
  )

  const present = rows.filter((r) => r.present).length

  return (
    <div className="stack-lg">
      <div className="page-head">
        <div>
          <h1 className="page-title">Attendance</h1>
          <p className="muted">Select a date, sync the register, then mark attendance.</p>
        </div>
        <div className="page-head-actions">
          <div className="pill-stat">
            Present:{' '}
            <strong>
              {present}/{rows.length}
            </strong>
          </div>
        </div>
      </div>

      <section className="panel form-panel">
        <div className="field-row field-row-inline">
          <div>
            <label className="field-label" htmlFor="att-date">
              Date
            </label>
            <input
              id="att-date"
              type="date"
              className="field-input"
              style={{ maxWidth: '200px' }}
              value={viewDate}
              onChange={(e) => setViewDate(e.target.value)}
            />
          </div>
          <button type="button" className="btn btn-primary" onClick={() => syncRollForDate(viewDate)}>
            Build register
          </button>
        </div>
        {rows.length === 0 ? (
          <p className="muted" style={{ marginTop: '1rem' }}>
            No register for this date. Use <strong>Build register</strong> to add all active students.
          </p>
        ) : null}
      </section>

      {rows.length > 0 ? (
        <div className="table-wrap card-elevated">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Class</th>
                <th>Date</th>
                <th>Status</th>
                <th>Toggle</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>{r.studentName}</td>
                  <td>{r.className}</td>
                  <td className="muted">{r.date}</td>
                  <td>
                    <span className={r.present ? 'badge badge-ok' : 'badge badge-warn'}>
                      {r.present ? 'Present' : 'Absent'}
                    </span>
                  </td>
                  <td>
                    <button type="button" className="btn btn-sm" onClick={() => toggleAttendance(r.id)}>
                      Flip
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  )
}
