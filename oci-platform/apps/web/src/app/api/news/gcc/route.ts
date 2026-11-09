import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const API_KEY = process.env.NEWS_API_KEY || process.env.NEWSDATA_API_KEY || 'pub_237440f77ad946f5a9497076484516b5';

const STORE_DISCOUNTED_ITEMS_URL = 'https://omniastores.com/collections/discounted-items';

const FALLBACK_GCC_ARTICLES = [
  {
    id: 'gcc-fallback-1',
    title: 'GCC Digital Commerce Accelerates Across UAE and Saudi Arabia with Next-Gen Automation',
    description: 'Enterprise operations across Dubai, Riyadh, and Doha are adopting unified logistics and autonomous dispatch platforms to streamline cross-border fulfillment.',
    source: 'GCC Business Desk',
    category: 'GCC & Middle East',
    url: STORE_DISCOUNTED_ITEMS_URL,
    publishedAt: new Date().toISOString(),
    brandTakeaway: 'Shop certified 925 sterling silver bridal suites at factory-direct 11.11 savings.',
    utmUrl: `${STORE_DISCOUNTED_ITEMS_URL}?utm_source=editorial_wire&utm_medium=gcc_article&utm_campaign=11_11_mega_sale`,
  },
  {
    id: 'gcc-fallback-2',
    title: 'Saudi Vision 2030 Drives Record Regional Growth in Cloud Integration and Borderless Logistics',
    description: 'Regional investments in scalable commerce infrastructure hit multi-billion dollar milestones across the Gulf economic corridor.',
    source: 'Riyadh Financial Desk',
    category: 'GCC & Middle East',
    url: STORE_DISCOUNTED_ITEMS_URL,
    publishedAt: new Date().toISOString(),
    brandTakeaway: 'Experience express GCC courier delivery across Riyadh, Dubai, and Jeddah.',
    utmUrl: `${STORE_DISCOUNTED_ITEMS_URL}?utm_source=editorial_wire&utm_medium=gcc_article&utm_campaign=saudi_expansion`,
  },
];

export async function GET() {
  try {
    const url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=ae,sa,qa,kw,om,bh&language=en,ar&category=business,technology`;
    const response = await fetch(url, { next: { revalidate: 300 } });
    const data = await response.json();

    if (data.status === 'success' && Array.isArray(data.results) && data.results.length > 0) {
      const articles = data.results.map((item: any, index: number) => ({
        id: item.article_id || `gcc-${index}-${Date.now()}`,
        title: item.title,
        description: item.description || item.content || 'Live regional coverage from the GCC wire.',
        source: item.source_id || 'GCC Business Desk',
        category: 'GCC & Middle East',
        url: item.link,
        publishedAt: item.pubDate,
        brandTakeaway: 'Shop certified 925 sterling silver suites at factory-direct 11.11 savings.',
        utmUrl: `${STORE_DISCOUNTED_ITEMS_URL}?utm_source=editorial_wire&utm_medium=gcc_article&utm_campaign=${encodeURIComponent(item.title ? item.title.slice(0, 20) : 'gcc_news')}`,
      }));

      return NextResponse.json(
        { success: true, count: articles.length, live: true, articles },
        {
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
          },
        }
      );
    }

    return NextResponse.json(
      { success: true, count: FALLBACK_GCC_ARTICLES.length, live: false, articles: FALLBACK_GCC_ARTICLES },
      {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        },
      }
    );
  } catch (error: any) {
    console.warn('GCC News API offline or unreachable, serving fallback cache:', error?.message);
    return NextResponse.json(
      { success: true, count: FALLBACK_GCC_ARTICLES.length, live: false, articles: FALLBACK_GCC_ARTICLES },
      { status: 200 }
    );
  }
}
