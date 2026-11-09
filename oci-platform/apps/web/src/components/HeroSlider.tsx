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
  Film
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

// 6 Synchronized 11:11 Hero Slides Featuring Video Commercial & New High-Fashion Banners
const HERO_SLIDES: HeroSlideItem[] = [
  // Slide 1: 1080P Commercial Film
  {
    id: 'slide-11-11-video-film',
    type: 'video',
    videoUrl: '/videos/11-11-web-banner-1080p.mp4',
    coverImage: '/banners/11-11-sale-butterfly-podium-exclusive.jpg',
    title: 'Only Today: Omnia Stores 11.11 Official Luxury Film & Web Commercial',
    titleAr: 'اليوم فقط: فيلم أمنية ستورز الإعلاني الحصري وعروض 11.11 الكبرى',
    excerpt: 'Watch the official 1080P commercial film. Pure 925 sterling silver bridal suites and simulated diamonds with discounts up to 85% off on discounted items.',
    excerptAr: 'شاهد الفيلم الإعلاني الرسمي عالي الدقة 1080P لمهرجان 11.11. أطقم الفضة الإسترلينية عيار 925 ومحاكاة الألماس الفاخر بخصومات تصل إلى 85% على القطع المخفضة.',
    publication: 'The Vogue News Cinema',
    date: 'Only Today',
    dateAr: 'اليوم فقط',
    slug: 'only-today-omnia-stores-11-11-butterfly-discounted-items-uae',
    canonicalStoreUrl: DISCOUNTED_ITEMS_URL,
    featuredProduct: {
      id: 'prod-11-11-video-suite',
      title: '11:11 Video Cinema Featured Suite',
      titleAr: 'طقم العرض السينمائي المميز في 11:11',
      priceAed: 850,
      priceSar: 867,
      image: '/banners/11-11-sale-butterfly-podium-exclusive.jpg',
      storeUrl: DISCOUNTED_ITEMS_URL,
    },
  },
  // Slide 2: Butterfly Podium Exclusive
  {
    id: 'slide-11-11-butterfly-podium',
    type: 'image',
    coverImage: '/banners/11-11-sale-butterfly-podium-exclusive.jpg',
    title: 'Only Today: Butterfly Pendants & Signature Solitaire Podium Drop',
    titleAr: 'اليوم فقط: منصة قلائد الفراشة الماسية وميداليات السوليتير الحصرية',
    excerpt: 'Hand-set pavé butterfly collar, lock medallion, glowing heart, and teddy bear pendants in certified anti-tarnish 925 sterling silver.',
    excerptAr: 'عقد الفراشة المرصع بالبافيه، وميدالية القفل، والقلب المتوهج، وقلادة الدب المحبوبة في فضة إسترلينية 925 مقاومة للأكسدة.',
    publication: 'Gulf News Focus',
    date: 'Only Today',
    dateAr: 'اليوم فقط',
    slug: 'only-today-omnia-stores-11-11-butterfly-discounted-items-uae',
    canonicalStoreUrl: DISCOUNTED_ITEMS_URL,
    featuredProduct: {
      id: 'prod-butterfly-podium',
      title: '11:11 Pavé Butterfly Signature Collier',
      titleAr: 'عقد الفراشة الأيقوني المرصع بالألماس',
      priceAed: 450,
      priceSar: 459,
      image: '/banners/11-11-sale-butterfly-podium-exclusive.jpg',
      storeUrl: DISCOUNTED_ITEMS_URL,
    },
  },
  // Slide 3: Butterfly Yellow Heart Showcase
  {
    id: 'slide-11-11-yellow-heart',
    type: 'image',
    coverImage: '/banners/11-11-sale-butterfly-yellow-heart-showcase.jpg',
    title: 'Only Today: Canary Yellow Heart Collar & Horseshoe Solitaire Showcase',
    titleAr: 'اليوم فقط: طوق القلب الأصفر الكناري وسوليتير حدوة الحظ',
    excerpt: 'High-carat radiant yellow cushion heart suite with horseshoe solitaire and butterfly pendant. DCL assay hallmark verified with code OMNIA1111.',
    excerptAr: 'طقم القلب المشع بالياقوت الأصفر عالي القيراط مع حدوة الحظ الماسية وقلادة الفراشة. مختوم من مختبر دبي المركزي مع كود OMNIA1111.',
    publication: 'Vogue Arabia',
    date: 'Only Today',
    dateAr: 'اليوم فقط',
    slug: 'vogue-arabia-11-11-canary-yellow-sapphire-high-carat-event',
    canonicalStoreUrl: DISCOUNTED_ITEMS_URL,
    featuredProduct: {
      id: 'prod-yellow-heart',
      title: '11:11 Canary Yellow Heart Collar & Ring',
      titleAr: 'طوق وخاتم القلب الأصفر الكناري',
      priceAed: 1111,
      priceSar: 1133,
      image: '/banners/11-11-sale-butterfly-yellow-heart-showcase.jpg',
      storeUrl: DISCOUNTED_ITEMS_URL,
    },
  },
  // Slide 4: Diamond Teardrop Suite
  {
    id: 'slide-11-11-diamond-teardrop',
    type: 'image',
    coverImage: '/banners/11-11-sale-diamond-teardrop-exclusive.png',
    title: 'Only Today: The 11:11 Exclusive Diamond Teardrop Bridal Suite',
    titleAr: 'اليوم فقط: طقم قطرة الألماس الملكي الحصري للعرائس',
    excerpt: 'Cascading high-carat teardrop pendant and chandelier drops with champagne presentation vault box. Factory-direct assay pricing.',
    excerptAr: 'قلادة قطرة الألماس المنسابة وأقراط الثريا مع صندوق الهدايا الذهبي الفاخر. أسعار مباشرة من المصنع ومعتمدة مخبرياً.',
    publication: 'Gulf News Focus',
    date: 'Only Today',
    dateAr: 'اليوم فقط',
    slug: 'gulf-news-omnia-stores-11-11-mega-cart-drops-uae',
    canonicalStoreUrl: DISCOUNTED_ITEMS_URL,
    featuredProduct: {
      id: 'prod-diamond-teardrop',
      title: '11:11 Diamond Teardrop Master Suite',
      titleAr: 'طقم قطرة الألماس الملكي الفاخر',
      priceAed: 850,
      priceSar: 867,
      image: '/banners/11-11-sale-diamond-teardrop-exclusive.png',
      storeUrl: DISCOUNTED_ITEMS_URL,
    },
  },
  // Slide 5: Regal Ruby Floral Gala
  {
    id: 'slide-11-11-ruby-floral',
    type: 'image',
    coverImage: '/banners/11-11-sale-ruby-floral-luxury-event.jpg',
    title: 'Only Today: Regal Ruby Floral Gala Event & Emerald-Cut Ring',
    titleAr: 'اليوم فقط: مهرجان زهرة الياقوت الملكي وخاتم السهرة بقطع الزمرد',
    excerpt: 'Pigeon-blood red simulated ruby floral collar with emerald-cut cocktail ring. Single’s Day luxury flash deals with instant Dh3,000 cart savings.',
    excerptAr: 'عقد زهرة الياقوت القرمزي وخاتم السهرة الملكي بقطع الزمرد. عروض يوم العزاب الحصرية مع توفير يصل إلى 3,000 درهم.',
    publication: 'Khaleej Times',
    date: 'Only Today',
    dateAr: 'اليوم فقط',
    slug: 'khaleej-times-11-11-sale-begins-uae-omnia-stores-luxury-deals',
    canonicalStoreUrl: DISCOUNTED_ITEMS_URL,
    featuredProduct: {
      id: 'prod-ruby-floral',
      title: '11:11 Regal Ruby Floral Gala Parure',
      titleAr: 'طقم زهرة الياقوت الملكي الفاخر',
      priceAed: 950,
      priceSar: 969,
      image: '/banners/11-11-sale-ruby-floral-luxury-event.jpg',
      storeUrl: DISCOUNTED_ITEMS_URL,
    },
  },
  // Slide 6: Midnight Butterfly Black Dress
  {
    id: 'slide-11-11-butterfly-vault',
    type: 'image',
    coverImage: '/banners/11-11-sale-butterfly-black-dress-vault.jpg',
    title: 'Only Today: Midnight Butterfly Velvet Gala Suite & Gift Vault',
    titleAr: 'اليوم فقط: طقم فراشة منتصف الليل المخملية مع صندوق الهدايا الذهبي',
    excerpt: 'Tailored for Arabian evening galas, silk abayas, and festive soirées. Pure 925 sterling silver with Tabby 4 interest-free installments.',
    excerptAr: 'مصمم خصيصاً لسهرات الخليج الفاخرة والعباءات الراقية. فضة إسترلينية 925 مع تقسيط ميسر على 4 دفعات عبر تابي.',
    publication: "Harper's Bazaar Arabia",
    date: 'Only Today',
    dateAr: 'اليوم فقط',
    slug: 'harpers-bazaar-11-11-dual-royal-parure-gala-glamour',
    canonicalStoreUrl: DISCOUNTED_ITEMS_URL,
    featuredProduct: {
      id: 'prod-butterfly-black-dress',
      title: '11:11 Midnight Butterfly Gala Collier',
      titleAr: 'عقد فراشة منتصف الليل الملكي',
      priceAed: 650,
      priceSar: 663,
      image: '/banners/11-11-sale-butterfly-black-dress-vault.jpg',
      storeUrl: DISCOUNTED_ITEMS_URL,
    },
  },
  // Slide 7: Yellow Sapphire Statement Choker & Ring
  {
    id: 'slide-11-11-yellow-sapphire-statement',
    type: 'image',
    coverImage: '/banners/11-11-sale-yellow-sapphire-statement.jpg',
    title: 'Only Today: Emerald-Cut Yellow Sapphire Statement Collar & Solitaire Ring',
    titleAr: 'اليوم فقط: طوق السوليتير المشع بالياقوت الأصفر وخاتم المناسبات الملكي',
    excerpt: 'Handcrafted radiant emerald-cut yellow sapphire collar and solitaire statement ring. Single’s Day luxury event with instant Dh3,000 cart savings.',
    excerptAr: 'طوق وياقوت أصفر مشع بقطع الزمرد وخاتم السهرة الفاخر. عروض يوم العزاب الحصرية بخصم استثنائي وتوفير يصل إلى 3,000 درهم.',
    publication: 'Vogue Arabia',
    date: 'Only Today',
    dateAr: 'اليوم فقط',
    slug: 'vogue-arabia-11-11-canary-yellow-sapphire-high-carat-event',
    canonicalStoreUrl: DISCOUNTED_ITEMS_URL,
    featuredProduct: {
      id: 'prod-yellow-sapphire-statement',
      title: '11:11 Emerald-Cut Yellow Sapphire Parure',
      titleAr: 'طقم الياقوت الأصفر بقطع الزمرد الملكي',
      priceAed: 1111,
      priceSar: 1133,
      image: '/banners/11-11-sale-yellow-sapphire-statement.jpg',
      storeUrl: DISCOUNTED_ITEMS_URL,
    },
  },
  // Slide 8: Dual Royal Suite Edition
  {
    id: 'slide-11-11-dual-royal-suite',
    type: 'image',
    coverImage: '/banners/11-11-sale-dual-royal-suite-edition.jpg',
    title: 'Only Today: Dual Royal Bridal Parure & Imperial Gemstone Gala',
    titleAr: 'اليوم فقط: الطقم الملكي المزدوج للعرائس ومهرجان الأحجار الكريمة',
    excerpt: 'Two exquisite bridal parures featuring canary yellow cushion collar and Burmese royal ruby chandelier suite with bespoke satin presentation box.',
    excerptAr: 'طقمين ملكيين استثنائيين للعرائس: الياقوت الأصفر الكناري والياقوت القرمزي مع علبة الهدايا الذهبية الفاخرة.',
    publication: "Harper's Bazaar Arabia",
    date: 'Only Today',
    dateAr: 'اليوم فقط',
    slug: 'harpers-bazaar-11-11-dual-royal-parure-gala-glamour',
    canonicalStoreUrl: DISCOUNTED_ITEMS_URL,
    featuredProduct: {
      id: 'prod-dual-royal-suite',
      title: '11:11 Dual Royal Bridal Master Suites',
      titleAr: 'الأطقم الملكية المزدوجة للعرائس',
      priceAed: 1450,
      priceSar: 1479,
      image: '/banners/11-11-sale-dual-royal-suite-edition.jpg',
      storeUrl: DISCOUNTED_ITEMS_URL,
    },
  },
  // Slide 9: Triple Model Grand Gala Edition
  {
    id: 'slide-11-11-triple-model-grand-gala',
    type: 'image',
    coverImage: '/banners/11-11-sale-triple-model-grand-gala.jpg',
    title: 'Only Today: Grand Gala 11:11 Trio Edition — Signature Pendants & Collars',
    titleAr: 'اليوم فقط: ثلاثية السهرة الكبرى في 11:11 — قلائد الفراشة والأطواق الملكية',
    excerpt: 'Showcasing the complete 11:11 high jewellery collection: Pavé butterfly collar, canary yellow cushion heart, and multicolour drops.',
    excerptAr: 'المجموعة الكاملة للمجوهرات الراقية في 11:11: عقد الفراشة الماسي، والقلب الأصفر، وقطرات الألوان الملكية بخصومات حتى 90%.',
    publication: 'Gulf News Focus',
    date: 'Only Today',
    dateAr: 'اليوم فقط',
    slug: 'gulf-news-omnia-stores-11-11-mega-cart-drops-uae',
    canonicalStoreUrl: DISCOUNTED_ITEMS_URL,
    featuredProduct: {
      id: 'prod-triple-model-grand-gala',
      title: '11:11 Grand Gala Complete Collection Trio',
      titleAr: 'ثلاثية السهرة الكبرى الكاملة في 11:11',
      priceAed: 1650,
      priceSar: 1683,
      image: '/banners/11-11-sale-triple-model-grand-gala.jpg',
      storeUrl: DISCOUNTED_ITEMS_URL,
    },
  },
];

const SLIDE_TABS = [
  { label: '11:11 Video Cinema', labelAr: 'فيديو 11:11 السينمائي', sub: 'Watch 1080P Film', subAr: 'شاهد العرض الفاخر' },
  { label: 'Butterfly Pendants', labelAr: 'قلائد الفراشة الماسية', sub: 'Only Today Deals', subAr: 'عروض اليوم فقط' },
  { label: 'Canary Yellow Heart', labelAr: 'قلب الياقوت الأصفر', sub: 'Up to 85% Off', subAr: 'خصم حتى 85%' },
  { label: 'Diamond Teardrop', labelAr: 'قطرة الألماس الملكية', sub: 'Save Dh3,000', subAr: 'وفر 3,000 د.إ' },
  { label: 'Ruby Floral Gala', labelAr: 'مهرجان الياقوت الملكي', sub: 'Deals from Dh111', subAr: 'تبدأ من 111 د.إ' },
  { label: 'Midnight Butterfly', labelAr: 'فراشة منتصف الليل', sub: 'Gift Vault Included', subAr: 'صندوق الهدايا مشمول' },
  { label: 'Yellow Statement Suite', labelAr: 'طوق الياقوت الأصفر', sub: 'Limited Edition', subAr: 'إصدار محدود' },
  { label: 'Dual Royal Suites', labelAr: 'الأطقم الملكية المزدوجة', sub: 'Bridal Grand Luxe', subAr: 'أطقم العرائس الفاخرة' },
  { label: 'Grand Gala Trio', labelAr: 'ثلاثية السهرة الكبرى', sub: 'Up to 90% Off', subAr: 'خصومات حتى 90%' },
];

export function HeroSlider() {
  const { formatPrice, language } = useLuxury();
  const isAr = language === 'ar';

  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

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
      className="relative w-full bg-[#07090E] border-b border-[#B8860B]/25 dark:border-gold/25 overflow-hidden flex flex-col group"
    >
      {/* =========================================================================
          1. DEDICATED BANNER DISPLAY CANVAS (Zero-overlap, 100% visible from top to bottom)
      ========================================================================== */}
      <div className="relative w-full aspect-[2/1] sm:aspect-[2/1] max-h-[75vh] min-h-[220px] sm:min-h-[320px] md:min-h-[420px] lg:min-h-[520px] xl:min-h-[600px] overflow-hidden bg-[#07090E] flex items-center justify-center">
        {slides.map((s, idx) => {
          const isCurrent = idx === current;
          return (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-out flex items-center justify-center ${
                isCurrent ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Luxury Ambient Blurred Backing (Fills extra wide-screen space seamlessly with matching banner colors) */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <Image
                  src={s.coverImage}
                  alt=""
                  fill
                  unoptimized
                  className="object-cover blur-3xl opacity-30 scale-110"
                  aria-hidden
                />
              </div>

              {/* The Sharp, 100% Uncropped, Fully Visible Banner / Video */}
              {s.type === 'video' ? (
                <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
                  <video
                    ref={isCurrent ? videoRef : undefined}
                    src={s.videoUrl || '/videos/11-11-web-banner-1080p.mp4'}
                    poster={s.coverImage}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={s.coverImage}
                    alt={isAr ? (s.titleAr || s.title) : s.title}
                    fill
                    priority={idx <= 2}
                    unoptimized
                    sizes="100vw"
                    className="object-contain object-center"
                  />
                </div>
              )}

              {/* Clickable Full-Slide Anchor directly to Discounted Items */}
              <a
                href={DISCOUNTED_ITEMS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-15 cursor-pointer"
                aria-label={`Shop 11:11 Discounted Items - ${isAr ? (s.titleAr || s.title) : s.title}`}
                title="Click to shop 11:11 Discounted Items at Omnia Stores"
              />
            </div>
          );
        })}

        {/* Floating Top Corner Badges (Positioned cleanly at the top corners without blocking artwork) */}
        <div className="absolute top-2 sm:top-4 inset-x-0 z-25 max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between gap-2 pointer-events-none">
          
          {/* Top-Left: Glowing "ONLY TODAY • 11:11" Badge & Promo Code */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pointer-events-auto">
            <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-red-600 via-amber-500 to-amber-600 text-white font-extrabold text-[10px] sm:text-xs tracking-wider uppercase animate-pulse shadow-md">
              {isAr ? 'اليوم فقط • 11:11' : 'ONLY TODAY • 11:11'}
            </span>
            <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-black/85 border border-gold/50 text-gold text-[10px] sm:text-xs font-mono font-bold backdrop-blur-md shadow-md">
              OMNIA1111
            </span>
            <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/80 border border-gold/40 text-gold text-[10px] font-bold backdrop-blur-md">
              <Sparkles className="w-2.5 h-2.5 text-gold animate-spin" style={{ animationDuration: '6s' }} />
              {slidePub}
            </span>
          </div>

          {/* Top-Right: Video Controls (if video) or Quick Action CTAs */}
          <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
            {active.type === 'video' ? (
              <div className="flex items-center gap-1.5">
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/80 border border-gold/40 text-gold text-[10px] font-mono font-bold backdrop-blur-md">
                  <Film className="w-3 h-3 text-gold animate-pulse" />
                  1080P
                </span>

                <button
                  onClick={toggleVideoPlayback}
                  aria-label={isVideoPlaying ? 'Pause Video' : 'Play Video'}
                  className="p-1.5 sm:p-2 rounded-full bg-black/85 hover:bg-gold hover:text-black text-gold border border-gold/40 backdrop-blur-md transition-all shadow-md active:scale-95"
                >
                  {isVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                </button>

                <button
                  onClick={toggleSound}
                  aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/85 hover:bg-gold hover:text-black text-gold border border-gold/40 text-[10px] sm:text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1 shadow-md active:scale-95"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
                  <span>{isMuted ? (isAr ? 'الصوت' : 'Sound') : (isAr ? 'مفعل' : 'On')}</span>
                </button>

                <a
                  href={DISCOUNTED_ITEMS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-gold via-amber-300 to-[#AA8C2C] text-black font-extrabold text-[11px] tracking-wider uppercase shadow-md hover:scale-105 active:scale-95 transition-all"
                >
                  <Crown className="w-3 h-3 text-black shrink-0" />
                  <span>{isAr ? 'تسوق المخفض' : 'Shop Sale'}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <Link
                  href={`/trending/${active.slug}`}
                  className="hidden lg:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/80 hover:bg-gold hover:text-black border border-gold/40 text-gold text-[11px] font-semibold backdrop-blur-md transition-all shadow-md"
                >
                  <BookOpen className="w-3 h-3 shrink-0" />
                  <span>{isAr ? 'التقرير' : 'News Wire'}</span>
                </Link>

                <a
                  href={DISCOUNTED_ITEMS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-gradient-to-r from-gold via-amber-300 to-[#AA8C2C] text-black font-extrabold text-[11px] sm:text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-all"
                >
                  <Crown className="w-3 h-3 text-black shrink-0" />
                  <span>{isAr ? 'تسوق القطع المخفضة' : 'Shop Discounted Items'}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. BOTTOM CAROUSEL TABS & CONTROLS (Cleanly separated below the banner)
      ========================================================================== */}
      <div className="relative z-20 w-full border-t border-gold/20 bg-[#0B0E17]/98 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">

          {/* Interactive Campaign Slide Tabs */}
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

          {/* Arrows & Counter */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-neutral-400 hidden sm:inline">
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
