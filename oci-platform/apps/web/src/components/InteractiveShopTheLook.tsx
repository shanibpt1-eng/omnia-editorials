'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, Sparkles, X } from 'lucide-react';
import { generateAffiliateUrl } from '../lib/affiliateEngine';
import { useLuxury } from './ThemeProvider';

interface HotspotItem {
  id: string;
  name: string;
  category: string;
  priceAed: number;
  priceSar: number;
  xPercent: number;
  yPercent: number;
  image: string;
  storeUrl: string;
  material: string;
  specs: string[];
}

export function InteractiveShopTheLook() {
  const { formatPrice, currency, language } = useLuxury();
  const isAr = language === 'ar';
  const [activeItem, setActiveItem] = useState<HotspotItem | null>(null);

  const hotspots: HotspotItem[] = [
    {
      id: 'hotspot-choker',
      name: isAr ? 'شوكر العروس الفضي عيار 925 الإمبراطوري' : 'Imperial Dubai 925 Silver Bridal Choker',
      category: isAr ? 'أطقم الأعراس' : 'Bridal Suites',
      priceAed: 1250,
      priceSar: 1275,
      xPercent: 50,
      yPercent: 44,
      image: '/press/inside-luxury-bridal-sets-feature.jpg',
      storeUrl: 'https://omniastores.com/collections/bridal-collection',
      material: isAr ? 'فضة إسترلينية أصلية عيار 925 وأحجار زيركون نقاء فائق فاخر' : 'Solid 925 Sterling Silver & Triple-Prong Premium Cubic Zirconia',
      specs: isAr ? ['ختم ليزري عيار 925', 'طلاء الروديوم المقاوم للأكسدة', 'ترصيع بالمخالب المجهرية'] : ['Laser Hallmarked 925', 'Anti-Tarnish Rhodium Shield', 'Micro-Claw Secure Setting'],
    },
    {
      id: 'hotspot-earrings',
      name: isAr ? 'أقراط الثريا الملكية المتدلية' : 'Royal Tier Chandelier Earrings',
      category: isAr ? 'أقراط' : 'Earrings',
      priceAed: 480,
      priceSar: 490,
      xPercent: 64,
      yPercent: 32,
      image: '/press/bridal-grace-arabia-cover-2026.jpg',
      storeUrl: 'https://omniastores.com/collections/earrings',
      material: isAr ? 'فضة عيار 925 مع أحجار زيركون قطرة الندى' : 'Solid 925 Sterling Silver with Cascading Teardrop Zircons',
      specs: isAr ? ['تصميم مريح ومتوازن الوزن', 'قاعدة طبية مضادة للحساسية', 'تشمل علبة إهداء مخملية'] : ['Weight-Balanced Ergonomics', 'Hypoallergenic Posts', 'Includes Velvet Gifting Pouch'],
    },
    {
      id: 'hotspot-bracelet',
      name: isAr ? 'إسوارة التنس الأبدية الراقية (4 مم)' : 'Artisan Eternity Tennis Bracelet (4mm)',
      category: isAr ? 'أساور' : 'Bracelets',
      priceAed: 480,
      priceSar: 490,
      xPercent: 32,
      yPercent: 78,
      image: '/press/style-and-shine-journal-oct2026.jpg',
      storeUrl: 'https://omniastores.com/collections/tennis-bracelet',
      material: isAr ? 'فضة إسترلينية عيار 925 مع قفل أمان مزدوج' : 'Solid 925 Sterling Silver with Double Safety Latch',
      specs: isAr ? ['مشبك أمان مزدوج للمناسبات', 'طلاء بلاتيني متعدد الطبقات', 'مرونة عالية وملمس ناعم'] : ['Double Security Clasp', 'Seamless Flexible Linkage', 'Water-Resistant Coating'],
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-semibold uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5 text-gold animate-spin" style={{ animationDuration: '8s' }} />
          <span>{isAr ? 'تجربة تحريرية تفاعلية' : 'Interactive Editorial Experience'}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-neutral-950 dark:text-white mb-4">
          {isAr ? 'تسوق غلاف المجلة: طقم الأعراس الملكي' : 'Shop The Cover: The Sovereign Bridal Suite'}
        </h2>
        <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-400">
          {isAr
            ? `اضغط على دبابيس الذهب المتوهجة لاستعراض مواصفات القطع وأسعارها بالـ ${currency}، والشراء الفوري من متجر omniastores.com.`
            : `Tap or hover the pulsating gold hotspots on the editorial spread to reveal handcrafted jewelry specifications, live ${currency} pricing, and direct checkout on omniastores.com.`}
        </p>
      </div>

      {/* Main Interactive Magazine Spread */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-gold/40 shadow-[0_25px_60px_rgba(0,0,0,0.9)] bg-black">
        {/* Editorial Background Image */}
        <div className="relative h-[550px] sm:h-[680px] w-full">
          <Image
            src="/press/inside-luxury-bridal-sets-feature.jpg"
            alt="The Sovereign Bridal Suite Editorial"
            fill
            unoptimized
            className="object-cover object-center filter brightness-95"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 pointer-events-none" />

          {/* Magazine Cover Watermark */}
          <div className="absolute top-6 left-6 z-10 flex flex-col">
            <span className="font-serif text-2xl sm:text-4xl font-extrabold tracking-widest text-gold/90 uppercase drop-shadow-lg">
              OMNIA STORES HAUTE
            </span>
            <span className="text-[10px] sm:text-xs text-neutral-300 tracking-[0.3em] uppercase">
              EDITION 42 • DUBAI & RIYADH
            </span>
          </div>

          {/* Interactive Hotspot Pins */}
          {hotspots.map((item) => {
            const isActive = activeItem?.id === item.id;
            return (
              <div
                key={item.id}
                style={{ top: `${item.yPercent}%`, left: `${item.xPercent}%` }}
                className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2"
              >
                <button
                  onClick={() => setActiveItem(isActive ? null : item)}
                  onMouseEnter={() => setActiveItem(item)}
                  className={`relative p-2.5 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-gold text-black scale-125 shadow-[0_0_25px_rgba(212,175,55,1)]'
                      : 'bg-black/80 text-gold border border-gold/80 hover:bg-gold hover:text-black hotspot-pin'
                  }`}
                  aria-label={`View ${item.name}`}
                >
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border border-black" />
                </button>

                {/* Micro Hover Tag (Desktop) */}
                <div className="hidden lg:block absolute left-full ml-3 top-1/2 transform -translate-y-1/2 pointer-events-none whitespace-nowrap">
                  <div className="px-3 py-1.5 rounded-lg bg-black/90 border border-gold/40 text-left backdrop-blur-md shadow-xl dark-surface">
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">{item.category}</span>
                    <span style={{ color: '#FFFFFF' }} className="text-xs font-serif font-bold text-white block stay-white">{item.name}</span>
                    <span className="text-xs font-mono font-bold text-gold">{formatPrice(item.priceAed, item.priceSar)}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Active Product Pop-up Overlay Card */}
          {activeItem && (
            <div className="absolute bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-30 p-5 rounded-2xl glass-panel border border-gold/50 bg-[#0E121C]/95 backdrop-blur-xl shadow-2xl animate-fadeIn dark-surface">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-gold/20 text-gold text-[10px] font-bold uppercase tracking-wider">
                    {activeItem.category}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {isAr ? 'متوفر • شحن 24 ساعة' : 'In Stock • 24H Dispatch'}
                  </span>
                </div>
                <button
                  onClick={() => setActiveItem(null)}
                  className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex gap-4 items-center">
                <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-gold/30 flex-shrink-0 bg-black">
                  <Image
                    src={activeItem.image}
                    alt={activeItem.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4
                    style={{ color: '#FFFFFF' }}
                    className="text-sm font-serif font-bold text-white leading-snug mb-1 stay-white"
                  >
                    {activeItem.name}
                  </h4>
                  <p className="text-[11px] text-neutral-400 leading-tight mb-2">
                    {activeItem.material}
                  </p>
                  <div className="text-base font-bold font-mono text-gold">
                    {formatPrice(activeItem.priceAed, activeItem.priceSar)}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gold/20 flex items-center justify-between gap-3">
                <div className="text-[10px] text-neutral-400">
                  <span>{isAr ? 'فضة معتمدة عيار 925' : 'Certified 925 Hallmark'}</span>
                </div>
                <a
                  href={generateAffiliateUrl({
                    baseUrl: activeItem.storeUrl,
                    source: 'shop_the_look_hotspot',
                    medium: 'hotspot_popup',
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-full bg-gradient-to-r from-gold to-[#AA8C2C] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:opacity-95 transition-transform transform hover:-translate-y-0.5 shimmer-btn"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{isAr ? 'تسوق على omniastores.com' : 'Shop on omniastores.com'}</span>
                </a>
              </div>
            </div>
          )}

          {/* Instructions Pill at Bottom Left */}
          <div className="absolute bottom-6 left-6 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 border border-gold/30 text-xs text-neutral-300 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
            <span>{isAr ? 'اضغط على أي دبوس ذهبي متوهج لفحص مواصفات القطعة والتسوق' : 'Click any glowing gold pin to inspect jewelry specs & shop'}</span>
          </div>

        </div>
      </div>
    </section>
  );
}
