import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';
import auditData from '@/data/audit-2026-q2.json';

const PAGE_URL = `${site.url}/framework/audit-2026-q2`;

export const metadata: Metadata = {
  title: 'Audit Q2 2026 — 50 Indie AI Tools Against The Integrity Framework',
  description:
    "Public audit of 50 indie AI tools scored against The Integrity Framework's Layer 1 vetoes. Findings: 58% don't disclose AI sub-processors. 54% have verifiability gaps. 10% trip the artifact-vs-outcome veto.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Audit Q2 2026 — 50 Indie AI Tools',
    description:
      "Public audit of 50 indie AI tools scored against The Integrity Framework. 58% don't disclose AI sub-processors. 54% have verifiability gaps.",
    type: 'article',
    url: PAGE_URL,
    siteName: site.name,
    publishedTime: '2026-05-18T00:00:00Z',
  },
};

type AuditEntry = {
  name: string;
  url: string;
  category: string | null;
  fetchedAt?: string;
  signals?: Record<string, unknown> & {
    homepageStatus?: number;
    v1RiskTermsHit?: string[];
    trustPageCount?: number;
    aiSubprocessorMentions?: string[] | null;
    pricingHasDollar?: boolean;
    pricingHidden?: boolean;
  };
  scores?: {
    v1?: string;
    v2?: string;
    v3?: string;
    v4?: string;
    v5?: string;
    v6?: string;
  };
  notes?: string[];
  error?: string;
};

const data = auditData as AuditEntry[];
const audited = data.filter((d) => d.scores && Object.keys(d.scores).length > 0);
const blocked = data.filter((d) => !d.scores || Object.keys(d.scores).length === 0);

function count(predicate: (e: AuditEntry) => boolean) {
  return audited.filter(predicate).length;
}

const stats = {
  total: data.length,
  audited: audited.length,
  blocked: blocked.length,
  v1Risk: count((e) => e.scores?.v1 === 'risk'),
  v3Pass: count((e) => e.scores?.v3 === 'pass'),
  v3Partial: count((e) => e.scores?.v3 === 'partial'),
  v3Fail: count((e) => e.scores?.v3 === 'fail'),
  v4Pass: count((e) => e.scores?.v4 === 'pass'),
  v4FlagNoMention: count((e) => e.scores?.v4 === 'flag-no-mention'),
  v4NoPrivacy: count((e) => e.scores?.v4 === 'no-privacy-page'),
  v5Pass: count((e) => e.scores?.v5 === 'pass'),
  v5Hidden: count((e) => e.scores?.v5 === 'hidden'),
};

const v3GapPct = Math.round(((stats.v3Partial + stats.v3Fail) / audited.length) * 100);
const v4GapPct = Math.round(((stats.v4FlagNoMention + stats.v4NoPrivacy) / audited.length) * 100);

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Audit Q2 2026 — 50 Indie AI Tools Against The Integrity Framework',
  description:
    "Public audit of 50 indie AI tools scored against The Integrity Framework's Layer 1 vetoes.",
  author: { '@type': 'Organization', name: 'Startvest LLC', url: 'https://startvest.ai' },
  publisher: { '@type': 'Organization', name: 'Startvest LLC' },
  datePublished: '2026-05-18',
  inLanguage: 'en-US',
  mainEntityOfPage: PAGE_URL,
  url: PAGE_URL,
  license: 'https://creativecommons.org/licenses/by/4.0/',
};

const datasetSchema = {
  '@context': 'https://schema.org',
  '@type': 'Dataset',
  name: 'Indie AI Tool Trust-Artifact Audit (Q2 2026)',
  description:
    'Per-tool scores against The Integrity Framework Layer 1 vetoes for 50 publicly-listed indie AI tools.',
  url: PAGE_URL,
  license: 'https://creativecommons.org/licenses/by/4.0/',
  creator: { '@type': 'Organization', name: 'Startvest LLC', url: 'https://startvest.ai' },
  distribution: [
    {
      '@type': 'DataDownload',
      encodingFormat: 'text/csv',
      contentUrl: `${site.url}/data/audit-2026-q2-indie-ai-tools.csv`,
    },
  ],
  measurementTechnique:
    'Heuristic scoring against the six Layer 1 vetoes of The Integrity Framework v1.0; V2 and V6 flagged manual-review-required.',
};

function ScoreCell({ score }: { score?: string }) {
  if (!score) return <span className="text-surface-300">·</span>;
  if (score === 'pass' || score === 'likely-pass') {
    return <span className="text-emerald-700" title={score}>✓</span>;
  }
  if (score === 'partial' || score === 'mixed') {
    return <span className="text-amber-700" title={score}>~</span>;
  }
  if (score === 'fail' || score === 'risk' || score === 'hidden' || score === 'flag-no-mention') {
    return <span className="text-red-700" title={score}>✗</span>;
  }
  if (score === 'manual-review') {
    return <span className="text-surface-500" title={score}>—</span>;
  }
  return <span className="text-surface-400" title={score}>?</span>;
}

export default function AuditQ2Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />

      <article className="container-wide py-16 md:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-4">
            Public audit · Q2 2026
          </p>

          <h1>50 indie AI tools, audited against The Integrity Framework</h1>

          {/* Direct-answer paragraph — extractable as a single AI Overview /
              Perplexity citation block. ~70 words, headline finding first. */}
          <p className="mt-6 text-lg text-surface-700 leading-relaxed">
            We audited <strong>50 publicly-listed indie AI tools</strong> against the six Layer 1
            vetoes of{' '}
            <Link href="/framework/v1" className="text-brand-700 underline">
              The Integrity Framework v1.0
            </Link>
            . The headline findings: <strong>{v4GapPct}%</strong> do not disclose AI sub-processors
            in their privacy policy, <strong>{v3GapPct}%</strong> have verifiability gaps (missing
            or partial trust pages), <strong>{stats.v1Risk}</strong> trip the artifact-vs-outcome
            veto by selling certification language disconnected from any audit motion, and{' '}
            <strong>{stats.v5Hidden}</strong> hide pricing behind sales gating. Methodology and
            per-tool scores below. CSV is downloadable. Published under CC BY 4.0.
          </p>

          <h2 className="mt-12">Headline findings</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-surface-200 bg-white p-5">
              <div className="text-3xl font-semibold text-red-700">{v4GapPct}%</div>
              <p className="mt-2 text-sm text-surface-700">
                of audited tools don't disclose AI sub-processors (OpenAI, Anthropic, etc.) in their
                privacy policy.
              </p>
            </div>
            <div className="rounded-lg border border-surface-200 bg-white p-5">
              <div className="text-3xl font-semibold text-amber-700">{v3GapPct}%</div>
              <p className="mt-2 text-sm text-surface-700">
                have verifiability gaps — missing one or more of /security, /trust, /privacy,
                /changelog.
              </p>
            </div>
            <div className="rounded-lg border border-surface-200 bg-white p-5">
              <div className="text-3xl font-semibold text-red-700">{stats.v1Risk}</div>
              <p className="mt-2 text-sm text-surface-700">
                trip the artifact-vs-outcome veto with badge/certification language disconnected
                from the audit motion.
              </p>
            </div>
            <div className="rounded-lg border border-surface-200 bg-white p-5">
              <div className="text-3xl font-semibold text-amber-700">{stats.v5Hidden}</div>
              <p className="mt-2 text-sm text-surface-700">
                gate pricing entirely behind "contact us" — a pricing-rigor mismatch signal under
                V5.
              </p>
            </div>
          </div>

          <h2 className="mt-12">Methodology</h2>
          <p className="mt-3 text-surface-700 leading-relaxed">
            Each tool's public marketing surface was fetched and scored heuristically against the
            Layer 1 vetoes:
          </p>
          <ul className="mt-4 list-disc pl-6 space-y-2 text-surface-700">
            <li>
              <strong>V1 — Artifact vs outcome:</strong> homepage scanned for badge / certification
              language ("get certified", "SOC 2 in days", "audit-ready") disconnected from an actual
              audit motion. Tripped → <em>risk</em>.
            </li>
            <li>
              <strong>V2 — Independence:</strong> requires understanding business model and revenue
              flow. <em>Manual-review-required</em> on every entry.
            </li>
            <li>
              <strong>V3 — Verifiability:</strong> count of reachable trust pages at standard paths
              (/security, /trust, /privacy, /privacy-policy, /integrity, /changelog, /methodology,
              /.well-known/security.txt). ≥3 = <em>pass</em>, 1-2 = <em>partial</em>, 0 = <em>fail</em>.
            </li>
            <li>
              <strong>V4 — AI accountability:</strong> privacy policy scanned for AI sub-processor
              mentions (OpenAI, Anthropic, Claude, Mistral, Cohere, Replicate, Together, Perplexity,
              etc.). Mention found = <em>pass</em>. No mention but privacy page exists =
              <em> flag-no-mention</em>.
            </li>
            <li>
              <strong>V5 — Pricing-rigor alignment:</strong> pricing page scanned for visible dollar
              amounts vs "contact us / book a demo" gating. Visible = <em>pass</em>; gated only =
              <em> hidden</em>.
            </li>
            <li>
              <strong>V6 — TechCrunch test:</strong> subjective by design. <em>Manual-review-required</em>{' '}
              on every entry.
            </li>
          </ul>
          <p className="mt-4 text-surface-700 leading-relaxed">
            Scoring is heuristic and conservative. A "fail" or "risk" mark on this page is a signal
            for human review, not a final verdict. The raw signals (response codes, matched terms,
            page URLs) are in the JSON behind this page so anyone can re-score with different
            heuristics. The audit script is published at{' '}
            <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">
              scripts/audit-indie-ai-tools.cjs
            </code>{' '}
            in the framework repo.
          </p>

          <h2 className="mt-12">Per-tool scores</h2>
          <p className="mt-3 text-surface-700 leading-relaxed">
            <span className="inline-block w-4 text-emerald-700">✓</span> pass &nbsp;
            <span className="inline-block w-4 text-amber-700">~</span> partial &nbsp;
            <span className="inline-block w-4 text-red-700">✗</span> risk / fail / gap &nbsp;
            <span className="inline-block w-4 text-surface-500">—</span> manual review &nbsp;
            <span className="inline-block w-4 text-surface-400">?</span> not audited (bot-blocked)
          </p>
          <div className="mt-6 overflow-x-auto rounded-lg border border-surface-200 bg-white">
            <table className="min-w-full text-sm">
              <thead className="border-b border-surface-200 bg-surface-50 text-left">
                <tr>
                  <th className="px-3 py-2 font-semibold">Tool</th>
                  <th className="px-3 py-2 font-semibold">Category</th>
                  <th className="px-2 py-2 font-semibold text-center" title="Artifact vs outcome">V1</th>
                  <th className="px-2 py-2 font-semibold text-center" title="Independence">V2</th>
                  <th className="px-2 py-2 font-semibold text-center" title="Verifiability">V3</th>
                  <th className="px-2 py-2 font-semibold text-center" title="AI accountability">V4</th>
                  <th className="px-2 py-2 font-semibold text-center" title="Pricing-rigor alignment">V5</th>
                  <th className="px-2 py-2 font-semibold text-center" title="TechCrunch test">V6</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d) => (
                  <tr key={d.name} className="border-b border-surface-100">
                    <td className="px-3 py-2">
                      <a
                        href={d.url}
                        target="_blank"
                        rel="noopener nofollow"
                        className="text-brand-700 underline"
                      >
                        {d.name}
                      </a>
                    </td>
                    <td className="px-3 py-2 text-surface-600">{d.category || ''}</td>
                    <td className="px-2 py-2 text-center"><ScoreCell score={d.scores?.v1} /></td>
                    <td className="px-2 py-2 text-center"><ScoreCell score={d.scores?.v2} /></td>
                    <td className="px-2 py-2 text-center"><ScoreCell score={d.scores?.v3} /></td>
                    <td className="px-2 py-2 text-center"><ScoreCell score={d.scores?.v4} /></td>
                    <td className="px-2 py-2 text-center"><ScoreCell score={d.scores?.v5} /></td>
                    <td className="px-2 py-2 text-center"><ScoreCell score={d.scores?.v6} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {blocked.length > 0 && (
            <p className="mt-4 text-sm text-surface-500">
              {blocked.length} of {data.length} tools could not be audited (bot detection on
              homepage fetch): {blocked.map((b) => b.name).join(', ')}.
            </p>
          )}

          <h2 className="mt-12">What this tells us</h2>
          <ul className="mt-4 list-disc pl-6 space-y-3 text-surface-700">
            <li>
              <strong>AI sub-processor transparency is the biggest gap.</strong> {v4GapPct}% of
              audited tools don't name the AI vendors they pass customer data through. For a
              category whose products consume third-party LLMs by definition, that's a
              disclosure problem, not an oversight.
            </li>
            <li>
              <strong>Verifiability is a binary skill.</strong> Tools that have invested in trust
              pages have <em>all</em> the trust pages; the rest have none. The middle "we have
              /privacy but nothing else" cohort is small. This is consistent with how teams
              build out trust artifacts — once one person on the team owns the work, it gets
              done. When no one owns it, nothing exists.
            </li>
            <li>
              <strong>Pricing-rigor mismatch is a smaller issue than expected.</strong>{' '}
              {stats.v5Hidden} tools gate pricing entirely. For sub-enterprise AI tools, that's
              almost always a Veto 5 fail — the segment economics don't support per-customer
              contracts, so "contact us" usually masks pricing the operator is uncomfortable
              defending.
            </li>
            <li>
              <strong>Most tools don't sell certificates as the product.</strong> Only{' '}
              {stats.v1Risk} of {audited.length} trip the V1 artifact-vs-outcome veto. The
              compliance-tool category dominates this list — the broader indie AI category is
              cleaner than the compliance-tooling sub-segment.
            </li>
          </ul>

          <h2 className="mt-12">If you're on this list and want to publish an INTEGRITY.md</h2>
          <p className="mt-3 text-surface-700 leading-relaxed">
            The fastest path to closing the V3 and V4 gaps surfaced here is to publish an{' '}
            <Link href="/integrity-md" className="text-brand-700 underline">
              INTEGRITY.md
            </Link>{' '}
            at your product's repo root or canonical marketing URL. The template is CC BY 4.0
            and addresses each veto in plain language. After publication, submit your listing to{' '}
            <Link href="/listings" className="text-brand-700 underline">
              the directory
            </Link>{' '}
            for a Bronze or Silver tier badge. Bronze is roughly a half-day of honest reflection;
            no audit-firm engagement is required.
          </p>

          <h2 className="mt-12">Download</h2>
          <p className="mt-3 text-surface-700 leading-relaxed">
            The raw audit data is available as a CSV. Published under CC BY 4.0; anyone is free to
            re-score the underlying signals with different heuristics.
          </p>
          <p className="mt-3">
            <a
              href="/data/audit-2026-q2-indie-ai-tools.csv"
              download
              className="inline-flex items-center rounded-md border border-surface-300 px-5 py-3 text-sm font-medium text-surface-800 no-underline hover:border-surface-400"
            >
              Download CSV ({data.length} rows)
            </a>
          </p>

          <h2 className="mt-12">Caveats</h2>
          <ul className="mt-4 list-disc pl-6 space-y-2 text-surface-700">
            <li>
              Heuristic scoring is a signal, not a verdict. A "fail" mark means the public
              artifact didn't match the heuristic; it does not mean the tool is untrustworthy.
            </li>
            <li>
              V2 (independence) and V6 (TechCrunch test) cannot be automated and are flagged
              manual-review on every entry.
            </li>
            <li>
              Cloudflare bot detection blocked {blocked.length} tools from being audited at all.
              Listed for transparency; not scored.
            </li>
            <li>
              Some "no privacy page" results are genuine misses; others are pages at non-standard
              paths the heuristic didn't try (e.g., /legal). Reviewing flagged entries by hand is
              the recommended follow-up.
            </li>
            <li>
              Published 2026-05-18. Trust artifacts change; re-running the script next quarter is
              expected to produce different numbers.
            </li>
          </ul>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/integrity-md"
              className="inline-flex items-center rounded-md bg-brand-700 px-5 py-3 text-sm font-medium text-white no-underline hover:bg-brand-800"
            >
              INTEGRITY.md template
            </Link>
            <Link
              href="/framework/v1"
              className="inline-flex items-center rounded-md border border-surface-300 px-5 py-3 text-sm font-medium text-surface-800 no-underline hover:border-surface-400"
            >
              Read the framework
            </Link>
            <Link
              href="/submit"
              className="inline-flex items-center rounded-md border border-surface-300 px-5 py-3 text-sm font-medium text-surface-800 no-underline hover:border-surface-400"
            >
              Submit a listing
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
