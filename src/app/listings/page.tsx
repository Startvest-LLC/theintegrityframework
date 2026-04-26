import type { Metadata } from 'next';
import Link from 'next/link';
import { ListingCard } from '@/components/ListingCard';
import { getActiveListings, getDirectoryMeta } from '@/lib/listings';

export const metadata: Metadata = {
  title: 'Listings',
  description: 'Products evaluated against the Integrity Framework, by tier.',
  alternates: { canonical: '/listings' },
};

export default function ListingsPage() {
  const listings = getActiveListings();
  const meta = getDirectoryMeta();

  return (
    <>
      <section className="border-b border-surface-200">
        <div className="container-wide py-16 md:py-20">
          <h1>Listings</h1>
          <p className="mt-4 max-w-2xl text-lg text-surface-600">
            {meta.activeCount} products evaluated against the Integrity Framework v1.0. Sorted by tier,
            then alphabetically.
          </p>
          <p className="mt-3 text-sm text-surface-500">
            Listings marked <span className="text-brand-600 font-semibold">*</span> are operated by
            Startvest LLC, which also operates this directory. They are evaluated under the same rubric
            and re-scanned by the same process. See{' '}
            <Link href="/methodology#operator-coi">methodology</Link> for the operator-conflict-of-interest
            handling.
          </p>
        </div>
      </section>

      <section className="border-b border-surface-200 bg-surface-50">
        <div className="container-wide py-12 md:py-16">
          {listings.length === 0 ? (
            <p className="text-surface-600">No listings yet. The first community submissions are in review.</p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {listings.map((l) => (
                <ListingCard key={l.slug} listing={l} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
