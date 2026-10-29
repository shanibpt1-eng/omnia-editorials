'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ExternalLink, Sparkles, BookOpen, Crown } from 'lucide-react';
import { EDITORIAL_ARTICLES } from '../data/editorial-feed';
import { generateAffiliateUrl } from '../lib/affiliateEngine';
import { useLuxury } from './ThemeProvider';
import { getPublicationLabel } from '../lib/productLocalization';

// Synchronized Slide Metadata Matching Actual EDITORIAL_ARTICLES (5 Slides)
const SLIDE_TABS = [
  { label: 'Diamond Cascades', labelAr: 'شلالات الألماس', sub: 'Gala Nocturne', subAr: 'سهرة ملكية' },
  { label: 'Ruby Statements', labelAr: 'فخامة الياقوت', sub: 'Gala Crimson', subAr: 'قرمزي السهرات' },
  { label: 'Emerald Grandeur', labelAr: 'عظمة الزمرد', sub: 'Imperial Suite', subAr: 'طقم إمبراطوري' },
  { label: 'Diamond Radiance', labelAr: 'إشراقة الألماس', sub: 'Bridal High Glamour', subAr: 'أعراس راقية' },
  { label: 'Canary Yellow', labelAr: 'الأصفر الكناري', sub: 'High Carat Radiance', subAr: 'بريق عالي القيراط' },
];

export function HeroSlider() {
  const { formatPrice, language } = useLuxury();
  const isAr = language === 'ar';

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slides = EDITORIAL_ARTICLES.slice(0, 5);
  const SLIDE_DURATION = 6500;

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const active = slides[current] || slides[0];

  if (!active) return null;

  // 100% Arabic Translation Resolution (No mixed English words in Arabic mode)
  const slideTitle = isAr
    ? (active.titleAr || 'تشكيلة المجوهرات الملكية الفاخرة من أمنية ستورز')
    : active.title;

  const slideExcerpt = isAr
    ? (active.excerptAr || 'تشكيلة حصرية من الفضة الإسترلينية الخالصة عيار 925 المرصعة بمحاكاة الألماس الفاخر والمختومة من مختبر دبي المركزي.')
    : active.excerpt;

  const slidePub = getPublicationLabel(active.publication, isAr);
  
  const slideDate = isAr
    ? (active.dateAr || 'أكتوبر 2026')
    : (active.date || 'October 2026');

  const featuredProductTitle = isAr
    ? (active.featuredProduct?.titleAr || active.featuredProduct?.title || 'طقم المجوهرات الملكي الفاخر')
    : (active.featuredProduct?.title || 'Featured Imperial Suite');

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full min-h-[580px] sm:min-h-[620px] lg:min-h-[660px] xl:min-h-[700px] overflow-hidden border-b border-[#B8860B]/25 dark:border-gold/25 flex flex-col justify-between group bg-black"
    >
      {/* =========================================================================
          1. FULL-BLEED BACKGROUND IMAGE WITH DIRECTIONAL FLIP (ZERO TEXT COLLISION)
          - LTR (English): Model on the RIGHT, text on the LEFT
          - RTL (Arabic): Model flipped to the LEFT, Arabic text on the RIGHT
      ========================================================================== */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black">
        <Image
          key={active.id}
          src={active.coverImage}
          alt={slideTitle}
          fill
          priority
          unoptimized
          sizes="100vw"
          className={`object-cover transition-all duration-1000 ease-out ${
            isAr
              ? 'scale-x-[-1] object-left sm:object-left'
              : 'object-right sm:object-right'
          }`}
        />

        {/* Directional Luxury Gradients:
            - LTR: Deep black on Left 50% for pristine text contrast, transparent on Right for Model
            - RTL: Deep black on Right 50% for pristine Arabic contrast, transparent on Left for Model
        */}
        <div
          className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
            isAr
              ? 'bg-gradient-to-t from-black/95 via-black/80 to-black/40 sm:bg-gradient-to-l sm:from-black/95 sm:via-black/85 sm:via-45% lg:via-50% sm:to-transparent'
              : 'bg-gradient-to-t from-black/95 via-black/80 to-black/40 sm:bg-gradient-to-r sm:from-black/95 sm:via-black/85 sm:via-45% lg:via-50% sm:to-transparent'
          }`}
        />

        {/* Top Vignette for seamless header blending */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/85 via-black/30 to-transparent pointer-events-none" />

        {/* Bottom Vignette to anchor controls and navigation */}
        <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none" />

        {/* Ambient Gold Sparkle Glow */}
        <div
          className={`absolute top-1/4 ${isAr ? 'right-10' : 'left-10'} w-96 h-96 bg-[radial-gradient(circle,rgba(212,175,55,0.12)_0%,transparent_70%)] blur-[90px] pointer-events-none animate-pulse`}
        />
      </div>

      {/* =========================================================================
          2. EDITORIAL CONTENT OVERLAY (Dedicated text half with zero model overlap)
      ========================================================================== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-8 flex-1 flex flex-col justify-center w-full">
        <div className="max-w-xl lg:max-w-2xl space-y-4 sm:space-y-5">

          {/* Publication Badge & Live Date (100% Arabic in Arabic mode) */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-black/85 border border-gold/40 text-gold shadow-[0_0_20px_rgba(212,175,55,0.25)] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-spin" style={{ animationDuration: '6s' }} />
            <span className="font-bold">{slidePub} • {isAr ? 'تغطية خاصة' : 'SPECIAL FEATURE'}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-neutral-300 font-normal">{slideDate}</span>
          </div>

          {/* Editorial Headline */}
          <h1
            style={{ color: '#FFFFFF' }}
            className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tight leading-[1.18] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] stay-white"
          >
            {slideTitle}
          </h1>

          {/* Editorial Lead Excerpt */}
          <p
            style={{ color: '#E2E8F0' }}
            className="text-xs sm:text-sm lg:text-base text-neutral-200 leading-relaxed max-w-lg drop-shadow-md stay-white line-clamp-3 font-serif"
          >
            {slideExcerpt}
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            <Link
              href={`/trending/${active.slug}`}
              className="px-5 sm:px-6 py-3 rounded-full bg-gradient-to-r from-gold via-amber-300 to-[#AA8C2C] text-black font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 shadow-[0_0_25px_rgba(212,175,55,0.45)] hover:shadow-[0_0_35px_rgba(212,175,55,0.75)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>{isAr ? 'قراءة التحقيق والتقرير الكامل' : 'Read Full Report & AI Analysis'}</span>
            </Link>

            <a
              href={active.canonicalStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 sm:px-6 py-3 rounded-full backdrop-blur-md border border-gold/45 bg-black/60 text-gold hover:text-white hover:border-gold hover:bg-gold/20 font-semibold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2 transition-all shadow-md"
            >
              <span>{isAr ? 'تسوق الطقم الملكي' : 'Shop The Suite'}</span>
              <ExternalLink className="w-4 h-4 shrink-0" />
            </a>
          </div>

          {/* Featured Boutique Piece Pill */}
          {active.featuredProduct && (
            <div className="inline-flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-2xl backdrop-blur-md bg-black/85 border border-gold/40 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:border-gold/70 transition-all max-w-full">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-gold/30 flex-shrink-0 bg-neutral-900">
                <Image
                  src={active.featuredProduct.image}
                  alt={featuredProductTitle || active.featuredProduct.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col text-left rtl:text-right min-w-0">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-gold truncate">
                  {isAr ? 'قطعة مميزة من البوتيك' : 'Featured Boutique Piece'}
                </span>
                <span
                  style={{ color: '#FFFFFF' }}
                  className="text-xs font-semibold truncate max-w-[170px] sm:max-w-[240px] text-white stay-white"
                >
                  {featuredProductTitle}
                </span>
                <span className="text-xs font-bold font-mono text-gold">
                  {formatPrice(active.featuredProduct.priceAed, active.featuredProduct.priceSar)}
                </span>
              </div>
              <a
                href={generateAffiliateUrl({
                  baseUrl: active.featuredProduct.storeUrl,
                  source: 'hero_slider_featured',
                  medium: 'featured_boutique_pill',
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto sm:ml-2 rtl:ml-0 rtl:mr-auto px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 shadow-sm shrink-0 bg-gold/20 hover:bg-gold hover:text-black border border-gold/40 text-gold"
              >
                <span>{isAr ? 'تسوق' : 'Shop'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

        </div>
      </div>

      {/* =========================================================================
          3. BOTTOM CAROUSEL TABS & CONTROLS (100% Arabic when isAr is true)
      ========================================================================== */}
      <div className="relative z-10 w-full border-t border-gold/20 bg-black/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">

          {/* Interactive Campaign Slide Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            {slides.map((s, idx) => {
              const isTabActive = idx === current;
              const meta = SLIDE_TABS[idx] || { label: `Slide 0${idx + 1}`, labelAr: `شريحة 0${idx + 1}`, sub: '', subAr: '' };
              return (
                <button
                  key={s.id}
                  onClick={() => setCurrent(idx)}
                  className={`px-3.5 py-2 rounded-xl text-left rtl:text-right transition-all duration-300 flex items-center gap-2.5 border whitespace-nowrap flex-shrink-0 ${
                    isTabActive
                      ? 'bg-gold/20 border-gold text-gold shadow-[0_0_15px_rgba(212,175,55,0.3)] font-semibold'
                      : 'border-white/10 hover:border-gold/40 text-neutral-400 hover:text-white bg-black/40'
                  }`}
                >
                  <span className={`text-[10px] font-mono ${isTabActive ? 'text-gold' : 'text-neutral-500'}`}>
                    0{idx + 1}
                  </span>
                  <div className="flex flex-col text-left rtl:text-right">
                    <span className="text-xs uppercase tracking-wider font-bold">
                      {isAr ? meta.labelAr : meta.label}
                    </span>
                    <span className="text-[9px] font-serif text-neutral-400">
                      {isAr ? meta.subAr : meta.sub}
                    </span>
                  </div>
                  {isTabActive && <Crown className="w-3 h-3 text-gold shrink-0 animate-pulse" />}
                </button>
              );
            })}
          </div>

          {/* Arrows & Counter */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-neutral-400 hidden sm:inline">
              0{current + 1} / 0{slides.length}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={prevSlide}
                aria-label="Previous editorial slide"
                className="p-2 rounded-full bg-black/80 border border-gold/30 text-gold hover:bg-gold hover:text-black transition-all shadow-md active:scale-95"
              >
                <ChevronLeft className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
              </button>

              <button
                onClick={nextSlide}
                aria-label="Next editorial slide"
                className="p-2 rounded-full bg-black/80 border border-gold/30 text-gold hover:bg-gold hover:text-black transition-all shadow-md active:scale-95"
              >
                <ChevronRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

        </div>

        {/* Real-Time Animated Slide Progress Countdown Bar at the very bottom */}
        <div className="w-full h-1 flex bg-white/10">
          {slides.map((_, idx) => (
            <div key={idx} className="flex-1 relative overflow-hidden">
              {idx === current && (
                <div
                  key={`progress-${current}-${isPaused ? 'paused' : 'running'}`}
                  className={`h-full bg-gradient-to-r from-gold via-amber-300 to-gold ${
                    isPaused ? 'w-full opacity-60' : ''
                  }`}
                  style={{
                    animation: isPaused ? 'none' : 'heroProgress 6.5s linear forwards',
                    width: isPaused ? '50%' : undefined,
                  }}
                />
              )}
              {idx < current && <div className="h-full w-full bg-gold/50" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
