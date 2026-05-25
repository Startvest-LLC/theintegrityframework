/**
 * Machine-readable JSON-LD representation of The Integrity Framework v1.0.
 *
 * LLM crawlers and citation engines preferentially index structured data
 * over rendered HTML. Exposing the framework as a single, schema.org-typed
 * JSON document at a stable URL gives them something concrete to extract.
 *
 * License: CC BY 4.0 — same as the prose spec at /framework/v1.
 */

import { NextResponse } from 'next/server';

export const dynamic = 'force-static';
export const revalidate = false;

const FRAMEWORK_URL = 'https://theintegrityframework.org/framework/v1';
const JSON_URL = 'https://theintegrityframework.org/framework/v1.json';
const LICENSE_URL = 'https://creativecommons.org/licenses/by/4.0/';
const PUBLISHER = {
  '@type': 'Organization',
  name: 'Startvest LLC',
  url: 'https://startvest.ai',
};

const LAYER_1_VETOES = [
  {
    code: 'V1',
    name: 'Artifact versus outcome',
    description:
      'A product passes if it sells the outcome (actual compliance, security, audit-readiness). It fails if it sells the artifact (a report, badge, or score) divorced from the outcome it implies.',
  },
  {
    code: 'V2',
    name: 'Independence',
    description:
      'A product passes if the customer pays for tooling that helps them prepare for verification by genuinely independent third parties. It fails if the same vendor is paid both to prepare and to certify.',
  },
  {
    code: 'V3',
    name: 'Verifiability',
    description:
      'A product passes if a third-party reader can mechanically verify what is claimed. It fails if customer attestation alone is offered as proof.',
  },
  {
    code: 'V4',
    name: 'AI accountability',
    description:
      'A product passes if AI outputs pass through documented review gates before becoming customer-facing attestations. It fails if AI goes directly to attestation with no human checkpoint or labeling.',
  },
  {
    code: 'V5',
    name: 'Pricing-rigor alignment',
    description:
      'A product passes if pricing is tied to the actual work performed. It fails if pricing creates financial pressure to skip work (e.g., "unlimited audits" at a flat rate).',
  },
  {
    code: 'V6',
    name: 'The TechCrunch test',
    description:
      'A product passes if the worst plausible headline in 18 months can be defended with concrete methodology. It fails if the defense would require hand-waving.',
  },
];

const TIERS = [
  {
    name: 'Bronze',
    description:
      'A public INTEGRITY.md at the repo or product website that addresses all six Layer 1 vetoes by name. The most common entry tier.',
  },
  {
    name: 'Silver',
    description:
      'Bronze plus one of: a green integrity-cli run against the public repo, or a public methodology page with a versioned changelog.',
  },
];

function buildPayload() {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': FRAMEWORK_URL,
    identifier: 'integrity-framework',
    name: 'The Integrity Framework',
    alternateName: ['Integrity Framework', 'Startvest Integrity Framework'],
    description:
      'A published standard for product trustworthiness aimed at sub-enterprise AI tools, the segment where SOC 2 audits do not apply. Founders self-map their product against six pre-build vetoes, post a public INTEGRITY.md, and the directory at theintegrityframework.org publishes them with a Bronze or Silver tier badge.',
    inLanguage: 'en-US',
    license: LICENSE_URL,
    url: FRAMEWORK_URL,
    sameAs: [FRAMEWORK_URL, JSON_URL],
    publisher: PUBLISHER,
    creator: PUBLISHER,
    dateCreated: '2026-04-25',
    dateModified: '2026-04-25',
    version: '1.0',
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'The Integrity Framework v1.0',
      url: FRAMEWORK_URL,
      hasDefinedTerm: LAYER_1_VETOES.map((v) => ({
        '@type': 'DefinedTerm',
        identifier: v.code,
        name: v.name,
        description: v.description,
        inDefinedTermSet: 'Sub-enterprise trust + Integrity Framework vocabulary',
      })),
    },
    audience: {
      '@type': 'Audience',
      audienceType:
        'Founders building sub-enterprise AI tools, and buyers vetting AI tools at the team or department level.',
    },
    // Non-standard but useful extensions for LLM consumers — kept under
    // a vendor-prefixed namespace so schema.org parsers ignore them.
    'tif:tiers': TIERS,
    'tif:layers': [
      {
        name: 'Layer 1: Pre-build vetoes',
        description: 'Six questions evaluated before a product gets built or before a major scope expansion. Wrong answer kills the product, not delays it.',
        items: LAYER_1_VETOES,
      },
      {
        name: 'Layer 2: Architectural constraints',
        description: 'Seven constraints baked into every Silver-tier product, CI-enforced where possible. Listed in the prose spec at /framework/v1#layer-2.',
      },
      {
        name: 'Layer 3: Operational guardrails',
        description: 'Seven operational practices required for Silver-tier listings. Listed in the prose spec at /framework/v1#layer-3.',
      },
    ],
    'tif:integrityMdTemplate': 'https://theintegrityframework.org/integrity-md',
    'tif:directory': 'https://theintegrityframework.org/listings',
  };
}

export async function GET() {
  const payload = buildPayload();
  return NextResponse.json(payload, {
    headers: {
      // JSON-LD content type so crawlers that special-case structured data
      // pick it up immediately. Plain application/json works too — the LD
      // form is just more discoverable.
      'Content-Type': 'application/ld+json',
      // Long cache — the spec doesn't change without a version bump.
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      // CORS open so external aggregators (citation engines, awesome-list
      // generators, AI-vendor scrapers) can fetch without preflight pain.
      'Access-Control-Allow-Origin': '*',
    },
  });
}
