import { NextResponse } from 'next/server';
import { SEO_CONFIG } from '../../lib/seo-config';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

export async function GET() {
  const currentDate = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SEO_CONFIG.siteUrl}/sitemap-news.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SEO_CONFIG.siteUrl}/sitemap-articles.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SEO_CONFIG.siteUrl}/sitemap-pages.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`.trim();

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
