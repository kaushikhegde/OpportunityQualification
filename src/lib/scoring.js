import {
  EARLY_QUAL_QUESTIONS,
  EARLY_QUAL_CATEGORIES,
  EARLY_QUAL_MAX,
  EARLY_OUTCOMES,
} from '../data/earlyQual.js'
import { SUCCESS_MILESTONES, SUCCESS_MAX_WEIGHT } from '../data/successOutcomes.js'

// ---- Early Qualification -------------------------------------------------

export function scoreEarlyQual(answers = {}) {
  let score = 0
  let answered = 0

  for (const q of EARLY_QUAL_QUESTIONS) {
    const value = answers[q.id]
    if (value == null || value === '') continue
    const option = q.options.find((o) => o.value === value)
    if (!option) continue
    answered += 1
    score += option.points
  }

  // Outcome comes from the total score alone — no answer forces a STOP on its own.
  let outcomeKey
  if (answered === 0) outcomeKey = null
  else if (score <= 10) outcomeKey = 'STOP'
  else if (score <= 20) outcomeKey = 'PAUSE'
  else outcomeKey = 'GO'

  return {
    score,
    max: EARLY_QUAL_MAX,
    answered,
    total: EARLY_QUAL_QUESTIONS.length,
    outcome: outcomeKey ? EARLY_OUTCOMES[outcomeKey] : null,
    complete: answered === EARLY_QUAL_QUESTIONS.length,
  }
}

// Per-category breakdown of an Early Qual result: where points were won and
// lost, so the recommendation can explain *why* it landed on GO / PAUSE / STOP.
export function analyzeEarlyQual(answers = {}) {
  const categories = EARLY_QUAL_CATEGORIES.map((cat) => {
    let score = 0
    let max = 0
    let answered = 0
    const items = cat.questions.map((q) => {
      max += q.max
      const opt = q.options.find((o) => o.value === answers[q.id])
      const points = opt ? opt.points : 0
      if (opt) {
        score += points
        answered += 1
      }
      return { q, opt, points, answered: !!opt }
    })
    const pct = max ? Math.round((score / max) * 100) : 0
    const tone = pct >= 75 ? 'green' : pct >= 40 ? 'amber' : 'red'
    return { id: cat.id, name: cat.name, score, max, pct, tone, answered, total: cat.questions.length, items }
  })

  const strengths = []
  const gaps = []
  for (const cat of categories) {
    for (const it of cat.items) {
      if (!it.answered) continue
      const ratio = it.q.max ? it.points / it.q.max : 0
      if (it.points > 0 && ratio >= 0.75) {
        strengths.push({ category: cat.name, text: it.q.text, label: it.opt.label, points: it.points, max: it.q.max })
      } else if (it.points === 0 || ratio < 0.5) {
        gaps.push({ category: cat.name, text: it.q.text, label: it.opt.label, points: it.points, max: it.q.max })
      }
    }
  }
  strengths.sort((a, b) => b.points - a.points)
  gaps.sort((a, b) => b.max - b.points - (a.max - a.points))

  return { categories, strengths, gaps }
}

// ---- Improving Outcomes ------------------------------------------

export function scoreSuccessOutcomes(status = {}) {
  let greenWeight = 0
  let greenCount = 0
  for (const m of SUCCESS_MILESTONES) {
    if (status[m.id] === 'green') {
      greenWeight += m.weighting
      greenCount += 1
    }
  }
  const pct = Math.round((greenWeight / SUCCESS_MAX_WEIGHT) * 100)
  return {
    greenCount,
    total: SUCCESS_MILESTONES.length,
    weightedConfidence: pct,
  }
}

// ---- Shared --------------------------------------------------------------

export function formatCurrency(value) {
  const n = Number(value)
  if (!value || Number.isNaN(n)) return '—'
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(n)
}

export function formatDate(value) {
  if (!value) return '—'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('en-AU', { day: '2-digit', month: 'short', year: 'numeric' })
}

// Which outcome tone/label to show for an opportunity, given its active framework.
export function opportunityVerdict(opp) {
  if (!opp) return null
  if (opp.framework === 'outcomes') {
    const s = scoreSuccessOutcomes(opp.successStatus)
    if (s.greenCount === 0) return null
    const tone = s.weightedConfidence >= 70 ? 'green' : s.weightedConfidence >= 40 ? 'amber' : 'red'
    return {
      label: `${s.weightedConfidence}% weighted confidence`,
      tone,
      detail: `${s.greenCount} / ${s.total} green`,
    }
  }
  const e = scoreEarlyQual(opp.earlyAnswers)
  if (!e.outcome) return null
  return { label: e.outcome.label, tone: e.outcome.tone, detail: `${e.score} / ${e.max}` }
}
