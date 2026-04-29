export const site = {
  name: 'The Integrity Framework',
  shortName: 'Integrity Framework',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://theintegrityframework.org',
  description:
    'A public directory of products evaluated against the Integrity Framework. A trust signal for sub-enterprise AI tools where SOC 2 does not apply.',
  publisher: 'Startvest LLC',
  contactEmail: 'integrity@startvest.ai',
  frameworkVersion: '1.0',
  directoryVersion: '0.2.1',
} as const;
