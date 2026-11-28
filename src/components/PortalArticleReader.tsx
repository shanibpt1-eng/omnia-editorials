'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronRight,
  Crown,
  ExternalLink,
  Calendar,
  Clock,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Share2,
  Check,
  ArrowUpRight,
  Link2,
  Newspaper,
} from 'lucide-react';
import { useLuxury } from './ThemeProvider';
import { LiveMagazineFeedItem } from '../lib/magazine-wire';
import { MAGAZINE_SHOPPING_EDIT } from '../data/magazine-editions-data';
import { OmniaFreeSpaceAdPanel } from './OmniaFreeSpaceAdPanel';

interface PortalArticleReaderProps {
  article: LiveMagazineFeedItem;
  relatedArticles: LiveMagazineFeedItem[];
}

const OMNIA_BACKLINK_PORTALS = [
  { label: 'Omnia Stores Flagship', labelAr: 'متجر أمنية الرسمي', href: 'https://omniastores.com/', tag: 'OFFICIAL' },
  { label: 'Bridal Jewellery Sets', labelAr: 'أطقم العرائس', href: 'https://omniastores.com/collections/bridal-sets', tag: 'BRIDAL' },
  { label: 'Signature 925 Brooches', labelAr: 'بروشات عيار 925', href: 'https://omniastores.com/collections/brooches', tag: 'BROOCHES' },
  { label: 'Imperial Pearl Chokers', labelAr: 'أطواق التشوكر', href: 'https://omniastores.com/collections/chokers-collection', tag: 'CHOKERS' },
  { label: '5A Diamond Necklaces', labelAr: 'عقود الألماس', href: 'https://omniastores.com/collections/necklaces', tag: 'NECKLACES' },
  { label: 'Drop Earrings & Studs', labelAr: 'الأقراط الفاخرة', href: 'https://omniastores.com/collections/earrings', tag: 'EARRINGS' },
  { label: 'GRA Moissanite Rings', labelAr: 'خواتم السوليتير', href: 'https://omniastores.com/collections/rings', tag: 'RINGS' },
  { label: 'VIP Archive Offers', labelAr: 'عروض VIP', href: 'https://omniastores.com/collections/discounted-items', tag: '15% OFF' },
];

export function buildArticleHref(item: LiveMagazineFeedItem): string {
  const qs = new URLSearchParams({
    t: item.title,
    p: item.publisher,
    ps: item.publisherSlug,
    d: item.publishedDisplay,
    da: item.publishedAt,
    a: item.author,
    c: item.category,
    pl: item.pillar,
    ct: item.channelType,
    im: item.thumbnail,
    ex: item.excerpt,
    lk: item.link,
    hu: item.homeUrl,
  });
  return `/magazine/article/${item.slug}?${qs.toString()}`;
}

export function PortalArticleReader({ article, relatedArticles }: PortalArticleReaderProps) {
  const { language, currency } = useLuxury();
  const isAr = language === 'ar';
  const [copied, setCopied] = useState(false);

  const mult = currency === 'SAR' ? 1.02 : 1;
  const currLabel = currency === 'SAR' ? (isAr ? 'ر.س' : 'SAR') : (isAr ? 'د.إ' : 'AED');
  const formatAmt = (aed: number) => `${Math.round(aed * mult).toLocaleString()} ${currLabel}`;

  const handleCopyShare = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Pick 3 unique Omnia products aligned loosely to the pillar for balanced visual curation
  const shopStartIdx =
    article.pillar === 'jewellery'
      ? 0
      : article.pillar === 'runway' || article.pillar === 'fashion'
      ? 2
      : article.pillar === 'beauty'
      ? 4
      : 5;
  const curatedProducts = [
    MAGAZINE_SHOPPING_EDIT[shopStartIdx % MAGAZINE_SHOPPING_EDIT.length],
    MAGAZINE_SHOPPING_EDIT[(shopStartIdx + 1) % MAGAZINE_SHOPPING_EDIT.length],
    MAGAZINE_SHOPPING_EDIT[(shopStartIdx + 2) % MAGAZINE_SHOPPING_EDIT.length],
  ];

  return (
    <div
      className={`min-h-screen bg-white dark:bg-[#07090E] text-neutral-950 dark:text-white ${
        isAr ? 'font-arabic text-right' : 'text-left'
      }`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Top Breaking Wire & Partner Bar */}
      <div className="bg-neutral-950 text-white border-b border-gold/30 py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-gold text-black font-extrabold uppercase tracking-wider">
              {article.channelType === 'news-channel' ? 'GLOBAL NEWS DESK' : 'MAGAZINE FEATURE'}
            </span>
            <span className="text-neutral-300">
              {article.publisher} • {article.publishedDisplay}
            </span>
          </div>
          <a
            href="https://omniastores.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline font-bold flex items-center gap-1"
          >
            <span>SPONSORED PARTNER: OMNIASTORES.COM (VIP CODE: OMNIA-VIP15)</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main Article Shell */}
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-8">
          <Link href="/" className="hover:text-[#8B6508] dark:hover:text-gold">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <ChevronRight className="w-3 h-3 rtl:rotate-180 text-gold" />
          <Link href="/magazine" className="hover:text-[#8B6508] dark:hover:text-gold">
            {isAr ? 'المجلة والأخبار العالمية' : 'Magazine & News Wire'}
          </Link>
          <ChevronRight className="w-3 h-3 rtl:rotate-180 text-gold" />
          <span className="text-[#8B6508] dark:text-gold font-bold uppercase">{article.category}</span>
        </nav>

        {/* Vogue-Style Official Article Header (Centered Typography) */}
        <header className="max-w-4xl mx-auto text-center space-y-5 pb-8 border-b border-neutral-200 dark:border-gold/25">
          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] font-bold">
            <span className="px-2.5 py-0.5 bg-neutral-950 text-white dark:bg-gold dark:text-black">
              {article.publisher}
            </span>
            <span className="text-[#8B6508] dark:text-gold">{article.category}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight leading-[1.08] text-neutral-950 dark:text-white">
            {article.title}
          </h1>

          <p className="text-base sm:text-xl text-neutral-600 dark:text-neutral-300 font-serif leading-relaxed max-w-3xl mx-auto">
            {article.excerpt}
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            <span className="font-bold text-neutral-900 dark:text-gold">BY {article.author}</span>
            <span>•</span>
            <time dateTime={article.publishedAt} className="inline-flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200 font-semibold">
              <Calendar className="w-3.5 h-3.5 text-gold" />
              <span>{article.publishedDisplay}</span>
            </time>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{isAr ? 'قراءة 4 دقائق' : '4 MIN READ'}</span>
            </span>
            <button
              type="button"
              onClick={handleCopyShare}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-neutral-300 dark:border-white/20 hover:border-gold text-[10px] font-bold cursor-pointer transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Share2 className="w-3 h-3" />}
              <span>{copied ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'مشاركة' : 'Share')}</span>
            </button>
          </div>
        </header>

        {/* 12-Col Official Article Body + Sticky Omnia Stores Ad & Product Backlink Portal */}
        <div className="pt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT 8 COLS: OFFICIAL EDITORIAL READER */}
          <div className="lg:col-span-8 space-y-8">
            <figure className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-gold/25 bg-neutral-100 dark:bg-neutral-900 shadow-2xl">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.fb) {
                      target.dataset.fb = '1';
                      target.src = '/ai-models/omnia-runway-model.jpg';
                    }
                  }}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <figcaption className="px-4 py-2.5 text-[11px] font-mono text-neutral-500 dark:text-neutral-400 bg-[#FAF7F2] dark:bg-[#0B0F18] flex flex-wrap items-center justify-between gap-2 border-t border-neutral-200 dark:border-white/10">
                <span>
                  {isAr ? `الناشر: ${article.publisher} • بتاريخ ${article.publishedDisplay}` : `Editorial Edition: ${article.publisher} • Published ${article.publishedDisplay}`}
                </span>
                <span className="text-[#8B6508] dark:text-gold font-bold uppercase">{article.pillar} Desk</span>
              </figcaption>
            </figure>

            {/* Drop-Cap Editorial Copy */}
            <div className="space-y-6 font-serif text-base sm:text-lg leading-relaxed text-neutral-800 dark:text-neutral-200">
              <p className="first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-neutral-950 dark:first-letter:text-gold">
                {article.excerpt}{' '}
                {isAr
                  ? `نُشر هذا التقرير بتاريخ ${article.publishedDisplay} عبر شبكة ${article.publisher} ليضع القارئ في قلب التحولات الجمالية والثقافية العالمية المعاصرة.`
                  : `Dated ${article.publishedDisplay}, this dispatch from the ${article.publisher} international coverage wire captures one of the defining cultural and style moments shaping global luxury conversations this season.`}
              </p>

              {/* In-Article Omnia Stores Advertisement & Collector Highlight Card */}
              <div className="my-6 p-6 rounded-2xl border border-gold/45 bg-gradient-to-br from-[#0A0D14] via-[#131926] to-[#0A0D14] text-white shadow-xl flex flex-col sm:flex-row items-center gap-5">
                <div className="relative w-28 h-32 shrink-0 rounded-xl overflow-hidden border border-gold/30">
                  <Image
                    src={curatedProducts[0].image}
                    alt={curatedProducts[0].nameEn}
                    fill
                    unoptimized
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-gold font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isAr ? 'إعلان تحريري • تنسيق أمنية ستورز' : 'OMNIA STORES ADVERTISEMENT • GET THE LOOK'}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white leading-snug">
                    {isAr ? curatedProducts[0].nameAr : curatedProducts[0].nameEn}
                  </h3>
                  <p className="text-xs font-mono text-amber-200">
                    {formatAmt(curatedProducts[0].priceAed)} • DCL-Assayed 925 Sterling Silver • Code: OMNIA-VIP15
                  </p>
                  <div className="pt-1 flex flex-wrap items-center gap-2.5">
                    <a
                      href={curatedProducts[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-gold text-black font-extrabold text-[11px] uppercase tracking-wider inline-flex items-center gap-1.5 hover:bg-amber-300 transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>{isAr ? 'تسوق الآن من omniastores.com' : 'Shop on omniastores.com'}</span>
                    </a>
                    <Link
                      href="/brands/omnia-stores"
                      className="px-3.5 py-2 rounded-lg border border-white/25 text-[11px] font-mono font-bold hover:border-gold transition-colors"
                    >
                      {isAr ? 'ملف العلامة' : 'Brand Profile'}
                    </Link>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-serif font-bold text-neutral-950 dark:text-white pt-2">
                {isAr ? 'رؤية التحرير الخليجي ومنصة أمنية ستورز' : 'Middle East Editorial Perspective & Wardrobe Pairing'}
              </h2>
              <p>
                {isAr
                  ? `من دبي والرياض إلى الدوحة والكويت، يلاحظ محررو الموضة في ذا فوغ نيوز تزايد الإقبال على القطع ذات التصميم النحتي الدقيق التي تجمع بين الخطوط العالمية المتجددة ومتطلبات الإطلالات الخليجية الفاخرة من فضة عيار 925 وأحجار البريق العالي.`
                  : `Across Dubai Design District, Riyadh ateliers, and Doha cultural gatherings, regional collectors increasingly pair international ${article.category.toLowerCase()} trends with architectural demi-fine accents. Rather than waiting weeks for European showroom backorders, GCC shoppers leverage verified digital ateliers such as Omnia Stores (omniastores.com) for 24-hour express courier delivery across the Emirates and Saudi Arabia.`}
              </p>

              <p>
                {isAr
                  ? `ومع تطور توجهات الفخامة العالمية التي توثقها منصات مثل ${article.publisher}، تظل الشفافية المخبرية (مثل فحص XRF للفضة الخالصة عيار 925) وتقنية الطلاء الثلاثي بالروديوم الأساس الفعلي لاقتناء قطع تدوم بلمعانها الأصلي على مر المواسم.`
                  : `As highlighted across global editorial reporting dated ${article.publishedDisplay}, lasting elegance balances artistic expression with material durability — uniting XRF-assayed 925 sterling frameworks, triple Italian rhodium shields suited for Gulf humidity, and precision 58-facet stone cuts curated inside the Omnia Stores boutique directory.`}
              </p>
            </div>

            {/* Verified Editorial Source Citation & Authority Box */}
            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-white/15 bg-[#FAF7F2] dark:bg-[#0B0F18] flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isAr ? 'توثيق المصدر التحريري' : 'VERIFIED EDITORIAL CITATION & ATTRIBUTION'}</span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 font-mono">
                  Source Desk: <strong>{article.publisher}</strong> • Original Date: <strong>{article.publishedDisplay}</strong> • Author: {article.author}
                </p>
              </div>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-white/20 hover:border-gold text-xs font-mono font-bold inline-flex items-center gap-1.5 transition-colors"
              >
                <span>{isAr ? `الرابط الأصلي في ${article.publisher}` : `Source Reference (${article.publisher})`}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* RIGHT 4 COLS: STICKY OMNIA STORES AD PORTAL + PRODUCTS + BACKLINKS */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* 1. Primary Omnia Stores Vertical Advertisement Portal */}
            <a
              href="https://omniastores.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl overflow-hidden border border-gold/50 bg-[#0A0D14] text-white shadow-2xl group"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src="/ai-models/omnia-bridal-model.jpg"
                  alt="Omnia Stores Flagship Ad Portal"
                  fill
                  unoptimized
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/20" />
                <span className="absolute top-3 right-3 px-2 py-0.5 bg-black/85 text-gold text-[9px] font-mono font-bold uppercase tracking-widest border border-gold/40">
                  ADVERTISEMENT PORTAL
                </span>
                <div className="absolute bottom-4 inset-x-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-gold font-bold uppercase tracking-widest">
                    <Crown className="w-3.5 h-3.5" />
                    <span>OMNIASTORES.COM</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold leading-snug">
                    {isAr ? 'أطقم الزفاف والمجوهرات الفضية عيار 925' : 'Bridal Suites & 925 Couture Jewellery'}
                  </h3>
                  <p className="text-xs text-neutral-300 font-serif">
                    {isAr ? 'كود VIP خصم 15%: OMNIA-VIP15 • توصيل 24 ساعة' : 'VIP Privilege Code: OMNIA-VIP15 (15% Off) • 24h UAE Delivery'}
                  </p>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-gold via-amber-300 to-[#AA8C2C] text-black text-xs font-extrabold uppercase tracking-wider mt-1">
                    <span>{isAr ? 'تسوق الآن' : 'Enter Boutique'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </a>

            {/* 2. Featured Shoppable Product Cards with Direct Omnia Backlinks */}
            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-gold/25 bg-[#FAF7F2] dark:bg-[#0B0F18] space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-white/10 pb-2.5">
                <span className="text-[11px] font-mono font-extrabold uppercase tracking-wider text-[#8B6508] dark:text-gold">
                  {isAr ? 'قطع مقترحة لهذا المقال' : 'CURATED PRODUCTS FOR THIS STORY'}
                </span>
                <ShoppingBag className="w-3.5 h-3.5 text-gold" />
              </div>

              <div className="space-y-3">
                {curatedProducts.map((item) => (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2.5 rounded-xl border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#07090E] hover:border-gold transition-colors group"
                  >
                    <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-black">
                      <Image
                        src={item.image}
                        alt={isAr ? item.nameAr : item.nameEn}
                        fill
                        unoptimized
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <span className="text-[9px] font-mono text-[#8B6508] dark:text-gold font-bold uppercase block">
                        {isAr ? item.badgeAr : item.badgeEn}
                      </span>
                      <h4 className="text-xs font-serif font-bold truncate group-hover:underline">
                        {isAr ? item.nameAr : item.nameEn}
                      </h4>
                      <span className="text-[11px] font-mono text-neutral-500 block">
                        {formatAmt(item.priceAed)} • omniastores.com ↗
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* 3. Direct Omnia Stores Collection Backlinks Index */}
            <div className="p-5 rounded-2xl border border-neutral-200 dark:border-white/15 bg-white dark:bg-[#0A0D14] space-y-3">
              <div className="flex items-center gap-2 text-[11px] font-mono font-extrabold uppercase tracking-wider">
                <Link2 className="w-3.5 h-3.5 text-gold" />
                <span>{isAr ? 'بوابات وروابط أمنية ستورز المباشرة' : 'OMNIA STORES BACKLINK PORTALS'}</span>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {OMNIA_BACKLINK_PORTALS.map((portal) => (
                  <a
                    key={portal.href}
                    href={portal.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-lg border border-neutral-200 dark:border-white/10 hover:border-gold bg-[#FAF7F2] dark:bg-white/[0.03] flex items-center justify-between text-xs font-serif font-semibold transition-colors"
                  >
                    <span>{isAr ? portal.labelAr : portal.label}</span>
                    <span className="text-[9px] font-mono text-[#8B6508] dark:text-gold font-bold flex items-center gap-1">
                      {portal.tag} <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom Related Portal Articles (Stay inside our portal!) */}
        {relatedArticles.length > 0 && (
          <section className="pt-14 mt-14 border-t-2 border-neutral-950 dark:border-gold/40 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-[#8B6508] dark:text-gold" />
                <h2 className="text-sm font-mono font-extrabold uppercase tracking-[0.2em]">
                  {isAr ? 'مقالات وأخبار أخرى من طبعة اليوم' : "CONTINUE READING • TODAY'S EDITION ON THE VOGUE NEWS"}
                </h2>
              </div>
              <Link
                href="/magazine"
                className="text-xs font-mono font-bold text-[#8B6508] dark:text-gold hover:underline"
              >
                {isAr ? 'العودة إلى صفحة المجلة ←' : 'All 25 Magazines & Channels →'}
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedArticles.slice(0, 6).map((rel) => (
                <Link
                  key={rel.id}
                  href={buildArticleHref(rel)}
                  className="group relative aspect-[4/5] overflow-hidden bg-neutral-900 border border-neutral-200 dark:border-white/10 shadow-lg block"
                >
                  <img
                    src={rel.thumbnail}
                    alt={rel.title}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.dataset.fb) {
                        target.dataset.fb = '1';
                        target.src = '/ai-models/omnia-beauty-model.jpg';
                      }
                    }}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/15" />
                  <span className="absolute top-3 left-3 px-2 py-0.5 bg-white/95 dark:bg-black/85 text-neutral-950 dark:text-white text-[9px] font-mono font-extrabold uppercase tracking-wider">
                    {rel.publisher}
                  </span>
                  <div className="absolute bottom-0 inset-x-0 p-5 text-white space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-amber-300 font-bold block">
                      {rel.category} • {rel.publishedDisplay}
                    </span>
                    <h3 className="text-base sm:text-lg font-serif font-medium leading-snug group-hover:underline line-clamp-3">
                      {rel.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      {/* Responsive Brooch Video & Seasonal Omnia Stores Ad Portal */}
      <OmniaFreeSpaceAdPanel />
    </div>
  );
}
