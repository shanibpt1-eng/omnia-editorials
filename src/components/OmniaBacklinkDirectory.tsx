'use client';

import React from 'react';
import Image from 'next/image';
import { ExternalLink, ShieldCheck, ArrowUpRight, ArrowUpLeft, Crown } from 'lucide-react';
import { generateAffiliateUrl } from '../lib/affiliateEngine';
import { useLuxury } from './ThemeProvider';

interface BacklinkHub {
  category: string;
  categoryAr: string;
  url: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  startingPriceAed: number;
  startingPriceSar: number;
  badge: string;
  badgeAr: string;
  coverImage: string;
}

const BACKLINK_HUBS: BacklinkHub[] = [
  {
    category: 'Bridal & High Glamour',
    categoryAr: 'الأعراس والفخامة الملكية',
    url: 'https://omniastores.com/collections/luxury-sets',
    title: 'Sovereign Bridal & Luxury Suites',
    titleAr: 'أطقم الأعراس والمناسبات السيادية',
    description: 'Imperial Colombian-hue simulated emeralds, rubies, and Premium simulated diamonds set in 925 sterling silver.',
    descriptionAr: 'أحجار زمرد كولومبي وياقوت ومحاكاة ألماس نقاء فائق فاخر مصوغة في فضة إسترلينية عيار 925.',
    startingPriceAed: 1250,
    startingPriceSar: 1275,
    badge: 'FLAGSHIP COLLECTION',
    badgeAr: 'المجموعة الرئيسية',
    coverImage: '/banners/emerald-grandeur-suite.jpg',
  },
  {
    category: 'Ceremonial Wedding',
    categoryAr: 'حفلات الزفاف الرسمية',
    url: 'https://omniastores.com/collections/bridal-collection',
    title: 'Certified 925 Silver Bridal Sets',
    titleAr: 'أطقم أعراس معتمدة من الفضة عيار 925',
    description: 'Precision Italian micro-prong sets engineered for royal Gulf wedding trousseaus with anti-tarnish rhodium shielding.',
    descriptionAr: 'ترصيع إيطالي بالمخالب المجهرية مصمم لتجهيز العرائس في الخليج مع درع الروديوم المضاد للأكسدة.',
    startingPriceAed: 980,
    startingPriceSar: 999,
    badge: 'UAE BRIDAL FAVOURITE',
    badgeAr: 'المفضلة لعرائس الإمارات',
    coverImage: '/press/inside-luxury-bridal-sets-feature.jpg',
  },
  {
    category: 'Arabian Maritime Heritage',
    categoryAr: 'تراث اللؤلؤ البحري العربي',
    url: 'https://omniastores.com/collections/pearl-sets',
    title: 'Arabian Freshwater Pearl Sets',
    titleAr: 'أطقم لؤلؤ المياه العذبة الطبيعي',
    description: 'High-luster baroque and freshwater pearls combined with 925 silver link chains for modest abaya styling.',
    descriptionAr: 'لؤلؤ طبيعي فائق اللمعان مدمج مع سلاسل فضة 925 مصقولة لتنسدل بانسيابية مع العباءات.',
    startingPriceAed: 850,
    startingPriceSar: 867,
    badge: 'HIGH NACRE LUSTER',
    badgeAr: 'بريق لؤلؤ استثنائي',
    coverImage: '/hero/hero-pearl-revival.jpg',
  },
  {
    category: 'Wristwear & Eternity Lines',
    categoryAr: 'أساور التنس والخطوط الأبدية',
    url: 'https://omniastores.com/collections/tennis-bracelet',
    title: 'Eternity Tennis Line Bracelets',
    titleAr: 'أساور التنس الماسية المتصلة',
    description: '4mm to 6mm articulated diamond tennis bracelets with double-safety security box clasps.',
    descriptionAr: 'أساور ألماسية مفصلية بمقاس 4 مم إلى 6 مم مع أقفال أمان صندوقية مزدوجة للمناسبات.',
    startingPriceAed: 399,
    startingPriceSar: 407,
    badge: 'DOUBLE SAFETY CLASP',
    badgeAr: 'قفل أمان مزدوج',
    coverImage: '/press/style-and-shine-journal-oct2026.jpg',
  },
  {
    category: 'Neckwear & Collar Jewellery',
    categoryAr: 'التشوكرات وأطواق العنق',
    url: 'https://omniastores.com/collections/chokers-collection',
    title: 'Italian Micro-Prong Chokers',
    titleAr: 'تشوكرات بالمخالب الإيطالية الدقيقة',
    description: 'Close-fitting collar chokers designed to elevate open-collar evening jackets and ceremonial gowns.',
    descriptionAr: 'أطواق عنق أنيقة مصممة لتبرز جمال الياقات المفتوحة وفساتين السهرات الرسمية.',
    startingPriceAed: 450,
    startingPriceSar: 459,
    badge: 'ERGONOMIC COMFORT',
    badgeAr: 'راحة وانسيابية فائقة',
    coverImage: '/banners/the-statement-jewellery-edit.jpg',
  },
  {
    category: 'High-Carat Solitaires',
    categoryAr: 'سوليتير الألماس عالي القيراط',
    url: 'https://omniastores.com/collections/simulated-diamonds',
    title: 'Simulated Diamond Solitaire Collars',
    titleAr: 'أطواق سوليتير محاكاة الألماس',
    description: '0.044 optical fire dispersion delivering flawless D-color brilliance for red carpet and gala evenings.',
    descriptionAr: 'تشتت ضوئي بريقي 0.044 يمنح لمعاناً استثنائياً بلون D الألماسي الخالي من الشوائب للسهرات.',
    startingPriceAed: 550,
    startingPriceSar: 561,
    badge: 'D-COLOR FLAWLESS',
    badgeAr: 'نقاء D خالٍ من الشوائب',
    coverImage: '/hero/hero-diamond-radiance.jpg',
  },
  {
    category: 'Cocktail & Statement Rings',
    categoryAr: 'خواتم الكوكتيل والسهرات',
    url: 'https://omniastores.com/collections/rings',
    title: 'Cocktail & Solitaire Rings',
    titleAr: 'خواتم سوليتير وكوكتيل ملكية',
    description: 'Cushion-cut, emerald-cut, and radiant-cut cocktail rings with pavé halos in solid 925 silver.',
    descriptionAr: 'خواتم بقصات الوسادة وقص الزمرد مع هالات الألماس البافيه من الفضة الخالصة عيار 925.',
    startingPriceAed: 280,
    startingPriceSar: 285,
    badge: 'CUSHION & EMERALD CUT',
    badgeAr: 'قص الوسادة والزمرد',
    coverImage: '/press/wedding-luxe-arabia-nov2026.jpg',
  },
  {
    category: 'Chandelier & Gala Earrings',
    categoryAr: 'أقراط الثريا للسهرات',
    url: 'https://omniastores.com/collections/earrings',
    title: 'Cascading Chandelier Earrings',
    titleAr: 'أقراط ثريا ملكية متدفقة',
    description: 'Weight-balanced ergonomic drops featuring hypoallergenic posts for comfortable gala wear.',
    descriptionAr: 'أقراط متدلية متوازنة الوزن ومريحة مع قواعد مضادة للحساسية ومثالية للحفلات.',
    startingPriceAed: 320,
    startingPriceSar: 326,
    badge: 'HYPOALLERGENIC POSTS',
    badgeAr: 'قواعد طبية مريحة',
    coverImage: '/campaigns/azure-pendant-edit.jpg',
  },
];

export function OmniaBacklinkDirectory() {
  const { formatPrice, t, language } = useLuxury();
  const isAr = language === 'ar';

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-3xl glass-panel border border-neutral-200 dark:border-gold/30 bg-white dark:bg-[#0B0E16] p-8 sm:p-12 shadow-lg dark:shadow-2xl relative overflow-hidden">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,transparent_70%)] blur-[90px] pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b border-neutral-200 dark:border-gold/20 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-[#8B6508] dark:text-gold text-xs font-bold uppercase tracking-widest mb-2">
              <Crown className="w-3.5 h-3.5 text-[#8B6508] dark:text-gold" />
              <span>{isAr ? 'فهرس التشكيلات الرسمية وروابط المتجر المباشرة' : 'OFFICIAL OMNIA STORES FLAGSHIP DIRECTORY & BACKLINK INDEX'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight text-neutral-950 dark:text-white">
              {t.directoryTitle}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-400 mt-2 max-w-2xl leading-relaxed">
              {t.directorySubtitle}
            </p>
          </div>

          <a
            href="https://omniastores.com/collections/all"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-gold text-black text-xs font-bold uppercase tracking-wider hover:bg-amber-300 transition-colors flex items-center gap-1.5 shrink-0 shadow-md self-start lg:self-auto"
          >
            <span>{isAr ? 'زيارة المتجر الرئيسي' : 'Visit omniastores.com Flagship'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Grid of Collection Hubs with Rich Backlinks and Cover Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
          {BACKLINK_HUBS.map((hub, idx) => {
            const category = isAr ? hub.categoryAr : hub.category;
            const title = isAr ? hub.titleAr : hub.title;
            const description = isAr ? hub.descriptionAr : hub.description;
            const badge = isAr ? hub.badgeAr : hub.badge;

            return (
              <a
                key={idx}
                href={generateAffiliateUrl({
                  baseUrl: hub.url,
                  source: 'backlink_directory',
                  medium: `hub_${idx + 1}`,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-neutral-200 dark:border-gold/20 hover:border-[#B8860B] dark:hover:border-gold transition-all duration-300 bg-neutral-50 dark:bg-black/50 hover:bg-white dark:hover:bg-black/80 flex flex-col justify-between group shadow-sm hover:shadow-xl overflow-hidden"
              >
                {/* 1. Cover Photo Header */}
                <div className="relative h-44 w-full overflow-hidden bg-black/60">
                  <Image
                    src={hub.coverImage}
                    alt={title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10" />

                  {/* Badge Pill */}
                  <div className={`absolute top-3 ${isAr ? 'right-3' : 'left-3'} z-10`}>
                    <span className="text-[9px] font-mono font-bold px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[#E6CA65] border border-gold/40 shadow">
                      {badge}
                    </span>
                  </div>

                  {/* Category Pill Tag */}
                  <div className={`absolute bottom-2.5 ${isAr ? 'right-3' : 'left-3'} z-10`}>
                    <span className="text-[10px] font-mono font-semibold text-neutral-200 uppercase tracking-wider drop-shadow-sm">
                      {category}
                    </span>
                  </div>
                </div>

                {/* 2. Text Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-serif font-bold text-neutral-950 dark:text-white group-hover:text-[#B8860B] dark:group-hover:text-gold transition-colors mb-2 leading-snug">
                      {title}
                    </h3>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                      {description}
                    </p>
                  </div>

                  {/* 3. Price & CTA Footer */}
                  <div className="pt-3 border-t border-neutral-200 dark:border-white/10 flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-[#8B6508] dark:text-gold">
                      {isAr ? 'ابتداءً من' : 'From'} {formatPrice(hub.startingPriceAed, hub.startingPriceSar)}
                    </span>
                    <span className="text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1 group-hover:text-[#8B6508] dark:group-hover:text-gold transition-colors">
                      <span>{isAr ? 'تسوق' : 'Shop'}</span>
                      {isAr ? (
                        <ArrowUpLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                      ) : (
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      )}
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Assurance Bar at Bottom */}
        <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-gold/20 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-600 dark:text-neutral-400 relative z-10">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#8B6508] dark:text-gold flex-shrink-0" />
            <span>{isAr ? 'فضة عيار 925 معتمدة من مختبر دبي المركزي • توصيل فوري بالإمارات وخلال 24-48 ساعة للمملكة' : 'Dubai Central Laboratory Certified 925 Silver • Same-Day UAE • 24-48H KSA Dispatch'}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono">{isAr ? 'البوابة الرسمية المعتمدة:' : 'Official Partner Portal:'} omniastores.com</span>
          </div>
        </div>

      </div>
    </section>
  );
}
