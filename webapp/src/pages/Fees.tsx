import { useState, type FormEvent } from 'react'
import { useSchoolData } from '../context/SchoolDataContext'
import { formatUgx } from '../data/mockData'

export function Fees() {
  const { data, addFee } = useSchoolData()
  const { feeInvoices, students } = data
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    studentId: '',
    term: 'Term 1 · 2025',
    amount: '',
    paid: '',
    due: '',
  })

  const totalDue = feeInvoices.reduce((s, f) => s + (f.amount - f.paid), 0)

  function submit(e: FormEvent) {
    e.preventDefault()
    const amount = Number(form.amount.replace(/,/g, ''))
    const paid = Number(form.paid.replace(/,/g, ''))
    if (!form.studentId || Number.isNaN(amount) || Number.isNaN(paid)) return
    addFee({
      studentId: form.studentId,
      term: form.term,
      amount,
      paid,
      due: form.due,
    })
    setForm({ studentId: '', term: 'Term 1 · 2025', amount: '', paid: '', due: '' })
    setOpen(false)
  }

  return (
    <div className="stack-lg">
      <div className="page-head">
        <div>
          <h1 className="page-title">Fees</h1>
          <p className="muted">Invoices and balances in UGX.</p>
        </div>
        <div className="page-head-actions">
          <div className="pill-stat">
            Outstanding: <strong>{formatUgx(totalDue)}</strong>
          </div>
          <button type="button" className="btn btn-primary" onClick={() => setOpen((v) => !v)}>
            {open ? 'Close' : 'Add invoice'}
          </button>
        </div>
      </div>

      {open ? (
        <section className="panel form-panel">
          <h2 className="panel-title">New invoice</h2>
          <form className="form-grid" onSubmit={submit}>
            <div className="field-row">
              <label className="field-label" htmlFor="fee-st">
                Student
              </label>
              <select
                id="fee-st"
                className="field-input"
                value={form.studentId}
                onChange={(e) => setForm((f) => ({ ...f, studentId: e.target.value }))}
                required
              >
                <option value="">Select…</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.admissionNo})
                  </option>
                ))}
              </select>
            </div>
            <div className="field-row">
              <label className="field-label" htmlFor="fee-term">
                Term / label
              </label>
              <input
                id="fee-term"
                className="field-input"
                value={form.term}
                onChange={(e) => setForm((f) => ({ ...f, term: e.target.value }))}
                required
              />
            </div>
            <div className="field-row field-row-split">
              <div>
                <label className="field-label" htmlFor="fee-amt">
                  Amount (UGX)
                </label>
                <input
                  id="fee-amt"
                  className="field-input"
                  inputMode="numeric"
                  placeholder="1200000"
                  value={form.amount}
                  onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                  required
                />
              </div>
              <div>
                <label className="field-label" htmlFor="fee-paid">
                  Paid (UGX)
                </label>
                <input
                  id="fee-paid"
                  className="field-input"
                  inputMode="numeric"
                  placeholder="0"
                  value={form.paid}
                  onChange={(e) => setForm((f) => ({ ...f, paid: e.target.value }))}
                  required
                />
              </div>
            </div>
            <div className="field-row">
              <label className="field-label" htmlFor="fee-due">
                Due date
              </label>
              <input
                id="fee-due"
                type="date"
                className="field-input"
                value={form.due}
                onChange={(e) => setForm((f) => ({ ...f, due: e.target.value }))}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Save invoice
              </button>
            </div>
          </form>
        </section>
      ) : null}

      <div className="table-wrap card-elevated">
        <table className="data-table">
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Student</th>
              <th>Term</th>
              <th>Amount</th>
              <th>Paid</th>
              <th>Balance</th>
              <th>Due</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {feeInvoices.map((f) => (
              <tr key={f.id}>
                <td className="mono">{f.id}</td>
                <td>{f.studentName}</td>
                <td>{f.term}</td>
                <td>{formatUgx(f.amount)}</td>
                <td>{formatUgx(f.paid)}</td>
                <td>{formatUgx(f.amount - f.paid)}</td>
                <td className="muted">{f.due}</td>
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
    </div>
  )
}
