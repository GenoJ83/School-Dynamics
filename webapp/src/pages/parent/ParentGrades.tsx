import { useMemo } from 'react'
import { useParentAuth } from '../../context/ParentAuthContext'
import { useSchoolData } from '../../context/SchoolDataContext'

export function ParentGrades() {
  const { session } = useParentAuth()
  const { data } = useSchoolData()

  const rows = useMemo(() => {
    return data.exams
      .filter((e) => session?.studentIds.includes(e.studentId))
      .sort((a, b) => b.term.localeCompare(a.term) || a.subject.localeCompare(b.subject))
  }, [data.exams, session?.studentIds])

  return (
    <div className="stack-lg">
      <div>
        <h1 className="page-title">Grades</h1>
        <p className="muted">Published exam results.</p>
      </div>

      <div className="table-wrap card-elevated">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Subject</th>
              <th>Term</th>
              <th>Score</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="muted" style={{ textAlign: 'center' }}>
                  No results yet.
                </td>
              </tr>
            ) : (
              rows.map((e) => (
                <tr key={e.id}>
                  <td>{e.studentName}</td>
                  <td>{e.subject}</td>
                  <td>{e.term}</td>
                  <td>
                    {e.score}/{e.max}
                  </td>
                  <td>
                    <span className="badge badge-ok">{e.grade}</span>
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
