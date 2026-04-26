import { NextResponse } from 'next/server';
import { getActiveListings, getDirectoryMeta } from '@/lib/listings';

export const dynamic = 'force-static';

export async function GET() {
  const meta = getDirectoryMeta();
  const listings = getActiveListings();

  return NextResponse.json(
    {
      version: meta.version,
      lastUpdated: meta.lastUpdated,
      activeCount: meta.activeCount,
      delistedCount: meta.delistedCount,
      listings,
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=86400',
      },
    },
  );
}
