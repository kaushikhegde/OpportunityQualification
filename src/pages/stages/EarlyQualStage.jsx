import { useState } from 'react'
import { Card } from '../../components/ui.jsx'
import { EARLY_QUAL_CATEGORIES } from '../../data/earlyQual.js'
import { scoreEarlyQual } from '../../lib/scoring.js'
import { IconSpark, IconChevron } from '../../components/icons.jsx'

function QuestionCard({ q, value, comment, onAnswer, onComment }) {
  const [showHelp, setShowHelp] = useState(false)
  return (
    <div className="qcard">
      <div className="qtext">
        <span className="qnum">{q.n}</span>
        {q.text}
      </div>
      <button className="qhelp-toggle" onClick={() => setShowHelp((s) => !s)}>
        {showHelp ? 'Hide guidance' : 'How to answer'}
      </button>
      {showHelp && <div className="qhelp" style={{ marginTop: 6 }}>{q.help}</div>}

      <div className="opt-list" style={{ marginTop: 12 }}>
        {q.options.map((o) => {
          const selected = value === o.value
          return (
            <button
              key={o.value}
              className={`opt ${selected ? 'selected' : ''}`}
              onClick={() => onAnswer(selected ? '' : o.value)}
            >
              <span className="radio" />
              <span>{o.label}</span>
            </button>
          )
        })}
      </div>

      <div className="commentary">
        <textarea
          className="textarea"
          style={{ minHeight: 54 }}
          value={comment || ''}
          onChange={(e) => onComment(e.target.value)}
          placeholder="Supporting commentary (optional)"
        />
      </div>
    </div>
  )
}

function CategoryBlock({ cat, answers, comments, patch, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen)
  // Progress, not points — per-question scores are deliberately hidden so answers
  // aren't reverse-engineered towards a desired outcome.
  const answered = cat.questions.filter((q) => q.options.some((o) => o.value === answers[q.id])).length

  return (
    <Card className="qcat">
      <div className="qcat-head" onClick={() => setOpen((o) => !o)}>
        <h3>{cat.name}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span className="qcat-sub">{answered} / {cat.questions.length} answered</span>
          <span style={{ transform: open ? 'rotate(90deg)' : 'none', color: 'var(--text-muted)', transition: '0.15s' }}>
            <IconChevron size={16} />
          </span>
        </div>
      </div>
      {open && cat.questions.map((q) => (
        <QuestionCard
          key={q.id}
          q={q}
          value={answers[q.id]}
          comment={comments[q.id]}
          onAnswer={(v) => patch({ earlyAnswers: { ...answers, [q.id]: v } })}
          onComment={(v) => patch({ earlyCommentary: { ...comments, [q.id]: v } })}
        />
      ))}
    </Card>
  )
}

function ScoreCard({ result }) {
  const tone = result.outcome ? result.outcome.tone : 'neutral'
  const pct = Math.min(100, (result.score / result.max) * 100)
  return (
    <Card className="score-card">
      <div className="label">Qualification score</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span className="gauge-num">{result.score}</span>
        <span className="gauge-den">/ {result.max}</span>
      </div>
      <div className={`meter ${tone}`}><span style={{ width: `${pct}%` }} /></div>
      <div className="band-legend">
        <span>STOP ≤10</span><span>PAUSE ≤20</span><span>GO ≥21</span>
      </div>
      <hr className="hr" />
      {result.outcome ? (
        <span className={`pill ${result.outcome.tone}`}>{result.outcome.label}</span>
      ) : (
        <span className="italic-muted">Answer questions to see the outcome.</span>
      )}
      <div className="muted" style={{ fontSize: 12, marginTop: 12 }}>
        {result.answered} of {result.total} answered
      </div>
    </Card>
  )
}

export default function EarlyQualStage({ opp, patch, goTo }) {
  const answers = opp.earlyAnswers || {}
  const comments = opp.earlyCommentary || {}
  const result = scoreEarlyQual(answers)

  return (
    <>
      <div className="sentinel" style={{ marginBottom: 18 }}>
        <div className="spark"><IconSpark size={20} /></div>
        <div className="body">
          <h3>Early stage ‘stop / go’ checklist</h3>
          <p>Answer the 14 criteria below. The score and outcome update live as you go.</p>
        </div>
        {result.outcome && <span className={`pill ${result.outcome.tone}`}>{result.outcome.label}</span>}
      </div>

      <div className="two-col">
        <div>
          {EARLY_QUAL_CATEGORIES.map((cat, i) => (
            <CategoryBlock
              key={cat.id}
              cat={cat}
              answers={answers}
              comments={comments}
              patch={patch}
              defaultOpen={i === 0}
            />
          ))}
          <button className="btn btn-primary" onClick={() => goTo('recommendation')} disabled={!result.outcome} style={{ marginTop: 8 }}>
            View recommendation →
          </button>
        </div>
        <div className="rail">
          <ScoreCard result={result} />
        </div>
      </div>

      {/* Sticky mobile score bar */}
      <div className="score-bar-mobile">
        <div>
          <div className="label" style={{ marginBottom: 2 }}>Score</div>
          <div style={{ fontWeight: 700, fontSize: 18 }}>{result.score} <span className="muted" style={{ fontSize: 13 }}>/ {result.max}</span></div>
        </div>
        {result.outcome
          ? <span className={`pill ${result.outcome.tone}`}>{result.outcome.label}</span>
          : <span className="pill neutral">Not scored</span>}
      </div>
    </>
  )
}
