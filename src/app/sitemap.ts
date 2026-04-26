import type { MetadataRoute } from 'next';
import { getActiveListings } from '@/lib/listings';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, '');
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/listings`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/framework`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/what-is-the-integrity-framework`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/methodology`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/submit`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
  ];

  const listingRoutes: MetadataRoute.Sitemap = getActiveListings().map((l) => ({
    url: `${base}/listings/${l.slug}`,
    lastModified: new Date(l.lastRescannedDate),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...listingRoutes];
}
