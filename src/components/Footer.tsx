import Link from 'next/link';
import { site } from '@/lib/site';

export function Footer() {
  return (
    <footer className="mt-auto border-t border-surface-200 bg-surface-50">
      <div className="container-wide py-12 grid gap-8 md:grid-cols-4 text-sm">
        <div>
          <div className="font-display font-semibold text-surface-900 mb-2">{site.name}</div>
          <p className="text-surface-600">
            A directory of products evaluated against the Integrity Framework.
          </p>
        </div>
        <div>
          <div className="font-semibold text-surface-900 mb-2">Directory</div>
          <ul className="space-y-1">
            <li><Link href="/listings" className="text-surface-700 no-underline hover:text-brand-700">Listings</Link></li>
            <li><Link href="/submit" className="text-surface-700 no-underline hover:text-brand-700">Submit a product</Link></li>
            <li><Link href="/methodology" className="text-surface-700 no-underline hover:text-brand-700">Methodology</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-surface-900 mb-2">Framework</div>
          <ul className="space-y-1">
            <li><Link href="/framework" className="text-surface-700 no-underline hover:text-brand-700">The Integrity Framework</Link></li>
            <li><Link href="/framework/changelog" className="text-surface-700 no-underline hover:text-brand-700">Changelog</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-surface-900 mb-2">Publisher</div>
          <p className="text-surface-600 mb-2">
            Published by {site.publisher}. Listings reflect framework conformance at the most recent scan date,
            not overall product quality.
          </p>
          <p className="text-surface-600">
            <a href={`mailto:${site.contactEmail}`} className="text-surface-700 no-underline hover:text-brand-700">
              {site.contactEmail}
            </a>
          </p>
        </div>
      </div>
      <div className="container-wide pb-8 text-xs text-surface-500">
        Directory v{site.directoryVersion} · Framework v{site.frameworkVersion}
      </div>
    </footer>
  );
}
