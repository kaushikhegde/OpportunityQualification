import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'scyne.pursuits.opportunities.v1'

const OpportunityContext = createContext(null)

function uid() {
  return 'opp_' + Math.random().toString(36).slice(2, 10)
}

function blankOpportunity(seed = {}) {
  const now = new Date().toISOString()
  return {
    id: uid(),
    clientName: '',
    opportunityName: '',
    description: '',
    estimatedValue: '',
    dueDate: '',
    businessUnits: '',
    rationale: '',
    dateCompleted: '',
    attendees: [],
    salesforceId: '',
    salesforceLink: '',
    salesforceStage: '',
    salesforceOwner: '',
    framework: 'standard', // standard | fedgovt | rainmaker
    earlyAnswers: {},
    earlyCommentary: {},
    successStatus: {},
    successComments: {},
    rainmakerAnswers: {},
    rainmakerNotes: {},
    fedGovtResponses: {},
    supportNeeds: '',
    createdAt: now,
    updatedAt: now,
    ...seed,
  }
}

// A couple of seed records so the dashboard isn't empty on first run.
function seedData() {
  return [
    blankOpportunity({
      id: 'opp_seed_acme',
      clientName: 'Acme Council',
      opportunityName: 'Digital Transformation Program',
      description: 'Multi-year transformation of core citizen-services platforms and operating model.',
      estimatedValue: '2400000',
      dueDate: '2026-09-30',
      businessUnits: 'Technology, Change',
      salesforceId: '006Ab000012Xy9z',
      salesforceLink: 'https://scyne.lightning.force.com/lightning/r/Opportunity/006Ab000012Xy9z/view',
      salesforceStage: 'Interact',
      salesforceOwner: 'Priya Nair',
      rationale:
        'Strategic client in a priority sector; incumbent contract expiring and strong relationship with the CIO.',
      framework: 'standard',
      earlyAnswers: {
        q1: 'both', q2: 'yes', q3: 'client_space', q4: 'both', q5: 'yes',
        q6: 'yes', q7: 'yes', q8: 'yes', q9: 'both', q10: 'yes',
        q11: 'yes', q12: 'yes', q13: 'yes', q14: 'yes',
      },
      successStatus: {
        scyne_capability: 'green', scyne_economics: 'green', identify_pain: 'green',
        uvp: 'green', decision_criteria: 'green', decision_process: 'not',
        procurement_process: 'green', commercial_authority: 'not',
        stakeholder_alignment: 'green', competition: 'not', compelling_event: 'green',
      },
    }),
    blankOpportunity({
      id: 'opp_seed_dept',
      clientName: 'Dept. of Infrastructure',
      opportunityName: 'Program Assurance Panel',
      description: 'Refresh of the independent assurance panel for major infrastructure programs.',
      estimatedValue: '650000',
      dueDate: '2026-08-15',
      businessUnits: 'Advisory',
      salesforceId: '006Ab000013Aa1b',
      salesforceLink: 'https://scyne.lightning.force.com/lightning/r/Opportunity/006Ab000013Aa1b/view',
      salesforceStage: 'Target',
      salesforceOwner: 'Tom Fielding',
      framework: 'rainmaker',
      rationale: 'Federal panel refresh; moderate relationship, competitive field.',
      rainmakerAnswers: {
        rm1: 'yes', rm2: 'no', rm3: 'no', rm4: 'yes', rm5: 'yes', rm6: 'yes',
        rm7: 'yes', rm8: 'yes', rm9: 'no', rm10: 'yes', rm11: 'yes', rm12: 'yes',
        rm13: 'yes', rm14: 'yes', rm15: 'yes', rm16: 'yes', rm17: 'no', rm18: 'yes',
        rm19: 'yes', rm20: 'yes', rm21: 'yes', rm22: 'no', rm23: 'yes', rm24: 'yes',
        rm25: 'yes', rm26: 'yes', rm27: 'yes',
      },
    }),
  ]
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return seedData()
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return seedData()
    return parsed
  } catch {
    return seedData()
  }
}

export function OpportunityProvider({ children }) {
  const [opportunities, setOpportunities] = useState(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(opportunities))
    } catch {
      /* ignore quota errors */
    }
  }, [opportunities])

  const api = useMemo(
    () => ({
      opportunities,
      get: (id) => opportunities.find((o) => o.id === id),
      create: (seed) => {
        const o = blankOpportunity(seed)
        setOpportunities((prev) => [o, ...prev])
        return o
      },
      update: (id, patch) => {
        setOpportunities((prev) =>
          prev.map((o) =>
            o.id === id ? { ...o, ...patch, updatedAt: new Date().toISOString() } : o,
          ),
        )
      },
      remove: (id) => setOpportunities((prev) => prev.filter((o) => o.id !== id)),
    }),
    [opportunities],
  )

  return <OpportunityContext.Provider value={api}>{children}</OpportunityContext.Provider>
}

export function useOpportunities() {
  const ctx = useContext(OpportunityContext)
  if (!ctx) throw new Error('useOpportunities must be used within OpportunityProvider')
  return ctx
}
