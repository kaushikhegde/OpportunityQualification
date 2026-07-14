// Small presentational primitives shared across pages.

export function Card({ title, icon, actions, children, className = '' }) {
  return (
    <section className={`card ${className}`}>
      {(title || actions) && (
        <div className="card-head">
          {title && (
            <div className="card-title">
              {icon && <span className="ico">{icon}</span>}
              <span>{title}</span>
            </div>
          )}
          {actions}
        </div>
      )}
      {children}
    </section>
  )
}

export function Pill({ tone = 'neutral', children }) {
  return <span className={`pill ${tone}`}>{children}</span>
}

export function Label({ children }) {
  return <div className="label">{children}</div>
}

export function Field({ label, children }) {
  return (
    <div className="field">
      {label && <label>{label}</label>}
      {children}
    </div>
  )
}

const TONE_FOR_OUTCOME = { STOP: 'red', PAUSE: 'amber', GO: 'green' }
export function outcomeTone(key) {
  return TONE_FOR_OUTCOME[key] || 'neutral'
}
