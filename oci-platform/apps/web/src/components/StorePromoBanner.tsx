'use client';

import React from 'react';
import { Sparkles, ShoppingBag, ArrowUpRight, ArrowUpLeft } from 'lucide-react';
import { useLuxury } from './ThemeProvider';

export function StorePromoBanner() {
  const { language } = useLuxury();
  const isAr = language === 'ar';

  return (
    <aside
      aria-label="Official Store Announcements"
      className={`w-full bg-gradient-to-r from-[#1A1406] via-[#2A1F08] to-[#1A1406] text-white border-b border-gold/30 py-2.5 px-4 ${
        isAr ? 'font-arabic text-right' : ''
      }`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="p-1 rounded-full bg-gold/20 text-gold flex-shrink-0">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          </span>
          <span className="text-neutral-200">
            <strong className="text-gold uppercase tracking-wider font-semibold">
              {isAr ? 'المتجر الرئيسي الرسمي:' : 'Official Flagship Store:'}
            </strong>{' '}
            {isAr ? (
              <>
                تسوقي أطقم الزفاف الملكية من الفضة عيار 925، ومحاكاة الألماس، واللؤلؤ الطبيعي مباشرة عبر{' '}
                <a
                  href="https://omniastores.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold font-bold underline underline-offset-2 hover:text-white"
                >
                  omniastores.com
                </a>{' '}
                • استخدمي الرمز <code className="px-1.5 py-0.5 rounded bg-black/60 border border-gold/40 text-gold font-mono font-bold">OMNIA-VIP15</code> للحصول على خصم 15%
              </>
            ) : (
              <>
                Shop certified 925 sterling silver bridal suites, simulated diamonds, and pearl sets directly on{' '}
                <a
                  href="https://omniastores.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold font-bold underline underline-offset-2 hover:text-white"
                >
                  omniastores.com
                </a>{' '}
                • Use code <code className="px-1.5 py-0.5 rounded bg-black/60 border border-gold/40 text-gold font-mono font-bold">OMNIA-VIP15</code> for 15% Off
              </>
            )}
          </span>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href="https://omniastores.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1 rounded-full bg-gradient-to-r from-gold to-[#AA8C2C] text-black font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_10px_rgba(212,175,55,0.4)] hover:opacity-95 shimmer-btn"
          >
            <ShoppingBag className="w-3 h-3" />
            <span>{isAr ? 'تسوقي الآن' : 'Shop Now'}</span>
            {isAr ? <ArrowUpLeft className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
          </a>
        </div>
      </div>
    </aside>
  );
}
