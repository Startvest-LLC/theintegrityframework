'use client';

import { useMemo, useState } from 'react';
import { ListingCard } from '@/components/ListingCard';
import type { Listing, Tier } from '@/lib/listings';

type SortKey = 'tier' | 'name' | 'last-rescanned' | 'first-listed';

const SORT_LABELS: Record<SortKey, string> = {
  tier: 'Tier',
  name: 'Name (A→Z)',
  'last-rescanned': 'Last re-scanned',
  'first-listed': 'First listed',
};

export function ListingsFilter({ listings }: { listings: Listing[] }) {
  const [tierFilter, setTierFilter] = useState<Tier | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortKey, setSortKey] = useState<SortKey>('tier');

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const l of listings) if (l.category) set.add(l.category);
    return [...set].sort();
  }, [listings]);

  const filtered = useMemo(() => {
    let out = listings;
    if (tierFilter !== 'all') out = out.filter((l) => l.tier === tierFilter);
    if (categoryFilter !== 'all') out = out.filter((l) => l.category === categoryFilter);

    return [...out].sort((a, b) => {
      switch (sortKey) {
        case 'tier':
          if (a.tier !== b.tier) return a.tier === 'silver' ? -1 : 1;
          return a.name.localeCompare(b.name);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'last-rescanned':
          return b.lastRescannedDate.localeCompare(a.lastRescannedDate);
        case 'first-listed':
          return b.firstListedDate.localeCompare(a.firstListedDate);
      }
    });
  }, [listings, tierFilter, categoryFilter, sortKey]);

  const tierCounts = useMemo(() => {
    const counts = { all: listings.length, bronze: 0, silver: 0 } as Record<Tier | 'all', number>;
    for (const l of listings) counts[l.tier]++;
    return counts;
  }, [listings]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm border-b border-surface-200 pb-5 mb-8">
        <div className="flex items-center gap-2" role="group" aria-label="Filter by tier">
          <span className="text-surface-500">Tier:</span>
          {(['all', 'silver', 'bronze'] as const).map((t) => {
            const active = tierFilter === t;
            const label = t === 'all' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1);
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTierFilter(t)}
                aria-pressed={active}
                className={`px-3 py-1 rounded-full text-xs font-medium transition border ${
                  active
                    ? 'bg-brand-700 border-brand-700 text-white'
                    : 'bg-white border-surface-300 text-surface-700 hover:border-surface-400'
                }`}
              >
                {label} <span className="opacity-60">({tierCounts[t]})</span>
              </button>
            );
          })}
        </div>

        {categories.length > 0 && (
          <label className="flex items-center gap-2">
            <span className="text-surface-500">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded border border-surface-300 bg-white px-2 py-1 text-sm"
            >
              <option value="all">All</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        )}

        <label className="flex items-center gap-2">
          <span className="text-surface-500">Sort:</span>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="rounded border border-surface-300 bg-white px-2 py-1 text-sm"
          >
            {(Object.keys(SORT_LABELS) as SortKey[]).map((k) => (
              <option key={k} value={k}>
                {SORT_LABELS[k]}
              </option>
            ))}
          </select>
        </label>

        <span className="ml-auto text-surface-500" aria-live="polite">
          Showing {filtered.length} of {listings.length}
        </span>
      </div>

      {filtered.length === 0 ? (
        <p className="text-surface-600">No listings match the current filter.</p>
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map((l) => (
            <ListingCard key={l.slug} listing={l} />
          ))}
        </div>
      )}
    </>
  );
}
