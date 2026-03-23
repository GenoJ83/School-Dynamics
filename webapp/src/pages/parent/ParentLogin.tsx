import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useParentAuth } from '../../context/ParentAuthContext'
import { useSchoolData } from '../../context/SchoolDataContext'

export function ParentLogin() {
  const { session, loginWithLookup } = useParentAuth()
  const { data } = useSchoolData()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/parents/home'

  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  if (session) {
    return <Navigate to={from} replace />
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    const ok = loginWithLookup(data.students, value)
    if (!ok) {
      setError('No match. Use the admission number or phone number the school has on file.')
      return
    }
    navigate(from, { replace: true })
  }

  return (
    <div className="login-page">
      <Link to="/" className="login-back muted small">
        ← All portals
      </Link>
      <div className="login-card card-elevated">
        <div className="login-brand">
          <img src="/logo.png" alt="School Dynamics" width={56} height={56} />
          <div>
            <h1 className="login-title">Parent portal</h1>
            <p className="muted">Fees, attendance, and grades for your children.</p>
          </div>
        </div>

        <form className="login-form" onSubmit={onSubmit}>
          <label className="field-label" htmlFor="parent-lookup">
            Admission number or guardian phone
          </label>
          <input
            id="parent-lookup"
            className="field-input"
            placeholder="e.g. SD-2024-001 or 701234567"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoComplete="off"
            required
          />
          {error ? <p className="form-error">{error}</p> : null}
          <button type="submit" className="btn btn-primary btn-block">
            Continue
          </button>
        </form>

        <p className="login-hint muted">
          <Link to="/login" className="link-inline">
            Staff sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
