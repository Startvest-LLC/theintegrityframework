#!/bin/sh
set -e

echo "[entrypoint] theintegrityframework starting..."

# Runtime injection of NEXT_PUBLIC_* env vars for slot-swap.
# Build-time vars are baked into JS bundles by Next.js; runtime injection
# replaces __VAR_PLACEHOLDER__ tokens in compiled JS with actual values from
# Azure App Settings, which are slot-sticky.
for var in NEXT_PUBLIC_SITE_URL; do
  placeholder="__${var}_PLACEHOLDER__"
  value=$(eval echo \$$var)
  if [ -n "$value" ]; then
    find /app/.next \( -name '*.js' -o -name '*.html' -o -name '*.rsc' -o -name '*.json' \) -exec \
      sed -i "s|${placeholder}|${value}|g" {} + 2>/dev/null || true
    echo "[entrypoint]   $var = $value"
  fi
done

# server.js is at /app/server.js for single-app standalone output
if [ -f /app/server.js ]; then
  echo "[entrypoint] starting node /app/server.js"
  exec node /app/server.js
else
  echo "[entrypoint] FATAL: /app/server.js not found"
  ls -la /app
  exit 1
fi
