'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  X,
  ExternalLink,
  Crown,
  BookOpen,
  Sparkles,
  ArrowRight,
  Clock,
  Globe,
  ShoppingBag,
  ShieldCheck,
} from 'lucide-react';
import {
  MAGAZINE_PILLARS,
  MAGAZINE_STORIES,
  PUBLISHER_WIRE_DIGEST,
  MagazinePillarId,
  MagazineFeatureStory,
} from '../data/magazine-editions-data';
import { useLuxury } from './ThemeProvider';

export function MagazineEditorialHub() {
  const { language, currency } = useLuxury();
  const isAr = language === 'ar';
  const [activePillar, setActivePillar] = useState<MagazinePillarId>('all');
  const [readerStory, setReaderStory] = useState<MagazineFeatureStory | null>(null);

  const mult = currency === 'SAR' ? 1.02 : 1;
  const currLabel = currency === 'SAR' ? (isAr ? 'ر.س' : 'SAR') : (isAr ? 'د.إ' : 'AED');
  const formatAmt = (aed: number) => `${Math.round(aed * mult).toLocaleString()} ${currLabel}`;

  const leadStory = MAGAZINE_STORIES.find((s) => s.isLeadCover) || MAGAZINE_STORIES[0];
  const gridStories =
    activePillar === 'all'
      ? MAGAZINE_STORIES.filter((s) => s.id !== leadStory.id)
      : MAGAZINE_STORIES.filter((s) => s.pillar === activePillar);

  return (
    <section
      aria-label="The Vogue News Digital Magazine & Multi-Industry Editorial"
      className={`my-12 bg-white dark:bg-[#07090E] text-neutral-950 dark:text-white border-y border-neutral-200 dark:border-gold/25 ${
        isAr ? 'text-right' : 'text-left'
      }`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* 1. SIGNATURE MONOCHROME MAGAZINE MASTHEAD & INDUSTRY BAR */}
      <div className="border-b border-neutral-200 dark:border-gold/20 bg-white dark:bg-[#090C13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-5 text-center space-y-3">
          <div className="flex items-center justify-center gap-3 text-[10px] font-mono uppercase tracking-[0.25em] text-[#8B6508] dark:text-gold">
            <span>{isAr ? 'إصدار المجلة الرقمية' : 'DIGITAL MAGAZINE EDITION'}</span>
            <span>•</span>
            <span>{isAr ? 'كافة القطاعات الفاخرة' : 'MULTI-INDUSTRY EDITION'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-[0.06em] uppercase text-neutral-950 dark:text-white">
            THE VOGUE NEWS
          </h2>

          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-serif max-w-2xl mx-auto">
            {isAr
              ? 'الأزياء، عروض المدارج، المجوهرات الراقية، الجمال، الثقافة والفنون، نمط الحياة الفاخر واقتصاد الفخامة الخليجي — بالشراكة مع أمنية ستورز'
              : 'Fashion, Runway, High Jewellery, Beauty, Culture & Arts, Luxury Living & GCC Business — Presented with Flagship Partner Omnia Stores'}
          </p>

          {/* Clean Vogue-Style Horizontal Pillar Tabs */}
          <div className="pt-4 flex items-center justify-start sm:justify-center gap-2 sm:gap-5 overflow-x-auto scrollbar-none pb-1">
            {MAGAZINE_PILLARS.map((pillar) => {
              const active = activePillar === pillar.id;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setActivePillar(pillar.id)}
                  className={`text-[11px] font-bold uppercase tracking-[0.16em] whitespace-nowrap pb-1.5 border-b-2 transition-all cursor-pointer ${
                    active
                      ? 'border-neutral-950 dark:border-gold text-neutral-950 dark:text-gold'
                      : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                  }`}
                >
                  {isAr ? pillar.labelAr : pillar.labelEn}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. 50/50 ASYMMETRIC MAGAZINE COVER SPREAD (Vogue Editorial Signature Layout) */}
      {activePillar === 'all' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 border-b border-neutral-200 dark:border-gold/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Half: Centered Minimal Typography */}
            <div className="lg:col-span-6 text-center px-2 sm:px-6 space-y-5">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#8B6508] dark:text-gold font-bold block">
                {isAr ? leadStory.tagAr : leadStory.tagEn}
              </span>

              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-medium tracking-tight text-neutral-950 dark:text-white leading-[1.15]">
                {isAr ? leadStory.titleAr : leadStory.titleEn}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-serif leading-relaxed max-w-md mx-auto">
                {isAr ? leadStory.subtitleAr : leadStory.subtitleEn}
              </p>

              <div className="pt-2 space-y-1 text-xs">
                <p className="font-mono uppercase tracking-[0.18em] text-[10px] font-bold text-neutral-900 dark:text-white">
                  {isAr ? `بقلم ${leadStory.author}` : `BY ${leadStory.author.toUpperCase()}`}
                </p>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-serif">
                  {leadStory.date} • {leadStory.readTime}
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setReaderStory(leadStory)}
                  className="px-6 py-2.5 bg-neutral-950 dark:bg-gold text-white dark:text-black text-[11px] font-bold uppercase tracking-[0.18em] hover:opacity-90 transition-opacity cursor-pointer"
                >
                  {isAr ? 'قراءة ملف الغلاف' : 'Read Cover Feature'}
                </button>
                <a
                  href={leadStory.omniaPairing.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 border border-neutral-900 dark:border-gold/50 text-neutral-900 dark:text-gold text-[11px] font-bold uppercase tracking-[0.14em] hover:bg-gold hover:text-black hover:border-gold transition-colors inline-flex items-center gap-1.5"
                >
                  <span>{isAr ? 'تسوق القطعة على أمنية' : 'Shop Omnia Pairing'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Right Half: Tall Editorial Cover Visual */}
            <div
              onClick={() => setReaderStory(leadStory)}
              className="lg:col-span-6 relative aspect-[4/5] w-full max-h-[640px] overflow-hidden bg-neutral-100 dark:bg-neutral-900 cursor-pointer group shadow-xl"
            >
              <Image
                src={leadStory.coverImage}
                alt={isAr ? leadStory.titleAr : leadStory.titleEn}
                fill
                unoptimized
                className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/75 backdrop-blur-md border border-gold/35 flex items-center justify-between gap-3 text-white text-xs opacity-95">
                <div className="min-w-0">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-gold block">OMNIA STORES FEATURED PIECE</span>
                  <span className="font-serif font-bold truncate block">
                    {isAr ? leadStory.omniaPairing.nameAr : leadStory.omniaPairing.nameEn}
                  </span>
                </div>
                <span className="font-mono text-gold font-bold shrink-0">{formatAmt(leadStory.omniaPairing.priceAed)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. 3-COLUMN FULL-BLEED VISUAL MAGAZINE GRID (Clean Screenshot 2 Aesthetic) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-200 dark:border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#8B6508] dark:text-gold" />
            <h3 className="text-sm font-mono font-bold uppercase tracking-[0.2em] text-neutral-900 dark:text-white">
              {activePillar === 'all'
                ? (isAr ? 'مختارات المجلة عبر كافة القطاعات' : 'CURATED STORIES ACROSS ALL INDUSTRIES')
                : (isAr ? `أرشيف قسم: ${MAGAZINE_PILLARS.find((p) => p.id === activePillar)?.labelAr}` : `${MAGAZINE_PILLARS.find((p) => p.id === activePillar)?.labelEn} ARCHIVE`)}
            </h3>
          </div>
          <span className="text-[11px] font-mono text-neutral-500">
            {gridStories.length} {isAr ? 'مقالات منشورة' : 'Editorial Features'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {gridStories.map((story) => (
            <article
              key={story.id}
              onClick={() => setReaderStory(story)}
              className="group relative aspect-[4/5] w-full overflow-hidden bg-neutral-900 cursor-pointer shadow-lg border border-neutral-200 dark:border-gold/25"
            >
              <Image
                src={story.coverImage}
                alt={isAr ? story.titleAr : story.titleEn}
                fill
                unoptimized
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
              {/* Magazine Signature Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

              {/* Top Right Omnia Tie-In Pill */}
              <a
                href={story.omniaPairing.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/75 hover:bg-gold text-gold hover:text-black border border-gold/40 text-[9px] font-mono font-bold uppercase tracking-wider transition-colors flex items-center gap-1 z-10"
              >
                <ShoppingBag className="w-2.5 h-2.5" />
                <span>OMNIA</span>
              </a>

              {/* Bottom Full-Bleed Overlay Caption */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-300 font-bold block">
                  {isAr ? story.tagAr : story.tagEn}
                </span>
                <h4 className="text-lg sm:text-xl font-serif font-medium leading-snug group-hover:underline">
                  {isAr ? story.titleAr : story.titleEn}
                </h4>
                <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-neutral-300 pt-1">
                  {isAr ? `بقلم ${story.author}` : `BY ${story.author.toUpperCase()}`}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* 4. FULL-WIDTH OMNIA STORES MAGAZINE ADVERTORIAL INSERT */}
        <div className="rounded-2xl bg-gradient-to-r from-[#0A0D14] via-[#171E2E] to-[#0A0D14] text-white border border-gold/45 p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-gold text-[10px] font-mono uppercase tracking-[0.22em] font-bold">
              <Crown className="w-3.5 h-3.5" />
              <span>{isAr ? 'إعلان المجلة الرسمي • الشريك المعتمد' : 'MAGAZINE PRINT & DIGITAL PARTNER ADVERTISEMENT'}</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-serif font-bold">
              {isAr
                ? 'تشكيلات أمنية ستورز عيار 925: فخامة البروشات وأطقم العرائس المعتمدة'
                : 'Omnia Stores (omniastores.com): DCL-Assayed 925 Bridal Suites & Brooches'}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-serif leading-relaxed">
              {isAr
                ? 'استمتعي بخصم 15% حصرياً لقراء ذا فوغ نيوز باستخدام كود OMNIA-VIP15 مع توصيل مؤمّن خلال 24 ساعة وتقسيط تابي على 4 دفعات.'
                : 'Readers enjoy 15% off with VIP code OMNIA-VIP15 across 925 sterling silver bridal suites, pearl chokers, and brooches—backed by 24h UAE/GCC courier and Tabby 4x.'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/brands/omnia-stores"
              className="px-5 py-3 rounded-xl border border-gold/40 text-gold hover:bg-gold/10 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              {isAr ? 'ملف العلامة الموثق' : 'Verified Brand Profile'}
            </Link>
            <a
              href="https://omniastores.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-gold via-amber-300 to-[#AA8C2C] text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg hover:scale-105 transition-transform"
            >
              <span>{isAr ? 'زيارة omniastores.com' : 'Shop omniastores.com'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 5. MULTI-PUBLISHER INDUSTRY PRESS RADAR (CLEAN ATTRIBUTED SUMMARIES) */}
        <div className="pt-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 dark:border-gold/20 pb-3">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#8B6508] dark:text-gold" />
              <h3 className="text-sm font-mono font-bold uppercase tracking-[0.2em] text-neutral-900 dark:text-white">
                {isAr ? 'موجز الصحافة العالمية والإقليمية (توثيق المصادر)' : 'REGIONAL & INTERNATIONAL PUBLISHER WIRE DIGEST'}
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 flex items-center gap-1 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAr ? 'ملخصات تحريرية منسوبة لمصادرها' : 'Curated Original Summaries & Verified Attribution'}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PUBLISHER_WIRE_DIGEST.map((pub) => (
              <div
                key={pub.id}
                className="p-5 rounded-2xl border border-neutral-200 dark:border-white/10 bg-[#FAF7F2] dark:bg-[#0C101A] flex flex-col justify-between gap-3 hover:border-gold/60 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-neutral-900 dark:bg-gold text-white dark:text-black font-bold">
                      {pub.publisher}
                    </span>
                    <span className="text-neutral-500">{pub.region}</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-serif font-bold text-neutral-950 dark:text-white leading-snug">
                    {isAr ? pub.headlineAr : pub.headlineEn}
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {isAr ? pub.takeawayAr : pub.takeawayEn}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-200 dark:border-white/10 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-neutral-500">{pub.category} • {pub.publishedDate}</span>
                  <a
                    href={pub.omniaTieInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8B6508] dark:text-gold font-bold hover:underline flex items-center gap-1"
                  >
                    <span>{isAr ? 'مختارات أمنية' : 'Omnia Edit'}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. INTERACTIVE MAGAZINE READER MODAL */}
      {readerStory && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setReaderStory(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#0D111A] text-neutral-950 dark:text-white rounded-3xl overflow-hidden shadow-2xl border border-gold/40 flex flex-col"
          >
            {/* Modal Header */}
            <div className="px-5 py-4 border-b border-neutral-200 dark:border-gold/25 flex items-center justify-between bg-[#FAF7F2] dark:bg-[#090C13]">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#8B6508] dark:text-gold font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAr ? readerStory.tagAr : readerStory.tagEn}</span>
              </div>
              <button
                type="button"
                onClick={() => setReaderStory(null)}
                aria-label="Close reader"
                className="p-2 rounded-full bg-neutral-200/70 dark:bg-white/10 hover:bg-gold hover:text-black transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-5 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-5 relative aspect-[4/5] rounded-2xl overflow-hidden bg-black">
                  <Image
                    src={readerStory.coverImage}
                    alt={isAr ? readerStory.titleAr : readerStory.titleEn}
                    fill
                    unoptimized
                    className="object-cover object-top"
                  />
                </div>
                <div className="md:col-span-7 space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold leading-tight">
                    {isAr ? readerStory.titleAr : readerStory.titleEn}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    <span className="font-bold text-neutral-900 dark:text-gold">{readerStory.author}</span>
                    <span>•</span>
                    <span>{readerStory.authorRole}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {readerStory.readTime}
                    </span>
                  </div>
                  <p className="text-sm italic text-neutral-700 dark:text-neutral-300 font-serif border-l-2 border-gold pl-3">
                    {isAr ? readerStory.subtitleAr : readerStory.subtitleEn}
                  </p>
                  <div className="space-y-3 pt-2">
                    {(isAr ? readerStory.paragraphsAr : readerStory.paragraphsEn).map((p, idx) => (
                      <p key={idx} className="text-sm text-neutral-800 dark:text-neutral-200 font-serif leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Paired Omnia Stores Acquisition Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#0A0D14] text-white border border-gold/40 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gold font-bold block">
                    {isAr ? 'القطعة المختارة لهذا التقرير • أمنية ستورز' : 'FEATURED ACQUISITION • OMNIA STORES'}
                  </span>
                  <h4 className="text-base font-serif font-bold mt-0.5">
                    {isAr ? readerStory.omniaPairing.nameAr : readerStory.omniaPairing.nameEn}
                  </h4>
                  <span className="text-xs font-mono text-amber-200">
                    {formatAmt(readerStory.omniaPairing.priceAed)} • Code: OMNIA-VIP15 (15% Off)
                  </span>
                </div>
                <a
                  href={readerStory.omniaPairing.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-gold via-amber-300 to-[#AA8C2C] text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:scale-105 transition-transform"
                >
                  <span>{isAr ? 'تسوق على omniastores.com' : 'Shop on omniastores.com'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
