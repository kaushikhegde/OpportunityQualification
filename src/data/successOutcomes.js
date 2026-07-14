// Improving Success Outcomes — the 12 milestones from the
// "2. IMPROVING SUCCESS OUTCOMES" sheet, used to prepare for the Deal Review
// Board (DRB) once a GO decision is made on a deal above $1m.
//
// Each milestone carries a forecast weighting. A milestone is either "green"
// (green criteria met) or not. Weighted confidence = sum of weightings of green
// milestones divided by the sum of all weightings.

export const SUCCESS_MILESTONES = [
  {
    id: 'scyne_capability',
    name: 'Scyne Capability',
    weighting: 0.01,
    about:
      'Assesses whether Scyne Advisory has the internal capability, resourcing, and delivery infrastructure required to successfully deliver the proposed engagement — including availability of key consultants, relevant domain expertise, and execution bandwidth.',
    green:
      'Scyne has verified internally that it can successfully deliver the proposed engagement with the right mix of skills, availability, and experience. Any delivery risks have been surfaced and addressed.',
    questions: [
      'Do we have the specific delivery capability and bandwidth for this engagement?',
      'Are there any internal constraints that could impact execution?',
      'Have we considered the availability of key individuals or resources?',
    ],
  },
  {
    id: 'scyne_economics',
    name: 'Scyne Economics',
    weighting: 0.01,
    about:
      "Evaluates whether the proposed engagement aligns with Scyne's own commercial objectives, pricing strategy, and delivery margin expectations.",
    green:
      'The opportunity is commercially viable for Scyne, with a pricing structure and scope that aligns with internal profitability thresholds. Any compromises are known and accepted.',
    questions: [
      'Does this opportunity meet our margin expectations?',
      'Have we considered any commercial risks to Scyne?',
      'Are there any red flags around scale, timing, or resourcing that could erode profitability?',
    ],
  },
  {
    id: 'identify_pain',
    name: 'Identify Pain',
    weighting: 0.1,
    about:
      'Reflects whether we have uncovered — and the customer has acknowledged — a clearly defined pain or business problem sufficiently impactful to warrant priority. It signals readiness to act.',
    green:
      'The customer has explicitly acknowledged a business-critical problem, understands its cost or consequences, and is sufficiently motivated to act. The implications of inaction are understood and tied to broader strategic outcomes.',
    questions: [
      'What is the cost of this pain to the organisation?',
      'Have they acknowledged the urgency and scale of the issue?',
      'Are the implications significant enough to drive investment?',
    ],
  },
  {
    id: 'uvp',
    name: 'Unique Value Proposition',
    weighting: 0.1,
    about:
      'Assesses whether the customer sees clear, differentiated value in our offering — value that other alternatives do not provide. It must be tangible and aligned with their most important outcomes.',
    green:
      'The customer understands and endorses the distinct value we provide, it is linked to measurable outcomes, and our proposition is clearly different from internal or external alternatives.',
    questions: [
      'Does the customer understand and endorse the distinct value we provide?',
      'Is the value linked to measurable outcomes or KPIs?',
      'Is our proposition clearly different from internal or external alternatives?',
    ],
  },
  {
    id: 'decision_criteria',
    name: 'Decision Criteria',
    weighting: 0.1,
    about:
      'Evaluates whether we understand the criteria the customer will use to compare options and select a partner — and whether anything in those criteria could exclude or disadvantage us.',
    green:
      'The formal decision criteria have been defined, documented, and validated with stakeholders. We know what the customer is prioritising and there are no known disqualifiers.',
    questions: [
      'What criteria will be used to select a provider?',
      'Have any criteria been defined that may work against us?',
      'Have we validated the criteria with more than one stakeholder?',
    ],
  },
  {
    id: 'decision_process',
    name: 'Decision Process',
    weighting: 0.1,
    about:
      'Assesses our understanding of the complete decision-making process, including formal and informal steps, timing, and any blockers that may prevent a successful outcome.',
    green:
      'We have mapped the decision process end to end, confirmed it with stakeholders, and identified any potential blockers. We know what needs to happen and when.',
    questions: [
      'Who needs to approve this and in what sequence?',
      'What could derail the process?',
      "Are there dependencies we haven't accounted for?",
    ],
  },
  {
    id: 'procurement_process',
    name: 'Procurement Process',
    weighting: 0.1,
    about:
      "Evaluates our understanding of the customer's formal procurement pathway — documentation, panels, timelines, and probity — and whether we are set up to navigate it successfully.",
    green:
      'We understand the procurement process, are eligible to participate, and have visibility into key dates, stages, and requirements. Any compliance risks have been identified and mitigated.',
    questions: [
      'Are we pre-qualified or on the required panel?',
      'Have we confirmed the process steps and stakeholders?',
      'Is there any risk of disqualification or delay?',
    ],
  },
  {
    id: 'commercial_authority',
    name: 'Commercial Authority',
    weighting: 0.1,
    about:
      'Assesses whether we have identified and engaged those who hold commercial authority to approve spend — whether a single executive, a committee, or a collective governance body.',
    green:
      'We have confirmed who holds commercial authority and have confidence they are aware of and supportive of our proposal. We understand their commercial priorities and approval thresholds.',
    questions: [
      'Who has the authority to approve the deal?',
      'Have they been engaged and briefed?',
      'What are the commercial sensitivities or limitations?',
    ],
  },
  {
    id: 'stakeholder_alignment',
    name: 'Stakeholder Alignment',
    weighting: 0.1,
    about:
      'Assesses the depth and quality of our alignment with key stakeholders — how well we understand their roles, priorities, and concerns, and whether we are seen as credible and aligned partners.',
    green:
      'We have strong working relationships with a critical mass of stakeholders, understand their perspectives, have established trust, and are engaged with those who will shape the decision — including both supporters and sceptics.',
    questions: [
      'Have we identified and have strategies for key personas — Decision makers, Influencers, Champions, Coaches, Detractors, Change Agents?',
      'Are we aligned with their individual goals or concerns?',
      'Are we perceived as credible and trustworthy by those who matter most?',
    ],
  },
  {
    id: 'competition',
    name: 'Competition',
    weighting: 0.1,
    about:
      'Captures our understanding of the competitive landscape and our current position relative to alternatives. It must reflect both awareness and position.',
    green:
      'We know who the competition is (external and internal), how the customer views us relative to them, and we are favourably positioned. If we are behind, the milestone should not be green.',
    questions: [
      'Who are we competing against?',
      'Where do we stand relative to those competitors?',
      'What signals have we seen that suggest we are ahead or behind?',
    ],
  },
  {
    id: 'compelling_event',
    name: 'Compelling Event',
    weighting: 0.1,
    about:
      'Evaluates whether one or more internal or external pressures are creating urgency to act — funding deadlines, policy changes, executive pressure, or operational constraints.',
    green:
      'There is a clear internal or external force that makes timely action necessary. The customer has acknowledged this urgency and it is shaping their decision-making timeline.',
    questions: [
      'What are the consequences of customer inaction?',
      'Have you identified a deadline or external driver pushing for a decision?',
      'Is this urgency recognised, shared across stakeholders and demonstrated in customer behaviour?',
    ],
  },
]

export const SUCCESS_MAX_WEIGHT = SUCCESS_MILESTONES.reduce((s, m) => s + m.weighting, 0)

// The $ threshold above which the DRB / Improving Success Outcomes step is required.
export const DRB_THRESHOLD = 1_000_000
