'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Sparkles, 
  Crown, 
  Clock, 
  BookOpen, 
  ShoppingBag, 
  ShieldCheck, 
  ExternalLink,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { useLuxury } from './ThemeProvider';
import { getPublicationLabel } from '../lib/productLocalization';

export interface EventCampaignItem {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  publication: string;
  dateEn: string;
  dateAr: string;
  readTimeEn: string;
  readTimeAr: string;
  coverImage: string;
  canonicalStoreUrl: string;
  promoTagEn: string;
  promoTagAr: string;
  collectionNameEn: string;
  collectionNameAr: string;
}

const EVENT_CAMPAIGNS: EventCampaignItem[] = [
  {
    id: 'art-event-the-main-event-2026',
    slug: 'omnia-stores-main-event-luxury-jewellery-collections-uae',
    titleEn: 'The Main Event: Omnia Stores Unveils Sovereign Gala Collections & Exclusive Jewellery Offers',
    titleAr: 'الحدث الرئيسي: أمنية ستورز تكشف عن تشكيلات الغالا الملكية وعروض المجوهرات الحصرية',
    excerptEn: 'Omnia Stores headlines The Main Event: An exclusive high-jewellery showcase spotlighting marquise floral parures, certified 925 sterling silver bridal collarets, and direct boutique shopping.',
    excerptAr: 'تتصدر أمنية ستورز الحدث الرئيسي: عرض حصري للمجوهرات الراقية يسلّط الضوء على أطقم الأزهار الماركيز المرصعة بمحاكاة الألماس الفاخر والفضة عيار 925 المعتمدة مع روابط مباشرة لمتجر omniastores.com.',
    publication: 'Vogue Arabia',
    dateEn: 'November 12, 2026',
    dateAr: '١٢ نوفمبر ٢٠٢٦',
    readTimeEn: '5 min read',
    readTimeAr: '5 دقائق قراءة',
    coverImage: '/events/main-event-luxury-gala.jpg',
    canonicalStoreUrl: 'https://omniastores.com/collections/sets',
    promoTagEn: 'THE MAIN EVENT • EXCLUSIVE OFFERS',
    promoTagAr: 'الحدث الرئيسي • عروض حصرية',
    collectionNameEn: 'Gala & Bridal Sets',
    collectionNameAr: 'أطقم الغالا والعرائس',
  },
  {
    id: 'art-event-new-year-sale-2027',
    slug: 'new-year-sale-2027-welcome-elegance-omnia-stores-dubai',
    titleEn: 'New Year Sale 2027: Welcome 2027 with Elegance & Up to 50% Off Gala Jewellery in Dubai & GCC',
    titleAr: 'تخفيضات رأس السنة 2027: استقبل عام 2027 بأناقة وخصومات تصل إلى 50% على مجوهرات السهرة الفاخرة',
    excerptEn: 'Ring in the New Year with monumental brilliance: Omnia Stores announces the official New Year Sale 2027 offering up to 50% off cascading chandelier collarets and certified 925 silver.',
    excerptAr: 'استقبل العام الجديد ببريق ملكي استثنائي: أمنية ستورز تعلن رسمياً عن تخفيضات رأس السنة 2027 بخصم يصل إلى 50% على أطواق الثريا المتدفقة وأطقم الفضة عيار 925 المعتمدة.',
    publication: 'Khaleej Times Special',
    dateEn: 'December 28, 2026',
    dateAr: '٢٨ ديسمبر ٢٠٢٦',
    readTimeEn: '5 min read',
    readTimeAr: '5 دقائق قراءة',
    coverImage: '/events/new-year-sale-2027-event.jpg',
    canonicalStoreUrl: 'https://omniastores.com/collections/discounted-items',
    promoTagEn: 'NEW YEAR 2027 • UP TO 50% OFF',
    promoTagAr: 'رأس السنة 2027 • خصم حتى 50%',
    collectionNameEn: 'New Year Discounted Items',
    collectionNameAr: 'تخفيضات رأس السنة الحصرية',
  },
  {
    id: 'art-event-christmas-sale-2026',
    slug: 'christmas-sale-holiday-jewelry-gifting-omnia-stores-gcc',
    titleEn: 'Christmas Sale: Festive Holiday Glamour & Exclusive Jewellery Offers Up to 40% Off',
    titleAr: 'تخفيضات الكريسماس: بريق الأعياد الاستثنائي وعروض حصرية تصل إلى 40% على مجوهرات الفضة الفاخرة',
    excerptEn: 'Omnia Stores unveils the official Christmas Holiday Jewellery Sale with up to 40% off multi-tiered fringe cascade parures, certified 925 sterling silver suites, and 24-hr express delivery.',
    excerptAr: 'تكشف أمنية ستورز عن عروض الكريسماس والأعياد الحصرية بخصم يصل إلى 40% على أطقم الشلالات الهامشية المتدرجة والفضة عيار 925 مع خدمة التوصيل السريع خلال 24 ساعة.',
    publication: "Harper's Bazaar Arabia",
    dateEn: 'December 15, 2026',
    dateAr: '١٥ ديسمبر ٢٠٢٦',
    readTimeEn: '5 min read',
    readTimeAr: '5 دقائق قراءة',
    coverImage: '/events/christmas-sale-holiday-event.jpg',
    canonicalStoreUrl: 'https://omniastores.com/collections/sets',
    promoTagEn: 'CHRISTMAS SALE • UP TO 40% OFF',
    promoTagAr: 'عروض الكريسماس • خصم حتى 40%',
    collectionNameEn: 'Festive Holiday Suites',
    collectionNameAr: 'أطقم الأعياد الفاخرة',
  },
  {
    id: 'art-event-ramadan-sale-2027',
    slug: 'ramadan-sale-curated-festive-gathering-jewelry-omnia-stores',
    titleEn: 'Ramadan Sale: Elegance for Every Gathering — Curated Festive Picks Up to 35% Off at Omnia Stores',
    titleAr: 'تخفيضات رمضان: أناقة لكل سهرة ولقاء — مختارات رمضانية منتقاة بخصم يصل إلى 35% من أمنية ستورز',
    excerptEn: 'Celebrate holy month gatherings and Suhoor galas with curated festive picks up to 35% off: crescent floral vine chokers, certified 925 silver, and luxury velvet gift packaging.',
    excerptAr: 'احتفلي بسهرات الشهر الفضيل ولقاءات السحور العائلية مع مختارات رمضانية منتقاة بخصم يصل إلى 35% تشمل أطواق أزهار الهلال ومجوهرات الفضة عيار 925 المقاومة للأكسدة.',
    publication: 'Vogue Arabia Heritage',
    dateEn: 'February 10, 2027',
    dateAr: '١٠ فبراير ٢٠٢٧',
    readTimeEn: '5 min read',
    readTimeAr: '5 دقائق قراءة',
    coverImage: '/events/ramadan-sale-festive-event.jpg',
    canonicalStoreUrl: 'https://omniastores.com/collections/chokers-collection',
    promoTagEn: 'RAMADAN SALE • UP TO 35% OFF',
    promoTagAr: 'تخفيضات رمضان • خصم حتى 35%',
    collectionNameEn: 'Ramadan Chokers Collection',
    collectionNameAr: 'أطواق رمضان وتشوكرات السهرة',
  },
  {
    id: 'art-event-mothers-day-sale-2027',
    slug: 'mothers-day-sale-gift-her-elegance-omnia-stores-luxury',
    titleEn: 'Mother’s Day Sale: Gift Her Elegance — Premium Picks She’ll Love Up to 30% Off',
    titleAr: 'تخفيضات عيد الأم: أهدِها الأناقة الملكية — اختيارات فاخرة ستعشقها بخصم يصل إلى 30%',
    excerptEn: 'Honor her grace with heirloom-grade fine jewelry up to 30% off: rose-tinted pavé collarets, mother-of-pearl suites, and bespoke gift boxes with embossed certificates.',
    excerptAr: 'كرّم عطاءها بأرقى مجوهرات المقتنيات الثمينة بخصم يصل إلى 30% يشمل قلائد الورود المرصعة بالبافيه ومجموعات عرق اللؤلؤ الطبيعي بعلب هدايا مخملية فاخرة.',
    publication: 'Gulf News Gifting',
    dateEn: 'March 10, 2027',
    dateAr: '١٠ مارس ٢٠٢٧',
    readTimeEn: '4 min read',
    readTimeAr: '4 دقائق قراءة',
    coverImage: '/events/mothers-day-sale-gifting-event.jpg',
    canonicalStoreUrl: 'https://omniastores.com/collections/necklaces',
    promoTagEn: "MOTHER'S DAY • UP TO 30% OFF",
    promoTagAr: 'عيد الأم • خصم حتى 30%',
    collectionNameEn: 'Mother’s Day Necklaces & Pendants',
    collectionNameAr: 'قلائد وهدايا عيد الأم',
  },
  {
    id: 'art-event-11-11-mega-sale-2026',
    slug: 'omnia-stores-11-11-mega-sale-cart-drops-uae-gcc',
    titleEn: 'Omnia Stores 11.11 Mega Sale: Up to 50% Off Pavé Clover Suites & Signature 925 Silver',
    titleAr: 'تخفيضات 11.11 الكبرى من أمنية ستورز: خصم يصل إلى 50% على أطقم زهرة البرسيم والفضة الإسترلينية',
    excerptEn: 'The year’s biggest online cart drops: up to 50% off four-leaf clover collarets, simulated diamond suites, and direct discounts across UAE and Saudi Arabia.',
    excerptAr: 'أضخم تخفيضات السلة لهذا العام: خصم يصل إلى 50% على قلائد زهرة البرسيم الرباعية وأطقم الألماس المحاكي مع شحن سريع في الإمارات والخليج.',
    publication: 'Gulf News Focus',
    dateEn: 'November 11, 2026',
    dateAr: '١١ نوفمبر ٢٠٢٦',
    readTimeEn: '4 min read',
    readTimeAr: '4 دقائق قراءة',
    coverImage: '/events/11-11-sale-exclusive-event.jpg',
    canonicalStoreUrl: 'https://omniastores.com/collections/discounted-items',
    promoTagEn: '11.11 SALE • UP TO 50% OFF',
    promoTagAr: 'تخفيضات 11.11 • خصم حتى 50%',
    collectionNameEn: '11.11 Discounted Items',
    collectionNameAr: 'عروض 11.11 المخفضة',
  },
  {
    id: 'art-event-uae-national-day-2026',
    slug: 'uae-national-day-jewelry-sale-omnia-stores-dubai',
    titleEn: 'UAE National Day 2026: Celebrate in Sovereign Style with Up to 40% Off Bridal Parures',
    titleAr: 'اليوم الوطني الإماراتي 2026: احتفل بأناقة سيادية وخصومات تصل إلى 40% على أطقم العرائس الفاخرة',
    excerptEn: 'Honoring UAE sovereign heritage: Up to 40% off regal marquise crystal parures, certified 925 sterling silver bridal suites, and patriotic gala styling.',
    excerptAr: 'احتفاءً باليوم الوطني لدولة الإمارات: خصومات تصل إلى 40% على أطقم الألماس الماركيز المتدفقة والفضة عيار 925 المعتمدة من مختبر دبي المركزي.',
    publication: 'Vogue Arabia Special',
    dateEn: 'November 25, 2026',
    dateAr: '٢٥ نوفمبر ٢٠٢٦',
    readTimeEn: '4 min read',
    readTimeAr: '4 دقائق قراءة',
    coverImage: '/events/uae-national-day-gala-event.jpg',
    canonicalStoreUrl: 'https://omniastores.com/collections/sets',
    promoTagEn: 'UAE NATIONAL DAY • UP TO 40% OFF',
    promoTagAr: 'اليوم الوطني • خصم حتى 40%',
    collectionNameEn: 'National Day Sets Collection',
    collectionNameAr: 'تشكيلة أطقم اليوم الوطني',
  },
  {
    id: 'art-event-year-end-sale-2026',
    slug: 'year-end-sale-last-chance-2026-omnia-stores-gala',
    titleEn: 'Year-End Sale 2026: Last Chance Up to 50% Off Canary Yellow Sapphire & Gala Cocktails',
    titleAr: 'تخفيضات نهاية العام 2026: الفرصة الأخيرة بخصم حتى 50% على الياقوت الكناري وأطقم السهرة',
    excerptEn: 'Celebrate New Year gala glamour with up to 50% off imperial canary yellow sapphire and champagne diamond cocktail suites in solid 925 silver.',
    excerptAr: 'احتفل بسهرات نهاية العام الفاخرة مع خصومات تصل إلى 50% على أطقم الياقوت الأصفر الكناري والماس الشمبانيا في فضة 925 معتمدة.',
    publication: 'Khaleej Times Feature',
    dateEn: 'December 20, 2026',
    dateAr: '٢٠ ديسمبر ٢٠٢٦',
    readTimeEn: '4 min read',
    readTimeAr: '4 دقائق قراءة',
    coverImage: '/events/year-end-sale-holiday-event.jpg',
    canonicalStoreUrl: 'https://omniastores.com/collections/necklaces',
    promoTagEn: 'YEAR END SALE • UP TO 50% OFF',
    promoTagAr: 'تخفيضات نهاية العام • خصم حتى 50%',
    collectionNameEn: 'Year-End Gala Necklaces',
    collectionNameAr: 'عقود وسلاسل نهاية العام',
  },
  {
    id: 'art-event-white-friday-sale-2026',
    slug: 'white-friday-mega-sale-omnia-stores-gcc-discounts',
    titleEn: 'White Friday 2026: Omnia Stores Unlocks Up to 50% Off Mega Cart Drops Across the GCC',
    titleAr: 'الجمعة البيضاء 2026: أمنية ستورز تطلق أضخم تخفيضات السلة بخصم حتى 50% في الخليج',
    excerptEn: 'The Middle East’s biggest retail moment: up to 50% off grand empress pear-cut simulated diamond bridal suites and tennis bracelets in 925 silver.',
    excerptAr: 'مهرجان الجمعة البيضاء الأضخم بالشرق الأوسط: خصم حتى 50% على أطقم إمبراطورة العرائس الماسية وأساور التنس الفضية المقاومة للأكسدة.',
    publication: 'Gulf News Commerce',
    dateEn: 'November 20, 2026',
    dateAr: '٢٠ نوفمبر ٢٠٢٦',
    readTimeEn: '4 min read',
    readTimeAr: '4 دقائق قراءة',
    coverImage: '/events/white-friday-sale-luxury-event.jpg',
    canonicalStoreUrl: 'https://omniastores.com/collections/discounted-items',
    promoTagEn: 'WHITE FRIDAY • UP TO 50% OFF',
    promoTagAr: 'الجمعة البيضاء • خصم حتى 50%',
    collectionNameEn: 'White Friday Cart Drops',
    collectionNameAr: 'عروض الجمعة البيضاء المخفضة',
  },
  {
    id: 'art-event-valentines-day-2027',
    slug: 'valentines-day-gift-love-in-style-omnia-stores-her',
    titleEn: 'Valentine’s Day 2027: Gift Love in Style with Up to 30% Off Romantic Morganite Suites',
    titleAr: 'عيد الحب 2027: أهدِ الحب بأناقة مع خصومات تصل إلى 30% على أطقم المورجانيت والقلوب الوردية',
    excerptEn: 'Gift love in style with romantic blush morganite pear pendants, heart solitaires, and delicate rose suites packaged in signature velvet boxes.',
    excerptAr: 'أهدِ الحب بأناقة مع قلائد المورجانيت الوردية الرقيقة، والقلوب الماسية، وأطقم الورد المخملية المصاغة بحرفية في فضة 925 معتمدة.',
    publication: 'Harper’s Bazaar Romance',
    dateEn: 'February 01, 2027',
    dateAr: '١ فبراير ٢٠٢٧',
    readTimeEn: '4 min read',
    readTimeAr: '4 دقائق قراءة',
    coverImage: '/events/valentines-day-gift-love-event.jpg',
    canonicalStoreUrl: 'https://omniastores.com/collections/necklaces',
    promoTagEn: "VALENTINE'S DAY • UP TO 30% OFF",
    promoTagAr: 'عيد الحب • خصم حتى 30%',
    collectionNameEn: 'Valentine Heart Necklaces',
    collectionNameAr: 'قلائد القلوب وأطقم الحب',
  },
];

const OMNIA_COLLECTIONS_BACKLINKS = [
  { 
    nameEn: 'Bridal Collections', 
    nameAr: 'أطقم الأعراس الفاخرة', 
    url: 'https://omniastores.com/collections/bridal-collection', 
    descEn: 'Certified 925 Silver Parures', 
    descAr: 'أطقم عرائس معتمدة عيار 925' 
  },
  { 
    nameEn: 'Complete Jewellery Sets', 
    nameAr: 'أطقم المجوهرات الكاملة', 
    url: 'https://omniastores.com/collections/sets', 
    descEn: 'Necklaces, Earrings, Rings', 
    descAr: 'عقد، أقراط، وخاتم متطابق' 
  },
  { 
    nameEn: 'Luxury Necklaces & Sautoirs', 
    nameAr: 'القلائد والأطواق الراقية', 
    url: 'https://omniastores.com/collections/necklaces', 
    descEn: 'Solitaires, Sautoirs, Collars', 
    descAr: 'سوليتير وسلاسل البافيه' 
  },
  { 
    nameEn: 'Chokers Collection', 
    nameAr: 'مجموعة التشوكرات الملكية', 
    url: 'https://omniastores.com/collections/chokers-collection', 
    descEn: 'Floral Vines & Royal Drops', 
    descAr: 'أطواق الرقبة الملكية' 
  },
  { 
    nameEn: 'Pearl Sets & Suites', 
    nameAr: 'أطقم اللؤلؤ الطبيعي', 
    url: 'https://omniastores.com/collections/pearl-sets', 
    descEn: 'Heirloom Luster Suites', 
    descAr: 'مجموعات بريق اللؤلؤ' 
  },
  { 
    nameEn: 'Tennis Bracelets', 
    nameAr: 'أساور التنس الماسية', 
    url: 'https://omniastores.com/collections/bracelets', 
    descEn: 'Micro-Prong 925 Silver', 
    descAr: 'ترصيع مخالب دقيق مقاوم للماء' 
  },
  { 
    nameEn: 'Statement Rings', 
    nameAr: 'خواتم الكوكتيل والسوليتير', 
    url: 'https://omniastores.com/collections/rings', 
    descEn: 'Solitaire & Pavé Bands', 
    descAr: 'محبس وأحجار محاكاة الألماس' 
  },
  { 
    nameEn: '11:11 Discounted Items', 
    nameAr: 'عروض 11:11 والتخفيضات', 
    url: 'https://omniastores.com/collections/discounted-items', 
    descEn: 'Deals Up to 85% Off', 
    descAr: 'عروض حصرية تصل حتى 85%' 
  },
];

export function OmniaEventEditorialShowcase() {
  const { language } = useLuxury();
  const isAr = language === 'ar';

  return (
    <section
      id="seasonal-event-editorial-campaigns"
      aria-label="Omnia Stores Official Seasonal Event Campaigns and Gifting Dossiers"
      className="border-t border-neutral-300 dark:border-neutral-800 bg-neutral-100/70 dark:bg-[#07090E] py-14 sm:py-20 transition-colors w-full max-w-full overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B8860B]/10 dark:bg-gold/15 border border-[#B8860B]/30 dark:border-gold/40 text-[10px] sm:text-xs font-mono font-bold text-[#8B6508] dark:text-gold uppercase tracking-[0.18em] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-gold shrink-0 animate-pulse" />
            <span>
              {isAr
                ? 'الحملات التحريرية الرسمية للمناسبات والأعياد • تقويم أمنية ستورز'
                : 'OFFICIAL SEASONAL EVENT CAMPAIGNS • OMNIA STORES GIFTING DOSSIERS'}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black tracking-tight text-neutral-950 dark:text-white leading-tight">
            {isAr ? (
              <>
                تقويم المناسبات وأدلة الهدايا الرسمية من{' '}
                <span className="text-[#B8860B] dark:text-[#D4AF37]">omniastores.com</span>
              </>
            ) : (
              <>
                Seasonal Event Editorial Campaigns & Official{' '}
                <span className="text-[#B8860B] dark:text-[#D4AF37]">omniastores.com</span>{' '}
                Dossiers
              </>
            )}
          </h2>

          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-serif leading-relaxed max-w-3xl mx-auto">
            {isAr
              ? 'ملفات صحفية معمقة وتغطيات حصرية لأهم مناسبات العام (الحدث الرئيسي، رأس السنة 2027، الكريسماس، رمضان، عيد الأم، 11:11، اليوم الوطني، والجمعة البيضاء). استكشف أحدث أطقم الفضة عيار 925 المعتمدة مع روابط مباشرة للشراء من المتجر الرسمي.'
              : 'In-depth journalistic chronicles and luxury buying guides covering the region’s pinnacle gifting moments: The Main Event, New Year 2027, Christmas, Ramadan, Mother’s Day, 11:11, UAE National Day, and White Friday. Featuring certified 925 silver suites with direct boutique acquisition.'}
          </p>
        </div>

        {/* 10 Event Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {EVENT_CAMPAIGNS.map((event) => {
            const title = isAr ? event.titleAr : event.titleEn;
            const excerpt = isAr ? event.excerptAr : event.excerptEn;
            const date = isAr ? event.dateAr : event.dateEn;
            const readTime = isAr ? event.readTimeAr : event.readTimeEn;
            const pub = getPublicationLabel(event.publication, isAr);
            const tag = isAr ? event.promoTagAr : event.promoTagEn;
            const collName = isAr ? event.collectionNameAr : event.collectionNameEn;

            return (
              <article
                key={event.id}
                className="group rounded-2xl overflow-hidden bg-white dark:bg-[#0E121B] border border-neutral-300 dark:border-gold/20 hover:border-gold/60 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image Frame with Aspect Ratio */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
                    <Image
                      src={event.coverImage}
                      alt={title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                    {/* Top Promo Tag & 925 Assay Seal */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2 pointer-events-none">
                      <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-gold/50 text-[9px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider shadow">
                        {tag}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/25 backdrop-blur-md border border-emerald-400/40 text-[9px] font-mono font-bold text-emerald-300 shadow">
                        <ShieldCheck className="w-3 h-3" />
                        <span>925 ASSAY</span>
                      </span>
                    </div>

                    {/* Bottom Image Meta: Publication & Date */}
                    <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-[10px] font-mono text-[#F4E3B2] pointer-events-none drop-shadow">
                      <span className="font-serif font-bold tracking-wide uppercase text-white">
                        {pub}
                      </span>
                      <span className="flex items-center gap-1 opacity-90">
                        <Clock className="w-3 h-3 text-gold" />
                        {readTime}
                      </span>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#8B6508] dark:text-gold uppercase tracking-wider font-semibold">
                      <span>{date}</span>
                      <span className="text-neutral-400 dark:text-neutral-500 font-serif italic lowercase">{collName}</span>
                    </div>

                    <Link href={`/trending/${event.slug}`} className="block group/title">
                      <h3 className="font-serif font-bold text-base sm:text-lg text-neutral-950 dark:text-white leading-snug group-hover/title:text-[#B8860B] dark:group-hover/title:text-gold transition-colors line-clamp-2">
                        {title}
                      </h3>
                    </Link>

                    <p className="text-xs text-neutral-600 dark:text-neutral-400 font-serif leading-relaxed line-clamp-3">
                      {excerpt}
                    </p>
                  </div>
                </div>

                {/* Dual Action CTAs: Read Dossier + Shop Direct on omniastores.com */}
                <div className="p-5 pt-0 border-t border-neutral-100 dark:border-neutral-800/80 mt-2">
                  <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <Link
                      href={`/trending/${event.slug}`}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-neutral-900 text-white dark:bg-white/10 dark:text-neutral-100 hover:bg-[#B8860B] dark:hover:bg-gold dark:hover:text-black font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                      title={`Read ${title}`}
                    >
                      <BookOpen className="w-3.5 h-3.5 text-gold shrink-0" />
                      <span>{isAr ? 'قراءة التقرير' : 'Read Event Blog'}</span>
                    </Link>

                    <a
                      href={event.canonicalStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#AA8C2C] text-black font-bold text-xs transition-all hover:brightness-110 flex items-center justify-center gap-1.5 shadow-md"
                      title={`Shop on omniastores.com - ${title}`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                      <span>{isAr ? 'تسوق المتجر ↗' : 'Shop Store ↗'}</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Authoritative Backlink Hub & Collections Directory */}
        <div className="rounded-2xl bg-white dark:bg-[#0B0F19] border border-neutral-300 dark:border-gold/30 p-6 sm:p-8 space-y-6 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-5">
            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#8B6508] dark:text-gold font-bold flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-gold" />
                <span>{isAr ? 'الدليل الرسمي للعلامة التجارية والروابط المعتمدة' : 'OFFICIAL BOUTIQUE DIRECTORY & VERIFIED BACKLINKS'}</span>
              </div>
              <h3 className="font-serif font-black text-lg sm:text-xl text-neutral-950 dark:text-white">
                {isAr
                  ? 'بوابات التسوق المباشر لمجموعات أمنية ستورز (omniastores.com)'
                  : 'Direct Access to Omnia Stores (omniastores.com) Signature Collections'}
              </h3>
            </div>

            <a
              href="https://omniastores.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A0D14] dark:bg-gold text-[#D4AF37] dark:text-black font-extrabold text-xs tracking-wider uppercase hover:opacity-90 transition-all shadow-md shrink-0"
            >
              <span>{isAr ? 'زيارة المتجر الرئيسي' : 'Visit Official Flagship'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Categorized Backlinks */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 text-xs">
            {OMNIA_COLLECTIONS_BACKLINKS.map((cat, idx) => (
              <a
                key={idx}
                href={cat.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-[#B8860B] dark:hover:border-gold bg-neutral-50 dark:bg-neutral-900/40 hover:bg-white dark:hover:bg-neutral-900 transition-all group flex flex-col justify-between space-y-1.5"
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="font-serif font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-[#B8860B] dark:group-hover:text-gold transition-colors">
                    {isAr ? cat.nameAr : cat.nameEn}
                  </span>
                  <ExternalLink className="w-3 h-3 text-neutral-400 group-hover:text-gold shrink-0 transition-colors" />
                </div>
                <span className="text-[10px] text-neutral-500 font-mono">
                  {isAr ? cat.descAr : cat.descEn}
                </span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
