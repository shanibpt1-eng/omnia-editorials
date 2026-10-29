'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Filter, Sparkles, ArrowRight, ExternalLink, Calendar, Clock, ShoppingBag } from 'lucide-react';
import { EDITORIAL_ARTICLES } from '../../data/editorial-feed';
import { autoInjectAffiliateLinks } from '../../lib/affiliateEngine';
import { AeoAnswerBox } from '../../components/AeoAnswerBox';
import { SeoHead } from '../../components/SeoHead';
import { useLuxury } from '../../components/ThemeProvider';

export default function TrendingEditorialHub() {
  const { language } = useLuxury();
  const isAr = language === 'ar';
  const [search, setSearch] = useState('');
  const [selectedPublication, setSelectedPublication] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeAeoArticleId, setActiveAeoArticleId] = useState<string | null>('art-vogue-2026');

  const publications = ['All', 'Vogue Arabia', 'Harper\'s Bazaar Arabia', 'Gulf News', 'Khaleej Times', 'The National', 'Business Lifestyle'];
  const categories = ['All', 'Luxury & Fashion', 'High Jewellery', 'Logistics & Tech', 'E-Commerce Trends', 'All GCC News'];

  const getPubLabel = (pub: string) => {
    if (!isAr) return pub;
    if (pub === 'All') return 'الكل';
    const map: Record<string, string> = {
      'Vogue Arabia': 'فوغ العربية',
      'Harper\'s Bazaar Arabia': 'هاربرز بازار العربية',
      'Gulf News': 'جلف نيوز',
      'Khaleej Times': 'خليج تايمز',
      'The National': 'ذا ناشيونال',
      'Business Lifestyle': 'بزنس لايف ستايل',
    };
    return map[pub] || pub;
  };

  const getCatLabel = (cat: string) => {
    if (!isAr) return cat;
    if (cat === 'All') return 'الكل';
    const map: Record<string, string> = {
      'Luxury & Fashion': 'الفخامة والموضة',
      'High Jewellery': 'المجوهرات الراقية',
      'Logistics & Tech': 'اللوجستيات والتقنية',
      'E-Commerce Trends': 'اتجاهات التجارة',
      'All GCC News': 'أخبار الخليج',
    };
    return map[cat] || cat;
  };

  const filteredArticles = useMemo(() => {
    return EDITORIAL_ARTICLES.filter((art) => {
      const matchSearch =
        art.title.toLowerCase().includes(search.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        art.publication.toLowerCase().includes(search.toLowerCase());

      const matchPub = selectedPublication === 'All' || art.publication === selectedPublication;
      const matchCat = selectedCategory === 'All' || art.category === selectedCategory;

      return matchSearch && matchPub && matchCat;
    });
  }, [search, selectedPublication, selectedCategory]);

  return (
    <>
      <SeoHead pageType="article" />

      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Page Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-[#8B6508] dark:text-gold text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#8B6508] dark:text-gold animate-spin" style={{ animationDuration: '6s' }} />
            <span>{isAr ? 'شبكة أمنية ستورز للتقارير الفاخرة والنشر الإقليمي' : 'GCC Luxury Intelligence & Editorial Syndication'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-neutral-950 dark:text-white mb-4">
            {isAr ? 'الأكثر رواجاً والنشرة الصحفية الموثقة' : 'Top Trending & Press Network'}
          </h1>
          <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-400 leading-relaxed max-w-2xl mx-auto">
            {isAr
              ? 'تقارير حية ومحدثة منشورة عبر جلف نيوز، خليج تايمز، فوغ العربية، هاربرز بازار، وذا ناشيونال، معززة بروابط الشراء المباشرة وصناديق إجابات الذكاء الاصطناعي AEO.'
              : "Real-time reporting syndicated across Gulf News, Khaleej Times, Vogue Arabia, Harper's Bazaar Arabia, and The National. Enhanced with dynamic product backlink insertion and AEO answer boxes."}
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="glass-panel p-5 rounded-2xl border border-neutral-200 dark:border-gold/25 mb-10 space-y-4 bg-white dark:bg-[#111520]/80 shadow-sm">
          <div className="relative">
            <Search className="w-4 h-4 text-[#8B6508] dark:text-gold absolute left-4 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={
                isAr
                  ? 'ابحث في تقارير الخليج الفاخرة، أطقم الأعراس، أختام الفحص، واللوجستيات...'
                  : 'Search GCC luxury reports, bridal trends, hallmarking, logistics...'
              }
              className="w-full pl-11 pr-4 py-3 bg-neutral-100 dark:bg-black/60 border border-neutral-300 dark:border-gold/25 rounded-xl text-sm text-neutral-950 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-[#B8860B] dark:focus:border-gold transition-colors"
            />
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-2">
            {/* Publication Filter Chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs uppercase tracking-wider text-neutral-700 dark:text-neutral-400 mr-2 flex items-center gap-1">
                <Filter className="w-3 h-3 text-[#8B6508] dark:text-gold" /> {isAr ? 'المصدر:' : 'Source:'}
              </span>
              {publications.map((pub) => (
                <button
                  key={pub}
                  onClick={() => setSelectedPublication(pub)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    selectedPublication === pub
                      ? 'bg-gold text-black font-bold shadow'
                      : 'bg-neutral-100 dark:bg-black/40 text-neutral-800 dark:text-neutral-400 hover:text-black dark:hover:text-white border border-neutral-300 dark:border-gold/20'
                  }`}
                >
                  {getPubLabel(pub)}
                </button>
              ))}
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs uppercase tracking-wider text-neutral-700 dark:text-neutral-400 mr-2">
                {isAr ? 'الفئة:' : 'Category:'}
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-gold text-black font-bold shadow'
                      : 'bg-neutral-100 dark:bg-black/40 text-neutral-800 dark:text-neutral-400 hover:text-black dark:hover:text-white border border-neutral-300 dark:border-gold/20'
                  }`}
                >
                  {getCatLabel(cat)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count & Parity Info */}
        <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400 mb-6 px-1">
          <span>{isAr ? `عرض ${filteredArticles.length} تقارير منشورة` : `Showing ${filteredArticles.length} syndicated reports`}</span>
          <span className="text-gold font-mono">{isAr ? 'العملة الرسمية: د.إ و ر.س' : 'Official Currency: AED & SAR'}</span>
        </div>

        {/* Magazine-Style Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((art) => {
            const hasAeoOpen = activeAeoArticleId === art.id;
            const articleTitle = isAr && art.titleAr ? art.titleAr : art.title;
            const rawExcerpt = isAr && art.excerptAr ? art.excerptAr : art.excerpt;
            const linkedExcerpt = autoInjectAffiliateLinks(rawExcerpt, art.publication);
            const articleCategory = isAr && art.categoryAr ? art.categoryAr : getCatLabel(art.category);
            const articleDate = isAr && art.dateAr ? art.dateAr : art.date;
            const articleReadTime = isAr && art.readTimeAr ? art.readTimeAr : (isAr ? art.readTime.replace('min read', 'دقائق قراءة') : art.readTime);
            const pubName = getPubLabel(art.publication);

            return (
              <article
                key={art.id}
                className="group flex flex-col rounded-3xl overflow-hidden glass-panel border border-neutral-200 dark:border-gold/20 hover:border-[#B8860B]/50 dark:hover:border-gold/50 transition-all duration-300 shadow-md dark:shadow-2xl bg-white dark:bg-[#111520]/85"
              >
                {/* Cover Image Container */}
                <div className="relative h-60 w-full overflow-hidden bg-black">
                  <Image
                    src={art.coverImage}
                    alt={articleTitle}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-gold/40 text-[11px] font-semibold text-gold uppercase shadow">
                      {pubName}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-neutral-300">
                      {articleCategory}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-[11px] text-neutral-300 font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-gold" /> {articleDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gold" /> {articleReadTime}
                    </span>
                  </div>
                </div>

                {/* Body with Dynamic Product Backlink Insertion */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* E-E-A-T Author Byline on Card */}
                    {art.author && (
                      <div className="flex items-center gap-2 mb-2 text-[11px] text-neutral-500 dark:text-neutral-400">
                        <span className="w-5 h-5 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-[9px] text-[#8B6508] dark:text-gold font-bold">
                          {art.author.name.charAt(0)}
                        </span>
                        <span className="text-neutral-900 dark:text-neutral-300 font-semibold dark:font-medium truncate max-w-[150px]">{art.author.name}</span>
                        <span className="text-gold/60">•</span>
                        <span className="text-[10px] text-[#8B6508] dark:text-gold font-mono font-medium">
                          {isAr ? `${art.author.experienceYears}+ سنة فحص` : `${art.author.experienceYears}+ Yrs Assay`}
                        </span>
                      </div>
                    )}

                    <h2 className="text-lg font-serif font-bold text-neutral-950 dark:text-white group-hover:text-[#B8860B] dark:group-hover:text-gold transition-colors leading-snug mb-3">
                      <Link href={`/trending/${art.slug}`}>{articleTitle}</Link>
                    </h2>

                    {/* Excerpt with injected contextual backlinks */}
                    <div
                      dangerouslySetInnerHTML={{ __html: linkedExcerpt }}
                      className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4"
                    />
                  </div>

                  {/* Toggle AEO Direct Answer Box */}
                  <div className="mt-2 pt-2">
                    <button
                      onClick={() => setActiveAeoArticleId(hasAeoOpen ? null : art.id)}
                      className="w-full text-left text-xs font-semibold text-gold hover:text-gold-light flex items-center justify-between py-1.5 border-t border-gold/15"
                    >
                      <span>
                        {hasAeoOpen 
                          ? (isAr ? '▲ إخفاء صندوق إجابة الذكاء الاصطناعي' : '▲ Hide Direct Answer Box') 
                          : (isAr ? '▼ استعراض إجابة الذكاء الاصطناعي AEO' : '▼ View AI Direct Answer Box')}
                      </span>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400">AEO Block</span>
                    </button>

                    {hasAeoOpen && (
                      <AeoAnswerBox
                        question={isAr ? `ما هي أهم الخلاصات المعتمدة من ${articleTitle}؟` : `What are the authoritative takeaways from ${art.title}?`}
                        takeaways={[
                          (isAr && art.aiSummary.takeaway1Ar) ? art.aiSummary.takeaway1Ar : art.aiSummary.takeaway1,
                          (isAr && art.aiSummary.takeaway2Ar) ? art.aiSummary.takeaway2Ar : art.aiSummary.takeaway2,
                          (isAr && art.aiSummary.takeaway3Ar) ? art.aiSummary.takeaway3Ar : art.aiSummary.takeaway3,
                        ]}
                        citationSource={isAr && art.citationTextAr ? art.citationTextAr : art.citationText}
                        citationUrl={art.originalSourceUrl}
                        canonicalStoreUrl={art.canonicalStoreUrl}
                        topic={articleCategory}
                      />
                    )}
                  </div>

                  {/* Featured Product Pill */}
                  {art.featuredProduct && (
                    <div className="mt-4 p-3 rounded-xl bg-black/60 border border-gold/20 flex items-center justify-between gap-3 text-xs">
                      <div className="truncate">
                        <span className="text-[9px] uppercase tracking-wider text-gold font-bold block">
                          {isAr ? 'القطعة المميزة' : 'Featured Piece'}
                        </span>
                        <span className="text-white font-medium truncate block">
                          {isAr && art.featuredProduct.titleAr ? art.featuredProduct.titleAr : art.featuredProduct.title}
                        </span>
                      </div>
                      <a
                        href={art.featuredProduct.storeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-gold text-black font-bold text-[11px] flex items-center gap-1 flex-shrink-0"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>{isAr ? 'تسوق' : 'Shop'}</span>
                      </a>
                    </div>
                  )}

                  {/* Footer Links */}
                  <div className="mt-4 pt-3 border-t border-gold/15 flex items-center justify-between text-xs">
                    <Link
                      href={`/trending/${art.slug}`}
                      className="text-gold font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>{isAr ? 'التحليل الكامل' : 'Full Analysis'}</span>
                      <ArrowRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
                    </Link>

                    <a
                      href={art.canonicalStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-400 hover:text-gold flex items-center gap-1 text-[11px]"
                    >
                      <span>omniastores.com</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                </div>
              </article>
            );
          })}
        </div>
      </div>
    </>
  );
}
