import { useParentAuth } from '../../context/ParentAuthContext'
import { useSchoolData } from '../../context/SchoolDataContext'
import { formatUgx } from '../../data/mockData'

export function ParentFees() {
  const { session } = useParentAuth()
  const { data } = useSchoolData()

  const rows = data.feeInvoices.filter((f) => session?.studentIds.includes(f.studentId))
  const totalDue = rows.reduce((s, f) => s + (f.amount - f.paid), 0)

  return (
    <div className="stack-lg">
      <div className="page-head">
        <div>
          <h1 className="page-title">Fees</h1>
          <p className="muted">Fee invoices for your children.</p>
        </div>
        <div className="pill-stat">
          Total balance: <strong>{formatUgx(totalDue)}</strong>
        </div>
      </div>

      <div className="table-wrap card-elevated">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Invoice</th>
              <th>Term</th>
              <th>Amount</th>
              <th>Paid</th>
              <th>Balance</th>
              <th>Due</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={8} className="muted" style={{ textAlign: 'center' }}>
                  No invoices yet.
                </td>
              </tr>
            ) : (
              rows.map((f) => (
                <tr key={f.id}>
                  <td>{f.studentName}</td>
                  <td className="mono">{f.id}</td>
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
