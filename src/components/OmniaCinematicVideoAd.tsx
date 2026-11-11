'use client';

import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  ShoppingBag, 
  ArrowUpRight, 
  Copy, 
  Check, 
  Flame, 
  Clock, 
  ShieldCheck, 
  Truck,
  Film,
  Zap
} from 'lucide-react';
import { useLuxury } from './ThemeProvider';

interface VideoAdOption {
  id: string;
  titleEn: string;
  titleAr: string;
  quality: string;
  src: string;
  badgeEn: string;
  badgeAr: string;
}

const VIDEO_OPTIONS: VideoAdOption[] = [
  {
    id: 'sale-reveal',
    titleEn: '11:11 Official Sale Reveal',
    titleAr: 'الإعلان الرسمي لتخفيضات 11:11',
    quality: '1080P HD',
    src: '/advertising/11-11-sale-reveal.mp4',
    badgeEn: 'SALE REVEAL',
    badgeAr: 'إعلان الخصومات',
  },
  {
    id: 'marketing-campaign',
    titleEn: '11:11 Luxury Campaign Gala',
    titleAr: 'حملة غالا التخفيضات العالمية 11:11',
    quality: '1080P HD',
    src: '/advertising/11-11-marketing-campaign.mp4',
    badgeEn: 'RUNWAY EDIT',
    badgeAr: 'طبعة المنصة',
  },
  {
    id: 'marketing-white',
    titleEn: '11:11 White Edition Showcase',
    titleAr: 'الطبعة البيضاء الفاخرة بدقة 4K',
    quality: '4K ULTRA',
    src: '/advertising/11-11-marketing-white.mp4',
    badgeEn: '4K CINEMATIC',
    badgeAr: 'سينمائي 4K',
  },
];

export function OmniaCinematicVideoAd() {
  const { language } = useLuxury();
  const isAr = language === 'ar';

  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const activeVideo = VIDEO_OPTIONS[activeVideoIndex];

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const switchVideo = (index: number) => {
    setActiveVideoIndex(index);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const copyVipCode = () => {
    navigator.clipboard.writeText('OMNIA1111');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <section 
      aria-label="Omnia Stores Official 11:11 Cinematic Video Campaign Advertisement"
      className="w-full my-12 sm:my-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#080B11] via-[#0E131F] to-[#080B11] border-2 border-gold/40 shadow-[0_12px_45px_rgba(212,175,55,0.2)] p-5 sm:p-8 lg:p-10">
        
        {/* Background Subtle Luxury Watermark */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

        {/* 1. Header Ribbon & 11:11 Live Flasher */}
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gold/25 mb-8">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
            </span>
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 text-white font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-wider shadow-sm">
              11:11 GLOBAL GALA • LIVE CINEMATIC AD
            </span>
            <span className="hidden sm:inline-block text-[11px] font-mono text-[#E5C365]">
              {isAr ? 'عروض حصرية تصل إلى 85%' : 'Exclusive Drops Up to 85% Off'}
            </span>
          </div>

          {/* Quality & Switcher Buttons */}
          <div className="flex flex-wrap items-center gap-1.5">
            {VIDEO_OPTIONS.map((opt, idx) => (
              <button
                key={opt.id}
                onClick={() => switchVideo(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeVideoIndex === idx
                    ? 'bg-gradient-to-r from-[#DFB743] via-[#FCEAA5] to-[#C99E32] text-black shadow-md scale-105'
                    : 'bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10'
                }`}
              >
                <span>{isAr ? opt.badgeAr : opt.badgeEn}</span>
                <span className="ml-1.5 text-[9px] opacity-75 font-normal">({opt.quality})</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Main Two-Column Layout: Video Player + Promotional Offer Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Responsive Video Frame (7 Cols) */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden bg-black border border-gold/30 shadow-2xl group">
            <video
              ref={videoRef}
              key={activeVideo.src}
              src={activeVideo.src}
              playsInline
              autoPlay
              muted
              loop
              preload="metadata"
              className="w-full aspect-video object-cover"
            />

            {/* Video Controls Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

            {/* Top Video Tag */}
            <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
              <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-gold/40 text-[9px] font-mono font-bold text-[#D4AF37]">
                {activeVideo.titleEn}
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-red-600 text-white font-mono text-[9px] font-extrabold animate-pulse">
                REC
              </span>
            </div>

            {/* Bottom Playback Action Controls */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-full bg-black/80 hover:bg-gold hover:text-black text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-md"
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-black/80 hover:bg-gold hover:text-black text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-md"
                  aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="text-[10px] font-mono text-neutral-300 drop-shadow">
                  {isMuted ? (isAr ? 'اضغط لتشغيل الصوت' : 'Click for Audio') : (isAr ? 'الصوت يعمل' : 'Audio Active')}
                </span>
              </div>

              <a
                href="https://omniastores.com/collections/discounted-items"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/90 hover:bg-gold text-black font-serif font-black text-[11px] uppercase tracking-wider transition-transform active:scale-95 shadow-md"
              >
                <span>{isAr ? 'عروض 11:11 الحصرية' : '11:11 Direct Deals'}</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right Column: High-Converting Commercial Box (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-[10px] font-mono font-bold text-[#E5C365] uppercase">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>{isAr ? 'أكبر تخفيضات السلة لهذا العام' : 'Year’s Biggest Cart Drops'}</span>
              </div>

              <h4 className="text-2xl sm:text-3xl font-serif font-black text-white leading-tight">
                {isAr ? (
                  <>مهرجان <span className="text-[#D4AF37]">11:11</span> وموسم الجمعة البيضاء للمجوهرات الفاخرة</>
                ) : (
                  <>Omnia Stores <span className="text-[#D4AF37]">11:11</span> Global Jewellery Gala</>
                )}
              </h4>

              <p className="text-xs sm:text-sm text-neutral-300 font-serif leading-relaxed">
                {isAr
                  ? 'اكتشف روائع الفضة الإسترلينية عيار 925 وأحجار محاكاة الألماس بخصومات حصرية تصل إلى 85%. احصل على قلائد الفراشة الأيقونية، أساور التنس، وأطقم الأعراس مع ضمان شامل ضد تغير اللون.'
                  : 'Experience pure 925 sterling silver and high-dispersion simulated diamonds with up to 85% discount. Featuring signature butterfly pendants, royal tennis bracelets, and bridal master suites with guaranteed anti-tarnish protection.'}
              </p>
            </div>

            {/* Exclusive Promo Code Voucher */}
            <div className="p-4 rounded-2xl bg-white/5 border border-gold/30 backdrop-blur-md space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400 uppercase tracking-widest text-[10px]">
                  {isAr ? 'كوبون الخصم الإضافي (15%):' : 'Exclusive VIP Voucher (+15%):'}
                </span>
                <span className="text-emerald-400 font-bold text-[10px]">VERIFIED ACTIVE</span>
              </div>
              <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-black/60 border border-gold/40">
                <span className="font-mono font-black text-base tracking-[0.2em] text-[#D4AF37]">
                  OMNIA1111
                </span>
                <button
                  onClick={copyVipCode}
                  className="px-3 py-1 rounded-lg bg-gold/20 hover:bg-gold text-gold hover:text-black font-mono text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ' : 'Copy')}</span>
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-neutral-300">
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white/[0.03] border border-white/5">
                <Truck className="w-3.5 h-3.5 text-gold shrink-0" />
                <span className="truncate">{isAr ? 'شحن سريع 24 ساعة' : '24h Express UAE Delivery'}</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-white/[0.03] border border-white/5">
                <Zap className="w-3.5 h-3.5 text-gold shrink-0" />
                <span className="truncate">{isAr ? 'تقسيط 4 دفعات تابي/تمارا' : 'Split in 4 with Tabby'}</span>
              </div>
            </div>

            {/* Big Commercial CTA linking omniastores.com */}
            <a
              href="https://omniastores.com/collections/discounted-items"
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#DFB743] via-[#FCEAA5] to-[#C99E32] text-black font-serif font-black text-sm uppercase tracking-wider shadow-[0_6px_25px_rgba(212,175,55,0.45)] hover:shadow-[0_8px_35px_rgba(212,175,55,0.7)] hover:scale-[1.02] active:scale-95 transition-all duration-300 group/cta select-none"
              title="Shop Omnia Stores 11:11 Big Sale on omniastores.com"
            >
              <ShoppingBag className="w-5 h-5 text-black group-hover/cta:rotate-12 transition-transform" />
              <span>{isAr ? 'تسوق عروض 11:11 الكبرى على omniastores.com' : 'Shop 11:11 Mega Sale on omniastores.com'}</span>
              <ArrowUpRight className={`w-5 h-5 ${isAr ? 'rotate-[-90deg]' : ''}`} />
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}
