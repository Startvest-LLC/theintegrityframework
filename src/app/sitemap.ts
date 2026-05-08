import type { MetadataRoute } from 'next';
import { getActiveListings } from '@/lib/listings';
import { site } from '@/lib/site';
import { SPEC_TOPICS } from '@/lib/spec-topics';
import { IMPLEMENTATIONS } from '@/lib/implementations';
import { CERTIFICATIONS } from '@/lib/certifications';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, '');
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/listings`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/framework`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/framework/v1`, lastModified, changeFrequency: 'yearly', priority: 0.95 },
    { url: `${base}/framework/why`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/framework/audit-log`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/framework/cases`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/framework/cases/delve`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/framework/cases/fieldledger`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/framework/cases/claritylift`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/framework/cases/idealift`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/framework/cases/hireposture`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/framework/cases/adacompliancedocs`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/framework/cases/marketing-agent`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/what-is-the-integrity-framework`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/methodology`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/spec`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/implementation`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/certifications`, lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/changelog`, lastModified, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${base}/submit`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/submit/form`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
  ];

  const specTopicRoutes: MetadataRoute.Sitemap = SPEC_TOPICS.map((t) => ({
    url: `${base}/spec/${t.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  const implementationRoutes: MetadataRoute.Sitemap = IMPLEMENTATIONS.map((i) => ({
    url: `${base}/implementation/${i.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  const certificationRoutes: MetadataRoute.Sitemap = CERTIFICATIONS.map((c) => ({
    url: `${base}/certifications/${c.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  const listingRoutes: MetadataRoute.Sitemap = getActiveListings().map((l) => ({
    url: `${base}/listings/${l.slug}`,
    lastModified: new Date(l.lastRescannedDate),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...specTopicRoutes,
    ...implementationRoutes,
    ...certificationRoutes,
    ...listingRoutes,
  ];
}
