import { useMemo } from 'react'
import { useParentAuth } from '../../context/ParentAuthContext'
import { useSchoolData } from '../../context/SchoolDataContext'

export function ParentAttendance() {
  const { session } = useParentAuth()
  const { data } = useSchoolData()

  const rows = useMemo(() => {
    return data.attendance
      .filter((a) => session?.studentIds.includes(a.studentId))
      .sort((a, b) => {
        const d = b.date.localeCompare(a.date)
        if (d !== 0) return d
        return a.studentName.localeCompare(b.studentName)
      })
  }, [data.attendance, session?.studentIds])

  return (
    <div className="stack-lg">
      <div>
        <h1 className="page-title">Attendance</h1>
        <p className="muted">Attendance history, newest first.</p>
      </div>

      <div className="table-wrap card-elevated">
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Student</th>
              <th>Class</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="muted" style={{ textAlign: 'center' }}>
                  No attendance records yet.
                </td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id}>
                  <td className="mono">{r.date}</td>
                  <td>{r.studentName}</td>
                  <td>{r.className}</td>
                  <td>
                    <span className={r.present ? 'badge badge-ok' : 'badge badge-warn'}>
                      {r.present ? 'Present' : 'Absent'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
