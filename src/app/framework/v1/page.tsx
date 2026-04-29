import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

const VERSION = '1.0';
const LAST_UPDATED = '2026-04-25';
const RELOCATED_DATE = '2026-04-28';
const PAGE_URL = `${site.url}/framework/v1`;

export const metadata: Metadata = {
  title: 'The Integrity Framework v1.0',
  description:
    'The Integrity Framework v1.0. Frozen canonical spec. Three operational layers, eight moat layers, six buyer questions. Originated by Startvest LLC. Published under CC BY 4.0. Hosted on the framework\'s neutral domain.',
  alternates: { canonical: '/framework/v1' },
  openGraph: {
    title: 'The Integrity Framework v1.0',
    description:
      'Frozen canonical spec. Three operational layers, eight moat layers, six buyer questions. CC BY 4.0.',
    url: PAGE_URL,
    type: 'article',
    siteName: site.name,
    publishedTime: `${LAST_UPDATED}T00:00:00Z`,
    authors: ['Startvest LLC'],
  },
};

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The Integrity Framework v1.0',
  description:
    'A working framework for building compliance and trust-adjacent products under structural commitments. Three operational layers, eight moat layers, six buyer questions. Originated by Startvest LLC.',
  author: {
    '@type': 'Organization',
    name: 'Startvest LLC',
    url: 'https://startvest.ai',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Startvest LLC',
    url: 'https://startvest.ai',
  },
  datePublished: `${LAST_UPDATED}T00:00:00Z`,
  dateModified: `${LAST_UPDATED}T00:00:00Z`,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': PAGE_URL,
  },
  url: PAGE_URL,
  inLanguage: 'en-US',
  license: 'https://creativecommons.org/licenses/by/4.0/',
};

export default function FrameworkV1Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />

      <article className="bg-white">
        <section className="border-b border-surface-200">
          <div className="container-wide py-16 md:py-20">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-3">
                The Integrity Framework · v{VERSION} · originated by Startvest LLC
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-[56px] leading-[1.05] tracking-tight font-semibold text-surface-900 mb-5">
                A framework for building compliance products under structural commitments.
              </h1>
              <p className="text-lg text-surface-600 leading-relaxed">
                Defends against the five recurring failure modes that have destroyed compliance
                categories before. Three operational layers, eight moat layers, six buyer questions.
                Forkable. We hope you do.
              </p>
              <p className="mt-4 text-base text-surface-500 leading-relaxed">
                The framework is generic on purpose. Adoption is the point; if it stays branded as
                one company&apos;s thing, it stays one company&apos;s thing. Anyone can run a
                product under this framework. Startvest happens to be the first.
              </p>

              <div className="mt-6 inline-flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-wide text-surface-600 border border-surface-200 rounded-md px-3 py-1.5 bg-surface-50">
                <span>
                  Version <b className="text-surface-900 font-medium">{VERSION}</b>
                </span>
                <span className="text-surface-400">·</span>
                <span>
                  Last updated <b className="text-surface-900 font-medium">{LAST_UPDATED}</b>
                </span>
                <span className="text-surface-400">·</span>
                <span>
                  Permanent v1 URL{' '}
                  <Link
                    href="/framework/v1"
                    className="text-surface-900 font-medium underline hover:text-brand-700"
                  >
                    /framework/v1
                  </Link>
                </span>
                <span className="text-surface-400">·</span>
                <span>
                  <a href="#cite" className="text-surface-900 font-medium underline hover:text-brand-700">
                    Cite this framework
                  </a>
                </span>
              </div>

              <div className="mt-8 rounded-md border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-800">
                <p className="font-medium">
                  Canonical home moved {RELOCATED_DATE}.
                </p>
                <p className="mt-1 text-brand-700">
                  v1.0 was first published at{' '}
                  <code className="text-xs bg-white border border-brand-200 px-1.5 py-0.5 rounded">
                    claritylift.ai/framework/v1
                  </code>{' '}
                  while the framework&apos;s own site was being built. This URL is now the
                  canonical home; existing citations to the prior URL remain valid via redirect.
                  The wording at v1.0 is unchanged.
                </p>
              </div>

              <nav aria-label="Framework contents" className="mt-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-surface-500 mb-3">
                  Contents
                </p>
                <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm list-decimal list-outside pl-5 text-surface-700 marker:text-surface-400 marker:font-mono">
                  <li><a className="hover:text-brand-700" href="#what-this-is">What this is</a></li>
                  <li><a className="hover:text-brand-700" href="#failure-modes">Failure modes it defends against</a></li>
                  <li><a className="hover:text-brand-700" href="#layer-1">Layer 1: pre-build vetoes</a></li>
                  <li><a className="hover:text-brand-700" href="#layer-2">Layer 2: architectural constraints</a></li>
                  <li><a className="hover:text-brand-700" href="#layer-3">Layer 3: operational guardrails</a></li>
                  <li><a className="hover:text-brand-700" href="#moats">The eight-layer moat model</a></li>
                  <li><a className="hover:text-brand-700" href="#scorecard">Vendor scorecard</a></li>
                  <li><a className="hover:text-brand-700" href="#self-grades">Operator self-grades (baseline)</a></li>
                  <li><a className="hover:text-brand-700" href="#fork">How to fork it</a></li>
                  <li><a className="hover:text-brand-700" href="#cite">How to cite this framework</a></li>
                  <li><a className="hover:text-brand-700" href="#versions">Version history</a></li>
                </ol>
              </nav>
            </div>
          </div>
        </section>

        <Section id="what-this-is" title="What this is">
          <p>
            A working document. It governs how every Startvest product is designed, built, and
            operated. It&apos;s also published openly so other operators can fork it for their own
            compliance and trust-adjacent products. The framework&apos;s value is in adoption;
            locking it down would defeat the purpose.
          </p>
          <p>
            The framework has three operational layers (vetoes, architectural constraints,
            operational guardrails) plus an eight-layer moat model used as decision criteria for
            product portfolio fit. Each is documented below.
          </p>
          <p>
            If you fork this for your own product, the only request is that you keep the
            version-and-changelog discipline. A framework that drifts silently is the failure mode
            the framework defends against.
          </p>
        </Section>

        <Section id="failure-modes" title="What it defends against" tone="neg">
          <p>
            Five recurring failure modes have destroyed compliance and trust-adjacent categories
            before. The framework names them so they can be defended against by name.
          </p>
          <ol className="space-y-3 mt-4 list-decimal list-outside pl-5 text-surface-700">
            <li>
              <b className="text-surface-900">Trust-arbitrage failure.</b>{' '}
              Selling certification artifacts as the product instead of underlying outcomes.
              Volume-based business models destroy rigor over time.
            </li>
            <li>
              <b className="text-surface-900">Theater versus substance failure.</b>{' '}
              Outputs that look like compliance but don&apos;t verify the underlying state.
              Checklists checked without verification, evidence collected without inspection.
            </li>
            <li>
              <b className="text-surface-900">Conflict-of-interest failure.</b>{' '}
              Verifier paid by the verified entity, with no structural independence. The Andersen /
              Enron pattern.
            </li>
            <li>
              <b className="text-surface-900">Black-box AI failure.</b>{' '}
              AI producing compliance outputs without humans understanding what was done, why, or
              whether it&apos;s correct. Unique to current-generation compliance work.
            </li>
            <li>
              <b className="text-surface-900">Velocity-over-rigor failure.</b>{' '}
              Business pressure to ship audits or certifications faster than they can be done well.
              Speed claims become trust claims become fraud.
            </li>
          </ol>
          <p className="mt-4 text-surface-600">
            Recent industry collapses (Theranos, FTX, Delve, others) all map to one or more of
            these. The framework is reverse-engineered from those failures.
          </p>
        </Section>

        <Section id="layer-1" title="Layer 1: Pre-build vetoes">
          <p>
            Six questions evaluated before a product gets built or before a major scope expansion.
            Wrong answer kills the product, not delays it.
          </p>
          <ol className="space-y-3 mt-4 list-decimal list-outside pl-5 text-surface-700">
            <Veto name="Artifact versus outcome">
              Is the value proposition selling an artifact (report, badge, score) or an outcome
              (actual compliance, security, audit-readiness)?{' '}
              <b>Outcome passes. Artifact fails.</b>
            </Veto>
            <Veto name="Independence">
              Who pays us, and does that conflict with what we verify? Customer pays for tooling
              that helps them prepare for verification by genuinely independent third parties:{' '}
              <b>pass</b>. Customer pays us to both prepare AND certify: <b>fail</b>. Hard rule,
              not negotiable.
            </Veto>
            <Veto name="Verifiability">
              Can we mechanically verify what we claim, or are we relying on customer attestation
              alone? <b>Mechanical: pass. Attestation as proof: fail.</b>
            </Veto>
            <Veto name="AI accountability">
              When AI gets it wrong, what&apos;s the human review layer and escalation path? AI
              outputs pass through documented review gates before becoming attestations:{' '}
              <b>pass</b>. AI directly to customer-facing claim: <b>fail</b>.
            </Veto>
            <Veto name="Pricing-rigor alignment">
              Does our pricing model create financial pressure to skip work? Pricing tied to actual
              work performed: <b>pass</b>. &ldquo;Unlimited audits for $X/year&rdquo;: <b>fail</b>.
            </Veto>
            <Veto name="The TechCrunch test">
              Imagine the worst-case headline about this product in 18 months. Can we defend every
              claim, methodology, and output? Defense is concrete and survives scrutiny:{' '}
              <b>pass</b>. Defense requires hand-waving: <b>fail</b>.
            </Veto>
          </ol>
          <p className="mt-4 text-surface-600">
            A product failing any veto either gets reframed before build OR gets passed on. The
            framework is more important than any single revenue line.
          </p>
        </Section>

        <Section id="layer-2" title="Layer 2: Architectural constraints">
          <p>
            Seven constraints baked into every product, CI-enforced where possible.
          </p>
          <ol className="space-y-3 mt-4 list-decimal list-outside pl-5 text-surface-700">
            <li>
              <b className="text-surface-900">Evidence chain integrity.</b>{' '}
              Every compliance claim traceable to specific evidence the product collected and
              timestamped.
            </li>
            <li>
              <b className="text-surface-900">AI output review gates.</b>{' '}
              Any AI-generated compliance output passes through human review before becoming an
              attestation, report, or customer-facing claim.
            </li>
            <li>
              <b className="text-surface-900">Customer self-attestation isolation.</b>{' '}
              Customer-attested data visually and architecturally distinct from product-verified
              data.
            </li>
            <li>
              <b className="text-surface-900">Reproducibility.</b>{' '}
              Every audit conclusion reproducible from underlying evidence by an independent
              reviewer. Internal review gates test reproducibility quarterly.
            </li>
            <li>
              <b className="text-surface-900">Evidence retention independence.</b>{' '}
              Evidence supporting compliance claims retained per statutory requirements regardless
              of normal data lifecycle. Customer offboarding does NOT delete audit evidence.
            </li>
            <li>
              <b className="text-surface-900">Independent verification hooks.</b>{' '}
              Every compliance product has a mode where an external auditor can verify product
              outputs without the product mediating.
            </li>
            <li>
              <b className="text-surface-900">Failure transparency.</b>{' '}
              When the product can&apos;t verify something, it MUST say so. Never silently default
              to &ldquo;compliant&rdquo; when verification fails.
            </li>
            <li className="opacity-80">
              <span className="font-mono text-[10px] uppercase tracking-widest text-brand-600 mr-1.5 align-top">
                v1.1 candidate
              </span>{' '}
              <b className="text-surface-900">No pre-population of attestation outputs.</b>{' '}
              Auditor conclusions, test results, and compliance verdicts cannot be populated before
              the underlying customer evidence has been submitted. Surfaced by the{' '}
              <Link
                href="/framework/cases/delve"
                className="text-brand-700 hover:text-brand-800 underline"
              >
                Delve case study
              </Link>
              ; landing as candidate CI rule{' '}
              <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">
                CRIT-SV-NO-PRE-POPULATED-ATTESTATION
              </code>{' '}
              in v1.1. The integrity-cli base manifest already implements this as a content-based
              co-occurrence rule (revised in v1.4.0); the calibration against a real codebase
              happened during the{' '}
              <Link
                href="/framework/cases/fieldledger"
                className="text-brand-700 hover:text-brand-800 underline"
              >
                FieldLedger audit
              </Link>
              .
            </li>
          </ol>
          <p className="mt-4 text-surface-600">
            CI rules enforce these where the codebase shape allows. Evidence-chain integrity
            becomes a non-null foreign key. AI output review gates become required schema fields.
            Failure transparency becomes a forbidden-pattern check that blocks{' '}
            <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">
              catch &#123; return verified: true &#125;
            </code>{' '}
            regressions. The reference runner is{' '}
            <a
              href="https://github.com/Startvest-LLC/startvest-integrity-cli"
              className="text-brand-700 hover:text-brand-800 underline"
            >
              integrity-cli
            </a>
            .
          </p>
        </Section>

        <Section id="layer-3" title="Layer 3: Operational guardrails">
          <p>
            Seven business practices that prevent the model from turning sour over time.
          </p>
          <ol className="space-y-3 mt-4 list-decimal list-outside pl-5 text-surface-700">
            <li>
              <b className="text-surface-900">Refund-on-failure.</b>{' '}
              Every customer contract includes a refund clause if our certification or
              verification turns out wrong because of our error or oversight.
            </li>
            <li>
              <b className="text-surface-900">Public methodology documentation.</b>{' '}
              Every product publishes the methodology by which it produces compliance outputs. Not
              the source code, the methodology.
            </li>
            <li>
              <b className="text-surface-900">Annual independent audit of our own product.</b>{' '}
              Once per year, every Startvest compliance product reviewed by a real third-party CPA
              firm or security firm. They sample our outputs. We publish findings, whatever they
              find.
            </li>
            <li>
              <b className="text-surface-900">Customer-side compliance owner.</b>{' '}
              Before selling to a company, identify who there is responsible for the compliance
              outcome. We don&apos;t sell to companies where compliance is &ldquo;operations&apos;
              problem.&rdquo;
            </li>
            <li>
              <b className="text-surface-900">Internal whistleblower channel.</b>{' '}
              Anonymous reporting channel monitored by independent counsel. Quarterly board-level
              review.
            </li>
            <li>
              <b className="text-surface-900">Community accountability pattern.</b>{' '}
              Free tier or pack offered to a high-trust community that watches our work. Community
              will notice fakery.
            </li>
            <li>
              <b className="text-surface-900">Public kill criteria.</b>{' '}
              Every compliance product publishes the criteria under which we&apos;d shut it down.
              Inverse of growth-at-all-costs.
            </li>
            <li className="opacity-80">
              <span className="font-mono text-[10px] uppercase tracking-widest text-brand-600 mr-1.5 align-top">
                v1.1 candidate
              </span>{' '}
              <b className="text-surface-900">Sub-processor auditor identity verification.</b>{' '}
              When a compliance product routes evidence through a third-party auditor, the
              auditor&apos;s identity and accreditation are verified at sub-processor onboarding
              and re-verified annually. Trust-but-verify on the chain. Surfaced by the{' '}
              <Link
                href="/framework/cases/delve"
                className="text-brand-700 hover:text-brand-800 underline"
              >
                Delve case study
              </Link>
              .
            </li>
          </ol>
        </Section>

        <Section id="moats" title="The eight-layer moat model" tone="pos">
          <p>
            Operating decision criteria used when evaluating new products to commit engineering
            capacity to. The moat model and the integrity framework are complementary: the
            framework keeps us from shipping things that shouldn&apos;t ship; the moat model picks
            among the things that should.
          </p>
          <p>
            A single-layer moat is a feature, not a moat. Wendy&apos;s matched McDonald&apos;s
            McFlurry with the Frosty Fusion and McDonald&apos;s lost the entire matchup because
            dessert was their only differentiator. Yahoo had directory; Google had better search;
            Yahoo died. BlackBerry had keyboard; iPhone matched it eventually; BlackBerry died.
            Single-feature moats are death traps in slow motion.
          </p>
          <p className="font-medium text-surface-900">
            Real moats are stacked. A competitor has to defeat multiple layers simultaneously to
            break in.
          </p>

          <div className="space-y-4 mt-6">
            <MoatLayer
              n={1}
              name="Founder credentials"
              what="What a competitor would need years to acquire. SDVOSB certification, USMC veteran status, prior security clearance, deep domain context. Veteran-owned business community access alone is a real moat for federal-contractor products."
              question="Does this product benefit from credentials we already hold? If a product requires credentials we don't have and don't plan to acquire, it's a category trap."
            />
            <MoatLayer
              n={2}
              name="Technical architecture"
              what="What the code does that's hard to replicate. Retention-zero architecture with CI-enforced privacy invariants. DCAA-compliant audit chain. Algorithm with multiple pre-scoring rules. The CI enforcement is the load-bearing piece: anyone can claim privacy; only the product with build-time enforcement can prove the claim survives a build because the build fails when the claim fails."
              question="Can the technical architecture be enforced at the build-time level? If the only enforcement is policy or documentation, it's a Delve-class risk."
            />
            <MoatLayer
              n={3}
              name="Distribution"
              what="Channels of customer discovery that are hard to cut off. App-store integrations, MCP listings, vertical SEO, trade association partnerships, direct sales to known customer segments. Five compounding distribution channels are harder to disrupt than one."
              question="Does this product reuse existing distribution, or does it require building new distribution from zero?"
            />
            <MoatLayer
              n={4}
              name="Integrity framework"
              what="This document and the artifacts it points at. Layer 1 vetoes, Layer 2 architectural constraints, Layer 3 operational guardrails. Public Trust Principles. Annual third-party audits. Whistleblower channel run by independent counsel. Refund-on-failure clauses. Specifically defends against the Delve failure mode."
              question="Does this product strengthen the integrity framework's credibility, or does it require constraints the framework can't enforce?"
            />
            <MoatLayer
              n={5}
              name="Community accountability"
              what="Free tiers for high-trust communities. Veteran-owned business community for federal-contractor products. Disability-rights advocates for ADA compliance products. Public-sector orgs for trust-adjacent products. Public methodology documentation. Communities watching the work catch fakery faster than auditors."
              question="Is there a high-trust community this product serves that would care enough to watch?"
            />
            <MoatLayer
              n={6}
              name="Compounding intelligence"
              what="Pattern recognition that improves with time and can't be skipped. The scanner's accumulated scored-and-validated candidates. Each product built informs scoring. A competitor entering this space starts at month 1 of pattern recognition while we're at month 24. Time spent here doesn't depreciate."
              question="Does this product feed back into the scanner or other compounding-intelligence systems? Or does it stand alone?"
            />
            <MoatLayer
              n={7}
              name="Honest brand"
              what={'Commitments competitors can copy only at cost. "Won\'t certify our own customers." "Will refund when wrong." "SDVOSB pack free forever." A competitor matching these claims must deliver them, which means giving up shortcuts most competitors rely on. The brand is the contract.'}
              question="Does this product's positioning require integrity commitments that lock in the brand promise, or does it sit comfortably in the standard SaaS mode?"
            />
            <MoatLayer
              n={8}
              name="Portfolio synergy"
              what="Multiple products sharing infrastructure, distribution, brand, community. Killing one product doesn't hurt the others; the portfolio absorbs the loss. Cross-pollination across products that competitors with one product can't match."
              question="Does this product reinforce 6+ of the other 7 layers, or does it stand alone?"
            />
          </div>

          <div className="mt-8 rounded-xl border border-surface-200 bg-white p-5 md:p-6">
            <p className="font-semibold text-surface-900 mb-3">Using the model as decision criteria</p>
            <p className="text-surface-700 leading-relaxed mb-3">
              When evaluating a new product or major scope expansion, score it against the eight
              layers:
            </p>
            <ul className="space-y-2 list-disc list-outside pl-5 text-surface-700">
              <li>
                <b className="text-surface-900">Score 6-8:</b> strong portfolio fit. Builds defense
                alongside the existing portfolio.
              </li>
              <li>
                <b className="text-surface-900">Score 3-5:</b> mixed. Needs explicit justification
                for why the unfit layers don&apos;t matter.
              </li>
              <li>
                <b className="text-surface-900">Score 0-2:</b> category trap regardless of
                immediate revenue. Pass.
              </li>
            </ul>
            <p className="mt-3 text-surface-600 leading-relaxed">
              This filter sits alongside (not in place of) standard product-scoring frameworks and
              the Layer 1 integrity vetoes. A product can score high on a feature-fit metric and
              still fail the moat filter; a product can pass all six vetoes and still not fit the
              portfolio.
            </p>
          </div>
        </Section>

        <Section id="scorecard" title="Vendor scorecard">
          <p>
            Six yes/no questions. Score any compliance or trust-adjacent vendor (including products
            operating under this framework) against them. One point per yes. Score below 5 is
            information.
          </p>
          <div className="mt-6 rounded-xl border border-surface-200 bg-white overflow-hidden">
            <ScoreRow
              n={1}
              question="Public methodology page exists?"
              passes="Versioned, changelogged, written so a procurement reviewer can verify each step. Linkable URL."
              fails="No page. Or page exists but reads like marketing copy. Or no version + no changelog."
            />
            <ScoreRow
              n={2}
              question="Refund-on-failure clause in the standard MSA?"
              passes="Default contract terms. Vendor can paste the clause on request."
              fails="Refund only on negotiated enterprise contracts. Or no refund clause at all."
            />
            <ScoreRow
              n={3}
              question="Independent third-party audit, annually, with public findings?"
              passes="Real CPA / security firm. Most recent audit shareable on request. Findings public."
              fails="Only the audits the vendor SELLS to customers exist. Vendor itself is unaudited."
            />
            <ScoreRow
              n={4}
              question="Per-product INTEGRITY.md (or equivalent) in the public repo?"
              passes="Each principle states implemented / partial / not-yet, with file paths and CI rule names."
              fails="No file. Or file exists but every principle reads 'committed to' with no implementation pointer."
            />
            <ScoreRow
              n={5}
              question="AI output review gate is structurally enforced, not policy-only?"
              passes="Vendor walks through the review gate, the database column that enforces it, and the CI rule that blocks bypassing it."
              fails="Review gate is a policy or training. Or AI outputs reach customer-facing claims directly."
            />
            <ScoreRow
              n={6}
              question="Public kill criteria with specific thresholds?"
              passes="Numbers, percentages, days, dates. Written down. Linkable."
              fails={'No kill criteria. Or vague "we\'d shut it down if it stopped working" language.'}
            />
          </div>
          <p className="mt-6 text-surface-700">
            Each row maps to a Layer 1 veto, a Layer 2 constraint, or a Layer 3 guardrail. A vendor
            that ducks any row is operating outside the framework whether they claim it or not.
          </p>
        </Section>

        <Section id="self-grades" title="Operator self-grades (baseline)">
          <p>
            The framework is worthless if the operators who publish it don&apos;t score themselves
            against it. These are the current self-grades for the three Startvest products
            operating under v1.0, captured the day the framework published. Startvest LLC is the
            framework&apos;s originator and operates this directory; the same disclosure asterisks
            that govern Startvest listings on the directory apply here.
          </p>
          <p className="font-medium text-surface-900">
            Baseline published at 2 / 6 and 3 / 6 the day v1.0 shipped. Now at 4 / 6 across all
            three products. Closing the remaining gaps in public.
          </p>
          <div className="mt-6 rounded-xl border border-surface-200 bg-white overflow-hidden">
            <SelfGradeRow
              product="ClarityLift"
              score="4 YES / 0 PARTIAL / 2 NO"
              tier="4 / 6"
              gaps="MSA refund clause (drafted, finalization in flight). Annual third-party audit deferred pending external funding (engagement cost is currently unfunded; not relabeled as scheduled while it isn't)."
              integrityHref="https://github.com/Startvest-LLC/claritylift/blob/master/INTEGRITY.md"
              productHref="https://claritylift.ai"
            />
            <SelfGradeRow
              product="FieldLedger"
              score="4 YES / 0 PARTIAL / 2 NO"
              tier="4 / 6"
              gaps="MSA refund clause (drafted, finalization in flight). Annual third-party audit deferred pending external funding."
              integrityHref="https://github.com/Startvest-LLC/FieldLedger/blob/master/INTEGRITY.md"
              productHref="https://fieldledger.us"
            />
            <SelfGradeRow
              product="adacompliancedocs"
              score="4 YES / 0 PARTIAL / 2 NO"
              tier="4 / 6"
              gaps="MSA refund clause (drafted, finalization in flight). Annual third-party audit deferred pending external funding."
              integrityHref="https://github.com/Startvest-LLC/adacompliancedocs/blob/main/INTEGRITY.md"
              productHref="https://www.adacompliancedocs.com"
            />
          </div>
          <p className="mt-6 text-surface-700">
            Each per-product{' '}
            <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">INTEGRITY.md</code>{' '}
            names the gaps with file paths and target close dates. The methodology and
            kill-criteria rows already moved YES. The MSA refund clause is drafted and pending
            finalization.
          </p>
          <p className="mt-3 text-surface-700">
            Row 3 (annual third-party audit) is honestly classified. The audit is required for the
            row to move YES, and the engagement cost is gated on external funding that Startvest
            does not currently have. We are not relabeling this as &ldquo;in flight&rdquo; or
            &ldquo;scheduled&rdquo; while the funding does not exist; the row stays NO with this
            disclosure attached. When funding is secured, the row moves to PARTIAL with the audit
            firm name and engagement date public. It moves to YES only when an audit cycle
            completes and the findings publish.
          </p>
          <p className="mt-3 text-surface-600">
            Hold us to this. If a score drops without a paired changelog entry on this page or the
            per-product INTEGRITY.md, that is the failure pattern itself.
          </p>
        </Section>

        <Section id="fork" title="How to fork this framework for your own product" muted>
          <p>You&apos;re welcome to. Adoption is the point.</p>
          <ol className="space-y-3 mt-4 list-decimal list-outside pl-5 text-surface-700">
            <li>
              <b className="text-surface-900">Copy this file</b> to your product&apos;s repository
              or your company&apos;s documentation site. Add your own version-and-changelog
              discipline. Don&apos;t drop the changelog; that&apos;s how the framework defends
              against silent drift.
            </li>
            <li>
              <b className="text-surface-900">Translate Layer 1 / Layer 2 / Layer 3 to your context.</b>{' '}
              Some items here are Startvest-specific (SDVOSB community accountability,
              federal-contractor distribution) and won&apos;t apply to you. Others
              (refund-on-failure, public methodology, AI review gates) translate cleanly to most
              compliance and trust-adjacent products.
            </li>
            <li>
              <b className="text-surface-900">Publish your version openly.</b>{' '}
              A framework hidden in a private repo isn&apos;t a framework; it&apos;s a policy
              document. The structural commitment to publishing is what gives the framework teeth.
            </li>
            <li>
              <b className="text-surface-900">Tell us if you fork it.</b>{' '}
              No obligation. Email{' '}
              <a className="text-brand-700 hover:text-brand-800 underline" href="mailto:integrity@startvest.ai">
                integrity@startvest.ai
              </a>{' '}
              if you do; we maintain a list of products operating under variants of the framework,
              and that list is itself accountability for everyone on it.
            </li>
          </ol>
          <p className="mt-4 text-surface-600">
            No license fee. CC BY 4.0 — see citation block below. The framework&apos;s value is in
            adoption and adaptation. Lock-in would defeat the purpose.
          </p>
        </Section>

        <Section id="cite" title="How to cite this framework">
          <p>
            Citation-stable URLs. The latest revision lives at{' '}
            <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">
              theintegrityframework.org/framework
            </code>
            . Frozen versions live at{' '}
            <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">
              theintegrityframework.org/framework/v1
            </code>
            ,{' '}
            <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">/v2</code>, etc. Cite
            the frozen URL when the wording matters; cite the latest URL when the principle
            matters.
          </p>
          <div className="mt-6 rounded-xl border border-surface-200 bg-surface-900 text-surface-100 p-5 md:p-6 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto">
            <p className="text-surface-400 uppercase tracking-widest text-[10px] mb-3">Plain text</p>
            <p>
              Startvest LLC. <i>The Integrity Framework</i> v{VERSION}. Published {LAST_UPDATED}.{' '}
              {PAGE_URL}
            </p>
            <p className="text-surface-400 uppercase tracking-widest text-[10px] mt-5 mb-3">Markdown</p>
            <p className="whitespace-pre-wrap break-words">
              [The Integrity Framework v{VERSION}]({PAGE_URL}) — Startvest LLC, {LAST_UPDATED}.
            </p>
            <p className="text-surface-400 uppercase tracking-widest text-[10px] mt-5 mb-3">
              In your product&apos;s INTEGRITY.md
            </p>
            <p className="whitespace-pre-wrap break-words">
              This product operates under [The Integrity Framework v{VERSION}]({PAGE_URL}).
              {'\n'}Per-principle status: see below.
            </p>
          </div>
          <p className="mt-4 text-surface-600 text-base">
            If you operate a product under the framework, link the frozen version you&apos;re
            operating against. When you upgrade, bump the link in your INTEGRITY.md and note the
            upgrade in your changelog. Silent drift is the failure mode the framework defends
            against.
          </p>

          <div className="mt-8 rounded-xl border border-surface-200 bg-surface-50 p-5 md:p-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-surface-500 mb-2">License</p>
            <p className="text-surface-700 leading-relaxed">
              <b className="text-surface-900">Creative Commons Attribution 4.0 International (CC BY 4.0).</b>{' '}
              You can copy, modify, and redistribute this framework — including for commercial use
              — provided you give credit and link to the original. Read the license at{' '}
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-700 hover:text-brand-800 underline"
              >
                creativecommons.org/licenses/by/4.0
              </a>
              . Adoption is the point; the license makes that legally uncomplicated. The frozen
              v1.0 reference URL is the attribution target.
            </p>
          </div>
        </Section>

        <Section id="versions" title="Version history" muted>
          <ul className="space-y-4 list-disc list-outside pl-5 text-surface-700">
            <li>
              <b className="text-surface-900">v1.1 (in flight).</b>{' '}
              Two candidate items, both surfaced by the Delve case study:
              <ul className="mt-2 space-y-1.5 list-disc list-outside pl-5 text-surface-600 text-base">
                <li>
                  Layer 2 — explicit prohibition on pre-population of attestation outputs (candidate
                  CI rule{' '}
                  <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">
                    CRIT-SV-NO-PRE-POPULATED-ATTESTATION
                  </code>
                  ).
                </li>
                <li>
                  Layer 3 — sub-processor auditor identity verification at onboarding and annual
                  re-verification.
                </li>
              </ul>
              <p className="mt-2 text-surface-600 text-base">
                The candidate items are visible on the layer sections above with a{' '}
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-600">
                  v1.1 candidate
                </span>{' '}
                tag. They are NOT yet active in v1.0; this URL stays at v1.0 wording. When v1.1
                ships, a frozen{' '}
                <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">
                  /framework/v1.1
                </code>{' '}
                URL is created and the items lose the candidate tag.
              </p>
            </li>
            <li>
              <b className="text-surface-900">v1.0 ({LAST_UPDATED}).</b>{' '}
              Initial publication. Originated by Startvest LLC. Three operational layers (vetoes,
              architectural constraints, guardrails), eight-layer moat model, six buyer questions,
              fork invitation. First published at{' '}
              <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">
                claritylift.ai/framework
              </code>{' '}
              as interim while the framework&apos;s own site was being built. Canonical home moved
              to this URL on {RELOCATED_DATE}; v1.0 wording is unchanged.
            </li>
          </ul>
        </Section>

        <section className="px-4 sm:px-6 lg:px-8 py-12 bg-surface-50 border-t border-surface-200">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto">
              <p className="text-xs font-semibold uppercase tracking-widest text-surface-500 mb-3">
                The framework operationalized
              </p>
              <p className="text-surface-600 mb-6">
                The framework is a working document. These artifacts make it real:
              </p>
              <ul className="grid sm:grid-cols-2 gap-4 text-sm">
                <li>
                  <Link
                    href="/framework/why"
                    className="text-brand-700 hover:text-brand-800 underline font-medium"
                  >
                    Why the framework looks like this
                  </Link>
                  <p className="text-surface-500 mt-1">
                    Long-form reasoning. The five failure modes, the three layers, why CC BY 4.0.
                  </p>
                </li>
                <li>
                  <Link
                    href="/methodology"
                    className="text-brand-700 hover:text-brand-800 underline font-medium"
                  >
                    Directory methodology
                  </Link>
                  <p className="text-surface-500 mt-1">
                    How the directory evaluates listings against the framework. Versioned.
                    Changelogged.
                  </p>
                </li>
                <li>
                  <Link
                    href="/listings"
                    className="text-brand-700 hover:text-brand-800 underline font-medium"
                  >
                    The directory
                  </Link>
                  <p className="text-surface-500 mt-1">
                    Public list of products evaluated against this framework, with a tier badge per
                    listing.
                  </p>
                </li>
                <li>
                  <a
                    href="https://github.com/Startvest-LLC/theintegrityframework/blob/master/INTEGRITY.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-700 hover:text-brand-800 underline font-medium"
                  >
                    Directory&apos;s own INTEGRITY.md
                  </a>
                  <p className="text-surface-500 mt-1">
                    Per-veto self-mapping for the directory itself. Eating the dog food.
                  </p>
                </li>
                <li>
                  <a
                    href="https://github.com/Startvest-LLC/startvest-integrity-cli"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-700 hover:text-brand-800 underline font-medium"
                  >
                    integrity-cli
                  </a>
                  <p className="text-surface-500 mt-1">
                    Reference runner for the Layer 2 architectural checks. Pure ESM, zero deps,
                    Apache-2.0.
                  </p>
                </li>
                <li>
                  <Link
                    href="/submit"
                    className="text-brand-700 hover:text-brand-800 underline font-medium"
                  >
                    Submit a listing
                  </Link>
                  <p className="text-surface-500 mt-1">
                    Add your product to the directory. Free. Three submission paths (form, GitHub
                    PR, email).
                  </p>
                </li>
              </ul>
              <p className="mt-8 text-sm text-surface-600">
                Contact:{' '}
                <a
                  className="text-brand-700 hover:text-brand-800 underline font-medium"
                  href="mailto:integrity@startvest.ai"
                >
                  integrity@startvest.ai
                </a>
                .
              </p>
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

function Veto({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <li>
      <b className="text-surface-900">{name}.</b> {children}
    </li>
  );
}

function SelfGradeRow({
  product,
  score,
  tier,
  gaps,
  integrityHref,
  productHref,
}: {
  product: string;
  score: string;
  tier: string;
  gaps: string;
  integrityHref: string;
  productHref: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[180px_1fr_auto] gap-x-4 gap-y-3 p-5 md:p-6 border-b border-surface-200 last:border-b-0">
      <div>
        <p className="font-semibold text-surface-900 text-base md:text-lg">{product}</p>
        <p className="font-mono text-[11px] uppercase tracking-widest text-surface-500 mt-1">
          {score}
        </p>
      </div>
      <p className="text-surface-700 leading-relaxed text-sm md:text-base">{gaps}</p>
      <div className="flex flex-col items-start md:items-end gap-2">
        <span className="font-mono text-2xl font-semibold text-surface-900 leading-none">
          {tier}
        </span>
        <div className="flex flex-col gap-1 text-xs">
          <a
            href={integrityHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-700 hover:text-brand-800 underline"
          >
            INTEGRITY.md →
          </a>
          <a
            href={productHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-surface-500 hover:text-surface-700 underline"
          >
            Product →
          </a>
        </div>
      </div>
    </div>
  );
}

function ScoreRow({
  n,
  question,
  passes,
  fails,
}: {
  n: number;
  question: string;
  passes: string;
  fails: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-x-4 gap-y-2 p-5 md:p-6 border-b border-surface-200 last:border-b-0">
      <div className="font-mono text-xs uppercase tracking-widest text-brand-600 md:pt-1">
        Q{String(n).padStart(2, '0')}
      </div>
      <div>
        <p className="font-semibold text-surface-900 mb-3 text-base md:text-lg">{question}</p>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg border border-brand-200 bg-brand-50 px-3 py-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-brand-700 mb-1">
              Yes
            </p>
            <p className="text-surface-700 leading-relaxed">{passes}</p>
          </div>
          <div className="rounded-lg border border-surface-200 bg-surface-50 px-3 py-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-surface-600 mb-1">
              No
            </p>
            <p className="text-surface-700 leading-relaxed">{fails}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MoatLayer({
  n,
  name,
  what,
  question,
}: {
  n: number;
  name: string;
  what: string;
  question: string;
}) {
  return (
    <div className="rounded-xl border border-surface-200 bg-white p-5 md:p-6">
      <div className="flex items-baseline gap-3 mb-3">
        <span className="font-mono text-xs uppercase tracking-widest text-brand-600 shrink-0">
          Layer {n}
        </span>
        <h3 className="font-semibold text-surface-900 text-base md:text-lg">{name}</h3>
      </div>
      <p className="text-surface-700 leading-relaxed">{what}</p>
      <p className="mt-3 text-surface-700 leading-relaxed">
        <span className="font-mono text-xs uppercase tracking-widest text-surface-500 mr-2">
          Evaluation
        </span>
        {question}
      </p>
    </div>
  );
}
