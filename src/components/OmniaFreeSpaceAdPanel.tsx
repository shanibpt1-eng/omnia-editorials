'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  ExternalLink,
  Crown,
  Sparkles,
  Copy,
  Check,
  ShieldCheck,
  Truck,
  Film,
} from 'lucide-react';
import { useLuxury } from './ThemeProvider';

interface VideoAdSpec {
  id: string;
  src: string;
  badgeEn: string;
  badgeAr: string;
  titleEn: string;
  titleAr: string;
  ctaEn: string;
  ctaAr: string;
  url: string;
  trustEn: string;
  trustAr: string;
}

const VIDEO_ADS: VideoAdSpec[] = [
  {
    id: 'brooch-edition-1',
    src: '/videos/brooch-collection-1080p.mp4',
    badgeEn: 'EDITION I • 1080P COMMERCIAL',
    badgeAr: 'الإصدار الأول • عرض 1080P',
    titleEn: 'Omnia Signature Brooch Collection I',
    titleAr: 'تشكيلة البروشات الملكية — الإصدار الأول',
    ctaEn: 'Shop Brooches I',
    ctaAr: 'تسوق البروشات ١',
    url: 'https://omniastores.com/collections/brooches',
    trustEn: 'DCL 925 Assay Certified',
    trustAr: 'فضة 925 معتمدة من DCL',
  },
  {
    id: 'brooch-edition-2',
    src: '/videos/brooch-collection-2-1080p.mp4',
    badgeEn: 'EDITION II • 1080P SHOWCASE',
    badgeAr: 'الإصدار الثاني • عرض 1080P',
    titleEn: 'Omnia Haute Couture Brooch Collection II',
    titleAr: 'تشكيلة البروشات الراقية — الإصدار الثاني',
    ctaEn: 'Shop Brooches II',
    ctaAr: 'تسوق البروشات ٢',
    url: 'https://omniastores.com/collections/brooches',
    trustEn: '24h Express UAE & GCC Delivery',
    trustAr: 'توصيل 24 ساعة في الإمارات والخليج',
  },
];

const AD_SLOTS = [
  {
    id: 'ad-upcoming-events',
    tagEn: 'CAMPAIGN SPOTLIGHT',
    tagAr: 'حملة حصرية',
    titleEn: 'Luxury Jewellery Highlights',
    titleAr: 'أبرز تشكيلات المجوهرات الفاخرة',
    image: '/events/main-event-luxury-gala.jpg',
    url: 'https://omniastores.com/collections/necklaces',
  },
  {
    id: 'ad-national-day',
    tagEn: 'UAE NATIONAL DAY',
    tagAr: 'اليوم الوطني',
    titleEn: 'Spirit of the Emirates Pearls',
    titleAr: 'لؤلؤ روح الاتحاد والزمرد',
    image: '/events/uae-national-day-celebrate-in-style.jpg',
    url: 'https://omniastores.com/collections/chokers-collection',
  },
  {
    id: 'ad-new-year',
    tagEn: 'NEW YEAR 2027',
    tagAr: 'رأس السنة 2027',
    titleEn: 'Timeless Bridal Elegance',
    titleAr: 'أناقة الأعراس الخالدة',
    image: '/events/new-year-sale-2027-event.jpg',
    url: 'https://omniastores.com/collections/bridal-collection',
  },
];

const FEATURE_AD_SLOTS = [
  {
    id: 'ad-black-friday',
    tagEn: 'SEASONAL GALA OFFERS',
    tagAr: 'عروض الموسم الفاخرة',
    titleEn: 'Black Friday & White Friday Exclusives',
    titleAr: 'عروض البلاك فرايدي والجمعة البيضاء الحصرية',
    subEn: 'Pink sapphire halos & solid 925 solitaires with Tabby 4x split payments',
    subAr: 'سوليتير الياقوت الوردي والفضة 925 مع تقسيط تابي على 4 دفعات',
    image: '/events/white-friday-sale-gcc-marquise-suite.jpg',
    url: 'https://omniastores.com/collections/discounted-items',
  },
  {
    id: 'ad-ramadan',
    tagEn: 'HERITAGE & GIFTING',
    tagAr: 'تراث وهدايا فاخرة',
    titleEn: 'Ramadan Grace, Light & Butterfly Suites',
    titleAr: 'أناقة رمضان وإشراقة قلادات الفراشة الملكية',
    subEn: 'Canary pavé butterfly pendants crafted for Majlis & evening soirées',
    subAr: 'قلادات الفراشة الكناري المصاغة لأمسيات رمضان والسهرات الراقية',
    image: '/events/ramadan-sale-festive-event.jpg',
    url: 'https://omniastores.com/collections/necklaces',
  },
];

function CinemaAdCard({ ad, isAr }: { ad: VideoAdSpec; isAr: boolean }) {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <div className="flex flex-col justify-between rounded-2xl overflow-hidden bg-black border border-gold/35 hover:border-gold shadow-xl transition-all group">
      <div className="relative w-full aspect-video bg-black overflow-hidden">
        <video
          ref={videoRef}
          src={ad.src}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/30 pointer-events-none" />

        {/* Top Left Live Film Badge */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 border border-gold/40 text-gold text-[10px] font-mono font-bold backdrop-blur-md">
          <Film className="w-3 h-3 text-gold" />
          <span>1080P HD</span>
        </div>

        {/* Top Right Controls */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
            className="p-1.5 sm:p-2 rounded-full bg-black/80 hover:bg-gold hover:text-black text-gold border border-gold/40 backdrop-blur-md transition-all cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute Video' : 'Mute Video'}
            className="px-2.5 py-1 sm:py-1.5 rounded-full bg-black/80 hover:bg-gold hover:text-black text-gold border border-gold/40 text-[10px] font-mono font-bold backdrop-blur-md flex items-center gap-1 transition-all cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{isMuted ? (isAr ? 'الصوت' : 'Sound') : (isAr ? 'مفعل' : 'On')}</span>
          </button>
        </div>

        {/* Bottom Overlay Title + CTA */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-end justify-between gap-2 z-20">
          <div className="min-w-0">
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-gold font-bold block">
              {isAr ? ad.badgeAr : ad.badgeEn}
            </span>
            <h3 className="text-sm sm:text-lg font-serif font-black text-white truncate">
              {isAr ? ad.titleAr : ad.titleEn}
            </h3>
          </div>
          <a
            href={ad.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gradient-to-r from-gold via-amber-300 to-[#AA8C2C] text-black font-extrabold text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg hover:scale-105 transition-transform shrink-0"
          >
            <span>{isAr ? ad.ctaAr : ad.ctaEn}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Card Trust Strip */}
      <div className="px-3.5 py-2 bg-[#090C13] border-t border-gold/20 flex items-center justify-between gap-2 text-[10px] sm:text-[11px] text-neutral-300 font-mono">
        <span className="flex items-center gap-1.5">
          {ad.id === 'brooch-edition-1' ? (
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          ) : (
            <Truck className="w-3.5 h-3.5 text-gold shrink-0" />
          )}
          <span className="truncate">{isAr ? ad.trustAr : ad.trustEn}</span>
        </span>
        <a
          href={ad.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold hover:underline font-bold shrink-0"
        >
          omniastores.com ↗
        </a>
      </div>
    </div>
  );
}

export function OmniaFreeSpaceAdPanel() {
  const { language } = useLuxury();
  const isAr = language === 'ar';
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('OMNIA-VIP15');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      aria-label="Omnia Stores Official Advertisement Showcase"
      className="my-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="rounded-3xl bg-gradient-to-br from-[#0A0D14] via-[#121726] to-[#080A10] border border-gold/40 shadow-[0_20px_60px_rgba(0,0,0,0.45)] overflow-hidden">
        {/* Top Ribbon */}
        <div className="px-4 sm:px-6 py-3 bg-black/65 border-b border-gold/25 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 rounded-full bg-gold text-black text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow">
              <Crown className="w-3 h-3" />
              <span>{isAr ? 'إعلان رسمي • أمنية ستورز' : 'OFFICIAL ADVERTISEMENT • OMNIA STORES'}</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-amber-200/90">
              <Sparkles className="w-3 h-3 text-gold" />
              <span>{isAr ? 'مجموعات البروشات والمجوهرات 2026–2027' : 'Dual 1080P Brooch & Haute Joaillerie Showcase'}</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyCode}
              className="px-3 py-1 rounded-full bg-gold/15 hover:bg-gold/25 border border-gold/40 text-gold text-[10px] font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied: OMNIA-VIP15') : 'CODE: OMNIA-VIP15 (15% OFF)'}</span>
            </button>
            <a
              href="https://omniastores.com/collections/brooches"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1 rounded-full bg-gradient-to-r from-gold via-amber-300 to-[#AA8C2C] text-black text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 hover:scale-105 transition-transform"
            >
              <span>{isAr ? 'تسوق الآن' : 'Shop Now'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Main Responsive Bento Showcase */}
        <div className="p-4 sm:p-6 space-y-5">
          {/* Row 1: Dual 1080P Cinema Video Ads (Side-by-side on desktop/laptop, stacked on mobile) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
            {VIDEO_ADS.map((ad) => (
              <CinemaAdCard key={ad.id} ad={ad} isAr={isAr} />
            ))}
          </div>

          {/* Row 2: 3 Equal-Width Campaign Banner Cards (Responsive 1-col mobile, 3-col tablet/desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {AD_SLOTS.map((slot) => (
              <a
                key={slot.id}
                href={slot.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-2xl overflow-hidden border border-gold/30 hover:border-gold bg-black aspect-[16/9] flex items-end shadow-lg transition-all"
              >
                <Image
                  src={slot.image}
                  alt={isAr ? slot.titleAr : slot.titleEn}
                  fill
                  unoptimized
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="relative z-10 p-3.5 w-full flex items-end justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-gold font-bold block">
                      {isAr ? slot.tagAr : slot.tagEn}
                    </span>
                    <span className="text-xs sm:text-sm font-serif font-bold text-white truncate block">
                      {isAr ? slot.titleAr : slot.titleEn}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-gold text-black text-[10px] font-extrabold uppercase shrink-0 flex items-center gap-1 group-hover:scale-105 transition-transform">
                    <span>{isAr ? 'تسوق' : 'Shop'}</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Row 3: 2 Wide Feature Campaign Ad Panels (Black Friday & Ramadan Suites) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {FEATURE_AD_SLOTS.map((slot) => (
              <a
                key={slot.id}
                href={slot.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-2xl overflow-hidden border border-gold/35 hover:border-gold bg-black aspect-[16/9] flex items-end shadow-lg transition-all"
              >
                <Image
                  src={slot.image}
                  alt={isAr ? slot.titleAr : slot.titleEn}
                  fill
                  unoptimized
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                <div className="relative z-10 p-4 w-full flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-gold font-bold block">
                      {isAr ? slot.tagAr : slot.tagEn}
                    </span>
                    <span className="text-sm sm:text-base font-serif font-black text-white block leading-snug">
                      {isAr ? slot.titleAr : slot.titleEn}
                    </span>
                    <span className="text-[11px] text-neutral-300 block truncate mt-0.5">
                      {isAr ? slot.subAr : slot.subEn}
                    </span>
                  </div>
                  <span className="px-3 py-1.5 rounded-xl bg-gold text-black text-[11px] font-extrabold uppercase shrink-0 flex items-center gap-1 group-hover:scale-105 transition-transform">
                    <span>{isAr ? 'استكشف' : 'Explore'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
