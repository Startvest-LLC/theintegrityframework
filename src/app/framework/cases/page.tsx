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
      'Second case study. The Integrity Framework applied to a Startvest product. 14 PASS / 5 PARTIAL or NEEDS UPDATE / 1 DEFERRED / 0 FAIL across 20 dimensions. The audit also surfaced two false negatives in the framework\'s own rule set, which were revised in base manifest v1.3.0 and v1.4.0.',
    kind: 'Internal — portfolio audit',
    date: '2026-04-28',
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
          Each subsequent portfolio audit becomes a case study. ClarityLift, IdeaLift,
          ADAComplianceDocs, HirePosture, MA, and PRAPI are queued in that rough order. We
          publish the audit log even when the result is uncomfortable — the framework is
          worthless if its operators don&apos;t score themselves against it.
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
