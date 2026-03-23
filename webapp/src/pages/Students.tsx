import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useSchoolData } from '../context/SchoolDataContext'
import type { Student } from '../data/mockData'

export function Students() {
  const { data, addStudent } = useSchoolData()
  const { students } = data
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    name: '',
    className: '',
    stream: '',
    guardian: '',
    phone: '',
    status: 'active' as Student['status'],
    admissionNo: '',
  })

  function submit(e: FormEvent) {
    e.preventDefault()
    addStudent({
      name: form.name,
      className: form.className,
      stream: form.stream,
      guardian: form.guardian,
      phone: form.phone,
      status: form.status,
      admissionNo: form.admissionNo || undefined,
    })
    setForm({
      name: '',
      className: '',
      stream: '',
      guardian: '',
      phone: '',
      status: 'active',
      admissionNo: '',
    })
    setOpen(false)
  }

  return (
    <div className="stack-lg">
      <div className="page-head">
        <div>
          <h1 className="page-title">Students</h1>
          <p className="muted">Admission numbers, classes, and guardian contacts.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setOpen((v) => !v)}>
          {open ? 'Close form' : 'Add student'}
        </button>
      </div>

      {open ? (
        <section className="panel form-panel">
          <h2 className="panel-title">New student</h2>
          <form className="form-grid" onSubmit={submit}>
            <div className="field-row">
              <label className="field-label" htmlFor="st-name">
                Full name
              </label>
              <input
                id="st-name"
                className="field-input"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
              />
            </div>
            <div className="field-row">
              <label className="field-label" htmlFor="st-class">
                Class
              </label>
              <input
                id="st-class"
                className="field-input"
                placeholder="e.g. P.6"
                value={form.className}
                onChange={(e) => setForm((f) => ({ ...f, className: e.target.value }))}
                required
              />
            </div>
            <div className="field-row">
              <label className="field-label" htmlFor="st-stream">
                Stream
              </label>
              <input
                id="st-stream"
                className="field-input"
                placeholder="e.g. East"
                value={form.stream}
                onChange={(e) => setForm((f) => ({ ...f, stream: e.target.value }))}
                required
              />
            </div>
            <div className="field-row">
              <label className="field-label" htmlFor="st-guardian">
                Guardian
              </label>
              <input
                id="st-guardian"
                className="field-input"
                value={form.guardian}
                onChange={(e) => setForm((f) => ({ ...f, guardian: e.target.value }))}
                required
              />
            </div>
            <div className="field-row">
              <label className="field-label" htmlFor="st-phone">
                Phone
              </label>
              <input
                id="st-phone"
                className="field-input"
                placeholder="+256 …"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                required
              />
            </div>
            <div className="field-row">
              <label className="field-label" htmlFor="st-adm">
                Admission no. (optional)
              </label>
              <input
                id="st-adm"
                className="field-input"
                placeholder="Auto if empty"
                value={form.admissionNo}
                onChange={(e) => setForm((f) => ({ ...f, admissionNo: e.target.value }))}
              />
            </div>
            <div className="field-row">
              <label className="field-label" htmlFor="st-status">
                Status
              </label>
              <select
                id="st-status"
                className="field-input"
                value={form.status}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    status: e.target.value as Student['status'],
                  }))
                }
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Save student
              </button>
            </div>
          </form>
        </section>
      ) : null}

      <div className="table-wrap card-elevated">
        <table className="data-table">
          <thead>
            <tr>
              <th>Admission</th>
              <th>Name</th>
              <th>Class</th>
              <th>Guardian</th>
              <th>Phone</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td className="mono">{s.admissionNo}</td>
                <td>{s.name}</td>
                <td>
                  {s.className} · {s.stream}
                </td>
                <td>{s.guardian}</td>
                <td className="mono muted">{s.phone}</td>
                <td>
                  <span className={s.status === 'active' ? 'badge badge-ok' : 'badge'}>
                    {s.status}
                  </span>
                </td>
                <td>
                  <Link to={`/app/students/${s.id}`} className="link-inline">
                    Open
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
