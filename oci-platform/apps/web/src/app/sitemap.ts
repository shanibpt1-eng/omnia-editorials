import { MetadataRoute } from 'next';
import { EDITORIAL_ARTICLES } from '../data/editorial-feed';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://omniastores.com';
  const currentDate = new Date().toISOString();

  // Core static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/trending`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/editorials`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Dynamic editorial articles (AEO / GEO indexed)
  const articleRoutes: MetadataRoute.Sitemap = EDITORIAL_ARTICLES.map((article) => ({
    url: `${baseUrl}/trending/${article.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...staticRoutes, ...articleRoutes];
}
