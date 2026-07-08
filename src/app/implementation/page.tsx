import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';
import { IMPLEMENTATIONS } from '@/lib/implementations';

const PAGE_URL = `${site.url}/implementation`;

export const metadata: Metadata = {
  title: 'Reference implementations — The Integrity Framework',
  description:
    'Reference implementations of the Integrity Framework: integrity-cli (Layer 2 runner), brief-core / brief-cli (brief.md spec), GitHub Actions workflow, INTEGRITY.md authoring template. Real implementations only.',
  alternates: { canonical: '/implementation' },
  openGraph: {
    title: 'Reference implementations — The Integrity Framework',
    description:
      "Reference implementations of the Integrity Framework. Real implementations only — pages for languages or tools without a working parser are deliberately absent.",
    url: PAGE_URL,
    type: 'website',
    siteName: site.name,
  },
};

export default function ImplementationsIndexPage() {
  return (
    <article className="container-wide py-16 md:py-20">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-4">
          Reference implementations
        </p>
        <h1>How the framework actually runs.</h1>
        <p className="mt-6 text-lg text-surface-700 leading-relaxed">
          The Layer 2 architectural constraints are CI-enforced by reference implementations. The
          list below covers what ships today: one live runner, one live integration, two pre-launch
          libraries, one authoring convention. {IMPLEMENTATIONS.length} pages.
        </p>
        <p className="mt-3 text-base text-surface-600">
          Drop rule from the framework spec: a language without a working parser doesn&apos;t get a
          page. Python, Go, Rust, and other ports are absent until real implementations ship.
        </p>
      </header>

      <section className="mt-12 max-w-3xl space-y-4">
        {IMPLEMENTATIONS.map((impl) => (
          <Link
            key={impl.slug}
            href={`/implementation/${impl.slug}`}
            className="block rounded-xl border border-surface-200 bg-white p-6 hover:border-brand-600 transition-colors no-underline"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
              <p className="font-mono text-xs uppercase tracking-widest text-brand-600">
                {impl.kind === 'cli'
                  ? 'CLI'
                  : impl.kind === 'library'
                    ? 'Library'
                    : 'Integration'}
                {' · '}
                {impl.status === 'live' ? 'Live' : 'Pre-launch'}
              </p>
              {impl.packageName && (
                <span className="font-mono text-xs text-surface-500">{impl.packageName}</span>
              )}
            </div>
            <h2 className="font-display text-xl md:text-2xl font-semibold text-surface-900 mb-2">
              {impl.title}
            </h2>
            <p className="text-surface-700 leading-relaxed">{impl.oneLine}</p>
            <p className="mt-3 text-sm text-brand-700">Read the implementation guide →</p>
          </Link>
        ))}
      </section>

      <section className="mt-12 max-w-3xl rounded-xl border border-surface-200 bg-surface-50 p-6">
        <h2 className="text-lg">Spec context</h2>
        <p className="mt-3 text-surface-700">
          Each implementation page links back to the spec topics it covers. Start at{' '}
          <Link href="/spec" className="text-brand-700 underline hover:text-brand-800">
            /spec
          </Link>{' '}
          for the topic-by-topic index, or{' '}
          <Link href="/framework/v1" className="text-brand-700 underline hover:text-brand-800">
            /framework/v1
          </Link>{' '}
          for the frozen full-spec wording.
        </p>
      </section>
    </article>
  );
}
