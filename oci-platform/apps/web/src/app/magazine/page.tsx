'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useLuxury } from '../../components/ThemeProvider';
import { MagazineEditorialHub } from '../../components/MagazineEditorialHub';
import { OmniaFreeSpaceAdPanel } from '../../components/OmniaFreeSpaceAdPanel';
import { EditorialIntelligencePanels } from '../../components/EditorialIntelligencePanels';

export default function MagazinePage() {
  const { language } = useLuxury();
  const isAr = language === 'ar';

  return (
    <div
      className={`min-h-screen bg-white dark:bg-[#07090E] text-neutral-950 dark:text-white ${
        isAr ? 'font-arabic text-right' : 'text-left'
      }`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Breadcrumb Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
          <Link href="/" className="hover:text-[#8B6508] dark:hover:text-gold transition-colors">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <ChevronRight className="w-3 h-3 rtl:rotate-180 text-gold" />
          <span className="text-[#8B6508] dark:text-gold font-bold">
            {isAr ? 'المجلة الرقمية • كافة القطاعات' : 'The Vogue News Magazine'}
          </span>
        </nav>
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
