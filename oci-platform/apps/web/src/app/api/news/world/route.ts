import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const API_KEY = process.env.NEWS_API_KEY || process.env.NEWSDATA_API_KEY || 'pub_237440f77ad946f5a9497076484516b5';

export async function GET() {
  try {
    const url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&language=en&category=technology,business&prioritydomain=top`;
    const response = await fetch(url, { next: { revalidate: 300 } });
    const data = await response.json();

    const articles = (data.results || []).map((item: any, index: number) => ({
      id: item.article_id || `world-${index}-${Date.now()}`,
      title: item.title,
      description: item.description || item.content || 'Global breaking news report.',
      source: item.source_id || 'Worldwide Desk',
      category: 'Worldwide',
      url: item.link || 'https://omniastores.com/collections/discounted-items',
      publishedAt: item.pubDate,
      brandTakeaway: 'Omnia Stores guarantees certified hallmark authenticity on all 11.11 luxury orders.',
      utmUrl: `https://omniastores.com/collections/discounted-items?utm_source=editorial_wire&utm_medium=world_article&utm_campaign=${encodeURIComponent(item.title ? item.title.slice(0, 20) : 'world_news')}`,
    }));

    return NextResponse.json(
      { success: true, count: articles.length, articles },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error: any) {
    console.error('World News API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch World news wire', error: error?.message },
      { status: 500 }
    );
  }
}
