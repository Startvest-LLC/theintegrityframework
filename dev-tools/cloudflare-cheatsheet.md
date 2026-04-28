# Cloudflare cheatsheet

**Owner:** Tom
**Maintained at:** `theintegrityframework/dev-tools/cloudflare-cheatsheet.md`
**Why this exists:** Cloudflare's UI is genuinely bad. Five different ways to do redirects, renamed features, permissions split across sections, settings buried in unexpected menus. This doc is the muscle-memory shortcut so we stop re-learning it from scratch.

When something breaks: search this doc first. When you find a new gotcha: add it. When the UI changes a label: update it.

---

## 1. Tokens — do this once, never again

### The right way to mint a token

**Critical:** there are two pages that look like "API Tokens." Use the right one.

| Where you are | What you can do | Use? |
|---|---|---|
| **Profile → API Tokens** (`/profile/api-tokens`) | Full token creation. Account + Zone + User permissions all available. | **YES** |
| Account → API Tokens (`/<account-id>/api-tokens`) | Account-scoped tokens only. Zone permissions hidden. | NO — looks identical, doesn't have Zone perms |

If you only see "Account" permission groups in the dropdown, you're in the wrong page. Go to `https://dash.cloudflare.com/profile/api-tokens`.

### One automation token to rule them all

**Stop minting per-app tokens.** Mint ONE comprehensive automation token, indefinite TTL, store in a shared KV. Every session can read it. No more rotation hell.

#### Permissions for `startvest-automation-edit`

| Group | Permission | Access | Why |
|---|---|---|---|
| Account | Account Settings | Read | List accounts |
| Account | Workers Scripts | Read | Diagnose Worker scripts |
| Account | Account Rulesets | Edit | Bulk Redirects (account-level rulesets) |
| Zone | Zone | Read | Find zones by name |
| Zone | Zone Settings | Edit | SSL mode, security level, etc. |
| Zone | DNS | Edit | CRUD on DNS records |
| Zone | Page Rules | Edit | Legacy redirect rules |
| Zone | Workers Routes | Edit | Routes to Worker scripts |
| Zone | **Config Rules** | **Edit** | **Single Redirects + Transform Rules — see §2 redirect sprawl** |
| Zone | Cache Purge | Purge | Invalidate cached responses after deploys |

**Account Resources:** Include → All accounts you own
**Zone Resources:** Include → All zones from those accounts

If a permission name in the UI doesn't match exactly: type the noun ("DNS", "redirect", "ruleset") into the dropdown and pick what's there. Cloudflare renames things periodically.

### Where to store the token

`idealift-kv` (sub `Azure subscription 1` / `38ccdbb7-2a3e-471c-9cde-7a02a1298c40`):
```
CLOUDFLARE-API-TOKEN-STARTVEST  → token value
```

Future sessions:
```bash
CF_TOKEN=$(az keyvault secret show --vault-name idealift-kv --name CLOUDFLARE-API-TOKEN-STARTVEST --query value -o tsv)
```

### Verify a token

```bash
curl -s "https://api.cloudflare.com/client/v4/user/tokens/verify" \
  -H "Authorization: Bearer $CF_TOKEN" | python3 -m json.tool
```

Returns `{"success": true, "result": {"status": "active"}}` if valid. If you get `Authentication error`, the token doesn't have the perm for the endpoint you're hitting (NOT that the token itself is bad — Cloudflare uses the same error code for both, which is its own gotcha).

---

## 2. The redirect sprawl

Cloudflare has **six** different ways to redirect a URL. They look similar in the UI, live in different menus, get renamed periodically, and all of them can break each other.

| Method | Lives in dashboard at | API location | When to use |
|---|---|---|---|
| **Page Rules** | Rules → Page Rules (legacy) | `/zones/:id/pagerules` | Don't. Legacy. New rules go to Single Redirects. |
| **Single Redirects** | Rules → Overview → Redirect Rules | `/zones/:id/rulesets/phases/http_request_dynamic_redirect/entrypoint` | Default for one-off `/old → /new` redirects. |
| **Bulk Redirects** | Rules → Bulk Redirects | `/accounts/:id/rules/lists` (account level) + zone phase | Many `from → to` pairs (CSV upload). |
| **Workers Routes** | Workers & Pages → Workers + zone routes | `/zones/:id/workers/routes` | Custom JS logic at the edge. |
| **Origin Rules** | Rules → Overview → Origin Rules | `http_request_origin` phase | Rewrite Host header / DNS record / SNI before hitting origin. |
| **Transform Rules** | Rules → Overview → Transform Rules | `http_request_transform` / `http_request_late_transform` | Rewrite URL path or modify headers. Doesn't 301; rewrites silently. |

### Rule of thumb

- Need a 301 from `foo` to `bar`? **Single Redirects.**
- Need to redirect 50 URLs at once? **Bulk Redirects.**
- Need conditional logic (URL pattern, country, header)? **Workers Routes** or **Single Redirects** with expression.
- Anything else: don't.

### Finding existing redirects when "the UI says nothing exists"

Cloudflare's sidebar visibility is plan-dependent and feature-flag-dependent. The UI may not show "Redirect Rules" even when redirect rules exist. Always check the API.

```bash
ZONE=<zone-id>

# Single Redirects
curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE/rulesets/phases/http_request_dynamic_redirect/entrypoint" \
  -H "Authorization: Bearer $CF_TOKEN" | python3 -m json.tool

# Page Rules (legacy)
curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE/pagerules" \
  -H "Authorization: Bearer $CF_TOKEN" | python3 -m json.tool

# Workers Routes
curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE/workers/routes" \
  -H "Authorization: Bearer $CF_TOKEN" | python3 -m json.tool

# Origin Rules
curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE/rulesets/phases/http_request_origin/entrypoint" \
  -H "Authorization: Bearer $CF_TOKEN" | python3 -m json.tool

# Transform Rules (URL rewrite)
curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE/rulesets/phases/http_request_transform/entrypoint" \
  -H "Authorization: Bearer $CF_TOKEN" | python3 -m json.tool

# Bulk Redirects (account-level lists)
curl -s -X GET "https://api.cloudflare.com/client/v4/accounts/$ACCT/rules/lists" \
  -H "Authorization: Bearer $CF_TOKEN" | python3 -m json.tool
```

If the API returns `"Authentication error"`, the token lacks `Zone: Config Rules: Edit` (or the equivalent). That's the perm that gates rulesets reads. Don't be fooled by the "Authentication" naming — it usually means missing perm, not wrong token.

### Deleting a Single Redirect via API

```bash
ZONE=<zone-id>

# 1. Get the entrypoint ruleset ID + the rule IDs
curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE/rulesets/phases/http_request_dynamic_redirect/entrypoint" \
  -H "Authorization: Bearer $CF_TOKEN" | python3 -c "
import json,sys
d=json.load(sys.stdin)['result']
print('ruleset_id:', d['id'])
for r in d.get('rules',[]):
    print(' rule_id:', r['id'], 'expr:', r['expression'][:100])
"

# 2. Delete a specific rule
RULESET=<ruleset-id>
RULE=<rule-id>
curl -s -X DELETE "https://api.cloudflare.com/client/v4/zones/$ZONE/rulesets/$RULESET/rules/$RULE" \
  -H "Authorization: Bearer $CF_TOKEN"
```

---

## 3. SSL/TLS modes — what each one actually does

Set at zone level: **SSL/TLS → Overview → Encrypts traffic to your origin server**

| Mode | Browser ↔ CF | CF ↔ Origin | When |
|---|---|---|---|
| **Off** | HTTP | HTTP | Never |
| **Flexible** | HTTPS | **HTTP** | **Never. Active redirect-loop risk if origin redirects HTTP→HTTPS.** |
| **Full** | HTTPS | HTTPS (cert NOT verified) | Origin has any HTTPS cert (incl. self-signed). Acceptable for App Service. |
| **Full (strict)** | HTTPS | HTTPS (cert verified) | Origin has a publicly-trusted cert. **Default for all Startvest zones.** |

**Why Full (strict):** App Service's `*.azurewebsites.net` cert is DigiCert-issued (publicly trusted). Strict mode validates against that. If you ever switch to a self-signed origin cert, drop to Full.

**Cloudflare bug pattern:** if you set Flexible by accident and the origin redirects HTTP→HTTPS, you get an infinite redirect loop. Always start at Full (strict).

### Setting SSL mode via API

```bash
ZONE=<zone-id>
curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE/settings/ssl" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"value":"strict"}'
```

Values: `off`, `flexible`, `full`, `strict`. (Yes, "strict" is the API value for Full (strict). Don't pass "full_strict".)

### Always Use HTTPS

**SSL/TLS → Edge Certificates → Always Use HTTPS = On.** This makes Cloudflare 301 any HTTP request to HTTPS at the edge. Required for any production zone.

### Min TLS Version

**SSL/TLS → Edge Certificates → Minimum TLS Version = 1.2** (or 1.3 for stricter security; 1.2 is broadly compatible).

### Universal SSL

Free Cloudflare cert for all `*.<zone>` and `<zone>` itself. Auto-provisioned, auto-renewed. **For most zones, you do not need an Azure managed cert** — Cloudflare's edge cert handles browser TLS, and CF↔origin uses the origin's existing cert.

### When you DO need an Azure managed cert

Only if you're routing traffic **directly** to Azure (no Cloudflare proxy). Then you need:

1. CNAME with **gray cloud** (DNS only — Cloudflare proxy off).
2. `asuid.<subdomain>` TXT record with the App Service `customDomainVerificationId`.
3. `az webapp config ssl create --hostname <fqdn>` — provisions the free App Service Managed Cert.
4. Optionally re-orange the CNAME after cert is bound.

If the proxy is on (orange cloud), Azure can't see the underlying CNAME and managed cert provisioning fails with `"The current CNAME record of the custom domain is empty"`. That's the giveaway.

---

## 4. Proxy cloud (orange vs gray)

The cloud icon next to each DNS record toggles whether Cloudflare proxies the traffic.

| State | Behavior | Public DNS returns | Use |
|---|---|---|---|
| **Orange (proxied)** | Cloudflare in front | Cloudflare IPs (104.16.x.x, 104.18.x.x, etc.) | Default for production |
| **Gray (DNS only)** | Cloudflare just resolves DNS | Origin's actual IP | Cert provisioning, debugging, non-HTTP services |

### Implications of orange cloud

- Cloudflare terminates TLS at the edge.
- Cloudflare cache rules apply.
- Real client IP is in `CF-Connecting-IP` header (not `X-Forwarded-For` first hop).
- DNS lookups against the FQDN return CF IPs, NOT the underlying origin.
- WAF, rate limiting, page rules all kick in.
- **You can't see the underlying CNAME target via `dig` or `nslookup`** — Cloudflare flattens it.

### Implications of gray cloud

- Direct connection to origin.
- TLS is whatever the origin serves.
- Cloudflare features don't apply.
- DNS returns origin IPs.

### When orange cloud breaks things

- **Azure managed cert provisioning** — Azure needs to see the CNAME. Use gray cloud during provisioning, then re-orange.
- **Non-HTTP services** (SMTP, custom TCP) — proxy only handles HTTP/HTTPS/WS.
- **Cert pinning** at the client — clients pinning the origin cert will fail because they hit Cloudflare's edge cert.

---

## 5. DNS records

### Common record types

| Type | Use |
|---|---|
| A | IPv4 address |
| AAAA | IPv6 address |
| CNAME | Alias to another hostname (most common for SaaS origins) |
| TXT | Verification, SPF, DKIM |
| MX | Mail server |
| NS | Delegated nameservers (subzone) |

### TTL

When proxied (orange cloud), TTL is irrelevant — Cloudflare uses its own caching policy. When gray cloud, TTL matters. Default `Auto` is fine in 99% of cases.

### Common subdomain pattern (Startvest)

```
<service>.<zone>.<tld>            CNAME → <azure-app>.azurewebsites.net   proxied
asuid.<service>.<zone>.<tld>      TXT   → <verification-id>               not-proxied (only needed during cert provisioning)
```

### Add a DNS record via API

```bash
ZONE=<zone-id>
curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE/dns_records" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "CNAME",
    "name": "marketing",
    "content": "startvest-marketing-app.azurewebsites.net",
    "proxied": true,
    "ttl": 1
  }'
```

(`ttl: 1` = Auto. For non-proxied records, set to 300 or higher.)

### List DNS records

```bash
curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE/dns_records?per_page=200" \
  -H "Authorization: Bearer $CF_TOKEN" | python3 -c "
import json,sys
for r in json.load(sys.stdin).get('result',[]):
    print(f\"  {r['type']:6} {r['name']:50} -> {r['content']:60} proxied={r.get('proxied')}\")
"
```

---

## 6. New-domain checklist (Azure App Service origin)

Every time you stand up `<service>.<zone>` pointing at an Azure App Service:

- [ ] **App Service custom domain hostname binding:** `az webapp config hostname add --webapp-name <app> --resource-group <rg> --hostname <fqdn>`
- [ ] **Get verification ID:** `az webapp show --resource-group <rg> --name <app> --query customDomainVerificationId -o tsv`
- [ ] **Cloudflare DNS:** add `CNAME <service>` → `<app>.azurewebsites.net`, **gray cloud first** if you want a managed cert
- [ ] **Cloudflare DNS:** add `TXT asuid.<service>` → `<verification-id>` (DNS only)
- [ ] **Confirm DNS propagation:** `until curl -s "https://1.1.1.1/dns-query?name=<fqdn>&type=A" -H "Accept: application/dns-json" | grep -q '"Answer"'; do sleep 5; done`
- [ ] **Verify zone-level SSL mode = Full (strict)** — `curl -s "https://api.cloudflare.com/client/v4/zones/$ZONE/settings/ssl" -H "Authorization: Bearer $CF_TOKEN"`
- [ ] **Optional: provision Azure managed cert** if you want direct (no-proxy) cert: `az webapp config ssl create --resource-group <rg> --name <app> --hostname <fqdn>`
- [ ] **Re-orange the CNAME** if you went gray for cert
- [ ] **Smoke test:** `curl -sI https://<fqdn>/api/health` — expect `200`
- [ ] **Sanity check Server header:** if `Server: cloudflare` and you got a 301 you didn't write, see §7 debugging

---

## 7. Debugging "why is this URL doing weird things"

When a URL behaves unexpectedly, walk this list **in order**. Stop at the first match.

### Step 1: Is the redirect from origin or edge?

```bash
# Hit Cloudflare
curl -sI 'https://<fqdn>/'

# Hit origin directly with the right Host header
curl -sI -H "Host: <fqdn>" 'https://<azure-app>.azurewebsites.net/'
```

If origin returns 200 and CF returns 301, the redirect is at the edge. If both return 301, it's the origin.

### Step 2: What's the actual CNAME target?

When proxied, you can't see it via `dig`. Use the API:

```bash
curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE/dns_records?name=<fqdn>" \
  -H "Authorization: Bearer $CF_TOKEN" | python3 -m json.tool
```

If the target is the wrong hostname (typo, autocomplete fail), that's your bug.

### Step 3: Is there a redirect rule?

Run all six queries from §2 "Finding existing redirects." If any return rules matching the FQDN, you found it.

### Step 4: Is there a Workers Route?

```bash
curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE/workers/routes" \
  -H "Authorization: Bearer $CF_TOKEN"
```

Match the `pattern` field against the FQDN — patterns can have wildcards (`*.<zone>/*`).

### Step 5: Is the TLS mode Flexible?

```bash
curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE/settings/ssl" \
  -H "Authorization: Bearer $CF_TOKEN"
```

If `value: flexible` and origin redirects HTTP→HTTPS, you have a redirect loop. Set to `strict`.

### Step 6: Always Use HTTPS misconfigured?

```bash
curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE/settings/always_use_https" \
  -H "Authorization: Bearer $CF_TOKEN"
```

Should be `value: on`.

### Step 7: Cache poisoning?

```bash
# Purge everything (last resort)
curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE/purge_cache" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"purge_everything":true}'
```

Don't do this lightly — it nukes the cache for the whole zone.

---

## 8. Common operations (one-liners)

Set `CF_TOKEN`, `ZONE`, `ACCT` as env vars first.

### List zones in account

```bash
curl -s "https://api.cloudflare.com/client/v4/zones?account.id=$ACCT&per_page=100" \
  -H "Authorization: Bearer $CF_TOKEN" | python3 -c "
import json,sys
for z in json.load(sys.stdin).get('result',[]):
    print(f\"  {z['name']:40} id={z['id']} status={z['status']}\")
"
```

### Get zone settings overview

```bash
for setting in ssl always_use_https min_tls_version security_level; do
  echo "=== $setting ==="
  curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE/settings/$setting" \
    -H "Authorization: Bearer $CF_TOKEN" | python3 -c "
import json,sys
d=json.load(sys.stdin).get('result',{})
print(f\"  {d.get('id')}: {d.get('value')} (modified={d.get('modified_on')})\")"
done
```

### Update a DNS record

```bash
RECORD_ID=<from-list>
curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE/dns_records/$RECORD_ID" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"content":"<new-target>","proxied":true}'
```

### Delete a DNS record

```bash
curl -s -X DELETE "https://api.cloudflare.com/client/v4/zones/$ZONE/dns_records/$RECORD_ID" \
  -H "Authorization: Bearer $CF_TOKEN"
```

### Toggle proxy on/off for a record

```bash
curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE/dns_records/$RECORD_ID" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"proxied":false}'  # or true
```

---

## 9. Quarterly audit script

Once every 90 days, run this against every Startvest zone. Diff against last quarter. Delete dead stuff.

```bash
#!/usr/bin/env bash
# cf-audit.sh — dump everything for a zone
set -euo pipefail
CF_TOKEN="$1"
ZONE="$2"
OUT="cf-audit-$(date +%Y%m%d)-$ZONE.json"

{
  echo "{ \"audited_at\": \"$(date -Iseconds)\","
  echo "  \"zone\": \"$ZONE\","

  echo "  \"dns_records\":"
  curl -s "https://api.cloudflare.com/client/v4/zones/$ZONE/dns_records?per_page=200" \
    -H "Authorization: Bearer $CF_TOKEN"
  echo ","

  echo "  \"page_rules\":"
  curl -s "https://api.cloudflare.com/client/v4/zones/$ZONE/pagerules" \
    -H "Authorization: Bearer $CF_TOKEN"
  echo ","

  echo "  \"workers_routes\":"
  curl -s "https://api.cloudflare.com/client/v4/zones/$ZONE/workers/routes" \
    -H "Authorization: Bearer $CF_TOKEN"
  echo ","

  for phase in http_request_dynamic_redirect http_request_transform http_request_origin; do
    echo "  \"$phase\":"
    curl -s "https://api.cloudflare.com/client/v4/zones/$ZONE/rulesets/phases/$phase/entrypoint" \
      -H "Authorization: Bearer $CF_TOKEN"
    echo ","
  done

  echo "  \"settings_ssl\":"
  curl -s "https://api.cloudflare.com/client/v4/zones/$ZONE/settings/ssl" \
    -H "Authorization: Bearer $CF_TOKEN"
  echo "}"
} > "$OUT"

echo "Wrote $OUT"
```

---

## 10. Gotchas log (append as you find them)

### Account API Tokens vs Profile API Tokens (2026-04-28)

Cloudflare has two pages labeled "API Tokens." Account-scoped tokens **don't show Zone permissions in the dropdown**. Always create automation tokens at `/profile/api-tokens` (profile-scoped — has all permission groups).

### "Authentication error" doesn't always mean bad token (2026-04-28)

Cloudflare returns `{"code":10000,"message":"Authentication error"}` for both:
- Token is invalid
- Token is valid but lacks the perm for this endpoint

Use the verify endpoint to confirm token validity, then check perms separately.

### Single Redirects vs Bulk Redirects vs Page Rules (2026-04-28)

These are **three different features** with confusingly overlapping names. The newest (Single Redirects) lives in the Rulesets API under `http_request_dynamic_redirect` phase. Page Rules is the legacy version. Bulk Redirects uses account-level lists referenced from zone-level rulesets. The UI surfaces them in different menus depending on plan + feature flags. Always check the API directly when debugging.

### Cloudflare proxy hides CNAME chain (2026-04-28)

`dig CNAME <proxied-fqdn>` returns A records pointing at Cloudflare IPs, not the underlying CNAME target. To see the actual target, use the DNS records API on the zone.

### Azure managed cert needs gray cloud (2026-04-28)

App Service's `az webapp config ssl create --hostname` queries DNS to verify the CNAME points at the App Service. If the record is proxied (orange cloud), it sees Cloudflare IPs and fails with `"The current CNAME record of the custom domain is empty"`. Fix: gray cloud during cert provisioning, then re-orange.

### `asuid` TXT record format (2026-04-28)

```
Type:   TXT
Name:   asuid.<subdomain>      (e.g., asuid.marketing)
Value:  <customDomainVerificationId from az webapp show>
Proxy:  not applicable for TXT
TTL:    Auto
```

### A redirect that "doesn't exist" still exists (2026-04-28)

You may not see "Redirect Rules" in the sidebar. The rules can still exist via the API. Always check via API before declaring "no rules."

### Token can't read Rulesets without specific perm (2026-04-28)

`Zone: DNS: Edit` does NOT grant access to `/zones/:id/rulesets`. You need `Zone: Config Rules: Edit` (or equivalent — Cloudflare renames this regularly). If your token returns Authentication error on rulesets, that's the missing perm.

### Add new gotchas above this line, with date.

---

## Appendix A: Per-Startvest-zone quick reference

Updated as zones come online.

| Zone | Account ID | Zone ID | Notes |
|---|---|---|---|
| `startvest.ai` | `41a02132bf235a8778264850088777cf` | `64b0a082ba267eef277ebec0c5fdb611` | Multi-product apex. SSL = strict. |
| `idealift.app` | `41a02132bf235a8778264850088777cf` | TBD | IdeaLift product. |
| `fieldledger.us` | `41a02132bf235a8778264850088777cf` | TBD | FieldLedger product. |
| `adacompliancedocs.com` | `41a02132bf235a8778264850088777cf` | TBD | ADA compliance hub. |
| `claritylift.com` | `41a02132bf235a8778264850088777cf` | TBD | (deferred) |
| `hireposture.com` | `41a02132bf235a8778264850088777cf` | TBD | (deferred) |

To populate TBDs:
```bash
curl -s "https://api.cloudflare.com/client/v4/zones?account.id=$ACCT&per_page=100" \
  -H "Authorization: Bearer $CF_TOKEN" | python3 -c "
import json,sys
for z in json.load(sys.stdin).get('result',[]):
    print(f\"  {z['name']:40} {z['id']}\")"
```

---

## Appendix B: Helper scripts

Companion scripts live in `theintegrityframework/dev-tools/cf/`:

- `cf-list-rules.sh <zone-id>` — dump all rule types for a zone
- `cf-add-cname.sh <zone-id> <name> <target> [proxied]` — add a DNS CNAME
- `cf-set-ssl.sh <zone-id> <mode>` — set SSL mode (`off`/`flexible`/`full`/`strict`)
- `cf-zones.sh` — list all Startvest zones with IDs

Each script reads `CF_TOKEN` from env. Pull from KV first:
```bash
export CF_TOKEN=$(az keyvault secret show --vault-name idealift-kv --name CLOUDFLARE-API-TOKEN-STARTVEST --query value -o tsv)
```

---

**End of cheatsheet.** Update when Cloudflare changes labels (they will). Append to gotchas log when you find new ones.
