import { useState } from 'react'
import { Card, Field } from '../../components/ui.jsx'
import OpportunityPicker from '../../components/OpportunityPicker.jsx'
import ConfirmDialog from '../../components/ConfirmDialog.jsx'
import UserSearchSelect from '../../components/UserSearchSelect.jsx'
import { formatCurrency, formatDate } from '../../lib/scoring.js'
import { DRB_THRESHOLD } from '../../data/successOutcomes.js'
import { opportunityToSeed } from '../../data/salesforceOpportunities.js'
import { IconEdit, IconLink, IconTrash, IconAlert, IconSearch } from '../../components/icons.jsx'

const FRAMEWORKS = [
  { value: 'standard', label: 'Standard' },
  { value: 'fedgovt', label: 'Federal Govt' },
  { value: 'rainmaker', label: 'RAINMAKER' },
]

function Synced({ label, children }) {
  return (
    <Field label={label}>
      <div className="synced-value">{children || '—'}</div>
    </Field>
  )
}

export default function DetailsStage({ opp, patch, goTo, onDelete }) {
  const [pickerOpen, setPickerOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const drbRequired = Number(opp.estimatedValue) > DRB_THRESHOLD
  const linked = !!opp.salesforceId
  const attendees = Array.isArray(opp.attendees) ? opp.attendees : []

  const onSelect = (sfOpp) => {
    setPickerOpen(false)
    patch(opportunityToSeed(sfOpp))
  }

  return (
    <div className="two-col">
      <div>
        {!linked && (
          <div className="banner amber">
            <span className="ico"><IconAlert size={18} /></span>
            <div><strong>No opportunity linked.</strong> Select the Salesforce opportunity this qualification is for — its details will populate automatically.</div>
          </div>
        )}

        <Card
          title="Linked opportunity"
          icon={<IconLink />}
          actions={
            <button className="btn btn-sm" onClick={() => setPickerOpen(true)}>
              <IconSearch size={14} /> {linked ? 'Change opportunity' : 'Select opportunity'}
            </button>
          }
        >
          {linked ? (
            <>
              <div style={{ marginBottom: 12 }}>
                <span className="synced-badge"><IconLink size={12} /> Synced from Salesforce</span>
              </div>
              <div className="grid-2">
                <Synced label="Client name">{opp.clientName}</Synced>
                <Synced label="Opportunity name">{opp.opportunityName}</Synced>
                <Synced label="Estimated value">{formatCurrency(opp.estimatedValue)}</Synced>
                <Synced label="Due date">{formatDate(opp.dueDate)}</Synced>
                <Synced label="Business unit(s)">{opp.businessUnits}</Synced>
                <Synced label="Salesforce stage">{opp.salesforceStage}</Synced>
                <Synced label="Opportunity owner">{opp.salesforceOwner}</Synced>
              </div>
              <Synced label="Description">{opp.description}</Synced>
              {opp.salesforceLink && (
                <a href={opp.salesforceLink} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', fontWeight: 600, fontSize: 13 }}>
                  Open record in Salesforce ↗
                </a>
              )}
            </>
          ) : (
            <p className="italic-muted" style={{ margin: 0 }}>Nothing linked yet — use “Select opportunity” to search Salesforce.</p>
          )}
        </Card>

        <Card title="Qualification details" icon={<IconEdit />}>
          <div className="grid-2">
            <Field label="Qualification framework">
              <select className="select" value={opp.framework} onChange={(e) => patch({ framework: e.target.value })}>
                {FRAMEWORKS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
              </select>
            </Field>
            <Field label="Date completed">
              <input className="input" type="date" value={opp.dateCompleted} onChange={(e) => patch({ dateCompleted: e.target.value })} />
            </Field>
          </div>
          <Field label="Meeting attendees">
            <UserSearchSelect value={attendees} onChange={(list) => patch({ attendees: list })} />
          </Field>
          <Field label="Rationale — why pursue this opportunity?">
            <textarea className="textarea" value={opp.rationale} onChange={(e) => patch({ rationale: e.target.value })} placeholder="Add details regarding this opportunity and why you are considering investing time and resources to pursue it." />
          </Field>
        </Card>

        {drbRequired && (
          <div className="banner amber">
            <span className="ico"><IconAlert size={18} /></span>
            <div>
              <strong>Deal above $1m.</strong> A Deal Review Board (DRB) approval is required to proceed — the “Success Outcomes” step becomes mandatory once you reach a GO decision.
            </div>
          </div>
        )}

        <button className="btn btn-danger btn-sm" onClick={() => setConfirmDelete(true)} style={{ marginTop: 16 }}>
          <IconTrash size={14} /> Delete qualification
        </button>
      </div>

      <div className="rail">
        <Card>
          <div className="label">Estimated value</div>
          <div className="value-lg">{formatCurrency(opp.estimatedValue)}</div>
          <hr className="hr" />
          <div className="label">Due date</div>
          <div className="value-lg" style={{ fontSize: 18 }}>{formatDate(opp.dueDate)}</div>
        </Card>
        <Card title="Linked items" icon={<IconLink />}>
          <div className="label">Salesforce opportunity</div>
          {opp.salesforceLink
            ? <a href={opp.salesforceLink} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', fontWeight: 600 }}>Open record ↗</a>
            : <div className="italic-muted">Not linked</div>}
          <hr className="hr" />
          <div className="label">Attendees</div>
          <div className="chip-row">
            {attendees.length
              ? attendees.map((a) => <span key={a.id} className="chip">{a.name}</span>)
              : <span className="italic-muted">None recorded</span>}
          </div>
        </Card>
        <button
          className="btn btn-primary"
          disabled={!linked}
          onClick={() => goTo(opp.framework === 'rainmaker' ? 'rainmaker' : opp.framework === 'fedgovt' ? 'fedgovt' : 'early')}
        >
          Continue to qualification →
        </button>
      </div>

      <OpportunityPicker open={pickerOpen} onClose={() => setPickerOpen(false)} onSelect={onSelect} />
      <ConfirmDialog
        open={confirmDelete}
        title="Delete this qualification?"
        message={`The qualification for “${opp.opportunityName || 'this opportunity'}” will be permanently removed. This can’t be undone.`}
        confirmLabel="Delete qualification"
        onConfirm={onDelete}
        onCancel={() => setConfirmDelete(false)}
      />
    </div>
  )
}
