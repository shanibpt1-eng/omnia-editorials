'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ArrowUpRight, 
  ShoppingBag, 
  Crown, 
  Copy, 
  Check, 
  ShieldCheck
} from 'lucide-react';
import { generateAffiliateUrl } from '../lib/affiliateEngine';
import { useLuxury } from './ThemeProvider';

interface CampaignBanner {
  id: string;
  tabLabel: string;
  tabLabelAr: string;
  tagline: string;
  taglineAr: string;
  headline: string;
  headlineAr: string;
  subheadline: string;
  subheadlineAr: string;
  badge: string;
  badgeAr: string;
  image: string;
  couponCode: string;
  priceAed: number;
  priceSar: number;
  gemColor: string;
  pieces: string[];
  piecesAr: string[];
  primaryCtaText: string;
  primaryCtaTextAr: string;
  primaryCtaUrl?: string;
  secondaryCtaText: string;
  secondaryCtaTextAr: string;
  secondaryCtaUrl?: string;
  stats: { label: string; labelAr: string; value: string; valueAr: string }[];
}

const FEATURED_CAMPAIGNS: CampaignBanner[] = [
  {
    id: 'camp-emerald-grandeur',
    tabLabel: 'Emerald Grandeur',
    tabLabelAr: 'عظمة الزمرد',
    tagline: 'SOVEREIGN GREEN • OMNIA STORES',
    taglineAr: 'الأخضر الملكي • أمنية ستورز',
    headline: 'Imperial Emerald Grandeur',
    headlineAr: 'فخامة الزمرد الإمبراطوري',
    subheadline: 'Majestic deep Colombian-hue simulated emeralds framed in brilliant simulated diamonds and rhodium-finished 925 sterling silver. Handcrafted for unforgettable sovereign GCC galas.',
    subheadlineAr: 'أحجار زمرد كولومبي ساحرة باللون الأخضر الملكي محاطة بهالات الألماس البراق وفضة إسترلينية عيار 925 مطلية بالروديوم. مصممة يدوياً لأبهى حفلات ومناسبات الخليج.',
    badge: '15% OFF VIP • EMERALD15',
    badgeAr: 'خصم 15% للعملاء المميزين • EMERALD15',
    image: '/hero/hero-emerald-grandeur.jpg',
    couponCode: 'EMERALD15',
    priceAed: 1650,
    priceSar: 1682,
    gemColor: '#10B981',
    pieces: ['Imperial Choker Necklace', 'Chandelier Drop Earrings', 'Articulated Tennis Bracelet', 'Cocktail Ring'],
    piecesAr: ['عقد تشوكر إمبراطوري', 'أقراط ثريا متدلية', 'إسوارة تنس مفصلية', 'خاتم كوكتيل مرصع'],
    primaryCtaText: 'Shop Emerald Suite',
    primaryCtaTextAr: 'تسوق طقم الزمرد',
    secondaryCtaText: 'Explore All Suites',
    secondaryCtaTextAr: 'استكشف جميع الأطقم',
    stats: [
      { label: 'Hallmark', labelAr: 'العيار', value: '925 Silver', valueAr: 'فضة 925' },
      { label: 'Gemstone', labelAr: 'الحجر', value: 'Colombian Hue', valueAr: 'لون كولومبي' },
      { label: 'Courier', labelAr: 'التوصيل', value: '24 Hours', valueAr: '24 ساعة' },
    ],
  },
  {
    id: 'camp-diamond-radiance',
    tabLabel: 'Diamond Radiance',
    tabLabelAr: 'إشراقة الألماس',
    tagline: 'SIGNATURE SPARKLE • OMNIA STORES',
    taglineAr: 'بريق التوقيع • أمنية ستورز',
    headline: 'Diamond Radiance Bridal Suite',
    headlineAr: 'طقم الألماس المتلألئ للعرائس',
    subheadline: 'Signature sparkle for elevated everyday glamour. Premium simulated diamonds handset with Italian micro-prong claws in certified 925 sterling silver with rhodium anti-tarnish shielding.',
    subheadlineAr: 'بريق استثنائي لأناقة يومية راقية ومناسبات خالدة. أحجار محاكاة الألماس الفاخرة مرصعة بمخالب إيطالية دقيقة في فضة 925 مختومة مع درع الروديوم المقاوم للأكسدة.',
    badge: '15% OFF VIP • DIAMOND15',
    badgeAr: 'خصم 15% للعملاء المميزين • DIAMOND15',
    image: '/hero/hero-diamond-radiance.jpg',
    couponCode: 'DIAMOND15',
    priceAed: 1350,
    priceSar: 1377,
    gemColor: '#E2E8F0',
    pieces: ['Cascading Diamond Collar', 'Brilliant Cluster Drops', 'Pavé Tennis Bracelet', 'Solitaire Clustered Ring'],
    piecesAr: ['طوق ألماس متدفق', 'أقراط عناقيد متلألئة', 'إسوارة بافيه متصلة', 'خاتم سوليتير مرصع'],
    primaryCtaText: 'Shop Diamond Suite',
    primaryCtaTextAr: 'تسوق طقم الألماس',
    secondaryCtaText: 'Explore All Suites',
    secondaryCtaTextAr: 'استكشف جميع الأطقم',
    stats: [
      { label: 'Hallmark', labelAr: 'العيار', value: '925 Silver', valueAr: 'فضة 925' },
      { label: 'Gemstone', labelAr: 'الحجر', value: 'Premium', valueAr: 'الفاخرة' },
      { label: 'Courier', labelAr: 'التوصيل', value: '24 Hours', valueAr: '24 ساعة' },
    ],
  },
  {
    id: 'camp-ruby-evenings',
    tabLabel: 'Ruby Evenings',
    tabLabelAr: 'أمسيات الياقوت',
    tagline: 'AFTER-DARK ELEGANCE • GALA EXCLUSIVE',
    taglineAr: 'أناقة السهرات • حصري للحفلات',
    headline: 'Royal Ruby Gala Suite',
    headlineAr: 'طقم الياقوت الملكي للسهرات',
    subheadline: 'A dramatic red statement for after-dark elegance. Vibrant crimson pigeon-blood simulated rubies surrounded by cascading brilliant pavé clusters and electroplated rhodium shine.',
    subheadlineAr: 'إطلالة حمراء دراماتيكية لأناقة مسائية تأسر الألباب. ياقوت دم الحمام القرمزي محاط بمجموعات بافيه متلألئة وطلاء روديوم براق.',
    badge: '15% OFF VIP • RUBYVIP',
    badgeAr: 'خصم 15% للعملاء المميزين • RUBYVIP',
    image: '/hero/hero-ruby-statements.jpg',
    couponCode: 'RUBYVIP',
    priceAed: 1450,
    priceSar: 1479,
    gemColor: '#EF4444',
    pieces: ['Crimson Ruby Collar', 'Square-Cut Drop Earrings', 'Pavé Halo Bracelet', 'Cocktail Solitaire Ring'],
    piecesAr: ['طوق ياقوت قرمزي', 'أقراط بقصة مربعة متدلية', 'إسوارة هالو بافيه', 'خاتم سوليتير كوكتيل'],
    primaryCtaText: 'Shop Ruby Suite',
    primaryCtaTextAr: 'تسوق طقم الياقوت',
    secondaryCtaText: 'Explore All Suites',
    secondaryCtaTextAr: 'استكشف جميع الأطقم',
    stats: [
      { label: 'Hallmark', labelAr: 'العيار', value: '925 Silver', valueAr: 'فضة 925' },
      { label: 'Gemstone', labelAr: 'الحجر', value: 'Royal Ruby', valueAr: 'ياقوت ملكي' },
      { label: 'Courier', labelAr: 'التوصيل', value: '24 Hours', valueAr: '24 ساعة' },
    ],
  },
  {
    id: 'camp-the-colour-gem-trend',
    tabLabel: 'Canary Yellow',
    tabLabelAr: 'الأصفر الكناري',
    tagline: 'MODERN LUXURY APPEAL • GEMSTONE SUITE',
    taglineAr: 'جاذبية الفخامة المعاصرة • طقم الأحجار الملونة',
    headline: 'Imperial Canary Yellow Suite',
    headlineAr: 'طقم الأصفر الكناري الإمبراطوري',
    subheadline: 'Fresh inspiration for gemstone looks with modern glamour. Radiant canary yellow cushion-cut teardrops and brilliant chandelier cuts handset in certified 925 silver.',
    subheadlineAr: 'إلهام متجدد لإطلالات الأحجار الكريمة ببريق معاصر. أحجار صفراء دافئة بقطع الوسادة وأقراط ثريا متألقة مرصعة في فضة عيار 925 معتمدة.',
    badge: '15% OFF VIP • CANARY15',
    badgeAr: 'خصم 15% للعملاء المميزين • CANARY15',
    image: '/hero/hero-canary-yellow-suite.jpg',
    couponCode: 'CANARY15',
    priceAed: 1550,
    priceSar: 1581,
    gemColor: '#F59E0B',
    pieces: ['Canary Radiant Choker', 'Tiered Briolette Earrings', 'Micro-Pavé Bracelet', 'Cushion Halo Ring'],
    piecesAr: ['تشوكر كناري متوهج', 'أقراط بريوليت متعددة الطبقات', 'إسوارة مايكرو بافيه', 'خاتم هالو بقطع الوسادة'],
    primaryCtaText: 'Shop Canary Yellow',
    primaryCtaTextAr: 'تسوق الأصفر الكناري',
    secondaryCtaText: 'Explore All Suites',
    secondaryCtaTextAr: 'استكشف جميع الأطقم',
    stats: [
      { label: 'Hallmark', labelAr: 'العيار', value: '925 Silver', valueAr: 'فضة 925' },
      { label: 'Gemstone', labelAr: 'الحجر', value: 'Canary Fancy', valueAr: 'كناري فاخر' },
      { label: 'Courier', labelAr: 'التوصيل', value: '24 Hours', valueAr: '24 ساعة' },
    ],
  },
  {
    id: 'camp-how-to-wear-statement-sets',
    tabLabel: 'Pearl Revival',
    tabLabelAr: 'إحياء اللؤلؤ',
    tagline: 'EFFORTLESS SOPHISTICATION • ARTICLE EDIT',
    taglineAr: 'رقي طبيعي بلا تكلف • تشكيلة المقالات التحريرية',
    headline: 'Heritage Pearl & Diamond Revival',
    headlineAr: 'إحياء تراث اللؤلؤ والألماس العريق',
    subheadline: 'Balance bold sparkle with effortless sophistication. Golden pearl and simulated diamond chokers paired with matching teardrop accents and Trucial coast heritage.',
    subheadlineAr: 'موازنة البريق القوي بالرقي الانسيابي. تشوكرات اللؤلؤ الذهبي وأحجار محاكاة الألماس مع أقراط متدلية مستوحاة من تراث ساحل الخليج العربي.',
    badge: '15% OFF VIP • PEARLVIP',
    badgeAr: 'خصم 15% للعملاء المميزين • PEARLVIP',
    image: '/hero/hero-pearl-revival.jpg',
    couponCode: 'PEARLVIP',
    priceAed: 1280,
    priceSar: 1305,
    gemColor: '#F9FAFB',
    pieces: ['Lustrous Pearl Drop Collar', 'Baroque Pearl Earrings', 'Tennis Pearl Bracelet', 'Cluster Pearl Ring'],
    piecesAr: ['طوق قطرات اللؤلؤ البراق', 'أقراط لؤلؤ باروكية', 'إسوارة لؤلؤ تنس', 'خاتم لؤلؤ محاط بالألماس'],
    primaryCtaText: 'Shop Pearl Suite',
    primaryCtaTextAr: 'تسوق طقم اللؤلؤ',
    secondaryCtaText: 'Explore All Suites',
    secondaryCtaTextAr: 'استكشف جميع الأطقم',
    stats: [
      { label: 'Hallmark', labelAr: 'العيار', value: '925 Silver', valueAr: 'فضة 925' },
      { label: 'Gemstone', labelAr: 'الحجر', value: 'Heritage Pearl', valueAr: 'لؤلؤ طبيعي' },
      { label: 'Courier', labelAr: 'التوصيل', value: '24 Hours', valueAr: '24 ساعة' },
    ],
  },
];

export function LuxuryAdvertBannerCarousel() {
  const { formatPrice, language } = useLuxury();
  const isAr = language === 'ar';
  const campaigns = FEATURED_CAMPAIGNS;
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  // Auto slide every 6.5s unless hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % campaigns.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [campaigns.length, isPaused]);

  const active = campaigns[current] || campaigns[0];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 3000);
  };

  if (!active) return null;

  const activeTagline = isAr ? active.taglineAr : active.tagline;
  const activeHeadline = isAr ? active.headlineAr : active.headline;
  const activeSubheadline = isAr ? active.subheadlineAr : active.subheadline;
  const activeBadge = isAr ? active.badgeAr : active.badge;
  const activePieces = isAr ? active.piecesAr : active.pieces;
  const activePrimaryCta = isAr ? active.primaryCtaTextAr : active.primaryCtaText;
  const activeSecondaryCta = isAr ? active.secondaryCtaTextAr : active.secondaryCtaText;

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative rounded-3xl overflow-hidden border border-gold/40 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-gradient-to-r from-black via-[#0D111A] to-black group dark-surface"
      >
        {/* Animated Gold Aura Background Radiance */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(212,175,55,0.15)_0%,transparent_70%)] blur-[90px] pointer-events-none animate-pulse" />
        <div className="absolute -bottom-10 left-10 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(243,229,171,0.08)_0%,transparent_70%)] blur-[80px] pointer-events-none" />

        {/* Top Interactive Campaign Tabs with Live Countdown Timers */}
        <div className="flex items-center overflow-x-auto scrollbar-none border-b border-gold/20 bg-black/60 backdrop-blur-md">
          {campaigns.map((c, i) => {
            const isTabActive = i === current;
            return (
              <button
                key={c.id}
                onClick={() => setCurrent(i)}
                className={`relative px-4 py-3.5 text-left transition-all duration-300 flex items-center gap-2 border-r border-gold/15 last:border-r-0 flex-shrink-0 whitespace-nowrap ${
                  isTabActive
                    ? 'bg-gold/15 text-gold font-semibold'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]"
                    style={{ backgroundColor: c.gemColor, color: c.gemColor }}
                  />
                  <span className={`text-[10px] font-mono ${isTabActive ? 'text-gold' : 'text-neutral-500'}`}>
                    0{i + 1}
                  </span>
                  <span className="text-xs uppercase tracking-wider">{isAr ? c.tabLabelAr : c.tabLabel}</span>
                </div>
                {isTabActive && <Crown className="w-3.5 h-3.5 text-gold shrink-0 animate-pulse ml-1" />}

                {/* Animated Hairline Countdown Progress Bar */}
                {isTabActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 overflow-hidden">
                    <div
                      key={`camp-prog-${current}-${isPaused ? 'paused' : 'running'}`}
                      className={`h-full bg-gradient-to-r from-gold via-amber-300 to-gold ${
                        isPaused ? 'w-full opacity-60' : ''
                      }`}
                      style={{
                        animation: isPaused ? 'none' : 'heroProgress 6.5s linear forwards',
                        width: isPaused ? '60%' : undefined,
                      }}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12 relative z-10">
          
          {/* Left Content Column (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Tagline & Badge & Price Tag */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-bold uppercase tracking-widest shadow-[0_0_12px_rgba(212,175,55,0.25)]">
                <Sparkles className="w-3.5 h-3.5 text-gold animate-spin" style={{ animationDuration: '6s' }} />
                {activeTagline}
              </span>

              <span className="px-3 py-1 rounded-full bg-black/80 border border-gold/30 text-amber-300 text-xs font-bold font-mono shadow-sm">
                {isAr ? `ابتداءً من ${formatPrice(active.priceAed, active.priceSar)}` : `From ${formatPrice(active.priceAed, active.priceSar)}`}
              </span>

              <span className="px-3 py-1 rounded-full bg-black/70 border border-gold/20 text-neutral-300 text-xs font-medium">
                {activeBadge}
              </span>
            </div>

            {/* Headline */}
            <h3
              style={{ color: '#FFFFFF' }}
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15] stay-white"
            >
              {activeHeadline}
            </h3>

            {/* Subheadline */}
            <p
              style={{ color: '#CBD5E1' }}
              className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl stay-white"
            >
              {activeSubheadline}
            </p>

            {/* 4-Piece Suite Components Breakdown */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] uppercase tracking-widest text-gold font-mono block">
                {isAr ? 'يشمل طقم العروس والسهرات المتكامل المكون من 4 قطع:' : 'Complete 4-Piece Bridal & Gala Suite Included:'}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-300">
                {activePieces.map((piece, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-black/50 border border-gold/20 rounded-xl px-3 py-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    <span className="truncate">{piece}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metric Stats Counters */}
            <div className="grid grid-cols-3 gap-3 max-w-lg pt-1">
              {active.stats.map((s, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-black/70 border border-gold/25 backdrop-blur-md shadow-md">
                  <div className="text-gold font-bold font-mono text-sm sm:text-base">
                    {isAr ? s.valueAr : s.value}
                  </div>
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider">
                    {isAr ? s.labelAr : s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Actions & Click-to-Copy Coupon */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href={generateAffiliateUrl({
                  baseUrl: active.primaryCtaUrl || 'https://omniastores.com/collections/luxury-sets',
                  source: 'luxury_advert_carousel',
                  medium: active.id,
                })}
                target="_blank"
                rel="nofollow sponsored"
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-gold via-amber-300 to-[#AA8C2C] text-black font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.7)] transition-all transform hover:-translate-y-0.5 flex items-center gap-2 shimmer-btn"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{activePrimaryCta}</span>
              </a>

              <button
                onClick={() => handleCopyCode(active.couponCode)}
                className="px-4 py-3 rounded-full bg-black/80 border border-gold/40 text-gold hover:text-white text-xs font-mono font-semibold tracking-wider flex items-center gap-2 hover:bg-gold/20 hover:border-gold transition-all shadow-md active:scale-95"
                aria-label={`Copy discount code ${active.couponCode}`}
              >
                {copiedCoupon === active.couponCode ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">
                      {isAr ? 'تم نسخ الكود (خصم 15%)' : 'Code Copied (15% Off)'}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-gold" />
                    <span>{isAr ? 'كود الخصم:' : 'Code:'} <strong className="text-white">{active.couponCode}</strong></span>
                  </>
                )}
              </button>

              <a
                href={generateAffiliateUrl({
                  baseUrl: active.secondaryCtaUrl || 'https://omniastores.com/collections/all',
                  source: 'luxury_advert_carousel',
                  medium: `${active.id}_secondary`,
                })}
                target="_blank"
                rel="nofollow sponsored"
                className="px-5 py-3 rounded-full border border-gold/40 text-gold hover:text-white hover:bg-gold/15 font-semibold text-xs uppercase tracking-widest transition-all flex items-center gap-1.5 backdrop-blur-md"
              >
                <span>{activeSecondaryCta}</span>
                <ArrowUpRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-[-90deg]' : ''}`} />
              </a>
            </div>

          </div>

          {/* Right Advertisement Visual */}
          <div className="lg:col-span-6 relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border-2 border-gold/40 bg-black group/image">
            <a
              href={generateAffiliateUrl({
                baseUrl: active.primaryCtaUrl || 'https://omniastores.com/collections/luxury-sets',
                source: 'luxury_advert_carousel_image',
                medium: active.id,
              })}
              target="_blank"
              rel="nofollow sponsored"
              className="block relative w-full h-full cursor-pointer overflow-hidden"
              aria-label={`Explore ${activeHeadline} on Omnia Stores`}
            >
              <Image
                src={active.image}
                alt={activeHeadline}
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover object-center transition-transform duration-1000 group-hover/image:scale-[1.03]"
                priority
              />

              {/* Ambient Golden Frame Sheen */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              {/* Floating Top VIP Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-gold border border-gold/40 text-[10px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                  <Crown className="w-3 h-3 text-gold" />
                  <span>{isAr ? 'خريف / شتاء 2026/27' : 'AUTUMN / WINTER 2026/27'}</span>
                </span>
              </div>

              {/* Floating Bottom Quick Action Badge */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-black/85 backdrop-blur-md text-neutral-200 border border-white/20 text-[10px] font-mono tracking-wide flex items-center gap-1.5">
                  <ShieldCheck className="w-3 h-3 text-gold" />
                  <span>{isAr ? 'معتمد ومختوم في دبي • فضة 925' : 'DCL HALLMARKED • 925 SILVER'}</span>
                </span>

                <span className="px-3.5 py-1 rounded-full bg-gold text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg group-hover/image:bg-amber-300 transition-colors">
                  <span>{isAr ? 'تسوق الطقم' : 'Shop Suite'}</span>
                  <ArrowUpRight className={`w-3 h-3 ${isAr ? 'rotate-[-90deg]' : ''}`} />
                </span>
              </div>
            </a>
          </div>

        </div>

        {/* Carousel Bottom Indicator & Controls */}
        <div className="px-6 sm:px-10 py-3.5 bg-black/80 border-t border-gold/20 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400 hidden sm:inline uppercase tracking-wider font-mono">
              {isAr ? `الحملة ${current + 1} من ${campaigns.length}` : `Campaign ${current + 1 < 10 ? `0${current + 1}` : current + 1} of ${campaigns.length < 10 ? `0${campaigns.length}` : campaigns.length}`}
            </span>
            <span className="text-neutral-600 hidden sm:inline">•</span>
            <span className="text-xs text-neutral-400 hidden md:inline">
              {isAr ? 'شحن فوري بنفس اليوم في الإمارات والسعودية' : 'Same-day courier dispatch across UAE & KSA'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrent((prev) => (prev - 1 + campaigns.length) % campaigns.length)}
              className="p-2 rounded-full bg-black/70 border border-gold/30 text-gold hover:bg-gold hover:text-black transition-all shadow-md active:scale-95"
              aria-label="Previous Campaign"
            >
              <ChevronLeft className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={() => setCurrent((prev) => (prev + 1) % campaigns.length)}
              className="p-2 rounded-full bg-black/70 border border-gold/30 text-gold hover:bg-gold hover:text-black transition-all shadow-md active:scale-95"
              aria-label="Next Campaign"
            >
              <ChevronRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}