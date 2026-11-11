'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  X, 
  Minus, 
  Maximize2, 
  ShoppingBag, 
  ArrowUpRight, 
  Sparkles,
  Film
} from 'lucide-react';
import { useLuxury } from './ThemeProvider';

const SIDE_VIDEOS = [
  {
    id: 'sale-reveal',
    title: '11:11 Sale Reveal',
    src: '/advertising/11-11-sale-reveal.mp4',
  },
  {
    id: 'marketing-campaign',
    title: '11:11 Gala Campaign',
    src: '/advertising/11-11-marketing-campaign.mp4',
  },
  {
    id: 'marketing-white',
    title: '11:11 White 4K Edit',
    src: '/advertising/11-11-marketing-white.mp4',
  },
];

export function OmniaSideVideoAd() {
  const { language } = useLuxury();
  const isAr = language === 'ar';

  const [currentVideoIdx, setCurrentVideoIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const activeVideo = SIDE_VIDEOS[currentVideoIdx];

  // Auto-play safely
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
        setIsPlaying(false);
      });
    }
  }, [currentVideoIdx]);

  if (!isVisible) return null;

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const nextVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentVideoIdx((prev) => (prev + 1) % SIDE_VIDEOS.length);
  };

  // Minimized Floating Orb
  if (isMinimized) {
    return (
      <div 
        className={`fixed z-40 bottom-20 sm:bottom-6 ${isAr ? 'left-4 sm:left-6' : 'right-4 sm:right-6'} transition-all duration-300 animate-bounce-subtle`}
      >
        <button
          onClick={() => setIsMinimized(false)}
          className="relative group p-3 rounded-full bg-gradient-to-r from-[#DFB743] via-[#FCEAA5] to-[#C99E32] text-black shadow-[0_4px_25px_rgba(212,175,55,0.6)] border border-black/20 flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-transform"
          aria-label="Expand video player"
          title="Watch 11:11 Video"
        >
          <Film className="w-5 h-5 text-black animate-pulse" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
          </span>
        </button>
      </div>
    );
  }

  return (
    <aside
      aria-label="Omnia Stores Side Video Ad"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed z-40 bottom-16 sm:bottom-6 ${
        isAr ? 'left-3 sm:left-6' : 'right-3 sm:right-6'
      } w-52 sm:w-72 md:w-80 rounded-2xl overflow-hidden bg-black/95 border-2 border-gold/60 shadow-[0_8px_35px_rgba(0,0,0,0.85),0_0_20px_rgba(212,175,55,0.35)] backdrop-blur-md transition-all duration-300 select-none`}
    >
      {/* 1. Sleek Top Bar (Floating inside video or just above) */}
      <div className="absolute top-2 left-2 right-2 z-20 flex items-center justify-between gap-1 pointer-events-none">
        {/* Live Indicator Pill */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-gold/40 text-[9px] font-mono font-bold text-[#E5C365]">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
          <span>11:11 LIVE</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 pointer-events-auto">
          {/* Audio Toggle */}
          <button
            onClick={toggleMute}
            className="p-1 rounded-full bg-black/75 hover:bg-gold hover:text-black text-white border border-white/20 transition-colors cursor-pointer"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3 text-gold" />}
          </button>

          {/* Minimize Button */}
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 rounded-full bg-black/75 hover:bg-white/20 text-white border border-white/20 transition-colors cursor-pointer"
            aria-label="Minimize"
            title="Minimize"
          >
            <Minus className="w-3 h-3" />
          </button>

          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 rounded-full bg-black/75 hover:bg-red-600 text-white border border-white/20 transition-colors cursor-pointer"
            aria-label="Close"
            title="Close"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 2. Video Player Element (Clean, pure video playing) */}
      <div className="relative w-full aspect-video bg-black overflow-hidden group cursor-pointer">
        <a
          href="https://omniastores.com/collections/discounted-items"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full"
          title="Visit omniastores.com 11:11 Special Collection"
        >
          <video
            ref={videoRef}
            key={activeVideo.src}
            src={activeVideo.src}
            playsInline
            autoPlay
            muted={isMuted}
            loop
            preload="metadata"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </a>

        {/* Subtle gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none" />

        {/* Play/Pause Center Overlay on Hover */}
        {isHovered && (
          <button
            onClick={togglePlay}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 text-gold border border-gold/40 hover:scale-110 active:scale-95 transition-all pointer-events-auto"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
        )}
      </div>

      {/* 3. Direct Link Button to omniastores.com (Sleek, responsive bottom bar) */}
      <div className="p-2 sm:p-2.5 bg-[#090C13] border-t border-gold/30 flex items-center justify-between gap-2">
        <a
          href="https://omniastores.com/collections/discounted-items"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-between px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#DFB743] via-[#FCEAA5] to-[#C99E32] text-black font-serif font-black text-[10px] sm:text-xs uppercase tracking-wider hover:opacity-95 hover:scale-[1.02] active:scale-95 transition-all shadow-md group/cta"
        >
          <div className="flex items-center gap-1.5 truncate">
            <ShoppingBag className="w-3.5 h-3.5 text-black shrink-0 group-hover/cta:rotate-12 transition-transform" />
            <span className="truncate">{isAr ? 'تسوق على omniastores.com' : 'omniastores.com (85% Off)'}</span>
          </div>
          <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
        </a>

        {/* Next Video Clip Mini Switcher */}
        <button
          onClick={nextVideo}
          className="p-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-gold border border-gold/30 text-[9px] font-mono font-bold shrink-0 transition-colors"
          title="Next video"
          aria-label="Next video"
        >
          {currentVideoIdx + 1}/{SIDE_VIDEOS.length}
        </button>
      </div>
    </aside>
  );
}
