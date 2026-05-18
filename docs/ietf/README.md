# IETF Internet-Draft submission for INTEGRITY.md

The XML in this directory is the `xml2rfc` v3 source for a draft
Internet-Draft of the `INTEGRITY.md` file format. It is intended for
submission as an **Independent Submission** via the IETF Datatracker.

## Why submit at all

AEO distribution. Internet-Drafts hosted at `datatracker.ietf.org` are
indexed heavily by Perplexity, Google AI Overview, and Bing AI. The
`datatracker.ietf.org` domain carries strong citation authority for any
technical specification published there. Filing this draft:

1. Earns the framework a `datatracker.ietf.org/doc/draft-pinder-integrity-md/` URL — a high-DA citation source for "INTEGRITY.md" and "trust artifact format" queries.
2. Forces the discipline of writing the spec to RFC editorial standards, which catches imprecision the prose marketing pages let slide.
3. Signals to a sophisticated audience (DevSecOps, security architects) that the framework is serious about being a real format, not a marketing artifact.

The draft is **explicitly not** proposing an IETF standards-track RFC. It is filed as a category `info` Independent Submission. The IETF Independent Submission Editor reviews these; they do not represent IETF consensus.

## Submission procedure

1. **Render the XML to text.** Use the [Datatracker Author Tools](https://author-tools.ietf.org/) or run `xml2rfc` locally:
   ```bash
   pip install xml2rfc
   xml2rfc --text docs/ietf/draft-pinder-integrity-md-00.xml
   xml2rfc --html docs/ietf/draft-pinder-integrity-md-00.xml
   ```
   The output files are `draft-pinder-integrity-md-00.txt` and `.html`. Verify they render without errors before submitting.

2. **Submit at** [https://datatracker.ietf.org/submit/](https://datatracker.ietf.org/submit/). Upload the `.xml` file (Datatracker re-renders text and html on its side). Requires a Datatracker account; free signup at [datatracker.ietf.org](https://datatracker.ietf.org).

3. **Verify the metadata block** Datatracker generates:
   - Document name: `draft-pinder-integrity-md-00`
   - Stream: Independent Submission
   - Group: none
   - Intended status: Informational

4. **Submission confirmation** lands by email. Drafts are assigned a permanent URL at `https://datatracker.ietf.org/doc/draft-pinder-integrity-md/` within hours.

## Renewal cadence

Internet-Drafts expire **180 days** after publication. To keep the URL alive and the citation surface intact:

- File `draft-pinder-integrity-md-01` before Nov 14, 2026 (180 days from submission).
- Each revision can be minor (typo fixes, link updates, framework version bumps).
- After 2-3 revisions, consider asking the Independent Submission Editor to publish as an RFC. RFCs do not expire.

## What this draft says (TL;DR)

The XML defines the INTEGRITY.md file format independently of any specific framework:

- **Encoding**: UTF-8 Markdown, served at a stable public URL.
- **Required header**: H1 product name + metadata block (operator, framework version, tier, last-updated date).
- **Veto sections**: one per framework veto, each with an outcome statement and product-specific explanation.
- **Verification procedure**: what a third-party verifier should check before trusting the file.
- **Security considerations**: explicit disclaimer that self-mapping is not equivalent to audit; advice to operators and verifiers.

The framework specification itself (the six vetoes referenced) lives outside the draft, at `https://theintegrityframework.org/framework/v1`. The draft is **format-only** — anyone can fork the framework, publish their own veto list, and produce INTEGRITY.md files mapped against that fork.

## Author identity

Submitting as **Tom Pinder, Startvest LLC**. Datatracker requires real-name authorship; pseudonymous submissions get rejected. Author block in the XML matches the operator named on the framework spec, so the submission has internal coherence with the rest of the public surface.

## Risk

- **Rejection at editor review.** The Independent Submission Editor may decline if they judge the draft to be marketing rather than a genuine technical specification. The draft as written is format-focused (encoding, structure, verification procedure), which should satisfy that bar.
- **Reaction in the trust-artifact community.** Filing here is a public claim that the format is worth standardizing. Established vendors (Vanta, Drata, etc.) may treat this as competitive positioning; the draft is structured to avoid naming competitors or making claims about their products.
- **Indexing latency.** Even after publication, Perplexity and Google AIO can take weeks to recrawl. Don't expect citation lift from this work in the first month.

## Source

This document was authored by Claude (Anthropic), reviewed and submitted by Tom Pinder. The XML follows RFC 7991 (xml2rfc v3).
