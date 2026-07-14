import { Card } from '../../components/ui.jsx'
import { RAINMAKER_DIMENSIONS } from '../../data/rainmaker.js'
import { scoreRainmaker } from '../../lib/scoring.js'
import { IconSpark } from '../../components/icons.jsx'

function YesNo({ value, onChange }) {
  return (
    <div className="toggle-row" style={{ maxWidth: 160 }}>
      <button className={`toggle ${value === 'yes' ? 'on-green' : ''}`} onClick={() => onChange(value === 'yes' ? '' : 'yes')}>Yes</button>
      <button className={`toggle ${value === 'no' ? 'on-not' : ''}`} onClick={() => onChange(value === 'no' ? '' : 'no')}>No</button>
    </div>
  )
}

export default function RainmakerStage({ opp, patch, goTo }) {
  const answers = opp.rainmakerAnswers || {}
  const notes = opp.rainmakerNotes || {}
  const result = scoreRainmaker(answers)

  return (
    <>
      <div className="sentinel" style={{ marginBottom: 18 }}>
        <div className="spark"><IconSpark size={20} /></div>
        <div className="body">
          <h3>RAINMAKER bid qualification checklist</h3>
          <p>27 yes/no questions across nine dimensions. The % Yes maps to a bid decision.</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 700, fontSize: 22, fontFamily: 'var(--font-head)' }}>{result.pct}%</div>
          <span className={`pill ${result.band.tone}`}>{result.band.label}</span>
        </div>
      </div>

      <div className="two-col">
        <div>
          {RAINMAKER_DIMENSIONS.map((d) => {
            const yes = d.questions.filter((q) => answers[q.id] === 'yes').length
            return (
              <Card key={d.id} title={<span><span className="qnum">{d.letter}</span>{d.name}</span>}
                actions={<span className="qcat-sub">{yes} / {d.questions.length} yes</span>}>
                {d.questions.map((q) => (
                  <div key={q.id} className="qcard" style={{ paddingBottom: 14 }}>
                    <div className="qtext" style={{ marginBottom: 10 }}>{q.text}</div>
                    <YesNo value={answers[q.id]} onChange={(v) => patch({ rainmakerAnswers: { ...answers, [q.id]: v } })} />
                    <input
                      className="input"
                      style={{ marginTop: 10 }}
                      placeholder="Notes (optional)"
                      value={notes[q.id] || ''}
                      onChange={(e) => patch({ rainmakerNotes: { ...notes, [q.id]: e.target.value } })}
                    />
                  </div>
                ))}
              </Card>
            )
          })}
          <button className="btn btn-primary" onClick={() => goTo('recommendation')} style={{ marginTop: 8 }}>
            View recommendation →
          </button>
        </div>
        <div className="rail">
          <Card className="score-card">
            <div className="label">% Yes</div>
            <div className="gauge-num">{result.pct}%</div>
            <div className={`meter ${result.band.tone}`}><span style={{ width: `${result.pct}%` }} /></div>
            <hr className="hr" />
            <span className={`pill ${result.band.tone}`}>{result.band.label}</span>
            <p className="muted" style={{ fontSize: 12.5, marginTop: 10 }}>{result.band.note}</p>
            <hr className="hr" />
            <div className="muted" style={{ fontSize: 12 }}>{result.yes} Yes · {result.no} No · {result.answered}/{result.total} answered</div>
          </Card>
        </div>
      </div>

      <div className="score-bar-mobile">
        <div>
          <div className="label" style={{ marginBottom: 2 }}>% Yes</div>
          <div style={{ fontWeight: 700, fontSize: 18 }}>{result.pct}%</div>
        </div>
        <span className={`pill ${result.band.tone}`}>{result.band.label}</span>
      </div>
    </>
  )
}
