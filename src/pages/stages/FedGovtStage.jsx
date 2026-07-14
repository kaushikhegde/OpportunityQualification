import { Card, Field } from '../../components/ui.jsx'
import { FED_GOVT_CATEGORIES } from '../../data/fedGovt.js'
import { IconSpark } from '../../components/icons.jsx'

export default function FedGovtStage({ opp, patch, goTo }) {
  const responses = opp.fedGovtResponses || {}

  return (
    <>
      <div className="sentinel" style={{ marginBottom: 18 }}>
        <div className="spark"><IconSpark size={20} /></div>
        <div className="body">
          <h3>Federal Govt new business qualification</h3>
          <p>A short, narrative qualification. Respond to each category, then record a go / no-go recommendation.</p>
        </div>
      </div>

      {FED_GOVT_CATEGORIES.map((c) => (
        <Card key={c.id} title={c.name}>
          <div className="qhelp" style={{ marginBottom: 12 }}>{c.prompt}</div>
          <Field>
            <textarea
              className="textarea"
              value={responses[c.id] || ''}
              onChange={(e) => patch({ fedGovtResponses: { ...responses, [c.id]: e.target.value } })}
              placeholder="Brief response…"
            />
          </Field>
        </Card>
      ))}

      <button className="btn btn-primary" onClick={() => goTo('recommendation')} style={{ marginTop: 8 }}>
        View recommendation →
      </button>
    </>
  )
}
