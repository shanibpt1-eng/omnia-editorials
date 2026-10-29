// lib/affiliateEngine.ts

export interface LinkGeneratorParams {
  baseUrl: string;
  partnerId?: string;
  source?: string;
  medium?: string;
}

/**
 * 1. Programmatic URL Generator for Product Cards & UI Buttons
 */
export function generateAffiliateUrl({
  baseUrl,
  partnerId = "omnia_gcc",
  source = "editorial_hub",
  medium = "affiliate",
}: LinkGeneratorParams): string {
  try {
    const url = new URL(baseUrl);
    url.searchParams.set("utm_source", source);
    url.searchParams.set("utm_medium", medium);
    url.searchParams.set("ref", partnerId);
    return url.toString();
  } catch {
    return baseUrl;
  }
}

/**
 * 2. Keyword Mapping Registry for Automatic Article Parsing
 */
export const GCC_KEYWORD_MAP: Record<string, string> = {
  // User Core High-Intent Keywords
  "Oud Perfume": "https://omniastores.com/collections/oud",
  "Gold Necklace": "https://omniastores.com/collections/gold-jewelry",
  "Dubai Luxury Retail": "https://omniastores.com/trending",
  "High Jewelry": "https://omniastores.com/collections/jewelry",

  // Core GCC Store Collections
  "Bridal Sets": "https://omniastores.com/collections/silver-sets",
  "bridal suites": "https://omniastores.com/collections/silver-sets",
  "925 Sterling Silver": "https://omniastores.com/collections/silver-sets",
  "925 silver": "https://omniastores.com/collections/silver-sets",
  "Simulated Diamonds": "https://omniastores.com/collections/luxury-sets",
  "Pearl Jewellery": "https://omniastores.com/collections/pearl-sets",
  "pearl suites": "https://omniastores.com/collections/pearl-sets",
  "Tennis Bracelets": "https://omniastores.com/collections/tennis-bracelet",
  "tennis jewellery": "https://omniastores.com/collections/tennis-bracelet",
  "Chokers Collection": "https://omniastores.com/collections/chokers-collection",
  "royal chokers": "https://omniastores.com/collections/chokers-collection",
  "Long Chain Sets": "https://omniastores.com/collections/long-chain-sets",
  "Omnia Brooches": "https://omniastores.com/collections/omnia-brooches",
  "Hair Accessories": "https://omniastores.com/collections/hair-accessories",
};

/**
 * 3. Automated News Article Text Parser
 * Converts matching keywords in news text into SEO-compliant affiliate links.
 */
export function autoInjectAffiliateLinks(
  contentHtml: string,
  sourceName: string = "news_feed"
): string {
  if (!contentHtml) return "";
  let parsedContent = contentHtml;

  const linkedKeywords = new Set<string>();

  Object.entries(GCC_KEYWORD_MAP).forEach(([keyword, rawUrl]) => {
    const lowerKey = keyword.toLowerCase();
    if (linkedKeywords.has(lowerKey)) return;

    const trackedUrl = generateAffiliateUrl({
      baseUrl: rawUrl,
      source: sourceName.toLowerCase().replace(/\s+/g, "_"),
      medium: "automated_article_link",
    });

    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(?<!<[^>]*)\\b(${escapedKeyword})\\b(?![^<]*<\\/a>)`, "i");

    if (regex.test(parsedContent)) {
      parsedContent = parsedContent.replace(
        regex,
        `<a href="${trackedUrl}" target="_blank" rel="nofollow sponsored" class="text-[#D4AF37] font-semibold underline decoration-[#D4AF37]/40 hover:decoration-[#D4AF37] transition-all">$1</a>`
      );
      linkedKeywords.add(lowerKey);
    }
  });

  return parsedContent;
}
