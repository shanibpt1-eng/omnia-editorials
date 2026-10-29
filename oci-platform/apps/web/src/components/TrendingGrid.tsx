'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, ArrowRight, ExternalLink, CheckCircle2, ChevronDown } from 'lucide-react';
import { EDITORIAL_ARTICLES } from '../data/editorial-feed';
import { EditorialArticle } from '../lib/types';
import { useLuxury } from './ThemeProvider';
import { getPublicationLabel } from '../lib/productLocalization';

export function TrendingGrid({ initialArticles }: { initialArticles?: EditorialArticle[] }) {
  const { t, language } = useLuxury();
  const isAr = language === 'ar';
  const articles = initialArticles || EDITORIAL_ARTICLES;
  const [expandedAeo, setExpandedAeo] = useState<Record<string, boolean>>({
    'art-vogue-2026': true, // Open first article by default
  });

  const toggleAeo = (id: string) => {
    setExpandedAeo((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-gold/20 pb-6 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>{language === 'ar' ? 'شبكة أمنية ستورز للتقارير الفاخرة' : 'GCC Luxury Intelligence & Editorial Network'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-neutral-950 dark:text-white">
            {t.trendingTitle}
          </h2>
          <p className="text-sm text-neutral-700 dark:text-neutral-400 mt-2 max-w-2xl">
            {t.trendingSubtitle}
          </p>
        </div>

        <Link
          href="/trending"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B8860B] dark:text-gold hover:text-black dark:hover:text-gold-light transition-colors group"
        >
          <span>{language === 'ar' ? 'عرض جميع تقارير النشرة الفاخرة' : 'View All GCC Wire Reports'}</span>
          <ArrowRight className={`w-4 h-4 transform ${language === 'ar' ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'} transition-transform`} />
        </Link>
      </div>

      {/* Grid of Trending Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.slice(0, 6).map((art) => {
          const isAeoOpen = !!expandedAeo[art.id];

          return (
            <article
              key={art.id}
              className="group flex flex-col rounded-2xl overflow-hidden glass-panel border border-neutral-200 dark:border-gold/20 hover:border-[#B8860B]/50 dark:hover:border-gold/50 transition-all duration-300 shadow-md dark:shadow-xl hover:shadow-lg dark:hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)] bg-white dark:bg-[#111520]/90"
            >
              {/* Cover Image Container */}
              <div className="relative h-56 w-full overflow-hidden bg-black">
                <Image
                  src={art.coverImage}
                  alt={art.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Publication Badge Tag */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-gold/40 text-[11px] font-semibold tracking-wider text-gold uppercase shadow">
                    {getPublicationLabel(art.publication, isAr)}
                  </span>
                </div>

                {/* Read Time & Category Tag */}
                <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-[11px] text-neutral-300">
                  <span className="font-medium text-white/90">
                    {isAr && art.categoryAr ? art.categoryAr : art.category}
                  </span>
                  <span>
                    {isAr && art.readTimeAr ? art.readTimeAr : (isAr ? art.readTime.replace('min read', 'دقائق قراءة') : art.readTime)}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {art.author && (
                    <div className="flex items-center gap-2 mb-2 text-[11px] text-neutral-500 dark:text-neutral-400">
                      <span className="w-5 h-5 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-[9px] text-[#8B6508] dark:text-gold font-bold">
                        {art.author.name.charAt(0)}
                      </span>
                      <span className="text-neutral-900 dark:text-neutral-300 font-semibold dark:font-medium truncate max-w-[160px]">{art.author.name}</span>
                      <span className="text-gold/60">•</span>
                      <span className="text-[10px] text-[#8B6508] dark:text-gold font-mono font-medium">
                        {language === 'ar' ? `${art.author.experienceYears}+ سنة فحص معتمد` : `${art.author.experienceYears}+ Yrs Assay`}
                      </span>
                    </div>
                  )}
                  <h3 className="text-lg font-serif font-bold text-neutral-950 dark:text-white group-hover:text-[#B8860B] dark:group-hover:text-gold transition-colors leading-snug mb-3">
                    <Link href={`/trending/${art.slug}`}>
                      {isAr && art.titleAr ? art.titleAr : art.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-neutral-700 dark:text-neutral-400 line-clamp-3 leading-relaxed mb-4">
                    {isAr && art.excerptAr ? art.excerptAr : art.excerpt}
                  </p>
                </div>

                {/* Luxury Editorial Key Takeaways Dropdown Drawer */}
                <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-gold/15">
                  <button
                    onClick={() => toggleAeo(art.id)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-gold/10 hover:bg-gold/15 border border-gold/25 hover:border-gold/40 text-left text-xs font-serif font-bold text-neutral-900 dark:text-gold transition-all group/toggle shadow-sm"
                    aria-expanded={isAeoOpen}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span className="truncate">
                        {language === 'ar' ? 'أهم مقتطفات التقرير التحريري' : 'Key Editorial Highlights'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-wider bg-black/60 dark:bg-black/80 text-gold border border-gold/30">
                        {isAeoOpen 
                          ? (language === 'ar' ? 'إخفاء' : 'Hide') 
                          : (language === 'ar' ? '3 حقائق أساسية' : '3 Key Facts')}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-gold transition-transform duration-300 ${
                          isAeoOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {isAeoOpen && (
                    <div className="mt-2.5 p-3.5 rounded-xl bg-neutral-50 dark:bg-black/60 border border-neutral-200 dark:border-gold/20 text-xs space-y-2 text-neutral-800 dark:text-neutral-300 animate-fadeIn">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">
                          {isAr && art.aiSummary.takeaway1Ar ? art.aiSummary.takeaway1Ar : art.aiSummary.takeaway1}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">
                          {isAr && art.aiSummary.takeaway2Ar ? art.aiSummary.takeaway2Ar : art.aiSummary.takeaway2}
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">
                          {isAr && art.aiSummary.takeaway3Ar ? art.aiSummary.takeaway3Ar : art.aiSummary.takeaway3}
                        </span>
                      </div>

                      {/* Editorial Citation Anchor */}
                      <div className="pt-2 text-[10px] text-neutral-600 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-700/50 italic flex items-center justify-between">
                        <span>{isAr && art.citationTextAr ? art.citationTextAr : art.citationText}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Meta & Actions */}
                <div className="mt-5 pt-3 border-t border-neutral-200 dark:border-gold/15 flex items-center justify-between text-xs">
                  <Link
                    href={`/trending/${art.slug}`}
                    className="text-[#8B6508] dark:text-gold font-bold dark:font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>{language === 'ar' ? 'قراءة القصة كاملة' : 'Read Full Story'}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${language === 'ar' ? 'rotate-180' : ''}`} />
                  </Link>

                  <a
                    href={art.canonicalStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-600 dark:text-neutral-400 hover:text-[#8B6508] dark:hover:text-gold flex items-center gap-1 transition-colors"
                    title="Visit official Omnia Stores collection"
                  >
                    <span>{language === 'ar' ? 'عرض في المتجر' : 'Store View'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
