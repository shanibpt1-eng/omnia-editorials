'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Sparkles, 
  BookOpen, 
  Crown, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause,
  Film,
  ArrowRight
} from 'lucide-react';
import { useLuxury } from './ThemeProvider';
import { getPublicationLabel } from '../lib/productLocalization';

const DISCOUNTED_ITEMS_URL = 'https://omniastores.com/collections/discounted-items';

export interface HeroSlideItem {
  id: string;
  type: 'video' | 'image';
  videoUrl?: string;
  coverImage: string;
  title: string;
  titleAr: string;
  excerpt: string;
  excerptAr: string;
  publication: string;
  date: string;
  dateAr: string;
  slug: string;
  canonicalStoreUrl: string;
  featuredProduct: {
    id: string;
    title: string;
    titleAr: string;
    priceAed: number;
    priceSar: number;
    image: string;
    storeUrl: string;
  };
}

// Top Luxury Champagne Campaign Banners & Commercial Film
const HERO_SLIDES: HeroSlideItem[] = [
  // Slide 1: Upcoming Events - Luxury Jewellery Highlights (NEW MAIN BANNER)
  {
    id: 'slide-upcoming-events-luxury-highlights',
    type: 'image',
    coverImage: '/banners/upcoming-events-luxury-highlights-banner.jpg',
    title: 'Upcoming Events: Omnia Stores Unveils Luxury Jewellery Highlights & Sovereign Gala Suites',
    titleAr: 'الفعاليات القادمة: أمنية ستورز تكشف عن أبرز تشكيلات المجوهرات الفاخرة وأطقم الغالا الملكية',
    excerpt: 'Explore sovereign bridal sets, baroque freshwater pearls, and certified 925 sterling silver suites. Hand-threaded Arabian Gulf gems and precision-cut simulated diamonds with 24-hr GCC express dispatch.',
    excerptAr: 'استكشفي أطقم الأعراس السيادية، ولؤلؤ المياه العذبة الباروكي الفاخر، والفضة الإسترلينية عيار 925 المعتمدة مع توصيل سريع خلال 24 ساعة في الإمارات ودول الخليج.',
    publication: 'Vogue Arabia Special Edition',
    date: 'Exclusive Events',
    dateAr: 'فعاليات حصرية',
    slug: 'omnia-stores-main-event-luxury-jewellery-collections-uae',
    canonicalStoreUrl: 'https://omniastores.com/collections/necklaces',
    featuredProduct: {
      id: 'prod-baroque-pearl-suite',
      title: 'The Royal Empress Baroque Pearl Drop & Diamond Suite',
      titleAr: 'طقم إمبراطورة اللؤلؤ الباروكي وألماس الفلورا الفاخر',
      priceAed: 1450,
      priceSar: 1480,
      image: '/editorial-looks/baroque-pearl-drop-diamond-flora-model.jpg',
      storeUrl: 'https://omniastores.com/collections/necklaces',
    },
  },
  // Slide 2: UAE National Day - Celebrate the Spirit of the Emirates (NEW BANNER)
  {
    id: 'slide-national-day-spirit-of-emirates',
    type: 'image',
    coverImage: '/banners/national-day-spirit-of-emirates-banner.jpg',
    title: 'National Day: Celebrate the Spirit of the Emirates with Sovereign Pearl & Emerald Chokers',
    titleAr: 'اليوم الوطني: احتفلي بروح الاتحاد مع أطواق اللؤلؤ والزمرد الملكية وعروض حصرية',
    excerpt: 'Mark the 55th UAE National Day with imperial 4-strand freshwater pearl and Colombian-emerald cabochon chokers in solid 925 sterling silver with anti-tarnish Italian rhodium.',
    excerptAr: 'احتفلي باليوم الوطني الإماراتي مع تشوكر اللؤلؤ الطبيعي ذو 4 خيوط وأحجار الزمرد الكولومبي الكابوشون المصاغ من الفضة 925 والروديوم الإيطالي المقاوم للأكسدة.',
    publication: 'The National UAE Editorial',
    date: 'National Day 2026',
    dateAr: 'اليوم الوطني 2026',
    slug: 'uae-national-day-jewelry-sale-omnia-stores-dubai',
    canonicalStoreUrl: 'https://omniastores.com/collections/chokers-collection',
    featuredProduct: {
      id: 'prod-imperial-emerald-choker',
      title: 'Imperial 4-Strand Pearl & Emerald Choker',
      titleAr: 'تشوكر اللؤلؤ الإمبراطوري ذو 4 خيوط والزمرد',
      priceAed: 1650,
      priceSar: 1680,
      image: '/editorial-looks/imperial-emerald-pearl-choker.jpg',
      storeUrl: 'https://omniastores.com/collections/chokers-collection',
    },
  },
  // Slide 3: New Year - Celebrate in Timeless Elegance (NEW BANNER)
  {
    id: 'slide-new-year-timeless-elegance',
    type: 'image',
    coverImage: '/banners/new-year-timeless-elegance-banner.jpg',
    title: 'New Year: Celebrate in Timeless Elegance with Geometric Diamond Collars & South Sea Pearls',
    titleAr: 'رأس السنة: احتفلي بأناقة خالدة وأطواق الألماس الهندسي ولؤلؤ البحار الجنوبية',
    excerpt: 'Ring in the New Year with monumental brilliance: Omnia Stores announces the New Year 2027 Gala collection featuring architectural diamond collarets and luminous teardrop pearls.',
    excerptAr: 'استقبلي العام الجديد ببريق ملكي استثنائي: تشكيلة رأس السنة 2027 بأطواق الألماس الهندسي المتدرج ولؤلؤ البحار الجنوبية الفاخر مع خصومات حصرية تصل إلى 50%.',
    publication: 'Khaleej Times Gala',
    date: 'New Year 2027',
    dateAr: 'رأس السنة 2027',
    slug: 'new-year-sale-2027-welcome-elegance-omnia-stores-dubai',
    canonicalStoreUrl: 'https://omniastores.com/collections/bridal-collection',
    featuredProduct: {
      id: 'prod-geometric-diamond-south-sea',
      title: 'Geometric Diamond Collar & South Sea Pearl',
      titleAr: 'طوق الألماس الهندسي ولؤلؤ البحار الجنوبية',
      priceAed: 1850,
      priceSar: 1890,
      image: '/editorial-looks/geometric-diamond-south-sea-pearl.jpg',
      storeUrl: 'https://omniastores.com/collections/bridal-collection',
    },
  },
  // Slide 4: Black Friday - Exclusive Luxury Offers (NEW BANNER)
  {
    id: 'slide-black-friday-luxury-offers',
    type: 'image',
    coverImage: '/banners/black-friday-luxury-offers-banner.jpg',
    title: 'Black Friday & White Friday GCC: Exclusive Luxury Jewellery Offers & Pink Sapphire Solitaires',
    titleAr: 'بلاك فرايدي والجمعة البيضاء: عروض المجوهرات الفاخرة الحصرية وسوليتير الياقوت الوردي',
    excerpt: 'The biggest shopping event of the season across Dubai and the GCC. Certified 925 sterling silver solitaires, rose princess pink sapphires, and direct Tabby 4-split payments.',
    excerptAr: 'الحدث الأضخم للتسوق في دبي والخليج: عروض حصرية على سوليتير الياقوت الوردي الملكي وهالة الألماس والفضة 925 المعتمدة مع تقسيط ميسر على 4 دفعات بدون فوائد.',
    publication: "Harper's Bazaar Arabia",
    date: 'Black Friday Event',
    dateAr: 'عروض البلاك فرايدي',
    slug: 'white-friday-mega-sale-omnia-stores-gcc-discounts',
    canonicalStoreUrl: 'https://omniastores.com/collections/discounted-items',
    featuredProduct: {
      id: 'prod-pink-sapphire-halo',
      title: 'Rose Princess Oval Pink Sapphire & Diamond Halo Pendant',
      titleAr: 'قلادة أميرة الورد بالياقوت الوردي وهالة الألماس',
      priceAed: 890,
      priceSar: 908,
      image: '/editorial-looks/pink-sapphire-halo-pendant.jpg',
      storeUrl: 'https://omniastores.com/collections/discounted-items',
    },
  },
  // Slide 5: Ramadan - Grace, Light & Elegance (NEW BANNER)
  {
    id: 'slide-ramadan-grace-light-elegance',
    type: 'image',
    coverImage: '/banners/ramadan-grace-light-elegance-banner.jpg',
    title: 'Ramadan Holy Month: Grace, Light & Elegance with Monarch Canary Butterfly Pendants',
    titleAr: 'شهر رمضان المبارك: إشراقة النور والأناقة مع قلادة الفراشة الصفراء الملكية',
    excerpt: 'Embrace spiritual gatherings, suhoor galas, and festive Ramadan evenings with handcrafted canary yellow pavé butterfly pendants set in solid 925 sterling silver.',
    excerptAr: 'تألقي في أمسيات وسحور الشهر الفضيل مع قلادة الفراشة الكناري الصفراء المرصعة بألماس البافيه المتلألئ والفضة الإسترلينية الخالصة عيار 925.',
    publication: 'Sayidaty Magazine Luxury Edit',
    date: 'Ramadan Kareem',
    dateAr: 'رمضان كريم',
    slug: 'ramadan-sale-curated-festive-gathering-jewelry-omnia-stores',
    canonicalStoreUrl: 'https://omniastores.com/collections/necklaces',
    featuredProduct: {
      id: 'prod-canary-butterfly-pendant',
      title: 'Monarch Canary Yellow Pavé Butterfly Pendant',
      titleAr: 'قلادة الفراشة الكناري الصفراء المرصعة بالبافيه',
      priceAed: 920,
      priceSar: 938,
      image: '/editorial-looks/canary-butterfly-pendant-model.jpg',
      storeUrl: 'https://omniastores.com/collections/necklaces',
    },
  },
];

const SLIDE_TABS = [
  { label: 'Upcoming Events', labelAr: 'الفعاليات القادمة', sub: 'Luxury Jewellery Highlights', subAr: 'أبرز تشكيلات المجوهرات' },
  { label: 'UAE National Day', labelAr: 'اليوم الوطني الإماراتي', sub: 'Spirit of the Emirates', subAr: 'روح الاتحاد' },
  { label: 'New Year 2027', labelAr: 'رأس السنة 2027', sub: 'Celebrate in Elegance', subAr: 'أناقة خالدة' },
  { label: 'Black Friday', labelAr: 'بلاك فرايدي', sub: 'Exclusive Luxury Offers', subAr: 'عروض فاخرة حصرية' },
  { label: 'Ramadan Kareem', labelAr: 'رمضان كريم', sub: 'Grace, Light & Elegance', subAr: 'إشراقة النور والأناقة' },
];

export function HeroSlider() {
  const { formatPrice, language } = useLuxury();
  const isAr = language === 'ar';

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mobile Touch Swipe State
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    if (distance > 45) {
      // Swiped left
      isAr ? prevSlide() : nextSlide();
    } else if (distance < -45) {
      // Swiped right
      isAr ? nextSlide() : prevSlide();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  const slides = HERO_SLIDES;
  const SLIDE_DURATION = 7500;

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  // Handle video element play/pause state when slide changes
  useEffect(() => {
    if (slides[current]?.type === 'video' && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
      setIsVideoPlaying(true);
    }
  }, [current, slides]);

  const toggleVideoPlayback = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsVideoPlaying(true);
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const active = slides[current] || slides[0]!;

  const slideTitle = isAr
    ? (active.titleAr || 'تشكيلة المجوهرات الملكية الفاخرة من أمنية ستورز')
    : active.title;

  const slideExcerpt = isAr
    ? (active.excerptAr || 'تشكيلة حصرية من الفضة الإسترلينية الخالصة عيار 925 المرصعة بمحاكاة الألماس الفاخر.')
    : active.excerpt;

  const slidePub = getPublicationLabel(active.publication, isAr);
  
  const slideDate = isAr ? active.dateAr : active.date;

  const featuredProductTitle = isAr
    ? (active.featuredProduct?.titleAr || active.featuredProduct?.title)
    : active.featuredProduct?.title;

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full bg-[#07090E] border-b border-[#B8860B]/25 dark:border-gold/25 overflow-hidden flex flex-col group select-none"
    >
      {/* =========================================================================
          0. MOBILE TOP ANNOUNCEMENT & PROMO STRIP (Sleek, Unobtrusive)
          - Keeps the mobile banner canvas 100% clean and free of overlapping buttons
      ========================================================================== */}
      <div className="sm:hidden w-full bg-gradient-to-r from-[#0A0D14] via-[#151A26] to-[#0A0D14] border-b border-gold/30 px-3 py-1.5 flex items-center justify-between text-xs z-30">
        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-600 via-gold to-amber-500 text-black font-extrabold text-[9px] uppercase tracking-wider shadow-sm">
            {slideDate}
          </span>
          <span className="px-1.5 py-0.5 rounded bg-black/85 border border-gold/50 text-gold font-mono font-bold text-[9px]">
            OMNIA-VIP15
          </span>
        </div>
        <a
          href={active.canonicalStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-bold text-amber-300 hover:text-white flex items-center gap-1"
        >
          <span>{isAr ? 'تسوق الآن' : 'Explore Collection'}</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>

      {/* =========================================================================
          1. DEDICATED BANNER DISPLAY CANVAS (Edge-to-edge 16:9, zero side gaps)
      ========================================================================== */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full aspect-[16/9] max-h-[82vh] overflow-hidden bg-[#07090E] flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        {slides.map((s, idx) => {
          const isCurrent = idx === current;
          return (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-out flex items-center justify-center ${
                isCurrent ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* The Sharp, Edge-to-Edge Responsive Banner / Video */}
              {s.type === 'video' ? (
                <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
                  <video
                    ref={isCurrent ? videoRef : undefined}
                    src={s.videoUrl}
                    poster={s.coverImage}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={s.coverImage}
                    alt={isAr ? (s.titleAr || s.title) : s.title}
                    fill
                    priority={idx <= 2}
                    unoptimized
                    sizes="100vw"
                    className="object-cover object-center"
                  />
                </div>
              )}

              {/* Clickable Full-Slide Anchor directly to Collection */}
              <a
                href={s.canonicalStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-20 cursor-pointer"
                aria-label={`Explore ${isAr ? (s.titleAr || s.title) : s.title} at Omnia Stores`}
                title="Explore verified collection at Omnia Stores"
              />
            </div>
          );
        })}

        {/* Desktop / Tablet Floating Top Corner Badges (z-30 ensures always above slide) */}
        <div className="hidden sm:flex absolute top-3 sm:top-4 inset-x-0 z-30 max-w-7xl mx-auto px-4 sm:px-6 items-center justify-between gap-2 pointer-events-none">
          
          {/* Top-Left: Event Badge & VIP Code */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pointer-events-auto">
            <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-amber-600 via-gold to-amber-500 text-black font-extrabold text-[10px] sm:text-xs tracking-wider uppercase shadow-md">
              {slideDate}
            </span>
            <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-black/85 border border-gold/50 text-gold text-[10px] sm:text-xs font-mono font-bold backdrop-blur-md shadow-md">
              OMNIA-VIP15
            </span>
            <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/80 border border-gold/40 text-gold text-[10px] font-bold backdrop-blur-md">
              <Sparkles className="w-2.5 h-2.5 text-gold animate-spin" style={{ animationDuration: '6s' }} />
              {slidePub}
            </span>
          </div>

          {/* Top-Right: Quick Action CTAs */}
          <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
            <div className="flex items-center gap-1.5">
              <Link
                href={`/trending/${active.slug}`}
                className="hidden lg:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/80 hover:bg-gold hover:text-black border border-gold/40 text-gold text-[11px] font-semibold backdrop-blur-md transition-all shadow-md"
              >
                <BookOpen className="w-3 h-3 shrink-0" />
                <span>{isAr ? 'التقرير' : 'Editorial Wire'}</span>
              </Link>

              <a
                href={active.canonicalStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-gold via-amber-300 to-[#AA8C2C] text-black font-extrabold text-[11px] sm:text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                <Crown className="w-3 h-3 text-black shrink-0" />
                <span>{isAr ? 'تسوق التشكيلة' : 'Shop Collection'}</span>
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. MOBILE PRIMARY ACTION BAR (Positioned directly below the artwork)
      ========================================================================== */}
      <div className="sm:hidden w-full px-3 py-2 bg-[#090C14] border-t border-gold/25 flex items-center justify-between gap-2 z-20">
        <div className="flex flex-col min-w-0 pr-2">
          <span className="text-[11px] font-serif font-bold text-white truncate">
            {slideTitle}
          </span>
          <span className="text-[9px] font-mono text-gold truncate">
            {isAr ? 'فضة إسترلينية 925 معتمدة • توصيل خلال 24 ساعة' : 'Certified 925 Sterling Silver • 24h GCC Delivery'}
          </span>
        </div>
        <a
          href={active.canonicalStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-gold via-amber-300 to-[#AA8C2C] text-black font-extrabold text-[10px] tracking-wider uppercase flex items-center gap-1 shadow-md shrink-0 active:scale-95"
        >
          <span>{isAr ? 'تسوق الآن' : 'Shop Now'}</span>
          <ArrowRight className="w-3 h-3 rtl:rotate-180" />
        </a>
      </div>

      {/* =========================================================================
          3. BOTTOM CAROUSEL CONTROLS (Responsive on all screen sizes)
      ========================================================================== */}
      <div className="relative z-20 w-full border-t border-gold/20 bg-[#0B0E17]/98 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3">

          {/* Mobile / Small Screen Navigation Bar */}
          <div className="md:hidden flex items-center justify-between w-full gap-2">
            {/* Active Counter */}
            <span className="text-[11px] font-mono font-bold text-gold">
              0{current + 1} / 0{slides.length}
            </span>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    idx === current ? 'w-6 bg-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]' : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next Chevrons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={prevSlide}
                aria-label="Previous editorial slide"
                className="p-1.5 rounded-full bg-black/80 border border-gold/30 text-gold hover:bg-gold hover:text-black transition-all active:scale-90"
              >
                <ChevronLeft className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next editorial slide"
                className="p-1.5 rounded-full bg-black/80 border border-gold/30 text-gold hover:bg-gold hover:text-black transition-all active:scale-90"
              >
                <ChevronRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Desktop Campaign Slide Tabs */}
          <div className="hidden md:flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
              {slides.map((s, idx) => {
                const isTabActive = idx === current;
                const meta = SLIDE_TABS[idx] || { label: `Slide 0${idx + 1}`, labelAr: `شريحة 0${idx + 1}`, sub: '', subAr: '' };
                return (
                  <button
                    key={s.id}
                    onClick={() => setCurrent(idx)}
                    className={`px-3.5 py-2 rounded-xl text-left rtl:text-right transition-all duration-300 flex items-center gap-2.5 border whitespace-nowrap flex-shrink-0 ${
                      isTabActive
                        ? 'bg-gold/20 border-gold text-gold shadow-[0_0_15px_rgba(212,175,55,0.3)] font-semibold'
                        : 'border-white/10 hover:border-gold/40 text-neutral-400 hover:text-white bg-black/40'
                    }`}
                  >
                    <span className={`text-[10px] font-mono ${isTabActive ? 'text-gold' : 'text-neutral-500'}`}>
                      0{idx + 1}
                    </span>
                    <div className="flex flex-col text-left rtl:text-right">
                      <span className="text-xs uppercase tracking-wider font-bold">
                        {isAr ? meta.labelAr : meta.label}
                      </span>
                      <span className="text-[9px] font-serif text-neutral-400">
                        {isAr ? meta.subAr : meta.sub}
                      </span>
                    </div>
                    {isTabActive && <Crown className="w-3 h-3 text-gold shrink-0 animate-pulse" />}
                  </button>
                );
              })}
            </div>

            {/* Desktop Arrows & Counter */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-mono text-neutral-400">
                0{current + 1} / 0{slides.length}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={prevSlide}
                  aria-label="Previous editorial slide"
                  className="p-2 rounded-full bg-black/80 border border-gold/30 text-gold hover:bg-gold hover:text-black transition-all shadow-md active:scale-95"
                >
                  <ChevronLeft className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
                </button>

                <button
                  onClick={nextSlide}
                  aria-label="Next editorial slide"
                  className="p-2 rounded-full bg-black/80 border border-gold/30 text-gold hover:bg-gold hover:text-black transition-all shadow-md active:scale-95"
                >
                  <ChevronRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Real-Time Animated Slide Progress Countdown Bar at the very bottom */}
        <div className="w-full h-1 flex bg-white/10">
          {slides.map((_, idx) => (
            <div key={idx} className="flex-1 relative overflow-hidden">
              {idx === current && (
                <div
                  key={`progress-${current}-${isPaused ? 'paused' : 'running'}`}
                  className={`h-full bg-gradient-to-r from-gold via-amber-300 to-gold ${
                    isPaused ? 'w-full opacity-60' : ''
                  }`}
                  style={{
                    animation: isPaused ? 'none' : 'heroProgress 7.5s linear forwards',
                    width: isPaused ? '50%' : undefined,
                  }}
                />
              )}
              {idx < current && <div className="h-full w-full bg-gold/50" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
