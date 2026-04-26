import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Changelog',
  description:
    'Versioned changelog for The Integrity Framework Directory. The directory is itself a product evaluated against the framework; its own versioning is published here.',
  alternates: { canonical: '/changelog' },
};

type Entry = {
  version: string;
  date: string;
  changes: string[];
};

const ENTRIES: Entry[] = [
  {
    version: '0.1.5',
    date: '2026-04-26',
    changes: [
      'Filter + sort on /listings: client-side controls for tier (Bronze, Silver, All), category, and sort key (tier, name, last re-scanned, first listed). Fast even at small N; will hold up well past 30 listings without server changes.',
      '/framework/v1: permanent permalink stub on the directory site that 307s to the canonical spec at claritylift.ai/framework/v1. If the canonical home ever moves, citations to theintegrityframework.org/framework/v1 keep working — flip the redirect target once.',
      'Per-listing re-scan history: data/rescan-history.json schema added; the weekly rescan workflow now appends a pass/fail entry per listing per run and commits it back to master. /listings/<slug> renders the timeline.',
      'Rescan workflow has contents:write permission and a self-commit step (rebase-on-conflict, github-actions[bot] identity).',
    ],
  },
  {
    version: '0.1.4',
    date: '2026-04-26',
    changes: [
      '/removed: public archive of delisted listings. Empty until first delisting; ready when one happens.',
      'Per-listing OG images: each /listings/<slug> now renders a custom 1200×630 share card with the product name, tier, and operator-COI asterisk if applicable.',
      'Re-scan health-check workflow: weekly GitHub Actions cron probes every listing\'s URLs and verifies Silver methodology pages still carry Version + Changelog headings. Opens an issue on failure.',
      '/changelog page (this page): the directory\'s own version log.',
    ],
  },
  {
    version: '0.1.3',
    date: '2026-04-26',
    changes: [
      '/framework stub page added; closes the 404 the Nav was linking to.',
      'Footer surfaces the canonical-spec link (claritylift.ai/framework) and the directory\'s public source on GitHub.',
      'Sitemap includes /framework.',
    ],
  },
  {
    version: '0.1.2',
    date: '2026-04-26',
    changes: [
      'Listings populated: ClarityLift (Silver), adacompliancedocs (Silver), FieldLedger (Silver), IdeaLift (Bronze). All four under operator-COI disclosure.',
      'CLI distribution pivoted from npm to git clone after npm bootstrap proved overwrought (org / 2FA-write / token-type). Install scripts at /install.sh and /install.ps1.',
      'public/ files: install.sh, install.ps1, llms.txt.',
      'SEO: sitemap.xml, robots.txt, programmatic /opengraph-image.',
      'Dependabot: postcss override resolves the moderate advisory.',
    ],
  },
  {
    version: '0.1.1',
    date: '2026-04-25',
    changes: [
      'Submit page documents the email and (future) GitHub PR submission paths.',
      'Methodology page published with required Version + Changelog headings.',
      '/api/listings.json static endpoint for CLI consumption.',
      'Tier badges (Bronze, Silver) and listing schema (zod) locked.',
    ],
  },
  {
    version: '0.1.0',
    date: '2026-04-25',
    changes: [
      'Initial scaffold: Next.js 16 App Router, Tailwind, MDX, Azure App Service Docker deploy, theintegrityframework.org custom domain with managed certificate.',
      'Directory\'s own INTEGRITY.md self-rated Bronze pending external methodology review.',
    ],
  },
];

export default function ChangelogPage() {
  return (
    <article className="container-wide py-16 md:py-20">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-4">
          Changelog
        </p>
        <h1>The directory's own version log.</h1>
        <p className="mt-6 text-lg text-surface-600">
          The directory is itself a product evaluated against the framework. Its own
          version-and-changelog discipline is published here, alongside its{' '}
          <Link href="/methodology">methodology</Link> and{' '}
          <a href="https://github.com/Startvest-LLC/theintegrityframework/blob/master/INTEGRITY.md">
            INTEGRITY.md
          </a>
          .
        </p>
        <p className="mt-3 text-sm text-surface-500">
          Current directory version: <strong>v{site.directoryVersion}</strong>. Framework version
          evaluated against: <strong>v{site.frameworkVersion}</strong>.
        </p>
      </header>

      <section className="mt-12 max-w-3xl">
        {ENTRIES.map((entry) => (
          <div key={entry.version} className="border-t border-surface-200 py-8 first:border-t-0">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h2 className="text-xl md:text-2xl font-semibold text-surface-900">
                v{entry.version}
              </h2>
              <span className="font-mono text-sm text-surface-500">{entry.date}</span>
            </div>
            <ul className="mt-4 space-y-2 list-disc list-inside text-surface-700">
              {entry.changes.map((change, i) => (
                <li key={i}>{change}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <p className="mt-12 max-w-3xl text-sm text-surface-500">
        Source for every change is in the public repo at{' '}
        <a href="https://github.com/Startvest-LLC/theintegrityframework/commits/master">
          github.com/Startvest-LLC/theintegrityframework
        </a>
        . Each entry corresponds to merged commits on master.
      </p>
    </article>
  );
}
