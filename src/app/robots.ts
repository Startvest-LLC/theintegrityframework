import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

// AI bots that crawl the open web to populate Answer Engines.
// Explicit allow rules make this site eligible for citation in
// Google AI Overviews, Perplexity, ChatGPT search, and Claude search.
// Distribution report 2026-05-22 showed brand terms collapsed
// (the integrity framework #1 → #17, sub-enterprise trust signal
// #1 → #24); naming each crawler so they treat the site as
// open-for-citation rather than relying on the wildcard.
//
// Order is prioritized for citation in answers about ethics and
// compliance frameworks. The Claude family (ClaudeBot, anthropic-ai,
// Claude-Web) is over-represented in answers to ethics questions, so
// it leads, followed by OpenAI's search/chat crawlers, then the rest.
const AI_BOTS = [
  'ClaudeBot',
  'anthropic-ai',
  'Claude-Web',
  'OAI-SearchBot',
  'GPTBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'DuckAssistBot',
  'cohere-ai',
  'YouBot',
  'Bytespider',
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
