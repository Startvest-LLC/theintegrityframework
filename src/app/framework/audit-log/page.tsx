import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Framework audit log',
  description:
    "Public audit log of base-manifest revisions for The Integrity Framework. Each revision was driven by a real product audit. The framework's own honesty discipline applied to itself.",
  alternates: { canonical: '/framework/audit-log' },
};

type Revision = {
  version: string;
  date: string;
  trigger: string;
  triggerSlug?: string;
  summary: string;
  ruleId?: string;
};

const REVISIONS: Revision[] = [
  {
    version: '1.10.0',
    date: '2026-04-29',
    trigger: 'theintegrityframework own-product audit',
    summary:
      "Widened HIGH-SV-METHODOLOGY-VERSIONED to also match raw HTML heading forms (<h2>Version</h2>) in addition to markdown ## Version and TSX <Section title=\"Version\">. The directory's own /methodology page uses raw <section><h2> JSX which satisfies the rule's intent but missed the regex. Same calibration-fragility lesson as v1.3.0/v1.4.0/v1.6.0.",
    ruleId: 'HIGH-SV-METHODOLOGY-VERSIONED',
  },
  {
    version: '1.9.0',
    date: '2026-04-29',
    trigger: 'ADAComplianceDocs',
    triggerSlug: 'adacompliancedocs',
    summary:
      "Added CRIT-SV-CUSTOMER-ATTESTATION-VALIDATION-GATE — third C3 axis. Provenance markers (v1.4.0+ output, v1.8.0 input) say WHERE customer-attested data came from. Validation gates say WHEN it may publish. Co-occurrence rule: trigger on customer-attested status column declarations; require any validation-gate function pattern (checkConformance, conformanceGuard, validateBeforePublish, acknowledgeOpenFindings) somewhere in the corpus. Vacuous-pass when no trigger fires. Closes framework #14.",
    ruleId: 'CRIT-SV-CUSTOMER-ATTESTATION-VALIDATION-GATE',
  },
  {
    version: '1.8.0',
    date: '2026-04-29',
    trigger: 'Hireposture',
    triggerSlug: 'hireposture',
    summary:
      "Widened required marker patterns for CRIT-SV-AI-REVIEW-GATE and CRIT-SV-NO-PRE-POPULATED-ATTESTATION to accept naming variants surfaced by HirePosture's audit. AI-review-gate adds signed_by, signedBy, signed_by_user_id (HP's memo signing gate). Pre-populated-attestation adds customer_attested, attested_by (snake_case variants). The candidate-data-vs-compliance-attestation distinction codified.",
    ruleId: 'CRIT-SV-AI-REVIEW-GATE / CRIT-SV-NO-PRE-POPULATED-ATTESTATION',
  },
  {
    version: '1.7.0',
    date: '2026-04-29',
    trigger: 'IdeaLift',
    triggerSlug: 'idealift',
    summary:
      "Extended HIGH-SV-INTEGRITY-MD-CLAIMS-VERIFIABLE to scan Outstanding Risks / Known Gaps in addition to Recent Changes. New claim-absence policy: any entry asserting something is missing/not-implemented/not-in-place must reference a file path or marker the rule can verify is genuinely absent. Mirror coverage: ClarityLift's drift was forward (claim of presence; absent); IdeaLift's was reverse (claim of absence; present). Both directions now caught.",
    ruleId: 'HIGH-SV-INTEGRITY-MD-CLAIMS-VERIFIABLE',
  },
  {
    version: '1.6.0',
    date: '2026-04-29',
    trigger: 'IdeaLift',
    triggerSlug: 'idealift',
    summary:
      "Widened globs across CRIT-SV-NO-SILENT-PASS, HIGH-SV-METHODOLOGY-VERSIONED, HIGH-SV-EVIDENCE-RETENTION, CRIT-SV-NO-PRE-POPULATED-ATTESTATION, CRIT-SV-AI-REVIEW-GATE, INFO-SV-TRUST-PRINCIPLES-LINK to include monorepo-conventional paths apps/** and packages/**. IdeaLift's apps/web/src/lib/ AI SDK usage was missed by single-package globs. Validated backwards-compatible against FieldLedger and ClarityLift.",
    ruleId: 'multiple (glob widening)',
  },
  {
    version: '1.5.0',
    date: '2026-04-29',
    trigger: 'ClarityLift',
    triggerSlug: 'claritylift',
    summary:
      "Added HIGH-SV-INTEGRITY-MD-CLAIMS-VERIFIABLE — documentation drift detection. Two-tier: structural lint (every dated entry must reference a file path, commit, or #N) plus runnable assertions for high-value claim phrasings (link added, marker added, exemption added, Trust Principles) via audits/integrity-claims.json sidecar. Strikethrough text retracted. The framework's own honesty discipline applied to its documentation layer.",
    ruleId: 'HIGH-SV-INTEGRITY-MD-CLAIMS-VERIFIABLE',
  },
  {
    version: '1.4.0',
    date: '2026-04-28',
    trigger: 'FieldLedger',
    triggerSlug: 'fieldledger',
    summary:
      "Revised CRIT-SV-NO-PRE-POPULATED-ATTESTATION from filename-based to co-occurrence (corpus-level content check). Same root cause as v1.3.0: customer-submitted markers live at the persistence/schema layer, not in the library files where attestation output is computed. Filename-based globs miss layered architectures. Both forward-drift directions now caught.",
    ruleId: 'CRIT-SV-NO-PRE-POPULATED-ATTESTATION',
  },
  {
    version: '1.3.0',
    date: '2026-04-28',
    trigger: 'FieldLedger',
    triggerSlug: 'fieldledger',
    summary:
      "Promoted CRIT-SV-AI-REVIEW-GATE to base as a co-occurrence rule. FieldLedger's per-product filename-based version false-negativated: AI-output review markers (generatedByModel) lived at entity-schemas.ts and the API route, not in cpars-drafting.ts where the rule's globs targeted. Real codebases use layered architectures. Trigger: AI SDK imports / LLM call patterns. Required: review-gate marker anywhere in corpus.",
    ruleId: 'CRIT-SV-AI-REVIEW-GATE',
  },
  {
    version: '1.2.0',
    date: '2026-04-28',
    trigger: 'FieldLedger',
    triggerSlug: 'fieldledger',
    summary:
      "Added CRIT-SV-NO-BASE-ID-OVERRIDE meta-rule. Per-product manifests must not re-use base rule ids — closes the silent-loosening drift vector where a product could broaden a base check's globs and the base id would appear enforced when actually relaxed. Products extend with product-specific ids (HIGH-FL-*, CRIT-CL-*, etc.); they never override. Enforced at manifest-merge time.",
    ruleId: 'CRIT-SV-NO-BASE-ID-OVERRIDE',
  },
];

export default function FrameworkAuditLogPage() {
  return (
    <article className="container-wide py-16 md:py-20">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-4">
          Framework audit log
        </p>
        <h1>Public revision history of the base manifest.</h1>
        <p className="mt-6 text-lg text-surface-600">
          The framework prohibits silent-pass at the code layer. This page applies the same
          discipline to the framework's own evolution: every base-manifest revision is named, dated,
          attributed to the audit that surfaced it, and linked to the case study.
        </p>
        <p className="mt-4 text-surface-600">
          Nine revisions across two days, driven by six product audits plus one own-product audit.
          Each revision is either a calibration fix (the rule was right but the regex was wrong) or
          a structural addition (a new constraint axis surfaced by a real product). No revision was
          made without a real product driving the change.
        </p>
      </header>

      <section className="mt-12 max-w-4xl">
        <div className="overflow-x-auto rounded-lg border border-surface-200">
          <table className="w-full text-sm">
            <thead className="bg-surface-50 text-left">
              <tr className="border-b border-surface-200">
                <th className="px-4 py-3 font-semibold">Version</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Triggered by</th>
                <th className="px-4 py-3 font-semibold">Rule</th>
              </tr>
            </thead>
            <tbody>
              {REVISIONS.map((r) => (
                <tr key={r.version} className="border-b border-surface-200 last:border-b-0 align-top">
                  <td className="px-4 py-3 font-mono font-semibold text-surface-900 whitespace-nowrap">
                    v{r.version}
                  </td>
                  <td className="px-4 py-3 font-mono text-surface-500 whitespace-nowrap">{r.date}</td>
                  <td className="px-4 py-3">
                    {r.triggerSlug ? (
                      <Link
                        href={`/framework/case-studies/${r.triggerSlug}`}
                        className="text-brand-700 hover:text-brand-800"
                      >
                        {r.trigger}
                      </Link>
                    ) : (
                      <span className="text-surface-700">{r.trigger}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-surface-600">{r.ruleId ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-16 max-w-3xl space-y-10">
        <h2>Per-revision detail</h2>
        {REVISIONS.map((r) => (
          <div key={r.version} className="border-t border-surface-200 pt-8 first:border-t-0 first:pt-0">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h3 className="text-xl font-semibold text-surface-900 m-0">v{r.version}</h3>
              <span className="font-mono text-sm text-surface-500">{r.date}</span>
              <span className="text-sm text-surface-600">
                ·{' '}
                {r.triggerSlug ? (
                  <Link href={`/framework/case-studies/${r.triggerSlug}`} className="text-brand-700">
                    {r.trigger}
                  </Link>
                ) : (
                  r.trigger
                )}
              </span>
            </div>
            {r.ruleId && (
              <p className="mt-2 font-mono text-xs text-surface-500">{r.ruleId}</p>
            )}
            <p className="mt-3 text-surface-700">{r.summary}</p>
          </div>
        ))}
      </section>

      <section className="mt-16 max-w-3xl">
        <h2>Discipline maintained</h2>
        <ul className="mt-6 space-y-3 text-surface-700 list-disc list-inside">
          <li>Every revision is tied to a real product audit. No speculative additions.</li>
          <li>Every revision is validated backwards-compatible against the products audited so far.</li>
          <li>
            Calibration fixes (regex / glob widening) are minor versions. Structural additions (new
            rule, new C3 axis, new check kind) are also minor versions until v2.0 — semver-strict
            rule removals or shape changes will be major.
          </li>
          <li>
            The framework's documentation layer is itself rule-checked
            (HIGH-SV-INTEGRITY-MD-CLAIMS-VERIFIABLE) so this audit log can't drift from the case
            studies it points at.
          </li>
        </ul>
        <p className="mt-8 text-sm text-surface-500">
          Source: <a href="https://github.com/Startvest-LLC/integrity-cli/blob/master/manifests/base-v1.json">manifests/base-v1.json</a>{' '}
          changelog field. Every entry on this page corresponds 1:1 to a changelog entry there.
        </p>
      </section>
    </article>
  );
}
