import type { MetadataRoute } from 'next';
import { getActiveListings } from '@/lib/listings';
import { site } from '@/lib/site';

// Stable, content-meaningful lastmod for static URLs.
//
// Previously every URL used `lastModified: new Date()` evaluated per
// request — Google sees every URL changing every fetch, ignores lastmod
// as a freshness signal, and de-prioritizes the sitemap. Discovered
// 2026-05-25 via URL Inspection sweep on the sister prapi.dev property
// (110 of 118 URLs reported as "URL is unknown to Google" with the same
// bug; GSC last successfully read the sitemap 19 days prior).
//
// Bump this constant when adding routes or doing real content edits.
// Don't bump for cosmetic changes — false bumps rebuild the noise
// reputation we just escaped.
const CONTENT_LAST_UPDATED = new Date('2026-05-25T00:00:00Z');

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, '');
  const lastModified = CONTENT_LAST_UPDATED;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/listings`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/framework`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/framework/v1`, lastModified, changeFrequency: 'yearly', priority: 0.95 },
    { url: `${base}/framework/v1.json`, lastModified, changeFrequency: 'yearly', priority: 0.85 },
    { url: `${base}/framework/why`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/framework/audit-log`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/framework/audit-2026-q2`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/framework/cases`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/framework/cases/delve`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/framework/cases/fieldledger`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/framework/cases/claritylift`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/framework/cases/idealift`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/framework/cases/hireposture`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/framework/cases/adacompliancedocs`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/framework/cases/marketing-agent`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/what-is-the-integrity-framework`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/integrity-framework-vs-coso`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/implement-integrity-framework-90-days`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/integrity-md`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/how-to-vet-ai-tools`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/how-to-write-an-integrity-md`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/methodology`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/changelog`, lastModified, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${base}/submit`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/submit/form`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
  ];

  const listingRoutes: MetadataRoute.Sitemap = getActiveListings().map((l) => ({
    url: `${base}/listings/${l.slug}`,
    lastModified: new Date(l.lastRescannedDate),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...listingRoutes];
}
