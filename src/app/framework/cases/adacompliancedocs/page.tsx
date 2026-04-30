import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

const VERSION = '1.0';
const PUBLISHED = '2026-04-29';
const PAGE_URL = `${site.url}/framework/cases/adacompliancedocs`;

export const metadata: Metadata = {
  title: 'Case study: adacompliancedocs',
  description:
    "Fifth internal portfolio audit under The Integrity Framework v1.0. ADAComplianceDocs surfaced a structurally new Layer 2 shape — customer-attestation-validation-gate — that drove v1.9.0. Provenance markers say WHERE customer-attested data came from. Validation gates say WHEN it may publish.",
  alternates: { canonical: '/framework/cases/adacompliancedocs' },
  openGraph: {
    title: 'Case study: adacompliancedocs, the validation-gate axis',
    description:
      'The third C3 axis. A customer-attested status field cannot publish until system-verified evidence supports it. ADA codified the pattern; v1.9.0 made it portable.',
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
  headline: 'Case study: adacompliancedocs',
  description:
    'Fifth internal portfolio audit. Surfaced the third C3 axis: customer-attestation-validation-gate.',
  author: { '@type': 'Organization', name: 'Startvest LLC', url: 'https://startvest.ai' },
  publisher: { '@type': 'Organization', name: 'Startvest LLC', url: 'https://startvest.ai' },
  datePublished: `${PUBLISHED}T00:00:00Z`,
  dateModified: `${PUBLISHED}T00:00:00Z`,
  mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
  url: PAGE_URL,
  inLanguage: 'en-US',
  isBasedOn: `${site.url}/framework/v1`,
};

export default function AdaCompliancedocsCasePage() {
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
                adacompliancedocs, the validation-gate axis.
              </h1>
              <p className="text-lg text-surface-600 leading-relaxed">
                Fifth internal audit under{' '}
                <Link href="/framework/v1" className="text-brand-700 hover:text-brand-800 underline">
                  The Integrity Framework v1.0
                </Link>
                . ADAComplianceDocs introduced a structurally new Layer 2 shape: customer-attested
                status that cannot publish until a system-verified gate passes. The third C3 axis,
                codified in v1.9.0.
              </p>
              <p className="mt-4 text-base text-surface-500 leading-relaxed">
                Source documents are public:{' '}
                <a
                  href="https://github.com/Startvest-LLC/adacompliancedocs/blob/main/INTEGRITY.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-700 hover:text-brand-800 underline"
                >
                  adacompliancedocs&apos; INTEGRITY.md
                </a>{' '}
                and{' '}
                <a
                  href="https://github.com/Startvest-LLC/adacompliancedocs/blob/main/audits/tif-compliance.md"
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
            adacompliancedocs is a Startvest LLC product. ADA / WCAG compliance{' '}
            <i>documentation</i> tooling — not certifications. Court-ready good-faith effort
            record. Customer-published statements; customer-resolved audits. The platform never
            sells &ldquo;your site is compliant.&rdquo; Built on the inverse premise of
            overlay-vendor failures (accessiBe et al.).
          </p>
          <p>
            ADA / WCAG is the most failure-prone trust category in the framework&apos;s design.
            That category pressure is also why ADAComplianceDocs has the strongest Layer 1 framing
            in the portfolio.
          </p>
        </Section>

        <Section title="Headline result" tone="pos">
          <div className="rounded-xl border border-surface-200 bg-white p-5 md:p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-600 mb-2">
              20 dimensions · Layer 1 vetoes (6) + Layer 2 constraints (7) + Layer 3 guardrails (7)
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              <Stat label="Pass" value="14" />
              <Stat label="Partial / Needs update" value="5" />
              <Stat label="Out-of-segment" value="1" />
              <Stat label="Fail" value="0" />
            </div>
            <p className="mt-4 text-sm text-surface-600">
              Mechanical: 14/14 integrity-cli rules passed after corrections (5 base-id collision
              renames, Outstanding Risks ticket-ref backfill, Recent Changes sidecar assertions for
              high-value claims). The most consequential structural element in the entire
              portfolio&apos;s compliance posture — the conformance-claim guard at{' '}
              <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">src/lib/statements.ts</code>{' '}
              — is mechanically validated.
            </p>
          </div>
        </Section>

        <Section title="The headline finding: customer-attestation-validation-gate" tone="pos">
          <p>
            ADAComplianceDocs introduced a structurally new Layer 2 shape the framework
            hadn&apos;t previously modeled. The product&apos;s most consequential CI rule (
            <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">CRIT-AD-CONFORMANCE-CLAIM-GUARD</code>
            ) blocks{' '}
            <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">
              Platform_Statements.conformanceStatus = &apos;full&apos;
            </code>{' '}
            publishes when critical or serious axe-core findings remain open. Override permitted
            via an explicit <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">acknowledgeOpenFindings=true</code>{' '}
            parameter, but audit-logged.
          </p>
          <p className="font-medium text-surface-900">
            Customer-attested status. But the publish path must reference a system-verified
            validation gate before it can persist.
          </p>
          <p>This is structurally distinct from the existing two C3 axes:</p>
          <div className="mt-6 rounded-xl border border-surface-200 bg-white overflow-hidden">
            <AxisRow
              axis="Output-attestation provenance"
              addedIn="v1.4.0"
              says="this customer-facing attestation references customer-submitted evidence"
              example="FieldLedger's RateSnapshotJson on persisted rate letters"
            />
            <AxisRow
              axis="Input-data provenance"
              addedIn="v1.8.0"
              says="this data is labeled as customer-attested vs system-derived"
              example="Hireposture's customer_attested enum on Hireposture_AuditFindings.source"
            />
            <AxisRow
              axis="Customer-attestation validation gate"
              addedIn="v1.9.0 (this audit)"
              says="this customer-attested data cannot publish until system-verified evidence supports it"
              example="adacompliancedocs's checkConformanceGuard at src/lib/statements.ts"
              highlight
            />
          </div>
          <p className="mt-6 text-surface-700">
            Provenance markers say <i>where</i> customer-attested data came from. Validation gates
            say <i>when</i> it may publish. Different verbs, different runtime semantics. The
            principle is genuinely new, not a calibration of v1.8.0.
          </p>
        </Section>

        <Section title="Framework revision: v1.9.0">
          <p>
            Added{' '}
            <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">CRIT-SV-CUSTOMER-ATTESTATION-VALIDATION-GATE</code>{' '}
            to the base manifest. Co-occurrence rule:
          </p>
          <ul className="mt-4 space-y-2 list-disc list-outside pl-5 text-surface-700">
            <li>
              <b className="text-surface-900">Trigger.</b> Persisted entity carrying a customer-attested
              status field —{' '}
              <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">conformanceStatus</code>,{' '}
              <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">complianceStatus</code>,{' '}
              <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">attestationStatus</code>,{' '}
              <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">certificationStatus</code>,{' '}
              <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">wcagConformance</code>,
              etc., declared on a Statement / Conformance / ComplianceClaim entity.
            </li>
            <li>
              <b className="text-surface-900">Required.</b> A validation-gate function pattern (
              <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">checkConformance</code>,{' '}
              <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">conformanceGuard</code>,{' '}
              <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">validateBeforePublish</code>,{' '}
              <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">acknowledgeOpenFindings</code>,{' '}
              <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">ConformanceGuardBlockedError</code>,
              etc.) anywhere in the corpus.
            </li>
            <li>
              <b className="text-surface-900">Vacuous-pass</b> when no trigger fires. Most products
              don&apos;t have customer-attestation publish flows. Only compliance-category products
              activate this rule.
            </li>
          </ul>
          <p className="mt-4 text-surface-700">
            Validated backwards-compatible against FL/CL/IL/HP: no trigger fires (none of them have
            customer-attested status fields). ADA: trigger fires + gate present + passes.
            Trigger pattern was tightened during validation when an FL Zod schema definition
            (
            <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">
              certificationStatus = z.enum(...)
            </code>
            ) accidentally activated the rule despite FL having no customer-attestation flow.
            Calibration-fragility lesson: the trigger pattern list will need ongoing widening as
            future audits surface edge cases.
          </p>
        </Section>

        <Section title="Open items at audit close">
          <p>Seven remediation tickets opened on the adacompliancedocs repo:</p>
          <div className="mt-6 rounded-xl border border-surface-200 bg-white overflow-hidden">
            <BacklogRow
              priority="P0"
              layer="Layer 3 G1"
              title="Finalize MSA refund-on-failure clause and roll into standard template"
              note="Same shape as FL/CL/HP P0. Counsel-blocked."
            />
            <BacklogRow
              priority="P1"
              layer="Layer 2 C3"
              title="UI badging for customer-attested vs system-verified"
              note="Schema-layer isolation passes. The conformance guard ships. UI-layer visual distinction is the remaining gap."
            />
            <BacklogRow
              priority="P1"
              layer="Layer 2 C5"
              title="Statutory retention floor for audit/remediation evidence"
              note="Currently soft-delete + 30-day post-cancellation. No N-year retention floor for audit-trail records that a court inquiry might reach."
            />
            <BacklogRow
              priority="P1"
              layer="Layer 2 C6"
              title="auditor_readonly role for external accessibility consultants / counsel"
              note="DSAR export covers self-export. External CPA / counsel needs scoped read-only mode."
            />
            <BacklogRow
              priority="P1 (shared)"
              layer="Layer 3 G5"
              title="integrity@startvest.ai mailbox + external counsel SLA"
              note="Same shared resolution as FL/CL/IL/HP."
            />
            <BacklogRow
              priority="P2"
              layer="Layer 3 G6"
              title="Engage accountability community"
              note="Disability rights advocates, accessibility consultants, plaintiff attorneys representing accessibility complainants."
            />
            <BacklogRow
              priority="P2"
              layer="CLI rule hygiene"
              title="Rename CRIT-SV-CONFORMANCE-CLAIM-GUARD → CRIT-AD-CONFORMANCE-CLAIM-GUARD"
              note="Per CRIT-SV-NO-BASE-ID-OVERRIDE, the SV namespace is reserved for the base manifest. The rule was renamed during this audit; ticket closes the change."
            />
          </div>
        </Section>

        <Section title="What this teaches">
          <ol className="space-y-3 mt-2 list-decimal list-outside pl-5 text-surface-700">
            <li>
              <b className="text-surface-900">
                Layer 2 Constraint 3 has at least three distinct axes.
              </b>{' '}
              Provenance (where data came from), provenance (whether data is labeled
              customer-attested), and validation gate (whether customer-attested data may publish
              when system-verified evidence is missing). All three serve the same goal of keeping
              customer-attested data isolated from system-derived. They operate at different layers
              with different runtime semantics.
            </li>
            <li>
              <b className="text-surface-900">
                Promotions to base happen only when a per-product rule reflects a portable principle.
              </b>{' '}
              The conformance-claim guard had been a per-product rule on adacompliancedocs.
              Promoting it to base required confirming the principle generalizes (a customer-attested
              status field SHOULD have a publish-time validation gate, not just on this one
              product).
            </li>
            <li>
              <b className="text-surface-900">
                Trigger calibration is fragile and ongoing.
              </b>{' '}
              The first-cut v1.9.0 trigger pattern false-positived on FL&apos;s Zod schema
              definition. The fix tightened to require Zod-object-field syntax. Future products
              will surface more edge cases. Calibration is iterative — that is how the framework
              evolves under reality, not a sign of brittleness.
            </li>
          </ol>
        </Section>

        <Section title="Reproducibility" muted>
          <pre className="mt-2 rounded-md bg-surface-900 text-surface-100 px-4 py-3 overflow-x-auto text-sm font-mono">
{`# from a clone of the integrity-cli repo
node bin/integrity.mjs check ../adacompliancedocs --format=json \\
  > ../adacompliancedocs/audits/tif-compliance.cli-output.json`}
          </pre>
        </Section>

        <Section title="Changelog">
          <ul className="space-y-3 list-disc list-outside pl-5 text-surface-700">
            <li>
              <b className="text-surface-900">
                {PUBLISHED} — v{VERSION}.
              </b>{' '}
              Initial publication. Drove base manifest v1.9.0 — third C3 axis added (
              <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">
                CRIT-SV-CUSTOMER-ATTESTATION-VALIDATION-GATE
              </code>
              ).
            </li>
          </ul>
        </Section>

        <RelatedFooter slug="adacompliancedocs" />
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

function AxisRow({
  axis,
  addedIn,
  says,
  example,
  highlight = false,
}: {
  axis: string;
  addedIn: string;
  says: string;
  example: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-[auto_1fr_1fr] gap-x-6 gap-y-2 p-5 md:p-6 border-b border-surface-200 last:border-b-0 ${
        highlight ? 'bg-brand-50/50' : ''
      }`}
    >
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-surface-500 mb-1">
          {addedIn}
        </p>
        <p className="font-semibold text-surface-900 md:max-w-[14ch]">{axis}</p>
      </div>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-surface-500 mb-1">
          Says
        </p>
        <p className="text-surface-700 leading-relaxed text-sm md:text-base">{says}</p>
      </div>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-surface-500 mb-1">
          Example
        </p>
        <p className="text-surface-700 leading-relaxed text-sm md:text-base">{example}</p>
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
