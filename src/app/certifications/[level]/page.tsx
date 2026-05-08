import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { site } from '@/lib/site';
import {
  CERTIFICATIONS,
  getAllCertificationSlugs,
  getCertificationBySlug,
} from '@/lib/certifications';

export function generateStaticParams() {
  return getAllCertificationSlugs().map((level) => ({ level }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ level: string }>;
}): Promise<Metadata> {
  const { level } = await params;
  const cert = getCertificationBySlug(level);
  if (!cert) return { title: 'Certification tier not found' };
  const url = `${site.url}/certifications/${cert.slug}`;
  return {
    title: `${cert.title} — Integrity Framework certification`,
    description: cert.oneLine,
    alternates: { canonical: `/certifications/${cert.slug}` },
    openGraph: {
      title: `${cert.title} certification — ${site.shortName}`,
      description: cert.oneLine,
      url,
      type: 'article',
      siteName: site.name,
    },
  };
}

export default async function CertificationDetailPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  const cert = getCertificationBySlug(level);
  if (!cert) notFound();

  const url = `${site.url}/certifications/${cert.slug}`;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${cert.title} certification — Integrity Framework`,
    description: cert.oneLine,
    author: { '@type': 'Organization', name: 'Startvest LLC', url: 'https://startvest.ai' },
    publisher: { '@type': 'Organization', name: 'Startvest LLC' },
    inLanguage: 'en-US',
    mainEntityOfPage: url,
    url,
    isBasedOn: `${site.url}/methodology#${cert.methodologyAnchor}`,
  };

  const isDeferred = cert.status === 'deferred';
  const others = CERTIFICATIONS.filter((c) => c.slug !== cert.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="container-wide py-16 md:py-20">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-4">
            <Link
              href="/certifications"
              className="text-brand-600 no-underline hover:text-brand-700"
            >
              Certifications
            </Link>{' '}
            · {cert.title}
          </p>
          <h1>{cert.title} tier</h1>
          <p className="mt-6 text-lg text-surface-700 leading-relaxed">{cert.oneLine}</p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono uppercase tracking-widest ${
                isDeferred
                  ? 'bg-bronze-50 text-bronze-700 ring-1 ring-inset ring-bronze-200'
                  : 'bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200'
              }`}
            >
              {isDeferred ? 'Deferred · future framework version' : 'Live · accepting submissions'}
            </span>
            <Link
              href={`/methodology#${cert.methodologyAnchor}`}
              className="text-sm text-brand-700 underline hover:text-brand-800"
            >
              Cite from /methodology →
            </Link>
          </div>
        </header>

        {cert.requirements.length > 0 && (
          <section className="mt-12 max-w-3xl">
            <h2>Requirements</h2>
            <ul className="mt-4 space-y-3 list-disc list-outside pl-5 text-surface-700 leading-relaxed">
              {cert.requirements.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </section>
        )}

        {cert.effort && (
          <section className="mt-12 max-w-3xl">
            <h2>Effort</h2>
            <p className="mt-3 text-surface-700 leading-relaxed">{cert.effort}</p>
          </section>
        )}

        {cert.howVerified && (
          <section className="mt-12 max-w-3xl">
            <h2>How it&apos;s verified</h2>
            <p className="mt-3 text-surface-700 leading-relaxed">{cert.howVerified}</p>
          </section>
        )}

        <section className="mt-12 max-w-3xl space-y-5 text-surface-700 leading-relaxed">
          <h2>About this tier</h2>
          {cert.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>

        {!isDeferred && (
          <section className="mt-12 max-w-3xl rounded-xl border border-surface-200 bg-surface-50 p-6">
            <h2 className="text-lg">Submit a {cert.title} listing</h2>
            <p className="mt-3 text-surface-700">
              Listings are submitted via the{' '}
              <Link href="/submit" className="text-brand-700 underline hover:text-brand-800">
                /submit
              </Link>{' '}
              page. Free, three submission paths (form, GitHub PR, email). Review SLA: 14 calendar
              days from submission to first response.
            </p>
          </section>
        )}

        <section className="mt-12 max-w-3xl">
          <h2>Other tiers</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {others.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/certifications/${c.slug}`}
                  className="block rounded-lg border border-surface-200 bg-white p-4 hover:border-brand-600 transition-colors no-underline"
                >
                  <p className="font-mono text-[11px] uppercase tracking-widest text-brand-600">
                    {c.status === 'deferred' ? 'Deferred' : 'Live'}
                  </p>
                  <p className="mt-1 font-medium text-surface-900">{c.title}</p>
                  <p className="mt-2 text-sm text-surface-700">{c.oneLine}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </>
  );
}
