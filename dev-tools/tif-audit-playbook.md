# TIF Portfolio Audit Playbook

The meta-process for auditing Startvest products against The Integrity Framework. Distilled from the FieldLedger audit (2026-04-28), the first audit run, where the framework caught two false negatives in its own rule set and revised the rules in v1.3.0 / v1.4.0. Each subsequent audit either improved the framework or surfaced a clean question for user decision.

This playbook exists so future audits (PRAPI when it ships; quarterly cycles; external adopters) inherit the lessons instead of rediscovering them. Read it before kicking off any product audit. Update it whenever a new audit produces a meta-lesson.

---

## Audit order across the portfolio (initial cycle complete 2026-04-29)

| # | Product | Type | Status | Tickets | Framework revision |
|---|---|---|---|---|---|
| 1 | FieldLedger | Designed-to-TIF reference | Complete (2026-04-28) | 8 (#119–#126) | v1.2.0 + v1.3.0 + v1.4.0 |
| 2 | ClarityLift | Partial-TIF (forward documentation drift) | Complete (2026-04-28) | 8 (#423–#430) + framework #5 | v1.5.0 |
| 3 | IdeaLift | Retroactive-TIF non-compliance (reverse drift) | Complete (2026-04-29) | 2 (#2557–#2558) + framework #11 | v1.6.0 |
| 4 | HirePosture | Partial-TIF retroactive mid-build (candidate-data calibration) | Complete (2026-04-29) | 11 (#55–#65) | v1.7.0 (#11) + v1.8.0 |
| 5 | ADAComplianceDocs | Designed-to-TIF compliance-adjacent (validation-gate calibration) | Complete (2026-04-29) | 7 (#114–#120) + framework #14 | v1.9.0 |
| 6 | marketing-agent | Internal tooling with explicit constraint-set | Complete (2026-04-29) | 2 (#1–#2) | none — v1.9.0 held up |
| 7 | PRAPI | Pre-launch | **Scheduled for v0.1 ship audit, not deferred** — codebase not yet present (`E:\Development\` has no `PRAPI/` or `prapi/` directory as of 2026-04-29). Run when source exists. | — | — |

**Six audits complete in two days. Six framework revisions shipped (v1.2.0 → v1.9.0). Zero open framework questions at end-of-cycle.** Each audit either improved the framework or surfaced and resolved a clean question.

Hard pause for review after each product. The pause exists so framework-level lessons surface before propagating to the next audit. **Non-negotiable** — surfaced at least one rule revision in 5 of 6 audits.

## Workflow per product (the unit of work)

Per the Combined Workflow handoff agreed on 2026-04-28:

1. **integrity-cli runs first.** `cd startvest-integrity-cli && node bin/integrity.mjs check ../<product> --format=json > ../<product>/audits/tif-compliance.cli-output.json`. Deterministic. No LLM. The exit code and JSON output are the machine evidence for Layer 2.
2. **Claude Code reads** the repo, the existing `INTEGRITY.md` (if any), and the integrity-cli output.
3. **Claude Code assesses Layer 1 vetoes** qualitatively. Six pre-build vetoes; each one is a yes/no per product. Validate against code reality, not just documentation.
4. **Claude Code assesses Layer 3 guardrails** qualitatively. Seven business-practice guardrails. Match each against documented contracts, public pages, and operational practice.
5. **Claude Code writes `audits/tif-compliance.md`** with integrity-cli output as the Layer 2 evidence column. Every TIF requirement has a row: PASS / PARTIAL / FAIL / VACUOUS / DEFERRED, evidence link, remediation note.
6. **Claude Code updates `INTEGRITY.md`** with the audit date, summary status per layer, and a link to the matrix.
7. **Claude Code opens `tif-compliance` GitHub issues** for each fail and partial. Each ticket references the matrix row and the specific TIF section.
8. **Hard pause.** Do not propagate to the next product without explicit approval.

Each audit produces three artifacts in the product repo:

- `audits/tif-compliance.md` — the matrix
- `audits/tif-compliance.cli-output.json` — the machine evidence (regenerated on every audit run)
- Updated `INTEGRITY.md` — the public-facing summary

## Co-occurrence check pattern (when filename-based rules fail)

The single biggest framework-level lesson from the FieldLedger audit. Documented here so audits 2-7 don't re-trip it.

### The failure mode

Filename-based rules calibrate against a hypothetical product layout. A rule that says "any file matching `src/lib/cpars-*.ts` must contain `generatedByModel`" assumes the product persists AI output in a file called `cpars-*.ts`. Real codebases use **layered architectures**: a pure library that returns `{ text, model }`, a route that persists, and a schema that defines the column. The marker lives in the schema or the route, not in the library. The rule's globs hit the library file (which doesn't have the marker), and the rule false-negatives.

A false-negative rule is **silent-pass at the meta level**. The CI passes, the matrix shows green, the actual coverage is wrong. That's exactly the silent-pass pattern the framework prohibits at the product level. Applied recursively to the framework itself.

### The structural fix

The `co-occurrence` check kind (added to the runner in v1.3.0). Shape:

```json
{
  "kind": "co-occurrence",
  "globs": ["src/**/*.{ts,tsx,js,mjs}", "app/**/*.{ts,tsx,js,mjs}", ...],
  "trigger": { "patterns": [...] },
  "required": { "patterns": [...] }
}
```

Semantics: if any `trigger` pattern matches anywhere in the scanned corpus, then at least one `required` pattern must match somewhere in the scanned corpus. **Vacuous-pass when no trigger fires** (rule is inactive in repos that don't use the gated capability).

### When to use it

- The constraint is corpus-level ("if the codebase does X, it must also do Y"), not file-level.
- The trigger and the required marker are likely to live in different files in real architectures (library + persistence layer; library + route; component + schema).
- Filename-based rules would either require enumerating every product's exact layout (brittle) or use very broad globs that defeat the rule's purpose (also brittle).

### When *not* to use it

- The constraint is genuinely file-local (e.g. "this exact file must contain X" — like an `INTEGRITY.md` existence check).
- The required pattern is so common that finding it anywhere in the corpus is meaningless (e.g. "the corpus contains the word `function`" — useless).

### Trigger pattern hygiene

Vacuous-pass is correct **if and only if** the trigger pattern list is comprehensive. If the trigger list misses the way a product actually uses the gated capability, vacuous-pass becomes the new silent-pass.

For `CRIT-SV-AI-REVIEW-GATE`, the trigger list covers (as of v1.4.0):

- All major SDK imports: Anthropic, OpenAI, Google Generative AI, Vertex AI, Bedrock, Azure OpenAI, Vercel AI SDK, LangChain, LlamaIndex, HuggingFace, Cohere, Replicate, Mistral, Together, Groq, MCP.
- Direct API URLs: `api.anthropic.com`, `api.openai.com`, `api.x.ai`, `api.cohere.com`, `api.replicate.com`, `api.together.xyz`, `api.groq.com`, `api.mistral.ai`, `api.perplexity.ai`, `generativelanguage.googleapis.com`, `aiplatform.googleapis.com`, `*.openai.azure.com`, `bedrock-runtime.*.amazonaws.com`, `api-inference.huggingface.co`.
- Method calls: `client.messages.create`, `openai.chat.completions.create`, `model.generateContent`, `.invokeModel`, `streamText` / `generateText` / `streamObject` / `generateObject` / `embed` (Vercel AI SDK), `client.callTool` (MCP).

If a product uses an LLM through a path none of those triggers recognize, the rule false-negatives via vacuous-pass. **When auditing a product, check whether the trigger list covers the product's actual LLM call path.** Add patterns to the base manifest (and bump the version) if a real-world pattern is missing.

## False-negative-vs-real-fail decision tree

When integrity-cli flags a CRITICAL or HIGH failure on a product, do not assume it's a real product gap. Run the decision tree:

1. **What files matched the rule's globs?** If zero, the rule is vacuous — that's a separate problem (the rule should pass vacuously, not fail). If one or more, continue.
2. **Read the matched files.** Are they the surface the rule's *intent* targets? Or are they neighboring files that happened to match the glob?
   - If they're the intended surface and the required pattern genuinely isn't there → real fail. Open a ticket on the product.
   - If they're neighboring files (e.g. libraries when the rule wanted persistence layer) → false negative.
3. **For false negatives, find where the substance lives.** `grep` the entire repo for the required pattern (and synonyms). If the pattern exists somewhere in the corpus, the constraint is substantively satisfied — the rule's globs are miscalibrated.
4. **Document the decision.** In the matrix, the row should record:
   - The CLI verdict
   - The manual verification (file paths, line numbers, code references)
   - The resolution (real fail → product ticket; false negative → rule revision)
5. **Revise the rule.** False negatives are framework gaps. Fix them. Bump the base manifest version. Add a changelog entry that links back to the product audit row that surfaced the false negative. Re-run the audit to confirm the rule clears.

The decision tree's purpose is to prevent two failure modes:
- Rubber-stamping a real gap because the rule is "too sensitive."
- Filing a P0 ticket on a product when the gap is in the framework.

## Rule-revision-as-audit-log pattern

Real frameworks have rule revision history because real frameworks meet messy reality. Compliance theater frameworks freeze their rule set at v1.0 and pretend every rule is universally correct.

### The pattern

When a rule revision is driven by a product audit:

1. Bump the base manifest version (semver-style: minor for additions, minor for behavior-changing revisions, major for removals).
2. Add a changelog entry explaining:
   - **What changed** in the rule.
   - **Why it changed** — the specific failure mode the prior version had.
   - **Which audit surfaced it** — link directly to the product matrix row that triggered the revision.
3. Update the rule's `researchCitation` field to reference the revision (e.g. "Rule revised v1.4.0 after FieldLedger 2026-04-28 audit surfaced filename-based false negatives.").
4. Capture the rule-revision row in the product's `audits/tif-compliance.md` matrix, in a "Rule Revision History (this audit)" section. The product's matrix is the case study.

### Why it matters

A buyer reading `theintegrityframe.org/audit-log` a year from now needs to see:

- The rule existed.
- A real product audit surfaced a problem.
- The rule was revised, with rationale.
- The revision is tied to the specific case study.
- All of it is linked.

That chain is the credibility artifact other frameworks don't have. Without it, "we audited every product against TIF v1.0" is unfalsifiable. With it, every claim is traceable.

## Pause gates

Pauses exist for a reason. Do not skip them.

- **Hard pause after each product audit.** Surface any framework-level lessons before propagating. The post-FieldLedger pause caught two rule false-negatives that would have shipped to all six remaining audits otherwise.
- **Soft pause before opening GitHub tickets.** Tickets are externally visible. Confirm the matrix is correct before creating them. Once created, they're harder to retract gracefully.
- **No skipping when a finding is ambiguous.** "I'll figure it out later" is how the matrix becomes wrong. Resolve each finding (real fail / false negative / accepted partial) before moving to the next.

## Layer 2 mechanical coverage as of v1.9.0

| Constraint | Rule | Check kind | Notes |
|---|---|---|---|
| C1 Evidence Chain Integrity | (per-product, e.g. CRIT-FL-EVIDENCE-CHAIN, CRIT-HP-AUDIT-TRAIL-APPEND-ONLY) | forbidden-regex on schema migrations | Product-specific by design |
| C2 AI Output Review Gates | CRIT-SV-AI-REVIEW-GATE | co-occurrence (corpus-level) | Trigger: AI SDK imports + LLM call patterns. Required: review-gate markers (v1.8.0 added `signed_by_user_id` after HP). |
| C3 — output-attestation provenance | CRIT-SV-NO-PRE-POPULATED-ATTESTATION | co-occurrence (corpus-level) | "Did this customer-facing attestation reference customer-submitted evidence?" — markers like `RateSnapshotJson`, `EmployeeRowsJson`. |
| C3 — input-data provenance (v1.8.0) | (same rule, widened markers) | co-occurrence | "Is this data labeled as customer-attested vs system-derived?" — added snake_case variants `customer_attested`, `attested_by`, etc. |
| C3 — customer-attestation validation gate (v1.9.0) | CRIT-SV-CUSTOMER-ATTESTATION-VALIDATION-GATE | co-occurrence | "When may this customer-attested data publish?" — trigger on customer-attested status columns; require validation-gate function patterns. ADA-driven addition. |
| C4 Reproducibility | HIGH-SV-METHODOLOGY-VERSIONED | required-regex (matchAll) | Globs widened in v1.6.0 for monorepo layouts. |
| C5 Evidence Retention | HIGH-SV-EVIDENCE-RETENTION | forbidden-regex on offboarding paths | Globs widened in v1.6.0 for monorepo layouts. |
| C6 Independent Verification Hooks | (no rule yet — qualitative) | — | Constraint is role-based access; product-specific. Audits assess C6 qualitatively until a portable mechanical pattern emerges. |
| C7 Failure Transparency | CRIT-SV-NO-SILENT-PASS | forbidden-regex on catch blocks | Globs widened in v1.6.0 for monorepo layouts. |

Plus:
- `CRIT-SV-NO-BASE-ID-OVERRIDE` (v1.2.0) — drift prevention; manifest-merge time meta-rule
- `HIGH-SV-INTEGRITY-MD` — documentation surface
- `INFO-SV-TRUST-PRINCIPLES-LINK` — discoverability surface
- `HIGH-SV-INTEGRITY-MD-CLAIMS-VERIFIABLE` (v1.5.0 + v1.7.0 extension) — documentation drift prevention; scans Recent Changes (claim-presence policy) + Outstanding Risks (claim-absence policy); strikethrough text retracted; runnable assertions for high-value claims via `audits/integrity-claims.json` sidecar.

The C3 axis split (output-provenance / input-provenance / validation-gate) is the most subtle Layer 2 lesson from the portfolio audit. All three serve the same goal (keep customer-attested data isolated from system-derived) but at different layers and with different runtime semantics. Each was added when a product surfaced a shape the prior rules missed.

## Watch for: the constraint-file pattern (audit 6 — marketing-agent)

MA introduced a different shape entirely. The product is internal tooling, not a customer-facing compliance product, so most of the framework's mechanical rules are correctly N/A. But Layer 1 Veto 6 (TechCrunch Test) — manipulation, dark patterns, false urgency, fabricated citations — applies sharply because marketing automation sits adjacent to those failure modes.

MA's defense is **a single explicit constraint file** (`constraints.md`, 29 numbered items) that:
- Names every failure mode the V6 veto guards against
- States the "does NOT" rule for each
- Is git-tracked, version-controlled, and self-policed via a closing kill-switch ("Edits to this file require a dated note. Removals require Tom's explicit sign-off — the file should grow over time, not shrink.")
- Is referenced as the load-bearing artifact in INTEGRITY.md

This pattern may generalize. Layer 1 vetoes and Layer 3 guardrails that are policy / process surfaces (not code patterns) might be best authored as a constraint file with kill-switch discipline, rather than expressed as code-level CI rules. The framework's existing rules don't model this shape — they're all code-pattern checks.

**Watch for the pattern in future audits** (PRAPI when it lands; external adopters; quarterly cross-product re-audits). If it repeats:
- Codify as a new check kind (e.g. `constraint-file-immutable-or-log`) that asserts (a) the constraint file exists at a configured path, (b) edits include a dated note, (c) removals are blocked at the merge level via PR-label or codeowners.
- Add to base manifest as an optional rule that products opt into when policy / process surfaces dominate over code-level Layer 1 / Layer 3 surfaces.

If it doesn't repeat (or repeats in a way that resists codification — e.g., constraint files vary too much per product), keep the per-product extension pattern MA already uses (`CRIT-MA-CONSTRAINTS-IMMUTABLE-OR-LOG`).

**Do not codify on a single instance.** v1.10.0 holds. The discipline that produced six clean revisions in this audit cycle was: each revision was driven by at least one real product surfacing the gap. The constraint-file pattern has only one product example so far.

## Maintenance mode (post-portfolio-audit, 2026-04-29 onward)

Initial portfolio audit complete. The framework moves from "first-cycle audit" mode to sustained operation. Cadence:

1. **Ticket burndown — weekly half-day.** ~38 tickets opened across the six audits. Triage by priority (P0 first: MSA refund clauses; then P1s by external-claim impact; P2s as backlog). Half-day per week sustained gets the portfolio remediated to a clean state by the time the quarterly audit runs.
2. **PRAPI audit — when v0.1 ships.** Not deferred indefinitely. Scheduled. Run when codebase exists.
3. **Quarterly portfolio audit — first run ~July 2026.** Re-runs `integrity check` against every product on the then-current base manifest. Diff against this initial cycle's results. Publish portfolio-wide compliance dashboard. Update INTEGRITY.md `Last reviewed` dates.
4. **Framework revision discipline.** No new rules without a real product driving the addition. Watch for the constraint-file pattern (above) and any other shape that surfaces in PRAPI or external adopter audits. Codify only if it repeats.

Sustained cost: roughly 2–4 hours per week (ticket burndown + occasional ad-hoc audit when a product ships a major change).

## Quick reference: the four mechanism levers

### The four mechanism levers

The framework's drift-prevention infrastructure, ranked by leverage:

1. **CI-enforceable rules** (`@startvest/integrity-cli`) — the canonical base manifest plus per-product extensions. Compliance enforced at deploy time.
2. **`INTEGRITY.md` per repo** — the public-facing audit posture. Updated on every release. Stale > 90 days triggers a CI warning.
3. **Pre-merge `tif-review` label** on Layer 3 changes (MSA terms, marketing claims, methodology pages, pricing). Path-based, paths defined in each repo's `INTEGRITY.md`.
4. **Quarterly cross-product audit.** Portfolio dashboard published on theintegrityframe.org as an Audit Log page. Internal version drives remediation; public version creates accountability.

This playbook governs items 1, 2, and the audit cycle that drives items 3 and 4.
