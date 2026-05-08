import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';
import {
  SPEC_TOPICS,
  SPEC_VERSION,
  SPEC_LAST_UPDATED,
  getSpecTopicsByLayer,
} from '@/lib/spec-topics';

const PAGE_URL = `${site.url}/spec`;

export const metadata: Metadata = {
  title: 'Spec topics — The Integrity Framework',
  description:
    "Per-topic reference into the Integrity Framework v" +
    SPEC_VERSION +
    ' spec: five failure modes, six Layer 1 vetoes, seven Layer 2 architectural constraints, seven Layer 3 operational guardrails. Each topic cites the published spec section.',
  alternates: { canonical: '/spec' },
  openGraph: {
    title: `Spec topics — ${site.shortName} v${SPEC_VERSION}`,
    description:
      'Per-topic reference into the Integrity Framework spec. Failure modes, vetoes, architectural constraints, operational guardrails. Each topic cites the published section.',
    url: PAGE_URL,
    type: 'website',
    siteName: site.name,
  },
};

const SECTIONS = [
  {
    layer: 'failure-mode' as const,
    title: 'Failure modes',
    intro:
      'Five recurring failure modes the framework is reverse-engineered from. Each is named so it can be defended against by name.',
  },
  {
    layer: 'layer-1' as const,
    title: 'Layer 1 — Pre-build vetoes',
    intro:
      'Six questions evaluated before a product gets built or before a major scope expansion. Wrong answer kills the product, not delays it.',
  },
  {
    layer: 'layer-2' as const,
    title: 'Layer 2 — Architectural constraints',
    intro:
      'Seven constraints baked into every product, CI-enforced where the codebase shape allows. The reference runner is integrity-cli.',
  },
  {
    layer: 'layer-3' as const,
    title: 'Layer 3 — Operational guardrails',
    intro:
      'Seven business practices that prevent the model from turning sour over time.',
  },
];

export default function SpecIndexPage() {
  return (
    <article className="container-wide py-16 md:py-20">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-4">
          Spec topics · v{SPEC_VERSION}
        </p>
        <h1>The framework, indexed by topic.</h1>
        <p className="mt-6 text-lg text-surface-700 leading-relaxed">
          Per-topic reference into the published v{SPEC_VERSION} spec. {SPEC_TOPICS.length} topics,
          one page each, every page citing the exact spec section it indexes. The frozen full-spec
          wording lives at{' '}
          <Link href="/framework/v1" className="text-brand-700 underline hover:text-brand-800">
            /framework/v1
          </Link>
          .
        </p>
        <p className="mt-3 text-base text-surface-600">
          Spec last updated {SPEC_LAST_UPDATED}. Topic pages are an indexed view; they don&apos;t
          replace the canonical spec URL.
        </p>
      </header>

      {SECTIONS.map((section) => {
        const topics = getSpecTopicsByLayer(section.layer);
        return (
          <section key={section.layer} className="mt-12 max-w-3xl">
            <h2>{section.title}</h2>
            <p className="mt-3 text-surface-700">{section.intro}</p>
            <ul className="mt-6 space-y-3">
              {topics.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/spec/${t.slug}`}
                    className="block rounded-lg border border-surface-200 bg-white p-5 hover:border-brand-600 transition-colors no-underline"
                  >
                    <p className="font-mono text-[11px] uppercase tracking-widest text-brand-600">
                      {t.specSection}
                    </p>
                    <p className="mt-1 font-display text-lg font-semibold text-surface-900">
                      {t.title}
                    </p>
                    <p className="mt-2 text-sm text-surface-700 leading-relaxed">{t.oneLine}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <section className="mt-12 max-w-3xl rounded-xl border border-surface-200 bg-surface-50 p-6">
        <h2 className="text-lg">Implementations and tiers</h2>
        <p className="mt-3 text-surface-700">
          The Layer 2 constraints are CI-enforced by reference implementations — see{' '}
          <Link href="/implementation" className="text-brand-700 underline hover:text-brand-800">
            /implementation
          </Link>{' '}
          for the languages and tools that ship a working reference parser or runner today. The
          tiers a product can carry under the framework live at{' '}
          <Link href="/certifications" className="text-brand-700 underline hover:text-brand-800">
            /certifications
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
