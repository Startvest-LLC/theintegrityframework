# @integrityframework/cli

The CLI for [The Integrity Framework](https://theintegrityframework.org/).

Two surfaces:

1. Run the Integrity Framework v1.0 assertion suite against any repo. Deterministic runner, no LLM, no network during checks.
2. Browse and submit listings to the [Integrity Framework Directory](https://theintegrityframework.org/).

Pure ESM JavaScript, zero runtime dependencies. Requires Node 20+.

## Install

```bash
npm install -g @integrityframework/cli
```

Or use without install:

```bash
npx @integrityframework/cli check .
```

## Usage

```bash
integrity check <repo>           # run base + per-product manifest
integrity verify <repo>          # confirm repo manifest covers base rule ids
integrity rules                  # print the v1.0 base manifest as JSON
integrity directory list         # browse listings on theintegrityframework.org
integrity directory show <slug>  # full detail for one listing
integrity directory validate <file>  # check a listing JSON against the schema
integrity directory submit <file>    # validate then surface submission paths
integrity --version
```

## What the runner checks

The base manifest (`manifests/base-v1.json`) ships universal Layer-2 assertions from [Integrity Framework v1.0](https://theintegrityframework.org/framework/v1):

- `HIGH-SV-INTEGRITY-MD` — INTEGRITY.md exists at repo root
- `CRIT-SV-NO-SILENT-PASS` — verification failures must not silently default to a positive state
- `HIGH-SV-METHODOLOGY-VERSIONED` — public methodology pages must carry Version + Changelog
- `HIGH-SV-EVIDENCE-RETENTION` — customer offboarding must not delete audit/evidence/consent records
- `CRIT-SV-NO-PRE-POPULATED-ATTESTATION` — attestation outputs must reference customer-submitted markers (the Delve-lesson rule)
- `INFO-SV-TRUST-PRINCIPLES-LINK` — public marketing should link to trust principles

Per-product manifests at `audits/rules/*.json` extend this set with product-specific checks. Rule IDs are stable: a product can re-use a base id to specialize a check (e.g. tighten the globs) while preserving framework lineage.

## Directory subcommand

Reads `https://theintegrityframework.org/api/listings.json` for `list` and `show`. Writes nothing — `submit` validates the file locally and prints submission paths (GitHub PR or email to `integrity@startvest.ai`).

The validation schema mirrors the directory's zod schema in the directory site's source. When the schema changes, both sides ship in the same release. That's why this CLI lives in the directory's repo.

## Source

The CLI lives in the [Integrity Framework Directory repo](https://github.com/Startvest-LLC/theintegrityframework/tree/master/cli). The directory and the CLI are co-located so the listing schema and the validator stay in sync.

## License

Apache-2.0.
