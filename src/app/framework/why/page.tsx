import type { Metadata } from 'next';
import Link from 'next/link';

const VERSION = '1.0';
const LAST_UPDATED = '2026-04-26';

export const metadata: Metadata = {
  title: 'Why the framework looks like this',
  description:
    'The reasoning behind the Integrity Framework v1.0: the five failure modes it defends against, why three operational layers, why six pre-build vetoes, and why this is published openly under CC BY 4.0. Not a marketing page — the engineering rationale.',
  alternates: { canonical: '/framework/why' },
  openGraph: {
    type: 'article',
    title: 'Why the Integrity Framework looks like this',
    description:
      'The reasoning behind v1.0: failure modes, three layers, six vetoes, published openly. The engineering rationale.',
    url: 'https://theintegrityframework.org/framework/why',
    publishedTime: `${LAST_UPDATED}T00:00:00Z`,
  },
};

export default function FrameworkWhyPage() {
  return (
    <article className="container-wide py-16 md:py-24">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-4">
          Framework · reasoning · v{VERSION}
        </p>
        <h1>Why the framework looks like this.</h1>
        <p className="mt-6 text-lg text-surface-600">
          A framework that doesn&apos;t explain itself is one a buyer can&apos;t evaluate and a fork
          can&apos;t adapt. This page is the long version of the why behind the spec at{' '}
          <Link href="/framework">/framework</Link>: the failure modes it&apos;s reverse-engineered
          from, why three operational layers, why these specific six pre-build vetoes, and why the
          whole thing is published openly under CC BY 4.0 instead of locked behind a paywall.
        </p>
        <p className="mt-3 text-sm text-surface-500">
          Written for founders building in compliance-adjacent and trust-adjacent categories,
          buyers trying to evaluate sub-enterprise AI tools, and anyone considering forking the
          framework. Not for procurement teams shopping for SOC 2 alternatives.
        </p>
      </header>

      <Section title="Reverse-engineered from category collapses">
        <p>
          The framework didn&apos;t start as a framework. It started as a notebook of compliance
          and trust-adjacent categories that collapsed, and a question: what did the failures have
          in common?
        </p>
        <p>
          Delve. The accessibility overlay vendors that the FTC eventually went after. Theranos.
          FTX. Andersen on Enron. AI-generated compliance reports that nobody read but everyone
          billed for. Each one was its own story. Each one had its own villain. But the failure
          shape underneath kept rhyming.
        </p>
        <p>The framework names five failure modes that show up in the rhymes:</p>
        <ol className="mt-2 space-y-3 list-decimal list-inside text-surface-700">
          <li>
            <strong>Trust-arbitrage failure.</strong> The product becomes the certification artifact
            (the badge, the report, the score) rather than the underlying outcome (actual
            compliance, security, audit-readiness). Volume-based business models grind rigor down
            over time. The badge survives; the substance doesn&apos;t.
          </li>
          <li>
            <strong>Theater versus substance failure.</strong> Outputs look like compliance but
            don&apos;t verify the underlying state. Checklists checked without verification.
            Evidence collected without inspection. The accessibility overlay sells a script that
            promises WCAG conformance and breaks more pages than it fixes. Looks compliant.
            Isn&apos;t.
          </li>
          <li>
            <strong>Conflict-of-interest failure.</strong> Verifier paid by the verified entity,
            with no structural independence. Andersen on Enron is the textbook case. The pattern
            recurs every time a vendor sells both the preparation tooling AND the certification.
          </li>
          <li>
            <strong>Black-box AI failure.</strong> AI producing compliance outputs without humans
            understanding what was done, why, or whether it&apos;s correct. Unique to current-
            generation compliance work because the AI looks fluent enough to fool a buyer who is
            checking the wrong boxes.
          </li>
          <li>
            <strong>Velocity-over-rigor failure.</strong> Business pressure to ship audits or
            certifications faster than they can be done well. Speed claims become trust claims
            become fraud. The pitch deck slide that says &ldquo;SOC 2 in 30 days&rdquo; is not
            describing a faster audit; it&apos;s describing a worse one.
          </li>
        </ol>
        <p>
          A category in trouble usually has at least one of these going. A category that collapses
          usually had several stacked.
        </p>
        <p>
          The framework is what you get when you reverse-engineer a defensive shape against each
          failure mode and stop. It is not a comprehensive trust framework. It is the minimum
          structural commitments a product in this segment needs to make to avoid the failures we
          have already watched happen.
        </p>
      </Section>

      <Section title="Why three operational layers" muted>
        <p>
          A framework that exists only as a list of vetoes is a marketing page. A framework that
          exists only as a list of architectural rules is a CI plugin. A framework that exists
          only as a list of operational guardrails is a runbook. None of those alone changes the
          behavior of a product over time.
        </p>
        <p>
          The three layers operate at three different decision horizons:
        </p>
        <ul className="mt-2 space-y-3 list-disc list-inside text-surface-700">
          <li>
            <strong>Layer 1 — pre-build vetoes.</strong> Six questions answered before a product
            gets built or before a major scope expansion. Wrong answer kills the product, not
            delays it. This is the layer that prevents the worst outcomes by refusing to start
            them.
          </li>
          <li>
            <strong>Layer 2 — architectural constraints.</strong> Seven constraints baked into the
            running code. CI-enforced where possible. Evidence chain integrity becomes a non-null
            foreign key. AI output review gates become required schema fields. Failure transparency
            becomes a forbidden-pattern check that blocks regressions. This is the layer that
            prevents drift inside a product that already exists.
          </li>
          <li>
            <strong>Layer 3 — operational guardrails.</strong> Seven business practices that
            prevent the model from turning sour over time. Refund-on-failure clauses. Public
            methodology pages. Annual independent audits. Public kill criteria. This is the layer
            that prevents the slow rot that competitive pressure usually wins.
          </li>
        </ul>
        <p>
          A product can pass all of Layer 1, fail Layer 2, and still ship something that looks
          right and breaks quietly under load. A product can pass Layers 1 and 2 but, with no
          Layer 3, drift toward shortcuts as it scales. Each layer is a different kind of
          discipline. Together they cover the time horizons where the failures actually happen.
        </p>
        <p className="text-sm text-surface-500">
          Layer 1 is a refusal at design time. Layer 2 is a refusal at build time. Layer 3 is a
          refusal at operation time. A product that conforms to all three has refused in all the
          places refusal counts.
        </p>
      </Section>

      <Section title="Why these six pre-build vetoes specifically">
        <p>
          The six vetoes in Layer 1 each map to one of the five failure modes (one mode gets two
          vetoes because it shows up in two distinct shapes). They are written in
          fail-the-bad-answer form because that&apos;s the form a founder under pressure can
          actually use.
        </p>
        <ul className="mt-2 space-y-3 list-disc list-inside text-surface-700">
          <li>
            <strong>Veto 1 — artifact versus outcome.</strong> Defends against trust-arbitrage
            failure. Forces the answer to &ldquo;what does this product sell&rdquo; to be the
            outcome, not the certificate that proves it. If the answer is the certificate, the
            product is a stamp factory and the next ten years of incentives will erode the work
            behind the stamp.
          </li>
          <li>
            <strong>Veto 2 — independence.</strong> Defends against conflict-of-interest failure.
            The hard rule is binary: customer pays for tooling that helps them prepare for
            verification by genuinely independent third parties (pass), or customer pays the same
            vendor to both prepare AND certify (fail). There is no honest middle. Anyone who tells
            you otherwise is selling you Andersen on Enron.
          </li>
          <li>
            <strong>Veto 3 — verifiability.</strong> Defends against theater-versus-substance
            failure. Forces every compliance claim to be mechanically verifiable from primary
            evidence the product collected, not from the customer&apos;s attestation that
            everything is fine. Customer-attested fields are allowed to exist; they just can&apos;t
            be the source of a compliance claim.
          </li>
          <li>
            <strong>Veto 4 — AI accountability.</strong> Defends against black-box AI failure.
            When AI outputs reach a customer-facing compliance claim, there must be a documented
            human review gate between the model and the claim. AI as an enrichment of work humans
            do is fine. AI as an unreviewed compliance verdict is the failure mode.
          </li>
          <li>
            <strong>Veto 5 — pricing-rigor alignment.</strong> Defends against
            velocity-over-rigor failure on the pricing side. &ldquo;Unlimited audits for $X/year&rdquo;
            is not a pricing model; it is a commitment to either lose money or skip work. Pricing
            tied to actual work performed is the only durable shape.
          </li>
          <li>
            <strong>Veto 6 — the TechCrunch test.</strong> Defends against velocity-over-rigor
            failure on the marketing side. Imagine the worst-case headline about this product in
            18 months. Can every claim, methodology, and output be defended? If the defense
            requires hand-waving, the product is one investigation away from the headline. The
            test is uncomfortable on purpose.
          </li>
        </ul>
        <p>
          A product that fails any one of these doesn&apos;t need a workaround; it needs a reframe
          or it needs to not get built. The framework is more important than any single revenue
          line. That sentence sounds aspirational until you have to enforce it on yourself, at
          which point it becomes the most useful sentence in the document.
        </p>
      </Section>

      <Section title="Why publish this openly" muted>
        <p>
          A trust framework that lives in one company&apos;s repo is one company&apos;s checklist.
          The framework needs adoption to be worth anything. CC BY 4.0, fork it, run a different
          directory under it, take the parts that fit your product and discard the parts that
          don&apos;t. Just keep the version-and-changelog discipline. A framework that drifts
          silently is the failure mode the framework defends against.
        </p>
        <p>
          The precedents we&apos;re consciously following:
        </p>
        <ul className="mt-2 space-y-3 list-disc list-inside text-surface-700">
          <li>
            <strong>OWASP Top 10.</strong> Free, maintained, cited by procurement teams who never
            paid OWASP a dollar, the de facto baseline for application security in segments where
            formal audits don&apos;t apply yet. The framework is trying to be the OWASP Top 10
            for sub-enterprise AI trust.
          </li>
          <li>
            <strong>The Joel Test.</strong> Twelve yes/no questions that a candidate could answer
            about a company in three minutes and the answers actually predicted whether you should
            work there. The framework&apos;s Layer 1 vetoes are written in the same shape:
            specific, answerable, hard to fake.
          </li>
          <li>
            <strong>Stripe&apos;s public docs.</strong> Treated as a product. Opinionated voice.
            Written by engineering, not by legal. Production quality. The framework lives at this
            URL on a real site, not in a marketing PDF, because the artifact is the product and
            the work shows in the artifact.
          </li>
        </ul>
        <p>
          We&apos;re not modeling on any one of these alone. The combination is the point. A
          framework that copies OWASP&apos;s shape but Joel&apos;s shortness ends up vague. A
          framework that copies Joel&apos;s shortness but OWASP&apos;s commercial neutrality ends
          up edgy. A framework that copies Stripe&apos;s production quality but neither of those
          ends up well-designed but unsharable. The synthesis is what makes it work.
        </p>
      </Section>

      <Section title="How this is different from SOC 2, ISO 27001, FedRAMP">
        <p>
          The framework is not a SOC 2 substitute and is not anti-SOC 2. It serves a different
          market segment.
        </p>
        <p>
          SOC 2 is the right primary trust signal for enterprise SaaS at procurement-checklist
          scale. Its controls answer operational questions a procurement team needs answered before
          signing a six-figure contract. That&apos;s a real and useful function. The framework
          does not replace it. ISO 27001 and FedRAMP serve overlapping but distinct buyer
          populations in the same way.
        </p>
        <p>
          The framework is the right primary trust signal for sub-enterprise AI tools — the
          segment where buyers evaluate solo founders and small teams, where the product is sold
          below the price point that triggers SOC 2 procurement requirements, and where
          operational security audits don&apos;t yet apply because the audit scope and the
          business haven&apos;t reached the size that justifies one. In that segment, framework
          conformance is the discriminating signal because almost nobody has SOC 2 and almost
          nobody is asking for it.
        </p>
        <p>
          A product can carry both, neither, or one as it grows. Products operating under this
          framework typically pursue SOC 2 product-by-product, scoped to the in-scope system,
          when a specific buyer&apos;s procurement demands it. SOC 2 is buyer-driven, not
          framework-driven.
        </p>
        <p>
          The pattern is familiar. OWASP Top 10 served the segment that didn&apos;t have formal
          security audits. The Joel Test served the segment that didn&apos;t have formal QA
          processes. Both are still cited decades later because they made trust legible at a scale
          where the formal audits hadn&apos;t caught up. This framework intends to do the same for
          sub-enterprise AI trust.
        </p>
      </Section>

      <Section title="Where this goes from here" muted>
        <p>
          The framework spec at <Link href="/framework">/framework</Link> is the standard. The
          directory at <Link href="/">theintegrityframework.org</Link> is the adoption surface — a
          public list of products evaluated against the framework, with a tier badge per listing.
          The CLI in this site&apos;s repo at{' '}
          <a href="https://github.com/Startvest-LLC/theintegrityframework">
            github.com/Startvest-LLC/theintegrityframework
          </a>
          {' '}is the runner that proves a code-bearing product&apos;s Layer 2 architectural
          checks pass.
        </p>
        <p>
          Three things we expect to land in the next year, in rough order:
        </p>
        <ul className="mt-2 space-y-3 list-disc list-inside text-surface-700">
          <li>
            <strong>The first community listing.</strong> Until at least one non-Startvest product
            is in the directory, the directory is a portfolio page wearing standards-body clothing.
            One credible community listing changes that. The first one is the credibility moment;
            the directory is built to be honest about that and to wait for it.
          </li>
          <li>
            <strong>External-evaluator engagement on at least one Startvest product.</strong>{' '}
            Currently every Startvest listing carries a disclosure asterisk because Startvest
            operates the directory and is also a listee. A funded engagement that produces a
            published independent evaluation flips the asterisk on that product from a
            disclosure-only state to a verified-independent state. The same pattern any
            community listing can take.
          </li>
          <li>
            <strong>Forks.</strong> Someone runs a different directory under the same framework
            for a different segment. Fintech-AI integrity. Healthcare-AI integrity. The framework
            is generic enough that this is more obvious than it sounds. We will publish the
            forking ergonomics when at least one fork is in motion.
          </li>
        </ul>
        <p>
          What we are not doing: shipping a paid tier in year one. Pursuing aggressive marketing
          tactics around the framework name. Citing the framework as a SOC 2 alternative.
          Comparing products in the directory to each other. Generating directory content with AI
          and presenting it as authoritative. Anything that breaks Veto 1 (artifact versus outcome)
          on the framework itself.
        </p>
        <p>
          We will probably get parts of this wrong. The framework is at v1.0; there will be a v1.1
          and a v2.0 and a v3.0, with version-and-changelog discipline through every step. Look at{' '}
          <Link href="/changelog">/changelog</Link> in 12 months and decide for yourself whether
          the trajectory is honest.
        </p>
      </Section>

      <Section title="A note on tone">
        <p>
          The framework is opinionated on purpose. A standard that hedges every claim is a
          standard nobody can act on. A standard that calls out failure modes by name is
          uncomfortable to write and uncomfortable to publish, and it&apos;s the only kind that
          changes behavior.
        </p>
        <p>
          We are not going to soften the message to be more palatable to the products that the
          framework would reject. The whole point of the framework is to refuse those products.
          Self-selection is the moat.
        </p>
        <p>
          If the framework is right, it should make the bad versions of the products it covers
          less viable, not more profitable. If we publish a framework that the bad versions can
          adopt and keep operating without changing anything, we did it wrong.
        </p>
      </Section>

      <Section title="Version" muted>
        <p>
          v{VERSION}, dated {LAST_UPDATED}.
        </p>
      </Section>

      <Section title="Changelog">
        <h3 className="font-semibold text-surface-900 mt-2">v1.0, dated {LAST_UPDATED}</h3>
        <ul className="mt-2 space-y-1 list-disc list-inside text-surface-700 text-sm">
          <li>Initial publication of the framework reasoning piece.</li>
          <li>
            Synthesizes the failure-mode analysis from{' '}
            <Link href="/framework">/framework</Link> and the published v1 spec at{' '}
            <a href="https://claritylift.ai/framework/v1">claritylift.ai/framework/v1</a>.
          </li>
        </ul>
      </Section>

      <p className="mt-16 max-w-3xl text-sm text-surface-500">
        Forking? Pull the framework spec at{' '}
        <a href="https://claritylift.ai/framework">claritylift.ai/framework</a> and the directory
        source at{' '}
        <a href="https://github.com/Startvest-LLC/theintegrityframework">
          github.com/Startvest-LLC/theintegrityframework
        </a>
        . CC BY 4.0. The only request is the version-and-changelog discipline.
      </p>
    </article>
  );
}

function Section({
  title,
  children,
  muted = false,
}: {
  title: string;
  children: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <section
      className={`mt-16 -mx-6 px-6 py-10 md:py-14 ${muted ? 'bg-surface-50' : 'bg-white'} border-y border-surface-200`}
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl font-semibold text-surface-900 tracking-tight mb-5">
          {title}
        </h2>
        <div className="space-y-4 text-base leading-relaxed text-surface-700">{children}</div>
      </div>
    </section>
  );
}
