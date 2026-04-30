import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

const VERSION = '1.0';
const PUBLISHED = '2026-04-29';
const PAGE_URL = `${site.url}/framework/cases/marketing-agent`;

export const metadata: Metadata = {
  title: 'Case study: marketing-agent',
  description:
    "Sixth internal portfolio audit under The Integrity Framework v1.0. marketing-agent is internal Startvest tooling, not a customer-facing product. Layer 1 Veto 6 — manipulation, dark patterns, false urgency — applies sharply because marketing automation sits adjacent to those failure modes. The defense is a single explicit constraint file with a self-policed kill-switch.",
  alternates: { canonical: '/framework/cases/marketing-agent' },
  openGraph: {
    title: 'Case study: marketing-agent, the constraint-file pattern',
    description:
      'Internal tooling with a 29-item explicit "does NOT" file as the load-bearing V6 defense. A different shape of integrity discipline. Watching for the pattern in future audits.',
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
  headline: 'Case study: marketing-agent',
  description:
    "Sixth internal portfolio audit. Internal tooling defended by an explicit constraint file. The pattern is being watched for, not yet codified.",
  author: { '@type': 'Organization', name: 'Startvest LLC', url: 'https://startvest.ai' },
  publisher: { '@type': 'Organization', name: 'Startvest LLC', url: 'https://startvest.ai' },
  datePublished: `${PUBLISHED}T00:00:00Z`,
  dateModified: `${PUBLISHED}T00:00:00Z`,
  mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
  url: PAGE_URL,
  inLanguage: 'en-US',
  isBasedOn: `${site.url}/framework/v1`,
};

export default function MarketingAgentCasePage() {
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
                marketing-agent, the constraint-file pattern.
              </h1>
              <p className="text-lg text-surface-600 leading-relaxed">
                Sixth internal audit under{' '}
                <Link href="/framework/v1" className="text-brand-700 hover:text-brand-800 underline">
                  The Integrity Framework v1.0
                </Link>
                . marketing-agent is internal Startvest tooling, not a customer-facing product. Most
                TIF dimensions are correctly N/A. Layer 1 Veto 6 applies sharply, and the defense
                is a different shape than the framework&apos;s code-pattern CI rules: a single
                explicit constraint file with kill-switch discipline applied to itself.
              </p>
              <p className="mt-4 text-base text-surface-500 leading-relaxed">
                Source documents are public:{' '}
                <a
                  href="https://github.com/Startvest-LLC/marketing-agent/blob/main/INTEGRITY.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-700 hover:text-brand-800 underline"
                >
                  marketing-agent&apos;s INTEGRITY.md
                </a>
                ,{' '}
                <a
                  href="https://github.com/Startvest-LLC/marketing-agent/blob/main/audits/tif-compliance.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-700 hover:text-brand-800 underline"
                >
                  audits/tif-compliance.md
                </a>
                , and the load-bearing artifact{' '}
                <a
                  href="https://github.com/Startvest-LLC/marketing-agent/blob/main/constraints.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-700 hover:text-brand-800 underline"
                >
                  constraints.md
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <Section title="What was audited">
          <p>
            marketing-agent is internal Startvest LLC tooling. A context-layered marketing
            execution agent: validation reports → drafts → review queue → Buffer (LinkedIn) or CMS
            API (SEO blog). The agent uses Anthropic SDK for drafting. <b>All AI output is
            draft-only and gated through manual review before any external surface receives it.</b>
          </p>
          <p>
            The audit was scoped specifically to verify that marketing automation&apos;s adjacent
            failure modes — auto-posting, cold email, scraping, strategy capture by AI, false
            urgency framing, fabricated citations — are avoided. They are.
          </p>
        </Section>

        <Section title="Headline result" tone="pos">
          <div className="rounded-xl border border-surface-200 bg-white p-5 md:p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-600 mb-2">
              ~21 dimensions · Layer 1 vetoes (6) + Layer 2 constraints (~8 incl. 4 N/A) + Layer 3
              guardrails (7 incl. 3 N/A)
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              <Stat label="Pass" value="9" />
              <Stat label="Partial" value="3" />
              <Stat label="Out-of-segment" value="1" />
              <Stat label="N/A" value="8" />
            </div>
            <p className="mt-4 text-sm text-surface-600">
              The N/A count is high because marketing-agent is internal tooling: no customers, no
              compliance-evidence chain, no public methodology, no annual independent audit. The
              N/As are honest — most TIF rows genuinely don&apos;t apply.
            </p>
          </div>
          <p className="mt-6">
            Mechanical: 9 of 11 integrity-cli rules passed. Two CRITICAL fails are both
            substantively PASS via structural gates (Buffer queue + manual click); mechanical
            marker fields (
            <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">reviewedBy</code>,{' '}
            citation provenance) are tracked tickets.
          </p>
        </Section>

        <Section title="The headline finding: constraints.md as Veto 6 defense" tone="pos">
          <p>
            The interesting finding is not in the code. It is in a single repo-root file —{' '}
            <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">constraints.md</code> —
            with 29 numbered &ldquo;does NOT&rdquo; items.
          </p>
          <p className="font-medium text-surface-900">
            Layer 1 Veto 6 (TechCrunch Test) is structured around prohibiting every marketing-automation
            failure mode that has historically ended badly. constraints.md addresses them
            item-by-item.
          </p>
          <div className="mt-6 rounded-xl border border-surface-200 bg-white overflow-hidden">
            <ConstraintRow
              failureMode="Auto-posting / volume-spam"
              defense="Items 1-2: agent does NOT post anywhere directly. Items 20-23: no auto-DMs, no LinkedIn scraping, no Sales Nav API integration. Buffer is the single allowed queueing surface; manual click only."
            />
            <ConstraintRow
              failureMode="Cold email"
              defense="Items 4-5: no contact with named accounts; outreach drafts only; agent never has send credentials."
            />
            <ConstraintRow
              failureMode="Spend manipulation"
              defense="Item 6: no money spent. No ad changes. No subscription changes. No SaaS purchases."
            />
            <ConstraintRow
              failureMode="Strategy capture by AI"
              defense="Items 7-9: no positioning decisions, no category-naming, no replacing strategic input from named humans."
            />
            <ConstraintRow
              failureMode="False urgency framing"
              defense="Item 15: '2027 standard in 2026' line is internal compass only — banned in public copy until earned by 3rd-party adoption."
            />
            <ConstraintRow
              failureMode="Manifesto over-promise"
              defense='Item 16: framework long-form pieces are "reasoning piece" or "the why doc," never "manifesto."'
            />
            <ConstraintRow
              failureMode="Voice / banned-term drift"
              defense="Item 14: no banned voice terms (no em dashes, no exclamation points, no emojis)."
            />
            <ConstraintRow
              failureMode="Fabricated citations"
              defense="Items 12-13: every factual claim requires a verifiable citation. Hallucinated citations are a hard fail with logged lesson. The agent flags uncertainty rather than fabricating."
            />
          </div>
          <p className="mt-6 text-surface-700">
            constraints.md closes with kill-switch discipline applied to itself:
          </p>
          <blockquote className="mt-4 border-l-4 border-brand-600 bg-surface-50 px-5 py-4 text-surface-700">
            <p className="italic">
              Edits to this file require a dated note. Removals require Tom&apos;s explicit
              sign-off — the file should grow over time, not shrink.
            </p>
          </blockquote>
          <p className="mt-4 text-surface-700">
            The constraint set governs itself. That self-reference is the point.
          </p>
        </Section>

        <Section title="Why this is filed as a watch-for, not a v1.10.0 codification">
          <p>
            The constraint-file pattern may generalize. Layer 1 vetoes and Layer 3 guardrails that
            are policy / process surfaces (not code patterns) might be best authored as a
            constraint file with kill-switch discipline, rather than expressed as code-level CI
            rules. The framework&apos;s existing rules don&apos;t model this shape — they&apos;re
            all code-pattern checks.
          </p>
          <p>
            But: <b>no codification on a single instance.</b> The discipline that produced six
            clean revisions in this audit cycle was that each revision was driven by at least one
            real product surfacing the gap. The constraint-file pattern has only one product
            example so far.
          </p>
          <p className="font-medium text-surface-900">
            The pattern is being watched for in future audits — PRAPI when it ships, external
            adopters, quarterly cross-product re-audits. If it repeats, it&apos;ll be codified as
            an optional new check kind. If it doesn&apos;t, it stays a per-product extension
            pattern.
          </p>
        </Section>

        <Section title="Open items at audit close">
          <p>Two remediation tickets opened on the marketing-agent repo:</p>
          <div className="mt-6 rounded-xl border border-surface-200 bg-white overflow-hidden">
            <BacklogRow
              priority="P1"
              layer="Layer 2 C2"
              title="Add reviewedBy / published_by_user_id marker to draft entity"
              note="Substantive PASS via Buffer queue + manual click. Mechanical CRIT-SV-AI-REVIEW-GATE rule needs the marker on the persisted draft."
            />
            <BacklogRow
              priority="P1"
              layer="Layer 2 C2"
              title="Add citation provenance fields to draft entity"
              note="constraints.md items 12-13 enforce citation discipline by process. Structured fields make the verification step auditable."
            />
          </div>
          <p className="mt-6 text-surface-600">
            The smallest backlog in the portfolio. marketing-agent&apos;s substantive posture is
            strong; the open items are mechanical-marker fields that turn structural gates into
            machine-verifiable assertions.
          </p>
        </Section>

        <Section title="What this teaches">
          <ol className="space-y-3 mt-2 list-decimal list-outside pl-5 text-surface-700">
            <li>
              <b className="text-surface-900">
                Internal tooling can produce strong Layer 1 / Layer 3 framing without the
                framework&apos;s code-pattern CI rules.
              </b>{' '}
              An explicit constraint file with kill-switch discipline is a different but legitimate
              shape.
            </li>
            <li>
              <b className="text-surface-900">
                Marketing automation specifically demands explicit anti-pattern enumeration.
              </b>{' '}
              The category sits adjacent to too many failure modes (auto-posting, cold email,
              strategy capture, false urgency, fabricated citations) for implicit defense to
              suffice. Naming each one in writing is the discipline.
            </li>
            <li>
              <b className="text-surface-900">N/A is the correct answer when the rule was written for a different category.</b>{' '}
              marketing-agent is correctly outside the customer-facing-compliance-product scope
              that most TIF rules are calibrated against. The audit doesn&apos;t manufacture
              gaps.
            </li>
          </ol>
        </Section>

        <Section title="Reproducibility" muted>
          <pre className="mt-2 rounded-md bg-surface-900 text-surface-100 px-4 py-3 overflow-x-auto text-sm font-mono">
{`# from a clone of the integrity-cli repo
node bin/integrity.mjs check ../marketing --format=json \\
  > ../marketing/audits/tif-compliance.cli-output.json`}
          </pre>
        </Section>

        <Section title="Changelog">
          <ul className="space-y-3 list-disc list-outside pl-5 text-surface-700">
            <li>
              <b className="text-surface-900">
                {PUBLISHED} — v{VERSION}.
              </b>{' '}
              Initial publication. No framework revision triggered (v1.9.0 held up cleanly).
              Constraint-file pattern documented for future watch-for.
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
                  <Link
                    href="/framework/cases"
                    className="text-brand-700 hover:text-brand-800 underline"
                  >
                    All case studies
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/Startvest-LLC/marketing-agent/blob/main/INTEGRITY.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-700 hover:text-brand-800 underline"
                  >
                    INTEGRITY.md (source)
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Startvest-LLC/marketing-agent/blob/main/audits/tif-compliance.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-700 hover:text-brand-800 underline"
                  >
                    Audit matrix (source)
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Startvest-LLC/marketing-agent/blob/main/constraints.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-700 hover:text-brand-800 underline"
                  >
                    constraints.md (the V6 defense)
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

function ConstraintRow({ failureMode, defense }: { failureMode: string; defense: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-x-6 gap-y-2 p-5 md:p-6 border-b border-surface-200 last:border-b-0">
      <div className="md:max-w-[20ch]">
        <p className="font-mono text-[10px] uppercase tracking-widest text-surface-500 mb-1">
          Failure mode
        </p>
        <p className="font-semibold text-surface-900">{failureMode}</p>
      </div>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-brand-600 mb-1">
          Defense in constraints.md
        </p>
        <p className="text-surface-700 leading-relaxed text-sm md:text-base">{defense}</p>
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
