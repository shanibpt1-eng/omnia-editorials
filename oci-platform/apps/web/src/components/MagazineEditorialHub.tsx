'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  X,
  ExternalLink,
  Crown,
  BookOpen,
  Clock,
  Globe,
  ShoppingBag,
  ShieldCheck,
  Layers,
  RefreshCw,
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

interface LiveMagazineFeedItem {
  id: string;
  publisher: string;
  publisherSlug: string;
  pillar: string;
  title: string;
  excerpt: string;
  link: string;
  publishedAt: string;
  publishedDisplay: string;
  category: string;
  author: string;
  thumbnail: string;
  isFallback?: boolean;
}

const VOGUE_SECTIONS: { id: string; labelEn: string; labelAr: string }[] = [
  { id: 'all', labelEn: 'ALL STORIES', labelAr: 'كافة الأقسام' },
  { id: 'fashion', labelEn: 'FASHION', labelAr: 'الأزياء' },
  { id: 'runway', labelEn: 'RUNWAY', labelAr: 'عروض الأزياء' },
  { id: 'beauty', labelEn: 'BEAUTY', labelAr: 'الجمال' },
  { id: 'culture', labelEn: 'CULTURE & ARTS', labelAr: 'الثقافة والفنون' },
  { id: 'living', labelEn: 'LIVING & DESIGN', labelAr: 'الديكور والتصميم' },
  { id: 'watches', labelEn: 'MENSWEAR & WATCHES', labelAr: 'الساعات والرجال' },
  { id: 'business', labelEn: 'BUSINESS', labelAr: 'أعمال الموضة' },
  { id: 'jewellery', labelEn: 'HIGH JEWELLERY', labelAr: 'المجوهرات الراقية' },
];

const PUBLISHER_TABS = [
  { slug: 'all', label: 'ALL PUBLICATIONS' },
  { slug: 'vogue', label: 'Vogue' },
  { slug: 'harpers-bazaar', label: "Harper's Bazaar" },
  { slug: 'vanity-fair', label: 'Vanity Fair' },
  { slug: 'architectural-digest', label: 'Architectural Digest' },
  { slug: 'allure', label: 'Allure' },
  { slug: 'gq', label: 'GQ' },
  { slug: 'town-and-country', label: 'Town & Country' },
  { slug: 'elle', label: 'Elle' },
  { slug: 'wwd', label: 'WWD' },
];

export function MagazineEditorialHub() {
  const { language, currency } = useLuxury();
  const isAr = language === 'ar';
  const [activeSection, setActiveSection] = useState<string>('all');
  const [selectedPublisher, setSelectedPublisher] = useState<string>('all');
  const [liveItems, setLiveItems] = useState<LiveMagazineFeedItem[]>([]);
  const [liveLoading, setLiveLoading] = useState<boolean>(true);
  const [liveMode, setLiveMode] = useState<string>('live-rss-syndication');
  const [readerLive, setReaderLive] = useState<LiveMagazineFeedItem | null>(null);
  const [readerLocal, setReaderLocal] = useState<MagazineFeatureStory | null>(null);

  const fetchLiveWire = useCallback(async (sourceSlug: string, pillarSlug: string) => {
    setLiveLoading(true);
    try {
      const qs = new URLSearchParams({
        source: sourceSlug,
        pillar: pillarSlug,
      });
      const res = await fetch(`/api/magazine/latest?${qs.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.items)) {
          setLiveItems(data.items);
          setLiveMode(data.mode || 'live-rss-syndication');
        }
      }
    } catch {
      // Resilient fallback handled by API or regional archive
    } finally {
      setLiveLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveWire(selectedPublisher, activeSection);
  }, [selectedPublisher, activeSection, fetchLiveWire]);

  const mult = currency === 'SAR' ? 1.02 : 1;
  const currLabel = currency === 'SAR' ? (isAr ? 'ر.س' : 'SAR') : (isAr ? 'د.إ' : 'AED');
  const formatAmt = (aed: number) => `${Math.round(aed * mult).toLocaleString()} ${currLabel}`;

  // Build hero + grid stories primarily from live global magazines (mirroring vogue.com)
  const leadLive = liveItems[0] || null;
  const railLiveStories = liveItems.slice(1, 6);
  const photoGridLive = liveItems.slice(6, 18);
  const remainingLive = liveItems.slice(18);

  // Regional/GCC stories mapped cleanly for dedicated Regional section or when local filter matches
  const regionalStories = useMemo(() => {
    if (activeSection === 'all') return MAGAZINE_STORIES.slice(0, 6);
    const matching = MAGAZINE_STORIES.filter((s) => s.pillar === (activeSection as MagazinePillarId));
    return matching.length > 0 ? matching : MAGAZINE_STORIES.slice(0, 3);
  }, [activeSection]);

  const activeSectionObj = VOGUE_SECTIONS.find((s) => s.id === activeSection);
  const activePubObj = PUBLISHER_TABS.find((p) => p.slug === selectedPublisher);

  return (
    <section
      aria-label="The Vogue News International Digital Magazine"
      className={`my-8 bg-white dark:bg-[#07090E] text-neutral-950 dark:text-white border-y border-neutral-200 dark:border-gold/25 ${
        isAr ? 'text-right' : 'text-left'
      }`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* 1. VOGUE.COM STYLE EDITORIAL MASTHEAD & SECTION BAR */}
      <div className="border-b border-neutral-200 dark:border-gold/20 bg-white dark:bg-[#090C13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4 text-center space-y-2.5">
          <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] font-mono uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-400">
            <span>{isAr ? 'النشرة الدولية المجمعة' : 'INTERNATIONAL DIGITAL EDITION'}</span>
            <span>•</span>
            <span className="text-[#8B6508] dark:text-gold font-bold">
              {liveMode === 'live-rss-syndication'
                ? (isAr ? 'محدث مباشرة من 9 مجلات عالمية' : 'LIVE FROM 9 GLOBAL MAGAZINES')
                : (isAr ? 'الأرشيف التحريري الموثق' : 'CURATED ARCHIVE')}
            </span>
            <span>•</span>
            <span>NEW YORK • LONDON • PARIS • DUBAI</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-serif font-black tracking-[0.04em] uppercase text-neutral-950 dark:text-white">
            THE VOGUE NEWS
          </h2>

          {/* Primary Horizontal Navigation Bar (Mirrors vogue.com top bar) */}
          <nav
            aria-label="Magazine categories"
            className="pt-3 flex items-center justify-start sm:justify-center gap-4 sm:gap-6 overflow-x-auto scrollbar-none pb-1"
          >
            {VOGUE_SECTIONS.map((sec) => {
              const active = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActiveSection(sec.id)}
                  className={`text-[11px] font-bold uppercase tracking-[0.14em] whitespace-nowrap pb-1.5 border-b-2 transition-all cursor-pointer ${
                    active
                      ? 'border-neutral-950 dark:border-gold text-neutral-950 dark:text-gold'
                      : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                  }`}
                >
                  {isAr ? sec.labelAr : sec.labelEn}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Publisher Filter Strip */}
        <div className="border-t border-neutral-100 dark:border-white/10 bg-[#FAF7F2] dark:bg-[#0B0F18]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {PUBLISHER_TABS.map((pub) => {
                const active = selectedPublisher === pub.slug;
                return (
                  <button
                    key={pub.slug}
                    type="button"
                    onClick={() => setSelectedPublisher(pub.slug)}
                    className={`px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider whitespace-nowrap rounded-full transition-colors cursor-pointer ${
                      active
                        ? 'bg-neutral-950 text-white dark:bg-gold dark:text-black'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/70 dark:hover:bg-white/10'
                    }`}
                  >
                    {pub.label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => fetchLiveWire(selectedPublisher, activeSection)}
              disabled={liveLoading}
              className="shrink-0 px-3 py-1 rounded-full border border-neutral-300 dark:border-gold/40 hover:border-neutral-950 dark:hover:border-gold text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3 h-3 ${liveLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{isAr ? 'تحديث' : 'Sync'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. VOGUE.COM HERO LEAD FEATURE SPLIT (Mirrors Screenshot #2 Editorial Typography + Portrait + Right Stories Rail) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 border-b border-neutral-200 dark:border-gold/20">
        {liveLoading && !leadLive ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-pulse">
            <div className="lg:col-span-5 h-72 bg-neutral-100 dark:bg-white/5 rounded-xl" />
            <div className="lg:col-span-4 h-96 bg-neutral-100 dark:bg-white/5 rounded-xl" />
            <div className="lg:col-span-3 h-96 bg-neutral-100 dark:bg-white/5 rounded-xl" />
          </div>
        ) : leadLive ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT: VOGUE COVER TYPOGRAPHY */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-4 lg:py-8">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.24em] font-bold">
                <span className="px-2 py-0.5 bg-neutral-950 text-white dark:bg-gold dark:text-black">
                  {leadLive.publisher}
                </span>
                <span className="text-[#8B6508] dark:text-gold">{leadLive.category}</span>
              </div>

              <h3
                onClick={() => setReaderLive(leadLive)}
                className="text-3xl sm:text-5xl font-serif font-normal tracking-tight leading-[1.08] cursor-pointer hover:underline text-neutral-950 dark:text-white"
              >
                {leadLive.title}
              </h3>

              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-serif leading-relaxed">
                {leadLive.excerpt}
              </p>

              <div className="pt-1 text-[11px] font-mono uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
                <span>BY {leadLive.author.toUpperCase()}</span>
                <span className="mx-2">•</span>
                <span>{leadLive.publishedDisplay}</span>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setReaderLive(leadLive)}
                  className="px-5 py-2.5 bg-neutral-950 dark:bg-gold text-white dark:text-black text-[11px] font-bold uppercase tracking-[0.18em] hover:opacity-90 transition-opacity cursor-pointer"
                >
                  {isAr ? 'معاينة المقال' : 'Read Story Preview'}
                </button>
                <a
                  href={leadLive.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 border border-neutral-900 dark:border-white/25 text-neutral-900 dark:text-white text-[11px] font-bold uppercase tracking-[0.14em] hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors inline-flex items-center gap-1.5"
                >
                  <span>{isAr ? `اقرأ على ${leadLive.publisher}` : `Full Story on ${leadLive.publisher}`}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* CENTER: LARGE HERO PORTRAIT PHOTO */}
            <div
              onClick={() => setReaderLive(leadLive)}
              className="lg:col-span-4 relative aspect-[4/5] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 cursor-pointer group shadow-xl"
            >
              <img
                src={leadLive.thumbnail}
                alt={leadLive.title}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.fb) {
                    target.dataset.fb = '1';
                    target.src = '/ai-models/omnia-runway-model.jpg';
                  }
                }}
                className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
              />
            </div>

            {/* RIGHT RAIL: LATEST FROM ACROSS MAGAZINES + ONE TASTEFUL PRINT SPONSOR AD */}
            <div className="lg:col-span-3 space-y-5">
              <div className="border-b-2 border-neutral-950 dark:border-gold pb-2 flex items-center justify-between">
                <span className="text-[11px] font-mono font-extrabold uppercase tracking-[0.2em]">
                  {isAr ? 'أحدث التقارير العالمية' : "TODAY'S WIRE"}
                </span>
                <span className="text-[9px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                  LIVE
                </span>
              </div>

              <div className="divide-y divide-neutral-200 dark:divide-white/10">
                {railLiveStories.map((st) => (
                  <article
                    key={st.id}
                    onClick={() => setReaderLive(st)}
                    className="py-3 first:pt-0 cursor-pointer group flex items-start gap-3"
                  >
                    <div className="relative w-14 h-14 shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                      <img
                        src={st.thumbnail}
                        alt={st.title}
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.dataset.fb) {
                            target.dataset.fb = '1';
                            target.src = '/ai-models/omnia-bridal-model.jpg';
                          }
                        }}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="min-w-0 space-y-0.5">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#8B6508] dark:text-gold font-bold block truncate">
                        {st.publisher} • {st.category}
                      </span>
                      <h4 className="text-xs font-serif font-bold leading-snug group-hover:underline line-clamp-2">
                        {st.title}
                      </h4>
                    </div>
                  </article>
                ))}
              </div>

              {/* Single Cleanly Labeled Print Ad Box */}
              <a
                href="https://omniastores.com/collections/brooches"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl overflow-hidden border border-neutral-200 dark:border-gold/35 bg-[#090C13] text-white shadow-md group"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src="/press/omnia-fouad-founder-spread.png"
                    alt="Omnia Stores Partner Showcase"
                    fill
                    unoptimized
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/80 text-white/80 text-[8px] font-mono uppercase tracking-widest">
                    ADVERTISEMENT
                  </span>
                  <div className="absolute bottom-2.5 inset-x-3 flex items-end justify-between gap-2">
                    <div>
                      <span className="text-[8px] font-mono uppercase tracking-widest text-gold font-bold block">
                        OMNIASTORES.COM
                      </span>
                      <h5 className="text-xs font-serif font-bold leading-tight">
                        {isAr ? 'مختارات الفضة 925 والبروشات' : 'The 925 Brooch & Bridal Vault'}
                      </h5>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-gold shrink-0" />
                  </div>
                </div>
              </a>
            </div>
          </div>
        ) : (
          <div className="py-12 text-center space-y-3">
            <p className="text-sm font-serif text-neutral-500">
              {isAr
                ? 'لا توجد مقالات مطابقة لهذا التصفية حالياً في البث المباشر.'
                : `No live articles matched "${activePubObj?.label}" under "${activeSectionObj?.labelEn}".`}
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveSection('all');
                setSelectedPublisher('all');
              }}
              className="px-4 py-2 bg-neutral-950 dark:bg-gold text-white dark:text-black text-xs font-mono font-bold uppercase cursor-pointer"
            >
              {isAr ? 'عرض جميع المجلات' : 'Reset Filters'}
            </button>
          </div>
        )}
      </div>

      {/* 3. VOGUE.COM 3-COLUMN FULL-BLEED PHOTO GRID (Mirrors Screenshot #3 — Pure Global Magazine Grid!) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {photoGridLive.length > 0 && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-neutral-950 dark:border-gold/40 pb-3">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#8B6508] dark:text-gold" />
                <h3 className="text-sm font-mono font-extrabold uppercase tracking-[0.2em]">
                  {activeSection === 'all'
                    ? (isAr ? 'مختارات اليوم من المجلات العالمية' : "TODAY'S STORIES — FASHION, ARTS, BEAUTY, LIVING & CULTURE")
                    : (isAr
                        ? `مقالات ${activeSectionObj?.labelAr}`
                        : `${activeSectionObj?.labelEn} DISPATCHES`)}
                </h3>
              </div>
              <span className="text-[11px] font-mono text-neutral-500">
                {photoGridLive.length + (remainingLive.length > 0 ? remainingLive.length : 0)}{' '}
                {isAr ? 'مقالاً عالمياً محدثاً' : 'Live Syndicated Features'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {photoGridLive.map((story) => (
                <article
                  key={story.id}
                  onClick={() => setReaderLive(story)}
                  className="group relative aspect-[4/5] w-full overflow-hidden bg-neutral-900 cursor-pointer shadow-lg border border-neutral-200 dark:border-white/10"
                >
                  <img
                    src={story.thumbnail}
                    alt={story.title}
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

                  {/* Clean Publisher Tag (Top Left) */}
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-white/95 dark:bg-black/85 text-neutral-950 dark:text-white text-[9px] font-mono font-extrabold uppercase tracking-widest">
                    {story.publisher}
                  </span>

                  {/* Bottom Full-Bleed Overlay Typography (Mirrors Vogue.com Screenshot #3) */}
                  <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-300 font-bold block">
                      {story.category}
                    </span>
                    <h4 className="text-lg sm:text-xl font-serif font-medium leading-snug group-hover:underline line-clamp-3">
                      {story.title}
                    </h4>
                    <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-neutral-300 pt-1">
                      BY {story.author.toUpperCase()}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {/* Additional Live Wire Row (Compact Newspaper Columns for Fast Scanning) */}
            {remainingLive.length > 0 && (
              <div className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-t border-neutral-200 dark:border-white/10">
                {remainingLive.slice(0, 6).map((brief) => (
                  <div
                    key={brief.id}
                    onClick={() => setReaderLive(brief)}
                    className="p-4 rounded-xl border border-neutral-200 dark:border-white/10 bg-[#FAF7F2] dark:bg-[#0B0F18] hover:border-gold/50 cursor-pointer flex items-start gap-3 transition-colors"
                  >
                    <img
                      src={brief.thumbnail}
                      alt={brief.title}
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.fb) {
                          target.dataset.fb = '1';
                          target.src = '/campaigns/golden-nocturne.jpg';
                        }
                      }}
                      className="w-20 h-20 object-cover rounded-lg shrink-0 bg-neutral-900"
                    />
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-2 text-[9px] font-mono text-[#8B6508] dark:text-gold font-bold uppercase">
                        <span>{brief.publisher}</span>
                        <span className="text-neutral-500">{brief.publishedDisplay}</span>
                      </div>
                      <h5 className="text-xs sm:text-sm font-serif font-bold leading-snug line-clamp-2 hover:underline">
                        {brief.title}
                      </h5>
                      <span className="text-[10px] text-neutral-500 font-mono block truncate">
                        BY {brief.author.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 4. SPONSORED LUXURY ADVERTISEMENT BANNER (Clean Ad Placement — Separated From Editorial News) */}
        <div className="rounded-2xl bg-gradient-to-r from-[#0A0D14] via-[#171E2E] to-[#0A0D14] text-white border border-gold/45 p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-gold text-[10px] font-mono uppercase tracking-[0.22em] font-bold">
              <Crown className="w-3.5 h-3.5" />
              <span>{isAr ? 'مساحة إعلانية • الشريك الفاخر المعتمد' : 'ADVERTISEMENT • SPONSORED MAISON PARTNER'}</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-serif font-bold">
              {isAr
                ? 'أمنية ستورز (omniastores.com): مجوهرات الفضة عيار 925 وأطقم العرائس'
                : 'Omnia Stores (omniastores.com): DCL-Assayed 925 Bridal Suites & Brooches'}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-serif leading-relaxed">
              {isAr
                ? 'استمتعي بخصم 15% حصرياً لقراء المجلة باستخدام كود OMNIA-VIP15 مع توصيل مؤمّن خلال 24 ساعة وتقسيط تابي على 4 دفعات.'
                : 'Exclusive 15% reader privilege with code OMNIA-VIP15 across 925 sterling silver bridal suites, pearl chokers, and brooches — backed by 24h UAE/GCC delivery.'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/brands/omnia-stores"
              className="px-5 py-3 rounded-xl border border-gold/40 text-gold hover:bg-gold/10 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              {isAr ? 'ملف العلامة' : 'Brand Profile'}
            </Link>
            <a
              href="https://omniastores.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-gold via-amber-300 to-[#AA8C2C] text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:scale-105 transition-transform"
            >
              <span>{isAr ? 'زيارة omniastores.com' : 'Shop omniastores.com'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 5. REGIONAL GCC & MIDDLE EAST EDITORIAL FEATURES */}
        <div className="pt-2 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-neutral-950 dark:border-gold/40 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#8B6508] dark:text-gold" />
              <h3 className="text-sm font-mono font-extrabold uppercase tracking-[0.2em]">
                {isAr ? 'الطبعة الإقليمية: الخليج والشرق الأوسط' : 'MIDDLE EAST & GCC SPECIAL REPORTS'}
              </h3>
            </div>
            <span className="text-[10px] font-mono text-neutral-500">
              {regionalStories.length} {isAr ? 'تقارير إقليمية' : 'Regional Features'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {regionalStories.map((story) => (
              <article
                key={story.id}
                onClick={() => setReaderLocal(story)}
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
                <div className="absolute bottom-0 inset-x-0 p-5 text-white space-y-1.5">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-300 font-bold block">
                    {isAr ? story.tagAr : story.tagEn}
                  </span>
                  <h4 className="text-base sm:text-lg font-serif font-medium leading-snug group-hover:underline">
                    {isAr ? story.titleAr : story.titleEn}
                  </h4>
                  <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-neutral-300 pt-1">
                    {isAr ? `بقلم ${story.author}` : `BY ${story.author.toUpperCase()}`}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* 6. SHOPPING • THE PARTNER MARKETPLACE EDIT */}
        <div className="pt-2 space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-neutral-950 dark:border-gold/40 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8B6508] dark:text-gold font-bold block">
                {isAr ? 'دليل التسوق • مختارات الشركاء' : 'MARKETPLACE • CURATED HIGH JEWELLERY SHOPPING'}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-black mt-0.5">
                {isAr ? 'أبرز القطع المختارة على omniastores.com' : 'Curated Collector Pieces on omniastores.com'}
              </h3>
            </div>
            <a
              href="https://omniastores.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-neutral-950 dark:bg-gold text-white dark:text-black text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 hover:opacity-90"
            >
              <span>{isAr ? 'تسوق الآن' : 'Browse Shop'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {MAGAZINE_SHOPPING_EDIT.slice(0, 4).map((prod) => (
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
                <div className="p-4 space-y-1.5">
                  <h4 className="text-sm font-serif font-bold leading-snug group-hover:text-[#8B6508] dark:group-hover:text-gold transition-colors">
                    {isAr ? prod.nameAr : prod.nameEn}
                  </h4>
                  <div className="pt-1.5 border-t border-neutral-200 dark:border-white/10 flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-[#8B6508] dark:text-gold">{formatAmt(prod.priceAed)}</span>
                    <span className="font-bold uppercase tracking-wider text-[10px] flex items-center gap-1">
                      <ShoppingBag className="w-3 h-3" />
                      <span>{isAr ? 'اقتناء' : 'Shop'}</span>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* 7. COLLECTIBLE DIGITAL ISSUES SHELF */}
        <div className="pt-2 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-neutral-950 dark:border-gold/40 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#8B6508] dark:text-gold" />
              <h3 className="text-sm font-mono font-extrabold uppercase tracking-[0.2em]">
                {isAr ? 'أرشيف أعداد المجلة الفصلية' : 'COLLECTIBLE DIGITAL ISSUES ARCHIVE'}
              </h3>
            </div>
            <span className="text-[10px] font-mono text-neutral-500">
              {isAr ? 'اضغط على أي عدد لتصفح قسمه' : 'Select any cover to filter its section'}
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {MAGAZINE_ISSUES.map((issue) => (
              <button
                key={issue.id}
                type="button"
                onClick={() => setActiveSection(issue.linkedPillar)}
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

        {/* 8. VERIFIED EDITORIAL ATTRIBUTION DIGEST */}
        <div className="pt-2 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-neutral-950 dark:border-gold/40 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="text-sm font-mono font-extrabold uppercase tracking-[0.2em]">
                {isAr ? 'موجز الصحافة الإقليمية الموثق' : 'REGIONAL LUXURY PRESS INDEX'}
              </h3>
            </div>
            <span className="text-[10px] font-mono text-neutral-500">
              {MAGAZINE_PILLARS.length - 1} {isAr ? 'قطاعات تحريرية' : 'Verified Sectors'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PUBLISHER_WIRE_DIGEST.map((pub) => (
              <div
                key={pub.id}
                className="p-4 rounded-xl border border-neutral-200 dark:border-white/10 bg-[#FAF7F2] dark:bg-[#0C101A] flex flex-col justify-between gap-2.5"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="px-2 py-0.5 rounded bg-neutral-900 dark:bg-gold text-white dark:text-black font-bold">
                      {pub.publisher}
                    </span>
                    <span className="text-neutral-500">{pub.region}</span>
                  </div>
                  <h4 className="text-sm font-serif font-bold text-neutral-950 dark:text-white leading-snug">
                    {isAr ? pub.headlineAr : pub.headlineEn}
                  </h4>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {isAr ? pub.takeawayAr : pub.takeawayEn}
                  </p>
                </div>
                <div className="pt-2 border-t border-neutral-200 dark:border-white/10 text-[10px] font-mono text-neutral-500">
                  {pub.category} • {pub.publishedDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* READER MODAL FOR SYNDICATED GLOBAL ARTICLES (Clean Publisher Attribution — No Forced Omnia Upsells) */}
      {readerLive && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setReaderLive(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#0D111A] text-neutral-950 dark:text-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-300 dark:border-gold/40 flex flex-col"
          >
            <div className="px-5 py-4 border-b border-neutral-200 dark:border-white/10 flex items-center justify-between bg-[#FAF7F2] dark:bg-[#090C13]">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest font-bold">
                <span className="px-2 py-0.5 bg-neutral-950 text-white dark:bg-gold dark:text-black">
                  {readerLive.publisher}
                </span>
                <span className="text-[#8B6508] dark:text-gold">{readerLive.category}</span>
              </div>
              <button
                type="button"
                onClick={() => setReaderLive(null)}
                aria-label="Close reader"
                className="p-2 rounded-full bg-neutral-200/70 dark:bg-white/10 hover:bg-gold hover:text-black transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto p-5 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-5 relative aspect-[4/5] rounded-2xl overflow-hidden bg-black">
                  <img
                    src={readerLive.thumbnail}
                    alt={readerLive.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="md:col-span-7 space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold leading-tight">
                    {readerLive.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    <span className="font-bold text-neutral-900 dark:text-gold">BY {readerLive.author.toUpperCase()}</span>
                    <span>•</span>
                    <span>{readerLive.publishedDisplay}</span>
                  </div>
                  <p className="text-base text-neutral-700 dark:text-neutral-200 font-serif leading-relaxed border-l-2 border-neutral-900 dark:border-gold pl-4">
                    {readerLive.excerpt}
                  </p>
                  <p className="text-xs font-mono text-neutral-500">
                    {isAr
                      ? `هذا الموجز منقول مع التوثيق التحريري المباشر من ${readerLive.publisher}. لقراءة التحقيق الكامل والصور الأصلية، انتقل إلى الموقع الرسمي للناشر.`
                      : `Syndicated editorial digest attributed directly to ${readerLive.publisher}. Read the complete feature and gallery on the official publisher edition.`}
                  </p>
                  <div className="pt-2">
                    <a
                      href={readerLive.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-950 dark:bg-gold text-white dark:text-black font-extrabold text-xs uppercase tracking-[0.16em] hover:opacity-90 transition-opacity"
                    >
                      <span>{isAr ? `قراءة المقال كاملاً في ${readerLive.publisher}` : `Read Full Story on ${readerLive.publisher}`}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* READER MODAL FOR REGIONAL GCC FEATURES */}
      {readerLocal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setReaderLocal(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#0D111A] text-neutral-950 dark:text-white rounded-3xl overflow-hidden shadow-2xl border border-gold/40 flex flex-col"
          >
            <div className="px-5 py-4 border-b border-neutral-200 dark:border-gold/25 flex items-center justify-between bg-[#FAF7F2] dark:bg-[#090C13]">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#8B6508] dark:text-gold font-bold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{isAr ? readerLocal.tagAr : readerLocal.tagEn}</span>
              </div>
              <button
                type="button"
                onClick={() => setReaderLocal(null)}
                aria-label="Close reader"
                className="p-2 rounded-full bg-neutral-200/70 dark:bg-white/10 hover:bg-gold hover:text-black transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto p-5 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-5 relative aspect-[4/5] rounded-2xl overflow-hidden bg-black">
                  <Image
                    src={readerLocal.coverImage}
                    alt={isAr ? readerLocal.titleAr : readerLocal.titleEn}
                    fill
                    unoptimized
                    className="object-cover object-top"
                  />
                </div>
                <div className="md:col-span-7 space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold leading-tight">
                    {isAr ? readerLocal.titleAr : readerLocal.titleEn}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    <span className="font-bold text-neutral-900 dark:text-gold">{readerLocal.author}</span>
                    <span>•</span>
                    <span>{readerLocal.authorRole}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {readerLocal.readTime}
                    </span>
                  </div>
                  <p className="text-sm italic text-neutral-700 dark:text-neutral-300 font-serif border-l-2 border-gold pl-3">
                    {isAr ? readerLocal.subtitleAr : readerLocal.subtitleEn}
                  </p>
                  <div className="space-y-3 pt-2">
                    {(isAr ? readerLocal.paragraphsAr : readerLocal.paragraphsEn).map((p, idx) => (
                      <p key={idx} className="text-sm text-neutral-800 dark:text-neutral-200 font-serif leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
