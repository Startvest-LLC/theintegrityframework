import Link from 'next/link';
import { site } from '@/lib/site';

export function Nav() {
  return (
    <header className="border-b border-surface-200 bg-white">
      <div className="container-wide flex items-center justify-between py-5">
        <Link
          href="/"
          className="font-display text-lg font-semibold text-surface-900 no-underline tracking-tight"
        >
          {site.name}
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-6 text-sm">
          <Link href="/listings" className="text-surface-700 no-underline hover:text-brand-700">
            Listings
          </Link>
          <Link href="/framework" className="text-surface-700 no-underline hover:text-brand-700">
            Framework
          </Link>
          <Link href="/methodology" className="text-surface-700 no-underline hover:text-brand-700">
            Methodology
          </Link>
          <Link href="/submit" className="text-surface-700 no-underline hover:text-brand-700">
            Submit
          </Link>
        </nav>
      </div>
    </header>
  );
}
