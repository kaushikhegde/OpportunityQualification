import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import { Card, Pill } from '../components/ui.jsx'
import OpportunityPicker from '../components/OpportunityPicker.jsx'
import { useOpportunities } from '../store/OpportunityContext.jsx'
import { opportunityVerdict, formatCurrency, formatDate, scoreEarlyQual, scoreSuccessOutcomes } from '../lib/scoring.js'
import { IconPlus, IconOpp } from '../components/icons.jsx'
import { DRB_THRESHOLD } from '../data/successOutcomes.js'
import { opportunityToSeed } from '../data/salesforceOpportunities.js'

const FRAMEWORK_LABEL = {
  standard: 'Early Go/No-Go Checklist',
  outcomes: 'Improving Outcomes',
}

function stageOf(opp) {
  if (opp.framework === 'outcomes') {
    const s = scoreSuccessOutcomes(opp.successStatus)
    if (s.greenCount === 0) return 'Details'
    return s.greenCount < s.total ? 'Improving Outcomes' : 'Recommendation'
  }
  const e = scoreEarlyQual(opp.earlyAnswers)
  if (!e.outcome) return 'Details'
  if (e.outcome.key === 'GO' && Number(opp.estimatedValue) > DRB_THRESHOLD) {
    return 'Improving Outcomes (DRB)'
  }
  return 'Recommendation'
}

export default function Dashboard() {
  const { opportunities, create } = useOpportunities()
  const navigate = useNavigate()
  const [pickerOpen, setPickerOpen] = useState(
    () => new URLSearchParams(window.location.search).has('new'),
  )

  const onSelectOpportunity = (sfOpp) => {
    setPickerOpen(false)
    const o = create({ ...opportunityToSeed(sfOpp), framework: 'standard' })
    navigate(`/qualification/${o.id}`)
  }

  const withVerdict = opportunities.filter((o) => opportunityVerdict(o))
  const go = withVerdict.filter((o) => {
    const v = opportunityVerdict(o)
    return v && v.tone === 'green'
  }).length

  return (
    <Layout
      title="Qualifications"
      breadcrumb={<><span>Pursuits</span><span className="sep">›</span><span style={{ color: 'var(--text)' }}>Qualifications</span></>}
    >
      <div className="summary-row">
        <Card>
          <div className="label">Qualifications</div>
          <div className="value-lg">{opportunities.length}</div>
        </Card>
        <Card>
          <div className="label">Qualified “GO”</div>
          <div className="value-lg" style={{ color: 'var(--green-text)' }}>{go}</div>
        </Card>
      </div>

      <Card
        title="All qualifications"
        icon={<IconOpp />}
        actions={
          <button className="btn btn-primary btn-sm" onClick={() => setPickerOpen(true)}>
            <IconPlus size={15} /> New qualification
          </button>
        }
      >
        {opportunities.length === 0 ? (
          <div>
            <p className="italic-muted">No qualifications yet. Start one to assess a Salesforce opportunity.</p>
            <button className="btn btn-primary btn-sm" onClick={() => setPickerOpen(true)}>
              <IconPlus size={15} /> New qualification
            </button>
          </div>
        ) : (
          <div className="opp-grid">
            {opportunities.map((o) => {
              const v = opportunityVerdict(o)
              return (
                <div
                  key={o.id}
                  className="card opp-card"
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(`/qualification/${o.id}`)}
                  onKeyDown={(e) => e.key === 'Enter' && navigate(`/qualification/${o.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="client">{o.clientName || 'Unnamed client'}</div>
                  <div className="oname">{o.opportunityName || 'Untitled opportunity'}</div>
                  <div className="chip-row">
                    <span className="chip">{FRAMEWORK_LABEL[o.framework]}</span>
                    <span className="chip">{stageOf(o)}</span>
                  </div>
                  <div className="opp-meta">
                    <div>
                      <div className="label" style={{ marginBottom: 2 }}>Est. value</div>
                      <div style={{ fontWeight: 600 }}>{formatCurrency(o.estimatedValue)}</div>
                      <div className="muted" style={{ fontSize: 12 }}>Due {formatDate(o.dueDate)}</div>
                    </div>
                    {v ? (
                      <div style={{ textAlign: 'right' }}>
                        <Pill tone={v.tone}>{v.label}</Pill>
                        <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>{v.detail}</div>
                      </div>
                    ) : (
                      <Pill tone="neutral">Not scored</Pill>
                    )}
                  </div>
                  <div className="muted" style={{ fontSize: 11.5, marginTop: 12, borderTop: '1px solid var(--border)', paddingTop: 10 }}>
                    Updated {formatDate(o.updatedAt)}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Card>

      <OpportunityPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={onSelectOpportunity}
      />
    </Layout>
  )
}
