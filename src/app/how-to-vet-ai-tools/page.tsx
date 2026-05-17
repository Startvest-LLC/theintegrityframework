import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

const PAGE_URL = `${site.url}/how-to-vet-ai-tools`;

export const metadata: Metadata = {
  title: 'How to vet AI tools when SOC 2 does not apply',
  description:
    'A seven-step buyer\u2019s checklist for vetting AI tools at the team or department level, where the product is too small for SOC 2 audits but real money and real data still change hands. Uses INTEGRITY.md and The Integrity Framework directory as the verification surface.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'How to vet AI tools when SOC 2 does not apply',
    description:
      'Seven steps a sub-enterprise buyer can use to vet AI tools without forcing a SOC 2 audit the vendor cannot afford.',
    type: 'article',
    url: PAGE_URL,
    siteName: site.name,
  },
};

interface FaqItem { q: string; a: string }

const faqs: FaqItem[] = [
  {
    q: 'How do you vet an AI tool that does not have SOC 2?',
    a: 'For sub-enterprise AI tools \u2014 the segment where SOC 2 audits are too expensive and the wrong shape \u2014 vet on publicly verifiable artifacts: a public INTEGRITY.md self-mapping against The Integrity Framework, a versioned methodology page, a transparent changelog, named operators, and a real privacy policy. The directory at theintegrityframework.org indexes products that have done this, with tier badges buyers can verify themselves.',
  },
  {
    q: 'What is The Integrity Framework?',
    a: 'A published standard for product trustworthiness aimed at sub-enterprise AI tools where SOC 2 does not apply. Founders self-map their product against six Layer 1 vetoes, post a public INTEGRITY.md, and the directory at theintegrityframework.org publishes them with a Bronze or Silver tier badge. Free and CC BY 4.0.',
  },
  {
    q: 'What red flags should I watch for when vetting an AI tool?',
    a: 'Five recurring ones: (1) An AI feature with no audit trail or labeling. (2) A pricing page that hides per-seat or per-token math behind \u201Cdemo only\u201D. (3) Marketing claims of \u201Centerprise security\u201D with no SOC 2 or equivalent artifact. (4) A trust page that lists certifications the company does not actually hold. (5) Operators who are anonymous or unreachable. Each of these maps to a Layer 1 veto in The Integrity Framework.',
  },
  {
    q: 'Is INTEGRITY.md a substitute for SOC 2 in my vendor review?',
    a: 'No. SOC 2 remains the right artifact for service organizations at enterprise spend levels with regulated data flows. INTEGRITY.md is the right artifact for the segment SOC 2 prices out \u2014 $20-$200/month products that one team buys without procurement. Most departmental AI purchases live in that segment, not the SOC 2 segment, and vetting them like SOC 2 vendors produces a quiet failure mode: the team buys anyway, just without any artifact at all.',
  },
  {
    q: 'How long should an AI tool vetting take?',
    a: 'For a sub-enterprise tool with a published INTEGRITY.md and a listing in the directory: 15-30 minutes. For one without an INTEGRITY.md: it depends on how much surface the buyer needs to assemble themselves \u2014 typically 1-2 hours of reading the privacy policy, the security page, the changelog, and the operator background. The framework exists so that the 1-2 hour assembly job is done once by the vendor, not repeatedly by every buyer.',
  },
  {
    q: 'What if no AI tools in my category have an INTEGRITY.md yet?',
    a: 'Two practical moves. (1) Ask the vendor: pointing them at theintegrityframework.org and asking when they will publish their INTEGRITY.md is a free signal that you, the buyer, expect this surface. (2) Use the framework yourself as a vetting rubric \u2014 walk the six Layer 1 vetoes against the product\u2019s public artifacts and write the gaps down. The framework is forkable; the rubric works the same way whether the vendor has self-mapped or not.',
  },
  {
    q: 'Where do I report an AI tool that fails the TechCrunch test?',
    a: 'For products listed in the directory at theintegrityframework.org, listings have a public dispute path on each listing page; quarterly re-scans reflect changes. For unlisted products, the framework spec is CC BY 4.0 and can be cited in your own vendor-review documentation; the directory does not run a global complaint-handling service.',
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
  name: 'How to vet AI tools when SOC 2 does not apply',
  description:
    'Seven steps for vetting a sub-enterprise AI tool against publicly verifiable artifacts instead of an audit framework that is too expensive for the segment.',
  inLanguage: 'en-US',
  totalTime: 'PT30M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Confirm the product is sub-enterprise', text: 'Check pricing, contract length, and decision-maker. If a single team or department can swipe a card and start, you are in the segment SOC 2 was not built for.' },
    { '@type': 'HowToStep', position: 2, name: 'Look for an INTEGRITY.md', text: 'Check the repo root, the marketing site, and the trust or security page. A reachable file at a stable URL means the founder has self-mapped against a published standard.' },
    { '@type': 'HowToStep', position: 3, name: 'Verify the tier badge', text: 'Bronze means six Layer 1 vetoes self-mapped honestly. Silver adds either a green integrity-cli run or a versioned methodology page. Pull the listing from theintegrityframework.org/listings and read both.' },
    { '@type': 'HowToStep', position: 4, name: 'Walk the six Layer 1 vetoes against the product yourself', text: 'Artifact-vs-outcome, independence, verifiability, AI accountability, pricing-rigor alignment, the TechCrunch test. Five minutes per veto, written in your own notes.' },
    { '@type': 'HowToStep', position: 5, name: 'Spot-check the linked artifacts', text: 'Click every URL in the INTEGRITY.md. Repos resolve. Methodology pages load. Changelogs have dates. If anything 404s, the verifiability claim is weak.' },
    { '@type': 'HowToStep', position: 6, name: 'Match pricing to claimed rigor', text: 'Enterprise pricing on self-attested artifacts is a fail. Free pricing on artifacts that imply enterprise rigor is also a fail. The pricing page should be reachable without a demo.' },
    { '@type': 'HowToStep', position: 7, name: 'Buy or escalate', text: 'If steps 1-6 pass, the tool is vetted to the standard the segment supports. If a Layer 1 veto fails, escalate the specific veto to the vendor in writing and decide based on the response.' },
  ],
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to vet AI tools when SOC 2 does not apply',
  description:
    'A seven-step buyer\u2019s checklist for vetting sub-enterprise AI tools against publicly verifiable artifacts.',
  author: { '@type': 'Organization', name: 'Startvest LLC', url: 'https://startvest.ai' },
  publisher: { '@type': 'Organization', name: 'Startvest LLC' },
  inLanguage: 'en-US',
  mainEntityOfPage: PAGE_URL,
  url: PAGE_URL,
};

interface Step { n: number; title: string; body: React.ReactNode }

const steps: Step[] = [
  {
    n: 1,
    title: 'Confirm the product is sub-enterprise',
    body: (
      <>
        Pricing under roughly $5K ARR per buyer, contract length under 12 months, decision made
        by a single team lead or department head. If procurement is not in the room, the SOC 2
        playbook is the wrong rubric. You are in the segment{' '}
        <Link href="/framework/v1" className="text-brand-700 underline">
          The Integrity Framework
        </Link>{' '}
        was published for.
      </>
    ),
  },
  {
    n: 2,
    title: 'Look for an INTEGRITY.md',
    body: (
      <>
        Check the repo root, the marketing site at <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">/integrity.md</code>,
        and the trust or security page. A reachable file at a stable URL means the founder has
        already done the self-mapping work. See{' '}
        <Link href="/integrity-md" className="text-brand-700 underline">
          /integrity-md
        </Link>{' '}
        for the format and a worked example.
      </>
    ),
  },
  {
    n: 3,
    title: 'Verify the tier badge',
    body: (
      <>
        Bronze means six Layer 1 vetoes self-mapped honestly. Silver adds either a green{' '}
        <code className="rounded bg-surface-100 px-1 py-0.5 text-sm">integrity-cli</code> run
        or a versioned methodology page. Pull the listing from the{' '}
        <Link href="/listings" className="text-brand-700 underline">
          directory
        </Link>{' '}
        and confirm the artifact links resolve.
      </>
    ),
  },
  {
    n: 4,
    title: 'Walk the six Layer 1 vetoes yourself',
    body: (
      <>
        Even with a published INTEGRITY.md, the buyer\u2019s job is to confirm the self-mapping
        is honest. Five minutes per veto: artifact-vs-outcome, independence, verifiability, AI
        accountability, pricing-rigor alignment, the TechCrunch test. Write the gaps in your
        own notes \u2014 those notes are your audit trail later.
      </>
    ),
  },
  {
    n: 5,
    title: 'Spot-check the linked artifacts',
    body: (
      <>
        Click every URL in the INTEGRITY.md. Repos should resolve. Methodology pages should
        load with dates on the changelog. If anything 404s, the verifiability claim is weak
        and the directory should know \u2014 use the listing\u2019s dispute path.
      </>
    ),
  },
  {
    n: 6,
    title: 'Match pricing to claimed rigor',
    body: (
      <>
        Enterprise pricing on a self-attested artifact is a fail (Veto 5). Sub-enterprise
        pricing on artifacts that imply enterprise rigor is also a fail. The pricing page
        should be reachable without a demo. Hidden pricing is itself a TechCrunch-test risk.
      </>
    ),
  },
  {
    n: 7,
    title: 'Buy or escalate',
    body: (
      <>
        If steps 1-6 pass, the tool is vetted to the standard this segment supports. If a
        Layer 1 veto fails, escalate the specific veto to the vendor in writing and decide
        based on the response. The framework gives you specific language; vague concerns get
        vague answers.
      </>
    ),
  },
];

export default function HowToVetAiToolsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <article className="container-wide py-16 md:py-20">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-4">
            Buyer\u2019s guide
          </p>

          <h1>How to vet AI tools when SOC 2 does not apply</h1>

          {/* Direct-answer paragraph — extractable as a single AI Overview /
              Perplexity citation block. ~60 words, named entity in first
              sentence, definition before context. */}
          <p className="mt-6 text-lg text-surface-700 leading-relaxed">
            <strong>To vet an AI tool that does not have SOC 2</strong>, vet on publicly
            verifiable artifacts: a public{' '}
            <Link href="/integrity-md" className="text-brand-700 underline">
              INTEGRITY.md
            </Link>{' '}
            self-mapping against{' '}
            <Link href="/framework/v1" className="text-brand-700 underline">
              The Integrity Framework
            </Link>
            , a versioned methodology page, a transparent changelog, named operators, and a
            real privacy policy. The directory at theintegrityframework.org indexes products
            that have done this with tier badges you can verify yourself. The seven steps
            below take about 30 minutes per tool.
          </p>

          <h2 className="mt-12">The seven steps</h2>
          <ol className="mt-6 space-y-6">
            {steps.map((s) => (
              <li key={s.n} className="grid grid-cols-[2rem_1fr] gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-700 text-sm font-semibold text-white">
                  {s.n}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-surface-900">{s.title}</h3>
                  <p className="mt-2 text-surface-700 leading-relaxed">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <h2 className="mt-12">Red flags that cost a buyer six months</h2>
          <ul className="mt-4 list-disc pl-6 space-y-3 text-surface-700">
            <li><strong>An AI feature with no audit trail or labeling.</strong> If the product
              writes decisions, summaries, or recommendations on behalf of the buyer and there
              is no way to inspect what it did, Veto 4 fails.</li>
            <li><strong>&ldquo;Enterprise security&rdquo; with no SOC 2 link.</strong> The
              phrase without the artifact is a Veto 1 fail \u2014 selling the artifact (security)
              without delivering it.</li>
            <li><strong>Hidden pricing.</strong> &ldquo;Contact us&rdquo; on a $20-200/month
              product is a Veto 5 mismatch unless every customer is on a custom contract,
              which the segment economics make implausible.</li>
            <li><strong>A trust page that lists certifications the company does not actually
              hold.</strong> Veto 6 territory. Cross-check every named certification against
              the issuing body\u2019s public directory.</li>
            <li><strong>Anonymous or unreachable operators.</strong> An LLC with no named
              principal, no LinkedIn, and no contact path is a Veto 2 fail by default.</li>
          </ul>

          <h2 className="mt-12">If no tools in the category are listed yet</h2>
          <p className="mt-3 text-surface-700 leading-relaxed">
            Two moves. First, ask the vendor: pointing them at theintegrityframework.org and
            asking when they will publish their INTEGRITY.md is a free signal that you, the
            buyer, expect this surface. Vendors who care about trust will write one; vendors
            who do not, will not, and that is also useful information.
          </p>
          <p className="mt-3 text-surface-700 leading-relaxed">
            Second, use the framework as a vetting rubric yourself. Walk the six Layer 1 vetoes
            against the product\u2019s public artifacts and write the gaps down. The framework
            is forkable under CC BY 4.0; the rubric works the same way whether the vendor has
            self-mapped or not.
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
              href="/listings"
              className="inline-flex items-center rounded-md bg-brand-700 px-5 py-3 text-sm font-medium text-white no-underline hover:bg-brand-800"
            >
              Browse the directory
            </Link>
            <Link
              href="/framework/v1"
              className="inline-flex items-center rounded-md border border-surface-300 px-5 py-3 text-sm font-medium text-surface-800 no-underline hover:border-surface-400"
            >
              Read the framework spec
            </Link>
            <Link
              href="/integrity-md"
              className="inline-flex items-center rounded-md border border-surface-300 px-5 py-3 text-sm font-medium text-surface-800 no-underline hover:border-surface-400"
            >
              INTEGRITY.md template
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
