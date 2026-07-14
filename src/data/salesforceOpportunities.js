// Mock Salesforce opportunity catalog.
//
// In production this would be a live query against the Salesforce REST API
// (SOSL/SOQL over Opportunity). Here it stands in so the picker can search and
// auto-populate a qualification. Values are AUD.

const BASE = 'https://scyne.lightning.force.com/lightning/r/Opportunity'

export const SF_OPPORTUNITIES = [
  {
    id: '006Ab000012Xy9z',
    client: 'Acme Council',
    name: 'Digital Transformation Program',
    description: 'Multi-year transformation of core citizen-services platforms and operating model.',
    value: 2400000,
    dueDate: '2026-09-30',
    businessUnits: 'Technology, Change',
    owner: 'Priya Nair',
    stage: 'Interact',
  },
  {
    id: '006Ab000013Aa1b',
    client: 'Dept. of Infrastructure',
    name: 'Program Assurance Panel',
    description: 'Refresh of the independent assurance panel for major infrastructure programs.',
    value: 650000,
    dueDate: '2026-08-15',
    businessUnits: 'Advisory',
    owner: 'Tom Fielding',
    stage: 'Target',
  },
  {
    id: '006Ab000014Bb2c',
    client: 'Sunstate Health',
    name: 'Clinical Systems Modernisation',
    description: 'Business case and delivery partner for replacing legacy patient administration systems.',
    value: 4100000,
    dueDate: '2026-11-20',
    businessUnits: 'Technology, Health',
    owner: 'Priya Nair',
    stage: 'Interact',
  },
  {
    id: '006Ab000015Cc3d',
    client: 'Metro Water',
    name: 'Asset Management Uplift',
    description: 'Operating-model and data uplift for capital asset planning and maintenance.',
    value: 890000,
    dueDate: '2026-07-31',
    businessUnits: 'Advisory, Data',
    owner: 'Sarah Cole',
    stage: 'Target',
  },
  {
    id: '006Ab000016Dd4e',
    client: 'National Education Authority',
    name: 'Student Data Platform',
    description: 'Design and procurement support for a national student data and analytics platform.',
    value: 1750000,
    dueDate: '2026-10-10',
    businessUnits: 'Technology, Data',
    owner: 'Tom Fielding',
    stage: 'Interact',
  },
  {
    id: '006Ab000017Ee5f',
    client: 'Coastal Shire',
    name: 'Finance Shared Services Review',
    description: 'Review and business case for a shared finance services operating model across the shire.',
    value: 320000,
    dueDate: '2026-08-28',
    businessUnits: 'Advisory',
    owner: 'Sarah Cole',
    stage: 'Target',
  },
  {
    id: '006Ab000018Ff6g',
    client: 'Dept. of Justice',
    name: 'Courts Digital Case Management',
    description: 'Strategy and delivery assurance for a digital case-management rollout across courts.',
    value: 3300000,
    dueDate: '2026-12-05',
    businessUnits: 'Technology, Change',
    owner: 'Priya Nair',
    stage: 'Target',
  },
  {
    id: '006Ab000019Gg7h',
    client: 'Regional Rail',
    name: 'Cyber Uplift Program',
    description: 'Security uplift and OT/IT convergence roadmap for regional rail operations.',
    value: 1200000,
    dueDate: '2026-09-12',
    businessUnits: 'Cyber, Technology',
    owner: 'Tom Fielding',
    stage: 'Interact',
  },
]

export function sfLink(id) {
  return `${BASE}/${id}/view`
}

// Map a Salesforce opportunity to the fields a new qualification pre-populates.
export function opportunityToSeed(o) {
  return {
    clientName: o.client,
    opportunityName: o.name,
    description: o.description,
    estimatedValue: String(o.value),
    dueDate: o.dueDate,
    businessUnits: o.businessUnits,
    salesforceId: o.id,
    salesforceLink: sfLink(o.id),
    salesforceStage: o.stage,
    salesforceOwner: o.owner,
  }
}

export function searchOpportunities(query) {
  const q = query.trim().toLowerCase()
  if (!q) return SF_OPPORTUNITIES
  return SF_OPPORTUNITIES.filter((o) =>
    [o.client, o.name, o.description, o.businessUnits, o.owner, o.id]
      .join(' ')
      .toLowerCase()
      .includes(q),
  )
}
