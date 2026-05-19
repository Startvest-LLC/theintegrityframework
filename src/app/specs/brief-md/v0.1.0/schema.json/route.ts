// GET /specs/brief-md/v0.1.0/schema.json
//
// Canonical home of the brief.md v0.1.0 JSON Schema. Tools that need
// to validate a brief.md document against the spec fetch this URL.
//
// The schema content is colocated under public/specs/brief-md/v0.1.0
// so the file is the source of truth (one place to edit, one place to
// serve). Cache aggressively — the schema is immutable per its version
// segment in the URL; v0.2.0 will live at a different path.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-static';
export const revalidate = false;

let cache: { body: string; etag: string } | null = null;

async function readSchema(): Promise<{ body: string; etag: string }> {
  if (cache) return cache;
  const filePath = path.join(
    process.cwd(),
    'public',
    'specs',
    'brief-md',
    'v0.1.0',
    'schema.json',
  );
  const body = await fs.readFile(filePath, 'utf8');
  // Stable ETag derived from content; immutable per-version so this
  // never changes for a given URL.
  const { createHash } = await import('node:crypto');
  const etag = `"${createHash('sha256').update(body).digest('hex').slice(0, 16)}"`;
  cache = { body, etag };
  return cache;
}

export async function GET(req: Request): Promise<NextResponse> {
  const { body, etag } = await readSchema();
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
      'Content-Type': 'application/schema+json; charset=utf-8',
      // Schema is immutable per version segment in the URL — aggressive cache.
      'Cache-Control': 'public, max-age=86400, s-maxage=604800, immutable',
      ETag: etag,
      // Permissive CORS so any tool fetching cross-origin can validate.
      'Access-Control-Allow-Origin': '*',
    },
  });
}
