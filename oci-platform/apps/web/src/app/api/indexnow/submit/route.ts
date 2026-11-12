import { NextResponse } from 'next/server';
import { submitToIndexNow } from '../../../../lib/indexnow';
import { SEO_CONFIG } from '../../../../lib/seo-config';
import { EDITORIAL_ARTICLES } from '../../../../data/editorial-feed';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    let urls: string[] = [];

    const body = await req.json().catch(() => ({}));
    if (body.urls && Array.isArray(body.urls)) {
      urls = body.urls;
    } else if (body.slug) {
      urls = [`${SEO_CONFIG.siteUrl}/trending/${body.slug}`];
    } else if (body.allArticles) {
      urls = EDITORIAL_ARTICLES.map((a) => `${SEO_CONFIG.siteUrl}/trending/${a.slug}`);
    } else {
      // Default to core pages + top 5 articles
      urls = [
        SEO_CONFIG.siteUrl,
        `${SEO_CONFIG.siteUrl}/editorials`,
        `${SEO_CONFIG.siteUrl}/trending`,
        ...EDITORIAL_ARTICLES.slice(0, 5).map((a) => `${SEO_CONFIG.siteUrl}/trending/${a.slug}`),
      ];
    }

    const result = await submitToIndexNow(urls);

    return NextResponse.json({
      success: result.success,
      message: result.message,
      submittedUrls: result.submittedUrls,
      results: result.results,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'IndexNow submission failed.' },
      { status: 500 }
    );
  }
}
