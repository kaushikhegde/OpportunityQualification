import { Card } from './ui.jsx'
import { analyzeEarlyQual, analyzeRainmaker } from '../lib/scoring.js'
import { IconCheckCircle, IconAlert, IconTrophy, IconFlag } from './icons.jsx'

// A single labelled meter row used in the score-driver breakdown.
function DriverRow({ name, tone, valueLabel, pct }) {
  return (
    <div className="driver-row">
      <div className="driver-top">
        <span className="driver-name">{name}</span>
        <span className={`driver-val ${tone}`}>{valueLabel}</span>
      </div>
      <div className={`meter ${tone}`} style={{ margin: '6px 0 0' }}>
        <span style={{ width: `${Math.max(3, pct)}%` }} />
      </div>
    </div>
  )
}

// Two-column strengths / gaps lists.
function DriverLists({ strengths, gaps, renderStrength, renderGap, gapTitle = 'Gaps & risks' }) {
  return (
    <div className="grid-2" style={{ marginTop: 4 }}>
      <div>
        <div className="driver-list-head green">
          <IconTrophy size={15} /> What makes this strong
        </div>
        {strengths.length ? (
          <ul className="driver-list">{strengths.map(renderStrength)}</ul>
        ) : (
          <p className="italic-muted" style={{ fontSize: 13 }}>No standout strengths recorded.</p>
        )}
      </div>
      <div>
        <div className="driver-list-head amber">
          <IconFlag size={15} /> {gapTitle}
        </div>
        {gaps.length ? (
          <ul className="driver-list">{gaps.map(renderGap)}</ul>
        ) : (
          <p className="italic-muted" style={{ fontSize: 13 }}>No material gaps recorded.</p>
        )}
      </div>
    </div>
  )
}

function EarlyQualAnalytics({ opp }) {
  const a = analyzeEarlyQual(opp.earlyAnswers)
  return (
    <>
      {a.disqualifiers.length > 0 && (
        <div className="banner red" style={{ marginBottom: 16 }}>
          <span className="ico"><IconAlert size={18} /></span>
          <div>
            <strong>Hard disqualifier active.</strong> The following forced the outcome to STOP regardless of score:
            <ul style={{ margin: '6px 0 0', paddingLeft: 18 }}>
              {a.disqualifiers.map((d, i) => (
                <li key={i}><strong>{d.category}:</strong> {d.label}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <Card title="Score drivers by category">
        <div className="driver-grid">
          {a.categories.map((c) => (
            <DriverRow key={c.id} name={c.name} tone={c.tone} pct={c.pct} valueLabel={`${c.score} / ${c.max}`} />
          ))}
        </div>
      </Card>

      <Card title="Strengths & gaps">
        <DriverLists
          strengths={a.strengths}
          gaps={a.gaps}
          renderStrength={(s, i) => (
            <li key={i}>
              <IconCheckCircle size={14} className="li-ico green" />
              <span><strong>{s.category}.</strong> {s.label} <span className="muted">({s.points}/{s.max} pts)</span></span>
            </li>
          )}
          renderGap={(g, i) => (
            <li key={i}>
              <IconAlert size={14} className="li-ico amber" />
              <span><strong>{g.category}.</strong> {g.label} <span className="muted">({g.points}/{g.max} pts)</span></span>
            </li>
          )}
        />
      </Card>
    </>
  )
}

function RainmakerAnalytics({ opp }) {
  const a = analyzeRainmaker(opp.rainmakerAnswers)
  return (
    <>
      <Card title="Score drivers by RAINMAKER dimension">
        <div className="driver-grid">
          {a.dimensions.map((d) => (
            <DriverRow
              key={d.id}
              name={`${d.letter} · ${d.name}`}
              tone={d.tone}
              pct={d.pct}
              valueLabel={`${d.yes} / ${d.total} Yes`}
            />
          ))}
        </div>
      </Card>

      <Card title="Strengths & gaps">
        <DriverLists
          strengths={a.strengths}
          gaps={a.gaps}
          gapTitle="Open risks (answered No)"
          renderStrength={(d, i) => (
            <li key={i}>
              <IconCheckCircle size={14} className="li-ico green" />
              <span><strong>{d.letter} · {d.name}.</strong> All {d.total} criteria met.</span>
            </li>
          )}
          renderGap={(g, i) => (
            <li key={i}>
              <IconAlert size={14} className="li-ico amber" />
              <span><strong>{g.letter} · {g.dimension}.</strong> {g.text}</span>
            </li>
          )}
        />
      </Card>
    </>
  )
}

// Renders the "why this outcome" analytics for a completed qualification.
// Returns null for frameworks without a computed score (Fed Govt is narrative).
export default function QualAnalytics({ opp }) {
  if (opp.framework === 'rainmaker') return <RainmakerAnalytics opp={opp} />
  if (opp.framework === 'fedgovt') return null
  return <EarlyQualAnalytics opp={opp} />
}
