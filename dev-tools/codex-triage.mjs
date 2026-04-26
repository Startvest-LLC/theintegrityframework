#!/usr/bin/env node
// Per-thread triage helper.
//
// Takes a repo name. Reads the unresolved STANDING list from the most-recent
// reconcile run, fetches current file content for each thread's path, and
// emits a per-thread triage block:
//
//   - the Codex comment (full body)
//   - current code at thread.line ± 10 lines
//   - thread URL + thread ID for resolve action
//
// Output: E:/Temp/codex-triage/<repo>.md
//
// Usage:
//   node dev-tools/codex-triage.mjs <repo>

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const OWNER = 'Startvest-LLC';
const BOT_LOGINS = new Set(['chatgpt-codex-connector', 'chatgpt-codex-connector[bot]']);

function gh(args) {
  return execFileSync('gh', args, { encoding: 'utf8', maxBuffer: 80 * 1024 * 1024 });
}

const PR_QUERY = `
  query($owner: String!, $name: String!, $after: String) {
    repository(owner: $owner, name: $name) {
      defaultBranchRef { name }
      pullRequests(first: 50, states: [OPEN, MERGED], orderBy: {field: UPDATED_AT, direction: DESC}, after: $after) {
        pageInfo { hasNextPage endCursor }
        nodes {
          number
          title
          state
          url
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
                }
              }
            }
          }
        }
      }
    }
  }
`;

async function fetchUnresolvedNonOutdated(repo) {
  const items = [];
  let cursor = null;
  let defaultBranch = 'master';
  for (let page = 0; page < 30; page++) {
    const args = ['api', 'graphql', '-f', `query=${PR_QUERY}`, '-F', `owner=${OWNER}`, '-F', `name=${repo}`];
    if (cursor) args.push('-F', `after=${cursor}`);
    const out = gh(args);
    const data = JSON.parse(out).data.repository;
    if (!data) break;
    if (data.defaultBranchRef?.name) defaultBranch = data.defaultBranchRef.name;
    for (const pr of data.pullRequests.nodes) {
      for (const t of pr.reviewThreads.nodes) {
        if (t.isResolved) continue;
        if (t.isOutdated) continue;
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
          body: c.body,
          diffHunk: c.diffHunk,
          commentUrl: c.url,
        });
      }
    }
    if (!data.pullRequests.pageInfo.hasNextPage) break;
    cursor = data.pullRequests.pageInfo.endCursor;
  }
  return { items, defaultBranch };
}

const fileCache = new Map();
async function getFileLines(repo, path, branch) {
  const key = `${repo}::${path}`;
  if (fileCache.has(key)) return fileCache.get(key);
  try {
    const out = gh(['api', `repos/${OWNER}/${repo}/contents/${encodeURIComponent(path)}?ref=${branch}`]);
    const data = JSON.parse(out);
    if (data.content && data.encoding === 'base64') {
      const text = Buffer.from(data.content, 'base64').toString('utf8');
      const lines = text.split('\n');
      fileCache.set(key, lines);
      return lines;
    }
  } catch (err) {
    fileCache.set(key, null);
    return null;
  }
  fileCache.set(key, null);
  return null;
}

function classifySeverity(body) {
  const m = body.match(/!\[(P[0-3])\s*Badge\]/i);
  if (m) return m[1].toUpperCase();
  // Plain text P-tag
  const m2 = body.match(/\b(P[0-3])\b/);
  if (m2) return m2[1].toUpperCase();
  return null;
}

function shortTitle(body) {
  // Codex usually puts a bold title near the top
  const m = body.match(/\*\*([^*]+)\*\*/);
  if (m) return m[1].trim();
  return body.split('\n')[0].slice(0, 100);
}

async function main() {
  const repo = process.argv[2];
  if (!repo) {
    console.error('Usage: codex-triage <repo>');
    process.exit(1);
  }

  process.stderr.write(`Fetching unresolved+non-outdated threads for ${repo}...\n`);
  const { items, defaultBranch } = await fetchUnresolvedNonOutdated(repo);
  process.stderr.write(`  ${items.length} threads. Fetching file contexts...\n`);

  // Order by file path then line so consecutive comments on the same file group together
  items.sort((a, b) => {
    if (a.path !== b.path) return (a.path ?? '').localeCompare(b.path ?? '');
    return (a.line ?? 0) - (b.line ?? 0);
  });

  const lines = [];
  lines.push(`# Codex triage — ${repo}\n`);
  lines.push(`Generated: ${new Date().toISOString()}\n`);
  lines.push(`Default branch: \`${defaultBranch}\` · ${items.length} unresolved + not outdated threads\n`);
  lines.push('Each block: Codex comment + current code at the criticized line ±10 lines.');
  lines.push('Decide: **fix-now** / **defer** / **resolve-stale** (already fixed elsewhere) / **resolve-wontfix**.\n');

  // Severity distribution
  const sev = { P0: 0, P1: 0, P2: 0, P3: 0, NONE: 0 };
  for (const i of items) {
    const s = classifySeverity(i.body);
    sev[s ?? 'NONE']++;
  }
  lines.push(`## Severity distribution`);
  lines.push(`P0: ${sev.P0} · P1: ${sev.P1} · P2: ${sev.P2} · P3: ${sev.P3} · unlabeled: ${sev.NONE}\n`);

  let idx = 0;
  for (const item of items) {
    idx++;
    const s = classifySeverity(item.body) ?? 'P?';
    const title = shortTitle(item.body);
    const loc = `${item.path}:${item.line}`;
    lines.push(`---\n`);
    lines.push(`## [${s}] ${title}\n`);
    lines.push(`**${idx}/${items.length}** — \`${loc}\` — PR #${item.prNumber} (${item.prState}) — [thread](${item.commentUrl})\n`);
    lines.push(`Thread ID: \`${item.threadId}\`\n`);

    lines.push('### Codex comment');
    lines.push(`> ${item.body.split('\n').join('\n> ')}`);
    lines.push('');

    const fileLines = await getFileLines(repo, item.path, defaultBranch);
    if (!fileLines) {
      lines.push('### Current code');
      lines.push(`_(file fetch failed; may be deleted)_`);
      lines.push('');
      continue;
    }
    const target = item.line ?? 1;
    const start = Math.max(1, target - 10);
    const end = Math.min(fileLines.length, target + 10);
    lines.push('### Current code');
    lines.push('```');
    for (let i = start; i <= end; i++) {
      const marker = i === target ? '>' : ' ';
      const ln = String(i).padStart(4);
      lines.push(`${marker} ${ln}  ${fileLines[i - 1] ?? ''}`);
    }
    lines.push('```');
    lines.push('');
    lines.push('### Verdict');
    lines.push(`- [ ] fix-now`);
    lines.push(`- [ ] defer`);
    lines.push(`- [ ] resolve-stale (already fixed elsewhere; just close the thread)`);
    lines.push(`- [ ] resolve-wontfix`);
    lines.push('');
  }

  mkdirSync('E:/Temp/codex-triage', { recursive: true });
  writeFileSync(`E:/Temp/codex-triage/${repo}.md`, lines.join('\n'));
  process.stderr.write(`Wrote E:/Temp/codex-triage/${repo}.md (${idx} threads)\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
