import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/app/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (user) {
    return <Navigate to={from} replace />
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    const ok = login(email, password)
    if (!ok) {
      setError('Enter a work email to continue.')
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
            <h1 className="login-title">School Dynamics</h1>
            <p className="muted">Sign in with your school email.</p>
          </div>
        </div>

        <form className="login-form" onSubmit={onSubmit}>
          <label className="field-label" htmlFor="email">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            className="field-input"
            placeholder="you@school.ug"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="field-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="field-input"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error ? <p className="form-error">{error}</p> : null}

          <button type="submit" className="btn btn-primary btn-block">
            Sign in
          </button>
        </form>

        <p className="login-hint muted">
          <Link to="/parents/login" className="link-inline">
            Parent portal sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
