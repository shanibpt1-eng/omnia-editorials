/**
 * Automated Contextual Backlink Engine
 * Maps high-value GCC fashion, luxury, and regional search terms
 * to canonical product and collection URLs on omniastores.com
 */

export interface KeywordLinkMap {
  keyword: string;
  url: string;
  anchorTitle: string;
}

export const GCC_BACKLINK_DICTIONARY: KeywordLinkMap[] = [
  {
    keyword: 'bridal sets',
    url: 'https://omniastores.com/collections/bridal-collection',
    anchorTitle: 'Explore 925 Sterling Silver Bridal Sets on Omnia Stores',
  },
  {
    keyword: 'simulated diamond necklaces',
    url: 'https://omniastores.com/collections/simulated-diamonds',
    anchorTitle: 'View Simulated Diamond Necklaces on Omnia Stores',
  },
  {
    keyword: 'pearl jewellery',
    url: 'https://omniastores.com/collections/pearl-sets',
    anchorTitle: 'Discover Lustrous Pearl Jewellery Sets at Omnia Stores',
  },
  {
    keyword: 'long chain sets',
    url: 'https://omniastores.com/collections/long-chain-sets',
    anchorTitle: 'Browse Modern Long Chain Sets on Omnia Stores',
  },
  {
    keyword: 'tennis jewellery',
    url: 'https://omniastores.com/collections/tennis-bracelet',
    anchorTitle: 'Handcrafted Tennis Bracelets & Necklaces',
  },
  {
    keyword: 'royal chokers',
    url: 'https://omniastores.com/collections/chokers-collection',
    anchorTitle: 'Royal 925 Silver Chokers Collection',
  },
  {
    keyword: 'emerald cut zircon',
    url: 'https://omniastores.com/collections/emerald-zircon',
    anchorTitle: 'Emerald Cut Zircon Luxury Pieces at Omnia Stores',
  },
  {
    keyword: 'luxury 925 sterling silver',
    url: 'https://omniastores.com/collections/luxury-sets',
    anchorTitle: 'Official 925 Sterling Silver Masterpieces',
  },
  {
    keyword: 'dubai fashion trends',
    url: 'https://omniastores.com',
    anchorTitle: 'Omnia Stores Flagship Boutique Dubai',
  },
  {
    keyword: 'ksa luxury store',
    url: 'https://omniastores.com',
    anchorTitle: 'Omnia Stores KSA Riyadh Direct Delivery Portal',
  },
];

/**
 * Injects context-rich SEO backlinks into article plain text or HTML
 */
export function injectContextualBacklinks(text: string): string {
  if (!text) return '';
  let result = text;

  GCC_BACKLINK_DICTIONARY.forEach(({ keyword, url, anchorTitle }) => {
    // Match only whole words not already inside an anchor tag
    const regex = new RegExp(`(?<!<a[^>]*>)(${keyword})(?![^<]*<\\/a>)`, 'gi');
    result = result.replace(
      regex,
      `<a href="${url}" target="_blank" rel="noopener noreferrer" title="${anchorTitle}" class="text-gold hover:text-gold-light underline underline-offset-4 font-medium transition-colors duration-200">$1</a>`
    );
  });

  return result;
}
