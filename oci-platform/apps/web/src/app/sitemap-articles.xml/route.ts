import { NextResponse } from 'next/server';
import { SEO_CONFIG, formatIsoDate } from '../../lib/seo-config';
import { EDITORIAL_ARTICLES } from '../../data/editorial-feed';

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
  const entries = EDITORIAL_ARTICLES.map((article) => {
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
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries}
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
