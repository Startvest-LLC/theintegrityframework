#!/usr/bin/env bash
# cf-list-rules.sh — dump every rule type for a zone.
# Usage: CF_TOKEN=... ./cf-list-rules.sh <zone-id>
set -euo pipefail

: "${CF_TOKEN:?Set CF_TOKEN.}"
ZONE="${1:?Pass zone id as first arg. Use cf-zones.sh to find it.}"

show_section() {
  local title="$1" url="$2"
  echo
  echo "=== $title ==="
  curl -s -X GET "$url" -H "Authorization: Bearer $CF_TOKEN" \
    | python3 -c "
import json, sys
try:
    d = json.load(sys.stdin)
    if not d.get('success'):
        errs = d.get('errors', [])
        print(f'  (error: {errs})')
        sys.exit(0)
    res = d.get('result')
    if isinstance(res, dict):
        rules = res.get('rules', [])
    elif isinstance(res, list):
        rules = res
    else:
        rules = []
    if not rules:
        print('  (no rules)')
    for r in rules:
        if 'targets' in r:
            print(f\"  {r.get('status','?'):8} priority={r.get('priority','?'):3} targets={r.get('targets')}\")
            print(f'    actions={r.get(\"actions\")}')
        elif 'pattern' in r:
            print(f\"  pattern={r.get('pattern','?')} script={r.get('script','?')}\")
        else:
            print(f\"  enabled={r.get('enabled')} action={r.get('action','?')} expr={(r.get('expression') or '?')[:140]}\")
            if r.get('action_parameters'):
                print(f'    params={json.dumps(r.get(\"action_parameters\"))[:200]}')
            if r.get('description'):
                print(f'    desc={r[\"description\"]}')
except Exception as e:
    print(f'  parse err: {e}')"
}

echo "Auditing zone: $ZONE"

show_section "PAGE RULES (legacy)" \
  "https://api.cloudflare.com/client/v4/zones/$ZONE/pagerules"

show_section "WORKERS ROUTES" \
  "https://api.cloudflare.com/client/v4/zones/$ZONE/workers/routes"

show_section "SINGLE REDIRECTS (http_request_dynamic_redirect)" \
  "https://api.cloudflare.com/client/v4/zones/$ZONE/rulesets/phases/http_request_dynamic_redirect/entrypoint"

show_section "ORIGIN RULES (http_request_origin)" \
  "https://api.cloudflare.com/client/v4/zones/$ZONE/rulesets/phases/http_request_origin/entrypoint"

show_section "TRANSFORM RULES (http_request_transform)" \
  "https://api.cloudflare.com/client/v4/zones/$ZONE/rulesets/phases/http_request_transform/entrypoint"

show_section "LATE TRANSFORM (http_request_late_transform)" \
  "https://api.cloudflare.com/client/v4/zones/$ZONE/rulesets/phases/http_request_late_transform/entrypoint"

echo
echo "If a section says 'error: Authentication error' your token lacks the perm."
echo "See cloudflare-cheatsheet.md §1 for the right permission set."
