# integrity-framework

The CLI for the [Integrity Framework](https://theintegrityframework.org/).

Two surfaces:

1. Run the Integrity Framework v1.0 assertion suite against any repo. Deterministic runner, no LLM, no network.
2. Browse and submit listings to the [Integrity Framework Directory](https://theintegrityframework.org/).

This package lives in the directory's repo so the CLI's listing-validation schema stays in lockstep with the directory's zod schema.

## Install

```bash
npx integrity-framework check ./your-repo
```

Or globally:

```bash
npm install -g integrity-framework
integrity check ./your-repo
```

## Usage

```bash
integrity check <repo>           # run base + per-product manifest
integrity verify <repo>          # confirm repo manifest covers base rule ids
integrity rules                  # print the v1.0 base manifest as JSON
integrity directory list         # browse listings on theintegrityframework.org
integrity directory show <slug>  # full detail for one listing
integrity directory validate <file>  # check a listing JSON against the schema
integrity directory submit <file>    # validate then surface the submission paths
integrity --version
```

## Directory subcommand

Reads `https://theintegrityframework.org/api/listings.json` for `list` and `show`. Writes nothing — `submit` validates the file locally and prints the two submission paths (GitHub PR or email to `integrity@startvest.ai`).

The validation schema mirrors the directory's zod schema in `src/lib/listings.ts` (one level up). When the schema changes, both sides are updated in the same commit.

## Provenance

Published via npm Trusted Publishing from this repo's `.github/workflows/publish-cli.yml`. Each release on npm carries a verified provenance attestation linking back to the exact commit and workflow run.

## License

Apache-2.0.
