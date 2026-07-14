// Early Qualification Tool — data model transcribed from the workbook
// "1. EARLY QUALIFICATION TOOL" sheet.
//
// Each question carries its answer options with the manual scoring rubric baked
// in as point values. Some options are hard disqualifiers: selecting them forces
// the STOP outcome regardless of the total score (per the "How to manually score"
// notes in column Q of the sheet).

export const EARLY_QUAL_CATEGORIES = [
  {
    id: 'strategic',
    name: 'Strategic alignment',
    questions: [
      {
        id: 'q1',
        n: 1,
        text: 'Does this opportunity support our vision and purpose for Scyne and our strategic priorities?',
        help: '(a) Yes to vision and purpose — 2 points · (b) Yes to strategic priorities — 2 points · (c) Yes to both — 6 points',
        max: 6,
        options: [
          { value: 'both', label: 'Yes to both vision/purpose and strategic priorities', points: 6 },
          { value: 'vision', label: 'Yes to vision and purpose only', points: 2 },
          { value: 'priorities', label: 'Yes to strategic priorities only', points: 2 },
          { value: 'neither', label: 'No to both', points: 0 },
        ],
      },
    ],
  },
  {
    id: 'relationships',
    name: 'Relationships',
    questions: [
      {
        id: 'q2',
        n: 2,
        text: 'Has there been any interaction with the client in the past 30 days?',
        help: 'Yes — 2 points · No — 0 points',
        max: 2,
        options: [
          { value: 'yes', label: 'Yes', points: 2 },
          { value: 'no', label: 'No', points: 0 },
        ],
      },
      {
        id: 'q3',
        n: 3,
        text: 'Do we have a track record of delivering successfully with this client?',
        help: '(a) Yes with this client, yes in this space — 4 points · (b) Yes with this client, not in this space — 2 points · (c) Not with this client, yes in this space — 2 points · (d) Not with this client, not in this space — 0 points',
        max: 4,
        options: [
          { value: 'client_space', label: 'Yes with this client, yes in this space', points: 4 },
          { value: 'client_only', label: 'Yes with this client, not in this space', points: 2 },
          { value: 'space_only', label: 'Not with this client, yes in this space', points: 2 },
          { value: 'neither', label: 'Not with this client, not in this space', points: 0, disqualify: true },
        ],
      },
      {
        id: 'q4',
        n: 4,
        text: 'Did we (i) have foresight about the opportunity and (ii) did we or can we proactively shape this opportunity with the client?',
        help: '(a) Yes to both — 4 points · (b) Yes to (i) only — 1 point · (c) Yes to (ii) only — 1 point',
        max: 4,
        options: [
          { value: 'both', label: 'Yes to both foresight and shaping', points: 4 },
          { value: 'foresight', label: 'Yes to foresight (i) only', points: 1 },
          { value: 'shaping', label: 'Yes to shaping (ii) only', points: 1, disqualify: true },
          { value: 'neither', label: 'No to both', points: 0 },
        ],
      },
      {
        id: 'q5',
        n: 5,
        text: 'Do we have the right relationships with key decision makers including the CEO / Board / Management / Evaluation Committee?',
        help: 'Yes — 2 points · No — 0 points',
        max: 2,
        options: [
          { value: 'yes', label: 'Yes', points: 2 },
          { value: 'no', label: 'No', points: 0, disqualify: true },
        ],
      },
    ],
  },
  {
    id: 'understanding',
    name: 'Opportunity understanding',
    questions: [
      {
        id: 'q6',
        n: 6,
        text: "Do we have a clear understanding of the client's need, requirements and assessment criteria?",
        help: 'Yes — 2 points · No — 0 points',
        max: 2,
        options: [
          { value: 'yes', label: 'Yes', points: 2 },
          { value: 'no', label: 'No', points: 0 },
        ],
      },
      {
        id: 'q7',
        n: 7,
        text: 'Does this opportunity leverage multiple capabilities to create client value and allow us to work through multiple phases of the life cycle to deliver valued outcomes?',
        help: 'Yes — 2 points · No — 0 points',
        max: 2,
        options: [
          { value: 'yes', label: 'Yes', points: 2 },
          { value: 'no', label: 'No', points: 0 },
        ],
      },
      {
        id: 'q8',
        n: 8,
        text: 'Does this opportunity leverage our accelerator/assets and our Alliance partnerships to strengthen our value proposition?',
        help: 'Yes — 2 points · No — 0 points',
        max: 2,
        options: [
          { value: 'yes', label: 'Yes', points: 2 },
          { value: 'no', label: 'No', points: 0 },
        ],
      },
    ],
  },
  {
    id: 'commercials',
    name: 'Cost & commercials',
    questions: [
      {
        id: 'q9',
        n: 9,
        text: '(i) Does the client have approval, available resources and budget, and genuine intent? (ii) And can we provide a solution within the specified or anticipated budget?',
        help: '(a) Yes to both — 4 points · (b) Yes to (i) — 2 points · (c) Yes to (ii) — 2 points',
        max: 4,
        options: [
          { value: 'both', label: 'Yes to both', points: 4 },
          { value: 'client', label: 'Yes to (i) client approval/budget/intent only', points: 2 },
          { value: 'solution', label: 'Yes to (ii) solution within budget only', points: 2 },
          { value: 'neither', label: 'No to both', points: 0 },
        ],
      },
      {
        id: 'q10',
        n: 10,
        text: 'Does this opportunity meet both our risk and financial expectations?',
        help: 'Yes — 2 points · No — 0 points',
        max: 2,
        options: [
          { value: 'yes', label: 'Yes', points: 2 },
          { value: 'no', label: 'No', points: 0 },
        ],
      },
    ],
  },
  {
    id: 'team',
    name: 'Team & resourcing',
    questions: [
      {
        id: 'q11',
        n: 11,
        text: 'Does our bid team have the capacity to pursue this opportunity?',
        help: 'Yes — 2 points · No — 0 points',
        max: 2,
        options: [
          { value: 'yes', label: 'Yes', points: 2 },
          { value: 'no', label: 'No', points: 0 },
        ],
      },
      {
        id: 'q12',
        n: 12,
        text: 'Do we have the right team with the right expertise to deliver the work?',
        help: 'Yes — 2 points · No — 0 points',
        max: 2,
        options: [
          { value: 'yes', label: 'Yes', points: 2 },
          { value: 'no', label: 'No', points: 0 },
        ],
      },
    ],
  },
  {
    id: 'competitive',
    name: 'Competitive advantage',
    questions: [
      {
        id: 'q13',
        n: 13,
        text: 'Are we positioned strongly against competitors?',
        help: 'Yes — 2 points · No — 0 points',
        max: 2,
        options: [
          { value: 'yes', label: 'Yes', points: 2 },
          { value: 'no', label: 'No', points: 0 },
        ],
      },
      {
        id: 'q14',
        n: 14,
        text: 'At this stage, can we identify and clearly articulate our key differentiators?',
        help: 'Yes — 4 points · No — 0 points',
        max: 4,
        options: [
          { value: 'yes', label: 'Yes', points: 4 },
          { value: 'no', label: 'No', points: 0 },
        ],
      },
    ],
  },
]

// Flat list helper
export const EARLY_QUAL_QUESTIONS = EARLY_QUAL_CATEGORIES.flatMap((c) => c.questions)

// Sum of per-question maximums. Note: the source sheet hard-codes an overall
// total of 32 while the individual "total available" values sum to 40 — a known
// inconsistency in the workbook. We use the real sum here and keep the documented
// band thresholds (STOP <=10, PAUSE <=20, GO >=21) which are absolute point counts.
export const EARLY_QUAL_MAX = EARLY_QUAL_QUESTIONS.reduce((s, q) => s + q.max, 0)

export const EARLY_OUTCOMES = {
  STOP: {
    key: 'STOP',
    label: 'STOP — Do Not Proceed',
    tone: 'red',
    range: '1–10',
    summary: 'Do not proceed. This opportunity is not the best use of your time.',
    nextSteps:
      'Ensure you communicate with your client if they were expecting you to respond. Then focus on how to build the right capability, relationship and credentials with your client in this space for future opportunities. Plan for your next communication with the client. Update the Salesforce entry with your No-go outcome (including a short description of why and who made the decision).',
  },
  PAUSE: {
    key: 'PAUSE',
    label: 'Pause & Reconsider',
    tone: 'amber',
    range: '11–20',
    summary:
      'You should pause and reconsider whether this opportunity is the best use of your time. Connect with your Site Practice Lead or Capability Lead to understand if this is an area where we should be investing time to strengthen our position. Engage with DRB and CARP panels for further support.',
    nextSteps:
      'Revisit your pursuit plan and consider how you will influence, credentialise or change perceptions with your client. Consider what support or investment you need to strengthen our offering. Would our proposition be stronger if we were to partner with our Alliances? Update the Salesforce entry with your qualification outcome. Download a Long Term Pursuit Tracker or Proposal Tracker to manage your pursuit.',
  },
  GO: {
    key: 'GO',
    label: 'GO — Proceed with Support',
    tone: 'green',
    range: '21–32',
    summary:
      'You should go ahead and invest time and resources to pursue this opportunity. Connect with your Site Practice Lead or Capability Lead, and engage with DRB and CARP panels for further support.',
    nextSteps:
      'Consider what support or investment you need to strengthen our offering. Would our proposition be stronger if we were to partner with our Alliances? Update the Salesforce entry with your Go outcome. Download a Long Term Pursuit Tracker or Proposal Tracker to manage your pursuit.',
  },
}

export const STANDING_GUIDANCE = [
  {
    title: 'Approvals guidance',
    body: 'For guidance on approvals or to schedule an NTP or CARP session, email Mark Zezulka (mark.zezulka@scyne.com.au) with: Client Name, Opportunity Name, Salesforce Link, Opportunity Team to present to panel, Total Contract Value, Submission due date.',
  },
  {
    title: 'External partnering guidance',
    body: 'If there are subcontractors / partnering arrangements, these will require a Delivery Partner Relationship (DPR) approval prior to proceeding.',
  },
]
