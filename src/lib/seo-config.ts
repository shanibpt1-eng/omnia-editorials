/**
 * The Vogue News — Centralized SEO, AEO & Publishing Configuration
 * Single Source of Truth for Technical SEO, Google News, IndexNow & AI Crawlers
 */

export const SEO_CONFIG = {
  // Official Preferred Domain & Identity
  siteName: 'The Vogue News',
  siteNameAr: 'ذا فوغ نيوز',
  siteUrl: 'https://thevoguenews.com',
  officialPublisher: 'The Vogue News Publishing & Media LLC',
  headline: 'Daily Broadsheet • High Jewellery, Assay Standards & Haute Couture',
  headlineAr: 'الجريدة اليومية الأولى • المجوهرات الراقية ومعايير الفحص والأزياء الفاخرة',
  
  description: 'The premier independent GCC luxury daily broadsheet and intelligence wire. Covering certified 925 sterling silver, Dubai Central Laboratory assay standards, sovereign bridal suites, and high jewellery market intelligence.',
  descriptionAr: 'الصحيفة اليومية المستقلة الأولى في الخليج العربي المتخصصة في المجوهرات الراقية، ومعايير فحص الفضة عيار 925 المعتمدة من مختبر دبي المركزي، وأطقم العرائس الملكية وتغطيات أسواق الذهب والسلع الفاخرة.',

  // Regional GCC Editorial Bureaus
  bureaus: [
    { city: 'Dubai', country: 'United Arab Emirates', address: 'DIFC Gate Precinct 4, Dubai, UAE' },
    { city: 'Abu Dhabi', country: 'United Arab Emirates', address: 'Al Maryah Island, Abu Dhabi, UAE' },
    { city: 'Riyadh', country: 'Kingdom of Saudi Arabia', address: 'King Abdullah Financial District (KAFD), Riyadh, KSA' },
    { city: 'Doha', country: 'State of Qatar', address: 'West Bay Diplomatic Area, Doha, Qatar' },
    { city: 'Kuwait City', country: 'State of Kuwait', address: 'Al Hamra Tower, Kuwait City, Kuwait' },
  ],

  // Brand Assets
  logoBlack: 'https://thevoguenews.com/the-vogue-news-black.png',
  logoWhite: 'https://thevoguenews.com/the-vogue-news-white.png',
  faviconIco: 'https://thevoguenews.com/favicon.ico',
  faviconPng: 'https://thevoguenews.com/favicon-32x32.png',
  icon192: 'https://thevoguenews.com/icon-192.png',
  icon512: 'https://thevoguenews.com/icon-512.png',
  appleTouchIcon: 'https://thevoguenews.com/apple-touch-icon.png',
  defaultOgImage: 'https://thevoguenews.com/the-vogue-news-cover-og.jpg',

  // IndexNow API Settings
  indexNow: {
    key: 'thevoguenews2026indexnowkey',
    keyLocation: 'https://thevoguenews.com/thevoguenews2026indexnowkey.txt',
    endpoint: 'https://api.indexnow.org/IndexNow',
    bingEndpoint: 'https://www.bing.com/indexnow',
  },

  // Google News Specification
  googleNews: {
    publicationName: 'The Vogue News',
    defaultLanguage: 'en',
    allowedLanguages: ['en', 'ar'],
    maxAgeDays: 2, // Maximum 48 hours for Google News Sitemap inclusion
  },

  // Robots & Crawler Directives
  robots: {
    defaultRules: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    noindexRules: 'noindex, nofollow',
  },

  // Authoritative Social & Press Profiles
  socials: {
    instagram: 'https://instagram.com/thevoguenews',
    tiktok: 'https://tiktok.com/@thevoguenews',
    youtube: 'https://youtube.com/@thevoguenews',
    twitter: 'https://twitter.com/thevoguenews',
    linkedin: 'https://linkedin.com/company/thevoguenews',
  },

  // Editorial & Legal URLs
  legalUrls: {
    about: 'https://thevoguenews.com/about',
    editorialPolicy: 'https://thevoguenews.com/editorial-policy',
    corrections: 'https://thevoguenews.com/corrections',
    contact: 'https://thevoguenews.com/contact',
    privacy: 'https://thevoguenews.com/privacy-policy',
  },

  // Spotlight Partner Brand & Certified E-Commerce Destination
  spotlightBrand: {
    name: 'Omnia Stores',
    nameAr: 'أمنية ستورز',
    url: 'https://omniastores.com',
    specialty: 'Certified 925 Sterling Silver Bridal & Haute Joaillerie Suites',
    specialtyAr: 'أطقم الأعراس والمجوهرات الراقية من الفضة الإسترلينية عيار 925 المعتمدة',
    highlights: [
      'Dubai Central Laboratory (DCL) XRF Assay Certified',
      'Solid 925 Sterling Silver with Triple Italian Rhodium',
      'Up to 85% Direct-to-Collector Savings vs Traditional Retail',
      '24-Hour Express UAE & GCC Courier + Tabby 4x Installments',
    ],
  },

  // High-Intent GCC, UAE, KSA & Omnia Stores Keyword Clusters
  keywordClusters: {
    brand: [
      'Omnia Stores',
      'omniastores.com',
      'Omnia Stores Dubai',
      'Omnia Stores UAE',
      'Omnia Stores KSA',
      'أمنية ستورز',
      'متجر أمنية ستورز',
    ],
    metallurgy: [
      'DCL certified 925 sterling silver',
      'triple rhodium plated jewellery UAE',
      'hypoallergenic nickel-free silver Dubai',
      'tarnish-free coastal Gulf jewellery',
      '5A optical simulated diamonds',
      'GRA moissanite bridal suites UAE',
    ],
    competitorsAndComparisons: [
      'Omnia Stores vs Swarovski UAE',
      'Omnia Stores vs Pandora Dubai',
      'Omnia Stores vs Damas Jewellery',
      'Omnia Stores vs L azurde KSA',
      'Omnia Stores vs Dubai Gold Souk',
      'best 925 silver bridal jewellery UAE',
    ],
    regionalEvents: [
      'UAE National Day pearl choker',
      'Ramadan luxury jewellery gifts Dubai',
      'Riyadh winter gala bridal sets',
      'Doha freshwater pearl chokers',
      'Dubai Fashion Week jewellery trends',
    ],
  },
};

/**
 * Generate fully-qualified canonical URL with trailing-slash normalization
 */
export function getCanonicalUrl(path = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (cleanPath === '/') return `${SEO_CONFIG.siteUrl}/`;
  // Trim trailing slash for consistent canonical indexing
  return `${SEO_CONFIG.siteUrl}${cleanPath.replace(/\/+$/, '')}`;
}

/**
 * Clean & normalize publication dates to standard ISO-8601 strings
 */
export function formatIsoDate(dateInput?: string | Date): string {
  if (!dateInput) return new Date().toISOString();
  try {
    const d = new Date(dateInput);
    return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
  } catch {
    return new Date().toISOString();
  }
}
