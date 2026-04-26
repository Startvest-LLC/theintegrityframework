#!/usr/bin/env node
// Re-scan every listing's URLs and report results.
//
// Probes:
// - homepageUrl                              → expect 200
// - integrityMdUrl                           → expect 200
// - silverCredential.url (methodology page)  → expect 200, expect Version + Changelog text
// - silverCredential.outputUrl (cli output)  → expect 200, expect JSON
//
// Outputs a report.json (machine) and report.md (human), plus exits non-zero
// if any listing has at least one failing URL.
//
// Usage:
//   node .github/scripts/rescan-listings.mjs [--data <path>]

import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const DATA_PATH = (() => {
  const idx = process.argv.indexOf('--data');
  if (idx >= 0 && process.argv[idx + 1]) return resolve(process.argv[idx + 1]);
  return resolve('data/listings.json');
})();

const TIMEOUT_MS = 15_000;

async function probe(url) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'User-Agent': 'integrityframework-rescan/1.0' },
    });
    const body = await res.text();
    return { ok: res.ok, status: res.status, body };
  } catch (err) {
    return { ok: false, status: 0, error: err.message ?? String(err) };
  } finally {
    clearTimeout(t);
  }
}

function checkVersionChangelog(html) {
  // Methodology pages must carry Version + Changelog headings — accept either
  // raw markdown headings or the TSX <Section title="Version"> equivalent.
  const hasVersion =
    /<h[1-6][^>]*>\s*Version\s*<\/h[1-6]>/i.test(html) ||
    /<section\b[^>]*title=["']Version["']/i.test(html) ||
    /^##?\s+Version\b/m.test(html) ||
    /\bVersion\s*v?\d+\.\d+/i.test(html);
  const hasChangelog =
    /<h[1-6][^>]*>\s*Changelog\s*<\/h[1-6]>/i.test(html) ||
    /<section\b[^>]*title=["']Changelog["']/i.test(html) ||
    /^##?\s+Changelog\b/m.test(html);
  return { hasVersion, hasChangelog };
}

async function main() {
  const raw = await readFile(DATA_PATH, 'utf8');
  const data = JSON.parse(raw);
  const listings = data.listings ?? [];

  const results = [];
  for (const l of listings) {
    if (l.state === 'delisted') {
      results.push({ slug: l.slug, name: l.name, skipped: 'delisted' });
      continue;
    }

    const issues = [];
    const probes = {};

    const home = await probe(l.homepageUrl);
    probes.homepage = { url: l.homepageUrl, status: home.status, ok: home.ok };
    if (!home.ok) issues.push(`homepageUrl returned HTTP ${home.status} (${home.error ?? 'fetch error'})`);

    const integrity = await probe(l.integrityMdUrl);
    probes.integrity = { url: l.integrityMdUrl, status: integrity.status, ok: integrity.ok };
    if (!integrity.ok) issues.push(`integrityMdUrl returned HTTP ${integrity.status} (${integrity.error ?? 'fetch error'})`);

    if (l.tier === 'silver' && l.silverCredential) {
      if (l.silverCredential.kind === 'methodology-page') {
        const meth = await probe(l.silverCredential.url);
        probes.methodology = { url: l.silverCredential.url, status: meth.status, ok: meth.ok };
        if (!meth.ok) {
          issues.push(`Silver methodology page returned HTTP ${meth.status} (${meth.error ?? 'fetch error'})`);
        } else {
          const { hasVersion, hasChangelog } = checkVersionChangelog(meth.body ?? '');
          probes.methodology.hasVersion = hasVersion;
          probes.methodology.hasChangelog = hasChangelog;
          if (!hasVersion) issues.push('Silver methodology page missing Version heading');
          if (!hasChangelog) issues.push('Silver methodology page missing Changelog heading');
        }
      } else if (l.silverCredential.kind === 'integrity-cli') {
        const cli = await probe(l.silverCredential.outputUrl);
        probes.cliOutput = { url: l.silverCredential.outputUrl, status: cli.status, ok: cli.ok };
        if (!cli.ok) {
          issues.push(`integrity-cli output returned HTTP ${cli.status} (${cli.error ?? 'fetch error'})`);
        } else {
          try {
            JSON.parse(cli.body);
          } catch {
            issues.push('integrity-cli output is not valid JSON');
          }
        }
      }
    }

    results.push({
      slug: l.slug,
      name: l.name,
      tier: l.tier,
      probes,
      issues,
      passed: issues.length === 0,
    });
  }

  const summary = {
    runDate: new Date().toISOString(),
    totalListings: results.length,
    skippedListings: results.filter((r) => r.skipped).length,
    passedListings: results.filter((r) => r.passed).length,
    failedListings: results.filter((r) => !r.skipped && !r.passed).length,
    results,
  };

  await writeFile(resolve('rescan-report.json'), JSON.stringify(summary, null, 2));

  // Append run results to data/rescan-history.json so per-listing UI can render
  // the timeline. One entry per non-skipped listing per run.
  const historyPath = resolve('data/rescan-history.json');
  const today = summary.runDate.slice(0, 10);
  let history;
  try {
    history = JSON.parse(await readFile(historyPath, 'utf8'));
  } catch {
    history = { version: '0.1', lastUpdated: today, history: {} };
  }
  if (!history.history) history.history = {};

  for (const r of results) {
    if (r.skipped) continue;
    if (!history.history[r.slug]) history.history[r.slug] = [];
    history.history[r.slug].push({
      date: today,
      passed: r.passed,
      issues: r.issues,
    });
  }
  history.lastUpdated = today;
  await writeFile(historyPath, `${JSON.stringify(history, null, 2)}\n`);

  // Human-readable report
  const lines = [];
  lines.push(`# Re-scan report`);
  lines.push('');
  lines.push(`Run: ${summary.runDate}`);
  lines.push(`Total listings: ${summary.totalListings} · passed: ${summary.passedListings} · failed: ${summary.failedListings} · skipped: ${summary.skippedListings}`);
  lines.push('');

  for (const r of results) {
    if (r.skipped) {
      lines.push(`## ${r.name} (\`${r.slug}\`) — skipped (${r.skipped})`);
      lines.push('');
      continue;
    }
    const badge = r.passed ? '✅' : '❌';
    lines.push(`## ${badge} ${r.name} (\`${r.slug}\`) — ${r.tier}`);
    lines.push('');
    for (const [name, p] of Object.entries(r.probes)) {
      const status = p.ok ? '✅' : '❌';
      lines.push(`- ${status} \`${name}\` HTTP ${p.status} — ${p.url}`);
      if (name === 'methodology' && p.ok) {
        lines.push(`  - Version heading: ${p.hasVersion ? '✅' : '❌'}`);
        lines.push(`  - Changelog heading: ${p.hasChangelog ? '✅' : '❌'}`);
      }
    }
    if (r.issues.length > 0) {
      lines.push('');
      lines.push(`Issues:`);
      for (const i of r.issues) lines.push(`- ${i}`);
    }
    lines.push('');
  }

  await writeFile(resolve('rescan-report.md'), lines.join('\n'));

  // stdout summary for CI logs
  console.log(`Re-scan complete: ${summary.passedListings}/${summary.totalListings - summary.skippedListings} passed`);
  for (const r of results) {
    if (r.skipped) continue;
    if (!r.passed) {
      console.log(`  ❌ ${r.slug}:`);
      for (const i of r.issues) console.log(`     - ${i}`);
    }
  }

  process.exit(summary.failedListings > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('rescan-listings: fatal:', err);
  process.exit(2);
});
