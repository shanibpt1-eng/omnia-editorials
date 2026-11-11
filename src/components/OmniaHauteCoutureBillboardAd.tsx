'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Sparkles, 
  Crown, 
  ShoppingBag, 
  ArrowUpRight, 
  ShieldCheck, 
  Truck, 
  Gem, 
  Eye, 
  CheckCircle2,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useLuxury } from './ThemeProvider';

interface CampaignLook {
  id: string;
  tagEn: string;
  tagAr: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  image: string;
  imageAlt: string;
  priceAed: number;
  priceSar: number;
  originalPriceAed: number;
  originalPriceSar: number;
  storeUrl: string;
  highlightsEn: string[];
  highlightsAr: string[];
  badgeEn: string;
  badgeAr: string;
}

const CAMPAIGN_LOOKS: CampaignLook[] = [
  {
    id: 'pearl-cascade',
    tagEn: 'HAUTE COUTURE PEARL SUITE',
    tagAr: 'طقم اللؤلؤ الإمبراطوري الفاخر',
    titleEn: 'The Royal Empress Pearl Cascade & Pavé Diamond Bow',
    titleAr: 'طقم إمبراطورة اللؤلؤ الباروكي المتدفق وفيونكة الألماس',
    subtitleEn: 'Hand-selected baroque freshwater pearls cascading into an articulated pavé simulated diamond bow brooch with matching waterfall earrings.',
    subtitleAr: 'حبات لؤلؤ المياه العذبة الباروكية النقية المتدفقة في فيونكة مرصعة بألماس المحاكاة الفاخر مع أقراط الشلال المتدلية المطابقة.',
    image: '/advertising/pearl-cascade-couture-ad.jpg',
    imageAlt: 'Omnia Stores Mediterranean Empress Pearl Cascade and Diamond Bow Necklace Set on Model',
    priceAed: 1450,
    priceSar: 1480,
    originalPriceAed: 2450,
    originalPriceSar: 2490,
    storeUrl: 'https://omniastores.com/collections/necklaces',
    badgeEn: 'EXCLUSIVE RUNWAY MASTERPIECE',
    badgeAr: 'قطعة حصرية من منصة العرض',
    highlightsEn: [
      'Solid 925 Sterling Silver core with electrolytic anti-tarnish rhodium barrier',
      'Lustrous Grade-AAA hand-threaded Arabian Gulf & Mediterranean pearl drop tassels',
      'Micro-claw pavé setting with maximum diamond dispersion and zero-glue architecture',
      'Guaranteed 24-hour express courier delivery across Dubai, Abu Dhabi, & GCC',
    ],
    highlightsAr: [
      'فضة إسترلينية أصلية عيار 925 مع طبقة روديوم كهربائية عازلة للأكسدة والرطوبة',
      'لؤلؤ طبيعي فائق البريق منتقى يدوياً بجودة AAA مع شراشيب متدفقة ساحرة',
      'ترصيع إيطالي بالمخالب الدقيقة لأحجار محاكاة الألماس بدون أي مواد لاصقة',
      'توصيل سريع ومضمون خلال 24 ساعة في دبي وأبوظبي وكافة دول الخليج',
    ],
  },
  {
    id: 'chevron-diamond',
    tagEn: 'SOVEREIGN HIGH JEWELLERY',
    tagAr: 'مجوهرات السيادة الراقية',
    titleEn: 'The Sovereign Chevron Diamond Collar & Winged Earrings',
    titleAr: 'طوق الشيفون الملكي المزدوج وأقراط الأجنحة المتلألئة',
    subtitleEn: 'Double-tier articulated chevron diamond choker designed with an ergonomic open-collar tension frame, paired with sculptural winged chandelier ear crawlers.',
    subtitleAr: 'طوق شيفون مزدوج مرصع بألماس محاكاة فائق البريق بتصميم مفتوح ومريح، متناغم مع أقراط الأجنحة المتدلية الساحرة.',
    image: '/advertising/chevron-diamond-sovereign-ad.jpg',
    imageAlt: 'Omnia Stores Sovereign Chevron Diamond Choker and Winged Chandelier Earrings on Model',
    priceAed: 1850,
    priceSar: 1890,
    originalPriceAed: 3100,
    originalPriceSar: 3150,
    storeUrl: 'https://omniastores.com/collections/bridal-collection',
    badgeEn: 'ROYAL GALA EDITION',
    badgeAr: 'طبعة حفلات الغالا الملكية',
    highlightsEn: [
      'High-refractive simulated diamonds (RI 2.65) cut to ideal round and pear proportions',
      'Flexible anatomical open-choker setting that rests naturally against the collarbone',
      'Hypoallergenic, 100% nickel-free and lead-free precious silver construction',
      'Delivered in an Omnia Stores signature velvet presentation case with authenticity dossier',
    ],
    highlightsAr: [
      'أحجار محاكاة الألماس ذات معامل انكسار ضوئي 2.65 بقطع كمثري ودائري مثالي',
      'هيكل طوق مفتوح مصمم هندسياً ليستقر بمرونة وانسيابية على عظام الترقوة',
      'مضاد تماماً للحساسية وخالٍ 100% من النيكل والرصاص المسبب لتصبغ البشرة',
      'يصل في علبة مخملية فاخرة مع ملف شهادة الفحص والأصالة المعتمدة',
    ],
  },
];

export function OmniaHauteCoutureBillboardAd() {
  const { language, currency } = useLuxury();
  const isAr = language === 'ar';
  const isSar = currency === 'SAR';

  const [activeTab, setActiveTab] = useState<'both' | 'pearl' | 'chevron'>('both');

  const displayedLooks = activeTab === 'both' 
    ? CAMPAIGN_LOOKS 
    : CAMPAIGN_LOOKS.filter(look => look.id === (activeTab === 'pearl' ? 'pearl-cascade' : 'chevron-diamond'));

  return (
    <section 
      aria-label="Omnia Stores Official Haute Couture Advertising Billboard"
      className="w-full my-12 sm:my-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* 1. Prestigious Top Banner Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-neutral-300 dark:border-gold/25 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-[#DFB743] via-[#FCEAA5] to-[#C99E32] text-black shadow-md">
            <Crown className="w-5 h-5 text-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#8B6508] dark:text-gold">
                {isAr ? 'حملة الأزياء الراقية الحصرية' : 'HAUTE COUTURE EDITORIAL CAMPAIGN'}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[9px] font-bold border border-emerald-500/30">
                OFFICIAL AD
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-black text-neutral-900 dark:text-white">
              {isAr ? 'إعلانات أمنية ستورز: روائع منصات العرض الملكية' : 'Omnia Stores Flagship: Runway Masterpieces'}
            </h3>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-xs font-mono">
          <button
            onClick={() => setActiveTab('both')}
            className={`px-3 py-1 rounded-full transition-all ${
              activeTab === 'both'
                ? 'bg-gold text-black font-bold shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
            }`}
          >
            {isAr ? 'عرض الإثنين' : 'View Both'}
          </button>
          <button
            onClick={() => setActiveTab('pearl')}
            className={`px-3 py-1 rounded-full transition-all ${
              activeTab === 'pearl'
                ? 'bg-gold text-black font-bold shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
            }`}
          >
            {isAr ? 'طقم اللؤلؤ' : 'Pearl Cascade'}
          </button>
          <button
            onClick={() => setActiveTab('chevron')}
            className={`px-3 py-1 rounded-full transition-all ${
              activeTab === 'chevron'
                ? 'bg-gold text-black font-bold shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
            }`}
          >
            {isAr ? 'طوق الشيفون' : 'Chevron Diamond'}
          </button>
        </div>
      </div>

      {/* 2. Responsive Advertising Grid */}
      <div className={`grid gap-8 ${activeTab === 'both' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 max-w-4xl mx-auto'}`}>
        {displayedLooks.map((look) => {
          const currentPrice = isSar ? look.priceSar : look.priceAed;
          const originalPrice = isSar ? look.originalPriceSar : look.originalPriceAed;
          const currencyLabel = isSar ? (isAr ? 'ر.س' : 'SAR') : (isAr ? 'د.إ' : 'AED');

          return (
            <article
              key={look.id}
              className="group relative rounded-3xl overflow-hidden bg-white dark:bg-[#0A0D15] border border-neutral-300 dark:border-gold/30 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col"
            >
              {/* Image Frame with Aspect Ratio */}
              <div className="relative w-full h-72 sm:h-80 md:h-96 overflow-hidden bg-neutral-900">
                <Image
                  src={look.image}
                  alt={look.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                  className="object-cover object-top sm:object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                {/* Top Badges Overlay */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
                  <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-gold/40 text-[10px] font-mono font-bold text-[#D4AF37] tracking-wider uppercase shadow-md">
                    {isAr ? look.badgeAr : look.badgeEn}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-red-600/90 text-white font-mono text-[10px] font-extrabold uppercase tracking-widest shadow-md">
                    40% OFF
                  </span>
                </div>

                {/* Bottom Photo Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white drop-shadow">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#F9E8B8] block mb-1">
                    {isAr ? look.tagAr : look.tagEn}
                  </span>
                  <h4 className="text-xl sm:text-2xl font-serif font-black leading-tight text-white group-hover:text-[#FCEAA5] transition-colors">
                    {isAr ? look.titleAr : look.titleEn}
                  </h4>
                </div>
              </div>

              {/* Advertisement Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-serif leading-relaxed">
                    {isAr ? look.subtitleAr : look.subtitleEn}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="space-y-2 py-2 border-y border-neutral-100 dark:border-white/5">
                    {look.highlightsEn.map((hlEn, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs font-serif text-neutral-700 dark:text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{isAr ? look.highlightsAr[i] : hlEn}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Commercial CTA */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
                      {isAr ? 'السعر الحصري المباشر:' : 'Direct Boutique Price:'}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-serif font-black text-neutral-900 dark:text-[#D4AF37]">
                        {currencyLabel} {currentPrice.toLocaleString()}
                      </span>
                      <span className="text-xs sm:text-sm font-mono text-neutral-400 line-through">
                        {currencyLabel} {originalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Direct Link to omniastores.com */}
                  <a
                    href={look.storeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#DFB743] via-[#FCEAA5] to-[#C99E32] text-black font-serif font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_28px_rgba(212,175,55,0.6)] hover:scale-[1.02] active:scale-95 transition-all duration-300 group/btn"
                    title={`Shop ${look.titleEn} on omniastores.com`}
                  >
                    <ShoppingBag className="w-4 h-4 text-black group-hover/btn:rotate-12 transition-transform" />
                    <span>{isAr ? 'تسوق القطعة من المتجر الرسمي' : 'Shop on omniastores.com'}</span>
                    <ArrowUpRight className={`w-4 h-4 ${isAr ? 'rotate-[-90deg]' : ''}`} />
                  </a>
                </div>

              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
