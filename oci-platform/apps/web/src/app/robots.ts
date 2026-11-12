import { MetadataRoute } from 'next';
import { SEO_CONFIG } from '../lib/seo-config';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SEO_CONFIG.siteUrl;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/', '/private/'],
      },
      {
        // Googlebot & Bingbot Web and News indexers
        userAgent: ['Googlebot', 'Googlebot-News', 'Bingbot'],
        allow: ['/', '/trending', '/trending/*', '/editorials', '/products', '/about', '/editorial-policy', '/corrections', '/contact'],
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
          '/',
          '/trending',
          '/trending/*',
          '/editorials',
          '/products',
          '/about',
          '/editorial-policy',
          '/corrections',
          '/contact',
          '/llms.txt',
          '/llms-full.txt',
        ],
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap-news.xml`,
    ],
    host: baseUrl,
  };
}
