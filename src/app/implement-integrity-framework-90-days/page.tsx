import type { Metadata } from 'next';
import Link from 'next/link';
import { TierBadge } from '@/components/TierBadge';
import { site } from '@/lib/site';

const PAGE_URL = `${site.url}/implement-integrity-framework-90-days`;

export const metadata: Metadata = {
  title: 'How to Implement The Integrity Framework in 90 Days',
  description:
    "A 90-day implementation walkthrough for The Integrity Framework. Week-by-week plan from reading the spec, drafting INTEGRITY.md, and running integrity-cli to submitting a directory listing at Bronze or Silver tier.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'How to Implement The Integrity Framework in 90 Days',
    description:
      'Operational walkthrough: 90 days from first read to a published Bronze or Silver listing.',
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
    q: 'How long does it take to implement The Integrity Framework?',
    a: 'A diligent founder reaches Bronze tier (public INTEGRITY.md self-mapped against the six Layer 1 vetoes) in about half a day of honest work. Silver tier (Bronze plus integrity-cli green or a versioned methodology page) takes another one to two days depending on the product surface. The 90-day plan in this guide assumes you are doing the work alongside other founder responsibilities, not full-time.',
  },
  {
    q: 'What artifacts do I need to publish?',
    a: "Bronze: a public INTEGRITY.md file at your repo root or product website containing the six Layer 1 veto self-mappings. Silver: Bronze plus one of (a) integrity-cli green output committed to the repo, or (b) a public methodology page with a versioned changelog. Both tiers require a directory listing submission at theintegrityframework.org/submit.",
  },
  {
    q: 'Where do I put the INTEGRITY.md?',
    a: "Most products put it at the repo root (alongside README.md). For closed-source products, the public website is the canonical location: a /integrity URL or similar. The directory listing accepts either a GitHub repo URL or a public website URL pointing to the artifact.",
  },
  {
    q: "What's the difference between the six Layer 1 vetoes?",
    a: 'Six pre-build vetoes screen the product idea against unrecoverable design choices. Each veto is a question: dark patterns, dependency lock-in, ambient surveillance, contractual integrity, the TechCrunch test, and the regulatory scope question. The framework does not require you to answer "no" to all six — it requires you to publish your honest answer to each so buyers can decide.',
  },
  {
    q: 'Does integrity-cli run on closed-source products?',
    a: 'Partially. integrity-cli runs static checks (presence of INTEGRITY.md, schema validity, required sections, link health). For closed-source products, run it in CI against the public-facing repo or the public methodology page. The CLI cannot inspect proprietary code; the audit posture works on the published artifacts.',
  },
  {
    q: 'What happens after I submit a listing?',
    a: 'Startvest reads the INTEGRITY.md, verifies the tier credential (Bronze: presence + completeness; Silver: integrity-cli output or methodology page), and publishes the listing with a tier badge. Approval takes a few business days. Quarterly re-scans run automatically; framework version bumps trigger re-verification.',
  },
  {
    q: 'Can I implement at Silver tier without first hitting Bronze?',
    a: 'No. Silver requires the Bronze artifact (the INTEGRITY.md) plus one additional credential. The INTEGRITY.md is the foundation; integrity-cli or the methodology page is layered on top. There is no path to Silver that skips the public INTEGRITY.md.',
  },
  {
    q: 'What if my product fails one of the Layer 1 vetoes?',
    a: 'Publish the honest answer anyway. The framework is a transparency standard, not a gate. A product that uses dark patterns is allowed to publish "yes, the product uses confirmshaming during downgrade" in its INTEGRITY.md. Buyers then decide whether to use the product. The framework rejects performative compliance, not honest disclosure.',
  },
  {
    q: 'How does this compare to SOC 2?',
    a: 'SOC 2 is an audited control framework requiring an external auditor, costing $20K-$80K per year, scoped at enterprise spend tiers. The Integrity Framework is self-mapped, free to publish, and scoped at sub-enterprise AI-product purchases (the segment SOC 2 prices out). They occupy different tiers of the trust-signal stack and serve different buyer profiles.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Implement The Integrity Framework in 90 Days',
  description:
    'Six-step plan from reading the framework spec to a published directory listing at Bronze or Silver tier.',
  totalTime: 'P90D',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Read the framework v1.0 spec', text: 'Read the canonical v1.0 spec at theintegrityframework.org/framework/v1. About 30 minutes for the full spec; another 30 for the rationale on framework/why. Output: notes on which Layer 1 vetoes apply most acutely to your product.' },
    { '@type': 'HowToStep', position: 2, name: 'Self-map the six Layer 1 vetoes', text: 'Write your honest answer to each veto. Half a day of focused work. Output: a draft INTEGRITY.md with the six veto headings and your self-mapping prose under each.' },
    { '@type': 'HowToStep', position: 3, name: 'Publish the INTEGRITY.md', text: 'Commit to repo root or publish to a public URL on your product website. Verify the file is reachable at a stable URL. Output: Bronze tier credential.' },
    { '@type': 'HowToStep', position: 4, name: 'Run integrity-cli (optional, for Silver)', text: 'Install integrity-cli, point it at your INTEGRITY.md, fix any schema or completeness errors it surfaces. Commit the green output to your repo. One day for a typical product. Output: integrity-cli green credential.' },
    { '@type': 'HowToStep', position: 5, name: 'Or publish a methodology page (optional, for Silver)', text: 'Alternative path to Silver: publish a public methodology page describing how your product makes its decisions, with a versioned changelog. One to two days. Output: methodology-page credential.' },
    { '@type': 'HowToStep', position: 6, name: 'Submit directory listing', text: 'Submit at theintegrityframework.org/submit. Provide the artifact URL and pick the tier you are claiming. Approval takes a few business days. Output: published directory listing with tier badge that buyers can verify.' },
  ],
};

interface WeekRow {
  range: string;
  focus: string;
  outputs: string[];
  notes: string;
}

const weeks: WeekRow[] = [
  {
    range: 'Week 1',
    focus: 'Read and absorb',
    outputs: [
      'Read the v1.0 spec at /framework/v1',
      'Read the rationale at /framework/why',
      'Read 2-3 published Bronze listings in your category at /listings',
    ],
    notes: 'No writing yet. The reading is what makes the self-mapping honest. Founders who skip this step end up writing performative INTEGRITY.md files that miss the point.',
  },
  {
    range: 'Weeks 2-3',
    focus: 'Draft the INTEGRITY.md',
    outputs: [
      'Write a 1-2 paragraph self-mapping per Layer 1 veto',
      'Note any vetoes the product currently fails honestly',
      'Identify which architectural constraints (Layer 2) and operational guardrails (Layer 3) apply',
    ],
    notes: 'Half a day of focused writing. The honest answer to each veto is more valuable than a clean answer to all six. Buyers reading the file are looking for honest disclosure, not a marketing pass.',
  },
  {
    range: 'Week 4',
    focus: 'Internal review',
    outputs: [
      'Pass the draft to a co-founder, advisor, or trusted peer for the TechCrunch test',
      'Adjust language where the draft sounds defensive or evasive',
      'Cross-reference the spec to confirm every required section is present',
    ],
    notes: 'External eyes catch the places where the draft slipped into marketing voice. The fix is usually to make a section shorter and more specific, not longer.',
  },
  {
    range: 'Week 5',
    focus: 'Publish at Bronze tier',
    outputs: [
      'Commit INTEGRITY.md to repo root, OR publish to public website at a stable URL',
      'Add a link to the file from your homepage footer or trust page',
      'Verify the file is reachable from an unauthenticated browser',
    ],
    notes: 'You now have a Bronze credential. Many founders stop here and submit the listing. The 90-day plan continues into Silver because the additional credential is cheap to add and meaningfully strengthens the listing.',
  },
  {
    range: 'Weeks 6-8',
    focus: 'Add the Silver credential',
    outputs: [
      'Path A: install integrity-cli, get it green against your INTEGRITY.md, commit the output',
      'Path B: publish a public methodology page describing how your product makes its decisions',
      'Set up a versioned changelog if you took Path B',
    ],
    notes: 'Pick the path that fits your product shape. integrity-cli is faster for products with a public repo. A methodology page is faster for closed-source products that have an existing /how-it-works or similar.',
  },
  {
    range: 'Week 9',
    focus: 'Submit listing',
    outputs: [
      'Submit at /submit with the artifact URL and tier claim',
      'Provide a contact email for editorial follow-up',
      'Wait for editorial review (typically a few business days)',
    ],
    notes: 'Editorial review is fast unless the artifact is hard to find or the tier claim does not match what the artifact actually shows. Have the artifact URL working before submitting.',
  },
  {
    range: 'Weeks 10-12',
    focus: 'Maintenance + iteration',
    outputs: [
      'Add the directory badge to your product homepage (optional)',
      'Set a quarterly reminder to re-read the INTEGRITY.md and update where the product has changed',
      'Subscribe to the framework changelog so version bumps do not surprise you',
    ],
    notes: 'The INTEGRITY.md is a living document. Quarterly review keeps the artifact honest as the product evolves. Framework version bumps trigger re-verification by the directory; staying current is easier than catching up.',
  },
];

export default function ImplementIntegrityFramework90DaysPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <article className="container-wide py-16 md:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-4">
            Operational walkthrough
          </p>

          <h1>How to implement The Integrity Framework in 90 days</h1>

          {/* Direct-answer paragraph for AIO citation */}
          <p className="mt-6 text-lg text-surface-700 leading-relaxed">
            Implementing <strong>The Integrity Framework</strong> at Bronze tier takes about
            half a day of honest work; reaching Silver tier takes another one to two days. The
            90-day plan in this guide assumes a founder doing the work alongside other
            responsibilities. By the end you have a published INTEGRITY.md, a Silver-tier
            credential, and a live listing at theintegrityframework.org with a tier badge buyers
            can verify themselves.
          </p>

          <h2 className="mt-12">The two tiers, in 60 seconds</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-surface-200 bg-white p-6">
              <TierBadge tier="bronze" />
              <h3 className="mt-4">Bronze</h3>
              <p className="mt-2 text-surface-600">
                Public <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">INTEGRITY.md</code>{' '}
                with all six Layer 1 vetoes self-mapped. Half a day for a thoughtful founder. The
                foundation.
              </p>
            </div>
            <div className="rounded-lg border border-surface-200 bg-white p-6">
              <TierBadge tier="silver" />
              <h3 className="mt-4">Silver</h3>
              <p className="mt-2 text-surface-600">
                Bronze plus one of: <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">integrity-cli</code>{' '}
                green, or a public methodology page with a versioned changelog. One to two days
                of additional work.
              </p>
            </div>
          </div>

          <h2 className="mt-12">The 90-day plan, week by week</h2>
          <div className="mt-6 space-y-6">
            {weeks.map((w) => (
              <div key={w.range} className="rounded-lg border border-surface-200 bg-white p-6">
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-brand-600">{w.range}</span>
                  <h3 className="text-lg font-semibold text-surface-900">{w.focus}</h3>
                </div>
                <p className="font-semibold text-surface-900 text-sm mb-2">Outputs</p>
                <ul className="list-disc pl-5 space-y-1 text-surface-700 text-sm mb-4">
                  {w.outputs.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
                <p className="text-sm text-surface-600 italic">{w.notes}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-12">Common failure modes</h2>
          <ul className="mt-4 list-disc pl-6 space-y-3 text-surface-700">
            <li>
              <strong>Skipping the read.</strong> Founders who write the INTEGRITY.md without
              reading the spec produce performative artifacts that fail editorial review. Read
              the spec first.
            </li>
            <li>
              <strong>Defensive prose.</strong> Self-mappings that bury the honest answer under
              hedging language. The fix: write the honest answer first, then trim until each
              veto&apos;s section is one or two paragraphs.
            </li>
            <li>
              <strong>Tier inflation.</strong> Submitting at Silver when only the Bronze artifact
              is in place. Editorial catches this; the listing comes back asking for the missing
              credential. Submit at the tier you actually have.
            </li>
            <li>
              <strong>Stale artifacts.</strong> An INTEGRITY.md that was honest in Q1 stops
              being honest after a Q3 product pivot. The quarterly review cadence in week 10-12
              prevents this. Skip it and the listing goes stale.
            </li>
            <li>
              <strong>Marketing voice.</strong> The INTEGRITY.md is not a sales page. Buyers
              reading it can tell the difference. The artifact has to read like a memo to a
              skeptical reviewer, not a landing page.
            </li>
          </ul>

          <h2 className="mt-12">Frequently asked</h2>
          <dl className="mt-6 space-y-6">
            {faqs.map((f) => (
              <div key={f.q}>
                <dt className="font-semibold text-surface-900">{f.q}</dt>
                <dd className="mt-2 text-surface-700">{f.a}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-12">Related</h2>
          <ul className="mt-4 list-disc pl-6 space-y-2 text-surface-700">
            <li>
              <Link href="/what-is-the-integrity-framework" className="text-brand-700 underline">
                What is The Integrity Framework?
              </Link>{' '}
              &mdash; the definitional anchor.
            </li>
            <li>
              <Link href="/integrity-framework-vs-coso" className="text-brand-700 underline">
                The Integrity Framework vs COSO Internal Control Framework
              </Link>{' '}
              &mdash; disambiguation guide.
            </li>
            <li>
              <Link href="/framework/v1" className="text-brand-700 underline">
                The Integrity Framework v1.0 spec
              </Link>
            </li>
            <li>
              <Link href="/framework/why" className="text-brand-700 underline">
                Why The Integrity Framework exists
              </Link>
            </li>
            <li>
              <Link href="/submit" className="text-brand-700 underline">
                Submit a listing
              </Link>
            </li>
          </ul>
        </div>
      </article>
    </>
  );
}
