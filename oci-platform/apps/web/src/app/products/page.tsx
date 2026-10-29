'use client';

import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Filter } from 'lucide-react';
import { LUXURY_PRODUCTS, CATEGORIES } from '../../data/luxury-products';
import { ProductCard } from '../../components/ProductCard';
import { SeoHead } from '../../components/SeoHead';
import { useLuxury } from '../../components/ThemeProvider';

export default function ProductsCataloguePage() {
  const { language } = useLuxury();
  const isAr = language === 'ar';
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...CATEGORIES];

  const getCategoryLabel = (name: string) => {
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

  const filteredProducts = useMemo(() => {
    return LUXURY_PRODUCTS.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.material.toLowerCase().includes(search.toLowerCase());

      const matchCat = selectedCategory === 'All' || p.category === selectedCategory;

      return matchSearch && matchCat;
    });
  }, [search, selectedCategory]);

  return (
    <>
      <SeoHead pageType="product" />

      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-[#8B6508] dark:text-gold text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#8B6508] dark:text-gold" />
            <span>{isAr ? 'الكتالوج الرسمي المعتمد • omniastores.com' : 'Official Flagship Catalogue • omniastores.com'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-neutral-950 dark:text-white mb-4">
            {isAr ? 'معرض المجوهرات الفاخرة من الفضة عيار 925' : 'Luxury 925 Sterling Silver Showcase'}
          </h1>
          <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-400 leading-relaxed">
            {isAr
              ? 'متزامن مباشرة مع مركز توزيع أمنية ستورز في دبي والرياض. أحجار محاكاة الألماس الفاخرة، لؤلؤ مياه عذبة طبيعي، ودرع حماية بالروديوم المقاوم للأكسدة.'
              : 'Directly synchronized with the Omnia Stores Dubai & Riyadh fulfillment center. Certified Premium Simulated Diamonds, natural freshwater pearls, and rhodium anti-tarnish protection.'}
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="glass-panel p-5 rounded-2xl border border-neutral-200 dark:border-gold/25 mb-10 space-y-4 bg-white dark:bg-[#111520]/80 shadow-sm">
          <div className="relative">
            <Search className="w-4 h-4 text-[#8B6508] dark:text-gold absolute left-4 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                isAr
                  ? 'ابحث في أطقم الأعراس، مجوهرات اللؤلؤ، أساور التنس، فضة عيار 925...'
                  : 'Search bridal sets, pearl suites, tennis bracelets, 925 silver...'
              }
              className="w-full pl-11 pr-4 py-3 bg-neutral-100 dark:bg-black/60 border border-neutral-300 dark:border-gold/25 rounded-xl text-sm text-neutral-950 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-[#B8860B] dark:focus:border-gold transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs uppercase tracking-wider text-neutral-700 dark:text-neutral-400 mr-2 flex items-center gap-1">
              <Filter className="w-3 h-3 text-[#8B6508] dark:text-gold" /> {isAr ? 'تصفية التشكيلة:' : 'Filter Collection:'}
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-gold text-black font-bold shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                    : 'bg-neutral-100 dark:bg-black/40 text-neutral-800 dark:text-neutral-400 hover:text-black dark:hover:text-white border border-neutral-300 dark:border-gold/20'
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400 mb-6 px-1">
          <span>
            {isAr
              ? `عرض ${filteredProducts.length} قطعة متزامنة من omniastores.com`
              : `Showing ${filteredProducts.length} mirrored products from omniastores.com`}
          </span>
          <span className="text-[#8B6508] dark:text-gold font-mono font-medium">
            {isAr ? 'فضة إسترلينية أصلية 100% عيار 925' : '100% Certified 925 Silver'}
          </span>
        </div>

        {/* Grid of Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </>
  );
}
