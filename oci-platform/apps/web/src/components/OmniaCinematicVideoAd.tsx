'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  ArrowUpRight, 
  Flame, 
  Sparkles, 
  ShoppingBag,
  Film,
  Crown,
  CheckCircle2
} from 'lucide-react';
import { useLuxury } from './ThemeProvider';

interface VideoOption {
  id: string;
  badgeEn: string;
  badgeAr: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  src: string;
  quality: string;
}

const VIDEO_OPTIONS: VideoOption[] = [
  {
    id: 'sale-reveal',
    badgeEn: '11:11 Sale Reveal',
    badgeAr: 'كشف عروض 11:11',
    titleEn: '11:11 Official Sale Reveal',
    titleAr: 'الإعلان الرسمي لتخفيضات 11:11 الكبرى',
    descEn: 'The Middle East’s most anticipated demi-fine jewellery event goes live with cart drops up to 85% off.',
    descAr: 'الحدث السنوي الأكبر في الشرق الأوسط لمجوهرات الفضة 925 يبدأ بتخفيضات استثنائية تصل إلى 85%.',
    src: '/advertising/11-11-sale-reveal.mp4',
    quality: '1080P',
  },
  {
    id: 'marketing-mat',
    badgeEn: 'White 4K Gala',
    badgeAr: 'عرض 4K الأبيض الفاخر',
    titleEn: '11:11 White 4K Campaign',
    titleAr: 'حملة 11:11 البيضاء بدقة 4K',
    descEn: 'Ultra-high-definition cinematic showcase highlighting pure 925 sterling silver hallmarking and pavé settings.',
    descAr: 'عرض سينمائي فائق الدقة يبرز حرفية صياغة الفضة الإسترلينية عيار 925 وترصيع الألماس البافيه.',
    src: '/advertising/11-11-marketing-white.mp4',
    quality: '4K UHD',
  },
  {
    id: 'marketing-campaign',
    badgeEn: '11:11 Campaign Film',
    badgeAr: 'فيلم الحملة التسويقية',
    titleEn: '11:11 Mega Gala Campaign Film',
    titleAr: 'الفيلم التسويقي لحملة 11:11 الكبرى',
    descEn: 'Discover exclusive four-leaf clover necklaces, solitaire pendants, and bridal suites crafted for GCC celebrations.',
    descAr: 'استكشف أطقم زهرة البرسيم وسوليتير الألماس وأطقم الأعراس الفاخرة المصممة لمناسبات الخليج.',
    src: '/advertising/11-11-marketing-campaign.mp4',
    quality: '1080P',
  },
];

export function OmniaCinematicVideoAd() {
  const { language } = useLuxury();
  const isAr = language === 'ar';

  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeVideo = VIDEO_OPTIONS[activeVideoIndex] || VIDEO_OPTIONS[0];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
    }
  }, [activeVideoIndex]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextState = !isMuted;
    videoRef.current.muted = nextState;
    setIsMuted(nextState);
  };

  const switchVideo = (index: number) => {
    setActiveVideoIndex(index);
  };

  return (
    <section 
      aria-label="Omnia Stores Official 11:11 Cinematic Video Campaign Advertisement"
      className="w-full my-10 sm:my-16 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#080B11] via-[#0E131F] to-[#080B11] border-2 border-gold/40 shadow-[0_12px_45px_rgba(212,175,55,0.2)] p-4 sm:p-8 lg:p-10 w-full max-w-full">
        
        {/* Background Subtle Luxury Watermark */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

        {/* 1. Header Ribbon & 11:11 Live Flasher */}
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gold/25 mb-6 sm:mb-8">
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
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto max-w-full">
            {VIDEO_OPTIONS.map((opt, idx) => (
              <button
                key={opt.id}
                onClick={() => switchVideo(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          
          {/* Left Column: Responsive Video Frame (7 Cols) */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden bg-black border border-gold/30 shadow-2xl group w-full max-w-full">
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
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/90 hover:bg-gold text-black font-serif font-black text-[11px] uppercase tracking-wider transition-transform active:scale-95 shadow-md"
              >
                <span>{isAr ? 'عروض 11:11 الحصرية' : '11:11 DIRECT DEALS'}</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right Column: High-Converting Commercial Box (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-5 sm:space-y-6">
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
                {isAr ? activeVideo.descAr : activeVideo.descEn}
              </p>
            </div>

            {/* Campaign Highlights Checklist */}
            <div className="space-y-2 py-3 border-y border-gold/20 text-xs text-neutral-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isAr ? 'خصومات تصل إلى 85% مع كود OMNIA1111' : 'Cart Drops Up to 85% Off with Code OMNIA1111'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isAr ? 'فضة عيار 925 معتمدة ومختومة من مختبر دبي المركزي' : 'Dubai Central Laboratory 925 Hallmark Verified'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isAr ? 'شحن فوري وسريع لجميع مدن الإمارات والسعودية' : '24-Hour Express Dispatch to Dubai, Riyadh & GCC'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <a
                href="https://omniastores.com/collections/discounted-items"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#DFB743] via-[#FCEAA5] to-[#C99E32] text-black font-serif font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_4px_25px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_35px_rgba(212,175,55,0.6)] hover:scale-[1.02] active:scale-95 transition-all duration-300"
              >
                <ShoppingBag className="w-4 h-4 text-black shrink-0" />
                <span>{isAr ? 'تسوق تخفيضات 11:11 على المتجر' : 'Shop 11:11 on omniastores.com'}</span>
                <ArrowUpRight className={`w-4 h-4 ${isAr ? 'rotate-[-90deg]' : ''} shrink-0`} />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
