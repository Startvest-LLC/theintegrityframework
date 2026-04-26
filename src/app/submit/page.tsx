import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Submit a product',
  description:
    'How to submit a product for evaluation against the Integrity Framework. Two paths: email submission, or GitHub pull request.',
  alternates: { canonical: '/submit' },
};

const sampleListing = `{
  "slug": "your-product",
  "name": "Your Product",
  "description": "One sentence describing what the product does. Up to 160 characters.",
  "homepageUrl": "https://yourproduct.example",
  "integrityMdUrl": "https://yourproduct.example/integrity",
  "tier": "bronze",
  "license": "closed-source",
  "operator": {
    "name": "Your Operator Name",
    "url": "https://operator.example"
  },
  "firstListedDate": "2026-04-25",
  "lastRescannedDate": "2026-04-25",
  "state": "active"
}`;

const silverAddition = `  "silverCredential": {
    "kind": "methodology-page",
    "url": "https://yourproduct.example/methodology"
  },`;

const silverCliAddition = `  "silverCredential": {
    "kind": "integrity-cli",
    "outputUrl": "https://yourproduct.example/integrity-cli-output.json",
    "commitSha": "abc1234"
  },`;

export default function SubmitPage() {
  return (
    <article className="container-wide py-16 md:py-20">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-4">
          Submit
        </p>
        <h1>Submit a product for evaluation</h1>
        <p className="mt-6 text-lg text-surface-600">
          Submissions are reviewed manually before publishing. Review SLA: 14 calendar days from
          submission to first response. Approved listings publish to the directory; rejected
          submissions get specific feedback.
        </p>
      </header>

      <section className="mt-14 max-w-3xl">
        <h2>Before submitting</h2>
        <p className="mt-3 text-surface-700">
          Confirm two things first:
        </p>
        <ol className="mt-4 list-decimal list-inside space-y-3 text-surface-700">
          <li>
            Your product has a public INTEGRITY.md at the repo root or product website. The file maps
            all six Layer 1 vetoes from <Link href="/framework">the framework</Link>: artifact-vs-outcome,
            independence, verifiability, AI accountability, pricing-rigor, the TechCrunch test. Missing
            any one is an automatic Bronze rejection.
          </li>
          <li>
            For Silver: either the framework{' '}
            <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">integrity</code> CLI runs green
            against your public repo, or your product has a public methodology page with a{' '}
            <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">Version</code> heading and a{' '}
            <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">Changelog</code> heading. Pick the
            credential that fits your product shape. You do not need both. The CLI lives in this
            directory&apos;s public repo at <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">cli/</code>; clone and run.
          </li>
        </ol>
        <p className="mt-4 text-sm text-surface-500">
          See <Link href="/methodology">methodology</Link> for the full tier gates and verification process.
        </p>
      </section>

      <section className="mt-14 max-w-3xl">
        <h2>Path 1: hosted form (recommended)</h2>
        <p className="mt-3 text-surface-700">
          Fill in the listing fields at{' '}
          <Link href="/submit/form" className="font-medium text-brand-700">/submit/form</Link>.
          Submission becomes a tracking issue on the directory&apos;s public repo. The reviewer
          responds on the issue thread within the SLA window.
        </p>
        <p className="mt-3 text-surface-700">
          Prefer email or GitHub PR? Both paths still work — see below.
        </p>
      </section>

      <section className="mt-14 max-w-3xl">
        <h2>Path 2: email submission</h2>
        <p className="mt-3 text-surface-700">
          Email <a href={`mailto:${site.contactEmail}?subject=Directory submission`}>{site.contactEmail}</a> with
          a JSON block following the listing schema below. Include any context you want considered during
          review. The directory operator responds within the SLA window.
        </p>

        <h3 className="mt-8">Listing JSON template</h3>
        <p className="mt-3 text-surface-700">Required fields:</p>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-surface-900 p-4 text-sm text-surface-50">
          <code>{sampleListing}</code>
        </pre>

        <p className="mt-6 text-surface-700">
          For Silver via methodology page, add inside the JSON object:
        </p>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-surface-900 p-4 text-sm text-surface-50">
          <code>{silverAddition}</code>
        </pre>

        <p className="mt-6 text-surface-700">
          For Silver via <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">integrity-cli</code>{' '}
          output, add inside the JSON object:
        </p>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-surface-900 p-4 text-sm text-surface-50">
          <code>{silverCliAddition}</code>
        </pre>

        <p className="mt-6 text-sm text-surface-500">
          Optional fields: <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">category</code>,{' '}
          <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">logo</code>,{' '}
          <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">rationale</code>,{' '}
          <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">socialLinks</code>. Categories are a
          flat list at v1; we will introduce filtering once the directory grows past 30 listings.
        </p>
      </section>

      <section className="mt-14 max-w-3xl">
        <h2>Path 3: GitHub pull request</h2>
        <p className="mt-3 text-surface-700">
          Technical founders can submit by opening a pull request that adds an entry to{' '}
          <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">data/listings.json</code> on the
          directory&apos;s public repo at{' '}
          <a href="https://github.com/Startvest-LLC/theintegrityframework">
            github.com/Startvest-LLC/theintegrityframework
          </a>
          . Same schema as the form and email paths. The PR is the audit trail.
        </p>
      </section>

      <section className="mt-14 max-w-3xl">
        <h2>What happens after you submit</h2>
        <ol className="mt-4 list-decimal list-inside space-y-3 text-surface-700">
          <li>The directory operator reads your INTEGRITY.md.</li>
          <li>If you claimed Silver, the operator verifies the credential. Either runs <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">integrity-cli</code> against your repo, or reads your methodology page for the required headings.</li>
          <li>Within 14 calendar days, you get one of: approved (with a publish date), changes requested (with specific gaps), or rejected (with the reason).</li>
          <li>Approved listings publish to <Link href="/listings">/listings</Link> and a per-product page at <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">/listings/&lt;slug&gt;</code>.</li>
          <li>Quarterly re-scans, plus a triggered re-scan on any framework version bump. See <Link href="/methodology">methodology</Link> for the failure-handling and delisting rules.</li>
        </ol>
      </section>

      <section className="mt-14 max-w-3xl">
        <h2>What the directory will reject</h2>
        <ul className="mt-4 list-disc list-inside space-y-2 text-surface-700">
          <li>Missing INTEGRITY.md, or one that does not map all six Layer 1 vetoes.</li>
          <li>Self-attested Silver claims with no public credential URL.</li>
          <li>Closed-source products claiming the <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">integrity-cli</code> path without publishing the runner output.</li>
          <li>Products that fail Veto 1 (selling a certification artifact rather than the underlying outcome) or Veto 2 (verifier paid by the verified entity with no structural independence).</li>
          <li>Submissions that fail a TechCrunch-test sniff: claims that need hand-waving to defend.</li>
        </ul>
      </section>

      <p className="mt-16 text-sm text-surface-500">
        Questions before you submit?{' '}
        <a href={`mailto:${site.contactEmail}?subject=Directory question`}>Email {site.contactEmail}</a>.
      </p>
    </article>
  );
}
