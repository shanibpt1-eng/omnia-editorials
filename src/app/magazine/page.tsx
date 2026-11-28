'use client';

import React from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { ChevronRight, Crown, Globe } from 'lucide-react';
import { useLuxury } from '../../components/ThemeProvider';
import { MagazineEditorialHub } from '../../components/MagazineEditorialHub';
import { OmniaFreeSpaceAdPanel } from '../../components/OmniaFreeSpaceAdPanel';
import { EditorialIntelligencePanels } from '../../components/EditorialIntelligencePanels';

export default function MagazinePage() {
  const { language } = useLuxury();
  const isAr = language === 'ar';

  const magazineJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'The Vogue News — International Luxury, Fashion & Jewellery Digital Magazine',
    url: 'https://thevoguenews.com/magazine',
    inLanguage: ['en', 'ar'],
    publisher: {
      '@type': 'Organization',
      name: 'The Vogue News Editorial Group',
      url: 'https://thevoguenews.com',
      sameAs: [
        'https://omniastores.com',
        'https://www.vogue.com/',
      ],
    },
    about: [
      {
        '@type': 'Brand',
        name: 'Omnia Stores',
        url: 'https://omniastores.com',
        sameAs: [
          'https://omniastores.com/collections/bridal-sets',
          'https://omniastores.com/collections/brooches',
          'https://omniastores.com/collections/chokers-collection',
          'https://omniastores.com/collections/necklaces',
        ],
      },
      {
        '@type': 'CreativeWorkSeries',
        name: 'Vogue International Syndicated Index',
        url: 'https://www.vogue.com/',
      },
    ],
  };

  return (
    <div
      className={`min-h-screen bg-white dark:bg-[#07090E] text-neutral-950 dark:text-white ${
        isAr ? 'font-arabic text-right' : 'text-left'
      }`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <Script
        id="magazine-authority-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(magazineJsonLd) }}
      />

      {/* Premium Magazine Top Strip + Breadcrumb */}
      <div className="border-b border-neutral-200 dark:border-gold/20 bg-[#FAF7F2] dark:bg-[#090C13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
            <Link href="/" className="hover:text-[#8B6508] dark:hover:text-gold transition-colors">
              {isAr ? 'الرئيسية' : 'Home'}
            </Link>
            <ChevronRight className="w-3 h-3 rtl:rotate-180 text-gold" />
            <span className="text-[#8B6508] dark:text-gold font-bold">
              {isAr ? 'المجلة الرقمية • 15 مصدراً عالمياً' : 'The Vogue News Digital Magazine'}
            </span>
          </nav>

          <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono">
            <span className="inline-flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
              <Globe className="w-3 h-3 text-[#8B6508] dark:text-gold" />
              <span>{isAr ? 'مصادر عالمية مباشرة' : '15 Live Global Magazines'}</span>
            </span>
            <a
              href="https://omniastores.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-950 dark:bg-gold text-white dark:text-black font-bold hover:opacity-90 transition-opacity"
            >
              <Crown className="w-3 h-3 text-gold dark:text-black" />
              <span>{isAr ? 'الشريك الرسمي: omniastores.com' : 'Flagship Partner: omniastores.com'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Monochrome Vogue-Inspired Magazine Showcase */}
      <MagazineEditorialHub />

      {/* Dual 1080P Brooch & Seasonal Campaign Ad Showcase */}
      <OmniaFreeSpaceAdPanel />

      {/* Multi-Tab News, Fashion, Collections, Blogs & Value Benchmark */}
      <EditorialIntelligencePanels />
    </div>
  );
}
