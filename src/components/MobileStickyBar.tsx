'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ArrowRightLeft, Newspaper, ArrowUpRight, Globe, Sparkles } from 'lucide-react';
import { useLuxury } from './ThemeProvider';

export function MobileStickyBar() {
  const { currency, setCurrency, language, toggleLanguage } = useLuxury();

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#07090E]/95 backdrop-blur-xl border-t border-gold/30 px-3 py-2 flex items-center justify-around shadow-2xl dark-surface">
      {/* Storefront Link */}
      <a
        href="https://omniastores.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1 text-[10px] text-gold font-semibold"
      >
        <ShoppingBag className="w-4 h-4" />
        <span>omniastores</span>
      </a>

      {/* Language Switcher */}
      <button
        onClick={toggleLanguage}
        className="flex flex-col items-center gap-1 text-[10px] text-neutral-300 hover:text-gold"
        title="Toggle Language"
      >
        <Globe className="w-4 h-4 text-gold" />
        <span>{language === 'en' ? 'العربية' : 'English'}</span>
      </button>

      {/* Currency Switcher */}
      <button
        onClick={() => setCurrency(currency === 'AED' ? 'SAR' : 'AED')}
        className="flex flex-col items-center gap-1 text-[10px] text-neutral-300 hover:text-gold"
      >
        <ArrowRightLeft className="w-4 h-4 text-gold" />
        <span>{currency === 'AED' ? '🇦🇪 AED' : '🇸🇦 SAR'}</span>
      </button>

      {/* Direct Editorial Portal Tab */}
      <Link
        href="/editorials"
        className="flex flex-col items-center gap-0.5 text-[10px] text-gold font-bold relative group"
      >
        <div className="p-1 rounded-full bg-gold/20 border border-gold/50 shadow-[0_0_8px_rgba(212,175,55,0.4)]">
          <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
        </div>
        <span>{language === 'ar' ? 'البوابة التحريرية' : 'Editorial'}</span>
      </Link>

      {/* Backend Control Center */}
      <Link
        href="/backend"
        className="flex flex-col items-center gap-1 text-[10px] text-emerald-400 font-semibold"
      >
        <ArrowUpRight className="w-4 h-4" />
        <span>{language === 'ar' ? 'التحكم' : 'Backend'}</span>
      </Link>
    </div>
  );
}
