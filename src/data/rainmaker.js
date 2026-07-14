// RAINMAKER Bid Qualification Checklist — 27 Yes/No questions across 9 dimensions
// (R-A-I-N-M-A-K-E-R). % Yes maps to a decision band.

export const RAINMAKER_DIMENSIONS = [
  {
    id: 'relationship',
    letter: 'R',
    name: 'Relationship',
    questions: [
      { id: 'rm1', text: 'Do we have an existing relationship with the client or key stakeholders?' },
      { id: 'rm2', text: 'Have we worked successfully with this client before?' },
      { id: 'rm3', text: 'Is our relationship stronger than that of likely competitors?' },
    ],
  },
  {
    id: 'attractiveness',
    letter: 'A',
    name: 'Attractiveness',
    questions: [
      { id: 'rm4', text: 'Does this opportunity align with our strategic growth areas?' },
      { id: 'rm5', text: 'Is the contract value commercially attractive to us?' },
      { id: 'rm6', text: 'Will winning this work enhance our portfolio or reputation?' },
    ],
  },
  {
    id: 'intelligence',
    letter: 'I',
    name: 'Intelligence',
    questions: [
      { id: 'rm7', text: "Do we have sufficient insight into the client's priorities and evaluation criteria?" },
      { id: 'rm8', text: 'Are we aware of who our key competitors are for this bid?' },
      { id: 'rm9', text: 'Do we understand the political or organisational context of this procurement?' },
    ],
  },
  {
    id: 'need',
    letter: 'N',
    name: 'Need',
    questions: [
      { id: 'rm10', text: 'Is there a clear, genuine need that our solution addresses?' },
      { id: 'rm11', text: 'Has the client confirmed budget and intent to proceed?' },
      { id: 'rm12', text: 'Is the timeline realistic for the scope of work required?' },
    ],
  },
  {
    id: 'money',
    letter: 'M',
    name: 'Money',
    questions: [
      { id: 'rm13', text: 'Is the budget sufficient to deliver the work profitably?' },
      { id: 'rm14', text: 'Are payment terms and contract conditions acceptable?' },
      { id: 'rm15', text: 'Do we have the financial capacity to resource this bid and project?' },
    ],
  },
  {
    id: 'authority',
    letter: 'A',
    name: 'Authority',
    questions: [
      { id: 'rm16', text: 'Have we identified the ultimate decision-maker(s)?' },
      { id: 'rm17', text: 'Do we have access to or influence with the decision-maker(s)?' },
      { id: 'rm18', text: 'Is the procurement process transparent and fair?' },
    ],
  },
  {
    id: 'knowhow',
    letter: 'K',
    name: 'Know-how',
    questions: [
      { id: 'rm19', text: 'Do we have the specialist skills and expertise required?' },
      { id: 'rm20', text: 'Can we demonstrate relevant technical capability and innovation?' },
      { id: 'rm21', text: 'Do we have the capacity to deliver at the required quality level?' },
    ],
  },
  {
    id: 'experience',
    letter: 'E',
    name: 'Experience',
    questions: [
      { id: 'rm22', text: 'Do we have directly comparable case studies or references?' },
      { id: 'rm23', text: 'Have we delivered projects of similar scale or complexity?' },
      { id: 'rm24', text: 'Is our track record in this sector strong enough to compete?' },
    ],
  },
  {
    id: 'risk',
    letter: 'R',
    name: 'Risk',
    questions: [
      { id: 'rm25', text: 'Are the legal, commercial and delivery risks acceptable?' },
      { id: 'rm26', text: 'Are there any reputational, ethical or conflict-of-interest concerns?' },
      { id: 'rm27', text: 'Can we absorb the cost of bidding if unsuccessful?' },
    ],
  },
]

export const RAINMAKER_QUESTIONS = RAINMAKER_DIMENSIONS.flatMap((d) => d.questions)

export const RAINMAKER_BANDS = [
  { min: 80, label: 'Strong Bid', tone: 'green', note: 'Proceed with confidence.' },
  { min: 60, label: 'Conditional Bid', tone: 'amber', note: 'Address gaps before proceeding.' },
  { min: 40, label: 'Caution', tone: 'amber', note: 'Seek senior approval before committing.' },
  { min: 0, label: 'No Bid', tone: 'red', note: 'Decline the opportunity.' },
]
