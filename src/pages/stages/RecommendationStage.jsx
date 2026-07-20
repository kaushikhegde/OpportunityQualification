import { Card, Field } from '../../components/ui.jsx'
import QualAnalytics from '../../components/Analytics.jsx'
import { STANDING_GUIDANCE } from '../../data/earlyQual.js'
import { scoreEarlyQual, scoreSuccessOutcomes, formatCurrency } from '../../lib/scoring.js'
import { DRB_THRESHOLD } from '../../data/successOutcomes.js'
import { buildEarlyQualEmail, buildOutcomesEmail, sendMail, DRB_CONTACT } from '../../lib/notify.js'
import { IconCheckCircle, IconAlert, IconBook, IconMail } from '../../components/icons.jsx'

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
          <div><strong>DRB required.</strong> This is a GO on a deal above $1m ({formatCurrency(opp.estimatedValue)}). Complete the Improving Outcomes step — currently {success.weightedConfidence}% weighted confidence ({success.greenCount}/{success.total} milestones green).</div>
        </div>
      )}

      <QualAnalytics opp={opp} />

      <Card title="Recommended next steps">
        <p style={{ margin: 0 }}>{e.outcome.nextSteps}</p>
      </Card>
    </>
  )
}

function OutcomesRecommendation({ opp }) {
  const s = scoreSuccessOutcomes(opp.successStatus)
  if (s.greenCount === 0) {
    return <p className="italic-muted">Score the Improving Outcomes milestones to generate a recommendation.</p>
  }
  const tone = s.weightedConfidence >= 70 ? 'green' : s.weightedConfidence >= 40 ? 'amber' : 'red'
  const summary =
    tone === 'green'
      ? 'Strong position — take this to the Deal Review Board.'
      : tone === 'amber'
        ? 'Partly qualified — close the outstanding milestones before the DRB.'
        : 'Weak position — most milestones are not yet green.'
  return (
    <>
      <VerdictBanner
        tone={tone}
        label={`${s.weightedConfidence}% weighted confidence · ${s.greenCount} / ${s.total} milestones green`}
        summary={summary}
      />
      <Card title="Recommended next steps">
        <p style={{ margin: 0 }}>
          Work the {s.total - s.greenCount} milestone{s.total - s.greenCount === 1 ? '' : 's'} still short of green, and
          record supporting evidence against each in the Improving Outcomes step.
        </p>
      </Card>
    </>
  )
}

// Nothing leaves the browser on its own — this hands a pre-filled summary to the
// user's mail client so the outcome, DRB trigger and any support request reach
// someone who can act on them.
function SendCard({ opp }) {
  const e = scoreEarlyQual(opp.earlyAnswers)
  const scored = opp.framework === 'outcomes' ? true : !!e.outcome
  const drbRequired = e.outcome?.key === 'GO' && Number(opp.estimatedValue) > DRB_THRESHOLD
  const build = opp.framework === 'outcomes' ? buildOutcomesEmail : buildEarlyQualEmail

  return (
    <Card title="Send to DRB" icon={<IconMail />}>
      <p className="muted" style={{ fontSize: 12.5, marginTop: 0 }}>
        {drbRequired
          ? 'This deal requires DRB approval. Send the summary so a session can be scheduled.'
          : 'Send a summary of this qualification, including any support or investment you have asked for.'}
      </p>
      <button className="btn btn-primary" disabled={!scored} onClick={() => sendMail(build(opp))} style={{ width: '100%' }}>
        <IconMail size={15} /> Email summary to DRB
      </button>
      <p className="muted" style={{ fontSize: 11.5, marginBottom: 0, marginTop: 10 }}>
        Opens in your mail client, addressed to {DRB_CONTACT}. You send it — nothing is sent automatically.
      </p>
    </Card>
  )
}

export default function RecommendationStage({ opp, patch }) {
  return (
    <div className="two-col">
      <div>
        {opp.framework === 'outcomes'
          ? <OutcomesRecommendation opp={opp} />
          : <StandardRecommendation opp={opp} />}

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
        <SendCard opp={opp} />

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
