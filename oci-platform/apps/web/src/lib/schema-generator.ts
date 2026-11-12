/**
 * The Vogue News — Automated JSON-LD Structured Data Schema Generator
 * Fully compliant with Google Search, Google News, Bing, and AI Knowledge Graphs (AEO/GEO)
 */

import { SEO_CONFIG, getCanonicalUrl, formatIsoDate } from './seo-config';
import { EditorialArticle } from './types';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface AuthorProfile {
  name: string;
  role?: string;
  bio?: string;
  credentials?: string;
  avatar?: string;
  experienceYears?: number;
  knowsAbout?: string[];
  sameAs?: string[];
}

export class SchemaGenerator {
  /**
   * 1. NewsMediaOrganization Schema (E-E-A-T Publisher Authority)
   */
  static buildOrganizationSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': ['NewsMediaOrganization', 'Organization'],
      '@id': `${SEO_CONFIG.siteUrl}/#organization`,
      name: SEO_CONFIG.siteName,
      alternateName: [
        'The Vogue News GCC',
        'ذا فوغ نيوز',
        'Vogue News Broadsheet',
        'The Vogue News Journal',
      ],
      url: SEO_CONFIG.siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${SEO_CONFIG.siteUrl}/icon-512.png`,
        caption: 'The Vogue News Crest Logo',
        width: 512,
        height: 512,
      },
      image: `${SEO_CONFIG.siteUrl}/the-vogue-news-white.png`,
      description: SEO_CONFIG.description,
      publishingPrinciples: `${SEO_CONFIG.siteUrl}/editorial-policy`,
      correctionsPolicy: `${SEO_CONFIG.siteUrl}/corrections`,
      diversityPolicy: `${SEO_CONFIG.siteUrl}/editorial-policy`,
      ethicsPolicy: `${SEO_CONFIG.siteUrl}/editorial-policy`,
      verificationFactCheckingPolicy: `${SEO_CONFIG.siteUrl}/editorial-policy`,
      unnamedSourcesPolicy: `${SEO_CONFIG.siteUrl}/editorial-policy`,
      actionableFeedbackPolicy: `${SEO_CONFIG.siteUrl}/contact`,
      foundingDate: '2020-01-15',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dubai',
        addressRegion: 'Dubai',
        addressCountry: 'AE',
        streetAddress: 'DIFC Gate Precinct 4, Level 5',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+971-4-362-7000',
          contactType: 'editorial newsroom',
          areaServed: ['AE', 'SA', 'QA', 'KW', 'BH', 'OM'],
          availableLanguage: ['en', 'ar'],
          email: 'editorial@thevoguenews.com',
        },
        {
          '@type': 'ContactPoint',
          telephone: '+966-11-200-8800',
          contactType: 'Riyadh Bureau',
          areaServed: 'SA',
          availableLanguage: ['ar', 'en'],
          email: 'riyadh@thevoguenews.com',
        },
      ],
      sameAs: [
        SEO_CONFIG.socials.instagram,
        SEO_CONFIG.socials.tiktok,
        SEO_CONFIG.socials.youtube,
        SEO_CONFIG.socials.twitter,
        SEO_CONFIG.socials.linkedin,
      ],
    };
  }

  /**
   * 2. WebSite Schema with Sitelinks Searchbox
   */
  static buildWebSiteSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SEO_CONFIG.siteUrl}/#website`,
      url: SEO_CONFIG.siteUrl,
      name: SEO_CONFIG.siteName,
      alternateName: SEO_CONFIG.siteNameAr,
      publisher: {
        '@id': `${SEO_CONFIG.siteUrl}/#organization`,
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SEO_CONFIG.siteUrl}/editorials?search={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
      inLanguage: ['en-AE', 'ar-AE', 'en-SA', 'ar-SA'],
    };
  }

  /**
   * 3. NewsArticle Schema (Google News & Rich Results Certified)
   */
  static buildNewsArticleSchema(article: EditorialArticle, isAr = false) {
    const headline = isAr && article.titleAr ? article.titleAr : article.title;
    const description = isAr && article.excerptAr ? article.excerptAr : article.excerpt;
    const canonicalUrl = getCanonicalUrl(`/trending/${article.slug}`);
    
    // Parse valid ISO publication and modified timestamps
    const datePublished = formatIsoDate(article.date || '2026-11-01');
    const dateModified = formatIsoDate(article.date || new Date());

    // Resolve Image
    const coverImageUrl = article.coverImage?.startsWith('http')
      ? article.coverImage
      : `${SEO_CONFIG.siteUrl}${article.coverImage?.startsWith('/') ? '' : '/'}${article.coverImage || '/press/inside-luxury-bridal-sets-feature.jpg'}`;

    // Resolve Author
    const authorObject = article.author?.name
      ? {
          '@type': 'Person',
          name: article.author.name,
          jobTitle: article.author.role || 'Senior Luxury Jewellery Bureau Editor',
          description: article.author.bio || 'Accredited gemological curator and luxury commerce journalist covering GCC assay standards.',
          hasCredential: article.author.credentials || 'Certified Jewellery Journalist • GCC Standards Auditor',
          knowsAbout: [
            '925 Sterling Silver Assay Protocols',
            'Dubai Central Laboratory (DCL) Compliance',
            'Sovereign GCC Bridal Suites',
            'Gemological Dispersion & High Jewellery',
          ],
          url: `${SEO_CONFIG.siteUrl}/about`,
        }
      : {
          '@type': 'Organization',
          name: article.publication || SEO_CONFIG.siteName,
          url: article.originalSourceUrl || SEO_CONFIG.siteUrl,
        };

    return {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      '@id': `${canonicalUrl}#newsarticle`,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl,
      },
      headline: headline.slice(0, 110),
      description: description.slice(0, 320),
      image: [coverImageUrl],
      datePublished: datePublished,
      dateModified: dateModified,
      author: authorObject,
      publisher: {
        '@type': 'NewsMediaOrganization',
        name: SEO_CONFIG.siteName,
        url: SEO_CONFIG.siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${SEO_CONFIG.siteUrl}/icon-512.png`,
          width: 512,
          height: 512,
        },
      },
      isAccessibleForFree: true,
      inLanguage: isAr ? 'ar-AE' : 'en-AE',
      articleSection: isAr ? (article.categoryAr || 'مجوهرات فاخرة') : (article.category || 'High Jewellery'),
      keywords: [
        'The Vogue News',
        '925 Sterling Silver',
        'Dubai Central Laboratory',
        'GCC Luxury Journal',
        'Omnia Stores',
        'Bridal Jewellery',
      ].join(', '),
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', '.lead-paragraph', '.executive-takeaway'],
      },
      citation: article.citationText || 'The Vogue News GCC Broadsheet',
      copyrightHolder: {
        '@id': `${SEO_CONFIG.siteUrl}/#organization`,
      },
      copyrightYear: new Date().getFullYear(),
    };
  }

  /**
   * 4. BreadcrumbList Schema (Hierarchical Sitelinks)
   */
  static buildBreadcrumbSchema(items: BreadcrumbItem[]) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url.startsWith('http') ? item.url : `${SEO_CONFIG.siteUrl}${item.url.startsWith('/') ? '' : '/'}${item.url}`,
      })),
    };
  }

  /**
   * 5. Person Schema (Journalist / Editor Bio)
   */
  static buildPersonSchema(author: AuthorProfile) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: author.name,
      jobTitle: author.role || 'Journalist',
      worksFor: {
        '@id': `${SEO_CONFIG.siteUrl}/#organization`,
      },
      description: author.bio,
      knowsAbout: author.knowsAbout || ['High Jewellery', 'Assay Standards', 'Luxury Commerce'],
      image: author.avatar ? (author.avatar.startsWith('http') ? author.avatar : `${SEO_CONFIG.siteUrl}${author.avatar}`) : undefined,
      sameAs: author.sameAs || [],
    };
  }

  /**
   * 6. AboutPage Schema
   */
  static buildAboutPageSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': `${SEO_CONFIG.siteUrl}/about#aboutpage`,
      url: `${SEO_CONFIG.siteUrl}/about`,
      name: 'About The Vogue News',
      description: 'The Vogue News is the premier independent GCC luxury daily broadsheet and intelligence wire.',
      mainEntity: {
        '@id': `${SEO_CONFIG.siteUrl}/#organization`,
      },
    };
  }

  /**
   * 7. ContactPage Schema
   */
  static buildContactPageSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      '@id': `${SEO_CONFIG.siteUrl}/contact#contactpage`,
      url: `${SEO_CONFIG.siteUrl}/contact`,
      name: 'Contact The Vogue News Editorial Bureau',
      description: 'Contact details, press desks, and newsroom locations in Dubai, Riyadh, Abu Dhabi, Doha, and Kuwait.',
      mainEntity: {
        '@id': `${SEO_CONFIG.siteUrl}/#organization`,
      },
    };
  }

  /**
   * 8. Safe JSON-LD Serialization (Avoids XSS and unescaped quotes)
   */
  static serialize(schemaObject: unknown): string {
    return JSON.stringify(schemaObject)
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e')
      .replace(/&/g, '\\u0026');
  }

  /**
   * 9. Schema Validator (Self-audit verifying essential Google Rich Results properties)
   */
  static validate(schema: Record<string, any>): { valid: boolean; errors: string[]; warnings: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (!schema['@context'] || schema['@context'] !== 'https://schema.org') {
      errors.push("Missing or invalid '@context': must be 'https://schema.org'");
    }

    if (!schema['@type']) {
      errors.push("Missing required '@type' property");
    }

    const type = Array.isArray(schema['@type']) ? schema['@type'][0] : schema['@type'];

    if (type === 'NewsArticle' || type === 'Article') {
      if (!schema.headline) errors.push("NewsArticle missing required 'headline'");
      if (!schema.image || (Array.isArray(schema.image) && schema.image.length === 0)) {
        errors.push("NewsArticle missing required 'image'");
      }
      if (!schema.datePublished) errors.push("NewsArticle missing required 'datePublished'");
      if (!schema.dateModified) warnings.push("NewsArticle missing recommended 'dateModified'");
      if (!schema.author) errors.push("NewsArticle missing required 'author'");
      if (!schema.publisher) errors.push("NewsArticle missing required 'publisher'");
    }

    if (type === 'NewsMediaOrganization' || type === 'Organization') {
      if (!schema.name) errors.push("Organization missing required 'name'");
      if (!schema.url) errors.push("Organization missing required 'url'");
      if (!schema.logo) warnings.push("Organization missing recommended 'logo'");
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
    };
  }
}
