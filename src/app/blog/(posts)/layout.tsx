// Post wrapper — applies to /blog/<slug> routes only, not the index.
//
// Route group `(posts)` doesn't appear in URLs; it lets us share a
// layout across all posts (back-link + max-width + .blog-prose) without
// affecting the /blog index, which keeps its own full-width container.

import Link from 'next/link';
import type { ReactNode } from 'react';

export default function PostLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container-wide py-12 md:py-20">
      <div className="mb-8 text-xs">
        <Link href="/blog" className="text-brand-700 no-underline hover:text-brand-900">
          ← Back to blog
        </Link>
      </div>
      <div className="blog-prose">{children}</div>
    </div>
  );
}
