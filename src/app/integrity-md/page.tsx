import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

const PAGE_URL = `${site.url}/integrity-md`;

export const metadata: Metadata = {
  title: 'INTEGRITY.md — Template, format, and worked example',
  description:
    'INTEGRITY.md is a public, founder-authored file at the root of an AI product that self-maps the product against The Integrity Framework. Free CC BY 4.0 template, worked example, and the verification rules the directory applies.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'INTEGRITY.md template + format',
    description:
      'Free CC BY 4.0 template for the public trust artifact The Integrity Framework Bronze tier requires.',
    type: 'article',
    url: PAGE_URL,
    siteName: site.name,
  },
};

interface FaqItem { q: string; a: string }

const faqs: FaqItem[] = [
  {
    q: 'What is INTEGRITY.md?',
    a: 'INTEGRITY.md is a public, founder-authored markdown file at the root of an AI product\u2019s repository or website that self-maps the product against The Integrity Framework. It addresses each of the six Layer 1 vetoes by name, names the product\u2019s framework version, and is required for the Bronze tier in the directory at theintegrityframework.org.',
  },
  {
    q: 'Where should INTEGRITY.md live?',
    a: 'At the canonical product surface a buyer would find first. For open-source AI tools, that is the repo root next to README.md. For closed-source SaaS, that is the marketing site at /integrity.md or linked from the trust or security page. The file must be reachable without authentication.',
  },
  {
    q: 'Do I need to use Markdown?',
    a: 'Markdown is the conventional format and what the directory verifier expects. HTML or plaintext work if the headings and section labels match the template. The verifier reads the document structurally; format flexibility is OK as long as each Layer 1 veto is addressed under a clearly labeled section.',
  },
  {
    q: 'How long should INTEGRITY.md be?',
    a: 'Long enough to be honest about each veto, short enough to read in 10 minutes. TIF\u2019s own INTEGRITY.md (for the directory itself) is roughly 100 lines of markdown. Listings on the directory range from 60 to 300 lines depending on how much disclosure the product surface area requires. Brevity that conceals trade-offs fails verification; verbosity that pads sections does too.',
  },
  {
    q: 'What if my product fails a veto?',
    a: 'Name the failure in the section, in plain language, with the trade-off you accept. The framework names \u201Carchitectural honesty\u201D as a passing condition for several vetoes \u2014 a disclosed failure beats a cosmetic pass. The directory will list a product with a disclosed failure at Bronze; it will reject a product that pretends to pass when it does not.',
  },
  {
    q: 'How does the directory verify INTEGRITY.md?',
    a: 'The Startvest team reads the file, checks the public artifacts it references (repo links, methodology page, integrity-cli output, etc.), and matches the self-mapping against the v1.0 spec at /framework/v1. Listings re-scan quarterly. A spec version bump triggers re-verification; a removed or hidden INTEGRITY.md downgrades or de-lists the product.',
  },
  {
    q: 'Is INTEGRITY.md a substitute for SOC 2?',
    a: 'No. SOC 2 is an audited control report for service organizations at enterprise spend levels. INTEGRITY.md is a self-mapped, publicly verifiable trust artifact for the sub-enterprise segment where SOC 2 is the wrong shape. Products that legitimately need SOC 2 should still pursue it. INTEGRITY.md addresses the segment SOC 2 prices out.',
  },
  {
    q: 'Can I fork the template?',
    a: 'Yes. The Integrity Framework spec is CC BY 4.0. The INTEGRITY.md template here is CC BY 4.0 as well. Fork for your own segment if the six Layer 1 vetoes do not fit your product shape; the directory at theintegrityframework.org indexes products that self-map against the canonical Startvest version.',
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

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'INTEGRITY.md \u2014 Template, format, and worked example',
  description:
    'Free CC BY 4.0 template for the INTEGRITY.md trust artifact required by The Integrity Framework Bronze tier.',
  author: { '@type': 'Organization', name: 'Startvest LLC', url: 'https://startvest.ai' },
  publisher: { '@type': 'Organization', name: 'Startvest LLC' },
  inLanguage: 'en-US',
  mainEntityOfPage: PAGE_URL,
  url: PAGE_URL,
  license: 'https://creativecommons.org/licenses/by/4.0/',
  about: {
    '@type': 'DefinedTerm',
    name: 'INTEGRITY.md',
    description:
      'A public, founder-authored file at the root of an AI product that self-maps the product against The Integrity Framework v1.0.',
    inDefinedTermSet: 'https://theintegrityframework.org/framework/v1',
    termCode: 'integrity-md',
  },
};

// Standalone DefinedTerm so AI Overviews citing "integrity framework spec"
// can pull this block directly rather than reaching into Article.about.
const definedTermSchema = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  '@id': `${PAGE_URL}#integrity-md`,
  name: 'INTEGRITY.md',
  alternateName: ['Integrity Framework spec file', 'integrity.md'],
  description:
    'INTEGRITY.md is a public, founder-authored markdown file at the root of an AI product (in the repo or on the marketing site) that self-maps the product against The Integrity Framework v1.0. Bronze listings require all six Layer 1 vetoes self-mapped. Silver listings add the seven Layer 2 architectural constraints and seven Layer 3 operational guardrails. Published under CC BY 4.0.',
  inDefinedTermSet: 'https://theintegrityframework.org/framework/v1',
  termCode: 'integrity-md',
  url: PAGE_URL,
};

const TEMPLATE = `# INTEGRITY.md \u2014 <Product name>

**Product:** <Product name> (<canonical-url>)
**Operator:** <Legal entity>
**Framework version evaluated against:** 1.0
**Self-evaluation tier:** Bronze | Silver
**Last updated:** YYYY-MM-DD

<One- or two-sentence honest description of what the product is and who it is for. The directory verifier reads this to confirm the product surface matches the rest of the file.>

---

## Layer 1 vetoes \u2014 self-mapping

### Veto 1 \u2014 Artifact versus outcome

**Pass | Fail with disclosed trade-off.**

<Explain whether the product sells the artifact (a certification, a badge, a report) or the outcome the artifact is supposed to indicate. Name any cases where the line is fuzzy. Disclosed fuzziness beats a cosmetic pass.>

### Veto 2 \u2014 Independence

**Pass | Pass with disclosed conflict | Fail with disclosed trade-off.**

<Disclose every relationship between the product, its operators, its listed customers, and any party that benefits from a favorable rating. Material conflicts must be named on the listing surface, not just here.>

### Veto 3 \u2014 Verifiability

**Pass | Fail with disclosed trade-off.**

<List the artifacts a third-party reader can verify mechanically: public repo, changelog with versioned methodology page, integrity-cli output, signed receipts, anything else. Anything not externally verifiable should be marked as such.>

### Veto 4 \u2014 AI accountability

**Pass | Fail with disclosed trade-off.**

<Describe what the product does and does not do with AI. Where AI generates artifacts (text, decisions, recommendations) the failure mode is hidden generation; pass requires labeling, audit trail, or a human-in-the-loop pattern surfaced to the buyer.>

### Veto 5 \u2014 Pricing-rigor alignment

**Pass | Fail with disclosed trade-off.**

<State whether the product\u2019s pricing matches the rigor of the artifact it sells. Enterprise pricing on a self-attested artifact is a fail. Free or sub-enterprise pricing on artifacts that imply enterprise rigor is also a fail. Mismatch should be named.>

### Veto 6 \u2014 The TechCrunch test

**Pass | Fail with disclosed trade-off.**

<Imagine the headline if your worst failure mode were reported publicly tomorrow. If a journalist would describe the product as misleading, deceptive, or theatrical based on this INTEGRITY.md, it does not pass.>

---

## Layer 2 constraints (Silver tier only)

<Bronze listings can omit Layer 2. Silver listings address each of the seven architectural constraints in the v1.0 spec, briefly, with a link to the public artifact that demonstrates conformance.>

---

## Layer 3 guardrails (Silver tier only)

<Bronze listings can omit Layer 3. Silver listings address each of the seven operational guardrails in the v1.0 spec, briefly, with a link to the public artifact.>

---

## Changelog

- YYYY-MM-DD \u2014 Initial publication against v1.0.

---

*Published under CC BY 4.0. The Integrity Framework canonical spec is at https://theintegrityframework.org/framework/v1.*
`;

export default function IntegrityMdPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />

      <article className="container-wide py-16 md:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-4">
            Trust artifact \u00B7 CC BY 4.0
          </p>

          <h1>INTEGRITY.md</h1>

          {/* Direct-answer paragraph — extractable as a single AI Overview /
              Perplexity citation block. ~60 words, named entity in first
              sentence, definition before context. */}
          <p className="mt-6 text-lg text-surface-700 leading-relaxed">
            <strong>INTEGRITY.md</strong> is a public, founder-authored file at the root of an
            AI product\u2019s repository or website that self-maps the product against{' '}
            <Link href="/framework/v1" className="text-brand-700 underline">
              The Integrity Framework v1.0
            </Link>
            . It addresses each of the six Layer 1 vetoes by name, names the product\u2019s
            framework version, and is required for the Bronze tier in the directory at
            theintegrityframework.org. The format is plain Markdown. The license is CC BY 4.0.
            A worked example is the file at the root of this site\u2019s own repo.
          </p>

          <h2 className="mt-12">The template</h2>
          <p className="mt-3 text-surface-700 leading-relaxed">
            Copy this into <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">INTEGRITY.md</code>{' '}
            at your product\u2019s canonical surface (repo root for open source, marketing site
            for closed-source SaaS). Replace every angle-bracket placeholder. Do not delete
            sections \u2014 if a veto does not apply, name the trade-off in plain language.
          </p>

          <div className="mt-6 rounded-lg border border-surface-200 bg-surface-50 overflow-hidden">
            <div className="flex items-center justify-between border-b border-surface-200 bg-white px-4 py-2 text-xs text-surface-600">
              <span className="font-mono">INTEGRITY.md</span>
              <a
                href="/templates/INTEGRITY.template.md"
                download
                className="text-brand-700 underline"
              >
                Download
              </a>
            </div>
            <pre className="overflow-x-auto p-4 text-xs leading-relaxed text-surface-800 whitespace-pre-wrap">
              {TEMPLATE}
            </pre>
          </div>

          <h2 className="mt-12">Worked example</h2>
          <p className="mt-3 text-surface-700 leading-relaxed">
            The Integrity Framework Directory is itself a product, evaluated against the
            framework it publishes. Its INTEGRITY.md is the canonical worked example. It is
            written from the operator\u2019s point of view, names a real conflict of interest
            under Veto 2, and discloses the path to lifting that conflict over time.
          </p>
          <p className="mt-3">
            <a
              href="https://github.com/Startvest-LLC/theintegrityframework/blob/master/INTEGRITY.md"
              className="text-brand-700 underline"
              rel="noopener"
            >
              Read the directory\u2019s INTEGRITY.md on GitHub \u2192
            </a>
          </p>

          <h2 className="mt-12">Verification</h2>
          <p className="mt-3 text-surface-700 leading-relaxed">
            When a listing is submitted, the directory verifier reads INTEGRITY.md and
            confirms:
          </p>
          <ul className="mt-4 list-disc pl-6 space-y-2 text-surface-700">
            <li>The file is reachable at a stable, unauthenticated URL.</li>
            <li>Each of the six Layer 1 vetoes is addressed under a clearly labeled section.</li>
            <li>The product\u2019s framework version is named explicitly (e.g. <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">1.0</code>).</li>
            <li>The artifacts the file references (repo URLs, methodology pages, integrity-cli output) actually exist and resolve.</li>
            <li>The self-mapping passes the TechCrunch test in Veto 6.</li>
          </ul>
          <p className="mt-4 text-surface-700 leading-relaxed">
            Silver listings additionally need either a passing{' '}
            <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">integrity-cli</code>{' '}
            run against the public repo, or a versioned public methodology page. A failing
            verification returns to the submitter with the specific veto or artifact at issue.
          </p>

          <h2 className="mt-12">Common mistakes</h2>
          <ul className="mt-4 list-disc pl-6 space-y-2 text-surface-700">
            <li><strong>Marking every veto Pass with no trade-off.</strong> Real products carry
              trade-offs. A spotless self-mapping is a TechCrunch-test fail by itself.</li>
            <li><strong>Linking artifacts that require auth.</strong> If a buyer cannot read the
              referenced doc without an NDA, the artifact does not count toward Verifiability.</li>
            <li><strong>Vague AI accountability copy.</strong> &ldquo;We use AI responsibly&rdquo;
              is not a pass. Name what the AI generates, what the audit trail is, and what the
              human checkpoint is.</li>
            <li><strong>Skipping Layer 2 / Layer 3 on a Silver submission.</strong> The directory
              cannot self-promote a listing past Bronze without those sections.</li>
            <li><strong>Forgetting to update on framework version bumps.</strong> If the spec moves
              to 1.1, the file must be re-mapped or downgraded to Bronze of the old spec version.</li>
          </ul>

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
              href="/framework/v1"
              className="inline-flex items-center rounded-md bg-brand-700 px-5 py-3 text-sm font-medium text-white no-underline hover:bg-brand-800"
            >
              Read the framework spec
            </Link>
            <Link
              href="/submit"
              className="inline-flex items-center rounded-md border border-surface-300 px-5 py-3 text-sm font-medium text-surface-800 no-underline hover:border-surface-400"
            >
              Submit a listing
            </Link>
            <Link
              href="/listings"
              className="inline-flex items-center rounded-md border border-surface-300 px-5 py-3 text-sm font-medium text-surface-800 no-underline hover:border-surface-400"
            >
              Browse the directory
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
