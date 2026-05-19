#!/usr/bin/env node
//
// prospect-listings.mjs
//
// Find directory-listing candidates for direct outreach by hitting public
// APIs that pre-filter for "founder who already publishes trust artifacts."
//
// Sources (all public / sanctioned):
//   - GitHub code search via `gh api search/code` (auth via gh CLI)
//       Files: INTEGRITY.md, TRUST.md, RESPONSIBLE-AI.md, AI-POLICY.md
//   - HN Algolia API (no auth) for recent "Show HN" / "Launch HN" launches
//   - Domain probe (HEAD) of /integrity, /trust, /security, /methodology
//     /ai-policy on each candidate's homepage
//
// Output:
//   E:/Temp/integrity-prospects/report.md    (ranked, human-triagable)
//   E:/Temp/integrity-prospects/report.json  (structured, for follow-up)
//
// Tiering:
//   T1 — Already publishes a trust file (INTEGRITY.md / TRUST.md / etc.).
//        Half a day from Bronze. Highest-conversion outreach target.
//   T2 — Has /trust or /methodology or /security page on their site.
//        Cares about credibility; the framework is one more step in the
//        same direction.
//   T3 — Recent AI-product launch from HN, no trust artifacts found.
//        Segment fit but cold.
//
// Usage:
//   node dev-tools/prospect-listings.mjs
//
// Requires: `gh auth status` healthy. Skips GitHub stage if not.

import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';

const OUT_DIR = 'E:/Temp/integrity-prospects';
const STARTVEST_REPOS = new Set([
  'Startvest-LLC/theintegrityframework',
  'Startvest-LLC/claritylift',
  'Startvest-LLC/FieldLedger',
  'Startvest-LLC/adacompliancedocs',
  'Startvest-LLC/idealift',
  'tjpinder/claritylift',
  'tjpinder/FieldLedger',
  'tjpinder/adacompliancedocs',
  'tjpinder/IdeaLogger',
]);

// Only files with high signal-to-noise. Dropped AI-POLICY.md (mostly "this
// repo rejects AI-generated PRs", not a product trust signal) and
// RESPONSIBLE-AI.md (mostly Microsoft / training material).
const GH_FILES = ['INTEGRITY.md', 'TRUST.md'];

// Repo-level noise filter for T1. A repo with one of these substrings in
// name or description is almost never a product seeking buyer trust signal.
const REPO_NOISE_SUBSTRINGS = [
  'docs', 'documentation', 'learning', 'training', 'awesome',
  'tutorial', 'course', 'exam', 'prep', 'book', 'blog',
  'wiki', 'srd', 'cookbook', 'cheatsheet', 'roadmap', 'curriculum',
  'sample', 'samples', 'examples', 'demo', 'playground',
  'translation', 'pathfinder', 'bible', 'haiku',
  'azure-docs', 'microsoft-docs', 'microsoftdocs',
  'blockchain', 'cryptocurrency', 'crypto-', 'bitcoin', 'ethereum',
  'protocol', 'decentralized', 'ledger',
  'university', 'academic', 'escience', 'github pages',
  'mirror', 'fork of', 'archived',
  'dictionary', 'vocabulary', 'words', 'language',
  'show notes', 'podcast',
];

// Aggregator / repository hosts that look SPA-like to the probe. Exclude as
// homepage values — they generate false trust-page hits.
const HOMEPAGE_EXCLUDED_HOSTS = new Set([
  'github.com', 'www.github.com',
  'gitlab.com', 'www.gitlab.com',
  'news.ycombinator.com',
  'old.reddit.com', 'reddit.com', 'www.reddit.com',
  'medium.com',
  'docs.google.com',
  'youtube.com', 'www.youtube.com',
  'walmart.com', 'www.walmart.com',
  'vercel.app',
]);

function homepageHost(url) {
  try { return new URL(url).host.toLowerCase(); } catch { return null; }
}

function isExcludedHomepage(url) {
  const host = homepageHost(url);
  if (!host) return true;
  if (HOMEPAGE_EXCLUDED_HOSTS.has(host)) return true;
  // Anything ending in github.io / vercel.app is almost always a project
  // landing page rather than a product site. Allow if subdomain explicitly
  // looks productish — for now, exclude conservatively.
  if (host.endsWith('.vercel.app')) return true;
  return false;
}
const PROBE_PATHS = ['/integrity', '/trust', '/security', '/methodology', '/ai-policy'];

// HN searches — each becomes a separate Algolia call.
// Looking for AI-tool launches from the last 9 months.
const HN_QUERIES = [
  'Show HN AI',
  'Show HN AI tool',
  'Launch HN AI',
  'Show HN compliance',
  'Show HN trust',
];
const HN_SINCE_DAYS = 270;

function ghApi(path) {
  // gh api with per-page=100 already; caller passes a fully-formed path.
  // execFileSync throws on non-zero exit; we let it propagate so the script
  // dies fast on auth failures rather than silently producing empty results.
  const out = execFileSync('gh', ['api', path, '-H', 'Accept: application/vnd.github+json'], {
    encoding: 'utf8',
    maxBuffer: 50 * 1024 * 1024,
  });
  return JSON.parse(out);
}

function ghSearchCodeByFilename(filename) {
  // Code search API: filename qualifier matches files by exact name.
  // Max 100 per page; we only take the first 100 to stay within rate limits.
  const q = `filename:${filename}`;
  try {
    const data = ghApi(`/search/code?q=${encodeURIComponent(q)}&per_page=100`);
    const items = data?.items ?? [];
    return items.map((it) => ({
      filename,
      repo: it.repository?.full_name,
      repoUrl: it.repository?.html_url,
      repoDescription: it.repository?.description ?? '',
      fileUrl: it.html_url,
      pushedAt: it.repository?.pushed_at,
      stars: it.repository?.stargazers_count ?? 0,
    }));
  } catch (err) {
    console.error(`[gh] search filename=${filename} failed: ${err.message.slice(0, 200)}`);
    return [];
  }
}

function ghRepo(fullName) {
  try {
    return ghApi(`/repos/${fullName}`);
  } catch {
    return null;
  }
}

async function hnAlgolia(query) {
  const sinceTs = Math.floor(Date.now() / 1000) - HN_SINCE_DAYS * 86400;
  const url =
    `https://hn.algolia.com/api/v1/search?` +
    `query=${encodeURIComponent(query)}` +
    `&tags=story` +
    `&hitsPerPage=50` +
    `&numericFilters=created_at_i>${sinceTs}`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'integrity-prospector/0.1' } });
    if (!res.ok) {
      console.error(`[hn] ${query}: HTTP ${res.status}`);
      return [];
    }
    const data = await res.json();
    return (data.hits ?? [])
      .filter((h) => h.url && h.title)
      .map((h) => ({
        title: h.title,
        url: h.url,
        author: h.author,
        points: h.points ?? 0,
        comments: h.num_comments ?? 0,
        createdAt: h.created_at,
        objectID: h.objectID,
        hnUrl: `https://news.ycombinator.com/item?id=${h.objectID}`,
        query,
      }));
  } catch (err) {
    console.error(`[hn] ${query} threw: ${err.message}`);
    return [];
  }
}

function originOf(urlString) {
  try {
    const u = new URL(urlString);
    return `${u.protocol}//${u.host}`;
  } catch {
    return null;
  }
}

async function probeContent(url, timeoutMs = 8000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: ctrl.signal,
      headers: {
        'User-Agent': 'integrity-prospector/0.1 (outreach research)',
        Accept: 'text/html,application/xhtml+xml',
      },
    });
    if (!res.ok) return { ok: false, status: res.status, length: 0 };
    const text = await res.text();
    return { ok: true, status: res.status, length: text.length, finalUrl: res.url };
  } catch (err) {
    return { ok: false, status: 0, length: 0, error: err.name === 'AbortError' ? 'timeout' : err.message };
  } finally {
    clearTimeout(t);
  }
}

// Probe with SPA-fallback detection. Many marketing SaaS sites are SPAs that
// return 200 + the full app shell for any path; without filtering, they look
// like they have every trust page on earth. We detect SPAs by probing a
// random nonsense path: if the site returns 200 with a body length close to
// the homepage, it's an SPA and we drop it.
async function probeDomain(homepageUrl) {
  const origin = originOf(homepageUrl);
  if (!origin) return { origin: null, hits: [], reachable: false };

  const root = await probeContent(origin);
  if (!root.ok) {
    return { origin, hits: [], reachable: false, error: root.error };
  }

  const junkPath = '/__nope_' + Math.random().toString(36).slice(2, 10) + '__';
  const junk = await probeContent(`${origin}${junkPath}`);
  // SPA signature: junk path returns 200, and length within 5% of root length.
  const isSpa =
    junk.ok &&
    Math.abs(junk.length - root.length) / Math.max(root.length, 1) < 0.05;

  if (isSpa) {
    return { origin, hits: [], reachable: true, isSpa: true };
  }

  const hits = [];
  for (const path of PROBE_PATHS) {
    const r = await probeContent(`${origin}${path}`);
    // A real page must (a) return 200, (b) differ in length from the
    // 404 page (junk), and (c) differ in length from the homepage.
    // Tolerance is generous (>200 bytes off junk, >500 off root) to
    // accept page templates that share chrome.
    if (r.ok && Math.abs(r.length - junk.length) > 200 && Math.abs(r.length - root.length) > 500) {
      hits.push(path);
    }
    await new Promise((res) => setTimeout(res, 400));
  }
  return { origin, hits, reachable: true, isSpa: false };
}

function looksLikeNoiseRepo(p) {
  const haystack = `${p.repo} ${p.repoDescription ?? ''}`.toLowerCase();
  return REPO_NOISE_SUBSTRINGS.some((s) => haystack.includes(s));
}

function classify({ ghHits, probedHits }) {
  if (ghHits && ghHits.length > 0) return 'T1';
  // 4+ matches almost always means SPA fallback that beat the length-diff
  // detector. Real products rarely have 4+ trust-named pages.
  if (probedHits && probedHits.length > 0 && probedHits.length <= 3) return 'T2';
  return 'T3';
}

function rankWithin(tier, p) {
  // Within a tier, rank by signal density.
  if (tier === 'T1') {
    // Multiple trust files > one. Has homepage > no homepage.
    return (p.ghHits?.length ?? 0) * 100 + (p.homepage ? 10 : 0) + (p.stars ?? 0) / 100;
  }
  if (tier === 'T2') {
    return (p.probedHits?.length ?? 0) * 10 + (p.hn?.points ?? 0) / 50;
  }
  return p.hn?.points ?? 0;
}

function mdEscape(s) {
  return String(s ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/\|/g, '\\|')
    .replace(/\n/g, ' ')
    .trim();
}

function buildReport(byTier, generatedAt) {
  const lines = [];
  lines.push(`# Integrity Framework — outreach prospects`);
  lines.push('');
  lines.push(`Generated: ${generatedAt}`);
  lines.push('');
  const totals = Object.fromEntries(Object.entries(byTier).map(([k, v]) => [k, v.length]));
  lines.push(`Totals: T1 ${totals.T1 ?? 0} · T2 ${totals.T2 ?? 0} · T3 ${totals.T3 ?? 0}`);
  lines.push('');
  lines.push(`**T1** — already publishes a trust file. Half-day from Bronze. Top priority.  `);
  lines.push(`**T2** — has /trust or /methodology or /security page. Cares about credibility.  `);
  lines.push(`**T3** — recent AI-product launch, no trust artifacts found yet. Segment fit, cold.`);
  lines.push('');

  for (const tier of ['T1', 'T2', 'T3']) {
    const rows = byTier[tier] ?? [];
    if (rows.length === 0) continue;
    lines.push(`## ${tier} — ${rows.length} prospect${rows.length === 1 ? '' : 's'}`);
    lines.push('');
    if (tier === 'T1') {
      lines.push('| Repo | Files found | Stars | Pushed | Description |');
      lines.push('|---|---|---:|---|---|');
      for (const p of rows) {
        const files = (p.ghHits ?? []).map((h) => h.filename).join(', ');
        lines.push(
          `| [${mdEscape(p.repo)}](${p.repoUrl}) | ${mdEscape(files)} | ${p.stars ?? 0} | ${p.pushedAt?.slice(0, 10) ?? ''} | ${mdEscape(p.repoDescription).slice(0, 90)} |`,
        );
      }
    } else if (tier === 'T2') {
      lines.push('| Title / Repo | Homepage | Trust pages | HN | Notes |');
      lines.push('|---|---|---|---:|---|');
      for (const p of rows) {
        const probed = (p.probedHits ?? []).join(', ');
        const homepage = p.homepage ?? '';
        const hn = p.hn ? `[${p.hn.points}↑](${p.hn.hnUrl})` : '';
        const title = p.repo ? `[${mdEscape(p.repo)}](${p.repoUrl})` : mdEscape(p.title ?? p.homepage ?? '');
        lines.push(
          `| ${title} | ${homepage ? `[link](${homepage})` : ''} | ${mdEscape(probed)} | ${hn} | ${mdEscape(p.notes ?? '')} |`,
        );
      }
    } else {
      lines.push('| Title | Homepage | HN | Author |');
      lines.push('|---|---|---:|---|');
      for (const p of rows) {
        const hn = p.hn ? `[${p.hn.points}↑](${p.hn.hnUrl})` : '';
        lines.push(
          `| ${mdEscape(p.title ?? '')} | ${p.homepage ? `[link](${p.homepage})` : ''} | ${hn} | ${mdEscape(p.author ?? '')} |`,
        );
      }
    }
    lines.push('');
  }

  lines.push('---');
  lines.push('');
  lines.push('Outreach guidance:');
  lines.push('');
  lines.push('1. Start with T1. They already wrote a trust file; the conversation is "you\'re 80% there, here\'s the framework."');
  lines.push('2. T2 next. Their site has a /trust or /methodology page — they self-selected on caring about credibility.');
  lines.push('3. T3 only after T1+T2 are exhausted. Cold but in-segment.');
  lines.push('');
  return lines.join('\n');
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });
  const generatedAt = new Date().toISOString();
  console.error(`[start] ${generatedAt}`);

  // ---------- Stage 1: GitHub code search ----------
  console.error('[gh] code search by filename');
  const ghByRepo = new Map();
  for (const filename of GH_FILES) {
    const hits = ghSearchCodeByFilename(filename);
    console.error(`  ${filename}: ${hits.length} file hits`);
    for (const h of hits) {
      if (!h.repo) continue;
      if (STARTVEST_REPOS.has(h.repo)) continue;
      const existing = ghByRepo.get(h.repo) ?? {
        repo: h.repo,
        repoUrl: h.repoUrl,
        repoDescription: h.repoDescription,
        stars: h.stars,
        pushedAt: h.pushedAt,
        ghHits: [],
      };
      existing.ghHits.push({ filename: h.filename, fileUrl: h.fileUrl });
      ghByRepo.set(h.repo, existing);
    }
  }
  console.error(`[gh] unique repos: ${ghByRepo.size}`);

  // Resolve each repo's homepage URL via the repos API so we can probe.
  for (const [name, p] of ghByRepo) {
    const r = ghRepo(name);
    if (r) {
      p.homepage = r.homepage && /^https?:\/\//.test(r.homepage) ? r.homepage : null;
      p.archived = r.archived;
      p.fork = r.fork;
      p.stars = r.stargazers_count ?? p.stars;
      p.repoDescription = r.description ?? p.repoDescription;
    }
  }

  // ---------- Stage 2: HN Algolia ----------
  console.error('[hn] algolia search');
  const hnByUrl = new Map();
  for (const q of HN_QUERIES) {
    const hits = await hnAlgolia(q);
    console.error(`  "${q}": ${hits.length} hits`);
    for (const h of hits) {
      if (!h.url) continue;
      const existing = hnByUrl.get(h.url);
      if (!existing || h.points > existing.points) {
        hnByUrl.set(h.url, h);
      }
    }
  }
  console.error(`[hn] unique URLs: ${hnByUrl.size}`);

  // ---------- Stage 3: probe domains for trust pages ----------
  console.error('[probe] checking trust paths on candidate origins');
  const t1Prospects = [];
  let dropped = 0;
  for (const p of ghByRepo.values()) {
    if (p.archived || p.fork) { dropped++; continue; }
    if (looksLikeNoiseRepo(p)) { dropped++; continue; }
    // Require either a homepage URL set OR meaningful star count.
    if (!p.homepage && (p.stars ?? 0) < 30) { dropped++; continue; }
    if (p.homepage) {
      const probe = await probeDomain(p.homepage);
      p.probedHits = probe.hits;
      p.reachable = probe.reachable;
      p.isSpa = probe.isSpa;
    }
    t1Prospects.push(p);
  }
  console.error(`[gh] T1 candidates after noise filter: ${t1Prospects.length} (dropped ${dropped})`);

  const t2OrT3 = [];
  let i = 0;
  let skippedHomepage = 0;
  for (const hn of hnByUrl.values()) {
    i++;
    if (i % 10 === 0) console.error(`  hn probe ${i}/${hnByUrl.size}`);
    if (isExcludedHomepage(hn.url)) { skippedHomepage++; continue; }
    const probe = await probeDomain(hn.url);
    t2OrT3.push({
      title: hn.title,
      homepage: hn.url,
      author: hn.author,
      hn,
      probedHits: probe.hits,
      reachable: probe.reachable,
      origin: probe.origin,
    });
  }
  console.error(`[hn] kept ${t2OrT3.length} prospects (${skippedHomepage} excluded as aggregator homepages)`);

  // ---------- Stage 4: classify + rank ----------
  const byTier = { T1: [], T2: [], T3: [] };
  for (const p of t1Prospects) {
    const tier = classify({ ghHits: p.ghHits, probedHits: p.probedHits });
    byTier[tier].push(p);
  }
  for (const p of t2OrT3) {
    const tier = classify({ ghHits: null, probedHits: p.probedHits });
    byTier[tier].push(p);
  }
  for (const tier of Object.keys(byTier)) {
    byTier[tier].sort((a, b) => rankWithin(tier, b) - rankWithin(tier, a));
  }

  // ---------- Stage 5: write report ----------
  const md = buildReport(byTier, generatedAt);
  const mdPath = `${OUT_DIR}/report.md`;
  const jsonPath = `${OUT_DIR}/report.json`;
  writeFileSync(mdPath, md, 'utf8');
  writeFileSync(jsonPath, JSON.stringify({ generatedAt, byTier }, null, 2), 'utf8');

  console.error(`\n[done]`);
  console.error(`  T1: ${byTier.T1.length}`);
  console.error(`  T2: ${byTier.T2.length}`);
  console.error(`  T3: ${byTier.T3.length}`);
  console.error(`  → ${mdPath}`);
  console.error(`  → ${jsonPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
