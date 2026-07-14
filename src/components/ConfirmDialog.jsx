import { useEffect } from 'react'
import { IconAlert } from './icons.jsx'

// Lightweight, sleek confirmation dialog for destructive actions.
export default function ConfirmDialog({
  open,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onCancel()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onCancel])

  if (!open) return null
  return (
    <div className="modal-overlay" onClick={onCancel} role="dialog" aria-modal="true">
      <div className="modal confirm" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 440 }}>
        <div style={{ padding: '22px 22px 18px' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ color: 'var(--red-text)', flexShrink: 0, marginTop: 2 }}><IconAlert size={22} /></span>
            <div>
              <h3 style={{ fontSize: 16, marginBottom: 6 }}>{title}</h3>
              <p className="muted" style={{ margin: 0, fontSize: 13.5 }}>{message}</p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 22 }}>
            <button className="btn" onClick={onCancel} autoFocus>{cancelLabel}</button>
            <button className="btn btn-danger" onClick={onConfirm}>{confirmLabel}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
