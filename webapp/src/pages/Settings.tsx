import { MOCK_SCHOOL } from '../data/mockData'
import { useAuth } from '../context/AuthContext'
import { useSchoolData } from '../context/SchoolDataContext'

export function Settings() {
  const { user } = useAuth()
  const { resetToDefaults } = useSchoolData()

  return (
    <div className="stack-lg">
      <div>
        <h1 className="page-title">Settings</h1>
        <p className="muted">School profile and your account.</p>
      </div>

      <section className="panel">
        <h2 className="panel-title">School</h2>
        <p>
          <strong>{MOCK_SCHOOL.name}</strong>
        </p>
        <p className="muted">{MOCK_SCHOOL.location}</p>
      </section>

      <section className="panel">
        <h2 className="panel-title">Your account</h2>
        <p className="mono">{user?.email}</p>
        <p>
          Role: <span className="badge">{user?.role}</span>
        </p>
      </section>

      <section className="panel">
        <h2 className="panel-title">Data</h2>
        <p className="muted">
          Restore students, fees, attendance, exams, and messages to the initial school dataset. This removes all
          changes you have made.
        </p>
        <button
          type="button"
          className="btn"
          style={{ marginTop: '0.75rem' }}
          onClick={() => {
            if (
              confirm(
                'Reset all school data to defaults? Students, fees, attendance, exams, and messages will be restored to the starting set. This cannot be undone.',
              )
            ) {
              resetToDefaults()
            }
          }}
        >
          Restore defaults
        </button>
      </section>
    </div>
  )
}
