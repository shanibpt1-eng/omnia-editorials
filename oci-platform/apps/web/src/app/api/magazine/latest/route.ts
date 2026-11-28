import { NextRequest, NextResponse } from 'next/server';
import { PUBLISHER_WIRE_DIGEST } from '../../../../data/magazine-editions-data';

export const revalidate = 900;

export interface LiveMagazineFeedItem {
  id: string;
  publisher: string;
  publisherSlug: string;
  title: string;
  excerpt: string;
  link: string;
  publishedAt: string;
  publishedDisplay: string;
  category: string;
  author: string;
  thumbnail: string;
  omniaPairingTitle: string;
  omniaPairingHref: string;
  isFallback?: boolean;
}

interface FeedSourceConfig {
  slug: string;
  name: string;
  url: string;
  defaultCategory: string;
  fallbackImages: string[];
  omniaPairingTitle: string;
  omniaPairingHref: string;
}

const FEED_SOURCES: FeedSourceConfig[] = [
  {
    slug: 'vogue',
    name: 'Vogue',
    url: 'https://www.vogue.com/feed/rss',
    defaultCategory: 'Runway & Fashion',
    fallbackImages: [
      '/ai-models/omnia-runway-model.jpg',
      '/ai-models/omnia-bridal-model.jpg',
      '/banners/marquise-floral-empress.jpg',
    ],
    omniaPairingTitle: 'Omnia Stores Couture & Runway Sets',
    omniaPairingHref: 'https://omniastores.com/shop/',
  },
  {
    slug: 'harpers-bazaar',
    name: "Harper's Bazaar",
    url: 'https://www.harpersbazaar.com/rss/all.xml/',
    defaultCategory: 'High Jewellery & Luxury',
    fallbackImages: [
      '/ai-luxury/royal-empress-vogue-model.jpg',
      '/banners/emerald-grandeur-suite.jpg',
      '/banners/the-statement-jewellery-edit.jpg',
    ],
    omniaPairingTitle: 'Omnia Stores Emerald & Diamond Edit',
    omniaPairingHref: 'https://omniastores.com/product-category/necklaces/',
  },
  {
    slug: 'wwd',
    name: 'WWD',
    url: 'https://wwd.com/feed/',
    defaultCategory: 'Fashion Business & Retail',
    fallbackImages: [
      '/ai-luxury/starlight-marquise-droplets-macro.jpg',
      '/banners/black-friday-luxury-offers-banner.jpg',
      '/banners/diamond-radiance.jpg',
    ],
    omniaPairingTitle: 'Omnia Stores GCC Collector Tier',
    omniaPairingHref: 'https://omniastores.com/',
  },
  {
    slug: 'elle',
    name: 'Elle',
    url: 'https://www.elle.com/rss/all.xml/',
    defaultCategory: 'Trends & Style',
    fallbackImages: [
      '/banners/pearl-revival.jpg',
      '/banners/bridal-elegance-guide.jpg',
      '/banners/classic-jewel-tones-for-evening-glamour.jpg',
    ],
    omniaPairingTitle: 'Omnia Stores Modern Bridal & Pearl Sets',
    omniaPairingHref: 'https://omniastores.com/product-category/earrings/',
  },
];

function decodeHtmlEntities(input: string): string {
  return input
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&#8217;|&#x2019;|&rsquo;/g, '’')
    .replace(/&#8216;|&#x2018;|&lsquo;/g, '‘')
    .replace(/&#8220;|&#x201C;|&ldquo;/g, '“')
    .replace(/&#8221;|&#x201D;|&rdquo;/g, '”')
    .replace(/&#8211;|&ndash;/g, '–')
    .replace(/&#8212;|&mdash;/g, '—')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)));
}

function stripHtmlTags(input: string): string {
  return decodeHtmlEntities(input)
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractTagValue(block: string, tagName: string): string {
  const escaped = tagName.replace(':', '\\:');
  const match = block.match(new RegExp(`<${escaped}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escaped}>`, 'i'));
  return match ? stripHtmlTags(match[1]) : '';
}

function extractThumbnailUrl(block: string): string {
  const mediaThumb = block.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/i);
  if (mediaThumb?.[1]) return mediaThumb[1].replace(/&amp;/g, '&');

  const mediaContent = block.match(/<media:content[^>]+url=["']([^"']+\.(?:jpg|jpeg|png|webp)[^"']*)["']/i);
  if (mediaContent?.[1]) return mediaContent[1].replace(/&amp;/g, '&');

  const anyMediaContent = block.match(/<media:content[^>]+url=["']([^"']+)["']/i);
  if (anyMediaContent?.[1] && !anyMediaContent[1].includes('.mp4')) {
    return anyMediaContent[1].replace(/&amp;/g, '&');
  }

  const enclosure = block.match(/<enclosure[^>]+url=["']([^"']+)["'][^>]*type=["']image\//i);
  if (enclosure?.[1]) return enclosure[1].replace(/&amp;/g, '&');

  const imgInHtml = block.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgInHtml?.[1] && imgInHtml[1].startsWith('http')) {
    return imgInHtml[1].replace(/&amp;/g, '&');
  }

  return '';
}

function formatPublishedDate(dateStr: string): { iso: string; display: string } {
  const parsed = new Date(dateStr);
  if (Number.isNaN(parsed.getTime())) {
    const now = new Date();
    return {
      iso: now.toISOString(),
      display: now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    };
  }
  return {
    iso: parsed.toISOString(),
    display: parsed.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  };
}

async function fetchSingleFeed(source: FeedSourceConfig): Promise<{
  slug: string;
  name: string;
  status: 'live' | 'unavailable';
  count: number;
  items: LiveMagazineFeedItem[];
}> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(source.url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'TheVogueNewsEditorialBot/1.0 (+https://thevoguenews.com)',
        Accept: 'application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8',
      },
      next: { revalidate: 900 },
    });
    clearTimeout(timer);

    if (!res.ok) {
      return { slug: source.slug, name: source.name, status: 'unavailable', count: 0, items: [] };
    }

    const xml = await res.text();
    const itemMatches = xml.match(/<item\b[\s\S]*?<\/item>/gi) || [];
    const items: LiveMagazineFeedItem[] = [];

    for (let i = 0; i < Math.min(itemMatches.length, 6); i += 1) {
      const block = itemMatches[i];
      const title = extractTagValue(block, 'title');
      const link = extractTagValue(block, 'link');
      if (!title || !link) continue;

      const rawDesc = extractTagValue(block, 'description');
      const excerpt =
        rawDesc.length > 185 ? `${rawDesc.slice(0, 182).replace(/\s+\S*$/, '')}...` : rawDesc || `${source.name} editorial dispatch.`;
      const category = extractTagValue(block, 'category') || source.defaultCategory;
      const author = extractTagValue(block, 'dc:creator') || `${source.name} Editorial`;
      const pubRaw = extractTagValue(block, 'pubDate');
      const { iso, display } = formatPublishedDate(pubRaw);
      const thumb = extractThumbnailUrl(block) || source.fallbackImages[i % source.fallbackImages.length];

      items.push({
        id: `${source.slug}-${i}-${Buffer.from(link).toString('base64').slice(0, 10)}`,
        publisher: source.name,
        publisherSlug: source.slug,
        title,
        excerpt,
        link,
        publishedAt: iso,
        publishedDisplay: display,
        category,
        author,
        thumbnail: thumb,
        omniaPairingTitle: source.omniaPairingTitle,
        omniaPairingHref: source.omniaPairingHref,
        isFallback: false,
      });
    }

    return {
      slug: source.slug,
      name: source.name,
      status: items.length > 0 ? 'live' : 'unavailable',
      count: items.length,
      items,
    };
  } catch {
    clearTimeout(timer);
    return { slug: source.slug, name: source.name, status: 'unavailable', count: 0, items: [] };
  }
}

export async function GET(req: NextRequest) {
  const sourceFilter = req.nextUrl.searchParams.get('source')?.toLowerCase().trim() || 'all';

  const targetSources =
    sourceFilter && sourceFilter !== 'all'
      ? FEED_SOURCES.filter((s) => s.slug === sourceFilter || s.name.toLowerCase() === sourceFilter)
      : FEED_SOURCES;

  const activeSources = targetSources.length > 0 ? targetSources : FEED_SOURCES;
  const results = await Promise.all(activeSources.map((src) => fetchSingleFeed(src)));

  let combinedItems = results
    .flatMap((r) => r.items)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  const FALLBACK_THUMBS = [
    '/ai-models/omnia-runway-model.jpg',
    '/ai-models/omnia-bridal-model.jpg',
    '/ai-models/omnia-beauty-model.jpg',
    '/ai-luxury/royal-empress-vogue-model.jpg',
    '/ai-luxury/starlight-marquise-droplets-macro.jpg',
    '/press/omnia-fouad-founder-spread.png',
  ];

  const usedFallback = combinedItems.length === 0;
  if (usedFallback) {
    combinedItems = PUBLISHER_WIRE_DIGEST.map((pub, idx) => ({
      id: `fallback-${pub.id}`,
      publisher: pub.publisher,
      publisherSlug: pub.publisher.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title: pub.headlineEn,
      excerpt: pub.takeawayEn,
      link: pub.omniaTieInUrl,
      publishedAt: new Date(Date.now() - idx * 3600_000).toISOString(),
      publishedDisplay: pub.publishedDate,
      category: pub.category,
      author: `${pub.publisher} Desk (${pub.region})`,
      thumbnail: FALLBACK_THUMBS[idx % FALLBACK_THUMBS.length],
      omniaPairingTitle: 'Explore Omnia Stores Featured Edit',
      omniaPairingHref: pub.omniaTieInUrl,
      isFallback: true,
    }));
  }

  return NextResponse.json({
    success: true,
    mode: usedFallback ? 'curated-fallback' : 'live-rss-syndication',
    fetchedAt: new Date().toISOString(),
    sources: results.map(({ slug, name, status, count }) => ({ slug, name, status, count })),
    total: combinedItems.length,
    items: combinedItems,
  });
}
