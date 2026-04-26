#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const REPOS = [
  'claritylift',
  'adacompliancedocs',
  'FieldLedger',
  'idealift',
  'theintegrityframework',
];
const OWNER = 'Startvest-LLC';
const BOT_LOGINS = new Set(['chatgpt-codex-connector', 'chatgpt-codex-connector[bot]']);

function gqlQuery(owner, repo, after = null) {
  const cursor = after ? `, after: "${after}"` : '';
  return `
    query {
      repository(owner: "${owner}", name: "${repo}") {
        pullRequests(first: 50, states: [OPEN, MERGED], orderBy: {field: UPDATED_AT, direction: DESC}${cursor}) {
          pageInfo { hasNextPage endCursor }
          nodes {
            number
            title
            state
            url
            updatedAt
            reviewThreads(first: 100) {
              nodes {
                isResolved
                isOutdated
                path
                line
                comments(first: 1) {
                  nodes {
                    author { login }
                    body
                    url
                    createdAt
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

function gh(args) {
  return execFileSync('gh', args, { encoding: 'utf8', maxBuffer: 50 * 1024 * 1024 });
}

async function fetchRepo(repo) {
  const items = [];
  let cursor = null;
  for (let page = 0; page < 30; page++) {
    const out = gh(['api', 'graphql', '-f', `query=${gqlQuery(OWNER, repo, cursor)}`]);
    const data = JSON.parse(out).data.repository;
    if (!data) break;
    for (const pr of data.pullRequests.nodes) {
      for (const t of pr.reviewThreads.nodes) {
        const c = t.comments.nodes[0];
        if (!c) continue;
        if (!BOT_LOGINS.has(c.author?.login ?? '')) continue;
        items.push({
          repo,
          prNumber: pr.number,
          prTitle: pr.title,
          prState: pr.state,
          prUrl: pr.url,
          path: t.path,
          line: t.line,
          isResolved: t.isResolved,
          isOutdated: t.isOutdated,
          body: c.body,
          commentUrl: c.url,
          createdAt: c.createdAt,
        });
      }
    }
    if (!data.pullRequests.pageInfo.hasNextPage) break;
    cursor = data.pullRequests.pageInfo.endCursor;
  }
  return items;
}

(async () => {
  const all = [];
  for (const repo of REPOS) {
    process.stderr.write(`Fetching ${repo}...\n`);
    const items = await fetchRepo(repo);
    all.push(...items);
    process.stderr.write(`  ${items.length} codex threads\n`);
  }

  const byRepo = {};
  for (const i of all) {
    if (!byRepo[i.repo]) byRepo[i.repo] = { total: 0, unresolved: 0, outdated: 0, openPr: 0, mergedPr: 0 };
    byRepo[i.repo].total++;
    if (!i.isResolved) byRepo[i.repo].unresolved++;
    if (i.isOutdated) byRepo[i.repo].outdated++;
    if (i.prState === 'OPEN') byRepo[i.repo].openPr++;
    else byRepo[i.repo].mergedPr++;
  }

  const lines = [];
  lines.push('# Codex review inventory\n');
  lines.push(`Generated: ${new Date().toISOString()}\n`);
  lines.push('## Per-repo summary\n');
  lines.push('| Repo | Total threads | Unresolved | Outdated | On open PRs | On merged PRs |');
  lines.push('|---|---:|---:|---:|---:|---:|');
  for (const repo of REPOS) {
    const s = byRepo[repo] ?? { total: 0, unresolved: 0, outdated: 0, openPr: 0, mergedPr: 0 };
    lines.push(`| ${repo} | ${s.total} | ${s.unresolved} | ${s.outdated} | ${s.openPr} | ${s.mergedPr} |`);
  }
  lines.push('');

  const actionable = all.filter((i) => !i.isResolved && !i.isOutdated);
  const stillOutdated = all.filter((i) => !i.isResolved && i.isOutdated);

  lines.push(`## Actionable (unresolved + not outdated)\n`);
  lines.push(`**${actionable.length} threads** across ${new Set(actionable.map((a) => `${a.repo}#${a.prNumber}`)).size} PRs.\n`);

  const byRepoPr = {};
  for (const i of actionable) {
    const key = `${i.repo}#${i.prNumber}`;
    if (!byRepoPr[key]) byRepoPr[key] = { repo: i.repo, prNumber: i.prNumber, prTitle: i.prTitle, prState: i.prState, prUrl: i.prUrl, items: [] };
    byRepoPr[key].items.push(i);
  }
  const sortedKeys = Object.keys(byRepoPr).sort((a, b) => byRepoPr[b].items.length - byRepoPr[a].items.length);
  for (const k of sortedKeys) {
    const g = byRepoPr[k];
    lines.push(`### ${g.repo}#${g.prNumber} — ${g.prTitle} (${g.prState}) — ${g.items.length} thread${g.items.length === 1 ? '' : 's'}\n`);
    lines.push(`PR: ${g.prUrl}\n`);
    for (const i of g.items) {
      const loc = i.path ? `${i.path}${i.line ? `:${i.line}` : ''}` : '(no path)';
      lines.push(`- **${loc}** — [thread](${i.commentUrl})`);
      const snippet = i.body.split('\n').slice(0, 6).join('\n  > ');
      lines.push(`  > ${snippet}`);
      if (i.body.split('\n').length > 6) lines.push(`  > _(truncated)_`);
      lines.push('');
    }
  }

  lines.push(`## Unresolved but outdated\n`);
  lines.push(`**${stillOutdated.length} threads** — line/file changed since the comment, may no longer apply.\n`);
  const outByRepo = {};
  for (const i of stillOutdated) {
    outByRepo[i.repo] = (outByRepo[i.repo] ?? 0) + 1;
  }
  for (const r of Object.keys(outByRepo).sort()) {
    lines.push(`- ${r}: ${outByRepo[r]}`);
  }
  lines.push('');

  writeFileSync('E:/Temp/codex-inventory.md', lines.join('\n'));
  writeFileSync('E:/Temp/codex-inventory.json', JSON.stringify(all, null, 2));
  process.stderr.write(`\nWrote E:/Temp/codex-inventory.md and .json\n`);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
