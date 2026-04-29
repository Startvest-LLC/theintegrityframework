import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

const VERSION = '1.0';
const PUBLISHED = '2026-04-28';
const PAGE_URL = `${site.url}/framework/cases/fieldledger`;

export const metadata: Metadata = {
  title: 'Case study: FieldLedger',
  description:
    'The first internal portfolio audit under The Integrity Framework v1.0. FieldLedger scored 14 PASS / 5 PARTIAL or NEEDS UPDATE / 1 DEFERRED / 0 FAIL across 20 dimensions. The audit also found two false negatives in the framework\'s own rule set, which were revised in base manifest v1.3.0 and v1.4.0.',
  alternates: { canonical: '/framework/cases/fieldledger' },
  openGraph: {
    title: 'Case study: FieldLedger, the first portfolio audit',
    description:
      'First internal portfolio audit under The Integrity Framework. The framework auditing itself, twice.',
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
  headline: 'Case study: FieldLedger',
  description:
    'The first internal portfolio audit under The Integrity Framework v1.0. The framework auditing itself, twice.',
  author: { '@type': 'Organization', name: 'Startvest LLC', url: 'https://startvest.ai' },
  publisher: { '@type': 'Organization', name: 'Startvest LLC', url: 'https://startvest.ai' },
  datePublished: `${PUBLISHED}T00:00:00Z`,
  dateModified: `${PUBLISHED}T00:00:00Z`,
  mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
  url: PAGE_URL,
  inLanguage: 'en-US',
  isBasedOn: `${site.url}/framework/v1`,
};

export default function FieldLedgerCasePage() {
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
                FieldLedger, the first portfolio audit.
              </h1>
              <p className="text-lg text-surface-600 leading-relaxed">
                Second case study under{' '}
                <Link href="/framework/v1" className="text-brand-700 hover:text-brand-800 underline">
                  The Integrity Framework v1.0
                </Link>
                . First internal portfolio audit. The framework, applied to a real Startvest
                product, with two interesting consequences.
              </p>
              <p className="mt-4 text-base text-surface-500 leading-relaxed">
                Where the{' '}
                <Link
                  href="/framework/cases/delve"
                  className="text-brand-700 hover:text-brand-800 underline"
                >
                  Delve case study
                </Link>{' '}
                walks an external public failure through the framework, this case walks a real
                product through it. Source documents are public:{' '}
                <a
                  href="https://github.com/Startvest-LLC/FieldLedger/blob/master/INTEGRITY.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-700 hover:text-brand-800 underline"
                >
                  FieldLedger&apos;s INTEGRITY.md
                </a>{' '}
                and{' '}
                <a
                  href="https://github.com/Startvest-LLC/FieldLedger/blob/master/audits/tif-compliance.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-700 hover:text-brand-800 underline"
                >
                  audits/tif-compliance.md
                </a>
                . This page summarizes; both files have the full evidence.
              </p>
            </div>
          </div>
        </section>

        <Section title="What was audited">
          <p>
            FieldLedger is a Startvest LLC product. Operations and compliance tooling for federal
            contractors and construction businesses — DCAA cost accounting, Davis-Bacon certified
            payroll, FAR 31.2 indirect rates, ICE I-9 tracking, audit log. Tier-priced
            subscriptions. Customers pay for the tooling; third parties (DCAA, DOL, prime
            contractors, IPAs) verify outputs. FieldLedger does not issue any third-party
            certifications.
          </p>
          <p>
            Audit conducted 2026-04-28. Methodology: a qualitative pass by Claude Code against
            FieldLedger&apos;s code, INTEGRITY.md, and methodology page; a mechanical pass by
            integrity-cli (base manifest) against the public repo. The two passes are
            cross-checked: where the CLI flagged a finding, the qualitative pass verified it
            against the actual code. Where the qualitative pass flagged a finding, the CLI was
            checked for whether it should have caught it.
          </p>
        </Section>

        <Section title="Headline result" tone="pos">
          <div className="rounded-xl border border-surface-200 bg-white p-5 md:p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-600 mb-2">
              20 dimensions · Layer 1 vetoes (6) + Layer 2 constraints (7) + Layer 3 guardrails
              (7)
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              <Stat label="Pass" value="14" />
              <Stat label="Partial / Needs update" value="5" />
              <Stat label="Deferred" value="1" />
              <Stat label="Fail" value="0" />
            </div>
            <p className="mt-4 text-sm text-surface-600">
              Vendor scorecard (TIF v1.0): 4 YES / 0 PARTIAL / 2 NO. Open scorecard rows: MSA
              refund-on-failure clause (drafted, not rolled in) and annual independent audit
              (deferred pending external funding, honestly classified).
            </p>
          </div>
          <p className="mt-6">
            Layer 1 is fully clean — six pre-build vetoes pass without exception. Layer 2 has
            three open items, two of them pre-Plus-tier (auditor-readonly role, 7-year DCAA
            retention policy) and one pre-launch (UI badging on customer-attested fields).
            Layer 3 has two needs-update items (refund clause, formal whistleblower channel)
            plus one honestly-deferred item (annual third-party audit, funding-blocked).
          </p>
          <p>
            The FieldLedger team&apos;s self-assessment was honest. The audit confirmed the
            INTEGRITY.md as written; no surprises in the product. The interesting findings were
            elsewhere.
          </p>
        </Section>

        <Section title="The framework auditing itself, twice" tone="pos">
          <p>
            The most important outcome of this audit was not a product finding. It was two
            findings against the framework&apos;s <i>own rule set</i>.
          </p>
          <p>
            The first integrity-cli run flagged three failures. Two of them — the most important
            ones — were false negatives in the rules, not gaps in the product. They tripped
            because the base manifest&apos;s filename-based globs targeted a hypothetical
            layered architecture that didn&apos;t match FieldLedger&apos;s actual code layout
            (libraries that compute output, with persistence and markers attached at the schema
            and route layers).
          </p>
          <p className="font-medium text-surface-900">
            A rule that produces a false negative is silent-pass at the meta level — exactly the
            failure mode the framework prohibits at the product level.
          </p>
          <p>
            So the rules were revised, not the product. The fix: a new content-based{' '}
            <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">co-occurrence</code>{' '}
            check kind that looks for required markers anywhere in the corpus, rather than
            requiring them to appear in specific filename patterns. Two manifest revisions, each
            with a changelog entry that points back to this audit.
          </p>

          <div className="mt-6 space-y-4">
            <RuleRevision
              ruleId="CRIT-SV-AI-REVIEW-GATE"
              wasFlagged="cpars-drafting.ts lacks generatedByModel marker"
              actualCode="generatedByModel is present at src/lib/entity-schemas.ts:916 (TypeORM column on CparsResponse), at the route write path, and in two public pages. The library returns { text, model }; persistence and the marker attach at the schema/route layer. Substantively, Layer 2 Constraint 2 is satisfied."
              resolution="Promoted to base manifest v1.3.0 as a content-based co-occurrence rule: trigger on AI SDK imports / messages.create / chat.completions.create; require any of the customer-attested or AI-review markers somewhere in the corpus. Re-run: PASS."
            />
            <RuleRevision
              ruleId="CRIT-SV-NO-PRE-POPULATED-ATTESTATION"
              wasFlagged="globs matched cpars-drafting.ts and certified-payroll.ts; no customer-submitted markers found"
              actualCode="Both files are pure libraries. The customer-submitted markers (RateSnapshotJson, EmployeeRowsJson, generatedByModel, etc.) live on the persisted entities. Substantively, Layer 2 Constraint 3 is satisfied at the schema layer; the UI badging gap is separate and pre-existing."
              resolution="Revised in base manifest v1.4.0 to use co-occurrence: trigger on attestation-bearing entity table names (CertifiedPayrolls, RateLetters, CparsResponse, *Attestation, *Statement, *Certification) or attestation-emitting function names (submit*Response, generate*Letter, etc.); require any customer-submitted marker somewhere in the corpus. Re-run: PASS."
            />
          </div>

          <p className="mt-6 text-surface-700">
            The third initial finding —{' '}
            <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">
              INFO-FL-TRUST-PRINCIPLES-LINK
            </code>{' '}
            — was a real Layer 3 discoverability gap on the FieldLedger privacy page. Not a rule
            issue. Tracked as a P2 remediation ticket.
          </p>
          <p className="mt-3 text-surface-600">
            The framework was calibrated against zero real products. First contact with reality
            found two filename-based blind spots. They are now closed in base manifest v1.4.0,
            and the lesson carries forward to every subsequent product audit.
          </p>
        </Section>

        <Section title="Open items at audit close">
          <p>The audit produced a remediation backlog. Eight items, three priorities:</p>
          <div className="mt-6 rounded-xl border border-surface-200 bg-white overflow-hidden">
            <BacklogRow
              priority="P0"
              layer="Layer 3 G1"
              title="Finalize MSA refund-on-failure clause and roll into standard template"
              note="Draft exists. Blocks vendor scorecard row 2 → YES. Required before first paid customer."
            />
            <BacklogRow
              priority="P1"
              layer="Layer 2 C3"
              title="Add explicit 'customer-attested' UI badge to SDVOSB and veteran status fields"
              note="Schema-layer isolation already passes. UI-layer visual isolation is the remaining gap. Pre-launch blocker."
            />
            <BacklogRow
              priority="P1"
              layer="Layer 2 C5"
              title="Document and enforce 7-year DCAA evidence retention policy"
              note="No offboarding code yet — rule passes vacuously. Activates the moment offboarding lands. Plus-tier prerequisite."
            />
            <BacklogRow
              priority="P1"
              layer="Layer 2 C6"
              title="Add auditor_readonly role to access control before Plus tier launch"
              note="Independent verification hooks constraint. Required for the auditor-can-verify-without-the-product-mediating mode."
            />
            <BacklogRow
              priority="P1"
              layer="Layer 3 G5"
              title="Provision and document integrity@startvest.ai whistleblower channel + external counsel SLA"
              note="Channel exists; SLA documentation does not. Quarterly external counsel review is the intent."
            />
            <BacklogRow
              priority="P1"
              layer="Layer 3 G3"
              title="Annual independent audit — secure funding, sign engagement letter"
              note="Honestly classified as DEFERRED. Engagement cost (CPA / security firm) is currently unfunded. Moves to PARTIAL once funding lands and an engagement letter is signed; YES only after a completed cycle with public findings."
            />
            <BacklogRow
              priority="P2"
              layer="Discoverability"
              title="Add startvest.ai/trust-principles link to privacy page"
              note="Clears INFO-FL-TRUST-PRINCIPLES-LINK. Trivial."
            />
            <BacklogRow
              priority="P2"
              layer="CLI rule hygiene"
              title="Rename CRIT-SV-EVIDENCE-CHAIN → CRIT-FL-EVIDENCE-CHAIN"
              note="The SV namespace is reserved for the base manifest under CRIT-SV-NO-BASE-ID-OVERRIDE. Naming hygiene only; no code-substance change."
            />
          </div>
          <p className="mt-6 text-surface-600">
            All items are tracked in the FieldLedger repo under the{' '}
            <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">tif-compliance</code>{' '}
            label. The matrix at{' '}
            <a
              href="https://github.com/Startvest-LLC/FieldLedger/blob/master/audits/tif-compliance.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-700 hover:text-brand-800 underline"
            >
              audits/tif-compliance.md
            </a>{' '}
            cross-references every item to the specific code path or contract clause that
            closes it.
          </p>
        </Section>

        <Section title="What this teaches">
          <ol className="space-y-3 mt-2 list-decimal list-outside pl-5 text-surface-700">
            <li>
              <b className="text-surface-900">
                The framework adapts when reality finds a gap.
              </b>{' '}
              Two manifest revisions in one audit cycle, both pointing back to this case study,
              is not the framework failing. It&apos;s the framework working — failure
              transparency applied to itself.
            </li>
            <li>
              <b className="text-surface-900">
                Filename-based rules don&apos;t survive first contact.
              </b>{' '}
              The original Layer 2 rules assumed a particular code layout. Real products have
              other layouts. The new co-occurrence pattern is more robust because it asks
              &ldquo;does the marker exist anywhere in the corpus that needs it&rdquo; instead
              of &ldquo;does the marker exist in this specific filename pattern.&rdquo;
            </li>
            <li>
              <b className="text-surface-900">
                Honest self-assessment + qualitative + mechanical is the right combination.
              </b>{' '}
              FieldLedger&apos;s INTEGRITY.md was honest before the audit. The qualitative pass
              verified it. The mechanical pass found two cases where the rule set was wrong.
              Any one of those three alone would have missed the rule-set bug. Together they
              caught it.
            </li>
            <li>
              <b className="text-surface-900">
                The remaining open items are the kind a framework should produce.
              </b>{' '}
              MSA refund clause, 7-year retention policy, UI badging, formal whistleblower SLA,
              annual third-party audit funding. None of them are technically heroic; all of them
              are the kind of work that gets put off without a forcing function. The framework
              IS the forcing function.
            </li>
          </ol>
        </Section>

        <Section title="Reproducibility" muted>
          <p>The audit is mechanically reproducible.</p>
          <pre className="mt-4 rounded-md bg-surface-900 text-surface-100 px-4 py-3 overflow-x-auto text-sm font-mono">
{`# from a clone of the integrity-cli repo
node bin/integrity.mjs check ../FieldLedger --format=json \\
  > ../FieldLedger/audits/tif-compliance.cli-output.json`}
          </pre>
          <p className="mt-4 text-surface-700">
            Re-run on every release. Update <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">Last reviewed</code> in INTEGRITY.md and regenerate this matrix when remediation lands. The CLI output JSON is committed to the FieldLedger repo so an external auditor can compare runs across time without re-running anything.
          </p>
        </Section>

        <Section title="Changelog">
          <ul className="space-y-3 list-disc list-outside pl-5 text-surface-700">
            <li>
              <b className="text-surface-900">
                {PUBLISHED} — v{VERSION}.
              </b>{' '}
              Initial publication. Second case study under{' '}
              <Link href="/framework/v1" className="text-brand-700 hover:text-brand-800 underline">
                The Integrity Framework v1.0
              </Link>
              . First internal portfolio audit.
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
                    href="/framework/cases/delve"
                    className="text-brand-700 hover:text-brand-800 underline"
                  >
                    Delve case study
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/Startvest-LLC/FieldLedger/blob/master/INTEGRITY.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-700 hover:text-brand-800 underline"
                  >
                    FieldLedger INTEGRITY.md (source)
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Startvest-LLC/FieldLedger/blob/master/audits/tif-compliance.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-700 hover:text-brand-800 underline"
                  >
                    FieldLedger audit matrix (source)
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Startvest-LLC/theintegrityframework/tree/master/cli"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-700 hover:text-brand-800 underline"
                  >
                    integrity-cli (the runner)
                  </a>
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
