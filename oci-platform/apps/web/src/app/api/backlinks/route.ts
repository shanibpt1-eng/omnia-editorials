import { NextResponse } from 'next/server';

export async function GET() {
  const backlinksPayload = {
    canonicalDomain: 'https://omniastores.com',
    authorityScore: 94,
    verifiedHubs: [
      {
        collectionName: 'Sovereign Bridal & Luxury Sets',
        targetUrl: 'https://omniastores.com/collections/luxury-sets',
        anchorKeywords: [
          'Omnia Stores luxury sets',
          '925 sterling silver bridal sets Dubai',
          'Sovereign gala jewelry suite',
          'Premium simulated diamond necklace',
        ],
        itemCount: 48,
        priceRangeAed: 'AED 1,250 - 1,650',
      },
      {
        collectionName: 'Certified 925 Silver Bridal Sets',
        targetUrl: 'https://omniastores.com/collections/bridal-collection',
        anchorKeywords: [
          'Omnia Stores bridal sets',
          'Dubai wedding jewelry 925 silver',
          'rhodium plated bridal sets UAE',
          'Saudi Arabia bridal jewelry direct',
        ],
        itemCount: 48,
        priceRangeAed: 'AED 980 - 1,480',
      },
      {
        collectionName: 'Arabian Freshwater Pearl Sets',
        targetUrl: 'https://omniastores.com/collections/pearl-sets',
        anchorKeywords: [
          'Omnia Stores pearl sets',
          'Arabian Gulf freshwater pearls',
          'baroque pearl choker necklace',
          'abaya layerable pearl jewelry',
        ],
        itemCount: 48,
        priceRangeAed: 'AED 850 - 1,280',
      },
      {
        collectionName: 'Eternity Tennis Bracelets',
        targetUrl: 'https://omniastores.com/collections/tennis-bracelet',
        anchorKeywords: [
          'Omnia Stores tennis bracelets',
          '925 silver tennis bracelet Dubai',
          'double-safety clasp diamond bracelet',
          '4mm tennis line bracelet',
        ],
        itemCount: 48,
        priceRangeAed: 'AED 399 - 680',
      },
      {
        collectionName: 'Italian Micro-Prong Chokers',
        targetUrl: 'https://omniastores.com/collections/chokers-collection',
        anchorKeywords: [
          'Omnia Stores chokers',
          'silver choker necklace UAE',
          'bridal collar necklace 925',
          'micro-prong solitaire choker',
        ],
        itemCount: 48,
        priceRangeAed: 'AED 450 - 890',
      },
      {
        collectionName: 'Simulated Diamond Necklaces',
        targetUrl: 'https://omniastores.com/collections/simulated-diamonds',
        anchorKeywords: [
          'simulated diamond necklace Dubai',
          'high-carat statement necklace',
          'ethical diamond alternative UAE',
        ],
        itemCount: 48,
        priceRangeAed: 'AED 550 - 1,350',
      },
      {
        collectionName: 'Cocktail & Solitaire Rings',
        targetUrl: 'https://omniastores.com/collections/rings',
        anchorKeywords: [
          'Omnia Stores rings',
          'cushion-cut cocktail ring',
          '925 sterling silver engagement ring',
        ],
        itemCount: 48,
        priceRangeAed: 'AED 280 - 580',
      },
      {
        collectionName: 'Chandelier & Drop Earrings',
        targetUrl: 'https://omniastores.com/collections/earrings',
        anchorKeywords: [
          'Omnia Stores earrings',
          'chandelier drop earrings Dubai',
          'hypoallergenic silver gala earrings',
        ],
        itemCount: 48,
        priceRangeAed: 'AED 320 - 640',
      },
    ],
  };

  return NextResponse.json(backlinksPayload, {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
