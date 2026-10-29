'use client';

import React, { useState, useMemo } from 'react';
import { Search, ShieldCheck, ArrowUpRight, ExternalLink, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { LUXURY_PRODUCTS, CATEGORY_METADATA } from '../data/luxury-products';
import { ProductCard } from './ProductCard';
import { useLuxury } from './ThemeProvider';

export function MirroredProductCatalogue() {
  const { language } = useLuxury();
  const isAr = language === 'ar';
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const categories = [
    { name: 'All', count: LUXURY_PRODUCTS.length, collectionUrl: 'https://omniastores.com/collections/all' },
    ...CATEGORY_METADATA.map(c => ({
      name: c.name,
      count: c.count,
      collectionUrl: c.collectionUrl,
    }))
  ];

  const filteredProducts = useMemo(() => {
    return LUXURY_PRODUCTS.filter((prod) => {
      const matchSearch =
        prod.title.toLowerCase().includes(search.toLowerCase()) ||
        prod.material.toLowerCase().includes(search.toLowerCase()) ||
        prod.category.toLowerCase().includes(search.toLowerCase());

      const matchCat = selectedCat === 'All' || prod.category === selectedCat;

      return matchSearch && matchCat;
    });
  }, [search, selectedCat]);

  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, currentPage]);

  const activeCategoryObj = categories.find((c) => c.name === selectedCat) || categories[0] || { name: 'All', collectionUrl: 'https://omniastores.com' };

  const getCatLabel = (name: string) => {
    if (!isAr) return name;
    const map: Record<string, string> = {
      'All': 'الكل',
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

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 border-b border-gold/25 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold font-bold mb-2">
            <ShieldCheck className="w-4 h-4 text-gold" />
            <span>{isAr ? 'كتالوج المتجر الرسمي المباشر • omniastores.com' : 'Direct Flagship Mirror • omniastores.com'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-neutral-950 dark:text-white">
            {isAr ? 'كتالوج أمنية ستورز الكامل للمجوهرات' : 'Complete Mirrored Store Catalogue'}
          </h2>
          <p className="text-sm text-neutral-700 dark:text-neutral-400 mt-2 max-w-xl">
            {isAr
              ? 'مخزون مباشر متزامن مع omniastores.com. يحتوي على 48 قطعة معتمدة لكل تشكيلة (576 قطعة عبر 12 فئة) مع ختم فضة 925 موثق.'
              : 'Live inventory mirrored directly from omniastores.com. Exactly 48 certified products per main category (576 pieces across 12 categories) with verified 925 hallmarking.'}
          </p>
        </div>

        {/* Direct Link to Current Category on omniastores.com */}
        <a
          href={activeCategoryObj.collectionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold text-black font-bold text-xs uppercase tracking-widest hover:opacity-95 transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] shimmer-btn self-start lg:self-auto"
        >
          <span>{isAr ? `استعراض ${getCatLabel(selectedCat)} على omniastores.com` : `View ${selectedCat} on omniastores.com`}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel p-5 rounded-2xl border border-neutral-200 dark:border-gold/25 mb-10 space-y-4 bg-white dark:bg-[#111520]/80 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 text-[#8B6508] dark:text-gold absolute left-4 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={
              isAr
                ? 'ابحث في الأطقم الفاخرة، أطقم الأعراس، أساور التنس، مواصفات عيار 925...'
                : 'Search mirrored products by name, 925 silver specs, zircon cuts, pearls...'
            }
            className="w-full pl-11 pr-4 py-3 bg-neutral-100 dark:bg-black/60 border border-neutral-300 dark:border-gold/25 rounded-xl text-sm text-neutral-950 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-[#B8860B] dark:focus:border-gold transition-colors"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs uppercase tracking-wider text-neutral-700 dark:text-neutral-400 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#8B6508] dark:text-gold" /> {isAr ? 'الفئات:' : 'Categories:'}
          </span>
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => {
                setSelectedCat(cat.name);
                setCurrentPage(1);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                selectedCat === cat.name
                  ? 'bg-gold text-black font-bold shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                  : 'bg-neutral-100 dark:bg-black/50 text-neutral-800 dark:text-neutral-400 hover:text-black dark:hover:text-white border border-neutral-300 dark:border-gold/20'
              }`}
            >
              <span>{getCatLabel(cat.name)}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${selectedCat === cat.name ? 'bg-black/80 text-gold' : 'bg-gold/15 text-[#8B6508] dark:text-gold'}`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Pagination Status */}
      <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400 mb-6 px-1">
        <span>
          {isAr
            ? `عرض ${paginatedProducts.length} من أصل ${filteredProducts.length} قطعة (48 قطعة لكل تشكيلة)`
            : `Showing ${paginatedProducts.length} of ${filteredProducts.length} products (48 per category)`}
        </span>
        <span>
          {isAr
            ? `الصفحة ${currentPage} من ${totalPages || 1}`
            : `Page ${currentPage} of ${totalPages || 1}`}
        </span>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedProducts.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-10 mt-6 border-t border-neutral-200 dark:border-gold/20">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-xl bg-white dark:bg-black/60 border border-neutral-300 dark:border-gold/30 text-xs text-[#8B6508] dark:text-gold disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-sm"
          >
            <ChevronLeft className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            <span>{isAr ? 'السابق' : 'Previous'}</span>
          </button>
          <span className="text-xs text-neutral-700 dark:text-neutral-400 font-mono">
            {isAr ? `صفحة ${currentPage} من ${totalPages}` : `Page ${currentPage} of ${totalPages}`}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-xl bg-white dark:bg-black/60 border border-neutral-300 dark:border-gold/30 text-xs text-[#8B6508] dark:text-gold disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-sm"
          >
            <span>{isAr ? 'التالي' : 'Next'}</span>
            <ChevronRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
          </button>
        </div>
      )}

      {/* Cross-Domain Link to Flagship Storefront */}
      <div className="mt-14 text-center">
        <a
          href="https://omniastores.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-gold text-gold hover:bg-gold hover:text-black font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.7)]"
        >
          <span>{isAr ? 'استكشف جميع التشكيلات على المتجر الرئيسي omniastores.com' : 'Explore All Collections on omniastores.com'}</span>
          <ArrowUpRight className={`w-4 h-4 ${isAr ? 'rotate-[-90deg]' : ''}`} />
        </a>
      </div>
    </section>
  );
}
