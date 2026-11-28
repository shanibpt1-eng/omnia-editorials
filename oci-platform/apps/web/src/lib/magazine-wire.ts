import { PUBLISHER_WIRE_DIGEST } from '../data/magazine-editions-data';

export type MagazineWirePillar =
  | 'fashion'
  | 'runway'
  | 'beauty'
  | 'culture'
  | 'living'
  | 'watches'
  | 'business'
  | 'jewellery';

export type PublisherChannelType = 'magazine' | 'news-channel';

export interface LiveMagazineFeedItem {
  id: string;
  slug: string;
  publisher: string;
  publisherSlug: string;
  channelType: PublisherChannelType;
  homeUrl: string;
  pillar: MagazineWirePillar;
  title: string;
  excerpt: string;
  link: string;
  publishedAt: string;
  publishedDisplay: string;
  category: string;
  author: string;
  thumbnail: string;
  isFallback?: boolean;
}

export interface FeedSourceConfig {
  slug: string;
  name: string;
  channelType: PublisherChannelType;
  homeUrl: string;
  url: string;
  defaultCategory: string;
  defaultPillar: MagazineWirePillar;
  fallbackImages: string[];
}

export const FEED_SOURCES: FeedSourceConfig[] = [
  // 15 PRESTIGE GLOBAL MAGAZINES
  {
    slug: 'vogue',
    name: 'Vogue',
    channelType: 'magazine',
    homeUrl: 'https://www.vogue.com/',
    url: 'https://www.vogue.com/feed/rss',
    defaultCategory: 'Fashion',
    defaultPillar: 'fashion',
    fallbackImages: ['/ai-models/omnia-runway-model.jpg', '/press/luxury-style-middle-east-aug2026.jpg'],
  },
  {
    slug: 't-magazine',
    name: 'T Magazine (NYT)',
    channelType: 'magazine',
    homeUrl: 'https://www.nytimes.com/section/t-magazine',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/TMagazine.xml',
    defaultCategory: 'Style & Design',
    defaultPillar: 'culture',
    fallbackImages: ['/press/style-journal-global-dec2026.jpg', '/campaigns/rose-brilliance.jpg'],
  },
  {
    slug: 'harpers-bazaar',
    name: "Harper's Bazaar",
    channelType: 'magazine',
    homeUrl: 'https://www.harpersbazaar.com/',
    url: 'https://www.harpersbazaar.com/rss/all.xml/',
    defaultCategory: 'Fashion & Luxury',
    defaultPillar: 'jewellery',
    fallbackImages: ['/ai-luxury/royal-empress-vogue-model.jpg', '/campaigns/emerald-prestige.jpg'],
  },
  {
    slug: 'robb-report',
    name: 'Robb Report',
    channelType: 'magazine',
    homeUrl: 'https://robbreport.com/',
    url: 'https://robbreport.com/feed/',
    defaultCategory: 'Ultra Luxury',
    defaultPillar: 'watches',
    fallbackImages: ['/campaigns/golden-nocturne.jpg', '/press/golden-luxe-middle-east-cover-oct2026.jpg'],
  },
  {
    slug: 'vanity-fair',
    name: 'Vanity Fair',
    channelType: 'magazine',
    homeUrl: 'https://www.vanityfair.com/',
    url: 'https://www.vanityfair.com/feed/rss',
    defaultCategory: 'Arts & Culture',
    defaultPillar: 'culture',
    fallbackImages: ['/press/the-global-ledger-omnia-story-oct2026.jpg', '/press/gulf-traveller-luxury-edit-sept2026.jpg'],
  },
  {
    slug: 'architectural-digest',
    name: 'Architectural Digest',
    channelType: 'magazine',
    homeUrl: 'https://www.architecturaldigest.com/',
    url: 'https://www.architecturaldigest.com/feed/rss',
    defaultCategory: 'Living & Design',
    defaultPillar: 'living',
    fallbackImages: ['/campaigns/golden-lumiere.jpg', '/campaigns/turquoise-radiance.jpg'],
  },
  {
    slug: 'new-yorker',
    name: 'The New Yorker',
    channelType: 'magazine',
    homeUrl: 'https://www.newyorker.com/culture',
    url: 'https://www.newyorker.com/feed/culture',
    defaultCategory: 'Arts & Letters',
    defaultPillar: 'culture',
    fallbackImages: ['/press/the-pearl-edit-omnia-stores.jpg', '/press/inside-luxury-bridal-sets-feature.jpg'],
  },
  {
    slug: 'allure',
    name: 'Allure',
    channelType: 'magazine',
    homeUrl: 'https://www.allure.com/',
    url: 'https://www.allure.com/feed/rss',
    defaultCategory: 'Beauty',
    defaultPillar: 'beauty',
    fallbackImages: ['/ai-models/omnia-beauty-model.jpg', '/campaigns/pearl-bloom.jpg'],
  },
  {
    slug: 'glamour',
    name: 'Glamour',
    channelType: 'magazine',
    homeUrl: 'https://www.glamour.com/',
    url: 'https://www.glamour.com/feed/rss',
    defaultCategory: 'Style & Beauty',
    defaultPillar: 'beauty',
    fallbackImages: ['/banners/romantic-florals-and-jewel-tones.jpg', '/banners/pink-radiance.jpg'],
  },
  {
    slug: 'gq',
    name: 'GQ',
    channelType: 'magazine',
    homeUrl: 'https://www.gq.com/',
    url: 'https://www.gq.com/feed/rss',
    defaultCategory: 'Menswear & Watches',
    defaultPillar: 'watches',
    fallbackImages: ['/press/business-lifestyle-march2026.jpg', '/banners/sapphire-evenings.jpg'],
  },
  {
    slug: 'esquire',
    name: 'Esquire',
    channelType: 'magazine',
    homeUrl: 'https://www.esquire.com/',
    url: 'https://www.esquire.com/rss/all.xml/',
    defaultCategory: 'Menswear & Culture',
    defaultPillar: 'watches',
    fallbackImages: ['/banners/midnight-nocturne-couture.jpg', '/campaigns/01_timeless-elegance.png'],
  },
  {
    slug: 'town-and-country',
    name: 'Town & Country',
    channelType: 'magazine',
    homeUrl: 'https://www.townandcountrymag.com/',
    url: 'https://www.townandcountrymag.com/rss/all.xml/',
    defaultCategory: 'Culture & Jewels',
    defaultPillar: 'jewellery',
    fallbackImages: ['/ai-models/omnia-bridal-model.jpg', '/press/wedding-luxe-arabia-nov2026.jpg'],
  },
  {
    slug: 'elle',
    name: 'Elle',
    channelType: 'magazine',
    homeUrl: 'https://www.elle.com/',
    url: 'https://www.elle.com/rss/all.xml/',
    defaultCategory: 'Runway & Style',
    defaultPillar: 'runway',
    fallbackImages: ['/banners/pearl-revival.jpg', '/campaigns/sapphire-signature.jpg'],
  },
  {
    slug: 'house-beautiful',
    name: 'House Beautiful',
    channelType: 'magazine',
    homeUrl: 'https://www.housebeautiful.com/',
    url: 'https://www.housebeautiful.com/rss/all.xml/',
    defaultCategory: 'Interiors & Living',
    defaultPillar: 'living',
    fallbackImages: ['/press/omnia-stores-guide-bridal-gifting.jpg', '/banners/how-to-wear-statement-sets.jpg'],
  },
  {
    slug: 'hypebeast',
    name: 'Hypebeast',
    channelType: 'magazine',
    homeUrl: 'https://hypebeast.com/',
    url: 'https://hypebeast.com/feed',
    defaultCategory: 'Street Luxury',
    defaultPillar: 'fashion',
    fallbackImages: ['/campaigns/ruby-statements-editorial.jpg', '/banners/the-colour-gem-edit.jpg'],
  },

  // 10 TOP BRANDED GLOBAL & REGIONAL NEWS CHANNELS
  {
    slug: 'nyt-fashion',
    name: 'The New York Times Fashion',
    channelType: 'news-channel',
    homeUrl: 'https://www.nytimes.com/section/fashion',
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/FashionandStyle.xml',
    defaultCategory: 'Global Style Desk',
    defaultPillar: 'fashion',
    fallbackImages: ['/press/inside-the-bridal-collection-july2026.jpg', '/campaigns/02_classic-brilliance.png'],
  },
  {
    slug: 'bbc-culture',
    name: 'BBC News Culture',
    channelType: 'news-channel',
    homeUrl: 'https://www.bbc.com/news/entertainment_and_arts',
    url: 'https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml',
    defaultCategory: 'World Arts Desk',
    defaultPillar: 'culture',
    fallbackImages: ['/campaigns/03_royal-allure.png', '/campaigns/05_colours-of-grace.png'],
  },
  {
    slug: 'bbc-world',
    name: 'BBC World News',
    channelType: 'news-channel',
    homeUrl: 'https://www.bbc.com/news/world',
    url: 'https://feeds.bbci.co.uk/news/world/rss.xml',
    defaultCategory: 'Global Headlines',
    defaultPillar: 'business',
    fallbackImages: ['/press/gulf-news-expansion-oct2026.jpg', '/campaigns/06_modern-romance.png'],
  },
  {
    slug: 'guardian-fashion',
    name: 'The Guardian Fashion',
    channelType: 'news-channel',
    homeUrl: 'https://www.theguardian.com/fashion',
    url: 'https://www.theguardian.com/fashion/rss',
    defaultCategory: 'Runway Report',
    defaultPillar: 'runway',
    fallbackImages: ['/campaigns/08_floral-charm.png', '/campaigns/09_regal-rubies.png'],
  },
  {
    slug: 'guardian-culture',
    name: 'The Guardian Culture',
    channelType: 'news-channel',
    homeUrl: 'https://www.theguardian.com/culture',
    url: 'https://www.theguardian.com/culture/rss',
    defaultCategory: 'Culture Dispatch',
    defaultPillar: 'culture',
    fallbackImages: ['/campaigns/10_emerald-grandeur.png', '/campaigns/11_pearl-revival.png'],
  },
  {
    slug: 'wwd',
    name: 'WWD News',
    channelType: 'news-channel',
    homeUrl: 'https://wwd.com/',
    url: 'https://wwd.com/feed/',
    defaultCategory: 'Fashion Industry',
    defaultPillar: 'business',
    fallbackImages: [
      '/press/gulf-business-expansion-oct2026.jpg',
      '/ai-luxury/starlight-marquise-droplets-macro.jpg',
      '/banners/diamond-radiance.jpg',
      '/press/brand-milestone-report-jan2027.jpg',
    ],
  },
  {
    slug: 'arabian-business',
    name: 'Arabian Business',
    channelType: 'news-channel',
    homeUrl: 'https://www.arabianbusiness.com/',
    url: 'https://www.arabianbusiness.com/feed',
    defaultCategory: 'GCC Luxury Markets',
    defaultPillar: 'business',
    fallbackImages: [
      '/events/main-event-luxury-gala.jpg',
      '/events/uae-national-day-celebrate-in-style.jpg',
      '/events/new-year-sale-2027-event.jpg',
      '/events/ramadan-sale-festive-event.jpg',
    ],
  },
  {
    slug: 'luxury-daily',
    name: 'Luxury Daily',
    channelType: 'news-channel',
    homeUrl: 'https://www.luxurydaily.com/',
    url: 'https://www.luxurydaily.com/feed/',
    defaultCategory: 'Luxury Trade Wire',
    defaultPillar: 'business',
    fallbackImages: ['/campaigns/azure-pendant-edit.jpg', '/campaigns/cobalt-couture.jpg'],
  },
  {
    slug: 'cnbc-retail',
    name: 'CNBC Retail & Luxury',
    channelType: 'news-channel',
    homeUrl: 'https://www.cnbc.com/retail/',
    url: 'https://search.cnbc.com/rs/search/combinedcms/view.xml?partnerId=wrss01&id=10000116',
    defaultCategory: 'Retail Markets',
    defaultPillar: 'business',
    fallbackImages: [
      '/banners/ruby-evenings.jpg',
      '/banners/sapphire-allure.jpg',
      '/banners/classic-jewel-tones-for-evening-glamour.jpg',
      '/banners/the-occasionwear-edit.jpg',
    ],
  },
  {
    slug: 'aljazeera-world',
    name: 'Al Jazeera English',
    channelType: 'news-channel',
    homeUrl: 'https://www.aljazeera.com/',
    url: 'https://www.aljazeera.com/xml/rss/all.xml',
    defaultCategory: 'International Desk',
    defaultPillar: 'culture',
    fallbackImages: [
      '/press/gulf-news-business-june2026.jpg',
      '/press/bridal-arabia-cover-april2026.jpg',
      '/press/bridal-grace-arabia-cover-2026.jpg',
      '/campaigns/12_sapphire-sophistication.png',
    ],
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

function inferPillar(source: FeedSourceConfig, category: string, title: string): MagazineWirePillar {
  const hay = `${category} ${title}`.toLowerCase();
  if (/\b(watch|horology|rolex|omega|cartier|patek|menswear|suit|grooming|sneaker|tailoring)\b/i.test(hay)) {
    return 'watches';
  }
  if (/\b(jewel|jewelry|jewellery|diamond|pearl|necklace|brooch|sapphire|emerald|tiffany|van cleef|bulgari)\b/i.test(hay)) {
    return 'jewellery';
  }
  if (/\b(runway|pre-fall|resort|couture|fashion week|spring 20|fall 20|collection|catwalk)\b/i.test(hay)) {
    return 'runway';
  }
  if (/\b(beauty|skincare|skin care|makeup|hair|fragrance|perfume|lipstick|serum|glam)\b/i.test(hay)) {
    return 'beauty';
  }
  if (/\b(architecture|architect|interior|interiors|home deals|furniture|kitchen|villa|hotel|decor|dining room)\b/i.test(hay)) {
    return 'living';
  }
  if (/\b(art|museum|exhibition|film|movie|book|music|theatre|culture|royal|cinema|oscars)\b/i.test(hay)) {
    return 'culture';
  }
  if (/\b(business|revenue|market|ceo|creative director|appoint|step down|steps down|part ways|merge|retail|earnings)\b/i.test(hay)) {
    return 'business';
  }
  return source.defaultPillar;
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

export function slugifyStoryTitle(publisherSlug: string, title: string): string {
  const clean = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 68);
  return `${publisherSlug}-${clean || 'dispatch'}`;
}

async function fetchSingleFeed(source: FeedSourceConfig): Promise<{
  slug: string;
  name: string;
  channelType: PublisherChannelType;
  homeUrl: string;
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
        'User-Agent': 'Mozilla/5.0 (compatible; TheVogueNewsBot/1.0; +https://thevoguenews.com)',
        Accept: 'application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8',
      },
      next: { revalidate: 900 },
    });
    clearTimeout(timer);

    if (!res.ok) {
      return {
        slug: source.slug,
        name: source.name,
        channelType: source.channelType,
        homeUrl: source.homeUrl,
        status: 'unavailable',
        count: 0,
        items: [],
      };
    }

    const xml = await res.text();
    const itemMatches = xml.match(/<item\b[\s\S]*?<\/item>/gi) || [];
    const items: LiveMagazineFeedItem[] = [];

    for (let i = 0; i < Math.min(itemMatches.length, 4); i += 1) {
      const block = itemMatches[i];
      const title = extractTagValue(block, 'title');
      const link = extractTagValue(block, 'link');
      if (!title || !link) continue;

      const rawDesc = extractTagValue(block, 'description');
      const excerpt =
        rawDesc.length > 220
          ? `${rawDesc.slice(0, 217).replace(/\s+\S*$/, '')}...`
          : rawDesc || `${source.name} editorial dispatch.`;
      const category = extractTagValue(block, 'category') || source.defaultCategory;
      const author = extractTagValue(block, 'dc:creator') || `${source.name} Editorial Desk`;
      const pubRaw = extractTagValue(block, 'pubDate');
      const { iso, display } = formatPublishedDate(pubRaw);
      const thumb = extractThumbnailUrl(block) || source.fallbackImages[i % source.fallbackImages.length];

      items.push({
        id: `${source.slug}-${i}-${Buffer.from(link).toString('base64').slice(0, 8)}`,
        slug: slugifyStoryTitle(source.slug, title),
        publisher: source.name,
        publisherSlug: source.slug,
        channelType: source.channelType,
        homeUrl: source.homeUrl,
        pillar: inferPillar(source, category, title),
        title,
        excerpt,
        link,
        publishedAt: iso,
        publishedDisplay: display,
        category,
        author,
        thumbnail: thumb,
        isFallback: false,
      });
    }

    return {
      slug: source.slug,
      name: source.name,
      channelType: source.channelType,
      homeUrl: source.homeUrl,
      status: items.length > 0 ? 'live' : 'unavailable',
      count: items.length,
      items,
    };
  } catch {
    clearTimeout(timer);
    return {
      slug: source.slug,
      name: source.name,
      channelType: source.channelType,
      homeUrl: source.homeUrl,
      status: 'unavailable',
      count: 0,
      items: [],
    };
  }
}

export async function getAggregatedMagazineWire(options?: {
  source?: string;
  pillar?: string;
  channelType?: string;
}) {
  const sourceFilter = options?.source?.toLowerCase().trim() || 'all';
  const pillarFilter = options?.pillar?.toLowerCase().trim() || 'all';
  const typeFilter = options?.channelType?.toLowerCase().trim() || 'all';

  let activeSources = FEED_SOURCES;
  if (typeFilter === 'magazine' || typeFilter === 'news-channel') {
    activeSources = activeSources.filter((s) => s.channelType === typeFilter);
  }
  if (sourceFilter && sourceFilter !== 'all') {
    const matched = activeSources.filter((s) => s.slug === sourceFilter || s.name.toLowerCase() === sourceFilter);
    if (matched.length > 0) activeSources = matched;
  }

  const results = await Promise.all(activeSources.map((src) => fetchSingleFeed(src)));

  const buckets = results
    .map((r) => [...r.items].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()))
    .filter((b) => b.length > 0);

  const interleaved: LiveMagazineFeedItem[] = [];
  const maxLen = buckets.reduce((m, b) => Math.max(m, b.length), 0);
  const seenThumbs = new Set<string>();
  const seenSlugs = new Set<string>();

  for (let round = 0; round < maxLen; round += 1) {
    for (const bucket of buckets) {
      const item = bucket[round];
      if (!item) continue;
      if (pillarFilter !== 'all' && item.pillar !== pillarFilter) continue;
      if (seenThumbs.has(item.thumbnail) || seenSlugs.has(item.slug)) continue;
      seenThumbs.add(item.thumbnail);
      seenSlugs.add(item.slug);
      interleaved.push(item);
    }
  }

  let combinedItems = interleaved;
  const FALLBACK_THUMBS = [
    '/ai-models/omnia-runway-model.jpg',
    '/ai-models/omnia-bridal-model.jpg',
    '/ai-models/omnia-beauty-model.jpg',
    '/ai-luxury/royal-empress-vogue-model.jpg',
    '/ai-luxury/starlight-marquise-droplets-macro.jpg',
    '/press/omnia-fouad-founder-spread.png',
  ];

  const usedFallback = combinedItems.length === 0 && pillarFilter === 'all';
  if (usedFallback) {
    combinedItems = PUBLISHER_WIRE_DIGEST.map((pub, idx) => ({
      id: `fallback-${pub.id}`,
      slug: slugifyStoryTitle(pub.publisher.toLowerCase().replace(/[^a-z0-9]+/g, '-'), pub.headlineEn),
      publisher: pub.publisher,
      publisherSlug: pub.publisher.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      channelType: 'magazine' as PublisherChannelType,
      homeUrl: 'https://thevoguenews.com/magazine',
      pillar: 'fashion' as MagazineWirePillar,
      title: pub.headlineEn,
      excerpt: pub.takeawayEn,
      link: pub.omniaTieInUrl,
      publishedAt: new Date(Date.now() - idx * 3600_000).toISOString(),
      publishedDisplay: pub.publishedDate,
      category: pub.category,
      author: `${pub.publisher} Desk (${pub.region})`,
      thumbnail: FALLBACK_THUMBS[idx % FALLBACK_THUMBS.length],
      isFallback: true,
    }));
  }

  return {
    success: true,
    mode: usedFallback ? 'curated-fallback' : 'live-rss-syndication',
    fetchedAt: new Date().toISOString(),
    sources: results.map(({ slug, name, channelType, homeUrl, status, count }) => ({
      slug,
      name,
      channelType,
      homeUrl,
      status,
      count,
    })),
    total: combinedItems.length,
    items: combinedItems,
  };
}
