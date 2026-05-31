import Link from 'next/link';
import { TierBadge } from '@/components/TierBadge';
import { getDirectoryMeta } from '@/lib/listings';

const SITE = 'https://theintegrityframework.org';
const TERM_SET = { '@type': 'DefinedTermSet', name: 'Integrity Framework vocabulary', url: `${SITE}/framework/v1` };

// DefinedTerm blocks so AI Overviews have a Wikipedia-style definition to cite
// for "integrity framework", "bronze/silver/gold tier", etc. The site ranks #1
// for these terms but was not being cited because no DefinedTerm/FAQPage schema
// existed. Descriptions are sourced verbatim-in-spirit from the page content.
const definedTerms = [
  {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: 'Integrity Framework',
    description:
      'The Integrity Framework is a published standard for product trustworthiness for sub-enterprise AI tools, where SOC 2 does not apply. Products are evaluated against it and listed in a public directory with a tier badge per listing.',
    url: SITE,
    inDefinedTermSet: TERM_SET,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: 'Integrity Framework Bronze tier',
    description:
      'Bronze is the entry tier of the Integrity Framework. It requires a public INTEGRITY.md at the repo or product website with all six Layer 1 vetoes self-mapped. About half a day of honest reflection for a thoughtful founder.',
    url: `${SITE}/#tiers`,
    inDefinedTermSet: TERM_SET,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: 'Integrity Framework Silver tier',
    description:
      'Silver is the Integrity Framework tier above Bronze. It requires everything in Bronze, plus one of: integrity-cli passing green against the public repo, or a public methodology page with a versioned changelog.',
    url: `${SITE}/#tiers`,
    inDefinedTermSet: TERM_SET,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: 'Integrity Framework Gold tier',
    description:
      'Gold is a deferred Integrity Framework tier, reserved for a future framework version. The directory does not currently award Gold and will not retrofit a tier no one at this segment can reach.',
    url: `${SITE}/#tiers`,
    inDefinedTermSet: TERM_SET,
  },
];

const faqPage = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the Integrity Framework?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Integrity Framework is a published standard for product trustworthiness, built for sub-enterprise AI tools where SOC 2 is the wrong shape. Products are evaluated against it and listed in a public directory with a tier badge. Buyers use it to vet AI tools; founders use it to demonstrate framework conformance for their segment.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Bronze tier?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bronze is the entry tier. It requires a public INTEGRITY.md at the repo or product website, with all six Layer 1 vetoes self-mapped. It takes about half a day of honest reflection for a thoughtful founder.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Silver tier?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Silver is everything in Bronze plus one credential: either integrity-cli passing green against the public repo, or a public methodology page with a versioned changelog. The founder picks the credential that fits the product shape.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between Bronze and Silver?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bronze requires a self-mapped public INTEGRITY.md against the six Layer 1 vetoes. Silver requires Bronze plus a verifiable credential: integrity-cli green against the public repo, or a versioned, changelogged methodology page. Bronze is self-attestation; Silver adds machine- or methodology-level verification.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a Gold tier?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not yet. Gold is deferred to a future framework version. The directory will not retrofit a tier no one at this segment can currently reach.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does an Integrity Framework listing cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nothing. Listings are not paid placement. No founder pays to be listed. Submissions are reviewed manually, with a 14-day review SLA from submission to first response.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I upgrade from Bronze to Silver?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Add one Silver credential to your Bronze listing: get integrity-cli passing green against your public repo, or publish a methodology page with a versioned changelog. Then resubmit. Framework version bumps trigger re-verification.',
      },
    },
  ],
};

export default function HomePage() {
  const meta = getDirectoryMeta();

  return (
    <>
      {definedTerms.map((term, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(term) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
      <section className="border-b border-surface-200">
        <div className="container-wide py-20 md:py-28">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-4">
            The Integrity Framework Directory
          </p>
          <h1 className="max-w-3xl">
            A trust signal for sub-enterprise AI tools, where SOC 2 does not apply.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-surface-600">
            The Integrity Framework is a published standard for product trustworthiness. The directory
            lists products evaluated against it, with a tier badge per listing. Buyers use it to vet AI
            tools when SOC 2 is the wrong shape. Founders use it to demonstrate framework conformance
            for their segment.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/listings"
              className="inline-flex items-center rounded-md bg-brand-700 px-5 py-3 text-sm font-medium text-white no-underline hover:bg-brand-800"
            >
              Browse {meta.activeCount} listings
            </Link>
            <Link
              href="/framework"
              className="inline-flex items-center rounded-md border border-surface-300 px-5 py-3 text-sm font-medium text-surface-800 no-underline hover:border-surface-400"
            >
              Read the framework
            </Link>
          </div>
        </div>
      </section>

      <section id="tiers" className="border-b border-surface-200 bg-surface-50 scroll-mt-20">
        <div className="container-wide py-16 md:py-20">
          <h2>Two tiers</h2>
          <p className="mt-3 max-w-2xl text-surface-600">
            Each listing carries one of two tier badges. The framework specifies the gates for each.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-surface-200 bg-white p-6">
              <TierBadge tier="bronze" />
              <h3 className="mt-4">Bronze</h3>
              <p className="mt-2 text-surface-600">
                Public INTEGRITY.md at repo or product website, with all six Layer 1 vetoes self-mapped.
                About half a day of honest reflection for a thoughtful founder.
              </p>
            </div>
            <div className="rounded-lg border border-surface-200 bg-white p-6">
              <TierBadge tier="silver" />
              <h3 className="mt-4">Silver</h3>
              <p className="mt-2 text-surface-600">
                Bronze, plus one of: <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">integrity-cli</code>{' '}
                green against the public repo, or a public methodology page with versioned changelog.
                Founder picks the credential that fits the product shape.
              </p>
            </div>
          </div>
          <p className="mt-6 text-sm text-surface-500">
            Gold is deferred to a future framework version. The directory will not retrofit a tier no one
            at this segment can reach.
          </p>
        </div>
      </section>

      <section className="border-b border-surface-200">
        <div className="container-wide py-16 md:py-20">
          <h2>How a listing gets here</h2>
          <ol className="mt-6 max-w-2xl space-y-4 text-surface-700 list-decimal list-inside">
            <li>Founder submits the listing with the required artifact links.</li>
            <li>Startvest reads the INTEGRITY.md and verifies the tier credential.</li>
            <li>Approved listings publish. Rejected listings get specific feedback.</li>
            <li>Quarterly re-scans. Framework version bumps trigger re-verification.</li>
            <li>Failed re-scans downgrade or delist with a public note.</li>
          </ol>
          <p className="mt-6 text-sm text-surface-500">
            Review SLA: 14 calendar days from submission to first response.
          </p>
        </div>
      </section>

      <section className="bg-surface-50">
        <div className="container-wide py-16 md:py-20">
          <h2>What this is not</h2>
          <ul className="mt-6 max-w-2xl space-y-2 text-surface-700">
            <li>Not a SOC 2 substitute. Different segment, different signal.</li>
            <li>Not a rating platform. The tier IS the rating.</li>
            <li>Not a comparison site. Listings stand alone.</li>
            <li>Not a paid placement. No founder pays to be listed.</li>
          </ul>
        </div>
      </section>

      <section id="faq" className="border-t border-surface-200 scroll-mt-20">
        <div className="container-wide py-16 md:py-20">
          <h2>Frequently asked questions</h2>
          <dl className="mt-8 max-w-2xl space-y-8">
            {faqPage.mainEntity.map((qa) => (
              <div key={qa.name}>
                <dt className="font-semibold text-surface-900">{qa.name}</dt>
                <dd className="mt-2 text-surface-600">{qa.acceptedAnswer.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
