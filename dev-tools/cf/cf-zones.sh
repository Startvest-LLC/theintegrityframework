#!/usr/bin/env bash
# cf-zones.sh — list all Cloudflare zones the token has access to.
# Usage: CF_TOKEN=... ./cf-zones.sh
set -euo pipefail

: "${CF_TOKEN:?Set CF_TOKEN. See cloudflare-cheatsheet.md §1.}"

curl -s "https://api.cloudflare.com/client/v4/zones?per_page=100" \
  -H "Authorization: Bearer $CF_TOKEN" \
  | python3 -c "
import json, sys
d = json.load(sys.stdin)
if not d.get('success'):
    print('ERROR:', d.get('errors'))
    sys.exit(1)
print(f\"{'NAME':40} {'ZONE_ID':36} {'STATUS':10} ACCOUNT_ID\")
for z in sorted(d.get('result', []), key=lambda r: r['name']):
    print(f\"{z['name']:40} {z['id']:36} {z['status']:10} {z['account']['id']}\")"
