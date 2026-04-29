export default function StructuredData() {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'The Integrity Framework Directory',
    url: 'https://theintegrityframework.org',
    description:
      'A public directory of products evaluated against the Integrity Framework v1.0. Buyers use it to evaluate sub-enterprise AI tools where SOC 2 does not apply.',
    parentOrganization: {
      '@type': 'Organization',
      name: 'Startvest LLC',
      url: 'https://startvest.ai',
      identifier: [
        { '@type': 'PropertyValue', propertyID: 'UEI', value: 'FJ4ZFNG4XS54' },
        { '@type': 'PropertyValue', propertyID: 'CAGE', value: '18X56' },
      ],
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'submissions',
      email: 'integrity@startvest.ai',
      areaServed: 'Worldwide',
    },
    sameAs: [
      'https://github.com/Startvest-LLC/theintegrityframework',
      'https://idealift.app',
      'https://claritylift.ai',
      'https://fieldledger.us',
      'https://hireposture.com',
      'https://www.adacompliancedocs.com',
    ],
  };

  const dataCatalog = {
    '@context': 'https://schema.org',
    '@type': 'DataCatalog',
    name: 'Integrity Framework Listings',
    url: 'https://theintegrityframework.org/listings',
    description:
      'Registry of products that have published an INTEGRITY.md and self-mapped to the Integrity Framework v1.0. Listings are reviewed manually before publishing. Two badge tiers: Bronze and Silver.',
    publisher: {
      '@type': 'Organization',
      name: 'Startvest LLC',
      url: 'https://startvest.ai',
    },
    license: 'https://theintegrityframework.org/methodology',
    isAccessibleForFree: true,
    distribution: {
      '@type': 'DataDownload',
      encodingFormat: 'application/json',
      contentUrl: 'https://theintegrityframework.org/api/listings.json',
    },
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'The Integrity Framework Directory',
    url: 'https://theintegrityframework.org',
    description:
      'Public directory of trust-vetted sub-enterprise AI tools.',
    publisher: {
      '@type': 'Organization',
      name: 'Startvest LLC',
      url: 'https://startvest.ai',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dataCatalog) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
