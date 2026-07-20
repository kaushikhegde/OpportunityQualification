// Outbound notifications.
//
// The app has no backend — qualifications live in the browser's localStorage
// only — so nothing is sent automatically. These helpers compose a pre-filled
// email and hand it to the user's mail client; they still press send. The body
// leads with the details the approvals guidance asks for (client, opportunity,
// Salesforce link, team, TCV, due date) so the message is actionable as-is.

import { scoreEarlyQual, scoreSuccessOutcomes, formatCurrency, formatDate } from './scoring.js'
import { SUCCESS_MILESTONES, DRB_THRESHOLD } from '../data/successOutcomes.js'

// Where qualification summaries are sent. Matches the approvals guidance shown
// in the Recommendation step.
export const DRB_CONTACT = 'mark.zezulka@scyne.com.au'

function opportunityHeader(opp) {
  const attendees = Array.isArray(opp.attendees) ? opp.attendees : []
  return [
    `Client name: ${opp.clientName || '—'}`,
    `Opportunity name: ${opp.opportunityName || '—'}`,
    `Salesforce link: ${opp.salesforceLink || 'Not linked'}`,
    `Opportunity team: ${attendees.length ? attendees.map((a) => a.name).join(', ') : 'None recorded'}`,
    `Total contract value: ${formatCurrency(opp.estimatedValue)}`,
    `Submission due date: ${formatDate(opp.dueDate)}`,
  ].join('\n')
}

// (a) Early Qualification outcome — flags when the deal needs to go to DRB, and
// (c) carries any support / investment the team has asked for.
export function buildEarlyQualEmail(opp) {
  const e = scoreEarlyQual(opp.earlyAnswers)
  const drbRequired = e.outcome?.key === 'GO' && Number(opp.estimatedValue) > DRB_THRESHOLD
  const outcome = e.outcome ? e.outcome.label : 'Not yet scored'

  const lines = [
    `Early Go/No-Go Checklist completed for ${opp.clientName || 'this client'}.`,
    '',
    opportunityHeader(opp),
    '',
    `Outcome: ${outcome}`,
    `Questions answered: ${e.answered} of ${e.total}`,
    `Date completed: ${formatDate(opp.dateCompleted)}`,
  ]

  if (drbRequired) {
    lines.push(
      '',
      `DRB REQUIRED — this is a GO on a deal above ${formatCurrency(DRB_THRESHOLD)}.`,
      'Please schedule a Deal Review Board session.',
    )
  }

  if (opp.rationale?.trim()) {
    lines.push('', 'Rationale for pursuing:', opp.rationale.trim())
  }

  if (opp.supportNeeds?.trim()) {
    lines.push('', 'SUPPORT / INVESTMENT REQUESTED:', opp.supportNeeds.trim())
  }

  return {
    subject: `Qualification outcome — ${opp.clientName || 'Client'}: ${opp.opportunityName || 'Opportunity'} (${outcome})`,
    body: lines.join('\n'),
  }
}

// (b) Improving Outcomes completed — so the milestone view can be read ahead of
// the DRB session.
export function buildOutcomesEmail(opp) {
  const s = scoreSuccessOutcomes(opp.successStatus)
  const status = opp.successStatus || {}
  const comments = opp.successComments || {}

  const green = SUCCESS_MILESTONES.filter((m) => status[m.id] === 'green')
  const notYet = SUCCESS_MILESTONES.filter((m) => status[m.id] !== 'green')

  const lines = [
    `Improving Outcomes completed for ${opp.clientName || 'this client'} — ready to review ahead of the DRB session.`,
    '',
    opportunityHeader(opp),
    '',
    `Weighted confidence: ${s.weightedConfidence}%`,
    `Milestones green: ${s.greenCount} of ${s.total}`,
    '',
    `GREEN (${green.length}):`,
    ...(green.length ? green.map((m) => `  - ${m.name}`) : ['  - None yet']),
    '',
    `NOT YET GREEN (${notYet.length}):`,
    ...(notYet.length ? notYet.map((m) => `  - ${m.name}`) : ['  - None — all milestones green']),
  ]

  const withComments = SUCCESS_MILESTONES.filter((m) => comments[m.id]?.trim())
  if (withComments.length) {
    lines.push('', 'Supporting comments:')
    for (const m of withComments) {
      lines.push(`  ${m.name}: ${comments[m.id].trim()}`)
    }
  }

  if (opp.supportNeeds?.trim()) {
    lines.push('', 'SUPPORT / INVESTMENT REQUESTED:', opp.supportNeeds.trim())
  }

  return {
    subject: `Improving Outcomes ready for DRB — ${opp.clientName || 'Client'}: ${opp.opportunityName || 'Opportunity'} (${s.weightedConfidence}%)`,
    body: lines.join('\n'),
  }
}

// Hands the composed message to the user's mail client. Long bodies are trimmed:
// some clients silently drop everything past roughly 2,000 characters in a
// mailto URL, which would truncate mid-sentence with no warning.
const MAX_BODY = 1800

export function sendMail({ subject, body }, to = DRB_CONTACT) {
  const trimmed =
    body.length > MAX_BODY
      ? `${body.slice(0, MAX_BODY)}\n\n[Summary truncated — open the qualification for the full detail.]`
      : body
  window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(trimmed)}`
}
