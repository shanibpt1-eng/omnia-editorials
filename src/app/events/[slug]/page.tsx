'use client';

import React, { use, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Sparkles, 
  Crown, 
  Clock, 
  ShoppingBag, 
  ShieldCheck, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Volume2,
  VolumeX,
  ArrowRight,
  ArrowLeft,
  Share2,
  Check,
  Tag,
  Percent,
  Truck,
  CreditCard,
  Award,
  BookOpen,
  CheckCircle2,
  ArrowUpRight,
  Play,
  Pause,
  Film
} from 'lucide-react';
import { useLuxury } from '../../../components/ThemeProvider';
import { SeoHead } from '../../../components/SeoHead';
import { EVENT_BLOGS_DATA, getEventBlogBySlug, EventBlogDetail } from '../../../data/event-blogs';

export default function EventBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { language, currency, setCurrency, theme, setTheme } = useLuxury();
  const isAr = language === 'ar';

  const eventBlog = getEventBlogBySlug(resolvedParams.slug);

  // Reading utility state
  const [fontSize, setFontSize] = useState<'normal' | 'medium' | 'large'>('normal');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Video playback state
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const [isMutedVideo, setIsMutedVideo] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlayVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlayingVideo(true);
    } else {
      videoRef.current.pause();
      setIsPlayingVideo(false);
    }
  };

  const toggleMuteVideo = () => {
    if (!videoRef.current) return;
    const nextState = !isMutedVideo;
    videoRef.current.muted = nextState;
    setIsMutedVideo(nextState);
  };

  // Audio speech synthesis simulation
  useEffect(() => {
    if (!isPlayingAudio) {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window && eventBlog) {
      const textToRead = isAr ? `${eventBlog.titleAr}. ${eventBlog.standfirstAr}` : `${eventBlog.titleEn}. ${eventBlog.standfirstEn}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = isAr ? 'ar-SA' : 'en-US';
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  }, [isPlayingAudio, eventBlog, isAr]);

  const handleCopyShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  if (!eventBlog) {
    return (
      <div className={`min-h-[70vh] flex flex-col items-center justify-center py-24 px-4 text-center ${isAr ? 'font-arabic' : ''}`}>
        <Sparkles className="w-10 h-10 text-gold mb-4 animate-spin" />
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-900 dark:text-white mb-3">
          {isAr ? 'عذراً، لم يتم العثور على تقرير الفعالية' : 'Event Editorial Not Found'}
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6 max-w-md">
          {isAr ? 'قد يكون الرابط قد تم تحديثه أو نقله إلى أرشيف الفعاليات الرسمية.' : 'The requested event campaign may have been updated or moved to the official archive.'}
        </p>
        <Link 
          href="/editorials" 
          className="px-6 py-3 rounded-full bg-gold text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md"
        >
          {isAr ? 'العودة إلى قسم المقالات والفعاليات' : 'Return to Editorials & Events'}
        </Link>
      </div>
    );
  }

  const title = isAr ? eventBlog.titleAr : eventBlog.titleEn;
  const eyebrow = isAr ? eventBlog.eyebrowAr : eventBlog.eyebrowEn;
  const standfirst = isAr ? eventBlog.standfirstAr : eventBlog.standfirstEn;
  const author = isAr ? eventBlog.authorAr : eventBlog.authorEn;
  const date = isAr ? eventBlog.dateAr : eventBlog.dateEn;
  const readTime = isAr ? eventBlog.readTimeAr : eventBlog.readTimeEn;
  const promoTag = isAr ? eventBlog.promoTagAr : eventBlog.promoTagEn;
  const leadQuote = isAr ? eventBlog.leadQuoteAr : eventBlog.leadQuoteEn;

  // Font size scale class
  const bodyTextClass = 
    fontSize === 'large' 
      ? 'text-lg sm:text-xl leading-relaxed' 
      : fontSize === 'medium' 
      ? 'text-base sm:text-lg leading-relaxed' 
      : 'text-sm sm:text-base leading-relaxed';

  // Other related events
  const relatedEvents = EVENT_BLOGS_DATA.filter(e => e.slug !== eventBlog.slug).slice(0, 3);

  // Schema.org Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: eventBlog.titleEn,
    description: eventBlog.standfirstEn,
    image: [`https://thevoguenews.com${eventBlog.coverImage}`],
    datePublished: '2026-11-12T08:00:00+04:00',
    dateModified: '2026-11-13T12:00:00+04:00',
    author: {
      '@type': 'Organization',
      name: 'Omnia Stores Editorial Studio',
      url: 'https://omniastores.com'
    },
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: 'The Vogue News',
      url: 'https://thevoguenews.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://thevoguenews.com/favicon-512.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://thevoguenews.com/events/${eventBlog.slug}`
    }
  };

  return (
    <>
      <SeoHead
        title={`${title} • Omnia Stores Editorial Bureau`}
        description={standfirst.slice(0, 160)}
        ogImage={`https://thevoguenews.com${eventBlog.coverImage}`}
        pageType="article"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className={`min-h-screen bg-[#FAF7F0] dark:bg-[#070A10] text-neutral-900 dark:text-neutral-100 font-sans selection:bg-gold selection:text-black ${isAr ? 'rtl font-arabic' : 'ltr'}`}>
        
        {/* =========================================================================
            1. TOP ANNOUNCEMENT TICKER (Matching user reference layout exactly)
        ========================================================================== */}
        <div className="bg-[#111622] text-[#F3E5AB] border-b border-gold/30 text-[11px] font-mono py-2 px-3 overflow-hidden shadow-sm">
          <div className="max-w-[1780px] mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar whitespace-nowrap">
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold shrink-0 animate-pulse" />
                <span className="text-neutral-300">{isAr ? 'كود الخصم الحصري:' : 'Use code'}</span>
                <span className="px-2 py-0.5 rounded bg-black/80 border border-gold/70 text-gold font-bold tracking-wider">OMNIA-VIP15</span>
                <span>{isAr ? 'لخصم 15% على' : 'for 15% Off at'}</span>
                <a href="https://omniastores.com" target="_blank" rel="noopener noreferrer" className="font-bold underline text-white hover:text-gold transition-colors">
                  omniastores.com
                </a>
              </span>
              <span className="text-gold/50">◆</span>
              <span className="text-neutral-300">
                <strong className="text-gold">GCC EDITORIAL WIRE:</strong> Vogue Arabia spotlights Omnia Stores 925 Bridal Masterpieces
              </span>
              <span className="text-gold/50">◆</span>
              <span className="text-neutral-300">
                <strong className="text-white">CURRENCY PARITY:</strong> 1 AED ≈ 1.02 SAR • Instant Regional Settlement
              </span>
              <span className="text-gold/50">◆</span>
              <span className="text-neutral-300">
                <strong className="text-emerald-400">FAST FULFILLMENT:</strong> 24H Dubai & Abu Dhabi White-Glove Courier Delivery
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-3 shrink-0 text-[10px]">
              <a href="https://omniastores.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-gold flex items-center gap-1 transition-colors">
                <span>Riyadh & Dubai Express Store</span>
                <ExternalLink className="w-3 h-3 text-gold" />
              </a>
            </div>
          </div>
        </div>

        {/* =========================================================================
            2. GLASSMORPHIC LUXURY NAVIGATION BAR (Matching reference branding)
        ========================================================================== */}
        <header className="sticky top-0 z-40 bg-[#FAF7F0]/95 dark:bg-[#070A10]/95 backdrop-blur-xl border-b border-neutral-200 dark:border-gold/25 transition-colors">
          <div className="max-w-[1780px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
            
            {/* Official THE VOGUE NEWS Wordmark Logo */}
            <div className="flex items-center shrink-0">
              <Link href="/" className="flex items-center group py-1 shrink-0" aria-label="The Vogue News Home">
                <Image
                  src="/the-vogue-news-white.png"
                  alt="THE VOGUE NEWS"
                  width={210}
                  height={32}
                  className="h-5 sm:h-7 md:h-8 w-auto object-contain hidden dark:block transition-all duration-300 group-hover:opacity-90 group-hover:drop-shadow-[0_0_12px_rgba(212,175,55,0.4)]"
                  priority
                />
                <Image
                  src="/the-vogue-news-black.png"
                  alt="THE VOGUE NEWS"
                  width={210}
                  height={32}
                  className="h-5 sm:h-7 md:h-8 w-auto object-contain block dark:hidden transition-all duration-300 group-hover:opacity-80"
                  priority
                />
              </Link>
            </div>

            {/* Navigation Links */}
            <nav className="hidden xl:flex items-center gap-6 text-xs font-serif font-semibold tracking-wide uppercase text-neutral-700 dark:text-neutral-300">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <Link href="/trending" className="hover:text-gold transition-colors">Top Trending</Link>
              <Link href="/editorials" className="text-[#B8860B] dark:text-gold font-bold">Editorials</Link>
              <Link href="/products" className="hover:text-gold transition-colors">Products</Link>
              <Link href="/about" className="hover:text-gold transition-colors">About Omnia</Link>
              <span className="text-neutral-300 dark:text-neutral-700">|</span>
              <a href="https://omniastores.com/collections/luxury-sets" target="_blank" rel="noopener noreferrer" className="text-[#8B6508] dark:text-gold hover:underline">
                Bridal 925
              </a>
              <a href="https://omniastores.com/collections/silver-sets" target="_blank" rel="noopener noreferrer" className="text-[#8B6508] dark:text-gold hover:underline">
                Silver Sets
              </a>
              <a href="https://omniastores.com/collections/pearl-sets" target="_blank" rel="noopener noreferrer" className="text-[#8B6508] dark:text-gold hover:underline">
                Pearls
              </a>
              <a href="https://omniastores.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold text-[10px] font-mono font-bold">
                <span>KSA STORE</span>
                <span className="px-1 py-0.2 rounded bg-black/60 text-[8px] text-white">SA</span>
              </a>
            </nav>

            {/* Header Tools */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Currency Switcher */}
              <div className="flex items-center rounded-full p-0.5 bg-neutral-200/80 dark:bg-white/10 border border-neutral-300 dark:border-white/10 text-[10px] font-mono">
                <button
                  type="button"
                  onClick={() => setCurrency('AED')}
                  className={`px-2 py-0.5 rounded-full font-bold transition-all ${
                    currency === 'AED'
                      ? 'bg-neutral-900 text-white dark:bg-gold dark:text-black shadow'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  AED
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('SAR')}
                  className={`px-2 py-0.5 rounded-full font-bold transition-all ${
                    currency === 'SAR'
                      ? 'bg-neutral-900 text-white dark:bg-gold dark:text-black shadow'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  SAR
                </button>
              </div>

              {/* Theme Toggle */}
              <button
                type="button"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-neutral-200 dark:bg-white/10 text-neutral-700 dark:text-gold hover:brightness-110 transition-all text-xs"
                title="Toggle Theme"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>

              {/* Direct Shop Store Button */}
              <a
                href="https://omniastores.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#AA8C2C] text-black font-serif font-bold text-xs flex items-center gap-1.5 shadow-md hover:brightness-110 transition-all shrink-0"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{isAr ? 'تسوق المتجر ↗' : 'Shop Store'}</span>
              </a>
            </div>
          </div>
        </header>

        {/* =========================================================================
            3. VERIFIED GCC EDITORIAL WIRE SUBNAV (Matching screenshot ticker)
        ========================================================================== */}
        <div className="bg-white/80 dark:bg-[#0A0E17]/80 border-b border-neutral-200 dark:border-white/5 py-2.5 px-4 text-xs font-serif">
          <div className="max-w-[1780px] mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[#00A86B] dark:text-emerald-400 font-mono font-bold text-[10px] uppercase tracking-wider shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>{isAr ? 'شريط التحرير المعتمد لدول الخليج' : 'VERIFIED GCC EDITORIAL WIRE'}</span>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 text-neutral-600 dark:text-neutral-400 text-xs overflow-x-auto no-scrollbar whitespace-nowrap">
              <a href="https://omniastores.com/collections/luxury-sets" target="_blank" rel="noopener noreferrer" className="hover:text-gold flex items-center gap-1 transition-colors">
                <span>Bridal Masterpieces</span>
                <span className="text-[10px]">↗</span>
              </a>
              <span className="text-neutral-300 dark:text-neutral-700">•</span>
              <a href="https://omniastores.com/collections/silver-sets" target="_blank" rel="noopener noreferrer" className="hover:text-gold flex items-center gap-1 transition-colors">
                <span>Certified 925 Silver</span>
                <span className="text-[10px]">↗</span>
              </a>
              <span className="text-neutral-300 dark:text-neutral-700">•</span>
              <a href="https://omniastores.com/collections/pearl-sets" target="_blank" rel="noopener noreferrer" className="hover:text-gold flex items-center gap-1 transition-colors">
                <span>Freshwater Pearls</span>
                <span className="text-[10px]">↗</span>
              </a>
              <span className="text-neutral-300 dark:text-neutral-700">•</span>
              <a href="https://omniastores.com/collections/chokers-collection" target="_blank" rel="noopener noreferrer" className="hover:text-gold flex items-center gap-1 transition-colors">
                <span>Statement Chokers</span>
                <span className="text-[10px]">↗</span>
              </a>
              <span className="text-neutral-300 dark:text-neutral-700">•</span>
              <a href="https://omniastores.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold flex items-center gap-1 transition-colors font-semibold text-neutral-900 dark:text-white">
                <span>Complete Catalogue</span>
                <span className="text-[10px]">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* =========================================================================
            4. MAIN EDITORIAL ARTICLE HERO & CONTENT (Exact match to reference)
        ========================================================================== */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-24">
          
          {/* Eyebrow Breadcrumb */}
          <div className="mb-4">
            <span className="text-[#8B6508] dark:text-[#D4AF37] text-[11px] sm:text-xs font-mono font-bold tracking-widest uppercase">
              {eyebrow}
            </span>
          </div>

          {/* Massive Serif H1 Headline */}
          <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-neutral-950 dark:text-white leading-[1.18] sm:leading-[1.15] mb-6">
            {title}
          </h1>

          {/* Standfirst / Lead Paragraph */}
          <p className="text-base sm:text-lg md:text-xl text-neutral-700 dark:text-neutral-300 font-serif leading-relaxed mb-6 font-normal">
            {standfirst}
          </p>

          {/* Byline & Metadata Row */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-neutral-500 dark:text-neutral-400 font-serif border-b border-neutral-200 dark:border-neutral-800 pb-5 mb-6">
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">{author}</span>
            <span>·</span>
            <span>Concept edition {isAr ? 'الإمارات والخليج' : 'United Arab Emirates'}</span>
            <span>·</span>
            <span>{date}</span>
            <span>·</span>
            <span>{readTime}</span>
            <span>·</span>
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-[9px] font-bold tracking-wider uppercase">
              SPONSORED FEATURE
            </span>
          </div>

          {/* Interactive Reading Utility Toolbar */}
          <div className="rounded-2xl bg-white dark:bg-[#0E131F] border border-neutral-300/80 dark:border-gold/25 p-3 sm:p-4 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              {/* Audio Briefing Button */}
              <button
                type="button"
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className={`py-2 px-3.5 rounded-full border text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                  isPlayingAudio
                    ? 'bg-gold text-black border-gold shadow-md'
                    : 'bg-gold/10 text-[#8B6508] dark:text-gold border-gold/40 hover:bg-gold/20'
                }`}
                title={isPlayingAudio ? 'Pause audio briefing' : 'Listen to audio briefing'}
              >
                {isPlayingAudio ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
                <span>
                  {isPlayingAudio 
                    ? (isAr ? 'إيقاف الإيجاز الصوتي' : 'Pause Briefing') 
                    : (isAr ? `استمع للإيجاز (${eventBlog.audioDuration})` : `Listen to Briefing (${eventBlog.audioDuration})`)}
                </span>
                
                {/* Waveform indicator */}
                <span className="flex items-center gap-0.5 ml-1">
                  <span className={`w-0.5 h-2 bg-current rounded-full ${isPlayingAudio ? 'animate-bounce' : ''}`} />
                  <span className={`w-0.5 h-3 bg-current rounded-full ${isPlayingAudio ? 'animate-bounce delay-75' : ''}`} />
                  <span className={`w-0.5 h-1.5 bg-current rounded-full ${isPlayingAudio ? 'animate-bounce delay-150' : ''}`} />
                </span>
              </button>

              {/* Font Size Adjuster */}
              <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400 pl-2 border-l border-neutral-200 dark:border-neutral-800">
                <span>Text:</span>
                <button
                  type="button"
                  onClick={() => setFontSize('normal')}
                  className={`w-6 h-6 rounded flex items-center justify-center font-bold transition-colors ${
                    fontSize === 'normal' ? 'bg-gold text-black' : 'hover:bg-neutral-200 dark:hover:bg-white/10'
                  }`}
                  title="Normal font size"
                >
                  A-
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize('large')}
                  className={`w-6 h-6 rounded flex items-center justify-center font-bold transition-colors ${
                    fontSize === 'large' ? 'bg-gold text-black' : 'hover:bg-neutral-200 dark:hover:bg-white/10'
                  }`}
                  title="Large font size"
                >
                  A+
                </button>
              </div>
            </div>

            {/* Share link action */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyShare}
                className="py-1.5 px-3 rounded-lg border border-neutral-300 dark:border-white/10 text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-gold flex items-center gap-1.5 transition-colors"
                title="Copy editorial link"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500">{isAr ? 'تم النسخ!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{isAr ? 'مشاركة' : 'Share'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Breaking Wire Strip & Trust Matrix */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 py-4 border-t border-b border-gold/30 mb-10">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/70 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/5">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <div className="text-[10px] font-mono leading-tight">
                <span className="font-bold text-neutral-900 dark:text-white block">925 ASSAY</span>
                <span className="text-neutral-500">DCL Certified</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/70 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/5">
              <CreditCard className="w-4 h-4 text-gold shrink-0" />
              <div className="text-[10px] font-mono leading-tight">
                <span className="font-bold text-neutral-900 dark:text-white block">TABBY 4 PAY</span>
                <span className="text-neutral-500">0% Interest</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/70 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/5">
              <Truck className="w-4 h-4 text-sky-500 shrink-0" />
              <div className="text-[10px] font-mono leading-tight">
                <span className="font-bold text-neutral-900 dark:text-white block">24H COURIER</span>
                <span className="text-neutral-500">Dubai & Riyadh</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/70 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/5">
              <Award className="w-4 h-4 text-purple-400 shrink-0" />
              <div className="text-[10px] font-mono leading-tight">
                <span className="font-bold text-neutral-900 dark:text-white block">RHODIUM COAT</span>
                <span className="text-neutral-500">Anti-Tarnish</span>
              </div>
            </div>
          </div>

          {/* Lead Quote Card */}
          <blockquote className="relative my-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-neutral-900 to-[#121622] text-[#F4E3B2] border-l-4 border-gold shadow-lg">
            <span className="absolute top-2 right-4 text-6xl text-gold/20 font-serif select-none pointer-events-none">“</span>
            <p className="font-serif italic text-base sm:text-lg leading-relaxed relative z-10 mb-2">
              {leadQuote}
            </p>
            <cite className="block text-xs font-mono uppercase tracking-wider text-neutral-400 not-italic">
              — {author}
            </cite>
          </blockquote>

          {/* Section 1: Event Narrative & Fine Jewellery Specs */}
          <section className="space-y-4 mb-10">
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-neutral-950 dark:text-white pt-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
              {isAr ? eventBlog.section1TitleAr : eventBlog.section1TitleEn}
            </h2>
            <div className={`prose dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300 ${bodyTextClass}`}>
              <p className="whitespace-pre-line">
                {isAr ? eventBlog.section1BodyAr : eventBlog.section1BodyEn}
              </p>
            </div>
          </section>

          {/* High-Resolution Campaign Banner Showcase */}
          <div className="my-10 rounded-2xl overflow-hidden border border-gold/40 shadow-xl bg-neutral-950 group relative">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={eventBlog.coverImage}
                alt={title}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover group-hover:scale-102 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
              
              {/* Badge & Promo Pill */}
              <div className="absolute top-4 inset-x-4 flex items-center justify-between gap-2 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-gold text-[10px] font-mono font-bold text-gold uppercase tracking-wider shadow">
                  {promoTag}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/30 backdrop-blur-md border border-emerald-400/50 text-[10px] font-mono font-bold text-emerald-300 shadow">
                  OFFICIAL EVENT CAMPAIGN
                </span>
              </div>

              {/* Caption */}
              <div className="absolute bottom-4 inset-x-4 text-xs font-mono text-[#F4E3B2] flex items-center justify-between drop-shadow">
                <span>{eventBlog.publication}</span>
                <a
                  href={eventBlog.canonicalStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-full bg-gold text-black font-bold text-xs pointer-events-auto hover:brightness-110 transition-all flex items-center gap-1 shadow"
                >
                  <span>{isAr ? 'تسوق التشكيلة' : 'Shop This Collection'}</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Luxury Video Player Card (Matching User Reference Preview) */}
          {eventBlog.videoSrc && (
            <div className="my-10 space-y-3">
              <div className="flex items-center justify-between border-b border-gold/30 pb-2.5">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-gold" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#8B6508] dark:text-gold font-bold">
                    {isAr ? 'البث السينمائي المباشر للفعالية' : 'CINEMATIC EVENT BROADCAST'}
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-red-600/20 text-red-500 font-mono text-[9px] font-bold border border-red-500/40 animate-pulse">
                  OFFICIAL VIDEO REVEAL
                </span>
              </div>

              <div className="relative rounded-3xl overflow-hidden bg-black border border-gold/40 shadow-2xl aspect-[16/9] w-full group">
                <video
                  ref={videoRef}
                  src={eventBlog.videoSrc}
                  muted={isMutedVideo}
                  autoPlay
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                {/* Top Overlay Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-20">
                  <span className="px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-gold/60 text-gold text-[10px] font-mono font-bold tracking-wider">
                    {isAr ? (eventBlog.videoBadgeAr || 'كشف عروض الفعالية') : (eventBlog.videoBadgeEn || '11:11 Official Sale Reveal')}
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-red-600 text-white text-[10px] font-mono font-black tracking-widest shadow animate-pulse">
                    REC
                  </span>
                </div>

                {/* Center Big Play/Pause Button on Hover/Tap */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <button
                    type="button"
                    onClick={togglePlayVideo}
                    className="pointer-events-auto w-14 h-14 rounded-full bg-black/60 backdrop-blur-md border border-gold/60 text-gold flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl"
                    aria-label={isPlayingVideo ? 'Pause Video' : 'Play Video'}
                  >
                    {isPlayingVideo ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                  </button>
                </div>

                {/* Bottom Controls & Direct Deals CTA */}
                <div className="absolute bottom-4 inset-x-4 flex flex-wrap items-center justify-between gap-3 z-20">
                  <div className="flex items-center gap-2.5 bg-black/70 backdrop-blur-md py-1.5 px-3 rounded-full border border-white/10">
                    <button
                      type="button"
                      onClick={togglePlayVideo}
                      className="text-white hover:text-gold transition-colors"
                      title={isPlayingVideo ? 'Pause' : 'Play'}
                    >
                      {isPlayingVideo ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <span className="text-white/40">|</span>
                    <button
                      type="button"
                      onClick={toggleMuteVideo}
                      className="flex items-center gap-1.5 text-xs font-mono text-white hover:text-gold transition-colors"
                      title={isMutedVideo ? 'Unmute' : 'Mute'}
                    >
                      {isMutedVideo ? <VolumeX className="w-4 h-4 text-neutral-400" /> : <Volume2 className="w-4 h-4 text-gold" />}
                      <span className="text-[11px]">{isMutedVideo ? 'Click for Audio' : 'Audio On'}</span>
                    </button>
                  </div>

                  <a
                    href={eventBlog.videoCtaUrl || eventBlog.canonicalStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#DFB743] via-[#FCEAA5] to-[#C99E32] text-black font-serif font-black text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_28px_rgba(212,175,55,0.6)] hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-1.5"
                  >
                    <span>{isAr ? (eventBlog.videoCtaTextAr || 'صفقات الفعالية المباشرة') : (eventBlog.videoCtaTextEn || '11:11 DIRECT DEALS')}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Styling & Red Carpet Protocols */}
          <section className="space-y-4 mb-10">
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-neutral-950 dark:text-white pt-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
              {isAr ? eventBlog.section2TitleAr : eventBlog.section2TitleEn}
            </h2>
            <div className={`prose dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300 ${bodyTextClass}`}>
              <p className="whitespace-pre-line">
                {isAr ? eventBlog.section2BodyAr : eventBlog.section2BodyEn}
              </p>
            </div>
          </section>

          {/* Featured Product Recommendation Cards (Matching User Reference Image 4) */}
          <div className="my-12 space-y-6">
            <div className="flex items-center justify-between border-b border-gold/30 pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8B6508] dark:text-gold font-bold">
                  {isAr ? 'القطع المختارة من منصة العرض' : 'OFFICIAL CATALOGUE HIGHLIGHT'}
                </span>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-neutral-950 dark:text-white">
                  {isAr ? 'روائع المجوهرات المختارة مع شهادة الضمان' : 'Featured Event Masterpieces & Pricing'}
                </h3>
              </div>
              <span className="text-xs font-mono text-neutral-500">
                {eventBlog.featuredProducts.length} {isAr ? 'قطع مختارة' : 'Featured Pieces'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {eventBlog.featuredProducts.map((prod) => {
                const price = currency === 'SAR' ? prod.priceSar : prod.priceAed;
                const origPrice = currency === 'SAR' ? prod.originalPriceSar : prod.originalPriceAed;
                const currencyLabel = currency === 'SAR' ? (isAr ? 'ر.س' : 'SAR') : (isAr ? 'د.إ' : 'AED');
                const prodName = isAr ? prod.nameAr : prod.nameEn;
                const prodTag = isAr ? (prod.tagAr || prod.metal) : (prod.tagEn || prod.metal);
                const prodBadge = isAr ? (prod.badgeAr || 'قطعة حصرية من منصة العرض') : (prod.badgeEn || 'EXCLUSIVE RUNWAY MASTERPIECE');
                const prodDesc = isAr ? prod.descAr : prod.descEn;
                const highlights = isAr 
                  ? (prod.highlightsAr || [
                      `${prod.metal} - مع فحص مختبر دبي المركزي`,
                      `${prod.gem} - نقاء فائق وبريق استثنائي`,
                      'ترصيع إيطالي بالمخالب الدقيقة بدون أي مواد لاصقة',
                      'توصيل سريع ومضمون خلال 24 ساعة في كافة مدن الخليج'
                    ])
                  : (prod.highlightsEn || [
                      `${prod.metal} with electrolytic anti-tarnish rhodium barrier`,
                      `${prod.gem} cut to ideal round and pear proportions`,
                      'Micro-claw pavé setting with maximum diamond dispersion and zero-glue architecture',
                      'Guaranteed 24-hour express courier delivery across Dubai, Abu Dhabi, & GCC'
                    ]);

                return (
                  <article
                    key={prod.id}
                    className="group relative rounded-3xl overflow-hidden bg-white dark:bg-[#0A0D15] border border-neutral-300 dark:border-gold/30 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col w-full max-w-full justify-between"
                  >
                    <div>
                      {/* Image Frame with Aspect Ratio */}
                      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-neutral-900">
                        <Image
                          src={prod.image}
                          alt={prodName}
                          fill
                          sizes="(max-width: 768px) 100vw, 600px"
                          className="object-cover object-top sm:object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                        {/* Top Badges Overlay */}
                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between gap-2 pointer-events-none">
                          <span className="px-2.5 sm:px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-gold/40 text-[9px] sm:text-[10px] font-mono font-bold text-[#D4AF37] tracking-wider uppercase shadow-md truncate">
                            {prodBadge}
                          </span>
                          <span className="px-2.5 py-1 rounded-full bg-red-600/90 text-white font-mono text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest shadow-md shrink-0">
                            {prod.discountPercentage}% OFF
                          </span>
                        </div>

                        {/* Bottom Photo Title Overlay */}
                        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white drop-shadow">
                          <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-[#F9E8B8] block mb-1">
                            {prodTag}
                          </span>
                          <h4 className="text-base sm:text-xl font-serif font-black leading-tight text-white group-hover:text-[#FCEAA5] transition-colors">
                            {prodName}
                          </h4>
                        </div>
                      </div>

                      {/* Product Body */}
                      <div className="p-5 sm:p-6 space-y-4">
                        {prodDesc && (
                          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-serif leading-relaxed">
                            {prodDesc}
                          </p>
                        )}

                        {/* Bullet Highlights with Emerald Checkmarks */}
                        <div className="space-y-2 py-2 border-y border-neutral-100 dark:border-white/5">
                          {highlights.map((hl, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs font-serif text-neutral-700 dark:text-neutral-300">
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{hl}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Price & Direct Boutique Purchase CTA */}
                    <div className="p-5 sm:p-6 pt-0 border-t border-neutral-100 dark:border-white/5 mt-2">
                      <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                        <div>
                          <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                            {isAr ? 'السعر الحصري المباشر:' : 'DIRECT BOUTIQUE PRICE:'}
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl sm:text-3xl font-serif font-black text-neutral-900 dark:text-[#D4AF37]">
                              {currencyLabel} {price.toLocaleString()}
                            </span>
                            <span className="text-xs sm:text-sm font-mono text-neutral-400 line-through">
                              {currencyLabel} {origPrice.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Direct Shop on omniastores.com Button */}
                        <a
                          href={prod.productUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-full bg-gradient-to-r from-[#DFB743] via-[#FCEAA5] to-[#C99E32] text-black font-serif font-black text-xs uppercase tracking-wider shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_28px_rgba(212,175,55,0.6)] hover:scale-[1.02] active:scale-95 transition-all duration-300 group/btn shrink-0"
                          title={`Shop ${prodName} on omniastores.com`}
                        >
                          <ShoppingBag className="w-4 h-4 text-black group-hover/btn:rotate-12 transition-transform shrink-0" />
                          <span>{isAr ? 'تسوق من المتجر الرسمي' : 'SHOP ON OMNIASTORES.COM'}</span>
                          <ArrowUpRight className="w-4 h-4 shrink-0" />
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Section 3: Lab Assay & Tabby Financing */}
          <section className="space-y-4 mb-10">
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-neutral-950 dark:text-white pt-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
              {isAr ? eventBlog.section3TitleAr : eventBlog.section3TitleEn}
            </h2>
            <div className={`prose dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300 ${bodyTextClass}`}>
              <p className="whitespace-pre-line">
                {isAr ? eventBlog.section3BodyAr : eventBlog.section3BodyEn}
              </p>
            </div>
          </section>

          {/* Official Omnia Stores Collections Backlinks Hub */}
          <div className="my-10 rounded-2xl bg-white dark:bg-[#0A0E17] border border-neutral-300 dark:border-gold/30 p-6 sm:p-8 space-y-5 shadow-sm">
            <div className="space-y-1 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-gold font-bold flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-gold" />
                <span>{isAr ? 'الدليل الرسمي للعلامة والروابط المعتمدة' : 'OFFICIAL BOUTIQUE DIRECTORY & CATALOGUE BACKLINKS'}</span>
              </div>
              <h3 className="font-serif font-bold text-lg text-neutral-950 dark:text-white">
                {isAr ? 'تصفح مجموعات أمنية ستورز المعتمدة (omniastores.com)' : 'Explore Official Omnia Stores Signature Collections'}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {eventBlog.editorialBacklinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/b p-3.5 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200 dark:border-white/5 hover:border-gold transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="px-2 py-0.5 rounded bg-gold/15 text-gold font-mono text-[9px] font-bold uppercase inline-block mb-2">
                      {isAr ? link.badgeAr : link.badgeEn}
                    </span>
                    <h5 className="font-serif font-bold text-xs text-neutral-900 dark:text-white group-hover/b:text-gold transition-colors">
                      {isAr ? link.titleAr : link.titleEn}
                    </h5>
                  </div>
                  <div className="pt-3 text-[10px] font-mono text-gold flex items-center gap-1 font-semibold">
                    <span>{isAr ? 'زيارة القسم' : 'Open Vault'}</span>
                    <span>↗</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Interactive Buyer's FAQ Accordion */}
          <div className="my-10 space-y-4">
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-neutral-950 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-3">
              {isAr ? 'الأسئلة الشائعة حول الفعالية والمجوهرات' : 'Frequently Asked Questions & Advisory'}
            </h3>

            <div className="space-y-3">
              {eventBlog.faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                const question = isAr ? faq.questionAr : faq.questionEn;
                const answer = isAr ? faq.answerAr : faq.answerEn;

                return (
                  <div
                    key={index}
                    className="rounded-xl overflow-hidden bg-white dark:bg-[#0E131F] border border-neutral-200 dark:border-white/10 transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 font-serif font-bold text-sm sm:text-base text-neutral-900 dark:text-white hover:text-gold transition-colors"
                    >
                      <span>{question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-gold shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm font-serif leading-relaxed text-neutral-600 dark:text-neutral-300 border-t border-neutral-100 dark:border-neutral-800 pt-3">
                        <p>{answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* E-E-A-T Editorial Credibility & Commercial Disclosure Statement */}
          <div className="my-8 p-5 rounded-xl bg-neutral-100 dark:bg-white/[0.02] border border-neutral-200 dark:border-white/5 text-[11px] font-serif text-neutral-600 dark:text-neutral-400 leading-relaxed">
            <p>
              {isAr
                ? 'إفصاح تحريري: هذا التقرير مادة مدعومة ومعدة بواسطة استوديو أمنية ستورز التحريري. تخضع جميع الفحوصات الفضية لمعايير مختبر دبي المركزي (DCL) واختبارات قياس الطيف XRF. جميع روابط المتجر تؤدي مباشرة إلى المتجر الرسمي omniastores.com.'
                : 'Editorial Notice: This page is sponsored brand content produced by Omnia Stores Editorial Studio. All precious metal claims are independently assayed under Dubai Central Laboratories (DCL) standards using X-Ray Fluorescence spectrometry. Store links lead directly to official collections on omniastores.com.'}
            </p>
          </div>

          {/* Related Event Stories - Single-Click Navigation */}
          <div className="pt-12 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-serif font-bold text-xl text-neutral-950 dark:text-white">
                {isAr ? 'استكشف فعاليات وتقارير أخرى' : 'Explore More Seasonal Event Editorials'}
              </h4>
              <Link href="/editorials" className="text-xs font-mono font-bold text-gold hover:underline">
                {isAr ? 'عرض جميع الفعاليات ←' : 'View All Events →'}
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedEvents.map((rel) => {
                const relTitle = isAr ? rel.titleAr : rel.titleEn;
                const relTag = isAr ? rel.promoTagAr : rel.promoTagEn;

                return (
                  <Link
                    key={rel.id}
                    href={`/events/${rel.slug}`}
                    className="group rounded-xl overflow-hidden bg-white dark:bg-[#0E131F] border border-neutral-200 dark:border-white/10 hover:border-gold transition-all flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900">
                        <Image
                          src={rel.coverImage}
                          alt={relTitle}
                          fill
                          sizes="(max-width: 768px) 100vw, 300px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/80 text-gold font-mono text-[8px] font-bold">
                          {relTag}
                        </div>
                      </div>
                      <div className="p-3.5 space-y-1">
                        <span className="text-[9px] font-mono text-neutral-400">{rel.publication}</span>
                        <h5 className="font-serif font-bold text-xs text-neutral-950 dark:text-white group-hover:text-gold transition-colors line-clamp-2">
                          {relTitle}
                        </h5>
                      </div>
                    </div>
                    <div className="p-3.5 pt-0 text-[10px] font-mono text-gold flex items-center gap-1 font-bold">
                      <span>{isAr ? 'قراءة التقرير' : 'Read Event Blog'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

        </main>
      </div>
    </>
  );
}
