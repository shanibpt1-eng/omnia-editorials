'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, Sparkles, ShieldCheck, ExternalLink, Check } from 'lucide-react';
import { LUXURY_PRODUCTS } from '../data/luxury-products';
import { useLuxury } from './ThemeProvider';

export function ProductSlider() {
  const { formatPrice, currency, language } = useLuxury();
  const isAr = language === 'ar';
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    { en: 'All', ar: 'الكل' },
    { en: 'Bridal Suites', ar: 'أطقم الزفاف الملكية' },
    { en: 'Pearl Jewellery', ar: 'مجوهرات اللؤلؤ الطبيعي' },
    { en: 'Simulated Diamond', ar: 'محاكاة الألماس الفاخر' },
    { en: 'Tennis Jewellery', ar: 'أساور وقلائد التنس' },
    { en: 'Brooches & Accents', ar: 'البروشات والإكسسوارات' },
  ];

  const filteredProducts = activeCategory === 'All'
    ? LUXURY_PRODUCTS
    : LUXURY_PRODUCTS.filter((p) => p.category === activeCategory);

  const getCategoryLabel = (cat: string) => {
    if (!isAr) return cat;
    const found = categories.find((c) => c.en === cat);
    return found ? found.ar : cat;
  };

  const getBadgeLabel = (badge: string | undefined) => {
    if (!badge) return '';
    if (!isAr) return badge;
    const map: Record<string, string> = {
      'ROYAL BRIDAL': 'طقم زفاف ملكي',
      'PEARL LUXE': 'لؤلؤ ملكي فاخر',
      'VOGUE FEATURED': 'مختار في مجلة فوغ',
      'HIGH GLAMOUR': 'فخامة استثنائية',
      'BESTSELLER': 'الأكثر طلباً',
      'NEW ARRIVAL': 'وصل حديثاً',
      'LIMITED EDITION': 'إصدار محدود',
    };
    return map[badge.toUpperCase()] || badge;
  };

  return (
    <section
      className={`py-20 bg-[#F8F5EE] dark:bg-gradient-to-b dark:from-[#0A0D14] dark:via-[#0E121C] dark:to-[#0A0D14] border-y border-neutral-300 dark:border-gold/25 relative ${
        isAr ? 'font-arabic text-right' : ''
      }`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#8B6508] dark:text-gold font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#8B6508] dark:text-gold" />
              <span>{isAr ? 'مخزون دار أمنية ستورز المعتمد مباشرة' : 'Direct Omnia Stores Flagship Inventory'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-neutral-950 dark:text-white">
              {isAr ? 'روائع الفضة الإسترلينية عيار 925' : 'Featured 925 Sterling Silver Showcase'}
            </h2>
            <p className="text-sm text-neutral-700 dark:text-neutral-400 mt-2 max-w-xl">
              {isAr
                ? `أطقم إيطالية مرصعة يدوياً، لآلئ الخليج العربي المتألقة، وأحجار محاكاة الألماس البراقة. الأسعار محدثة ومربوطة بـ ${currency}.`
                : `Certified Italian prong-set suites, lustrous Gulf pearls, and radiant simulated diamonds. Live pricing synchronized in ${currency}.`}
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.en}
                onClick={() => {
                  setActiveCategory(cat.en);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all ${
                  activeCategory === cat.en
                    ? 'bg-gold text-black font-bold shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                    : 'bg-white dark:bg-black/40 text-neutral-800 dark:text-neutral-400 hover:text-black dark:hover:text-white border border-neutral-300 dark:border-gold/20'
                }`}
              >
                {isAr ? cat.ar : cat.en}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel / Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="group rounded-2xl overflow-hidden glass-panel border border-neutral-200 dark:border-gold/25 hover:border-[#B8860B]/60 dark:hover:border-gold/60 transition-all duration-300 flex flex-col justify-between bg-white dark:bg-[#111520] shadow-md dark:shadow-xl hover:shadow-lg dark:hover:shadow-[0_15px_35px_rgba(212,175,55,0.2)]"
            >
              {/* Product Visual with Hover Crossfade */}
              <div className="relative h-64 w-full overflow-hidden bg-black/90">
                {/* Primary Image */}
                <Image
                  src={prod.images[0] || '/press/inside-luxury-bridal-sets-feature.jpg'}
                  alt={prod.title}
                  fill
                  unoptimized
                  className="object-cover object-center transition-opacity duration-500 group-hover:opacity-0"
                />
                {/* Hover Image */}
                <Image
                  src={prod.images[1] || prod.images[0] || '/press/inside-luxury-bridal-sets-feature.jpg'}
                  alt={`${prod.title} Lifestyle Preview`}
                  fill
                  unoptimized
                  className="object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
                />

                {/* Stock Badge & Hallmarking Tag */}
                <div className={`absolute top-3 ${isAr ? 'right-3' : 'left-3'} flex flex-col gap-1.5 z-10`}>
                  {prod.badge && (
                    <span className="px-2.5 py-0.5 rounded-full bg-gold/90 text-black text-[10px] font-bold uppercase tracking-wider shadow">
                      {getBadgeLabel(prod.badge)}
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-gold/30 text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {isAr ? 'متوفر بالمخزون' : 'In Stock'}
                  </span>
                </div>

                <div className={`absolute top-3 ${isAr ? 'left-3' : 'right-3'} z-10`}>
                  <span className="px-2 py-0.5 rounded-md bg-black/80 border border-gold/30 text-[10px] text-gold font-mono">
                    {isAr ? 'فضة 925' : '925 SILVER'}
                  </span>
                </div>
              </div>

              {/* Product Specs & Pricing */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] text-neutral-600 dark:text-neutral-400 uppercase tracking-widest mb-1">
                    {getCategoryLabel(prod.category)}
                  </div>
                  <h3 className="text-sm font-serif font-bold text-neutral-950 dark:text-white group-hover:text-[#B8860B] dark:group-hover:text-gold transition-colors leading-snug line-clamp-2 mb-2">
                    {prod.title}
                  </h3>
                  
                  {/* Micro Specs List */}
                  <div className="space-y-1 mb-4">
                    {prod.specs.slice(0, 2).map((spec, i) => (
                      <div key={i} className="text-[11px] text-neutral-700 dark:text-neutral-400 flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-[#8B6508] dark:text-gold flex-shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="pt-3 border-t border-neutral-200 dark:border-gold/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block">
                      {isAr ? `السعر (${currency})` : `Price (${currency})`}
                    </span>
                    <span className="text-base font-bold text-[#8B6508] dark:text-gold font-mono">
                      {formatPrice(prod.priceAed, prod.priceSar)}
                    </span>
                  </div>

                  <a
                    href={prod.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-gold to-[#AA8C2C] text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:opacity-95 shadow-[0_0_12px_rgba(212,175,55,0.3)] transition-all transform hover:-translate-y-0.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{isAr ? 'شراء' : 'Buy'}</span>
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-14 p-6 rounded-2xl glass-panel border border-neutral-200 dark:border-gold/25 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left bg-white dark:bg-black/50 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-gold/15 border border-gold/40 text-gold flex-shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className={isAr ? 'text-right' : 'text-left'}>
              <h4 className="text-base font-serif font-bold text-neutral-950 dark:text-white">
                {isAr ? 'ضمان الأصالة المطلقة من أمنية ستورز' : 'Omnia Stores Guaranteed Authenticity'}
              </h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
                {isAr
                  ? 'كل قطعة تتضمن ختماً رسمياً بالفضة الإسترلينية 925، وفحص العيار بالليزر، وشهادة روديوم للحماية من التأكسد.'
                  : 'Every piece includes genuine 925 sterling silver hallmarking, laser assay validation, and anti-tarnish certification.'}
              </p>
            </div>
          </div>

          <a
            href="https://omniastores.com/collections/luxury-sets"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full border border-gold/50 text-gold hover:bg-gold hover:text-black font-semibold text-xs uppercase tracking-widest transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <span>{isAr ? 'استكشف كافة التشكيلة (+1,800 قطعة)' : 'Explore All 1,800+ Items'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
