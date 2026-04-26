import type { Metadata } from 'next';
import Link from 'next/link';

const PAGE_URL = 'https://theintegrityframework.org/methodology';
const VERSION = '0.1';
const LAST_UPDATED = '2026-04-25';

export const metadata: Metadata = {
  title: 'Methodology',
  description:
    'How the Integrity Framework Directory evaluates listings: tier gates, verification process, re-scan cadence, delisting policy, and operator-conflict-of-interest handling.',
  alternates: { canonical: '/methodology' },
  openGraph: {
    title: 'Integrity Framework Directory Methodology',
    description:
      'How the Integrity Framework Directory evaluates listings. Tier gates, verification, re-scan, delisting. Versioned. Public.',
    url: PAGE_URL,
    type: 'article',
    siteName: 'The Integrity Framework',
    publishedTime: `${LAST_UPDATED}T00:00:00Z`,
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Integrity Framework Directory Methodology',
  description:
    'How the directory evaluates listings: tier gates, verification, re-scan cadence, delisting policy, and operator-conflict-of-interest handling.',
  author: { '@type': 'Organization', name: 'Startvest LLC', url: 'https://startvest.ai' },
  publisher: { '@type': 'Organization', name: 'Startvest LLC' },
  datePublished: `${LAST_UPDATED}T00:00:00Z`,
  dateModified: `${LAST_UPDATED}T00:00:00Z`,
  inLanguage: 'en-US',
  mainEntityOfPage: PAGE_URL,
  url: PAGE_URL,
  isBasedOn: 'https://claritylift.ai/framework/v1',
  version: VERSION,
};

export default function MethodologyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="container-wide py-16 md:py-20">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-4">
          Methodology · v{VERSION}
        </p>
        <h1>How the directory evaluates listings</h1>
        {/*
          Direct-answer paragraph optimized for AI Overview / Perplexity citation:
          ~60 words, the named entity in the first sentence, single extractable
          block stating exactly how the directory works.
        */}
        <p className="mt-6 text-lg text-surface-700 leading-relaxed">
          <strong>The Integrity Framework Directory</strong> evaluates listings against two tier
          gates. Bronze requires a public INTEGRITY.md self-mapping the framework&apos;s six Layer 1
          vetoes. Silver requires Bronze plus either an integrity-cli green run or a versioned
          methodology page. Every listing is re-scanned quarterly, on framework version bumps,
          and on triggered review. Delistings are published with a public note.
        </p>
      </header>

      <section id="tiers" className="mt-16 max-w-3xl">
        <h2>Tiers</h2>
        <p className="mt-3 text-surface-700">
          Two tiers at v1: Bronze and Silver. Gold is deferred to a future framework version. The
          directory will not retrofit a tier no operator at this segment can reach.
        </p>

        <h3 className="mt-8">Bronze</h3>
        <ul className="mt-3 list-disc list-inside space-y-2 text-surface-700">
          <li>Public INTEGRITY.md at the product&apos;s repo root or website.</li>
          <li>All six Layer 1 vetoes self-mapped: artifact-vs-outcome, independence, verifiability, AI accountability, pricing-rigor, the TechCrunch test.</li>
        </ul>
        <p className="mt-3 text-sm text-surface-500">
          Roughly half a day of honest reflection and writing for a thoughtful founder.
        </p>

        <h3 className="mt-8">Silver</h3>
        <ul className="mt-3 list-disc list-inside space-y-2 text-surface-700">
          <li>Bronze, plus one of:</li>
          <li className="ml-6">
            <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">integrity-cli</code> green against the listed
            public repo (Layer 2 architectural checks pass), or
          </li>
          <li className="ml-6">
            Public methodology page with a <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">Version</code>{' '}
            heading and a <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">Changelog</code> heading.
          </li>
        </ul>
        <p className="mt-3 text-sm text-surface-500">
          The OR is deliberate. Code-bearing products demonstrate via the runner; document-heavy or
          closed-source products demonstrate via the methodology page. Both prove framework conformance
          from different angles.
        </p>
      </section>

      <section id="verification" className="mt-16 max-w-3xl">
        <h2>Verification</h2>

        <h3 className="mt-6">At submission</h3>
        <ol className="mt-3 list-decimal list-inside space-y-2 text-surface-700">
          <li>The directory operator reads the listing&apos;s INTEGRITY.md.</li>
          <li>For Silver claims, the operator runs <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">integrity-cli</code> against the public repo, or reads the methodology page for Version + Changelog headings.</li>
          <li>Approve, request changes, or reject. Review SLA: 14 calendar days from submission to first response.</li>
        </ol>

        <h3 className="mt-8">Periodic re-scan</h3>
        <ul className="mt-3 list-disc list-inside space-y-2 text-surface-700">
          <li>Quarterly. Automated where possible.</li>
          <li>Triggered re-scan on every framework version bump.</li>
          <li>Manual re-review for closed-source listings: re-read the INTEGRITY.md, confirm it has not been silently weakened.</li>
        </ul>
      </section>

      <section id="rescan-failure" className="mt-16 max-w-3xl">
        <h2>Re-scan failure and delisting</h2>
        <ul className="mt-3 list-disc list-inside space-y-2 text-surface-700">
          <li>A failed re-scan triggers a public note explaining what failed.</li>
          <li>The listing is downgraded if the failure affects the Silver gate but not the Bronze gate.</li>
          <li>Grace window: 30 days for the founder to remediate before delisting.</li>
          <li>Persistent failure with no remediation results in delisting with a public note.</li>
          <li>Founder request: silent removal. Founders own their listing.</li>
          <li>Discovered fraud: delisting with a public note plus permanent ban from re-listing.</li>
          <li>Delisted listings remain in a public archive page so the audit trail survives.</li>
        </ul>
        <p className="mt-3 text-sm text-surface-500">
          A directory that quietly removes failed listings looks like it is hiding from its own rule set.
          Transparency about delisting is part of the credibility story.
        </p>
      </section>

      <section id="operator-coi" className="mt-16 max-w-3xl">
        <h2>Operator conflict of interest</h2>
        <p className="mt-3 text-surface-700">
          Startvest LLC operates this directory and is also a listee for its four products. This is a
          real conflict of interest. The handling:
        </p>
        <ul className="mt-3 list-disc list-inside space-y-2 text-surface-700">
          <li>Each Startvest listing carries an asterisk and a disclosure banner identifying the operator relationship.</li>
          <li>Startvest listings are evaluated under the same publicly-named gates as community listings. No private criteria.</li>
          <li>Per-product external-evaluator engagement is the long-term independence path. The disclosure banner will update once an external review is funded and findings published. No public target date is committed in copy until a real engagement is in motion.</li>
          <li>The directory&apos;s own INTEGRITY.md is self-rated Bronze, not Silver. A self-issued Silver from the operator would defeat this disclosure pattern.</li>
        </ul>
      </section>

      <section id="right-of-reply" className="mt-16 max-w-3xl">
        <h2>Right of reply</h2>
        <p className="mt-3 text-surface-700">
          A founder may publish a verbatim response to any delisting note or downgrade. One founder
          response, one directory response. Both stand. No back-and-forth.
        </p>
      </section>

      <section id="kill-criteria" className="mt-16 max-w-3xl">
        <h2>Kill criteria</h2>
        <p className="mt-3 text-surface-700">
          The framework requires every product to publish the criteria under which it would be shut down.
          The directory shuts down if any of the following hold:
        </p>
        <ul className="mt-3 list-disc list-inside space-y-2 text-surface-700">
          <li>Framework adoption stalls indefinitely with no community submissions for 18 months.</li>
          <li>A structural conflict emerges that the disclosure banner cannot honestly cover.</li>
          <li>The framework itself is deprecated without a successor.</li>
        </ul>
      </section>

      <section id="legal" className="mt-16 max-w-3xl">
        <h2>Disclaimer</h2>
        <p className="mt-3 text-surface-600 text-sm">
          The Integrity Framework Directory is published by Startvest LLC. Listings reflect each
          product&apos;s framework conformance at the most recent scan date. Listing inclusion is not a
          guarantee of any product&apos;s quality, fitness for purpose, or absence of bugs. Tier badges
          are descriptive of framework conformance, not of overall product trustworthiness. Buyers
          should independently verify any product before procurement. Startvest products are listed
          with disclosure asterisks and evaluated under the same rubric as community-listed products.
        </p>
      </section>

      <section id="version" className="mt-16 max-w-3xl">
        <h2>Version</h2>
        <p className="mt-3 text-surface-700">0.1, dated 2026-04-25.</p>
      </section>

      <section id="changelog" className="mt-12 max-w-3xl">
        <h2>Changelog</h2>
        <h3 className="mt-6">0.1, dated 2026-04-25</h3>
        <ul className="mt-3 list-disc list-inside space-y-1 text-surface-700">
          <li>Initial methodology page published alongside v0.1 site scaffold.</li>
          <li>Two-tier (Bronze, Silver) gates locked.</li>
          <li>Verification, re-scan, delisting, COI handling, right-of-reply, and kill-criteria documented.</li>
        </ul>
      </section>

      <p className="mt-16 text-sm text-surface-500">
        Questions about the methodology? <Link href="/submit">Submit a question or correction</Link>.
      </p>
      </article>
    </>
  );
}
