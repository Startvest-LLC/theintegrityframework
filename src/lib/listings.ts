import { z } from 'zod';
import listingsJson from '../../data/listings.json';

export const TIERS = ['bronze', 'silver'] as const;
export const LICENSE_MODELS = ['open-source', 'closed-source', 'mixed'] as const;
export const LISTING_STATES = ['active', 'downgraded', 'delisted'] as const;

const httpsUrl = z.string().url().refine((u) => u.startsWith('https://'), {
  message: 'URLs must use https',
});

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be ISO YYYY-MM-DD');

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const silverCredentialSchema = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('integrity-cli'),
    outputUrl: httpsUrl,
    commitSha: z.string().regex(/^[0-9a-f]{7,40}$/).optional(),
  }),
  z.object({
    kind: z.literal('methodology-page'),
    url: httpsUrl,
  }),
]);

const operatorSchema = z.object({
  name: z.string().min(1),
  isDirectoryOperator: z.boolean().optional(),
  url: httpsUrl.optional(),
});

const socialLinksSchema = z.object({
  linkedin: httpsUrl.optional(),
  twitter: httpsUrl.optional(),
  github: httpsUrl.optional(),
});

export const listingSchema = z
  .object({
    slug: z.string().regex(slugRegex, 'Slug must be kebab-case'),
    name: z.string().min(1),
    description: z.string().min(10).max(160),

    homepageUrl: httpsUrl,
    integrityMdUrl: httpsUrl,
    silverCredential: silverCredentialSchema.optional(),

    tier: z.enum(TIERS),
    license: z.enum(LICENSE_MODELS),
    category: z.string().optional(),

    operator: operatorSchema,

    firstListedDate: isoDate,
    lastRescannedDate: isoDate,
    state: z.enum(LISTING_STATES),
    stateNote: z.string().optional(),

    logo: z.string().optional(),
    rationale: z.string().max(800).optional(),
    socialLinks: socialLinksSchema.optional(),
  })
  .refine((l) => l.tier !== 'silver' || l.silverCredential !== undefined, {
    message: 'Silver tier requires silverCredential',
    path: ['silverCredential'],
  })
  .refine(
    (l) => !(l.state === 'downgraded' || l.state === 'delisted') || !!l.stateNote,
    {
      message: 'Downgraded or delisted listings require a stateNote',
      path: ['stateNote'],
    },
  );

export const listingsFileSchema = z.object({
  version: z.string(),
  lastUpdated: isoDate,
  listings: z.array(listingSchema),
});

export type Tier = (typeof TIERS)[number];
export type LicenseModel = (typeof LICENSE_MODELS)[number];
export type ListingState = (typeof LISTING_STATES)[number];
export type SilverCredential = z.infer<typeof silverCredentialSchema>;
export type Listing = z.infer<typeof listingSchema>;

let cached: ReturnType<typeof listingsFileSchema.parse> | undefined;

function loadAll() {
  if (cached) return cached;
  cached = listingsFileSchema.parse(listingsJson);
  return cached;
}

export function getActiveListings(): Listing[] {
  return loadAll()
    .listings.filter((l) => l.state === 'active' || l.state === 'downgraded')
    .sort((a, b) => {
      if (a.tier !== b.tier) return a.tier === 'silver' ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
}

export function getRemovedListings(): Listing[] {
  return loadAll()
    .listings.filter((l) => l.state === 'delisted')
    .sort((a, b) => b.lastRescannedDate.localeCompare(a.lastRescannedDate));
}

export function getListingBySlug(slug: string): Listing | undefined {
  return loadAll().listings.find((l) => l.slug === slug);
}

export function getAllListingSlugs(): string[] {
  return loadAll().listings.map((l) => l.slug);
}

export function getDirectoryMeta() {
  const all = loadAll();
  return {
    version: all.version,
    lastUpdated: all.lastUpdated,
    activeCount: all.listings.filter((l) => l.state !== 'delisted').length,
    delistedCount: all.listings.filter((l) => l.state === 'delisted').length,
  };
}
