'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { X, Sparkles, ExternalLink, RotateCcw, ArrowRight, ShieldCheck, Flame, Tag } from 'lucide-react';
import { useLuxury } from './ThemeProvider';

export interface SkyscraperProduct {
  id: string;
  title: string;
  titleAr: string;
  category: string;
  discountBadge: string;
  priceAed: number;
  originalPriceAed: number;
  priceSar: number;
  image: string;
  productUrl: string;
  isFeatured?: boolean;
  isNew?: boolean;
}

interface OmniaStoresSkyscraperAdProps {
  className?: string;
  compact?: boolean;
  title?: string;
  titleAr?: string;
}

export function OmniaStoresSkyscraperAd({
  className = '',
  compact = false,
  title,
  titleAr,
}: OmniaStoresSkyscraperAdProps) {
  const { language } = useLuxury();
  const isAr = language === 'ar';
  const [isDismissed, setIsDismissed] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'bridal' | 'bracelets' | 'rings'>('all');
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  const [activeNewIndex, setActiveNewIndex] = useState<number>(0);

  // Auto-cycle subtle spotlight on new products every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveNewIndex((prev) => (prev + 1) % 4);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // 6 Curated Commercial Products from omniastores.com with ACCURATE STORE PRICES and -15% VIP DISCOUNT
  const productsByTab: Record<string, SkyscraperProduct[]> = useMemo(() => ({
    all: [
      {
        id: 'ad-prod-1',
        title: 'Omnia Audrey Blue Bridal Full Set in High Quality Simulated Diamonds',
        titleAr: 'طقم أودري الأزرق الفاخر للعرائس مرصع بالألماس السويسري',
        category: 'Bridal Set',
        discountBadge: '-15%',
        priceAed: 700,
        originalPriceAed: 825,
        priceSar: 715,
        image: 'https://cdn.shopify.com/s/files/1/0676/2161/7750/files/Omnia_Audrey_Blue_Luxury_Bridal_Full_Set_in_High_Quality_Simulated_Diamonds_Premium_Rhodium_Plated_with_Cushion_Cut_Stones.jpg?v=1791973615',
        productUrl: 'https://omniastores.com/products/omnia-audrey-blue-luxury-bridal-full-set-in-high-quality-simulated-diamonds-premium-rhodium-plated-with-cushion-cut-stones',
        isFeatured: true,
        isNew: false,
      },
      {
        id: 'ad-prod-2',
        title: 'Omnia Audrey Yellow Imperial Set with Cushion Cut Premium Rhodium',
        titleAr: 'طقم أودري الأصفر الإمبراطوري بطلاء الروديوم الإيطالي',
        category: 'Imperial Set',
        discountBadge: '-15%',
        priceAed: 700,
        originalPriceAed: 825,
        priceSar: 715,
        image: 'https://cdn.shopify.com/s/files/1/0676/2161/7750/files/Omnia_Audrey_Yellow_Bridal_Full_Set_in_High_Quality_Simulated_Diamonds_Premium_Rhodium_Plated.jpg?v=1791973578',
        productUrl: 'https://omniastores.com/products/omnia-audrey-yellow-bridal-full-set-in-high-quality-simulated-diamonds-premium-rhodium-plated',
        isNew: false,
      },
      {
        id: 'ad-prod-3',
        title: 'Nilda Pearl Bangle & Cocktail Ring Set with Simulated Diamonds',
        titleAr: 'إسوارة وخاتم نيلدا اللؤلؤي مع أحجار الألماس المحاكية',
        category: 'Pearl Bangle',
        discountBadge: '-15%',
        priceAed: 280,
        originalPriceAed: 330,
        priceSar: 286,
        image: 'https://cdn.shopify.com/s/files/1/0676/2161/7750/files/Unknown_3d80258a-d9d8-4621-aed4-ddb87042fff6.jpg?v=1787405945',
        productUrl: 'https://omniastores.com/products/nilda-pearl-bangle-ring-set-with-premium-simulated-diamonds-in-rhodium-plated-alloy',
        isNew: false,
      },
      {
        id: 'ad-prod-4',
        title: 'Omnia Fajr Green High-Luster Bracelet with Tarnish Resistant Plating',
        titleAr: 'إسوارة فجر الخضراء الفاخرة المقاومة للتغير اللوني',
        category: 'Tennis Line',
        discountBadge: '-15%',
        priceAed: 370,
        originalPriceAed: 435,
        priceSar: 378,
        image: 'https://cdn.shopify.com/s/files/1/0676/2161/7750/files/88856344C3.jpg?v=1787402260',
        productUrl: 'https://omniastores.com/products/omnia-fajr-green-bracelet-in-high-quality-zircon-stone-in-tarnish-resistant-plating',
        isNew: false,
      },
      {
        id: 'ad-prod-5',
        title: 'Omnia Nuray Luxury Bridal Full Set Accessories in Rhodium Plating',
        titleAr: 'طقم نوراي الملكي الفاخر للعرائس مرصع بالزركون السويسري',
        category: 'Bridal Set',
        discountBadge: '-15%',
        priceAed: 1070,
        originalPriceAed: 1270,
        priceSar: 1090,
        image: 'https://cdn.shopify.com/s/files/1/0676/2161/7750/files/photo_2025-04-1721.53.01_9515e309-9700-45f1-8e71-80dbfeb27318.jpg?v=1792285300',
        productUrl: 'https://omniastores.com/products/omnia-nuray-luxury-bridal-full-set-accessories-in-high-quality-zircon-stones-in-rhodium-plating',
        isNew: true,
      },
      {
        id: 'ad-prod-6',
        title: 'Omnia Audrey White Droplet Chandelier Bridal Set with VVS1 Cut',
        titleAr: 'أقراط وعقد أودري البيضاء المتدلية ببريق الألماس النقي',
        category: 'Drops Suite',
        discountBadge: '-15%',
        priceAed: 700,
        originalPriceAed: 825,
        priceSar: 715,
        image: 'https://cdn.shopify.com/s/files/1/0676/2161/7750/files/Omnia_Audrey_White_Bridal_Set_Accessories_in_High_Quality_Simulated_Diamonds_Premium_Rhodium_Plated.jpg?v=1791973576',
        productUrl: 'https://omniastores.com/products/omnia-audrey-white-bridal-set-accessories-in-high-quality-simulated-diamonds-premium-rhodium-plated',
        isNew: true,
      },
    ],
    bridal: [
      {
        id: 'ad-bridal-1',
        title: 'Omnia Nuray Luxury Bridal Full Set Accessories',
        titleAr: 'طقم نوراي الملكي الفاخر للعرائس',
        category: 'Bridal Set',
        discountBadge: '-15%',
        priceAed: 1070,
        originalPriceAed: 1270,
        priceSar: 1090,
        image: 'https://cdn.shopify.com/s/files/1/0676/2161/7750/files/photo_2025-04-1721.53.01_9515e309-9700-45f1-8e71-80dbfeb27318.jpg?v=1792285300',
        productUrl: 'https://omniastores.com/products/omnia-nuray-luxury-bridal-full-set-accessories-in-high-quality-zircon-stones-in-rhodium-plating',
        isNew: true,
      },
      {
        id: 'ad-bridal-2',
        title: 'Liah Green Luxury Bridal Full Set with High-Quality Zircon',
        titleAr: 'طقم ليا الأخضر الملكي للعرائس بطلاء الروديوم الفاخر',
        category: 'Bridal Set',
        discountBadge: '-15%',
        priceAed: 1170,
        originalPriceAed: 1380,
        priceSar: 1195,
        image: 'https://cdn.shopify.com/s/files/1/0676/2161/7750/files/2026-10-21_13.24.10.jpg?v=1792574718',
        productUrl: 'https://omniastores.com/products/liah-green-luxury-bridal-full-set-with-high-quality-zircon-stones-premium-rhodium-plating',
        isNew: true,
      },
      {
        id: 'ad-bridal-3',
        title: 'Nadirra Blue Luxury Bridal Full Set with Cushion Drops',
        titleAr: 'طقم نادرة الأزرق الملكي المتدلي ببريق استثنائي',
        category: 'Bridal Set',
        discountBadge: '-15%',
        priceAed: 970,
        originalPriceAed: 1140,
        priceSar: 990,
        image: 'https://cdn.shopify.com/s/files/1/0676/2161/7750/files/Nadirra_Blue_Luxury_Bridal_Full_Set_with_High-Quality_Zircon_Stones_Premium_Rhodium_Plating_on_model.jpg?v=1791811562',
        productUrl: 'https://omniastores.com/products/nadirra-blue-luxury-bridal-full-set-with-high-quality-zircon-stones-premium-rhodium-plating',
        isNew: false,
      },
      {
        id: 'ad-bridal-4',
        title: 'Omnia Audrey Blue Luxury Bridal Full Set in Simulated Diamonds',
        titleAr: 'طقم أودري الأزرق الفاخر للعرائس مرصع بالألماس السويسري',
        category: 'Bridal Set',
        discountBadge: '-15%',
        priceAed: 700,
        originalPriceAed: 825,
        priceSar: 715,
        image: 'https://cdn.shopify.com/s/files/1/0676/2161/7750/files/Omnia_Audrey_Blue_Luxury_Bridal_Full_Set_in_High_Quality_Simulated_Diamonds_Premium_Rhodium_Plated_with_Cushion_Cut_Stones.jpg?v=1791973615',
        productUrl: 'https://omniastores.com/products/omnia-audrey-blue-luxury-bridal-full-set-in-high-quality-simulated-diamonds-premium-rhodium-plated-with-cushion-cut-stones',
        isFeatured: true,
        isNew: false,
      },
      {
        id: 'ad-bridal-5',
        title: 'Nadirra Ruby Red Luxury Bridal Full Set with Cushion Stones',
        titleAr: 'طقم نادرة الأحمر الياقوتي للعرائس',
        category: 'Bridal Set',
        discountBadge: '-15%',
        priceAed: 970,
        originalPriceAed: 1140,
        priceSar: 990,
        image: 'https://cdn.shopify.com/s/files/1/0676/2161/7750/files/Nadirra_Ruby_Red_Luxury_Bridal_Full_Set_with_High-Quality_Zircon_Stones_Premium_Rhodium_Plating_ON_MODEL.jpg?v=1791811504',
        productUrl: 'https://omniastores.com/products/nadirra-ruby-red-luxury-bridal-full-set-with-high-quality-zircon-stones-premium-rhodium-plating',
        isNew: false,
      },
      {
        id: 'ad-bridal-6',
        title: 'Omnia Audrey Yellow Imperial Set with Cushion Cut Stones',
        titleAr: 'طقم أودري الأصفر الإمبراطوري بطلاء الروديوم الإيطالي',
        category: 'Bridal Set',
        discountBadge: '-15%',
        priceAed: 700,
        originalPriceAed: 825,
        priceSar: 715,
        image: 'https://cdn.shopify.com/s/files/1/0676/2161/7750/files/Omnia_Audrey_Yellow_Bridal_Full_Set_in_High_Quality_Simulated_Diamonds_Premium_Rhodium_Plated.jpg?v=1791973578',
        productUrl: 'https://omniastores.com/products/omnia-audrey-yellow-bridal-full-set-in-high-quality-simulated-diamonds-premium-rhodium-plated',
        isNew: false,
      },
    ],
    bracelets: [
      {
        id: 'ad-brac-1',
        title: 'Maysun Green Gold-Plated Tennis Bracelet in 925 Silver',
        titleAr: 'إسوارة ميسون الخضراء بطلاء الذهب والفضة 925',
        category: 'Tennis Line',
        discountBadge: '-15%',
        priceAed: 500,
        originalPriceAed: 590,
        priceSar: 510,
        image: 'https://cdn.shopify.com/s/files/1/0676/2161/7750/files/photo_2026-05-05_20-17-31_13857daf-196c-43a5-8179-7cb8a2818250.jpg?v=1787404684',
        productUrl: 'https://omniastores.com/products/maysun-green-gold-plated-bracelet-in-925-silver-with-premium-simulated-diamonds',
        isNew: true,
      },
      {
        id: 'ad-brac-2',
        title: 'Maysun Baby Blue Gold-Plated Tennis Bracelet in 925 Silver',
        titleAr: 'إسوارة ميسون السماوية بطلاء الذهب والفضة 925',
        category: 'Tennis Line',
        discountBadge: '-15%',
        priceAed: 500,
        originalPriceAed: 590,
        priceSar: 510,
        image: 'https://cdn.shopify.com/s/files/1/0676/2161/7750/files/photo_2026-05-05_20-13-20.jpg?v=1787404675',
        productUrl: 'https://omniastores.com/products/maysun-baby-blue-gold-plated-bracelet-in-925-silver-with-premium-simulated-diamonds',
        isNew: false,
      },
      {
        id: 'ad-brac-3',
        title: 'Maysun Pink Gold-Plated Bracelet in 925 Silver',
        titleAr: 'إسوارة ميسون الوردية بطلاء الذهب والفضة 925',
        category: 'Tennis Line',
        discountBadge: '-15%',
        priceAed: 500,
        originalPriceAed: 590,
        priceSar: 510,
        image: 'https://cdn.shopify.com/s/files/1/0676/2161/7750/files/photo_2026-05-05_20-11-54_3d3a717c-ffad-48c3-b464-2ae77e4f6a91.jpg?v=1787404668',
        productUrl: 'https://omniastores.com/products/maysun-pink-gold-plated-bracelet-in-925-silver-with-premium-simulated-diamonds',
        isNew: false,
      },
      {
        id: 'ad-brac-4',
        title: 'Omnia Fajr Green High-Luster Bracelet with Tarnish Resistant Plating',
        titleAr: 'إسوارة فجر الخضراء الفاخرة المقاومة للتغير اللوني',
        category: 'Tennis Line',
        discountBadge: '-15%',
        priceAed: 370,
        originalPriceAed: 435,
        priceSar: 378,
        image: 'https://cdn.shopify.com/s/files/1/0676/2161/7750/files/88856344C3.jpg?v=1787402260',
        productUrl: 'https://omniastores.com/products/omnia-fajr-green-bracelet-in-high-quality-zircon-stone-in-tarnish-resistant-plating',
        isNew: false,
      },
      {
        id: 'ad-brac-5',
        title: 'Omnia Fajr Blue Bracelet in High Quality Zircon Stone',
        titleAr: 'إسوارة فجر الزرقاء الفاخرة',
        category: 'Tennis Line',
        discountBadge: '-15%',
        priceAed: 370,
        originalPriceAed: 435,
        priceSar: 378,
        image: 'https://cdn.shopify.com/s/files/1/0676/2161/7750/files/photo_2025-04-11-16.23.50.jpg?v=1787402255',
        productUrl: 'https://omniastores.com/products/omnia-fajr-blue-bracelet-in-high-quality-zircon-stone-in-tarnish-resistant-plating',
        isNew: true,
      },
      {
        id: 'ad-brac-6',
        title: 'Nilda Pearl Bangle & Cocktail Ring Set with Simulated Diamonds',
        titleAr: 'إسوارة وخاتم نيلدا اللؤلؤي مع أحجار الألماس المحاكية',
        category: 'Pearl Bangle',
        discountBadge: '-15%',
        priceAed: 280,
        originalPriceAed: 330,
        priceSar: 286,
        image: 'https://cdn.shopify.com/s/files/1/0676/2161/7750/files/Unknown_3d80258a-d9d8-4621-aed4-ddb87042fff6.jpg?v=1787405945',
        productUrl: 'https://omniastores.com/products/nilda-pearl-bangle-ring-set-with-premium-simulated-diamonds-in-rhodium-plated-alloy',
        isNew: false,
      },
    ],
    rings: [
      {
        id: 'ad-ring-1',
        title: 'Omnia Nadira Light Purple and White Silver Ring',
        titleAr: 'خاتم نادرة البنفسجي الفاتح والأبيض المرصع بالألماس',
        category: 'Cocktail Ring',
        discountBadge: '-15%',
        priceAed: 750,
        originalPriceAed: 880,
        priceSar: 765,
        image: 'https://cdn.shopify.com/s/files/1/0676/2161/7750/files/Omnia_Audrey_Red_Bridal_Full_Set_in_High_Quality_Simulated_Diamonds_Premium_Rhodium_Plated_with_Cushion_Cut_Stones.jpg?v=1791973542',
        productUrl: 'https://omniastores.com/products/omnia-nadira-light-purple-and-white-silver-ring',
        isNew: true,
      },
      {
        id: 'ad-ring-2',
        title: 'Omnia Maysun Green Cocktail Ring in 925 Silver',
        titleAr: 'خاتم ميسون الأخضر الملكي من الفضة الإسترلينية',
        category: 'Cocktail Ring',
        discountBadge: '-15%',
        priceAed: 500,
        originalPriceAed: 590,
        priceSar: 510,
        image: 'https://cdn.shopify.com/s/files/1/0676/2161/7750/files/photo_2026-05-05_20-17-31_13857daf-196c-43a5-8179-7cb8a2818250.jpg?v=1787404684',
        productUrl: 'https://omniastores.com/products/omnia-maysun-green-ring',
        isNew: true,
      },
      {
        id: 'ad-ring-3',
        title: 'Nilda Pearl Cocktail Ring with Simulated Diamonds',
        titleAr: 'خاتم نيلدا اللؤلؤي القابل للتعديل',
        category: 'Pearl Ring',
        discountBadge: '-15%',
        priceAed: 280,
        originalPriceAed: 330,
        priceSar: 286,
        image: 'https://cdn.shopify.com/s/files/1/0676/2161/7750/files/Unknown_3d80258a-d9d8-4621-aed4-ddb87042fff6.jpg?v=1787405945',
        productUrl: 'https://omniastores.com/products/nilda-pearl-bangle-ring-set-with-premium-simulated-diamonds-in-rhodium-plated-alloy',
        isNew: false,
      },
      {
        id: 'ad-ring-4',
        title: 'Omnia Audrey Red Royal Solitaire Cushion Ring',
        titleAr: 'خاتم أودري الياقوتي الملكي بتصميم سوليتير فاخر',
        category: 'Cocktail Ring',
        discountBadge: '-15%',
        priceAed: 450,
        originalPriceAed: 530,
        priceSar: 460,
        image: 'https://cdn.shopify.com/s/files/1/0676/2161/7750/files/Omnia_Audrey_Red_Bridal_Full_Set_in_High_Quality_Simulated_Diamonds_Premium_Rhodium_Plated_with_Cushion_Cut_Stones.jpg?v=1791973542',
        productUrl: 'https://omniastores.com/products/omnia-audrey-red-bridal-full-set-in-high-quality-simulated-diamonds-premium-rhodium-plated-with-cushion-cut-stones',
        isNew: false,
      },
      {
        id: 'ad-ring-5',
        title: 'Omnia Audrey Yellow Cushion Solitaire Ring',
        titleAr: 'خاتم أودري الأصفر الإمبراطوري بقطع الوسادة',
        category: 'Solitaire Ring',
        discountBadge: '-15%',
        priceAed: 450,
        originalPriceAed: 530,
        priceSar: 460,
        image: 'https://cdn.shopify.com/s/files/1/0676/2161/7750/files/Omnia_Audrey_Yellow_Bridal_Full_Set_in_High_Quality_Simulated_Diamonds_Premium_Rhodium_Plated.jpg?v=1791973578',
        productUrl: 'https://omniastores.com/products/omnia-audrey-yellow-bridal-full-set-in-high-quality-simulated-diamonds-premium-rhodium-plated',
        isNew: false,
      },
      {
        id: 'ad-ring-6',
        title: 'Omnia Audrey Blue Cushion Solitaire Ring',
        titleAr: 'خاتم أودري الأزرق السوليتير الملكي',
        category: 'Solitaire Ring',
        discountBadge: '-15%',
        priceAed: 450,
        originalPriceAed: 530,
        priceSar: 460,
        image: 'https://cdn.shopify.com/s/files/1/0676/2161/7750/files/Omnia_Audrey_Blue_Luxury_Bridal_Full_Set_in_High_Quality_Simulated_Diamonds_Premium_Rhodium_Plated_with_Cushion_Cut_Stones.jpg?v=1791973615',
        productUrl: 'https://omniastores.com/products/omnia-audrey-blue-luxury-bridal-full-set-in-high-quality-simulated-diamonds-premium-rhodium-plated-with-cushion-cut-stones',
        isNew: false,
      },
    ],
  }), []);

  const activeProducts = productsByTab[activeCategory] || productsByTab.all;

  if (isDismissed) {
    return (
      <div className={`p-4 rounded-2xl bg-neutral-100 dark:bg-[#111520] border border-neutral-300 dark:border-neutral-800 text-center ${className}`}>
        <p className="text-xs text-neutral-500 font-mono mb-2">
          {isAr ? 'تم إغلاق الإعلان بواسطة المستخدم' : 'Ad closed by user • Omnia Stores Dubai'}
        </p>
        <button
          onClick={() => setIsDismissed(false)}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-900 text-gold text-[10px] font-mono uppercase font-bold hover:bg-black transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>{isAr ? 'إعادة عرض الإعلان' : 'Restore Store Ad'}</span>
        </button>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full max-w-[340px] mx-auto rounded-2xl bg-[#0b0e14] border border-neutral-800 shadow-2xl overflow-hidden font-sans transition-all group/ad ${className}`}
    >
      {/* ========================================================
          TOP AD HEADER (Close Button (X) + Tag + AdChoices Blue Badge)
      ========================================================= */}
      <div className="relative pt-2.5 px-3 pb-1.5 flex items-center justify-between border-b border-white/10 bg-[#070a10]">
        
        {/* Left: Round Dark Close Button (X) exactly matching screenshot */}
        <button
          onClick={() => setIsDismissed(true)}
          className="w-6 h-6 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition-all shadow-sm active:scale-90"
          title={isAr ? 'إغلاق الإعلان' : 'Close Ad'}
          aria-label="Close Ad"
        >
          <X className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>

        {/* Center: Store Tagline */}
        <div className="text-center px-1">
          <span className="text-[10px] font-mono uppercase font-black tracking-wider text-neutral-300">
            {title || (isAr ? 'OMNIASTORES.COM • إعلان المتجر' : 'OMNIASTORES.COM • STORE AD')}
          </span>
        </div>

        {/* Right: Blue AdChoices Triangle Icon ▷ matching screenshot */}
        <a
          href="https://omniastores.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-0.5 text-[#0070ba] hover:text-sky-400 transition-colors"
          title="AdChoices • Omnia Stores Official Advertising"
        >
          <span className="text-[9px] font-sans font-bold leading-none hidden sm:inline">Ad</span>
          <div className="w-4 h-4 rounded-xs border border-[#0070ba]/60 bg-blue-950/40 flex items-center justify-center text-[10px] text-[#0070ba] font-bold leading-none">
            &#9655;
          </div>
        </a>

      </div>

      {/* ========================================================
          VIP DISCOUNT PROMO STRIP (-15% EXTRA WITH CODE DUBAI15)
      ========================================================= */}
      <div className="px-3 py-1 bg-gradient-to-r from-amber-950/70 via-gold/20 to-amber-950/70 border-b border-gold/30 flex items-center justify-between text-[9px] font-mono">
        <span className="flex items-center gap-1 text-gold font-bold">
          <Tag className="w-2.5 h-2.5 text-gold animate-bounce" />
          <span>{isAr ? 'كود الخصم: DUBAI15' : 'VIP CODE: DUBAI15'}</span>
        </span>
        <span className="text-emerald-400 font-extrabold flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>{isAr ? 'خصم -15% معتمد' : '-15% STOREWIDE'}</span>
        </span>
      </div>

      {/* Filter Tabs (ALL • SETS • CUFFS • RINGS) Matching Screenshot */}
      <div className="px-2 pt-2 pb-1.5 flex items-center justify-between gap-1 border-b border-white/5 bg-[#070a10] text-[10px] font-mono">
        {(['all', 'bridal', 'bracelets', 'rings'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveCategory(tab)}
            className={`flex-1 py-1.5 rounded text-center font-black uppercase transition-all tracking-wider ${
              activeCategory === tab
                ? 'bg-[#E5B537] text-black shadow-sm scale-[1.02]'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab === 'all'
              ? (isAr ? 'الكل' : 'ALL')
              : tab === 'bridal'
              ? (isAr ? 'أطقم' : 'SETS')
              : tab === 'bracelets'
              ? (isAr ? 'أساور' : 'CUFFS')
              : (isAr ? 'خواتم' : 'RINGS')}
          </button>
        ))}
      </div>

      {/* ========================================================
          2-COLUMNS X 3-ROWS PRODUCT GRID (Exact layout from reference)
      ========================================================= */}
      <div className="p-2 sm:p-2.5 grid grid-cols-2 gap-2 bg-[#070a10]">
        {activeProducts.slice(0, 6).map((prod, idx) => {
          const isHovered = hoveredProductId === prod.id;
          const showOutline = prod.isFeatured || isHovered;

          return (
            <a
              key={prod.id}
              href={prod.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredProductId(prod.id)}
              onMouseLeave={() => setHoveredProductId(null)}
              className={`block relative rounded-sm sm:rounded-md bg-[#0c1017] p-2 transition-all cursor-pointer group/tile flex flex-col justify-between overflow-hidden ${
                showOutline
                  ? 'border-2 border-[#E5B537] shadow-[0_0_15px_rgba(229,181,55,0.35)] scale-[1.01]'
                  : prod.isNew
                  ? 'border-2 border-gold/70 shadow-[0_0_12px_rgba(212,175,55,0.25)] hover:border-[#E5B537]'
                  : 'border border-white/10 hover:border-neutral-500'
              }`}
            >
              {/* Discount Tag in Top-Left (Exact Green Pill from Screenshot: -15%) */}
              <div className="absolute top-1.5 left-1.5 z-10 pointer-events-none">
                <span className="inline-block bg-[#008000] text-white font-extrabold text-[10px] sm:text-[11px] leading-tight px-1.5 py-0.5 rounded-[2px] tracking-tight shadow-sm font-mono">
                  {prod.discountBadge}
                </span>
              </div>

              {/* Animated NEW Badge in Top-Right for New Products */}
              {prod.isNew && (
                <div className="absolute top-1.5 right-1.5 z-10 pointer-events-none">
                  <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-400 via-[#E5B537] to-amber-500 text-black font-black text-[8px] sm:text-[9px] leading-tight px-1.5 py-0.5 rounded-[2px] tracking-wider uppercase font-mono shadow-[0_0_10px_rgba(229,181,55,0.8)] animate-pulse">
                    <Sparkles className="w-2.5 h-2.5 animate-spin text-black" style={{ animationDuration: '3s' }} />
                    <span>{isAr ? 'جديد' : 'NEW'}</span>
                  </span>
                </div>
              )}

              {/* Product Image on Clean Black Velvet Display Background */}
              <div className="relative aspect-square w-full my-1 overflow-hidden bg-black flex items-center justify-center rounded-xs">
                <Image
                  src={prod.image}
                  alt={prod.title}
                  fill
                  sizes="(max-width: 340px) 150px, 160px"
                  className="object-contain object-center group-hover/tile:scale-105 transition-transform duration-500"
                />

                {/* Subtle Hover Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover/tile:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* Price Tag Below Image (Exact Bold Format from Screenshot, e.g. 700AED) */}
              <div className="text-center pt-1 mt-auto border-t border-white/5">
                <div
                  className={`font-black font-mono text-sm sm:text-base tracking-tight leading-none transition-colors ${
                    prod.isFeatured || isHovered ? 'text-[#E5B537]' : 'text-white group-hover/tile:text-[#E5B537]'
                  }`}
                >
                  {prod.priceAed}AED
                </div>
                
                {/* Struck Original Price (-15% regular) & SAR equivalent */}
                <div className="flex items-center justify-center gap-1.5 text-[8.5px] font-mono text-neutral-400 mt-1">
                  <span className="line-through text-neutral-500">{prod.originalPriceAed}AED</span>
                  <span className="text-neutral-400">SAR {prod.priceSar}</span>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* ========================================================
          BOTTOM BRAND FOOTER (Solid Black Bar matching screenshot)
      ========================================================= */}
      <a
        href="https://omniastores.com"
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-black hover:bg-neutral-950 text-white p-3 sm:p-3.5 transition-all group/footer select-none border-t border-white/10"
        title="Visit Omnia Stores Dubai Official Boutique"
      >
        <div className="flex items-center justify-between gap-2">
          
          {/* Left: Two White Horizontal Bars (= symbol matching reference image) */}
          <div className="flex flex-col gap-1 w-4 flex-shrink-0 cursor-pointer group-hover/footer:scale-110 transition-transform">
            <span className="w-3.5 h-[2.5px] bg-white rounded-full"></span>
            <span className="w-3.5 h-[2.5px] bg-white rounded-full"></span>
          </div>

          {/* Center: Official Omnia Stores Wordmark / Logo */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="relative w-6 h-6 flex-shrink-0">
              <Image
                src="/omnia-logo-white.png"
                alt="Omnia Stores"
                fill
                className="object-contain"
              />
            </span>
            <div className="text-center sm:text-left leading-none">
              <span className="text-xs sm:text-sm font-serif font-black tracking-widest uppercase block text-white group-hover/footer:text-[#E5B537] transition-colors">
                OMNIA STORES
              </span>
              <span className="text-[8px] font-mono uppercase tracking-widest text-[#E5B537] block mt-0.5 font-bold">
                DUBAI • OFFICIAL STORE
              </span>
            </div>
          </div>

          {/* Right: Action Link Arrow */}
          <div className="flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider text-[#E5B537] group-hover/footer:translate-x-0.5 transition-transform flex-shrink-0">
            <span className="hidden sm:inline">SHOP NOW</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#E5B537]" />
          </div>

        </div>
      </a>

      {/* Subtle Bottom Trust Assurance Strip */}
      <div className="bg-[#05080d] py-1.5 px-2.5 flex items-center justify-between text-[8px] font-mono text-neutral-400 border-t border-white/10">
        <span className="flex items-center gap-1 text-emerald-400 font-bold">
          <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
          <span>100% Solid 925 • DCL Certified</span>
        </span>
        <span className="text-[#E5B537] font-bold">24H GCC DELIVERY</span>
      </div>

    </div>
  );
}
