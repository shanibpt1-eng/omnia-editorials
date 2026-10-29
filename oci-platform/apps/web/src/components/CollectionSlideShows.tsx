'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, ShieldCheck, Flame, Play, Pause, Sparkles } from 'lucide-react';
import { LUXURY_PRODUCTS, CATEGORY_METADATA } from '../data/luxury-products';
import { ProductCard } from './ProductCard';
import { useLuxury } from './ThemeProvider';

export function CollectionSlideShows() {
  const { currency, language } = useLuxury();
  const isAr = language === 'ar';

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

  const defaultCat = CATEGORY_METADATA[0]?.name || 'Luxury Sets';
  const [activeCollectionName, setActiveCollectionName] = useState<string>(defaultCat);
  const [slidePage, setSlidePage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const itemsPerPage = 4;

  const currentProducts = useMemo(() => {
    return LUXURY_PRODUCTS.filter((p) => p.category === activeCollectionName);
  }, [activeCollectionName]);

  const maxPages = Math.max(1, Math.ceil(currentProducts.length / itemsPerPage));

  const displayedProducts = useMemo(() => {
    const start = slidePage * itemsPerPage;
    return currentProducts.slice(start, start + itemsPerPage);
  }, [currentProducts, slidePage]);

  const activeCollectionObj = useMemo(() => {
    return (
      CATEGORY_METADATA.find((c) => c.name === activeCollectionName) ||
      CATEGORY_METADATA[0] || {
        name: 'Luxury Sets' as const,
        subtitle: 'Signature Dubai High Glamour Sets',
        collectionUrl: 'https://omniastores.com/collections/luxury-sets',
        count: 48,
      }
    );
  }, [activeCollectionName]);

  const handleNext = () => {
    setSlidePage((prev) => (prev + 1) % maxPages);
    setProgress(0);
  };

  const handlePrev = () => {
    setSlidePage((prev) => (prev - 1 + maxPages) % maxPages);
    setProgress(0);
  };

  // Auto-Slide Interval with Smooth Progress Bar
  const SLIDE_DURATION = 4500; // 4.5 seconds per slide page
  const TICK_INTERVAL = 50;

  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (TICK_INTERVAL / SLIDE_DURATION) * 100;
        if (next >= 100) {
          setSlidePage((page) => (page + 1) % maxPages);
          return 0;
        }
        return next;
      });
    }, TICK_INTERVAL);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, maxPages]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 border-b border-gold/25 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold font-bold mb-2">
            <Flame className="w-4 h-4 text-gold animate-bounce" />
            <span>{isAr ? 'عروض تفاعلية لـ 12 تشكيلة رئيسية' : 'Interactive Mirrored Storefront Slideshows'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-neutral-950 dark:text-white">
            {isAr ? 'تشكيلات أمنية ستورز: 12 فئة فاخرة' : 'Mirrored Collections: 12 Main Categories'}
          </h2>
          <p className="text-sm text-neutral-700 dark:text-neutral-400 mt-2 max-w-2xl">
            {isAr
              ? `تصفح 576 تحفة فنية مصاغة من الفضة الإسترلينية عيار 925 متزامنة مع omniastores.com. تحتوي كل فئة على 48 قطعة معتمدة وأسعار حية بالـ ${currency}.`
              : `Browse through 576 authentic jewellery creations mirrored directly from omniastores.com across all 12 main store categories. Each category contains 48 certified pieces with live ${currency} pricing.`}
          </p>
        </div>

        {/* Action Controls & External Link */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Auto-Play Toggle */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`px-4 py-2.5 rounded-full border text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all ${
              isAutoPlaying
                ? 'bg-gold/15 border-gold text-[#8B6508] dark:text-gold shadow-[0_0_12px_rgba(212,175,55,0.3)]'
                : 'bg-white dark:bg-black/60 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-400 hover:text-black dark:hover:text-white'
            }`}
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>{isAr ? 'التشغيل التلقائي مفعل' : 'Auto-Slide On'}</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isAr ? 'متوقف مؤقتاً' : 'Auto-Slide Paused'}</span>
              </>
            )}
          </button>

          {/* Direct Link to Collection on omniastores.com */}
          <a
            href={activeCollectionObj.collectionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-black font-bold text-xs uppercase tracking-widest hover:opacity-95 transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] shimmer-btn self-start lg:self-auto"
          >
            <span>{isAr ? `تسوق تشكيلة ${getCategoryLabel(activeCollectionName)} على omniastores.com` : `Shop ${activeCollectionName} on omniastores.com`}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Collection Navigation Tabs (Horizontal Scrollable) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
        {CATEGORY_METADATA.map((col) => {
          const isActive = col.name === activeCollectionName;
          return (
            <button
              key={col.name}
              onClick={() => {
                setActiveCollectionName(col.name);
                setSlidePage(0);
                setProgress(0);
              }}
              className={`px-4 py-3 rounded-2xl text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap flex flex-col items-start gap-1 border flex-shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-gold to-[#B38F2B] text-black font-bold border-gold shadow-[0_0_20px_rgba(212,175,55,0.4)] scale-105'
                  : 'bg-white dark:bg-[#111520] text-neutral-800 dark:text-neutral-400 hover:text-black dark:hover:text-white border-neutral-200 dark:border-gold/20 hover:border-[#B8860B]/50 dark:hover:border-gold/50 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{getCategoryLabel(col.name)}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${isActive ? 'bg-black text-gold' : 'bg-gold/15 text-[#8B6508] dark:text-gold'}`}>
                  {col.count} {isAr ? 'قطعة' : 'items'}
                </span>
              </div>
              <span className={`text-[10px] lowercase font-normal ${isActive ? 'text-black/80 font-medium' : 'text-neutral-600 dark:text-neutral-500'}`}>
                {isAr ? 'فضة إسترلينية عيار 925 معتمدة' : col.subtitle}
              </span>
            </button>
          );
        })}
      </div>

      {/* Slideshow Showcase Panel */}
      <div
        className="relative rounded-3xl p-6 sm:p-8 glass-panel border border-neutral-200 dark:border-gold/30 bg-neutral-50/50 dark:bg-[#0E121C] transition-all shadow-md dark:shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated Progress Bar across Top */}
        <div className="w-full bg-neutral-200 dark:bg-neutral-800/80 h-1 rounded-full mb-6 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gold via-amber-300 to-gold transition-all ease-linear"
            style={{
              width: `${progress}%`,
              transitionDuration: `${TICK_INTERVAL}ms`,
            }}
          />
        </div>

        {/* Slideshow Top Controls Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-neutral-200 dark:border-gold/20">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-neutral-700 dark:text-neutral-400 font-medium">
              Showing Items {slidePage * itemsPerPage + 1}–{Math.min((slidePage + 1) * itemsPerPage, currentProducts.length)} of {currentProducts.length}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-xs text-[#8B6508] dark:text-gold font-mono flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Live Mirror: omniastores.com
            </span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {isHovered && isAutoPlaying && (
              <span className="text-[10px] text-[#8B6508] dark:text-gold uppercase tracking-widest px-2 py-0.5 rounded bg-neutral-100 dark:bg-black/60 border border-neutral-300 dark:border-gold/30">
                Hover: Paused
              </span>
            )}
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-white dark:bg-black/60 border border-neutral-300 dark:border-gold/30 text-[#8B6508] dark:text-gold hover:bg-gold hover:text-black transition-all shadow"
              aria-label="Previous Slide Page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="px-3 py-1 rounded-full bg-white dark:bg-black/60 border border-neutral-300 dark:border-gold/20 text-xs font-mono text-[#8B6508] dark:text-gold">
              {slidePage + 1} / {maxPages}
            </div>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-white dark:bg-black/60 border border-neutral-300 dark:border-gold/30 text-[#8B6508] dark:text-gold hover:bg-gold hover:text-black transition-all shadow"
              aria-label="Next Slide Page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 4-Item Slideshow Grid with ProductCard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-opacity duration-300">
          {displayedProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>

        {/* Carousel Progress Dots */}
        <div className="flex items-center justify-center gap-2 mt-8 pt-4 border-t border-neutral-200 dark:border-gold/15">
          {Array.from({ length: maxPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSlidePage(idx);
                setProgress(0);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === slidePage
                  ? 'w-10 bg-gradient-to-r from-gold to-amber-300 shadow-[0_0_10px_rgba(212,175,55,0.6)]'
                  : 'w-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-500'
              }`}
              aria-label={`Go to slide page ${idx + 1}`}
            />
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-8 p-4 rounded-2xl bg-white dark:bg-black/70 border border-neutral-200 dark:border-gold/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-800 dark:text-neutral-300 shadow-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#8B6508] dark:text-gold flex-shrink-0" />
            <span>
              All 48 designs in this category are certified 925 sterling silver hallmarked under UAE standards and in stock for immediate dispatch.
            </span>
          </div>

          <a
            href={activeCollectionObj.collectionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#8B6508] dark:text-gold font-bold hover:underline flex items-center gap-1 whitespace-nowrap"
          >
            <span>Open {activeCollectionName} on omniastores.com</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
