import type { Metadata } from 'next';
import Link from 'next/link';
import { TierBadge } from '@/components/TierBadge';
import { getRemovedListings } from '@/lib/listings';

export const metadata: Metadata = {
  title: 'Removed listings',
  description:
    'Public archive of products previously listed in the Integrity Framework Directory and since delisted. Transparency about delisting is part of the directory\'s credibility model.',
  alternates: { canonical: '/removed' },
};

export default function RemovedPage() {
  const listings = getRemovedListings();

  return (
    <>
      <section className="border-b border-surface-200">
        <div className="container-wide py-16 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-4">
            Removed listings
          </p>
          <h1>Public archive</h1>
          <p className="mt-4 max-w-2xl text-lg text-surface-600">
            Products previously listed in this directory and since delisted, with the public reason
            for each. The framework treats hidden delistings as a credibility failure. The archive
            is the proof that delistings happen, that they are named, and that the audit trail
            survives.
          </p>
          <p className="mt-3 text-sm text-surface-500">
            See <Link href="/methodology#rescan-failure">methodology</Link> for the delisting
            policy and the right-of-reply process.
          </p>
        </div>
      </section>

      <section className="bg-surface-50">
        <div className="container-wide py-12 md:py-16">
          {listings.length === 0 ? (
            <div className="rounded-lg border border-surface-200 bg-white p-8 max-w-2xl">
              <p className="text-surface-700">
                No listings have been delisted to date.
              </p>
              <p className="mt-3 text-sm text-surface-500">
                When a delisting happens, this page will list it with the date, the rule that
                failed, and any verbatim founder response. Empty today, in use the moment the
                first delisting lands.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {listings.map((l) => (
                <article
                  key={l.slug}
                  className="rounded-lg border border-surface-200 bg-white p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-surface-900">{l.name}</h3>
                      {l.category && (
                        <p className="text-xs uppercase tracking-widest text-surface-500 mt-1">
                          {l.category}
                        </p>
                      )}
                    </div>
                    <TierBadge tier={l.tier} />
                  </div>
                  <p className="mt-3 text-surface-600">{l.description}</p>
                  {l.stateNote && (
                    <p className="mt-4 rounded border-l-4 border-bronze-400 bg-bronze-50 p-3 text-sm text-bronze-800">
                      <span className="font-semibold">Delisted.</span> {l.stateNote}
                    </p>
                  )}
                  <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-surface-500">
                    <dt className="sr-only">First listed</dt>
                    <dd>Listed {l.firstListedDate}</dd>
                    <dt className="sr-only">Last re-scanned before delisting</dt>
                    <dd className="text-right">Last re-scanned {l.lastRescannedDate}</dd>
                  </dl>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
