import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { site } from '@/lib/site';
import {
  SPEC_TOPICS,
  SPEC_VERSION,
  SPEC_LAST_UPDATED,
  getAllSpecTopicSlugs,
  getSpecTopicBySlug,
} from '@/lib/spec-topics';

export function generateStaticParams() {
  return getAllSpecTopicSlugs().map((topic) => ({ topic }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic } = await params;
  const t = getSpecTopicBySlug(topic);
  if (!t) return { title: 'Spec topic not found' };
  const url = `${site.url}/spec/${t.slug}`;
  return {
    title: `${t.title} — Integrity Framework spec`,
    description: t.oneLine,
    alternates: { canonical: `/spec/${t.slug}` },
    openGraph: {
      title: `${t.title} — ${site.shortName} v${SPEC_VERSION}`,
      description: t.oneLine,
      url,
      type: 'article',
      siteName: site.name,
      publishedTime: `${SPEC_LAST_UPDATED}T00:00:00Z`,
      authors: ['Startvest LLC'],
    },
  };
}

export default async function SpecTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const t = getSpecTopicBySlug(topic);
  if (!t) notFound();

  const url = `${site.url}/spec/${t.slug}`;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: `${t.title} — Integrity Framework spec`,
    description: t.oneLine,
    author: { '@type': 'Organization', name: 'Startvest LLC', url: 'https://startvest.ai' },
    publisher: { '@type': 'Organization', name: 'Startvest LLC' },
    datePublished: `${SPEC_LAST_UPDATED}T00:00:00Z`,
    dateModified: `${SPEC_LAST_UPDATED}T00:00:00Z`,
    inLanguage: 'en-US',
    mainEntityOfPage: url,
    url,
    isBasedOn: `${site.url}/framework/v1#${t.specAnchor}`,
    version: SPEC_VERSION,
    license: 'https://creativecommons.org/licenses/by/4.0/',
  };

  const related = (t.relatedTopics ?? [])
    .map((slug) => SPEC_TOPICS.find((x) => x.slug === slug))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="container-wide py-16 md:py-20">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-4">
            <Link href="/spec" className="text-brand-600 no-underline hover:text-brand-700">
              Spec
            </Link>{' '}
            · {t.layerLabel} · v{SPEC_VERSION}
          </p>
          <h1>{t.title}</h1>
          <p className="mt-6 text-lg text-surface-700 leading-relaxed">{t.oneLine}</p>

          <div className="mt-6 inline-flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-wide text-surface-600 border border-surface-200 rounded-md px-3 py-1.5 bg-surface-50">
            <span>
              Spec section <b className="text-surface-900 font-medium">{t.specSection}</b>
            </span>
            <span className="text-surface-400">·</span>
            <span>
              <Link
                href={`/framework/v1#${t.specAnchor}`}
                className="text-surface-900 font-medium underline hover:text-brand-700"
              >
                cite v{SPEC_VERSION}
              </Link>
            </span>
            <span className="text-surface-400">·</span>
            <span>
              Last updated <b className="text-surface-900 font-medium">{SPEC_LAST_UPDATED}</b>
            </span>
          </div>
        </header>

        <section className="mt-12 max-w-3xl grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-brand-200 bg-brand-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-700 mb-2">
              Pass
            </p>
            <p className="text-surface-800 leading-relaxed">{t.passes}</p>
          </div>
          <div className="rounded-xl border border-bronze-200 bg-bronze-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-bronze-800 mb-2">
              Fail
            </p>
            <p className="text-surface-800 leading-relaxed">{t.fails}</p>
          </div>
        </section>

        <section className="mt-12 max-w-3xl space-y-5 text-surface-700 leading-relaxed">
          {t.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>

        {t.relatedCases && t.relatedCases.length > 0 && (
          <section className="mt-12 max-w-3xl">
            <h2>Surfaced by case study</h2>
            <p className="mt-3 text-surface-700">
              The following published case studies surfaced or refined this topic.
            </p>
            <ul className="mt-4 space-y-2 list-disc list-inside text-surface-700">
              {t.relatedCases.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/framework/cases/${slug}`}
                    className="text-brand-700 hover:text-brand-800 underline"
                  >
                    /framework/cases/{slug}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-12 max-w-3xl">
            <h2>Related topics</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/spec/${r.slug}`}
                    className="block rounded-lg border border-surface-200 bg-white p-4 hover:border-brand-600 transition-colors no-underline"
                  >
                    <p className="font-mono text-[11px] uppercase tracking-widest text-brand-600">
                      {r.layerLabel}
                    </p>
                    <p className="mt-1 font-medium text-surface-900">{r.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-12 max-w-3xl rounded-xl border border-surface-200 bg-surface-50 p-6">
          <h2 className="text-lg">Cite this topic</h2>
          <p className="mt-3 text-surface-700">
            This topic page is an indexed reference into the v{SPEC_VERSION} spec. The frozen wording
            lives at{' '}
            <Link href={`/framework/v1#${t.specAnchor}`} className="text-brand-700 underline">
              /framework/v1#{t.specAnchor}
            </Link>
            . Cite that URL when the wording matters.
          </p>
          <p className="mt-3 text-sm text-surface-500">
            Spec license: CC BY 4.0. Originated by Startvest LLC.
          </p>
        </section>
      </article>
    </>
  );
}
