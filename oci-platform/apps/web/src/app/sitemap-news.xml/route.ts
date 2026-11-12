import { NextResponse } from 'next/server';
import { SEO_CONFIG, formatIsoDate } from '../../lib/seo-config';
import { EDITORIAL_ARTICLES } from '../../data/editorial-feed';

export const dynamic = 'force-dynamic';
export const revalidate = 900; // 15 minutes cache for Google News

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const now = new Date().getTime();
  const twoDaysMs = 2 * 24 * 60 * 60 * 1000;

  // Filter articles published within preceding 2 days (48 hours)
  const recentArticles = EDITORIAL_ARTICLES.filter((article) => {
    try {
      const pubTime = new Date(article.date || '2026-11-12').getTime();
      return (now - pubTime) <= twoDaysMs && (now - pubTime) >= -twoDaysMs;
    } catch {
      return false;
    }
  });

  // If no articles match strict timestamp (e.g. testing), take top 5 most recent
  const newsList = recentArticles.length > 0 ? recentArticles : EDITORIAL_ARTICLES.slice(0, 5);

  const entries = newsList
    .map((article) => {
      const url = `${SEO_CONFIG.siteUrl}/trending/${article.slug}`;
      const pubDate = formatIsoDate(article.date || new Date());
      const title = escapeXml(article.title);

      return `  <url>
    <loc>${url}</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(SEO_CONFIG.googleNews.publicationName)}</news:name>
        <news:language>${SEO_CONFIG.googleNews.defaultLanguage}</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${title}</news:title>
    </news:news>
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${entries}
</urlset>`.trim();

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'public, max-age=900, s-maxage=900, stale-while-revalidate=3600',
    },
  });
}
