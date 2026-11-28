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
} from 'lucide-react';
import { useLuxury } from './ThemeProvider';

const AD_SLOTS = [
  {
    id: 'ad-upcoming-events',
    tagEn: 'CAMPAIGN SPOTLIGHT',
    tagAr: 'حملة حصرية',
    titleEn: 'Luxury Jewellery Highlights',
    titleAr: 'أبرز تشكيلات المجوهرات الفاخرة',
    image: '/banners/upcoming-events-luxury-highlights-banner.jpg',
    url: 'https://omniastores.com/collections/necklaces',
  },
  {
    id: 'ad-national-day',
    tagEn: 'UAE NATIONAL DAY',
    tagAr: 'اليوم الوطني',
    titleEn: 'Spirit of the Emirates Pearls',
    titleAr: 'لؤلؤ روح الاتحاد والزمرد',
    image: '/banners/national-day-spirit-of-emirates-banner.jpg',
    url: 'https://omniastores.com/collections/chokers-collection',
  },
  {
    id: 'ad-new-year',
    tagEn: 'NEW YEAR 2027',
    tagAr: 'رأس السنة 2027',
    titleEn: 'Timeless Bridal Elegance',
    titleAr: 'أناقة الأعراس الخالدة',
    image: '/banners/new-year-timeless-elegance-banner.jpg',
    url: 'https://omniastores.com/collections/bridal-collection',
  },
];

export function OmniaFreeSpaceAdPanel() {
  const { language } = useLuxury();
  const isAr = language === 'ar';
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [copied, setCopied] = useState(false);
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
      <div className="rounded-3xl bg-gradient-to-br from-[#0A0D14] via-[#121726] to-[#080A10] border border-gold/35 shadow-[0_20px_60px_rgba(0,0,0,0.45)] overflow-hidden">
        {/* Top Ribbon */}
        <div className="px-4 sm:px-6 py-3 bg-black/60 border-b border-gold/25 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-full bg-gold text-black text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1">
              <Crown className="w-3 h-3" />
              <span>{isAr ? 'إعلان رسمي • أمنية ستورز' : 'OFFICIAL ADVERTISEMENT • OMNIA STORES'}</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-amber-200/90">
              <Sparkles className="w-3 h-3 text-gold" />
              <span>{isAr ? 'تشكيلة البروشات والمجوهرات 2026–2027' : 'Brooch & Haute Joaillerie Collection 2026–2027'}</span>
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

        {/* Main Responsive Grid: Video Ad (7 cols) + 3 Campaign Banner Slots (5 cols) */}
        <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left: 1080P Brooch Collection Commercial Video */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl overflow-hidden bg-black border border-gold/30 relative group">
            <div className="relative w-full aspect-video bg-black overflow-hidden">
              <video
                ref={videoRef}
                src="/videos/brooch-collection-1080p.mp4"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 pointer-events-none" />

              {/* Video Controls */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
                  className="p-2 rounded-full bg-black/80 hover:bg-gold hover:text-black text-gold border border-gold/40 backdrop-blur-md transition-all cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute Video' : 'Mute Video'}
                  className="px-2.5 py-1.5 rounded-full bg-black/80 hover:bg-gold hover:text-black text-gold border border-gold/40 text-[10px] font-mono font-bold backdrop-blur-md flex items-center gap-1 transition-all cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
                  <span>{isMuted ? (isAr ? 'الصوت' : 'Sound') : (isAr ? 'مفعل' : 'On')}</span>
                </button>
              </div>

              {/* Bottom Overlay Title */}
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-end justify-between gap-3 z-20">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-gold font-bold block">
                    {isAr ? 'عرض 1080P الرسمي • بروشات الفضة 925' : '1080P COMMERCIAL • 925 BROOCH COLLECTION'}
                  </span>
                  <h3 className="text-base sm:text-xl font-serif font-black text-white">
                    {isAr ? 'تشكيلة البروشات الملكية من أمنية ستورز' : 'Omnia Stores Signature Brooch Collection'}
                  </h3>
                </div>
                <a
                  href="https://omniastores.com/collections/brooches"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-gold hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition-all"
                >
                  <span>{isAr ? 'تصفح البروشات' : 'Explore Brooches'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Trust Footer Bar inside Video Card */}
            <div className="px-4 py-2.5 bg-[#090C13] border-t border-gold/20 flex flex-wrap items-center justify-between gap-2 text-[11px] text-neutral-300 font-mono">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isAr ? 'فضة 925 معتمدة من DCL' : 'DCL 925 Assay Certified'}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-gold" />
                <span>{isAr ? 'توصيل 24 ساعة في الإمارات والخليج' : '24h Express UAE & GCC Delivery'}</span>
              </span>
            </div>
          </div>

          {/* Right: 3 Stacked Responsive Campaign Ad Panels */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3.5">
            {AD_SLOTS.map((slot) => (
              <a
                key={slot.id}
                href={slot.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-2xl overflow-hidden border border-gold/30 hover:border-gold bg-black aspect-[16/9] lg:aspect-[21/9] flex items-end shadow-lg transition-all"
              >
                <Image
                  src={slot.image}
                  alt={isAr ? slot.titleAr : slot.titleEn}
                  fill
                  unoptimized
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="relative z-10 p-3 w-full flex items-end justify-between gap-2">
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
        </div>
      </div>
    </section>
  );
}
