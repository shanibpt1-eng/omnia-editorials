'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Sparkles, 
  Crown, 
  ShoppingBag, 
  ArrowUpRight, 
  CheckCircle2,
  Gem,
  Award
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
  category: 'all' | 'pearl' | 'ruby' | 'diamond';
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
    category: 'pearl',
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
    category: 'diamond',
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
  {
    id: 'ruby-gala',
    tagEn: 'HAUTE JOAILLERIE RUBY SUITE',
    tagAr: 'طقم الياقوت الملكي الفاخر',
    titleEn: 'The Royal Crimson Ruby & Marquise Diamond Gala Suite',
    titleAr: 'طقم الياقوت القرمزي الملكي والماركيز الماسي لحفلات الغالا',
    subtitleEn: 'Articulated cascading collar composed of graduated pigeon-blood simulated rubies bordered by precision-faceted marquise diamonds, with matching drop earrings and gala cuff.',
    subtitleAr: 'طوق متدفق فاخر يتألف من أحجار ياقوت دم الحمام المحاكية المتدرجة والمحاطة بألماس الماركيز الدقيق، مع أقراط متدلية مطابقة وسوار عريض للسهرات.',
    image: '/editorial-looks/ruby-gala-parure.jpg',
    imageAlt: 'Omnia Stores Royal Crimson Ruby and Marquise Diamond Gala Parure Suite on Model in Red Velvet Gown',
    priceAed: 1650,
    priceSar: 1683,
    originalPriceAed: 2750,
    originalPriceSar: 2805,
    storeUrl: 'https://omniastores.com/collections/sets',
    badgeEn: 'ROYAL GALA RED CARPET EDITION',
    badgeAr: 'طبعة السجادة الحمراء لحفلات الغالا',
    category: 'ruby',
    highlightsEn: [
      'Solid 925 Sterling Silver hallmarked under Dubai Central Laboratory assay',
      'Precision-cut 5A simulated pigeon-blood rubies with vivid red saturation',
      'Anti-tarnish electrolytic mirror rhodium coating resistant to Gulf humidity',
      'Delivered in velvet boutique chest with serial certification & 24h courier',
    ],
    highlightsAr: [
      'فضة إسترلينية أصلية عيار 925 مختومة ومفحوصة لدى مختبر دبي المركزي',
      'أحجار ياقوت دم الحمام درجة 5A ذات لون أحمر قرمزي ملكي وبريق مشع',
      'طلاء روديوم عاكس كالمرايا معالج كيميائياً لمقاومة الرطوبة والأكسدة',
      'يصل في صندوق مخملي فاخر مع شهادة الفحص المعتمدة وتوصيل خلال 24 ساعة',
    ],
  },
  {
    id: 'emerald-choker',
    tagEn: 'NATIONAL HERITAGE HIGH JEWELLERY',
    tagAr: 'مجوهرات التراث الوطني الراقية',
    titleEn: 'The Imperial Heritage 4-Strand Pearl & Colombian Emerald Choker',
    titleAr: 'طوق التراث الإمبراطوري رباعي صفوف اللؤلؤ والزمرد الكولومبي',
    subtitleEn: 'Four uniform strands of lustrous freshwater pearls anchored by three floral diamond motif plaques suspending smooth cabochon emerald drops.',
    subtitleAr: 'أربعة صفوف متناغمة من لؤلؤ المياه العذبة فائق اللمعان ترتبط بثلاثة أزهار ماسية ساحرة تتدلى منها قطرات الزمرد الكولومبي الناعمة.',
    image: '/editorial-looks/imperial-emerald-pearl-choker.jpg',
    imageAlt: 'Omnia Stores Imperial 4-Strand Pearl Choker with Colombian Emerald Drops on Model',
    priceAed: 1890,
    priceSar: 1928,
    originalPriceAed: 3150,
    originalPriceSar: 3213,
    storeUrl: 'https://omniastores.com/collections/chokers-collection',
    badgeEn: 'UAE NATIONAL DAY SIGNATURE SUITE',
    badgeAr: 'طقم اليوم الوطني لدولة الإمارات الحصري',
    category: 'pearl',
    highlightsEn: [
      'Over 180 hand-strung, hand-knotted luminous freshwater pearls with mirror luster',
      'Simulated Colombian emerald teardrops with rich verdant green saturation',
      'Heavy solid 925 silver clasp with dual safety catch and anti-tarnish rhodium',
      'Commemorative UAE National Day collector’s edition certificate from Omnia Stores',
    ],
    highlightsAr: [
      'أكثر من 180 حبة لؤلؤ مياه عذبة منتقاة ومعقودة يدوياً ببريق لؤلؤي أخّاذ',
      'قطرات زمرد كولومبي محاكاة بلون أخضر زمردي عميق تحاكي المجوهرات الملكية',
      'مشبك فضة عيار 925 متين مع قفل أمان مزدوج وطبقة عازلة للأكسدة',
      'شهادة إصدار تذكاري خاص لليوم الوطني الإماراتي من أمنية ستورز',
    ],
  },
  {
    id: 'geometric-pearl',
    tagEn: 'AVANT-GARDE ARCHITECTURAL JEWELLERY',
    tagAr: 'مجوهرات معمارية هندسية مبتكرة',
    titleEn: 'The Royal Sovereign Geometric Diamond Collar & South Sea Pearl',
    titleAr: 'طوق السيادة الملكي الهندسي المرصع بالألماس ولؤلؤة بحر الجنوب',
    subtitleEn: 'Articulated openwork geometric collar featuring repeating chevron and pavé motifs, suspending a lustrous 14mm simulated South Sea pearl drop with matching earrings.',
    subtitleAr: 'طوق هندسي مفرغ بتصميم شيفرون بافيه متكرر يعانق الرقبة بأناقة، تتدلى منه لؤلؤة بحر الجنوب الفاخرة بقطر 14 مم مع أقراط مطابقة.',
    image: '/editorial-looks/geometric-diamond-south-sea-pearl.jpg',
    imageAlt: 'Omnia Stores Geometric Diamond Collar with Suspended South Sea Pearl on Model',
    priceAed: 1750,
    priceSar: 1785,
    originalPriceAed: 2950,
    originalPriceSar: 3009,
    storeUrl: 'https://omniastores.com/collections/bridal-collection',
    badgeEn: 'NEW YEAR 2027 RED CARPET HIGHLIGHT',
    badgeAr: 'نجمة السجادة الحمراء لرأس السنة 2027',
    category: 'diamond',
    highlightsEn: [
      'Solid 925 Sterling Silver frame engineered for ergonomic neck contouring',
      'High-density micro-claw pavé diamonds with zero adhesive architecture',
      'Flawless 14mm teardrop pearl with deep orient and satin surface quality',
      'Express same-day courier dispatch in Dubai and Abu Dhabi with Tabby 4 Pay',
    ],
    highlightsAr: [
      'هيكل فضة إسترلينية 925 مصمم هندسياً ليستقر بمرونة على الرقبة',
      'ترصيع بافيه عالي الكثافة لألماس المحاكاة بدون أي غراء أو مواد لاصقة',
      'لؤلؤة كمثرية نقية مقاس 14 مم ببريق ساتاني عميق يأسر القلوب',
      'شحن سريع في نفس اليوم بدبي وأبوظبي مع تقسيط مريح عبر تابي',
    ],
  },
  {
    id: 'butterfly-pendant',
    tagEn: 'WHIMSICAL NATURE HIGH JEWELLERY',
    tagAr: 'مجوهرات الطبيعة الساحرة الراقية',
    titleEn: 'The Monarch Canary Yellow Pavé Diamond Butterfly Pendant',
    titleAr: 'قلادة الفراشة الماسية الصفراء بأحجار البافيه الكنارية',
    subtitleEn: 'Dimensional butterfly silhouette pavé-set with canary yellow simulated sapphires and white brilliant-cut diamond accents on a station-chain.',
    subtitleAr: 'تصميم فراشة ثلاثي الأبعاد مرصع بأحجار الياقوت الأصفر الكناري المحاكية مع لمسات من الألماس البافيه المتلألئ على سلسلة أنيقة.',
    image: '/editorial-looks/canary-butterfly-pendant.jpg',
    imageAlt: 'Omnia Stores Monarch Canary Yellow Sapphire and Pavé Diamond Butterfly Pendant on Model',
    priceAed: 690,
    priceSar: 704,
    originalPriceAed: 1150,
    originalPriceSar: 1173,
    storeUrl: 'https://omniastores.com/collections/necklaces',
    badgeEn: 'EXCLUSIVE SPRING RUNWAY EDITION',
    badgeAr: 'طبعة ربيع حصرية من منصة العرض',
    category: 'diamond',
    highlightsEn: [
      'Solid 925 Sterling Silver core with dual 18K yellow gold and rhodium immersion',
      'High-refractive simulated canary sapphires with micro-claw pavé setting',
      'Delicate adjustable cable chain accented with bezel-set solitaire diamonds',
      'Guaranteed 24-hour courier delivery across Dubai, Abu Dhabi & Riyadh',
    ],
    highlightsAr: [
      'هيكل من الفضة الإسترلينية 925 مع طلاء مزدوج بالذهب الأصفر عيار 18 والروديوم',
      'أحجار ياقوت كناري أصفر ذات بريق عالي وترصيع إيطالي بالمخالب الدقيقة',
      'سلسلة قابلة لتعديل الطول مزينة بألماسات محاكاة ذات إطار كلاسيكي فاخر',
      'توصيل سريع ومضمون خلال 24 ساعة في دبي وأبوظبي والرياض',
    ],
  },
  {
    id: 'crimson-teardrop',
    tagEn: 'ROYAL RUBY RIVIÈRE',
    tagAr: 'طقم ريفيير الياقوت الملكي',
    titleEn: 'The Empress Teardrop Ruby & Solitaire Diamond Rivière',
    titleAr: 'عقد ريفيير الياقوت الإمبراطوري الكمثري وأقراط القطرة',
    subtitleEn: 'Graduated teardrop simulated pigeon-blood rubies set in alternating bezel diamond links, culminating in a monumental pear-cut ruby focal pendant.',
    subtitleAr: 'أحجار ياقوت كمثرية متدرجة ذات بريق أحمر ساحر تتناوب مع حلقات الألماس لتنتهي بحجر ياقوت كمثري ضخم متدفق.',
    image: '/editorial-looks/crimson-teardrop-ruby-suite.jpg',
    imageAlt: 'Omnia Stores Empress Teardrop Ruby and Solitaire Diamond Rivière Suite on Model in Red Gown',
    priceAed: 1380,
    priceSar: 1408,
    originalPriceAed: 2300,
    originalPriceSar: 2346,
    storeUrl: 'https://omniastores.com/collections/sets',
    badgeEn: 'LIMITED HOLIDAY EDITION',
    badgeAr: 'طبعة الأعياد المحدودة',
    category: 'ruby',
    highlightsEn: [
      'Solid 925 Sterling Silver core with protective electrolytic rhodium barrier',
      'Flawless teardrop simulated rubies with intense optical clarity and brilliance',
      'Hypoallergenic, 100% lead and nickel-free certified precious construction',
      'Express courier fulfillment with insured delivery across UAE & Saudi Arabia',
    ],
    highlightsAr: [
      'هيكل فضة إسترلينية 925 مع طبقة روديوم كهربائية عازلة للأكسدة',
      'أحجار ياقوت كمثرية فائقة النقاء تمنحك إطلالة ملكية في المناسبات الكبرى',
      'خالٍ تماماً 100% من النيكل والرصاص المسبب لتحسس البشرة',
      'شحن سريع مؤمن وتوصيل مباشر خلال 24 ساعة في الإمارات والسعودية',
    ],
  },
  {
    id: 'pink-sapphire',
    tagEn: 'DEMI-FINE PASTEL JEWELLERY',
    tagAr: 'مجوهرات الباستيل الراقية',
    titleEn: 'The Rose Princess Oval Pink Sapphire & Diamond Halo Pendant',
    titleAr: 'قلادة الأميرة روز البيضاوية بالياقوت الوردي وهالة الألماس',
    subtitleEn: 'Centerpiece oval-cut simulated pink sapphire surrounded by an articulated scalloped halo of brilliant-cut diamonds on a delicate station chain.',
    subtitleAr: 'حجر ياقوت وردي بيضاوي ناعم محاط بهالة مموجة ساحرة من أحجار الألماس البافيه على سلسلة ناعمة مرصعة بالمحطات الماسية.',
    image: '/editorial-looks/pink-sapphire-halo-pendant.jpg',
    imageAlt: 'Omnia Stores Rose Princess Oval Pink Sapphire and Diamond Halo Pendant on Model',
    priceAed: 590,
    priceSar: 602,
    originalPriceAed: 990,
    originalPriceSar: 1010,
    storeUrl: 'https://omniastores.com/collections/necklaces',
    badgeEn: 'VALENTINE VIP EXCLUSIVE',
    badgeAr: 'حصري لعيد الحب والمناسبات الرومانسية',
    category: 'diamond',
    highlightsEn: [
      'Solid 925 Sterling Silver finished with multi-layer mirror rhodium polish',
      'High-clarity simulated pink sapphire with soft romantic hue and maximum fire',
      'Scalloped vintage-inspired micro-prong basket setting ensuring total stone security',
      'Available on Tabby 4 installments with complimentary velvet gift presentation',
    ],
    highlightsAr: [
      'فضة إسترلينية نقية عيار 925 مصقولة بطبقات الروديوم العاكس كالمرايا',
      'حجر ياقوت وردي محاكي فائق النقاوة يفيض بالرقة والأنوثة والبريق',
      'ترصيع تاجي كلاسيكي دقيق يثبت الأحجار بأمان تام دون أي مواد لاصقة',
      'إمكانية التقسيط على 4 دفعات مريحة عبر تابي مع علبة هدايا مخملية مجانية',
    ],
  },
];

export function OmniaHauteCoutureBillboardAd() {
  const { language, currency } = useLuxury();
  const isAr = language === 'ar';
  const isSar = currency === 'SAR';

  const [activeCategory, setActiveCategory] = useState<'all' | 'pearl' | 'ruby' | 'diamond'>('all');

  const displayedLooks = activeCategory === 'all' 
    ? CAMPAIGN_LOOKS 
    : CAMPAIGN_LOOKS.filter(look => look.category === activeCategory);

  return (
    <section 
      aria-label="Omnia Stores Official Haute Couture Advertising Billboard"
      className="w-full my-10 sm:my-16 px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* 1. Prestigious Top Banner Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-300 dark:border-gold/25 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-br from-[#DFB743] via-[#FCEAA5] to-[#C99E32] text-black shadow-md shrink-0">
            <Crown className="w-5 h-5 text-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#8B6508] dark:text-gold">
                {isAr ? 'حملة الأزياء الراقية الحصرية' : 'HAUTE COUTURE EDITORIAL CAMPAIGN'}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[9px] font-bold border border-emerald-500/30">
                OFFICIAL RUNWAY
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-black text-neutral-900 dark:text-white">
              {isAr ? 'روائع منصات العرض الملكية: تشكيلات أمنية ستورز' : 'Omnia Stores Flagship: Runway Masterpieces'}
            </h3>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-xs font-mono self-start sm:self-auto overflow-x-auto max-w-full no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-gold text-black font-bold shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
            }`}
          >
            {isAr ? 'جميع القطع' : 'All Looks'}
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('pearl')}
            className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
              activeCategory === 'pearl'
                ? 'bg-gold text-black font-bold shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
            }`}
          >
            {isAr ? 'أطقم اللؤلؤ والزمرد' : 'Pearls & Emeralds'}
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('ruby')}
            className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
              activeCategory === 'ruby'
                ? 'bg-gold text-black font-bold shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
            }`}
          >
            {isAr ? 'الياقوت الملكي' : 'Royal Rubies'}
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('diamond')}
            className={`px-3 py-1.5 rounded-full transition-all whitespace-nowrap ${
              activeCategory === 'diamond'
                ? 'bg-gold text-black font-bold shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
            }`}
          >
            {isAr ? 'الألماس والأحجار الفاخرة' : 'High Diamonds'}
          </button>
        </div>
      </div>

      {/* 2. Responsive Advertising Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {displayedLooks.map((look) => {
          const currentPrice = isSar ? look.priceSar : look.priceAed;
          const originalPrice = isSar ? look.originalPriceSar : look.originalPriceAed;
          const currencyLabel = isSar ? (isAr ? 'ر.س' : 'SAR') : (isAr ? 'د.إ' : 'AED');

          return (
            <article
              key={look.id}
              className="group relative rounded-3xl overflow-hidden bg-white dark:bg-[#0A0D15] border border-neutral-300 dark:border-gold/30 shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col w-full max-w-full justify-between"
            >
              <div>
                {/* Image Frame with Aspect Ratio */}
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-neutral-900">
                  <Image
                    src={look.image}
                    alt={look.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    className="object-cover object-top sm:object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                  {/* Top Badges Overlay */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between gap-2 pointer-events-none">
                    <span className="px-2.5 sm:px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-gold/40 text-[9px] sm:text-[10px] font-mono font-bold text-[#D4AF37] tracking-wider uppercase shadow-md truncate">
                      {isAr ? look.badgeAr : look.badgeEn}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-red-600/90 text-white font-mono text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest shadow-md shrink-0">
                      40% OFF
                    </span>
                  </div>

                  {/* Bottom Photo Title Overlay */}
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white drop-shadow">
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-[#F9E8B8] block mb-1">
                      {isAr ? look.tagAr : look.tagEn}
                    </span>
                    <h4 className="text-lg sm:text-2xl font-serif font-black leading-tight text-white group-hover:text-[#FCEAA5] transition-colors">
                      {isAr ? look.titleAr : look.titleEn}
                    </h4>
                  </div>
                </div>

                {/* Advertisement Body */}
                <div className="p-5 sm:p-7 space-y-4">
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
              </div>

              {/* Price & Commercial CTA */}
              <div className="p-5 sm:p-7 pt-0 border-t border-neutral-100 dark:border-white/5 mt-2">
                <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
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
                    className="relative inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#DFB743] via-[#FCEAA5] to-[#C99E32] text-black font-serif font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_4px_20px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_28px_rgba(212,175,55,0.6)] hover:scale-[1.02] active:scale-95 transition-all duration-300 group/btn shrink-0"
                    title={`Shop ${look.titleEn} on omniastores.com`}
                  >
                    <ShoppingBag className="w-4 h-4 text-black group-hover/btn:rotate-12 transition-transform shrink-0" />
                    <span>{isAr ? 'تسوق القطعة من المتجر الرسمي' : 'Shop on omniastores.com'}</span>
                    <ArrowUpRight className={`w-4 h-4 ${isAr ? 'rotate-[-90deg]' : ''} shrink-0`} />
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
