#!/usr/bin/env node
// Reconcile unresolved Codex review threads against current master.
//
// For each unresolved thread:
//   1. Fetch the file at thread.path on current master
//   2. Compare to what Codex was criticizing (best-effort — we use the
//      thread.line ± a few lines of current content)
//   3. Categorize:
//        - GONE      file no longer exists at that path
//        - LIKELY-FIXED  the line content has clearly changed
//        - STANDING  the line still appears unchanged
//        - AMBIGUOUS file shrank, line offset shifted, etc.
//   4. Emit a per-repo markdown report and a per-repo JSON of thread IDs
//      ready to bulk-resolve.
//
// Usage:
//   node E:/Temp/codex-reconcile.mjs <repo>
//   node E:/Temp/codex-reconcile.mjs all

import { execFileSync } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';

const OWNER = 'Startvest-LLC';
const REPOS = ['claritylift', 'adacompliancedocs', 'FieldLedger', 'idealift', 'theintegrityframework'];
const BOT_LOGINS = new Set(['chatgpt-codex-connector', 'chatgpt-codex-connector[bot]']);

function gh(args) {
  return execFileSync('gh', args, { encoding: 'utf8', maxBuffer: 80 * 1024 * 1024 });
}

function gqlQuery(owner, repo, after = null) {
  const cursor = after ? `, after: "${after}"` : '';
  return `
    query {
      repository(owner: "${owner}", name: "${repo}") {
        defaultBranchRef { name }
        pullRequests(first: 50, states: [OPEN, MERGED], orderBy: {field: UPDATED_AT, direction: DESC}${cursor}) {
          pageInfo { hasNextPage endCursor }
          nodes {
            number
            title
            state
            url
            headRefOid
            mergeCommit { oid }
            reviewThreads(first: 100) {
              nodes {
                id
                isResolved
                isOutdated
                path
                line
                originalLine
                comments(first: 1) {
                  nodes {
                    author { login }
                    body
                    url
                    diffHunk
                    originalCommit { oid }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
}

async function fetchUnresolved(repo) {
  const items = [];
  let cursor = null;
  let defaultBranch = 'master';
  for (let page = 0; page < 30; page++) {
    const out = gh(['api', 'graphql', '-f', `query=${gqlQuery(OWNER, repo, cursor)}`]);
    const data = JSON.parse(out).data.repository;
    if (!data) break;
    if (data.defaultBranchRef?.name) defaultBranch = data.defaultBranchRef.name;
    for (const pr of data.pullRequests.nodes) {
      for (const t of pr.reviewThreads.nodes) {
        if (t.isResolved) continue;
        const c = t.comments.nodes[0];
        if (!c) continue;
        if (!BOT_LOGINS.has(c.author?.login ?? '')) continue;
        items.push({
          repo,
          prNumber: pr.number,
          prTitle: pr.title,
          prState: pr.state,
          prUrl: pr.url,
          threadId: t.id,
          path: t.path,
          line: t.line ?? t.originalLine,
          originalLine: t.originalLine,
          isOutdated: t.isOutdated,
          body: c.body,
          diffHunk: c.diffHunk,
          commentUrl: c.url,
          originalSha: c.originalCommit?.oid,
        });
      }
    }
    if (!data.pullRequests.pageInfo.hasNextPage) break;
    cursor = data.pullRequests.pageInfo.endCursor;
  }
  return { items, defaultBranch };
}

async function fetchFileAtMaster(repo, path, branch) {
  try {
    const out = gh([
      'api',
      `repos/${OWNER}/${repo}/contents/${encodeURIComponent(path)}?ref=${branch}`,
    ]);
    const data = JSON.parse(out);
    if (data.content && data.encoding === 'base64') {
      return Buffer.from(data.content, 'base64').toString('utf8');
    }
    return null;
  } catch (err) {
    if ((err.message ?? '').includes('404')) return 'GONE';
    return null;
  }
}

function categorize(item, currentContent) {
  if (currentContent === 'GONE') return 'GONE';
  if (currentContent == null) return 'AMBIGUOUS';

  const lines = currentContent.split('\n');
  const target = item.line;
  if (!target || target < 1 || target > lines.length) return 'AMBIGUOUS';

  // Pull what Codex was criticizing from the diff hunk. Take the lines that
  // were "+ added" or " context" near the comment line.
  const hunk = item.diffHunk ?? '';
  const hunkAddedLines = hunk
    .split('\n')
    .filter((l) => l.startsWith('+'))
    .map((l) => l.slice(1).trim())
    .filter((l) => l.length > 0);

  if (hunkAddedLines.length === 0) return 'AMBIGUOUS';

  // Take the last "added" line as the most-likely target of the comment
  // (Codex usually comments on the last + line of the hunk).
  const targetLine = hunkAddedLines[hunkAddedLines.length - 1];

  // Look for that exact line within ±5 of the current target line position
  const window = 5;
  const start = Math.max(0, target - 1 - window);
  const end = Math.min(lines.length, target - 1 + window + 1);
  for (let i = start; i < end; i++) {
    if (lines[i].trim() === targetLine) return 'STANDING';
  }
  return 'LIKELY-FIXED';
}

async function reconcileRepo(repo) {
  process.stderr.write(`Reconciling ${repo}...\n`);
  const { items, defaultBranch } = await fetchUnresolved(repo);
  process.stderr.write(`  ${items.length} unresolved threads. Fetching current file states...\n`);

  // Cache file fetches by path
  const fileCache = new Map();
  async function getFile(path) {
    if (fileCache.has(path)) return fileCache.get(path);
    const content = await fetchFileAtMaster(repo, path, defaultBranch);
    fileCache.set(path, content);
    return content;
  }

  const results = [];
  let i = 0;
  for (const item of items) {
    i++;
    if (i % 20 === 0) process.stderr.write(`  ${i}/${items.length}\n`);
    const content = await getFile(item.path);
    const category = categorize(item, content);
    results.push({ ...item, category });
  }

  return { repo, defaultBranch, results };
}

async function main() {
  const arg = process.argv[2];
  if (!arg) {
    console.error('Usage: codex-reconcile <repo|all>');
    process.exit(1);
  }
  const targets = arg === 'all' ? REPOS : [arg];

  mkdirSync('E:/Temp/codex-reconcile', { recursive: true });

  const allCategoryCounts = {};

  for (const repo of targets) {
    const { results, defaultBranch } = await reconcileRepo(repo);
    const counts = { GONE: 0, 'LIKELY-FIXED': 0, STANDING: 0, AMBIGUOUS: 0 };
    for (const r of results) counts[r.category]++;
    allCategoryCounts[repo] = counts;

    const lines = [];
    lines.push(`# Codex reconcile — ${repo}\n`);
    lines.push(`Generated: ${new Date().toISOString()}\n`);
    lines.push(`Default branch: \`${defaultBranch}\`\n`);
    lines.push(`## Summary\n`);
    lines.push(`- **${results.length}** unresolved threads`);
    lines.push(`- ${counts.GONE} where the file is gone (auto-resolve candidate)`);
    lines.push(`- ${counts['LIKELY-FIXED']} where the line clearly changed (auto-resolve candidate)`);
    lines.push(`- ${counts.STANDING} where the criticized line is still in current master (real backlog)`);
    lines.push(`- ${counts.AMBIGUOUS} where the comparison was inconclusive (manual review)`);
    lines.push('');

    const buckets = ['GONE', 'LIKELY-FIXED', 'STANDING', 'AMBIGUOUS'];
    for (const bucket of buckets) {
      const bucketResults = results.filter((r) => r.category === bucket);
      lines.push(`## ${bucket} (${bucketResults.length})\n`);
      for (const r of bucketResults) {
        const loc = r.path ? `${r.path}${r.line ? `:${r.line}` : ''}` : '(no path)';
        lines.push(`### \`${loc}\` — PR #${r.prNumber} — [thread](${r.commentUrl})`);
        lines.push(`PR: ${r.prTitle}`);
        const snippet = r.body.split('\n').slice(0, 8).join('\n  > ');
        lines.push(`> ${snippet}`);
        lines.push('');
        lines.push(`thread-id: \`${r.threadId}\``);
        lines.push('');
      }
    }

    writeFileSync(`E:/Temp/codex-reconcile/${repo}.md`, lines.join('\n'));

    // Lists of thread IDs ready to bulk-resolve
    const autoResolveIds = results
      .filter((r) => r.category === 'GONE' || r.category === 'LIKELY-FIXED')
      .map((r) => r.threadId);
    const standingIds = results.filter((r) => r.category === 'STANDING').map((r) => r.threadId);

    writeFileSync(
      `E:/Temp/codex-reconcile/${repo}-auto-resolve.json`,
      JSON.stringify(autoResolveIds, null, 2),
    );
    writeFileSync(
      `E:/Temp/codex-reconcile/${repo}-standing.json`,
      JSON.stringify(standingIds, null, 2),
    );

    process.stderr.write(`  ${repo}: ${counts.GONE} gone, ${counts['LIKELY-FIXED']} likely-fixed, ${counts.STANDING} standing, ${counts.AMBIGUOUS} ambiguous\n`);
  }

  // Cross-repo summary
  console.log('# Codex reconcile summary\n');
  console.log('| Repo | Total | GONE | LIKELY-FIXED | STANDING | AMBIGUOUS |');
  console.log('|---|---:|---:|---:|---:|---:|');
  for (const repo of targets) {
    const c = allCategoryCounts[repo];
    const total = c.GONE + c['LIKELY-FIXED'] + c.STANDING + c.AMBIGUOUS;
    console.log(`| ${repo} | ${total} | ${c.GONE} | ${c['LIKELY-FIXED']} | ${c.STANDING} | ${c.AMBIGUOUS} |`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
