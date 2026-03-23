import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSchoolData } from '../context/SchoolDataContext'

export function StudentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, removeStudent } = useSchoolData()
  const student = data.students.find((s) => s.id === id)

  if (!student) {
    return (
      <div className="stack-lg">
        <p>Student not found.</p>
        <Link to="/app/students" className="link-inline">
          ← Back to students
        </Link>
      </div>
    )
  }

  const { id: studentId, name: studentName } = student
  const fees = data.feeInvoices.filter((f) => f.studentId === studentId)
  const exams = data.exams.filter((e) => e.studentId === studentId)

  function onRemove() {
    if (!confirm(`Remove ${studentName} and their fees, exams, and attendance rows?`)) return
    removeStudent(studentId)
    navigate('/app/students', { replace: true })
  }

  return (
    <div className="stack-lg">
      <Link to="/app/students" className="link-inline" style={{ marginBottom: '-0.5rem' }}>
        ← Students
      </Link>
      <div className="page-head">
        <div>
          <h1 className="page-title">{student.name}</h1>
          <p className="muted">
            {student.admissionNo} · {student.className} {student.stream}
          </p>
        </div>
        <div className="page-head-actions">
          <span className={student.status === 'active' ? 'badge badge-ok' : 'badge'}>
            {student.status}
          </span>
          <button type="button" className="btn" onClick={onRemove}>
            Remove student
          </button>
        </div>
      </div>

      <div className="two-col">
        <section className="panel">
          <h2 className="panel-title">Guardian</h2>
          <p>{student.guardian}</p>
          <p className="mono muted">{student.phone}</p>
        </section>
        <section className="panel">
          <h2 className="panel-title">Quick actions</h2>
          <div className="btn-row">
            <Link to="/app/fees" className="btn">
              Add invoice
            </Link>
            <Link to="/app/messages" className="btn">
              Log message
            </Link>
          </div>
        </section>
      </div>

      <section className="panel">
        <h2 className="panel-title">Fees</h2>
        {fees.length === 0 ? (
          <p className="muted">No invoices yet.</p>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Term</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((f) => (
                  <tr key={f.id}>
                    <td className="mono">{f.id}</td>
                    <td>{f.term}</td>
                    <td>
                      <span
                        className={
                          f.status === 'paid'
                            ? 'badge badge-ok'
                            : f.status === 'overdue'
                              ? 'badge badge-danger'
                              : 'badge badge-warn'
                        }
                      >
                        {f.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="panel">
        <h2 className="panel-title">Exam results</h2>
        {exams.length === 0 ? (
          <p className="muted">No results yet.</p>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Term</th>
                  <th>Score</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {exams.map((e) => (
                  <tr key={e.id}>
                    <td>{e.subject}</td>
                    <td>{e.term}</td>
                    <td>
                      {e.score}/{e.max}
                    </td>
                    <td>{e.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
