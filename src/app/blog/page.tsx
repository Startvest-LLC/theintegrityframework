// /blog — index of all blog posts.
//
// Posts live as MDX-as-route files at src/app/blog/<slug>/page.mdx. The
// existing next.config.mjs already wires @next/mdx with remark-frontmatter +
// remark-gfm + rehype-slug, so each post renders directly. This index page
// walks the filesystem at request time, reads YAML frontmatter via
// gray-matter, and emits a sorted list.
//
// Authoring flow:
//   - scripts/aio-emit-blog-md.cjs (in marketing-agent) emits a skeleton
//     page.mdx into src/app/blog/<slug>/page.mdx
//   - fill in the body, PR, deploy
//   - mark the AIO brief published: prapi aio publish <brief-id> <url>

import type { Metadata } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import Link from 'next/link';
import matter from 'gray-matter';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Field reports on AI-tool integrity, framework adoption, and what we learn evaluating products in the directory.',
  alternates: { canonical: '/blog' },
};

// Re-read posts on each request — new MDX files added via PR show up on the
// next request without a deploy-time rebuild of this route. Cheap (just fs
// + small gray-matter parses) compared to ISR caching wrinkles.
export const dynamic = 'force-dynamic';

interface PostSummary {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  category: string | null;
}

function loadPosts(): PostSummary[] {
  const dir = path.join(process.cwd(), 'src', 'app', 'blog');
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  const posts: PostSummary[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const slug = entry.name;
    const mdxPath = path.join(dir, slug, 'page.mdx');
    if (!fs.existsSync(mdxPath)) continue;
    const raw = fs.readFileSync(mdxPath, 'utf8');
    const { data } = matter(raw);
    if (typeof data?.title !== 'string') continue;
    posts.push({
      slug,
      title: data.title,
      description: typeof data.description === 'string' ? data.description : '',
      publishedAt: typeof data.publishedAt === 'string' ? data.publishedAt : '',
      category: typeof data.category === 'string' ? data.category : null,
    });
  }

  posts.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  return posts;
}

export default function BlogIndex() {
  const posts = loadPosts();

  return (
    <section className="border-b border-surface-200">
      <div className="container-wide py-16 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-4">Blog</p>
        <h1 className="max-w-3xl">Field reports.</h1>
        <p className="mt-6 max-w-2xl text-lg text-surface-600">
          Notes from evaluating AI products against the Integrity Framework — what we&rsquo;re
          seeing, what&rsquo;s shifting, and where the directory tier signals come from.
        </p>

        {posts.length === 0 ? (
          <div className="mt-12 rounded-md border border-surface-200 bg-surface-50 p-6 text-sm text-surface-600">
            No posts yet. New posts land as PRs that drop an MDX file at{' '}
            <code>src/app/blog/&lt;slug&gt;/page.mdx</code>.
          </div>
        ) : (
          <ul className="mt-12 space-y-8">
            {posts.map((p) => (
              <li key={p.slug} className="border-b border-surface-200 pb-8 last:border-b-0">
                <Link href={`/blog/${p.slug}`} className="no-underline group block">
                  <div className="flex items-baseline gap-3 text-xs text-surface-500 mb-2">
                    {p.publishedAt && <time>{p.publishedAt}</time>}
                    {p.category && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{p.category}</span>
                      </>
                    )}
                  </div>
                  <h2 className="text-2xl font-display font-semibold text-surface-900 group-hover:text-brand-700">
                    {p.title}
                  </h2>
                  {p.description && (
                    <p className="mt-2 max-w-2xl text-surface-600">{p.description}</p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
