// GET /specs/brief-md/v0.1.0/spec.md
//
// Canonical home of the brief.md v0.1.0 spec document as raw markdown.
// Tools that ingest specs (LLMs, AI assistants, search-engine crawlers
// looking for documentation) get a clean text/markdown response.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-static';
export const revalidate = false;

let cache: { body: string; etag: string } | null = null;

async function readSpec(): Promise<{ body: string; etag: string }> {
  if (cache) return cache;
  const filePath = path.join(
    process.cwd(),
    'public',
    'specs',
    'brief-md',
    'v0.1.0',
    'spec.md',
  );
  const body = await fs.readFile(filePath, 'utf8');
  const { createHash } = await import('node:crypto');
  const etag = `"${createHash('sha256').update(body).digest('hex').slice(0, 16)}"`;
  cache = { body, etag };
  return cache;
}

export async function GET(req: Request): Promise<NextResponse> {
  const { body, etag } = await readSpec();
  const inm = req.headers.get('if-none-match');
  if (inm && inm.split(',').map((t) => t.trim()).includes(etag)) {
    return new NextResponse(null, {
      status: 304,
      headers: { ETag: etag },
    });
  }
  return new NextResponse(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800, immutable',
      ETag: etag,
      'Access-Control-Allow-Origin': '*',
    },
  });
}
