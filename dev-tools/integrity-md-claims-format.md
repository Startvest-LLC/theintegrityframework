# INTEGRITY.md `Recent Changes` claim format

How to write `Recent Changes` entries that pass `HIGH-SV-INTEGRITY-MD-CLAIMS-VERIFIABLE` (base manifest v1.5.0).

This rule exists because of the ClarityLift 2026-04-28 audit. Two `Recent Changes` entries (dated 2026-04-25) claimed code changes that were never shipped. The framework prohibits silent-pass at the code layer (`CRIT-SV-NO-SILENT-PASS`); this rule applies the same discipline to the documentation layer.

## Two ways an entry passes

### Way 1: structural reference (default)

Every dated entry must contain at least one of:

- A file path: `src/...`, `audits/...`, `docs/...`, `lib/...`, `services/...`, `sql/...`, `app/...`, `dev-tools/...`, `infra/...`, `scripts/...`, `public/...`, `content/...`, `test/...`, `tests/...`
- A commit hash: 7-40 hex characters (e.g. `8d1aaf0`)
- An issue or PR reference: `#42`, `#107`, `PR #119`, `issue #5`
- A version tag: `v1.4.0`, `v2.0`, `v1.0`
- A file name in a code span: `` `Footer.tsx` ``, `` `entity-schemas.ts` ``
- A markdown link: `[label](url)`

The reference doesn't have to be the first thing in the entry. It just has to be there.

**Good (structural ref present):**

```markdown
- **2026-04-25** — `METHODOLOGY_VERSION` wired into write paths: `src/app/api/reports/rate-letters/route.ts` and `src/app/api/davis-bacon/payrolls/route.ts`.
```

**Bad (no structural ref, vibes only):**

```markdown
- **2026-04-25** — Tightened up the rate letter pipeline.
```

### Way 2: runnable assertion (required for high-value claims)

When the entry contains a high-value claim phrasing, a structural reference alone is not enough. The framework experience says these phrasings drift the most. Add a sidecar assertion at `audits/integrity-claims.json` and the runner verifies the claim against code reality on every audit.

High-value patterns (case-insensitive):

- `link added` / `link present` / `link surfaced` / `link included` / `link placed` / `linked to` / `linked from` / `points to`
- `surfaced in` (e.g. "X surfaced in Footer")
- `marker added` / `marker present` / `marker recorded` / `marker attached`
- `column added` / `column shipped` / `column present`
- `.auditignore exempts` / `exempts X from Y` / `exemption added` / `exemption present`
- `Trust Principles` (any reference)

If your entry contains one of these phrasings, you must add a corresponding entry in `audits/integrity-claims.json`.

## Sidecar format

`audits/integrity-claims.json`:

```json
{
  "$schema": "https://startvest.ai/integrity-claims.schema.json",
  "version": "1.0",
  "description": "Runnable assertions for INTEGRITY.md Recent Changes claims. See https://github.com/Startvest-LLC/theintegrityframework/blob/master/dev-tools/integrity-md-claims-format.md",
  "claims": [
    {
      "date": "2026-04-25",
      "summary": "Trust Principles link added to /privacy and integrity@startvest.ai surfaced in marketing footer",
      "assertion": {
        "kind": "file-contains",
        "path": "src/app/components/Footer.tsx",
        "pattern": "trust-principles|startvest\\.ai/trust"
      }
    },
    {
      "date": "2026-04-25",
      "summary": ".auditignore exempts the methodology page from CRIT-C-SLACK-DM-SCOPE",
      "assertion": {
        "kind": "file-contains",
        "path": ".auditignore",
        "pattern": "CRIT-C-SLACK-DM-SCOPE\\s+src/app/methodology"
      }
    }
  ]
}
```

The runner matches sidecar entries to `Recent Changes` entries by `date`. Multiple sidecar entries can share a date (e.g., one entry making two claims gets two assertions). If a high-value claim has no matching sidecar entry, the rule fails with the entry's date and the matched high-value pattern.

## Assertion kinds

| Kind | Behavior |
|---|---|
| `file-contains` | Pass if the file at `path` exists and matches `pattern` (regex). Fail otherwise. |
| `file-not-contains` | Pass if the file at `path` does not match `pattern` (or doesn't exist). |
| `file-exists` | Pass if `path` exists. Fail otherwise. |

Add new assertion kinds by editing `runClaimAssertion` in `startvest-integrity-cli/src/runner.mjs` and bumping the base manifest minor version.

## Retracting a claim (strikethrough)

When an audit surfaces drift — a `Recent Changes` claim that doesn't match code reality — wrap the false claim in `~~...~~` and add a `**CORRECTED <date>:** ...` note explaining what's actually true. The rule strips strikethrough text before evaluating, so retracted claims don't re-fail. The honest correction history stays visible to readers.

**Example (from ClarityLift's 2026-04-28 correction):**

```markdown
- ~~**2026-04-25** — Trust Principles link added to `/privacy` and `integrity@startvest.ai` surfaced in marketing footer.~~ **CORRECTED 2026-04-28: this change was not shipped to code. Open ticket #425 to actually ship the change.**
```

The strikethrough portion is retracted. The correction note still needs a structural reference (here, `#425`).

## Outstanding Risks / Known Gaps section (v1.7.0+)

The rule also scans `## Outstanding Risks / Known Gaps` with a different policy: **claim-absence**. Each entry that asserts something is missing/not-implemented/not-in-place must reference a file path or marker that the rule can verify is genuinely absent.

Two ways an absence-claim entry passes:

### Way A: runnable absence assertion (preferred)

Add a sidecar entry with `file-not-contains` or `file-not-exists` assertion. The rule runs the assertion. If the file/marker is genuinely absent (assertion passes), the claim is verified true. If the file/marker IS present (assertion fails), **reverse drift detected** — the claim doesn't match code reality.

```json
{
  "section": "Outstanding Risks / Known Gaps",
  "claim": "No public link from product marketing → Startvest Trust Principles",
  "assertion": {
    "kind": "file-not-contains",
    "path": "apps/web/src/app/privacy/page.tsx",
    "pattern": "trust-principles|startvest\\.ai/trust"
  }
}
```

### Way B: structural reference (fallback)

If the gap can't be runnably verified (e.g. a mailbox not yet provisioned, an external engagement not yet signed), include a structural reference — most commonly a `#N` ticket reference — so a reader can check status by hand.

```markdown
- **`integrity@startvest.ai` not yet operational.** Tracked at #2557.
```

The `#2557` satisfies the rule's structural-reference requirement.

### Detected absence patterns

The rule fires when an entry contains any of:

- `No <noun>` — "No public link", "No formal review gate", "No DCAA auditor_readonly role"
- `missing` — "MSA refund-on-failure clause missing"
- `not implemented` / `not in place` / `not yet operational` / `not yet shipped` / `not yet provisioned` / `not enforced`
- `is not` / `is absent` / `are not` / `are absent`
- `clause missing` / `not in current/standard MSA`
- `deferred pending` (e.g. annual audit deferred pending funding)
- `needs update` / `needs to be`

Entries that don't match any absence pattern fall through to a lighter structural-lint requirement: just a file path / commit / ticket so a reader can verify the entry is real (not vague TODO content).

## When the rule passes vacuously

- `INTEGRITY.md` doesn't exist (covered separately by `HIGH-SV-INTEGRITY-MD`).
- `INTEGRITY.md` exists but has no `## Recent Changes` section.
- `## Recent Changes` exists but has no dated entries (`- **YYYY-MM-DD**` bullets).

Vacuous-pass is reported transparently in the human and JSON output, so a reader can tell why the rule didn't engage.

## Process implication

The next quarterly portfolio audit re-runs this rule against every product's `INTEGRITY.md`. New `Recent Changes` entries that haven't been verified by an assertion will fail until either:

1. The author adds a structural reference (Way 1), or
2. The author adds a sidecar assertion that passes (Way 2 — for high-value claims), or
3. The claim is retracted via strikethrough with a CORRECTED note.

This is the framework's honesty discipline applied recursively to its own documentation. INTEGRITY.md can no longer drift silently. Drift becomes a CI failure.
