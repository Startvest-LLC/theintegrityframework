import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { listingSchema, type Listing } from '@/lib/listings';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const REPO_OWNER = 'Startvest-LLC';
const REPO_NAME = 'theintegrityframework';

// Accept the same shape as a finalized listing, plus a contact email and an
// optional honeypot field. Honeypot rejects bots that fill every input —
// humans don't see this field, bots do.
const submissionSchema = z.object({
  listing: listingSchema,
  contactEmail: z.string().email().max(254),
  contactName: z.string().min(1).max(120).optional(),
  notes: z.string().max(2000).optional(),
  // Honeypot: real users never set this. If present, treat as bot.
  website: z.string().max(500).optional(),
});

function buildIssueBody(input: z.infer<typeof submissionSchema>): string {
  const { listing, contactEmail, contactName, notes } = input;
  const lines: string[] = [];
  lines.push(`## New listing submission`);
  lines.push('');
  lines.push(`**Product:** ${listing.name}`);
  lines.push(`**Tier:** ${listing.tier}`);
  lines.push(`**Operator:** ${listing.operator.name}${listing.operator.isDirectoryOperator ? ' (operator-listee disclosure)' : ''}`);
  lines.push(`**Submitter:** ${contactName ? `${contactName} <${contactEmail}>` : contactEmail}`);
  lines.push('');
  lines.push(`### Description`);
  lines.push('');
  lines.push(listing.description);
  lines.push('');
  lines.push(`### Artifact links`);
  lines.push('');
  lines.push(`- Homepage: ${listing.homepageUrl}`);
  lines.push(`- INTEGRITY.md: ${listing.integrityMdUrl}`);
  if (listing.silverCredential) {
    if (listing.silverCredential.kind === 'methodology-page') {
      lines.push(`- Silver credential (methodology page): ${listing.silverCredential.url}`);
    } else {
      lines.push(`- Silver credential (integrity-cli output): ${listing.silverCredential.outputUrl}`);
      if (listing.silverCredential.commitSha) {
        lines.push(`  - Commit SHA: \`${listing.silverCredential.commitSha}\``);
      }
    }
  }
  lines.push('');
  if (notes) {
    lines.push(`### Submitter notes`);
    lines.push('');
    lines.push(notes);
    lines.push('');
  }
  lines.push(`### Listing JSON (ready for data/listings.json)`);
  lines.push('');
  lines.push('```json');
  lines.push(JSON.stringify(listing, null, 2));
  lines.push('```');
  lines.push('');
  lines.push(`---`);
  lines.push(`Auto-generated from the form at https://theintegrityframework.org/submit/form`);
  lines.push(`Review SLA: 14 calendar days from this issue's creation date.`);
  return lines.join('\n');
}

async function createIssue(token: string, title: string, body: string): Promise<{ number: number; url: string }> {
  const res = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',
        'User-Agent': 'theintegrityframework-submission-form',
      },
      body: JSON.stringify({
        title,
        body,
        labels: ['submission', 'review-needed'],
      }),
    },
  );
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`GitHub issue creation failed: HTTP ${res.status} ${text.slice(0, 200)}`);
  }
  const data = (await res.json()) as { number: number; html_url: string };
  return { number: data.number, url: data.html_url };
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = submissionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        issues: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  // Honeypot: silently 200 so bots don't learn the field is checked, but
  // never actually create the issue.
  if (parsed.data.website && parsed.data.website.length > 0) {
    return NextResponse.json({ ok: true, queued: false });
  }

  const token = process.env.SUBMISSION_GH_TOKEN;
  if (!token) {
    console.error('[/api/submit] SUBMISSION_GH_TOKEN not configured');
    return NextResponse.json(
      {
        error:
          'Submission endpoint is not configured on this deploy. Use the email path at integrity@startvest.ai instead, or open an issue manually at github.com/Startvest-LLC/theintegrityframework.',
      },
      { status: 503 },
    );
  }

  const title = `Submission: ${parsed.data.listing.name} (${parsed.data.listing.tier})`;
  const issueBody = buildIssueBody(parsed.data);

  try {
    const issue = await createIssue(token, title, issueBody);
    return NextResponse.json({
      ok: true,
      issueNumber: issue.number,
      issueUrl: issue.url,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[/api/submit] failed:', msg);
    return NextResponse.json(
      {
        error:
          'Could not create the submission issue. The email path at integrity@startvest.ai is always available as a fallback.',
      },
      { status: 502 },
    );
  }
}
