import { useRef, useState } from 'react'
import { searchUsers, fullName, initials } from '../data/users.js'
import { IconSearch, IconClose } from './icons.jsx'

// Multi-select user picker. `value` is an array of attendee objects
// { id, name, designation }; `onChange` receives the new array.
export default function UserSearchSelect({ value = [], onChange, placeholder = 'Search people by name or designation…' }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const blurTimer = useRef(null)

  const selectedIds = value.map((a) => a.id)
  const matches = searchUsers(query, selectedIds).slice(0, 8)

  const add = (u) => {
    onChange([...value, { id: u.id, name: fullName(u), designation: u.designation }])
    setQuery('')
    setOpen(true)
  }
  const remove = (id) => onChange(value.filter((a) => a.id !== id))

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && matches.length) {
      e.preventDefault()
      add(matches[0])
    } else if (e.key === 'Backspace' && !query && value.length) {
      remove(value[value.length - 1].id)
    }
  }

  return (
    <div className="user-select">
      <div className="token-input">
        {value.map((a) => (
          <span key={a.id} className="token">
            {a.name}<span className="desig"> · {a.designation}</span>
            <button type="button" onClick={() => remove(a.id)} aria-label={`Remove ${a.name}`}>
              <IconClose size={13} />
            </button>
          </span>
        ))}
        <div className="token-search">
          <IconSearch size={15} />
          <input
            value={query}
            placeholder={value.length ? 'Add another…' : placeholder}
            onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
            onFocus={() => setOpen(true)}
            onBlur={() => { blurTimer.current = setTimeout(() => setOpen(false), 120) }}
            onKeyDown={onKeyDown}
          />
        </div>
      </div>

      {open && (
        <div className="user-menu" onMouseDown={(e) => e.preventDefault()}>
          {matches.length === 0 ? (
            <div className="italic-muted" style={{ padding: '12px 14px' }}>
              {query ? `No people match “${query}”.` : 'Everyone is already added.'}
            </div>
          ) : (
            matches.map((u) => (
              <button
                key={u.id}
                type="button"
                className="user-opt"
                onClick={() => { clearTimeout(blurTimer.current); add(u) }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span className="user-avatar">{initials(u)}</span>
                  <span>
                    <span className="u-name">{fullName(u)}</span>
                    <span className="u-desig" style={{ display: 'block' }}>{u.designation}</span>
                  </span>
                </span>
                <span className="chip">Add</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
