# cf/

Cloudflare API helper scripts. Companion to `../cloudflare-cheatsheet.md`.

## Setup

Pull the shared automation token from KV once per session:

```bash
export CF_TOKEN=$(az keyvault secret show --vault-name idealift-kv --name CLOUDFLARE-API-TOKEN-STARTVEST --query value -o tsv)
```

(If that secret doesn't exist yet, create one — see cheatsheet §1.)

## Scripts

| Script | Purpose |
|---|---|
| `cf-zones.sh` | List all zones the token can access. Use first to find a zone ID. |
| `cf-list-rules.sh <zone-id>` | Dump every rule type (page rules, single redirects, origin rules, transform rules, worker routes) for a zone. Use when debugging unexpected redirects. |
| `cf-add-cname.sh <zone-id> <name> <target> [proxied]` | Add a CNAME. Default proxied=true. Pass `false` for cert provisioning. |
| `cf-set-ssl.sh <zone-id> <mode>` | Set SSL mode: `off`, `flexible` (don't), `full`, `strict` (Full strict). |

All scripts require `CF_TOKEN` in env. They use `curl` + `python3`. No npm install, no dependencies.

## When to write a new helper

- You ran the same `curl` 3+ times this week
- You hit the same gotcha twice
- The cheatsheet has a "common operations" entry for it but no script

Don't write helpers for one-off operations. The cheatsheet's curl examples are already the helper for those.
