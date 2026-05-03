import type { Metadata } from 'next';
import Link from 'next/link';

const SPEC_VERSION = '0.1.0';
const SPEC_URL = '/specs/brief-md/v0.1.0';

export const metadata: Metadata = {
  title: `brief.md v${SPEC_VERSION} — open spec`,
  description:
    'brief.md is an open spec for portable brand context — operator-published markdown carrying voice rules, credentials, identity, and available assets. Designed to be consumed by AI assistants and any tool that needs to know who a brand is and how they sound.',
  alternates: { canonical: SPEC_URL },
  openGraph: {
    title: `brief.md v${SPEC_VERSION} — open spec`,
    description:
      'Operator-published brand context, portable across tools. Open spec stewarded by The Integrity Framework.',
    type: 'article',
    url: SPEC_URL,
  },
};

export default function BriefMdSpecPage() {
  return (
    <article className="container-wide py-16 md:py-20">
      <header className="max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-600">
          brief.md · v{SPEC_VERSION}
        </p>
        <h1>brief.md — open spec for portable brand context.</h1>
        <p className="mt-6 text-lg text-surface-600">
          A markdown document carrying an operator&rsquo;s voice rules, credentials, identity, and
          available assets. Hosted at the operator&rsquo;s domain. Consumed by AI assistants,
          journalist-side workflows, PR products, and any tool that needs to know &ldquo;who is
          this brand and how do they sound.&rdquo;
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`${SPEC_URL}/spec.md`}
            className="inline-flex items-center rounded-md bg-brand-700 px-5 py-3 text-sm font-medium text-white no-underline hover:bg-brand-800"
          >
            Read the spec (markdown)
          </Link>
          <Link
            href={`${SPEC_URL}/schema.json`}
            className="inline-flex items-center rounded-md border border-surface-300 bg-white px-5 py-3 text-sm font-medium text-surface-800 no-underline hover:bg-surface-50"
          >
            JSON Schema
          </Link>
        </div>
      </header>

      <section className="prose mt-12 max-w-3xl">
        <h2>What it is</h2>
        <p>
          A YAML-frontmatter markdown document with five canonical sections: identity,
          credentials, voice-rules, public-links, submission-assets. Operators publish it at
          their own domain (typically <code>/.well-known/brief.md</code> or{' '}
          <code>/brief.md</code>). Tools fetch it to learn voice, verify credentials, or compose
          structured pitches.
        </p>

        <h2>Why it exists</h2>
        <p>
          Brand context is currently locked inside proprietary PR / outreach tools — voice
          settings, asset libraries, founder credentials. Cancel the subscription and the
          settings disappear with it. brief.md inverts that: the operator owns the document, the
          format is open, any compliant tool can consume it.
        </p>

        <h2>Stewardship</h2>
        <p>
          The spec is open. The <code>brief.md</code> trademark is held by The Integrity
          Framework. Implementing tools may use the trademark under license; the license requires
          spec compliance, verified by passing the{' '}
          <a
            href="https://github.com/theintegrityframework/brief-core"
            className="underline"
            target="_blank"
            rel="noreferrer"
          >
            <code>@theintegrityframework/brief-core</code>
          </a>{' '}
          test suite.
        </p>

        <h2>Endpoints under this spec home</h2>
        <ul>
          <li>
            <Link href={`${SPEC_URL}/spec.md`}>
              <code>{SPEC_URL}/spec.md</code>
            </Link>{' '}
            — full spec document, <code>text/markdown</code>
          </li>
          <li>
            <Link href={`${SPEC_URL}/schema.json`}>
              <code>{SPEC_URL}/schema.json</code>
            </Link>{' '}
            — JSON Schema for the document structure, <code>application/schema+json</code>
          </li>
        </ul>

        <h2>Reference implementation</h2>
        <p>
          <a
            href="https://github.com/theintegrityframework/brief-core"
            className="underline"
            target="_blank"
            rel="noreferrer"
          >
            <code>@theintegrityframework/brief-core</code>
          </a>{' '}
          is the canonical parser + validator. Other implementations are encouraged.
        </p>

        <h2>Versioning</h2>
        <p>
          Briefs declare <code>spec_version</code> in their frontmatter. Consumers may refuse to
          parse versions they don&rsquo;t recognize, or fall back to best-effort. The spec
          follows semver — breaking changes bump major; additive changes bump minor.
        </p>
      </section>
    </article>
  );
}
