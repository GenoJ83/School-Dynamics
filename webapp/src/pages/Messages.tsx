import { useState, type FormEvent } from 'react'
import { useSchoolData } from '../context/SchoolDataContext'
import { formatMessageTime, type MessageThread } from '../data/mockData'

export function Messages() {
  const { data, addMessage } = useSchoolData()
  const { messages } = data
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    from: '',
    preview: '',
    channel: 'internal' as MessageThread['channel'],
  })

  function submit(e: FormEvent) {
    e.preventDefault()
    addMessage({
      from: form.from,
      preview: form.preview,
      channel: form.channel,
    })
    setForm({ from: '', preview: '', channel: 'internal' })
    setOpen(false)
  }

  return (
    <div className="stack-lg">
      <div className="page-head">
        <div>
          <h1 className="page-title">Messages</h1>
          <p className="muted">Parent, SMS, WhatsApp, and internal communications log.</p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => setOpen((v) => !v)}>
          {open ? 'Close' : 'Log message'}
        </button>
      </div>

      {open ? (
        <section className="panel form-panel">
          <h2 className="panel-title">New message</h2>
          <form className="form-grid" onSubmit={submit}>
            <div className="field-row">
              <label className="field-label" htmlFor="msg-from">
                From
              </label>
              <input
                id="msg-from"
                className="field-input"
                placeholder="Name or office"
                value={form.from}
                onChange={(e) => setForm((f) => ({ ...f, from: e.target.value }))}
                required
              />
            </div>
            <div className="field-row">
              <label className="field-label" htmlFor="msg-ch">
                Channel
              </label>
              <select
                id="msg-ch"
                className="field-input"
                value={form.channel}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    channel: e.target.value as MessageThread['channel'],
                  }))
                }
              >
                <option value="internal">Internal</option>
                <option value="sms">SMS</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="email">Email</option>
              </select>
            </div>
            <div className="field-row">
              <label className="field-label" htmlFor="msg-body">
                Summary
              </label>
              <textarea
                id="msg-body"
                className="field-input"
                rows={3}
                value={form.preview}
                onChange={(e) => setForm((f) => ({ ...f, preview: e.target.value }))}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </section>
      ) : null}

      <ul className="message-list card-elevated">
        {messages.map((t) => (
          <li key={t.id} className="message-item">
            <div>
              <strong>{t.from}</strong>
              <span className="badge" style={{ marginLeft: '0.5rem' }}>
                {t.channel}
              </span>
              <p className="muted">{t.preview}</p>
            </div>
            <span className="muted small">{formatMessageTime(t.sentAt)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
