// Federal Govt New Business Qualification Tool — 6 narrative categories.

export const FED_GOVT_CATEGORIES = [
  {
    id: 'opportunity',
    name: 'What is the opportunity',
    prompt:
      'What is the client asking for? Who are the proposal management team and are they available?',
  },
  {
    id: 'relationship',
    name: 'Client relationship and competitor landscape',
    prompt:
      'Do we know the buyer and the strength of the relationship? Have we had any recent feedback? Do we know the main competitors? Do we know if there is an incumbent?',
  },
  {
    id: 'value',
    name: 'Value proposition and priority alignment',
    prompt:
      'What is our value proposition and differentiator? Does it align to Geo and Account priorities? Does it align to a priority GTM agenda?',
  },
  {
    id: 'resourcing',
    name: 'Resourcing',
    prompt:
      'What skill sets are required to deliver the job? Do we have the skill sets to fill the roles? If not, what are the gaps? Who are the proposed leads and team members? Are the proposed team available?',
  },
  {
    id: 'pricing',
    name: 'Pricing, risk and conflicts of interest',
    prompt:
      'What is the proposed approach to pricing (T&M, fixed fees etc.)? Any associated delivery risks or issues? Any potential or perceived conflicts of interest? Are the services seeking technology solutions?',
  },
  {
    id: 'recommendation',
    name: 'Go / no-go recommendation',
    prompt:
      'Based on the above, what is the recommendation from the cluster / qualification team? If Go, what is needed to win the work (pursuit support, investment ask, SME pursuit support and input)?',
  },
]
