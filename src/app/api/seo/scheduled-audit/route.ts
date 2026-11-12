import { NextResponse } from 'next/server';
import { SEO_CONFIG } from '../../../../lib/seo-config';
import { SchemaGenerator } from '../../../../lib/schema-generator';
import { EDITORIAL_ARTICLES } from '../../../../data/editorial-feed';
import { getIndexNowStatus } from '../../../../lib/indexnow';
import { getBotAnalytics } from '../../../../lib/bot-detector';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const timestamp = new Date().toISOString();
    const articlesAudit = EDITORIAL_ARTICLES.map((art) => {
      const schema = SchemaGenerator.buildNewsArticleSchema(art);
      const validation = SchemaGenerator.validate(schema);
      const titleLen = art.title.length;
      const descLen = (art.excerpt || '').length;

      return {
        slug: art.slug,
        titleLen,
        descLen,
        schemaValid: validation.valid,
        errors: validation.errors,
      };
    });

    const totalArticles = articlesAudit.length;
    const validSchemas = articlesAudit.filter((a) => a.schemaValid).length;
    const optimalTitles = articlesAudit.filter((a) => a.titleLen >= 40 && a.titleLen <= 110).length;
    const optimalDescs = articlesAudit.filter((a) => a.descLen >= 100 && a.descLen <= 320).length;

    // Calculate overall health score
    const schemaScore = (validSchemas / totalArticles) * 40;
    const titleScore = (optimalTitles / totalArticles) * 30;
    const descScore = (optimalDescs / totalArticles) * 30;
    const healthScore = Math.round(schemaScore + titleScore + descScore);

    const indexNowData = getIndexNowStatus();
    const botData = getBotAnalytics();

    return NextResponse.json({
      success: true,
      timestamp,
      healthScore,
      summary: {
        totalArticles,
        validSchemas,
        optimalTitles,
        optimalDescs,
        indexNowTotalSubmissions: indexNowData.totalSubmissions,
        verifiedBotVisits: botData.totalRequests,
      },
      endpoints: {
        sitemapIndex: `${SEO_CONFIG.siteUrl}/sitemap.xml`,
        googleNewsSitemap: `${SEO_CONFIG.siteUrl}/sitemap-news.xml`,
        articlesSitemap: `${SEO_CONFIG.siteUrl}/sitemap-articles.xml`,
        pagesSitemap: `${SEO_CONFIG.siteUrl}/sitemap-pages.xml`,
        robotsTxt: `${SEO_CONFIG.siteUrl}/robots.txt`,
        llmsTxt: `${SEO_CONFIG.siteUrl}/llms.txt`,
      },
      audit: articlesAudit,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
