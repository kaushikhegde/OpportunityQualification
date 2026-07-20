import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import { Pill } from '../components/ui.jsx'
import { useOpportunities } from '../store/OpportunityContext.jsx'
import { opportunityVerdict, scoreEarlyQual } from '../lib/scoring.js'
import { DRB_THRESHOLD } from '../data/successOutcomes.js'
import { IconCheck, IconLock, IconArrowLeft } from '../components/icons.jsx'

import DetailsStage from './stages/DetailsStage.jsx'
import EarlyQualStage from './stages/EarlyQualStage.jsx'
import SuccessOutcomesStage from './stages/SuccessOutcomesStage.jsx'
import RecommendationStage from './stages/RecommendationStage.jsx'

function buildStages(opp) {
  const e = scoreEarlyQual(opp.earlyAnswers)
  const isGo = e.outcome?.key === 'GO'
  const isStop = e.outcome?.key === 'STOP'
  const drbRequired = Number(opp.estimatedValue) > DRB_THRESHOLD

  if (opp.framework === 'outcomes') {
    return [
      { id: 'details', label: 'Details', done: !!opp.clientName },
      { id: 'success', label: 'Improving Outcomes', done: false },
      { id: 'recommendation', label: 'Recommendation', done: false },
    ]
  }
  return [
    { id: 'details', label: 'Details', done: !!opp.clientName },
    { id: 'early', label: 'Early Qualification', done: e.complete },
    {
      id: 'success',
      label: 'Improving Outcomes (DRB)',
      done: false,
      locked: isStop || !isGo,
      hint: drbRequired ? 'Required — deal above $1m' : 'Optional at this value',
    },
    { id: 'recommendation', label: 'Recommendation', done: false, locked: !e.outcome },
  ]
}

export default function Workspace() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { get, update, remove } = useOpportunities()
  const opp = get(id)
  const [active, setActiveRaw] = useState(() => window.location.hash.replace('#', '') || 'details')
  const setActive = (stage) => {
    setActiveRaw(stage)
    window.history.replaceState(null, '', `#${stage}`)
  }

  if (!opp) {
    return (
      <Layout title="Qualification not found">
        <p className="italic-muted">This qualification could not be found.</p>
        <button className="btn" onClick={() => navigate('/')}>Back to dashboard</button>
      </Layout>
    )
  }

  const patch = (p) => update(opp.id, p)
  const stages = buildStages(opp)
  const verdict = opportunityVerdict(opp)
  const activeStage = stages.find((s) => s.id === active) || stages[0]

  const title = opp.opportunityName || 'Untitled opportunity'
  const breadcrumb = (
    <>
      <Link to="/qualifications">Qualifications</Link>
      <span className="sep">›</span>
      <span>{opp.clientName || 'Client'}</span>
      <span className="sep">›</span>
      <span style={{ color: 'var(--text)' }}>{activeStage.label}</span>
    </>
  )

  const commonProps = { opp, patch, goTo: setActive }

  return (
    <Layout title={<span style={{ display: 'inline-flex', gap: 12, alignItems: 'center' }}>{title}{verdict && <Pill tone={verdict.tone}>{verdict.label}</Pill>}</span>} breadcrumb={breadcrumb}>
      <Link to="/qualifications" className="back-link">
        <IconArrowLeft size={15} /> Back to qualifications
      </Link>

      <div className="stepper">
        {stages.map((s, i) => {
          const cls = [
            'step',
            active === s.id ? 'active' : '',
            s.done ? 'done' : '',
            s.locked ? 'locked' : '',
          ].join(' ')
          const lockReason =
            s.id === 'success'
              ? 'Locked until Early Qualification reaches GO'
              : 'Complete the earlier steps first'
          return (
            <button
              key={s.id}
              className={cls}
              onClick={() => !s.locked && setActive(s.id)}
              disabled={s.locked}
              aria-disabled={s.locked || undefined}
              title={s.locked ? lockReason : s.hint || ''}
            >
              <span className="num">
                {s.done ? <IconCheck size={13} /> : s.locked ? <IconLock size={12} /> : i + 1}
              </span>
              {s.label}
            </button>
          )
        })}
      </div>

      {active === 'details' && <DetailsStage {...commonProps} onDelete={() => { remove(opp.id); navigate('/') }} />}
      {active === 'early' && <EarlyQualStage {...commonProps} />}
      {active === 'success' && <SuccessOutcomesStage {...commonProps} />}
      {active === 'recommendation' && <RecommendationStage {...commonProps} />}
    </Layout>
  )
}
