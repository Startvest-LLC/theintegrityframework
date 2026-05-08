// Certification tier data. Wording is the canonical wording from the live
// methodology page (/methodology — Tiers section). If you change wording on
// /methodology, mirror it here. Drop rule: tier pages cite /methodology by
// section anchor; never invent a tier the spec doesn't currently carry.

export type CertStatus = 'live' | 'deferred';

export interface Certification {
  slug: 'bronze' | 'silver' | 'gold';
  title: string;
  status: CertStatus;
  oneLine: string;
  requirements: string[];
  effort?: string;
  howVerified?: string;
  body: string[];
  methodologyAnchor: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    slug: 'bronze',
    title: 'Bronze',
    status: 'live',
    oneLine:
      "Public INTEGRITY.md at the product's repo root or website, self-mapping all six Layer 1 vetoes.",
    requirements: [
      "Public INTEGRITY.md at the product's repo root or website.",
      'All six Layer 1 vetoes self-mapped: artifact-vs-outcome, independence, verifiability, AI accountability, pricing-rigor, the TechCrunch test.',
    ],
    effort:
      'Roughly half a day of honest reflection and writing for a thoughtful founder. The artifact survives the team — it is a structural commitment readable by procurement reviewers, future engineers, and the directory re-scan workflow.',
    howVerified:
      "At submission, the directory operator reads the listing's INTEGRITY.md. Approve, request changes, or reject within a 14-calendar-day SLA. Bronze listings are re-scanned on the same quarterly cadence as Silver, with manual re-review for closed-source listings to confirm the INTEGRITY.md has not been silently weakened.",
    body: [
      'Bronze is the entry tier. Every Layer 1 veto answered honestly, with PASS / PARTIAL / NOT-YET / N/A status, file-path or methodology pointers for non-trivial answers, and close dates for any partials.',
      "The bar is lower than Silver but the rigor is real. PARTIAL or NOT-YET on a Layer 1 veto is allowed at Bronze — what's not allowed is hand-waving. A 'committed to' status with no implementation pointer fails the gate.",
      "The directory's own INTEGRITY.md is self-rated Bronze, not Silver. A self-issued Silver from the directory operator would defeat the operator-COI disclosure pattern.",
    ],
    methodologyAnchor: 'tiers',
  },
  {
    slug: 'silver',
    title: 'Silver',
    status: 'live',
    oneLine:
      "Bronze, plus either an integrity-cli green run against the listed public repo, or a public methodology page with Version + Changelog headings.",
    requirements: [
      'Bronze (all six Layer 1 vetoes self-mapped).',
      'Plus one of: an integrity-cli green run against the listed public repo (Layer 2 architectural checks pass), OR a public methodology page with a Version heading and a Changelog heading.',
    ],
    effort:
      "The integrity-cli path is the lighter lift for code-bearing products that already follow the framework — most of the work is in the underlying architecture, not the credential. The methodology-page path is the lighter lift for document-heavy or closed-source products.",
    howVerified:
      'For Silver claims, the directory operator runs integrity-cli against the public repo, or reads the methodology page for Version + Changelog headings. Re-scans run quarterly and on framework version bumps. Silver listings that fail re-scan are downgraded to Bronze (if the failure affects only the Silver gate) with a public note and a 30-day grace window for remediation.',
    body: [
      "The OR is deliberate. Code-bearing products demonstrate framework conformance via the runner; document-heavy or closed-source products demonstrate via the methodology page. Both prove framework conformance from different angles.",
      "The methodology-page path requires Version and Changelog headings specifically. Versioned-and-changelogged is the structural defense against silent drift — a methodology that drifts silently is the failure mode the framework defends against.",
      "Silver is the highest tier the directory currently offers. Gold is deferred to a future framework version; the directory does not retrofit a tier no operator at this segment can reach.",
    ],
    methodologyAnchor: 'tiers',
  },
  {
    slug: 'gold',
    title: 'Gold',
    status: 'deferred',
    oneLine:
      "Deferred to a future framework version. The directory will not retrofit a tier no operator at this segment can reach.",
    requirements: [],
    body: [
      "Gold is deferred. The methodology page (/methodology — Tiers) records this explicitly: 'Two tiers at v1: Bronze and Silver. Gold is deferred to a future framework version. The directory will not retrofit a tier no operator at this segment can reach.'",
      "The deferral is structural, not lazy. A tier that no current operator can plausibly reach would either (a) sit unawarded indefinitely, becoming aspirational marketing copy, or (b) get retrofitted backwards from whichever operator pushed hardest, becoming political. Both are framework failure modes the framework specifically defends against.",
      "When Gold lands in a future framework version, it will land with concrete requirements that at least one current operator can reach within a reasonable engagement window. Until then, the highest tier the directory offers is Silver — and that ceiling is itself a credibility commitment.",
    ],
    methodologyAnchor: 'tiers',
  },
];

export function getAllCertificationSlugs(): string[] {
  return CERTIFICATIONS.map((c) => c.slug);
}

export function getCertificationBySlug(slug: string): Certification | undefined {
  return CERTIFICATIONS.find((c) => c.slug === slug);
}
