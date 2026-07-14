import { Card, Field } from '../../components/ui.jsx'
import QualAnalytics from '../../components/Analytics.jsx'
import { STANDING_GUIDANCE } from '../../data/earlyQual.js'
import { scoreEarlyQual, scoreRainmaker, scoreSuccessOutcomes, formatCurrency } from '../../lib/scoring.js'
import { DRB_THRESHOLD } from '../../data/successOutcomes.js'
import { IconCheckCircle, IconAlert, IconBook } from '../../components/icons.jsx'

function VerdictBanner({ tone, label, summary }) {
  const Icon = tone === 'green' ? IconCheckCircle : IconAlert
  return (
    <div className={`banner ${tone}`} style={{ alignItems: 'center', padding: '18px 20px' }}>
      <span className="ico"><Icon size={22} /></span>
      <div>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 13.5 }}>{summary}</div>
      </div>
    </div>
  )
}

function StandardRecommendation({ opp }) {
  const e = scoreEarlyQual(opp.earlyAnswers)
  if (!e.outcome) {
    return <p className="italic-muted">Complete the Early Qualification to generate a recommendation.</p>
  }
  const drbRequired = e.outcome.key === 'GO' && Number(opp.estimatedValue) > DRB_THRESHOLD
  const success = scoreSuccessOutcomes(opp.successStatus)

  return (
    <>
      <VerdictBanner tone={e.outcome.tone} label={`${e.outcome.label} · ${e.score} / ${e.max}`} summary={e.outcome.summary} />

      {drbRequired && (
        <div className="banner amber">
          <span className="ico"><IconAlert size={18} /></span>
          <div><strong>DRB required.</strong> This is a GO on a deal above $1m ({formatCurrency(opp.estimatedValue)}). Complete the Success Outcomes step — currently {success.weightedConfidence}% weighted confidence ({success.greenCount}/{success.total} milestones green).</div>
        </div>
      )}

      <QualAnalytics opp={opp} />

      <Card title="Recommended next steps">
        <p style={{ margin: 0 }}>{e.outcome.nextSteps}</p>
      </Card>
    </>
  )
}

function RainmakerRecommendation({ opp }) {
  const r = scoreRainmaker(opp.rainmakerAnswers)
  if (r.answered === 0) return <p className="italic-muted">Complete the RAINMAKER checklist to generate a recommendation.</p>
  return (
    <>
      <VerdictBanner tone={r.band.tone} label={`${r.band.label} · ${r.pct}% Yes`} summary={r.band.note} />
      <QualAnalytics opp={opp} />
      <Card title="Scoring guide">
        <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--text-muted)', fontSize: 13.5 }}>
          <li>80–100% Yes → Strong Bid – proceed with confidence</li>
          <li>60–79% Yes → Conditional Bid – address gaps before proceeding</li>
          <li>40–59% Yes → Caution – seek senior approval before committing</li>
          <li>Below 40% Yes → No Bid – decline the opportunity</li>
        </ul>
      </Card>
    </>
  )
}

function FedGovtRecommendation({ opp }) {
  const rec = opp.fedGovtResponses?.recommendation
  return (
    <Card title="Go / no-go recommendation">
      {rec ? <p style={{ margin: 0 }}>{rec}</p> : <p className="italic-muted">Record your recommendation in the Fed Govt Qualification step.</p>}
    </Card>
  )
}

export default function RecommendationStage({ opp, patch }) {
  return (
    <div className="two-col">
      <div>
        {opp.framework === 'rainmaker' && <RainmakerRecommendation opp={opp} />}
        {opp.framework === 'fedgovt' && <FedGovtRecommendation opp={opp} />}
        {opp.framework === 'standard' && <StandardRecommendation opp={opp} />}

        <Card title="What support / investment do you need?">
          <Field label="Strengthen our offering & increase the chance of winning">
            <textarea
              className="textarea"
              value={opp.supportNeeds || ''}
              onChange={(e) => patch({ supportNeeds: e.target.value })}
              placeholder="What support / investment / assets / connections do you need to strengthen our offering and increase the chances of winning?"
            />
          </Field>
        </Card>
      </div>

      <div className="rail">
        <Card title="Standing guidance" icon={<IconBook />}>
          {STANDING_GUIDANCE.map((g, i) => (
            <div key={i} style={{ marginBottom: i === 0 ? 14 : 0 }}>
              <div className="label">{g.title}</div>
              <p className="muted" style={{ fontSize: 12.5, margin: 0 }}>{g.body}</p>
              {i === 0 && <hr className="hr" />}
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
}
