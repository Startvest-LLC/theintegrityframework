import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

const VERSION = '1.0';
const PUBLISHED = '2026-04-25';
const PAGE_URL = `${site.url}/framework/cases/delve`;

export const metadata: Metadata = {
  title: 'Case study: Delve',
  description:
    'Walking the publicly-reported Delve allegations through the five failure modes and the six-row vendor scorecard of The Integrity Framework v1.0. First public case study; teaching material; cites public reporting only.',
  alternates: { canonical: '/framework/cases/delve' },
  openGraph: {
    title: 'Case study: Delve, walked through the framework',
    description:
      'Walking the publicly-reported Delve allegations through The Integrity Framework v1.0.',
    url: PAGE_URL,
    type: 'article',
    siteName: site.name,
    publishedTime: `${PUBLISHED}T00:00:00Z`,
    authors: ['Startvest LLC'],
  },
};

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Case study: Delve',
  description:
    'Walking the publicly-reported Delve allegations through the five failure modes and the six-row vendor scorecard of The Integrity Framework v1.0.',
  author: { '@type': 'Organization', name: 'Startvest LLC', url: 'https://startvest.ai' },
  publisher: { '@type': 'Organization', name: 'Startvest LLC', url: 'https://startvest.ai' },
  datePublished: `${PUBLISHED}T00:00:00Z`,
  dateModified: `${PUBLISHED}T00:00:00Z`,
  mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
  url: PAGE_URL,
  inLanguage: 'en-US',
  isBasedOn: `${site.url}/framework/v1`,
};

export default function DelveCasePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />

      <article className="bg-white">
        <section className="px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-10 md:pb-14 border-b border-surface-200">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-3">
                Case study · v{VERSION} · published {PUBLISHED}
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-[56px] leading-[1.05] tracking-tight font-semibold text-surface-900 mb-5">
                Delve, walked through the framework.
              </h1>
              <p className="text-lg text-surface-600 leading-relaxed">
                First public case study under{' '}
                <Link href="/framework/v1" className="text-brand-700 hover:text-brand-800 underline">
                  The Integrity Framework v1.0
                </Link>
                . Walks the publicly-reported allegations against Delve, an AI compliance startup,
                through the five failure modes and the six-row vendor scorecard.
              </p>
              <p className="mt-4 text-base text-surface-500 leading-relaxed">
                Teaching material, not legal commentary. Every factual claim links to public
                reporting or to Delve&apos;s own statements. We didn&apos;t investigate Delve; we
                read what was reported, and we asked: would the framework have caught this?
              </p>
            </div>
          </div>
        </section>

        <Section title="What was reported">
          <p>
            Delve was a Y Combinator-backed AI compliance startup. Two 21-year-old founders, both
            Forbes 30 Under 30. The company raised roughly $32M at a $300M valuation pitching
            automated SOC 2 readiness for SaaS startups. In late March 2026, anonymous
            whistleblower posts and follow-on investigative reporting alleged that Delve was
            producing SOC 2 reports that were essentially identical templates, that auditor
            conclusions were pre-written before any client evidence had been submitted, and that
            the third-party auditing firms in the chain were not what they appeared to be.{' '}
            <Cite n={1} /> <Cite n={2} />
          </p>
          <p>
            On or about April 3, 2026, Y Combinator removed Delve from its companies directory
            and asked the founders to leave the program — a rare public separation for an
            accelerator that has backed more than 4,000 companies. <Cite n={3} />
          </p>
          <p>
            Delve&apos;s public response (March 20, 2026) framed the company as
            software-and-automation that helps companies <i>prepare</i> for audits performed by
            licensed third parties, not as the auditor itself. That framing matters for the
            framework analysis below. <Cite n={4} />
          </p>
          <p className="text-surface-600">
            We are not asserting fraud. We are mapping the publicly-reported pattern to the
            framework. Several allegations remain contested as of publication. The case study is
            useful even if some details turn out differently because the <i>shape</i> of the
            alleged failure is the shape the framework was built to defend against.
          </p>
        </Section>

        <Section title="Mapped to the five failure modes" tone="neg">
          <p>
            The framework names five recurring failure modes that have destroyed compliance
            categories before. Delve maps to all five.
          </p>
          <ol className="space-y-4 mt-4 list-decimal list-outside pl-5 text-surface-700">
            <FailureMode
              n={1}
              name="Trust-arbitrage failure"
              definition="Selling certification artifacts as the product instead of underlying outcomes."
              evidence={
                <>
                  Reporting alleges that of 494 SOC 2 reports analyzed, 493 were essentially
                  identical — only the company name, logo, and signature swapped, including
                  identical grammatical errors across every client. <Cite n={1} /> The artifact{' '}
                  <i>was</i> the product; the substance under it was reportedly templated.
                </>
              }
            />
            <FailureMode
              n={2}
              name="Theater versus substance"
              definition="Outputs that look like compliance but don't verify the underlying state."
              evidence={
                <>
                  Auditor conclusions and test results were allegedly fully populated{' '}
                  <i>before</i> clients submitted company descriptions, network diagrams, or any
                  evidence of controls — a direct violation of AICPA independence rules.{' '}
                  <Cite n={1} /> A pre-written conclusion is the definitional opposite of
                  verification.
                </>
              }
            />
            <FailureMode
              n={3}
              name="Conflict of interest"
              definition="Verifier paid by the verified entity, with no structural independence."
              evidence={
                <>
                  Reporting alleges that Delve routed clients through certification mills
                  disguised as U.S. firms while itself being paid for the certification outcome.{' '}
                  <Cite n={2} /> If accurate, the customer paid Delve; Delve paid the auditor;
                  the auditor signed what Delve needed signed. That is the Andersen / Enron
                  pattern in miniature.
                </>
              }
            />
            <FailureMode
              n={4}
              name="Black-box AI failure"
              definition="AI producing compliance outputs without humans understanding what was done, why, or whether it's correct."
              evidence={
                <>
                  Delve&apos;s pitch was AI-generated SOC 2 readiness. The framework&apos;s Layer
                  2 constraint requires that AI outputs pass through documented human review
                  before becoming attestations. The reported pattern of identical templates
                  across 493 clients suggests the human-review gate was either absent or
                  ceremonial. <Cite n={1} /> Layer 2&apos;s &ldquo;AI output review gate&rdquo;
                  constraint exists specifically to prevent this.
                </>
              }
            />
            <FailureMode
              n={5}
              name="Velocity over rigor"
              definition="Business pressure to ship audits or certifications faster than they can be done well. Speed claims become trust claims become fraud."
              evidence={
                <>
                  Volume and speed were the pitch. 494 SOC 2 reports through one shop, with
                  auditor conclusions pre-populated, is the failure mode in its purest form.
                  Layer 1 Veto 5 (&ldquo;does our pricing model create financial pressure to skip
                  work?&rdquo;) is the gate the framework would have triggered on at the
                  business-model layer, before a single client signed.
                </>
              }
            />
          </ol>
        </Section>

        <Section title="Mapped to the vendor scorecard">
          <p>
            The framework&apos;s{' '}
            <Link
              href="/framework/v1#scorecard"
              className="text-brand-700 hover:text-brand-800 underline"
            >
              vendor scorecard
            </Link>{' '}
            is six yes/no questions. Score below 5 is information. Scoring Delve from public
            reporting:
          </p>
          <div className="mt-6 rounded-xl border border-surface-200 bg-white overflow-hidden">
            <ScoreRow
              n={1}
              question="Public methodology page existed?"
              answer="No (or non-substantive)"
              detail="No public, versioned methodology page describing how a SOC 2 readiness output was produced has surfaced in any of the reporting we reviewed. A genuine methodology page would have made the alleged template-copying visible to anyone who read it."
            />
            <ScoreRow
              n={2}
              question="Refund-on-failure clause in standard MSA?"
              answer="Not reported"
              detail="No public reporting indicates a refund-on-failure clause was a standard MSA term. A vendor that built its revenue on volume-priced readiness packages has structural pressure against refund clauses, since one refund per failed audit erases the unit economics."
            />
            <ScoreRow
              n={3}
              question="Independent third-party audit, annually, with public findings?"
              answer="No"
              detail="The vendor itself was not subject to an independent annual review of its methodology. The third-party audit chain Delve placed clients into is the chain whose independence is now contested. Reverse-pattern: the failure WAS the missing audit."
            />
            <ScoreRow
              n={4}
              question="Per-product INTEGRITY.md (or equivalent) in public repo?"
              answer="No"
              detail="No public per-product integrity statement has surfaced. The kind of artifact that would say 'AI Output Review Gates: PARTIAL — gate is currently advisory only' would have flagged the failure mode at file commit, before allegations surfaced."
            />
            <ScoreRow
              n={5}
              question="AI output review gate structurally enforced, not policy-only?"
              answer="No (per allegations)"
              detail="The reported pattern of 493 near-identical reports with pre-populated conclusions is the central failure. Whatever review gate existed did not prevent template-shaped output from reaching customer-facing artifacts. A CI-enforced gate (database column required for sign-off, build fails without it) would have made this failure visible at engineering time, not at whistleblower time."
            />
            <ScoreRow
              n={6}
              question="Public kill criteria with specific thresholds?"
              answer="No"
              detail="No public document specified the conditions under which Delve would sunset the SOC 2 product. Public kill criteria force the operator to have an answer to 'at what error rate or independence breach do we shut this down' — before they need the answer."
            />
          </div>
          <p className="mt-6 font-medium text-surface-900">Score: 0 / 6.</p>
          <p className="mt-3 text-surface-700">
            Six rows. Six no&apos;s. Any one of them, addressed publicly and substantively, would
            have been a structural commitment against the alleged behavior. The absence of all
            six is the shape of the failure.
          </p>
        </Section>

        <Section title="What the framework would have caught, when" tone="pos">
          <p>
            The framework is layered on purpose. Each layer catches a different stage of the
            failure. Walked against Delve:
          </p>
          <div className="space-y-4 mt-6">
            <Stage
              layer="Layer 1 — Pre-build vetoes"
              what="Veto 1 (artifact vs outcome) and Veto 2 (independence) would have flagged the business model before code shipped. A vendor pitched as 'AI SOC 2 reports for $X' fails Veto 1 at the pitch deck. A vendor that takes payment from the customer AND mediates the auditor relationship fails Veto 2 at the org chart."
              when="Before the company existed."
            />
            <Stage
              layer="Layer 2 — Architectural constraints"
              what="The 'AI output review gate' constraint requires a documented review step before AI output becomes a customer-facing claim. CI rules enforce that an attestation row cannot be marked ready without a populated review-gate column. A build that allows template outputs to skip the gate fails the build, not the audit."
              when="At every commit, every PR."
            />
            <Stage
              layer="Layer 3 — Operational guardrails"
              what="Annual independent audit of the vendor itself, public methodology, public kill criteria, refund-on-failure. Each of these creates external accountability that whistleblower posts then add to, rather than substituting for. A vendor with all four would have had a public answer to every March 2026 allegation already on file."
              when="Continuously, with annual audit refresh."
            />
          </div>
          <p className="mt-6 text-surface-600">
            The framework does not assume operators are saints. It assumes operators are under
            pressure and that pressure occasionally wins. The layered defense is what survives
            one bad quarter, one bad hire, one bad investor demand.
          </p>
        </Section>

        <Section title="What we updated in v1.0 because of this">
          <p>
            v1.0 was published before the Delve allegations broke. We re-read the framework after
            reading the reporting and noted two places it could be sharper. Both are tagged{' '}
            <span className="font-mono text-[10px] uppercase tracking-widest text-brand-600">
              v1.1 candidate
            </span>{' '}
            on the spec page:
          </p>
          <ul className="space-y-3 mt-4 list-disc list-outside pl-5 text-surface-700">
            <li>
              <b className="text-surface-900">
                Layer 2 constraint: explicit prohibition on pre-population of attestation
                outputs.
              </b>{' '}
              The current AI-review-gate constraint covers it implicitly. Naming it explicitly
              makes the CI rule easier to write and the violation easier to spot. Rule ID:{' '}
              <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">
                CRIT-SV-NO-PRE-POPULATED-ATTESTATION
              </code>
              .
            </li>
            <li>
              <b className="text-surface-900">
                Layer 3 guardrail: third-party identity verification for sub-processor auditors.
              </b>{' '}
              When a compliance product routes evidence through a third-party auditor, the
              auditor&apos;s identity and accreditation should be verified at sub-processor
              onboarding and re-verified annually. Trust-but-verify on the sub-processor chain.
            </li>
          </ul>
          <p className="mt-4 text-surface-700">
            Both candidate items are tagged in the spec at{' '}
            <Link href="/framework/v1" className="text-brand-700 hover:text-brand-800 underline">
              /framework/v1
            </Link>
            . The CI rule for the Layer 2 candidate already ships in the integrity-cli base
            manifest as a content-based co-occurrence check (revised in v1.4.0); the calibration
            against a real codebase happened during the FieldLedger audit — see{' '}
            <Link
              href="/framework/cases/fieldledger"
              className="text-brand-700 hover:text-brand-800 underline"
            >
              that case study
            </Link>{' '}
            for the rule revision history.
          </p>
          <p className="mt-4 text-surface-600">
            The point of versioning is that case studies like this one actually move the
            framework forward. We&apos;ll cite this page in the v1.1 changelog when the spec
            text catches up.
          </p>
        </Section>

        <Section id="sources" title="Sources" muted>
          <p>
            Every factual claim above is sourced to public reporting or to Delve&apos;s own
            public statements. If you find a material error, email{' '}
            <a
              className="text-brand-700 hover:text-brand-800 underline"
              href="mailto:integrity@startvest.ai"
            >
              integrity@startvest.ai
            </a>{' '}
            and we&apos;ll correct it with a dated changelog entry on this page.
          </p>
          <ol className="space-y-3 mt-4 list-decimal list-outside pl-5 text-surface-700">
            <li id="src-1">
              <i>
                The Delve Scandal: How Two 21-Year-Old Forbes 30 Under 30 Founders Built a $300M
                &ldquo;AI Compliance&rdquo; Unicorn — And Are Now Accused of Selling Fake
                Reports
              </i>
              . QUASA Media, 2026.{' '}
              <a
                href="https://quasa.io/media/the-delve-scandal-how-two-21-year-old-forbes-30-under-30-founders-built-a-300m-ai-compliance-unicorn-and-are-now-accused-of-selling-fake-reports"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-700 hover:text-brand-800 underline break-all"
              >
                quasa.io
              </a>
            </li>
            <li id="src-2">
              <i>
                The Delve Scandal: Fake SOC 2 Audits, Open-Source Code Theft, and Exit from Y
                Combinator
              </i>
              . Captain Compliance, 2026.{' '}
              <a
                href="https://captaincompliance.com/news/the-delve-scandal-fake-soc-2-audits-open-source-code-theft-and-exit-from-y-combinator/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-700 hover:text-brand-800 underline break-all"
              >
                captaincompliance.com
              </a>
            </li>
            <li id="src-3">
              <i>
                Compliance startup Delve removed from Y Combinator portfolio after anonymous
                whistleblower posts spark investor exodus
              </i>
              . Silicon Canals, April 2026.{' '}
              <a
                href="https://siliconcanals.com/sc-n-compliance-startup-delve-removed-from-y-combinator-portfolio-after-anonymous-whistleblower-posts-spark-investor-exodus/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-700 hover:text-brand-800 underline break-all"
              >
                siliconcanals.com
              </a>
            </li>
            <li id="src-4">
              <i>
                The Delve Scandal: A Y Combinator Darling Just Got Hit With a Bombshell Fraud
                Accusation
              </i>
              . Inc., 2026.{' '}
              <a
                href="https://www.inc.com/ben-sherry/the-delve-scandal-a-y-combinator-darling-just-got-hit-with-a-bombshell-fraud-accusation/91320652"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-700 hover:text-brand-800 underline break-all"
              >
                inc.com
              </a>
            </li>
          </ol>
        </Section>

        <Section title="Changelog">
          <ul className="space-y-3 list-disc list-outside pl-5 text-surface-700">
            <li>
              <b className="text-surface-900">
                {PUBLISHED} — v{VERSION}.
              </b>{' '}
              Initial publication. First case study under{' '}
              <Link href="/framework/v1" className="text-brand-700 hover:text-brand-800 underline">
                The Integrity Framework v1.0
              </Link>
              .
            </li>
          </ul>
        </Section>

        <section className="px-4 sm:px-6 lg:px-8 py-12 bg-surface-50 border-t border-surface-200">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <p className="text-xs font-semibold uppercase tracking-widest text-surface-500 mb-3">
                Related
              </p>
              <ul className="grid sm:grid-cols-2 gap-3 text-sm">
                <li>
                  <Link
                    href="/framework"
                    className="text-brand-700 hover:text-brand-800 underline"
                  >
                    The Integrity Framework
                  </Link>
                </li>
                <li>
                  <Link
                    href="/framework/v1"
                    className="text-brand-700 hover:text-brand-800 underline"
                  >
                    Frozen v1.0 (citation-stable URL)
                  </Link>
                </li>
                <li>
                  <Link
                    href="/framework/v1#scorecard"
                    className="text-brand-700 hover:text-brand-800 underline"
                  >
                    Vendor scorecard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/framework/cases/fieldledger"
                    className="text-brand-700 hover:text-brand-800 underline"
                  >
                    FieldLedger audit case study
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}

function Section({
  id,
  title,
  children,
  tone = 'default',
  muted = false,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
  tone?: 'default' | 'neg' | 'pos';
  muted?: boolean;
}) {
  const accent =
    tone === 'neg'
      ? 'before:bg-surface-900'
      : tone === 'pos'
        ? 'before:bg-brand-600'
        : 'before:bg-surface-300';
  return (
    <section
      id={id}
      className={`px-4 sm:px-6 lg:px-8 py-12 md:py-16 border-b border-surface-200 scroll-mt-20 ${
        muted ? 'bg-surface-50' : 'bg-white'
      }`}
    >
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <h2
            className={`font-display text-2xl md:text-3xl font-semibold text-surface-900 tracking-tight mb-6 relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:rounded-full ${accent}`}
          >
            {title}
          </h2>
          <div className="space-y-4 text-base md:text-lg leading-relaxed text-surface-700">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

function FailureMode({
  n,
  name,
  definition,
  evidence,
}: {
  n: number;
  name: string;
  definition: string;
  evidence: React.ReactNode;
}) {
  return (
    <li className="rounded-xl border border-surface-200 bg-white p-5 md:p-6">
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-mono text-xs uppercase tracking-widest text-surface-900 shrink-0">
          Mode {String(n).padStart(2, '0')}
        </span>
        <h3 className="font-semibold text-surface-900 text-base md:text-lg">{name}</h3>
      </div>
      <p className="text-surface-600 italic mb-3 text-sm md:text-base leading-relaxed">
        {definition}
      </p>
      <p className="text-surface-700 leading-relaxed">{evidence}</p>
    </li>
  );
}

function ScoreRow({
  n,
  question,
  answer,
  detail,
}: {
  n: number;
  question: string;
  answer: string;
  detail: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-x-4 gap-y-2 p-5 md:p-6 border-b border-surface-200 last:border-b-0">
      <div className="font-mono text-xs uppercase tracking-widest text-brand-600 md:pt-1">
        Q{String(n).padStart(2, '0')}
      </div>
      <div>
        <p className="font-semibold text-surface-900 mb-1 text-base md:text-lg">{question}</p>
        <p className="font-mono text-xs uppercase tracking-widest text-surface-900 mb-2">
          {answer}
        </p>
        <p className="text-surface-700 leading-relaxed text-sm md:text-base">{detail}</p>
      </div>
    </div>
  );
}

function Stage({
  layer,
  what,
  when,
}: {
  layer: string;
  what: string;
  when: string;
}) {
  return (
    <div className="rounded-xl border border-surface-200 bg-white p-5 md:p-6">
      <p className="font-mono text-xs uppercase tracking-widest text-brand-600 mb-2">{layer}</p>
      <p className="text-surface-700 leading-relaxed mb-3">{what}</p>
      <p className="text-surface-600 leading-relaxed text-sm">
        <span className="font-mono text-[10px] uppercase tracking-widest text-surface-500 mr-2">
          When
        </span>
        {when}
      </p>
    </div>
  );
}

function Cite({ n }: { n: number }) {
  return (
    <a
      href={`#src-${n}`}
      className="text-brand-700 hover:text-brand-800 no-underline align-super text-xs font-mono"
      aria-label={`source ${n}`}
    >
      [{n}]
    </a>
  );
}
