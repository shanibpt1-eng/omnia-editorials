'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ExternalLink,
  Crown,
  BookOpen,
  Globe,
  ShoppingBag,
  ShieldCheck,
  Layers,
  RefreshCw,
  Search,
  ArrowUpRight,
  Sparkles,
  Link2,
  Newspaper,
  Tv,
  X,
  Clock,
} from 'lucide-react';
import {
  MAGAZINE_PILLARS,
  MAGAZINE_STORIES,
  MAGAZINE_ISSUES,
  MAGAZINE_SHOPPING_EDIT,
  MagazinePillarId,
  MagazineFeatureStory,
} from '../data/magazine-editions-data';
import { useLuxury } from './ThemeProvider';
import { LiveMagazineFeedItem } from '../lib/magazine-wire';
import { buildArticleHref } from './PortalArticleReader';

const VOGUE_SECTIONS: { id: string; labelEn: string; labelAr: string }[] = [
  { id: 'all', labelEn: 'ALL STORIES', labelAr: 'كافة الأقسام' },
  { id: 'fashion', labelEn: 'FASHION', labelAr: 'الأزياء' },
  { id: 'runway', labelEn: 'RUNWAY', labelAr: 'عروض الأزياء' },
  { id: 'beauty', labelEn: 'BEAUTY', labelAr: 'الجمال' },
  { id: 'culture', labelEn: 'CULTURE & ARTS', labelAr: 'الثقافة والفنون' },
  { id: 'living', labelEn: 'LIVING & DESIGN', labelAr: 'الديكور والتصميم' },
  { id: 'watches', labelEn: 'MENSWEAR & WATCHES', labelAr: 'الساعات والرجال' },
  { id: 'business', labelEn: 'BUSINESS & MARKETS', labelAr: 'الاقتصاد والأعمال' },
  { id: 'jewellery', labelEn: 'HIGH JEWELLERY', labelAr: 'المجوهرات الراقية' },
];

const PUBLISHER_TABS: {
  slug: string;
  label: string;
  type: 'all' | 'magazine' | 'news-channel';
  homeUrl: string;
}[] = [
  { slug: 'all', label: 'ALL 25 SOURCES', type: 'all', homeUrl: 'https://www.vogue.com/' },
  { slug: 'vogue', label: 'Vogue', type: 'magazine', homeUrl: 'https://www.vogue.com/' },
  { slug: 't-magazine', label: 'T Magazine (NYT)', type: 'magazine', homeUrl: 'https://www.nytimes.com/section/t-magazine' },
  { slug: 'harpers-bazaar', label: "Harper's Bazaar", type: 'magazine', homeUrl: 'https://www.harpersbazaar.com/' },
  { slug: 'robb-report', label: 'Robb Report', type: 'magazine', homeUrl: 'https://robbreport.com/' },
  { slug: 'vanity-fair', label: 'Vanity Fair', type: 'magazine', homeUrl: 'https://www.vanityfair.com/' },
  { slug: 'architectural-digest', label: 'Architectural Digest', type: 'magazine', homeUrl: 'https://www.architecturaldigest.com/' },
  { slug: 'new-yorker', label: 'The New Yorker', type: 'magazine', homeUrl: 'https://www.newyorker.com/culture' },
  { slug: 'allure', label: 'Allure', type: 'magazine', homeUrl: 'https://www.allure.com/' },
  { slug: 'glamour', label: 'Glamour', type: 'magazine', homeUrl: 'https://www.glamour.com/' },
  { slug: 'gq', label: 'GQ', type: 'magazine', homeUrl: 'https://www.gq.com/' },
  { slug: 'esquire', label: 'Esquire', type: 'magazine', homeUrl: 'https://www.esquire.com/' },
  { slug: 'town-and-country', label: 'Town & Country', type: 'magazine', homeUrl: 'https://www.townandcountrymag.com/' },
  { slug: 'elle', label: 'Elle', type: 'magazine', homeUrl: 'https://www.elle.com/' },
  { slug: 'house-beautiful', label: 'House Beautiful', type: 'magazine', homeUrl: 'https://www.housebeautiful.com/' },
  { slug: 'hypebeast', label: 'Hypebeast', type: 'magazine', homeUrl: 'https://hypebeast.com/' },
  { slug: 'nyt-fashion', label: 'NYTimes Fashion', type: 'news-channel', homeUrl: 'https://www.nytimes.com/section/fashion' },
  { slug: 'bbc-culture', label: 'BBC News Culture', type: 'news-channel', homeUrl: 'https://www.bbc.com/news/entertainment_and_arts' },
  { slug: 'bbc-world', label: 'BBC World News', type: 'news-channel', homeUrl: 'https://www.bbc.com/news/world' },
  { slug: 'guardian-fashion', label: 'Guardian Fashion', type: 'news-channel', homeUrl: 'https://www.theguardian.com/fashion' },
  { slug: 'guardian-culture', label: 'Guardian Culture', type: 'news-channel', homeUrl: 'https://www.theguardian.com/culture' },
  { slug: 'wwd', label: 'WWD News', type: 'news-channel', homeUrl: 'https://wwd.com/' },
  { slug: 'arabian-business', label: 'Arabian Business', type: 'news-channel', homeUrl: 'https://www.arabianbusiness.com/' },
  { slug: 'luxury-daily', label: 'Luxury Daily', type: 'news-channel', homeUrl: 'https://www.luxurydaily.com/' },
  { slug: 'cnbc-retail', label: 'CNBC Retail', type: 'news-channel', homeUrl: 'https://www.cnbc.com/retail/' },
  { slug: 'aljazeera-world', label: 'Al Jazeera', type: 'news-channel', homeUrl: 'https://www.aljazeera.com/' },
];

const OMNIA_AUTHORITY_BACKLINKS = [
  { anchorEn: 'Omnia Stores Official GCC 925 Silver Flagship', anchorAr: 'المتجر الرسمي لأمنية ستورز للفضة الفاخرة عيار 925', url: 'https://omniastores.com/', tag: 'FLAGSHIP' },
  { anchorEn: 'Bridal Jewellery Sets & Couture Diamond Parures', anchorAr: 'أطقم مجوهرات العرائس الفاخرة', url: 'https://omniastores.com/collections/bridal-sets', tag: 'BRIDAL SETS' },
  { anchorEn: 'DCL-Assayed 925 Bridal Collection & Collars', anchorAr: 'تشكيلة العرائس المعتمدة عيار 925', url: 'https://omniastores.com/collections/bridal-collection', tag: 'COLLECTION' },
  { anchorEn: 'Sculptural 925 Brooches & Abaya Silk Pins', anchorAr: 'تشكيلة البروشات الملكية عيار 925', url: 'https://omniastores.com/collections/brooches', tag: 'NEW DROP' },
  { anchorEn: 'Imperial South Sea Pearl & Emerald Chokers', anchorAr: 'أطواق التشوكر باللؤلؤ والزمرد', url: 'https://omniastores.com/collections/chokers-collection', tag: 'CHOKERS' },
  { anchorEn: '58-Facet 5A Simulated Diamond & Pendant Necklaces', anchorAr: 'العقود والقلادات المرصعة بأحجار 5A', url: 'https://omniastores.com/collections/necklaces', tag: 'NECKLACES' },
  { anchorEn: 'High-Dispersion Drop Earrings & Evening Studs', anchorAr: 'الأقراط المتدلية وأقراط السهرة الفاخرة', url: 'https://omniastores.com/collections/earrings', tag: 'EARRINGS' },
  { anchorEn: 'GRA Moissanite Solitaires & Cocktail Rings', anchorAr: 'خواتم السوليتير والمويسانيت المعتمدة', url: 'https://omniastores.com/collections/rings', tag: 'RINGS' },
  { anchorEn: 'Seasonal Archive & VIP Collector Privileges', anchorAr: 'العروض الحصرية وامتيازات المقتنين', url: 'https://omniastores.com/collections/discounted-items', tag: 'VIP EDIT' },
  { anchorEn: 'Omnia Stores Craftsmanship, Warranty & Heritage', anchorAr: 'قصة أمنية ستورز ومعايير الصياغة والضمان', url: 'https://omniastores.com/pages/about-us', tag: 'HERITAGE' },
];

export function MagazineEditorialHub() {
  const { language, currency } = useLuxury();
  const isAr = language === 'ar';
  const [activeSection, setActiveSection] = useState<string>('all');
  const [channelFilter, setChannelFilter] = useState<'all' | 'magazine' | 'news-channel'>('all');
  const [selectedPublisher, setSelectedPublisher] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showAllFeed, setShowAllFeed] = useState<boolean>(false);
  const [liveItems, setLiveItems] = useState<LiveMagazineFeedItem[]>([]);
  const [liveLoading, setLiveLoading] = useState<boolean>(true);
  const [liveMode, setLiveMode] = useState<string>('live-rss-syndication');
  const [readerLocal, setReaderLocal] = useState<MagazineFeatureStory | null>(null);

  const fetchLiveWire = useCallback(async (sourceSlug: string, pillarSlug: string, chanType: string) => {
    setLiveLoading(true);
    try {
      const qs = new URLSearchParams({
        source: sourceSlug,
        pillar: pillarSlug,
        type: chanType,
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
      // Fallback handled on API
    } finally {
      setLiveLoading(false);
    }
  }, []);

  useEffect(() => {
    setShowAllFeed(false);
    fetchLiveWire(selectedPublisher, activeSection, channelFilter);
  }, [selectedPublisher, activeSection, channelFilter, fetchLiveWire]);

  const mult = currency === 'SAR' ? 1.02 : 1;
  const currLabel = currency === 'SAR' ? (isAr ? 'ر.س' : 'SAR') : (isAr ? 'د.إ' : 'AED');
  const formatAmt = (aed: number) => `${Math.round(aed * mult).toLocaleString()} ${currLabel}`;

  const visiblePublishers = useMemo(() => {
    if (channelFilter === 'all') return PUBLISHER_TABS;
    return PUBLISHER_TABS.filter((p) => p.type === 'all' || p.type === channelFilter);
  }, [channelFilter]);

  const filteredItems = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return liveItems;
    return liveItems.filter(
      (it) =>
        it.title.toLowerCase().includes(q) ||
        it.publisher.toLowerCase().includes(q) ||
        it.category.toLowerCase().includes(q) ||
        it.author.toLowerCase().includes(q)
    );
  }, [liveItems, searchTerm]);

  const leadLive = filteredItems[0] || null;
  const railLiveStories = filteredItems.slice(1, 7);
  const photoGridLive = showAllFeed ? filteredItems.slice(7, 37) : filteredItems.slice(7, 19);
  const newsChannelHighlights = useMemo(
    () => filteredItems.filter((it) => it.channelType === 'news-channel').slice(0, 6),
    [filteredItems]
  );
  const compactBriefs = showAllFeed ? filteredItems.slice(37) : filteredItems.slice(19, 31);

  const regionalStories = useMemo(() => {
    if (activeSection === 'all') return MAGAZINE_STORIES.slice(0, 6);
    const matching = MAGAZINE_STORIES.filter((s) => s.pillar === (activeSection as MagazinePillarId));
    return matching.length > 0 ? matching : MAGAZINE_STORIES.slice(0, 3);
  }, [activeSection]);

  const activeSectionObj = VOGUE_SECTIONS.find((s) => s.id === activeSection);

  return (
    <section
      aria-label="The Vogue News International Magazine & News Channel Portal"
      className={`my-6 bg-white dark:bg-[#07090E] text-neutral-950 dark:text-white border-y border-neutral-200 dark:border-gold/25 ${
        isAr ? 'text-right' : 'text-left'
      }`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* 0. LIVE BREAKING NEWS & MAGAZINE TICKER (OPENS IN OUR PORTAL) */}
      <div className="bg-neutral-950 text-white border-b border-gold/35 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gradient-to-r from-gold to-amber-300 text-black font-extrabold tracking-widest shrink-0 rounded-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600 animate-ping" />
              25-SOURCE WIRE
            </span>
            <div className="flex items-center gap-4 overflow-x-auto scrollbar-none whitespace-nowrap">
              {liveItems.slice(0, 5).map((hl) => (
                <Link
                  key={hl.id}
                  href={buildArticleHref(hl)}
                  className="hover:text-gold transition-colors inline-flex items-center gap-1.5"
                >
                  <span className="text-gold font-bold">{hl.publisher}:</span>
                  <span className="text-neutral-200 truncate max-w-[240px]">{hl.title}</span>
                  <span className="text-neutral-500">({hl.publishedDisplay})</span>
                </Link>
              ))}
            </div>
          </div>

          <a
            href="https://omniastores.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline font-bold inline-flex items-center gap-1 shrink-0"
          >
            <span>OMNIASTORES.COM (CODE: OMNIA-VIP15)</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* 1. LUXURY VOGUE MASTHEAD + CHANNEL SWITCHER + SEARCH */}
      <div className="border-b border-neutral-200 dark:border-gold/20 bg-gradient-to-b from-[#FAF7F2] via-white to-white dark:from-[#0C101B] dark:via-[#090C13] dark:to-[#07090E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7 pb-5 text-center space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] font-mono uppercase tracking-[0.24em] text-neutral-500 dark:text-neutral-400">
            <span>{isAr ? 'البوابة الموحدة للأخبار والمجلات العالمية' : 'GLOBAL LUXURY MAGAZINE & NEWS PORTAL'}</span>
            <span>•</span>
            <span className="text-[#8B6508] dark:text-gold font-bold">
              {liveMode === 'live-rss-syndication'
                ? (isAr ? `${liveItems.length} خبراً ومقالاً حياً • 25 قناة ومجلة` : `${liveItems.length} LIVE PORTAL STORIES • 15 MAGAZINES & 10 NEWS CHANNELS`)
                : (isAr ? 'الأرشيف التحريري الموثق' : 'CURATED EDITION ARCHIVE')}
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-[0.04em] uppercase text-neutral-950 dark:text-white leading-none">
            THE VOGUE NEWS
          </h1>

          {/* Channel Type Selector Pills */}
          <div className="pt-1 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', icon: Layers, en: 'All 25 Magazines & News Channels', ar: 'جميع المجلات والقنوات (25)' },
              { id: 'magazine', icon: BookOpen, en: '15 Luxury Magazines', ar: '15 مجلة فاخرة عالمية' },
              { id: 'news-channel', icon: Tv, en: '10 Global News Channels', ar: '10 قنوات أخبار عالمية' },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = channelFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setSelectedPublisher('all');
                    setChannelFilter(tab.id as 'all' | 'magazine' | 'news-channel');
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider inline-flex items-center gap-1.5 transition-all cursor-pointer border ${
                    active
                      ? 'bg-neutral-950 text-gold border-neutral-950 dark:bg-gold dark:text-black dark:border-gold shadow-md'
                      : 'bg-white dark:bg-white/[0.04] text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-white/15 hover:border-gold'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{isAr ? tab.ar : tab.en}</span>
                </button>
              );
            })}
          </div>

          {/* Primary Category Navigation Bar */}
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
                  className={`text-[11px] font-bold uppercase tracking-[0.15em] whitespace-nowrap pb-1.5 border-b-2 transition-all cursor-pointer ${
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

        {/* Publisher Filter Pills + Search */}
        <div className="border-t border-neutral-200/80 dark:border-white/10 bg-[#FAF7F2] dark:bg-[#0B0F18]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 lg:pb-0">
              {visiblePublishers.map((pub) => {
                const active = selectedPublisher === pub.slug;
                return (
                  <button
                    key={pub.slug}
                    type="button"
                    onClick={() => setSelectedPublisher(pub.slug)}
                    className={`px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider whitespace-nowrap rounded-full transition-colors cursor-pointer border ${
                      active
                        ? 'bg-neutral-950 text-white border-neutral-950 dark:bg-gold dark:text-black dark:border-gold shadow-sm'
                        : 'bg-white dark:bg-transparent text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-white/15 hover:border-gold'
                    }`}
                  >
                    {pub.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="relative flex-1 lg:w-60">
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={isAr ? 'ابحث في الأخبار والمجلات...' : 'Search Vogue, BBC, NYT, Robb Report...'}
                  className="w-full pl-8 pr-3 py-1.5 text-[11px] font-mono rounded-full border border-neutral-300 dark:border-white/15 bg-white dark:bg-[#07090E] focus:outline-none focus:border-gold"
                />
              </div>

              <button
                type="button"
                onClick={() => fetchLiveWire(selectedPublisher, activeSection, channelFilter)}
                disabled={liveLoading}
                className="shrink-0 px-3 py-1.5 rounded-full border border-neutral-300 dark:border-gold/40 bg-white dark:bg-transparent hover:border-neutral-950 dark:hover:border-gold text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${liveLoading ? 'animate-spin' : ''}`} />
                <span>{isAr ? 'تحديث' : 'Sync'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. VOGUE COVER SPLIT HERO (ALL CLICKABLE LINKS OPEN OUR PORTAL PAGE) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 border-b border-neutral-200 dark:border-gold/20">
        {liveLoading && !leadLive ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch animate-pulse">
            <div className="lg:col-span-5 h-72 bg-neutral-100 dark:bg-white/5 rounded-2xl" />
            <div className="lg:col-span-4 h-96 bg-neutral-100 dark:bg-white/5 rounded-2xl" />
            <div className="lg:col-span-3 h-96 bg-neutral-100 dark:bg-white/5 rounded-2xl" />
          </div>
        ) : leadLive ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT 5 COLS: COVER TYPOGRAPHY */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-4 lg:py-4">
              <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] font-bold">
                <span className="px-2.5 py-0.5 bg-neutral-950 text-gold dark:bg-gold dark:text-black">
                  {leadLive.publisher}
                </span>
                <span className="text-[#8B6508] dark:text-gold">{leadLive.category}</span>
              </div>

              <Link href={buildArticleHref(leadLive)} className="block group">
                <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight leading-[1.08] text-neutral-950 dark:text-white group-hover:underline">
                  {leadLive.title}
                </h2>
              </Link>

              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-serif leading-relaxed">
                {leadLive.excerpt}
              </p>

              <div className="pt-1 text-[11px] font-mono uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
                <span>BY {leadLive.author.toUpperCase()}</span>
                <span className="mx-2">•</span>
                <span className="text-neutral-900 dark:text-gold font-bold">{leadLive.publishedDisplay}</span>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <Link
                  href={buildArticleHref(leadLive)}
                  className="px-6 py-3 bg-neutral-950 dark:bg-gold text-white dark:text-black text-[11px] font-extrabold uppercase tracking-[0.18em] hover:opacity-90 transition-opacity inline-flex items-center gap-2 shadow-lg"
                >
                  <span>{isAr ? 'قراءة المقال في بوابتنا' : 'Open Full Portal Article'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href="https://omniastores.com/collections/bridal-sets"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 border border-gold/60 text-[#8B6508] dark:text-gold text-[11px] font-mono font-bold uppercase tracking-[0.14em] hover:bg-gold hover:text-black transition-colors inline-flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{isAr ? 'تنسيق أمنية ستورز' : 'Shop Partner Edit'}</span>
                </a>
              </div>
            </div>

            {/* CENTER 4 COLS: LARGE PORTRAIT IMAGE -> OPENS OUR PORTAL ARTICLE */}
            <Link
              href={buildArticleHref(leadLive)}
              className="lg:col-span-4 relative aspect-[4/5] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 cursor-pointer group shadow-2xl rounded-2xl border border-neutral-200 dark:border-gold/30 block"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-70" />
              <span className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/85 text-gold text-[9px] font-mono uppercase tracking-widest border border-gold/40">
                {leadLive.publisher} • {leadLive.publishedDisplay}
              </span>
            </Link>

            {/* RIGHT 3 COLS: TODAY'S WIRE + OMNIA AD PORTAL */}
            <div className="lg:col-span-3 space-y-5">
              <div className="border-b-2 border-neutral-950 dark:border-gold pb-2 flex items-center justify-between">
                <span className="text-[11px] font-mono font-extrabold uppercase tracking-[0.2em]">
                  {isAr ? 'أحدث التقارير العالمية' : "TODAY'S WIRE"}
                </span>
                <span className="text-[9px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">PORTAL VIEW</span>
              </div>

              <div className="divide-y divide-neutral-200 dark:divide-white/10">
                {railLiveStories.map((st) => (
                  <Link
                    key={st.id}
                    href={buildArticleHref(st)}
                    className="py-2.5 first:pt-0 group flex items-start gap-3"
                  >
                    <div className="relative w-14 h-14 shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-900 rounded-lg">
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
                        {st.publisher} • {st.publishedDisplay}
                      </span>
                      <h4 className="text-xs font-serif font-bold leading-snug group-hover:underline line-clamp-2">
                        {st.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>

              {/* OMNIA STORES ADVERTISEMENT PORTAL */}
              <a
                href="https://omniastores.com/collections/brooches"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl overflow-hidden border border-gold/45 bg-[#090C13] text-white shadow-xl group"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src="/press/omnia-fouad-founder-spread.png"
                    alt="Omnia Stores Partner Showcase"
                    fill
                    unoptimized
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent" />
                  <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/85 text-gold text-[8px] font-mono uppercase tracking-widest border border-gold/40">
                    ADVERTISEMENT
                  </span>
                  <div className="absolute bottom-2.5 inset-x-3 flex items-end justify-between gap-2">
                    <div>
                      <span className="text-[8px] font-mono uppercase tracking-widest text-gold font-bold block">
                        OMNIASTORES.COM • 15% OFF
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
                ? 'لا توجد مقالات مطابقة لهذا البحث حالياً.'
                : `No live articles matched "${searchTerm || selectedPublisher}" under "${activeSectionObj?.labelEn}".`}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setActiveSection('all');
                setChannelFilter('all');
                setSelectedPublisher('all');
              }}
              className="px-4 py-2 bg-neutral-950 dark:bg-gold text-white dark:text-black text-xs font-mono font-bold uppercase cursor-pointer"
            >
              {isAr ? 'إعادة ضبط البحث' : 'Reset Filters'}
            </button>
          </div>
        )}
      </div>

      {/* 3. PREMIUM 3-COLUMN FULL-BLEED EDITORIAL PHOTO GRID (EVERY LINK OPENS IN OUR PORTAL!) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
        {photoGridLive.length > 0 && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-neutral-950 dark:border-gold/40 pb-3">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#8B6508] dark:text-gold" />
                <h3 className="text-sm font-mono font-extrabold uppercase tracking-[0.2em]">
                  {activeSection === 'all'
                    ? (isAr ? 'مختارات اليوم من أرقى المجلات والقنوات العالمية' : "TODAY'S EDITION — VOGUE, BAZAAR, ROBB REPORT, BBC & NYT PORTAL")
                    : (isAr ? `تقارير ${activeSectionObj?.labelAr}` : `${activeSectionObj?.labelEn} PORTAL DISPATCHES`)}
                </h3>
              </div>
              <span className="text-[11px] font-mono text-neutral-500">
                {filteredItems.length} {isAr ? 'مقالاً يفتح في بوابتنا' : 'Portal Articles Ready'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {photoGridLive.map((story) => (
                <Link
                  key={story.id}
                  href={buildArticleHref(story)}
                  className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-neutral-900 shadow-lg border border-neutral-200 dark:border-white/10 hover:border-gold/60 transition-all block"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/15" />

                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 bg-white/95 dark:bg-black/85 text-neutral-950 dark:text-gold text-[9px] font-mono font-extrabold uppercase tracking-widest border border-gold/25">
                      {story.publisher}
                    </span>
                    <span className="px-2 py-0.5 bg-black/75 text-white/90 text-[9px] font-mono rounded">
                      {story.publishedDisplay}
                    </span>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white space-y-1.5">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-300 font-bold block">
                      {story.category}
                    </span>
                    <h4 className="text-lg sm:text-xl font-serif font-medium leading-snug group-hover:underline line-clamp-3">
                      {story.title}
                    </h4>
                    <div className="pt-1 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.14em] text-neutral-300">
                      <span className="truncate max-w-[190px]">BY {story.author}</span>
                      <span className="text-gold font-bold flex items-center gap-0.5 shrink-0">
                        <span>{isAr ? 'اقرأ هنا' : 'READ HERE'}</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* GLOBAL NEWS CHANNELS DESK BAND (BBC, NYT, GUARDIAN, ARABIAN BUSINESS, CNBC, AL JAZEERA) */}
            {newsChannelHighlights.length > 0 && channelFilter !== 'magazine' && (
              <div className="pt-6 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-neutral-950 dark:border-gold/40 pb-3">
                  <div className="flex items-center gap-2">
                    <Newspaper className="w-4 h-4 text-[#8B6508] dark:text-gold" />
                    <h3 className="text-sm font-mono font-extrabold uppercase tracking-[0.2em]">
                      {isAr
                        ? 'مكتب القنوات الإخبارية العالمية (BBC, NYT, Guardian, Arabian Business, CNBC, Al Jazeera)'
                        : 'WORLD NEWS CHANNELS BRIEFING — BBC, NYTIMES, GUARDIAN, CNBC, ARABIAN BUSINESS'}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                    {isAr ? 'تفتح داخل منصتنا بنفس التاريخ' : 'ALL POSTS OPEN IN OUR PORTAL'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {newsChannelHighlights.map((news) => (
                    <Link
                      key={news.id}
                      href={buildArticleHref(news)}
                      className="group p-4 rounded-2xl border border-neutral-200 dark:border-gold/20 bg-[#FAF7F2] dark:bg-[#0B0F18] hover:border-gold transition-all flex items-start gap-3.5"
                    >
                      <img
                        src={news.thumbnail}
                        alt={news.title}
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.dataset.fb) {
                            target.dataset.fb = '1';
                            target.src = '/campaigns/golden-nocturne.jpg';
                          }
                        }}
                        className="w-24 h-24 object-cover rounded-xl shrink-0 bg-neutral-900 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center justify-between gap-2 text-[9px] font-mono">
                          <span className="px-2 py-0.5 bg-neutral-950 text-gold font-bold uppercase rounded">
                            {news.publisher}
                          </span>
                          <span className="text-neutral-500">{news.publishedDisplay}</span>
                        </div>
                        <h4 className="text-sm font-serif font-bold leading-snug group-hover:underline line-clamp-2">
                          {news.title}
                        </h4>
                        <span className="text-[10px] font-mono text-[#8B6508] dark:text-gold font-bold inline-flex items-center gap-1">
                          <span>{isAr ? 'فتح التقرير الكامل' : 'Open Official Portal Post'}</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Portal Briefs */}
            {compactBriefs.length > 0 && (
              <div className="pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-t border-neutral-200 dark:border-white/10">
                {compactBriefs.map((brief) => (
                  <Link
                    key={brief.id}
                    href={buildArticleHref(brief)}
                    className="p-4 rounded-xl border border-neutral-200 dark:border-white/10 bg-[#FAF7F2] dark:bg-[#0B0F18] hover:border-gold/60 flex items-start gap-3 transition-colors group"
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
                      <h5 className="text-xs sm:text-sm font-serif font-bold leading-snug line-clamp-2 group-hover:underline">
                        {brief.title}
                      </h5>
                      <span className="text-[10px] text-neutral-500 font-mono block truncate">
                        BY {brief.author.toUpperCase()}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {filteredItems.length > 19 && (
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setShowAllFeed((v) => !v)}
                  className="px-6 py-3 rounded-full border border-neutral-950 dark:border-gold/60 text-neutral-950 dark:text-gold hover:bg-neutral-950 hover:text-white dark:hover:bg-gold dark:hover:text-black text-xs font-mono font-bold uppercase tracking-[0.18em] transition-colors cursor-pointer"
                >
                  {showAllFeed
                    ? (isAr ? 'عرض أقل' : 'Show Fewer Portal Articles')
                    : (isAr ? `عرض كافة المقالات (${filteredItems.length})` : `Explore All ${filteredItems.length} Live Portal Stories`)}
                </button>
              </div>
            )}
          </div>
        )}

        {/* 4. SPONSORED OMNIA STORES FLAGSHIP ADVERTISEMENT PORTAL */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0A0D14] via-[#171E2E] to-[#0A0D14] text-white border border-gold/45 p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-gold text-[10px] font-mono uppercase tracking-[0.22em] font-bold">
              <Crown className="w-3.5 h-3.5" />
              <span>{isAr ? 'مساحة إعلانية • الشريك الفاخر المعتمد' : 'ADVERTISEMENT • OFFICIAL GCC JEWELLERY PARTNER'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold">
              {isAr
                ? 'أمنية ستورز (omniastores.com): مجوهرات الفضة عيار 925 وأطقم العرائس'
                : 'Omnia Stores (omniastores.com): DCL-Assayed 925 Bridal Suites & Brooches'}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-serif leading-relaxed">
              {isAr
                ? 'استمتعي بخصم 15% حصرياً لقراء المجلة باستخدام كود OMNIA-VIP15 مع توصيل مؤمّن خلال 24 ساعة وتقسيط تابي على 4 دفعات.'
                : 'Exclusive 15% reader privilege with VIP code OMNIA-VIP15 across 925 sterling silver bridal suites, South Sea pearl chokers, and luxury brooches — with 24h UAE/GCC courier and Tabby 4x.'}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/brands/omnia-stores"
              className="px-5 py-3 rounded-xl border border-gold/40 text-gold hover:bg-gold/10 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              {isAr ? 'ملف العلامة الموثق' : 'Verified Brand Dossier'}
            </Link>
            <a
              href="https://omniastores.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-gold via-amber-300 to-[#AA8C2C] text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:scale-105 transition-transform shadow-lg"
            >
              <span>{isAr ? 'زيارة omniastores.com' : 'Shop omniastores.com'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 5. VOGUE SHOPPING • ALL 8 OMNIA STORES COLLECTOR PIECES */}
        <div className="pt-2 space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-neutral-950 dark:border-gold/40 pb-3">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#8B6508] dark:text-gold font-bold block">
                {isAr ? 'دليل التسوق • مختارات المحررين من omniastores.com' : 'SHOPPING • THE FULL 8-PIECE OMNIA STORES COLLECTOR EDIT'}
              </span>
              <h3 className="text-xl sm:text-3xl font-serif font-black mt-0.5">
                {isAr ? 'تشكيلات الهوت كوتور المختارة من omniastores.com' : 'Curated High Jewellery & Bridal Parures on omniastores.com'}
              </h3>
            </div>
            <a
              href="https://omniastores.com/collections/all"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-neutral-950 dark:bg-gold text-white dark:text-black text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 hover:opacity-90"
            >
              <span>{isAr ? 'استعراض المتجر الكامل' : 'Shop Full Catalog'}</span>
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
                className="group border border-neutral-200 dark:border-gold/25 bg-[#FAF7F2] dark:bg-[#0D111A] hover:border-gold transition-all flex flex-col justify-between overflow-hidden rounded-xl"
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
                      <ShoppingBag className="w-3 h-3" />
                      <span>{isAr ? 'اقتناء' : 'Shop'}</span>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* 6. OMNIA STORES & 25-SOURCE BACKLINK AUTHORITY DIRECTORY */}
        <div className="pt-2 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-neutral-950 dark:border-gold/40 pb-3">
            <div className="flex items-center gap-2">
              <Link2 className="w-4 h-4 text-[#8B6508] dark:text-gold" />
              <h3 className="text-sm font-mono font-extrabold uppercase tracking-[0.2em]">
                {isAr
                  ? 'دليل البوابات والروابط الموثقة — أمنية ستورز و 25 مصدراً عالمياً'
                  : 'OMNIA STORES BACKLINK PORTALS & 25 ACCREDITED GLOBAL PUBLISHERS'}
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAr ? 'روابط أصلية موثقة 100%' : 'Direct Editorial & Commerce Citations'}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 p-6 rounded-2xl border border-gold/35 bg-[#0A0D14] text-white space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold" />
                  <h4 className="text-sm font-serif font-bold text-gold">
                    {isAr ? 'بوابات وروابط أمنية ستورز المباشرة (omniastores.com)' : 'Omnia Stores Flagship Collection Backlinks'}
                  </h4>
                </div>
                <a
                  href="https://omniastores.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-mono font-bold text-amber-300 hover:underline flex items-center gap-1"
                >
                  <span>https://omniastores.com</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {OMNIA_AUTHORITY_BACKLINKS.map((item) => (
                  <a
                    key={item.url}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 rounded-xl border border-white/10 hover:border-gold/60 bg-white/[0.03] hover:bg-white/[0.07] transition-all flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <span className="text-[8px] font-mono text-gold uppercase tracking-widest block font-bold">
                        {item.tag}
                      </span>
                      <span className="text-xs font-serif font-semibold text-white group-hover:text-gold transition-colors block truncate">
                        {isAr ? item.anchorAr : item.anchorEn}
                      </span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-gold shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 p-6 rounded-2xl border border-neutral-200 dark:border-white/15 bg-[#FAF7F2] dark:bg-[#0B0F18] space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-white/10 pb-3">
                <h4 className="text-sm font-serif font-bold">
                  {isAr ? 'المجلات والقنوات العالمية المعتمدة (25)' : '25 Global Magazines & News Channels Directory'}
                </h4>
                <a
                  href="https://www.vogue.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-mono font-bold text-[#8B6508] dark:text-gold hover:underline"
                >
                  vogue.com ↗
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {PUBLISHER_TABS.filter((p) => p.slug !== 'all').map((pub) => (
                  <button
                    key={pub.slug}
                    type="button"
                    onClick={() => {
                      setChannelFilter('all');
                      setSelectedPublisher(pub.slug);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-3 py-2 rounded-lg border border-neutral-200 dark:border-white/10 bg-white dark:bg-[#07090E] hover:border-gold text-[11px] font-serif font-bold flex items-center justify-between gap-1 transition-colors cursor-pointer text-left"
                  >
                    <span className="truncate">{pub.label}</span>
                    <ArrowUpRight className="w-3 h-3 text-gold shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 7. MIDDLE EAST & GCC SPECIAL REPORTS */}
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
                className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-neutral-900 cursor-pointer shadow-lg border border-neutral-200 dark:border-gold/25"
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

        {/* 8. COLLECTIBLE DIGITAL ISSUES SHELF */}
        <div className="pt-2 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-neutral-950 dark:border-gold/40 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#8B6508] dark:text-gold" />
              <h3 className="text-sm font-mono font-extrabold uppercase tracking-[0.2em]">
                {isAr ? 'أرشيف أعداد المجلة الفصلية' : 'COLLECTIBLE DIGITAL ISSUES ARCHIVE'}
              </h3>
            </div>
            <span className="text-[10px] font-mono text-neutral-500">
              {MAGAZINE_PILLARS.length - 1} {isAr ? 'قطاعات تحريرية' : 'Sectors Covered'}
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {MAGAZINE_ISSUES.map((issue) => (
              <button
                key={issue.id}
                type="button"
                onClick={() => setActiveSection(issue.linkedPillar)}
                className="group text-left rtl:text-right border border-neutral-200 dark:border-gold/25 bg-[#FAF7F2] dark:bg-[#0D111A] hover:border-gold transition-all overflow-hidden rounded-xl cursor-pointer"
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
      </div>

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

              <div className="p-4 sm:p-5 rounded-2xl bg-[#0A0D14] text-white border border-gold/40 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-gold font-bold block">
                    {isAr ? 'القطعة المختارة لهذا التقرير • أمنية ستورز' : 'FEATURED ACQUISITION • OMNIA STORES'}
                  </span>
                  <h4 className="text-base font-serif font-bold mt-0.5">
                    {isAr ? readerLocal.omniaPairing.nameAr : readerLocal.omniaPairing.nameEn}
                  </h4>
                  <span className="text-xs font-mono text-amber-200">
                    {formatAmt(readerLocal.omniaPairing.priceAed)} • Code: OMNIA-VIP15
                  </span>
                </div>
                <a
                  href={readerLocal.omniaPairing.url}
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
