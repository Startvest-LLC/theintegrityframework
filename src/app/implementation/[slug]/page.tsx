import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { site } from '@/lib/site';
import {
  IMPLEMENTATIONS,
  getAllImplementationSlugs,
  getImplementationBySlug,
} from '@/lib/implementations';
import { SPEC_TOPICS } from '@/lib/spec-topics';

export function generateStaticParams() {
  return getAllImplementationSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const impl = getImplementationBySlug(slug);
  if (!impl) return { title: 'Implementation not found' };
  const url = `${site.url}/implementation/${impl.slug}`;
  return {
    title: `${impl.title} — Integrity Framework`,
    description: impl.oneLine,
    alternates: { canonical: `/implementation/${impl.slug}` },
    openGraph: {
      title: `${impl.title} — ${site.shortName}`,
      description: impl.oneLine,
      url,
      type: 'article',
      siteName: site.name,
    },
  };
}

const STATUS_COPY: Record<string, { label: string; tone: 'pass' | 'warn' }> = {
  live: { label: 'Live · public package', tone: 'pass' },
  'pre-launch': { label: 'Pre-launch · restricted access', tone: 'warn' },
};

export default async function ImplementationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const impl = getImplementationBySlug(slug);
  if (!impl) notFound();

  const status = STATUS_COPY[impl.status];
  const topics = impl.coversTopics
    .map((s) => SPEC_TOPICS.find((t) => t.slug === s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  const url = `${site.url}/implementation/${impl.slug}`;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: `${impl.title} — Integrity Framework`,
    description: impl.oneLine,
    author: { '@type': 'Organization', name: 'Startvest LLC', url: 'https://startvest.ai' },
    publisher: { '@type': 'Organization', name: 'Startvest LLC' },
    inLanguage: 'en-US',
    mainEntityOfPage: url,
    url,
    isBasedOn: `${site.url}/framework/v1`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="container-wide py-16 md:py-20">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-4">
            <Link href="/implementation" className="text-brand-600 no-underline hover:text-brand-700">
              Implementations
            </Link>{' '}
            · {impl.kind === 'cli' ? 'CLI' : impl.kind === 'library' ? 'Library' : 'Integration'}
          </p>
          <h1>{impl.title}</h1>
          <p className="mt-6 text-lg text-surface-700 leading-relaxed">{impl.oneLine}</p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono uppercase tracking-widest ${
                status.tone === 'pass'
                  ? 'bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200'
                  : 'bg-bronze-50 text-bronze-700 ring-1 ring-inset ring-bronze-200'
              }`}
            >
              {status.label}
            </span>
            {impl.packageName && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono bg-surface-100 text-surface-800 ring-1 ring-inset ring-surface-200">
                {impl.packageName}
              </span>
            )}
            {impl.repoUrl && (
              <a
                href={impl.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-brand-700 underline hover:text-brand-800"
              >
                Repo →
              </a>
            )}
          </div>

          {impl.statusNote && (
            <p className="mt-4 rounded-md border border-bronze-200 bg-bronze-50 px-4 py-3 text-sm text-bronze-800">
              <span className="font-medium">Status note.</span> {impl.statusNote}
            </p>
          )}
        </header>

        <section className="mt-12 max-w-3xl">
          <h2>Install</h2>
          <pre className="mt-3 rounded-xl border border-surface-200 bg-surface-900 text-surface-100 p-5 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap break-words">
            {impl.install}
          </pre>
        </section>

        <section className="mt-12 max-w-3xl">
          <h2>Usage</h2>
          <div className="mt-6 space-y-8">
            {impl.usage.map((u, i) => (
              <div key={i}>
                <h3 className="text-lg font-semibold text-surface-900">{u.heading}</h3>
                <pre className="mt-3 rounded-xl border border-surface-200 bg-surface-900 text-surface-100 p-5 font-mono text-sm leading-relaxed overflow-x-auto whitespace-pre">
                  {u.code}
                </pre>
                {u.note && <p className="mt-2 text-sm text-surface-600">{u.note}</p>}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 max-w-3xl space-y-5 text-surface-700 leading-relaxed">
          <h2>About this implementation</h2>
          {impl.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>

        {topics.length > 0 && (
          <section className="mt-12 max-w-3xl">
            <h2>Spec topics this implementation covers</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {topics.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/spec/${t.slug}`}
                    className="block rounded-lg border border-surface-200 bg-white p-4 hover:border-brand-600 transition-colors no-underline"
                  >
                    <p className="font-mono text-[11px] uppercase tracking-widest text-brand-600">
                      {t.layerLabel}
                    </p>
                    <p className="mt-1 font-medium text-surface-900">{t.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </>
  );
}
