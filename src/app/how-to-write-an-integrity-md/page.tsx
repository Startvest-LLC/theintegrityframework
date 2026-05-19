import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

const PAGE_URL = `${site.url}/how-to-write-an-integrity-md`;

export const metadata: Metadata = {
  title: 'How to write an INTEGRITY.md (in half a day)',
  description:
    'A step-by-step guide for founders writing an INTEGRITY.md to qualify their product for the Bronze tier of the Integrity Framework Directory. Includes a copy-paste template, a worked example, and the six vetoes explained in plain language.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'How to write an INTEGRITY.md (in half a day)',
    description:
      'A step-by-step guide for founders writing an INTEGRITY.md. Copy-paste template, worked example, and the six vetoes in plain language.',
    type: 'article',
    url: PAGE_URL,
    siteName: site.name,
  },
};

const TEMPLATE = `# INTEGRITY.md — <Product Name>

**Product:** <Product Name> (<product-url>)
**Operator:** <Org or solo-founder name>
**Framework version evaluated against:** 1.0
**Self-evaluation tier:** Bronze
**Last updated:** <YYYY-MM-DD>

<One paragraph: what the product does, who it's for, and why a trust signal
matters for buyers in your segment.>

---

## Layer 1 vetoes — self-mapping

### Veto 1 — Artifact versus outcome

**Pass / Disclosed conflict / Fail.** <Two to four sentences. Does the product
sell the underlying outcome, or does it sell a certification artifact that
buyers mistake for the outcome? If the latter, the product fails this veto.>

### Veto 2 — Independence

**Pass / Disclosed conflict / Fail.** <Who reviews the product's work? Is the
reviewer paid by the verified entity? If structural independence isn't
possible, name the conflict directly and describe how it's contained.>

### Veto 3 — Verifiability

**Pass.** <How can a buyer verify the claims the product makes? URL of a
public artifact, a runnable check, a versioned methodology page — name the
specific evidence a buyer can read or run.>

### Veto 4 — AI accountability

**Pass.** <Who owns the decisions the product's AI surfaces? If a human is in
the loop, name the gate. If outputs are presented as authoritative, name the
review process. "We use AI" is not an answer.>

### Veto 5 — Pricing-rigor alignment

**Pass.** <Is there any pricing pressure that would lower review rigor? Free
tier with paid badge? Per-seat pricing that incentivizes inflating headcount?
Name the pressure or its absence directly.>

### Veto 6 — The TechCrunch test

**Pass with named risk.** <What's the most likely critical headline 18 months
out? Write it. Then write the defense. If you can't write a defense without
hand-waving, this veto fails — go fix the underlying issue before listing.>

---

## Version

0.1 — <YYYY-MM-DD> — Initial self-mapping.

## Changelog

### 0.1 — <YYYY-MM-DD>
- Initial INTEGRITY.md created.
`;

interface FaqItem {
  q: string;
  a: string;
}

const faqs: FaqItem[] = [
  {
    q: 'How long does writing an INTEGRITY.md actually take?',
    a: 'Half a day for a thoughtful founder. Most of the time goes into Veto 6 (the TechCrunch test) — writing the most likely critical headline against your product is the part that catches founders off guard. The other five vetoes are mechanical once you have an honest answer to each.',
  },
  {
    q: 'Where should I host my INTEGRITY.md?',
    a: 'Either at the root of your public repo (github.com/your-org/your-repo/blob/main/INTEGRITY.md) or at a stable URL on your product website (e.g., yourproduct.com/integrity). Both are accepted. The directory verifies by reading the URL — what matters is that it is publicly accessible and stays accessible.',
  },
  {
    q: 'What does "Pass with disclosed conflict" mean?',
    a: 'Some vetoes have legitimate edge cases. The directory operator itself is also a listee — that is a real conflict of interest. Naming the conflict directly and describing how it is contained is acceptable. Hiding it is not. "Pass" means no conflict; "Pass with disclosed conflict" means the conflict exists and is named and contained; "Fail" means the conflict cannot be honestly contained.',
  },
  {
    q: 'Do I need to write the INTEGRITY.md myself, or can AI write it?',
    a: 'You write it. AI-generated INTEGRITY.md content presented as authoritative fails Veto 4 by definition. AI as a drafting aid is fine, but the final text must be yours and you must stand behind every claim in it. The directory rejects cosmetic mappings on review.',
  },
  {
    q: 'What if one of the six vetoes does not apply to my product?',
    a: 'Address it anyway. If a veto genuinely does not apply (e.g., your product has no AI component and Veto 4 is N/A), say so explicitly and explain why. "N/A — this product has no AI surface; the Layer 4 review gate is not applicable." A blank section gets rejected; an honest N/A with reasoning gets accepted.',
  },
  {
    q: 'Can I claim Silver in my INTEGRITY.md, or does that come later?',
    a: 'Claim the tier you actually qualify for. Bronze requires only the INTEGRITY.md. Silver requires the INTEGRITY.md plus one of: integrity-cli green against your public repo, or a public methodology page with a versioned changelog. If your product has the Silver credential, claim it; the directory will verify before publishing the badge.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((it) => ({
    '@type': 'Question',
    name: it.q,
    acceptedAnswer: { '@type': 'Answer', text: it.a },
  })),
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to write an INTEGRITY.md',
  description:
    'Step-by-step instructions for founders writing an INTEGRITY.md to qualify their product for the Bronze tier of the Integrity Framework Directory.',
  totalTime: 'PT4H',
  inLanguage: 'en-US',
  url: PAGE_URL,
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Read the framework',
      text: 'Read the canonical Integrity Framework spec at claritylift.ai/framework/v1. Pay particular attention to the six Layer 1 vetoes — your INTEGRITY.md will address each one by name.',
      url: `${PAGE_URL}#step-1`,
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Copy the template',
      text: 'Copy the INTEGRITY.md template into a new file at the root of your repo or your product website. The template has six veto sections pre-filled with the questions you need to answer.',
      url: `${PAGE_URL}#step-2`,
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Map each veto honestly',
      text: 'Work through each veto in order. Pass, Disclosed conflict, or Fail. Name conflicts directly; cosmetic fills are rejected on review. Veto 6 (the TechCrunch test) is the one most founders find hardest — write the most likely critical headline against your product, then write the defense.',
      url: `${PAGE_URL}#step-3`,
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Publish to a public URL',
      text: 'Commit the INTEGRITY.md to your public repo or publish it at a stable URL on your product website. The directory verifies by reading that URL.',
      url: `${PAGE_URL}#step-4`,
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Submit to the directory',
      text: 'Submit the listing at theintegrityframework.org/submit/form. The Startvest team reads the INTEGRITY.md within 14 calendar days and approves, requests changes, or rejects with reasons.',
      url: `${PAGE_URL}#step-5`,
    },
  ],
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to write an INTEGRITY.md (in half a day)',
  description:
    'A step-by-step guide for founders writing an INTEGRITY.md to qualify their product for the Bronze tier of the Integrity Framework Directory.',
  author: { '@type': 'Organization', name: 'Startvest LLC', url: 'https://startvest.ai' },
  publisher: { '@type': 'Organization', name: 'Startvest LLC' },
  inLanguage: 'en-US',
  mainEntityOfPage: PAGE_URL,
  url: PAGE_URL,
};

export default function HowToWriteAnIntegrityMdPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <article className="container-wide py-16 md:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-4">
            Founder guide
          </p>

          <h1>How to write an INTEGRITY.md (in half a day)</h1>

          {/* Direct-answer paragraph: extractable as a single AI Overview / Perplexity citation block. */}
          <p className="mt-6 text-lg text-surface-700 leading-relaxed">
            An <strong>INTEGRITY.md</strong> is a public file at the root of your repo or product
            website where you self-map your product against the six Layer 1 vetoes of the
            Integrity Framework. The directory uses it to qualify your product for the Bronze tier.
            A thoughtful founder takes about half a day. The hard part is not the writing; it is
            being honest about the trade-offs the framework asks you to name.
          </p>

          <h2 className="mt-12" id="step-1">Step 1 — Read the framework first</h2>
          <p className="mt-3 text-surface-700 leading-relaxed">
            The framework is short and forkable, published under CC BY 4.0 at{' '}
            <a href="https://claritylift.ai/framework/v1" className="text-brand-700 underline">
              claritylift.ai/framework/v1
            </a>
            . You only strictly need the six Layer 1 vetoes for an INTEGRITY.md, but read all three
            layers — the deeper architectural and operational sections explain why the vetoes are
            shaped the way they are.
          </p>
          <p className="mt-3 text-surface-700 leading-relaxed">
            Skim the directory&apos;s own{' '}
            <a
              href="https://github.com/Startvest-LLC/theintegrityframework/blob/master/INTEGRITY.md"
              className="text-brand-700 underline"
            >
              INTEGRITY.md
            </a>{' '}
            on the way through. It is the gold-standard example: the directory is itself a product
            evaluated against the framework, and it carries a real disclosed conflict of interest
            (operator-as-listee) for Veto 2, which is a useful pattern to study before you write
            yours.
          </p>

          <h2 className="mt-12" id="step-2">Step 2 — Copy the template</h2>
          <p className="mt-3 text-surface-700 leading-relaxed">
            Save this as <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">INTEGRITY.md</code>{' '}
            at the root of your repo, or as a page at{' '}
            <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">/integrity</code> on your
            product website.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-lg bg-surface-900 p-4 text-xs leading-relaxed text-surface-50">
            <code>{TEMPLATE}</code>
          </pre>

          <h2 className="mt-12" id="step-3">Step 3 — Work through the six vetoes</h2>
          <p className="mt-3 text-surface-700 leading-relaxed">
            Each veto asks one question. Answer in two to four sentences. Three legitimate verdicts:
          </p>
          <ul className="mt-3 list-disc pl-6 space-y-1 text-surface-700">
            <li><strong>Pass</strong> — no conflict, no failure mode triggered.</li>
            <li><strong>Pass with disclosed conflict</strong> — the conflict exists, is named directly, and is contained.</li>
            <li><strong>Fail</strong> — fix the underlying issue before listing. The directory will not accept a Fail.</li>
          </ul>

          <h3 className="mt-8">Veto 1 — Artifact versus outcome</h3>
          <p className="mt-2 text-surface-700 leading-relaxed">
            <em>Does the product sell the underlying outcome, or a certification artifact buyers
            mistake for the outcome?</em> Selling the badge is the failure mode. Selling the work
            that produces the badge is the pass. Compliance products that ship a PDF and call it
            done fail; ones that produce the underlying record and the PDF as a downstream artifact
            pass.
          </p>

          <h3 className="mt-6">Veto 2 — Independence</h3>
          <p className="mt-2 text-surface-700 leading-relaxed">
            <em>Who reviews the product&apos;s work? Is the reviewer paid by the verified entity?</em>{' '}
            If structural independence isn&apos;t possible, name the conflict directly and describe
            how it is contained. The directory itself uses this pattern: Startvest is both operator
            and listee, the conflict is named in every Startvest listing, and an external evaluator
            is named as the long-term path. That is acceptable. Hiding it is not.
          </p>

          <h3 className="mt-6">Veto 3 — Verifiability</h3>
          <p className="mt-2 text-surface-700 leading-relaxed">
            <em>How can a buyer verify the product&apos;s claims without taking your word for it?</em>{' '}
            Name a public artifact, a runnable check, or a versioned methodology page. &quot;Trust us&quot;
            is the failure mode. A URL a buyer can read or a CLI they can run is the pass.
          </p>

          <h3 className="mt-6">Veto 4 — AI accountability</h3>
          <p className="mt-2 text-surface-700 leading-relaxed">
            <em>If your product surfaces AI output, who owns the decision?</em> Name the human
            review gate, the audit log, or the explicit boundary where the AI output stops being
            authoritative. Products that present AI output as final without a review gate fail.
            Products with no AI surface can declare this veto N/A with one sentence of reasoning.
          </p>

          <h3 className="mt-6">Veto 5 — Pricing-rigor alignment</h3>
          <p className="mt-2 text-surface-700 leading-relaxed">
            <em>Does your pricing model create financial pressure to lower review rigor?</em>{' '}
            Free-tier-with-paid-badge fails. Per-seat pricing that incentivizes inflating headcount
            fails. Free-or-flat-rate-or-usage-based passes. Name the pressure honestly; if it
            exists, name the structural protection that contains it.
          </p>

          <h3 className="mt-6">Veto 6 — The TechCrunch test</h3>
          <p className="mt-2 text-surface-700 leading-relaxed">
            <em>What is the most likely critical headline against your product 18 months out?</em>{' '}
            Write the headline. Then write the defense. If you can&apos;t write a defense that
            holds up without hand-waving, the veto fails — go fix the underlying issue before you
            list. This is the veto most founders find hardest. It is also the one that catches the
            real failure modes.
          </p>

          <h2 className="mt-12" id="step-4">Step 4 — Publish to a public URL</h2>
          <p className="mt-3 text-surface-700 leading-relaxed">
            Commit to your public repo, or publish at a stable URL on your product site. The
            directory verifies the credential by reading the URL — what matters is that it is
            public and that the URL stays valid.
          </p>
          <p className="mt-3 text-surface-700 leading-relaxed">
            If you go the website route, give it a sensible permanent slug:{' '}
            <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">/integrity</code> is the
            convention. The directory will use that URL on your listing.
          </p>

          <h2 className="mt-12" id="step-5">Step 5 — Submit to the directory</h2>
          <p className="mt-3 text-surface-700 leading-relaxed">
            Open the form at <Link href="/submit/form" className="text-brand-700 underline">/submit/form</Link>{' '}
            and paste the URL. Review SLA is 14 calendar days from submission. You will get one of
            three responses: approved with a publish date, changes requested with specific gaps, or
            rejected with the reason.
          </p>
          <p className="mt-3 text-surface-700 leading-relaxed">
            Prefer email or GitHub PR? Both paths still work — see the{' '}
            <Link href="/submit" className="text-brand-700 underline">submit page</Link> for both.
          </p>

          <h2 className="mt-12">What gets rejected on review</h2>
          <ul className="mt-4 list-disc pl-6 space-y-2 text-surface-700">
            <li>
              <strong>Cosmetic fills.</strong> A section that names the veto but doesn&apos;t answer
              the question. Reviewers look for the substantive claim, not the heading.
            </li>
            <li>
              <strong>Hand-waved Veto 6.</strong> A defense that requires the reader to assume good
              faith on a non-trivial claim is not a defense. Re-write the headline harder; write
              the defense against the harder version.
            </li>
            <li>
              <strong>Hidden conflicts.</strong> Veto 2 fails if the conflict exists but is not
              named. The directory&apos;s own INTEGRITY.md names the operator-as-listee conflict in
              the second sentence of Veto 2; that is the bar.
            </li>
            <li>
              <strong>AI-generated content presented as authoritative.</strong> AI as a drafting
              aid is fine. AI-generated INTEGRITY.md text the founder hasn&apos;t internalized fails
              Veto 4 by definition.
            </li>
            <li>
              <strong>Self-attested Silver claims with no public credential URL.</strong>{' '}
              Silver is verified, not declared. If you&apos;re claiming Silver, the
              integrity-cli output URL or the methodology page URL must be public and reachable.
            </li>
          </ul>

          <h2 className="mt-12">A worked example</h2>
          <p className="mt-3 text-surface-700 leading-relaxed">
            The cleanest worked example is the directory&apos;s own INTEGRITY.md — it deliberately
            includes a real disclosed conflict (operator-as-listee under Veto 2) so founders can see
            the &quot;Pass with disclosed conflict&quot; pattern applied honestly. Read it at{' '}
            <a
              href="https://github.com/Startvest-LLC/theintegrityframework/blob/master/INTEGRITY.md"
              className="text-brand-700 underline"
            >
              github.com/Startvest-LLC/theintegrityframework/blob/master/INTEGRITY.md
            </a>
            . The four Startvest product INTEGRITY.md files (linked from each listing) are also
            useful — they show four different products at different tiers handling the same vetoes
            differently.
          </p>

          <h2 className="mt-12">Frequently asked questions</h2>
          <dl className="mt-4 space-y-6">
            {faqs.map((it) => (
              <div key={it.q}>
                <dt className="font-semibold text-surface-900">{it.q}</dt>
                <dd className="mt-2 text-surface-700 leading-relaxed">{it.a}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href="/submit/form"
              className="inline-flex items-center rounded-md bg-brand-700 px-5 py-3 text-sm font-medium text-white no-underline hover:bg-brand-800"
            >
              Submit your listing
            </Link>
            <Link
              href="/what-is-the-integrity-framework"
              className="inline-flex items-center rounded-md border border-surface-300 px-5 py-3 text-sm font-medium text-surface-800 no-underline hover:border-surface-400"
            >
              What is the framework?
            </Link>
            <Link
              href="/listings"
              className="inline-flex items-center rounded-md border border-surface-300 px-5 py-3 text-sm font-medium text-surface-800 no-underline hover:border-surface-400"
            >
              Browse listings
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
