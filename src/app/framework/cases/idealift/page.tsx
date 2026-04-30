import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

const VERSION = '1.0';
const PUBLISHED = '2026-04-29';
const PAGE_URL = `${site.url}/framework/cases/idealift`;

export const metadata: Metadata = {
  title: 'Case study: IdeaLift',
  description:
    "Third internal portfolio audit under The Integrity Framework v1.0. IdeaLift is a non-compliance product audited retroactively. The framework correctly identified most TIF dimensions as N/A. The audit drove v1.6.0 (monorepo glob widening) and v1.7.0 (extension of CLAIMS-VERIFIABLE to scan Outstanding Risks for reverse drift).",
  alternates: { canonical: '/framework/cases/idealift' },
  openGraph: {
    title: 'Case study: IdeaLift, retroactive TIF on a non-compliance product',
    description:
      'What happens when the framework is applied to a product not designed against it? Most rows go N/A — and that is the framework working.',
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
  headline: 'Case study: IdeaLift',
  description:
    'Third internal portfolio audit. Retroactive TIF application on a non-compliance product. The framework working as designed.',
  author: { '@type': 'Organization', name: 'Startvest LLC', url: 'https://startvest.ai' },
  publisher: { '@type': 'Organization', name: 'Startvest LLC', url: 'https://startvest.ai' },
  datePublished: `${PUBLISHED}T00:00:00Z`,
  dateModified: `${PUBLISHED}T00:00:00Z`,
  mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
  url: PAGE_URL,
  inLanguage: 'en-US',
  isBasedOn: `${site.url}/framework/v1`,
};

export default function IdeaLiftCasePage() {
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
                IdeaLift, retroactive TIF on a non-compliance product.
              </h1>
              <p className="text-lg text-surface-600 leading-relaxed">
                Third internal audit under{' '}
                <Link href="/framework/v1" className="text-brand-700 hover:text-brand-800 underline">
                  The Integrity Framework v1.0
                </Link>
                . The reference for what TIF looks like when applied to a product not designed
                against it. Most dimensions are honestly N/A — and that is the framework working as
                designed, not failing.
              </p>
              <p className="mt-4 text-base text-surface-500 leading-relaxed">
                Source documents are public:{' '}
                <a
                  href="https://github.com/Startvest-LLC/idealift/blob/main/INTEGRITY.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-700 hover:text-brand-800 underline"
                >
                  IdeaLift&apos;s INTEGRITY.md
                </a>{' '}
                and{' '}
                <a
                  href="https://github.com/Startvest-LLC/idealift/blob/main/audits/tif-compliance.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-700 hover:text-brand-800 underline"
                >
                  audits/tif-compliance.md
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <Section title="What was audited">
          <p>
            IdeaLift is a Startvest LLC product. Decision intelligence — capture product decisions
            from Slack, Teams, and Discord; prevent decay; tell the storyline behind why decisions
            were made. Tiered SaaS. Monorepo: an{' '}
            <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">apps/web</code> Next.js
            app plus several{' '}
            <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">packages/</code>{' '}
            workspaces. AI is used for summarization and RICE-style scoring of captured decisions
            &mdash; outputs are advisory enrichments shown to the team that owns the decision, never
            customer-facing compliance claims.
          </p>
        </Section>

        <Section title="Headline result" tone="pos">
          <div className="rounded-xl border border-surface-200 bg-white p-5 md:p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-600 mb-2">
              20 dimensions · Layer 1 vetoes (6) + Layer 2 constraints (7) + Layer 3 guardrails (7)
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              <Stat label="Pass" value="9" />
              <Stat label="Needs update" value="1" />
              <Stat label="Out-of-segment" value="1" />
              <Stat label="N/A" value="9" />
            </div>
            <p className="mt-4 text-sm text-surface-600">
              The N/A count is high because IdeaLift is correctly outside TIF&apos;s primary scope:
              compliance / verification / attestation tooling. Layer 2 evidence chain integrity,
              self-attestation isolation, evidence retention; Layer 3 refund-on-failure clause,
              public methodology page, customer-side compliance owner, accountability community,
              public kill criteria — all genuinely don&apos;t apply.
            </p>
          </div>
          <p className="mt-6 font-medium text-surface-900">
            The framework working as designed: it does not manufacture gaps in products whose
            category doesn&apos;t carry TIF-relevant risk.
          </p>
          <p>
            The single open product item is the shared whistleblower-mailbox provisioning,
            tracked at the Startvest portfolio level (the same item that&apos;s open across
            FieldLedger, ClarityLift, HirePosture, and ADAComplianceDocs).
          </p>
        </Section>

        <Section title="Two findings drove framework revisions">
          <p>
            IdeaLift&apos;s code substance was clean. The framework&apos;s rules around it were
            not, and the audit drove two revisions.
          </p>

          <div className="mt-6 space-y-4">
            <RuleRevision
              ruleId="CRIT-SV-AI-REVIEW-GATE"
              wasFlagged="vacuous-pass — globs src/**, app/**, services/**, lib/** matched zero files"
              actualCode="IdeaLift is a monorepo. Production AI SDK usage lives at apps/web/src/lib/azure-openai.ts, apps/web/src/lib/distribution-cmo.ts, and apps/web/src/app/api/.../ — all of which the v1.5.0 globs missed. Substantively the constraint IS met: generatedByModel and aiReviewedAt markers exist at apps/web/src/lib/distribution-cmo.ts and the route + UI."
              resolution="Bumped base manifest to v1.6.0. Widened globs across six rules (CRIT-SV-NO-SILENT-PASS, HIGH-SV-METHODOLOGY-VERSIONED, HIGH-SV-EVIDENCE-RETENTION, CRIT-SV-NO-PRE-POPULATED-ATTESTATION, CRIT-SV-AI-REVIEW-GATE, INFO-SV-TRUST-PRINCIPLES-LINK) to include monorepo-conventional paths apps/** and packages/**. Validated backwards-compatible against FieldLedger and ClarityLift: no regressions."
            />
            <RuleRevision
              ruleId="HIGH-SV-INTEGRITY-MD-CLAIMS-VERIFIABLE (extended)"
              wasFlagged="Outstanding Risks entry claimed Trust Principles link was missing — but the link IS present at apps/web/src/app/privacy/page.tsx:241"
              actualCode="ClarityLift's case was forward drift (claim of presence; absent). IdeaLift's was the opposite: reverse drift (claim of absence; present). The v1.5.0 rule scanned only Recent Changes; Outstanding Risks was out of scope."
              resolution="Bumped base manifest to v1.7.0. Extended HIGH-SV-INTEGRITY-MD-CLAIMS-VERIFIABLE to scan multiple sections with configurable policies. New claim-absence policy for Outstanding Risks: any entry asserting something is missing/not-implemented/not-in-place must reference a file path or marker the rule can verify is genuinely absent — either a runnable sidecar assertion (file-not-contains, file-not-exists) or a structural reference. Also added the file-not-exists assertion kind."
            />
          </div>
        </Section>

        <Section title="The case-study value">
          <p>
            FieldLedger was designed-to-TIF. ClarityLift was partial-TIF. IdeaLift is the third
            archetype: a non-compliance product audited retroactively. Together the three audits
            cover the complete adoption shape an external user is likely to face. IdeaLift is the
            most relevant for adopters considering TIF on their own existing products.
          </p>
          <p>
            Three observations carry forward to that audience:
          </p>
          <ol className="space-y-3 mt-4 list-decimal list-outside pl-5 text-surface-700">
            <li>
              <b className="text-surface-900">N/A is a legitimate result, when honestly justified.</b>{' '}
              It does not mean the rule was waived. It means the constraint genuinely doesn&apos;t
              apply because the product type doesn&apos;t expose the failure mode the rule guards
              against.
            </li>
            <li>
              <b className="text-surface-900">Vacuous-pass is the new silent-pass.</b> When the
              framework&apos;s globs miss real production code, the rule passes when it
              shouldn&apos;t. Watch for it during audits, especially against monorepos and
              non-standard layouts.
            </li>
            <li>
              <b className="text-surface-900">Drift detection works in both directions.</b>{' '}
              Forward drift (claiming a feature exists when it doesn&apos;t) is the obvious case.
              Reverse drift (claiming a gap exists when it&apos;s closed) sounds harmless but is
              also wrong &mdash; the audit history loses fidelity.
            </li>
          </ol>
        </Section>

        <Section title="Open items at audit close">
          <p>Two remediation tickets opened on the IdeaLift repo:</p>
          <div className="mt-6 rounded-xl border border-surface-200 bg-white overflow-hidden">
            <BacklogRow
              priority="P1 (shared)"
              layer="Layer 3 G5"
              title="integrity@startvest.ai mailbox provisioning + external counsel SLA"
              note="Shared across FieldLedger, ClarityLift, HirePosture, ADAComplianceDocs, and IdeaLift. One mailbox + one engagement closes five tickets."
            />
            <BacklogRow
              priority="P2"
              layer="CLI rule hygiene"
              title="Rename INFO-SV-AI-DISCLOSURE → INFO-IL-AI-DISCLOSURE"
              note="Per CRIT-SV-NO-BASE-ID-OVERRIDE, the SV namespace is reserved for the base manifest. Naming hygiene only."
            />
          </div>
        </Section>

        <Section title="What this teaches">
          <ol className="space-y-3 mt-2 list-decimal list-outside pl-5 text-surface-700">
            <li>
              <b className="text-surface-900">
                Retroactive TIF mostly turns into N/A on a non-compliance product.
              </b>{' '}
              That&apos;s not the framework refusing to engage; it&apos;s the framework correctly
              recognizing scope.
            </li>
            <li>
              <b className="text-surface-900">
                Calibration gaps surface one product at a time, not all at once.
              </b>{' '}
              The monorepo case wasn&apos;t obvious until a monorepo was audited. The reverse-drift
              case wasn&apos;t obvious until reverse drift was found. The portfolio audit cycle
              calibrates the framework against the matrix of real product shapes.
            </li>
            <li>
              <b className="text-surface-900">Each calibration is one minor version, never a major.</b>{' '}
              v1.6.0 and v1.7.0 are widening (more globs, more sections, more policies) — never
              narrowing. Existing products that passed before pass after.
            </li>
          </ol>
        </Section>

        <Section title="Reproducibility" muted>
          <pre className="mt-2 rounded-md bg-surface-900 text-surface-100 px-4 py-3 overflow-x-auto text-sm font-mono">
{`# from a clone of the integrity-cli repo
node bin/integrity.mjs check ../IdeaLogger --format=json \\
  > ../IdeaLogger/audits/tif-compliance.cli-output.json`}
          </pre>
          <p className="mt-4 text-surface-700 text-sm">
            Note: the local clone directory is{' '}
            <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">IdeaLogger</code> for
            historical reasons; the GitHub repo is{' '}
            <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">Startvest-LLC/idealift</code>.
            The product was renamed.
          </p>
        </Section>

        <Section title="Changelog">
          <ul className="space-y-3 list-disc list-outside pl-5 text-surface-700">
            <li>
              <b className="text-surface-900">
                {PUBLISHED} — v{VERSION}.
              </b>{' '}
              Initial publication. Drove base manifest v1.6.0 (monorepo glob widening) and v1.7.0
              (CLAIMS-VERIFIABLE extension to Outstanding Risks).
            </li>
          </ul>
        </Section>

        <RelatedFooter slug="idealift" />
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
                Audit log (v1.2.0 → v1.10.0)
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
