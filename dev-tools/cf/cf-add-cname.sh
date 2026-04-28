#!/usr/bin/env bash
# cf-add-cname.sh — add a CNAME DNS record to a zone.
# Usage: CF_TOKEN=... ./cf-add-cname.sh <zone-id> <name> <target> [proxied(true|false)]
#   name is the subdomain only (e.g., "marketing"), NOT the FQDN.
set -euo pipefail

: "${CF_TOKEN:?Set CF_TOKEN.}"
ZONE="${1:?Pass zone id as first arg.}"
NAME="${2:?Pass record name (subdomain) as second arg.}"
TARGET="${3:?Pass target hostname as third arg.}"
PROXIED="${4:-true}"

curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE/dns_records" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"type\":\"CNAME\",\"name\":\"$NAME\",\"content\":\"$TARGET\",\"proxied\":$PROXIED,\"ttl\":1}" \
  | python3 -c "
import json, sys
d = json.load(sys.stdin)
if d.get('success'):
    r = d['result']
    print(f\"OK: {r['name']} CNAME -> {r['content']} (proxied={r['proxied']}, id={r['id']})\")
else:
    print('ERROR:', d.get('errors'))
    sys.exit(1)"
