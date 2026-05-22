import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

// AI bots that crawl the open web to populate Answer Engines.
// Explicit allow rules make this site eligible for citation in
// Google AI Overviews, Perplexity, ChatGPT search, and Claude search.
// Distribution report 2026-05-22 showed brand terms collapsed
// (the integrity framework #1 → #17, sub-enterprise trust signal
// #1 → #24); naming each crawler so they treat the site as
// open-for-citation rather than relying on the wildcard.
const AI_BOTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'Bytespider',
  'DuckAssistBot',
  'cohere-ai',
  'YouBot',
];

export default function robots(): MetadataRoute.Robots {
  const base = site.url.replace(/\/$/, '');
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      ...AI_BOTS.map((userAgent) => ({
        userAgent,
        allow: '/',
      })),
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
