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
  Clock,
  Globe,
  ShoppingBag,
  ShieldCheck,
  Layers,
} from 'lucide-react';
import {
  MAGAZINE_PILLARS,
  MAGAZINE_STORIES,
  MAGAZINE_ISSUES,
  MAGAZINE_SHOPPING_EDIT,
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
  const latestSideStories = MAGAZINE_STORIES.filter((s) => s.id !== leadStory.id).slice(0, 4);
  const mostReadSideStories = MAGAZINE_STORIES.filter((s) => s.id !== leadStory.id).slice(4, 6);

  const gridStories =
    activePillar === 'all'
      ? MAGAZINE_STORIES.filter((s) => s.id !== leadStory.id)
      : MAGAZINE_STORIES.filter((s) => s.pillar === activePillar);

  return (
    <section
      aria-label="The Vogue News Digital Magazine & Multi-Industry Editorial"
      className={`my-10 bg-white dark:bg-[#07090E] text-neutral-950 dark:text-white border-y border-neutral-200 dark:border-gold/25 ${
        isAr ? 'text-right' : 'text-left'
      }`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* 1. VOGUE-INSPIRED MONOCHROME MAGAZINE MASTHEAD & INDUSTRY BAR */}
      <div className="border-b border-neutral-200 dark:border-gold/20 bg-white dark:bg-[#090C13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-5 text-center space-y-3">
          <div className="flex items-center justify-center gap-3 text-[10px] font-mono uppercase tracking-[0.25em] text-[#8B6508] dark:text-gold">
            <span>{isAr ? 'إصدار المجلة الرقمية • العدد 38' : 'DIGITAL MAGAZINE EDITION • ISSUE NO. 38'}</span>
            <span>•</span>
            <span>{isAr ? 'كافة القطاعات الفاخرة' : 'ALL LUXURY INDUSTRIES'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-[0.06em] uppercase text-neutral-950 dark:text-white">
            THE VOGUE NEWS
          </h2>

          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-serif max-w-2xl mx-auto">
            {isAr
              ? 'الأزياء، عروض المدارج، المجوهرات الراقية، الجمال، الثقافة والفنون، نمط الحياة الفاخر واقتصاد الفخامة الخليجي — بالتعاون مع أمنية ستورز'
              : 'Fashion, Runway, High Jewellery, Beauty, Culture & Arts, Luxury Living & GCC Business — Presented with Flagship Partner Omnia Stores'}
          </p>

          {/* Clean Horizontal Pillar Navigation */}
          <div className="pt-4 flex items-center justify-start sm:justify-center gap-3 sm:gap-5 overflow-x-auto scrollbar-none pb-1">
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

      {/* 2. VOGUE-STYLE 3-COLUMN "TOP STORIES" HERO SPLIT (When ALL EDITIONS selected) */}
      {activePillar === 'all' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 border-b border-neutral-200 dark:border-gold/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
            {/* LEFT RAIL: THE LATEST (4 Stacked Stories) */}
            <div className="lg:col-span-3 space-y-5 order-2 lg:order-1">
              <div className="border-b-2 border-neutral-950 dark:border-gold pb-2 flex items-center justify-between">
                <span className="text-[11px] font-mono font-extrabold uppercase tracking-[0.2em]">
                  {isAr ? 'أحدث المقالات' : 'THE LATEST'}
                </span>
                <span className="text-[10px] font-mono text-[#8B6508] dark:text-gold font-bold">LIVE WIRE</span>
              </div>

              <div className="divide-y divide-neutral-200 dark:divide-white/10">
                {latestSideStories.map((st) => (
                  <article
                    key={st.id}
                    onClick={() => setReaderStory(st)}
                    className="py-3.5 first:pt-0 cursor-pointer group flex items-start gap-3"
                  >
                    <div className="relative w-16 h-16 shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                      <Image
                        src={st.coverImage}
                        alt={isAr ? st.titleAr : st.titleEn}
                        fill
                        unoptimized
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="min-w-0 space-y-1">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#8B6508] dark:text-gold font-bold block">
                        {isAr ? st.tagAr : st.tagEn}
                      </span>
                      <h4 className="text-xs sm:text-sm font-serif font-bold leading-snug group-hover:underline line-clamp-2">
                        {isAr ? st.titleAr : st.titleEn}
                      </h4>
                      <span className="text-[9px] font-mono uppercase text-neutral-500 block">
                        {st.author}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* CENTER COLUMN: COVER STORY FEATURE */}
            <div className="lg:col-span-6 order-1 lg:order-2 lg:px-4 lg:border-x border-neutral-200 dark:border-white/10 space-y-5">
              <div
                onClick={() => setReaderStory(leadStory)}
                className="relative aspect-[4/5] w-full max-h-[540px] overflow-hidden bg-neutral-100 dark:bg-neutral-900 cursor-pointer group shadow-xl"
              >
                <Image
                  src={leadStory.coverImage}
                  alt={isAr ? leadStory.titleAr : leadStory.titleEn}
                  fill
                  unoptimized
                  className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-neutral-950/90 text-white text-[9px] font-mono uppercase tracking-[0.2em]">
                  {isAr ? 'قصة الغلاف' : 'COVER STORY'}
                </div>
              </div>

              <div className="text-center space-y-3 px-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8B6508] dark:text-gold font-bold block">
                  {isAr ? leadStory.tagAr : leadStory.tagEn}
                </span>
                <h3
                  onClick={() => setReaderStory(leadStory)}
                  className="text-2xl sm:text-4xl font-serif font-medium tracking-tight leading-[1.15] cursor-pointer hover:underline"
                >
                  {isAr ? leadStory.titleAr : leadStory.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-serif leading-relaxed max-w-lg mx-auto">
                  {isAr ? leadStory.subtitleAr : leadStory.subtitleEn}
                </p>
                <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-500">
                  {isAr ? `بقلم ${leadStory.author}` : `BY ${leadStory.author.toUpperCase()}`} • {leadStory.date}
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setReaderStory(leadStory)}
                    className="px-5 py-2.5 bg-neutral-950 dark:bg-gold text-white dark:text-black text-[11px] font-bold uppercase tracking-[0.18em] hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    {isAr ? 'قراءة ملف الغلاف' : 'Read Cover Feature'}
                  </button>
                  <a
                    href={leadStory.omniaPairing.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 border border-neutral-900 dark:border-gold/50 text-neutral-900 dark:text-gold text-[11px] font-bold uppercase tracking-[0.14em] hover:bg-gold hover:text-black hover:border-gold transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>{isAr ? 'تسوق على أمنية' : 'Shop Omnia Pairing'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT RAIL: MOST READ + VERTICAL OMNIA PRINT AD CARD */}
            <div className="lg:col-span-3 space-y-5 order-3">
              <div className="border-b-2 border-neutral-950 dark:border-gold pb-2 flex items-center justify-between">
                <span className="text-[11px] font-mono font-extrabold uppercase tracking-[0.2em]">
                  {isAr ? 'الأكثر قراءة وإعلان أمنية' : 'MOST READ & ATELIER'}
                </span>
              </div>

              <div className="divide-y divide-neutral-200 dark:divide-white/10">
                {mostReadSideStories.map((st, idx) => (
                  <article
                    key={st.id}
                    onClick={() => setReaderStory(st)}
                    className="py-3 first:pt-0 cursor-pointer group space-y-1"
                  >
                    <div className="flex items-center gap-2 text-[9px] font-mono text-[#8B6508] dark:text-gold font-bold">
                      <span>0{idx + 1}</span>
                      <span>•</span>
                      <span>{isAr ? st.tagAr : st.tagEn}</span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-serif font-bold leading-snug group-hover:underline">
                      {isAr ? st.titleAr : st.titleEn}
                    </h4>
                  </article>
                ))}
              </div>

              {/* Vertical Vogue-Style Print Ad Card for Omnia Stores */}
              <a
                href="https://omniastores.com/collections/brooches"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl overflow-hidden border border-gold/45 bg-[#090C13] text-white shadow-xl group"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src="/banners/marquise-floral-empress.jpg"
                    alt="Omnia Stores Official Brooch & Bridal Collection"
                    fill
                    unoptimized
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                  <span className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-black/80 text-gold text-[8px] font-mono uppercase tracking-widest border border-gold/40">
                    ADVERTISEMENT
                  </span>
                  <div className="absolute bottom-3 inset-x-3 space-y-1.5">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-gold font-bold block">
                      OMNIASTORES.COM
                    </span>
                    <h5 className="text-base font-serif font-bold leading-tight">
                      {isAr ? 'تشكيلة البروشات وأطقم الزفاف 925' : 'The 925 Brooch & Bridal Vault'}
                    </h5>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gold text-black text-[10px] font-extrabold uppercase tracking-wider mt-1">
                      <span>{isAr ? 'تسوق الآن' : 'Shop Collection'}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 3. MULTI-INDUSTRY 3-COLUMN FULL-BLEED PHOTO GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-neutral-950 dark:border-gold/40 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#8B6508] dark:text-gold" />
            <h3 className="text-sm font-mono font-extrabold uppercase tracking-[0.2em]">
              {activePillar === 'all'
                ? (isAr ? 'أرشيف المجلة عبر كافة القطاعات' : 'CULTURE, FASHION, RUNWAY, BEAUTY & BUSINESS')
                : (isAr ? `قسم: ${MAGAZINE_PILLARS.find((p) => p.id === activePillar)?.labelAr}` : `${MAGAZINE_PILLARS.find((p) => p.id === activePillar)?.labelEn} STORIES`)}
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

              {/* Top Right Omnia Tie-In Pill */}
              <a
                href={story.omniaPairing.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/80 hover:bg-gold text-gold hover:text-black border border-gold/40 text-[9px] font-mono font-bold uppercase tracking-wider transition-colors flex items-center gap-1 z-10"
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

        {/* 4. SHOPPING • THE OMNIA EDIT (Vogue-Style 4-Column Shoppable Product Magazine Grid) */}
        <div className="pt-4 space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-neutral-950 dark:border-gold/40 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8B6508] dark:text-gold font-bold block">
                {isAr ? 'التسوق التحريري • مختارات أمنية ستورز' : 'SHOPPING • THE OMNIA STORES EDIT'}
              </span>
              <h3 className="text-xl sm:text-3xl font-serif font-black mt-0.5">
                {isAr ? 'مختارات المحررين من متجر omniastores.com' : 'Editor-Curated Acquisitions on omniastores.com'}
              </h3>
            </div>
            <a
              href="https://omniastores.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-neutral-950 dark:bg-gold text-white dark:text-black text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 hover:opacity-90"
            >
              <span>{isAr ? 'تسوق كافة التشكيلات' : 'Shop All on omniastores.com'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MAGAZINE_SHOPPING_EDIT.map((prod) => (
              <a
                key={prod.id}
                href={prod.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-neutral-200 dark:border-gold/25 bg-[#FAF7F2] dark:bg-[#0D111A] hover:border-gold transition-all flex flex-col justify-between overflow-hidden"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-black">
                  <Image
                    src={prod.image}
                    alt={isAr ? prod.nameAr : prod.nameEn}
                    fill
                    unoptimized
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black/85 text-gold text-[9px] font-mono font-bold uppercase tracking-wider border border-gold/30">
                    {isAr ? prod.badgeAr : prod.badgeEn}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <h4 className="text-sm font-serif font-bold leading-snug group-hover:text-[#8B6508] dark:group-hover:text-gold transition-colors">
                    {isAr ? prod.nameAr : prod.nameEn}
                  </h4>
                  <p className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                    {isAr ? prod.specAr : prod.specEn}
                  </p>
                  <div className="pt-2 border-t border-neutral-200 dark:border-white/10 flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-[#8B6508] dark:text-gold">{formatAmt(prod.priceAed)}</span>
                    <span className="font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                      <span>{isAr ? 'اقتناء' : 'Shop'}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* 5. FULL-WIDTH OMNIA STORES MAGAZINE PRINT ADVERTORIAL SPREAD */}
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

        {/* 6. COLLECTIBLE DIGITAL MAGAZINE ISSUES SHELF */}
        <div className="pt-4 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-neutral-950 dark:border-gold/40 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#8B6508] dark:text-gold" />
              <h3 className="text-sm font-mono font-extrabold uppercase tracking-[0.2em]">
                {isAr ? 'أرشيف أعداد المجلة الفصلية' : 'COLLECTIBLE DIGITAL ISSUES ARCHIVE'}
              </h3>
            </div>
            <span className="text-[10px] font-mono text-neutral-500">
              {isAr ? 'اضغط على أي عدد لتصفح مقالاته' : 'Click any issue cover to filter its edition'}
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {MAGAZINE_ISSUES.map((issue) => (
              <button
                key={issue.id}
                type="button"
                onClick={() => setActivePillar(issue.linkedPillar)}
                className="group text-left rtl:text-right border border-neutral-200 dark:border-gold/25 bg-[#FAF7F2] dark:bg-[#0D111A] hover:border-gold transition-all overflow-hidden cursor-pointer"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
                  <Image
                    src={issue.coverImage}
                    alt={isAr ? issue.titleAr : issue.titleEn}
                    fill
                    unoptimized
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/40" />
                  <div className="absolute top-3 inset-x-3 text-center text-white">
                    <span className="text-xs sm:text-sm font-serif font-black tracking-[0.18em] block opacity-95">
                      THE VOGUE NEWS
                    </span>
                    <span className="text-[9px] font-mono text-gold tracking-widest block">
                      {issue.issueNumber}
                    </span>
                  </div>
                  <div className="absolute bottom-3 inset-x-3 text-white space-y-1">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-amber-300 font-bold block">
                      {isAr ? issue.seasonAr : issue.seasonEn}
                    </span>
                    <h4 className="text-xs sm:text-sm font-serif font-bold leading-snug">
                      {isAr ? issue.titleAr : issue.titleEn}
                    </h4>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 7. MULTI-PUBLISHER INDUSTRY PRESS RADAR */}
        <div className="pt-4 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-neutral-950 dark:border-gold/40 pb-3">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#8B6508] dark:text-gold" />
              <h3 className="text-sm font-mono font-extrabold uppercase tracking-[0.2em]">
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

      {/* 8. INTERACTIVE MAGAZINE READER MODAL */}
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
