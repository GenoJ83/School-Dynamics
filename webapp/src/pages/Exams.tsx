import { useState, type FormEvent } from 'react'
import { useSchoolData } from '../context/SchoolDataContext'

export function Exams() {
  const { data, addExam } = useSchoolData()
  const { exams, students } = data
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    studentId: '',
    subject: '',
    term: 'Term 1 · 2025',
    score: '',
    max: '100',
  })

  function submit(e: FormEvent) {
    e.preventDefault()
    const score = Number(form.score)
    const max = Number(form.max)
    if (!form.studentId || Number.isNaN(score) || Number.isNaN(max) || max <= 0) return
    addExam({
      studentId: form.studentId,
      subject: form.subject,
      term: form.term,
      score,
      max,
    })
    setForm({ studentId: '', subject: '', term: 'Term 1 · 2025', score: '', max: '100' })
    setOpen(false)
  }

  return (
    <div className="stack-lg">
      <div className="page-head">
        <div>
          <h1 className="page-title">Exams</h1>
          <p className="muted">Scores and grades by subject and term.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setOpen((v) => !v)}>
          {open ? 'Close' : 'Add result'}
        </button>
      </div>

      {open ? (
        <section className="panel form-panel">
          <h2 className="panel-title">New exam result</h2>
          <form className="form-grid" onSubmit={submit}>
            <div className="field-row">
              <label className="field-label" htmlFor="ex-st">
                Student
              </label>
              <select
                id="ex-st"
                className="field-input"
                value={form.studentId}
                onChange={(e) => setForm((f) => ({ ...f, studentId: e.target.value }))}
                required
              >
                <option value="">Select…</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="field-row">
              <label className="field-label" htmlFor="ex-sub">
                Subject
              </label>
              <input
                id="ex-sub"
                className="field-input"
                placeholder="Mathematics"
                value={form.subject}
                onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                required
              />
            </div>
            <div className="field-row">
              <label className="field-label" htmlFor="ex-term">
                Term
              </label>
              <input
                id="ex-term"
                className="field-input"
                value={form.term}
                onChange={(e) => setForm((f) => ({ ...f, term: e.target.value }))}
                required
              />
            </div>
            <div className="field-row field-row-split">
              <div>
                <label className="field-label" htmlFor="ex-score">
                  Score
                </label>
                <input
                  id="ex-score"
                  className="field-input"
                  inputMode="decimal"
                  value={form.score}
                  onChange={(e) => setForm((f) => ({ ...f, score: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="field-label" htmlFor="ex-max">
                  Max
                </label>
                <input
                  id="ex-max"
                  className="field-input"
                  inputMode="numeric"
                  value={form.max}
                  onChange={(e) => setForm((f) => ({ ...f, max: e.target.value }))}
                  required
                />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Save result
              </button>
            </div>
          </form>
        </section>
      ) : null}

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
            {exams.map((e) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
