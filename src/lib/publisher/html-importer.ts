export interface ParsedHtmlArticle {
  id?: string;
  filename?: string;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  category: string;
  language: 'en' | 'ar';
  featuredImageUrl: string;
  contentHtml: string;
  canonicalUrl: string;
  backlinksCount: number;
  wordCount: number;
  fileSizeBytes: number;
  verifiedBrandLinks: Array<{ label: string; url: string }>;
  tags: string[];
  isFullDocument: boolean;
}

export function parseHtmlArticle(
  rawHtml: string,
  filename: string = 'article.html'
): ParsedHtmlArticle {
  const fileSizeBytes = new Blob([rawHtml]).size || rawHtml.length;
  const isFullDocument = rawHtml.includes('<!doctype html>') || rawHtml.includes('<html') || rawHtml.includes('<body');

  // 1. Title Extraction
  let title = '';
  const h1Match = rawHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1Match && h1Match[1]) {
    title = stripHtml(h1Match[1]).trim();
  }

  if (!title) {
    const titleTagMatch = rawHtml.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    if (titleTagMatch && titleTagMatch[1]) {
      const fullTitle = stripHtml(titleTagMatch[1]).trim();
      title = fullTitle.split('|')[0].trim();
    }
  }

  if (!title) {
    const ogTitle = rawHtml.match(/<meta\s+property=["']og:title["']\s+content=["'](.*?)["']/i);
    if (ogTitle && ogTitle[1]) {
      title = ogTitle[1].trim();
    }
  }

  if (!title) {
    title = filename.replace(/\.(html|htm)$/i, '').replace(/[-_]+/g, ' ');
  }

  // 2. Slug Generation
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

  // 3. Excerpt / Deck Extraction
  let excerpt = '';
  const deckMatch = rawHtml.match(/<p\s+class=["'][^"']*deck[^"']*["'][^>]*>([\s\S]*?)<\/p>/i);
  if (deckMatch && deckMatch[1]) {
    excerpt = stripHtml(deckMatch[1]).trim();
  }

  if (!excerpt) {
    const metaDesc = rawHtml.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
    if (metaDesc && metaDesc[1]) {
      excerpt = metaDesc[1].trim();
    }
  }

  if (!excerpt) {
    const ogDesc = rawHtml.match(/<meta\s+property=["']og:description["']\s+content=["'](.*?)["']/i);
    if (ogDesc && ogDesc[1]) {
      excerpt = ogDesc[1].trim();
    }
  }

  if (!excerpt) {
    const firstP = rawHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    if (firstP && firstP[1]) {
      excerpt = stripHtml(firstP[1]).slice(0, 180).trim() + '...';
    }
  }

  // 4. Category & Tag Extraction
  let category = 'Bridal & Luxury';
  const tagMatch = rawHtml.match(/<span\s+class=["'][^"']*tag[^"']*["'][^>]*>([\s\S]*?)<\/span>/i);
  if (tagMatch && tagMatch[1]) {
    category = stripHtml(tagMatch[1]).trim();
  }

  // 5. Author / Byline
  let author = 'Omnia Stores Editorial Studio';
  const bylineMatch = rawHtml.match(/<div\s+class=["'][^"']*byline[^"']*["'][^>]*>([\s\S]*?)<\/div>/i);
  if (bylineMatch && bylineMatch[1]) {
    const rawByline = stripHtml(bylineMatch[1]);
    const authorPart = rawByline.split('·')[0].replace(/^By\s+/i, '').trim();
    if (authorPart) author = authorPart;
  }

  // 6. Language Detection
  let language: 'en' | 'ar' = 'en';
  const arabicRegex = /[\u0600-\u06FF]/g;
  const arabicCount = (rawHtml.match(arabicRegex) || []).length;
  if (arabicCount > 100 || rawHtml.includes('lang="ar"')) {
    language = 'ar';
  }

  // 7. Hero Image Extraction
  let featuredImageUrl = '/assets/editorial-model.jpg';
  const heroImgMatch = rawHtml.match(/<figure\s+class=["'][^"']*hero[^"']*["'][^>]*>[\s\S]*?<img\s+[^>]*src=["'](.*?)["']/i);
  if (heroImgMatch && heroImgMatch[1]) {
    featuredImageUrl = normalizeAssetUrl(heroImgMatch[1]);
  } else {
    const firstImg = rawHtml.match(/<img\s+[^>]*src=["'](.*?)["']/i);
    if (firstImg && firstImg[1] && !firstImg[1].includes('logo')) {
      featuredImageUrl = normalizeAssetUrl(firstImg[1]);
    }
  }

  // 8. Backlinks & External Collection Links
  const linkRegex = /<a\s+[^>]*href=["'](https?:\/\/[^"']*omniastores\.[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
  const verifiedBrandLinks: Array<{ label: string; url: string }> = [];
  let m: RegExpExecArray | null = null;
  while ((m = linkRegex.exec(rawHtml)) !== null) {
    const label = stripHtml(m[2]).trim();
    if (label && !verifiedBrandLinks.some((l) => l.url === m![1])) {
      verifiedBrandLinks.push({ label, url: m![1] });
    }
  }

  // 9. Exact HTML Preservation
  // If user provided a complete document with stylesheets, preserve the entire document so it renders EXACTLY the same!
  let contentHtml = rawHtml;
  
  // Normalize paths so relative assets load properly in any preview or downstream client
  contentHtml = contentHtml
    .replace(/href=["']assets\/style\.css["']/g, 'href="/assets/style.css"')
    .replace(/src=["']assets\//g, 'src="/assets/')
    .replace(/src=["'](\.\/)?assets\//g, 'src="/assets/');

  const wordCount = stripHtml(contentHtml).split(/\s+/).filter(Boolean).length;

  return {
    filename,
    title,
    slug,
    excerpt,
    author,
    category,
    language,
    featuredImageUrl,
    contentHtml,
    canonicalUrl: `https://omniastores.com/blogs/news/${slug}`,
    backlinksCount: verifiedBrandLinks.length,
    wordCount,
    fileSizeBytes,
    verifiedBrandLinks,
    tags: [category, 'Omnia Edit', 'Dubai Jewellery', '925 Sterling Silver', 'Bridal Luxury'],
    isFullDocument,
  };
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

function normalizeAssetUrl(url: string): string {
  if (url.startsWith('assets/')) {
    return '/' + url;
  }
  return url;
}
