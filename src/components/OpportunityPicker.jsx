import { useEffect, useState } from 'react'
import { searchOpportunities } from '../data/salesforceOpportunities.js'
import { formatCurrency, formatDate } from '../lib/scoring.js'
import { IconSearch, IconClose } from './icons.jsx'

// A searchable modal for choosing the Salesforce opportunity this qualification
// is run against. Calls onSelect(opportunity) with the chosen record.
export default function OpportunityPicker({ open, onClose, onSelect }) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (open) setQuery('')
  }, [open])

  if (!open) return null
  const results = searchOpportunities(query)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div>
              <h3 style={{ fontSize: 16 }}>Select a Salesforce opportunity</h3>
              <p className="muted" style={{ fontSize: 12.5, margin: '2px 0 0' }}>Search by client, opportunity name, description, business unit or ID.</p>
            </div>
            <button className="bell" style={{ border: '1px solid var(--border)' }} onClick={onClose} aria-label="Close">
              <IconClose size={18} />
            </button>
          </div>
          <div className="modal-search">
            <IconSearch size={17} />
            <input
              autoFocus
              className="input"
              placeholder="Search opportunities…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && results.length) onSelect(results[0])
              }}
            />
          </div>
        </div>

        <div className="modal-list">
          {results.length === 0 ? (
            <p className="italic-muted" style={{ padding: '20px 14px' }}>No opportunities match “{query}”.</p>
          ) : (
            results.map((o) => (
              <button key={o.id} className="opp-row" onClick={() => onSelect(o)}>
                <div className="opp-row-main">
                  <div className="r-client">{o.client}</div>
                  <div className="r-name">{o.name}</div>
                  <div className="r-desc">{o.description}</div>
                  <div className="chip-row" style={{ marginTop: 6 }}>
                    <span className="chip">{o.businessUnits}</span>
                    <span className="chip">{o.stage}</span>
                  </div>
                </div>
                <div className="opp-row-meta">
                  <div style={{ fontWeight: 700 }}>{formatCurrency(o.value)}</div>
                  <div className="muted" style={{ fontSize: 12 }}>Due {formatDate(o.dueDate)}</div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
