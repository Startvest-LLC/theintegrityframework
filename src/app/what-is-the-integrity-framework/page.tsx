import type { Metadata } from 'next';
import Link from 'next/link';
import { TierBadge } from '@/components/TierBadge';
import { site } from '@/lib/site';

const PAGE_URL = `${site.url}/what-is-the-integrity-framework`;

export const metadata: Metadata = {
  title: 'What is The Integrity Framework?',
  description:
    'The Integrity Framework is a published standard for product trustworthiness aimed at sub-enterprise AI tools where SOC 2 does not apply. Founders self-map their product against six pre-build vetoes, post a public INTEGRITY.md, and publish to a tier-badged directory.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'What is The Integrity Framework?',
    description:
      'A published standard for product trustworthiness for sub-enterprise AI tools where SOC 2 does not apply. Bronze and Silver tier badges.',
    type: 'article',
    url: PAGE_URL,
    siteName: site.name,
  },
};

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: 'What is The Integrity Framework?',
    a: 'The Integrity Framework is a published standard for product trustworthiness aimed at sub-enterprise AI tools, the segment where SOC 2 audits do not apply. It defines six pre-build vetoes, seven architectural constraints, and seven operational guardrails, and publishes a public directory of products that have self-mapped against them at the Bronze or Silver tier.',
  },
  {
    q: 'Who is The Integrity Framework for?',
    a: 'Two audiences. Buyers vetting AI tools at the team or department level where SOC 2 is the wrong shape. Founders building sub-enterprise AI products who want a credential that demonstrates trustworthiness without faking enterprise compliance.',
  },
  {
    q: 'What are the tiers?',
    a: 'Two tiers. Bronze: a public INTEGRITY.md at the repo or product website with all six Layer 1 vetoes self-mapped. Silver: Bronze plus one of either integrity-cli green against the public repo, or a public methodology page with a versioned changelog. Gold is deferred to a future framework version.',
  },
  {
    q: 'How is The Integrity Framework different from SOC 2?',
    a: 'SOC 2 is an audited control framework for service organizations, scoped at enterprise spend levels and priced accordingly. The Integrity Framework is a self-mapped standard with public artifacts that buyers can verify themselves. It is designed for the segment SOC 2 prices out — small AI tools, indie products, sub-$5K-ARR purchases.',
  },
  {
    q: 'How does a product get listed?',
    a: 'Founder submits the listing with the required artifact links. Startvest reads the INTEGRITY.md and verifies the tier credential. Approved listings publish with a tier badge. Quarterly re-scans run; framework version bumps trigger re-verification.',
  },
  {
    q: 'Is The Integrity Framework forkable?',
    a: 'Yes. The framework is published under CC BY 4.0 at the canonical URL. Anyone can fork it for their own segment. The directory at theintegrityframework.org indexes products that map against the canonical Startvest version of the framework.',
  },
  {
    q: 'Who runs The Integrity Framework?',
    a: 'The Integrity Framework is published and operated by Startvest LLC, a veteran-owned, SDVOSB-certified company. The directory and the canonical framework spec both live at theintegrityframework.org; the v1.0 spec is at theintegrityframework.org/framework/v1.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((it) => ({
    '@type': 'Question',
    name: it.q,
    acceptedAnswer: { '@type': 'Answer', text: it.a },
  })),
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'What is The Integrity Framework?',
  description:
    'A published standard for product trustworthiness aimed at sub-enterprise AI tools where SOC 2 does not apply.',
  author: { '@type': 'Organization', name: 'Startvest LLC', url: 'https://startvest.ai' },
  publisher: { '@type': 'Organization', name: 'Startvest LLC' },
  inLanguage: 'en-US',
  mainEntityOfPage: PAGE_URL,
  url: PAGE_URL,
  about: {
    '@type': 'DefinedTerm',
    name: 'The Integrity Framework',
    description:
      'A standard for product trustworthiness for sub-enterprise AI tools where SOC 2 does not apply.',
    inDefinedTermSet: 'https://theintegrityframework.org/framework/v1',
    termCode: 'integrity-framework',
  },
};

export default function WhatIsTheIntegrityFrameworkPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <article className="container-wide py-16 md:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-4">
            About the framework
          </p>

          <h1>What is The Integrity Framework?</h1>

          {/* Direct-answer paragraph: ~60 words, named entity in first sentence,
              extractable as a single AI Overview / Perplexity citation block. */}
          <p className="mt-6 text-lg text-surface-700 leading-relaxed">
            <strong>The Integrity Framework</strong> is a published standard for product
            trustworthiness aimed at sub-enterprise AI tools, the segment where SOC 2 audits do
            not apply. Founders self-map their product against six pre-build vetoes, post a public
            INTEGRITY.md, and the directory at theintegrityframework.org publishes them with a
            Bronze or Silver tier badge that buyers can verify on their own.
          </p>

          <h2 className="mt-12">Who it is for</h2>
          <p className="mt-3 text-surface-700 leading-relaxed">
            Two audiences. Both meet at the same gap.
          </p>
          <ul className="mt-4 list-disc pl-6 space-y-2 text-surface-700">
            <li>
              <strong>Buyers</strong> vetting AI tools at the team or department level, where SOC 2
              is the wrong shape — the spend is too small, the contract is too short, the
              purchase decision is one person, not procurement.
            </li>
            <li>
              <strong>Founders</strong> building sub-enterprise AI products who want a credential
              that demonstrates trustworthiness without faking enterprise compliance theater.
            </li>
          </ul>

          <h2 className="mt-12">The two tiers</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-surface-200 bg-white p-6">
              <TierBadge tier="bronze" />
              <h3 className="mt-4">Bronze</h3>
              <p className="mt-2 text-surface-600">
                A public <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">INTEGRITY.md</code> at
                the repo or product website, with all six Layer 1 vetoes self-mapped. About half a
                day of honest reflection for a thoughtful founder.
              </p>
            </div>
            <div className="rounded-lg border border-surface-200 bg-white p-6">
              <TierBadge tier="silver" />
              <h3 className="mt-4">Silver</h3>
              <p className="mt-2 text-surface-600">
                Bronze, plus one of: <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">integrity-cli</code>{' '}
                green against the public repo, or a public methodology page with a versioned
                changelog. Founder picks the credential that fits the product shape.
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm text-surface-500">
            Gold is deferred to a future framework version. The directory will not retrofit a tier
            no one at this segment can reach.
          </p>

          <h2 className="mt-12">How it works</h2>
          <ol className="mt-4 list-decimal pl-6 space-y-3 text-surface-700">
            <li>
              <strong>Read the framework.</strong> The canonical v1.0 spec lives at{' '}
              <Link href="/framework/v1" className="text-brand-700 underline">
                /framework/v1
              </Link>{' '}
              under CC BY 4.0. Forkable by design.
            </li>
            <li>
              <strong>Self-map your product.</strong> Write an INTEGRITY.md that addresses each of
              the six Layer 1 vetoes by name. Honest mappings only — the directory rejects
              cosmetic fills.
            </li>
            <li>
              <strong>Earn the credential (Silver only).</strong> Run integrity-cli against your
              public repo and ship the green output, or publish a versioned methodology page.
            </li>
            <li>
              <strong>Submit to the directory.</strong> The Startvest team reads the INTEGRITY.md
              and verifies the tier. Approved listings publish with a tier badge.
            </li>
            <li>
              <strong>Re-scanned quarterly.</strong> Framework version bumps trigger
              re-verification. Listings that drop tier are downgraded transparently.
            </li>
          </ol>

          <h2 className="mt-12">What The Integrity Framework is not</h2>
          <ul className="mt-4 list-disc pl-6 space-y-2 text-surface-700">
            <li>Not a substitute for SOC 2, ISO 27001, or HIPAA where those legitimately apply.</li>
            <li>Not an audit. The directory verifies artifacts, not procedures.</li>
            <li>Not a paid certification. Listings are free; the credential is the public artifact.</li>
            <li>Not enterprise theater. The framework names trust-arbitrage and theater-versus-substance as failure modes specifically.</li>
          </ul>

          <h2 className="mt-12">Frequently asked questions</h2>
          <dl className="mt-4 space-y-6">
            {faqs.map((it) => (
              <div key={it.q}>
                <dt className="font-semibold text-surface-900">{it.q}</dt>
                <dd className="mt-2 text-surface-700 leading-relaxed">{it.a}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/framework"
              className="inline-flex items-center rounded-md bg-brand-700 px-5 py-3 text-sm font-medium text-white no-underline hover:bg-brand-800"
            >
              Read the framework
            </Link>
            <Link
              href="/listings"
              className="inline-flex items-center rounded-md border border-surface-300 px-5 py-3 text-sm font-medium text-surface-800 no-underline hover:border-surface-400"
            >
              Browse the directory
            </Link>
            <Link
              href="/submit"
              className="inline-flex items-center rounded-md border border-surface-300 px-5 py-3 text-sm font-medium text-surface-800 no-underline hover:border-surface-400"
            >
              Submit a listing
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
