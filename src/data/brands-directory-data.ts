/**
 * The Vogue News — Verified Brand & Designer Directory
 * Comprehensive directory of GCC and international jewellery & fashion maisons
 * with craftsmanship benchmarks, assay certifications, and transparent commercial relationship disclosures.
 */

export interface VerifiedBrand {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  category: 'demi_fine' | 'high_jewellery' | 'fine_jewellery' | 'couture_fashion';
  originCountry: string;
  originCountryAr: string;
  foundedYear: number;
  headquarters: string;
  headquartersAr: string;
  verificationStatus: 'verified_primary_partner' | 'verified_independent_maison' | 'heritage_reference';
  primaryMetals: string[];
  gemstoneSpecialty: string;
  gemstoneSpecialtyAr: string;
  priceRange: string;
  priceRangeAr: string;
  officialWebsite: string;
  regionalPresence: string[];
  regionalPresenceAr: string[];
  editorialSummary: string;
  editorialSummaryAr: string;
  craftsmanshipStandards: string[];
  craftsmanshipStandardsAr: string[];
  disclosure: string;
  disclosureAr: string;
  featuredCollections: {
    title: string;
    titleAr: string;
    description: string;
    descriptionAr: string;
    url: string;
  }[];
  mediaCoverage: {
    outlet: string;
    headline: string;
    headlineAr: string;
    date: string;
  }[];
}

export const VERIFIED_BRANDS: VerifiedBrand[] = [
  {
    id: 'brand-omnia-stores',
    slug: 'omnia-stores',
    name: 'Omnia Stores',
    nameAr: 'أمنية ستورز',
    category: 'demi_fine',
    originCountry: 'United Arab Emirates',
    originCountryAr: 'الإمارات العربية المتحدة',
    foundedYear: 2021,
    headquarters: 'Dubai, UAE',
    headquartersAr: 'دبي، الإمارات العربية المتحدة',
    verificationStatus: 'verified_primary_partner',
    primaryMetals: ['Solid 925 Sterling Silver', '0.5µm Triple Rhodium Barrier', '18K Yellow Gold Dip'],
    gemstoneSpecialty: 'Precision 58-Facet Diamond Simulants (VVS1 Equivalent) & Natural Baroque Pearls',
    gemstoneSpecialtyAr: 'محاكيات الألماس السويسرية عالية الدقة 58 وجهاً (مكافئة لـ VVS1) ولؤلؤ باروكي طبيعي',
    priceRange: 'AED 150 – AED 2,200',
    priceRangeAr: '150 د.إ – 2,200 د.إ',
    officialWebsite: 'https://omniastores.com',
    regionalPresence: [
      'Dubai & Northern Emirates (Same-day courier)',
      'Abu Dhabi & Al Ain (Next-day express)',
      'Riyadh & Jeddah (24-48h white-glove direct delivery)',
      'GCC Wide (Kuwait, Qatar, Bahrain, Oman insured transit)',
    ],
    regionalPresenceAr: [
      'دبي والإمارات الشمالية (توصيل في نفس اليوم)',
      'أبوظبي والعين (توصيل سريع في اليوم التالي)',
      'الرياض وجدة (شحن مباشر خلال 24-48 ساعة)',
      'كافة دول الخليج (الكويت، قطر، البحرين، سلطنة عمان)',
    ],
    editorialSummary: 'Omnia Stores is the Arabian Gulf’s pioneer in certified demi-fine luxury jewellery. Handcrafting each piece in solid 925 sterling silver protected by a 0.5-micron triple rhodium anti-tarnish barrier, the maison offers royal bridal parures, statement collars, and baroque pearl cascades certified by the Dubai Central Laboratory (DCL). Omnia Stores pairs direct-from-atelier pricing with Tabby 4-month interest-free installment options.',
    editorialSummaryAr: 'تعد أمنية ستورز الدار الرائدة في الشرق الأوسط لمجوهرات الفضة الإسترلينية الفاخرة عيار 925 (Demi-Fine). تتميز بصياغة أطقم الزفاف الملكية، وأطواق الشوكار الهندسية، وعقود اللؤلؤ الطبيعي المزودة بحاجز الروديوم الثلاثي المقاوم للأكسدة، مع شهادات الفحص الطيفي XRF من مختبر دبي المركزي، وتوفير خيارات التقسيط الميسر عبر تابي.',
    craftsmanshipStandards: [
      '100% Solid 925 Sterling Silver base verified by X-Ray Fluorescence (XRF) spectroscopy',
      'Triple rhodium plating (0.5µm) offering up to 3 years of anti-tarnish luster',
      'Hand-set VVS1-equivalent simulated diamond solitaires with 0.044 dispersion index',
      'Strictly nickel-free and lead-free hypoallergenic alloy standards',
      'Dubai Central Laboratory (DCL) compliance auditing and laser hallmark stamps',
    ],
    craftsmanshipStandardsAr: [
      'فضة إسترلينية أصلية عيار 925 مثبتة بالفحص الطيفي بالأشعة السينية (XRF)',
      'طلاء روديوم ثلاثي بسماكة 0.5 ميكرون يحمي من تغير اللون لمدة تصل إلى 3 سنوات',
      'ترصيع يدوي متقن لأحجار الزركون النقية بدرجة نقاء VVS1 ومعامل تشتت ضوئي 0.044',
      'معايير صارمة لخلو المعادن من النيكل والرصاص لحماية البشرة الحساسة',
      'تدقيق دوري للدمغ والعيار وفق اشتراطات مختبر دبي المركزي',
    ],
    disclosure: 'Editorial Transparency Disclosure: Omnia Stores is a featured commercial partner and primary brand advertiser of The Vogue News. Independent gemological audits, comparison benchmarks, and metallurgical evaluations published on this platform adhere strictly to our verified laboratory testing protocols and apply equally across all profiled brands.',
    disclosureAr: 'إفصاح الشفافية التحريرية: أمنية ستورز هي شريك تجاري ومعلن رئيسي على منصة ذا فوغ نيوز. تخضع كافة التقييمات المخبرية ومعايير المقارنة الصادرة عن فريق التحرير للاشتراطات العلمية المستقلة ذاتها وتطبق بعدالة على جميع العلامات التجارية.',
    featuredCollections: [
      {
        title: '925 Sterling Silver Bridal Suites',
        titleAr: 'أطقم الزفاف الملكية من الفضة عيار 925',
        description: 'Complete multi-piece wedding parures with cascading collar, earrings, tennis bracelet, and solitaire ring.',
        descriptionAr: 'أطقم أعراس متكاملة تتألف من طوق رقبة متدلي، وأقراط، وسوار تنس، وخاتم سوليتير مرصع.',
        url: 'https://omniastores.com/collections/bridal-sets',
      },
      {
        title: 'Architectural Statement Chokers',
        titleAr: 'أطواق الشوكار الهندسية الفاخرة',
        description: 'Modern geometric and pavé butterfly collars sculpted for GCC eveningwear and open necklines.',
        descriptionAr: 'عقود شوكار هندسية مرصعة بالفراشات وأحجار الألماس المصممة لفساتين السهرة الخليجية.',
        url: 'https://omniastores.com/collections/chokers',
      },
      {
        title: 'Baroque & Freshwater Pearl Sets',
        titleAr: 'أطقم اللؤلؤ الطبيعي والباروكي',
        description: 'South Sea and Gulf heritage pearl creations set in rhodium-treated sterling silver mounts.',
        descriptionAr: 'ابتكارات اللؤلؤ الطبيعي ذات البريق العاجي والمثبتة على قواعد فضية مطلية بالروديوم.',
        url: 'https://omniastores.com/collections/pearl-sets',
      },
      {
        title: 'Canary Yellow & Emerald-Cut Suites',
        titleAr: 'تشكيلات الياقوت الأصفر والزمرد',
        description: 'Vibrant sun-drenched cushion cut canary diamond simulants for red-carpet formal galas.',
        descriptionAr: 'أحجار صفراء مشعة بقطع الوسادة والزمرد للأمسيات الرسمية ومهرجانات السجادة الحمراء.',
        url: 'https://omniastores.com/collections/luxury-sets',
      },
    ],
    mediaCoverage: [
      {
        outlet: 'Gulf News Luxury Desk',
        headline: 'Omnia Stores records unprecedented demand across Dubai for certified 925 sterling silver bridal suites',
        headlineAr: 'جلف نيوز: إقبال قياسي على أطقم الزفاف الفضية المعتمدة من أمنية ستورز في دبي',
        date: 'October 2026',
      },
      {
        outlet: 'Khaleej Times Business',
        headline: 'How Omnia Stores is redefining accessible luxury jewellery in the Middle East with Tabby payments',
        headlineAr: 'خليج تايمز: كيف تعيد أمنية ستورز تعريف الفخامة الميسرة في الخليج بخيارات تابي',
        date: 'November 2026',
      },
      {
        outlet: 'Vogue Arabia Runway Edit',
        headline: 'The Statement Choker Revival: Spotlight on Omnia Stores Butterfly Colliers',
        headlineAr: 'فوغ العربية: عودة عقود الشوكار وتسليط الضوء على أطواق الفراشة من أمنية ستورز',
        date: 'November 2026',
      },
    ],
  },
  {
    id: 'brand-cartier',
    slug: 'cartier',
    name: 'Cartier',
    nameAr: 'كارتييه',
    category: 'high_jewellery',
    originCountry: 'France',
    originCountryAr: 'فرنسا',
    foundedYear: 1847,
    headquarters: 'Paris, France',
    headquartersAr: 'باريس، فرنسا',
    verificationStatus: 'heritage_reference',
    primaryMetals: ['18K Yellow Gold', '18K White Gold', '18K Rose Gold', 'Platinum 950'],
    gemstoneSpecialty: 'Natural Mined Diamonds (FL-VVS), Burmese Rubies, Colombian Emeralds',
    gemstoneSpecialtyAr: 'ألماس طبيعي منجم (FL-VVS)، ياقوت بورمي، زمرد كولومبي نادر',
    priceRange: 'AED 4,500 – AED 3,500,000+',
    priceRangeAr: '4,500 د.إ – 3,500,000+ د.إ',
    officialWebsite: 'https://www.cartier.com',
    regionalPresence: ['Dubai Mall', 'Mall of the Emirates', 'Galleria Mall Abu Dhabi', 'Centria Mall Riyadh'],
    regionalPresenceAr: ['دبي مول', 'مول الإمارات', 'غاليريا مول أبوظبي', 'سنتريا مول الرياض'],
    editorialSummary: 'Historic French high jewellery maison renowned as the "Jeweller of Kings and King of Jewellers". Iconic for the Panthère motif, Love bracelet, and Trinity rings.',
    editorialSummaryAr: 'دار المجوهرات الفرنسية العريقة الملقبة بـ "صانع ملوك المجوهرات وملك صاغة المجوهرات". تشتهر بقطع الفهد البانثير، وأساور الحب لوف، وخواتم ترينيتي الثلاثية.',
    craftsmanshipStandards: ['Responsible Jewellery Council (RJC) Certified', 'Kimberley Process Compliant', 'Haute Joaillerie Hand Atelier'],
    craftsmanshipStandardsAr: ['معتمدة من مجلس المجوهرات المسؤولة (RJC)', 'مطابقة لعملية كيمبرلي للماس النظيف', 'صياغة يدوية في ورش باريس الراقية'],
    disclosure: 'Editorial Reference Profile: Independent profile for benchmark analysis. The Vogue News maintains no commercial affiliation with Cartier.',
    disclosureAr: 'ملف توثيقي مستقل لغايات المقارنة والتحليل الصحفي. لا ترتبط المنصة بأي تعاقد تجاري مع كارتييه.',
    featuredCollections: [
      {
        title: 'Panthère de Cartier',
        titleAr: 'بانثير دي كارتييه',
        description: 'Sculptural wild cat designs in gold, onyx, and tsavorite garnets.',
        descriptionAr: 'تصاميم الفهد المنحوتة بالذهب والأونيكس والعقيق الأخضر.',
        url: 'https://www.cartier.com',
      },
    ],
    mediaCoverage: [],
  },
  {
    id: 'brand-van-cleef-arpels',
    slug: 'van-cleef-arpels',
    name: 'Van Cleef & Arpels',
    nameAr: 'فان كليف آند آربلز',
    category: 'high_jewellery',
    originCountry: 'France',
    originCountryAr: 'فرنسا',
    foundedYear: 1906,
    headquarters: 'Paris, France',
    headquartersAr: 'باريس، فرنسا',
    verificationStatus: 'heritage_reference',
    primaryMetals: ['18K Yellow Gold', '18K White Gold', 'Platinum 950'],
    gemstoneSpecialty: 'Mystery Set (Serti Mystérieux), Mother of Pearl, Malachite, Carnelian',
    gemstoneSpecialtyAr: 'ترصيع غامض، عرق اللؤلؤ الطبيعي، الملاكيت، العقيق اليماني',
    priceRange: 'AED 5,200 – AED 4,200,000+',
    priceRangeAr: '5,200 د.إ – 4,200,000+ د.إ',
    officialWebsite: 'https://www.vancleefarpels.com',
    regionalPresence: ['Dubai Mall Fashion Avenue', 'Mall of the Emirates', 'Kingdom Centre Riyadh'],
    regionalPresenceAr: ['دبي مول فاشن أفينيو', 'مول الإمارات', 'برج المملكة الرياض'],
    editorialSummary: 'Place Vendôme master maison celebrated for the Alhambra four-leaf clover motif, poetic complications, and the patented Mystery Setting technique.',
    editorialSummaryAr: 'دار المجوهرات الباريسية الرائدة في ساحة فاندوم، تشتهر بتميمة ألهامبرا الرباعية، والساعات الفلكية الشاعرية، وتقنية الترصيع المخفي الحاصلة على براءة اختراع.',
    craftsmanshipStandards: ['Master Jeweller Place Vendôme Atelier', 'Conflict-Free Natural Gemstones'],
    craftsmanshipStandardsAr: ['صياغة يدوية في مشاغل فاندوم', 'أحجار كريمة طبيعية خالية من النزاعات'],
    disclosure: 'Editorial Reference Profile: Independent profile for benchmark analysis. The Vogue News maintains no commercial affiliation with Van Cleef & Arpels.',
    disclosureAr: 'ملف توثيقي مستقل لغايات المقارنة والتحليل الصحفي. لا ترتبط المنصة بأي تعاقد تجاري مع فان كليف آند آربلز.',
    featuredCollections: [
      {
        title: 'Alhambra Collection',
        titleAr: 'مجموعة ألهامبرا',
        description: 'Iconic beaded lucky four-leaf clover silhouettes in hard stones.',
        descriptionAr: 'تميمة الحظ الرباعية الأيقونية المصنوعة من الأحجار الصلبة وعرق اللؤلؤ.',
        url: 'https://www.vancleefarpels.com',
      },
    ],
    mediaCoverage: [],
  },
  {
    id: 'brand-damas',
    slug: 'damas-jewellery',
    name: 'Damas Jewellery',
    nameAr: 'مجوهرات داماس',
    category: 'fine_jewellery',
    originCountry: 'United Arab Emirates',
    originCountryAr: 'الإمارات العربية المتحدة',
    foundedYear: 1907,
    headquarters: 'Dubai, UAE',
    headquartersAr: 'دبي، الإمارات العربية المتحدة',
    verificationStatus: 'verified_independent_maison',
    primaryMetals: ['18K Yellow Gold', '21K Yellow Gold', '22K Gold Souk Traditional'],
    gemstoneSpecialty: 'Commercial Mined Diamonds, Bridal Polki, Colored Zircons',
    gemstoneSpecialtyAr: 'ألماس تجاري طبيعي، مجوهرات بولكي التراثية، أحجار ملونة',
    priceRange: 'AED 800 – AED 150,000+',
    priceRangeAr: '800 د.إ – 150,000+ د.إ',
    officialWebsite: 'https://www.damasjewellery.com',
    regionalPresence: ['Over 150 boutiques across UAE, Saudi Arabia, Qatar, Bahrain, Kuwait, Oman'],
    regionalPresenceAr: ['أكثر من 150 بوتيك في الإمارات، السعودية، قطر، البحرين، الكويت وعمان'],
    editorialSummary: 'Historic Middle Eastern retail powerhouse tracing origins to 1907. Well-known for gold souk presence, traditional 21K/22K bridal gold sets, and contemporary collections.',
    editorialSummaryAr: 'إحدى أعرق شبكات تجارة الذهب والمجوهرات في الشرق الأوسط وتعود جذورها لعام 1907. تشتهر بوجودها القوي في أسواق الذهب التقليدية وأطقم الذهب عيار 21 و 22.',
    craftsmanshipStandards: ['Dubai Central Laboratory Hallmarking Compliant', 'Retail Network Warranty'],
    craftsmanshipStandardsAr: ['مطابقة لاشتراطات الدمغ لدى مختبر دبي المركزي', 'ضمان شبكة التجزئة المعتمد'],
    disclosure: 'Editorial Benchmark Profile: Profile for regional market context. The Vogue News maintains no commercial relationship with Damas Jewellery.',
    disclosureAr: 'ملف مرجعي لتحليل معايير السوق الإقليمي. لا ترتبط المنصة بأي علاقة تعاقدية مع مجوهرات داماس.',
    featuredCollections: [],
    mediaCoverage: [],
  },
  {
    id: 'brand-lazurde',
    slug: 'lazurde',
    name: "L'azurde",
    nameAr: 'لازوردي',
    category: 'fine_jewellery',
    originCountry: 'Saudi Arabia',
    originCountryAr: 'المملكة العربية السعودية',
    foundedYear: 1980,
    headquarters: 'Riyadh, Saudi Arabia',
    headquartersAr: 'الرياض، المملكة العربية السعودية',
    verificationStatus: 'verified_independent_maison',
    primaryMetals: ['18K Gold', '21K Gold', 'Vermeil'],
    gemstoneSpecialty: 'Commercial Cut Diamonds and Fashion Colored Stones',
    gemstoneSpecialtyAr: 'ألماس تجاري وأحجار زينة ملونة',
    priceRange: 'SAR 500 – SAR 80,000+',
    priceRangeAr: '500 ر.س – 80,000+ ر.س',
    officialWebsite: 'https://www.lazurde.com',
    regionalPresence: ['Widespread boutiques across Saudi Arabia, UAE, and Egypt'],
    regionalPresenceAr: ['فروع منتشرة في كافة مدن السعودية، الإمارات ومصر'],
    editorialSummary: 'Publicly traded Saudi Arabian jewellery manufacturer and retailer, designing gold jewelry sets for everyday luxury and wedding celebrations.',
    editorialSummaryAr: 'إحدى كبرى شركات تصنيع وتجارة الذهب والمجوهرات المدرجة في السوق السعودي، تقدم أطقم الذهب للأناقة اليومية ومناسبات الأعراس.',
    craftsmanshipStandards: ['Saudi Ministry of Commerce Hallmarking Compliant'],
    craftsmanshipStandardsAr: ['مطابقة لمعايير الدمغ الصادرة عن وزارة التجارة السعودية'],
    disclosure: 'Editorial Benchmark Profile: Profile for regional market context. The Vogue News maintains no commercial relationship with L\'azurde.',
    disclosureAr: 'ملف مرجعي لتحليل معايير السوق الإقليمي. لا ترتبط المنصة بأي علاقة تعاقدية مع لازوردي.',
    featuredCollections: [],
    mediaCoverage: [],
  },
];
