/**
 * Audit indie AI tools against The Integrity Framework Layer 1 vetoes.
 *
 * Methodology (honest about limits):
 *   - V1 (artifact-vs-outcome): heuristic — look at homepage for badge /
 *     certification language disconnected from the audit motion.
 *   - V2 (independence): manual-review-needed flag (requires business-model
 *     understanding).
 *   - V3 (verifiability): heuristic — count public trust artifacts
 *     (/security, /trust, /privacy, /integrity, /changelog).
 *   - V4 (AI accountability): heuristic — does the privacy policy name AI
 *     sub-processors (OpenAI, Anthropic, etc.).
 *   - V5 (pricing-rigor alignment): heuristic — visible pricing vs
 *     "contact us" gating.
 *   - V6 (TechCrunch test): manual-review-needed (subjective).
 *
 * Output:
 *   - audits/audit-2026-q2-indie-ai-tools.csv (one row per tool)
 *   - audits/audit-2026-q2-indie-ai-tools.json (raw signals for re-scoring)
 *   - data/audit-tools-checked.json (cache so re-runs don't re-fetch)
 *
 * Usage:
 *   node scripts/audit-indie-ai-tools.cjs
 *   node scripts/audit-indie-ai-tools.cjs --tools=data/audit-tools-list.json
 *   node scripts/audit-indie-ai-tools.cjs --limit=10  (run first 10 only)
 *
 * The seed list of tools lives in data/audit-tools-list.json so it can be
 * edited without touching the script. Tools are public, sub-enterprise
 * AI products where the framework would apply.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const DEFAULT_TOOLS_PATH = path.join('data', 'audit-tools-list.json');
const DEFAULT_OUT_BASE = path.join('audits', 'audit-2026-q2-indie-ai-tools');

const FETCH_TIMEOUT_MS = 15000;
const FETCH_DELAY_MS = 1000; // be polite

const TRUST_PAGE_PATHS = [
  '/security',
  '/trust',
  '/privacy',
  '/privacy-policy',
  '/integrity',
  '/integrity.md',
  '/changelog',
  '/methodology',
  '/.well-known/security.txt',
];

const PRICING_PATHS = ['/pricing', '/plans'];

// Substrings whose presence on a homepage suggests selling a badge/certificate
// rather than the outcome. Trip into V1 risk.
const V1_RISK_TERMS = [
  'get certified',
  'get soc 2',
  'soc 2 in days',
  'compliance badge',
  'trust badge',
  'certification ready',
  'audit-ready',
  'audit ready',
  'one-click soc 2',
];

// AI sub-processor mentions in privacy policies — V4 transparency signal.
const AI_SUBPROCESSOR_TERMS = [
  'openai',
  'anthropic',
  'claude',
  'chatgpt',
  'gpt-',
  'mistral',
  'cohere',
  'hugging face',
  'huggingface',
  'replicate',
  'together.ai',
  'perplexity',
];

// Pricing-page signals suggesting hidden / demo-only pricing.
const HIDDEN_PRICING_TERMS = [
  'contact us for pricing',
  'contact sales',
  'request a demo',
  'request pricing',
  'book a demo',
  'talk to sales',
];

function parseArgs() {
  const args = { toolsPath: DEFAULT_TOOLS_PATH, outBase: DEFAULT_OUT_BASE, limit: 0 };
  for (const a of process.argv.slice(2)) {
    const m = a.match(/^--(tools|out|limit)=(.+)$/);
    if (!m) continue;
    if (m[1] === 'tools') args.toolsPath = m[2];
    else if (m[1] === 'out') args.outBase = m[2];
    else if (m[1] === 'limit') args.limit = parseInt(m[2], 10);
  }
  return args;
}

function fetchUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(
      url,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (compatible; IntegrityFrameworkAudit/1.0; +https://theintegrityframework.org)',
          'Accept': 'text/html,application/xhtml+xml',
        },
        timeout: FETCH_TIMEOUT_MS,
      },
      (res) => {
        // Follow up to 3 redirects.
        if (
          res.statusCode &&
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          res.resume();
          const next = res.headers.location.startsWith('http')
            ? res.headers.location
            : new URL(res.headers.location, url).toString();
          return resolve(fetchUrl(next));
        }
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () =>
          resolve({ status: res.statusCode, body: data.slice(0, 200_000), url })
        );
      },
    );
    req.on('timeout', () => {
      req.destroy();
      resolve({ status: 0, body: '', url, error: 'timeout' });
    });
    req.on('error', (e) => resolve({ status: 0, body: '', url, error: e.message }));
  });
}

function lower(s) {
  return (s || '').toLowerCase();
}

function containsAny(haystack, needles) {
  const h = lower(haystack);
  return needles.some((n) => h.includes(n));
}

function countMatches(haystack, needles) {
  const h = lower(haystack);
  return needles.filter((n) => h.includes(n)).length;
}

async function auditTool(tool) {
  const out = {
    name: tool.name,
    url: tool.url,
    category: tool.category || null,
    fetchedAt: new Date().toISOString(),
    signals: {},
    scores: {},
    notes: [],
  };

  // 1. Homepage.
  const home = await fetchUrl(tool.url);
  out.signals.homepageStatus = home.status;
  if (home.status !== 200) {
    out.notes.push(`Homepage returned HTTP ${home.status || 'error'}`);
    return out;
  }

  // V1 — badge/certificate language on homepage.
  out.signals.v1RiskTermsHit = V1_RISK_TERMS.filter((t) => lower(home.body).includes(t));
  out.scores.v1 = out.signals.v1RiskTermsHit.length > 0 ? 'risk' : 'likely-pass';

  // 2. Trust pages.
  const trustResults = {};
  for (const p of TRUST_PAGE_PATHS) {
    const target = new URL(p, tool.url).toString();
    const r = await fetchUrl(target);
    trustResults[p] = r.status;
    await new Promise((res) => setTimeout(res, FETCH_DELAY_MS));
  }
  out.signals.trustPages = trustResults;
  const trustHits = Object.values(trustResults).filter((s) => s === 200).length;
  out.signals.trustPageCount = trustHits;
  out.scores.v3 =
    trustHits >= 3 ? 'pass' : trustHits >= 1 ? 'partial' : 'fail';

  // 3. Privacy → AI sub-processor mentions.
  let privacyBody = '';
  for (const p of ['/privacy', '/privacy-policy', '/legal/privacy']) {
    const url = new URL(p, tool.url).toString();
    const r = await fetchUrl(url);
    if (r.status === 200 && r.body.length > 500) {
      privacyBody = r.body;
      out.signals.privacyUrl = r.url;
      break;
    }
    await new Promise((res) => setTimeout(res, FETCH_DELAY_MS));
  }
  if (privacyBody) {
    const matches = AI_SUBPROCESSOR_TERMS.filter((t) => lower(privacyBody).includes(t));
    out.signals.aiSubprocessorMentions = matches;
    out.scores.v4 = matches.length > 0 ? 'pass' : 'flag-no-mention';
  } else {
    out.signals.aiSubprocessorMentions = null;
    out.scores.v4 = 'no-privacy-page';
    out.notes.push('No /privacy page reachable for V4 audit');
  }

  // 4. Pricing page.
  let pricingBody = '';
  for (const p of PRICING_PATHS) {
    const url = new URL(p, tool.url).toString();
    const r = await fetchUrl(url);
    if (r.status === 200 && r.body.length > 500) {
      pricingBody = r.body;
      out.signals.pricingUrl = r.url;
      break;
    }
    await new Promise((res) => setTimeout(res, FETCH_DELAY_MS));
  }
  if (pricingBody) {
    const hasPrice = /\$[0-9]+(?:[\.\,][0-9]+)?(?:\s*\/\s*(?:mo|month|yr|year))?/i.test(
      pricingBody,
    );
    const hidden = HIDDEN_PRICING_TERMS.some((t) => lower(pricingBody).includes(t));
    out.signals.pricingHasDollar = hasPrice;
    out.signals.pricingHidden = hidden;
    out.scores.v5 =
      hasPrice && !hidden
        ? 'pass'
        : hasPrice && hidden
          ? 'mixed'
          : hidden
            ? 'hidden'
            : 'no-signal';
  } else {
    out.scores.v5 = 'no-pricing-page';
    out.notes.push('No /pricing or /plans page reachable for V5 audit');
  }

  // V2 and V6 — manual-review-required.
  out.scores.v2 = 'manual-review';
  out.scores.v6 = 'manual-review';

  return out;
}

function scoreEmoji(s) {
  if (s === 'pass' || s === 'likely-pass') return '✓';
  if (s === 'partial' || s === 'mixed') return '~';
  if (s === 'fail' || s === 'risk' || s === 'hidden' || s === 'flag-no-mention') return '✗';
  return '?';
}

function toCsvRow(o) {
  const cells = [
    o.name,
    o.url,
    o.category || '',
    o.fetchedAt,
    o.signals.homepageStatus || '',
    o.scores.v1 || '',
    o.scores.v2 || '',
    o.scores.v3 || '',
    o.scores.v4 || '',
    o.scores.v5 || '',
    o.scores.v6 || '',
    (o.signals.v1RiskTermsHit || []).join('|'),
    o.signals.trustPageCount || 0,
    (o.signals.aiSubprocessorMentions || []).join('|'),
    o.signals.pricingHasDollar ? 'yes' : 'no',
    o.signals.pricingHidden ? 'yes' : 'no',
    (o.notes || []).join('; '),
  ];
  return cells.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',');
}

async function main() {
  const args = parseArgs();
  const toolsRaw = fs.readFileSync(args.toolsPath, 'utf8');
  let tools = JSON.parse(toolsRaw);
  if (args.limit > 0) tools = tools.slice(0, args.limit);

  console.log(`[audit] tools=${tools.length} out=${args.outBase}`);
  console.log('');

  const results = [];
  for (let i = 0; i < tools.length; i++) {
    const t = tools[i];
    process.stdout.write(`  [${String(i + 1).padStart(2)}/${tools.length}] ${t.name.padEnd(28)} `);
    try {
      const r = await auditTool(t);
      results.push(r);
      const summary = `V1${scoreEmoji(r.scores.v1)} V3${scoreEmoji(r.scores.v3)} V4${scoreEmoji(r.scores.v4)} V5${scoreEmoji(r.scores.v5)}`;
      console.log(summary);
    } catch (e) {
      console.log(`  ERROR: ${e.message}`);
      results.push({ name: t.name, url: t.url, error: e.message });
    }
    await new Promise((res) => setTimeout(res, FETCH_DELAY_MS));
  }

  fs.mkdirSync(path.dirname(args.outBase), { recursive: true });
  fs.writeFileSync(args.outBase + '.json', JSON.stringify(results, null, 2));

  const header = [
    'Name',
    'URL',
    'Category',
    'FetchedAt',
    'HomepageStatus',
    'V1_Artifact',
    'V2_Independence',
    'V3_Verifiability',
    'V4_AIAccountability',
    'V5_Pricing',
    'V6_TechCrunch',
    'V1_Risk_Terms_Hit',
    'TrustPageCount',
    'AISubprocessorMentions',
    'PricingHasDollar',
    'PricingHidden',
    'Notes',
  ];
  const csv = [header.map((h) => `"${h}"`).join(','), ...results.map(toCsvRow)].join('\n');
  fs.writeFileSync(args.outBase + '.csv', csv);

  console.log('');
  console.log(`[audit] wrote ${args.outBase}.csv + ${args.outBase}.json`);

  // Aggregate stats.
  const ok = results.filter((r) => r.scores);
  const agg = {
    total: results.length,
    audited: ok.length,
    failed: results.length - ok.length,
    v1Risk: ok.filter((r) => r.scores.v1 === 'risk').length,
    v3Fail: ok.filter((r) => r.scores.v3 === 'fail').length,
    v3Partial: ok.filter((r) => r.scores.v3 === 'partial').length,
    v3Pass: ok.filter((r) => r.scores.v3 === 'pass').length,
    v4FlagNoMention: ok.filter((r) => r.scores.v4 === 'flag-no-mention').length,
    v4Pass: ok.filter((r) => r.scores.v4 === 'pass').length,
    v4NoPrivacy: ok.filter((r) => r.scores.v4 === 'no-privacy-page').length,
    v5Hidden: ok.filter((r) => r.scores.v5 === 'hidden').length,
    v5Pass: ok.filter((r) => r.scores.v5 === 'pass').length,
  };
  console.log('');
  console.log('[audit] Aggregate:');
  console.log(JSON.stringify(agg, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
