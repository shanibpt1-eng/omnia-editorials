import React from 'react';
import { EditorialArticle, LuxuryProduct } from '../lib/types';

interface SeoProps {
  article?: EditorialArticle;
  product?: LuxuryProduct;
  pageType?: 'article' | 'home' | 'product' | 'about';
}

export function SeoHead({ article, product, pageType = 'home' }: SeoProps) {
  // 1. Organization & JewelryStore Schema with GCC GeoCoordinates
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'JewelryStore'],
    '@id': 'https://omniastores.com/#organization',
    name: 'Omnia Stores Luxury Editorial & Demi-Fine High Jewellery',
    alternateName: ['Omnia Stores', 'Omnia Stores UAE', 'Omnia Stores KSA', 'The Omnia Edit'],
    url: 'https://omniastores.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://omniastores.com/omnia-logo.png',
      width: 736,
      height: 120,
    },
    image: 'https://omniastores.com/hero/hero-emerald-grandeur.jpg',
    founder: {
      '@type': 'Person',
      name: 'Omnia Fouad',
      jobTitle: 'Founder & CEO',
      image: 'https://omniastores.com/press/omnia-fouad-founder-spread.png',
      description: 'Dubai-based entrepreneur who founded Omnia Stores in 2018, transforming a self-funded vision into a thriving multimillion-dirham luxury demi-fine jewelry brand across the GCC.',
      sameAs: 'https://omniastores.com/about',
    },
    description: 'Premier Middle Eastern demi-fine jewellery maison specializing in certified 925 sterling silver bridal suites, Premium simulated diamonds, and Arabian freshwater pearls hallmarked under Dubai Central Laboratory standards.',
    priceRange: 'AED 280 - AED 1,650',
    currenciesAccepted: 'AED, SAR, QAR, KWD, BHD, OMR',
    paymentAccepted: 'Credit Card, Apple Pay, Tabby, Tamara, Cash on Delivery',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      addressCountry: 'AE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.2048,
      longitude: 55.2708,
    },
    areaServed: [
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Country', name: 'Saudi Arabia' },
      { '@type': 'Country', name: 'Qatar' },
      { '@type': 'Country', name: 'Kuwait' },
      { '@type': 'Country', name: 'Bahrain' },
      { '@type': 'Country', name: 'Oman' },
    ],
    sameAs: [
      'https://omniastores.com',
      'https://www.instagram.com/omniastores',
      'https://omniastores.com/collections/luxury-sets',
      'https://omniastores.com/collections/bridal-collection',
      'https://omniastores.com/collections/pearl-sets',
      'https://omniastores.com/collections/tennis-bracelet',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Omnia Stores Flagship Jewelry Collections',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Sovereign Bridal & Luxury Suites',
          url: 'https://omniastores.com/collections/luxury-sets',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Certified 925 Sterling Silver Bridal Sets',
          url: 'https://omniastores.com/collections/bridal-collection',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Arabian Gulf Freshwater Pearl Sets',
          url: 'https://omniastores.com/collections/pearl-sets',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Eternity Tennis Bracelets',
          url: 'https://omniastores.com/collections/tennis-bracelet',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Italian Micro-Prong Chokers',
          url: 'https://omniastores.com/collections/chokers-collection',
        },
      ],
    },
  };

  // 2. WebSite Schema with SearchAction (GEO/SEO)
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://omniastores.com/#website',
    url: 'https://omniastores.com',
    name: 'Omnia Stores Luxury Editorial & Commerce Wire',
    publisher: {
      '@id': 'https://omniastores.com/#organization',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://omniastores.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    inLanguage: ['en-AE', 'ar-AE', 'en-SA', 'ar-SA'],
  };

  // 3. NewsArticle Schema (E-E-A-T Compliant with Person Author and FactChecker)
  const newsSchema = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: article.title,
        description: article.excerpt,
        image: [article.coverImage],
        datePublished: new Date().toISOString(),
        dateModified: new Date().toISOString(),
        mainEntityOfPage: `https://omniastores.com/trending/${article.slug}`,
        inLanguage: 'en-AE',
        isAccessibleForFree: true,
        publishingPrinciples: 'https://omniastores.com/about',
        author: article.author
          ? {
              '@type': 'Person',
              name: article.author.name,
              jobTitle: article.author.role,
              description: article.author.bio,
              hasCredential: article.author.credentials,
              knowsAbout: ['925 Sterling Silver Assay', 'Demi-Fine Jewellery', 'Gemology', 'GCC Luxury Retail'],
            }
          : {
              '@type': 'Organization',
              name: article.publication,
              url: article.originalSourceUrl,
            },
        reviewedBy: article.factChecker
          ? {
              '@type': 'Person',
              name: article.factChecker.name,
              jobTitle: article.factChecker.role,
            }
          : undefined,
        publisher: {
          '@type': 'Organization',
          name: 'Omnia Stores Editorial Wire',
          logo: {
            '@type': 'ImageObject',
            url: 'https://omniastores.com/omnia-logo.png',
          },
        },
        citation: article.citationText,
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.direct-answer-box', '.lead-paragraph', 'h1'],
        },
      }
    : null;

  // 4. AEO Direct Answer FAQ Schema
  const faqSchema = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `What are the authoritative takeaways from ${article.title}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `${article.aiSummary.takeaway1} ${article.aiSummary.takeaway2} ${article.aiSummary.takeaway3}`,
            },
          },
          {
            '@type': 'Question',
            name: `Where can customers purchase the featured jewellery piece?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `The featured piece is available directly from the official Omnia Stores flagship boutique at ${article.canonicalStoreUrl} with express courier delivery across UAE and Saudi Arabia via omniastores.com.`,
            },
          },
          {
            '@type': 'Question',
            name: 'What hallmarking and metal purity is guaranteed?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Solid 925 sterling silver verified under Dubai Central Laboratory (DCL) assay standards with electrolytic rhodium shielding.',
            },
          },
        ],
      }
    : null;

  // 5. Product Schema
  const productSchema = product
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        image: product.images,
        description: `${product.title} - Handcrafted ${product.material} with certified assay hallmarking.`,
        brand: {
          '@type': 'Brand',
          name: 'Omnia Stores',
        },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'AED',
          lowPrice: product.priceAed,
          highPrice: product.priceAed,
          price: product.priceAed,
          availability: product.inStock
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
          url: product.storeUrl,
        },
      }
    : null;

  return (
    <>
      <meta name="omnia-editorial-page-type" content={pageType} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {newsSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(newsSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}
    </>
  );
}
