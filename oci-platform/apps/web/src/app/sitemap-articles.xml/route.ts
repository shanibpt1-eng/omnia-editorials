import { NextResponse } from 'next/server';
import { SEO_CONFIG, formatIsoDate } from '../../lib/seo-config';
import { EDITORIAL_ARTICLES } from '../../data/editorial-feed';
import { EVENT_BLOGS_DATA } from '../../data/event-blogs';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const editorialEntries = EDITORIAL_ARTICLES.map((article) => {
    const url = `${SEO_CONFIG.siteUrl}/trending/${article.slug}`;
    const lastmod = formatIsoDate(article.date || new Date());
    const title = escapeXml(article.title);
    const imgUrl = article.coverImage?.startsWith('http')
      ? article.coverImage
      : `${SEO_CONFIG.siteUrl}${article.coverImage?.startsWith('/') ? '' : '/'}${article.coverImage || '/press/inside-luxury-bridal-sets-feature.jpg'}`;

    return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
    <image:image>
      <image:loc>${escapeXml(imgUrl)}</image:loc>
      <image:title>${title}</image:title>
    </image:image>
  </url>`;
  });

  const eventEntries = EVENT_BLOGS_DATA.map((event) => {
    const url = `${SEO_CONFIG.siteUrl}/events/${event.slug}`;
    const lastmod = formatIsoDate(new Date());
    const title = escapeXml(event.titleEn);
    const imgUrl = `${SEO_CONFIG.siteUrl}${event.coverImage.startsWith('/') ? '' : '/'}${event.coverImage}`;

    return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.90</priority>
    <image:image>
      <image:loc>${escapeXml(imgUrl)}</image:loc>
      <image:title>${title}</image:title>
    </image:image>
  </url>`;
  });

  const allEntries = [...eventEntries, ...editorialEntries].join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allEntries}
</urlset>`.trim();

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
