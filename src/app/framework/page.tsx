import type { Metadata } from 'next';
import Link from 'next/link';

const CANONICAL_URL = '/framework/v1';
const FRAMEWORK_VERSION = '1.0';

export const metadata: Metadata = {
  title: 'The Integrity Framework',
  description:
    'A framework for building compliance and trust-adjacent products under structural commitments. Defends against the five recurring failure modes that have destroyed compliance categories before. Forkable. CC BY 4.0.',
  alternates: { canonical: '/framework' },
};

export default function FrameworkPage() {
  return (
    <article className="container-wide py-16 md:py-20">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-4">
          The Integrity Framework · v{FRAMEWORK_VERSION}
        </p>
        <h1>A trust framework for sub-enterprise AI tools.</h1>
        <p className="mt-6 text-lg text-surface-600">
          Built around five recurring failure modes that have destroyed compliance and
          trust-adjacent categories before: trust-arbitrage failure, theater versus substance,
          conflict-of-interest, black-box AI, and velocity-over-rigor. The framework names them so
          they can be defended against by name.
        </p>
        <p className="mt-4 text-lg text-surface-600">
          Three operational layers. Six pre-build vetoes. Seven architectural constraints. Seven
          operational guardrails. Plus an eight-layer moat model used as decision criteria for
          product portfolio fit.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={CANONICAL_URL}
            className="inline-flex items-center rounded-md bg-brand-700 px-5 py-3 text-sm font-medium text-white no-underline hover:bg-brand-800"
          >
            Read the canonical v{FRAMEWORK_VERSION} spec
          </Link>
          <Link
            href="/framework/why"
            className="inline-flex items-center rounded-md border border-surface-300 px-5 py-3 text-sm font-medium text-surface-800 no-underline hover:border-surface-400"
          >
            Why the framework looks like this
          </Link>
        </div>
      </header>

      <section className="mt-16 max-w-3xl">
        <h2>Where the spec lives</h2>
        <p className="mt-3 text-surface-700">
          The canonical v{FRAMEWORK_VERSION} text lives at{' '}
          <Link href="/framework/v1">/framework/v1</Link>. That is the frozen citation URL — wording
          stable, future revisions ship under <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">/v2</code>,{' '}
          <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">/v3</code>, and so on, with v1 left
          intact for everything operating against it.
        </p>
        <p className="mt-3 text-surface-700">
          v1.0 was first published at <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">claritylift.ai/framework</code>{' '}
          while this site was being built. The canonical home moved here on 2026-04-28; the prior URL
          remains valid via redirect, and the v1.0 wording is unchanged.
        </p>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2>This site is the directory, not the spec</h2>
        <p className="mt-3 text-surface-700">
          The Integrity Framework Directory ({' '}
          <Link href="/" className="text-brand-700">theintegrityframework.org</Link>) is the
          adoption surface: a public list of products evaluated against the framework, with a tier
          badge per listing. The framework is the spec; the directory is what makes adoption
          legible.
        </p>
        <p className="mt-3 text-surface-700">
          See <Link href="/methodology">methodology</Link> for how the directory evaluates
          listings,{' '}
          <Link href="/listings">listings</Link> for the products currently in the directory, and{' '}
          <Link href="/submit">submit</Link> to propose a listing for your own product.
        </p>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2>Forkable</h2>
        <p className="mt-3 text-surface-700">
          The framework is published under CC BY 4.0. Fork it. Adapt it. Run a different directory
          under it. The framework&apos;s value is in adoption; locking it down would defeat the
          purpose. The only request: keep the version-and-changelog discipline. A framework that
          drifts silently is the failure mode the framework defends against.
        </p>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2>Case studies</h2>
        <p className="mt-3 text-surface-700">
          Two cases live at <Link href="/framework/cases">/framework/cases</Link>. The{' '}
          <Link href="/framework/cases/delve" className="text-brand-700">Delve case</Link>{' '}
          walks a publicly-reported failure through the framework — teaching material, citing
          public reporting only. The{' '}
          <Link href="/framework/cases/fieldledger" className="text-brand-700">
            FieldLedger audit
          </Link>{' '}
          is the first internal portfolio audit; it also documents two false negatives the audit
          found in the framework&apos;s own rule set, and how they were closed in base manifest
          v1.3.0 and v1.4.0.
        </p>
        <p className="mt-3 text-surface-700">
          Each subsequent portfolio audit becomes a new case study. ClarityLift is next in the
          queue.
        </p>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2>Why does the framework look like this?</h2>
        <p className="mt-3 text-surface-700">
          The reasoning behind v1.0 — the five failure modes it&apos;s reverse-engineered from,
          why three operational layers, why these specific six pre-build vetoes, and why the whole
          thing is published openly — lives at{' '}
          <Link href="/framework/why" className="text-brand-700">/framework/why</Link>. Read that
          if you&apos;re considering forking the framework or evaluating it for your segment.
        </p>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2>Source</h2>
        <p className="mt-3 text-surface-700">
          The directory&apos;s source, the listing schema, the integrity-cli, and the deploy
          pipeline all live in a public repo:{' '}
          <a href="https://github.com/Startvest-LLC/theintegrityframework">
            github.com/Startvest-LLC/theintegrityframework
          </a>
          . The directory is itself a product evaluated against the framework — see this site&apos;s{' '}
          <a href="https://github.com/Startvest-LLC/theintegrityframework/blob/master/INTEGRITY.md">
            INTEGRITY.md
          </a>{' '}
          for that self-mapping.
        </p>
      </section>
    </article>
  );
}
