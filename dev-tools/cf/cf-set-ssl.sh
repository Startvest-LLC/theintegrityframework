#!/usr/bin/env bash
# cf-set-ssl.sh — set zone SSL/TLS mode.
# Usage: CF_TOKEN=... ./cf-set-ssl.sh <zone-id> <mode>
#   modes: off | flexible | full | strict     (strict = "Full (strict)" in UI)
set -euo pipefail

: "${CF_TOKEN:?Set CF_TOKEN.}"
ZONE="${1:?Pass zone id as first arg.}"
MODE="${2:?Pass mode: off | flexible | full | strict}"

case "$MODE" in
  off|flexible|full|strict) ;;
  *) echo "Invalid mode: $MODE. Must be one of: off, flexible, full, strict"; exit 1 ;;
esac

if [ "$MODE" = "flexible" ]; then
  echo "WARNING: flexible mode is dangerous. CF→origin is HTTP. If origin redirects HTTP→HTTPS you get a redirect loop."
  echo "See cloudflare-cheatsheet.md §3."
fi

curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE/settings/ssl" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"value\":\"$MODE\"}" \
  | python3 -c "
import json, sys
d = json.load(sys.stdin)
if d.get('success'):
    r = d['result']
    print(f\"OK: SSL mode = {r['value']} (modified_on={r.get('modified_on')})\")
else:
    print('ERROR:', d.get('errors'))
    sys.exit(1)"
