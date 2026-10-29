'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, Star, Flame, ArrowRight } from 'lucide-react';
import { LUXURY_PRODUCTS } from '../data/luxury-products';
import { generateAffiliateUrl } from '../lib/affiliateEngine';
import { useLuxury } from './ThemeProvider';
import { getArabicProductTitle } from '../lib/productLocalization';

export function AutoSlidingProductMarquee() {
  const { formatPrice, language } = useLuxury();
  const isAr = language === 'ar';
  const [isPaused, setIsPaused] = useState(false);

  const getCategoryLabel = (name: string) => {
    if (!isAr) return name;
    const map: Record<string, string> = {
      'Luxury Sets': 'أطقم فاخرة',
      'Bridal Sets': 'أطقم أعراس',
      'Pearl Sets': 'أطقم لؤلؤ',
      'Tennis Bracelets': 'أساور تنس',
      'Chokers': 'شوكر وطوق',
      'Rings': 'خواتم ملكية',
      'Earrings': 'أقراط متدلية',
      'Pendants': 'قلادات',
      'Bangles': 'أساور صلبة',
      'Anklets': 'خلاخيل',
      'Brooches': 'بروشات',
      'Accessories': 'إكسسوارات',
    };
    return map[name] || name;
  };

  const getMaterialLabel = (mat: string) => {
    if (!isAr) return mat;
    if (mat.includes('925') || mat.toLowerCase().includes('silver')) {
      return 'فضة إسترلينية عيار 925 أصلية';
    }
    return mat;
  };

  // Take top 16 curated high-value trending products from across categories
  const trendingPieces = LUXURY_PRODUCTS.filter((_, i) => i % 18 === 0).slice(0, 14);

  // Duplicate for seamless infinite marquee loop
  const marqueeItems = [...trendingPieces, ...trendingPieces];

  return (
    <section className="py-16 bg-[#F8F5EE] dark:bg-[#07090E] border-y border-neutral-300 dark:border-gold/25 overflow-hidden relative">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-[#8B6508] dark:text-gold text-xs font-semibold uppercase tracking-widest mb-2">
            <Flame className="w-3.5 h-3.5 text-[#8B6508] dark:text-gold animate-bounce" />
            <span>{isAr ? 'عرض مباشر للقطع الأكثر طلباً' : 'Real-Time High-Velocity Showcase'}</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-serif font-bold text-neutral-950 dark:text-white tracking-tight">
            {isAr ? 'خزينة القطع الأكثر رواجاً في الخليج' : 'Live Auto-Sliding Trending Vault'}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-400 mt-1">
            {isAr
              ? 'تحديث مباشر لأطقم الفضة عيار 925 الأكثر مبيعاً في دبي، أبوظبي، والرياض.'
              : 'Continuously cycling top-performing 925 sterling silver suites across Dubai, Abu Dhabi & Riyadh.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] uppercase tracking-wider text-neutral-600 dark:text-neutral-500 hidden sm:inline">
            {isPaused ? (isAr ? 'تم إيقاف الحركة مؤقتاً' : 'Auto-Slide Paused') : (isAr ? 'مرر المؤشر للإيقاف والتسوق' : 'Hover to Pause & Shop')}
          </span>
          <a
            href="https://omniastores.com/collections/luxury-sets"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full border border-neutral-300 dark:border-gold/40 text-[#8B6508] dark:text-gold hover:bg-gold/10 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all"
          >
            <span>{isAr ? 'استكشف جميع الـ 576 قطعة' : 'Explore All 576 Pieces'}</span>
            <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
          </a>
        </div>
      </div>

      {/* Infinite Auto-Sliding Marquee Track */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left & Right Soft Blur Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#F8F5EE] dark:from-[#07090E] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#F8F5EE] dark:from-[#07090E] to-transparent z-10 pointer-events-none" />

        <div
          className={`flex gap-6 py-2 select-none ${
            isPaused ? '' : 'animate-marquee'
          }`}
          style={{
            width: 'max-content',
            animationDuration: '48s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
          }}
        >
          {marqueeItems.map((prod, idx) => {
            const defaultFallback = '/press/inside-luxury-bridal-sets-feature.jpg';
            const img = prod.images[0] || defaultFallback;

            return (
              <div
                key={`${prod.id}-${idx}`}
                className="w-72 sm:w-80 flex-shrink-0 group rounded-2xl glass-panel border border-neutral-200 dark:border-gold/25 hover:border-[#B8860B]/70 dark:hover:border-gold/70 bg-white dark:bg-[#10141F] p-4 transition-all duration-300 shadow-sm hover:shadow-md dark:hover:shadow-[0_12px_30px_rgba(212,175,55,0.25)] hover:-translate-y-1 relative"
              >
                {/* Visual Thumbnail */}
                <div className="relative h-52 w-full rounded-xl overflow-hidden bg-black/90 mb-3 border border-gold/15">
                  <Image
                    src={img}
                    alt={prod.title}
                    fill
                    unoptimized
                    sizes="320px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Category Pill */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-gold/30 text-[10px] text-gold font-medium">
                      {getCategoryLabel(prod.category)}
                    </span>
                  </div>

                  {/* Stock Badge */}
                  <div className="absolute top-2.5 right-2.5">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[9px] text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {isAr ? 'متوفر' : 'In Stock'}
                    </span>
                  </div>
                </div>

                {/* Info & Price */}
                <div>
                  <div className="flex items-center justify-between text-[11px] text-neutral-600 dark:text-neutral-400 mb-1">
                    <span className="truncate">{getMaterialLabel(prod.material)}</span>
                    <div className="flex items-center gap-0.5 text-amber-500 dark:text-amber-400 flex-shrink-0">
                      <Star className="w-3 h-3 fill-amber-500 dark:fill-amber-400 text-amber-500 dark:text-amber-400" />
                      <span className="text-[10px] font-bold text-neutral-900 dark:text-white">{prod.rating || 4.9}</span>
                    </div>
                  </div>

                  <h4 className="text-sm font-serif font-bold text-neutral-950 dark:text-white group-hover:text-[#B8860B] dark:group-hover:text-gold transition-colors line-clamp-1 mb-3">
                    {isAr ? (prod.titleAr || getArabicProductTitle(prod.title)) : prod.title}
                  </h4>

                  <div className="pt-2 border-t border-neutral-200 dark:border-gold/15 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block">
                        {isAr ? 'السعر المباشر' : 'Live Price'}
                      </span>
                      <span className="text-sm font-bold text-[#8B6508] dark:text-gold font-mono">
                        {formatPrice(prod.priceAed, prod.priceSar)}
                      </span>
                    </div>

                    <a
                      href={generateAffiliateUrl({
                        baseUrl: prod.productUrl || prod.storeUrl,
                        source: 'auto_sliding_vault',
                        medium: 'marquee_quick_shop',
                      })}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-gold to-[#AA8C2C] text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:opacity-95 shadow-[0_0_10px_rgba(212,175,55,0.3)] transition-all"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>{isAr ? 'تسوق' : 'Shop'}</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
