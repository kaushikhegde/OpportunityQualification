import { useEffect, useRef, useState } from 'react'
import { IconCheck } from './icons.jsx'

// Quiet autosave chip. Flashes "Saving…" when the record changes, then settles
// to "Saved". Everything persists to localStorage on every edit.
export default function SaveIndicator({ updatedAt }) {
  const [saving, setSaving] = useState(false)
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    setSaving(true)
    const t = setTimeout(() => setSaving(false), 650)
    return () => clearTimeout(t)
  }, [updatedAt])

  return (
    <span className="save-chip" aria-live="polite">
      {saving ? (
        <><span className="save-spinner" /> Saving…</>
      ) : (
        <><IconCheck size={13} /> Saved</>
      )}
    </span>
  )
}
