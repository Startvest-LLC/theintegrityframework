import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

const PAGE_URL = `${site.url}/framework/cases`;

export const metadata: Metadata = {
  title: 'Case studies',
  description:
    'Case studies show the Integrity Framework working in real situations — both as a teaching device against public failures, and as a self-correcting standard when applied to real products.',
  alternates: { canonical: '/framework/cases' },
  openGraph: {
    title: 'Case studies — The Integrity Framework',
    description:
      'Case studies show the framework working in real situations: external failures and internal portfolio audits.',
    url: PAGE_URL,
    type: 'website',
    siteName: site.name,
  },
};

const CASES = [
  {
    slug: 'delve',
    title: 'Delve, walked through the framework',
    summary:
      'First public case study under v1.0. Walks the publicly-reported allegations against Delve, an AI compliance startup separated from Y Combinator in April 2026, through the five failure modes and the six-row vendor scorecard. Score: 0 / 6.',
    kind: 'External — public reporting',
    date: '2026-04-25',
  },
  {
    slug: 'fieldledger',
    title: 'FieldLedger, the first portfolio audit',
    summary:
      "First internal portfolio audit. 14 PASS / 5 PARTIAL or NEEDS UPDATE / 1 DEFERRED / 0 FAIL across 20 dimensions. Surfaced two false negatives in the framework's own rule set, revised in base manifest v1.3.0 and v1.4.0.",
    kind: 'Internal — portfolio audit',
    date: '2026-04-28',
  },
  {
    slug: 'claritylift',
    title: 'ClarityLift, the documentation-drift audit',
    summary:
      "Second internal portfolio audit. 13 PASS / 6 PARTIAL or NEEDS UPDATE / 1 BUYER-DRIVEN / 0 FAIL across 22 dimensions. Two of three failures were claims in INTEGRITY.md that referenced code never actually shipped — three days after the entry was written. Drove HIGH-SV-INTEGRITY-MD-CLAIMS-VERIFIABLE in base manifest v1.5.0.",
    kind: 'Internal — portfolio audit',
    date: '2026-04-28',
  },
  {
    slug: 'idealift',
    title: 'IdeaLift, retroactive TIF on a non-compliance product',
    summary:
      "Third internal portfolio audit. The reference for what TIF looks like when applied to a product not designed against it. Most dimensions are honestly N/A. Drove v1.6.0 (monorepo glob widening) and v1.7.0 (CLAIMS-VERIFIABLE extended to scan Outstanding Risks for reverse drift).",
    kind: 'Internal — portfolio audit',
    date: '2026-04-29',
  },
  {
    slug: 'hireposture',
    title: 'Hireposture, the candidate-data calibration',
    summary:
      "Fourth internal portfolio audit. 16 PASS / 3 PARTIAL or NEEDS UPDATE / 1 OUT-OF-SEGMENT / 0 FAIL across 20 dimensions. Surfaced the input-data-provenance vs output-attestation-provenance distinction. Drove v1.8.0 — accepting snake_case marker variants like signed_by_user_id and customer_attested.",
    kind: 'Internal — portfolio audit',
    date: '2026-04-29',
  },
  {
    slug: 'adacompliancedocs',
    title: 'adacompliancedocs, the validation-gate axis',
    summary:
      "Fifth internal portfolio audit. Surfaced a structurally new Layer 2 shape — customer-attestation-validation-gate. A customer-attested status field cannot publish until system-verified evidence supports it. Drove v1.9.0, the third C3 axis.",
    kind: 'Internal — portfolio audit',
    date: '2026-04-29',
  },
  {
    slug: 'marketing-agent',
    title: 'marketing-agent, the constraint-file pattern',
    summary:
      'Sixth internal portfolio audit. Internal Startvest tooling defended against marketing-automation failure modes by an explicit 29-item constraint file with kill-switch discipline. A different shape than the framework\'s code-pattern CI rules — being watched for in future audits, not yet codified.',
    kind: 'Internal — portfolio audit',
    date: '2026-04-29',
  },
];

export default function FrameworkCasesIndexPage() {
  return (
    <article className="container-wide py-16 md:py-20">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-4">
          Case studies
        </p>
        <h1>The framework, walked.</h1>
        <p className="mt-6 text-lg text-surface-600 leading-relaxed">
          Case studies show the framework working in real situations. Two kinds, both useful for
          different reasons.
        </p>
        <ul className="mt-4 space-y-3 text-base text-surface-700 list-disc list-inside">
          <li>
            <strong>External cases</strong> walk publicly-reported failures through the framework
            and ask: would the framework have caught this? Teaching material, citing public
            reporting.
          </li>
          <li>
            <strong>Internal cases</strong> are real audits of products in the Startvest
            portfolio. They show the framework operating as intended and, occasionally, what
            happens when reality finds a gap in the framework itself.
          </li>
        </ul>
      </header>

      <section className="mt-12 max-w-3xl space-y-6">
        {CASES.map((c) => (
          <Link
            key={c.slug}
            href={`/framework/cases/${c.slug}`}
            className="block rounded-xl border border-surface-200 bg-white p-6 hover:border-brand-600 transition-colors no-underline"
          >
            <div className="flex items-baseline justify-between gap-3 mb-3 flex-wrap">
              <p className="font-mono text-xs uppercase tracking-widest text-brand-600">
                {c.kind} · {c.date}
              </p>
            </div>
            <h2 className="font-display text-xl md:text-2xl font-semibold text-surface-900 mb-2">
              {c.title}
            </h2>
            <p className="text-surface-700 leading-relaxed">{c.summary}</p>
            <p className="mt-3 text-sm text-brand-700">Read the case study →</p>
          </Link>
        ))}
      </section>

      <section className="mt-12 max-w-3xl">
        <h2>What comes next</h2>
        <p className="mt-3 text-surface-700">
          The first portfolio audit cycle ran across six product types over two days
          (2026-04-28 / 2026-04-29). PRAPI is the seventh and is scheduled for v0.1 ship — its
          codebase doesn&apos;t exist yet. Quarterly cross-product re-audits begin ~July 2026.
          See the{' '}
          <Link href="/framework/audit-log" className="text-brand-700 hover:text-brand-800 underline">
            audit log
          </Link>{' '}
          for the v1.2.0 → v1.10.0 base-manifest revisions and which audit triggered each.
        </p>
        <p className="mt-3 text-surface-700">
          External case suggestions welcome at{' '}
          <a
            className="text-brand-700 hover:text-brand-800 underline"
            href="mailto:integrity@startvest.ai"
          >
            integrity@startvest.ai
          </a>
          . We work from public reporting only.
        </p>
      </section>
    </article>
  );
}
