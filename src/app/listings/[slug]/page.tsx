import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TierBadge } from '@/components/TierBadge';
import { getAllListingSlugs, getListingBySlug } from '@/lib/listings';

export function generateStaticParams() {
  return getAllListingSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = getListingBySlug(slug);
  if (!listing) return { title: 'Listing not found' };
  return {
    title: listing.name,
    description: listing.description,
    alternates: { canonical: `/listings/${listing.slug}` },
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = getListingBySlug(slug);
  if (!listing) notFound();

  const credentialLink =
    listing.silverCredential?.kind === 'methodology-page'
      ? listing.silverCredential.url
      : listing.silverCredential?.kind === 'integrity-cli'
        ? listing.silverCredential.outputUrl
        : undefined;

  return (
    <>
      <section className="border-b border-surface-200">
        <div className="container-wide py-12 md:py-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-surface-500">
            <Link href="/listings" className="text-surface-500 no-underline hover:text-brand-700">
              Listings
            </Link>{' '}
            / {listing.slug}
          </p>
          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1>
                {listing.name}
                {listing.operator.isDirectoryOperator && (
                  <span className="ml-2 align-super text-base text-brand-600">*</span>
                )}
              </h1>
              {listing.category && (
                <p className="mt-2 text-sm uppercase tracking-widest text-surface-500">
                  {listing.category}
                </p>
              )}
            </div>
            <TierBadge tier={listing.tier} />
          </div>
          <p className="mt-6 max-w-2xl text-lg text-surface-700">{listing.description}</p>
        </div>
      </section>

      {listing.operator.isDirectoryOperator && (
        <section className="border-b border-surface-200 bg-bronze-50">
          <div className="container-wide py-6 text-sm text-bronze-800">
            <span className="font-semibold">Operator disclosure.</span> {listing.name} is operated by{' '}
            {listing.operator.name}, which also operates this directory. It is evaluated under the same
            rubric and re-scanned by the same process as community listings. See{' '}
            <Link href="/methodology#operator-coi">methodology</Link> for the conflict-of-interest
            handling.
          </div>
        </section>
      )}

      {listing.state === 'downgraded' && listing.stateNote && (
        <section className="border-b border-surface-200 bg-bronze-50">
          <div className="container-wide py-6 text-sm text-bronze-800">
            <span className="font-semibold">Downgraded.</span> {listing.stateNote}
          </div>
        </section>
      )}

      <section className="border-b border-surface-200">
        <div className="container-wide py-12 grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-lg">Artifacts</h2>
              <dl className="mt-3 space-y-3 text-sm">
                <div>
                  <dt className="text-surface-500">Homepage</dt>
                  <dd>
                    <a href={listing.homepageUrl} target="_blank" rel="noreferrer noopener">
                      {listing.homepageUrl}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-surface-500">INTEGRITY.md</dt>
                  <dd>
                    <a href={listing.integrityMdUrl} target="_blank" rel="noreferrer noopener">
                      {listing.integrityMdUrl}
                    </a>
                  </dd>
                </div>
                {listing.silverCredential && (
                  <div>
                    <dt className="text-surface-500">
                      Silver credential:{' '}
                      {listing.silverCredential.kind === 'methodology-page'
                        ? 'methodology page'
                        : 'integrity-cli output'}
                    </dt>
                    <dd>
                      {credentialLink && (
                        <a href={credentialLink} target="_blank" rel="noreferrer noopener">
                          {credentialLink}
                        </a>
                      )}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {listing.rationale && (
              <div>
                <h2 className="text-lg">Why this product is in the directory</h2>
                <p className="mt-3 text-surface-700">{listing.rationale}</p>
              </div>
            )}
          </div>

          <aside className="space-y-6 text-sm">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-surface-500">
                Operator
              </div>
              <div className="mt-1">
                {listing.operator.url ? (
                  <a href={listing.operator.url} target="_blank" rel="noreferrer noopener">
                    {listing.operator.name}
                  </a>
                ) : (
                  listing.operator.name
                )}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-surface-500">
                License
              </div>
              <div className="mt-1 text-surface-700">{listing.license}</div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-surface-500">
                First listed
              </div>
              <div className="mt-1 text-surface-700">{listing.firstListedDate}</div>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-surface-500">
                Last re-scanned
              </div>
              <div className="mt-1 text-surface-700">{listing.lastRescannedDate}</div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
