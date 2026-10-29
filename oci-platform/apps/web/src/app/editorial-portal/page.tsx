'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  Search,
  Filter,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Award,
  BookOpen,
  Calendar,
  Clock,
  Download,
  Share2,
  Check,
  Maximize2,
  X,
  SlidersHorizontal,
  ChevronRight,
  FileText,
  Building2,
  Layers,
  ChevronLeft,
} from 'lucide-react';
import { useLuxury } from '../../components/ThemeProvider';
import { EDITORIAL_ARTICLES } from '../../data/editorial-feed';
import { OmniaStoresSkyscraperAd } from '../../components/OmniaStoresSkyscraperAd';
import { SeoHead } from '../../components/SeoHead';
import { getPublicationLabel } from '../../lib/productLocalization';

export default function EditorialPortalPage() {
  const { language } = useLuxury();
  const isAr = language === 'ar';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPublication, setSelectedPublication] = useState('all');
  const [activeModalArticle, setActiveModalArticle] = useState<any | null>(null);
  const [isSparkling, setIsSparkling] = useState(false);
  const [selectedSpread, setSelectedSpread] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const publications = [
    { id: 'all', nameEn: 'All Dossiers', nameAr: 'جميع النشرات' },
    { id: 'Vogue Arabia', nameEn: 'Vogue Arabia', nameAr: 'فوغ العربية' },
    { id: "Harper's Bazaar", nameEn: "Harper's Bazaar", nameAr: 'هاربرز بازار' },
    { id: 'Gulf News', nameEn: 'Gulf News', nameAr: 'جلف نيوز' },
    { id: 'Khaleej Times', nameEn: 'Khaleej Times', nameAr: 'خليج تايمز' },
    { id: 'The National', nameEn: 'The National', nameAr: 'ذا ناشيونال' },
  ];

  const filteredArticles = useMemo(() => {
    return EDITORIAL_ARTICLES.filter((art) => {
      const matchesPub =
        selectedPublication === 'all' || art.publication.toLowerCase().includes(selectedPublication.toLowerCase());
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        art.title.toLowerCase().includes(query) ||
        (art.titleAr && art.titleAr.toLowerCase().includes(query)) ||
        art.excerpt.toLowerCase().includes(query) ||
        (art.excerptAr && art.excerptAr.toLowerCase().includes(query)) ||
        art.publication.toLowerCase().includes(query);
      return matchesPub && matchesSearch;
    });
  }, [selectedPublication, searchQuery]);

  const triggerSparkleBurst = () => {
    setIsSparkling(true);
    setTimeout(() => setIsSparkling(false), 2000);
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className={`min-h-screen bg-[#FAF7F0] dark:bg-[#070A10] text-neutral-900 dark:text-neutral-100 font-sans selection:bg-gold selection:text-black ${isAr ? 'rtl' : 'ltr'}`}>
      <SeoHead
        title="Omnia Stores Official Editorial Portal 2026 • Accredited High Jewellery Bureau"
        description="Access certified Gulf broadsheet dossiers, laboratory XRF spectrometry assay verifications, and syndicated high jewellery features across Dubai and Riyadh."
        pageType="editorial"
      />

      {/* =========================================================================
          TOP COMMAND BAR & ACCREDITATION TICKER
      ========================================================================== */}
      <header className="sticky top-0 z-40 bg-[#FAF7F0]/95 dark:bg-[#090D15]/95 backdrop-blur-xl border-b border-gold/30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          
          {/* Left: Brand Identity & Portal Emblem */}
          <div className="flex items-center gap-3">
            <Link
              href="/editorials"
              className="flex items-center gap-2 group transition-transform active:scale-95"
              title={isAr ? 'العودة إلى صحيفة الغلاف' : 'Return to Broadsheet Edition'}
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-black border border-gold/50 flex items-center justify-center">
                <Image
                  src="/omnia-logo-white.png"
                  alt="Omnia Stores"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
              <div className="hidden sm:block leading-tight">
                <span className="font-serif font-black tracking-widest text-xs uppercase block text-neutral-950 dark:text-white group-hover:text-gold transition-colors">
                  OMNIA STORES
                </span>
                <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                  DUBAI • EDITORIAL PORTAL
                </span>
              </div>
            </Link>

            <div className="h-6 w-px bg-neutral-300 dark:bg-white/10 hidden md:block" />

            {/* Official Portal Gold Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold/70 bg-gradient-to-r from-[#DFB743] via-[#FCEAA5] to-[#C99E32] text-black shadow-sm font-serif font-black text-[10px] uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-black animate-spin" style={{ animationDuration: '6s' }} />
              <span>{isAr ? 'البوابة التحريرية المعتمدة' : 'EDITORIAL PORTAL'}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[8.5px] font-mono font-black bg-black text-[#F5E6BE] shadow-xs">
                2026
              </span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 hover:border-gold text-neutral-700 dark:text-neutral-300 transition-all text-[11px]"
              title="Share Portal Link"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedLink ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'مشاركة' : 'Share')}</span>
            </button>

            <Link
              href="/editorials"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 dark:bg-gold dark:hover:bg-gold-light text-white dark:text-black font-extrabold text-[11px] uppercase tracking-wider transition-all shadow-md"
            >
              <span>{isAr ? 'صحيفة الغلاف' : 'Broadsheet Edition'}</span>
              <ArrowRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
            </Link>
          </div>

        </div>
      </header>

      {/* =========================================================================
          HERO BANNER: OFFICIAL EDITORIAL DESK & SYNDICATION DIRECTORY
      ========================================================================== */}
      <section className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-gold/20 overflow-hidden bg-gradient-to-b from-[#FAF7F0] via-white to-[#F4EFE6] dark:from-[#090D15] dark:via-[#0E1320] dark:to-[#070A10]">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-[#8B6508] dark:text-gold text-xs font-mono font-bold uppercase tracking-widest">
            <Award className="w-3.5 h-3.5 text-gold" />
            <span>{isAr ? 'المكتب الإعلامي الموحد • اعتمادات دبي ومجلس التعاون' : 'Official Media Bureau • GCC & Dubai Assay Accredited'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-neutral-950 dark:text-white leading-[1.1]">
            {isAr ? 'البوابة التحريرية الرسمية لعام 2026' : 'Official Editorial Portal 2026'}
          </h1>

          <p className="max-w-3xl mx-auto text-sm sm:text-base font-serif text-neutral-600 dark:text-neutral-300 leading-relaxed">
            {isAr
              ? 'تغطيات تحريرية استقصائية، تقارير الفحص المخبري لأطقم الفضة الخالصة 925، ومحاكاة الألماس الفاخر بالشراكة مع فوغ العربية وهاربرز بازار وجلف نيوز.'
              : 'Investigative broadsheet dossiers, laboratory elemental assay standards for solid 925 sterling silver, and Premium Simulated Diamond optical verifications in syndication with premier GCC publications.'}
          </p>

          {/* Quick Metrics Bar */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-mono">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-white/5 border border-neutral-300 dark:border-white/10 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>{isAr ? 'فحص XRF الطيفي: 92.5% فضة نقية' : 'XRF Spectrometry: 92.5% Pure Silver'}</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-white/5 border border-neutral-300 dark:border-white/10 shadow-xs">
              <Sparkles className="w-4 h-4 text-gold" />
              <span>{isAr ? 'معامل الانكسار: 2.15 RI' : 'Refractive Fire: 2.15 RI'}</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-white/5 border border-neutral-300 dark:border-white/10 shadow-xs">
              <Clock className="w-4 h-4 text-sky-500" />
              <span>{isAr ? 'توصيل مؤمن خلال 24 ساعة' : '24-Hour Express Dispatch'}</span>
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE SEARCH & PUBLICATION FILTER BAR
      ========================================================================== */}
      <section className="sticky top-[57px] z-30 bg-[#FAF7F0]/95 dark:bg-[#070A10]/95 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800 py-3.5 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className={`absolute ${isAr ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'البحث في التحقيقات والتقارير المخبرية...' : 'Search investigations, lab assays, and press releases...'}
              className={`w-full ${isAr ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#0F1420] text-xs font-mono text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:border-gold`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className={`absolute ${isAr ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-white`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Publication Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {publications.map((pub) => (
              <button
                key={pub.id}
                onClick={() => setSelectedPublication(pub.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
                  selectedPublication === pub.id
                    ? 'bg-neutral-950 text-gold dark:bg-gold dark:text-black shadow-sm'
                    : 'bg-white dark:bg-[#0F1420] text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 hover:border-gold/50'
                }`}
              >
                {isAr ? pub.nameAr : pub.nameEn}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          MAIN DOSSIER GRID & COMMERCIAL ATELIER SHOWCASE
      ========================================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 8 Cols: Press Dossiers Grid */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between border-b-2 border-neutral-900 dark:border-gold pb-2">
              <h2 className="text-base sm:text-lg font-serif font-black uppercase tracking-wider text-neutral-950 dark:text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-gold" />
                <span>{isAr ? 'سجل النشرات الصحفية والتحقيقات' : 'Syndicated Investigations & Press Archive'}</span>
              </h2>
              <span className="text-xs font-mono text-neutral-500">
                {filteredArticles.length} {filteredArticles.length === 1 ? 'Article' : 'Articles'}
              </span>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#0E121B] border border-neutral-200 dark:border-neutral-800">
                <Search className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
                <p className="text-sm font-serif text-neutral-600 dark:text-neutral-400">
                  {isAr ? 'لم يتم العثور على نتائج مطابقة للبحث.' : 'No editorial dossiers match your current search criteria.'}
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedPublication('all');
                  }}
                  className="mt-3 px-4 py-1.5 rounded-lg bg-gold text-black font-mono font-bold text-xs"
                >
                  {isAr ? 'إعادة ضبط التصفية' : 'Reset Filters'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {filteredArticles.map((article) => (
                  <article
                    key={article.id}
                    onClick={() => setActiveModalArticle(article)}
                    className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0E121B] border border-neutral-200 dark:border-neutral-800 hover:border-gold/60 shadow-sm hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      {/* Publication & Date Bar */}
                      <div className="flex items-center justify-between text-[10px] font-mono font-bold text-neutral-500">
                        <span className="text-gold uppercase tracking-wider">{getPublicationLabel(article.publication, isAr)}</span>
                        <span>{article.readTime}</span>
                      </div>

                      {/* Image Thumbnail */}
                      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-black">
                        <Image
                          src={article.coverImage}
                          alt={article.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 360px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-white text-[9px] font-mono border border-white/10">
                          {isAr && article.categoryAr ? article.categoryAr : article.category}
                        </div>
                      </div>

                      {/* Title & Excerpt */}
                      <div className="space-y-1.5">
                        <h3 className="font-serif font-black text-sm sm:text-base text-neutral-950 dark:text-white group-hover:text-gold transition-colors leading-snug line-clamp-2">
                          {isAr && article.titleAr ? article.titleAr : article.title}
                        </h3>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 font-serif line-clamp-3 leading-relaxed">
                          {isAr && article.excerptAr ? article.excerptAr : article.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Footer Byline */}
                    <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-white/5 flex items-center justify-between text-[11px]">
                      <span className="text-neutral-500 font-serif italic truncate">
                        {isAr ? `بقلم: ${article.author?.name || 'محرري الصحيفة'}` : `By ${article.author?.name || 'Staff Editor'}`}
                      </span>
                      <span className="text-gold font-bold font-mono flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>{isAr ? 'قراءة التحقيق' : 'Read Full Story'}</span>
                        <ArrowRight className={`w-3 h-3 ${isAr ? 'rotate-180' : ''}`} />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* =========================================================================
                PRINT MAGAZINE SPREAD LIGHTBOX SECTION (FIXED WITH FULL ASPECT RATIO)
            ========================================================================== */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-neutral-100 via-white to-neutral-100 dark:from-[#0E121B] dark:via-[#131926] dark:to-[#0E121B] border-2 border-gold/40 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 dark:border-white/10 pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-gold block">
                    {isAr ? 'الأرشيف الطباعي الموثق' : 'VERIFIED PRINT SPREAD ARCHIVE'}
                  </span>
                  <h3 className="font-serif font-black text-lg sm:text-xl text-neutral-950 dark:text-white">
                    {isAr ? 'نشرة مجلة Bridal Grace Arabia — مجموعة أمنية ستورز' : 'Bridal Grace Arabia Official Broadsheet Spread'}
                  </h3>
                </div>
                <button
                  onClick={triggerSparkleBurst}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-gold-light active:scale-95 transition-all shadow-md self-start sm:self-auto"
                >
                  <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
                  <span>{isAr ? 'محاكاة البريق الماسي' : 'Simulate Sparkle'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Full Uncropped High-Resolution Broadsheet Specimen */}
                <div className="md:col-span-6 flex justify-center">
                  <div
                    onClick={() => setSelectedSpread('/press/inside-the-bridal-collection-july2026.jpg')}
                    className="relative w-full max-w-[320px] aspect-[792/1024] rounded-2xl overflow-hidden shadow-2xl border-2 border-gold/50 bg-black cursor-pointer group/specimen transition-all hover:scale-[1.02]"
                    title="Click to view full uncropped print scan"
                  >
                    <Image
                      src="/press/inside-the-bridal-collection-july2026.jpg"
                      alt="Bridal Grace Arabia Broadsheet Specimen"
                      fill
                      sizes="(max-width: 640px) 300px, 340px"
                      className={`object-contain object-top transition-transform duration-700 ${
                        isSparkling ? 'scale-105 rotate-0.5' : 'group-hover/specimen:scale-[1.02]'
                      }`}
                      priority
                    />
                    {isSparkling && (
                      <div className="absolute inset-0 bg-gold/25 backdrop-blur-[1px] rounded-2xl flex items-center justify-center animate-ping pointer-events-none">
                        <Sparkles className="w-12 h-12 text-gold animate-spin" />
                      </div>
                    )}
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-gold text-[10px] font-mono font-bold flex items-center gap-1.5 border border-gold/40 shadow-md">
                      <Maximize2 className="w-3 h-3" />
                      <span>{isAr ? 'تكبير النشرة كاملة' : 'Tap to Enlarge'}</span>
                    </div>
                  </div>
                </div>

                {/* Editorial Details & Assay Proof */}
                <div className="md:col-span-6 space-y-3 font-serif">
                  <div className="p-3.5 rounded-xl bg-white/70 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/10 space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-neutral-400 block">
                      {isAr ? 'بيانات النشر والاعتماد' : 'Publication & Hallmark Proof'}
                    </span>
                    <h4 className="text-sm font-bold text-neutral-900 dark:text-white leading-snug">
                      {isAr
                        ? 'أطقم الزفاف المصنوعة من الفضة الخالصة 925 مع طلاء الروديوم الإيطالي المقاوم للأكسدة'
                        : 'Bridal Grace Arabia: Rhodium-Plated Zircon Suites Designed For Statement Wedding Style'}
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {isAr
                        ? 'توثق النشرة معايير الصياغة الراقية لمجوهرات أمنية ستورز، حيث يتم ترصيع كل حجر بدقة متناهية لمنح العروس بريقاً لا مثيل له.'
                        : 'The full print scan documents the hand-set craftsmanship and optical dispersion benchmarks verified under Dubai Central Laboratories compliance.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                    <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-black/30 border border-neutral-200 dark:border-neutral-800">
                      <span className="text-neutral-400 block">{isAr ? 'المجلة' : 'Publication'}</span>
                      <span className="font-bold text-gold">Bridal Grace Arabia</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-black/30 border border-neutral-200 dark:border-neutral-800">
                      <span className="text-neutral-400 block">{isAr ? 'الاعتماد' : 'Certification'}</span>
                      <span className="font-bold text-emerald-400">DCL Assay Hallmarked</span>
                    </div>
                  </div>

                  <a
                    href="https://omniastores.com/collections/luxury-sets"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center py-2.5 rounded-xl bg-neutral-950 dark:bg-gold hover:bg-neutral-800 dark:hover:bg-gold-light text-white dark:text-black font-mono font-bold text-xs uppercase tracking-wider shadow-md transition-all"
                  >
                    {isAr ? 'تصفح أطقم المجوهرات الرسمية ↗' : 'Acquire Featured Bridal Suites ↗'}
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right 4 Cols: OmniaStoresSkyscraperAd + VIP Concierge Card */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* VIP Bureau Desk Notice */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FAF7F0] via-white to-gold/15 dark:from-[#0E121B] dark:via-[#111624] dark:to-gold/10 border-2 border-gold/40 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gold/20 border border-gold/50 shadow-sm">
                  <Building2 className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <span className="text-xs font-serif font-black uppercase tracking-wider text-neutral-950 dark:text-gold block">
                    {isAr ? 'مكتب التحرير المباشر' : 'EDITORIAL SYNDICATION'}
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">
                    {isAr ? 'بث فوري لأحدث التشكيلات 2026' : 'Live Syndication Desk 2026'}
                  </span>
                </div>
              </div>
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
            </div>

            {/* Official Commercial Skyscraper Ad with Actual Prices & -15% VIP Discount */}
            <OmniaStoresSkyscraperAd
              title={isAr ? 'OMNIASTORES.COM • عروض البوتيك' : 'OMNIASTORES.COM • BOUTIQUE OFFERS'}
            />

          </aside>

        </div>
      </main>

      {/* =========================================================================
          LIGHTBOX MODAL FOR FULL PRINT MAGAZINE SPREAD
      ========================================================================== */}
      {selectedSpread && (
        <div
          onClick={() => setSelectedSpread(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full max-h-[90vh] aspect-[792/1024] rounded-2xl overflow-hidden shadow-2xl border-2 border-gold/60 bg-black"
          >
            <button
              onClick={() => setSelectedSpread(null)}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-all shadow-md"
              title="Close Full Spread"
            >
              <X className="w-4 h-4" />
            </button>
            <Image
              src={selectedSpread}
              alt="Full Editorial Spread"
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}

      {/* =========================================================================
          ARTICLE READ MODAL
      ========================================================================== */}
      {activeModalArticle && (
        <div
          onClick={() => setActiveModalArticle(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 cursor-pointer overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl my-8 rounded-3xl bg-white dark:bg-[#0D111A] border-2 border-gold/50 shadow-2xl overflow-hidden cursor-default max-h-[90vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-black/40">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-gold text-black uppercase">
                  {getPublicationLabel(activeModalArticle.publication, isAr)}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  {activeModalArticle.readTime}
                </span>
              </div>
              <button
                onClick={() => setActiveModalArticle(null)}
                className="w-7 h-7 rounded-full bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 flex items-center justify-center transition-all"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <h2 className="text-xl sm:text-2xl font-serif font-black text-neutral-950 dark:text-white leading-tight">
                {isAr && activeModalArticle.titleAr ? activeModalArticle.titleAr : activeModalArticle.title}
              </h2>

              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/10 shadow-md bg-black">
                <Image
                  src={activeModalArticle.coverImage}
                  alt={activeModalArticle.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div
                className="prose dark:prose-invert font-serif text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300 max-w-none"
                dangerouslySetInnerHTML={{
                  __html: isAr && activeModalArticle.contentHtmlAr ? activeModalArticle.contentHtmlAr : activeModalArticle.contentHtml,
                }}
              />

              {activeModalArticle.canonicalStoreUrl && (
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-neutral-500 font-mono">
                    {isAr ? 'القطعة متوفرة حصرياً عبر المتجر الرسمي' : 'Piece available exclusively at Omnia Stores Boutique'}
                  </div>
                  <a
                    href={activeModalArticle.canonicalStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-xl bg-gold text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-gold-light shadow-md transition-all"
                  >
                    {isAr ? 'عرض الطقم في المتجر ↗' : 'Acquire Imperial Suite ↗'}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          FOOTER
      ========================================================================== */}
      <footer className="mt-16 border-t border-gold/30 bg-[#FAF7F0] dark:bg-[#070A10] py-8 px-4 text-center text-xs font-mono text-neutral-500">
        <div className="max-w-7xl mx-auto space-y-2">
          <p className="font-serif font-bold text-neutral-800 dark:text-neutral-300">
            OMNIA STORES DUBAI • OFFICIAL EDITORIAL PORTAL 2026
          </p>
          <p className="text-[10px] text-neutral-400">
            Accredited Syndication Desk • Verified Under Dubai Central Laboratories Elemental Assay Standards
          </p>
        </div>
      </footer>

    </div>
  );
}
