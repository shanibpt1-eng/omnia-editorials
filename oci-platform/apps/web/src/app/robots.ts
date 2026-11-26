import { MetadataRoute } from 'next';
import { SEO_CONFIG } from '../lib/seo-config';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SEO_CONFIG.siteUrl;

  const publicRoutes = [
    '/',
    '/trending',
    '/trending/*',
    '/editorials',
    '/fashion-intelligence',
    '/jewellery-knowledge',
    '/jewellery-comparison',
    '/brands',
    '/brands/*',
    '/newsroom',
    '/interviews',
    '/event-calendar',
    '/research-reports',
    '/glossary',
    '/press-releases',
    '/products',
    '/about',
    '/editorial-policy',
    '/corrections',
    '/contact',
    '/privacy-policy',
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: publicRoutes,
        disallow: ['/admin/', '/api/', '/_next/', '/private/'],
      },
      {
        // Googlebot & Bingbot Web and News indexers
        userAgent: ['Googlebot', 'Googlebot-News', 'Bingbot'],
        allow: publicRoutes,
        disallow: ['/admin/', '/api/'],
      },
      {
        // AI Search & Conversational Answer Engines (AEO / GEO)
        userAgent: [
          'OAI-SearchBot',
          'ChatGPT-User',
          'PerplexityBot',
          'Claude-SearchBot',
          'ClaudeBot',
          'Applebot',
          'Applebot-Extended',
          'Google-Extended',
          'GPTBot',
        ],
        allow: [
          ...publicRoutes,
          '/llms.txt',
          '/llms-full.txt',
        ],
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-articles.xml`,
      `${baseUrl}/sitemap-pages.xml`,
      `${baseUrl}/sitemap-news.xml`,
    ],
    host: baseUrl,
  };
}
