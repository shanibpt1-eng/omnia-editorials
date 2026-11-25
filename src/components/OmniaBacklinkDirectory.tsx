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
  {
    category: 'Viral Event Deals & Drops',
    categoryAr: 'عروض الفعاليات والمجموعات المخفضة',
    url: 'https://omniastores.com/collections/discounted-items',
    title: 'Official Event Deals & Discounted Vault',
    titleAr: 'تخفيضات الفعاليات الكبرى والقطع المخفضة',
    description: 'Up to 50%–85% seasonal promotions on verified 925 sterling silver suites and viral necklaces across UAE & GCC.',
    descriptionAr: 'خصومات موسمية كبرى تصل إلى 50%–85% على أطقم الفضة 925 والقلائد الأكثر طلباً في الإمارات والخليج.',
    startingPriceAed: 111,
    startingPriceSar: 113,
    badge: 'DEALS FROM DH111',
    badgeAr: 'عروض تبدأ من 111 درهم',
    coverImage: '/banners/black-friday-luxury-offers-banner.jpg',
  },
  {
    category: 'Flagship Online Boutique',
    categoryAr: 'المتجر الرئيسي الفاخر أونلاين',
    url: 'https://omniastores.com',
    title: 'Omnia Stores Flagship Boutique Hub',
    titleAr: 'بوابة أمنية ستورز الرئيسية الفاخرة',
    description: 'The premier Middle Eastern demi-fine jewellery maison. DCL assayed pure silver, Tabby 4 interest-free installments, same-day Dubai delivery.',
    descriptionAr: 'الدار الرائدة للمجوهرات الراقية بالخليج. فضة 925 معتمدة، تقسيط تابي على 4 دفعات بدون فوائد، وتوصيل فوري بدبي.',
    startingPriceAed: 199,
    startingPriceSar: 203,
    badge: 'OMNIASTORES.COM',
    badgeAr: 'المتجر الرسمي المعتمد',
    coverImage: '/banners/upcoming-events-luxury-highlights-banner.jpg',
  },
  {
    category: 'Sovereign Pendant Necklaces',
    categoryAr: 'سلاسل وقلائد السهرة الفاخرة',
    url: 'https://omniastores.com/collections/necklaces',
    title: 'Sovereign Pendants & Baroque Pearls',
    titleAr: 'سلاسل وقلائد اللؤلؤ الباروكي والسوليتير',
    description: 'Pavé butterflies, baroque pearl drops, and solitaire collars framed in heavy rhodium-plated sterling silver.',
    descriptionAr: 'قلائد الفراشة البافيه وقطرات اللؤلؤ الطبيعي وسوليتير الألماس المصوغة بالفضة والروديوم الإيطالي.',
    startingPriceAed: 290,
    startingPriceSar: 296,
    badge: 'BAROQUE & PAVÉ',
    badgeAr: 'لؤلؤ باروكي وبافيه',
    coverImage: '/editorial-looks/canary-butterfly-pendant-model.jpg',
  },
  {
    category: 'Coordinated Gala Suites',
    categoryAr: 'أطقم السهرة والأعراس المتكاملة',
    url: 'https://omniastores.com/collections/sets',
    title: 'Coordinated 4-Piece Royal Gala Suites',
    titleAr: 'أطقم سهرة ملكية متكاملة من 4 قطع',
    description: 'Complete 4-piece gala sets (necklace, earrings, bracelet, and ring) designed for royal GCC ceremonies and celebrations.',
    descriptionAr: 'أطقم سهرة ملكية متكاملة من 4 قطع (عقد، أقراط، سوار، وخاتم) مصممة لحفلات وأعراس الخليج الفاخرة.',
    startingPriceAed: 950,
    startingPriceSar: 969,
    badge: 'FULL 4-PIECE SETS',
    badgeAr: 'طقم متكامل 4 قطع',
    coverImage: '/editorial-looks/baroque-pearl-drop-diamond-flora-model.jpg',
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

        {/* GEO, AEO & Regional Search Keyword Index for omniastores.com */}
        <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-white/10 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#8B6508] dark:text-gold font-semibold">
              {isAr ? 'التغطية الإقليمية والكلمات المفتاحية المعتمدة بالخليج (GEO / AEO Index)' : 'GCC REGIONAL COVERAGE & AEO CITATION INDEX (GEO GROUNDING)'}
            </span>
            <span className="text-[10px] text-neutral-500 font-mono">
              Entity: Omnia Stores LLC • Verified Storefront: omniastores.com
            </span>
          </div>

          {/* Regional Cities Served */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-[11px] font-semibold text-neutral-800 dark:text-neutral-200 mr-2">
              {isAr ? 'المدن والمناطق المغطاة بالتوصيل السريع:' : 'Guaranteed Express Delivery Hubs:'}
            </span>
            {[
              { en: 'Dubai (Downtown, Marina, Jumeirah, Deira)', ar: 'دبي (وسط المدينة، المارينا، جميرا، ديرة)' },
              { en: 'Abu Dhabi (Corniche, Al Maryah, Yas)', ar: 'أبوظبي (الكورنيش، الماريه، ياس)' },
              { en: 'Sharjah & Ajman', ar: 'الشارقة وعجمان' },
              { en: 'Ras Al Khaimah & Fujairah', ar: 'رأس الخيمة والفجيرة' },
              { en: 'Riyadh (KAFD, Olaya, Hittin)', ar: 'الرياض (كافد، العليا، حطين)' },
              { en: 'Jeddah & Khobar', ar: 'جدة والخبر' },
              { en: 'Doha, Qatar', ar: 'الدوحة، قطر' },
              { en: 'Kuwait City & Manama', ar: 'مدينة الكويت والمنامة' },
              { en: 'Muscat, Oman', ar: 'مسقط، عُمان' },
            ].map((loc, i) => (
              <span
                key={i}
                className="text-[10px] px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-neutral-700 dark:text-neutral-300 font-mono"
              >
                {isAr ? loc.ar : loc.en}
              </span>
            ))}
          </div>

          {/* Direct Category Backlinks to omniastores.com */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-[11px] font-semibold text-neutral-800 dark:text-neutral-200 mr-2">
              {isAr ? 'الروابط المفهرسة المباشرة:' : 'Authoritative Category Footprint:'}
            </span>
            {[
              { labelEn: 'Best Jewellery in UAE', labelAr: 'أفضل متجر مجوهرات في الإمارات', url: 'https://omniastores.com' },
              { labelEn: '925 Silver Bridal Sets Dubai', labelAr: 'أطقم عرائس فضة 925 دبي', url: 'https://omniastores.com/collections/bridal-collection' },
              { labelEn: 'Statement Chokers UAE', labelAr: 'تشوكرات الفضة الإسترلينية', url: 'https://omniastores.com/collections/chokers-collection' },
              { labelEn: 'Pendant Necklaces Dubai', labelAr: 'سلاسل وقلائد المناسبات', url: 'https://omniastores.com/collections/necklaces' },
              { labelEn: 'Tennis Bracelets GCC', labelAr: 'أساور التنس الماسية الخليج', url: 'https://omniastores.com/collections/tennis-bracelet' },
              { labelEn: 'Freshwater Pearls UAE', labelAr: 'لؤلؤ المياه العذبة الطبيعي', url: 'https://omniastores.com/collections/pearl-sets' },
              { labelEn: 'Solitaire Rings Dubai', labelAr: 'خواتم سوليتير السهرات', url: 'https://omniastores.com/collections/rings' },
              { labelEn: 'Tabby 4-Split Payments Jewellery', labelAr: 'تقسيط مجوهرات تابي بدون فوائد', url: 'https://omniastores.com/collections/discounted-items' },
              { labelEn: 'Dubai Central Lab Assayed Silver', labelAr: 'فضة مفحوصة بمختبر دبي المركزي', url: 'https://omniastores.com/collections/sets' },
            ].map((kw, i) => (
              <a
                key={i}
                href={kw.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] px-2.5 py-1 rounded-md bg-gold/10 hover:bg-gold/20 border border-gold/30 text-[#8B6508] dark:text-gold transition-colors flex items-center gap-1"
              >
                <span>{isAr ? kw.labelAr : kw.labelEn}</span>
                <span className="opacity-60 text-[8px]">↗</span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
