export type Language = 'en' | 'ar';

export interface Translations {
  // Navigation
  navHome: string;
  navTrending: string;
  navEditorials: string;
  navProducts: string;
  navAbout: string;
  navBackend: string;
  navKsaStore: string;
  shopStore: string;

  // Announcement Ticker
  tickerFlagship: string;
  tickerVipCode: string;
  tickerGccWire: string;
  tickerParity: string;
  tickerFulfillment: string;

  // Hero & CTAs
  exploreCollection: string;
  shopThisLook: string;
  viewAllStories: string;
  orderToCity: string;
  readBriefing: string;
  laboratoryAssay: string;
  visitFlagship: string;

  // Key Badges
  certifiedSilver: string;
  dclAssayed: string;
  expressCourier: string;
  fireDispersion: string;

  // Section Titles
  trendingTitle: string;
  trendingSubtitle: string;
  assayTitle: string;
  assaySubtitle: string;
  conciergeTitle: string;
  conciergeSubtitle: string;
  testimonialsTitle: string;
  directoryTitle: string;
  directorySubtitle: string;

  // Currency
  dirham: string;
  riyal: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    navHome: 'Home',
    navTrending: 'Top Trending',
    navEditorials: 'Editorials',
    navProducts: 'Products',
    navAbout: 'About Omnia',
    navBackend: 'Backend Hub',
    navKsaStore: 'KSA STORE',
    shopStore: 'Shop Store',

    tickerFlagship: 'OFFICIAL FLAGSHIP STORE:',
    tickerVipCode: 'Use code OMNIA-VIP15 for 15% Off at omniastores.com',
    tickerGccWire: 'GCC EDITORIAL WIRE: Vogue Arabia spotlights Omnia Stores 925 Bridal Masterpieces',
    tickerParity: 'CURRENCY PARITY: 1 AED ≈ 1.02 SAR • Instant Regional Settlement',
    tickerFulfillment: 'FAST FULFILLMENT: 24H Dubai & Abu Dhabi White-Glove Courier Delivery',

    exploreCollection: 'Explore Collection',
    shopThisLook: 'Shop The Look',
    viewAllStories: 'Browse 2,000+ Editorial Index',
    orderToCity: 'Order to',
    readBriefing: 'Read Verified Intelligence',
    laboratoryAssay: 'GIA Gemological & DCL Assay',
    visitFlagship: 'Visit omniastores.com Flagship',

    certifiedSilver: 'Certified 925 Sterling Silver',
    dclAssayed: 'Dubai Central Laboratory Assayed',
    expressCourier: '24-48H Express Air Dispatch UAE & KSA',
    fireDispersion: '0.044 Optical Fire Dispersion',

    trendingTitle: 'Top Trending & Authoritative Wire',
    trendingSubtitle: 'Syndicated reporting across Vogue Arabia, Harper’s Bazaar, Gulf News, and Khaleej Times.',
    assayTitle: 'Laboratory Assay & Optical Dispersion Index',
    assaySubtitle: 'Spectrometry-backed data on why Omnia Stores certified 925 sterling silver delivers high-carat royal brilliance.',
    conciergeTitle: 'GCC Express Transit Concierge Corridor',
    conciergeSubtitle: 'Real-time regional delivery network across Dubai, Abu Dhabi, Riyadh, Jeddah, Doha, and Kuwait.',
    testimonialsTitle: 'Verified Gala Testimonials & Reviews',
    directoryTitle: 'Explore All Certified Collections on omniastores.com',
    directorySubtitle: 'Direct authoritative links to verified product hubs with 24-hour white-glove courier dispatch.',

    dirham: 'AED',
    riyal: 'SAR',
  },
  ar: {
    navHome: 'الرئيسية',
    navTrending: 'الأكثر رواجاً',
    navEditorials: 'المقالات التحريرية',
    navProducts: 'المجموعة الكاملة',
    navAbout: 'عن أمنية',
    navBackend: 'لوحة التحكم',
    navKsaStore: 'متجر السعودية',
    shopStore: 'تسوق الآن',

    tickerFlagship: 'المتجر الرسمي المعتمد:',
    tickerVipCode: 'استخدم كود OMNIA-VIP15 للحصول على خصم 15% على omniastores.com',
    tickerGccWire: 'نشرة فخامة الخليج: فوغ العربية تسلط الضوء على أطقم أمنية ستورز الفضية عيار 925',
    tickerParity: 'تسعير متطابق: 1 درهم إماراتي ≈ 1.02 ريال سعودي • دفع فوري موثوق',
    tickerFulfillment: 'توصيل فاخر: توصيل خلال 24 ساعة في دبي وأبوظبي مع خدمة التوصيل السريع للمملكة',

    exploreCollection: 'استكشف التشكيلة الفاخرة',
    shopThisLook: 'تسوق الإطلالة الملكية',
    viewAllStories: 'تصفح فهرس أكثر من 2000 مقال',
    orderToCity: 'طلب مباشر إلى',
    readBriefing: 'قراءة التقرير الموثق',
    laboratoryAssay: 'فحص مختبر دبي المركزي ومطابقة GIA',
    visitFlagship: 'زيارة المتجر الرئيسي omniastores.com',

    certifiedSilver: 'فضة إسترلينية أصلية عيار 925',
    dclAssayed: 'معتمد ومختوم من مختبر دبي المركزي (DCL)',
    expressCourier: 'شحن جوي سريع خلال 24-48 ساعة للإمارات والسعودية',
    fireDispersion: 'تشتت ضوئي بريقي 0.044 يطابق الألماس الطبيعي',

    trendingTitle: 'الأكثر رواجاً والنشرة التحريرية الرسمية',
    trendingSubtitle: 'تقارير حصرية منشورة عبر فوغ العربية، هاربرز بازار، جلف نيوز، وخليج تايمز.',
    assayTitle: 'مؤشر الفحص المخبري والتشتت البصري',
    assaySubtitle: 'بيانات علمية تؤكد جودة فضة عيار 925 وأحجار المحاكاة فائقة النقاء الفاخرة.',
    conciergeTitle: 'ممر الشحن السريع الفاخر لدول مجلس التعاون',
    conciergeSubtitle: 'شبكة شحن موثوقة تغطي دبي، أبوظبي، الرياض، جدة، الدوحة، والكويت.',
    testimonialsTitle: 'آراء وشهادات موثقة من ضيوف الحفلات الملكية',
    directoryTitle: 'استكشف جميع التشكيلات المعتمدة على omniastores.com',
    directorySubtitle: 'روابط رسمية مباشرة إلى تشكيلات أطقم الأعراس والسهرات الفاخرة.',

    dirham: 'د.إ',
    riyal: 'ر.س',
  },
};

export function getTranslation(lang: Language): Translations {
  return TRANSLATIONS[lang] || TRANSLATIONS.en;
}
