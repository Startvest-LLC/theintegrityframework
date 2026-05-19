# integrity.md Check — GitHub Action

A composite GitHub Action that validates an `integrity.md` against the
[TIF (The Integrity Framework)](https://theintegrityframework.org) base
manifest and any per-product audit rules in `audits/rules/*.json`.

Wraps [`@startvest/integrity-cli`](https://www.npmjs.com/package/@startvest/integrity-cli).

## Status

**Scaffold — not yet published.** This directory is a staging area inside the
TIF website repo. Before publishing to the GitHub Marketplace, move the
contents of this directory to a new dedicated repository (e.g.
`Startvest-LLC/integrity-md-action`) and tag a release.

## Usage

```yaml
name: integrity
on: [pull_request, push]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: Startvest-LLC/integrity-md-action@v1
        with:
          path: .
          strict: 'false'
```

### Inputs

| Name | Default | Description |
| --- | --- | --- |
| `path` | `.` | Repo root containing `integrity.md` (and optional `audits/rules/*.json`). |
| `cli-version` | `1.3.0` | Version of `@startvest/integrity-cli` to run. Pin in CI. |
| `strict` | `false` | Fail on HIGH findings (CLI exit 2), not just CRITICAL. |
| `node-version` | `20` | Node version to install. CLI requires >= 20. |

### Outputs

| Name | Description |
| --- | --- |
| `exit-code` | Raw CLI exit code. 0=pass, 1=CRITICAL, 2=HIGH (strict), 3=usage. |
| `critical-count` | Number of CRITICAL findings. |
| `high-count` | Number of HIGH findings. |
| `medium-count` | Number of MEDIUM findings. |
| `low-count` | Number of LOW findings. |
| `base-version` | Version of the TIF base manifest the CLI ran against. |
| `results-path` | Filesystem path to the full JSON results file. |

### Example — upload results as an artifact

```yaml
- uses: Startvest-LLC/integrity-md-action@v1
  id: integrity
- uses: actions/upload-artifact@v4
  if: always()
  with:
    name: integrity-results
    path: ${{ steps.integrity.outputs.results-path }}
```

## Badge

The Action emits a [shields.io endpoint JSON](https://shields.io/endpoint)
payload describing the repo's current tier. Two ways to consume it:

### Option A — auto-updating badge committed by CI

Have the Action write the JSON into a known path in your repo on each run.
The badge URL points at that file via raw.githubusercontent.com, so it
refreshes whenever CI runs and pushes.

```yaml
jobs:
  integrity:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v4
      - uses: Startvest-LLC/integrity-md-action@v1
        with:
          badge-output: .github/integrity-badge.json
      - name: Commit badge if changed
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git add .github/integrity-badge.json
          git diff --cached --quiet || git commit -m "chore: update integrity badge"
          git push
```

Then embed the badge in your README:

```markdown
![integrity.md](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/OWNER/REPO/main/.github/integrity-badge.json)
```

### Option B — one-shot value via outputs

If you don't want a committed JSON file, consume the `tier` and
`badge-json` outputs directly in downstream steps (e.g. post to Slack,
write to a PR comment, etc.).

```yaml
- uses: Startvest-LLC/integrity-md-action@v1
  id: integrity
- run: |
    echo "Tier: ${{ steps.integrity.outputs.tier }}"
    echo "Shields JSON: ${{ steps.integrity.outputs.badge-json }}"
```

### Tier mapping

| `tier` output | Condition | Badge text |
| --- | --- | --- |
| `bronze` | No CRITICAL or HIGH findings | `Bronze` |
| `bronze-warn` | HIGH findings but no CRITICAL | `Bronze (warnings)` |
| `fail` | One or more CRITICAL findings | `needs work` |

Silver-tier promotion is not computed by the Action — it lives in the
[TIF directory](https://theintegrityframework.org/listings) workflow.

## Publishing checklist

When moving this to its own repo for Marketplace publication:

1. `mv dev-tools/gh-action-scaffold/* ../integrity-md-action/`
2. Init the new repo, commit `action.yml` + `README.md` + `LICENSE`.
3. Add a self-test workflow that runs the Action against a known-good
   `integrity.md` fixture.
4. Tag `v1.0.0` and a moving `v1` tag.
5. Submit to the Marketplace from the release page.
6. Update the canonical URL on
   `src/app/framework/v1/page.tsx` and the audit-log page to point at the
   new repo.

## Versioning

The Action follows semver. Breaking changes to inputs/outputs bump the
major. The `cli-version` input lets consumers pin the underlying CLI
independently of the Action.
