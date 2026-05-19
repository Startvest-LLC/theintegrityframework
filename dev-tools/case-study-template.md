# Case study template

Use this template to propose or draft a new TIF case study. Two kinds:

- **External** — a publicly-reported failure walked through the framework.
  Cite reporting only; no private information.
- **Internal** — a real portfolio audit, run against a product you operate.

Submit external case proposals to integrity@startvest.ai. Internal cases
are added directly under `src/app/framework/cases/<slug>/page.tsx`.

---

## Required metadata

| Field | Value |
| --- | --- |
| `slug` | URL-safe identifier, e.g. `acme-vendor-leak` |
| `title` | Short, declarative — "<Product>, the <thing> audit" |
| `kind` | `External — public reporting` or `Internal — portfolio audit` |
| `date` | `YYYY-MM-DD` |
| `summary` | 2–4 sentences, indexable — what the case shows and what it drove |

## Body structure

### Section 1 — What happened
For external cases: a neutral, sourced summary of the public reporting.
Link every claim. For internal cases: scope of the audit (dimensions
audited, dates).

### Section 2 — Walked through the framework
For each relevant Layer / dimension, a row:

| Dimension | Verdict | Evidence |
| --- | --- | --- |
| <name> | PASS / PARTIAL / FAIL / N/A | <one-line evidence + link> |

### Section 3 — What the framework caught (or missed)
Plain English. If the framework didn't catch something it should have,
say so. Internal cases that drove a base-manifest revision should link
to the audit-log entry.

### Section 4 — Outcome
For external cases: the scorecard total. For internal cases: PASS /
PARTIAL / FAIL counts and any base-manifest revisions triggered.

## Honest-listing requirements

- **External cases:** cite public reporting only. Quote, link, attribute.
  Do not speculate beyond what reporting supports.
- **Internal cases:** must reflect the actual audit. If a dimension was
  N/A, mark it N/A — do not inflate scores. False positives and false
  negatives in the framework's own rules should be called out, not
  hidden.

## Index entry

Add a row to the `CASES` array in
`src/app/framework/cases/page.tsx` with the metadata above. Keep
chronological order by `date`.

## Sitemap

Add the slug to `src/app/sitemap.ts` under the cases section so it's
crawlable.
