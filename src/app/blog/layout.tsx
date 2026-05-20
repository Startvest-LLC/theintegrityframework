// /blog layout — global wrapper for the blog section.
//
// Imports the scoped blog-content.css so the .blog-prose class is
// available to both the index and individual post pages. The actual
// post wrapper (back-link + max-width prose container) lives in the
// (posts)/ route group's layout so it doesn't affect the index.
//
// Route groups recap: `(posts)/foo/page.mdx` renders at `/blog/foo`,
// not `/blog/(posts)/foo`. The parens form a layout-only grouping.

import type { ReactNode } from 'react';
import './blog-content.css';

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
