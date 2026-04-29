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
    version: '0.2.0',
    date: '2026-04-29',
    changes: [
      'Case studies surface added at /framework/cases. Two cases live at launch: the Delve case study (first public case under v1.0 — walks publicly-reported allegations against an AI compliance startup through the five failure modes and the six-row vendor scorecard, score 0/6) and the FieldLedger audit case (first internal portfolio audit — 14 PASS / 5 PARTIAL or NEEDS UPDATE / 1 DEFERRED / 0 FAIL across 20 dimensions, plus two false negatives found in the framework\'s own rule set that were revised in base manifest v1.3.0 and v1.4.0).',
      'Each subsequent portfolio audit (ClarityLift, IdeaLift, ADAComplianceDocs, HirePosture, MA, PRAPI in rough order) becomes a new case study at /framework/cases/<slug>.',
      '/framework/v1: the two v1.1 candidate items now link to the Delve case study (where they were surfaced) and the FieldLedger case (where the Layer 2 candidate was calibrated and shipped as a co-occurrence rule).',
      '/framework: overview page surfaces the case studies in a new section.',
      'Footer: Case studies link added under Framework.',
      'Sitemap: /framework/cases (0.85), /framework/cases/delve (0.8), /framework/cases/fieldledger (0.8).',
      'Minor version bump (0.1.9 → 0.2.0) since the case studies surface is a meaningful addition.',
    ],
  },
  {
    version: '0.1.9',
    date: '2026-04-29',
    changes: [
      '/removed page deleted. The page archived delisted listings, but it had stayed empty since launch and the surface area was disproportionate to the value. Delistings, when they happen, are now noted in this /changelog instead. Methodology updated to reflect the new audit-trail location. Footer + sitemap drop the /removed entry.',
      'No change to the framework spec, the tier system, the rescan automation, or any other mechanism. This is a small directory simplification, not a model change.',
    ],
  },
  {
    version: '0.1.8',
    date: '2026-04-28',
    changes: [
      'Spec relocation. The canonical v1.0 framework spec now lives at /framework/v1 on this site. Previously the canonical home was claritylift.ai/framework, with the directory site\'s /framework/v1 acting as a 307 redirect to it. The framework deserves a neutral home — Startvest still originates and operates it, but the canonical text should not live on a Startvest product domain. v1.0 wording is unchanged.',
      '/framework/v1: full spec rendered locally — five failure modes, six pre-build vetoes, seven architectural constraints (plus one v1.1 candidate), seven operational guardrails (plus one v1.1 candidate), eight-layer moat model, six-row vendor scorecard, operator self-grades for the three Startvest products, fork invitation, citation block, version history.',
      '/framework: overview page repointed to the local /framework/v1 instead of linking out to claritylift.ai. Buttons swapped to "Read the canonical v1.0 spec" and "Why the framework looks like this".',
      'Footer surfaces the local canonical spec link and the new /framework/why entry.',
      '/methodology JSON-LD isBasedOn flips to theintegrityframework.org/framework/v1.',
      '/what-is-the-integrity-framework FAQ + JSON-LD inDefinedTermSet flip to the local canonical.',
      'cli/manifests/base-v1.json frameworkUrl flips to the local canonical (was previously startvest.ai/framework, an alternate Startvest path that never served the spec).',
      'llms.txt and llms-full.txt point at the local canonical.',
      'Sitemap includes /framework/v1 with yearly change frequency (frozen URL) and 0.95 priority.',
    ],
  },
  {
    version: '0.1.7',
    date: '2026-04-26',
    changes: [
      '/framework/why: longer-form framework reasoning piece. Explains the five failure modes the framework is reverse-engineered from, why three operational layers, why these specific six pre-build vetoes, why CC BY 4.0, and how the framework relates to SOC 2 / ISO 27001 / FedRAMP. Versioned v1.0 with changelog. Linked from /framework as the next-step reading for forks and evaluators.',
      'Sitemap includes /framework/why.',
    ],
  },
  {
    version: '0.1.6',
    date: '2026-04-26',
    changes: [
      'Hosted submission form: /submit/form is a real form with client-side validation matching the listing schema. Submissions create a tracking issue on the directory\'s public repo via /api/submit. Gracefully falls back to "use the email path" if the GitHub token is not configured on the deploy.',
      'Honeypot field on the form rejects bot submissions silently (no signal to the bot that the field is checked).',
      '/submit page reordered: form is Path 1, email is Path 2, GitHub PR is Path 3.',
      'Sitemap includes /submit/form.',
    ],
  },
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
