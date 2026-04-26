import Link from 'next/link';
import { TierBadge } from '@/components/TierBadge';
import type { Listing } from '@/lib/listings';

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <article className="group rounded-lg border border-surface-200 bg-white p-6 hover:border-surface-300 transition">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-surface-900">
            <Link
              href={`/listings/${listing.slug}`}
              className="text-surface-900 no-underline hover:text-brand-700"
            >
              {listing.name}
              {listing.operator.isDirectoryOperator && (
                <span
                  className="ml-1 text-brand-600"
                  aria-label="Operator-relationship disclosure"
                  title="Operated by Startvest LLC, the directory operator"
                >
                  *
                </span>
              )}
            </Link>
          </h3>
          {listing.category && (
            <p className="text-xs uppercase tracking-widest text-surface-500 mt-1">
              {listing.category}
            </p>
          )}
        </div>
        <TierBadge tier={listing.tier} />
      </div>

      <p className="mt-3 text-surface-600">{listing.description}</p>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-surface-500">
        <dt className="sr-only">Operator</dt>
        <dd>{listing.operator.name}</dd>
        <dt className="sr-only">License</dt>
        <dd className="text-right">{listing.license}</dd>
        <dt className="sr-only">First listed</dt>
        <dd>Listed {listing.firstListedDate}</dd>
        <dt className="sr-only">Last re-scanned</dt>
        <dd className="text-right">Re-scanned {listing.lastRescannedDate}</dd>
      </dl>

      {listing.state === 'downgraded' && listing.stateNote && (
        <p className="mt-4 rounded border-l-4 border-bronze-400 bg-bronze-50 p-3 text-sm text-bronze-800">
          <span className="font-semibold">Downgraded.</span> {listing.stateNote}
        </p>
      )}
    </article>
  );
}
