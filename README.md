# Scyne · Pursuits — Opportunity Qualification

A responsive React app that turns the *Qualification tools* workbook into an
opportunity-centric, staged qualification workflow. Styled as a sibling of the
Scyne Performance app (lavender rail, calm neutrals, green/amber/red status
scale reserved for outcomes).

## The model

This is a **standalone qualification tool**. Opportunities are created and managed
in **Salesforce**; each record here is a *qualification* run against an existing
Salesforce opportunity (link it via its record URL / ID on the Details step).

A **Qualification** is the primary object. Opportunity details are entered once and
flow into whichever framework and stage the pursuit needs:

```
Details → Early Qualification → [Success Outcomes / DRB] → Recommendation
```

- **Early Qualification** — 14 weighted criteria in 6 categories, live score, and
  hard disqualifiers that force a STOP regardless of total. Outcome bands:
  STOP (≤10) · PAUSE (≤20) · GO (≥21).
- **Improving Success Outcomes** — 12 weighted milestones (green / not yet),
  weighted-confidence roll-up. Required for a GO on deals above $1m (DRB).
- **RAINMAKER** — 27 yes/no across 9 dimensions → % Yes → bid decision band.
- **Federal Govt** — a short narrative qualification.

The framework is chosen per opportunity on the Details step. Estimated value is a
structured number so the app can branch the >$1m DRB path automatically.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
```

Deep-link a stage with a hash, e.g. `/qualification/<id>#early`.

## Notes

- Data persists in the browser (`localStorage`). This is a prototype — wire a
  backend / Salesforce sync for production. Admin → Export JSON dumps all records.
- **Known source discrepancy:** the workbook hard-codes an Early Qualification
  total of 32 while the individual question maxima sum to 40. This app uses the
  real sum (40) as the denominator and keeps the documented absolute band
  thresholds (10 / 20 / 21). Adjust `src/data/earlyQual.js` if the intended
  maxima differ.

## Structure

```
src/
  data/            faithful transcriptions of each workbook sheet
  lib/scoring.js   all scoring / outcome logic
  store/           localStorage-backed opportunity context
  components/      Layout (sidebar/topbar), icons, UI primitives
  pages/           Dashboard, Workspace, Guidance, Admin
  pages/stages/    Details, EarlyQual, SuccessOutcomes, Rainmaker, FedGovt, Recommendation
```
