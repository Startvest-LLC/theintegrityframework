import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

const VERSION = '1.0';
const PUBLISHED = '2026-04-29';
const PAGE_URL = `${site.url}/framework/cases/hireposture`;

export const metadata: Metadata = {
  title: 'Case study: Hireposture',
  description:
    "Fourth internal portfolio audit under The Integrity Framework v1.0. Hireposture scored 16 PASS / 3 PARTIAL or NEEDS UPDATE / 1 OUT-OF-SEGMENT / 0 FAIL across 20 dimensions. The audit drove v1.8.0 — accepting snake_case marker variants surfaced by HP's data-input provenance pattern (customer_attested) versus FL's output-attestation provenance pattern (RateSnapshotJson).",
  alternates: { canonical: '/framework/cases/hireposture' },
  openGraph: {
    title: 'Case study: Hireposture, the candidate-data calibration',
    description:
      'Hireposture uses different marker names than FieldLedger. Both satisfy Layer 2 Constraint 3 — at different layers. The framework now accepts both forms.',
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
  headline: 'Case study: Hireposture',
  description:
    'Fourth internal portfolio audit. Calibration around the candidate-data-vs-compliance-attestation distinction.',
  author: { '@type': 'Organization', name: 'Startvest LLC', url: 'https://startvest.ai' },
  publisher: { '@type': 'Organization', name: 'Startvest LLC', url: 'https://startvest.ai' },
  datePublished: `${PUBLISHED}T00:00:00Z`,
  dateModified: `${PUBLISHED}T00:00:00Z`,
  mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
  url: PAGE_URL,
  inLanguage: 'en-US',
  isBasedOn: `${site.url}/framework/v1`,
};

export default function HirepostureCasePage() {
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
                Hireposture, the candidate-data calibration.
              </h1>
              <p className="text-lg text-surface-600 leading-relaxed">
                Fourth internal audit under{' '}
                <Link href="/framework/v1" className="text-brand-700 hover:text-brand-800 underline">
                  The Integrity Framework v1.0
                </Link>
                . Hireposture is structurally aligned with the framework but uses different marker
                names than the reference implementation. The audit codified the
                candidate-data-vs-compliance-attestation distinction in v1.8.0.
              </p>
              <p className="mt-4 text-base text-surface-500 leading-relaxed">
                Source documents are public:{' '}
                <a
                  href="https://github.com/Startvest-LLC/hireposture/blob/main/INTEGRITY.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-700 hover:text-brand-800 underline"
                >
                  Hireposture&apos;s INTEGRITY.md
                </a>{' '}
                and{' '}
                <a
                  href="https://github.com/Startvest-LLC/hireposture/blob/main/audits/tif-compliance.md"
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
            Hireposture is a Startvest LLC product. Pre-posting compliance check for job
            descriptions, scoped to ADA Title I qualification-standard risk. Two surfaces: an audit
            pipeline (paste a JD, get findings against a curated rule library) and a memo-plus-audit-trail
            output designed to be defensible inside an EEOC charge investigation. The product
            never certifies a JD as compliant — every memo carries an explicit &ldquo;not legal
            advice&rdquo; disclaimer and recommends employment-counsel review.
          </p>
          <p>
            ADA-related categories carry the same overlay-vendor failure pressure that destroyed
            accessiBe and similar. Hireposture is built on the inverse premise: documented chain
            over certification artifact.
          </p>
        </Section>

        <Section title="Headline result" tone="pos">
          <div className="rounded-xl border border-surface-200 bg-white p-5 md:p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-600 mb-2">
              20 dimensions · Layer 1 vetoes (6) + Layer 2 constraints (7) + Layer 3 guardrails (7)
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              <Stat label="Pass" value="16" />
              <Stat label="Partial / Needs update" value="3" />
              <Stat label="Out-of-segment" value="1" />
              <Stat label="Fail" value="0" />
            </div>
            <p className="mt-4 text-sm text-surface-600">
              Vendor scorecard (TIF v1.0): 4 YES / 0 PARTIAL / 2 NO. Open scorecard rows: MSA refund
              clause (counsel-blocked) and annual independent audit (deferred pending external
              funding, honestly classified — buyer-driven for the mid-market HR tier).
            </p>
          </div>
          <p className="mt-6">
            Layer 2 was 7/7 PASS after the v1.8.0 calibration. Layer 1 had one PARTIAL — Veto 6
            (TechCrunch Test) is honestly framed as PRE-COUNSEL-REVIEW; flips PASS when the rule
            library is attorney-attested and the marketing copy passes UPL review. Layer 3 has the
            standard portfolio open items: MSA refund clause and accountability community.
          </p>
        </Section>

        <Section title="The headline finding: candidate-data vs compliance-attestation" tone="pos">
          <p>
            Hireposture&apos;s Layer 2 architecture is structurally aligned with the framework but
            uses different marker names than FieldLedger (the reference implementation). On first
            run, two CRITICAL rules failed:{' '}
            <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">CRIT-SV-AI-REVIEW-GATE</code> and{' '}
            <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">CRIT-SV-NO-PRE-POPULATED-ATTESTATION</code>.
            Both turned out to be marker-naming false negatives.
          </p>

          <div className="mt-6 rounded-xl border border-surface-200 bg-white overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3 p-5 md:p-6 border-b border-surface-200">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-surface-500 mb-1">
                  Constraint
                </p>
                <p className="text-surface-900">L2 C2 — AI Output Review Gates</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-surface-500 mb-1">
                  FieldLedger marker
                </p>
                <p className="text-surface-700">
                  <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">reviewedBy</code>{' '}
                  (camelCase, on AI-output rows)
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-surface-500 mb-1">
                  Hireposture marker
                </p>
                <p className="text-surface-700">
                  <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">signed_by_user_id</code>{' '}
                  (snake_case, on Hireposture_AuditMemos)
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3 p-5 md:p-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-surface-500 mb-1">
                  Constraint
                </p>
                <p className="text-surface-900">L2 C3 — Self-Attestation Isolation</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-surface-500 mb-1">
                  FieldLedger marker
                </p>
                <p className="text-surface-700">
                  <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">RateSnapshotJson</code>{' '}
                  (output-attestation provenance: did this rate-letter reference customer-submitted
                  evidence?)
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-surface-500 mb-1">
                  Hireposture marker
                </p>
                <p className="text-surface-700">
                  <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">customer_attested</code>{' '}
                  (data-input provenance: is this finding&apos;s source field rule_match,
                  llm_extraction, or customer_attested?)
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6 font-medium text-surface-900">
            Both products satisfy the constraint. They just label it differently, at different
            layers — input-data provenance vs output-attestation provenance. The framework had been
            calibrated against FL&apos;s naming and didn&apos;t anticipate HP&apos;s legitimate
            variants.
          </p>
        </Section>

        <Section title="Framework revision: v1.8.0">
          <p>Widened required-pattern lists for both rules:</p>
          <ul className="mt-4 space-y-2 list-disc list-outside pl-5 text-surface-700">
            <li>
              <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">CRIT-SV-AI-REVIEW-GATE</code>{' '}
              now also accepts <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">signed_by</code>,{' '}
              <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">signedBy</code>,{' '}
              <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">signed_by_user_id</code>{' '}
              as review-gate markers.
            </li>
            <li>
              <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">
                CRIT-SV-NO-PRE-POPULATED-ATTESTATION
              </code>{' '}
              now also accepts snake_case variants of the existing markers (
              <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">customer_attested</code>,{' '}
              <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">attested_by</code>,{' '}
              <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">submitted_by</code>,{' '}
              <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">reviewed_by</code>,
              etc.).
            </li>
          </ul>
          <p className="mt-4 text-surface-700">
            The framework now accepts both forms because both indicate the constraint is
            structurally enforced. Backwards-compatible against FL/CL/IL: identical pass counts to
            v1.7.0.
          </p>
          <p className="mt-3 text-surface-700">
            This is the candidate-data-vs-compliance-attestation distinction the audit anticipated,
            codified. It is also the foundation for the v1.9.0 third C3 axis (validation-gate)
            that ADAComplianceDocs surfaced one audit later.
          </p>
        </Section>

        <Section title="Open items at audit close">
          <p>Eleven remediation tickets opened. Most are counsel-blocked — Hireposture sits in a category where the line between a workflow tool and unauthorized practice of law is fragile and counsel review is the gating step.</p>
          <div className="mt-6 rounded-xl border border-surface-200 bg-white overflow-hidden">
            <BacklogRow
              priority="P0"
              layer="Layer 3 G1"
              title="Finalize MSA refund-on-failure clause (counsel-blocked)"
              note="~4-5 month counsel review window. Pro-rated refund clause for documented memo errors or missed patterns."
            />
            <BacklogRow
              priority="P1"
              layer="Layer 1 V6"
              title="Employment counsel review of rule library (UPL exposure)"
              note="32 rules in v0.1-bootstrap curated from public sources but not legally attested. Veto 6 flips PARTIAL → PASS on attestation."
            />
            <BacklogRow
              priority="P1"
              layer="Layer 1 V6"
              title="Employment counsel review of marketing copy"
              note="UPL exposure on every claim made about what the product does."
            />
            <BacklogRow
              priority="P1"
              layer="Contracts"
              title="Draft DPA template (counsel-blocked)"
              note="Required for enterprise procurement."
            />
            <BacklogRow
              priority="P1"
              layer="Layer 1 V2"
              title="Attorney content partnership BD"
              note="Year-1 attorney content partnership (Fisher Phillips / Ogletree / Jackson Lewis / Seyfarth) is upstream content licensing, not downstream certification."
            />
            <BacklogRow
              priority="P1"
              layer="Security"
              title="Pen test execution"
              note="ZAP automated scan or external tester before public launch."
            />
            <BacklogRow
              priority="P1"
              layer="Quality"
              title="Test coverage on critical paths"
              note="Audit pipeline, memo signing gate, Stripe webhook, multi-tenant isolation, first-signin workspace provisioning."
            />
            <BacklogRow
              priority="P2"
              layer="Layer 2 C5 (UX)"
              title="Complete workspace cancellation flow + add is_active column"
              note="Trail retention is enforced at the DB-trigger layer. Cancellation UX is incomplete."
            />
            <BacklogRow
              priority="P2"
              layer="Layer 3 G6"
              title="Engage accountability community"
              note="NDRN, AAPD, plaintiff-side ADA attorneys, JAN."
            />
            <BacklogRow
              priority="P2"
              layer="CLI rule hygiene"
              title="Rename CRIT-SV-MEMO-SIGNATURE-GATE → CRIT-HP-MEMO-SIGNATURE-GATE"
              note="Per CRIT-SV-NO-BASE-ID-OVERRIDE, the SV namespace is reserved for the base manifest."
            />
            <BacklogRow
              priority="P1 (shared)"
              layer="Layer 3 G5"
              title="integrity@startvest.ai mailbox provisioning"
              note="Same shared resolution as FL/CL/IL/ADA."
            />
          </div>
        </Section>

        <Section title="What this teaches">
          <ol className="space-y-3 mt-2 list-decimal list-outside pl-5 text-surface-700">
            <li>
              <b className="text-surface-900">Marker naming is real architecture, not just style.</b>{' '}
              snake_case vs camelCase, output-attestation vs input-data provenance — different
              naming reflects different legitimate Layer 2 implementations.
            </li>
            <li>
              <b className="text-surface-900">
                Required-pattern lists must be widened cautiously, not narrowed.
              </b>{' '}
              v1.8.0 added markers; never removed them. Backwards-compat is a hard constraint —
              every product that passed before passes after.
            </li>
            <li>
              <b className="text-surface-900">
                Pre-counsel-review is a legitimate Veto 6 PARTIAL.
              </b>{' '}
              Counsel review takes time and money. Honest classification beats forcing PASS.
              Hireposture explicitly avoids &ldquo;attorney-curated&rdquo; marketing claims until
              attestation lands.
            </li>
          </ol>
        </Section>

        <Section title="Reproducibility" muted>
          <pre className="mt-2 rounded-md bg-surface-900 text-surface-100 px-4 py-3 overflow-x-auto text-sm font-mono">
{`# from a clone of the integrity-cli repo
node bin/integrity.mjs check ../hireposture --format=json \\
  > ../hireposture/audits/tif-compliance.cli-output.json`}
          </pre>
        </Section>

        <Section title="Changelog">
          <ul className="space-y-3 list-disc list-outside pl-5 text-surface-700">
            <li>
              <b className="text-surface-900">
                {PUBLISHED} — v{VERSION}.
              </b>{' '}
              Initial publication. Drove base manifest v1.8.0 (snake_case marker variants;
              candidate-data-vs-compliance-attestation distinction codified).
            </li>
          </ul>
        </Section>

        <RelatedFooter slug="hireposture" />
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
