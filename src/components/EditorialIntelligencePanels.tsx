'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Newspaper,
  Mic,
  Calendar,
  FileText,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Scale,
  Sparkles,
  Award,
  CheckCircle2,
  BookOpen,
  MapPin,
  Clock,
  Calculator,
  Crown,
  ShoppingBag,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Gem,
} from 'lucide-react';
import { useLuxury } from './ThemeProvider';

type PanelTab = 'wire' | 'fashion' | 'collections' | 'blogs' | 'interviews' | 'events';
type BenchmarkItemKey = 'brooch' | 'bridal' | 'choker' | 'solitaire' | 'bracelet';
type OccasionKey = 'bridal' | 'gala' | 'heritage' | 'gift';
type BudgetKey = 'entry' | 'mid' | 'reserve';

const BENCHMARK_ITEMS: Record<
  BenchmarkItemKey,
  {
    labelEn: string;
    labelAr: string;
    omniaAed: number;
    soukAed: number;
    maisonAed: number;
    specEn: string;
    specAr: string;
  }
> = {
  brooch: {
    labelEn: 'Signature 925 Brooch Collection',
    labelAr: 'تشكيلة البروشات الملكية 925',
    omniaAed: 490,
    soukAed: 2800,
    maisonAed: 13500,
    specEn: 'Solid 925 Sterling Silver • Triple Italian Rhodium • Abaya & Blazer Precision Pin Clasp',
    specAr: 'فضة إسترلينية عيار 925 • طلاء روديوم ثلاثي • مشبك آمن للعباءات والبدلات الرسمية',
  },
  bridal: {
    labelEn: 'Royal Bridal Parure Suite',
    labelAr: 'طقم زفاف ملكي متكامل',
    omniaAed: 1450,
    soukAed: 7800,
    maisonAed: 28500,
    specEn: 'Solid 925 Sterling Silver • Triple Italian Rhodium • 5A Optical Simulated Diamonds (DCL Verified)',
    specAr: 'فضة إسترلينية خالصة عيار 925 • طلاء روديوم إيطالي ثلاثي • ألماس محاكى 5A (معتمد من DCL)',
  },
  choker: {
    labelEn: '4-Strand Pearl & Emerald Choker',
    labelAr: 'تشوكر اللؤلؤ والزمرد 4 خيوط',
    omniaAed: 1650,
    soukAed: 6400,
    maisonAed: 22000,
    specEn: 'Freshwater Baroque Pearls • Colombian-Tone Cabochon • Anti-Tarnish 925 Clasp',
    specAr: 'لؤلؤ مياه عذبة باروكي • كابوشون زمرد • قفل فضة 925 مقاوم للأكسدة',
  },
  solitaire: {
    labelEn: 'High-Carat Cushion Solitaire Ring',
    labelAr: 'خاتم سوليتير كوشن عالي القيراط',
    omniaAed: 590,
    soukAed: 3600,
    maisonAed: 14200,
    specEn: '58-Facet 5A Simulated Diamond (0.044 Dispersion) • Italian Micro-Prong Setting',
    specAr: 'أحجار 5A بـ 58 وجهاً وتشتت ضوئي 0.044 • ترصيع إيطالي دقيق بالمخالب',
  },
  bracelet: {
    labelEn: 'Pavé Tennis & Butterfly Bracelet',
    labelAr: 'سوار التنس والفراشة المرصع',
    omniaAed: 480,
    soukAed: 2950,
    maisonAed: 11800,
    specEn: 'Articulated 925 Silver Links • Sweat & Humidity Resistant Coastal Finish',
    specAr: 'حلقات فضة 925 مرنة • تشطيب مقاوم للرطوبة الساحلية والتعرق',
  },
};

const TRENDING_FASHION_LOOKS = [
  {
    id: 'look-pearl-flora',
    tagEn: 'TRENDING • COUTURE BRIDAL',
    tagAr: 'رائج • إطلالات العرائس',
    titleEn: 'Serpent Azure Sapphire & 925 Diamond Suite',
    titleAr: 'طقم الثعبان الملكي بالياقوت الأزرق والألماس',
    stylingEn: 'Pairs effortlessly with ivory double-breasted tailoring and evening silk bisht abayas.',
    stylingAr: 'يتناغم مع البدلات العاجية الراقية والعباءات الحريرية للمناسبات المسائية.',
    image: '/omnia-luxury/sapphire-serpent-blazer-suite.jpg',
    url: 'https://omniastores.com/collections/bridal-sets',
  },
  {
    id: 'look-canary-butterfly',
    tagEn: 'TRENDING • OPERA & MAJLIS',
    tagAr: 'رائج • سهرات الأوبرا والمجالس',
    titleEn: 'Nocturne Ribbon Bow 5A Diamond Collar',
    titleAr: 'طوق فيونكة الألماس نوكتورن عيار 925',
    stylingEn: 'Ideal centerpiece for sheer black opera gloves and sculpted neckline gowns.',
    stylingAr: 'قطعة مركزية مثالية لإطلالات الأزياء السوداء الكلاسيكية والأمسيات الفاخرة.',
    image: '/omnia-luxury/diamond-bow-collar-opera-gloves.jpg',
    url: 'https://omniastores.com/collections/chokers-collection',
  },
  {
    id: 'look-ruby-gala',
    tagEn: 'TRENDING • SOLITAIRE MACRO',
    tagAr: 'رائج • خواتم السوليتير',
    titleEn: 'Scarlet Oval Pigeon-Blood Ruby Cocktail Ring',
    titleAr: 'خاتم سوليتير الياقوت القرمزي البيضاوي',
    stylingEn: 'Commanding 8ct center silhouette set in triple Italian rhodium over 925 silver.',
    stylingAr: 'تصميم ملكي فريد مرصع بالياقوت القرمزي مع فضة 925 مطلية بالروديوم الثلاثي.',
    image: '/omnia-luxury/crimson-oval-ruby-ring-hand.jpg',
    url: 'https://omniastores.com/collections/rings',
  },
  {
    id: 'look-emerald-choker',
    tagEn: 'TRENDING • GALA CHOKER',
    tagAr: 'رائج • تشوكر السهرة',
    titleEn: 'Crimson Baguette Choker & Double-Hoop Set',
    titleAr: 'تشوكر الباجيت القرمزي وأقراط الهوب المزدوجة',
    stylingEn: 'Articulated emerald-cut ruby framing crafted for Dubai red-carpet receptions.',
    stylingAr: 'صياغة مفصلية بأحجار الباجيت الحمراء تلائم حفلات الاستقبال الكبرى في دبي.',
    image: '/omnia-luxury/ruby-emerald-cut-collar-gala.jpg',
    url: 'https://omniastores.com/collections/necklaces',
  },
  {
    id: 'look-geometric-south-sea',
    tagEn: 'TRENDING • NEW YEAR GALA',
    tagAr: 'رائج • حفلات رأس السنة',
    titleEn: 'Geometric Diamond Collar & South Sea Pearl',
    titleAr: 'طوق الألماس الهندسي ولؤلؤ البحار الجنوبية',
    stylingEn: 'Architectural neckline geometry crafted for minimalist satin column dresses.',
    stylingAr: 'تصميم هندسي معاصر يلائم فساتين الساتان الراقية وحفلات التخرج والزفاف.',
    image: '/campaigns/golden-lumiere.jpg',
    url: 'https://omniastores.com/collections/bridal-collection',
  },
  {
    id: 'look-pink-sapphire',
    tagEn: 'TRENDING • ROMANTIC GIFTING',
    tagAr: 'رائج • هدايا فاخرة',
    titleEn: 'Rose Princess Oval Pink Sapphire & Halo Suite',
    titleAr: 'طقم الياقوت الوردي الملكي وهالة الألماس',
    stylingEn: 'Soft rose fire accents pastel organza ensembles and daytime afternoon tea jewelry styling.',
    stylingAr: 'بريق وردي ناعم يكمل إطلالات الأورجانزا الهادئة واللقاءات النهارية الراقية.',
    image: '/campaigns/azure-pendant-edit.jpg',
    url: 'https://omniastores.com/collections/necklaces',
  },
];

const CURATED_COLLECTIONS = [
  {
    id: 'col-brooches',
    nameEn: 'Signature 925 Brooches',
    nameAr: 'تشكيلة البروشات الملكية',
    priceAed: 490,
    badge: 'NEW 1080P',
    image: '/banners/the-statement-jewellery-edit.jpg',
    descEn: 'Floral, butterfly & imperial crest pins engineered for silk scarves, abayas, and structured blazers.',
    descAr: 'دبابيس فاخرة من الفضة 925 مصممة للشيلات والعباءات والبدلات الرسمية.',
    url: 'https://omniastores.com/collections/brooches',
  },
  {
    id: 'col-bridal',
    nameEn: 'Royal Bridal Suites',
    nameAr: 'أطقم الزفاف الملكية',
    priceAed: 1450,
    badge: 'DCL 925',
    image: '/banners/bridal-elegance-guide.jpg',
    descEn: 'Complete collier necklaces, chandelier earrings & rings in solid 925 sterling silver.',
    descAr: 'أطقم عرائس كاملة من العقود والأقراط والخواتم بفضة إسترلينية عيار 925 معتمدة.',
    url: 'https://omniastores.com/collections/bridal-collection',
  },
  {
    id: 'col-chokers',
    nameEn: 'Imperial Pearl Chokers',
    nameAr: 'أطواق اللؤلؤ والزمرد',
    priceAed: 1650,
    badge: 'BESTSELLER',
    image: '/banners/pearl-revival.jpg',
    descEn: 'Multi-strand Gulf-inspired freshwater pearls anchored with emerald & sapphire clasps.',
    descAr: 'لؤلؤ طبيعي متعدد الخيوط مستوحى من التراث الخليجي مع أحجار الزمرد.',
    url: 'https://omniastores.com/collections/chokers-collection',
  },
  {
    id: 'col-emerald',
    nameEn: 'Emerald Grandeur Edit',
    nameAr: 'تشكيلة فخامة الزمرد',
    priceAed: 1180,
    badge: 'RUNWAY',
    image: '/banners/emerald-grandeur-suite.jpg',
    descEn: 'Deep forest-green precision stones set in anti-tarnish triple rhodium filigree.',
    descAr: 'أحجار زمرد عميقة البريق مرصعة في فضة مطلية بالروديوم الثلاثي.',
    url: 'https://omniastores.com/collections/necklaces',
  },
  {
    id: 'col-ruby',
    nameEn: 'Crimson Ruby Evenings',
    nameAr: 'أمسيات الياقوت القرمزي',
    priceAed: 950,
    badge: 'VIP PICK',
    image: '/banners/ruby-evenings.jpg',
    descEn: 'Regal crimson ruby suites delivering red-carpet fire for Arabian wedding evenings.',
    descAr: 'أطقم ياقوت قرمزي فاخرة لسهرات الأعراس والمناسبات الكبرى.',
    url: 'https://omniastores.com/collections/bridal-sets',
  },
  {
    id: 'col-sapphire',
    nameEn: 'Canary & Royal Sapphires',
    nameAr: 'الياقوت الكناري والملكي',
    priceAed: 890,
    badge: '5A OPTICAL',
    image: '/banners/sapphire-allure.jpg',
    descEn: 'High-dispersion cushion yellow and royal blue sapphire suites with Italian micro-prongs.',
    descAr: 'قطع كوشن بالياقوت الأصفر والملكي بترصيع إيطالي دقيق.',
    url: 'https://omniastores.com/collections/rings',
  },
];

const EDITORIAL_BLOGS = [
  {
    id: 'blog-dcl-925',
    categoryEn: 'METALLURGY & ASSAY',
    categoryAr: 'المعادن والفحص المخبري',
    readTime: '6 min read',
    date: 'Nov 2026',
    author: 'Dr. Amina Al-Mansoor, FGA',
    titleEn: 'Why Dubai Central Laboratory (DCL) 925 Hallmarking Is Transforming UAE Demi-Fine Trust',
    titleAr: 'لماذا تغير دمغة مختبر دبي المركزي (DCL 925) معايير الثقة في المجوهرات بالإمارات؟',
    summaryEn: 'An inside look at XRF non-destructive spectroscopy and how Omnia Stores sets the benchmark against unverified mall alloys.',
    summaryAr: 'نظرة معمقة على فحص الأشعة السينية XRF وكيف تضع أمنية ستورز معياراً يتفوق على السبائك غير الموثقة.',
    bodyEn: [
      'Across the United Arab Emirates, discerning collectors are moving away from unverified brass-core fashion accessories toward precious-metal-backed demi-fine jewellery. At the center of this transformation is Dubai Central Laboratory (DCL), whose X-Ray Fluorescence (XRF) spectroscopy verifies alloy composition down to 0.01% precision.',
      'Unlike plated copper or zinc costume jewelry that oxidizes in Gulf coastal humidity and frequently triggers skin irritation, genuine 925 sterling silver contains 92.5% pure silver. When fortified with Omnia Stores’ triple Italian rhodium electroplating (0.5µm+), the surface becomes chemically inert against perfume mist, perspiration, and sea air.',
      'For brides and VIP gift buyers, purchasing DCL-compliant collections directly from omniastores.com ensures transparent pricing, verified silver weight, and enduring luster at up to 85% lower capital outlay than traditional high-street showroom markups.',
    ],
    bodyAr: [
      'في دولة الإمارات ودول الخليج، يتجه المتسوقون بشكل متزايد نحو المجوهرات المصاغة من معادن ثمينة موثقة بدلاً من الإكسسوارات النحاسية المطلية التي تتأكسد سريعاً في المناخ الساحلي الرطب.',
      'يقوم مختبر دبي المركزي (DCL) بإجراء فحوصات طيفية دقيقة بالأشعة السينية (XRF) للتأكد من أن نسبة الفضة الإسترلينية تبلغ 92.5% بالكامل، مع خلو السبائك من النيكل والرصاص لحماية البشرة الحساسة.',
      'من خلال الجمع بين الفضة الخالصة عيار 925 وطلاء الروديوم الإيطالي الثلاثي عبر متجر أمنية ستورز (omniastores.com)، تحصل العرائس على لمعان يضاهي البلاتين والألماس مع توفير يصل إلى 85% وتوصيل خلال 24 ساعة.',
    ],
    ctaUrl: 'https://omniastores.com',
  },
  {
    id: 'blog-abaya-brooch',
    categoryEn: 'FASHION STYLING GUIDE',
    categoryAr: 'دليل تنسيق الأزياء',
    readTime: '5 min read',
    date: 'Nov 2026',
    author: 'Elena Vance, Senior Style Editor',
    titleEn: 'The Art of Pinning Luxury: Styling 925 Brooches with Couture Abayas & Winter Blazers',
    titleAr: 'فن تنسيق البروشات الفاخرة مع العباءات الراقية والمعاطف الشتوية',
    summaryEn: 'From lapel butterfly motifs to draped pearl-drop clasps, explore the 2026–2027 GCC brooch renaissance spotted in Dubai and Riyadh.',
    summaryAr: 'من تصاميم الفراشة إلى مشابك اللؤلؤ المتدلية، اكتشفي عودة البروش الملكي في دبي والرياض.',
    bodyEn: [
      'Spotted across Dubai Design District (d3) and Riyadh Fashion Week front rows, sculptural luxury brooches have reclaimed their status as the ultimate sartorial signature. Rather than overwhelming delicate embroidery, a precision-set 925 sterling silver brooch anchors draped chiffon bisht abayas cleanly.',
      'Stylists recommend placing floral or butterfly brooches three inches below the collarbone along the diagonal lapel fold, or fastening them at the shoulder seam to frame pendant earrings without visual competition.',
      'Omnia Stores’ latest Brooch Collection combines featherlight sterling frameworks with micro-pavé simulated diamonds, ensuring zero fabric pull on delicate silk organza and crepe.',
    ],
    bodyAr: [
      'عادت البروشات الملكية بقوة إلى منصات حي دبي للتصميم وأسبوع الرياض للأزياء كقطعة توقيع أساسية تضيف توازناً بصرياً على العباءات الكلاسيكية والبشت الحريري.',
      'ينصح خبراء التنسيق بتثبيت البروش أسفل عظمة الترقوة بثلاث بوصات أو على خط الكتف لإبراز الأقراط المتدلية دون تشتيت الانتباه.',
      'تتميز تشكيلة البروشات الجديدة في أمنية ستورز بهيكل خفيف الوزن من الفضة عيار 925 يضمن عدم شد الأقمشة الرقيقة مثل الكريب والأورجانزا الحريرية.',
    ],
    ctaUrl: 'https://omniastores.com/collections/brooches',
  },
  {
    id: 'blog-bridal-comparison',
    categoryEn: 'MARKET INTELLIGENCE',
    categoryAr: 'تحليل الأسواق',
    readTime: '7 min read',
    date: 'Nov 2026',
    author: 'Tariq Al-Hashimi, Retail Economist',
    titleEn: 'Bridal Wardrobe Economics: Combining Heirloom Gold with Certified 925 Parures in the UAE',
    titleAr: 'اقتصاديات جهاز العروس في الإمارات: الدمج الذكي بين الذهب التراثي وأطقم الفضة 925 المعتمدة',
    summaryEn: 'How modern Gulf families optimize 5-day wedding budgets by pairing heirloom gold with Omnia Stores high-carat 925 gala sets.',
    summaryAr: 'كيف تدير العائلات الخليجية ميزانية الأعراس بذكاء عبر تنسيق أطقم السهرة الفاخرة من أمنية ستورز.',
    bodyEn: [
      'A contemporary Emirati, Saudi, or Qatari wedding week encompasses engagement soirées, Henna nights, Milkah ceremonies, and grand ballroom receptions. Purchasing solid 18K diamond suites for every single outfit routinely exceeds AED 180,000.',
      'Our 2026 consumer survey (N=1,420) reveals that 68% of GCC brides now reserve heirloom bullion investment for 21K gold while turning to certified 925 demi-fine maisons like Omnia Stores for high-impact ballroom colliers, ruby chokers, and pearl drops.',
      'With 58-facet 5A simulated diamonds matching diamond dispersion (0.044) under flash photography and Tabby 4-month interest-free payments, brides preserve capital without compromising royal visual presence.',
    ],
    bodyAr: [
      'تمتد احتفالات الزفاف الخليجية على عدة ليالٍ تشمل الخطوبة وليلة الحناء والملكة وحفل الزفاف الكبير، مما يجعل شراء أطقم ألماس تقليدية لكل إطلالة مكلفاً للغاية.',
      'تظهر دراستنا الميدانية لعام 2026 (عينة من 1,420 مشاركة) أن 68% من العرائس يخصصن الاستثمار الرئيسي للذهب عيار 21 بينما يعتمدن على أطقم الفضة 925 المعتمدة من أمنية ستورز لإطلالات السهرة المتنوعة.',
      'بفضل التشتت الضوئي الدقيق (0.044) وتقسيط تابي على 4 دفعات بدون فوائد، تحقق العروس حضوراً ملكياً أمام كاميرات الزفاف مع توفير كبير في الميزانية.',
    ],
    ctaUrl: 'https://omniastores.com/collections/bridal-collection',
  },
  {
    id: 'blog-pearl-care',
    categoryEn: 'GEMOLOGY & CARE',
    categoryAr: 'الأحجار الكريمة والعناية',
    readTime: '4 min read',
    date: 'Nov 2026',
    author: 'Dr. Amina Al-Mansoor, FGA',
    titleEn: 'Preserving Arabian Pearl Luster & Triple-Rhodium Brilliance in Coastal Humidity',
    titleAr: 'دليل الحفاظ على بريق اللؤلؤ العربي وطلاء الروديوم في مناخ الخليج الرطب',
    summaryEn: 'Four laboratory-backed care protocols to keep freshwater baroque pearls and 925 silver clasps radiant for decades.',
    summaryAr: 'أربع قواعد علمية مخبرية للحفاظ على إشراقة اللؤلؤ والفضة 925 لعقود طويلة.',
    bodyEn: [
      'Freshwater baroque pearls possess organic calcium carbonate nacre layers that respond gracefully to regular wear but require simple protection against alcohol-based oud perfumes and hairspray.',
      'Always apply fragrance 10 minutes prior to clasping your multi-strand pearl choker. After an evening gala, wipe silver clasps and 5A pavé stones gently with a dry microfiber polishing cloth before storing inside your satin-lined velvet vault box.',
      'Never soak pearl strands in ultrasonic jewelry cleaners or acidic silver dips; warm distilled water and a soft dry chamois remain the FGA-recommended gold standard.',
    ],
    bodyAr: [
      'يتميز اللؤلؤ الباروكي بطبقات عرق اللؤلؤ العضوية الحساسة تجاه الكحوليات والعود المركز ومثبتات الشعر.',
      'يُوصى دائماً بوضع العطر قبل ارتداء طوق اللؤلؤ بـ 10 دقائق، ثم مسح المشابك الفضية والأحجار بقطعة قماش ميكروفايبر جافة قبل حفظها في العلبة المخملية المبطنة.',
      'تجنبي استخدام المنظفات الكيميائية القوية أو أجهزة الموجات فوق الصوتية مع خيوط اللؤلؤ الطبيعي لضمان ديمومة بريقها.',
    ],
    ctaUrl: 'https://omniastores.com/collections/chokers-collection',
  },
];

const RECOMMENDER_MAP: Record<
  OccasionKey,
  Record<
    BudgetKey,
    {
      titleEn: string;
      titleAr: string;
      metalEn: string;
      metalAr: string;
      priceRange: string;
      url: string;
    }
  >
> = {
  bridal: {
    entry: {
      titleEn: 'Pavé Butterfly & Teardrop Bridal Pendant Set',
      titleAr: 'طقم قلادة الفراشة والقطرة الماسية',
      metalEn: 'Solid 925 Silver + Triple Rhodium',
      metalAr: 'فضة 925 + طلاء روديوم ثلاثي',
      priceRange: 'AED 450 – 690',
      url: 'https://omniastores.com/collections/bridal-sets',
    },
    mid: {
      titleEn: 'The Royal Empress Baroque Pearl & Flora Suite',
      titleAr: 'طقم إمبراطورة اللؤلؤ الباروكي والفلورا',
      metalEn: '925 Silver + 5A Optical Simulated Diamonds',
      metalAr: 'فضة 925 + أحجار محاكاة الألماس 5A',
      priceRange: 'AED 890 – 1,450',
      url: 'https://omniastores.com/collections/bridal-collection',
    },
    reserve: {
      titleEn: 'Dual Royal Bridal Parure & South Sea Geometric Collar',
      titleAr: 'الطقم الملكي المزدوج وطوق لؤلؤ البحار الجنوبية',
      metalEn: 'DCL Certified Heavy 925 Atelier Casting',
      metalAr: 'صياغة فضة 925 ثقيلة معتمدة من DCL',
      priceRange: 'AED 1,650 – 1,950',
      url: 'https://omniastores.com/collections/bridal-collection',
    },
  },
  gala: {
    entry: {
      titleEn: 'Signature 925 Sculptural Brooch & Abaya Pin',
      titleAr: 'بروش أمنية الملكي للعباءات والسهرات',
      metalEn: 'Solid 925 Silver + Micro-Pavé 5A',
      metalAr: 'فضة 925 خالصة + ترصيع بافيه',
      priceRange: 'AED 450 – 650',
      url: 'https://omniastores.com/collections/brooches',
    },
    mid: {
      titleEn: 'Pigeon-Blood Crimson Ruby Floral Gala Collar',
      titleAr: 'عقد زهرة الياقوت القرمزي الملكي',
      metalEn: '925 Silver + Lab-Crafted Ruby & 5A Halo',
      metalAr: 'فضة 925 + ياقوت قرمزي وهالة ألماس',
      priceRange: 'AED 920 – 1,350',
      url: 'https://omniastores.com/collections/necklaces',
    },
    reserve: {
      titleEn: 'Imperial 4-Strand Pearl & Emerald Cabochon Choker',
      titleAr: 'تشوكر اللؤلؤ الإمبراطوري والزمرد 4 خيوط',
      metalEn: 'Freshwater Pearls + Triple Rhodium 925',
      metalAr: 'لؤلؤ طبيعي + فضة 925 مطلية بالروديوم',
      priceRange: 'AED 1,550 – 1,850',
      url: 'https://omniastores.com/collections/chokers-collection',
    },
  },
  heritage: {
    entry: {
      titleEn: 'Arabesque Pearl & Crescent Heritage Brooch',
      titleAr: 'بروش التراث العربي باللؤلؤ',
      metalEn: '925 Silver + 18K PVD Gold Accent',
      metalAr: 'فضة 925 + لمسات ذهب PVD عيار 18',
      priceRange: 'AED 480 – 680',
      url: 'https://omniastores.com/collections/brooches',
    },
    mid: {
      titleEn: 'Canary Yellow Butterfly Majlis Collection',
      titleAr: 'تشكيلة الفراشة الكناري للمجالس',
      metalEn: 'Solid 925 Silver + Canary Radiance Cut',
      metalAr: 'فضة 925 + قطع كناري مشع',
      priceRange: 'AED 850 – 1,250',
      url: 'https://omniastores.com/collections/necklaces',
    },
    reserve: {
      titleEn: 'National Day Emirates Green Emerald & Pearl Suite',
      titleAr: 'طقم روح الاتحاد بالزمرد واللؤلؤ',
      metalEn: '4-Strand Freshwater Pearl + DCL 925 Clasp',
      metalAr: 'لؤلؤ 4 خيوط + قفل فضة 925 معتمد',
      priceRange: 'AED 1,650+',
      url: 'https://omniastores.com/collections/chokers-collection',
    },
  },
  gift: {
    entry: {
      titleEn: 'High-Carat Cushion Solitaire Ring or Tennis Bracelet',
      titleAr: 'خاتم سوليتير كوشن أو سوار التنس الماسي',
      metalEn: 'Hypoallergenic Nickel-Free 925 Silver',
      metalAr: 'فضة 925 خالية من النيكل ومضادة للحساسية',
      priceRange: 'AED 480 – 650',
      url: 'https://omniastores.com/collections/rings',
    },
    mid: {
      titleEn: 'Rose Princess Pink Sapphire & Halo Pendant Box',
      titleAr: 'طقم قلادة الياقوت الوردي مع صندوق الهدايا',
      metalEn: '925 Silver + Satin Champagne Vault Box',
      metalAr: 'فضة 925 + علبة هدايا شامبين فاخرة',
      priceRange: 'AED 850 – 1,190',
      url: 'https://omniastores.com/collections/necklaces',
    },
    reserve: {
      titleEn: 'Complete Bespoke Velvet Gala Collector Set',
      titleAr: 'صندوق الهدايا الملكي الكامل لكبار الشخصيات',
      metalEn: 'Matched Necklace, Earrings, Ring & Bracelet',
      metalAr: 'طقم متكامل (عقد + أقراط + خاتم + سوار)',
      priceRange: 'AED 1,500 – 2,200',
      url: 'https://omniastores.com/collections/bridal-sets',
    },
  },
};

export function EditorialIntelligencePanels() {
  const { language, currency } = useLuxury();
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState<PanelTab>('wire');
  const [selectedItem, setSelectedItem] = useState<BenchmarkItemKey>('brooch');
  const [expandedBlogId, setExpandedBlogId] = useState<string>(EDITORIAL_BLOGS[0].id);
  const [occasion, setOccasion] = useState<OccasionKey>('bridal');
  const [budget, setBudget] = useState<BudgetKey>('mid');

  const item = BENCHMARK_ITEMS[selectedItem];
  const mult = currency === 'SAR' ? 1.02 : 1;
  const currLabel = currency === 'SAR' ? (isAr ? 'ر.س' : 'SAR') : (isAr ? 'د.إ' : 'AED');
  const formatAmt = (aed: number) => `${Math.round(aed * mult).toLocaleString()} ${currLabel}`;
  const savingsPct = Math.round(((item.soukAed - item.omniaAed) / item.soukAed) * 100);
  const rec = RECOMMENDER_MAP[occasion][budget];

  return (
    <section className="my-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-300 dark:border-gold/30 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-[#8B6508] dark:text-gold text-xs font-bold uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>{isAr ? 'مركز الأخبار والمدونات والموضة والتشكيلات' : 'Live Editorial Wire, Trending Couture, Collections & Blogs'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-neutral-950 dark:text-white tracking-tight">
            {isAr ? 'الأخبار العاجلة، الموضة، التشكيلات والمدونات المتخصصة' : 'GCC Newsroom, Trending Fashion, Omnia Collections & Blogs'}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-serif mt-1">
            {isAr
              ? 'استكشف أحدث أخبار المجوهرات بالخليج، وإطلالات الموضة الرائجة، وتشكيلات أمنية ستورز، والمدونات التحليلية المعمقة وحاسبة الأسعار.'
              : 'Browse 8 breaking GCC industry dispatches, runway fashion pairings, flagship Omnia Stores collections, full-text editorial blogs, and interactive styling tools.'}
          </p>
        </div>

        <Link
          href="/fashion-intelligence"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 dark:bg-gold text-white dark:text-black text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all shrink-0 self-start md:self-auto"
        >
          <span>{isAr ? 'مركز التحليلات الكامل' : 'Open Full Intelligence Hub'}</span>
          <ArrowRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
        </Link>
      </div>

      {/* 1. LIVE MULTI-TAB GCC INTELLIGENCE, FASHION, COLLECTIONS & BLOGS HUB */}
      <div className="rounded-3xl bg-white dark:bg-[#0E121B] border border-neutral-200 dark:border-gold/25 shadow-lg overflow-hidden">
        {/* Interactive Tabs Bar */}
        <div className="flex flex-wrap items-center gap-2 p-3 sm:p-4 bg-[#F7F4EE] dark:bg-[#090C14] border-b border-neutral-200 dark:border-gold/20">
          {[
            { id: 'wire' as PanelTab, labelEn: 'Breaking News (8)', labelAr: 'أخبار عاجلة (8)', icon: Newspaper },
            { id: 'fashion' as PanelTab, labelEn: 'Trending Fashion (6)', labelAr: 'صيحات الموضة (6)', icon: TrendingUp },
            { id: 'collections' as PanelTab, labelEn: 'Omnia Collections (6)', labelAr: 'تشكيلات أمنية (6)', icon: ShoppingBag },
            { id: 'blogs' as PanelTab, labelEn: 'Editorial Blogs (4)', labelAr: 'مدونات متخصصة (4)', icon: BookOpen },
            { id: 'interviews' as PanelTab, labelEn: 'Expert Interviews', labelAr: 'حوارات الخبراء', icon: Mic },
            { id: 'events' as PanelTab, labelEn: 'Events & Reports', labelAr: 'الفعاليات والأبحاث', icon: Calendar },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-[#D4AF37] via-[#DFBF58] to-[#AA8C2C] text-black shadow-md'
                    : 'bg-white dark:bg-white/[0.04] text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.08] border border-neutral-200 dark:border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{isAr ? tab.labelAr : tab.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-5 sm:p-6">
          {/* TAB 1: BREAKING NEWS WIRE (8 DISPATCHES) */}
          {activeTab === 'wire' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  city: isAr ? 'دبي • الإمارات' : 'DUBAI • UAE',
                  time: isAr ? 'منذ 18 دقيقة' : '18 mins ago',
                  titleEn: 'DCL Tightens XRF Hallmark Audits for 925 Bridal Imports',
                  titleAr: 'مختبر دبي يشدد فحوصات الأشعة السينية لمجوهرات 925',
                  summaryEn: 'Omnia Stores maintains 100% fineness compliance under updated 2026–2027 precious metal directives.',
                  summaryAr: 'أمنية ستورز تحقق نسبة مطابقة 100% وفق معايير النقاء المحدثة.',
                  href: '/newsroom',
                },
                {
                  city: isAr ? 'الرياض • السعودية' : 'RIYADH • KSA',
                  time: isAr ? 'منذ ساعة' : '1 hour ago',
                  titleEn: 'Saudi 925 Demi-Fine Adoption Surges 42% Ahead of Winter Galas',
                  titleAr: 'ارتفاع الإقبال على الفضة 925 بالرياض بنسبة 42%',
                  summaryEn: 'Collectors increasingly pair rhodium-plated 925 chokers and brooches with structured couture abayas.',
                  summaryAr: 'إقبال متزايد على تنسيق أطواق الفضة والبروشات مع العباءات.',
                  href: '/fashion-intelligence',
                },
                {
                  city: isAr ? 'الدوحة • قطر' : 'DOHA • QATAR',
                  time: isAr ? 'منذ 3 ساعات' : '3 hours ago',
                  titleEn: 'Baroque Freshwater Pearls & Emerald Cabochons Lead Autumn Styling',
                  titleAr: 'اللؤلؤ الباروكي وكابوشون الزمرد يتصدران اختيارات الدوحة',
                  summaryEn: 'Runway editors spotlight 4-strand pearl chokers and yellow sapphire cushion cuts.',
                  summaryAr: 'خبراء التنسيق يرشحون أطواق اللؤلؤ والياقوت الأصفر الكناري.',
                  href: '/fashion-intelligence',
                },
                {
                  city: isAr ? 'المنامة • البحرين' : 'MANAMA • BAHRAIN',
                  time: isAr ? 'اليوم' : 'Today',
                  titleEn: 'Gulf Humidity Study: Triple Italian Rhodium Prevents Tarnish',
                  titleAr: 'دراسة الرطوبة: الروديوم الإيطالي الثلاثي يمنع الأكسدة',
                  summaryEn: 'Laboratory testing confirms 3-layer rhodium resists coastal sulfur oxidation.',
                  summaryAr: 'الاختبارات تؤكد صمود الطلاء الثلاثي في الأجواء الخليجية الرطبة.',
                  href: '/jewellery-knowledge',
                },
                {
                  city: isAr ? 'أبوظبي • الإمارات' : 'ABU DHABI • UAE',
                  time: isAr ? 'اليوم' : 'Today',
                  titleEn: 'Emirates Palace Bridal Exhibitions Spotlight High-Carat 925 Suites',
                  titleAr: 'معارض الزفاف بأبوظبي تبرز أطقم الفضة عيار 925 عالية البريق',
                  summaryEn: 'Hospitality & wedding planners recommend DCL-certified suites for multi-day ceremonies.',
                  summaryAr: 'منظمو الأعراس يوصون بالأطقم المعتمدة لحفلات الزفاف متعددة الأيام.',
                  href: '/brands/omnia-stores',
                },
                {
                  city: isAr ? 'مدينة الكويت' : 'KUWAIT CITY',
                  time: isAr ? 'منذ 5 ساعات' : '5 hours ago',
                  titleEn: 'Sculptural Brooch Renaissance Sweeps Kuwait Winter Couture Shows',
                  titleAr: 'عودة قوية للبروشات الملكية في عروض أزياء الكويت الشتوية',
                  summaryEn: 'Butterfly and floral silver pins dominate formal bisht and silk shawl styling.',
                  summaryAr: 'دبابيس الفراشة والزهور الفضية تتصدر تنسيقات البشت والحرير.',
                  href: '/fashion-intelligence',
                },
                {
                  city: isAr ? 'جدة • السعودية' : 'JEDDAH • KSA',
                  time: isAr ? 'أمس' : 'Yesterday',
                  titleEn: 'Tabby 4-Split Checkout Boosts Direct Luxury Gifting by 42.8%',
                  titleAr: 'تقسيط تابي على 4 دفعات يرفع هدايا المجوهرات بنسبة 42.8%',
                  summaryEn: 'Direct-to-collector checkout removes traditional retail showroom overhead.',
                  summaryAr: 'الشراء المباشر من المنصات الرقمية يلغي هوامش المعارض التقليدية.',
                  href: '/research-reports',
                },
                {
                  city: isAr ? 'مسقط • عمان' : 'MUSCAT • OMAN',
                  time: isAr ? 'أمس' : 'Yesterday',
                  titleEn: 'Regional Heritage Motif Silverwork Gains Demand Across Oman',
                  titleAr: 'نمو الطلب على صياغة الفضة المستوحاة من التراث في مسقط',
                  summaryEn: 'Collectors favor solid sterling silver craftsmanship backed by 24h express delivery.',
                  summaryAr: 'تفضيل متزايد للحرفية المتقنة مع التوصيل السريع عبر الخليج.',
                  href: '/newsroom',
                },
              ].map((news, idx) => (
                <Link
                  key={idx}
                  href={news.href}
                  className="group p-4 rounded-2xl border border-neutral-200 dark:border-white/10 hover:border-gold/60 bg-neutral-50/70 dark:bg-white/[0.02] transition-all flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-[9px] font-mono mb-2">
                      <span className="px-2 py-0.5 rounded bg-gold/15 text-[#8B6508] dark:text-gold font-bold">
                        {news.city}
                      </span>
                      <span className="text-neutral-500 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {news.time}
                      </span>
                    </div>
                    <h3 className="text-sm font-serif font-bold text-neutral-950 dark:text-white group-hover:text-[#8B6508] dark:group-hover:text-gold transition-colors leading-snug">
                      {isAr ? news.titleAr : news.titleEn}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1.5 leading-relaxed">
                      {isAr ? news.summaryAr : news.summaryEn}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-[#8B6508] dark:text-gold flex items-center gap-1 uppercase tracking-wider">
                    <span>{isAr ? 'قراءة المزيد' : 'Full Dispatch'}</span>
                    <ArrowRight className={`w-3 h-3 ${isAr ? 'rotate-180' : ''}`} />
                  </span>
                </Link>
              ))}
            </div>
          )}

          {/* TAB 2: TRENDING FASHION & COUTURE (6 LOOKS) */}
          {activeTab === 'fashion' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {TRENDING_FASHION_LOOKS.map((look) => (
                <div
                  key={look.id}
                  className="group rounded-2xl overflow-hidden border border-neutral-200 dark:border-gold/25 bg-neutral-50 dark:bg-black/40 flex flex-col justify-between shadow-sm hover:border-gold transition-all"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                    <Image
                      src={look.image}
                      alt={isAr ? look.titleAr : look.titleEn}
                      fill
                      unoptimized
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/80 border border-gold/40 text-gold text-[9px] font-mono font-bold">
                      {isAr ? look.tagAr : look.tagEn}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-1 gap-3">
                    <div>
                      <h3 className="text-base font-serif font-bold text-neutral-950 dark:text-white leading-snug">
                        {isAr ? look.titleAr : look.titleEn}
                      </h3>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1.5 leading-relaxed">
                        {isAr ? look.stylingAr : look.stylingEn}
                      </p>
                    </div>
                    <a
                      href={look.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between px-3.5 py-2 rounded-xl bg-gold/15 hover:bg-gold text-[#8B6508] dark:text-gold hover:text-black font-bold text-xs uppercase tracking-wider transition-all"
                    >
                      <span>{isAr ? 'تسوق الإطلالة' : 'Shop the Look'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: OMNIA COLLECTIONS SHOWCASE (6 CURATED FLAGSHIPS) */}
          {activeTab === 'collections' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CURATED_COLLECTIONS.map((col) => (
                <div
                  key={col.id}
                  className="group rounded-2xl overflow-hidden border border-neutral-200 dark:border-gold/30 bg-neutral-50 dark:bg-black/50 flex flex-col justify-between shadow-md hover:border-gold transition-all"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                    <Image
                      src={col.image}
                      alt={isAr ? col.nameAr : col.nameEn}
                      fill
                      unoptimized
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-gold text-black text-[9px] font-mono font-extrabold">
                      {col.badge}
                    </span>
                    <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/85 border border-gold/40 text-gold text-xs font-mono font-bold">
                      {isAr ? `من ${formatAmt(col.priceAed)}` : `From ${formatAmt(col.priceAed)}`}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-1 gap-3">
                    <div>
                      <h3 className="text-base font-serif font-bold text-neutral-950 dark:text-white">
                        {isAr ? col.nameAr : col.nameEn}
                      </h3>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                        {isAr ? col.descAr : col.descEn}
                      </p>
                    </div>
                    <a
                      href={col.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#DFBF58] to-[#AA8C2C] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:opacity-95 transition-opacity shadow"
                    >
                      <span>{isAr ? 'تسوق من omniastores.com' : 'Shop on omniastores.com'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: FULL-TEXT EDITORIAL BLOGS & DEEP READS (4 EXPANDABLE BLOG ARTICLES) */}
          {activeTab === 'blogs' && (
            <div className="space-y-4">
              {EDITORIAL_BLOGS.map((blog) => {
                const isExpanded = expandedBlogId === blog.id;
                return (
                  <article
                    key={blog.id}
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      isExpanded
                        ? 'border-gold bg-[#FAF7F2] dark:bg-black/60 shadow-lg'
                        : 'border-neutral-200 dark:border-white/10 bg-neutral-50/70 dark:bg-white/[0.02] hover:border-gold/50'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedBlogId(isExpanded ? '' : blog.id)}
                      className="w-full p-5 text-left rtl:text-right flex items-start justify-between gap-4 cursor-pointer"
                    >
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
                          <span className="px-2 py-0.5 rounded bg-gold/20 text-[#8B6508] dark:text-gold font-bold">
                            {isAr ? blog.categoryAr : blog.categoryEn}
                          </span>
                          <span className="text-neutral-500">• {blog.author}</span>
                          <span className="text-neutral-500">• {blog.readTime}</span>
                        </div>
                        <h3 className="text-base sm:text-xl font-serif font-bold text-neutral-950 dark:text-white leading-snug">
                          {isAr ? blog.titleAr : blog.titleEn}
                        </h3>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                          {isAr ? blog.summaryAr : blog.summaryEn}
                        </p>
                      </div>
                      <span className="p-2 rounded-full bg-gold/15 text-[#8B6508] dark:text-gold shrink-0 mt-1">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </span>
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-5 pt-2 border-t border-neutral-200 dark:border-gold/20 space-y-3">
                        {(isAr ? blog.bodyAr : blog.bodyEn).map((para, i) => (
                          <p key={i} className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 font-serif leading-relaxed">
                            {para}
                          </p>
                        ))}
                        <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 dark:border-white/10">
                          <span className="text-[10px] font-mono text-[#8B6508] dark:text-gold">
                            {isAr ? 'توثيق تحريري معتمد • ذا فوغ نيوز' : 'Verified Editorial Feature • The Vogue News'}
                          </span>
                          <a
                            href={blog.ctaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-xl bg-gold text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:scale-105 transition-transform"
                          >
                            <span>{isAr ? 'استكشف التشكيلة المذكورة' : 'Shop Featured Collection'}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}

          {/* TAB 5: EXPERT INTERVIEWS (3 ACCREDITED PROFILES) */}
          {activeTab === 'interviews' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  name: isAr ? 'د. أمينة المنصور (FGA)' : 'Dr. Amina Al-Mansoor, FGA',
                  role: isAr ? 'خبيرة الأحجار الكريمة المعتمدة ومستشارة الفحص المخبري' : 'Fellow of the Gemmological Association & Assay Advisor',
                  quoteEn: '“Optical 58-facet 5A diamond simulants set in DCL-hallmarked 925 silver deliver identical fire dispersion (0.044) to mined stones at a fraction of the capital outlay.”',
                  quoteAr: '«أحجار محاكاة الألماس فئة 5A بـ 58 وجهاً والمرصعة في فضة 925 معتمدة من مختبر دبي تمنح تشتتاً ضوئياً مطابقاً للألماس الطبيعي بتكلفة معقولة.»',
                },
                {
                  name: isAr ? 'طارق الهاشمي' : 'Tariq Al-Hashimi',
                  role: isAr ? 'خبير اقتصاديات التجزئة الفاخرة في دول الخليج' : 'GCC Luxury Retail Economist & Market Analyst',
                  quoteEn: '“Direct-to-collector maisons like Omnia Stores are reshaping GCC bridal gifting by eliminating 300% traditional souk retail markups while keeping 24-hour courier delivery.”',
                  quoteAr: '«الدور المباشرة مثل أمنية ستورز تعيد تشكيل سوق هدايا الزفاف في الخليج عبر إلغاء هوامش التجزئة التقليدية وتوفير توصيل خلال 24 ساعة.»',
                },
                {
                  name: isAr ? 'إيلينا فانس' : 'Elena Vance',
                  role: isAr ? 'رئيسة تحرير الموضة والأزياء في الخليج' : 'Senior GCC Couture & Runway Styling Curator',
                  quoteEn: '“Structural silk abayas and formal evening silhouettes in Dubai and Riyadh demand sculptural 925 chokers and brooches with balanced light reflection.”',
                  quoteAr: '«العباءات الحريرية الرسمية وفساتين السهرة في دبي والرياض تتطلب أطواقاً وبروشات فضية 925 مصقولة بدقة لتوزيع الضوء بشكل متوازن.»',
                },
              ].map((person, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-neutral-200 dark:border-gold/20 bg-neutral-50/70 dark:bg-white/[0.02] flex flex-col justify-between gap-4"
                >
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#8B6508] dark:text-gold font-bold">
                      {person.role}
                    </span>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-neutral-950 dark:text-white mt-1">
                      {person.name}
                    </h3>
                    <p className="text-xs italic text-neutral-700 dark:text-neutral-300 mt-3 leading-relaxed">
                      {isAr ? person.quoteAr : person.quoteEn}
                    </p>
                  </div>
                  <Link
                    href="/interviews"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B6508] dark:text-gold hover:underline uppercase tracking-wider"
                  >
                    <span>{isAr ? 'استعراض الحوار الكامل' : 'Read Full Interview'}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* TAB 6: EVENTS & RESEARCH WHITEPAPERS */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { titleEn: 'Dubai Fashion Week', titleAr: 'أسبوع دبي للموضة', cityEn: 'd3, Dubai UAE', cityAr: 'حي دبي للتصميم', date: 'Feb 2027' },
                  { titleEn: 'DJWE Doha Jewellery', titleAr: 'معرض الدوحة للمجوهرات', cityEn: 'DECC, Doha Qatar', cityAr: 'مركز الدوحة للمعارض', date: 'Feb 2027' },
                  { titleEn: 'Riyadh Fashion Week', titleAr: 'أسبوع الرياض للأزياء', cityEn: 'KAFD, Riyadh KSA', cityAr: 'كافد، الرياض', date: 'Oct 2027' },
                  { titleEn: 'Jewellery Arabia', titleAr: 'معرض الجواهر العربية', cityEn: 'Exhibition World, Bahrain', cityAr: 'البحرين', date: 'Nov 2026' },
                ].map((ev, idx) => (
                  <Link
                    key={idx}
                    href="/event-calendar"
                    className="p-4 rounded-2xl border border-neutral-200 dark:border-white/10 hover:border-gold/60 bg-neutral-50/70 dark:bg-white/[0.02] transition-all flex flex-col justify-between gap-2"
                  >
                    <div>
                      <span className="px-2 py-0.5 rounded bg-gold/15 text-[#8B6508] dark:text-gold text-[10px] font-mono font-bold">
                        {ev.date}
                      </span>
                      <h4 className="text-sm font-serif font-bold text-neutral-950 dark:text-white mt-2">
                        {isAr ? ev.titleAr : ev.titleEn}
                      </h4>
                      <p className="text-xs text-neutral-500 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-gold" />
                        <span>{isAr ? ev.cityAr : ev.cityEn}</span>
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-[#8B6508] dark:text-gold uppercase tracking-wider mt-1">
                      {isAr ? 'الجدول والتغطية ←' : 'Schedule & Brief →'}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-neutral-200 dark:border-white/10">
                {[
                  {
                    tag: 'N=1,420 RESPONDENTS',
                    titleEn: '2026 GCC Demi-Fine & 925 Bridal Adoption Report',
                    titleAr: 'تقرير تبني المجوهرات الفضية عيار 925 في الخليج 2026',
                    statEn: '68% of UAE & KSA brides pair 925 suites for multi-day ceremonies.',
                    statAr: '68% من العرائس في الإمارات والسعودية يعتمدن أطقم الفضة 925.',
                  },
                  {
                    tag: 'DCL XRF LAB AUDIT',
                    titleEn: 'Metallurgical Assay & Rhodium Longevity Benchmark',
                    titleAr: 'دراسة الفحص المخبري وعمر طلاء الروديوم الثلاثي',
                    statEn: '3-micron Italian rhodium retains 98.4% specular lustre after 500 cycles.',
                    statAr: 'يحافظ الروديوم الإيطالي بسمك 3 ميكرون على 98.4% من بريقه.',
                  },
                  {
                    tag: 'RETAIL PRICING STUDY',
                    titleEn: 'Dubai Gold Souk vs Direct-to-Collector Price Parity',
                    titleAr: 'مقارنة أسعار سوق الذهب التقليدي مع البيع المباشر',
                    statEn: 'Direct atelier sourcing cuts bridal suite acquisition costs by 78%–85%.',
                    statAr: 'الشراء المباشر يخفض تكلفة أطقم الزفاف بنسبة 78% إلى 85%.',
                  },
                ].map((rep, idx) => (
                  <Link
                    key={idx}
                    href="/research-reports"
                    className="p-4 rounded-2xl border border-neutral-200 dark:border-white/10 hover:border-gold/60 bg-neutral-50/70 dark:bg-white/[0.02] transition-all flex flex-col justify-between gap-2"
                  >
                    <div>
                      <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
                        {rep.tag}
                      </span>
                      <h4 className="text-sm font-serif font-bold text-neutral-950 dark:text-white mt-2 leading-snug">
                        {isAr ? rep.titleAr : rep.titleEn}
                      </h4>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1.5 leading-relaxed">
                        {isAr ? rep.statAr : rep.statEn}
                      </p>
                    </div>
                    <span className="text-[11px] font-bold text-[#8B6508] dark:text-gold uppercase tracking-wider mt-1">
                      {isAr ? 'تحميل ملف الدراسة ←' : 'Download Dossier →'}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. INTERACTIVE OCCASION & BUDGET STYLING RECOMMENDER */}
      <div className="rounded-3xl bg-[#FAF7F2] dark:bg-[#0D111C] border border-gold/35 p-5 sm:p-8 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-4 flex-1">
            <div className="inline-flex items-center gap-2 text-[#8B6508] dark:text-gold text-[11px] font-mono uppercase tracking-widest font-bold">
              <Gem className="w-3.5 h-3.5" />
              <span>{isAr ? 'مستشار التنسيق والهدايا الذكي' : 'Interactive Omnia Stores Styling & Gift Concierge'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-black text-neutral-950 dark:text-white">
              {isAr ? 'اختر المناسبة والميزانية لاقتراح الطقم المثالي' : 'Select Your Occasion & Budget for an Instant Curated Match'}
            </h3>

            {/* Occasion Selector */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'bridal' as OccasionKey, en: 'Bridal Ceremony', ar: 'حفل زفاف' },
                { id: 'gala' as OccasionKey, en: 'Evening Gala & Abaya', ar: 'سهرة وعباءة' },
                { id: 'heritage' as OccasionKey, en: 'National Day & Majlis', ar: 'تراث ومناسبات وطنية' },
                { id: 'gift' as OccasionKey, en: 'VIP Luxury Gift', ar: 'هدية فاخرة' },
              ].map((occ) => (
                <button
                  key={occ.id}
                  type="button"
                  onClick={() => setOccasion(occ.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    occasion === occ.id
                      ? 'bg-neutral-900 dark:bg-gold text-white dark:text-black shadow'
                      : 'bg-white dark:bg-white/5 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-white/15'
                  }`}
                >
                  {isAr ? occ.ar : occ.en}
                </button>
              ))}
            </div>

            {/* Budget Selector */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'entry' as BudgetKey, en: 'Under 700 AED', ar: 'أقل من 700 د.إ' },
                { id: 'mid' as BudgetKey, en: '700 – 1,500 AED', ar: '700 – 1,500 د.إ' },
                { id: 'reserve' as BudgetKey, en: '1,500+ AED Reserve', ar: '1,500+ د.إ فاخر' },
              ].map((bud) => (
                <button
                  key={bud.id}
                  type="button"
                  onClick={() => setBudget(bud.id)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold transition-all cursor-pointer ${
                    budget === bud.id
                      ? 'bg-gold/25 border-2 border-gold text-[#8B6508] dark:text-gold'
                      : 'bg-white dark:bg-white/5 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-white/10'
                  }`}
                >
                  {isAr ? bud.ar : bud.en}
                </button>
              ))}
            </div>
          </div>

          {/* Recommended Result Card */}
          <div className="lg:w-[420px] p-5 rounded-2xl bg-gradient-to-br from-[#0B0E17] to-[#141A29] text-white border border-gold/50 shadow-xl space-y-3 shrink-0">
            <div className="flex items-center justify-between text-[10px] font-mono text-gold">
              <span className="flex items-center gap-1 font-bold uppercase">
                <Crown className="w-3.5 h-3.5" />
                <span>{isAr ? 'الترشيح المعتمد من التحرير' : 'CURATOR RECOMMENDED SUITE'}</span>
              </span>
              <span className="px-2 py-0.5 rounded bg-gold/20 border border-gold/40 font-bold">{rec.priceRange}</span>
            </div>
            <h4 className="text-lg font-serif font-bold text-white leading-snug">
              {isAr ? rec.titleAr : rec.titleEn}
            </h4>
            <p className="text-xs text-neutral-300 font-mono">
              {isAr ? rec.metalAr : rec.metalEn}
            </p>
            <a
              href={rec.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-gold via-amber-300 to-[#AA8C2C] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:scale-[1.02] transition-transform"
            >
              <span>{isAr ? 'عرض على omniastores.com' : 'Explore on omniastores.com'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE 925 ASSAY & MARKET VALUE CALCULATOR */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0B0E17] via-[#121726] to-[#0B0E17] text-white border border-gold/35 p-5 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <div className="inline-flex items-center gap-2 text-gold text-[11px] font-mono uppercase tracking-widest">
              <Calculator className="w-3.5 h-3.5" />
              <span>{isAr ? 'حاسبة مقارنة القيمة والفحص المخبري التفاعلية' : 'Interactive UAE & GCC Jewellery Value Benchmark'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold">
              {isAr ? 'قارن أسعار أمنية ستورز 925 مع السوق التقليدي ودور الأزياء' : 'Compare Omnia Stores 925 Direct vs. Gold Souk & Luxury Maisons'}
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {isAr ? item.specAr : item.specEn}
            </p>
          </div>

          {/* Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {(Object.keys(BENCHMARK_ITEMS) as BenchmarkItemKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedItem(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedItem === key
                    ? 'bg-gold text-black font-bold shadow-md'
                    : 'bg-white/10 text-neutral-200 hover:bg-white/20 border border-white/10'
                }`}
              >
                {isAr ? BENCHMARK_ITEMS[key].labelAr : BENCHMARK_ITEMS[key].labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Output Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-2xl bg-gold/15 border-2 border-gold flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gold font-bold">
                {isAr ? 'أمنية ستورز (مباشر)' : 'OMNIA STORES (DIRECT)'}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-black text-[10px] font-extrabold">
                {isAr ? `توفير ${savingsPct}%` : `SAVE ${savingsPct}%`}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-black text-white mt-2">
              {formatAmt(item.omniaAed)}
            </div>
            <span className="text-[11px] text-amber-200 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {isAr ? 'معتمد من DCL • توصيل 24 ساعة' : 'DCL Hallmarked • 24h GCC Courier'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/15 flex flex-col justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
              {isAr ? 'سوق الذهب التقليدي (دبي)' : 'TRADITIONAL GOLD SOUK RETAIL'}
            </span>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-neutral-200 mt-2 line-through decoration-red-400/70">
              {formatAmt(item.soukAed)}
            </div>
            <span className="text-[11px] text-neutral-400 mt-1">
              {isAr ? 'يشمل هوامش التجزئة والوساطة' : 'Includes showroom & broker markups'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/15 flex flex-col justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
              {isAr ? 'دور المجوهرات الأوروبية الفاخرة' : 'EUROPEAN LUXURY MAISONS'}
            </span>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-neutral-200 mt-2">
              {formatAmt(item.maisonAed)}
            </div>
            <span className="text-[11px] text-neutral-400 mt-1">
              {isAr ? 'تسعير العلامة التجارية العالمية' : 'Global heritage maison pricing'}
            </span>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-300">
            <Link href="/jewellery-comparison" className="text-gold hover:underline flex items-center gap-1 font-semibold">
              <Scale className="w-3.5 h-3.5" />
              <span>{isAr ? 'عرض مقارنة 15 منافساً بالكامل' : 'Full 15-Competitor Benchmark Matrix'}</span>
            </Link>
            <span className="text-neutral-600">•</span>
            <Link href="/glossary" className="text-neutral-300 hover:text-gold flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isAr ? 'معجم المصطلحات' : 'Gemology Glossary'}</span>
            </Link>
          </div>

          <a
            href="https://omniastores.com/collections/bridal-collection"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-gold text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:scale-105 transition-transform"
          >
            <span>{isAr ? 'تسوق المباشر على omniastores.com' : 'Shop Direct on omniastores.com'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* 4. EDITORIAL CREDIBILITY, FACT-CHECKING & COMMERCIAL DISCLOSURE BAR */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#F4F1EA] dark:bg-[#0B0E17] border border-neutral-300 dark:border-gold/25 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
        <div className="flex items-start sm:items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-[#8B6508] dark:text-gold shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {isAr ? (
              <>
                <strong>إفصاح الشفافية التحريرية:</strong> تخضع تقارير المعادن والأحجار الكريمة لمراجعة خبراء معتمدين (FGA). تعمل منصة ذا فوغ نيوز كمنصة إعلامية وتحليلية مستقلة، مع الإفصاح الصريح عن الشراكة التجارية مع <Link href="/brands/omnia-stores" className="text-[#8B6508] dark:text-gold font-bold underline">أمنية ستورز</Link>.
              </>
            ) : (
              <>
                <strong>Editorial Transparency & Disclosure:</strong> Gemological guides are reviewed by accredited FGA specialists. The Vogue News maintains strict separation between independent market research and brand features, with transparent commercial disclosure for our featured partner{' '}
                <Link href="/brands/omnia-stores" className="text-[#8B6508] dark:text-gold font-bold underline">
                  Omnia Stores
                </Link>.
              </>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/brands/omnia-stores"
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-white/5 border border-neutral-300 dark:border-gold/30 text-neutral-900 dark:text-gold font-bold hover:border-gold transition-colors flex items-center gap-1"
          >
            <Award className="w-3.5 h-3.5" />
            <span>{isAr ? 'ملف أمنية الموثق' : 'Verified Brand Dossier'}</span>
          </Link>
          <Link
            href="/press-releases"
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-white/5 border border-neutral-300 dark:border-white/15 text-neutral-800 dark:text-neutral-300 font-semibold hover:border-gold transition-colors"
          >
            {isAr ? 'البيانات الصحفية' : 'Press Desk'}
          </Link>
        </div>
      </div>
    </section>
  );
}
