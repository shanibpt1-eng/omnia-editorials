import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://omniastores.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        // Special indexing rules for AI Search Engines & Answer Engines (AEO/GEO)
        userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'PerplexityBot', 'ClaudeBot', 'AnthropicAI', 'Applebot-Extended'],
        allow: ['/', '/trending', '/trending/*', '/editorials', '/products', '/about', '/llms.txt'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
