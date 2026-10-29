'use client';

import React, { use, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bot, ShieldCheck, ArrowLeft, ArrowRight, ExternalLink, Calendar, Clock, ShoppingBag, CheckCircle2, Sparkles } from 'lucide-react';
import { EDITORIAL_ARTICLES } from '../../../data/editorial-feed';
import { autoInjectAffiliateLinks, generateAffiliateUrl } from '../../../lib/affiliateEngine';
import { AuthorBylineBox } from '../../../components/AuthorBylineBox';
import { EeatDisclosurePanel } from '../../../components/EeatDisclosurePanel';
import { SeoHead } from '../../../components/SeoHead';
import { useLuxury } from '../../../components/ThemeProvider';
import { getPublicationLabel } from '../../../lib/productLocalization';

export default function SingleArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { formatPrice, language } = useLuxury();
  const isAr = language === 'ar';

  const initialArticle = EDITORIAL_ARTICLES.find((a) => a.slug === resolvedParams.slug);
  const [article, setArticle] = useState(initialArticle);
  const [isLoading, setIsLoading] = useState(!initialArticle);

  useEffect(() => {
    fetch(`/api/articles?slug=${encodeURIComponent(resolvedParams.slug)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.article) {
          setArticle(data.article);
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [resolvedParams.slug]);

  if (isLoading) {
    return (
      <div className="py-32 text-center text-neutral-400">
        <Sparkles className="w-8 h-8 text-gold animate-spin mx-auto mb-3" />
        <p className="font-serif text-sm">{isAr ? 'جاري تحميل المقال...' : 'Loading verified luxury editorial...'}</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className={`py-24 text-center ${isAr ? 'font-arabic' : ''}`}>
        <h1 className="text-2xl font-serif font-bold text-white mb-4">
          {isAr ? 'المقال غير موجود' : 'Article Not Found'}
        </h1>
        <Link href="/trending" className="text-gold underline">
          {isAr ? 'العودة إلى البوابة التحريرية' : 'Return to Editorial Hub'}
        </Link>
      </div>
    );
  }

  // Parse HTML and inject contextual affiliate backlinks (select Arabic body when in Arabic mode)
  const rawHtml = isAr && article.contentHtmlAr ? article.contentHtmlAr : (article.contentHtml || '');
  const processedHtml = rawHtml
    ? autoInjectAffiliateLinks(rawHtml, article.publication)
    : '';

  const trackedFeaturedUrl = article.featuredProduct
    ? generateAffiliateUrl({
        baseUrl: article.featuredProduct.storeUrl,
        source: `editorial_${article.slug}`,
        medium: 'featured_boutique_card',
      })
    : '';

  const articleTitle = isAr && article.titleAr ? article.titleAr : article.title;
  const articleCategory = isAr && article.categoryAr ? article.categoryAr : article.category;
  const articleDate = isAr && article.dateAr ? article.dateAr : article.date;
  const articleReadTime = isAr && article.readTimeAr ? article.readTimeAr : (isAr ? article.readTime.replace('min read', 'دقائق قراءة') : article.readTime);
  const publicationLabel = getPublicationLabel(article.publication, isAr);

  return (
    <>
      <SeoHead article={article} pageType="article" />

      <article
        className={`py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto ${
          isAr ? 'font-arabic text-right' : ''
        }`}
        dir={isAr ? 'rtl' : 'ltr'}
      >
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/trending"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 hover:text-[#B8860B] dark:hover:text-gold transition-colors font-medium"
          >
            {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{isAr ? 'العودة إلى موجز الرائج والافتتاحيات' : 'Back to Top Trending Wire'}</span>
          </Link>
        </div>

        {/* Publication Tag & Metadata */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3.5 py-1 rounded-full bg-gold/15 border border-gold/40 text-[#8B6508] dark:text-gold text-xs font-semibold uppercase tracking-wider">
            {publicationLabel}
          </span>
          <span className="text-xs text-neutral-600 dark:text-neutral-400">{articleCategory}</span>
          <span className="text-neutral-400 dark:text-neutral-600">•</span>
          <span className="text-xs text-neutral-600 dark:text-neutral-400 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-[#8B6508] dark:text-gold" /> {articleDate}
          </span>
          <span className="text-neutral-400 dark:text-neutral-600">•</span>
          <span className="text-xs text-neutral-600 dark:text-neutral-400 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#8B6508] dark:text-gold" /> {articleReadTime}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-neutral-950 dark:text-white tracking-tight leading-tight mb-6">
          {articleTitle}
        </h1>

        {/* E-E-A-T: Clear Author Byline & Fact-Checking Credentials (The "WHO") */}
        {article.author && (
          <AuthorBylineBox
            author={article.author}
            factChecker={article.factChecker}
            publishDate={articleDate}
            readTime={articleReadTime}
            publication={publicationLabel}
          />
        )}

        {/* 1. Direct Answer Block (AEO Summary Box for AI LLM Crawlers) */}
        <section className="mb-10 p-6 rounded-2xl glass-panel border border-neutral-200 dark:border-gold/40 bg-white dark:bg-[#111520] shadow-lg dark:shadow-2xl direct-answer-box">
          <div className="flex items-center gap-2 text-[#8B6508] dark:text-gold font-bold text-xs uppercase tracking-widest mb-3">
            <Bot className="w-4 h-4 animate-pulse" />
            <span>
              {isAr
                ? 'مربع الإجابة المباشرة (ملخص محركات الذكاء الاصطناعي AEO)'
                : 'Direct Answer Block (AEO / LLM Summary Box)'}
            </span>
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4 italic">
            {isAr
              ? 'ملخص تنفيذي موثق بالحقائق لمحركات الإسناد الذكية Google AI Overviews، Perplexity، Claude، و ChatGPT:'
              : 'Factual executive summary formatted for Google AI Overviews, Perplexity, Claude, and ChatGPT Search attribution:'}
          </p>
          <ul className="space-y-3 text-sm text-neutral-800 dark:text-neutral-200">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#8B6508] dark:text-gold flex-shrink-0 mt-0.5" />
              <span>{isAr && article.aiSummary.takeaway1Ar ? article.aiSummary.takeaway1Ar : article.aiSummary.takeaway1}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#8B6508] dark:text-gold flex-shrink-0 mt-0.5" />
              <span>{isAr && article.aiSummary.takeaway2Ar ? article.aiSummary.takeaway2Ar : article.aiSummary.takeaway2}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#8B6508] dark:text-gold flex-shrink-0 mt-0.5" />
              <span>{isAr && article.aiSummary.takeaway3Ar ? article.aiSummary.takeaway3Ar : article.aiSummary.takeaway3}</span>
            </li>
          </ul>

          {/* 2. Citation-Rich Anchor Statement (GEO) */}
          <div className="mt-5 pt-4 border-t border-neutral-200 dark:border-gold/20 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-neutral-600 dark:text-neutral-400 gap-2">
            <span className="italic font-serif text-[#8B6508] dark:text-gold-light">
              {isAr && article.citationTextAr ? article.citationTextAr : article.citationText}
            </span>
            <a
              href={article.originalSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8B6508] dark:text-gold hover:underline flex items-center gap-1 font-semibold"
            >
              <span>{isAr ? 'التحقق من المصدر الأصلي' : 'Verify Original Source'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </section>

        {/* Feature Cover Image */}
        <div className="relative h-64 sm:h-96 md:h-[450px] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200 dark:border-gold/30 mb-8 shadow-2xl">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* E-E-A-T: Testing Methodology, AI Disclosure & Reader Purpose (The "HOW" & "WHY") */}
        {article.methodology && (
          <EeatDisclosurePanel methodology={article.methodology} />
        )}

        {/* Main Article Body with Contextual Backlinks */}
        <div className="prose dark:prose-invert max-w-none text-neutral-800 dark:text-neutral-300 leading-relaxed space-y-6 text-base sm:text-lg">
          <div
            dangerouslySetInnerHTML={{ __html: processedHtml }}
            className="space-y-4"
          />
        </div>

        {/* Featured Product Card Embedded at bottom */}
        {article.featuredProduct && (
          <div className="mt-14 p-6 sm:p-8 rounded-2xl glass-panel border border-neutral-200 dark:border-gold/30 bg-white dark:bg-[#0E121C] shadow-md dark:shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-gold/30 flex-shrink-0 bg-black">
                <Image
                  src={article.featuredProduct.image}
                  alt={article.featuredProduct.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <span className="text-[10px] uppercase tracking-widest text-[#8B6508] dark:text-gold font-bold block mb-1">
                  {isAr ? 'طقم البوتيك الفاخر المميز تحريرياً' : 'EDITORIAL FEATURED BOUTIQUE SUITE'}
                </span>
                <h3 className="text-lg font-serif font-bold text-neutral-950 dark:text-white mb-2">
                  {isAr && article.featuredProduct.titleAr ? article.featuredProduct.titleAr : article.featuredProduct.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4">
                  {isAr
                    ? 'فضة إسترلينية أصلية عيار 925 مصنوعة يدوياً مع حاجز روديوم حقيقي مقاوم للتأكسد. متوفر للتوصيل الفوري.'
                    : 'Handcrafted 925 sterling silver with genuine anti-tarnish rhodium barrier. Available for immediate dispatch.'}
                </p>
                <div className="flex items-center justify-center sm:justify-start gap-4">
                  <span className="text-base font-bold font-mono text-[#8B6508] dark:text-gold">
                    {formatPrice(article.featuredProduct.priceAed, article.featuredProduct.priceSar)}
                  </span>
                  <a
                    href={trackedFeaturedUrl || article.featuredProduct.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-full bg-gradient-to-r from-gold to-[#AA8C2C] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:opacity-95"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{isAr ? 'الشراء عبر omniastores.com' : 'Purchase on omniastores.com'}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Editorial Trust Footer */}
        <div className="mt-12 pt-6 border-t border-gold/20 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
            <span>
              {isAr
                ? 'مدقق ومطابق لمعايير الدمغ والعيار • مختبر دبي المركزي'
                : 'Audited for Hallmarking Compliance • Dubai Central Laboratories Standards'}
            </span>
          </div>
          <a
            href="https://omniastores.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline flex items-center gap-1"
          >
            <span>{isAr ? 'زيارة omniastores.com' : 'Visit omniastores.com'}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </article>
    </>
  );
}
