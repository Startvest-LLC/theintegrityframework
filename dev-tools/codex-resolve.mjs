#!/usr/bin/env node
// Resolve a list of GitHub PR review threads in bulk.
//
// Usage:
//   node E:/Temp/codex-resolve.mjs <thread-ids-file>
//   node E:/Temp/codex-resolve.mjs --thread <PRRT_xxx>
//   echo PRRT_xxx | node E:/Temp/codex-resolve.mjs -
//
// thread-ids-file is a JSON array of thread IDs (matches what
// codex-reconcile.mjs writes).

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const MUTATION = `
  mutation($threadId: ID!) {
    resolveReviewThread(input: {threadId: $threadId}) {
      thread { id isResolved }
    }
  }
`;

function gh(args, opts = {}) {
  return execFileSync('gh', args, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024, ...opts });
}

function resolveOne(threadId) {
  try {
    const out = gh([
      'api',
      'graphql',
      '-f',
      `query=${MUTATION}`,
      '-f',
      `threadId=${threadId}`,
    ]);
    const data = JSON.parse(out);
    if (data.errors) {
      return { ok: false, error: data.errors.map((e) => e.message).join('; ') };
    }
    return { ok: data.data.resolveReviewThread.thread.isResolved, error: null };
  } catch (err) {
    return { ok: false, error: err.message ?? String(err) };
  }
}

async function main() {
  const args = process.argv.slice(2);
  let ids = [];
  if (args[0] === '--thread') {
    ids = [args[1]];
  } else if (args[0] === '-') {
    const stdin = readFileSync(0, 'utf8');
    ids = stdin.split(/\s+/).filter(Boolean);
  } else if (args[0]) {
    const data = JSON.parse(readFileSync(args[0], 'utf8'));
    ids = Array.isArray(data) ? data : data.threadIds ?? [];
  } else {
    console.error('Usage: codex-resolve <thread-ids.json | --thread PRRT_xxx | ->');
    process.exit(1);
  }

  let okCount = 0;
  let errCount = 0;
  for (const id of ids) {
    const { ok, error } = resolveOne(id);
    if (ok) {
      okCount++;
      process.stdout.write('.');
    } else {
      errCount++;
      process.stdout.write(`\n  ✗ ${id}: ${error}\n`);
    }
  }
  process.stdout.write(`\n${okCount} resolved, ${errCount} failed.\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
