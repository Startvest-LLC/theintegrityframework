import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

const VERSION = '1.0';
const PUBLISHED = '2026-04-28';
const PAGE_URL = `${site.url}/framework/cases/claritylift`;

export const metadata: Metadata = {
  title: 'Case study: ClarityLift',
  description:
    "Second internal portfolio audit under The Integrity Framework v1.0. ClarityLift scored 13 PASS / 6 PARTIAL or NEEDS UPDATE / 1 BUYER-DRIVEN / 0 FAIL across 22 dimensions. The audit's headline finding was documentation drift: two INTEGRITY.md claims that referenced code never actually shipped. Drove HIGH-SV-INTEGRITY-MD-CLAIMS-VERIFIABLE in base manifest v1.5.0.",
  alternates: { canonical: '/framework/cases/claritylift' },
  openGraph: {
    title: 'Case study: ClarityLift, the documentation-drift audit',
    description:
      'INTEGRITY.md said something was shipped. The code disagreed. The framework now catches this.',
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
  headline: 'Case study: ClarityLift',
  description:
    "Second internal portfolio audit. The framework's documentation layer carries the same silent-pass risk as the code layer.",
  author: { '@type': 'Organization', name: 'Startvest LLC', url: 'https://startvest.ai' },
  publisher: { '@type': 'Organization', name: 'Startvest LLC', url: 'https://startvest.ai' },
  datePublished: `${PUBLISHED}T00:00:00Z`,
  dateModified: `${PUBLISHED}T00:00:00Z`,
  mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
  url: PAGE_URL,
  inLanguage: 'en-US',
  isBasedOn: `${site.url}/framework/v1`,
};

export default function ClarityLiftCasePage() {
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
                ClarityLift, the documentation-drift audit.
              </h1>
              <p className="text-lg text-surface-600 leading-relaxed">
                Second internal audit under{' '}
                <Link href="/framework/v1" className="text-brand-700 hover:text-brand-800 underline">
                  The Integrity Framework v1.0
                </Link>
                . Mostly clean. The interesting finding was not in the code. INTEGRITY.md claimed
                two things had shipped. The code disagreed. Three days had passed.
              </p>
              <p className="mt-4 text-base text-surface-500 leading-relaxed">
                Source documents are public:{' '}
                <a
                  href="https://github.com/Startvest-LLC/claritylift/blob/master/INTEGRITY.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-700 hover:text-brand-800 underline"
                >
                  ClarityLift&apos;s INTEGRITY.md
                </a>{' '}
                and{' '}
                <a
                  href="https://github.com/Startvest-LLC/claritylift/blob/master/audits/tif-compliance.md"
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
            ClarityLift is a Startvest LLC product. Organizational health intelligence from
            communication signals — Slack, Teams, Discord. Aggregate-only insights with a 10-person
            minimum group floor; retention-zero processing; no individual-level signals; no DM
            scopes. Audit conducted 2026-04-28. Same methodology as the FieldLedger audit:
            qualitative pass against the code and INTEGRITY.md, mechanical pass via integrity-cli,
            cross-checked against each other.
          </p>
        </Section>

        <Section title="Headline result" tone="pos">
          <div className="rounded-xl border border-surface-200 bg-white p-5 md:p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-600 mb-2">
              22 dimensions · Layer 1 vetoes (6) + Layer 2 constraints (8 incl. 2 N/A) + Layer 3
              guardrails (8 incl. 1 N/A)
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              <Stat label="Pass" value="13" />
              <Stat label="Partial / Needs update" value="6" />
              <Stat label="Buyer-driven" value="1" />
              <Stat label="Fail" value="0" />
            </div>
            <p className="mt-4 text-sm text-surface-600">
              N/A: Layer 2 Constraint 1 (Evidence Chain Integrity — not a verification product) and
              Constraint 3 (Self-Attestation Isolation — no customer-attested compliance claims
              produced). Layer 3 Annual Independent Audit correctly framed as buyer-driven for the
              sub-enterprise tier — SOC 2 is not load-bearing for ClarityLift&apos;s segment.
            </p>
          </div>
          <p className="mt-6">
            Mechanical: 68 of 71 integrity-cli rules passed on first run. Three real failures: two
            documentation-drift cases described below, plus one missing <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">.auditignore</code>{' '}
            exemption that caused a CRITICAL CL-specific rule to fire on a methodology page that
            legitimately documents the forbidden scopes in a &ldquo;never&rdquo; context.
          </p>
        </Section>

        <Section title="The headline finding: documentation drift" tone="pos">
          <p>
            Two of three CLI failures were claims in INTEGRITY.md (Recent Changes 2026-04-25) that
            referenced code changes never actually shipped &mdash; three days after the entry was
            written.
          </p>

          <div className="mt-6 space-y-4">
            <DriftRow
              claim={
                <>
                  &ldquo;Trust Principles link added to <code>/privacy</code> and{' '}
                  <code>integrity@startvest.ai</code> surfaced in marketing footer.&rdquo;
                </>
              }
              reality="Zero occurrences of trust-principles, startvest.ai/trust, or integrity@startvest in any source file. Footer.tsx and PrivacyClient.tsx both lacked the references."
            />
            <DriftRow
              claim={
                <>
                  &ldquo;<code>.auditignore</code> exempts the methodology page from{' '}
                  <code>CRIT-C-SLACK-DM-SCOPE</code>.&rdquo;
                </>
              }
              reality="The exemption was never added to .auditignore. The methodology page legitimately documents the forbidden DM scopes in a 'never requested' context, and the rule fired on those mentions."
            />
          </div>

          <p className="mt-6 font-medium text-surface-900">
            This is the silent-pass pattern at the documentation layer. INTEGRITY.md said
            &ldquo;we did X&rdquo; and assumed it was true. The audit checked. It wasn&apos;t.
          </p>
          <p>
            The framework prohibits silent-pass at the code layer (
            <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">
              CRIT-SV-NO-SILENT-PASS
            </code>
            ). ClarityLift&apos;s audit drove the same discipline at the documentation layer.
          </p>
        </Section>

        <Section title="Framework revision: v1.5.0">
          <p>
            Added{' '}
            <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">
              HIGH-SV-INTEGRITY-MD-CLAIMS-VERIFIABLE
            </code>{' '}
            to the base manifest. Two-tier check on INTEGRITY.md:
          </p>
          <ul className="mt-4 space-y-2 list-disc list-outside pl-5 text-surface-700">
            <li>
              <b className="text-surface-900">Structural lint.</b> Every dated <code>Recent Changes</code> entry must
              contain a file path, commit hash, version tag, or <code>#N</code> issue/PR reference.
              No vague &ldquo;we did things&rdquo; allowed.
            </li>
            <li>
              <b className="text-surface-900">Runnable assertions.</b> When the entry contains a
              high-value claim phrasing (link added, marker added, exemption added, Trust
              Principles), an entry in <code>audits/integrity-claims.json</code> must contain a
              runnable assertion (<code>file-contains</code>, <code>file-not-contains</code>,{' '}
              <code>file-exists</code>) that the runner verifies on every audit.
            </li>
          </ul>
          <p className="mt-4 text-surface-700">
            Strikethrough text (<code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">~~...~~</code>) is
            stripped before evaluation, so INTEGRITY.md can carry honest correction history. When a
            claim is found to be drift, retract it via strikethrough and add a{' '}
            <b>CORRECTED &lt;date&gt;</b> note. The audit log keeps the receipts; the rule
            doesn&apos;t re-fail.
          </p>
          <p className="mt-3 text-surface-700">
            Two case-study sequels followed: IdeaLift v1.7.0 extended this rule to scan the{' '}
            <code>Outstanding Risks / Known Gaps</code> section with a claim-absence policy (for
            reverse drift &mdash; claims of absence when the resource is actually present).
          </p>
        </Section>

        <Section title="Open items at audit close">
          <p>Eight remediation tickets opened on the ClarityLift repo:</p>
          <div className="mt-6 rounded-xl border border-surface-200 bg-white overflow-hidden">
            <BacklogRow
              priority="P0"
              layer="Layer 3 G1"
              title="Finalize MSA refund-on-failure clause and roll into standard template"
              note="Same shape as FieldLedger's P0. Consider shared MSA template across products."
            />
            <BacklogRow
              priority="P1"
              layer="Layer 2 C2"
              title="Add generatedByModel marker to Insight entity for AI traceability"
              note="Substantive AI accountability is enforced via retention-zero LLM wrapper. Marker is defense-in-depth and clears the rule structurally."
            />
            <BacklogRow
              priority="P1"
              layer="Layer 3 G5 + discoverability"
              title="Ship integrity@startvest.ai and trust-principles links to Footer + Privacy"
              note="The forward-drift claim from the audit. Shipping the change that was previously claimed."
            />
            <BacklogRow
              priority="P1"
              layer="Layer 3 G7"
              title="Publish public kill criteria — Service Standards page"
              note="Classifier error floor, false-positive rate on adverse signals, regulatory response window."
            />
            <BacklogRow
              priority="P1"
              layer=".auditignore"
              title="Add src/app/methodology/** exemption to .auditignore for CRIT-C-SLACK-DM-SCOPE"
              note="The methodology page documents forbidden scopes in 'never' context. Restores INTEGRITY.md → reality alignment."
            />
            <BacklogRow
              priority="P2"
              layer="Layer 2 C4"
              title="Add quarterly automated reproducibility test of classifier outputs"
              note="Sampler that re-runs classification on stored signals; asserts agreement-rate floor."
            />
            <BacklogRow
              priority="P2"
              layer="Layer 2 C6"
              title="Add auditor_readonly role to access control"
              note="DSAR export covers self-export. External CPA / counsel needs scoped read-only mode."
            />
            <BacklogRow
              priority="P2"
              layer="Layer 3 G6"
              title="Identify or stand up an accountability community"
              note="Or document why public-methodology + CISO reviews are sufficient."
            />
          </div>
        </Section>

        <Section title="What this teaches">
          <ol className="space-y-3 mt-2 list-decimal list-outside pl-5 text-surface-700">
            <li>
              <b className="text-surface-900">Documentation can drift faster than code.</b> Three
              days from claim to audit. The author wrote it in good faith and forgot to ship it.
              Without a forcing function the next audit could be six months later, and the claim
              would have sat untrue that whole time.
            </li>
            <li>
              <b className="text-surface-900">
                The framework prohibits silent-pass; that has to apply to the framework&apos;s own
                outputs too.
              </b>{' '}
              INTEGRITY.md is one of those outputs. v1.5.0 closes the recursion.
            </li>
            <li>
              <b className="text-surface-900">Strikethrough &gt; deletion.</b> When drift is found,
              retract via strikethrough rather than deletion. Keeps the audit history visible.
              Future readers see the correction chain, which matters more than a clean diff.
            </li>
          </ol>
        </Section>

        <Section title="Reproducibility" muted>
          <p>The audit is mechanically reproducible.</p>
          <pre className="mt-4 rounded-md bg-surface-900 text-surface-100 px-4 py-3 overflow-x-auto text-sm font-mono">
{`# from a clone of the integrity-cli repo
node bin/integrity.mjs check ../claritylift --format=json \\
  > ../claritylift/audits/tif-compliance.cli-output.json`}
          </pre>
        </Section>

        <Section title="Changelog">
          <ul className="space-y-3 list-disc list-outside pl-5 text-surface-700">
            <li>
              <b className="text-surface-900">
                {PUBLISHED} — v{VERSION}.
              </b>{' '}
              Initial publication. Third case study under{' '}
              <Link href="/framework/v1" className="text-brand-700 hover:text-brand-800 underline">
                The Integrity Framework v1.0
              </Link>
              . Drove base manifest v1.5.0.
            </li>
          </ul>
        </Section>

        <RelatedFooter slug="claritylift" />
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

function DriftRow({ claim, reality }: { claim: React.ReactNode; reality: string }) {
  return (
    <div className="rounded-xl border border-surface-200 bg-white p-5 md:p-6">
      <p className="font-mono text-[10px] uppercase tracking-widest text-surface-500 mb-1">
        INTEGRITY.md claim
      </p>
      <p className="text-surface-700 leading-relaxed">{claim}</p>
      <p className="font-mono text-[10px] uppercase tracking-widest text-brand-600 mb-1 mt-4">
        Code reality at audit
      </p>
      <p className="text-surface-700 leading-relaxed">{reality}</p>
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
                href={`https://github.com/Startvest-LLC/${slug}/blob/master/INTEGRITY.md`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-700 hover:text-brand-800 underline"
              >
                INTEGRITY.md (source)
              </a>
            </li>
            <li>
              <a
                href={`https://github.com/Startvest-LLC/${slug}/blob/master/audits/tif-compliance.md`}
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
