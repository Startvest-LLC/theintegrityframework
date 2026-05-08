// Spec topic data. Every entry cites a section of the published v1.0 framework
// at /framework/v1. If you change wording in the spec, bump specVersion or fix
// the citation here. Drop rule: a spec page that can't cite the exact published
// section is dropped, not shipped.

export const SPEC_VERSION = '1.0';
export const SPEC_LAST_UPDATED = '2026-04-25';

export type SpecLayer = 'failure-mode' | 'layer-1' | 'layer-2' | 'layer-3';

export interface SpecTopic {
  slug: string;
  title: string;
  layer: SpecLayer;
  layerLabel: string;
  specSection: string;
  specAnchor: string;
  oneLine: string;
  passes: string;
  fails: string;
  body: string[];
  relatedCases?: string[];
  relatedTopics?: string[];
}

export const SPEC_TOPICS: SpecTopic[] = [
  // ---------- Failure modes (5) ----------
  {
    slug: 'trust-arbitrage-failure',
    title: 'Trust-arbitrage failure',
    layer: 'failure-mode',
    layerLabel: 'Failure mode',
    specSection: 'Failure modes — 1 of 5',
    specAnchor: 'failure-modes',
    oneLine:
      'Selling certification artifacts as the product instead of the underlying outcomes. Volume-based business models destroy rigor over time.',
    passes:
      'Pricing is tied to actual verification work. Customers buy outcomes (audit-readiness, real compliance state) — not badges and reports.',
    fails:
      'Pricing is tied to artifact count. The product hits its revenue plan by issuing more reports, regardless of whether the underlying state changed.',
    body: [
      'The first of five failure modes the framework is reverse-engineered from. The pattern recurs across compliance categories — the artifact (a certificate, a badge, a report) is sold as if it were the outcome (genuine compliance, genuine security). Volume-based pricing then quietly forces the rigor down.',
      "Theranos sold 'lab results' as the product; the lab work behind them was the actual outcome, and the gap was the failure. Crossfit-style certifications sold the cert; the operator skill was the outcome. Once the artifact is what's monetized, every incremental sale is a downward pressure on the rigor that produced it.",
      'Layer 1 Veto 1 (artifact-vs-outcome) is the structural defense. Layer 3 guardrail (refund-on-failure) is the financial defense — when the artifact turns out wrong, the vendor pays. Together they make trust-arbitrage uneconomic.',
    ],
    relatedTopics: ['artifact-vs-outcome', 'refund-on-failure', 'pricing-rigor-alignment'],
  },
  {
    slug: 'theater-vs-substance-failure',
    title: 'Theater versus substance failure',
    layer: 'failure-mode',
    layerLabel: 'Failure mode',
    specSection: 'Failure modes — 2 of 5',
    specAnchor: 'failure-modes',
    oneLine:
      "Outputs that look like compliance but don't verify the underlying state. Checklists checked without verification, evidence collected without inspection.",
    passes:
      'Every claim on every output is traceable to specific evidence the product collected and timestamped. A reviewer can walk the chain.',
    fails:
      'Outputs read as if checks happened. The underlying evidence is missing, stale, or never inspected. Theater.',
    body: [
      "The second failure mode. Looks like compliance, smells like compliance, doesn't actually verify the underlying state. The Delve case study is the canonical example: attestation fields populated before the customer evidence existed, output looking finished while the substance behind it was empty.",
      "Layer 2 architectural constraint 1 (evidence chain integrity) is the structural defense — every claim must be traceable to specific evidence the product collected. Layer 2 constraint 7 (failure transparency) is the disclosure defense — when the product can't verify, it MUST say so, never silently default to 'compliant'.",
      'Theater is what catches procurement reviewers who actually read the output. Substance is what survives the audit when someone walks the chain.',
    ],
    relatedCases: ['delve'],
    relatedTopics: ['evidence-chain-integrity', 'failure-transparency', 'verifiability'],
  },
  {
    slug: 'conflict-of-interest-failure',
    title: 'Conflict-of-interest failure',
    layer: 'failure-mode',
    layerLabel: 'Failure mode',
    specSection: 'Failure modes — 3 of 5',
    specAnchor: 'failure-modes',
    oneLine:
      'Verifier paid by the verified entity, with no structural independence. The Andersen / Enron pattern.',
    passes:
      "Customer pays the vendor for tooling that prepares the customer for verification by genuinely independent third parties. Vendor doesn't certify its own customers.",
    fails:
      'Customer pays the vendor to BOTH prepare AND certify. The same entity collects fees and issues the verdict.',
    body: [
      'The third failure mode, and the one with the most-studied historical precedent. Arthur Andersen audited Enron while collecting consulting fees from Enron. The structural conflict made the rigor uneconomic, and the entire firm collapsed when the conflict surfaced.',
      'Layer 1 Veto 2 (independence) is the bright-line defense. The framework treats this as a hard rule, not a negotiable: the vendor must not certify its own customers. Tooling-to-prepare-for-third-party-verification is fine; tooling-and-certification-from-the-same-vendor is the failure mode.',
      'This veto is the single biggest selection filter on what products qualify under the framework. It rules out an entire product shape that would otherwise generate revenue.',
    ],
    relatedTopics: ['independence', 'pricing-rigor-alignment', 'annual-independent-audit'],
  },
  {
    slug: 'black-box-ai-failure',
    title: 'Black-box AI failure',
    layer: 'failure-mode',
    layerLabel: 'Failure mode',
    specSection: 'Failure modes — 4 of 5',
    specAnchor: 'failure-modes',
    oneLine:
      "AI producing compliance outputs without humans understanding what was done, why, or whether it's correct. Unique to current-generation compliance work.",
    passes:
      'AI outputs pass through documented review gates before becoming attestations. The review gate is a CI rule or schema field, not a policy.',
    fails:
      'AI output reaches a customer-facing claim directly. The review gate is a training, a checklist, or a vibe.',
    body: [
      "The fourth failure mode is the new one. Until ~2023 it didn't exist at industry scale; current-generation LLMs made it cheap to produce convincing compliance outputs faster than humans can review them.",
      'Layer 1 Veto 4 (AI accountability) is the structural defense at the pre-build level — the human review layer must exist by design. Layer 2 constraint 2 (AI output review gates) is the CI-enforced version: the review gate is a database column, a non-null foreign key, or a forbidden-pattern check that blocks the bypass at build time.',
      "Policy-only review gates fail under load. The product ships fast, the gate becomes a training nobody completes, and AI output starts flowing to customers unreviewed. Structural enforcement — the build fails when the gate is bypassed — is the only durable form.",
    ],
    relatedTopics: ['ai-accountability', 'ai-output-review-gates', 'failure-transparency'],
  },
  {
    slug: 'velocity-over-rigor-failure',
    title: 'Velocity-over-rigor failure',
    layer: 'failure-mode',
    layerLabel: 'Failure mode',
    specSection: 'Failure modes — 5 of 5',
    specAnchor: 'failure-modes',
    oneLine:
      'Business pressure to ship audits or certifications faster than they can be done well. Speed claims become trust claims become fraud.',
    passes:
      "Pricing is tied to work performed, not to a calendar. Per-engagement billing keeps the math honest about how long rigor takes.",
    fails:
      "'Unlimited audits for $X/year.' The model only works if audits get fast, and fast-enough audits stop being audits.",
    body: [
      'The fifth failure mode is the slow one. Volume pricing on rigorous work is a structural promise that rigor will degrade. The math forces it: if the price is fixed, every additional audit reduces per-audit time, and at some point the audit becomes a checklist scan that gets called an audit because that\'s what the contract calls it.',
      'Layer 1 Veto 5 (pricing-rigor alignment) is the defense at the pricing-model level. Volume pricing on rigorous outputs fails this veto by definition.',
      "This is the failure mode least likely to be visible at year 1. The vendor ships, sells, the audits feel rushed but acceptable. By year 3 the audits are checkboxes, the vendor is trapped in the pricing model, and everyone's compliance posture is worse than it would have been without the vendor.",
    ],
    relatedTopics: ['pricing-rigor-alignment', 'artifact-vs-outcome', 'public-kill-criteria'],
  },

  // ---------- Layer 1: pre-build vetoes (6) ----------
  {
    slug: 'artifact-vs-outcome',
    title: 'Veto 1: artifact versus outcome',
    layer: 'layer-1',
    layerLabel: 'Layer 1 — Pre-build veto',
    specSection: 'Layer 1, Veto 1 of 6',
    specAnchor: 'layer-1',
    oneLine:
      'Is the value proposition selling an artifact (report, badge, score) or an outcome (actual compliance, security, audit-readiness)? Outcome passes. Artifact fails.',
    passes:
      "Outcome — customer's underlying state is genuinely better. The artifact is a side-effect of the outcome, not the product itself.",
    fails:
      "Artifact — customer pays for the badge / report / score. Whether the underlying state changed is incidental to the transaction.",
    body: [
      "The first pre-build veto. Six questions get answered before a product gets built or before a major scope expansion; this is the first. Wrong answer kills the product, not delays it.",
      "The bright line: would a customer who needed the OUTCOME pay for it independently of the ARTIFACT? If yes, the product is selling outcomes. If the only reason to buy is to hold the artifact (a SOC 2 logo, a HIPAA-certified badge), the product is selling artifacts and fails this veto.",
      'A product failing this veto either gets reframed before build or gets passed on. The framework is more important than any single revenue line — Startvest passes on otherwise-attractive opportunities here regularly.',
    ],
    relatedTopics: ['trust-arbitrage-failure', 'verifiability', 'pricing-rigor-alignment'],
  },
  {
    slug: 'independence',
    title: 'Veto 2: independence',
    layer: 'layer-1',
    layerLabel: 'Layer 1 — Pre-build veto',
    specSection: 'Layer 1, Veto 2 of 6',
    specAnchor: 'layer-1',
    oneLine:
      'Who pays us, and does that conflict with what we verify? Tooling to prepare for independent third-party verification: pass. Same vendor preparing AND certifying: fail.',
    passes:
      "Customer pays for tooling that prepares them for verification by a genuinely independent third party. The vendor doesn't issue the certification.",
    fails:
      'Vendor takes payment to prepare the customer AND to certify the customer. Same entity, both sides of the transaction. Andersen / Enron.',
    body: [
      'The second pre-build veto. Hard rule, not negotiable. The framework treats independence as the bright line that filters out an entire shape of product, regardless of revenue potential.',
      "The historical precedent (Arthur Andersen / Enron) is concrete: an audit firm collecting consulting fees from the audit subject can't credibly issue independent verdicts. The structure forces the rigor to degrade, and eventually the firm collapses with the conflict.",
      'In Startvest products, this veto rules out the certification-as-a-service model entirely. ClarityLift ships preparation tooling for SOC 2 audits — the audit is performed by an independent CPA firm. The framework requires the same of every product operating under it.',
    ],
    relatedTopics: ['conflict-of-interest-failure', 'annual-independent-audit', 'customer-side-compliance-owner'],
  },
  {
    slug: 'verifiability',
    title: 'Veto 3: verifiability',
    layer: 'layer-1',
    layerLabel: 'Layer 1 — Pre-build veto',
    specSection: 'Layer 1, Veto 3 of 6',
    specAnchor: 'layer-1',
    oneLine:
      'Can we mechanically verify what we claim, or are we relying on customer attestation alone? Mechanical: pass. Attestation as proof: fail.',
    passes:
      "Claims are backed by evidence the product itself collected and can re-check. Attestation is supplementary, never primary.",
    fails:
      "The claim's only basis is that the customer said it. The product has no independent way to confirm or re-confirm.",
    body: [
      "The third pre-build veto. The internal portfolio audits surfaced an important refinement to this veto: the input-data-provenance vs output-attestation-provenance distinction (see the Hireposture case study). Customer attestation IS valid for input data — but the output the product publishes can't be solely attestation-backed.",
      "Mechanical verification means a build-time, runtime, or scheduled re-check. The product can re-prove the claim today without asking the customer again.",
      'The fifth internal portfolio audit (adacompliancedocs) surfaced a structurally new shape of this veto — the customer-attestation-validation-gate: a customer-attested status field cannot publish until system-verified evidence supports it. That shape became the third C3 axis in base manifest v1.9.0.',
    ],
    relatedCases: ['hireposture', 'adacompliancedocs'],
    relatedTopics: ['evidence-chain-integrity', 'customer-attestation-isolation', 'theater-vs-substance-failure'],
  },
  {
    slug: 'ai-accountability',
    title: 'Veto 4: AI accountability',
    layer: 'layer-1',
    layerLabel: 'Layer 1 — Pre-build veto',
    specSection: 'Layer 1, Veto 4 of 6',
    specAnchor: 'layer-1',
    oneLine:
      "When AI gets it wrong, what's the human review layer and escalation path? AI through documented review gates: pass. AI direct to customer-facing claim: fail.",
    passes:
      'AI outputs pass through documented review gates before becoming attestations, reports, or customer-facing claims. The review gate is structurally enforced.',
    fails:
      "AI output reaches the customer directly. The 'review gate' is a policy, a training, or a one-time prompt-engineering exercise.",
    body: [
      "The fourth pre-build veto. This veto is the new one — current-generation AI made it cheap to produce compliance-shaped output faster than humans can read, let alone verify. Without a review layer, the failure mode is automatic.",
      "The veto sits at the pre-build level because it's a design question, not an implementation question. A product designed without a review layer can't add one later without re-architecting; a product designed WITH a review layer survives the volume pressure that would have shipped unreviewed AI output.",
      'Layer 2 constraint 2 (AI output review gates) is the CI-enforced version of this veto. Where the architecture allows, the review gate is a non-null foreign key or a required-field check; the build fails when the gate is bypassed.',
    ],
    relatedTopics: ['black-box-ai-failure', 'ai-output-review-gates', 'failure-transparency'],
  },
  {
    slug: 'pricing-rigor-alignment',
    title: 'Veto 5: pricing-rigor alignment',
    layer: 'layer-1',
    layerLabel: 'Layer 1 — Pre-build veto',
    specSection: 'Layer 1, Veto 5 of 6',
    specAnchor: 'layer-1',
    oneLine:
      'Does our pricing model create financial pressure to skip work? Pricing tied to actual work performed: pass. "Unlimited audits for $X/year": fail.',
    passes:
      'Pricing scales with the rigor performed. More work, more revenue. Less work, less revenue. The math doesn\'t pressure anyone to cut corners.',
    fails:
      "Pricing is fixed and the product is rigorous work. Every additional unit reduces per-unit time. Eventually, per-unit time becomes too small to do the work properly.",
    body: [
      "The fifth pre-build veto. The defense against velocity-over-rigor failure at the pricing-model level.",
      "Volume pricing on rigorous outputs is a structural promise that rigor will degrade. The math forces it. A vendor selling 'unlimited audits' for a flat fee has already committed to making audits cheaper to produce than to do well.",
      'Per-engagement and per-evidence billing pass this veto. SaaS subscriptions for tooling that supports rigorous work pass too. Subscriptions where the deliverable is the rigorous work itself — that fails.',
    ],
    relatedTopics: ['velocity-over-rigor-failure', 'artifact-vs-outcome', 'refund-on-failure'],
  },
  {
    slug: 'techcrunch-test',
    title: 'Veto 6: the TechCrunch test',
    layer: 'layer-1',
    layerLabel: 'Layer 1 — Pre-build veto',
    specSection: 'Layer 1, Veto 6 of 6',
    specAnchor: 'layer-1',
    oneLine:
      'Imagine the worst-case headline about this product in 18 months. Can we defend every claim, methodology, and output? Concrete defense: pass. Hand-waving: fail.',
    passes:
      'Every claim, every methodology, every output survives the worst-faith reading. The defense is files, dates, evidence chains.',
    fails:
      "The defense requires hand-waving, context-setting, or 'we never said it that way.' The TechCrunch headline is going to land.",
    body: [
      "The sixth and final pre-build veto. A reverse-engineered question — instead of asking 'can we build this and ship', ask 'can we still defend this in 18 months when the worst possible reading lands as a headline?'",
      "The 18-month horizon is calibrated to the average compliance-product time-to-incident. Most categories experience their first public-failure event in months 12-24 after seeing real volume; this veto runs the failure mode forward in time and asks whether the defense holds up.",
      "A product passing this veto has its defenses in place by design. A product failing it has the defense as a hope. Hope-based defenses lose to journalists with public records.",
    ],
    relatedTopics: ['public-methodology-documentation', 'failure-transparency', 'public-kill-criteria'],
  },

  // ---------- Layer 2: architectural constraints (7) ----------
  {
    slug: 'evidence-chain-integrity',
    title: 'Constraint 1: evidence chain integrity',
    layer: 'layer-2',
    layerLabel: 'Layer 2 — Architectural constraint',
    specSection: 'Layer 2, Constraint 1 of 7',
    specAnchor: 'layer-2',
    oneLine:
      'Every compliance claim traceable to specific evidence the product collected and timestamped.',
    passes:
      'Every claim row in the output has a non-null foreign key to an evidence row. The build fails when the foreign key is null.',
    fails:
      "Claims exist; the evidence behind them is implicit, missing, or stored in a different system the product can't re-walk.",
    body: [
      'The first Layer 2 constraint, CI-enforced where the codebase shape allows. Evidence-chain integrity becomes a non-null foreign key; the database schema makes the claim-without-evidence shape unrepresentable.',
      'This constraint is the structural defense against theater-vs-substance failure. A claim that lacks specific evidence is a theater claim by definition; if the schema forbids it, the failure mode is impossible to ship.',
      'The reference runner for this and the other Layer 2 constraints is integrity-cli. The base manifest implements evidence-chain checks as both schema-level (foreign key required) and content-level (no claim-strings without evidence-strings in adjacent positions) rules.',
    ],
    relatedTopics: ['theater-vs-substance-failure', 'reproducibility', 'failure-transparency'],
  },
  {
    slug: 'ai-output-review-gates',
    title: 'Constraint 2: AI output review gates',
    layer: 'layer-2',
    layerLabel: 'Layer 2 — Architectural constraint',
    specSection: 'Layer 2, Constraint 2 of 7',
    specAnchor: 'layer-2',
    oneLine:
      'Any AI-generated compliance output passes through human review before becoming an attestation, report, or customer-facing claim.',
    passes:
      "AI outputs are stored in a 'pending-review' state that requires a reviewer signature before becoming customer-facing. The state machine is enforced at the schema level.",
    fails:
      'AI output writes directly to the customer-facing field. Review is a policy, a training, or a UI hint.',
    body: [
      "The second Layer 2 constraint. The CI-enforced version of Layer 1's AI-accountability veto. Policy alone fails under volume; structural enforcement is the only durable form.",
      "The reference shape is a state machine: AI output enters as 'pending-review', a reviewer's user_id signs the row to move it to 'reviewed', and only 'reviewed' rows are visible to the customer-facing surface. The reviewer-signature column is non-null on the customer-facing query.",
      "integrity-cli's base manifest carries this as a content-rule check across compliance products: the existence of an AI-output table or column without a paired reviewer-signature column is a HIGH finding.",
    ],
    relatedTopics: ['ai-accountability', 'black-box-ai-failure', 'evidence-chain-integrity'],
  },
  {
    slug: 'customer-attestation-isolation',
    title: 'Constraint 3: customer self-attestation isolation',
    layer: 'layer-2',
    layerLabel: 'Layer 2 — Architectural constraint',
    specSection: 'Layer 2, Constraint 3 of 7',
    specAnchor: 'layer-2',
    oneLine:
      'Customer-attested data visually and architecturally distinct from product-verified data.',
    passes:
      "Two table families: customer_attested_* and product_verified_*. The UI surfaces them with different visual treatment. A reviewer can't confuse attestation with verification.",
    fails:
      'Single mixed table. UI presents attestation and verification as the same kind of evidence. A reviewer reads the customer-attested field as if the product had verified it.',
    body: [
      "The third Layer 2 constraint. Surfaced as structurally important by the Hireposture audit (Hireposture is a candidate-data product where the input is necessarily attested, but the output attestation has different provenance). Drove base manifest v1.8.0 — accepting snake_case marker variants like signed_by_user_id and customer_attested.",
      "The architectural shape: distinct table prefixes, distinct UI components, distinct API field names. The reviewer can tell at a glance which data the product verified and which the customer attested.",
      "The fifth portfolio audit (adacompliancedocs, v1.9.0) extended this constraint with the validation-gate axis: a customer-attested status field cannot publish until system-verified evidence supports it.",
    ],
    relatedCases: ['hireposture', 'adacompliancedocs'],
    relatedTopics: ['verifiability', 'evidence-chain-integrity'],
  },
  {
    slug: 'reproducibility',
    title: 'Constraint 4: reproducibility',
    layer: 'layer-2',
    layerLabel: 'Layer 2 — Architectural constraint',
    specSection: 'Layer 2, Constraint 4 of 7',
    specAnchor: 'layer-2',
    oneLine:
      'Every audit conclusion reproducible from underlying evidence by an independent reviewer. Internal review gates test reproducibility quarterly.',
    passes:
      "An external reviewer, given the evidence files alone, arrives at the same conclusion the product produced. Quarterly internal test confirms.",
    fails:
      "The conclusion depends on internal product state, undocumented logic, or one-time AI output that can't be re-run with the same inputs.",
    body: [
      "The fourth Layer 2 constraint. The defense against the closed-system failure where the only entity who can reproduce the conclusion is the product itself.",
      "Reproducibility is tested quarterly inside Startvest. A random sample of conclusions gets re-walked by a non-author reviewer using only the evidence files. If the conclusion doesn't reproduce, the issue is filed and the underlying system is fixed before the next cycle.",
      "This constraint is what makes Layer 3 guardrail 3 (annual third-party audit) actually possible. An auditor can verify the product's outputs only if the outputs are reproducible from the evidence the product surfaces.",
    ],
    relatedTopics: ['evidence-chain-integrity', 'independent-verification-hooks', 'annual-independent-audit'],
  },
  {
    slug: 'evidence-retention-independence',
    title: 'Constraint 5: evidence retention independence',
    layer: 'layer-2',
    layerLabel: 'Layer 2 — Architectural constraint',
    specSection: 'Layer 2, Constraint 5 of 7',
    specAnchor: 'layer-2',
    oneLine:
      'Evidence supporting compliance claims retained per statutory requirements regardless of normal data lifecycle. Customer offboarding does NOT delete audit evidence.',
    passes:
      'Evidence storage is on a retention schedule independent of the customer lifecycle. Offboarding triggers redaction of PII; the audit chain itself is preserved per statutory rule.',
    fails:
      'Customer offboarding deletes the evidence chain. The audit becomes unverifiable as soon as the customer leaves.',
    body: [
      'The fifth Layer 2 constraint. A subtle one — most retention schedules in SaaS are tied to the customer lifecycle, but compliance evidence has its own statutory retention requirement that survives offboarding.',
      'The architectural shape: evidence storage is logically distinct from customer-data storage. PII gets redacted on offboarding per privacy rules; the audit-chain skeleton (timestamps, claim-IDs, evidence-hashes) is retained per the longer compliance schedule.',
      "Without this constraint, the historical claims a product made become unverifiable the moment the customer leaves. The audit chain is only as durable as the storage policy that defends it.",
    ],
    relatedTopics: ['evidence-chain-integrity', 'reproducibility'],
  },
  {
    slug: 'independent-verification-hooks',
    title: 'Constraint 6: independent verification hooks',
    layer: 'layer-2',
    layerLabel: 'Layer 2 — Architectural constraint',
    specSection: 'Layer 2, Constraint 6 of 7',
    specAnchor: 'layer-2',
    oneLine:
      'Every compliance product has a mode where an external auditor can verify product outputs without the product mediating.',
    passes:
      "An external auditor receives a read-only export with claim-rows, evidence-rows, hashes, and timestamps. They can verify outputs against evidence without the product's UI.",
    fails:
      "Verification requires the product's UI to function. The auditor sees only what the product chooses to show.",
    body: [
      'The sixth Layer 2 constraint. The product must have a mode where it gets out of the way and lets the auditor walk the chain directly.',
      "The reference shape is a verifier-export: a read-only bundle (often JSON Lines plus a hash manifest) of claim-rows, evidence-rows, and the linkage between them. The auditor's verification tooling consumes the bundle and re-walks the chain without the product mediating.",
      "This constraint is what makes Layer 3 guardrail 3 (annual third-party audit) economically tractable. Without verification hooks the auditor needs custom integration with the product; with them the audit is a script run.",
    ],
    relatedTopics: ['reproducibility', 'annual-independent-audit', 'public-methodology-documentation'],
  },
  {
    slug: 'failure-transparency',
    title: "Constraint 7: failure transparency",
    layer: 'layer-2',
    layerLabel: 'Layer 2 — Architectural constraint',
    specSection: 'Layer 2, Constraint 7 of 7',
    specAnchor: 'layer-2',
    oneLine:
      "When the product can't verify something, it MUST say so. Never silently default to 'compliant' when verification fails.",
    passes:
      "The product surfaces unknowns explicitly: 'unverified', 'evidence missing', 'check timed out'. The customer-facing surface distinguishes verified from not-verified-yet.",
    fails:
      "On verification failure, the product silently emits 'compliant' or 'pass'. The unknown becomes an implicit positive.",
    body: [
      'The seventh Layer 2 constraint. The architectural defense against the catch-and-default-to-true pattern that destroys evidence chains.',
      "The CI rule shape: forbidden-pattern check on `catch { return verified: true }` and similar shapes. The build fails when a catch block silently swallows verification failure into a positive verdict.",
      "This constraint is one of the most-tested in the integrity-cli base manifest, because the failure mode is easy to write accidentally and hard to catch in code review without an explicit check.",
    ],
    relatedTopics: ['evidence-chain-integrity', 'theater-vs-substance-failure', 'ai-output-review-gates'],
  },

  // ---------- Layer 3: operational guardrails (7) ----------
  {
    slug: 'refund-on-failure',
    title: 'Guardrail 1: refund-on-failure',
    layer: 'layer-3',
    layerLabel: 'Layer 3 — Operational guardrail',
    specSection: 'Layer 3, Guardrail 1 of 7',
    specAnchor: 'layer-3',
    oneLine:
      'Every customer contract includes a refund clause if our certification or verification turns out wrong because of our error or oversight.',
    passes:
      'The refund clause is in the standard MSA. The vendor can paste the clause on request without legal review.',
    fails:
      "Refund is only available on negotiated enterprise contracts. The default contract has no clause. 'We'd refund if it ever happened' is not a clause.",
    body: [
      'The first Layer 3 guardrail. The financial defense against velocity-over-rigor and trust-arbitrage. When the vendor pays for being wrong, the rigor stays economic.',
      "Vendor scorecard row 2 (refund-on-failure clause in the standard MSA) maps to this guardrail. A vendor that ducks this row is operating outside the framework whether they claim it or not.",
      "Startvest's three live products (ClarityLift, FieldLedger, adacompliancedocs) carry this as a baseline-published gap: the clause is drafted, finalization in flight. The gap is named on the operator self-grades section of the v1 spec, with the close date public.",
    ],
    relatedTopics: ['velocity-over-rigor-failure', 'pricing-rigor-alignment', 'public-kill-criteria'],
  },
  {
    slug: 'public-methodology-documentation',
    title: 'Guardrail 2: public methodology documentation',
    layer: 'layer-3',
    layerLabel: 'Layer 3 — Operational guardrail',
    specSection: 'Layer 3, Guardrail 2 of 7',
    specAnchor: 'layer-3',
    oneLine:
      'Every product publishes the methodology by which it produces compliance outputs. Not the source code, the methodology.',
    passes:
      'A versioned, changelogged methodology page. Linkable URL. Written so a procurement reviewer can verify each step.',
    fails:
      "No methodology page. Or the page exists but reads like marketing copy. Or it has no version and no changelog (silent drift).",
    body: [
      'The second Layer 3 guardrail. The transparency defense — the methodology must be public so the product can be checked against it.',
      "The Vendor Scorecard's first row (public methodology page) maps to this guardrail. Versioned and changelogged is non-negotiable; a methodology that drifts silently is the failure mode the framework defends against.",
      "The Integrity Framework's own /methodology page is the reference shape: the directory's evaluation criteria are themselves published as a versioned methodology. Eating the dog food.",
    ],
    relatedTopics: ['public-kill-criteria', 'techcrunch-test', 'independent-verification-hooks'],
  },
  {
    slug: 'annual-independent-audit',
    title: "Guardrail 3: annual independent audit",
    layer: 'layer-3',
    layerLabel: 'Layer 3 — Operational guardrail',
    specSection: 'Layer 3, Guardrail 3 of 7',
    specAnchor: 'layer-3',
    oneLine:
      'Once per year, every Startvest compliance product reviewed by a real third-party CPA firm or security firm. They sample our outputs. We publish findings, whatever they find.',
    passes:
      'Real CPA / security firm. Most recent audit shareable on request. Findings published, including the unflattering ones.',
    fails:
      "Only the audits the vendor SELLS to customers exist. The vendor itself is unaudited.",
    body: [
      'The third Layer 3 guardrail. The structural defense against grading your own homework.',
      "Vendor Scorecard row 3 maps to this guardrail. The framework requires that the vendor publishing certification outputs is itself audited by an independent third party. Not a peer-review, not a self-attestation, not an internal audit team — an external firm with its own independence requirements.",
      "Honest classification matters here. Startvest's three live products currently classify this row as NO with disclosure: the engagement cost is gated on external funding that does not currently exist. The row stays NO until that changes; relabeling it 'in flight' or 'scheduled' while funding is missing would be the failure mode itself.",
    ],
    relatedTopics: ['independence', 'reproducibility', 'independent-verification-hooks'],
  },
  {
    slug: 'customer-side-compliance-owner',
    title: "Guardrail 4: customer-side compliance owner",
    layer: 'layer-3',
    layerLabel: 'Layer 3 — Operational guardrail',
    specSection: 'Layer 3, Guardrail 4 of 7',
    specAnchor: 'layer-3',
    oneLine:
      "Before selling to a company, identify who there is responsible for the compliance outcome. We don't sell to companies where compliance is 'operations' problem.'",
    passes:
      "The customer has a named compliance owner — Compliance, Legal, Security, or named owner-operator. The owner signs off on the engagement.",
    fails:
      "No named owner. Compliance is 'something IT will figure out' or 'we'll add it to ops.' The vendor sells anyway.",
    body: [
      'The fourth Layer 3 guardrail. A discipline applied at the sales motion. Compliance products only work when there is a customer-side owner; without one, the product is shelfware regardless of how good the framework is.',
      'This guardrail also defends against a downstream failure mode: when there is no compliance owner on the customer side, the vendor inevitably becomes the compliance owner by default. That collapses the independence required by Layer 1 Veto 2.',
      "The qualification question gets asked at first call. If the answer is 'we don't have one', the vendor offers help finding one before continuing the sale, or declines.",
    ],
    relatedTopics: ['independence', 'conflict-of-interest-failure'],
  },
  {
    slug: 'internal-whistleblower-channel',
    title: 'Guardrail 5: internal whistleblower channel',
    layer: 'layer-3',
    layerLabel: 'Layer 3 — Operational guardrail',
    specSection: 'Layer 3, Guardrail 5 of 7',
    specAnchor: 'layer-3',
    oneLine:
      'Anonymous reporting channel monitored by independent counsel. Quarterly board-level review.',
    passes:
      'Real anonymous channel. Independent counsel monitors. Board reviews quarterly. The channel has a published contact path.',
    fails:
      "'Talk to your manager.' Or HR. Or the same exec the issue would be about.",
    body: [
      'The fifth Layer 3 guardrail. Internal-side defense against the failure modes that show up in compliance products before they show up to the customer.',
      "Independent counsel, not internal counsel. The whole point is that the channel must work even when the conflict is at the top of the org chart. Internal counsel reports to the same exec the issue would be about.",
      'Quarterly board-level review of the channel itself, not just of any reports filed. The framework treats the existence and health of the channel as itself a metric.',
    ],
    relatedTopics: ['independence', 'conflict-of-interest-failure', 'public-kill-criteria'],
  },
  {
    slug: 'community-accountability-pattern',
    title: 'Guardrail 6: community accountability pattern',
    layer: 'layer-3',
    layerLabel: 'Layer 3 — Operational guardrail',
    specSection: 'Layer 3, Guardrail 6 of 7',
    specAnchor: 'layer-3',
    oneLine:
      'Free tier or pack offered to a high-trust community that watches our work. Community will notice fakery.',
    passes:
      'A real high-trust community with eyes on the product. Veteran-owned business community for federal-contractor products. Disability-rights advocates for ADA products. Not a generic "free tier" with no engaged audience.',
    fails:
      "No specific community. The 'free tier' is a marketing funnel without engaged scrutiny.",
    body: [
      "The sixth Layer 3 guardrail. The external-side defense — a high-trust community watching the work catches fakery faster than auditors.",
      "The community must be a fit for the product. Veteran-owned business community watches federal-contractor products. Disability-rights advocates watch ADA-compliance products. Public-sector orgs watch trust-adjacent products. Generic 'free tier' marketing funnels don't qualify; the community has to have specific reason to care and the access to notice.",
      'Moat layer 5 (community accountability) on the eight-layer moat model maps to this guardrail. The framework treats community scrutiny as both a business moat AND an accountability mechanism — they are the same thing.',
    ],
    relatedTopics: ['public-methodology-documentation', 'public-kill-criteria'],
  },
  {
    slug: 'public-kill-criteria',
    title: 'Guardrail 7: public kill criteria',
    layer: 'layer-3',
    layerLabel: 'Layer 3 — Operational guardrail',
    specSection: 'Layer 3, Guardrail 7 of 7',
    specAnchor: 'layer-3',
    oneLine:
      "Every compliance product publishes the criteria under which we'd shut it down. Inverse of growth-at-all-costs.",
    passes:
      'Specific numbers, percentages, days, dates. Written down. Linkable URL. The vendor can be held to the criteria.',
    fails:
      "No kill criteria. Or vague 'we'd shut it down if it stopped working' language. Or criteria the vendor can quietly revise without a changelog.",
    body: [
      'The seventh Layer 3 guardrail. The structural commitment that the vendor will not chase revenue past the point where the product can be operated safely.',
      'Vendor Scorecard row 6 maps to this guardrail. Specificity is non-negotiable: numbers, thresholds, dates. A criterion the vendor can hand-wave away is not a criterion.',
      "Public kill criteria are inversion of growth-at-all-costs. They are also the inverse of the velocity-over-rigor failure mode at the business-decision level — when the vendor commits in advance to shutting down under specific conditions, the velocity pressure has a structural ceiling.",
    ],
    relatedTopics: ['velocity-over-rigor-failure', 'public-methodology-documentation', 'refund-on-failure'],
  },
];

export function getAllSpecTopicSlugs(): string[] {
  return SPEC_TOPICS.map((t) => t.slug);
}

export function getSpecTopicBySlug(slug: string): SpecTopic | undefined {
  return SPEC_TOPICS.find((t) => t.slug === slug);
}

export function getSpecTopicsByLayer(layer: SpecLayer): SpecTopic[] {
  return SPEC_TOPICS.filter((t) => t.layer === layer);
}
