# INTEGRITY.md — The Integrity Framework Directory

**Product:** The Integrity Framework Directory (`theintegrityframework.org`)
**Operator:** Startvest LLC
**Framework version evaluated against:** 1.0
**Self-evaluation tier:** Bronze
**Last updated:** 2026-04-25

The directory is itself a product, evaluated against the framework it publishes. The framework requires this; eating the dog food is part of the credibility story.

---

## Layer 1 vetoes — self-mapping

### Veto 1 — Artifact versus outcome

**Pass.** The directory does not sell certification artifacts. Listings and tier badges are free. The outcome is making framework conformance legible to buyers in a segment where SOC 2 does not apply. The badge is descriptive of conformance at the most recent scan date, not a guarantee of overall product quality. The footer disclaimer states this explicitly.

### Veto 2 — Independence

**Pass with disclosed conflict.** Startvest LLC operates the directory and is also a listee for its four products (ClarityLift, FieldLedger, adacompliancedocs, IdeaLift). This is a real conflict of interest, named directly:

- Each Startvest listing carries an asterisk and footnote on the listing page disclosing the operator relationship.
- Startvest products are evaluated under the same rubric and re-scanned by the same process as community listings. No private criteria.
- Per-product external-evaluator engagement is the long-term independence path; the COI footnote will update once an external review is funded and findings are published. No public target date is committed in directory copy until one is genuinely funded.

### Veto 3 — Verifiability

**Pass.** Listings are mechanically verifiable:

- Bronze: a public INTEGRITY.md URL with all six Layer 1 vetoes mapped. Verified by reading the URL.
- Silver: either `integrity-cli` green against the public repo (machine-checkable), or a public methodology page with `Version` + `Changelog` headings (URL-checkable). The directory does not accept private claims; every credential lives at a public URL.

### Veto 4 — AI accountability

**Pass.** Listing reviews are performed by a human reviewer (currently Tom Pinder, Startvest LLC). No AI-generated review decisions, no AI-generated listing copy presented as authoritative content. If review automation is added later (e.g., re-scan automation for `integrity-cli` outputs), the human still owns the approve/reject decision. The directory will document any AI-assisted step with the same "AI output review gate" pattern Layer 2 of the framework requires.

### Veto 5 — Pricing-rigor alignment

**Pass.** The directory is free to listees and free to readers. No paid tier, no priority queue, no badge-purchase. There is no pricing model that creates financial pressure to lower review rigor. If a commercial layer is ever added (out of scope for v1), this veto must be re-evaluated.

### Veto 6 — The TechCrunch test

**Pass with named risk.** The most likely critical headline 18 months out is: *"Framework operator lists its own products at the top tier — outside review finds conflict of interest."* Defense:

- Startvest's COI is disclosed inline with each Startvest listing, not buried in a footer.
- All Startvest listings are evaluated against the same publicly named gates as community listings; the methodology page documents this verbatim.
- Per-product external-evaluator engagement is the long-term path to neutralizing the COI and is named as such, not as a finished commitment.
- Delisting and downgrade history is preserved publicly. A directory that quietly removes failed listings would fail this veto; this one does not.

A weaker but real risk: *"Framework promotes its creator's products."* Defense is the same — the directory's tier gates are public and applied uniformly. The framework would still serve its purpose with zero Startvest listings; Startvest listings exist because the framework requires its author to demonstrate conformance.

---

## Layer 2 architectural constraints — applicable subset

The framework's Layer 2 constraints assume a compliance-product shape (evidence chains, AI review gates, etc.). Most do not apply to a static directory. Those that do:

- **Failure transparency.** Re-scan failures publish a public note. Delistings carry a public reason. The directory does not silently remove listings.
- **Independent verification hooks.** All listing artifacts (INTEGRITY.md URLs, integrity-cli outputs, methodology pages) are public; an external auditor can re-run the same checks the directory ran.
- **Customer self-attestation isolation.** Founder-submitted data (description, category, contact) is visually and structurally distinct from directory-verified data (tier, last re-scanned date). The listing schema separates the two.

Constraints not applicable: evidence chain integrity, AI output review gates, reproducibility (no audit conclusions), evidence retention independence (no compliance claims to retain).

---

## Layer 3 operational guardrails — applicable subset

- **Public methodology documentation.** `/methodology` documents tier gates, verification process, re-scan cadence, delisting policy, and COI handling. Carries Version + Changelog headings per `HIGH-SV-METHODOLOGY-VERSIONED`.
- **Public kill criteria.** Documented at `/methodology#kill-criteria`. The directory shuts down if (a) framework adoption stalls indefinitely with no community submissions for 18 months, (b) a structural conflict emerges that the disclosure footnote cannot honestly cover, or (c) the framework itself is deprecated without a successor.
- **Right of reply.** Founders may publish a verbatim response to any delisting note or downgrade. One founder response, one directory response, both stand.

Not applicable: refund-on-failure (free directory), annual independent audit (the directory is itself the audit; external evaluator engagements are scoped per-product, not for the directory operator), customer-side compliance owner (no customer relationship).

---

## Tier credential — Bronze

The directory self-rates as Bronze at v1 launch. Silver requires either:
- `integrity-cli` green against the directory's public repo, or
- A public methodology page with versioned Version + Changelog.

The methodology page exists at `/methodology` with the required headings, which would qualify the directory for Silver. Self-rating remains at Bronze until the methodology page is reviewed by someone other than the directory operator. A self-issued Silver from the operator would defeat the disclosure-asterisk pattern in Veto 2.

---

## Version

0.1 — 2026-04-25 — Initial self-mapping at scaffold time. Pre-launch.

## Changelog

### 0.1 — 2026-04-25
- Initial INTEGRITY.md created alongside the v0.1 site scaffold.
- Self-rated Bronze pending external methodology review.
- COI handling for operator-as-listee documented under Veto 2.
