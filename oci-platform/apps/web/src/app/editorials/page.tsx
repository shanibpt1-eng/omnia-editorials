'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ExternalLink,
  Search,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Globe,
  Calendar,
  Clock,
  TrendingUp,
  Award,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Scale,
  X,
  Eye,
  Flame,
  Newspaper,
  Check,
  Copy,
  Percent,
  Truck,
  Crown,
  Coins,
  ShoppingBag,
  Pause,
  Play,
  Bookmark,
  Volume2,
  VolumeX,
  SlidersHorizontal,
  Calculator,
  Tv,
  Film,
  Radio,
  Maximize2,
  LayoutGrid,
  SkipForward,
  SkipBack,
  Share2,
  Heart,
  MessageCircle,
} from 'lucide-react';
import { SeoHead } from '../../components/SeoHead';
import { EDITORIAL_ARTICLES } from '../../data/editorial-feed';
import { AutoSlidingProductMarquee } from '../../components/AutoSlidingProductMarquee';
import { InteractiveShopTheLook } from '../../components/InteractiveShopTheLook';
import { OmniaStoresSkyscraperAd } from '../../components/OmniaStoresSkyscraperAd';
import verifiedDispatchesRaw from '../../data/verified-dispatches.json';
import omniastoresYoutubeData from '../../data/omniastores-youtube.json';
import omniastoresSocialHub from '../../data/omniastores-social-hub.json';
import omniaCampaignBannersRaw from '../../data/omnia-campaign-banners.json';
import { useLuxury } from '../../components/ThemeProvider';
import { getPublicationLabel } from '../../lib/productLocalization';

// Official Platform Vector Icons
const YouTubeIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const InstagramIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TikTokIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.35a6.33 6.33 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.77 1.52V6.82a4.85 4.85 0 0 1-1-.13z" />
  </svg>
);

const SnapchatIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.065 2c-3.957 0-6.04 2.946-6.04 5.485 0 1.25.438 2.88 1.05 3.864.12.19.068.324-.078.435-.38.286-1.127.817-1.48 1.638-.27.632.148 1.157.87 1.27.763.12 1.487-.22 1.83-.414.208-.117.388-.06.495.145.474.912 1.48 2.08 3.353 2.08 1.874 0 2.88-1.168 3.354-2.08.107-.205.287-.262.495-.145.343.194 1.067.534 1.83.414.722-.113 1.14-.638.87-1.27-.353-.82-1.1-1.352-1.48-1.638-.146-.11-.198-.245-.078-.435.612-.984 1.05-2.614 1.05-3.864C18.105 4.946 16.022 2 12.065 2zm-5.46 16.71c-.042.483.275.98.813 1.282.88.494 2.457.738 4.647.738 2.19 0 3.767-.244 4.647-.738.538-.302.855-.8.813-1.282-.042-.483-.41-.74-.833-.87-1.23-.377-2.735-.49-4.627-.49-1.892 0-3.397.113-4.627.49-.423.13-.79.387-.833.87z" />
  </svg>
);

const WhatsAppIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

const FacebookIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const renderSocialPlatformIcon = (platform: string, className = 'w-4 h-4') => {
  switch (platform) {
    case 'instagram':
      return <InstagramIcon className={className} />;
    case 'tiktok':
      return <TikTokIcon className={className} />;
    case 'snapchat':
      return <SnapchatIcon className={className} />;
    case 'facebook':
      return <FacebookIcon className={className} />;
    case 'youtube':
    default:
      return <YouTubeIcon className={className} />;
  }
};

// Normalize Country Names for Broad GCC and Regional Coverage
function normalizeRegion(countryStr: string): string {
  const c = (countryStr || '').toLowerCase();
  if (c.startsWith('united arab') || c.startsWith('dubai') || c.startsWith('abu dhabi')) return 'UAE';
  if (c.startsWith('saudi')) return 'SAUDI ARABIA';
  if (c.startsWith('kuwait')) return 'KUWAIT';
  if (c.startsWith('qatar')) return 'QATAR';
  if (c.startsWith('oman')) return 'OMAN';
  if (c.startsWith('bahrain')) return 'BAHRAIN';
  if (c.startsWith('united kingdom') || c.startsWith('uk')) return 'UK';
  if (c.startsWith('united states') || c.startsWith('usa')) return 'USA';
  if (c.startsWith('canada')) return 'CANADA';
  if (c.startsWith('france')) return 'FRANCE';
  if (c.startsWith('italy')) return 'ITALY';
  if (c.startsWith('germany')) return 'GERMANY';
  if (c.startsWith('spain')) return 'SPAIN';
  if (c.startsWith('australia')) return 'AUSTRALIA';
  if (c.startsWith('south korea')) return 'SOUTH KOREA';
  if (c.startsWith('india')) return 'INDIA';
  return 'GCC WIRE';
}

const ORIGINAL_OMNIA_BROADSHEETS = [
  {
    id: 'dubai-luxe-post',
    masthead: 'Dubai Luxe Post',
    edition: 'Weekend Broadsheet Edition',
    headline: 'THE NEW FACE OF DIGITAL GLAMOUR',
    img: '/press-reports/omnia_dubai_luxe_post.jpg',
  },
  {
    id: 'arabia-trend-daily',
    masthead: 'Arabia Trend Daily',
    edition: 'Style Watch Broadsheet',
    headline: 'COLOUR TAKES THE SPOTLIGHT',
    img: '/press-reports/omnia_arabia_trend_daily.jpg',
  },
  {
    id: 'gcc-fashion-ledger',
    masthead: 'GCC Fashion Ledger',
    edition: 'Bridal Special Broadsheet',
    headline: 'BRIDAL SPARKLE, REIMAGINED',
    img: '/press-reports/omnia_gcc_fashion_ledger.jpg',
  },
  {
    id: 'emirates-style-times',
    masthead: 'Emirates Style Times',
    edition: 'Retail Style Report Broadsheet',
    headline: 'A COLLECTION BUILT FOR OCCASION',
    img: '/press-reports/omnia_emirates_style_times.jpg',
  },
];

const PRESS_REPORT_MOCKS = [
  { img: '/press-reports/omnia_dubai_luxe_post.jpg', publication: 'Dubai Luxe Post', edition: 'Weekend Broadsheet Edition' },
  { img: '/press-reports/omnia_arabia_trend_daily.jpg', publication: 'Arabia Trend Daily', edition: 'Style Watch Broadsheet' },
  { img: '/press-reports/omnia_gcc_fashion_ledger.jpg', publication: 'GCC Fashion Ledger', edition: 'Bridal Special Broadsheet' },
  { img: '/press-reports/omnia_emirates_style_times.jpg', publication: 'Emirates Style Times', edition: 'Retail Report Broadsheet' },
  { img: '/press-reports/01_gulf_news_style.png', publication: 'Gulf News', edition: 'National Broadsheet' },
  { img: '/press-reports/02_khaleej_times_style.png', publication: 'Khaleej Times', edition: 'Daily Report' },
  { img: '/press-reports/03_the_national_style.png', publication: 'The National', edition: 'Special Investigation' },
  { img: '/press-reports/04_arabian_business_style.png', publication: 'Arabian Business', edition: 'Financial & Luxury Desk' },
  { img: '/press-reports/05_emirates_today_style.png', publication: 'Emirates Today', edition: 'Metro Broadsheet' },
  { img: '/press-reports/06_al_ittihad_style.png', publication: 'Al Ittihad', edition: 'Middle East Dispatch' },
  { img: '/press-reports/07_gulf_today_style.png', publication: 'Gulf Today', edition: 'Morning Edition' },
  { img: '/press-reports/08_arabic_daily_style.png', publication: 'Arabic Daily', edition: 'Regional Feature' },
  { img: '/press-reports/09_dubai_chronicle_style.png', publication: 'Dubai Chronicle', edition: 'Exclusive Gazette' },
  { img: '/press-reports/10_abu_dhabi_news_style.png', publication: 'Abu Dhabi News', edition: 'Capital Journal' },
  { img: '/press-reports/11_friday_style.png', publication: 'Friday Magazine', edition: 'Weekend Feature' },
  { img: '/press-reports/12_weekend_style.png', publication: 'Weekend Edition', edition: 'Sunday Review' },
  { img: '/press-reports/13_national_weekend_style.png', publication: 'National Weekend', edition: 'Cultural Folio' },
  { img: '/press-reports/14_gulf_business_style.png', publication: 'Gulf Business', edition: 'Market Dossier' },
  { img: '/press-reports/15_lifestyle_style.png', publication: 'Lifestyle Edition', edition: 'Haute Horlogerie & Jewels' },
];

interface DispatchItem {
  file: string;
  num: string;
  title: string;
  country: string;
  url: string;
  sizeKb: string;
  displayCountry?: string;
}

interface VlogItem {
  id: string;
  videoId: string;
  title: string;
  category: string;
  duration: string;
  views: string;
  published: string;
  thumbnail: string;
  embedUrl: string;
  watchUrl: string;
  description: string;
  featuredProduct?: {
    name: string;
    priceAed: number;
    url: string;
  };
}

interface SocialReelItem {
  id: string;
  platform: 'youtube' | 'instagram' | 'tiktok' | 'snapchat' | 'facebook';
  handle: string;
  title: string;
  subtitle: string;
  views: string;
  likes: string;
  comments: string;
  tag: string;
  videoId: string;
  thumbnail: string;
  platformUrl: string;
  featuredProduct?: {
    name: string;
    price: string;
  };
}

const verifiedDispatches: DispatchItem[] = verifiedDispatchesRaw.map((d: any) => ({
  ...d,
  displayCountry: normalizeRegion(d.country),
}));

export default function GulfChronicleEditorialPortal() {
  const { language, currency, formatPrice } = useLuxury();
  const isAr = language === 'ar';

  // Navigation & Desk State
  const [activeDesk, setActiveDesk] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('Dubai');
  const [fontSize, setFontSize] = useState<'standard' | 'large'>('standard');
  
  // Real-Time Live Broadsheet Clock & Accurate Calendar State (SSR-Stable fallback to eliminate hydration mismatches)
  const [currentDate, setCurrentDate] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentDate(new Date());
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const cityData: Record<string, { tz: string; tzCode: string; temp: string; icon: string; conditionEn: string; conditionAr: string }> = useMemo(() => ({
    Dubai: { tz: 'Asia/Dubai', tzCode: 'GST', temp: '31°C', icon: '☀️', conditionEn: 'Sunny', conditionAr: 'مشمس' },
    'Abu Dhabi': { tz: 'Asia/Dubai', tzCode: 'GST', temp: '30°C', icon: '☀️', conditionEn: 'Clear Sky', conditionAr: 'صافٍ' },
    Riyadh: { tz: 'Asia/Riyadh', tzCode: 'AST', temp: '28°C', icon: '🌤️', conditionEn: 'Clear', conditionAr: 'معتدل' },
    Doha: { tz: 'Asia/Qatar', tzCode: 'AST', temp: '30°C', icon: '☀️', conditionEn: 'Sunny', conditionAr: 'مشمس' },
    Kuwait: { tz: 'Asia/Kuwait', tzCode: 'AST', temp: '27°C', icon: '🌤️', conditionEn: 'Pleasant', conditionAr: 'لطيف' },
  }), []);

  const activeCityInfo = cityData[selectedCity] || cityData['Dubai'];
  const ssrStableDate = useMemo(() => new Date('2026-10-30T12:00:00Z'), []);
  const now = currentDate || ssrStableDate;

  // Accurate Gregorian Formatted Date
  const gregorianDateEn = useMemo(() => {
    try {
      return now.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: activeCityInfo.tz,
      }).toUpperCase();
    } catch {
      return 'THURSDAY, 29 OCTOBER 2026';
    }
  }, [now, activeCityInfo.tz]);

  const gregorianDateAr = useMemo(() => {
    try {
      return now.toLocaleDateString('ar-AE', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: activeCityInfo.tz,
      });
    } catch {
      return 'الخميس، 29 أكتوبر 2026';
    }
  }, [now, activeCityInfo.tz]);

  // Real-Time Live Ticking Clock (Synchronized with selected city)
  const liveTimeEn = useMemo(() => {
    try {
      return now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: activeCityInfo.tz,
      });
    } catch {
      return '10:30:00 AM';
    }
  }, [now, activeCityInfo.tz]);

  const liveTimeAr = useMemo(() => {
    try {
      return now.toLocaleTimeString('ar-AE', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: activeCityInfo.tz,
      });
    } catch {
      return '10:30:00 ص';
    }
  }, [now, activeCityInfo.tz]);

  // Accurate Islamic Hijri Date
  const hijriDateEn = useMemo(() => {
    try {
      const parts = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: activeCityInfo.tz,
      }).formatToParts(now);
      const day = parts.find((p) => p.type === 'day')?.value || '18';
      const rawMonth = parts.find((p) => p.type === 'month')?.value || 'Jumada I';
      const year = parts.find((p) => p.type === 'year')?.value || '1448';
      const hijriMonths: Record<string, string> = {
        'Muharram': 'Muharram',
        'Safar': 'Safar',
        'Rabi I': 'Rabi al-awwal',
        'Rabi II': 'Rabi al-thani',
        'Jumada I': 'Jumada al-awwal',
        'Jumada II': 'Jumada al-thani',
        'Rajab': 'Rajab',
        'Shaaban': "Sha'ban",
        'Ramadan': 'Ramadan',
        'Shawwal': 'Shawwal',
        "Dhu'l-Qi'dah": 'Dhu al-Qi\'dah',
        "Dhu'l-Hijjah": 'Dhu al-Hijjah'
      };
      const month = hijriMonths[rawMonth] || rawMonth;
      return `${day} ${month} ${year} AH`;
    } catch {
      return '18 Jumada al-awwal 1448 AH';
    }
  }, [now, activeCityInfo.tz]);

  const hijriDateAr = useMemo(() => {
    try {
      return new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: activeCityInfo.tz,
      }).format(now);
    } catch {
      return '١٨ جمادى الأولى ١٤٤٨ هـ';
    }
  }, [now, activeCityInfo.tz]);
  
  // Reading Progress Bar State (0 to 100%)
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Saved Bookmarks State
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // =========================================================================
  // ⭐ OMNIA STORES OMNICHANNEL SOCIAL DESK & BROADCAST TV STATE
  // =========================================================================
  const omniaVlogs: VlogItem[] = useMemo(() => omniastoresYoutubeData.videos as VlogItem[], []);
  const allSocialReels: SocialReelItem[] = useMemo(() => omniastoresSocialHub.socialReels as SocialReelItem[], []);

  const [activeVlogId, setActiveVlogId] = useState<string>('vlog-1');
  const [vlogCategoryFilter, setVlogCategoryFilter] = useState<string>('all');
  const [isAutoPlayVlogs, setIsAutoPlayVlogs] = useState<boolean>(true);
  const [isMutedVlog, setIsMutedVlog] = useState<boolean>(true);
  const [isTheaterMode, setIsTheaterMode] = useState<boolean>(false);
  const [copiedVlogNotification, setCopiedVlogNotification] = useState<string | null>(null);

  // Social Reels & Auto-Sliding State Across 5 Platforms (Instagram, TikTok, YouTube, Snapchat, Facebook)
  const [socialPlatformFilter, setSocialPlatformFilter] = useState<string>('all');
  const [socialScrollMode, setSocialScrollMode] = useState<'marquee' | 'step'>('marquee');
  const [scrollSpeed, setScrollSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const [isMarqueePaused, setIsMarqueePaused] = useState<boolean>(false);
  const [hoveredSocialId, setHoveredSocialId] = useState<string | null>(null);
  const [activeAutoPlaySocialId, setActiveAutoPlaySocialId] = useState<string>('soc-ig-1');
  const [isSocialAutoSlideRunning, setIsSocialAutoSlideRunning] = useState<boolean>(true);
  const [socialSlideIndex, setSocialSlideIndex] = useState<number>(0);
  const [isSocialTrackHovered, setIsSocialTrackHovered] = useState<boolean>(false);
  const [slideCountdownProgress, setSlideCountdownProgress] = useState<number>(0);
  const [cardStepWidth, setCardStepWidth] = useState<number>(220);
  const [containerWidth, setContainerWidth] = useState<number>(1200);
  const [activeSocialModal, setActiveSocialModal] = useState<SocialReelItem | null>(null);

  const socialTrackContainerRef = useRef<HTMLDivElement>(null);
  const socialTrackRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  const filteredSocialReels = useMemo(() => {
    if (socialPlatformFilter === 'all') return allSocialReels;
    return allSocialReels.filter((s) => s.platform === socialPlatformFilter);
  }, [allSocialReels, socialPlatformFilter]);

  // Infinite duplicate list for smooth continuous marquee auto-scrolling
  const marqueeSocialReels = useMemo(() => {
    if (filteredSocialReels.length === 0) return [];
    return [...filteredSocialReels, ...filteredSocialReels];
  }, [filteredSocialReels]);

  // Responsive measurement for card and container widths
  useEffect(() => {
    const measureDimensions = () => {
      if (socialTrackContainerRef.current) {
        setContainerWidth(socialTrackContainerRef.current.offsetWidth);
      }
      if (socialTrackRef.current && socialTrackRef.current.children.length > 0) {
        const firstCard = socialTrackRef.current.children[0] as HTMLElement;
        if (firstCard) {
          setCardStepWidth(firstCard.offsetWidth + 12);
        }
      }
    };
    measureDimensions();
    window.addEventListener('resize', measureDimensions);
    return () => window.removeEventListener('resize', measureDimensions);
  }, [filteredSocialReels]);

  // Reset slide index & progress when filter changes
  useEffect(() => {
    setSocialSlideIndex(0);
    setSlideCountdownProgress(0);
    if (filteredSocialReels.length > 0 && filteredSocialReels[0]) {
      setActiveAutoPlaySocialId(filteredSocialReels[0].id);
    }
  }, [socialPlatformFilter, filteredSocialReels]);

  // Periodic spotlight change across all reels (changes every 5 seconds)
  useEffect(() => {
    if (hoveredSocialId || filteredSocialReels.length <= 1) return;
    const interval = setInterval(() => {
      setActiveAutoPlaySocialId((prev) => {
        const currentIndex = filteredSocialReels.findIndex((s) => s.id === prev);
        const nextIndex = (currentIndex + 1) % filteredSocialReels.length;
        const target = filteredSocialReels[nextIndex];
        return target ? target.id : (filteredSocialReels[0]?.id || '');
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [hoveredSocialId, filteredSocialReels]);

  // Step Mode: Auto-Sliding and Auto-Changing Timer (slides to next video every 5.5s)
  useEffect(() => {
    if (socialScrollMode !== 'step' || !isSocialAutoSlideRunning || isSocialTrackHovered || hoveredSocialId || filteredSocialReels.length <= 1) {
      return;
    }

    const intervalStepMs = 80;
    const totalDurationMs = 5500;
    const progressIncrement = (intervalStepMs / totalDurationMs) * 100;

    const timer = setInterval(() => {
      setSlideCountdownProgress((prev) => {
        if (prev >= 100) {
          setSocialSlideIndex((currIdx) => {
            const nextIdx = (currIdx + 1) % filteredSocialReels.length;
            const target = filteredSocialReels[nextIdx];
            if (target) {
              setActiveAutoPlaySocialId(target.id);
            }
            return nextIdx;
          });
          return 0;
        }
        return prev + progressIncrement;
      });
    }, intervalStepMs);

    return () => clearInterval(timer);
  }, [socialScrollMode, isSocialAutoSlideRunning, isSocialTrackHovered, hoveredSocialId, filteredSocialReels]);

  // Manual Next & Prev Slide controls
  const handleNextSlide = () => {
    if (filteredSocialReels.length === 0) return;
    setSocialSlideIndex((currIdx) => {
      const nextIdx = (currIdx + 1) % filteredSocialReels.length;
      const target = filteredSocialReels[nextIdx];
      if (target) setActiveAutoPlaySocialId(target.id);
      return nextIdx;
    });
    setSlideCountdownProgress(0);
  };

  const handlePrevSlide = () => {
    if (filteredSocialReels.length === 0) return;
    setSocialSlideIndex((currIdx) => {
      const prevIdx = (currIdx - 1 + filteredSocialReels.length) % filteredSocialReels.length;
      const target = filteredSocialReels[prevIdx];
      if (target) setActiveAutoPlaySocialId(target.id);
      return prevIdx;
    });
    setSlideCountdownProgress(0);
  };

  const maxOffset = useMemo(() => {
    const totalContentWidth = filteredSocialReels.length * cardStepWidth;
    return Math.max(0, totalContentWidth - containerWidth);
  }, [filteredSocialReels.length, cardStepWidth, containerWidth]);

  const currentTranslateX = useMemo(() => {
    const rawOffset = socialSlideIndex * cardStepWidth;
    return Math.min(rawOffset, maxOffset);
  }, [socialSlideIndex, cardStepWidth, maxOffset]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0]?.clientX || null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0]?.clientX || 0;
    const diff = touchStartXRef.current - touchEndX;
    if (diff > 45) {
      handleNextSlide();
    } else if (diff < -45) {
      handlePrevSlide();
    }
    touchStartXRef.current = null;
  };

  const activeVlog = useMemo(() => {
    return omniaVlogs.find((v) => v.id === activeVlogId) || omniaVlogs[0]!;
  }, [omniaVlogs, activeVlogId]);

  const filteredVlogs = useMemo(() => {
    if (vlogCategoryFilter === 'all') return omniaVlogs;
    return omniaVlogs.filter((v) => v.category === vlogCategoryFilter);
  }, [omniaVlogs, vlogCategoryFilter]);

  const handleNextVlog = () => {
    if (filteredVlogs.length === 0) return;
    const currentIndex = filteredVlogs.findIndex((v) => v.id === activeVlog.id);
    const nextIndex = (currentIndex + 1) % filteredVlogs.length;
    const target = filteredVlogs[nextIndex];
    if (target) setActiveVlogId(target.id);
  };

  const handlePrevVlog = () => {
    if (filteredVlogs.length === 0) return;
    const currentIndex = filteredVlogs.findIndex((v) => v.id === activeVlog.id);
    const prevIndex = (currentIndex - 1 + filteredVlogs.length) % filteredVlogs.length;
    const target = filteredVlogs[prevIndex];
    if (target) setActiveVlogId(target.id);
  };

  const handleShareVlog = (vlog: VlogItem) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(vlog.watchUrl);
    }
    setCopiedVlogNotification(vlog.id);
    setTimeout(() => setCopiedVlogNotification(null), 2500);
  };

  // Auto-advance main vlog episode every 25 seconds if auto-play is enabled
  useEffect(() => {
    if (!isAutoPlayVlogs || filteredVlogs.length <= 1) return;
    const interval = setInterval(() => {
      const currentIndex = filteredVlogs.findIndex((v) => v.id === activeVlogId);
      const nextIndex = (currentIndex + 1) % filteredVlogs.length;
      const target = filteredVlogs[nextIndex];
      if (target) setActiveVlogId(target.id);
    }, 25000);
    return () => clearInterval(interval);
  }, [isAutoPlayVlogs, filteredVlogs, activeVlogId]);

  const handleNextSocialReel = () => {
    if (!activeSocialModal || filteredSocialReels.length === 0) return;
    const currentIndex = filteredSocialReels.findIndex((s) => s.id === activeSocialModal.id);
    const nextIndex = (currentIndex + 1) % filteredSocialReels.length;
    const target = filteredSocialReels[nextIndex];
    if (target) {
      setActiveSocialModal(target);
      setSocialSlideIndex(nextIndex);
      setActiveAutoPlaySocialId(target.id);
    }
  };

  const handlePrevSocialReel = () => {
    if (!activeSocialModal || filteredSocialReels.length === 0) return;
    const currentIndex = filteredSocialReels.findIndex((s) => s.id === activeSocialModal.id);
    const prevIndex = (currentIndex - 1 + filteredSocialReels.length) % filteredSocialReels.length;
    const target = filteredSocialReels[prevIndex];
    if (target) {
      setActiveSocialModal(target);
      setSocialSlideIndex(prevIndex);
      setActiveAutoPlaySocialId(target.id);
    }
  };

  // INSTAGRAM/KHALEEJ TIMES WEB STORY REELS
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [storySlideIndex, setStorySlideIndex] = useState(0);

  const storyReels = useMemo(() => [
    {
      id: 'story-gold',
      label: 'Gold Souk',
      labelAr: 'سوق الذهب',
      ringColor: 'from-amber-400 via-yellow-500 to-amber-600',
      avatar: '/campaigns/golden-lumiere.jpg',
      headline: 'Dubai Gold Souk 24K Benchmark',
      tag: 'MARKET WATCH',
      slides: [
        {
          title: 'Dubai 24K Gold Holds at AED 328.50/g',
          deck: 'Wedding season buying spikes demand for certified 925 silver suites as alternative bridal investment.',
          image: '/campaigns/golden-lumiere.jpg',
          stat: 'AED 328.50 /g',
          badge: 'DCL Benchmark',
        },
        {
          title: '925 Sterling Silver Up 1.1% Across Souk',
          deck: 'Rhodiated silver suites capture 62% of young GCC bridal gifting registries this quarter.',
          image: '/campaigns/golden-nocturne.jpg',
          stat: 'AED 4.15 /g',
          badge: '100% XRF Tested',
        },
      ],
    },
    {
      id: 'story-bridal',
      label: 'Imperial Gala',
      labelAr: 'إمبريال جالا',
      ringColor: 'from-amber-300 via-yellow-200 to-amber-500',
      avatar: '/campaigns/imperial-diamond-cascades.jpg',
      headline: 'Imperial Gala Diamond Radiance',
      tag: 'VOGUE ARABIA',
      slides: [
        {
          title: 'The Imperial Diamond Cascades Collar',
          deck: 'Cascading VVS1 fringe handset in solid 925 silver with Italian rhodium anti-tarnish finish.',
          image: '/campaigns/imperial-diamond-cascades.jpg',
          stat: '1,350 AED Suite',
          badge: 'Vogue Spotlight',
        },
        {
          title: 'Marquise Blossom Empress Setting',
          deck: 'Intricate marquise-cut floral clusters hand-set with 0.044 optical dispersion.',
          image: '/campaigns/marquise-floral-empress.jpg',
          stat: '0.044 Fire',
          badge: 'DCL Assay Stamped',
        },
      ],
    },
    {
      id: 'story-pearls',
      label: 'Gulf Pearls',
      labelAr: 'لؤلؤ الخليج',
      ringColor: 'from-cyan-400 via-teal-300 to-amber-400',
      avatar: '/campaigns/pearl-bloom.jpg',
      headline: 'The Modern Pearl Renaissance',
      tag: 'HARPER’S BAZAAR',
      slides: [
        {
          title: 'Trucial Maritime Pearl Traditions',
          deck: 'Reimagined in geometric 925 silver long chains for day-to-evening abaya styling.',
          image: '/campaigns/pearl-bloom.jpg',
          stat: 'Natural High Luster',
          badge: 'Hand-Selected',
        },
        {
          title: 'Lustrous Pearl Revival Collection',
          deck: 'Hand-selected baroque and spherical pearls mounted in anti-tarnish rhodiated prongs.',
          image: '/hero/hero-pearl-revival.jpg',
          stat: 'AA+ Luster',
          badge: 'Maritime Heritage',
        },
      ],
    },
    {
      id: 'story-simulants',
      label: 'Pear Halo',
      labelAr: 'كمثرى هالو',
      ringColor: 'from-purple-400 via-pink-400 to-amber-400',
      avatar: '/campaigns/pear-cut-halo-sovereign.jpg',
      headline: 'Pear-Cut Halo Sovereign Suite',
      tag: 'KHALEEJ TIMES',
      slides: [
        {
          title: 'Pear-Cut Halo Teardrop Cascade',
          deck: 'Dual-strand graduated drops engineered with 2.15 refractive index rivaling mined diamonds.',
          image: '/campaigns/pear-cut-halo-sovereign.jpg',
          stat: 'VVS1 Clarity',
          badge: 'GIA Calibrated',
        },
        {
          title: 'Midnight Nocturne Diamond Couture',
          deck: 'Fluid 925 silver articulated drape designed for Arabian evening galas and couture silk abayas.',
          image: '/campaigns/midnight-nocturne-couture.jpg',
          stat: '100% Anti-Tarnish',
          badge: 'Haute Gala',
        },
      ],
    },
    {
      id: 'story-ksa',
      label: 'Riyadh Air',
      labelAr: 'طيران الرياض',
      ringColor: 'from-emerald-400 via-teal-500 to-gold',
      avatar: '/campaigns/marquise-floral-empress.jpg',
      headline: 'Direct Riyadh 24H Delivery',
      tag: 'GULF NEWS',
      slides: [
        {
          title: 'Zero Customs Friction Across Saudi',
          deck: 'Pre-cleared air logistics corridor guarantees 24-48h dispatch from Riyadh fulfillment hub.',
          image: '/campaigns/marquise-floral-empress.jpg',
          stat: '24-48H Delivery',
          badge: 'SAR Local Pay',
        },
        {
          title: 'Express Fulfillment to Jeddah & Dammam',
          deck: 'Seamless door-to-door insured transit with live tracking across all Saudi provinces.',
          image: '/press/gulf-business-expansion-oct2026.jpg',
          stat: '100% Insured',
          badge: 'GCC Priority',
        },
      ],
    },
    {
      id: 'story-dcl',
      label: 'Assay Lab',
      labelAr: 'مختبر دبي',
      ringColor: 'from-blue-400 via-indigo-500 to-gold',
      avatar: '/hero/hero-diamond-radiance.jpg',
      headline: 'Dubai Municipality Standards',
      tag: 'THE NATIONAL',
      slides: [
        {
          title: 'Cabinet Resolution No. 23 Compliance',
          deck: 'Laser assay stamped confirming minimum 925 parts per thousand purity on every piece.',
          image: '/hero/hero-diamond-radiance.jpg',
          stat: '92.5% Pure Silver',
          badge: 'DCL Certified',
        },
        {
          title: 'XRF Spectral Elemental Audit',
          deck: 'Non-destructive benchtop spectrometry verifies zero nickel, zero lead, and hypoallergenic wear.',
          image: '/press/brand-milestone-report-jan2027.jpg',
          stat: '0% Nickel',
          badge: 'Hypoallergenic',
        },
      ],
    },
    {
      id: 'story-bridal-spread',
      label: 'Bridal Vault',
      labelAr: 'خزينة العرائس',
      ringColor: 'from-amber-400 via-rose-300 to-yellow-300',
      avatar: '/campaigns/midnight-nocturne-couture.jpg',
      headline: 'Omnia Stores Official Bridal Gazette',
      tag: 'OFFICIAL LOOKBOOK',
      slides: [
        {
          title: 'Rhodium-Plated Zircon Wedding Suites',
          deck: 'A celebration of modern elegance: crafted for statement bridal glamour with matching presentation vault box.',
          image: '/brand/omnia-bridal-elegance-spread.jpg',
          stat: 'Official Edition',
          badge: 'by Omnia Stores',
        },
        {
          title: 'The Heritage Heirloom Wedding Trunk',
          deck: 'Handcrafted royal velvet vault casing with custom engraved authentication certificate.',
          image: '/press/omnia-stores-guide-bridal-gifting.jpg',
          stat: 'Collector Trunk',
          badge: 'VIP Bridal',
        },
      ],
    },
    {
      id: 'story-brooches',
      label: 'Arabesque Pins',
      labelAr: 'بروش أرابيسك',
      ringColor: 'from-amber-500 via-rose-500 to-yellow-400',
      avatar: '/campaigns/08_floral-charm.png',
      headline: 'The Brooch Revival Runway',
      tag: 'HAUTE COUTURE',
      slides: [
        {
          title: 'Heritage Filigree Statement Pins',
          deck: 'Engineered with double-safety locking pins designed for silk scarves and velvet abayas.',
          image: '/press/brooch-modern-revival-collection.jpg',
          stat: 'Runway Favorite',
          badge: 'Couture Accent',
        },
        {
          title: 'Floral Charm Blossom Pin',
          deck: 'Delicate petals studded with micro-pave simulated diamonds set in mirror-polished rhodium.',
          image: '/campaigns/08_floral-charm.png',
          stat: 'Italian Mechanism',
          badge: 'Handset',
        },
      ],
    },
    {
      id: 'story-ruby',
      label: 'Royal Rubies',
      labelAr: 'فخامة الياقوت',
      ringColor: 'from-rose-500 via-red-500 to-amber-500',
      avatar: '/campaigns/ruby-statements-editorial.jpg',
      headline: 'Burmese Pigeon Blood Royal Statements',
      tag: 'VOGUE JEWELLERY',
      slides: [
        {
          title: 'The Sovereign Crimson Collar',
          deck: 'Deep pigeon blood simulated rubies flanked by tiered marquise diamonds in 925 sterling silver.',
          image: '/campaigns/ruby-statements-editorial.jpg',
          stat: '0.044 Dispersion',
          badge: 'Royal Edition',
        },
        {
          title: 'Regal Ruby Art-Deco Chandelier',
          deck: 'Articulated drop earrings designed to sway with ballroom couture gowns.',
          image: '/hero/hero-ruby-statements.jpg',
          stat: 'VVS1 Grade',
          badge: 'Couture Look',
        },
      ],
    },
    {
      id: 'story-emerald',
      label: 'Emerald Grandeur',
      labelAr: 'روعة الزمرد',
      ringColor: 'from-emerald-400 via-teal-400 to-amber-300',
      avatar: '/campaigns/emerald-grandeur-suite.jpg',
      headline: 'Muzo Colombian Green Prestige',
      tag: 'L’OFFICIEL ARABIA',
      slides: [
        {
          title: 'The Empress Muzo Emerald Choker',
          deck: 'Octagonal step-cut emerald centerpieces enriched by dual rows of brilliant round simulants.',
          image: '/campaigns/emerald-grandeur-suite.jpg',
          stat: 'Vivid Green Fire',
          badge: 'Gala Sovereign',
        },
        {
          title: 'Emerald Halo Cocktail Ring',
          deck: 'Hand-finished split shank in solid 925 silver with Italian platinum-sheen rhodium.',
          image: '/hero/hero-emerald-grandeur.jpg',
          stat: 'DCL Assay 925',
          badge: 'Atelier Master',
        },
      ],
    },
    {
      id: 'story-sapphire',
      label: 'Ceylon Sapphire',
      labelAr: 'زرقة السافير',
      ringColor: 'from-blue-500 via-indigo-500 to-amber-400',
      avatar: '/campaigns/sapphire-signature.jpg',
      headline: 'Ceylon Cornflower Velvet Nights',
      tag: 'HARPER’S BAZAAR',
      slides: [
        {
          title: 'The Midnight Velvet Sapphire Collier',
          deck: 'Royal blue teardrops alternating with icy round simulants for prestigious Arabian soirees.',
          image: '/campaigns/sapphire-signature.jpg',
          stat: 'Cornflower Blue',
          badge: 'High Jewellery',
        },
        {
          title: 'Cobalt Couture Statement Suite',
          deck: 'Deep royal blue stones cut to precision optical angles ensuring maximum pavilion fire.',
          image: '/campaigns/cobalt-couture.jpg',
          stat: '2.15 Refraction',
          badge: 'Atelier Signature',
        },
      ],
    },
    {
      id: 'story-canary',
      label: 'Canary Solitaire',
      labelAr: 'الألماس الكناري',
      ringColor: 'from-amber-300 via-yellow-400 to-amber-500',
      avatar: '/hero/hero-canary-yellow-suite.jpg',
      headline: 'Fancy Vivid Yellow Diamond Symphony',
      tag: 'ELLE ARABIA',
      slides: [
        {
          title: 'Sun-Drenched Radiant Cushion Suite',
          deck: 'Warm golden canary diamond centerpieces set in triple micro-pave halo rims.',
          image: '/hero/hero-canary-yellow-suite.jpg',
          stat: 'Vivid Canary Fire',
          badge: 'Summer Soiree',
        },
        {
          title: 'Golden Lumiere Statement Bracelet',
          deck: 'Articulated box clasp bracelet featuring alternating canary cushions and brilliant rounds.',
          image: '/campaigns/golden-nocturne.jpg',
          stat: '100% Anti-Tarnish',
          badge: 'VIP Gifting',
        },
      ],
    },
    {
      id: 'story-heirloom',
      label: 'Heirloom Grace',
      labelAr: 'إرث الأناقة',
      ringColor: 'from-amber-400 via-yellow-200 to-amber-600',
      avatar: '/campaigns/07_heirloom-beauty.png',
      headline: 'Trucial Maritime Diamond Legacy',
      tag: 'THE NATIONAL',
      slides: [
        {
          title: 'Geometric Trucial Filigree Choker',
          deck: 'Traditional Arabian jewelry silhouettes modernized with contemporary geometric ergonomics.',
          image: '/campaigns/07_heirloom-beauty.png',
          stat: 'Artisanal Handset',
          badge: 'Heritage Edition',
        },
        {
          title: 'Classic Solitaire Brilliance',
          deck: 'Timeless six-prong solitaire pendants engineered for effortless daily luxury wear.',
          image: '/campaigns/02_classic-brilliance.png',
          stat: 'Ideal Cut 57-Facet',
          badge: 'Everyday Luxury',
        },
      ],
    },
    {
      id: 'story-rose',
      label: 'Rosé Romance',
      labelAr: 'بريق الورد',
      ringColor: 'from-rose-400 via-pink-300 to-amber-400',
      avatar: '/campaigns/rose-brilliance.jpg',
      headline: 'Rose Gold & Rhodium Fusion',
      tag: 'GRAZIA MIDDLE EAST',
      slides: [
        {
          title: 'Blushing Diamond Tennis Ensemble',
          deck: 'Warm 18K rose gold vermeil over 925 sterling silver with ice-white round simulants.',
          image: '/campaigns/rose-brilliance.jpg',
          stat: 'Dual-Tone Gold',
          badge: 'Runway Favorite',
        },
        {
          title: 'Modern Romance Cocktail Ring',
          deck: 'Curved floral petals set with sparkling micropave accents and a central solitaire stone.',
          image: '/campaigns/06_modern-romance.png',
          stat: '0.044 Dispersion',
          badge: 'Spring Gala',
        },
      ],
    },
    {
      id: 'story-turquoise',
      label: 'Persian Turquoise',
      labelAr: 'فيروز نيشابور',
      ringColor: 'from-cyan-400 via-teal-400 to-amber-300',
      avatar: '/campaigns/turquoise-radiance.jpg',
      headline: 'Natural Robin-Egg Turquoise Heritage',
      tag: 'FORBES MIDDLE EAST',
      slides: [
        {
          title: 'Persian Blue Cabochon Collar',
          deck: 'Smooth sky-blue turquoise cabochons embraced by halo wreaths of brilliant simulated diamonds.',
          image: '/campaigns/turquoise-radiance.jpg',
          stat: 'Robin Egg Blue',
          badge: 'Limited 50 Pieces',
        },
        {
          title: 'Colours of Grace Artisan Suite',
          deck: 'Striking contrast between vivid turquoise and pure solid 925 silver Italian rhodium plating.',
          image: '/campaigns/05_colours-of-grace.png',
          stat: '92.5% Pure Silver',
          badge: 'DCL Hallmarked',
        },
      ],
    },
    {
      id: 'story-founder',
      label: 'Founder Atelier',
      labelAr: 'أتيليه أمنية',
      ringColor: 'from-amber-400 via-yellow-300 to-amber-500',
      avatar: '/brand/omnia-fouad-founder-ceo.png',
      headline: 'Inside Omnia Fouad’s Dubai Atelier',
      tag: 'OFFICIAL ATELIER',
      slides: [
        {
          title: 'The Philosophy of Accessible Luxury',
          deck: 'Founder Omnia Fouad discusses disrupting fine jewellery with certified silver and premium simulants.',
          image: '/press/omnia-fouad-founder-spread.png',
          stat: 'Dubai Design District',
          badge: 'Visionary',
        },
        {
          title: 'Assay Rigor & Cabinet No. 23 Standards',
          deck: 'How every single piece undergoes municipal assay verification before customer dispatch.',
          image: '/press/the-global-ledger-omnia-story-oct2026.jpg',
          stat: '100% XRF Certified',
          badge: 'Guaranteed Pure',
        },
      ],
    },
  ], []);

  // Story Auto-Advance (5s)
  useEffect(() => {
    if (activeStoryIndex === null) return;
    const currentReel = storyReels[activeStoryIndex];
    if (!currentReel) return;

    const interval = setInterval(() => {
      setStorySlideIndex((prev) => {
        if (prev < currentReel.slides.length - 1) {
          return prev + 1;
        } else {
          if (activeStoryIndex < storyReels.length - 1) {
            setActiveStoryIndex(activeStoryIndex + 1);
            return 0;
          } else {
            setActiveStoryIndex(null);
            return 0;
          }
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [activeStoryIndex, storySlideIndex, storyReels]);

  // AUDIO NARRATION PLAYER STATE
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioPlaybackSpeed, setAudioPlaybackSpeed] = useState<number>(1);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const audioTotalDuration = 252; // 4 minutes 12 seconds

  useEffect(() => {
    if (!isPlayingAudio) return;
    const timer = setInterval(() => {
      setAudioCurrentTime((prev) => (prev >= audioTotalDuration ? 0 : prev + 1));
    }, 1000 / audioPlaybackSpeed);
    return () => clearInterval(timer);
  }, [isPlayingAudio, audioPlaybackSpeed, audioTotalDuration]);

  const formatAudioTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // GEMOLOGICAL DISPERSION LAB STATE
  const [gemCompareMode, setGemCompareMode] = useState<'simulated' | 'mined'>('simulated');
  const [isSparkling, setIsSparkling] = useState(false);

  const triggerSparkleBurst = () => {
    setIsSparkling(true);
    setTimeout(() => setIsSparkling(false), 2000);
  };

  // DUBAI SOUK VALUE ESTIMATOR
  const [calcMetal, setCalcMetal] = useState<'24k' | '22k' | '21k' | '18k' | '925silver'>('925silver');
  const [calcGrams, setCalcGrams] = useState<number>(45);

  const metalPricesPerGram = {
    '24k': 328.50,
    '22k': 304.25,
    '21k': 294.50,
    '18k': 252.75,
    '925silver': 4.15,
  };

  const calculatedValuationAed = calcGrams * metalPricesPerGram[calcMetal];
  const calculatedValuationSar = calculatedValuationAed * 1.0205;
  const calculatedValuationUsd = calculatedValuationAed * 0.2723;

  // Archival Dispatch Filter State
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  // Reading Modal State
  const [activeModalArticle, setActiveModalArticle] = useState<any | null>(null);
  const [modalMode, setModalMode] = useState<'broadsheet' | 'document'>('broadsheet');
  const [broadsheetZoom, setBroadsheetZoom] = useState<number>(1);
  const [activeBroadsheetImg, setActiveBroadsheetImg] = useState<string>('/press-reports/omnia_dubai_luxe_post.jpg');
  const [copiedLink, setCopiedLink] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  useEffect(() => {
    if (activeModalArticle?.coverImage) {
      setActiveBroadsheetImg(activeModalArticle.coverImage);
      setBroadsheetZoom(1);
    }
  }, [activeModalArticle]);

  // TOP LEADERBOARD AD CAROUSEL STATE
  const [leaderboardIndex, setLeaderboardIndex] = useState(0);
  const [isLeaderboardPaused, setIsLeaderboardPaused] = useState(false);
  const [copiedLeaderboardCode, setCopiedLeaderboardCode] = useState(false);
  const [bannerViewMode, setBannerViewMode] = useState<'spotlight' | 'grid'>('spotlight');

  // Lead Cover Story Auto-Changing Photo Gallery State (Features 4K Couture Photos & Brand Spread)
  const leadStoryGallery = useMemo(() => [
    {
      id: 'look-1',
      src: '/campaigns/imperial-diamond-cascades.jpg',
      title: 'The Imperial Diamond Cascades Suite',
      titleAr: 'طقم شلال الألماس الإمبراطوري للسهرات',
      look: 'Look 01: Imperial Waterfall Fringe Collar & Chandelier Drops',
      lookAr: 'الإطلالة الأولى: عقد شلال الألماس وأقراط الثريا المتدلية',
    },
    {
      id: 'look-2',
      src: '/campaigns/marquise-floral-empress.jpg',
      title: 'Marquise Blossom Empress Suite',
      titleAr: 'طقم الماركيز الزهري الفاخر',
      look: 'Look 02: Marquise Floral Cluster Choker & Cocktail Ring',
      lookAr: 'الإطلالة الثانية: طوق أزهار الماركيز وخاتم الكوكتيل',
    },
    {
      id: 'look-3',
      src: '/campaigns/pear-cut-halo-sovereign.jpg',
      title: 'Pear-Cut Halo Sovereign Suite',
      titleAr: 'طقم هالو الكمثرى الملكي',
      look: 'Look 03: Dual-Strand Pear-Cut Halo Teardrops',
      lookAr: 'الإطلالة الثالثة: شلال قطرات هالو الكمثرى المزدوج',
    },
    {
      id: 'look-4',
      src: '/campaigns/midnight-nocturne-couture.jpg',
      title: 'Midnight Nocturne Diamond Couture',
      titleAr: 'طقم سهرة منتصف الليل الماسي',
      look: 'Look 04: Midnight Gala High Joaillerie Diamond Bib',
      lookAr: 'الإطلالة الرابعة: مجوهرات سهرة منتصف الليل الفاخرة',
    },
    {
      id: 'look-5',
      src: '/brand/omnia-bridal-elegance-spread.jpg',
      title: 'Official Omnia Stores Bridal Presentation Spread',
      titleAr: 'النشرة الرسمية لأطقم عرائس أمنية ستورز الفاخرة',
      look: 'Official Gazette: Rhodium-Plated Bridal Presentation Vault',
      lookAr: 'النشرة الحصرية: طقم زفاف أمنية ستورز في صندوق الإهداء الملكي',
    },
  ], []);

  const [leadPhotoIndex, setLeadPhotoIndex] = useState(0);
  const [isLeadPhotoPaused, setIsLeadPhotoPaused] = useState(false);

  useEffect(() => {
    if (isLeadPhotoPaused) return;
    const timer = setInterval(() => {
      setLeadPhotoIndex((prev) => (prev + 1) % leadStoryGallery.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isLeadPhotoPaused, leadStoryGallery.length]);

  const leaderboardCampaigns = useMemo(() => {
    return omniaCampaignBannersRaw.map((b) => ({
      id: b.id,
      tag: b.tag,
      title: b.title,
      subtitle: b.subtitle,
      gemstone: b.gemstone || '',
      description: b.subtitle,
      perk: b.perk,
      image: b.image,
      badge: `${b.badge} • ${b.code}`,
      code: b.code,
      ctaUrl: b.ctaUrl,
      ctaText: b.ctaText || 'Shop Suite',
      accent: b.accent || '#D4AF37',
    }));
  }, []);

  // Interactive Shop The Look Hotspots on Campaign Billboard
  const [showBillboardHotspots, setShowBillboardHotspots] = useState(true);
  const [activeBillboardHotspotId, setActiveBillboardHotspotId] = useState<string | null>(null);
  const [rightWingTab, setRightWingTab] = useState<'runway' | 'storeAd'>('storeAd');
  const [isRunwayAudioPlaying, setIsRunwayAudioPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isCinemaFullscreen, setIsCinemaFullscreen] = useState(false);
  const reelsScrollRef = useRef<HTMLDivElement>(null);

  const scrollReels = (direction: 'left' | 'right') => {
    if (reelsScrollRef.current) {
      const scrollAmount = direction === 'left' ? -460 : 460;
      reelsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const toggleRunwayAudio = () => {
    if (isRunwayAudioPlaying) {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
        audioContextRef.current = null;
      }
      setIsRunwayAudioPlaying(false);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        // Luxurious warm ambient harmonic chords (F major 9th)
        const freqs = [174.61, 220.00, 261.63, 329.63, 392.00];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(0.0001, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.015 / (idx + 1), ctx.currentTime + 1.5);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
        });
        setIsRunwayAudioPlaying(true);
      } catch (e) {
        setIsRunwayAudioPlaying(false);
      }
    }
  };

  // Campaign Hotspots Library (Jewelry pieces on couture models)
  const campaignHotspots: Record<string, Array<{
    id: string;
    title: string;
    titleAr: string;
    category: string;
    priceAed: number;
    priceSar: number;
    metal: string;
    x: number;
    y: number;
    ctaUrl: string;
  }>> = useMemo(() => ({
    'banner-imperial-diamond-cascades': [
      {
        id: 'hs-imp-earrings',
        title: 'Imperial Cascading Diamond Drop Earrings',
        titleAr: 'أقراط شلال الألماس الإمبراطورية المتدلية',
        category: 'Chandelier Drops',
        priceAed: 390,
        priceSar: 398,
        metal: 'Solid 925 Sterling Silver • Triple Italian Rhodium',
        x: 68.8,
        y: 29.5,
        ctaUrl: 'https://omniastores.com/collections/luxury-sets',
      },
      {
        id: 'hs-imp-necklace',
        title: 'Imperial Waterfall Droplet Fringe Gala Collar',
        titleAr: 'عقد شلال الألماس الإمبراطوري المتدلي',
        category: 'Statement Collar',
        priceAed: 1350,
        priceSar: 1377,
        metal: 'Hand-Set VVS1 Simulants • Laser Hallmarked 925',
        x: 72.0,
        y: 51.5,
        ctaUrl: 'https://omniastores.com/collections/luxury-sets',
      },
      {
        id: 'hs-imp-ring',
        title: 'Gala Diamond Solitaire Starburst Cocktail Ring',
        titleAr: 'خاتم السهرة الماسي البراق',
        category: 'Cocktail Ring',
        priceAed: 320,
        priceSar: 326,
        metal: 'Comfort-Fit Band • DCL Dubai Assay Tested',
        x: 82.8,
        y: 37.0,
        ctaUrl: 'https://omniastores.com/collections/luxury-sets',
      },
      {
        id: 'hs-imp-bracelet',
        title: 'Imperial Grandeur Multi-Row Tennis Cuff',
        titleAr: 'سوار التنس الإمبراطوري العريض',
        category: 'Tennis Bracelet',
        priceAed: 480,
        priceSar: 489,
        metal: 'Double Safety Tongue Catch • Anti-Tarnish',
        x: 89.5,
        y: 56.0,
        ctaUrl: 'https://omniastores.com/collections/luxury-sets',
      },
    ],
    'banner-marquise-floral-empress': [
      {
        id: 'hs-marq-earrings',
        title: 'Marquise Blossom Chandelier Earrings',
        titleAr: 'أقراط الماركيز الزهرية المتدلية',
        category: 'Floral Earrings',
        priceAed: 360,
        priceSar: 367,
        metal: 'Solid 925 Silver • Hypoallergenic Italian Rhodium',
        x: 68.0,
        y: 28.5,
        ctaUrl: 'https://omniastores.com/collections/luxury-sets',
      },
      {
        id: 'hs-marq-necklace',
        title: 'Marquise Floral Cluster Empress Collar',
        titleAr: 'عقد الماركيز الزهري الملكي الفاخر',
        category: 'Haute Collar',
        priceAed: 1280,
        priceSar: 1305,
        metal: 'Hand-Cut Premium Simulants • XRF Spectrometry Verified',
        x: 71.5,
        y: 49.0,
        ctaUrl: 'https://omniastores.com/collections/luxury-sets',
      },
      {
        id: 'hs-marq-ring',
        title: 'Marquise Blossom Statement Cocktail Ring',
        titleAr: 'خاتم الماركيز الزهري المرصع',
        category: 'Cocktail Ring',
        priceAed: 310,
        priceSar: 316,
        metal: 'Micro-Pavé Setting • DCL Hallmark 925',
        x: 83.2,
        y: 35.8,
        ctaUrl: 'https://omniastores.com/collections/luxury-sets',
      },
      {
        id: 'hs-marq-bracelet',
        title: 'Marquise Leaflet Articulated Tennis Bracelet',
        titleAr: 'سوار الماركيز الزهري الأيقوني',
        category: 'Tennis Bracelet',
        priceAed: 460,
        priceSar: 469,
        metal: 'Comfort Ergonomics • 100% Tarnish-Free',
        x: 91.0,
        y: 57.5,
        ctaUrl: 'https://omniastores.com/collections/luxury-sets',
      },
    ],
    'banner-pear-halo-sovereign': [
      {
        id: 'hs-pear-earrings',
        title: 'Pear-Cut Halo Teardrop Cascade Earrings',
        titleAr: 'أقراط هالو الكمثرى المتدلية',
        category: 'Teardrop Earrings',
        priceAed: 370,
        priceSar: 377,
        metal: 'Solid 925 Silver • Featherlight Wear',
        x: 67.2,
        y: 30.0,
        ctaUrl: 'https://omniastores.com/collections/luxury-sets',
      },
      {
        id: 'hs-pear-necklace',
        title: 'Dual-Strand Pear-Cut Halo Teardrop Collar',
        titleAr: 'عقد هالو الكمثرى الملكي المزدوج',
        category: 'Dual Collar',
        priceAed: 1420,
        priceSar: 1449,
        metal: '0.044 High Optical Dispersion Fire',
        x: 69.8,
        y: 57.0,
        ctaUrl: 'https://omniastores.com/collections/luxury-sets',
      },
      {
        id: 'hs-pear-ring',
        title: 'Sovereign Pear Solitaire Halo Cocktail Ring',
        titleAr: 'خاتم هالو الكمثرى السوليتير',
        category: 'Halo Ring',
        priceAed: 330,
        priceSar: 336,
        metal: 'Prong-Set VVS1 Clarity • 925 Stamped',
        x: 86.2,
        y: 43.0,
        ctaUrl: 'https://omniastores.com/collections/luxury-sets',
      },
      {
        id: 'hs-pear-bracelet',
        title: 'Graduated Pear Teardrop Tennis Bracelet',
        titleAr: 'سوار هالو الكمثرى المتدرج',
        category: 'Tennis Bracelet',
        priceAed: 490,
        priceSar: 500,
        metal: 'Double Security Latch • Italian Shield',
        x: 93.0,
        y: 65.0,
        ctaUrl: 'https://omniastores.com/collections/luxury-sets',
      },
    ],
    'banner-midnight-nocturne-couture': [
      {
        id: 'hs-noc-earrings',
        title: 'Midnight Nocturne Diamond Chandelier Drops',
        titleAr: 'أقراط سهرة منتصف الليل الماسية المتدلية',
        category: 'Gala Drops',
        priceAed: 380,
        priceSar: 388,
        metal: 'Solid 925 Silver • Triple Rhodium Mirror Finish',
        x: 67.0,
        y: 28.0,
        ctaUrl: 'https://omniastores.com/collections/luxury-sets',
      },
      {
        id: 'hs-noc-necklace',
        title: 'Midnight Gala High Joaillerie Diamond Bib Collar',
        titleAr: 'عقد سهرة منتصف الليل الماسي الفاخر',
        category: 'High Joaillerie',
        priceAed: 1390,
        priceSar: 1418,
        metal: 'Seamless Articulated Décolletage Drape',
        x: 70.5,
        y: 48.0,
        ctaUrl: 'https://omniastores.com/collections/luxury-sets',
      },
      {
        id: 'hs-noc-ring',
        title: 'Midnight Gala Diamond Starburst Solitaire Ring',
        titleAr: 'خاتم سهرة منتصف الليل البراق',
        category: 'Solitaire Ring',
        priceAed: 320,
        priceSar: 326,
        metal: 'DCL Dubai Central Laboratory Certified',
        x: 82.8,
        y: 35.8,
        ctaUrl: 'https://omniastores.com/collections/luxury-sets',
      },
      {
        id: 'hs-noc-bracelet',
        title: 'Midnight Diamond Pavé Link Cuff Bracelet',
        titleAr: 'سوار منتصف الليل المرصع بالألماس',
        category: 'Pavé Cuff',
        priceAed: 470,
        priceSar: 479,
        metal: 'Smooth Edge Abaya-Safe Engineering',
        x: 91.0,
        y: 54.5,
        ctaUrl: 'https://omniastores.com/collections/luxury-sets',
      },
    ],
    'banner-statement-edit': [
      {
        id: 'hs-canary-earrings',
        title: 'Canary Yellow Cushion Drop Earrings',
        titleAr: 'أقراط قطرة الياقوت الأصفر المتدلية',
        category: 'Earrings',
        priceAed: 380,
        priceSar: 388,
        metal: 'Solid 925 Sterling Silver • Triple Rhodium',
        x: 62.5,
        y: 22.0,
        ctaUrl: 'https://omniastores.com/collections/luxury-sets',
      },
      {
        id: 'hs-canary-necklace',
        title: 'Imperial Canary Cushion Grandeur Collar',
        titleAr: 'عقد الياقوت الأصفر الإمبراطوري الفاخر',
        category: 'Statement Collar',
        priceAed: 1250,
        priceSar: 1275,
        metal: 'Indistinguishable Premium Simulants • XRF Tested',
        x: 60.5,
        y: 61.0,
        ctaUrl: 'https://omniastores.com/collections/luxury-sets',
      },
      {
        id: 'hs-canary-ring',
        title: 'Cushion Halo Solitaire Cocktail Ring',
        titleAr: 'خاتم سوليتير الياقوت الأصفر هالو',
        category: 'Cocktail Ring',
        priceAed: 290,
        priceSar: 296,
        metal: 'Comfort-Fit Band • DCL Assay Stamped',
        x: 74.5,
        y: 77.0,
        ctaUrl: 'https://omniastores.com/collections/luxury-sets',
      },
      {
        id: 'hs-canary-bracelet',
        title: 'Canary Cushion Gala Tennis Bracelet',
        titleAr: 'سوار التنس الأيقوني المرصع بالأصفر الملكي',
        category: 'Tennis Bracelet',
        priceAed: 450,
        priceSar: 459,
        metal: 'Double Safety Catch • 100% Anti-Tarnish',
        x: 77.0,
        y: 91.0,
        ctaUrl: 'https://omniastores.com/collections/luxury-sets',
      },
    ],
    'banner-ruby-statements': [
      {
        id: 'hs-ruby-choker',
        title: 'Regal Ruby Cushion-Cut Statement Choker',
        titleAr: 'عقد الياقوت الأحمر الملكي الفاخر',
        category: 'High Jewellery Suite',
        priceAed: 450,
        priceSar: 459,
        metal: 'Certified 925 Silver • Italian Rhodium',
        x: 50.0,
        y: 56.0,
        ctaUrl: 'https://omniastores.com/collections/luxury-sets',
      },
      {
        id: 'hs-ruby-earrings',
        title: 'Radiant Ruby Linear Chandelier Drops',
        titleAr: 'أقراط الياقوت الأحمر المتدلية',
        category: 'Chandelier Earrings',
        priceAed: 290,
        priceSar: 296,
        metal: 'Featherlight Ergonomics • Hypoallergenic',
        x: 58.0,
        y: 30.0,
        ctaUrl: 'https://omniastores.com/collections/luxury-sets',
      },
    ],
    'banner-wear-statement-sets': [
      {
        id: 'hs-pearl-choker',
        title: 'Golden Pearl & Diamond Simulant Choker',
        titleAr: 'عقد اللؤلؤ الذهبي مع محاكاة الألماس',
        category: 'Pearl Suite',
        priceAed: 520,
        priceSar: 530,
        metal: 'Lustrous Freshwater Cultured Pearls • 925 Silver',
        x: 52.0,
        y: 52.0,
        ctaUrl: 'https://omniastores.com/collections/pearl-sets',
      },
      {
        id: 'hs-pearl-drops',
        title: 'Lustre Teardrop Pearl Earrings',
        titleAr: 'أقراط قطرة اللؤلؤ النقية',
        category: 'Drop Earrings',
        priceAed: 240,
        priceSar: 245,
        metal: '14k Gold Plating on 925 Silver',
        x: 62.0,
        y: 32.0,
        ctaUrl: 'https://omniastores.com/collections/pearl-sets',
      },
    ],
    'banner-pink-radiance': [
      {
        id: 'hs-pink-choker',
        title: 'Pastel Morganite & Pink Sapphire Floral Suite',
        titleAr: 'طقم المورغانيت والياقوت الوردي الملكي',
        category: 'Romantic Bridal',
        priceAed: 480,
        priceSar: 490,
        metal: 'Pastel Hand-Faceted Simulants • Rhodium 925',
        x: 50.0,
        y: 58.0,
        ctaUrl: 'https://omniastores.com/collections/luxury-sets',
      },
      {
        id: 'hs-pink-earrings',
        title: 'Blush Floral Cluster Studs',
        titleAr: 'أقراط الوردة الوردية المتألقة',
        category: 'Floral Studs',
        priceAed: 180,
        priceSar: 184,
        metal: 'Nickel-Free Sensitive Skin Certified',
        x: 60.0,
        y: 28.0,
        ctaUrl: 'https://omniastores.com/collections/luxury-sets',
      },
    ],
    'banner-emerald-grandeur': [
      {
        id: 'hs-emerald-suite',
        title: 'Imperial Colombian-Hue Emerald Halo Suite',
        titleAr: 'طقم الزمرد الكولومبي الفاخر هالو',
        category: 'High Jewellery Suite',
        priceAed: 1650,
        priceSar: 1682,
        metal: 'Deep Sovereign Green • Premium Diamond Pavé',
        x: 52.0,
        y: 56.0,
        ctaUrl: 'https://omniastores.com/collections/luxury-sets',
      },
      {
        id: 'hs-emerald-earrings',
        title: 'Emerald Halo Tier Drop Earrings',
        titleAr: 'أقراط الزمرد المتدلية بإطار ماسي',
        category: 'Halo Drops',
        priceAed: 390,
        priceSar: 398,
        metal: 'Tested Under DCL Assay Standards',
        x: 61.0,
        y: 30.0,
        ctaUrl: 'https://omniastores.com/collections/luxury-sets',
      },
    ],
    'banner-sapphire-allure': [
      {
        id: 'hs-sapphire-choker',
        title: 'Royal Sapphire Velvet Gala Suite',
        titleAr: 'طقم الياقوت الأزرق الملكي الفاخر',
        category: 'Couture Suite',
        priceAed: 520,
        priceSar: 531,
        metal: 'Cobalt Blue Oval Cut • 925 Sterling Silver',
        x: 50.0,
        y: 55.0,
        ctaUrl: 'https://omniastores.com/collections/luxury-sets',
      },
      {
        id: 'hs-sapphire-drops',
        title: 'Sapphire Royale Chandelier Earrings',
        titleAr: 'أقراط الياقوت الأزرق الملكية',
        category: 'Chandelier Drops',
        priceAed: 280,
        priceSar: 286,
        metal: 'Mirror-Polished Italian Rhodium Plating',
        x: 63.0,
        y: 33.0,
        ctaUrl: 'https://omniastores.com/collections/luxury-sets',
      },
    ],
  }), []);

  // Active Campaign & Runway Suite Breakdown for Widescreen Flagship Triptych
  const activeBillboardCampaign = leaderboardCampaigns[leaderboardIndex] || leaderboardCampaigns[0];
  const activeBillboardHotspots = useMemo(() => {
    if (!activeBillboardCampaign) return [];
    const spots = campaignHotspots[activeBillboardCampaign.id];
    if (spots && spots.length > 0) return spots;
    return [
      {
        id: `hs-def-collar-${activeBillboardCampaign.id}`,
        title: `${activeBillboardCampaign.title} Haute Joaillerie Collar`,
        titleAr: `${activeBillboardCampaign.title} - عقد ملكي مرصع فاخر`,
        category: 'Statement Collar',
        priceAed: 1250,
        priceSar: 1275,
        metal: 'Solid 925 Sterling Silver • Triple Italian Rhodium Plated',
        x: 50.0,
        y: 48.0,
        ctaUrl: activeBillboardCampaign.ctaUrl,
      },
      {
        id: `hs-def-earrings-${activeBillboardCampaign.id}`,
        title: `${activeBillboardCampaign.title} Chandelier Cascade Drops`,
        titleAr: `${activeBillboardCampaign.title} - أقراط شلال متدلية`,
        category: 'Chandelier Drops',
        priceAed: 390,
        priceSar: 398,
        metal: 'Premium Simulated Diamonds (VVS1 Clarity) • Nickel-Free',
        x: 68.0,
        y: 30.0,
        ctaUrl: activeBillboardCampaign.ctaUrl,
      },
      {
        id: `hs-def-ring-${activeBillboardCampaign.id}`,
        title: `${activeBillboardCampaign.title} Solitaire Cocktail Ring`,
        titleAr: `${activeBillboardCampaign.title} - خاتم السهرة المرصع`,
        category: 'Cocktail Ring',
        priceAed: 320,
        priceSar: 326,
        metal: 'Comfort-Fit Band • DCL Dubai Assay Tested',
        x: 82.0,
        y: 40.0,
        ctaUrl: activeBillboardCampaign.ctaUrl,
      },
    ];
  }, [activeBillboardCampaign, campaignHotspots]);

  const activeSuiteTotalAed = useMemo(() => {
    return activeBillboardHotspots.reduce((sum, item) => sum + item.priceAed, 0);
  }, [activeBillboardHotspots]);

  const activeSuiteVipPriceAed = useMemo(() => {
    return Math.round(activeSuiteTotalAed * 0.85);
  }, [activeSuiteTotalAed]);

  // Leaderboard Auto-Slide Timer (5.5s)
  useEffect(() => {
    if (isLeaderboardPaused) return;
    const interval = setInterval(() => {
      setLeaderboardIndex((prev) => (prev + 1) % leaderboardCampaigns.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isLeaderboardPaused, leaderboardCampaigns.length]);

  // SIDEBAR ANIMATED ADVERT BOX SLIDER
  const [sidebarAdIndex, setSidebarAdIndex] = useState(0);
  const [copiedSidebarCode, setCopiedSidebarCode] = useState(false);
  const sidebarAdSlides = useMemo(() => {
    return omniaCampaignBannersRaw.map((b) => ({
      image: b.image,
      headline: b.title,
      offer: `${b.badge} • ${b.gemstone}`,
      tag: b.tag,
      code: b.code,
      ctaUrl: b.ctaUrl,
      ctaText: b.ctaText,
      gemstone: b.gemstone,
      accent: b.accent,
    }));
  }, []);

  // Sidebar Ad Auto-Slide Timer (4.2s)
  useEffect(() => {
    const interval = setInterval(() => {
      setSidebarAdIndex((prev) => (prev + 1) % sidebarAdSlides.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [sidebarAdSlides.length]);

  // Live Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Currency Converter State
  const [currencyAed, setCurrencyAed] = useState<number>(1000);
  const exchangeRates = {
    SAR: 1.0205,
    QAR: 0.9918,
    KWD: 0.0834,
    USD: 0.2723,
  };

  // Reader Poll State
  const [pollVoted, setPollVoted] = useState<string | null>(null);
  const [pollStats, setPollStats] = useState({
    silver: 74,
    gold: 18,
    platinum: 8,
  });

  const handleVote = (option: 'silver' | 'gold' | 'platinum') => {
    if (pollVoted) return;
    setPollVoted(option);
    setPollStats((prev) => ({
      ...prev,
      [option]: prev[option] + 1,
    }));
  };

  // Live Breaking News Headlines for Marquee
  const breakingHeadlines = [
    'OMNIA STORES: Unveils 2026 Royal Bridal Demi-Fine Suite in Certified 925 Silver across Dubai Souk',
    'MARKET WATCH: Dubai Gold Souk 24K holds at AED 328.50 as wedding season demand accelerates',
    'LABORATORY ASSAY: Dubai Central Laboratories reinforces 925 silver spectrometry hallmarking protocols',
    'KSA COMMERCE: Riyadh logistics facility activates 24-hr cross-border delivery corridor for Saudi buyers',
    'HAUTE COUTURE: Vogue Arabia spotlights the resurgence of handcrafted Arabesque 925 silver statement pins',
  ];

  // Dynamic Synchronized Editorial Feed
  const [allArticles, setAllArticles] = useState(EDITORIAL_ARTICLES);

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.articles) && data.articles.length > 0) {
          setAllArticles(data.articles);
        }
      })
      .catch(() => {});
  }, []);

  // Filtered stories based on active portal tab with instant reactive animation update
  const displayedArticles = useMemo(() => {
    if (activeDesk === 'ruby') {
      const filtered = allArticles.filter(
        (a) =>
          a.slug.includes('ruby') ||
          a.title.toLowerCase().includes('ruby') ||
          a.category?.toLowerCase().includes('ruby')
      );
      return filtered.length > 0 ? filtered : allArticles;
    }
    if (activeDesk === 'bridal') {
      const filtered = allArticles.filter(
        (a) =>
          a.slug.includes('bridal') ||
          a.title.toLowerCase().includes('bridal') ||
          a.titleAr?.includes('عروس') ||
          a.category?.toLowerCase().includes('bridal')
      );
      return filtered.length > 0 ? filtered : allArticles;
    }
    if (activeDesk === 'gemstones') {
      const filtered = allArticles.filter(
        (a) =>
          a.slug.includes('ruby') ||
          a.slug.includes('sapphire') ||
          a.slug.includes('emerald') ||
          a.title.toLowerCase().includes('emerald') ||
          a.title.toLowerCase().includes('sapphire')
      );
      return filtered.length > 0 ? filtered : allArticles;
    }
    return allArticles;
  }, [allArticles, activeDesk]);

  // Lead Feature Story
  const leadStory = displayedArticles[0] || allArticles[0] || EDITORIAL_ARTICLES[0]!;
  const secondaryStack = displayedArticles.slice(1, 4);
  const gridStories = displayedArticles;

  // Filter Dispatches
  const regionsList = useMemo(() => {
    return ['ALL', 'UAE', 'SAUDI ARABIA', 'KUWAIT', 'QATAR', 'OMAN', 'BAHRAIN', 'UK', 'USA'];
  }, []);

  const filteredDispatches = useMemo(() => {
    return verifiedDispatches.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.file.toLowerCase().includes(search.toLowerCase()) ||
        item.num.includes(search);
      const matchRegion =
        selectedRegion === 'ALL' || item.displayCountry === selectedRegion;
      return matchSearch && matchRegion;
    });
  }, [search, selectedRegion]);

  const totalPages = Math.ceil(filteredDispatches.length / pageSize);
  const paginatedDispatches = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredDispatches.slice(start, start + pageSize);
  }, [filteredDispatches, currentPage]);

  const handleCopyLink = (url: string) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(`${window.location.origin}${url}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  const [copiedBannerCode, setCopiedBannerCode] = useState<string | null>(null);

  const handleCopyCode = (code: string, type: 'leaderboard' | 'sidebar' | 'banner') => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(code);
      if (type === 'leaderboard') {
        setCopiedLeaderboardCode(true);
        setTimeout(() => setCopiedLeaderboardCode(false), 2500);
      } else if (type === 'sidebar') {
        setCopiedSidebarCode(true);
        setTimeout(() => setCopiedSidebarCode(false), 2500);
      } else if (type === 'banner') {
        setCopiedBannerCode(code);
        setTimeout(() => setCopiedBannerCode(null), 2500);
      }
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => setNewsletterSubscribed(false), 5000);
      setNewsletterEmail('');
    }
  };

  return (
    <>
      <SeoHead
        pageType="article"
      />

      {/* TOP FIXED READING PROGRESS BAR */}
      <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#B8860B] via-[#E6CA65] to-gold shadow-[0_0_10px_rgba(212,175,55,0.8)] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <main className={`min-h-screen bg-[#FDFBF7] dark:bg-[#0A0D14] text-neutral-900 dark:text-neutral-100 transition-colors duration-300 ${
        fontSize === 'large' ? 'text-lg' : 'text-base'
      } ${isAr ? 'font-arabic text-right' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
        
        {/* =========================================================================
            1. TOP NEWSPAPER MASTHEAD STRIP (Gulf News / Khaleej Times Wire Format)
        ========================================================================== */}
        <section className="border-b border-neutral-300 dark:border-neutral-800 bg-[#F4EFE6] dark:bg-[#0E121B] text-[11px] sm:text-xs">
          <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row items-center justify-between gap-2.5">
            
            {/* Left: Accurate Broadsheet Date, Hijri Calendar & Live Ticking Clock */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-neutral-700 dark:text-neutral-400 font-medium">
              <span className="font-bold text-neutral-950 dark:text-white uppercase tracking-wider flex items-center gap-1.5 font-serif" suppressHydrationWarning>
                <Calendar className="w-3.5 h-3.5 text-[#B8860B] dark:text-gold" />
                <span suppressHydrationWarning>{isAr ? gregorianDateAr : gregorianDateEn}</span>
              </span>

              <span className="text-neutral-400 dark:text-neutral-600">•</span>

              <span className="font-serif text-[#8B6508] dark:text-gold/90 font-bold" suppressHydrationWarning>
                {isAr ? hijriDateAr : hijriDateEn}
              </span>

              <span className="text-neutral-400 dark:text-neutral-600">•</span>

              {/* Real-Time Live Ticking Digital Clock with Seconds */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 text-[10px] sm:text-[11px] font-mono font-bold shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <Clock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span suppressHydrationWarning>{isAr ? `${liveTimeAr} (${activeCityInfo.tzCode})` : `${liveTimeEn} ${activeCityInfo.tzCode}`}</span>
              </span>

              <span className="hidden lg:inline text-neutral-400 dark:text-neutral-600">•</span>

              <span className="hidden lg:inline-flex items-center gap-1 text-[#8B6508] dark:text-gold font-semibold">
                <Globe className="w-3 h-3" /> {isAr ? 'طبعة الإمارات والخليج الموحدة' : 'UAE & GCC Edition'}
              </span>
            </div>

            {/* Center / Right: City Selector & Accessibility Font Resizer & Real-time Weather */}
            <div className="flex items-center gap-3 sm:gap-4 text-neutral-700 dark:text-neutral-400">
              <div className="hidden lg:flex items-center gap-1.5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500">{isAr ? 'الطبعة:' : 'Edition:'}</span>
                {['Dubai', 'Abu Dhabi', 'Riyadh', 'Doha', 'Kuwait'].map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-serif transition-all ${
                      selectedCity === city
                        ? 'bg-neutral-900 text-white dark:bg-gold dark:text-black font-black shadow-xs scale-105'
                        : 'hover:text-black dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-white/5'
                    }`}
                  >
                    {isAr
                      ? city === 'Dubai'
                        ? 'دبي'
                        : city === 'Abu Dhabi'
                        ? 'أبوظبي'
                        : city === 'Riyadh'
                        ? 'الرياض'
                        : city === 'Doha'
                        ? 'الدوحة'
                        : 'الكويت'
                      : city}
                  </button>
                ))}
              </div>

              {/* Font Size Resizer & Saved Bookmarks Trigger */}
              <div className="flex items-center gap-2">
                <div className="flex items-center border border-neutral-300 dark:border-neutral-700 rounded-lg overflow-hidden bg-white dark:bg-black/40 text-[10px] font-bold">
                  <button
                    onClick={() => setFontSize('standard')}
                    className={`px-2 py-0.5 transition-colors ${fontSize === 'standard' ? 'bg-gold text-black' : 'text-neutral-600 dark:text-neutral-400'}`}
                    title="Standard Font Size"
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSize('large')}
                    className={`px-2 py-0.5 transition-colors ${fontSize === 'large' ? 'bg-gold text-black' : 'text-neutral-600 dark:text-neutral-400'}`}
                    title="Large Broadsheet Font"
                  >
                    A+
                  </button>
                </div>

                <button
                  onClick={() => setIsSavedDrawerOpen(true)}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gold/15 text-[#8B6508] dark:text-gold border border-gold/30 text-[11px] font-bold hover:bg-gold hover:text-black transition-all"
                >
                  <Bookmark className="w-3 h-3" />
                  <span>{isAr ? `المحفوظات (${bookmarkedIds.length})` : `Saved (${bookmarkedIds.length})`}</span>
                </button>
              </div>

              {/* Dynamic City Weather Pill (Synchronized with selected city) */}
              <div className="flex items-center gap-1.5 bg-neutral-200/70 dark:bg-black/50 px-2.5 py-0.5 rounded-full border border-neutral-300 dark:border-neutral-800 text-[11px] font-mono shadow-2xs">
                <span>{activeCityInfo.icon}</span>
                <span className="font-bold text-neutral-900 dark:text-white">{activeCityInfo.temp}</span>
                <span className="text-neutral-500 dark:text-neutral-400 hidden sm:inline">{isAr ? activeCityInfo.conditionAr : activeCityInfo.conditionEn}</span>
                <span className="font-semibold text-neutral-900 dark:text-white">• {isAr ? (selectedCity === 'Dubai' ? 'دبي' : selectedCity === 'Abu Dhabi' ? 'أبوظبي' : selectedCity === 'Riyadh' ? 'الرياض' : selectedCity === 'Doha' ? 'الدوحة' : 'الكويت') : selectedCity}</span>
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            2. LIVE DUBAI GOLD & PRECIOUS METALS SOUK BOARD (Signature Khaleej Times)
        ========================================================================== */}
        <section className="bg-white dark:bg-[#111520] border-b border-neutral-200 dark:border-gold/20 shadow-xs py-2 px-3 sm:px-4 overflow-x-auto scrollbar-none">
          <div className="w-full max-w-[1760px] mx-auto flex items-center justify-between gap-4 lg:gap-6 text-xs whitespace-nowrap min-w-max">
            {/* Header Badge */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="bg-[#B8860B] dark:bg-gold text-black font-black px-2.5 py-1 rounded text-[10px] tracking-wider uppercase shadow-xs flex-shrink-0 select-none">
                {isAr ? 'سوق الذهب بدبي' : 'DUBAI GOLD SOUK'}
              </span>
              <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 hidden sm:inline flex-shrink-0">
                {isAr ? 'معايير مختبر دبي المركزي المعتمدة' : 'Official DCL Benchmarks'}
              </span>
            </div>

            {/* Gold & Precious Metal Rates (Always Straight, Zero Line-Wrap) */}
            <div className="flex items-center gap-2.5 sm:gap-3 text-xs flex-shrink-0">
              {/* 24K Gold */}
              <div className="whitespace-nowrap flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100/80 dark:bg-white/5 border border-neutral-200 dark:border-white/10 shadow-2xs">
                <span className="font-bold text-neutral-800 dark:text-neutral-200">
                  {isAr ? 'ذهب عيار 24:' : '24K Gold:'}
                </span>
                <span className="font-mono font-bold text-neutral-950 dark:text-white">
                  {currency === 'SAR' ? 'SAR 335.25' : 'AED 328.50'}
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold font-mono">
                  ▲ +0.4%
                </span>
              </div>

              {/* 22K Gold */}
              <div className="whitespace-nowrap flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100/80 dark:bg-white/5 border border-neutral-200 dark:border-white/10 shadow-2xs">
                <span className="font-bold text-neutral-800 dark:text-neutral-200">
                  {isAr ? 'ذهب عيار 22:' : '22K Gold:'}
                </span>
                <span className="font-mono font-bold text-neutral-950 dark:text-white">
                  {currency === 'SAR' ? 'SAR 310.50' : 'AED 304.25'}
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold font-mono">
                  ▲ +0.3%
                </span>
              </div>

              {/* 21K Gold (GCC Bridal Standard) */}
              <div className="whitespace-nowrap flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100/80 dark:bg-white/5 border border-neutral-200 dark:border-white/10 shadow-2xs">
                <span className="font-bold text-neutral-800 dark:text-neutral-200">
                  {isAr ? 'ذهب عيار 21:' : '21K Gold:'}
                </span>
                <span className="font-mono font-bold text-neutral-950 dark:text-white">
                  {currency === 'SAR' ? 'SAR 300.60' : 'AED 294.50'}
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold font-mono">
                  ▲ +0.3%
                </span>
              </div>

              {/* 18K Gold */}
              <div className="whitespace-nowrap flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100/80 dark:bg-white/5 border border-neutral-200 dark:border-white/10 shadow-2xs">
                <span className="font-bold text-neutral-800 dark:text-neutral-200">
                  {isAr ? 'ذهب عيار 18:' : '18K Gold:'}
                </span>
                <span className="font-mono font-bold text-neutral-950 dark:text-white">
                  {currency === 'SAR' ? 'SAR 258.00' : 'AED 252.75'}
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold font-mono">
                  ▲ +0.2%
                </span>
              </div>

              {/* 925 Sterling Silver (Omnia Craft Base) */}
              <div className="whitespace-nowrap flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gold/15 dark:bg-gold/20 border border-gold/40 shadow-[0_0_12px_rgba(212,175,55,0.18)]">
                <span className="font-bold text-[#8B6508] dark:text-gold">
                  {isAr ? 'فضة إسترلينية 925:' : '925 Sterling Silver:'}
                </span>
                <span className="font-mono font-bold text-neutral-950 dark:text-white">
                  {currency === 'SAR' ? 'SAR 4.25 /g' : 'AED 4.15 /g'}
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold font-mono">
                  ▲ +1.1%
                </span>
              </div>

              {/* Platinum */}
              <div className="whitespace-nowrap flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100/80 dark:bg-white/5 border border-neutral-200 dark:border-white/10 shadow-2xs hidden md:inline-flex">
                <span className="font-bold text-neutral-800 dark:text-neutral-200">
                  {isAr ? 'بلاتين:' : 'Platinum:'}
                </span>
                <span className="font-mono font-bold text-neutral-950 dark:text-white">
                  {currency === 'SAR' ? 'SAR 121.25' : 'AED 118.80'}
                </span>
                <span className="text-rose-600 dark:text-rose-400 text-[11px] font-semibold font-mono">
                  ▼ -0.2%
                </span>
              </div>
            </div>

            {/* Live Ticker Telemetry Time (Real-Time Synchronized GST Wire) */}
            <div className="flex-shrink-0 text-[11px] text-neutral-600 dark:text-neutral-400 font-mono hidden xl:flex items-center gap-2 bg-neutral-100 dark:bg-white/5 px-3 py-1 rounded-full border border-neutral-200 dark:border-white/10 shadow-2xs whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping flex-shrink-0" />
              <span className="font-bold text-neutral-900 dark:text-white">
                {isAr ? `الأسعار المباشرة: ${liveTimeAr} (${activeCityInfo.tzCode})` : `Live DCL Wire: ${liveTimeEn} ${activeCityInfo.tzCode}`}
              </span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. GRAND BROADSHEET MASTHEAD BANNER (Ultra-Luxury Broadsheet Presentation)
        ========================================================================== */}
        <header className="relative border-b-4 border-double border-neutral-900/80 dark:border-gold/30 py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,rgba(212,175,55,0.08),transparent_100%),linear-gradient(to_bottom,#FFFFFF,#FAF8F3,#F4EFE6)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-15%,rgba(212,175,55,0.12),transparent_100%),linear-gradient(to_bottom,#080B11,#0D111A,#080B11)]">
          <div className="w-full max-w-[1760px] mx-auto flex flex-col space-y-5 lg:space-y-0">
            
            {/* Mobile & Tablet Quick Status Ribbon (Visible on < lg screens) */}
            <div className="flex lg:hidden items-center justify-between gap-2 pb-3 border-b border-neutral-200/80 dark:border-white/10">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold/10 dark:bg-gold/15 border border-gold/30 text-[10px] font-mono font-bold text-[#8B6508] dark:text-gold shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                <span className="truncate">{isAr ? 'معتمد من GIA ومختبر دبي' : 'GIA & DCL Certified Assay'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping flex-shrink-0" />
              </div>

              <Link
                href="/editorial-portal/"
                className="relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#DFB743] via-[#FCEAA5] to-[#C99E32] text-black shadow-sm font-serif font-black text-[10px] uppercase tracking-wider overflow-hidden active:scale-95 transition-transform flex-shrink-0 group"
                title="Access Omnia Stores Official Editorial Portal"
              >
                <Sparkles className="w-3 h-3 text-black animate-spin" style={{ animationDuration: '6s' }} />
                <span>{isAr ? 'البوابة التحريرية' : 'EDITORIAL PORTAL'}</span>
                <span className="px-1 py-0.2 rounded-full text-[8px] font-mono font-black bg-black text-[#F5E6BE]">2026</span>
              </Link>
            </div>

            {/* Main Broadsheet 12-Column Balanced Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 sm:gap-8">
              
              {/* Left Column (Accreditation & Bureau of Assay Dispatch) */}
              <div className={`hidden lg:flex lg:col-span-3 flex-col ${isAr ? 'text-right' : 'text-left'} space-y-2.5 p-3.5 rounded-2xl bg-white/70 dark:bg-white/[0.03] border border-neutral-200 dark:border-gold/25 shadow-sm backdrop-blur-sm`}>
                <div className="flex items-center justify-between gap-2 border-b border-neutral-200 dark:border-gold/20 pb-2">
                  <span className="text-[10px] font-mono font-black uppercase tracking-widest text-[#8B6508] dark:text-gold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
                    {isAr ? 'معتمد من GIA ومختبر دبي' : 'GIA & DCL Certified Assay'}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400 leading-relaxed font-serif">
                  {isAr
                    ? 'المكتب الاستقصائي المعتمد للمجوهرات الراقية، الفحص الطيفي XRF، والتوثيق الحكومي لمعيار 925.'
                    : 'Official GCC luxury jewelry investigative desk, hallmark XRF spectral audit, and retail wire syndications.'}
                </p>
                <div className="flex items-center gap-2 pt-0.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {isAr ? 'بث تحريري مباشر 24/7' : '24/7 LIVE WIRE • 100% XRF'}
                  </span>
                </div>
              </div>

              {/* Center Column: Prestigious Regal Broadsheet Title */}
              <div className="lg:col-span-6 text-center">
                {/* Royal Crest & Broadsheet Filigree */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2.5 max-w-full overflow-hidden">
                  <span className="h-px flex-1 max-w-[30px] sm:max-w-[70px] bg-gradient-to-r from-transparent via-gold to-gold/80" />
                  <span className="whitespace-nowrap text-[9px] sm:text-xs font-mono font-black tracking-[0.16em] sm:tracking-[0.25em] text-[#8B6508] dark:text-gold uppercase flex items-center gap-1.5 flex-shrink-0 select-none">
                    <Crown className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                    <span>{isAr ? 'الجريدة الخليجية المستقلة للمجوهرات الراقية' : 'THE INDEPENDENT GCC LUXURY JOURNAL'}</span>
                  </span>
                  <span className="h-px flex-1 max-w-[30px] sm:max-w-[70px] bg-gradient-to-l from-transparent via-gold to-gold/80" />
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-serif font-black tracking-tight uppercase leading-[1.08] drop-shadow-sm select-none whitespace-nowrap">
                  <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-950 via-neutral-800 to-neutral-700 dark:from-[#FFFDF7] dark:via-[#F9E8B8] dark:to-[#D4AF37]">
                    {isAr ? 'ذا جلف كرونيكل • صحيفة الخليج' : 'The Gulf Chronicle'}
                  </span>
                </h1>
                
                <div className="text-[11px] sm:text-xs font-serif text-[#8B6508] dark:text-gold/90 mt-2 tracking-wider sm:tracking-widest font-bold flex items-center justify-center gap-2">
                  <span>{isAr ? 'صحيفة الخليج اليومية • قسم المجوهرات الفاخرة والمعايير العالمية' : 'Daily Gulf Broadsheet • High Jewellery, Assay Standards & Haute Couture'}</span>
                </div>

                {/* Broadsheet Meta Ribbon */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mt-3 font-mono">
                  <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-white/5 border border-neutral-300 dark:border-white/10 font-bold whitespace-nowrap">Vol. XXXIV No. 10</span>
                  <span className="text-gold/60">•</span>
                  <span className="font-serif whitespace-nowrap">{isAr ? 'دبي • الرياض • أبوظبي • الدوحة • الكويت' : 'Dubai • Riyadh • Abu Dhabi • Doha • Kuwait'}</span>
                  <span className="text-gold/60">•</span>
                  <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold whitespace-nowrap">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    {isAr ? 'بث الوكالات المعتمد' : 'Live Syndicated Wire'}
                  </span>
                </div>
              </div>

              {/* Right Column: Editorial Portal Official Badge + Syndication Partners */}
              <div className={`hidden lg:flex lg:col-span-3 flex-col ${isAr ? 'items-start text-left' : 'items-end text-right'} space-y-2.5`}>
                <Link
                  href="/editorial-portal/"
                  className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/70 bg-gradient-to-r from-[#DFB743] via-[#FCEAA5] to-[#C99E32] text-black shadow-[0_4px_16px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_22px_rgba(212,175,55,0.55)] transition-all duration-300 overflow-hidden group select-none hover:scale-[1.02] active:scale-95"
                  title="Access Omnia Stores Official Editorial Portal (http://localhost:3001/editorial-portal/)"
                >
                  {/* Metallic gold sweep animation */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <Sparkles className="w-3.5 h-3.5 text-black animate-spin" style={{ animationDuration: '6s' }} />
                  <span className="text-xs font-serif font-black tracking-widest uppercase">
                    {isAr ? 'البوابة التحريرية' : 'EDITORIAL PORTAL'}
                  </span>
                  <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono font-black bg-black text-[#F5E6BE] shadow-sm">
                    2026
                  </span>
                </Link>

                <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 font-serif">
                  {isAr ? 'نشر وتغطية بالشراكة مع:' : 'Syndicated In Partnership With:'}
                </span>
                
                <div className="flex flex-wrap justify-end gap-1.5 text-[10px] font-serif font-black text-neutral-800 dark:text-neutral-200">
                  {['GULF NEWS', 'KHALEEJ TIMES', 'VOGUE ARABIA', 'THE NATIONAL'].map((partner) => (
                    <span
                      key={partner}
                      className="border border-neutral-300 dark:border-gold/30 px-2 py-0.5 rounded-md bg-white/80 dark:bg-[#121622] hover:border-gold hover:text-gold transition-colors shadow-2xs tracking-wider"
                    >
                      {partner}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Mobile Bottom Syndication Bar (< lg screens) */}
            <div className="lg:hidden pt-3 border-t border-neutral-200 dark:border-white/10 flex flex-wrap items-center justify-center gap-1.5 text-[9px] font-serif font-bold text-neutral-600 dark:text-neutral-400">
              <span className="uppercase text-[9px] font-mono text-neutral-400 mr-1">{isAr ? 'بالشراكة مع:' : 'Syndicated With:'}</span>
              {['GULF NEWS', 'KHALEEJ TIMES', 'VOGUE ARABIA', 'THE NATIONAL'].map((partner) => (
                <span
                  key={partner}
                  className="border border-neutral-300 dark:border-gold/30 px-2 py-0.5 rounded bg-white/80 dark:bg-white/5 text-[9px] font-mono"
                >
                  {partner}
                </span>
              ))}
            </div>

          </div>
        </header>

        {/* =========================================================================
            ⭐ HIGH-JEWELLERY STORY REELS (Upgraded with 16 Collections, Edge-to-Edge Fill & Glide Controls)
        ========================================================================== */}
        <section className="relative border-b border-neutral-300 dark:border-neutral-800/80 bg-gradient-to-r from-[#FBF9F4] via-[#F6F2EA] to-[#FBF9F4] dark:from-[#080B11] dark:via-[#0F1422] dark:to-[#080B11] py-4 px-3 sm:px-6 lg:px-8 overflow-hidden">
          {/* Left & Right cinematic edge-fade masks */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#FBF9F4] dark:from-[#080B11] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#FBF9F4] dark:from-[#080B11] to-transparent z-10" />

          <div className="w-full max-w-[1760px] mx-auto">
            
            {/* Reels Section Header Bar */}
            <div className="flex items-center justify-between mb-3 px-1 sm:px-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold border border-gold/40 shadow-sm flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-gold animate-spin" style={{ animationDuration: '8s' }} />
                </div>
                <h3 className="text-xs sm:text-sm font-serif font-black uppercase tracking-wider text-neutral-950 dark:text-white flex items-center gap-1.5">
                  <span>{isAr ? 'قصص وكواليس مجوهرات أمنية الحصرية' : 'Omnia High-Jewellery Atelier Stories'}</span>
                </h3>
                <span className="inline-flex px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-gold/15 text-[#8B6508] dark:text-gold border border-gold/30 uppercase">
                  {storyReels.length} DOSSIERS • 4K
                </span>
              </div>

              {/* Glide Navigation Arrows (Desktop + Mobile responsive) */}
              <div className="flex items-center gap-1 sm:gap-1.5">
                <button
                  onClick={() => scrollReels('left')}
                  className="p-1 sm:p-1.5 rounded-full border border-neutral-300 dark:border-gold/30 hover:border-gold hover:text-gold transition-all bg-white dark:bg-[#121622] text-neutral-700 dark:text-neutral-300 shadow-sm hover:scale-105 active:scale-95"
                  title="Previous Stories"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => scrollReels('right')}
                  className="p-1 sm:p-1.5 rounded-full border border-neutral-300 dark:border-gold/30 hover:border-gold hover:text-gold transition-all bg-white dark:bg-[#121622] text-neutral-700 dark:text-neutral-300 shadow-sm hover:scale-105 active:scale-95"
                  title="Next Stories"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Horizontal Reels Track (Fills wide screen, responsive glide) */}
            <div
              ref={reelsScrollRef}
              className="flex items-center justify-start gap-4 sm:gap-6 lg:gap-7 overflow-x-auto scrollbar-none py-2.5 px-3 sm:px-4 scroll-smooth snap-x snap-mandatory"
            >
              {storyReels.map((story, idx) => {
                const microTags: Record<string, string> = {
                  'story-gold': '🔥 SOUK',
                  'story-bridal': '👑 VOGUE',
                  'story-pearls': '🦪 PEARL',
                  'story-diamonds': '💎 PREMIUM',
                  'story-simulants': '💎 HALO',
                  'story-expansion': '✈️ RIYADH',
                  'story-ksa': '✈️ RIYADH',
                  'story-assay': '🔬 DCL 925',
                  'story-dcl': '🔬 DCL 925',
                  'story-bridal-spread': '💎 VAULT',
                  'story-brooches': '✨ PINS',
                  'story-ruby': '🌹 RUBY',
                  'story-emerald': '💚 EMERALD',
                  'story-sapphire': '💙 SAPPHIRE',
                  'story-canary': '💛 CANARY',
                  'story-heirloom': '👑 HEIRLOOM',
                  'story-rose': '🌸 ROSÉ',
                  'story-turquoise': '💠 TURQUOISE',
                  'story-founder': '💎 ATELIER',
                };
                const tagLabel = microTags[story.id] || '✨ REEL';

                return (
                  <div
                    key={story.id}
                    onClick={() => {
                      setActiveStoryIndex(idx);
                      setStorySlideIndex(0);
                    }}
                    className="flex flex-col items-center gap-2 cursor-pointer group flex-shrink-0 select-none snap-start min-w-[78px] sm:min-w-[92px] lg:min-w-[102px] transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    {/* Glowing Dual Concentric Animated Ring */}
                    <div className="relative p-[2.5px] rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#FFF2B2] via-[#E6CA65] to-[#AA8C2C] shadow-md group-hover:shadow-[0_0_22px_rgba(212,175,55,0.65)] group-hover:scale-105 transition-all duration-300">
                      <div className="p-0.5 rounded-full bg-[#FAF7F0] dark:bg-[#080B11]">
                        <div className="w-16 h-16 sm:w-[74px] sm:h-[74px] rounded-full overflow-hidden relative border border-white/40 shadow-inner">
                          <Image
                            src={story.avatar}
                            alt={story.label}
                            fill
                            sizes="(max-width: 640px) 64px, 74px"
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {/* Play overlay on hover */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[0.5px]">
                            <Play className="w-4 h-4 fill-gold text-gold" />
                          </div>
                        </div>
                      </div>

                      {/* Micro Pill Badge */}
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.2 rounded-full text-[8px] font-mono font-black uppercase tracking-wider bg-black/90 text-gold border border-gold/40 shadow-md whitespace-nowrap">
                        {tagLabel}
                      </span>
                    </div>

                    <div className="text-center w-full">
                      <span className="text-[11px] sm:text-xs font-serif font-black text-neutral-900 dark:text-neutral-100 group-hover:text-[#B8860B] dark:group-hover:text-gold transition-colors tracking-tight block truncate">
                        {isAr && (story as any).labelAr ? (story as any).labelAr : story.label}
                      </span>
                      <span className="text-[9px] font-mono text-neutral-400 dark:text-neutral-500 block">
                        {story.slides.length} slides • 4K
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Subtle Carousel Progress & Exploration Hint */}
            <div className="flex items-center justify-between pt-2 px-2 text-[9px] font-mono text-neutral-400 dark:text-neutral-500 border-t border-neutral-200/60 dark:border-white/5 mt-1">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
                <span>{isAr ? 'انقر على أي قصة للمشاهدة الكاملة بدقة 4K' : 'Click any dossier to explore official 4K haute jewellery reels'}</span>
              </span>
              <span className="hidden sm:inline font-bold text-neutral-600 dark:text-neutral-400">
                {isAr ? 'اسحب أو استخدم الأسهم للتنقل بين جميع المجموعات الـ ١٦' : 'Swipe or use glide arrows to explore all 16 collections'}
              </span>
            </div>

          </div>
        </section>

        {/* =========================================================================
            TOP OFFICIAL OMNIA STORES CAMPAIGN BANNER (Full 16:9 Cinema View • All 14 Editions)
        ========================================================================== */}
        <section
          className="w-full max-w-[1780px] mx-auto px-3 sm:px-6 lg:px-8 pt-4 pb-2"
          onMouseEnter={() => setIsLeaderboardPaused(true)}
          onMouseLeave={() => setIsLeaderboardPaused(false)}
        >
          {/* Broadsheet Ad Header & Live Control Bar */}
          <div className="flex flex-wrap items-center justify-between text-[10px] uppercase font-bold tracking-widest text-neutral-500 mb-3 px-1 gap-2.5">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 text-neutral-800 dark:text-neutral-200 font-serif tracking-normal font-black text-xs sm:text-sm">
                <Crown className="w-4 h-4 text-gold flex-shrink-0" />
                <span>OFFICIAL OMNIA STORES CAMPAIGN BILLBOARD • {leaderboardCampaigns.length} EDITIONS</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-600/10 text-red-600 dark:text-red-400 border border-red-600/20 text-[9px] font-mono font-black">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                4K LIVE
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Runway Ambiance Audio Toggle */}
              <button
                onClick={toggleRunwayAudio}
                className={`px-2.5 py-1 rounded-lg border text-[10px] font-mono flex items-center gap-1.5 transition-all shadow-sm ${
                  isRunwayAudioPlaying
                    ? 'bg-gold/20 text-gold border-gold/50 shadow-[0_0_12px_rgba(212,175,55,0.3)]'
                    : 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 border-neutral-300 dark:border-white/10 hover:text-black dark:hover:text-white'
                }`}
                title="Toggle Haute Couture Runway Audio Ambiance"
              >
                {isRunwayAudioPlaying ? (
                  <>
                    <Volume2 className="w-3 h-3 text-gold" />
                    <span className="font-bold">RUNWAY: LIVE</span>
                    <span className="inline-flex items-end gap-0.5 h-2.5">
                      <span className="w-0.5 h-2 bg-gold animate-pulse" />
                      <span className="w-0.5 h-3 bg-gold animate-pulse" style={{ animationDelay: '150ms' }} />
                      <span className="w-0.5 h-1.5 bg-gold animate-pulse" style={{ animationDelay: '300ms' }} />
                    </span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3 h-3 text-neutral-400" />
                    <span>RUNWAY: OFF</span>
                  </>
                )}
              </button>

              {/* Hotspots Toggle */}
              <button
                onClick={() => setShowBillboardHotspots(!showBillboardHotspots)}
                className={`px-2.5 py-1 rounded-lg border text-[10px] font-mono flex items-center gap-1.5 transition-all shadow-sm ${
                  showBillboardHotspots
                    ? 'bg-neutral-900 text-gold border-gold/40 dark:bg-gold/15'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 border-neutral-300 dark:border-white/10'
                }`}
                title="Toggle Interactive Shop The Look Hotspot Pins"
              >
                <Sparkles className="w-3 h-3 text-gold" />
                <span>{showBillboardHotspots ? 'PINS: ON' : 'PINS: OFF'}</span>
              </button>

              {/* 4K Cinema Fullscreen Button */}
              <button
                onClick={() => setIsCinemaFullscreen(true)}
                className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-gold border border-neutral-300 dark:border-white/10 text-[10px] font-mono flex items-center gap-1.5 transition-colors"
                title="Open in Fullscreen 4K Cinema View"
              >
                <Maximize2 className="w-3 h-3" />
                <span className="hidden sm:inline">4K CINEMA</span>
              </button>

              {/* View Switcher: Cinema Spotlight vs Show All 13 Grid */}
              <div className="flex items-center rounded-lg p-0.5 bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-white/10 text-[10px] font-mono">
                <button
                  onClick={() => setBannerViewMode('spotlight')}
                  className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                    bannerViewMode === 'spotlight'
                      ? 'bg-gold text-black font-black shadow'
                      : 'text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <Film className="w-3 h-3" />
                  <span>Spotlight</span>
                </button>
                <button
                  onClick={() => setBannerViewMode('grid')}
                  className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 ${
                    bannerViewMode === 'grid'
                      ? 'bg-gold text-black font-black shadow'
                      : 'text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <LayoutGrid className="w-3 h-3" />
                  <span>Grid ({leaderboardCampaigns.length})</span>
                </button>
              </div>

              {bannerViewMode === 'spotlight' && (
                <div className="flex items-center gap-1.5 ml-1">
                  <button
                    onClick={() => setIsLeaderboardPaused(!isLeaderboardPaused)}
                    className="p-1 rounded-md text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
                    title={isLeaderboardPaused ? 'Resume Auto-Change' : 'Pause Auto-Change'}
                  >
                    {isLeaderboardPaused ? <Play className="w-3 h-3 text-gold" /> : <Pause className="w-3 h-3" />}
                  </button>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        setLeaderboardIndex((prev) =>
                          prev === 0 ? leaderboardCampaigns.length - 1 : prev - 1
                        )
                      }
                      className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
                      title="Previous Campaign"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono text-gold font-bold text-[11px] px-1">
                      {leaderboardIndex + 1}/{leaderboardCampaigns.length}
                    </span>
                    <button
                      onClick={() =>
                        setLeaderboardIndex((prev) => (prev + 1) % leaderboardCampaigns.length)
                      }
                      className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
                      title="Next Campaign"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* INTERACTIVE GEMSTONE VAULT PALETTE BAR (Mobile / Tablet Horizontal Glide) */}
          {bannerViewMode === 'spotlight' && (
            <div className="lg:hidden mb-3 p-1.5 rounded-2xl bg-gradient-to-r from-neutral-100 via-neutral-50 to-neutral-100 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900 border border-neutral-200 dark:border-gold/30 shadow-md flex items-center gap-1.5 overflow-x-auto scrollbar-none w-full">
              <span className="text-[9px] font-mono font-black uppercase tracking-widest text-gold px-2.5 flex items-center gap-1 flex-shrink-0">
                <Sparkles className="w-3 h-3 text-gold animate-spin-slow" />
                <span>VAULT GEMS:</span>
              </span>
              {[
                { name: 'Imperial Diamond', nameAr: 'شلال الألماس', color: '#D4AF37', bannerId: 'banner-imperial-diamond-cascades' },
                { name: 'Marquise Floral', nameAr: 'الماركيز الزهري', color: '#E6CA65', bannerId: 'banner-marquise-floral-empress' },
                { name: 'Pear-Cut Halo', nameAr: 'هالو الكمثرى', color: '#FFF2B2', bannerId: 'banner-pear-halo-sovereign' },
                { name: 'Midnight Gala', nameAr: 'سهرة منتصف الليل', color: '#AA8C2C', bannerId: 'banner-midnight-nocturne-couture' },
                { name: 'Sovereign Ruby', nameAr: 'ياقوت ملكي', color: '#E0115F', bannerId: 'banner-ruby-statements' },
                { name: 'Gulf Pearl', nameAr: 'لؤلؤ الخليج', color: '#F7E7CE', bannerId: 'banner-wear-statement-sets' },
                { name: 'Canary Yellow', nameAr: 'ياقوت أصفر', color: '#F5C518', bannerId: 'banner-statement-edit' },
              ].map((gem) => {
                const targetIdx = leaderboardCampaigns.findIndex((c) => c.id === gem.bannerId);
                const isSelected = targetIdx === leaderboardIndex;
                return (
                  <button
                    key={gem.name}
                    onClick={() => {
                      if (targetIdx !== -1) setLeaderboardIndex(targetIdx);
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-serif transition-all whitespace-nowrap flex items-center gap-1.5 flex-shrink-0 ${
                      isSelected
                        ? 'bg-neutral-950 dark:bg-black text-gold font-bold shadow-md ring-2 ring-gold/60 scale-105'
                        : 'bg-white/80 dark:bg-neutral-900/60 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-sm border border-white/40"
                      style={{ backgroundColor: gem.color }}
                    />
                    <span className="font-medium text-[11px]">{gem.name}</span>
                    <span className="text-[10px] text-neutral-400 font-sans hidden sm:inline">({gem.nameAr})</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* VIEW MODE 1: CINEMA SPOTLIGHT (Flagship Widescreen Triptych Presentation: Left Flank + Center Billboard + Right Flank) */}
          {bannerViewMode === 'spotlight' && (
            <div className="w-full">
              {/* 12-COLUMN FLAGSHIP TRIPTYCH GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 xl:gap-5 items-start">
                
                {/* ========================================================
                    LEFT FLANK WING (3 Columns on Large Screens)
                    - Atelier Gemological Dossier & Craft Specs
                    - Gemstone Vault Interactive Vertical Selector
                    - Municipal Dubai Assay Seal & Warranty Badges
                ========================================================= */}
                <aside className="hidden lg:flex lg:col-span-3 flex-col gap-3.5 sticky top-20">
                  
                  {/* Card 1: Atelier Gemological Dossier */}
                  <div className="p-3.5 xl:p-4 rounded-2xl bg-white/95 dark:bg-[#0c1017]/90 border border-neutral-200/90 dark:border-gold/30 shadow-xl backdrop-blur-md relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-28 h-28 bg-gold/5 rounded-full blur-2xl pointer-events-none group-hover:bg-gold/10 transition-colors" />
                    
                    <div className="flex items-center justify-between border-b border-neutral-200/80 dark:border-white/10 pb-2.5 mb-3">
                      <div className="flex items-center gap-1.5">
                        <Crown className="w-4 h-4 text-gold flex-shrink-0" />
                        <span className="text-[11px] font-serif font-black tracking-widest uppercase text-neutral-900 dark:text-gold">
                          {isAr ? 'مواصفات المشغل الفاخر' : 'ATELIER DOSSIER'}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-500 font-bold px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10">
                        {leaderboardIndex + 1}/{leaderboardCampaigns.length}
                      </span>
                    </div>

                    <div className="mb-3">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 block mb-0.5">
                        {isAr ? 'الحملة النشطة' : 'ACTIVE CAMPAIGN'}
                      </span>
                      <h4 className="text-xs xl:text-sm font-serif font-black text-neutral-900 dark:text-white leading-tight line-clamp-1">
                        {activeBillboardCampaign.title}
                      </h4>
                      <p className="text-[10px] font-mono text-gold mt-0.5">
                        {activeBillboardCampaign.tag} • {activeBillboardCampaign.gemstone || 'D-Color Flawless'}
                      </p>
                    </div>

                    {/* Technical Specs Rows */}
                    <div className="space-y-1.5 text-[10px] font-mono">
                      <div className="flex items-center justify-between p-1.5 rounded-lg bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200/60 dark:border-white/5">
                        <span className="text-neutral-500">{isAr ? 'المعدن الأساسي' : 'Base Metal'}</span>
                        <span className="font-bold text-neutral-800 dark:text-neutral-200">Solid 925 Silver</span>
                      </div>
                      <div className="flex items-center justify-between p-1.5 rounded-lg bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200/60 dark:border-white/5">
                        <span className="text-neutral-500">{isAr ? 'طبقة الطلاء' : 'Plating Shield'}</span>
                        <span className="font-bold text-gold">0.5µm Triple Rhodium</span>
                      </div>
                      <div className="flex items-center justify-between p-1.5 rounded-lg bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200/60 dark:border-white/5">
                        <span className="text-neutral-500">{isAr ? 'درجة الأحجار' : 'Stone Grade'}</span>
                        <span className="font-bold text-neutral-800 dark:text-neutral-200">Premium Simulants (VVS1)</span>
                      </div>
                      <div className="flex items-center justify-between p-1.5 rounded-lg bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200/60 dark:border-white/5">
                        <span className="text-neutral-500">{isAr ? 'معامل التشتت الضوئي' : 'Dispersion Fire'}</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400">0.044 B-Index</span>
                      </div>
                      <div className="flex items-center justify-between p-1.5 rounded-lg bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200/60 dark:border-white/5">
                        <span className="text-neutral-500">{isAr ? 'سلامة البشرة' : 'Skin Safety'}</span>
                        <span className="font-bold text-neutral-800 dark:text-neutral-200">100% Nickel-Free</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-neutral-200/70 dark:border-white/10 flex items-center justify-between text-[9px] font-mono text-neutral-400">
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        DCL Assay Verified
                      </span>
                      <span>Reserve No. 23</span>
                    </div>
                  </div>

                </aside>

                {/* ========================================================
                    CENTER BILLBOARD STAGE (6 Columns on Large Screens)
                    - 16:9 Billboard Cinematic Canvas
                    - Dynamic Cross-Dissolve + Hotspots
                    - 4 Accreditation Hallmark Badges
                    - All 17 Campaigns Filmstrip Ribbon
                ========================================================= */}
                <main className="lg:col-span-6 w-full flex flex-col gap-3">
                  
                  {/* Full 16:9 Aspect Frame Matching Native 1024x576 Banner Dimensions */}
                  <div className="relative aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-neutral-300 dark:border-gold/40 shadow-2xl bg-black group/banner">
                
                {/* Clean Layered Stack: Pure Full-Rectangle Photographic Dissolve */}
                {leaderboardCampaigns.map((camp, idx) => {
                  const isActive = idx === leaderboardIndex;
                  const currentHotspots = campaignHotspots[camp.id] || [];

                  return (
                    <div
                      key={camp.id}
                      className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                        isActive
                          ? 'opacity-100 z-10 scale-100 pointer-events-auto filter-none'
                          : 'opacity-0 z-0 scale-[1.02] pointer-events-none filter blur-[3px]'
                      }`}
                    >
                      {/* Clickable Full-Banner Link to Omnia Stores Collection */}
                      <a
                        href={camp.ctaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block relative w-full h-full cursor-pointer"
                        title={`Explore ${camp.title} on Omnia Stores`}
                      >
                        {/* 100% Uncropped Full-View Rectangular Banner Image */}
                        <Image
                          src={camp.image}
                          alt={camp.title}
                          fill
                          priority={idx < 2}
                          sizes="(max-width: 1024px) 100vw, 1024px"
                          className="object-contain object-center transition-opacity duration-700"
                        />
                      </a>

                      {/* Subtle Ambient Golden Light Sheen on Transition */}
                      <div
                        key={`beam-${leaderboardIndex}`}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/15 to-transparent pointer-events-none animate-golden-beam"
                      />

                      {/* INTERACTIVE SHOP THE LOOK HOTSPOT PINS LAYER */}
                      {isActive && showBillboardHotspots && currentHotspots.length > 0 && (
                        <div className="absolute inset-0 z-25 pointer-events-none">
                          {currentHotspots.map((hs) => {
                            const isHotspotActive = activeBillboardHotspotId === hs.id;
                            return (
                              <div
                                key={hs.id}
                                className="absolute pointer-events-auto group/pin"
                                style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setActiveBillboardHotspotId(isHotspotActive ? null : hs.id);
                                }}
                                onMouseEnter={() => setActiveBillboardHotspotId(hs.id)}
                              >
                                {/* Pulsing Concentric Gold Diamond Pin */}
                                <div className="relative -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                                  <span className="absolute -inset-2.5 rounded-full bg-gold/50 animate-ping opacity-80" />
                                  <span className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/85 border-2 border-gold text-gold shadow-[0_0_15px_rgba(212,175,55,0.7)] backdrop-blur-md hover:scale-125 transition-transform">
                                    <Sparkles className="w-3.5 h-3.5 fill-gold animate-spin-slow" />
                                  </span>
                                  <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-1.5 py-0.2 bg-black/90 text-[8px] font-mono text-gold rounded border border-gold/40 shadow whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity pointer-events-none">
                                    {hs.category}
                                  </span>
                                </div>

                                {/* Glassmorphic Tooltip Card */}
                                {isHotspotActive && (
                                  <div
                                    className="absolute z-40 w-64 sm:w-72 p-3.5 rounded-2xl bg-black/95 backdrop-blur-xl border border-gold/60 shadow-[0_10px_35px_rgba(0,0,0,0.9)] text-white animate-fade-in pointer-events-auto"
                                    style={{
                                      left: hs.x > 50 ? 'auto' : '100%',
                                      right: hs.x > 50 ? '100%' : 'auto',
                                      top: hs.y > 60 ? 'auto' : '0',
                                      bottom: hs.y > 60 ? '0' : 'auto',
                                      margin: '0 10px',
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                                      <span className="px-2 py-0.5 rounded-full bg-gold/20 text-gold border border-gold/30 text-[9px] font-mono font-bold uppercase">
                                        {hs.category}
                                      </span>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setActiveBillboardHotspotId(null);
                                        }}
                                        className="p-0.5 rounded hover:bg-white/10 text-neutral-400 hover:text-white"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </div>

                                    <h4 className="text-xs font-serif font-bold text-neutral-100 leading-snug">
                                      {language === 'ar' ? hs.titleAr : hs.title}
                                    </h4>
                                    <p className="text-[10px] text-neutral-400 font-mono mt-0.5">
                                      {hs.metal}
                                    </p>

                                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
                                      <div>
                                        <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-mono block">
                                          Omnia Price
                                        </span>
                                        <span className="text-sm font-bold text-gold font-mono">
                                          {formatPrice(hs.priceAed)}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-1.5">
                                        <a
                                          href={`https://wa.me/971501234567?text=${encodeURIComponent(`Hello Omnia Private Stylist, I am inquiring about the ${hs.title} (${formatPrice(hs.priceAed)}) featured in The Gulf Chronicle campaign.`)}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="p-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/40 transition-colors"
                                          title="Consult VIP Stylist on WhatsApp"
                                        >
                                          <WhatsAppIcon className="w-3.5 h-3.5" />
                                        </a>
                                        <a
                                          href={hs.ctaUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="px-3 py-1.5 rounded-lg bg-gold hover:bg-gold-light text-black font-extrabold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow transition-colors"
                                        >
                                          <span>Shop</span>
                                          <ArrowRight className="w-3 h-3" />
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Top Bar Floating Badges: Straight, Responsive & Face-Clear */}
                      <div className="absolute top-3 sm:top-5 left-3 sm:left-6 right-3 sm:right-6 z-20 flex items-center justify-between gap-3 pointer-events-none">
                        <div className="flex items-center gap-2 pointer-events-auto">
                          <span className="whitespace-nowrap px-3 py-1 rounded-full bg-black/85 backdrop-blur-md text-gold border border-gold/40 text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg select-none">
                            <Crown className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                            <span>{camp.tag}</span>
                          </span>
                        </div>

                        <div className="pointer-events-auto flex items-center gap-2 flex-shrink-0">
                          {/* VIP Promo Code Button */}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleCopyCode(camp.code, 'leaderboard');
                            }}
                            className="whitespace-nowrap px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-gold hover:bg-gold-light text-black text-[11px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-xl active:scale-95 select-none"
                            title="Click to copy VIP code"
                          >
                            {copiedLeaderboardCode ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-black flex-shrink-0" />
                                <span>{isAr ? 'تم النسخ!' : 'COPIED!'}</span>
                              </>
                            ) : (
                              <>
                                <Percent className="w-3.5 h-3.5 flex-shrink-0" />
                                <span>{camp.code} ({isAr ? 'خصم 15%' : '15% OFF'})</span>
                              </>
                            )}
                          </button>

                          {/* Fullscreen Button */}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setIsCinemaFullscreen(true);
                            }}
                            className="p-1.5 sm:p-2 rounded-full bg-black/80 hover:bg-black text-gold border border-gold/40 shadow-xl transition-transform hover:scale-110 active:scale-95 flex-shrink-0"
                            title="Full Screen 4K Cinema"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Floating Previous & Next Navigation Arrows */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setLeaderboardIndex((prev) =>
                            prev === 0 ? leaderboardCampaigns.length - 1 : prev - 1
                          );
                        }}
                        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black text-gold border border-gold/40 backdrop-blur-md transition-all shadow-xl hover:scale-110 active:scale-95"
                        aria-label="Previous Banner"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setLeaderboardIndex((prev) => (prev + 1) % leaderboardCampaigns.length);
                        }}
                        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black text-gold border border-gold/40 backdrop-blur-md transition-all shadow-xl hover:scale-110 active:scale-95"
                        aria-label="Next Banner"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>

                      {/* Bottom Floating Bar: Perk Pill & Action Buttons (Stylist + Shop) */}
                      <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-6 right-3 sm:right-6 z-20 flex items-center justify-between gap-3 pointer-events-none">
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/85 backdrop-blur-md text-gold text-xs font-mono font-bold border border-gold/30 shadow-md pointer-events-auto whitespace-nowrap max-w-[200px] lg:max-w-xs truncate">
                          <Truck className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                          <span className="truncate">{camp.perk}</span>
                        </div>

                        <div className="pointer-events-auto ml-auto flex items-center gap-2 flex-shrink-0">
                          {/* VIP Stylist WhatsApp Desk */}
                          <a
                            href={`https://wa.me/971501234567?text=${encodeURIComponent(`Hello Omnia Stylist, I am viewing the ${camp.title} campaign in The Gulf Chronicle and would like styling advice.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="whitespace-nowrap px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-emerald-600/95 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-xl hover:scale-105 active:scale-95 select-none"
                            title="Chat with Private Jewelry Concierge"
                          >
                            <WhatsAppIcon className="w-3.5 h-3.5 text-white flex-shrink-0" />
                            <span>{isAr ? 'مستشار واتساب' : 'VIP Stylist'}</span>
                          </a>

                          {/* Direct Collection Shop Button */}
                          <a
                            href={camp.ctaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="whitespace-nowrap px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-gold hover:bg-gold-light text-black font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-xl hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] active:scale-95 select-none"
                          >
                            <span>{isAr ? 'تسوق الطقم' : camp.ctaText}</span>
                            <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Live Golden Hairline Progress Countdown Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-30 overflow-hidden">
                  <div
                    key={`banner-progress-${leaderboardIndex}-${isLeaderboardPaused ? 'paused' : 'running'}`}
                    className={`h-full bg-gradient-to-r from-gold via-amber-300 to-gold transition-all ${
                      isLeaderboardPaused ? 'opacity-40' : ''
                    }`}
                    style={{
                      animation: isLeaderboardPaused ? 'none' : 'heroProgress 5.0s linear forwards',
                      width: isLeaderboardPaused ? '50%' : undefined,
                    }}
                  />
                </div>
              </div>

              {/* HIGH JEWELLERY ACCREDITATION HALLMARK RIBBON */}
              <div className="mt-1 grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
                <div className="p-2 sm:p-2.5 rounded-xl bg-neutral-100/90 dark:bg-neutral-900/80 border border-neutral-200 dark:border-white/10 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
                  <div className="leading-tight min-w-0">
                    <span className="text-[10px] font-bold text-neutral-800 dark:text-neutral-200 block truncate">DCL ASSAY STAMP</span>
                    <span className="text-[8px] sm:text-[9px] text-neutral-500 font-mono truncate block">Solid 925 Silver</span>
                  </div>
                </div>
                <div className="p-2 sm:p-2.5 rounded-xl bg-neutral-100/90 dark:bg-neutral-900/80 border border-neutral-200 dark:border-white/10 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-gold flex-shrink-0" />
                  <div className="leading-tight min-w-0">
                    <span className="text-[10px] font-bold text-neutral-800 dark:text-neutral-200 block truncate">PREMIUM SIMULANTS</span>
                    <span className="text-[8px] sm:text-[9px] text-neutral-500 font-mono truncate block">0.044 Dispersion Fire</span>
                  </div>
                </div>
                <div className="p-2 sm:p-2.5 rounded-xl bg-neutral-100/90 dark:bg-neutral-900/80 border border-neutral-200 dark:border-white/10 flex items-center gap-2">
                  <Award className="w-4 h-4 text-gold flex-shrink-0" />
                  <div className="leading-tight min-w-0">
                    <span className="text-[10px] font-bold text-neutral-800 dark:text-neutral-200 block truncate">3-YEAR WARRANTY</span>
                    <span className="text-[8px] sm:text-[9px] text-neutral-500 font-mono truncate block">Triple Rhodium Anti-Tarnish</span>
                  </div>
                </div>
                <div className="p-2 sm:p-2.5 rounded-xl bg-neutral-100/90 dark:bg-neutral-900/80 border border-neutral-200 dark:border-white/10 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gold flex-shrink-0" />
                  <div className="leading-tight min-w-0">
                    <span className="text-[10px] font-bold text-neutral-800 dark:text-neutral-200 block truncate">GCC NEXT-DAY</span>
                    <span className="text-[8px] sm:text-[9px] text-neutral-500 font-mono truncate block">White-Glove Insured Vault</span>
                  </div>
                </div>
              </div>

              {/* Interactive Filmstrip Ribbon: Shows ALL Campaigns for Direct Selection */}
              <div className="mt-1 p-2 rounded-2xl bg-neutral-100 dark:bg-neutral-900/90 border border-neutral-200 dark:border-white/10 flex items-center gap-2 overflow-x-auto scrollbar-none w-full">
                <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-500 px-2 flex-shrink-0 hidden md:inline">
                  ALL {leaderboardCampaigns.length} CAMPAIGNS:
                </span>
                {leaderboardCampaigns.map((camp, i) => {
                  const isSelected = i === leaderboardIndex;
                  return (
                    <button
                      key={camp.id}
                      onClick={() => setLeaderboardIndex(i)}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-serif transition-all whitespace-nowrap flex items-center gap-1.5 flex-shrink-0 ${
                        isSelected
                          ? 'bg-gold text-black font-black shadow-md scale-102 ring-2 ring-gold/40'
                          : 'bg-white/80 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-white/15'
                      }`}
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0 shadow-sm"
                        style={{ backgroundColor: camp.accent || '#D4AF37' }}
                      />
                      <span className="font-mono text-[9px] opacity-70">
                        {i < 9 ? `0${i + 1}` : i + 1}
                      </span>
                      <span className="truncate max-w-[120px] sm:max-w-none text-[11px]">{camp.title}</span>
                    </button>
                  );
                })}
              </div>
            </main>

            {/* ========================================================
                RIGHT FLANK WING (3 Columns on Large Screens)
                - "Shop The Runway Look" Live Breakdown (Worn by Model)
                - Complete Suite VIP Privilege (15% OFF)
                - 1-on-1 Haute Couture Stylist Concierge
            ========================================================= */}
            <aside className="hidden lg:flex lg:col-span-3 flex-col gap-3.5 sticky top-20">
              
              {/* Top View Selector Tabs: Runway Look vs Commercial Store Ad */}
              <div className="flex items-center gap-1 p-1 rounded-2xl bg-neutral-100 dark:bg-[#0c1017] border border-neutral-200 dark:border-gold/30 shadow-md text-[10px] font-mono">
                <button
                  onClick={() => setRightWingTab('storeAd')}
                  className={`flex-1 py-1.5 px-2 rounded-xl font-bold uppercase transition-all flex items-center justify-center gap-1.5 ${
                    rightWingTab === 'storeAd'
                      ? 'bg-neutral-950 text-gold dark:bg-gold dark:text-black shadow-md'
                      : 'text-neutral-500 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-emerald-500 animate-spin-slow" />
                  <span>{isAr ? 'إعلان المتجر (-15%)' : 'STORE AD (-15%)'}</span>
                </button>
                <button
                  onClick={() => setRightWingTab('runway')}
                  className={`flex-1 py-1.5 px-2 rounded-xl font-bold uppercase transition-all flex items-center justify-center gap-1.5 ${
                    rightWingTab === 'runway'
                      ? 'bg-neutral-950 text-gold dark:bg-gold dark:text-black shadow-md'
                      : 'text-neutral-500 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <ShoppingBag className="w-3 h-3" />
                  <span>{isAr ? 'إطلالة العرض' : 'RUNWAY SUITE'}</span>
                </button>
              </div>

              {/* View 1: Commercial Skyscraper Store Ad (2 cols x 3 rows with green discount badges) */}
              {rightWingTab === 'storeAd' && (
                <OmniaStoresSkyscraperAd compact={true} />
              )}

              {/* View 2: Shop The Runway Look Breakdown */}
              {rightWingTab === 'runway' && (
                <div className="p-3.5 xl:p-4 rounded-2xl bg-white/95 dark:bg-[#0c1017]/90 border border-neutral-200/90 dark:border-gold/30 shadow-xl backdrop-blur-md">
                  <div className="flex items-center justify-between border-b border-neutral-200/80 dark:border-white/10 pb-2 mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <ShoppingBag className="w-4 h-4 text-gold flex-shrink-0" />
                      <span className="text-[11px] font-serif font-black tracking-widest uppercase text-neutral-900 dark:text-gold">
                        {isAr ? 'إطلالة العرض المتكاملة' : 'SHOP RUNWAY LOOK'}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-neutral-400">
                      {activeBillboardHotspots.length} {activeBillboardHotspots.length === 1 ? 'Piece' : 'Pieces'}
                    </span>
                  </div>

                  {/* Pieces List */}
                  <div className="space-y-2 max-h-[290px] overflow-y-auto pr-0.5 scrollbar-thin">
                    {activeBillboardHotspots.map((piece) => {
                      const isHighlighted = activeBillboardHotspotId === piece.id;
                      return (
                        <div
                          key={piece.id}
                          onMouseEnter={() => setActiveBillboardHotspotId(piece.id)}
                          onMouseLeave={() => setActiveBillboardHotspotId(null)}
                          className={`p-2.5 rounded-xl border transition-all text-left group ${
                            isHighlighted
                              ? 'bg-gold/10 dark:bg-gold/15 border-gold shadow-md'
                              : 'bg-neutral-50/80 dark:bg-white/[0.02] border-neutral-200/70 dark:border-white/5 hover:border-gold/40'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-gold px-1.5 py-0.5 rounded bg-gold/15">
                              {piece.category}
                            </span>
                            <span className="text-[11px] font-mono font-bold text-neutral-900 dark:text-neutral-100">
                              {formatPrice(piece.priceAed)}
                            </span>
                          </div>
                          <h5 className="text-[11px] font-serif font-bold text-neutral-900 dark:text-white line-clamp-1 group-hover:text-gold transition-colors">
                            {isAr ? piece.titleAr : piece.title}
                          </h5>
                          <p className="text-[9px] font-mono text-neutral-500 line-clamp-1 mt-0.5">
                            {piece.metal}
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-[8px] font-mono text-neutral-400">
                              SAR {piece.priceSar}
                            </span>
                            <a
                              href={piece.ctaUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider text-gold hover:text-white group-hover:underline"
                            >
                              <span>Acquire</span>
                              <ArrowRight className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

            </aside>

          </div>

          {/* ========================================================
              MOBILE & TABLET COLLAPSIBLE FEATURES (< lg Screens)
              Rendered neatly beneath the billboard for full accessibility
          ========================================================= */}
          <div className="lg:hidden mt-4 space-y-3">
            {/* Mobile Shop The Look Breakdown */}
            <div className="p-3.5 rounded-2xl bg-white/95 dark:bg-[#0c1017]/90 border border-neutral-200 dark:border-gold/30 shadow-md">
              <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-neutral-200 dark:border-white/10">
                <span className="text-xs font-serif font-black text-neutral-900 dark:text-gold flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5 text-gold" />
                  <span>{isAr ? 'قطع إطلالة العرض' : 'Pieces Featured on Model'}</span>
                </span>
                <span className="text-[10px] font-mono text-neutral-500">
                  {activeBillboardHotspots.length} {activeBillboardHotspots.length === 1 ? 'Piece' : 'Pieces'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeBillboardHotspots.map((piece) => (
                  <div
                    key={`mobile-${piece.id}`}
                    className="p-2.5 rounded-xl bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/5 flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <span className="text-[8px] font-mono uppercase text-gold block truncate">
                        {piece.category}
                      </span>
                      <span className="text-[11px] font-serif font-bold text-neutral-900 dark:text-neutral-100 block truncate">
                        {isAr ? piece.titleAr : piece.title}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-gold">
                        {formatPrice(piece.priceAed)}
                      </span>
                    </div>
                    <a
                      href={piece.ctaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-gold text-black text-[9px] font-bold uppercase font-mono flex-shrink-0"
                    >
                      Shop
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Atelier Gemological Specs Accordion */}
            <div className="p-3.5 rounded-2xl bg-white/95 dark:bg-[#0c1017]/90 border border-neutral-200 dark:border-white/10 shadow-md flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0" />
                <span className="font-bold text-neutral-800 dark:text-neutral-200">
                  Solid 925 Silver • 0.5µm Rhodium • VVS1 Simulants • 100% Nickel-Free
                </span>
              </div>
              <a
                href={`https://wa.me/971501234567?text=${encodeURIComponent(`Hello Omnia Stylist, I am viewing the ${activeBillboardCampaign.title} campaign.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[10px]"
              >
                <WhatsAppIcon className="w-3 h-3 text-white" />
                <span>{isAr ? 'مستشار واتساب' : 'VIP Stylist'}</span>
              </a>
            </div>
          </div>
        </div>
      )}

          {/* VIEW MODE 2: SHOW ALL VIEW (Widescreen High-Fashion Grid of ALL Banners) */}
          {bannerViewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto pt-2">
              {leaderboardCampaigns.map((camp) => (
                <div
                  key={camp.id}
                  className="relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-neutral-300 dark:border-gold/30 bg-black shadow-xl group hover:border-gold transition-all duration-300"
                >
                  <a
                    href={camp.ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative aspect-[16/9] w-full overflow-hidden"
                  >
                    <Image
                      src={camp.image}
                      alt={camp.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain object-center transition-transform duration-500"
                    />

                    {/* Top Tag & Code */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
                      <span className="whitespace-nowrap px-2.5 py-0.5 rounded-full bg-black/85 backdrop-blur-md text-gold border border-gold/40 text-[10px] font-mono font-bold uppercase pointer-events-auto">
                        {camp.tag}
                      </span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleCopyCode(camp.code, 'banner');
                        }}
                        className="whitespace-nowrap px-2.5 py-0.5 rounded-full bg-gold hover:bg-gold-light text-black text-[10px] font-mono font-black uppercase tracking-wider transition-colors shadow flex items-center gap-1 pointer-events-auto"
                        title="Copy promo code"
                      >
                        {copiedBannerCode === camp.code ? (
                          <>
                            <Check className="w-3 h-3 text-black" />
                            <span>{isAr ? 'تم النسخ!' : 'COPIED!'}</span>
                          </>
                        ) : (
                          <span>{camp.code} ({isAr ? 'خصم 15%' : '15% OFF'})</span>
                        )}
                      </button>
                    </div>

                    {/* Bottom Floating Bar */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                      <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-gold text-[10px] font-mono font-bold flex items-center gap-1.5 border border-gold/30">
                        <Truck className="w-3 h-3 text-gold" />
                        <span className="truncate max-w-[200px]">{camp.perk}</span>
                      </span>

                      <span className="px-3 py-1 rounded-lg bg-gold text-black font-extrabold text-[11px] uppercase tracking-wider shadow flex items-center gap-1 group-hover:bg-gold-light transition-colors">
                        <span>Shop</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* 4K CINEMA FULLSCREEN LIGHTBOX MODAL */}
          {isCinemaFullscreen && (
            <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 animate-fade-in">
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-gold" />
                  <span className="text-white font-serif font-bold text-sm sm:text-base">
                    Omnia Haute Couture 4K Cinema • {leaderboardCampaigns[leaderboardIndex].title}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-gold/20 text-gold text-[10px] font-mono border border-gold/40">
                    {leaderboardCampaigns[leaderboardIndex].tag}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleRunwayAudio}
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gold text-xs font-mono flex items-center gap-1.5 transition-colors"
                  >
                    {isRunwayAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    <span>{isRunwayAudioPlaying ? 'Mute Ambiance' : 'Play Runway Audio'}</span>
                  </button>

                  <button
                    onClick={() => setIsCinemaFullscreen(false)}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    title="Close Fullscreen"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Main 4K Image in Center with Hotspots */}
              <div className="relative flex-1 my-4 flex items-center justify-center overflow-hidden">
                <div className="relative aspect-[16/9] w-full max-w-6xl h-auto max-h-[80vh] rounded-2xl overflow-hidden border border-gold/40 shadow-2xl">
                  <Image
                    src={leaderboardCampaigns[leaderboardIndex].image}
                    alt={leaderboardCampaigns[leaderboardIndex].title}
                    fill
                    className="object-contain"
                  />

                  {/* Hotspots in Cinema Mode */}
                  {campaignHotspots[leaderboardCampaigns[leaderboardIndex].id]?.map((hs) => (
                    <div
                      key={hs.id}
                      className="absolute group/cinema-pin"
                      style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                    >
                      <div className="relative -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                        <span className="absolute -inset-3 rounded-full bg-gold/50 animate-ping" />
                        <span className="relative flex items-center justify-center w-8 h-8 rounded-full bg-black/90 border-2 border-gold text-gold shadow-2xl">
                          <Sparkles className="w-4 h-4 fill-gold" />
                        </span>
                      </div>
                      <div className="absolute left-10 top-0 w-60 p-2.5 rounded-xl bg-black/90 border border-gold/50 text-white shadow-2xl pointer-events-auto hidden group-hover/cinema-pin:block">
                        <span className="text-[9px] font-mono text-gold uppercase">{hs.category}</span>
                        <p className="text-xs font-bold">{language === 'ar' ? hs.titleAr : hs.title}</p>
                        <p className="text-xs text-gold font-mono font-bold mt-1">{formatPrice(hs.priceAed)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Controls */}
              <div className="flex flex-wrap items-center justify-between border-t border-white/10 pt-3 gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setLeaderboardIndex((prev) =>
                        prev === 0 ? leaderboardCampaigns.length - 1 : prev - 1
                      )
                    }
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>
                  <span className="text-gold font-mono text-xs font-bold">
                    {leaderboardIndex + 1} of {leaderboardCampaigns.length}
                  </span>
                  <button
                    onClick={() =>
                      setLeaderboardIndex((prev) => (prev + 1) % leaderboardCampaigns.length)
                    }
                    className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs flex items-center gap-1"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/971501234567?text=${encodeURIComponent(`Hello Omnia Stylist, I am viewing the ${leaderboardCampaigns[leaderboardIndex].title} in 4K Cinema mode.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>WhatsApp VIP Stylist</span>
                  </a>
                  <a
                    href={leaderboardCampaigns[leaderboardIndex].ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-gold hover:bg-gold-light text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow"
                  >
                    <span>Shop Collection Suite</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* =========================================================================
            4. LIVE BREAKING WIRE MARQUEE (Continuous Smooth Movement)
        ========================================================================== */}
        <section className="bg-red-700 text-white py-1.5 px-4 text-xs font-medium flex items-center overflow-hidden border-b border-red-800">
          <div className="max-w-7xl mx-auto w-full flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-black/30 px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-widest flex-shrink-0 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              BREAKING WIRE
            </div>

            {/* Continuous Marquee Animation */}
            <div className="overflow-hidden flex-1 relative">
              <div className="animate-marquee-fast flex items-center space-x-12 whitespace-nowrap font-serif text-sm tracking-wide">
                <span>{breakingHeadlines[0]}</span>
                <span className="text-red-300">•</span>
                <span>{breakingHeadlines[1]}</span>
                <span className="text-red-300">•</span>
                <span>{breakingHeadlines[2]}</span>
                <span className="text-red-300">•</span>
                <span>{breakingHeadlines[3]}</span>
                <span className="text-red-300">•</span>
                <span>{breakingHeadlines[4]}</span>
                <span className="text-red-300">•</span>
                <span>{breakingHeadlines[0]}</span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 flex-shrink-0 text-[11px] opacity-80 font-mono">
              <Clock className="w-3 h-3" /> LIVE STREAM
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. DIRECT PREMIUM ANIMATED EDITORIAL PORTAL TAB BAR
        ========================================================================== */}
        <nav id="editorial-desk" className="border-b border-gold/30 backdrop-blur-2xl bg-[#FAF7F0]/95 dark:bg-[#080B12]/95 sticky top-16 z-30 shadow-[0_10px_35px_rgba(0,0,0,0.12)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.4)] transition-all scroll-mt-20">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between overflow-x-auto py-2.5 sm:py-3 gap-2 sm:gap-3 scrollbar-none">
              <div className="flex items-center space-x-1.5 sm:space-x-2.5 rtl:space-x-reverse whitespace-nowrap">
                {[
                  {
                    id: 'all',
                    label: isAr ? '👑 جميع الافتتاحيات' : '👑 All Stories',
                    badge: 'LIVE',
                    badgeColor: 'bg-emerald-600 text-white',
                  },
                  {
                    id: 'ruby',
                    label: isAr ? '🌹 فخامة الياقوت' : '🌹 Ruby Statements',
                    badge: 'NEW',
                    badgeColor: 'bg-gradient-to-r from-rose-600 to-red-600 text-white animate-pulse',
                  },
                  {
                    id: 'bridal',
                    label: isAr ? '👰 مجوهرات العرائس' : '👰 Bridal High Jewellery',
                    badge: 'HOT',
                    badgeColor: 'bg-gradient-to-r from-amber-500 to-amber-600 text-black font-extrabold',
                  },
                  {
                    id: 'gemstones',
                    label: isAr ? '💎 الزمرد والياقوت الأزرق' : '💎 Royal Gemstones',
                  },
                  {
                    id: 'dispatches',
                    label: isAr ? '📰 تقارير الخليج المعتمَدة' : '📰 GCC Press Wire',
                    badge: '1,002',
                    badgeColor: 'bg-neutral-800 text-gold dark:bg-gold/20 dark:text-gold border border-gold/30',
                  },
                  {
                    id: 'vlogs',
                    label: isAr ? '🎬 تلفزيون وفيديوهات أمنية' : '🎬 Omnia TV & Reels',
                    badge: '4K',
                    badgeColor: 'bg-red-600 text-white',
                  },
                  {
                    id: 'archive',
                    label: isAr ? '📖 الأرشيف الصحفي (+1000)' : '📖 Archival Intelligence',
                  },
                ].map((desk) => (
                  <button
                    key={desk.id}
                    onClick={() => {
                      setActiveDesk(desk.id);
                      if (desk.id === 'vlogs') {
                        const el = document.getElementById('social-media-desk');
                        if (el) {
                          const top = el.getBoundingClientRect().top + window.pageYOffset - 120;
                          window.scrollTo({ top, behavior: 'smooth' });
                        }
                      } else if (desk.id === 'archive' || desk.id === 'dispatches') {
                        const el = document.getElementById('archival-repository');
                        if (el) {
                          const top = el.getBoundingClientRect().top + window.pageYOffset - 120;
                          window.scrollTo({ top, behavior: 'smooth' });
                        }
                      } else {
                        const el = document.getElementById('main-editorial-wire');
                        if (el) {
                          const top = el.getBoundingClientRect().top + window.pageYOffset - 120;
                          window.scrollTo({ top, behavior: 'smooth' });
                        }
                      }
                    }}
                    className={`relative inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 transform active:scale-95 whitespace-nowrap cursor-pointer ${
                      activeDesk === desk.id
                        ? desk.id === 'ruby'
                          ? 'bg-gradient-to-r from-rose-700 via-red-600 to-rose-700 text-white shadow-[0_0_25px_rgba(225,29,72,0.55)] border border-rose-400 scale-[1.03] ring-2 ring-rose-500/30 font-black'
                          : 'bg-gradient-to-r from-gold via-amber-300 to-gold text-black shadow-[0_0_25px_rgba(212,175,55,0.45)] border border-amber-300 scale-[1.03] ring-2 ring-gold/30 font-black'
                        : 'bg-white/80 dark:bg-white/[0.04] text-neutral-800 dark:text-neutral-200 border border-neutral-300/80 dark:border-white/10 hover:border-gold hover:text-gold hover:bg-white dark:hover:bg-white/[0.08] hover:scale-[1.02] shadow-sm'
                    }`}
                  >
                    <span>{desk.label}</span>
                    {desk.badge && (
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[9px] font-mono font-black uppercase tracking-wider shadow-sm ${
                          desk.badgeColor || 'bg-black/20 text-current'
                        }`}
                      >
                        {desk.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
                {/* Official Editorial Portal Badge / Button (Interactive VIP Dossier Trigger) */}
                <Link
                  href="/editorial-portal/"
                  className="relative flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-gold/70 bg-gradient-to-r from-[#DFB743] via-[#FCEAA5] to-[#C99E32] text-black font-bold shadow-[0_2px_12px_rgba(212,175,55,0.35)] select-none hover:scale-105 active:scale-95 transition-all overflow-hidden group cursor-pointer"
                  title="Open Official Omnia Stores Editorial Portal"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  <Sparkles className="w-3.5 h-3.5 text-black animate-spin" style={{ animationDuration: '8s' }} />
                  <span className="text-[10px] sm:text-xs font-serif font-black uppercase tracking-[0.14em] whitespace-nowrap">
                    {isAr ? 'البوابة التحريرية' : 'EDITORIAL PORTAL'}
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.2 rounded-full text-[8px] sm:text-[9px] font-mono font-black bg-black text-[#F5E6BE] shadow-sm uppercase tracking-wider">
                    2026
                  </span>
                </Link>

                <a
                  href="https://youtube.com/@omniastores?si=DY0jsLaCSNS3i1XZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF0000] hover:bg-[#CC0000] text-white text-xs font-bold hover:shadow-[0_0_15px_rgba(255,0,0,0.4)] transition-all"
                  title="Official Omnia Stores 4K YouTube Broadcasts"
                >
                  <YouTubeIcon className="w-3.5 h-3.5" />
                  <span>@omniastores</span>
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* =========================================================================
            6. MAIN BROADSHEET FRONT PAGE (Khaleej Times / Gulf News Hero Layout)
        ========================================================================== */}
        <section id="main-editorial-wire" className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-neutral-300 dark:border-neutral-800 pb-10">
            
            {/* -------------------------------------------------------------
                LEFT 8 COLS: PRIMARY INVESTIGATIVE LEAD STORY + AUDIO PLAYER
            -------------------------------------------------------------- */}
            <article className="lg:col-span-8 flex flex-col space-y-4 pr-0 lg:pr-6 lg:border-r border-neutral-300 dark:border-neutral-800">
              
              {/* Category Kicker & Bookmark Trigger */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-widest text-red-700 dark:text-red-400 flex items-center gap-1.5">
                  <Flame className="w-4 h-4 fill-current animate-bounce" />
                  {isAr ? 'تقرير استقصائي حصري • مكتب دبي للمجوهرات الفاخرة' : 'EXCLUSIVE INVESTIGATIVE REPORT • DUBAI LUXURY DESK'}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-neutral-500 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    {isAr ? '٣,٨٤٢ يقرؤون الآن' : '3,842 Reading Now'}
                  </span>
                  <button
                    onClick={(e) => toggleBookmark(leadStory.id, e)}
                    className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                    title={bookmarkedIds.includes(leadStory.id) ? (isAr ? 'إزالة من المحفوظات' : 'Remove Bookmark') : (isAr ? 'حفظ التحقيق' : 'Bookmark Investigation')}
                  >
                    <Bookmark
                      className={`w-4 h-4 transition-colors ${
                        bookmarkedIds.includes(leadStory.id)
                          ? 'fill-gold text-gold'
                          : 'text-neutral-500 hover:text-black dark:hover:text-white'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Grand Serif Headline */}
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight text-neutral-950 dark:text-white leading-[1.1] hover:text-[#B8860B] dark:hover:text-gold transition-colors cursor-pointer"
                onClick={() => setActiveModalArticle(leadStory)}
              >
                {isAr && leadStory.titleAr ? leadStory.titleAr : leadStory.title}
              </h2>

              {/* Subtitle / Standfirst */}
              <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 font-serif italic leading-relaxed">
                {isAr && leadStory.excerptAr ? leadStory.excerptAr : leadStory.excerpt}
              </p>

              {/* ANIMATED LIVE AUDIO NARRATION PLAYER */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-[#F4EFE6] via-white to-[#F4EFE6] dark:from-[#111520] dark:via-[#161D2C] dark:to-[#111520] border border-neutral-300 dark:border-gold/30 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="w-10 h-10 rounded-full bg-neutral-950 dark:bg-gold text-white dark:text-black flex items-center justify-center flex-shrink-0 shadow-md hover:scale-105 transition-transform"
                    aria-label={isPlayingAudio ? 'Pause Narration' : 'Play Narration'}
                  >
                    {isPlayingAudio ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B6508] dark:text-gold flex items-center gap-1">
                        <Volume2 className="w-3 h-3" /> {isAr ? 'الاستماع إلى النشرة الصوتية' : 'Listen To Audio Wire'}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500">
                        {formatAudioTime(audioCurrentTime)} / {formatAudioTime(audioTotalDuration)}
                      </span>
                    </div>
                    <div className="text-xs font-serif font-semibold text-neutral-950 dark:text-white">
                      {isAr ? 'بصوت نور الصباح، خبيرة الأحجار • استوديو جلف كرونيكل' : 'Narrated by Nour Al-Sabah, G.G. • Gulf Chronicle Studio'}
                    </div>
                  </div>
                </div>

                {/* Equalizer Soundwave Animation */}
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex items-center gap-1 h-5 px-2">
                    <span className={`w-1 rounded-full bg-[#B8860B] dark:bg-gold ${isPlayingAudio ? 'animate-soundwave-1' : 'h-1.5'}`} />
                    <span className={`w-1 rounded-full bg-[#B8860B] dark:bg-gold ${isPlayingAudio ? 'animate-soundwave-2' : 'h-2.5'}`} />
                    <span className={`w-1 rounded-full bg-[#B8860B] dark:bg-gold ${isPlayingAudio ? 'animate-soundwave-3' : 'h-4'}`} />
                    <span className={`w-1 rounded-full bg-[#B8860B] dark:bg-gold ${isPlayingAudio ? 'animate-soundwave-4' : 'h-2'}`} />
                    <span className={`w-1 rounded-full bg-[#B8860B] dark:bg-gold ${isPlayingAudio ? 'animate-soundwave-5' : 'h-3'}`} />
                  </div>

                  {/* Speed Multiplier Pill */}
                  <button
                    onClick={() =>
                      setAudioPlaybackSpeed((prev) => (prev === 1 ? 1.25 : prev === 1.25 ? 1.5 : 1))
                    }
                    className="px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-[10px] font-mono font-bold text-neutral-800 dark:text-neutral-200 hover:bg-gold hover:text-black transition-colors"
                  >
                    {audioPlaybackSpeed}x
                  </button>
                </div>
              </div>

              {/* Hero Broad Image with Automatic Photo Change, Caption & Shimmer */}
              <div
                className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border-2 border-neutral-300 dark:border-gold/40 group cursor-pointer shadow-xl bg-black animate-shimmer-sweep"
                onMouseEnter={() => setIsLeadPhotoPaused(true)}
                onMouseLeave={() => setIsLeadPhotoPaused(false)}
                onClick={() => setActiveModalArticle(leadStory)}
              >
                {/* Auto-Changing Photo Layer Stack */}
                {leadStoryGallery.map((item, idx) => {
                  const isActive = idx === leadPhotoIndex;
                  return (
                    <div
                      key={item.id}
                      className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                        isActive
                          ? 'opacity-100 z-10 scale-100 filter-none'
                          : 'opacity-0 z-0 scale-105 pointer-events-none filter blur-[2px]'
                      }`}
                    >
                      <Image
                        src={item.src}
                        alt={isAr ? item.titleAr : item.title}
                        fill
                        priority={idx === 0}
                        className="object-cover object-center group-hover:scale-103 transition-transform duration-700"
                      />
                    </div>
                  );
                })}

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 z-20 pointer-events-none" />

                {/* Top Floating Controls: Live Auto-Change Indicator & Navigation */}
                <div className="absolute top-3 left-4 right-4 z-30 flex items-center justify-between text-xs pointer-events-none">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-gold text-[10px] font-mono font-bold flex items-center gap-1.5 border border-gold/40 shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                      <span>{isLeadPhotoPaused ? '⏸ PAUSED' : '● AUTO-CHANGING'}</span>
                    </span>
                    <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-black/70 text-white text-[10px] font-mono border border-white/20 backdrop-blur-md">
                      {isAr ? leadStoryGallery[leadPhotoIndex].lookAr : leadStoryGallery[leadPhotoIndex].look}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 pointer-events-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLeadPhotoIndex((prev) => (prev === 0 ? leadStoryGallery.length - 1 : prev - 1));
                      }}
                      className="p-1.5 rounded-full bg-black/70 hover:bg-black text-gold hover:text-white border border-gold/40 backdrop-blur-md transition-all shadow-md hover:scale-110 active:scale-95"
                      title="Previous Photo"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2.5 py-0.5 rounded-full bg-black/80 text-gold font-mono font-bold text-[10px] border border-gold/40 shadow">
                      {leadPhotoIndex + 1} / {leadStoryGallery.length}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLeadPhotoIndex((prev) => (prev + 1) % leadStoryGallery.length);
                      }}
                      className="p-1.5 rounded-full bg-black/70 hover:bg-black text-gold hover:text-white border border-gold/40 backdrop-blur-md transition-all shadow-md hover:scale-110 active:scale-95"
                      title="Next Photo"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Bottom Floating Bar */}
                <div className="absolute bottom-3 left-4 right-4 z-30 text-white flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-serif italic drop-shadow text-neutral-200">
                    {isAr ? 'التصوير: استوديو مجوهرات الخليج الفاخرة • دبي' : 'Photography: Arabian Luxury Editorial Studio • Dubai Atelier'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {/* Dots indicator */}
                    <div className="flex items-center gap-1 mr-2 pointer-events-auto">
                      {leadStoryGallery.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setLeadPhotoIndex(dotIdx);
                          }}
                          className={`h-1.5 rounded-full transition-all ${
                            dotIdx === leadPhotoIndex ? 'w-5 bg-gold' : 'w-1.5 bg-white/40 hover:bg-white/80'
                          }`}
                          aria-label={`Go to slide ${dotIdx + 1}`}
                        />
                      ))}
                    </div>
                    <span className="bg-black/80 px-2.5 py-0.5 rounded-full text-[10px] font-mono border border-gold/40 text-gold font-bold shadow">
                      {isAr ? 'تغطية فائقة الدقة 4K' : 'High Resolution Feature'}
                    </span>
                  </div>
                </div>

                {/* Progress bar along the bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-30 overflow-hidden">
                  <div
                    key={`lead-photo-progress-${leadPhotoIndex}-${isLeadPhotoPaused ? 'paused' : 'running'}`}
                    className={`h-full bg-gradient-to-r from-gold via-amber-300 to-gold transition-all ${
                      isLeadPhotoPaused ? 'opacity-40' : ''
                    }`}
                    style={{
                      animation: isLeadPhotoPaused ? 'none' : 'heroProgress 4.5s linear forwards',
                      width: isLeadPhotoPaused ? '50%' : undefined,
                    }}
                  />
                </div>
              </div>

              {/* Journalist Byline & Lab Credentials */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-neutral-100 dark:bg-[#111520] border border-neutral-200 dark:border-neutral-800 text-xs shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden relative border border-gold/40 flex-shrink-0">
                    <Image
                      src={leadStory.author?.avatar || leadStory.coverImage}
                      alt={leadStory.author?.name || 'Staff Editor'}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-serif font-bold text-neutral-950 dark:text-white text-sm">
                      {isAr ? `بقلم: ${leadStory.author?.name || 'فريق تحرير أمنية ستورز'}` : `By ${leadStory.author?.name || 'Omnia Stores Editorial Studio'}`}
                    </div>
                    <div className="text-neutral-600 dark:text-neutral-400 text-[11px]">
                      {isAr ? 'خبير مجوهرات معتمد لدى GIA ومكتب معايير الفحص' : (leadStory.author?.credentials || 'GIA Gemologist & Assay Standards Desk')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                  <span className="flex items-center gap-1 font-semibold text-neutral-800 dark:text-neutral-200">
                    <Clock className="w-3.5 h-3.5 text-[#B8860B] dark:text-gold" /> {isAr && leadStory.readTimeAr ? leadStory.readTimeAr : leadStory.readTime}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> {isAr ? '١٤٠ ساعة فحص مخبري معتمد' : '140h Lab Assay Verified'}
                  </span>
                </div>
              </div>

              {/* Executive Briefing Bullet Callout Box */}
              <div className="p-4 rounded-xl bg-[#F4EFE6] dark:bg-[#151A26] border-l-4 border-[#B8860B] dark:border-gold space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#8B6508] dark:text-gold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} /> {isAr ? 'موجز تنفيذي: أهم نتائج التحقيق' : 'Executive Briefing: Key Takeaways'}
                </div>
                <ul className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-300 space-y-1.5 list-disc list-inside font-serif">
                  <li>{isAr && leadStory.aiSummary.takeaway1Ar ? leadStory.aiSummary.takeaway1Ar : leadStory.aiSummary.takeaway1}</li>
                  <li>{isAr && leadStory.aiSummary.takeaway2Ar ? leadStory.aiSummary.takeaway2Ar : leadStory.aiSummary.takeaway2}</li>
                  <li>{isAr && leadStory.aiSummary.takeaway3Ar ? leadStory.aiSummary.takeaway3Ar : leadStory.aiSummary.takeaway3}</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setActiveModalArticle(leadStory)}
                  className="px-5 py-2.5 rounded-lg bg-neutral-950 hover:bg-neutral-800 dark:bg-gold dark:hover:bg-gold-light text-white dark:text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
                >
                  <FileText className="w-4 h-4" /> {isAr ? 'قراءة التحقيق الاستقصائي كاملاً' : 'Read Full Broadsheet Story'}
                </button>
                <Link
                  href={`/trending/${leadStory.slug}`}
                  className="px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:border-[#B8860B] dark:hover:border-gold text-neutral-800 dark:text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  {isAr ? 'رابط النشرة التحريرية الموحدة' : 'Syndicated Wire Link'} <ArrowRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
                </Link>
                {leadStory.featuredProduct && (
                  <a
                    href={leadStory.featuredProduct.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto inline-flex items-center gap-1.5 text-xs font-bold text-[#8B6508] dark:text-gold hover:underline"
                  >
                    <span>{isAr ? `عرض طقم البوتيك الفاخر (${formatPrice(leadStory.featuredProduct.priceAed, leadStory.featuredProduct.priceSar)})` : `View Imperial Suite (AED ${leadStory.featuredProduct.priceAed})`}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {/* ========================================================
                  EDITORIAL ATELIER DOSSIER & COMPANION INVESTIGATIONS
                  Fills the blank space with high-value broadsheet content
              ========================================================= */}
              <div className="pt-4 border-t border-neutral-200 dark:border-white/10 space-y-4">
                
                {/* 1. Featured Imperial Suite Spotlight Showcase */}
                {leadStory.featuredProduct && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-neutral-50 via-white to-neutral-50 dark:from-[#0E121B] dark:via-[#131926] dark:to-[#0E121B] border-2 border-gold/40 shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gold/5 rounded-full blur-2xl pointer-events-none group-hover:bg-gold/10 transition-colors" />
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {/* Product Image Frame */}
                      <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden border border-gold/40 flex-shrink-0 bg-black shadow-md">
                        <Image
                          src={leadStory.featuredProduct.image}
                          alt={leadStory.featuredProduct.title}
                          fill
                          className="object-contain p-1 group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[8px] font-mono font-black bg-gold text-black shadow-xs">
                          {isAr ? 'طقم الغلاف' : 'FEATURED'}
                        </span>
                      </div>

                      {/* Product Details & Hallmarks */}
                      <div className="flex-1 min-w-0 space-y-2 text-center sm:text-left">
                        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-1.5">
                          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-gold flex items-center gap-1">
                            <Crown className="w-3 h-3 text-gold" />
                            <span>{isAr ? 'طقم الغلاف الملكي المعتمد' : 'HAUTE JOAILLERIE ATELIER SUITE'}</span>
                          </span>
                          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                            {isAr ? 'متوفر للتسليم الفوري' : 'In Stock • 24H Dispatch'}
                          </span>
                        </div>

                        <h4 className="text-sm sm:text-base font-serif font-black text-neutral-950 dark:text-white leading-snug line-clamp-2">
                          {isAr && leadStory.featuredProduct.titleAr ? leadStory.featuredProduct.titleAr : leadStory.featuredProduct.title}
                        </h4>

                        {/* Hallmarks Badges */}
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 text-[9px] font-mono text-neutral-600 dark:text-neutral-400">
                          <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 font-bold">
                            Solid 925 Core
                          </span>
                          <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 font-bold">
                            0.5µm Triple Rhodium
                          </span>
                          <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 font-bold">
                            VVS1 Simulant Fire
                          </span>
                          <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 font-bold text-emerald-600 dark:text-emerald-400">
                            100% Nickel-Free
                          </span>
                        </div>

                        {/* Pricing & Direct Acquire CTA */}
                        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2 pt-1 border-t border-neutral-200/80 dark:border-white/10">
                          <div className="leading-tight">
                            <span className="text-[9px] font-mono text-neutral-400 uppercase block">
                              {isAr ? 'سعر البوتيك الرسمي' : 'Official Boutique Price'}
                            </span>
                            <span className="text-base font-black text-gold font-mono">
                              {formatPrice(leadStory.featuredProduct.priceAed, leadStory.featuredProduct.priceSar)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <a
                              href={`https://wa.me/971501234567?text=${encodeURIComponent(`Hello Omnia Private Stylist, I am inquiring about the ${leadStory.featuredProduct.title} featured in The Gulf Chronicle.`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/40 text-[10px] font-mono font-bold flex items-center gap-1.5 transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <WhatsAppIcon className="w-3.5 h-3.5" />
                              <span>{isAr ? 'واتساب' : 'VIP Stylist'}</span>
                            </a>
                            <a
                              href={leadStory.featuredProduct.storeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-1.5 rounded-xl bg-gold hover:bg-gold-light text-black font-extrabold text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5 shadow transition-all hover:scale-105 active:scale-95"
                            >
                              <span>{isAr ? 'اقتناء الطقم' : 'Acquire Suite'}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Three Lab Benchmark Assurance Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="p-3 rounded-xl bg-neutral-100/80 dark:bg-[#111624] border border-neutral-200 dark:border-white/10 flex items-center gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-gold flex-shrink-0" />
                    <div className="leading-tight min-w-0">
                      <span className="text-[10px] font-bold text-neutral-800 dark:text-neutral-200 block truncate">
                        {isAr ? 'نقاء الفضة 92.5%' : '92.5% PURE SILVER'}
                      </span>
                      <span className="text-[9px] text-neutral-500 font-mono truncate block mt-0.5">
                        {isAr ? 'فحص مقياس XRF المعتمد' : 'XRF Spectrometry Verified'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-100/80 dark:bg-[#111624] border border-neutral-200 dark:border-white/10 flex items-center gap-2.5">
                    <Sparkles className="w-5 h-5 text-gold flex-shrink-0" />
                    <div className="leading-tight min-w-0">
                      <span className="text-[10px] font-bold text-neutral-800 dark:text-neutral-200 block truncate">
                        {isAr ? 'تشتت ضوئي 0.044' : '0.044 DISPERSION FIRE'}
                      </span>
                      <span className="text-[9px] text-neutral-500 font-mono truncate block mt-0.5">
                        {isAr ? 'بريق يحاكي الألماس النقي' : 'Hearts & Arrows 8x Cut'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-neutral-100/80 dark:bg-[#111624] border border-neutral-200 dark:border-white/10 flex items-center gap-2.5">
                    <Award className="w-5 h-5 text-gold flex-shrink-0" />
                    <div className="leading-tight min-w-0">
                      <span className="text-[10px] font-bold text-neutral-800 dark:text-neutral-200 block truncate">
                        {isAr ? 'ضمان رسمي 3 سنوات' : '3-YEAR WARRANTY'}
                      </span>
                      <span className="text-[9px] text-neutral-500 font-mono truncate block mt-0.5">
                        {isAr ? 'حماية الروديوم من الأكسدة' : 'Triple Rhodium Shield'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3. Next Two Companion Investigative Dispatches (2-Column Grid) */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-serif font-black uppercase tracking-wider text-neutral-900 dark:text-white flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-red-500" />
                      <span>{isAr ? 'تحقيقات وتقارير تحريرية مرتبطة' : 'Related Investigative Wire Dispatches'}</span>
                    </span>
                    <span className="text-[9px] font-mono text-neutral-400">
                      {isAr ? 'تغطيات خاصة' : 'Special Syndication'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {displayedArticles.slice(4, 6).map((story) => (
                      <div
                        key={story.id}
                        onClick={() => setActiveModalArticle(story)}
                        className="p-3 rounded-xl bg-white dark:bg-[#101420] border border-neutral-200 dark:border-neutral-800 hover:border-gold/50 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between text-[9px] font-mono text-neutral-400 mb-1.5">
                            <span className="text-gold font-bold">{getPublicationLabel(story.publication, isAr)}</span>
                            <span>{story.readTime}</span>
                          </div>

                          <div className="flex gap-2.5 items-start">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-neutral-200 dark:border-white/10 flex-shrink-0">
                              <Image
                                src={story.coverImage}
                                alt={story.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <div className="min-w-0">
                              <h5 className="text-xs font-serif font-bold text-neutral-900 dark:text-white group-hover:text-gold transition-colors line-clamp-2 leading-snug">
                                {isAr && story.titleAr ? story.titleAr : story.title}
                              </h5>
                              <p className="text-[10px] text-neutral-500 font-serif line-clamp-2 mt-1">
                                {isAr && story.excerptAr ? story.excerptAr : story.excerpt}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-2.5 pt-2 border-t border-neutral-100 dark:border-white/5 flex items-center justify-between text-[10px]">
                          <span className="text-neutral-400 font-serif italic truncate">
                            {story.author?.name || 'Staff Editor'}
                          </span>
                          <span className="text-gold font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform font-mono">
                            <span>{isAr ? 'قراءة' : 'Read'}</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </article>

            {/* -------------------------------------------------------------
                RIGHT 4 COLS: SECONDARY 3-STORY BREAKING STACK + ANIMATED AD BOX
            -------------------------------------------------------------- */}
            <aside className="lg:col-span-4 flex flex-col space-y-6">
              
              {/* Editorial Portal Official Side Emblem Card */}
              <Link
                href="/editorial-portal/"
                className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-[#FAF7F0] via-white to-gold/10 dark:from-[#0E121B] dark:via-[#111624] dark:to-gold/10 border border-gold/40 shadow-sm flex items-center justify-between gap-3 hover:border-gold hover:shadow-md transition-all group"
                title="Access Omnia Stores Official Editorial Portal"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-gold/20 border border-gold/50 shadow-[0_0_10px_rgba(212,175,55,0.3)] group-hover:scale-110 transition-transform">
                    <Sparkles className="w-4 h-4 text-gold animate-spin" style={{ animationDuration: '8s' }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-serif font-black tracking-wider uppercase text-neutral-950 dark:text-gold group-hover:text-gold transition-colors">
                        {isAr ? 'البوابة التحريرية المعتمدة' : 'EDITORIAL PORTAL'}
                      </span>
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] font-mono font-black bg-gold text-black shadow-sm">
                        2026
                      </span>
                    </div>
                    <p className="text-[10px] text-neutral-500 font-serif">
                      {isAr ? 'تغطيات حصرية • معايير مختبر دبي المركزي' : 'Exclusive Syndication • DCL Assay Verified'}
                    </p>
                  </div>
                </div>
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
              </Link>

              <div className="border-b-2 border-neutral-900 dark:border-gold pb-2 flex items-center justify-between">
                <h3 className="font-serif font-black text-sm uppercase tracking-wider text-neutral-950 dark:text-white flex items-center gap-2">
                  <Flame className="w-4 h-4 text-red-600" /> {isAr ? 'أهم الأخبار العاجلة في الخليج العربي' : 'Top Breaking In The GCC'}
                </h3>
                <span className="text-[10px] font-mono text-neutral-500">{isAr ? 'مكتب البث المباشر' : 'Live Desk'}</span>
              </div>

              <div className="divide-y divide-neutral-200 dark:divide-neutral-800 space-y-4">
                {secondaryStack.map((story, idx) => (
                  <div
                    key={story.id}
                    onClick={() => setActiveModalArticle(story)}
                    className="pt-4 first:pt-0 group cursor-pointer space-y-2"
                  >
                    <div className="flex items-center justify-between text-[10px] text-neutral-500 uppercase tracking-wider font-semibold">
                      <span className="text-[#8B6508] dark:text-gold font-bold">
                        {getPublicationLabel(story.publication, isAr)}
                      </span>
                      <span>{isAr ? (idx === 0 ? 'منذ 45 دقيقة' : idx === 1 ? 'منذ ساعتين' : 'منذ 4 ساعات') : (idx === 0 ? '45m ago' : idx === 1 ? '2h ago' : '4h ago')}</span>
                    </div>

                    <div className="grid grid-cols-12 gap-3 items-center">
                      <div className="col-span-8 space-y-1">
                        <h4 className="font-serif font-bold text-sm text-neutral-950 dark:text-white group-hover:text-[#B8860B] dark:group-hover:text-gold transition-colors leading-snug line-clamp-2">
                          {isAr && story.titleAr ? story.titleAr : story.title}
                        </h4>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 font-serif">
                          {isAr && story.excerptAr ? story.excerptAr : story.excerpt}
                        </p>
                      </div>
                      <div className="col-span-4 relative aspect-[4/3] rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm">
                        <Image
                          src={story.coverImage}
                          alt={story.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
                      <span className="italic font-serif">{isAr ? `بقلم: ${story.author?.name || 'محرري الصحيفة'}` : `By ${story.author?.name || 'Staff Editor'}`}</span>
                      <span className="text-[#8B6508] dark:text-gold font-medium group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        {isAr ? 'قراءة' : 'Read'} <ArrowRight className={`w-3 h-3 ${isAr ? 'rotate-180' : ''}`} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* ANIMATED 300x420 SIDEBAR ADVERT BOX WITH AUTO-SLIDING MODEL SLIDES */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-[#F4EFE6] via-[#EAE1D1] to-[#F4EFE6] dark:from-[#111520] dark:via-[#182030] dark:to-[#111520] border-2 border-[#B8860B]/40 dark:border-gold/40 shadow-xl space-y-3.5 relative overflow-hidden animate-shimmer-sweep">
                
                {/* Header Tag + Ticking Countdown */}
                <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-widest text-[#8B6508] dark:text-gold">
                  <span className="flex items-center gap-1">
                    <Crown className="w-3.5 h-3.5 animate-bounce" /> {sidebarAdSlides[sidebarAdIndex]?.tag}
                  </span>
                  <span className="font-mono bg-red-600 text-white px-2 py-0.5 rounded shadow-sm">
                    {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                </div>

                {/* Full 16:9 Banner Photo Container (Zero Cropping - Shows ALL 4 SIDES Completely) */}
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-neutral-300 dark:border-gold/30 shadow-md group bg-black">
                  <a
                    href={sidebarAdSlides[sidebarAdIndex]?.ctaUrl || 'https://omniastores.com/collections/luxury-sets'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative w-full h-full cursor-pointer"
                    title={sidebarAdSlides[sidebarAdIndex]?.headline}
                  >
                    {/* Uncropped Full-View 16:9 Image - Shows Top, Bottom, Left & Right completely */}
                    <Image
                      src={sidebarAdSlides[sidebarAdIndex]?.image || '/banners/the-statement-jewellery-edit.jpg'}
                      alt={sidebarAdSlides[sidebarAdIndex]?.headline || 'Model'}
                      fill
                      sizes="(max-width: 480px) 100vw, 360px"
                      className="object-contain object-center transition-all duration-500"
                    />
                  </a>

                  {/* Slide Indicators: active counter pill */}
                  <div className="absolute top-2 right-2 flex items-center gap-1 z-10">
                    <span className="px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md text-gold text-[9px] font-mono font-bold border border-gold/30">
                      {sidebarAdIndex + 1} / {sidebarAdSlides.length}
                    </span>
                  </div>
                </div>

                {/* Clean Product Details below the photo (Unobstructed Artwork) */}
                <div className="space-y-0.5 pt-0.5">
                  <div className="text-xs font-serif font-black text-neutral-900 dark:text-white leading-tight truncate">
                    {sidebarAdSlides[sidebarAdIndex]?.headline}
                  </div>
                  <div className="text-[10px] text-[#8B6508] dark:text-gold font-bold truncate">
                    {sidebarAdSlides[sidebarAdIndex]?.offer}
                  </div>
                </div>

                {/* Copy Coupon Box */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/80 dark:bg-black/60 border border-neutral-300 dark:border-neutral-700 text-xs">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-neutral-500 block font-semibold">
                      VIP Promo Code:
                    </span>
                    <span className="font-mono font-black text-neutral-950 dark:text-white tracking-wider">
                      {sidebarAdSlides[sidebarAdIndex]?.code}
                    </span>
                  </div>
                  <button
                    onClick={() =>
                      handleCopyCode(sidebarAdSlides[sidebarAdIndex]?.code || 'DUBAI15', 'sidebar')
                    }
                    className="px-2.5 py-1 rounded bg-[#B8860B] dark:bg-gold text-black font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 hover:opacity-90 shadow-sm"
                  >
                    {copiedSidebarCode ? <Check className="w-3 h-3 text-emerald-950" /> : <Copy className="w-3 h-3" />}
                    {copiedSidebarCode ? 'Copied' : 'Copy'}
                  </button>
                </div>

                {/* CTA Link */}
                <a
                  href="https://omniastores.com/collections/luxury-sets"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center w-full py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 dark:bg-gold dark:hover:bg-gold-light text-white dark:text-black font-bold text-xs uppercase tracking-wider shadow-md transition-all"
                >
                  Order With 24h Express Dispatch ↗
                </a>

              </div>

            </aside>

          </div>

        </section>

        {/* =========================================================================
            GEMOLOGICAL OPTICAL DISPERSION & SPARKLE LAB
        ========================================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#111520] border border-neutral-300 dark:border-gold/30 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-[#8B6508] dark:text-gold text-xs font-semibold uppercase tracking-widest">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Gemology Interactive Lab • Optical Verification</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-black text-neutral-950 dark:text-white tracking-tight">
                  Optical Dispersion: Premium Simulated Diamond vs. Mined Diamond
                </h3>

                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-serif leading-relaxed">
                  Compare the optical fire, refractive brilliance, and elemental alloy shielding under certified Dubai gemological laboratory testing.
                </p>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => setGemCompareMode('simulated')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      gemCompareMode === 'simulated'
                        ? 'bg-neutral-950 text-white dark:bg-gold dark:text-black shadow-md'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    Premium Simulated Diamond
                  </button>
                  <button
                    onClick={() => setGemCompareMode('mined')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      gemCompareMode === 'mined'
                        ? 'bg-neutral-950 text-white dark:bg-gold dark:text-black shadow-md'
                        : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                    }`}
                  >
                    Traditional Mined Diamond
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-black/40 border border-neutral-200 dark:border-neutral-800">
                    <span className="text-[10px] text-neutral-500 uppercase block">Refractive Index</span>
                    <span className="font-mono font-bold text-sm text-neutral-950 dark:text-white">
                      {gemCompareMode === 'simulated' ? '2.15 RI' : '2.42 RI'}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-black/40 border border-neutral-200 dark:border-neutral-800">
                    <span className="text-[10px] text-neutral-500 uppercase block">Fire Dispersion</span>
                    <span className="font-mono font-bold text-sm text-emerald-600 dark:text-emerald-400">
                      {gemCompareMode === 'simulated' ? '0.060 (Higher)' : '0.044 (Standard)'}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-black/40 border border-neutral-200 dark:border-neutral-800">
                    <span className="text-[10px] text-neutral-500 uppercase block">Alloy Base</span>
                    <span className="font-mono font-bold text-sm text-neutral-950 dark:text-white">
                      {gemCompareMode === 'simulated' ? '925 Solid Silver' : '18K White Gold'}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-neutral-50 dark:bg-black/40 border border-neutral-200 dark:border-neutral-800">
                    <span className="text-[10px] text-neutral-500 uppercase block">Average Suite</span>
                    <span className="font-mono font-bold text-sm text-[#8B6508] dark:text-gold">
                      {gemCompareMode === 'simulated' ? 'AED 1,250' : 'AED 28,000+'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col items-center justify-center p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-[#0E121B] dark:to-[#171E2D] border border-neutral-300 dark:border-gold/30 text-center relative overflow-hidden group">
                <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[792/1024] mb-4 rounded-2xl overflow-hidden shadow-2xl border-2 border-gold/40 bg-black group/specimen mx-auto">
                  <Image
                    src={gemCompareMode === 'simulated' ? '/press/inside-the-bridal-collection-july2026.jpg' : '/press/inside-luxury-bridal-sets-feature.jpg'}
                    alt="Gemological Specimen"
                    fill
                    sizes="(max-width: 640px) 280px, 320px"
                    className={`object-contain object-top transition-transform duration-700 ${
                      isSparkling ? 'scale-105 rotate-0.5' : 'group-hover/specimen:scale-[1.02]'
                    }`}
                  />
                  {isSparkling && (
                    <div className="absolute inset-0 bg-gold/25 backdrop-blur-[1px] rounded-2xl flex items-center justify-center animate-ping pointer-events-none">
                      <Sparkles className="w-12 h-12 text-gold animate-spin" />
                    </div>
                  )}
                </div>

                <button
                  onClick={triggerSparkleBurst}
                  className="px-5 py-2.5 rounded-xl bg-[#B8860B] dark:bg-gold hover:bg-[#8B6508] dark:hover:bg-gold-light text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-transform active:scale-95"
                >
                  <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
                  Simulate Refractive Sparkle
                </button>
                <span className="text-[10px] text-neutral-500 mt-2 font-mono">
                  {gemCompareMode === 'simulated' ? 'Premium Simulated Diamond • Hand-Set Solitaire' : 'Natural Mined Carbon Diamond'}
                </span>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            7. NEWSROOM GRID & ANIMATED SIDEBAR (Filling All Small Blank Spaces)
        ========================================================================== */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* -------------------------------------------------------------
                LEFT 8 COLS: INVESTIGATIVE DESKS & FULL WIRE STORIES
            -------------------------------------------------------------- */}
            <div className="lg:col-span-8 space-y-8">
              
              <div className="border-b-2 border-neutral-900 dark:border-gold pb-2 flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-black text-xl text-neutral-950 dark:text-white uppercase tracking-tight">
                    {isAr ? 'تحقيقات استقصائية ونشرة الإعلام الفاخر' : 'Investigative Features & Media Wire'}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 font-serif">
                    {isAr ? 'تقارير حصرية من فوغ العربية، هاربرز بازار، جلف نيوز، خليج تايمز، وذا ناشيونال.' : "Syndicated journalism from Vogue Arabia, Harper's Bazaar, Gulf News, Khaleej Times, and The National."}
                  </p>
                </div>
                <span className="text-xs font-bold text-[#8B6508] dark:text-gold font-mono flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {isAr ? `${gridStories.length} تحقيقات موسعة` : `${gridStories.length} Investigations`}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gridStories.map((art) => (
                  <article
                    key={art.id}
                    onClick={() => setActiveModalArticle(art)}
                    className="p-5 rounded-xl bg-white dark:bg-[#111520] border border-neutral-200 dark:border-neutral-800 hover:border-[#B8860B] dark:hover:border-gold hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                  >
                    <div className="space-y-3">
                      
                      <div className="relative aspect-[16/10] rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800">
                        <Image
                          src={art.coverImage}
                          alt={art.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 left-2 bg-neutral-950/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-white/20">
                          {getPublicationLabel(art.publication, isAr)}
                        </div>

                        {/* Bookmark shortcut */}
                        <button
                          onClick={(e) => toggleBookmark(art.id, e)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-gold hover:text-black transition-colors"
                          title={isAr ? 'حفظ' : 'Bookmark'}
                        >
                          <Bookmark
                            className={`w-3.5 h-3.5 ${
                              bookmarkedIds.includes(art.id) ? 'fill-gold text-gold' : ''
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-neutral-500">
                        <span className="text-[#8B6508] dark:text-gold font-semibold uppercase tracking-wider">
                          {isAr && art.categoryAr ? art.categoryAr : art.category}
                        </span>
                        <span>{isAr && art.readTimeAr ? art.readTimeAr : (isAr ? art.readTime.replace('min read', 'دقائق قراءة') : art.readTime)}</span>
                      </div>

                      <h4 className="font-serif font-bold text-base text-neutral-950 dark:text-white group-hover:text-[#B8860B] dark:group-hover:text-gold transition-colors leading-snug">
                        {isAr && art.titleAr ? art.titleAr : art.title}
                      </h4>

                      <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed font-serif">
                        {isAr && art.excerptAr ? art.excerptAr : art.excerpt}
                      </p>

                    </div>

                    <div className="pt-4 mt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300">
                        <Award className="w-3.5 h-3.5 text-[#B8860B] dark:text-gold" />
                        <span className="text-[11px] truncate max-w-[150px] font-medium font-serif">
                          {isAr ? (art.author?.name || 'خبير مجوهرات معتمد') : (art.author?.name || 'Staff Gemologist')}
                        </span>
                      </div>

                      <span className="text-[#8B6508] dark:text-gold font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        {isAr ? 'قراءة التحقيق' : 'Read Story'} <ArrowRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
                      </span>
                    </div>

                  </article>
                ))}
              </div>

            </div>

            {/* -------------------------------------------------------------
                RIGHT 4 COLS: FULLY ENLIVENED SIDEBAR
            -------------------------------------------------------------- */}
            <aside className="lg:col-span-4 space-y-6">
              
              {/* DUBAI SOUK LIVE METAL VALUE ESTIMATOR */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#111520] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-3">
                <div className="border-b border-neutral-200 dark:border-neutral-800 pb-2 flex items-center justify-between">
                  <h4 className="font-serif font-black text-xs uppercase tracking-wider text-neutral-950 dark:text-white flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-[#B8860B] dark:text-gold" /> {isAr ? 'أداة تقييم المعادن الثمينة بسوق دبي' : 'Dubai Metal Valuation Tool'}
                  </h4>
                  <span className="text-[10px] font-mono text-neutral-500">{isAr ? 'مؤشر أسعار فوري' : 'Real-Time Estimator'}</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-4 gap-1 p-1 bg-neutral-100 dark:bg-black/60 rounded-xl">
                    {(['24k', '22k', '18k', '925silver'] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => setCalcMetal(m)}
                        className={`py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${
                          calcMetal === m
                            ? 'bg-neutral-950 text-white dark:bg-gold dark:text-black shadow'
                            : 'text-neutral-600 dark:text-neutral-400'
                        }`}
                      >
                        {m === '925silver' ? (isAr ? 'فضة 925' : 'Silver') : (isAr ? `ذهب ${m.replace('k', ' قيراط')}` : m)}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-medium text-neutral-700 dark:text-neutral-300">
                      <span>{isAr ? 'الوزن:' : 'Weight:'}</span>
                      <span className="font-mono font-bold text-neutral-950 dark:text-white">{isAr ? `${calcGrams} جرام` : `${calcGrams} Grams`}</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={120}
                      step={5}
                      value={calcGrams}
                      onChange={(e) => setCalcGrams(Number(e.target.value))}
                      className="w-full accent-[#B8860B] dark:accent-gold cursor-pointer"
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-[#F8F5EE] dark:bg-black/40 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-neutral-500 block">{isAr ? 'القيمة السوقية التقديرية:' : 'Est. Market Value:'}</span>
                      <span className="font-mono font-black text-lg text-neutral-950 dark:text-white">
                        {isAr ? `${calculatedValuationAed.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} د.إ` : `AED ${calculatedValuationAed.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                      </span>
                    </div>
                    <div className="text-right text-[11px] font-mono text-neutral-500">
                      <div>{isAr ? `${calculatedValuationSar.toFixed(0)} ر.س` : `SAR ${calculatedValuationSar.toFixed(0)}`}</div>
                      <div>${calculatedValuationUsd.toFixed(0)} USD</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* LIVE ANIMATED GCC CURRENCY & FOREX CONVERTER */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#111520] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-3">
                <div className="border-b border-neutral-200 dark:border-neutral-800 pb-2 flex items-center justify-between">
                  <h4 className="font-serif font-black text-xs uppercase tracking-wider text-neutral-950 dark:text-white flex items-center gap-2">
                    <Coins className="w-4 h-4 text-[#B8860B] dark:text-gold" /> {isAr ? 'سعر صرف العملات بأسواق الخليج' : 'GCC Souk Currency Peg'}
                  </h4>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> {isAr ? 'سعر مباشر' : 'Live Peg'}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-neutral-600 dark:text-neutral-400 font-medium">{isAr ? 'تحويل درهم إماراتي:' : 'Convert AED:'}</span>
                    <input
                      type="number"
                      value={currencyAed}
                      onChange={(e) => setCurrencyAed(Number(e.target.value) || 0)}
                      className="w-24 px-2 py-1 rounded bg-neutral-100 dark:bg-black/60 border border-neutral-300 dark:border-neutral-700 text-xs font-mono font-bold text-right text-neutral-950 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className="p-2 rounded-lg bg-neutral-50 dark:bg-black/40 border border-neutral-200 dark:border-neutral-800">
                      <span className="text-[10px] text-neutral-500 block uppercase">{isAr ? 'ريال سعودي (SAR)' : 'Saudi Riyal (SAR)'}</span>
                      <span className="font-mono font-bold text-sm text-neutral-950 dark:text-white">
                        {(currencyAed * exchangeRates.SAR).toFixed(2)} SAR
                      </span>
                    </div>

                    <div className="p-2 rounded-lg bg-neutral-50 dark:bg-black/40 border border-neutral-200 dark:border-neutral-800">
                      <span className="text-[10px] text-neutral-500 block uppercase">{isAr ? 'ريال قطري (QAR)' : 'Qatar Riyal (QAR)'}</span>
                      <span className="font-mono font-bold text-sm text-neutral-950 dark:text-white">
                        {(currencyAed * exchangeRates.QAR).toFixed(2)} QAR
                      </span>
                    </div>

                    <div className="p-2 rounded-lg bg-neutral-50 dark:bg-black/40 border border-neutral-200 dark:border-neutral-800">
                      <span className="text-[10px] text-neutral-500 block uppercase">{isAr ? 'دينار كويتي (KWD)' : 'Kuwait Dinar (KWD)'}</span>
                      <span className="font-mono font-bold text-sm text-neutral-950 dark:text-white">
                        {(currencyAed * exchangeRates.KWD).toFixed(2)} KWD
                      </span>
                    </div>

                    <div className="p-2 rounded-lg bg-neutral-50 dark:bg-black/40 border border-neutral-200 dark:border-neutral-800">
                      <span className="text-[10px] text-neutral-500 block uppercase">{isAr ? 'دولار أمريكي (USD)' : 'US Dollar (USD)'}</span>
                      <span className="font-mono font-bold text-sm text-neutral-950 dark:text-white">
                        ${(currencyAed * exchangeRates.USD).toFixed(2)} USD
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Most Read 01 to 05 Widget */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#111520] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
                <div className="border-b border-neutral-200 dark:border-neutral-800 pb-2 flex items-center justify-between">
                  <h3 className="font-serif font-black text-sm uppercase tracking-wider text-neutral-950 dark:text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600 animate-pulse" /> {isAr ? 'الأكثر قراءة في الإمارات ودول الخليج' : 'Most Read In UAE & GCC'}
                  </h3>
                  <span className="text-[10px] font-mono text-neutral-500">{isAr ? 'إحصاءات 24 ساعة' : '24H Metrics'}</span>
                </div>

                <div className="space-y-3.5 divide-y divide-neutral-100 dark:divide-neutral-800/80">
                  {[
                    {
                      num: '01',
                      title: isAr ? 'سوق الذهب بدبي 2026: كيف أصبحت الفضة عيار 925 الخيار الأول في قوائم الأعراس' : 'Dubai Gold Souk 2026: Why Demi-Fine 925 Silver Is Dominating Wedding Registries',
                      reads: isAr ? '١٦,٤٠٠ قارئ' : '16.4k readers',
                      tag: isAr ? 'مؤشرات السوق' : 'Market Watch',
                    },
                    {
                      num: '02',
                      title: isAr ? 'الجمارك السعودية تعتمد مركز شحن جوي يربط طلبيات المجوهرات الفاخرة بالرياض خلال 48 ساعة' : 'Saudi Customs Clears 48-Hour Logistics Hub for Riyadh Luxury Jewelry Orders',
                      reads: isAr ? '١٢,٨٠٠ قارئ' : '12.8k readers',
                      tag: isAr ? 'التجارة واللوجستيات' : 'Trade & Logistics',
                    },
                    {
                      num: '03',
                      title: isAr ? 'خبراء معهد GIA يقارنون التشتت الضوئي: محاكاة الألماس الفاخر مقابل المستخرج' : 'GIA Gemologists Compare Optical Dispersion: Premium Simulated Diamond vs Mined Diamond',
                      reads: isAr ? '١١,٢٠٠ قارئ' : '11.2k readers',
                      tag: isAr ? 'مختبر الأحجار الكريمة' : 'Gemology Desk',
                    },
                    {
                      num: '04',
                      title: isAr ? 'لماذا تصر عرائس الخليج على طلاء الروديوم الإيطالي متعدد الطبقات المقاوم للأكسدة' : 'Why Gulf Brides Are Insisting on Multi-Layer Rhodium Anti-Tarnish Shields',
                      reads: isAr ? '٩,٦٠٠ قارئ' : '9.6k readers',
                      tag: isAr ? 'صيحات الزفاف' : 'Bridal Trends',
                    },
                    {
                      num: '05',
                      title: isAr ? 'عودة بروش الأرابيسك التراثي بقوة في عروض أزياء دبي والرياض لعام 2026' : 'The Modern Arabesque Brooch Revival Across Dubai and Riyadh Runways',
                      reads: isAr ? '٨,٤٠٠ قارئ' : '8.4k readers',
                      tag: isAr ? 'أزياء راقية' : 'Haute Fashion',
                    },
                  ].map((item) => (
                    <div
                      key={item.num}
                      onClick={() => setActiveModalArticle(leadStory)}
                      className="pt-3 first:pt-0 group cursor-pointer flex items-start gap-3"
                    >
                      <span className="font-serif font-black text-2xl text-[#B8860B] dark:text-gold flex-shrink-0 leading-none">
                        {item.num}
                      </span>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                          {item.tag}
                        </span>
                        <h5 className="font-serif font-bold text-xs text-neutral-950 dark:text-white group-hover:text-[#B8860B] dark:group-hover:text-gold transition-colors leading-snug">
                          {item.title}
                        </h5>
                        <div className="text-[10px] text-neutral-400 font-mono flex items-center gap-1">
                          <Eye className="w-3 h-3" /> {item.reads}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 text-[10px] text-neutral-500 flex items-center justify-between font-mono">
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    {isAr ? '١,٤٢٠ قارئ نشط الآن' : '1,420 Active Wire Readers'}
                  </span>
                  <span>{isAr ? '٤١ ملف تحقيقي تم تصفحه اليوم' : '41 Dossiers Accessed Today'}</span>
                </div>
              </div>

              {/* LIVE EDITORIAL READER POLL */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#111520] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-3">
                <div className="border-b border-neutral-200 dark:border-neutral-800 pb-2 flex items-center justify-between">
                  <h4 className="font-serif font-black text-xs uppercase tracking-wider text-neutral-950 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#B8860B] dark:text-gold" /> {isAr ? 'نبض القراء • استطلاع مجوهرات الأعراس بالخليج' : 'Readers Pulse • Gulf Bridal Poll'}
                  </h4>
                  <span className="text-[10px] font-mono text-neutral-500">{isAr ? '٢,٨٤٠ صوت' : '2,840 Votes'}</span>
                </div>

                <p className="text-xs text-neutral-700 dark:text-neutral-300 font-serif leading-snug">
                  {isAr ? 'ما هو المعدن الثمين الذي تفضلين الاستثمار فيه لموسم أعراس الخليج 2026/2027؟' : 'Which bridal metal are you investing in for the 2026/27 Gulf wedding season?'}
                </p>

                <div className="space-y-2 pt-1 text-xs">
                  <div
                    onClick={() => handleVote('silver')}
                    className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                      pollVoted === 'silver'
                        ? 'border-gold bg-gold/15'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-gold/40'
                    }`}
                  >
                    <div className="flex items-center justify-between font-medium mb-1.5 text-neutral-900 dark:text-white">
                      <span>{isAr ? 'فضة إسترلينية 925 مطلية بالروديوم' : 'Rhodium-Shielded 925 Silver'}</span>
                      <span className="font-mono font-bold">{pollStats.silver}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gold h-full rounded-full transition-all duration-1000"
                        style={{ width: `${pollStats.silver}%` }}
                      />
                    </div>
                  </div>

                  <div
                    onClick={() => handleVote('gold')}
                    className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                      pollVoted === 'gold'
                        ? 'border-gold bg-gold/15'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-gold/40'
                    }`}
                  >
                    <div className="flex items-center justify-between font-medium mb-1.5 text-neutral-900 dark:text-white">
                      <span>{isAr ? 'ذهب أبيض مستخرج عيار 18/21' : 'Mined 18K/21K White Gold'}</span>
                      <span className="font-mono font-bold">{pollStats.gold}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-neutral-400 dark:bg-neutral-600 h-full rounded-full transition-all duration-1000"
                        style={{ width: `${pollStats.gold}%` }}
                      />
                    </div>
                  </div>

                  <div
                    onClick={() => handleVote('platinum')}
                    className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                      pollVoted === 'platinum'
                        ? 'border-gold bg-gold/15'
                        : 'border-neutral-200 dark:border-neutral-800 hover:border-gold/40'
                    }`}
                  >
                    <div className="flex items-center justify-between font-medium mb-1.5 text-neutral-900 dark:text-white">
                      <span>{isAr ? 'بلاتين وسوليتير محاكي الألماس' : 'Platinum / Simulant Solitaires'}</span>
                      <span className="font-mono font-bold">{pollStats.platinum}%</span>
                    </div>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-neutral-400 dark:bg-neutral-600 h-full rounded-full transition-all duration-1000"
                        style={{ width: `${pollStats.platinum}%` }}
                      />
                    </div>
                  </div>
                </div>

                {pollVoted && (
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold text-center flex items-center justify-center gap-1 animate-in fade-in">
                    <Check className="w-3.5 h-3.5" /> Your vote has been recorded on the GCC wire!
                  </div>
                )}
              </div>

              {/* Assay Compliance Card */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#111520] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-[#8B6508] dark:text-gold font-bold text-xs uppercase tracking-wider">
                  <Scale className="w-4 h-4" /> DCL Assay & Standards Desk
                </div>
                <h4 className="font-serif font-bold text-sm text-neutral-950 dark:text-white">
                  UAE Cabinet Resolution No. 23 on Precious Metals
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-serif">
                  Every silver jewelry item syndicated or reviewed on this wire undergoes mandatory X-Ray Fluorescence (XRF) spectrometry testing, confirming a strict minimum fineness of 925 parts per thousand.
                </p>
                <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
                  <span>Dubai Municipality Compliant</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 100% Verified
                  </span>
                </div>
              </div>

              {/* Newsletter Box */}
              <div className="p-5 rounded-2xl bg-[#F4EFE6] dark:bg-[#151A26] border border-neutral-300 dark:border-neutral-800 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B6508] dark:text-gold">
                  <Newspaper className="w-4 h-4" /> {isAr ? 'الموجز التحريري اليومي' : 'Daily Editorial Briefing'}
                </div>
                <h4 className="font-serif font-bold text-sm text-neutral-950 dark:text-white">
                  {isAr ? 'يصل إلى بريدك كل صباح الساعة 7:00 بتوقيت الخليج' : 'Delivered to your inbox every morning at 7:00 AM GST'}
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 font-serif">
                  {isAr
                    ? 'ابقَ على اطلاع بأحدث أسعار الذهب، وأخبار أسواق الزفاف في الخليج، والتقارير الاستقصائية الموثقة.'
                    : 'Stay ahead with GCC gold prices, bridal market intelligence, and syndicated investigative reports.'}
                </p>

                {newsletterSubscribed ? (
                  <div className="p-3 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    {isAr ? 'شكراً لك! لقد تم تسجيل اشتراكك بنجاح في نشرة الخليج اليومية.' : 'Thank you! You are subscribed to the Gulf Daily Wire.'}
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder={isAr ? 'أدخل بريدك الإلكتروني الشخصي أو التجاري...' : 'Enter your corporate or personal email...'}
                      required
                      className="w-full px-3 py-2 bg-white dark:bg-black/60 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs text-neutral-950 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-gold"
                    />
                    <button
                      type="submit"
                      className="w-full py-2 bg-neutral-950 hover:bg-neutral-800 dark:bg-gold dark:hover:bg-gold-light text-white dark:text-black font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow"
                    >
                      {isAr ? 'الاشتراك في النشرة اليومية' : 'Subscribe To Daily Wire'}
                    </button>
                  </form>
                )}
              </div>

            </aside>

          </div>

        </section>

        {/* =========================================================================
            ⭐ OMNIA STORES GLOBAL SOCIAL MEDIA & 4K BROADCAST TV HUB
            (Direct Real-Time Syndication Across YouTube, Instagram, TikTok, Snapchat & Facebook)
        ========================================================================== */}
        <section
          id="social-media-desk"
          className="my-12 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-y-2 border-neutral-300 dark:border-gold/30 bg-[#FBF9F4] dark:bg-[#0B0E17] rounded-3xl"
        >
          {/* Desk Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/15 border border-red-500/40 text-red-600 dark:text-red-400 text-xs font-extrabold uppercase tracking-widest mb-2 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                <span>OFFICIAL OMNICHANNEL BROADCAST • 5 VERIFIED PLATFORMS</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-neutral-950 dark:text-white">
                Omnia Stores Global Social Media & Video Atelier
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 font-serif">
                Direct real-time syndication across YouTube TV, Instagram Reels, TikTok, Snapchat Spotlight, and Facebook Watch.
              </p>
            </div>

            {/* Live Omnichannel Status */}
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-400 bg-white dark:bg-black/40 px-3.5 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-800 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-bold text-neutral-900 dark:text-white">350K+ GCC Community</span>
            </div>
          </div>

          {/* ⭐ 5 VERIFIED SOCIAL MEDIA CONNECTORS RIBBON */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
            {/* 1. YouTube */}
            <a
              href="https://youtube.com/@omniastores?si=DY0jsLaCSNS3i1XZ"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3.5 rounded-2xl bg-white dark:bg-[#111520] border border-neutral-200 dark:border-neutral-800 hover:border-red-600 dark:hover:border-red-500 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-red-600/10 text-red-600 flex items-center justify-center">
                  <YouTubeIcon className="w-4 h-4 fill-current" />
                </div>
                <span className="text-[10px] font-mono font-bold text-neutral-400 group-hover:text-red-600 transition-colors">18.4K Subs</span>
              </div>
              <div className="mt-3">
                <div className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1">
                  <span>YouTube</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </div>
                <div className="text-[10px] text-neutral-500 font-mono">@omniastores</div>
              </div>
            </a>

            {/* 2. Instagram */}
            <a
              href="https://www.instagram.com/omniastores/"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3.5 rounded-2xl bg-white dark:bg-[#111520] border border-neutral-200 dark:border-neutral-800 hover:border-pink-500 dark:hover:border-pink-400 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white flex items-center justify-center shadow">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-bold text-neutral-400 group-hover:text-pink-500 transition-colors">125K+ Fans</span>
              </div>
              <div className="mt-3">
                <div className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1">
                  <span>Instagram</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </div>
                <div className="text-[10px] text-neutral-500 font-mono">@omniastores</div>
              </div>
            </a>

            {/* 3. TikTok */}
            <a
              href="https://www.tiktok.com/@omniastoresuae"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3.5 rounded-2xl bg-white dark:bg-[#111520] border border-neutral-200 dark:border-neutral-800 hover:border-cyan-400 dark:hover:border-cyan-400 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center border border-cyan-400/30 shadow">
                  <TikTokIcon className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-[10px] font-mono font-bold text-neutral-400 group-hover:text-cyan-400 transition-colors">98K+ Fans</span>
              </div>
              <div className="mt-3">
                <div className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1">
                  <span>TikTok</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </div>
                <div className="text-[10px] text-neutral-500 font-mono">@omniastoresuae</div>
              </div>
            </a>

            {/* 4. Snapchat */}
            <a
              href="https://www.snapchat.com/@omniastores"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3.5 rounded-2xl bg-white dark:bg-[#111520] border border-neutral-200 dark:border-neutral-800 hover:border-yellow-400 dark:hover:border-yellow-400 transition-all shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-[#FFFC00] text-black flex items-center justify-center shadow">
                  <SnapchatIcon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-bold text-neutral-400 group-hover:text-yellow-500 transition-colors">Official Lens</span>
              </div>
              <div className="mt-3">
                <div className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1">
                  <span>Snapchat</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </div>
                <div className="text-[10px] text-neutral-500 font-mono">@omniastores</div>
              </div>
            </a>

            {/* 5. Facebook */}
            <a
              href="https://www.facebook.com/omniastoresuae"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3.5 rounded-2xl bg-white dark:bg-[#111520] border border-neutral-200 dark:border-neutral-800 hover:border-blue-600 dark:hover:border-blue-500 transition-all shadow-sm hover:shadow-md flex flex-col justify-between col-span-2 sm:col-span-1"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-[#1877F2] text-white flex items-center justify-center shadow">
                  <FacebookIcon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-bold text-neutral-400 group-hover:text-blue-500 transition-colors">48K+ Community</span>
              </div>
              <div className="mt-3">
                <div className="text-xs font-bold text-neutral-900 dark:text-white flex items-center gap-1">
                  <span>Facebook</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </div>
                <div className="text-[10px] text-neutral-500 font-mono">@omniastoresuae</div>
              </div>
            </a>
          </div>

          {/* Vlog Categories Filter Bar & Auto-Play Controls */}
          <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-neutral-200 dark:border-neutral-800 pb-3">
            {[
              { id: 'all', label: `🔥 All Broadcasts (${omniaVlogs.length})` },
              { id: 'silver', label: '💍 92.5 Silver & Rings' },
              { id: 'bridal', label: '👰 Royal Bridal Suites' },
              { id: 'vip', label: '👑 VIP & Dr. Khlood' },
              { id: 'curated', label: '✨ Sunlight & Craft' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setVlogCategoryFilter(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  vlogCategoryFilter === cat.id
                    ? 'bg-neutral-950 text-white dark:bg-gold dark:text-black shadow'
                    : 'bg-white dark:bg-black/40 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-700'
                }`}
              >
                {cat.label}
              </button>
            ))}

            <div className="ml-auto flex items-center gap-2 flex-wrap">
              {/* Unmute / Mute Audio Toggle */}
              <button
                onClick={() => setIsMutedVlog((prev) => !prev)}
                className={`flex items-center gap-1.5 text-xs font-mono px-2.5 py-1.5 rounded transition-all ${
                  isMutedVlog
                    ? 'bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700'
                    : 'bg-[#B8860B] dark:bg-gold text-black font-black shadow-md'
                }`}
                title={isMutedVlog ? 'Click to Unmute Audio' : 'Mute Audio'}
              >
                {isMutedVlog ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 animate-pulse" />}
                <span>{isMutedVlog ? 'Audio Muted' : 'Audio Live'}</span>
              </button>

              {/* Auto-Play Toggle */}
              <button
                onClick={() => setIsAutoPlayVlogs((prev) => !prev)}
                className="flex items-center gap-1.5 text-xs font-mono px-2.5 py-1.5 rounded bg-neutral-100 dark:bg-neutral-800/60 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors"
                title="Toggle Auto-Play Mode"
              >
                <Radio className={`w-3.5 h-3.5 ${isAutoPlayVlogs ? 'text-red-500 animate-pulse' : 'text-neutral-400'}`} />
                <span className="hidden sm:inline">{isAutoPlayVlogs ? 'Auto-Play: ON' : 'Auto-Play: OFF'}</span>
              </button>

              {/* Theater Mode Expander */}
              <button
                onClick={() => setIsTheaterMode((prev) => !prev)}
                className={`flex items-center gap-1.5 text-xs font-mono px-2.5 py-1.5 rounded border transition-all ${
                  isTheaterMode
                    ? 'bg-neutral-950 text-white dark:bg-gold dark:text-black border-gold shadow'
                    : 'bg-white dark:bg-black/40 border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
                title="Toggle Full Cinema Stage"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{isTheaterMode ? 'Compact' : 'Cinema Stage'}</span>
              </button>
            </div>
          </div>

          {/* Main Broadcast Screen (8 cols or 12 cols if Theater Mode) + Up-Next Playlist */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-10">
            
            {/* Main Theater Screen */}
            <div className={`${isTheaterMode ? 'lg:col-span-12' : 'lg:col-span-8'} space-y-4`}>
              
              {/* Responsive 16:9 Video Player */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border-2 border-neutral-300 dark:border-gold/30 shadow-2xl bg-black group">
                <iframe
                  key={`${activeVlog.videoId}-${isAutoPlayVlogs}-${isMutedVlog}`}
                  src={`${activeVlog.embedUrl}?autoplay=${isAutoPlayVlogs ? '1' : '0'}&mute=${isMutedVlog ? '1' : '0'}&rel=0&modestbranding=1&enablejsapi=1&loop=1&playlist=${activeVlog.videoId}`}
                  title={activeVlog.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />

                {/* Top Corner Watermark */}
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-white text-[10px] font-mono font-bold flex items-center gap-1.5 border border-white/20 pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                  OMNIA STORES TV • DUBAI
                </div>

                {/* Top Right 4K UHD Badge */}
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-gold text-[10px] font-mono font-bold flex items-center gap-1 border border-gold/30 pointer-events-none">
                  <Sparkles className="w-3 h-3" />
                  <span>4K UHD • 60 FPS</span>
                </div>
              </div>

              {/* Video Title & Broadcast Metadata */}
              <div className="p-5 rounded-2xl bg-white dark:bg-[#111520] border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-red-600/15 text-red-600 dark:text-red-400 border border-red-500/30 text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1">
                      <Tv className="w-3 h-3" /> OFFICIAL VLOG BROADCAST
                    </span>
                    <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[10px] font-mono uppercase text-neutral-600 dark:text-neutral-400">
                      {activeVlog.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-neutral-500 font-mono">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> {activeVlog.views}
                    </span>
                    <span>•</span>
                    <span>{activeVlog.published}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-black text-neutral-950 dark:text-white leading-tight">
                  {activeVlog.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-serif leading-relaxed">
                  {activeVlog.description}
                </p>

                {/* Action Bar with Prev / Next Navigation & Share */}
                <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    {/* Prev Episode */}
                    <button
                      onClick={handlePrevVlog}
                      className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
                      title="Previous Episode"
                    >
                      <SkipBack className="w-3.5 h-3.5" />
                    </button>

                    {/* Next Episode */}
                    <button
                      onClick={handleNextVlog}
                      className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
                      title="Next Episode"
                    >
                      <SkipForward className="w-3.5 h-3.5" />
                    </button>

                    {/* Share Button */}
                    <button
                      onClick={() => handleShareVlog(activeVlog)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium transition-colors"
                      title="Copy Link to Clipboard"
                    >
                      {copiedVlogNotification === activeVlog.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-500" />
                          <span className="text-green-500 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Share</span>
                        </>
                      )}
                    </button>

                    {/* Watch on YouTube direct */}
                    <a
                      href={activeVlog.watchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300 hover:text-red-600 dark:hover:text-red-400 font-bold transition-colors ml-2"
                    >
                      <YouTubeIcon className="w-4 h-4 fill-red-600" />
                      <span>Watch on YouTube ↗</span>
                    </a>
                  </div>

                  {activeVlog.featuredProduct && (
                    <a
                      href={activeVlog.featuredProduct.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-[#B8860B] dark:bg-gold hover:bg-[#8B6508] dark:hover:bg-gold-light text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md ml-auto"
                    >
                      <span>Shop {activeVlog.featuredProduct.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

            </div>

            {/* Right 4 cols: Up-Next Vlog Playlist (or bottom if Theater Mode) */}
            <aside className={`${isTheaterMode ? 'lg:col-span-12' : 'lg:col-span-4'} space-y-3`}>
              <div className="flex items-center justify-between border-b border-neutral-300 dark:border-neutral-800 pb-2">
                <h4 className="font-serif font-black text-sm uppercase tracking-wider text-neutral-950 dark:text-white flex items-center gap-2">
                  <Film className="w-4 h-4 text-[#B8860B] dark:text-gold" /> Up Next On Omnia TV
                </h4>
                <span className="text-[10px] font-mono text-neutral-500">
                  {filteredVlogs.length} Episodes
                </span>
              </div>

              {/* Scrollable Playlist Rail */}
              <div className={`space-y-2.5 overflow-y-auto pr-1 ${isTheaterMode ? 'grid grid-cols-1 md:grid-cols-3 gap-3 space-y-0 max-h-[420px]' : 'max-h-[560px]'}`}>
                {filteredVlogs.map((vlog) => {
                  const isCurrent = vlog.id === activeVlog.id;
                  return (
                    <div
                      key={vlog.id}
                      onClick={() => setActiveVlogId(vlog.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 group ${
                        isCurrent
                          ? 'border-gold bg-gold/15 shadow-md'
                          : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#111520] hover:border-gold/40'
                      }`}
                    >
                      {/* Thumbnail with Play Icon & Duration */}
                      <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-neutral-300 dark:border-neutral-700 bg-neutral-900">
                        <Image
                          src={vlog.thumbnail}
                          alt={vlog.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isCurrent ? 'bg-gold text-black' : 'bg-red-600 text-white'}`}>
                            <Play className="w-3 h-3 fill-current ml-0.5" />
                          </div>
                        </div>
                        <span className="absolute bottom-1 right-1 bg-black/80 text-white px-1 py-0.2 rounded text-[9px] font-mono">
                          {vlog.duration}
                        </span>
                      </div>

                      {/* Video Info */}
                      <div className="space-y-1 flex-1 min-w-0">
                        <h5 className="font-serif font-bold text-xs text-neutral-950 dark:text-white group-hover:text-[#B8860B] dark:group-hover:text-gold transition-colors line-clamp-2 leading-snug">
                          {vlog.title}
                        </h5>
                        <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                          <span>{vlog.views}</span>
                          {isCurrent ? (
                            <span className="text-[#8B6508] dark:text-gold font-bold flex items-center gap-1">
                              <span className="w-1 rounded-full bg-gold animate-soundwave-1 h-2" />
                              <span className="w-1 rounded-full bg-gold animate-soundwave-2 h-3" />
                              <span className="w-1 rounded-full bg-gold animate-soundwave-3 h-4" />
                              Playing
                            </span>
                          ) : (
                            <span className="text-neutral-400 capitalize">{vlog.category}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Channel Summary Card */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-neutral-900 to-black text-white border border-gold/30 shadow-md space-y-2">
                <div className="flex items-center gap-2">
                  <YouTubeIcon className="w-5 h-5 fill-red-500" />
                  <span className="font-serif font-black text-sm">{omniastoresYoutubeData.channel.name}</span>
                </div>
                <p className="text-[11px] text-neutral-300 font-serif leading-snug">
                  {omniastoresYoutubeData.channel.description}
                </p>
                <a
                  href={omniastoresYoutubeData.channel.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center w-full py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow"
                >
                  Join {omniastoresYoutubeData.channel.subscribers} Subscribers ↗
                </a>
              </div>

            </aside>

          </div>

          {/* ⭐ OMNICHANNEL SOCIAL MEDIA REELS & SHORTS CAROUSEL (Live Auto-Play Across 5 Platforms) */}
          <div className="pt-8 border-t border-neutral-300 dark:border-neutral-800 space-y-4">
            
            {/* Platform Selector Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 pb-2">
              {[
                { id: 'all', label: `🔥 All Platforms (${allSocialReels.length})`, icon: null },
                { id: 'instagram', label: '📸 Instagram Reels', icon: 'instagram' },
                { id: 'tiktok', label: '🎵 TikTok Viral', icon: 'tiktok' },
                { id: 'youtube', label: '🔴 YouTube Shorts', icon: 'youtube' },
                { id: 'snapchat', label: '👻 Snapchat Spotlight', icon: 'snapchat' },
                { id: 'facebook', label: '📘 Facebook Watch', icon: 'facebook' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSocialPlatformFilter(p.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    socialPlatformFilter === p.id
                      ? 'bg-neutral-950 text-white dark:bg-gold dark:text-black shadow-md'
                      : 'bg-white dark:bg-black/40 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-700'
                  }`}
                >
                  {p.icon && renderSocialPlatformIcon(p.icon, 'w-3.5 h-3.5')}
                  <span>{p.label}</span>
                </button>
              ))}
            </div>

            {/* Carousel Header & Controls Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-1 rounded bg-gradient-to-r from-red-600 via-pink-600 to-amber-600 text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  SHORTS & REELS
                </span>
                <h4 className="font-serif font-black text-base text-neutral-950 dark:text-white uppercase tracking-tight flex items-center gap-2">
                  <span>Trending Social Video</span>
                  <span className="text-xs font-mono font-normal text-neutral-500">
                    ({filteredSocialReels.length} Productions)
                  </span>
                </h4>

                {/* Mode & Live Status Pill */}
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-gold/15 text-[#8B6508] dark:text-gold border border-gold/30">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    (socialScrollMode === 'marquee' ? !isMarqueePaused : isSocialAutoSlideRunning && !isSocialTrackHovered)
                      ? 'bg-emerald-500 animate-pulse'
                      : 'bg-amber-500'
                  }`} />
                  {socialScrollMode === 'marquee'
                    ? isMarqueePaused
                      ? '⏸ Scroll Paused (Hovering)'
                      : `🌊 Auto-Scrolling All ${filteredSocialReels.length} Videos`
                    : isSocialTrackHovered
                    ? '⏸ Paused (Hovering)'
                    : isSocialAutoSlideRunning
                    ? 'Auto-Changing Active'
                    : 'Auto-Slide Paused'}
                </span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Scroll Mode Switcher: Continuous Marquee vs Step Carousel */}
                <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 p-0.5 rounded-lg border border-neutral-300 dark:border-neutral-700 text-xs font-mono">
                  <button
                    onClick={() => setSocialScrollMode('marquee')}
                    className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 font-bold ${
                      socialScrollMode === 'marquee'
                        ? 'bg-neutral-950 text-white dark:bg-gold dark:text-black shadow-sm'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                    }`}
                    title="Infinite Continuous Smooth Auto-Scrolling Stream"
                  >
                    <span>🌊 Continuous Scroll</span>
                  </button>
                  <button
                    onClick={() => setSocialScrollMode('step')}
                    className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 font-bold ${
                      socialScrollMode === 'step'
                        ? 'bg-neutral-950 text-white dark:bg-gold dark:text-black shadow-sm'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                    }`}
                    title="Step-by-Step Auto-Advancing Carousel"
                  >
                    <span>⏱️ Step Mode</span>
                  </button>
                </div>

                {/* Speed Controls for Continuous Marquee Mode */}
                {socialScrollMode === 'marquee' ? (
                  <div className="flex items-center gap-1 bg-white dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 rounded-lg p-0.5 text-[11px] font-mono shadow-sm">
                    {(['slow', 'normal', 'fast'] as const).map((spd) => (
                      <button
                        key={spd}
                        onClick={() => setScrollSpeed(spd)}
                        className={`px-2 py-0.5 rounded uppercase font-bold transition-colors ${
                          scrollSpeed === spd
                            ? 'bg-red-600 text-white dark:bg-gold dark:text-black'
                            : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                        }`}
                        title={`Set Scroll Speed to ${spd}`}
                      >
                        {spd === 'slow' ? '🐢 Slow' : spd === 'normal' ? '▶ Normal' : '⚡ Fast'}
                      </button>
                    ))}
                    <button
                      onClick={() => setIsMarqueePaused((prev) => !prev)}
                      className="px-1.5 py-0.5 rounded text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                      title={isMarqueePaused ? 'Resume Auto-Scrolling' : 'Pause Auto-Scrolling'}
                    >
                      {isMarqueePaused ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3 fill-current" />}
                    </button>
                  </div>
                ) : (
                  /* Step Mode Controls */
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setIsSocialAutoSlideRunning((prev) => !prev)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-mono transition-all shadow-sm ${
                        isSocialAutoSlideRunning
                          ? 'bg-red-600/10 dark:bg-gold/15 border-red-500/40 dark:border-gold/40 text-red-600 dark:text-gold font-bold'
                          : 'bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400'
                      }`}
                      title="Toggle Automatic Step Slide"
                    >
                      {isSocialAutoSlideRunning ? (
                        <>
                          <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                          <span>Auto: ON</span>
                        </>
                      ) : (
                        <>
                          <Pause className="w-3.5 h-3.5 text-neutral-400" />
                          <span>Auto: PAUSED</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-1 bg-white dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700 rounded-lg p-0.5 text-xs font-mono shadow-sm">
                      <button
                        onClick={handlePrevSlide}
                        className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
                        title="Slide to Previous Video"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2 text-[11px] text-neutral-600 dark:text-neutral-400 font-bold whitespace-nowrap">
                        {socialSlideIndex + 1}/{filteredSocialReels.length}
                      </span>
                      <button
                        onClick={handleNextSlide}
                        className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
                        title="Slide to Next Video"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* External Link directly to active platform */}
                <a
                  href={
                    socialPlatformFilter === 'instagram'
                      ? 'https://www.instagram.com/omniastores/'
                      : socialPlatformFilter === 'tiktok'
                      ? 'https://www.tiktok.com/@omniastoresuae'
                      : socialPlatformFilter === 'snapchat'
                      ? 'https://www.snapchat.com/@omniastores'
                      : socialPlatformFilter === 'facebook'
                      ? 'https://www.facebook.com/omniastoresuae'
                      : 'https://youtube.com/@omniastores?si=DY0jsLaCSNS3i1XZ'
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#8B6508] dark:text-gold hover:underline flex items-center gap-1 ml-1"
                >
                  <span className="capitalize">View on {socialPlatformFilter === 'all' ? 'YouTube' : socialPlatformFilter}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Step Mode Micro Countdown Progress Bar */}
            {socialScrollMode === 'step' && (
              <div className="space-y-1">
                <div className="w-full bg-neutral-200 dark:bg-neutral-800/80 h-1.5 rounded-full overflow-hidden relative shadow-inner">
                  <div
                    className={`h-full transition-all duration-100 ease-linear ${
                      isSocialTrackHovered
                        ? 'bg-amber-400'
                        : 'bg-gradient-to-r from-red-600 via-pink-600 to-amber-500'
                    }`}
                    style={{ width: `${slideCountdownProgress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
                  <span>
                    {isSocialTrackHovered
                      ? '⏸ Auto-Slide Paused (Viewing Reel)'
                      : isSocialAutoSlideRunning
                      ? `Auto-Changing Video in ${Math.max(1, Math.ceil((5.5 * (100 - slideCountdownProgress)) / 100))}s`
                      : 'Auto-Slide Paused'}
                  </span>
                  <span>Active: {filteredSocialReels[socialSlideIndex]?.title?.slice(0, 32)}...</span>
                </div>
              </div>
            )}

            {/* ⭐ VIEW 1: CONTINUOUS INFINITE AUTO-SCROLLING MARQUEE STREAM */}
            {socialScrollMode === 'marquee' ? (
              <div
                className="relative w-full overflow-hidden rounded-2xl group/marquee py-2"
                onMouseEnter={() => setIsMarqueePaused(true)}
                onMouseLeave={() => {
                  setIsMarqueePaused(false);
                  setHoveredSocialId(null);
                }}
              >
                {/* Left & Right Soft Blur Edge Fades */}
                <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#FDFBF7] dark:from-[#0A0D14] to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#FDFBF7] dark:from-[#0A0D14] to-transparent z-20 pointer-events-none" />

                <div
                  className={`flex gap-3.5 select-none ${
                    isMarqueePaused ? '' : 'animate-marquee'
                  }`}
                  style={{
                    width: 'max-content',
                    animationDuration:
                      scrollSpeed === 'fast' ? '30s' : scrollSpeed === 'slow' ? '65s' : '45s',
                    animationTimingFunction: 'linear',
                    animationIterationCount: 'infinite',
                  }}
                >
                  {marqueeSocialReels.map((reel, idx) => {
                    const isHovered = hoveredSocialId === reel.id;
                    const isAutoPlayingThis = hoveredSocialId ? isHovered : activeAutoPlaySocialId === reel.id;

                    return (
                      <div
                        key={`${reel.id}-marquee-${idx}`}
                        onClick={() => setActiveSocialModal(reel)}
                        onMouseEnter={() => {
                          setHoveredSocialId(reel.id);
                          setActiveAutoPlaySocialId(reel.id);
                        }}
                        onMouseLeave={() => setHoveredSocialId(null)}
                        className={`relative aspect-[9/16] w-[185px] sm:w-[210px] md:w-[225px] rounded-2xl overflow-hidden border transition-all duration-300 group cursor-pointer bg-neutral-950 flex-shrink-0 ${
                          isAutoPlayingThis
                            ? reel.platform === 'instagram'
                              ? 'border-pink-500 shadow-2xl ring-2 ring-pink-500/50 scale-[1.03] z-10'
                              : reel.platform === 'tiktok'
                              ? 'border-cyan-400 shadow-2xl ring-2 ring-cyan-400/50 scale-[1.03] z-10'
                              : reel.platform === 'snapchat'
                              ? 'border-yellow-400 shadow-2xl ring-2 ring-yellow-400/50 scale-[1.03] z-10'
                              : reel.platform === 'facebook'
                              ? 'border-blue-500 shadow-2xl ring-2 ring-blue-500/50 scale-[1.03] z-10'
                              : 'border-red-600 dark:border-gold shadow-2xl ring-2 ring-red-600/50 dark:ring-gold/50 scale-[1.03] z-10'
                            : 'border-neutral-300 dark:border-neutral-800 shadow-md hover:border-gold/60 opacity-95 hover:opacity-100 hover:scale-[1.02]'
                        }`}
                      >
                        {isAutoPlayingThis ? (
                          /* Live Embedded Auto-Playing Video */
                          <div className="absolute inset-0 bg-black">
                            <iframe
                              key={`live-social-${reel.videoId}-${idx}`}
                              src={`https://www.youtube.com/embed/${reel.videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${reel.videoId}&modestbranding=1&rel=0&playsinline=1`}
                              title={reel.title}
                              className="w-full h-full border-0 pointer-events-none scale-105"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none" />
                          </div>
                        ) : (
                          /* Static Image Thumbnail */
                          <>
                            <Image
                              src={reel.thumbnail}
                              alt={reel.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              unoptimized
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                          </>
                        )}

                        {/* Top Status & Platform Badge */}
                        <div className="absolute top-2 left-2 z-20 flex items-center gap-1.5 flex-wrap">
                          <div
                            className={`backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] text-white font-mono flex items-center gap-1 shadow ${
                              reel.platform === 'instagram'
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                                : reel.platform === 'tiktok'
                                ? 'bg-neutral-900 border border-cyan-400/50 text-cyan-300'
                                : reel.platform === 'snapchat'
                                ? 'bg-[#FFFC00] text-black font-extrabold'
                                : reel.platform === 'facebook'
                                ? 'bg-[#1877F2]'
                                : 'bg-red-600'
                            }`}
                          >
                            {renderSocialPlatformIcon(reel.platform, 'w-2.5 h-2.5')}
                            <span className="capitalize">{reel.platform}</span>
                          </div>

                          {isAutoPlayingThis && (
                            <div className="bg-red-600/90 backdrop-blur-md px-1.5 py-0.5 rounded-full text-[8px] text-white font-mono font-bold flex items-center gap-1 shadow animate-pulse">
                              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                              <span>AUTO-PLAYING</span>
                            </div>
                          )}
                        </div>

                        {/* Play Button Center Hover (when not playing) */}
                        {!isAutoPlayingThis && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            <div className="w-10 h-10 rounded-full bg-white/90 text-black flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                              <Play className="w-4 h-4 fill-current ml-0.5" />
                            </div>
                          </div>
                        )}

                        {/* Bottom Title, Likes & Views */}
                        <div className="absolute bottom-2 left-2 right-2 text-white space-y-0.5 z-20 pointer-events-none">
                          <h5 className="font-serif font-bold text-[11px] leading-snug line-clamp-2 drop-shadow">
                            {reel.title}
                          </h5>
                          <div className="flex items-center justify-between text-[9px] text-neutral-300 font-mono pt-0.5">
                            <span className="flex items-center gap-1">
                              <Heart className="w-2.5 h-2.5 text-rose-500 fill-rose-500" />
                              {reel.likes}
                            </span>
                            <span className={isAutoPlayingThis ? "text-gold font-bold flex items-center gap-1" : "text-neutral-400 font-bold"}>
                              {isAutoPlayingThis ? (
                                <>
                                  <span className="w-1 h-1.5 rounded bg-gold animate-soundwave-1" />
                                  <span className="w-1 h-2 rounded bg-gold animate-soundwave-2" />
                                  Live ▶
                                </>
                              ) : (
                                "Watch ▶"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* ⭐ VIEW 2: STEP-BY-STEP SLIDER TRACK */
              <div
                ref={socialTrackContainerRef}
                className="relative overflow-hidden rounded-2xl group/slider p-1 -m-1"
                onMouseEnter={() => setIsSocialTrackHovered(true)}
                onMouseLeave={() => setIsSocialTrackHovered(false)}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {/* Floating Left Slide Button */}
                <button
                  onClick={handlePrevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-black/80 hover:bg-black text-white border border-white/20 shadow-2xl backdrop-blur-md opacity-0 group-hover/slider:opacity-100 transition-all duration-200 transform hover:scale-110 active:scale-95"
                  title="Slide to Previous Video"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                </button>

                {/* Floating Right Slide Button */}
                <button
                  onClick={handleNextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 rounded-full bg-black/80 hover:bg-black text-white border border-white/20 shadow-2xl backdrop-blur-md opacity-0 group-hover/slider:opacity-100 transition-all duration-200 transform hover:scale-110 active:scale-95"
                  title="Slide to Next Video"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                </button>

                {/* Flex Slider Track with Smooth Sliding Transform */}
                <div
                  ref={socialTrackRef}
                  className="flex gap-3 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] py-1.5"
                  style={{
                    transform: `translateX(-${currentTranslateX}px)`,
                  }}
                >
                  {filteredSocialReels.map((reel, idx) => {
                    const isHovered = hoveredSocialId === reel.id;
                    const isAutoPlayingThis = isSocialAutoSlideRunning && (hoveredSocialId ? isHovered : activeAutoPlaySocialId === reel.id);

                    return (
                      <div
                        key={reel.id}
                        onClick={() => {
                          setActiveSocialModal(reel);
                          setSocialSlideIndex(idx);
                          setActiveAutoPlaySocialId(reel.id);
                        }}
                        onMouseEnter={() => setHoveredSocialId(reel.id)}
                        onMouseLeave={() => setHoveredSocialId(null)}
                        className={`relative aspect-[9/16] rounded-2xl overflow-hidden border transition-all duration-500 group cursor-pointer bg-neutral-950 flex-shrink-0 ${
                          isAutoPlayingThis
                            ? reel.platform === 'instagram'
                              ? 'border-pink-500 shadow-2xl ring-2 ring-pink-500/50 scale-[1.03] z-10'
                              : reel.platform === 'tiktok'
                              ? 'border-cyan-400 shadow-2xl ring-2 ring-cyan-400/50 scale-[1.03] z-10'
                              : reel.platform === 'snapchat'
                              ? 'border-yellow-400 shadow-2xl ring-2 ring-yellow-400/50 scale-[1.03] z-10'
                              : reel.platform === 'facebook'
                              ? 'border-blue-500 shadow-2xl ring-2 ring-blue-500/50 scale-[1.03] z-10'
                              : 'border-red-600 dark:border-gold shadow-2xl ring-2 ring-red-600/50 dark:ring-gold/50 scale-[1.03] z-10'
                            : 'border-neutral-300 dark:border-neutral-800 shadow-md hover:border-gold/60 opacity-90 hover:opacity-100 hover:scale-[1.01]'
                        } w-[calc(50%-6px)] sm:w-[calc(33.333%-8px)] md:w-[calc(25%-9px)] lg:w-[calc(20%-10px)] xl:w-[calc(16.666%-10px)]`}
                      >
                        {isAutoPlayingThis ? (
                          /* Live Embedded Auto-Playing Video */
                          <div className="absolute inset-0 bg-black">
                            <iframe
                              key={`live-social-${reel.videoId}`}
                              src={`https://www.youtube.com/embed/${reel.videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${reel.videoId}&modestbranding=1&rel=0&playsinline=1`}
                              title={reel.title}
                              className="w-full h-full border-0 pointer-events-none scale-105"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none" />
                          </div>
                        ) : (
                          /* Static Image Thumbnail */
                          <>
                            <Image
                              src={reel.thumbnail}
                              alt={reel.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              unoptimized
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                          </>
                        )}

                        {/* Top Status & Platform Badge */}
                        <div className="absolute top-2 left-2 z-20 flex items-center gap-1.5 flex-wrap">
                          <div
                            className={`backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] text-white font-mono flex items-center gap-1 shadow ${
                              reel.platform === 'instagram'
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                                : reel.platform === 'tiktok'
                                ? 'bg-neutral-900 border border-cyan-400/50 text-cyan-300'
                                : reel.platform === 'snapchat'
                                ? 'bg-[#FFFC00] text-black font-extrabold'
                                : reel.platform === 'facebook'
                                ? 'bg-[#1877F2]'
                                : 'bg-red-600'
                            }`}
                          >
                            {renderSocialPlatformIcon(reel.platform, 'w-2.5 h-2.5')}
                            <span className="capitalize">{reel.platform}</span>
                          </div>

                          {isAutoPlayingThis && (
                            <div className="bg-red-600/90 backdrop-blur-md px-1.5 py-0.5 rounded-full text-[8px] text-white font-mono font-bold flex items-center gap-1 shadow animate-pulse">
                              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                              <span>AUTO-PLAYING</span>
                            </div>
                          )}
                        </div>

                        {/* Play Button Center Hover (when not playing) */}
                        {!isAutoPlayingThis && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            <div className="w-10 h-10 rounded-full bg-white/90 text-black flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                              <Play className="w-4 h-4 fill-current ml-0.5" />
                            </div>
                          </div>
                        )}

                        {/* Bottom Title, Likes & Views */}
                        <div className="absolute bottom-2 left-2 right-2 text-white space-y-0.5 z-20 pointer-events-none">
                          <h5 className="font-serif font-bold text-[11px] leading-snug line-clamp-2 drop-shadow">
                            {reel.title}
                          </h5>
                          <div className="flex items-center justify-between text-[9px] text-neutral-300 font-mono pt-0.5">
                            <span className="flex items-center gap-1">
                              <Heart className="w-2.5 h-2.5 text-rose-500 fill-rose-500" />
                              {reel.likes}
                            </span>
                            <span className={isAutoPlayingThis ? "text-gold font-bold flex items-center gap-1" : "text-neutral-400 font-bold"}>
                              {isAutoPlayingThis ? (
                                <>
                                  <span className="w-1 h-1.5 rounded bg-gold animate-soundwave-1" />
                                  <span className="w-1 h-2 rounded bg-gold animate-soundwave-2" />
                                  Live ▶
                                </>
                              ) : (
                                "Watch ▶"
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Slide Navigation Dots (visible in Step Mode) */}
            {socialScrollMode === 'step' && (
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none max-w-[80%]">
                  {filteredSocialReels.map((reel, idx) => (
                    <button
                      key={`dot-${reel.id}`}
                      onClick={() => {
                        setSocialSlideIndex(idx);
                        setActiveAutoPlaySocialId(reel.id);
                        setSlideCountdownProgress(0);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        socialSlideIndex === idx
                          ? 'w-6 bg-gold shadow-sm'
                          : 'w-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400'
                      }`}
                      title={`Slide to ${reel.title}`}
                    />
                  ))}
                </div>
                <div className="text-[11px] font-mono text-neutral-500 whitespace-nowrap pl-2">
                  Reel {socialSlideIndex + 1} of {filteredSocialReels.length}
                </div>
              </div>
            )}
          </div>

        </section>

        {/* =========================================================================
            INTERACTIVE SHOP THE LOOK WITH PULSING HOTSPOTS
        ========================================================================== */}
        <section className="my-10">
          <InteractiveShopTheLook />
        </section>

        {/* =========================================================================
            INFINITE AUTO-SLIDING TRENDING JEWELRY MARQUEE (Moving Products)
        ========================================================================== */}
        <section className="my-8 border-y-2 border-neutral-300 dark:border-gold/30">
          <AutoSlidingProductMarquee />
        </section>

        {/* =========================================================================
            ⭐ HIGH-FASHION EDITORIAL CAMPAIGN BANNERS (All 10 Masterwork Editions)
        ========================================================================== */}
        <section className="my-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-300 dark:border-gold/30 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-[#8B6508] dark:text-gold text-xs font-bold uppercase tracking-widest mb-2">
                <Crown className="w-3.5 h-3.5 text-gold animate-bounce" />
                <span>Omnia Stores Official Haute Joaillerie Campaigns</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-serif font-black text-neutral-950 dark:text-white tracking-tight">
                The Editorial Campaign Billboard Series
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-serif mt-1">
                Explore all {leaderboardCampaigns.length} official seasonal campaign edits published across GCC editorial issues.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-neutral-500 hidden sm:inline">
                {leaderboardCampaigns.length} High-Fashion Editions
              </span>
              <a
                href="https://omniastores.com/collections/luxury-sets"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-neutral-950 dark:bg-gold text-white dark:text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow hover:opacity-90 flex items-center gap-1.5"
              >
                <span>Shop All Suites ↗</span>
              </a>
            </div>
          </div>

          {/* 13 Widescreen High-Fashion Campaign Billboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {leaderboardCampaigns.map((banner) => {
              return (
                <div
                  key={banner.id}
                  className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-neutral-300 dark:border-gold/30 bg-black shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:border-gold"
                >
                  {/* Clickable 16:9 Banner Image (Native 1024x576 Ratio - Zero Cropping, Zero Void) */}
                  <a
                    href={banner.ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative aspect-[16/9] w-full overflow-hidden cursor-pointer"
                    title={`Explore ${banner.title} on Omnia Stores`}
                  >
                    <Image
                      src={banner.image}
                      alt={banner.title}
                      fill
                      className="object-contain object-center transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                    {/* Top Tag & Code Floating Bar */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
                      <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-gold border border-gold/40 text-[10px] font-mono font-bold uppercase tracking-wider shadow">
                        {banner.tag}
                      </span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleCopyCode(banner.code, 'banner');
                        }}
                        className="pointer-events-auto px-2.5 py-1 rounded-full bg-gold hover:bg-gold-light text-black text-[10px] font-mono font-black uppercase tracking-wider transition-colors shadow-md flex items-center gap-1 active:scale-95"
                        title="Copy promo code"
                      >
                        {copiedBannerCode === banner.code ? (
                          <>
                            <Check className="w-3 h-3 text-black" />
                            <span>COPIED!</span>
                          </>
                        ) : (
                          <span>{banner.code} (15% OFF)</span>
                        )}
                      </button>
                    </div>

                    {/* Bottom Floating Bar: Perk Pill & Direct Shop Button (No text clutter over model) */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
                      <span className="px-2.5 py-1 rounded-lg bg-black/85 backdrop-blur-md text-gold text-[10px] font-mono font-bold flex items-center gap-1.5 border border-gold/30 shadow max-w-[65%]">
                        <Truck className="w-3 h-3 text-gold flex-shrink-0" />
                        <span className="truncate">{banner.perk}</span>
                      </span>

                      <span className="pointer-events-auto px-3.5 py-1.5 rounded-xl bg-gold hover:bg-gold-light text-black font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center gap-1 group-hover:scale-105 transition-all">
                        <span>Shop Suite</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            8. THE 1,000+ ARCHIVAL DISPATCH REPOSITORY (Replaced Recursive Iframe!)
        ========================================================================== */}
        <section
          id="archival-repository"
          className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        >
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B8860B]/10 dark:bg-gold/15 border border-[#B8860B]/30 dark:border-gold/30 text-[#8B6508] dark:text-gold text-xs font-semibold uppercase tracking-widest mb-3 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'أرشيف تقارير الخليج الشامل • 1,002 تقرير معتمد' : 'Full GCC Archival Wire • 1,002 Verified Editions'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-neutral-950 dark:text-white mb-2">
              {isAr ? 'مستودع الأرشيف الاستقصائي لدول الخليج' : 'The GCC Archival Intelligence Repository'}
            </h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-serif">
              {isAr
                ? 'استكشف أكثر من 1,000 ملف إقليمي موثق، وتقارير أسلوب الأناقة، وتحقيقات الأسواق عبر الإمارات والسعودية والكويت وقطر والعواصم العالمية.'
                : 'Explore over 1,000 verified regional dossiers, styling briefs, and market investigations across the United Arab Emirates, Saudi Arabia, Kuwait, Qatar, and international capitals.'}
            </p>
          </div>

          {/* Search & Country Filter Console */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#111520] border border-neutral-300 dark:border-neutral-800 shadow-sm mb-8 space-y-4">
            
            <div className="relative">
              <Search className={`w-4 h-4 text-[#8B6508] dark:text-gold absolute ${isAr ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2`} />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={isAr ? "ابحث في أكثر من 1,000 تقرير موثق (مثل 'الإمارات'، 'لؤلؤ'، 'زفاف')..." : "Search across 1,002 verified dispatches (e.g. 'United Arab Emirates founder', 'pearl', 'bridal')..."}
                className={`w-full ${isAr ? 'pr-11 pl-4 text-right font-arabic' : 'pl-11 pr-4'} py-3 bg-neutral-100 dark:bg-black/60 border border-neutral-300 dark:border-neutral-700 rounded-xl text-sm text-neutral-950 dark:text-white placeholder-neutral-500 focus:outline-none focus:border-[#B8860B] dark:focus:border-gold transition-colors`}
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mr-2 flex items-center gap-1 font-semibold">
                <Globe className="w-3.5 h-3.5 text-[#8B6508] dark:text-gold" /> {isAr ? 'تصفية حسب المنطقة:' : 'Filter Region:'}
              </span>
              {regionsList.map((reg) => (
                <button
                  key={reg}
                  onClick={() => {
                    setSelectedRegion(reg);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    selectedRegion === reg
                      ? 'bg-neutral-950 text-white dark:bg-gold dark:text-black shadow'
                      : 'bg-neutral-100 dark:bg-black/40 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-700'
                  }`}
                >
                  {reg === 'ALL' ? `All Regions (${verifiedDispatches.length})` : reg}
                </button>
              ))}
            </div>

          </div>

          {/* Dispatches Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-400 px-1 font-mono">
              <span>Showing {paginatedDispatches.length} of {filteredDispatches.length} dispatches</span>
              <span>Page {currentPage} of {totalPages || 1}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedDispatches.map((dispatch) => {
                const dispatchNum = parseInt(dispatch.num, 10);
                const mockIndex = !isNaN(dispatchNum) ? Math.abs(dispatchNum - 1) % PRESS_REPORT_MOCKS.length : 0;
                const mock = PRESS_REPORT_MOCKS[mockIndex] ?? {
                  img: '/press-reports/01_gulf_news_style.png',
                  publication: 'Gulf News',
                  edition: 'National Broadsheet',
                };

                const openArticleModal = () => {
                  setActiveModalArticle({
                    id: dispatch.file,
                    title: dispatch.title,
                    publication: `${mock.publication} — ${dispatch.displayCountry}`,
                    category: mock.edition,
                    date: 'October 2026',
                    readTime: '4 min read',
                    coverImage: mock.img,
                    excerpt: dispatch.title,
                    url: dispatch.url,
                    author: {
                      name: 'Omnia Stores Editorial Studio',
                      role: 'Regional Styling & Gemological Intelligence',
                      credentials: `${mock.publication} Research Desk`,
                    },
                  });
                  setModalMode('broadsheet');
                };

                return (
                  <div
                    key={dispatch.file}
                    className="rounded-2xl bg-white dark:bg-[#111520] border border-neutral-200 dark:border-neutral-800 hover:border-[#B8860B] dark:hover:border-gold hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-sm"
                  >
                    {/* Newspaper Publisher Brand Header Bar */}
                    <div className="px-4 py-2.5 bg-neutral-100 dark:bg-[#0E121B] border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 font-mono text-[11px]">
                        <Newspaper className="w-3.5 h-3.5 text-[#B8860B] dark:text-gold" />
                        <span>{mock.publication}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#B8860B]/10 text-[#B8860B] dark:bg-gold/15 dark:text-gold border border-[#B8860B]/30 dark:border-gold/30">
                        {dispatch.displayCountry}
                      </span>
                    </div>

                    {/* Newspaper Report Mockup Image Container */}
                    <div
                      onClick={openArticleModal}
                      className="relative aspect-[720/800] w-full overflow-hidden bg-[#FBF9F5] border-b border-neutral-200 dark:border-neutral-800 cursor-pointer"
                    >
                      <Image
                        src={mock.img}
                        alt={`${mock.publication} report - ${dispatch.title}`}
                        fill
                        unoptimized
                        className="object-contain object-top transition-transform duration-700 ease-out group-hover:scale-102"
                      />
                      {/* Subtle Bottom Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                      {/* Bottom Banner on Image: Dispatch Number and Edition */}
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono">
                        <span className="font-bold text-[#E5C158] drop-shadow">
                          DISPATCH #{dispatch.num}
                        </span>
                        <span className="text-[10px] text-neutral-200 bg-black/80 px-2 py-0.5 rounded backdrop-blur-sm border border-white/15">
                          {mock.edition}
                        </span>
                      </div>
                    </div>

                    {/* Newspaper Report Body & Meta */}
                    <div className="p-5 flex flex-col justify-between flex-1 space-y-3">
                      <div className="space-y-2">
                        <h4
                          onClick={openArticleModal}
                          className="font-serif font-bold text-sm text-neutral-950 dark:text-white group-hover:text-[#B8860B] dark:group-hover:text-gold transition-colors line-clamp-2 leading-snug cursor-pointer"
                        >
                          {dispatch.title}
                        </h4>

                        <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 font-serif italic leading-relaxed">
                          Specialized styling brief and market intelligence dossier curated for luxury bridal and GCC occasions.
                        </p>
                      </div>

                      <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs">
                        <span className="text-[11px] font-mono text-neutral-500">
                          {dispatch.sizeKb} KB
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={openArticleModal}
                            className="px-3 py-1 rounded bg-[#B8860B]/10 hover:bg-[#B8860B] dark:bg-gold/15 dark:hover:bg-gold text-[#8B6508] hover:text-black dark:text-gold dark:hover:text-black font-semibold text-xs transition-colors flex items-center gap-1"
                          >
                            Read Dispatch <ArrowRight className="w-3 h-3" />
                          </button>

                          <a
                            href={dispatch.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded text-neutral-400 hover:text-black dark:hover:text-white"
                            title="Open Original HTML Page in New Tab"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-6 border-t border-neutral-300 dark:border-neutral-800">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-white dark:bg-black/60 border border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-neutral-800 dark:text-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <span className="text-xs text-neutral-700 dark:text-neutral-300 font-mono font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-white dark:bg-black/60 border border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-neutral-800 dark:text-neutral-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 shadow-sm"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

        </section>

        {/* =========================================================================
            ⭐ STORY REELS FULL-SCREEN VIEWER MODAL
        ========================================================================== */}
        {activeStoryIndex !== null && storyReels[activeStoryIndex] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-lg animate-in fade-in duration-200">
            <div className="relative w-full max-w-md h-[85vh] max-h-[720px] rounded-3xl overflow-hidden bg-neutral-950 text-white shadow-2xl flex flex-col justify-between border border-gold/40">
              
              {/* Story Top Progress Bar Track */}
              <div className="p-4 z-20 flex flex-col gap-3 bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-1.5 w-full">
                  {storyReels[activeStoryIndex]?.slides.map((_, i) => (
                    <div key={i} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gold transition-all duration-300 ${
                          i < storySlideIndex
                            ? 'w-full'
                            : i === storySlideIndex
                            ? 'w-full animate-pulse'
                            : 'w-0'
                        }`}
                      />
                    </div>
                  ))}
                </div>

                {/* Header Profile Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full overflow-hidden relative border border-gold">
                      <Image
                        src={storyReels[activeStoryIndex]?.avatar || '/press/inside-luxury-bridal-sets-feature.jpg'}
                        alt="Reel Profile"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-serif font-bold text-white flex items-center gap-1">
                        {storyReels[activeStoryIndex]?.label}
                        <CheckCircle2 className="w-3 h-3 text-gold" />
                      </div>
                      <div className="text-[10px] text-neutral-400 font-mono">
                        {storyReels[activeStoryIndex]?.tag}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveStoryIndex(null)}
                    className="p-1 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Background Slide Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={storyReels[activeStoryIndex]?.slides[storySlideIndex]?.image || '/press/inside-luxury-bridal-sets-feature.jpg'}
                  alt="Story Visual"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
              </div>

              {/* Story Slide Text Content */}
              <div className="p-6 z-20 space-y-3">
                <span className="px-2.5 py-0.5 rounded-full bg-gold/20 text-gold border border-gold/40 text-[10px] font-extrabold uppercase tracking-widest inline-block backdrop-blur-md">
                  {storyReels[activeStoryIndex]?.slides[storySlideIndex]?.badge}
                </span>

                <h3 className="text-2xl font-serif font-black text-white leading-tight drop-shadow-md">
                  {storyReels[activeStoryIndex]?.slides[storySlideIndex]?.title}
                </h3>

                <p className="text-xs text-neutral-300 font-serif leading-relaxed drop-shadow">
                  {storyReels[activeStoryIndex]?.slides[storySlideIndex]?.deck}
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <a
                    href="https://omniastores.com/collections/luxury-sets"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 text-center rounded-xl bg-gold text-black font-extrabold text-xs uppercase tracking-wider hover:bg-gold-light transition-all shadow-lg"
                  >
                    Shop This Suite ↗
                  </a>
                  <button
                    onClick={() => {
                      setActiveStoryIndex(null);
                      setActiveModalArticle(leadStory);
                    }}
                    className="px-4 py-3 rounded-xl bg-white/20 text-white hover:bg-white/30 backdrop-blur-md font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    Read Wire
                  </button>
                </div>
              </div>

              {/* Left/Right Tap Zones for Story Navigation */}
              <div className="absolute inset-0 z-10 flex">
                <div
                  className="w-1/2 h-full cursor-w-resize"
                  onClick={() => {
                    if (storySlideIndex > 0) {
                      setStorySlideIndex(storySlideIndex - 1);
                    } else if (activeStoryIndex > 0) {
                      setActiveStoryIndex(activeStoryIndex - 1);
                      setStorySlideIndex(0);
                    }
                  }}
                />
                <div
                  className="w-1/2 h-full cursor-e-resize"
                  onClick={() => {
                    const currentReel = storyReels[activeStoryIndex];
                    if (currentReel && storySlideIndex < currentReel.slides.length - 1) {
                      setStorySlideIndex(storySlideIndex + 1);
                    } else if (activeStoryIndex < storyReels.length - 1) {
                      setActiveStoryIndex(activeStoryIndex + 1);
                      setStorySlideIndex(0);
                    } else {
                      setActiveStoryIndex(null);
                    }
                  }}
                />
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            ⭐ OMNICHANNEL SOCIAL REELS VERTICAL MODAL (Instagram, TikTok, YouTube, Snapchat, Facebook)
        ========================================================================== */}
        {activeSocialModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
            <div className={`relative w-full max-w-sm h-[88vh] max-h-[740px] rounded-3xl overflow-hidden bg-black text-white shadow-2xl flex flex-col justify-between border-2 ${
              activeSocialModal.platform === 'instagram'
                ? 'border-pink-500 ring-2 ring-pink-500/40'
                : activeSocialModal.platform === 'tiktok'
                ? 'border-cyan-400 ring-2 ring-cyan-400/40'
                : activeSocialModal.platform === 'snapchat'
                ? 'border-yellow-400 ring-2 ring-yellow-400/40'
                : activeSocialModal.platform === 'facebook'
                ? 'border-blue-500 ring-2 ring-blue-500/40'
                : 'border-red-600 ring-2 ring-red-600/40'
            }`}>
              
              {/* Header with Platform Branding */}
              <div className="p-3.5 z-20 flex items-center justify-between bg-gradient-to-b from-black/95 via-black/80 to-transparent">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg flex items-center justify-center ${
                    activeSocialModal.platform === 'instagram'
                      ? 'bg-gradient-to-tr from-purple-600 to-pink-600 text-white'
                      : activeSocialModal.platform === 'tiktok'
                      ? 'bg-neutral-900 border border-cyan-400 text-cyan-300'
                      : activeSocialModal.platform === 'snapchat'
                      ? 'bg-[#FFFC00] text-black font-extrabold'
                      : activeSocialModal.platform === 'facebook'
                      ? 'bg-[#1877F2] text-white'
                      : 'bg-red-600 text-white'
                  }`}>
                    {renderSocialPlatformIcon(activeSocialModal.platform, 'w-3.5 h-3.5')}
                  </div>
                  <div>
                    <div className="text-xs font-bold font-mono tracking-wider uppercase flex items-center gap-1.5">
                      <span>{activeSocialModal.platform} REEL</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                    </div>
                    <div className="text-[10px] text-neutral-400 font-mono">
                      {activeSocialModal.handle}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveSocialModal(null)}
                  className="p-1.5 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
                  title="Close Reel Player"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Vertical Player: Embedded Real 9:16 Video Player with Sound */}
              <div className="absolute inset-0 z-10 pt-14 pb-36 px-2 flex items-center justify-center bg-black">
                <iframe
                  key={`modal-${activeSocialModal.id}-${activeSocialModal.videoId}`}
                  src={`https://www.youtube.com/embed/${activeSocialModal.videoId}?autoplay=1&mute=0&rel=0&modestbranding=1&loop=1&playlist=${activeSocialModal.videoId}`}
                  title={activeSocialModal.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full rounded-2xl border-0 shadow-2xl"
                />
              </div>

              {/* Bottom Info, Metrics & Direct Social Link */}
              <div className="p-4 z-20 bg-gradient-to-t from-black via-black/95 to-transparent space-y-2.5 mt-auto">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-gold border border-gold/30 text-[9px] font-mono font-bold uppercase tracking-wider">
                    {activeSocialModal.tag}
                  </span>
                  <span className="text-[10px] text-neutral-300 font-serif italic line-clamp-1">
                    {activeSocialModal.subtitle}
                  </span>
                </div>

                <h4 className="font-serif font-black text-xs text-white leading-tight line-clamp-2">
                  {activeSocialModal.title}
                </h4>

                {/* Social Metrics */}
                <div className="flex items-center gap-3 text-[11px] font-mono text-neutral-300 py-1 border-t border-white/10">
                  <span className="flex items-center gap-1 text-gold">
                    <Eye className="w-3 h-3" />
                    {activeSocialModal.views}
                  </span>
                  <span className="flex items-center gap-1 text-rose-400">
                    <Heart className="w-3 h-3 fill-rose-500" />
                    {activeSocialModal.likes}
                  </span>
                  <span className="flex items-center gap-1 text-sky-400">
                    <MessageCircle className="w-3 h-3" />
                    {activeSocialModal.comments}
                  </span>
                </div>

                {/* Navigation and Platform Direct Follow/Watch Action */}
                <div className="flex items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handlePrevSocialReel}
                      className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-neutral-300 font-mono transition-colors"
                      title="Previous Reel"
                    >
                      Prev
                    </button>
                    <button
                      onClick={handleNextSocialReel}
                      className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-gold font-bold font-mono transition-colors"
                      title="Next Reel"
                    >
                      Next
                    </button>
                  </div>

                  <a
                    href={activeSocialModal.platformUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs transition-transform active:scale-95 shadow-lg ${
                      activeSocialModal.platform === 'instagram'
                        ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white hover:brightness-110'
                        : activeSocialModal.platform === 'tiktok'
                        ? 'bg-neutral-900 border border-cyan-400 text-cyan-300 hover:bg-neutral-800'
                        : activeSocialModal.platform === 'snapchat'
                        ? 'bg-[#FFFC00] text-black hover:bg-yellow-300'
                        : activeSocialModal.platform === 'facebook'
                        ? 'bg-[#1877F2] text-white hover:bg-blue-600'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                    title={`Open on ${activeSocialModal.platform}`}
                  >
                    <span>Follow on {activeSocialModal.platform.toUpperCase()}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================================================
            ⭐ SAVED BOOKMARKS DRAWER
        ========================================================================== */}
        {isSavedDrawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md h-full bg-white dark:bg-[#0E121B] shadow-2xl border-l border-neutral-300 dark:border-gold/30 p-6 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
                  <div className="flex items-center gap-2">
                    <Bookmark className="w-5 h-5 text-gold fill-gold" />
                    <h3 className="font-serif font-black text-lg text-neutral-950 dark:text-white uppercase">
                      Saved Dispatches ({bookmarkedIds.length})
                    </h3>
                  </div>
                  <button
                    onClick={() => setIsSavedDrawerOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {bookmarkedIds.length === 0 ? (
                  <div className="py-12 text-center space-y-2 text-neutral-500">
                    <Bookmark className="w-8 h-8 mx-auto opacity-40" />
                    <p className="text-xs font-serif">No dispatches bookmarked yet.</p>
                    <p className="text-[11px] text-neutral-400">Click the bookmark icon on any article to save it for later reading.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {allArticles.filter((a) => bookmarkedIds.includes(a.id)).map((art) => (
                      <div
                        key={art.id}
                        onClick={() => {
                          setActiveModalArticle(art);
                          setIsSavedDrawerOpen(false);
                        }}
                        className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-gold cursor-pointer transition-all space-y-1.5 group"
                      >
                        <div className="text-[10px] text-[#8B6508] dark:text-gold font-bold uppercase">
                          {art.publication}
                        </div>
                        <h4 className="font-serif font-bold text-xs text-neutral-950 dark:text-white group-hover:text-gold transition-colors line-clamp-2">
                          {art.title}
                        </h4>
                        <div className="text-[10px] text-neutral-500 flex items-center justify-between pt-1">
                          <span>{art.readTime}</span>
                          <span className="text-gold font-semibold flex items-center gap-1">Read →</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {bookmarkedIds.length > 0 && (
                <button
                  onClick={() => setBookmarkedIds([])}
                  className="w-full py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs text-neutral-600 dark:text-neutral-400 hover:text-red-500 font-semibold transition-colors mt-6"
                >
                  Clear All Saved Dispatches
                </button>
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            9. BROADSHEET ARTICLE READING MODAL (Full Journalistic Experience)
        ========================================================================== */}
        {activeModalArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#0E121B] rounded-2xl shadow-2xl border border-neutral-300 dark:border-gold/30 flex flex-col overflow-hidden">
              
              {/* Modal Newspaper Masthead Header */}
              <div className="p-4 border-b border-neutral-300 dark:border-neutral-800 bg-[#F4EFE6] dark:bg-[#111520] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest bg-neutral-900 text-white dark:bg-gold dark:text-black px-2 py-0.5 rounded">
                    {getPublicationLabel(activeModalArticle.publication, isAr) || (isAr ? 'ذا جلف كرونيكل' : 'THE GULF CHRONICLE')}
                  </span>
                  <span className="text-xs font-mono text-neutral-500 hidden sm:inline">
                    {isAr && activeModalArticle.dateAr ? activeModalArticle.dateAr : (activeModalArticle.date || 'October 2026')} • {isAr && activeModalArticle.readTimeAr ? activeModalArticle.readTimeAr : (activeModalArticle.readTime || '5 min read')}
                  </span>
                </div>

                {/* Right Action Icons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyLink(activeModalArticle.url || `/trending/${activeModalArticle.slug}`)}
                    className="p-1.5 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 text-xs flex items-center gap-1 hover:border-gold transition-colors"
                    title={isAr ? 'نسخ رابط المقال' : 'Copy Article Link'}
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span className="hidden sm:inline text-[11px]">{copiedLink ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'مشاركة' : 'Share')}</span>
                  </button>

                  {activeModalArticle.url && (
                    <a
                      href={activeModalArticle.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 text-xs flex items-center gap-1 hover:border-gold transition-colors"
                      title={isAr ? 'فتح في نافذة جديدة' : 'Open in new window'}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline text-[11px]">{isAr ? 'بوابة النشر' : 'Portal Tab'}</span>
                    </a>
                  )}

                  <button
                    onClick={() => setActiveModalArticle(null)}
                    className="p-1.5 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Body: Broadsheet Content vs Document View */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
                
                {/* Headline & Standfirst */}
                <div className="space-y-3 border-b border-neutral-200 dark:border-neutral-800 pb-6">
                  <div className="text-xs uppercase tracking-widest font-extrabold text-[#8B6508] dark:text-gold">
                    {isAr && activeModalArticle.categoryAr ? activeModalArticle.categoryAr : (activeModalArticle.category || 'Special Report')}
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-serif font-black text-neutral-950 dark:text-white leading-tight">
                    {isAr && activeModalArticle.titleAr ? activeModalArticle.titleAr : activeModalArticle.title}
                  </h3>
                  {(activeModalArticle.excerpt || activeModalArticle.excerptAr) && (
                    <p className="text-base sm:text-lg font-serif italic text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {isAr && activeModalArticle.excerptAr ? activeModalArticle.excerptAr : activeModalArticle.excerpt}
                    </p>
                  )}
                  {activeModalArticle.author && (
                    <div className="text-xs text-neutral-500 pt-1">
                      {isAr ? 'بقلم: ' : 'By '}<span className="font-bold text-neutral-900 dark:text-white">{activeModalArticle.author.name}</span>
                      {activeModalArticle.author.credentials && ` • ${activeModalArticle.author.credentials}`}
                    </div>
                  )}
                </div>

                {/* Mode Selector for Dispatches */}
                {activeModalArticle.url && (
                  <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
                    <button
                      onClick={() => setModalMode('broadsheet')}
                      className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                        modalMode === 'broadsheet'
                          ? 'bg-neutral-900 text-white dark:bg-gold dark:text-black shadow'
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      Broadsheet Newspaper View
                    </button>
                    <button
                      onClick={() => setModalMode('document')}
                      className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                        modalMode === 'document'
                          ? 'bg-neutral-900 text-white dark:bg-gold dark:text-black shadow'
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      Raw Portal Article View
                    </button>
                  </div>
                )}

                {/* Full-Fidelity Original Broadsheet Newspaper Reader */}
                {modalMode === 'broadsheet' && (
                  <div className="space-y-4">
                    {/* Edition Selector Tabs & Zoom Toolbar */}
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800 gap-3 flex-wrap">
                      <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
                        <span className="text-[10px] font-mono font-bold text-[#8B6508] dark:text-gold uppercase tracking-wider mr-1 shrink-0 flex items-center gap-1">
                          <Newspaper className="w-3.5 h-3.5" /> BROADSHEETS:
                        </span>
                        {ORIGINAL_OMNIA_BROADSHEETS.map((edition) => (
                          <button
                            key={edition.id}
                            onClick={() => {
                              setActiveBroadsheetImg(edition.img);
                              setBroadsheetZoom(1);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                              activeBroadsheetImg === edition.img
                                ? 'bg-[#B8860B] text-black shadow-md'
                                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                            }`}
                          >
                            <span>{edition.masthead}</span>
                          </button>
                        ))}
                        {activeModalArticle.coverImage && !ORIGINAL_OMNIA_BROADSHEETS.some((e) => e.img === activeModalArticle.coverImage) && (
                          <button
                            onClick={() => {
                              setActiveBroadsheetImg(activeModalArticle.coverImage);
                              setBroadsheetZoom(1);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                              activeBroadsheetImg === activeModalArticle.coverImage
                                ? 'bg-[#B8860B] text-black shadow-md'
                                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                            }`}
                          >
                            <span>Dispatch Mockup</span>
                          </button>
                        )}
                      </div>

                      {/* Zoom Controls */}
                      <div className="flex items-center gap-1.5 shrink-0 bg-neutral-100 dark:bg-neutral-800/80 p-1 rounded-xl border border-neutral-200 dark:border-neutral-700">
                        <button
                          onClick={() => setBroadsheetZoom((z) => Math.max(0.7, z - 0.2))}
                          className="w-7 h-7 rounded-lg bg-white dark:bg-black/60 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-bold flex items-center justify-center transition-colors"
                          title="Zoom Out"
                        >
                          −
                        </button>
                        <span className="text-[11px] font-mono px-1.5 text-neutral-600 dark:text-neutral-300 font-bold min-w-[42px] text-center">
                          {Math.round(broadsheetZoom * 100)}%
                        </span>
                        <button
                          onClick={() => setBroadsheetZoom((z) => Math.min(2.5, z + 0.2))}
                          className="w-7 h-7 rounded-lg bg-white dark:bg-black/60 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-bold flex items-center justify-center transition-colors"
                          title="Zoom In"
                        >
                          +
                        </button>
                        <button
                          onClick={() => setBroadsheetZoom(1)}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-black/60 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-[11px] font-semibold transition-colors"
                          title="Fit Full Page"
                        >
                          Fit Page
                        </button>
                        <a
                          href={activeBroadsheetImg}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 rounded-lg bg-white dark:bg-black/60 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs flex items-center justify-center transition-colors"
                          title="Open Full Resolution Broadsheet"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    {/* Broadsheet Full Display Viewport */}
                    <div className="w-full bg-[#07090E] rounded-2xl border border-neutral-300 dark:border-neutral-800 p-2 sm:p-5 flex justify-center items-start overflow-auto max-h-[72vh] shadow-2xl relative">
                      <div
                        style={{ transform: `scale(${broadsheetZoom})`, transformOrigin: 'top center' }}
                        className="transition-transform duration-200 ease-out flex justify-center w-full"
                      >
                        <img
                          src={activeBroadsheetImg}
                          alt="Full Page Broadsheet Newspaper Report"
                          className="max-h-[70vh] w-auto h-auto object-contain rounded-lg shadow-2xl border border-neutral-700/80 cursor-zoom-in"
                          onClick={() => setBroadsheetZoom((z) => (z === 1 ? 1.5 : 1))}
                          title="Click to zoom / reset"
                        />
                      </div>
                    </div>

                    {/* Featured Omnia Stores Products Bar for Active Broadsheet */}
                    <div className="p-4 rounded-xl bg-neutral-100 dark:bg-[#111520] border border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-4 flex-wrap">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <Sparkles className="w-4 h-4 text-[#B8860B] dark:text-gold shrink-0" />
                          <span className="font-bold text-neutral-900 dark:text-white uppercase tracking-wider text-[11px]">
                            Original Omnia Stores Broadsheet Feature
                          </span>
                        </div>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 font-serif">
                          Models photographed in official Omnia Stores 925 sterling silver, simulated diamond chokers, and bridal suites.
                        </p>
                      </div>
                      <a
                        href="https://omniastores.com/collections/luxury-sets"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA8C2C] text-black font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-transform flex items-center gap-1.5 shrink-0"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Shop Featured Look ↗</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* Content Rendering */}
                {modalMode === 'document' && activeModalArticle.url ? (
                  <div className="w-full h-[500px] rounded-xl overflow-hidden border border-neutral-300 dark:border-neutral-700">
                    <iframe
                      src={activeModalArticle.url}
                      className="w-full h-full border-0"
                      title={activeModalArticle.title}
                    />
                  </div>
                ) : (activeModalArticle.contentHtml || activeModalArticle.contentHtmlAr) ? (
                  <div
                    className="prose dark:prose-invert max-w-none text-neutral-800 dark:text-neutral-200 font-serif leading-relaxed space-y-4"
                    dangerouslySetInnerHTML={{ __html: (isAr && activeModalArticle.contentHtmlAr) ? activeModalArticle.contentHtmlAr : activeModalArticle.contentHtml }}
                  />
                ) : (
                  <div className="space-y-4 font-serif text-neutral-800 dark:text-neutral-200 leading-relaxed text-sm sm:text-base">
                    <p className="lead font-bold">
                      {isAr
                        ? 'وفقاً لتقارير أعدها المكتب التحريري الخليجي، تركز هذه النشرة على مهارات الحرف اليدوية ومعايير الدمغ ونقاء الفضة الإسترلينية المصممة للمناسبات الإقليمية.'
                        : 'According to reports compiled by the GCC Editorial Bureau, this edition focuses on the craft, hallmarking integrity, and styling protocols of luxury demi-fine jewelry tailored for regional celebrations.'}
                    </p>
                    <p>
                      {isAr
                        ? 'أرست أمنية ستورز معياراً رائداً في الإمارات والسعودية بدمج الفضة عيار 925 المعتمدة مع أحجار محاكاة الألماس الفاخرة المرصعة بحرفية المخالب الإيطالية.'
                        : 'Omnia Stores has set a regional benchmark across the United Arab Emirates and Saudi Arabia by combining certified 925 sterling silver with Premium simulated diamonds handset using Italian micro-prong craftsmanship.'}
                    </p>
                    <blockquote className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-900 border-l-4 border-gold italic text-sm">
                      {isAr
                        ? '«المجوهرات الفاخرة الحقيقية في الخليج اليوم تجمع بين الفخامة الملكية ونقاء السبائك المفحوصة مخبرياً مع شفافية الأسعار الإقليمية.»'
                        : '“Authentic luxury jewelry in the modern Gulf balances ceremonial splendor with laboratory-verified alloy integrity and transparent regional pricing.”'}
                    </blockquote>
                    <p>
                      {isAr
                        ? 'تخضع كل قطعة لاختبارات وفحوصات معتمدة تضمن نسبة نقاء لا تقل عن 92.5% من الفضة الخالصة وفقاً لأعلى المعايير الخليجية.'
                        : 'Every piece is subject to independent Dubai Central Laboratories (DCL) hallmarking protocols, guaranteeing minimum 92.5% elemental silver composition under UAE Cabinet Resolution No. 23.'}
                    </p>
                  </div>
                )}

                {/* E-E-A-T Assurance Footer inside Modal */}
                <div className="p-4 rounded-xl bg-[#F4EFE6] dark:bg-[#111520] border border-neutral-300 dark:border-neutral-800 text-xs space-y-2">
                  <div className="font-bold uppercase tracking-wider text-[#8B6508] dark:text-gold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> {isAr ? 'الاستقلالية التحريرية وبروتوكولات الفحص المخبري E-E-A-T' : 'Editorial Independence & Assay Protocol'}
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {isAr
                      ? 'تم إعداد هذا التقرير وتدقيقه وفقاً لأعلى معايير الخبرة والشفافية التحريرية بواسطة خبراء أحجار معتمدين. لا توجد تصنيفات مدفوعة.'
                      : 'This dossier was researched and verified under strict E-E-A-T guidelines by certified gemologists and standards auditors. Zero paid ranking.'}
                  </p>
                </div>

              </div>

              {/* Modal Footer Controls */}
              <div className="p-4 border-t border-neutral-300 dark:border-neutral-800 bg-[#F4EFE6] dark:bg-[#111520] flex items-center justify-between">
                <button
                  onClick={() => setActiveModalArticle(null)}
                  className="px-4 py-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-bold hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
                >
                  {isAr ? 'إغلاق القارئ' : 'Close Reader'}
                </button>

                {activeModalArticle.slug && (
                  <Link
                    href={`/trending/${activeModalArticle.slug}`}
                    className="px-4 py-2 rounded-lg bg-neutral-950 dark:bg-gold text-white dark:text-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 dark:hover:bg-gold-light transition-colors flex items-center gap-1.5"
                  >
                    <span>{isAr ? 'فتح النشرة التحريرية الكاملة' : 'Open Syndication Wire'}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
                  </Link>
                )}
              </div>

            </div>
          </div>
        )}

      </main>
    </>
  );
}
