import { NextResponse } from 'next/server';
import { SEO_CONFIG } from '../../lib/seo-config';

export const dynamic = 'force-dynamic';
export const revalidate = 86400; // 24 hours

export async function GET() {
  const currentDate = new Date().toISOString();

  const pages = [
    { path: '', priority: '1.0', changefreq: 'daily' },
    { path: '/editorials', priority: '0.95', changefreq: 'daily' },
    { path: '/magazine', priority: '0.94', changefreq: 'daily' },
    { path: '/trending', priority: '0.90', changefreq: 'daily' },
    { path: '/fashion-intelligence', priority: '0.90', changefreq: 'weekly' },
    { path: '/jewellery-knowledge', priority: '0.90', changefreq: 'weekly' },
    { path: '/jewellery-comparison', priority: '0.88', changefreq: 'weekly' },
    { path: '/brands', priority: '0.88', changefreq: 'weekly' },
    { path: '/brands/omnia-stores', priority: '0.92', changefreq: 'weekly' },
    { path: '/newsroom', priority: '0.90', changefreq: 'daily' },
    { path: '/interviews', priority: '0.85', changefreq: 'weekly' },
    { path: '/event-calendar', priority: '0.85', changefreq: 'weekly' },
    { path: '/research-reports', priority: '0.88', changefreq: 'monthly' },
    { path: '/glossary', priority: '0.85', changefreq: 'monthly' },
    { path: '/press-releases', priority: '0.80', changefreq: 'weekly' },
    { path: '/products', priority: '0.85', changefreq: 'daily' },
    { path: '/about', priority: '0.80', changefreq: 'monthly' },
    { path: '/editorial-policy', priority: '0.80', changefreq: 'monthly' },
    { path: '/corrections', priority: '0.75', changefreq: 'monthly' },
    { path: '/contact', priority: '0.80', changefreq: 'monthly' },
    { path: '/privacy-policy', priority: '0.50', changefreq: 'yearly' },
  ];

  const entries = pages
    .map(
      (page) => `  <url>
    <loc>${SEO_CONFIG.siteUrl}${page.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`.trim();

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
    },
  });
}
