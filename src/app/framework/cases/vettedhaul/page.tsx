import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

const VERSION = '1.0';
const PUBLISHED = '2026-05-21';
const PAGE_URL = `${site.url}/framework/cases/vettedhaul`;

export const metadata: Metadata = {
  title: 'Case study: VettedHaul',
  description:
    "Fifth internal portfolio audit under The Integrity Framework. VettedHaul is a pre-product compliance tool audited at v1.0 launch. 10/10 PASS, 6 of those vacuous — the framework correctly recognized that most Layer 2 constraints don't yet apply to a marketing-site + waitlist state. Surfaced a v1.10.1 candidate around Next.js App Router glob coverage.",
  alternates: { canonical: '/framework/cases/vettedhaul' },
  openGraph: {
    title: 'Case study: VettedHaul, TIF at v1.0 product launch',
    description:
      'A pre-product compliance tool audited at launch. The framework working as designed when the failure modes simply have no surface yet.',
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
  headline: 'Case study: VettedHaul',
  description:
    'Fifth internal portfolio audit. Pre-product compliance tool at v1.0 launch. 10/10 PASS with honest vacuous-pass framing.',
  author: { '@type': 'Organization', name: 'Startvest LLC', url: 'https://startvest.ai' },
  publisher: { '@type': 'Organization', name: 'Startvest LLC', url: 'https://startvest.ai' },
  datePublished: `${PUBLISHED}T00:00:00Z`,
  dateModified: `${PUBLISHED}T00:00:00Z`,
  mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
  url: PAGE_URL,
  inLanguage: 'en-US',
  isBasedOn: `${site.url}/framework/v1`,
};

export default function VettedHaulCasePage() {
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
                VettedHaul, TIF at v1.0 product launch.
              </h1>
              <p className="text-lg text-surface-600 leading-relaxed">
                Fifth internal audit under{' '}
                <Link href="/framework/v1" className="text-brand-700 hover:text-brand-800 underline">
                  The Integrity Framework v1.0
                </Link>
                . VettedHaul (https://vettedhaul.com) launched 2026-05-19 as a waitlist
                landing site plus marketing-content cluster, brand brief, integrity statement,
                methodology page, and IndexNow auto-push. The product&apos;s central
                capability — capture-at-booking carrier vetting with cryptographic lock —
                is documented as planned, not shipped. This is the first audit of a Startvest
                product in that exact state, and the case study is about how the framework
                handles it.
              </p>
              <p className="mt-4 text-base text-surface-500 leading-relaxed">
                Source documents are public:{' '}
                <a
                  href="https://github.com/Startvest-LLC/vettedhaul/blob/main/INTEGRITY.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-700 hover:text-brand-800 underline"
                >
                  VettedHaul&apos;s INTEGRITY.md
                </a>{' '}
                and{' '}
                <a
                  href="https://github.com/Startvest-LLC/vettedhaul/blob/main/audits/tif-compliance.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-700 hover:text-brand-800 underline"
                >
                  audits/tif-compliance.md
                </a>
                . Live integrity statement:{' '}
                <a
                  href="https://vettedhaul.com/integrity"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-700 hover:text-brand-800 underline"
                >
                  vettedhaul.com/integrity
                </a>
                . Methodology:{' '}
                <a
                  href="https://vettedhaul.com/methodology"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-700 hover:text-brand-800 underline"
                >
                  vettedhaul.com/methodology
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <Section title="What was audited">
          <p>
            VettedHaul is a Startvest LLC product. Defensible carrier vetting + subpoena-ready
            audit trail for freight brokers, built around the legal standard the US Supreme
            Court created in Montgomery v. Caribe Transport II (9-0, 2026-05-14). Standalone
            Next.js 15 (App Router, no <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">src/</code>{' '}
            prefix) on Azure App Service Linux. Pre-customer at audit time; ~80 marketing pages
            shipped, no capture pipeline.
          </p>
        </Section>

        <Section title="Headline result" tone="pos">
          <div className="rounded-xl border border-surface-200 bg-white p-5 md:p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-600 mb-2">
              10 rules · base manifest v1.10.0 · @startvest/integrity-cli
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              <Stat label="Active PASS" value="4" />
              <Stat label="Vacuous PASS" value="6" />
              <Stat label="FAIL" value="0" />
              <Stat label="Total" value="10" />
            </div>
            <p className="mt-4 text-sm text-surface-600">
              Six of ten rules pass vacuously because their candidate files do not exist in
              this repo. VettedHaul at v1.0 is a marketing site + waitlist + integrity/methodology
              pages — there is no AI invocation, no customer offboarding path, no attestation
              publish path, no validation gate to ship yet. The framework correctly recognizes
              that scope.
            </p>
          </div>
          <p className="mt-6 font-medium text-surface-900">
            The framework working as designed: a pre-product compliance tool is not
            manufactured into failure by rules whose failure modes have no surface yet.
            They activate when the corresponding code ships.
          </p>
          <p>
            The four active passes (NO-BASE-ID-OVERRIDE, INTEGRITY-MD, NO-SILENT-PASS,
            METHODOLOGY-VERSIONED) are the rules that meaningfully apply to a pre-product
            compliance tool at launch. All four pass.
          </p>
        </Section>

        <Section title="One finding drove a framework calibration candidate">
          <p>
            VettedHaul&apos;s code substance was clean. The framework&apos;s glob coverage
            against the standard Next.js App Router layout was not.
          </p>

          <div className="mt-6 space-y-4">
            <RuleRevision
              ruleId="HIGH-SV-METHODOLOGY-VERSIONED"
              wasFlagged="FAIL — methodology page exists but does not include the required Version heading. Found <Section title='Changelog'> but no <Section title='Version'>."
              actualCode="VettedHaul's methodology page initially carried the version stamp in body text only ('Methodology · v1.0 · published 2026-05-21' as a paragraph). The Changelog section heading existed; the Version section heading did not."
              resolution="Added <Section title='Version'> as an explicit heading on the methodology page. Substantively the constraint was already met (the version is documented and changes-history is tracked); the rule requires the heading itself so auditors can grep for it programmatically. Pre-fix: 9/10 PASS with 1 HIGH FAIL. Post-fix: 10/10 PASS."
            />
            <RuleRevision
              ruleId="(framework-level) v1.10.1 candidate — App Router glob coverage"
              wasFlagged="VAC — INFO-SV-TRUST-PRINCIPLES-LINK and others target src/app/** / apps/*/src/app/** but the standard Next.js App Router scaffold has the routes directly under app/** (no src/ prefix)."
              actualCode="VettedHaul is the first standalone-Next.js (not monorepo, no src/ prefix) product audited. Pre-existing brand audits all ran against monorepo or src/app/-prefixed structures. Three rules in v1.10.0 (HIGH-SV-EVIDENCE-RETENTION, HIGH-SV-METHODOLOGY-VERSIONED, INFO-SV-TRUST-PRINCIPLES-LINK) include app/** as an additional glob; others don't. Partial coverage."
              resolution="Filed as a v1.10.1 candidate: extend the rule globs to recognize app/** consistently across rules where the failure mode applies. VettedHaul's audit is not blocked by this; the vacuous-pass framing is honest. Surfaced rather than forced — same pattern as IdeaLift's v1.6.0 monorepo glob widening case."
            />
          </div>
        </Section>

        <Section title="The case-study value">
          <p>
            FieldLedger was designed-to-TIF. ClarityLift was partial-TIF. IdeaLift was
            retroactive TIF on a non-compliance product. AdaCompliance was the
            compliance-product baseline. VettedHaul is the fifth archetype:{' '}
            <b className="text-surface-900">
              a pre-product compliance tool audited at launch, before the central
              customer-facing capabilities ship.
            </b>
          </p>
          <p>
            Three observations carry forward to adopters considering TIF on a new product
            launch:
          </p>
          <ol className="space-y-3 mt-4 list-decimal list-outside pl-5 text-surface-700">
            <li>
              <b className="text-surface-900">Honest vacuous-pass framing is the right posture at v1.0.</b>{' '}
              Most Layer 2 constraints don&apos;t apply to a waitlist landing page because
              the failure modes those constraints guard against (evidence chain decay, AI
              fabrication, customer-attestation gating) simply don&apos;t have surface yet.
              The methodology page documents what&apos;s mechanical-now versus
              aspirational-planned; the integrity statement classifies each rule with the
              same distinction. Conflating the two is the most likely v1.0 Veto 6 fail; the
              policing artifact is the integrity statement itself.
            </li>
            <li>
              <b className="text-surface-900">Calibration gaps surface one product type at a time.</b>{' '}
              v1.6.0 widened globs for monorepos when IdeaLift was audited. v1.10.1 (candidate)
              widens globs for standalone-Next.js when VettedHaul was audited. Each calibration
              is one minor version, always widening — products that passed before pass after.
            </li>
            <li>
              <b className="text-surface-900">The methodology page is the silver-tier earner.</b>{' '}
              VettedHaul listed at bronze on 2026-05-20. The methodology page + INTEGRITY.md +
              audit artifacts shipped 2026-05-21 and qualify the listing for silver via the
              methodology-page credential type. Listing tier flips to silver in the same
              PR that adds this case study.
            </li>
          </ol>
        </Section>

        <Section title="Open items at audit close">
          <p>Items tracked at audit close, with shared-portfolio context:</p>
          <div className="mt-6 rounded-xl border border-surface-200 bg-white overflow-hidden">
            <BacklogRow
              priority="P1 (shared)"
              layer="Layer 3 G5"
              title="integrity@startvest.ai mailbox provisioning + external counsel SLA"
              note="Shared across FieldLedger, ClarityLift, Hireposture, AdaCompliance, IdeaLift, PRAPI, and now VettedHaul. One mailbox + one engagement closes seven tickets."
            />
            <BacklogRow
              priority="P2"
              layer="Pre-product"
              title="Capture-at-booking pipeline (Defender tier)"
              note="The product's central value. Marketing copy must continue to distinguish methodology (real today) from automation (planned). Tracked at the founding-customer-cohort milestone."
            />
            <BacklogRow
              priority="P3 (framework)"
              layer="v1.10.1 candidate"
              title="Widen rule globs to consistently include app/** for standalone-Next.js"
              note="Three rules already include it; others don't. Filed at Startvest-LLC/theintegrityframework. Will be a single minor-version widening (no narrowing)."
            />
            <BacklogRow
              priority="P3"
              layer="Layer 3 G7"
              title="Publish kill criteria at /service-standards or equivalent"
              note="Before Defender-tier capture pipeline ships. Specific thresholds for capture latency, lock guarantee, monitoring SLA, retention floor."
            />
          </div>
        </Section>

        <Section title="What this teaches">
          <ol className="space-y-3 mt-2 list-decimal list-outside pl-5 text-surface-700">
            <li>
              <b className="text-surface-900">
                A compliance product can publish an integrity statement before the
                compliance capabilities ship.
              </b>{' '}
              Provided the statement classifies each layer honestly (mechanical-now vs
              aspirational-planned), the framework rewards the discipline of writing it
              down. The discipline of distinguishing the methodology from the automation
              is what survives Veto 6 in practice.
            </li>
            <li>
              <b className="text-surface-900">
                Silver tier is reachable at v1.0 launch with three artifacts: methodology
                page, integrity statement, and audit matrix.
              </b>{' '}
              No production code is required for silver. The framework&apos;s silver
              credential is documentation — the public methodology page with Version +
              Changelog headings.
            </li>
            <li>
              <b className="text-surface-900">
                The 6/10 vacuous-pass count is not a framework weakness.
              </b>{' '}
              It is the framework correctly recognizing that most Layer 2 constraints have
              no surface to apply against. When the capture pipeline ships, six rules
              activate; the audit re-runs; the matrix updates. The framework is
              designed to evolve with the product, not to fabricate constraints into
              existence.
            </li>
          </ol>
        </Section>

        <Section title="Reproducibility" muted>
          <pre className="mt-2 rounded-md bg-surface-900 text-surface-100 px-4 py-3 overflow-x-auto text-sm font-mono">
{`# from a clone of the integrity-cli repo
node bin/integrity.mjs check ../VettedHaul --format=json \\
  > ../VettedHaul/audits/tif-compliance.cli-output.json`}
          </pre>
          <p className="mt-4 text-surface-700 text-sm">
            CLI version at audit time:{' '}
            <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">
              @startvest/integrity-cli
            </code>{' '}
            v1.10.0. Local clone directory matches the GitHub repo name (
            <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">
              Startvest-LLC/vettedhaul
            </code>
            ) — no historical rename to disclose.
          </p>
        </Section>

        <Section title="Changelog">
          <ul className="space-y-3 list-disc list-outside pl-5 text-surface-700">
            <li>
              <b className="text-surface-900">
                {PUBLISHED} — v{VERSION}.
              </b>{' '}
              Initial publication coinciding with VettedHaul&apos;s silver-tier listing
              upgrade (same PR as this case study). Drove a v1.10.1 candidate (app/** glob
              coverage). Establishes the fifth archetype (pre-product compliance tool at
              v1.0 launch) in the portfolio audit set.
            </li>
          </ul>
        </Section>

        <RelatedFooter slug="vettedhaul" />
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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center sm:text-left">
      <p className="font-mono text-3xl md:text-4xl font-semibold text-surface-900 leading-none">
        {value}
      </p>
      <p className="font-mono text-[10px] uppercase tracking-widest text-surface-500 mt-2">
        {label}
      </p>
    </div>
  );
}

function RuleRevision({
  ruleId,
  wasFlagged,
  actualCode,
  resolution,
}: {
  ruleId: string;
  wasFlagged: string;
  actualCode: string;
  resolution: string;
}) {
  return (
    <div className="rounded-xl border border-surface-200 bg-white p-5 md:p-6">
      <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded font-mono">{ruleId}</code>
      <div className="mt-4 space-y-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-surface-500 mb-1">
            CLI initial verdict
          </p>
          <p className="text-surface-700 leading-relaxed text-sm md:text-base">{wasFlagged}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-surface-500 mb-1">
            Manual verification
          </p>
          <p className="text-surface-700 leading-relaxed text-sm md:text-base">{actualCode}</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-brand-600 mb-1">
            Resolution
          </p>
          <p className="text-surface-700 leading-relaxed text-sm md:text-base">{resolution}</p>
        </div>
      </div>
    </div>
  );
}

function BacklogRow({
  priority,
  layer,
  title,
  note,
}: {
  priority: string;
  layer: string;
  title: string;
  note: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_auto_1fr] gap-x-4 gap-y-2 p-5 md:p-6 border-b border-surface-200 last:border-b-0">
      <div className="font-mono text-xs uppercase tracking-widest text-brand-600 md:pt-1">
        {priority}
      </div>
      <div className="font-mono text-xs uppercase tracking-widest text-surface-500 md:pt-1">
        {layer}
      </div>
      <div>
        <p className="font-semibold text-surface-900 mb-2 text-base md:text-lg">{title}</p>
        <p className="text-surface-700 leading-relaxed text-sm md:text-base">{note}</p>
      </div>
    </div>
  );
}

function RelatedFooter({ slug }: { slug: string }) {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 bg-surface-50 border-t border-surface-200">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold uppercase tracking-widest text-surface-500 mb-3">
            Related
          </p>
          <ul className="grid sm:grid-cols-2 gap-3 text-sm">
            <li>
              <Link href="/framework" className="text-brand-700 hover:text-brand-800 underline">
                The Integrity Framework
              </Link>
            </li>
            <li>
              <Link
                href="/framework/audit-log"
                className="text-brand-700 hover:text-brand-800 underline"
              >
                Audit log
              </Link>
            </li>
            <li>
              <Link href="/framework/cases" className="text-brand-700 hover:text-brand-800 underline">
                All case studies
              </Link>
            </li>
            <li>
              <Link
                href={`/listings/${slug}`}
                className="text-brand-700 hover:text-brand-800 underline"
              >
                Directory listing
              </Link>
            </li>
            <li>
              <a
                href={`https://github.com/Startvest-LLC/${slug}/blob/main/INTEGRITY.md`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-700 hover:text-brand-800 underline"
              >
                INTEGRITY.md (source)
              </a>
            </li>
            <li>
              <a
                href={`https://github.com/Startvest-LLC/${slug}/blob/main/audits/tif-compliance.md`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-700 hover:text-brand-800 underline"
              >
                Audit matrix (source)
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
