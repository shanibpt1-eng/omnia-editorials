'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  ShoppingBag,
  ArrowUpRight,
  ExternalLink,
  Crown,
  ShieldCheck,
  Sparkles,
  Eye,
  X,
  Truck,
  CheckCircle2,
  Link2,
} from 'lucide-react';
import {
  MAGAZINE_SHOPPING_EDIT,
  OMNIA_ATELIER_BLOGS,
  MagazineShoppingItem,
} from '../../data/magazine-editions-data';
import { LUXURY_PRODUCTS, CATEGORIES } from '../../data/luxury-products';
import { ProductCard } from '../../components/ProductCard';
import { SeoHead } from '../../components/SeoHead';
import { useLuxury } from '../../components/ThemeProvider';

type StudioFilterGroup = 'all' | 'bridal' | 'rings' | 'gold-studio' | 'chokers';

const STUDIO_FILTERS: { id: StudioFilterGroup; labelEn: string; labelAr: string }[] = [
  { id: 'all', labelEn: 'All Studio Editions (24)', labelAr: 'كافة الإصدارات (24)' },
  { id: 'bridal', labelEn: 'Bridal & Lace Parures', labelAr: 'أطقم العرائس والدانتيل' },
  { id: 'rings', labelEn: 'Paraiba & Cocktail Rings', labelAr: 'خواتم الباريبا والكوكتيل' },
  { id: 'gold-studio', labelEn: '18K Gold & Rose Gold', labelAr: 'الذهب الأصفر والوردي' },
  { id: 'chokers', labelEn: 'Chokers & Pearl Collars', labelAr: 'أطواق التشوكر واللؤلؤ' },
];

function classifyStudioItem(item: MagazineShoppingItem): StudioFilterGroup {
  const hay = `${item.id} ${item.badgeEn} ${item.nameEn} ${item.url}`.toLowerCase();
  if (/(ring|paraiba|cocktail|ruby-oval|cushion)/.test(hay)) return 'rings';
  if (/(bridal|parasol|camellia|vintage-car|marquise-suite)/.test(hay)) return 'bridal';
  if (/(choker|collar|pearl-lattice|bow|parisian)/.test(hay)) return 'chokers';
  return 'gold-studio';
}

export default function ProductsCataloguePage() {
  const { language, currency } = useLuxury();
  const isAr = language === 'ar';

  const [studioGroup, setStudioGroup] = useState<StudioFilterGroup>('all');
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<'featured' | 'asc' | 'desc'>('featured');
  const [quickViewItem, setQuickViewItem] = useState<MagazineShoppingItem | null>(null);
  const [archiveCategory, setArchiveCategory] = useState<string>('All');
  const [showFullArchive, setShowFullArchive] = useState<boolean>(false);

  const mult = currency === 'SAR' ? 1.02 : 1;
  const currLabel = currency === 'SAR' ? (isAr ? 'ر.س' : 'SAR') : (isAr ? 'د.إ' : 'AED');
  const formatAmt = (aed: number) => `${Math.round(aed * mult).toLocaleString()} ${currLabel}`;

  const filteredStudioItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = MAGAZINE_SHOPPING_EDIT.filter((item) => {
      const groupOk = studioGroup === 'all' || classifyStudioItem(item) === studioGroup;
      const searchOk =
        !q ||
        item.nameEn.toLowerCase().includes(q) ||
        item.specEn.toLowerCase().includes(q) ||
        item.badgeEn.toLowerCase().includes(q) ||
        item.nameAr.includes(q);
      return groupOk && searchOk;
    });

    if (sortOrder === 'asc') {
      list = [...list].sort((a, b) => a.priceAed - b.priceAed);
    } else if (sortOrder === 'desc') {
      list = [...list].sort((a, b) => b.priceAed - a.priceAed);
    }
    return list;
  }, [studioGroup, search, sortOrder]);

  const filteredArchive = useMemo(() => {
    const q = search.trim().toLowerCase();
    return LUXURY_PRODUCTS.filter((p) => {
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q);
      const matchCat = archiveCategory === 'All' || p.category === archiveCategory;
      return matchSearch && matchCat;
    });
  }, [search, archiveCategory]);

  const displayedArchive = showFullArchive ? filteredArchive : filteredArchive.slice(0, 8);

  return (
    <>
      <SeoHead pageType="product" />

      {/* PURE GALLERY-WHITE LUXURY STOREFRONT CANVAS */}
      <div
        className={`min-h-screen bg-white text-[#111318] ${isAr ? 'font-arabic text-right' : 'text-left'}`}
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {/* 1. CLEAN WHITE BOUTIQUE HEADER + VIP TRUST RIBBON */}
        <div className="border-b border-[#EAE3D5] bg-gradient-to-b from-[#FAF8F4] to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em]">
                  <span className="px-2.5 py-1 bg-[#111318] text-[#D4AF37] font-bold">
                    OMNIA STORES FLAGSHIP
                  </span>
                  <span className="text-[#8B6508] font-bold">
                    {isAr ? 'فضة 925 معتمدة من مختبر دبي المركزي' : 'DCL-ASSAYED 925 SILVER • TRIPLE ITALIAN RHODIUM'}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-[#111318] leading-[1.08]">
                  {isAr
                    ? 'معرض منتجات أمنية ستورز الفاخرة — التشكيلة الرسمية'
                    : 'Omnia Stores High Jewellery & Bridal Lookbook Catalogue'}
                </h1>

                <p className="text-sm sm:text-base text-neutral-600 font-serif leading-relaxed max-w-2xl">
                  {isAr
                    ? 'تصفحي أطقم الزفاف الملكية، خواتم الباريبا والياقوت، تشكيلات الذهب والذهب الوردي عيار 18، وأطواق اللؤلؤ مع توصيل خلال 24 ساعة في الإمارات والخليج.'
                    : 'Explore bridal pearl parures, Paraiba emerald cocktail rings, sculptural 18K gold vermeil studios, and Parisian chokers — direct from omniastores.com with VIP privilege code OMNIA-VIP15 (15% Off).'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <div className="px-4 py-2.5 rounded-xl border border-[#EAE3D5] bg-white shadow-sm flex items-center gap-2 text-xs font-mono">
                  <Truck className="w-4 h-4 text-[#8B6508]" />
                  <span className="font-bold text-[#111318]">
                    {isAr ? 'توصيل 24 ساعة وتقسيط تابي 4x' : '24h UAE Courier • Tabby 4x'}
                  </span>
                </div>
                <a
                  href="https://omniastores.com/collections/all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-[#111318] text-white hover:bg-[#8B6508] text-xs font-mono font-bold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>{isAr ? 'تسوق على omniastores.com' : 'Visit omniastores.com'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* 2. INFINITE HORIZONTAL AUTO-SCROLLING BOUTIQUE STRIP */}
          <div className="border-t border-[#EAE3D5] bg-white py-5 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em]">
              <span className="font-bold text-[#8B6508] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAr ? 'شريط العرض المستمر لأحدث القطع' : 'LIVE CONTINUOUS BOUTIQUE SHOWCASE — HOVER TO PAUSE'}</span>
              </span>
              <span className="text-neutral-500">{MAGAZINE_SHOPPING_EDIT.length} Studio Lookbook Drops</span>
            </div>

            <div className="w-full overflow-hidden">
              <div className="flex items-stretch gap-4 w-max animate-ticker pause-hover px-4">
                {[...MAGAZINE_SHOPPING_EDIT.slice(8, 22), ...MAGAZINE_SHOPPING_EDIT.slice(8, 22)].map((item, idx) => (
                  <button
                    key={`${item.id}-${idx}`}
                    type="button"
                    onClick={() => setQuickViewItem(item)}
                    className="w-44 sm:w-52 shrink-0 text-left rtl:text-right rounded-2xl border border-[#EAE3D5] bg-[#FAF8F4] hover:border-[#B8860B] overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="relative aspect-[5/6] w-full overflow-hidden bg-white">
                      <Image
                        src={item.image}
                        alt={isAr ? item.nameAr : item.nameEn}
                        fill
                        unoptimized
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-3 space-y-1">
                      <span className="text-[8px] font-mono font-bold text-[#8B6508] uppercase tracking-wider block truncate">
                        {isAr ? item.badgeAr : item.badgeEn}
                      </span>
                      <p className="text-xs font-serif font-bold text-[#111318] truncate">
                        {isAr ? item.nameAr : item.nameEn}
                      </p>
                      <span className="text-[11px] font-mono font-bold text-[#111318] block">
                        {formatAmt(item.priceAed)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. STICKY WHITE FILTER, SEARCH & SORT RIBBON */}
        <div className="sticky top-[62px] sm:top-[74px] z-30 bg-white/95 backdrop-blur-md border-b border-[#EAE3D5] shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 lg:pb-0">
              {STUDIO_FILTERS.map((flt) => {
                const active = studioGroup === flt.id;
                return (
                  <button
                    key={flt.id}
                    type="button"
                    onClick={() => setStudioGroup(flt.id)}
                    className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer border ${
                      active
                        ? 'bg-[#111318] text-[#D4AF37] border-[#111318] shadow-sm'
                        : 'bg-[#FAF8F4] text-neutral-700 border-[#EAE3D5] hover:border-[#B8860B]'
                    }`}
                  >
                    {isAr ? flt.labelAr : flt.labelEn}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0 w-full lg:w-auto">
              <div className="relative flex-1 sm:w-60">
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={isAr ? 'ابحث عن قطعة، لؤلؤ، باريبا، ذهب...' : 'Search Paraiba, Bridal, Gold, Rings...'}
                  className="w-full pl-8 pr-3 py-2 sm:py-1.5 rounded-full border border-[#EAE3D5] bg-[#FAF8F4] text-xs font-mono text-[#111318] placeholder-neutral-400 focus:outline-none focus:border-[#B8860B]"
                />
              </div>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'featured' | 'asc' | 'desc')}
                aria-label="Sort products"
                className="w-full sm:w-auto px-3.5 py-2 sm:py-1.5 rounded-full border border-[#EAE3D5] bg-[#FAF8F4] text-[11px] font-mono font-bold text-[#111318] focus:outline-none focus:border-[#B8860B] cursor-pointer"
              >
                <option value="featured">{isAr ? 'المختارات الأولى' : 'Sort: Curated Order'}</option>
                <option value="asc">{isAr ? 'السعر: الأقل أولاً' : 'Price: Low → High'}</option>
                <option value="desc">{isAr ? 'السعر: الأعلى أولاً' : 'Price: High → Low'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* 4. PRIMARY WHITE EDITORIAL PRODUCT GALLERY (STARTS WITH YOUR PREFERRED CARD STYLE!) */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
          <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EAE3D5] pb-3">
              <div className="flex items-center gap-2 text-xs font-mono font-extrabold uppercase tracking-[0.18em] text-[#111318]">
                <Crown className="w-4 h-4 text-[#B8860B]" />
                <span>
                  {isAr ? 'الإصدارات المختارة الفاخرة (تشكيلة 2026–2027)' : 'SIGNATURE OMNIA STUDIO & BRIDAL EDITIONS'}
                </span>
              </div>
              <span className="text-[11px] font-mono text-neutral-500">
                {filteredStudioItems.length} {isAr ? 'قطع متوفرة للشحن السريع' : 'Unique Luxury Drops Ready'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredStudioItems.map((prod) => (
                <div
                  key={prod.id}
                  className="group border border-[#EAE3D5] bg-[#FAF8F4] hover:border-[#B8860B] hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden rounded-2xl"
                >
                  <div
                    onClick={() => setQuickViewItem(prod)}
                    className="relative aspect-[5/6] w-full overflow-hidden bg-white cursor-pointer"
                  >
                    <Image
                      src={prod.image}
                      alt={isAr ? prod.nameAr : prod.nameEn}
                      fill
                      unoptimized
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-[#111318]/90 text-[#D4AF37] text-[9px] font-mono font-bold uppercase tracking-wider border border-[#D4AF37]/30">
                      {isAr ? prod.badgeAr : prod.badgeEn}
                    </span>
                    <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-white/95 text-[#111318] text-[9px] font-mono font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow">
                      <Eye className="w-3 h-3" />
                      <span>{isAr ? 'معاينة' : 'Quick View'}</span>
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                    <div className="space-y-1.5">
                      <h2
                        onClick={() => setQuickViewItem(prod)}
                        className="text-sm font-serif font-bold text-[#111318] leading-snug group-hover:text-[#8B6508] transition-colors cursor-pointer"
                      >
                        {isAr ? prod.nameAr : prod.nameEn}
                      </h2>
                      <p className="text-[11px] font-mono text-neutral-600 line-clamp-2">
                        {isAr ? prod.specAr : prod.specEn}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-[#EAE3D5] flex items-center justify-between text-xs">
                      <span className="font-mono font-bold text-[#8B6508]">{formatAmt(prod.priceAed)}</span>
                      <a
                        href={prod.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-bold uppercase tracking-wider text-[10px] text-[#111318] hover:text-[#8B6508] flex items-center gap-1"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>{isAr ? 'تسوق' : 'SHOP'}</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. ILLUSTRATED ATELIER BLOGS (SCREENSHOT #2 WHITE-CREAM EDITORIAL PAIRING) */}
          <section className="space-y-6">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[#EAE3D5] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8B6508] font-bold block">
                  {isAr ? 'مدونة أمنية ستورز • تنسيق الموضة والأحجار' : 'ATELIER STYLE JOURNAL • SHOP THE STORY'}
                </span>
                <h2 className="text-xl sm:text-3xl font-serif font-black text-[#111318] mt-0.5">
                  {isAr ? 'مقالات وتنسيقات التشكيلات على خلفية تحريرية' : 'Studio Craft Dossiers & Styling Guides'}
                </h2>
              </div>
              <Link href="/magazine" className="text-xs font-mono font-bold text-[#8B6508] hover:underline">
                {isAr ? 'فتح المجلة الكاملة ←' : 'Open Digital Magazine →'}
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {OMNIA_ATELIER_BLOGS.map((blog) => (
                <article
                  key={blog.id}
                  className="rounded-2xl border border-[#EAE3D5] bg-[#FAF8F4] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#B8860B] transition-all flex flex-col justify-between"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-12">
                    <Link
                      href={`/magazine/article/${blog.slug}`}
                      className="sm:col-span-5 relative aspect-[4/5] sm:aspect-auto min-h-[250px] bg-white overflow-hidden block group"
                    >
                      <Image
                        src={blog.coverImage}
                        alt={isAr ? blog.titleAr : blog.titleEn}
                        fill
                        unoptimized
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                    </Link>

                    <div className="sm:col-span-7 p-5 flex flex-col justify-between gap-3">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2 text-[9px] font-mono">
                          <span className="px-2 py-0.5 rounded bg-[#111318] text-white font-bold">
                            {isAr ? blog.categoryAr : blog.categoryEn}
                          </span>
                          <span className="text-neutral-500">
                            {blog.date} • {blog.readTime}
                          </span>
                        </div>

                        <Link href={`/magazine/article/${blog.slug}`} className="block group">
                          <h3 className="text-lg font-serif font-bold leading-snug text-[#111318] group-hover:underline">
                            {isAr ? blog.titleAr : blog.titleEn}
                          </h3>
                        </Link>

                        <p className="text-xs text-neutral-600 font-serif leading-relaxed line-clamp-3">
                          {isAr ? blog.excerptAr : blog.excerptEn}
                        </p>
                      </div>

                      <div className="grid grid-cols-3 gap-2 pt-1">
                        {blog.galleryImages.map((gImg, idx) => (
                          <a
                            key={gImg}
                            href={blog.backlinkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative aspect-square rounded-lg overflow-hidden border border-[#EAE3D5] bg-white group"
                          >
                            <Image
                              src={gImg}
                              alt={`Atelier look ${idx + 1}`}
                              fill
                              unoptimized
                              className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                            />
                          </a>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-[#EAE3D5] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono">
                        <Link
                          href={`/magazine/article/${blog.slug}`}
                          className="font-bold text-[#111318] hover:text-[#8B6508] inline-flex items-center gap-1"
                        >
                          <span>{isAr ? 'قراءة المدونة كاملة' : 'Read Blog Post'}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                        <a
                          href={blog.backlinkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-[#8B6508] hover:underline inline-flex items-center gap-1"
                        >
                          <span>omniastores.com</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* 6. COMPLETE MIRRORED OMNIASTORES.COM CATALOGUE ARCHIVE */}
          <section className="space-y-6 pt-4 border-t border-[#EAE3D5]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8B6508] font-bold block">
                  {isAr ? 'أرشيف الكتالوج المتزامن الكامل' : 'COMPLETE SYNCHRONIZED OMNIA CATALOGUE'}
                </span>
                <h2 className="text-xl sm:text-3xl font-serif font-black text-[#111318] mt-0.5">
                  {isAr ? 'كافة الفئات المتوفرة على omniastores.com' : `All ${LUXURY_PRODUCTS.length} Mirrored Boutique Pieces`}
                </h2>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
                {['All', ...CATEGORIES].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setArchiveCategory(cat)}
                    className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold whitespace-nowrap transition-colors cursor-pointer border ${
                      archiveCategory === cat
                        ? 'bg-[#111318] text-white border-[#111318]'
                        : 'bg-[#FAF8F4] text-neutral-700 border-[#EAE3D5] hover:border-[#B8860B]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedArchive.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredArchive.length > 8 && (
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setShowFullArchive((v) => !v)}
                  className="px-6 py-3 rounded-full border border-[#111318] text-[#111318] hover:bg-[#111318] hover:text-white text-xs font-mono font-bold uppercase tracking-[0.18em] transition-colors cursor-pointer"
                >
                  {showFullArchive
                    ? (isAr ? 'عرض أقل' : 'Show Compact Archive')
                    : (isAr ? `عرض كافة المنتجات (${filteredArchive.length})` : `Load All ${filteredArchive.length} Synced Products`)}
                </button>
              </div>
            )}
          </section>

          {/* 7. VERIFIED GUARANTEE & BACKLINKS BANNER */}
          <section className="rounded-3xl border border-[#EAE3D5] bg-[#FAF8F4] p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-emerald-700">
                <ShieldCheck className="w-4 h-4" />
                <span>{isAr ? 'ضمان الفضة الخالصة عيار 925 وفحص مختبر دبي المركزي' : 'DCL-ASSAYED 925 SILVER GUARANTEE • CODE OMNIA-VIP15'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#111318]">
                {isAr
                  ? 'هل تبحثين عن طلب مخصص للزفاف أو الهدايا الرسمية في الخليج؟'
                  : 'Direct Boutique Fulfillment Across Dubai, Abu Dhabi, Riyadh & GCC'}
              </h3>
              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-mono text-neutral-600">
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Nickel-Free Hypoallergenic 925
                </span>
                <span className="inline-flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 24h Insured Courier
                </span>
                <span className="inline-flex items-center gap-1">
                  <Link2 className="w-3.5 h-3.5 text-[#8B6508]" /> Official Store: omniastores.com
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/brands/omnia-stores"
                className="px-5 py-3 rounded-xl border border-[#EAE3D5] bg-white hover:border-[#B8860B] text-xs font-mono font-bold text-[#111318]"
              >
                {isAr ? 'ملف العلامة الموثق' : 'Brand Verification'}
              </Link>
              <a
                href="https://omniastores.com/collections/bridal-sets"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-[#111318] text-[#D4AF37] hover:bg-[#8B6508] hover:text-white text-xs font-mono font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors shadow-md"
              >
                <span>{isAr ? 'زيارة متجر omniastores.com' : 'Shop on omniastores.com'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </section>
        </main>

        {/* QUICK-VIEW WHITE MARBLE BOUTIQUE MODAL */}
        {quickViewItem && (
          <div
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setQuickViewItem(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white text-[#111318] rounded-3xl border border-[#EAE3D5] shadow-2xl grid grid-cols-1 md:grid-cols-12 relative"
            >
              <button
                type="button"
                onClick={() => setQuickViewItem(null)}
                aria-label="Close modal"
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 border border-[#EAE3D5] hover:bg-[#111318] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="md:col-span-6 relative aspect-[4/3] md:aspect-[5/6] bg-[#FAF8F4]">
                <Image
                  src={quickViewItem.image}
                  alt={isAr ? quickViewItem.nameAr : quickViewItem.nameEn}
                  fill
                  unoptimized
                  className="object-cover object-center"
                />
              </div>

              <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between gap-6">
                <div className="space-y-3">
                  <span className="inline-block px-2.5 py-0.5 bg-[#111318] text-[#D4AF37] text-[9px] font-mono font-bold uppercase tracking-widest">
                    {isAr ? quickViewItem.badgeAr : quickViewItem.badgeEn}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-[#111318] leading-snug">
                    {isAr ? quickViewItem.nameAr : quickViewItem.nameEn}
                  </h3>
                  <p className="text-lg font-mono font-bold text-[#8B6508]">
                    {formatAmt(quickViewItem.priceAed)}
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-600 font-serif leading-relaxed border-t border-[#EAE3D5] pt-3">
                    {isAr ? quickViewItem.specAr : quickViewItem.specEn}
                  </p>
                  <p className="text-[11px] font-mono text-emerald-700 font-bold">
                    ✓ DCL 925 Certified • VIP Code: OMNIA-VIP15 (15% Off)
                  </p>
                </div>

                <div className="space-y-2.5">
                  <a
                    href={quickViewItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-5 rounded-xl bg-[#111318] text-[#D4AF37] hover:bg-[#8B6508] hover:text-white font-mono font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-lg"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{isAr ? 'إتمام الشراء في omniastores.com' : 'Acquire Now on omniastores.com'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <Link
                    href="/brands/omnia-stores"
                    className="w-full py-2.5 px-4 rounded-xl border border-[#EAE3D5] text-center text-[11px] font-mono font-bold text-[#111318] hover:border-[#B8860B] block"
                  >
                    {isAr ? 'مراجعة مواصفات الجودة والفحص' : 'Inspect DCL 925 Assay & Warranty'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
