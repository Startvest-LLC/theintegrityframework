import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';
import { CERTIFICATIONS } from '@/lib/certifications';

const PAGE_URL = `${site.url}/certifications`;

export const metadata: Metadata = {
  title: 'Certification tiers — The Integrity Framework',
  description:
    'Two live tiers (Bronze, Silver) and one deferred (Gold). Bronze: public INTEGRITY.md self-mapping the six Layer 1 vetoes. Silver: Bronze plus integrity-cli green run or versioned methodology page.',
  alternates: { canonical: '/certifications' },
  openGraph: {
    title: 'Certification tiers — The Integrity Framework',
    description:
      'Two live tiers (Bronze, Silver) and one deferred (Gold). Each tier is a structural commitment readable by procurement reviewers.',
    url: PAGE_URL,
    type: 'website',
    siteName: site.name,
  },
};

export default function CertificationsIndexPage() {
  return (
    <article className="container-wide py-16 md:py-20">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-4">
          Certifications
        </p>
        <h1>Tiers a product can carry under the framework.</h1>
        <p className="mt-6 text-lg text-surface-700 leading-relaxed">
          Two live tiers (Bronze, Silver) and one deferred (Gold). Each tier corresponds to a
          structural commitment a product can make against the framework. The full tier wording
          lives at{' '}
          <Link
            href="/methodology#tiers"
            className="text-brand-700 underline hover:text-brand-800"
          >
            /methodology — Tiers
          </Link>
          .
        </p>
      </header>

      <section className="mt-12 max-w-3xl space-y-4">
        {CERTIFICATIONS.map((cert) => (
          <Link
            key={cert.slug}
            href={`/certifications/${cert.slug}`}
            className="block rounded-xl border border-surface-200 bg-white p-6 hover:border-brand-600 transition-colors no-underline"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3 mb-3">
              <p className="font-mono text-xs uppercase tracking-widest text-brand-600">
                {cert.title} tier
              </p>
              <span
                className={`font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded ${
                  cert.status === 'deferred'
                    ? 'bg-bronze-50 text-bronze-700 ring-1 ring-inset ring-bronze-200'
                    : 'bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200'
                }`}
              >
                {cert.status === 'deferred' ? 'Deferred' : 'Live'}
              </span>
            </div>
            <h2 className="font-display text-xl md:text-2xl font-semibold text-surface-900 mb-2">
              {cert.title}
            </h2>
            <p className="text-surface-700 leading-relaxed">{cert.oneLine}</p>
            <p className="mt-3 text-sm text-brand-700">Read the {cert.title} requirements →</p>
          </Link>
        ))}
      </section>

      <section className="mt-12 max-w-3xl rounded-xl border border-surface-200 bg-surface-50 p-6">
        <h2 className="text-lg">Submit a listing</h2>
        <p className="mt-3 text-surface-700">
          Submissions land at{' '}
          <Link href="/submit" className="text-brand-700 underline hover:text-brand-800">
            /submit
          </Link>
          . Three paths (form, GitHub PR, email). Free. 14-calendar-day review SLA.
        </p>
      </section>
    </article>
  );
}
