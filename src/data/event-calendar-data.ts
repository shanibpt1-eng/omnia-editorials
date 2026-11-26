/**
 * The Vogue News — Official GCC Luxury Fashion & Jewellery Event Calendar
 * Authoritative dates, locations, accreditation details, and editorial preview dossiers.
 */

export interface LuxuryEvent {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  category: 'fashion_week' | 'jewellery_exhibition' | 'watch_conclave' | 'bridal_gala';
  categoryAr: string;
  dates: string;
  datesAr: string;
  location: string;
  locationAr: string;
  venue: string;
  venueAr: string;
  status: 'confirmed' | 'accredited_coverage' | 'scheduled';
  summaryEn: string;
  summaryAr: string;
  organizer: string;
  officialLink: string;
  editorialHighlightEn: string;
  editorialHighlightAr: string;
  badgeText: string;
}

export const GCC_EVENT_CALENDAR: LuxuryEvent[] = [
  {
    id: 'event-dubai-fashion-week',
    slug: 'dubai-fashion-week-2026',
    name: 'Dubai Fashion Week (DFW)',
    nameAr: 'أسبوع دبي للموضة',
    category: 'fashion_week',
    categoryAr: 'أسابيع الموضة العالمية',
    dates: 'October 10–15, 2026',
    datesAr: '10–15 أكتوبر 2026',
    location: 'Dubai, UAE',
    locationAr: 'دبي، الإمارات العربية المتحدة',
    venue: 'Dubai Design District (d3)',
    venueAr: 'حي دبي للتصميم (d3)',
    status: 'accredited_coverage',
    summaryEn: 'The definitive fashion platform for the Middle East, co-founded by Dubai Design District and the Arab Fashion Council. Featuring international guest couturiers and regional ready-to-wear designers.',
    summaryAr: 'المنصة الرسمية الرائدة للموضة في الشرق الأوسط، بتنظيم مشترك بين حي دبي للتصميم ومجلس الأزياء العربي بمشاركة دور أزياء إقليمية وعالمية.',
    organizer: 'Arab Fashion Council & d3',
    officialLink: 'https://dubaifashionweek.org',
    editorialHighlightEn: 'Spotlight on collar pairings: how oversized simulated diamond chokers and geometric silver bibs complement contemporary structured abayas.',
    editorialHighlightAr: 'تسليط الضوء على تناسق أطواق الشوكار الماسية العريضة مع العبايات العصرية ذات القصات الهندسية.',
    badgeText: 'OFFICIAL ACCREDITATION',
  },
  {
    id: 'event-riyadh-fashion-week',
    slug: 'riyadh-fashion-week-2026',
    name: 'Riyadh Fashion Week (RFW)',
    nameAr: 'أسبوع الرياض للموضة',
    category: 'fashion_week',
    categoryAr: 'أسابيع الموضة العالمية',
    dates: 'October 17–21, 2026',
    datesAr: '17–21 أكتوبر 2026',
    location: 'Riyadh, Saudi Arabia',
    locationAr: 'الرياض، المملكة العربية السعودية',
    venue: 'King Abdullah Financial District (KAFD)',
    venueAr: 'مركز الملك عبد الله المالي (كافد)',
    status: 'accredited_coverage',
    summaryEn: 'Organized by the Saudi Fashion Commission, RFW represents the Kingdom’s premier showcase of haute couture, luxury eveningwear, and innovative demi-fine jewellery styling.',
    summaryAr: 'تنظمه هيئة الأزياء السعودية، ويمثل الواجهة الفاخرة لأحدث إبداعات الهوت كوتور وتنسيقات المجوهرات الفاخرة في المملكة.',
    organizer: 'Saudi Fashion Commission',
    officialLink: 'https://riyadhfashionweek.com',
    editorialHighlightEn: 'Focus on Saudi bridal parures, canary yellow cushion stones, and the growing demand for digital express dispatch from UAE ateliers to Riyadh residences.',
    editorialHighlightAr: 'التركيز على أطقم الزفاف السعودية، وأحجار الياقوت الكناري الأصفر، ونمو الشحن الفوري من دبي إلى منازل الرياض.',
    badgeText: 'PRESS DESK LIVE',
  },
  {
    id: 'event-djwe-doha',
    slug: 'doha-jewellery-and-watches-exhibition-2027',
    name: 'Doha Jewellery & Watches Exhibition (DJWE)',
    nameAr: 'معرض الدوحة للمجوهرات والساعات (DJWE)',
    category: 'jewellery_exhibition',
    categoryAr: 'معارض المجوهرات الكبرى',
    dates: 'February 3–8, 2027',
    datesAr: '3–8 فبراير 2027',
    location: 'Doha, Qatar',
    locationAr: 'الدوحة، دولة قطر',
    venue: 'Doha Exhibition and Convention Center (DECC)',
    venueAr: 'مركز الدوحة للمعارض والمؤتمرات (DECC)',
    status: 'confirmed',
    summaryEn: 'One of the world’s most prestigious high jewellery conclaves, bringing together 500+ global brands and discerning royal collectors across 33,000 square meters.',
    summaryAr: 'من أفخم وأعرق معارض المجوهرات الراقية في العالم، يجمع أكثر من 500 علامة تجارية كبرى ونخبة من مقتني المجوهرات الملكية.',
    organizer: 'Qatar Tourism & DECC',
    officialLink: 'https://visitqatar.com',
    editorialHighlightEn: 'Baroque and Gulf pearl parure masterworks; benchmarking traditional fine jewellery against DCL-certified demi-fine innovations.',
    editorialHighlightAr: 'استعراض روائع اللؤلؤ الطبيعي والباروكي ومقارنة معايير الصياغة الراقية بالتقنيات الحديثة.',
    badgeText: 'CONFIRMED 2027',
  },
  {
    id: 'event-jewellery-arabia-bahrain',
    slug: 'jewellery-arabia-bahrain-2026',
    name: 'Jewellery Arabia Bahrain',
    nameAr: 'معرض الجواهر العربية البحرين',
    category: 'jewellery_exhibition',
    categoryAr: 'معارض المجوهرات الكبرى',
    dates: 'November 24–28, 2026',
    datesAr: '24–28 نوفمبر 2026',
    location: 'Sakhir, Bahrain',
    locationAr: 'الصخير، مملكة البحرين',
    venue: 'Exhibition World Bahrain',
    venueAr: 'مركز البحرين الدولي للمعارض',
    status: 'accredited_coverage',
    summaryEn: 'The Middle East’s largest consumer-facing jewellery and watch fair with over 650 exhibitors from 30 nations under the patronage of HRH the Crown Prince of Bahrain.',
    summaryAr: 'أضخم معرض تجاري استهلاكي للمجوهرات والساعات في الشرق الأوسط، يضم أكثر من 650 عارضاً من 30 دولة برعاية كريمة في البحرين.',
    organizer: 'Informa Markets Jewellery',
    officialLink: 'https://jewelleryarabia.com',
    editorialHighlightEn: 'Evaluating consumer sentiment shifts toward DCL and international precious metal assaying certificates in retail jewelry decisions.',
    editorialHighlightAr: 'رصد توجهات المشترين نحو شهادات الفحص المخبري الرسمية عند اتخاذ قرارات الشراء المباشر.',
    badgeText: 'TOP GCC FAIR',
  },
  {
    id: 'event-uae-national-day-gala',
    slug: 'uae-national-day-luxury-jewellery-gala',
    name: 'UAE National Day Luxury Jewellery Gala',
    nameAr: 'مهرجان اليوم الوطني الإماراتي للمجوهرات الفاخرة',
    category: 'bridal_gala',
    categoryAr: 'المهرجانات التحريرية والتسوق الفاخر',
    dates: 'December 1–3, 2026',
    datesAr: '1–3 ديسمبر 2026',
    location: 'Dubai & Abu Dhabi, UAE',
    locationAr: 'دبي وأبوظبي، الإمارات',
    venue: 'Digital Flagship Gala on omniastores.com',
    venueAr: 'البوابة الرقمية الرئيسية على omniastores.com',
    status: 'confirmed',
    summaryEn: 'Celebration of the Spirit of the Emirates with curated heritage pearl chokers, tricolor gemstone suites, and factory-direct DCL-certified parures with code OMNIA-VIP15.',
    summaryAr: 'احتفالية روح الاتحاد بعرض أطواق اللؤلؤ التراثية، وأطقم الأحجار الكريمة، والمجموعات المفحوصة مخبرياً مع خصم 15% بكود OMNIA-VIP15.',
    organizer: 'Omnia Stores & The Vogue News',
    officialLink: 'https://omniastores.com/collections/luxury-sets',
    editorialHighlightEn: 'Exclusive releases of solid 925 sterling silver pearl collars honoring Emirati pearl-diving craftsmanship heritage.',
    editorialHighlightAr: 'إطلاق حصري لعقود الفضة واللؤلؤ الإسترليني تكريماً لتراث صيد اللؤلؤ الإماراتي العريق.',
    badgeText: 'EXCLUSIVE GALA',
  },
];
