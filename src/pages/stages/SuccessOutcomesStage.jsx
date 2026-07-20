import { useState } from 'react'
import { Card } from '../../components/ui.jsx'
import { SUCCESS_MILESTONES } from '../../data/successOutcomes.js'
import { scoreSuccessOutcomes } from '../../lib/scoring.js'
import { buildOutcomesEmail, sendMail, DRB_CONTACT } from '../../lib/notify.js'
import { IconSpark, IconTrophy, IconMail } from '../../components/icons.jsx'

function Milestone({ m, status, comment, onStatus, onComment }) {
  const [open, setOpen] = useState(false)
  const green = status === 'green'
  return (
    <div className={`milestone ${green ? 'green' : ''}`}>
      <div className="milestone-top">
        <span className="milestone-name">{m.name}</span>
        <span className="weight-tag">weight {m.weighting}</span>
      </div>
      <div className="milestone-about">{m.about}</div>
      <div className="toggle-row">
        <button className={`toggle ${green ? 'on-green' : ''}`} onClick={() => onStatus(green ? '' : 'green')}>
          Green
        </button>
        <button className={`toggle ${status === 'not' ? 'on-not' : ''}`} onClick={() => onStatus(status === 'not' ? '' : 'not')}>
          Not yet
        </button>
      </div>

      <button className="disclose" onClick={() => setOpen((o) => !o)}>
        {open ? 'Hide criteria' : 'Green criteria & questions'}
      </button>
      {open && (
        <div className="disclose-body">
          <strong>Green when:</strong> {m.green}
          <ul>
            {m.questions.map((q, i) => <li key={i}>{q}</li>)}
          </ul>
        </div>
      )}

      <textarea
        className="textarea"
        style={{ minHeight: 46, marginTop: 10 }}
        placeholder="Supporting comments"
        value={comment || ''}
        onChange={(e) => onComment(e.target.value)}
      />
    </div>
  )
}

export default function SuccessOutcomesStage({ opp, patch, goTo }) {
  const status = opp.successStatus || {}
  const comments = opp.successComments || {}
  const result = scoreSuccessOutcomes(status)

  return (
    <>
      <div className="sentinel" style={{ marginBottom: 18 }}>
        <div className="spark"><IconSpark size={20} /></div>
        <div className="body">
          <h3>Improving Outcomes — DRB preparation</h3>
          <p>Score the opportunity against all 12 weighted milestones (10 sales milestones plus 2 Scyne-internal). Complete this in advance of the Deal Review Board session.</p>
        </div>
      </div>

      <Card title="Weighted confidence" icon={<IconTrophy />}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span className="gauge-num">{result.weightedConfidence}%</span>
          <span className="muted" style={{ fontWeight: 600 }}>{result.greenCount} of {result.total} milestones green</span>
        </div>
        <div className="meter green" style={{ maxWidth: 480 }}><span style={{ width: `${result.weightedConfidence}%` }} /></div>
      </Card>

      <div style={{ marginTop: 18 }} className="milestone-grid">
        {SUCCESS_MILESTONES.map((m) => (
          <Milestone
            key={m.id}
            m={m}
            status={status[m.id]}
            comment={comments[m.id]}
            onStatus={(v) => patch({ successStatus: { ...status, [m.id]: v } })}
            onComment={(v) => patch({ successComments: { ...comments, [m.id]: v } })}
          />
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 18 }}>
        <button className="btn btn-primary" onClick={() => goTo('recommendation')}>
          View recommendation →
        </button>
        <button className="btn" disabled={result.greenCount === 0} onClick={() => sendMail(buildOutcomesEmail(opp))}>
          <IconMail size={15} /> Email milestones to DRB
        </button>
      </div>
      <p className="muted" style={{ fontSize: 11.5, marginTop: 10 }}>
        Sending opens your mail client with the milestone summary addressed to {DRB_CONTACT}, so it can be read ahead of
        the DRB session. Nothing is sent automatically.
      </p>
    </>
  )
}
