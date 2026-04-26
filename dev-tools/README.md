# dev-tools

Operator scripts for cross-repo maintenance. Not bundled into the directory's deploy image (excluded via `.dockerignore`).

## Codex backlog management

Three scripts that work together:

| Script | Purpose |
|---|---|
| `codex-inventory.mjs` | Fetch all Codex review threads across configured repos and produce a markdown punch list grouped by PR. |
| `codex-reconcile.mjs <repo\|all>` | For each unresolved thread, fetch the file at `path:line` on default branch and categorize: `GONE` / `LIKELY-FIXED` / `STANDING` / `AMBIGUOUS`. Writes per-repo report + JSON of thread IDs ready to bulk-resolve. |
| `codex-resolve.mjs <ids.json>` | Bulk-resolve a list of thread IDs via GraphQL `resolveReviewThread`. Idempotent. |

### Typical flow

```bash
# 1. See current backlog across all repos
node dev-tools/codex-inventory.mjs

# 2. Reconcile one repo (or 'all')
node dev-tools/codex-reconcile.mjs claritylift

# 3. Bulk-resolve the auto-resolve candidates (GONE + LIKELY-FIXED)
node dev-tools/codex-resolve.mjs E:/Temp/codex-reconcile/claritylift-auto-resolve.json

# 4. Read E:/Temp/codex-reconcile/<repo>.md and triage the STANDING list manually
```

### Configuration

Repos are hardcoded in each script — edit `REPOS` if the set changes. Owner is `Startvest-LLC`. Bot login matched is `chatgpt-codex-connector[bot]`.

### Day-to-day

The maintenance program runs in each product repo's `.github/workflows/codex-maintenance.yml`:

- **Per-PR sticky comment** posts/updates a single comment on every PR listing unresolved Codex threads.
- **Weekly digest** opens/updates a single `[codex-backlog]` issue summarizing the pool.

Re-run these scripts only when (a) the count creeps up despite the workflows, or (b) a one-off mass cleanup is needed.
