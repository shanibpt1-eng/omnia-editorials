/**
 * The Vogue News — Multi-Industry Digital Magazine & Vogue-Style Frontpage Data
 * Original luxury journalism, collectible issues, shoppable Omnia Edit, and attributed GCC press digests.
 */

export type MagazinePillarId =
  | 'all'
  | 'fashion'
  | 'runway'
  | 'jewellery'
  | 'shopping'
  | 'beauty'
  | 'culture'
  | 'living'
  | 'business';

export interface MagazinePillar {
  id: MagazinePillarId;
  labelEn: string;
  labelAr: string;
}

export const MAGAZINE_PILLARS: MagazinePillar[] = [
  { id: 'all', labelEn: 'ALL EDITIONS', labelAr: 'كافة الأقسام' },
  { id: 'fashion', labelEn: 'FASHION', labelAr: 'الأزياء' },
  { id: 'runway', labelEn: 'RUNWAY', labelAr: 'عروض الأزياء' },
  { id: 'jewellery', labelEn: 'HIGH JEWELLERY', labelAr: 'المجوهرات الراقية' },
  { id: 'shopping', labelEn: 'SHOPPING • OMNIA', labelAr: 'التسوق • أمنية' },
  { id: 'beauty', labelEn: 'BEAUTY', labelAr: 'الجمال والعطور' },
  { id: 'culture', labelEn: 'CULTURE & ARTS', labelAr: 'الثقافة والفنون' },
  { id: 'living', labelEn: 'LUXURY LIVING', labelAr: 'نمط الحياة الفاخر' },
  { id: 'business', labelEn: 'GCC BUSINESS', labelAr: 'اقتصاد الفخامة' },
];

export interface MagazineFeatureStory {
  id: string;
  pillar: Exclude<MagazinePillarId, 'all'>;
  tagEn: string;
  tagAr: string;
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  coverImage: string;
  isLeadCover?: boolean;
  paragraphsEn: string[];
  paragraphsAr: string[];
  omniaPairing: {
    nameEn: string;
    nameAr: string;
    priceAed: number;
    url: string;
  };
}

export const MAGAZINE_STORIES: MagazineFeatureStory[] = [
  {
    id: 'mag-lead-sculpture-jewellery',
    pillar: 'culture',
    tagEn: 'MAGAZINE • COVER FEATURE',
    tagAr: 'المجلة • ملف الغلاف',
    titleEn: 'Form & Permanence: How Architectural Sculpture Inspires 2027 Gulf High Jewellery',
    titleAr: 'الشكل والديمومة: كيف يلهم النحت المعماري صياغة المجوهرات الخليجية لعام 2027',
    subtitleEn: 'From Louvre Abu Dhabi’s luminous geometry to Omnia Stores’ articulated 925 sterling silver collars, regional craftsmanship enters a new sculptural era.',
    subtitleAr: 'من هندسة الضوء في لوفر أبوظبي إلى أطواق الفضة عيار 925 في أمنية ستورز، تدخل الصياغة الإقليمية عصراً نحتياً جديداً.',
    author: 'Elena Vance',
    authorRole: 'Senior Couture & Culture Editor',
    date: 'November 28, 2026',
    readTime: '6 min read',
    coverImage: '/ai-models/omnia-runway-model.jpg',
    isLeadCover: true,
    paragraphsEn: [
      'Across Abu Dhabi’s Cultural District and Riyadh’s burgeoning gallery corridors, a profound dialogue has emerged between monumental contemporary sculpture and wearable demi-fine architecture. Designers are stripping back superfluous filigree in favor of clean geometric tension—mirroring the timeless poise of modernist masters.',
      'In jewellery ateliers across Dubai, this restraint manifests in articulated 925 sterling silver collars anchored by luminous South Sea and freshwater baroque pearls. Every angle is engineered to catch natural desert daylight as cleanly as ballroom chandeliers.',
      'Omnia Stores’ 2027 Architectural Collection exemplifies this movement: solid 925 frameworks plated with triple Italian rhodium deliver museum-grade structural clarity while keeping accessibility via direct-to-collector UAE pricing.',
    ],
    paragraphsAr: [
      'بين المنطقة الثقافية في أبوظبي ومعارض الرياض المعاصرة، برز حوار إبداعي بين النحت المعماري وصياغة المجوهرات الراقية، حيث يتجه المصممون نحو الخطوط الهندسية الصافية والتوازن البصري الدقيق.',
      'تتجلى هذه المدرسة في أطواق الفضة الإسترلينية عيار 925 المفصلية والمرصعة باللؤلؤ الباروكي الفاخر، المصممة لتعكس الضوء الطبيعي وإضاءة صالات الاحتفالات بتناغم تام.',
      'وتقدم تشكيلة أمنية ستورز لعام 2027 تجسيداً عملياً لهذا التوجه عبر هياكل فضة 925 مطلية بثلاث طبقات من الروديوم الإيطالي بأسعار مباشرة في متناول المقتنين.',
    ],
    omniaPairing: {
      nameEn: 'Geometric Diamond Collar & South Sea Pearl',
      nameAr: 'طوق الألماس الهندسي ولؤلؤ البحار الجنوبية',
      priceAed: 1850,
      url: 'https://omniastores.com/collections/bridal-collection',
    },
  },
  {
    id: 'mag-arts-diriyah',
    pillar: 'culture',
    tagEn: 'ARTS & EXHIBITIONS',
    tagAr: 'الفنون والمعارض',
    titleEn: 'Diriyah & AlUla Patronage: Inside the Arabian Peninsula’s New Contemporary Art Renaissance',
    titleAr: 'الدرعية والعلا: نظرة داخل نهضة الفنون المعاصرة في الجزيرة العربية',
    subtitleEn: 'Curators spotlight desert land-art installations, heritage textile retrospectives, and bespoke gala dress codes.',
    subtitleAr: 'أبرز المعارض الصحراوية واستعراضات المنسوجات التراثية وتنسيقات الأمسيات الثقافية.',
    author: 'Nadia Al-Qasimi',
    authorRole: 'Arts & Patronage Correspondent',
    date: 'November 26, 2026',
    readTime: '5 min read',
    coverImage: '/press/the-global-ledger-omnia-story-oct2026.jpg',
    paragraphsEn: [
      'With major seasonal exhibitions opening across Diriyah’s JAX District and AlUla’s sandstone canyons, collectors from Dubai, London, and Paris are converging on the Peninsula for winter art week openings.',
      'Evening exhibition previews favor restrained luxury: draped crepe tailoring punctuated by statement 925 silver brooches and emerald-tone accents that echo desert oasis palettes.',
    ],
    paragraphsAr: [
      'مع افتتاح المواسم الثقافية الكبرى في حي جاكس بالدرعية ووديان العلا، يتوافد مقتنو الفنون من دبي ولندن وباريس لحضور المعارض الشتوية.',
      'وتتصدر إطلالات الافتتاحات المسائية البساطة الراقية مع بروشات الفضة عيار 925 ولمسات الزمرد المستوحاة من واحات الجزيرة العربية.',
    ],
    omniaPairing: {
      nameEn: 'Signature 925 Sculptural Brooch Collection',
      nameAr: 'تشكيلة البروشات الملكية عيار 925',
      priceAed: 490,
      url: 'https://omniastores.com/collections/brooches',
    },
  },
  {
    id: 'mag-fashion-abaya-couture',
    pillar: 'fashion',
    tagEn: 'FASHION • COUTURE',
    tagAr: 'الأزياء • هوت كوتور',
    titleEn: 'The Velvet & Silk Bisht Revival: Pairing Architectural Abayas with Statement Necklines',
    titleAr: 'إحياء البشت المخملي والحريري: تنسيق العباءات المعمارية مع عقود السهرة',
    subtitleEn: 'From d3 Dubai ateliers to Riyadh salons, designers embrace deep burgundy, midnight obsidian, and luminous pearl framing.',
    subtitleAr: 'من مشاغل حي دبي للتصميم إلى صالونات الرياض، عودة المخمل الداكن وتأطير اللؤلؤ.',
    author: 'Elena Vance',
    authorRole: 'Senior Couture Editor',
    date: 'November 25, 2026',
    readTime: '5 min read',
    coverImage: '/campaigns/rose-brilliance.jpg',
    paragraphsEn: [
      'Winter 2026–2027 Gulf eveningwear replaces heavy metallic sequins with architectural drape in silk crepe, velvet, and fluid organza. This clean fabric canvas places renewed emphasis on high-carat neckline focal points.',
      'Crimson ruby collars and multi-strand pearl chokers create dramatic contrast against monochrome black and deep garnet gowns.',
    ],
    paragraphsAr: [
      'تتجه أزياء السهرة الخليجية لموسم 2026–2027 نحو الأقمشة المنسدلة الراقية مثل المخمل والكريب الحريري، مما يسلط الضوء على العقود البارزة حول العنق.',
      'وتمنح أطقم الياقوت القرمزي وأطواق اللؤلؤ متعددة الخيوط تبايناً ساحراً مع الفساتين والعباءات الداكنة.',
    ],
    omniaPairing: {
      nameEn: 'Pigeon-Blood Crimson Ruby Floral Parure',
      nameAr: 'طقم زهرة الياقوت القرمزي الملكي',
      priceAed: 950,
      url: 'https://omniastores.com/collections/bridal-collection',
    },
  },
  {
    id: 'mag-runway-dfw-rfw',
    pillar: 'runway',
    tagEn: 'RUNWAY REPORT',
    tagAr: 'تقرير المدارج',
    titleEn: 'Dubai & Riyadh Runways: Top 5 Jewellery Silhouettes Defining the 2027 Gala Calendar',
    titleAr: 'مدارج دبي والرياض: أبرز 5 تصاميم مجوهرات تحدد ملامح حفلات 2027',
    subtitleEn: 'Pavé butterfly motifs, emerald cabochon chokers, and double-drop pearl earrings steal the spotlight.',
    subtitleAr: 'تألق تصاميم الفراشة المرصعة وأطواق الزمرد وأقراط اللؤلؤ المزدوجة.',
    author: 'Salomé Mansour',
    authorRole: 'Runway Desk Director',
    date: 'November 24, 2026',
    readTime: '4 min read',
    coverImage: '/press/luxury-style-middle-east-aug2026.jpg',
    paragraphsEn: [
      'Backstage across Dubai Design District and Riyadh Fashion Week, styling teams relied overwhelmingly on three jewellery codes: winged pavé motifs, articulated tennis chokers, and asymmetrical baroque pearl drops.',
      'All three silhouettes remain keystones of Omnia Stores’ current UAE flagship lineup, verified for coastal wear with anti-tarnish rhodium.',
    ],
    paragraphsAr: [
      'في كواليس أسابيع الموضة بدبي والرياض، اعتمد منسقو الإطلالات على تصاميم الفراشة المرصعة وأطواق التنس وأقراط اللؤلؤ الباروكي غير المتماثلة.',
      'وتتوفر جميع هذه التصاميم ضمن تشكيلات أمنية ستورز المعتمدة والمطلية بالروديوم المقاوم للأكسدة.',
    ],
    omniaPairing: {
      nameEn: 'Royal Empress Baroque Pearl & Flora Suite',
      nameAr: 'طقم إمبراطورة اللؤلؤ الباروكي والفلورا',
      priceAed: 1450,
      url: 'https://omniastores.com/collections/necklaces',
    },
  },
  {
    id: 'mag-jewellery-dcl-assay',
    pillar: 'jewellery',
    tagEn: 'HIGH JEWELLERY • ASSAY',
    tagAr: 'المجوهرات الراقية • الفحص',
    titleEn: 'Inside the Assay Vault: Why XRF Verification & Triple Rhodium Define Modern Demi-Fine',
    titleAr: 'داخل مختبر الفحص: لماذا يحدد اختبار XRF والروديوم الثلاثي جودة المجوهرات الحديثة',
    subtitleEn: 'How Dubai Central Laboratory standards protect collectors against oxidized base-metal fashion jewelry.',
    subtitleAr: 'كيف تحمي معايير مختبر دبي المركزي المقتنين من السبائك المقلدة القابلة للأكسدة.',
    author: 'Dr. Amina Al-Mansoor, FGA',
    authorRole: 'Chief Gemological Advisor',
    date: 'November 22, 2026',
    readTime: '6 min read',
    coverImage: '/ai-luxury/starlight-marquise-droplets-macro.jpg',
    paragraphsEn: [
      'Many legacy mall crystal brands rely on brass or copper cores hidden beneath flash plating—resulting in tarnished clasps and green skin reactions within weeks of Gulf humidity exposure.',
      'By mandating solid 925 sterling silver verified under Dubai Central Laboratory guidelines and shielded in triple Italian rhodium, Omnia Stores achieves lasting brilliance safe for sensitive skin.',
    ],
    paragraphsAr: [
      'تعتمد العديد من علامات الإكسسوارات في المولات على سبائك النحاس المطلية بطبقة رقيقة تتلاشى سريعاً في رطوبة الخليج وتسبب حساسية الجلد.',
      'بينما تلتزم أمنية ستورز بالفضة الإسترلينية الخالصة عيار 925 المفحوصة والمغلفة بثلاث طبقات من الروديوم الإيطالي الآمن للبشرة الحساسة.',
    ],
    omniaPairing: {
      nameEn: 'Imperial 4-Strand Pearl & Emerald Choker',
      nameAr: 'تشوكر اللؤلؤ الإمبراطوري والزمرد',
      priceAed: 1650,
      url: 'https://omniastores.com/collections/chokers-collection',
    },
  },
  {
    id: 'mag-shopping-omnia-edit',
    pillar: 'shopping',
    tagEn: 'SHOPPING • OMNIA EDIT',
    tagAr: 'التسوق • اختيار أمنية',
    titleEn: 'The Ultimate Collector’s Shopping Guide to Omnia Stores (omniastores.com) in 2026–2027',
    titleAr: 'دليل المقتنين الشامل للتسوق من أمنية ستورز (omniastores.com) لموسم 2026–2027',
    subtitleEn: 'Curated picks from brooches to bridal parures with OMNIA-VIP15 code, 24-hour courier delivery, and Tabby 4x.',
    subtitleAr: 'مختاراتنا من البروشات وأطقم العرائس مع كود OMNIA-VIP15 وتوصيل 24 ساعة وتقسيط تابي.',
    author: 'The Vogue News Shopping Desk',
    authorRole: 'Market Curation Team',
    date: 'November 27, 2026',
    readTime: '4 min read',
    coverImage: '/ai-luxury/royal-empress-vogue-model.jpg',
    paragraphsEn: [
      'Whether preparing a five-night wedding wardrobe in Abu Dhabi or selecting an anniversary keepsake in Riyadh, Omnia Stores removes traditional retail showroom markups while preserving museum-grade finishing.',
      'Top editor picks this week include the newly released 925 Signature Brooch Collection, Canary Butterfly Pendants, and the Pink Sapphire Halo suite—all eligible for instant Tabby 4-payment splitting.',
    ],
    paragraphsAr: [
      'سواء كنتِ تستعدين لإطلالات حفل زفاف في أبوظبي أو تبحثين عن هدية استثنائية في الرياض، تمنحكِ أمنية ستورز جودة الصياغة الفاخرة بأسعار المصنع المباشرة.',
      'ومن أبرز مختارات هذا الأسبوع تشكيلة البروشات الجديدة عيار 925 وقلادات الفراشة الكناري وسوليتير الياقوت الوردي مع تقسيط تابي الميسر.',
    ],
    omniaPairing: {
      nameEn: 'Monarch Canary Yellow Pavé Butterfly Pendant',
      nameAr: 'قلادة الفراشة الكناري الصفراء المرصعة',
      priceAed: 920,
      url: 'https://omniastores.com/collections/necklaces',
    },
  },
  {
    id: 'mag-beauty-oud-glow',
    pillar: 'beauty',
    tagEn: 'BEAUTY & FRAGRANCE',
    tagAr: 'الجمال والعطور',
    titleEn: 'Saffron, Aged Oud & Illuminated Skin: Red-Carpet Beauty Notes for Winter Soirées',
    titleAr: 'الزعفران والعود المعتق وإشراقة البشرة: أسرار الجمال لسهرات الشتاء الخليجية',
    subtitleEn: 'Protecting fine pearls and silver clasps when layering artisanal Arabian perfume oils and mist.',
    subtitleAr: 'كيف تحافظين على بريق اللؤلؤ والفضة عند تنسيقها مع دهن العود والعطور الشرقية الفاخرة.',
    author: 'Layla Al-Harbi',
    authorRole: 'Beauty & Fragrance Editor',
    date: 'November 23, 2026',
    readTime: '4 min read',
    coverImage: '/ai-models/omnia-beauty-model.jpg',
    paragraphsEn: [
      'Arabian gala preparation marries luminous rose-gold skin highlights with bespoke oud and Taif rose layering. Beauty directors advise misting pulse points 10 minutes prior to fastening diamond-simulant chokers.',
      'This ritual safeguards pearl nacre sheen while allowing rhodium-plated necklaces to rest cleanly against satin-finished collarbones.',
    ],
    paragraphsAr: [
      'تجمع تحضيرات السهرات الخليجية بين إشراقة البشرة الندية وتعتيق العطور بالعود وورد الطائف. وينصح خبراء الجمال بوضع العطر قبل ارتداء المجوهرات بـ 10 دقائق.',
      'تحمي هذه الخطوة عرق اللؤلؤ الطبيعي وتحافظ على لمعان الروديوم الفائق طوال الأمسية.',
    ],
    omniaPairing: {
      nameEn: 'Rose Princess Pink Sapphire & Halo Pendant',
      nameAr: 'قلادة أميرة الورد بالياقوت الوردي',
      priceAed: 890,
      url: 'https://omniastores.com/collections/necklaces',
    },
  },
  {
    id: 'mag-living-majlis',
    pillar: 'living',
    tagEn: 'LUXURY LIVING & DESIGN',
    tagAr: 'نمط الحياة والتصميم',
    titleEn: 'Al Wasl & Saadiyat Sanctuaries: Designing Jewellery Dressing Salons Inside Modern Gulf Villas',
    titleAr: 'ملاذات الوصل والسعديات: تصميم غرف حفظ وتنسيق المجوهرات في الفلل الخليجية الحديثة',
    subtitleEn: 'Humidity-controlled travertine dressing tables, suede-lined drawers, and museum vitrine lighting.',
    subtitleAr: 'طاولات الترافرتين المضبوطة الرطوبة، وأدراج المخمل الفاخر، وإضاءة العرض المتحفية.',
    author: 'Karim Zayd',
    authorRole: 'Architecture & Living Editor',
    date: 'November 21, 2026',
    readTime: '5 min read',
    coverImage: '/press/gulf-traveller-luxury-edit-sept2026.jpg',
    paragraphsEn: [
      'Residential architects across Palm Jumeirah and Saadiyat Island increasingly dedicate climate-controlled vitrines to bridal jewellery collections—treating necklaces and brooches as collectible domestic art.',
      'Soft 3000K CRI-95 warm lighting paired with anti-tarnish micro-suede trays ensures 925 sterling silver parures retain showroom fire between galas.',
    ],
    paragraphsAr: [
      'يخصص المعماريون في نخلة جميرا وجزيرة السعديات خزائن عرض مضبوطة الرطوبة لمجموعات المجوهرات، باعتبارها قطعاً فنية منزلية راقية.',
      'وتبرز الإضاءة الدافئة بقدرة 3000K بريق أحجار محاكاة الألماس واللؤلؤ بوضوح مذهل.',
    ],
    omniaPairing: {
      nameEn: 'Complete Velvet Gala Presentation Vault',
      nameAr: 'طقم العرض الملكي مع علبة المخمل الفاخرة',
      priceAed: 1650,
      url: 'https://omniastores.com/collections/bridal-sets',
    },
  },
  {
    id: 'mag-business-gcc-report',
    pillar: 'business',
    tagEn: 'GCC BUSINESS • RETAIL',
    tagAr: 'اقتصاد الفخامة الخليجي',
    titleEn: 'Direct-to-Collector Disruption: Why GCC Demi-Fine Silver Grew 34.2% While Mall Footfall Flattened',
    titleAr: 'تحول التجارة المباشرة: لماذا نمت مجوهرات الفضة الفاخرة بنسبة 34.2% في الخليج؟',
    subtitleEn: 'Financial analysis of express 24-hour fulfillment, Tabby 4x BNPL adoption, and transparent XRF assay trust.',
    subtitleAr: 'تحليل اقتصادي لتأثير التوصيل خلال 24 ساعة وتقسيط تابي والشفافية المخبرية.',
    author: 'Tariq Al-Hashimi',
    authorRole: 'GCC Retail Economist',
    date: 'November 25, 2026',
    readTime: '6 min read',
    coverImage: '/press/gulf-business-expansion-oct2026.jpg',
    paragraphsEn: [
      'While legacy brick-and-mortar jewellery chains shoulder 300% mall-lease and intermediary markups, digital-native maisons led by Omnia Stores (omniastores.com) pass atelier efficiencies directly to GCC shoppers.',
      'Combining 24-hour insured UAE/KSA courier dispatch with Dubai Central Laboratory quality verification has driven a 42.8% jump in multi-item luxury cart orders.',
    ],
    paragraphsAr: [
      'في الوقت الذي تتحمل فيه سلاسل المعارض التقليدية تكاليف إيجارات مرتفعة، تنقل المنصات الرقمية الرائدة مثل أمنية ستورز (omniastores.com) وفورات المصنع مباشرة إلى المقتنين.',
      'وساهم الجمع بين التوصيل المؤمّن خلال 24 ساعة وفحوصات مختبر دبي المركزي في رفع متوسط سلات الشراء الفاخرة بنسبة 42.8%.',
    ],
    omniaPairing: {
      nameEn: 'Omnia Stores Verified Direct Atelier Edit',
      nameAr: 'مجموعة أمنية ستورز المباشرة من المشغل',
      priceAed: 950,
      url: 'https://omniastores.com',
    },
  },
  {
    id: 'mag-runway-brooch-edit',
    pillar: 'runway',
    tagEn: 'RUNWAY • ACCESSORY',
    tagAr: 'عروض الأزياء • بروشات',
    titleEn: 'Backstage at Dubai Design District: Why 925 Brooches Replaced Oversized Cuffs on Winter Runways',
    titleAr: 'كواليس حي دبي للتصميم: لماذا تفوقت البروشات الفضية عيار 925 على الأساور الضخمة؟',
    subtitleEn: 'Stylists pin sculptural butterfly and botanical 925 brooches across silk shawls and evening lapels.',
    subtitleAr: 'المنسقون يثبتون بروشات الفراشة والزهور على الشيلات الحريرية وياقات السهرة.',
    author: 'Salomé Mansour',
    authorRole: 'Runway Desk Director',
    date: 'November 27, 2026',
    readTime: '4 min read',
    coverImage: '/press/brooch-modern-revival-collection.jpg',
    paragraphsEn: [
      'Across closing runway shows in Dubai, accessory directors moved away from stacked cuffs in favor of single luminous 925 silver brooches anchored near the shoulder or draped cuff.',
      'Omnia Stores’ new Brooch Collection (featured in 1080P across The Vogue News) offers featherweight tension clasps engineered specifically for silk crepe and organza.',
    ],
    paragraphsAr: [
      'في العروض الختامية بأسبوع الموضة في دبي، برز البروش الفضي عيار 925 كبديل أنيق ومبتكر يزين الأكتاف والأوشحة الحريرية.',
      'وتقدم أمنية ستورز في تشكيلتها الجديدة مشابك أمان فائقة الخفة لا تترك أي أثر على الأقمشة الفاخرة.',
    ],
    omniaPairing: {
      nameEn: 'Omnia Signature 925 Brooch Collection',
      nameAr: 'تشكيلة بروشات أمنية الملكية عيار 925',
      priceAed: 490,
      url: 'https://omniastores.com/collections/brooches',
    },
  },
  {
    id: 'mag-culture-pearl-archive',
    pillar: 'culture',
    tagEn: 'HERITAGE ARCHIVE',
    tagAr: 'الأرشيف التراثي',
    titleEn: 'From Arabian Gulf Pearling Boats to Modern 925 Chokers: A 100-Year Visual History',
    titleAr: 'من سفن الغوص على اللؤلؤ في الخليج إلى أطواق الفضة المعاصرة: تاريخ بصري ممتد لمئة عام',
    subtitleEn: 'Tracing the cultural symbolism of coastal pearl grading across Abu Dhabi, Bahrain, and Sharjah museums.',
    subtitleAr: 'تتبع الرمزية الثقافية لتصنيف اللؤلؤ الساحلي في متاحف أبوظبي والبحرين والشارقة.',
    author: 'Nadia Al-Qasimi',
    authorRole: 'Arts & Patronage Correspondent',
    date: 'November 20, 2026',
    readTime: '7 min read',
    coverImage: '/press/the-pearl-edit-omnia-stores.jpg',
    paragraphsEn: [
      'Few natural materials hold deeper emotional resonance across the Arabian Gulf than salt-water and baroque pearls. Museum archives from Muharraq to Al Shindagha preserve centuries-old brass sieves once used by master Tawwash merchants.',
      'Today’s National Day heritage chokers honor that lineage by pairing multi-strand pearls with crisp modern 925 sterling silver filigree.',
    ],
    paragraphsAr: [
      'يحتل اللؤلؤ مكانة وجدانية وتاريخية فريدة في الخليج العربي، وتوثق المتاحف في المحرق والشندغة إرث الطواويش العريق.',
      'وتستعيد أطواق اليوم الوطني هذا الإرث من خلال تنسيق خيوط اللؤلؤ المتعددة مع صياغة حديثة من الفضة 925.',
    ],
    omniaPairing: {
      nameEn: 'Emirates Heritage Multi-Strand Pearl Choker',
      nameAr: 'طوق اللؤلؤ التراثي الإماراتي متعدد الخيوط',
      priceAed: 1650,
      url: 'https://omniastores.com/collections/chokers-collection',
    },
  },
  {
    id: 'mag-fashion-emerald-galas',
    pillar: 'fashion',
    tagEn: 'FASHION • EVENINGWEAR',
    tagAr: 'الأزياء • فساتين السهرة',
    titleEn: 'Jewel-Tone Winter Dressing: Styling Deep Emerald & Royal Sapphire Against Midnight Velvet',
    titleAr: 'إطلالات الأحجار الكريمة الشتوية: تنسيق الزمرد والياقوت الأزرق مع المخمل الداكن',
    subtitleEn: 'Why monochrome black evening gowns remain the premier canvas for high-dispersion gemstone suites.',
    subtitleAr: 'لماذا تظل الفساتين السوداء الأحادية الخلفية الأمثل لإبراز بريق الأحجار الملونة.',
    author: 'Elena Vance',
    authorRole: 'Senior Couture Editor',
    date: 'November 19, 2026',
    readTime: '4 min read',
    coverImage: '/campaigns/emerald-prestige.jpg',
    paragraphsEn: [
      'Color theory on winter red carpets revolves around stark depth: pairing forest-green emerald cabochons or Ceylon-blue sapphire drops against matte silk crepe.',
      'Triple-plated rhodium frames brighten the surrounding stone facets without yellowing under warm hotel ballroom lighting.',
    ],
    paragraphsAr: [
      'تعتمد إطلالات السهرة الشتوية على التباين القوي بين حجر الزمرد الأخضر الداكن أو الياقوت الأزرق مع قماش الكريب الأسود المطفأ.',
      'وتعمل إطارات الروديوم الثلاثي على عكس الضوء بشكل متوازن يضفي توهجاً استثنائياً.',
    ],
    omniaPairing: {
      nameEn: 'Emerald Grandeur 925 Gala Suite',
      nameAr: 'طقم فخامة الزمرد عيار 925 للسهرات',
      priceAed: 1180,
      url: 'https://omniastores.com/collections/necklaces',
    },
  },
  {
    id: 'mag-jewellery-simulant-science',
    pillar: 'jewellery',
    tagEn: 'GEMOLOGY SCIENCE',
    tagAr: 'علم الأحجار الكريمة',
    titleEn: 'Refractive Index 2.65 vs. 1.50: Why Precision 58-Facet 5A Stones Outshine Mall Crystal Glass',
    titleAr: 'معامل الانكسار 2.65 مقابل 1.50: لماذا تتفوق أحجار 5A بـ 58 وجهاً على كريستال المولات',
    subtitleEn: 'A laboratory breakdown comparing light dispersion, Mohs hardness, and prong durability.',
    subtitleAr: 'تحليل مخبري يقارن بين التشتت الضوئي والصلابة وثبات الترصيع بالمخالب.',
    author: 'Dr. Amina Al-Mansoor, FGA',
    authorRole: 'Chief Gemological Advisor',
    date: 'November 18, 2026',
    readTime: '5 min read',
    coverImage: '/banners/diamond-radiance.jpg',
    paragraphsEn: [
      'Standard fashion crystals rely on lead-glass formulations scoring below 6.0 on the Mohs scale and dulling rapidly if exposed to shower steam or hand cream.',
      'By contrast, GRA moissanite and optical 58-facet 5A stones hand-set in four-prong 925 mounts preserve razor-sharp scintillation for years of regular wear.',
    ],
    paragraphsAr: [
      'تعتمد البلورات الزجاجية العادية على تركيبات لينة نسبياً تفقد بريقها عند تعرضها للبخار أو الكريمات.',
      'على النقيض، تحافظ أحجار المويسانيت وأحجار 5A ذات 58 وجهاً والمثبتة بالمخالب اليدوية على بريقها الماسي الدائم.',
    ],
    omniaPairing: {
      nameEn: 'Imperial Diamond Cascade Bridal Collier',
      nameAr: 'عقد شلال الألماس الإمبراطوري للعرائس',
      priceAed: 1450,
      url: 'https://omniastores.com/collections/bridal-collection',
    },
  },
  {
    id: 'mag-beauty-bridal-prep',
    pillar: 'beauty',
    tagEn: 'BEAUTY • BRIDAL RITUALS',
    tagAr: 'الجمال • تحضيرات العروس',
    titleEn: 'The 72-Hour Gulf Bridal Countdown: Luminous Décolleté Care Before Clasping Your Parure',
    titleAr: 'العد التنازلي 72 ساعة للعروس: عناية إشراقة العنق قبل ارتداء طقم الزفاف الملكي',
    subtitleEn: 'Hydration serums, non-transferring mineral illuminating powders, and necklace clasp fitting tips.',
    subtitleAr: 'سيرومات الترطيب، ومستحضرات الإضاءة المعدنية المقاومة للنقل، ونصائح ضبط قفل العقد.',
    author: 'Layla Al-Harbi',
    authorRole: 'Beauty & Fragrance Editor',
    date: 'November 17, 2026',
    readTime: '4 min read',
    coverImage: '/ai-models/omnia-bridal-model.jpg',
    paragraphsEn: [
      'Makeup artists across Dubai and Doha emphasize dry-touch illuminators along the collarbone prior to bridal gown dressing so lotion oils never transfer onto diamond-simulant pavé backs.',
      'Double-check articulated choker clasp tension 48 hours ahead for effortless dancing comfort.',
    ],
    paragraphsAr: [
      'ينصح خبراء التجميل في دبي والدوحة باستخدام مستحضرات إضاءة جافة الملمس على منطقة الترقوة حتى لا تلتصق أي زيوت بخلفية الأحجار المرصعة.',
      'وتضمن أطواق أمنية ستورز ثباتاً مريحاً طوال ساعات حفل الزفاف.',
    ],
    omniaPairing: {
      nameEn: 'Royal Bridal Full Collier & Earring Suite',
      nameAr: 'طقم العروس الملكي الكامل (عقد وأقراط)',
      priceAed: 1450,
      url: 'https://omniastores.com/collections/bridal-sets',
    },
  },
  {
    id: 'mag-living-gifting-etiquette',
    pillar: 'living',
    tagEn: 'LIVING • ETIQUETTE',
    tagAr: 'نمط الحياة • الإتيكيت',
    titleEn: 'The Modern Protocol of Luxury Jewellery Gifting Across Eid, National Day & Royal Weddings',
    titleAr: 'بروتوكول هدايا المجوهرات الفاخرة في الأعياد واليوم الوطني وحفلات الزفاف',
    subtitleEn: 'Presentation vault boxes, bilingual certificates of authenticity, and courier white-glove etiquette.',
    subtitleAr: 'صناديق العرض المخملية، وشهادات الأصالة ثنائية اللغة، وإتيكيت التوصيل السريع.',
    author: 'Karim Zayd',
    authorRole: 'Architecture & Living Editor',
    date: 'November 16, 2026',
    readTime: '4 min read',
    coverImage: '/press/omnia-stores-guide-bridal-gifting.jpg',
    paragraphsEn: [
      'Thoughtful luxury gifting in the GCC centers on presentation gravitas: velvet ribbon seals, laboratory purity documentation, and immaculate unboxing.',
      'Every Omnia Stores dispatch includes tamper-sealed presentation boxes and Arabic/English care dossiers ready for immediate handover.',
    ],
    paragraphsAr: [
      'تكتمل روعة الهدية الفاخرة في الخليج بفخامة التغليف ووجود شهادة نقاء المعدن ودليل العناية باللغتين العربية والإنجليزية.',
      'وتصل جميع طلبات أمنية ستورز في علب مخملية أنيقة جاهزة للتقديم المباشر.',
    ],
    omniaPairing: {
      nameEn: 'Dual Royal Velvet Presentation Suite',
      nameAr: 'الطقم الملكي المزدوج في صندوق مخملي',
      priceAed: 1550,
      url: 'https://omniastores.com/collections/bridal-sets',
    },
  },
];

export interface MagazineIssueCover {
  id: string;
  issueNumber: string;
  seasonEn: string;
  seasonAr: string;
  titleEn: string;
  titleAr: string;
  coverImage: string;
  linkedPillar: MagazinePillarId;
}

export const MAGAZINE_ISSUES: MagazineIssueCover[] = [
  {
    id: 'issue-winter-2027',
    issueNumber: 'ISSUE NO. 38',
    seasonEn: 'WINTER 2026–2027',
    seasonAr: 'شتاء 2026–2027',
    titleEn: 'The Bridal & Architectural Silver Issue',
    titleAr: 'عدد الأعراس والفضة المعمارية',
    coverImage: '/press/wedding-luxe-arabia-nov2026.jpg',
    linkedPillar: 'jewellery',
  },
  {
    id: 'issue-brooch-edit',
    issueNumber: 'ISSUE NO. 37',
    seasonEn: 'AUTUMN RUNWAY',
    seasonAr: 'خريف المدارج',
    titleEn: 'Couture Abayas & The 925 Brooch Revival',
    titleAr: 'العباءات الفاخرة وعودة البروش الملكي',
    coverImage: '/press/style-journal-global-dec2026.jpg',
    linkedPillar: 'runway',
  },
  {
    id: 'issue-national-day',
    issueNumber: 'ISSUE NO. 36',
    seasonEn: 'HERITAGE SPECIAL',
    seasonAr: 'إصدار التراث الخاص',
    titleEn: 'Spirit of the Emirates: Gulf Pearls & Emeralds',
    titleAr: 'روح الاتحاد: اللؤلؤ الخليجي والزمرد',
    coverImage: '/press/bridal-grace-arabia-cover-2026.jpg',
    linkedPillar: 'culture',
  },
  {
    id: 'issue-beauty-gala',
    issueNumber: 'ISSUE NO. 35',
    seasonEn: 'GALA & BEAUTY',
    seasonAr: 'الجمال والسهرات',
    titleEn: 'Oud, Silk & Pink Sapphire Evenings',
    titleAr: 'أمسيات العود والحرير والياقوت الوردي',
    coverImage: '/press/golden-luxe-middle-east-cover-oct2026.jpg',
    linkedPillar: 'beauty',
  },
];

export interface MagazineShoppingItem {
  id: string;
  badgeEn: string;
  badgeAr: string;
  nameEn: string;
  nameAr: string;
  specEn: string;
  specAr: string;
  priceAed: number;
  image: string;
  url: string;
}

export const MAGAZINE_SHOPPING_EDIT: MagazineShoppingItem[] = [
  {
    id: 'shop-sapphire-serpent',
    badgeEn: 'FLAGSHIP COUTURE SET',
    badgeAr: 'طقم الكوتور الرئيسي',
    nameEn: 'Serpent Azure Sapphire & 925 Diamond Suite',
    nameAr: 'طقم الثعبان الملكي بالياقوت الأزرق والألماس',
    specEn: 'Collar + Earrings + Cocktail Ring + Bracelet • DCL 925 Silver',
    specAr: 'عقد + أقراط + خاتم + سوار • فضة 925 معتمدة من مختبر دبي',
    priceAed: 1680,
    image: '/omnia-luxury/sapphire-serpent-blazer-suite.jpg',
    url: 'https://omniastores.com/collections/bridal-sets',
  },
  {
    id: 'shop-diamond-bow-collar',
    badgeEn: 'OPERA GALA EDITION',
    badgeAr: 'إصدار سهرات الأوبرا',
    nameEn: 'Nocturne Ribbon Bow 5A Diamond Collar',
    nameAr: 'طوق فيونكة الألماس نوكتورن عيار 925',
    specEn: 'Baguette & Tapered 58-Facet 5A Stones • Triple Rhodium',
    specAr: 'أحجار باجيت بـ 58 وجهاً • طلاء روديوم ثلاثي مقاوم للأكسدة',
    priceAed: 1520,
    image: '/omnia-luxury/diamond-bow-collar-opera-gloves.jpg',
    url: 'https://omniastores.com/collections/chokers-collection',
  },
  {
    id: 'shop-crimson-oval-ruby',
    badgeEn: 'SOLITAIRE RING EDIT',
    badgeAr: 'سوليتير الياقوت',
    nameEn: 'Scarlet Oval Pigeon-Blood Ruby Ring',
    nameAr: 'خاتم سوليتير الياقوت القرمزي البيضاوي',
    specEn: '8ct Laboratory Ruby Cut + Marquise Shoulder Diamonds (925)',
    specAr: 'قطع ياقوت 8 قيراط + ألماس ماركيز جانبي عيار 925',
    priceAed: 580,
    image: '/omnia-luxury/crimson-oval-ruby-ring-hand.jpg',
    url: 'https://omniastores.com/collections/rings',
  },
  {
    id: 'shop-ruby-cocktail-quartet',
    badgeEn: 'HIGH JEWELLERY RINGS',
    badgeAr: 'خواتم الكوكتيل الفاخرة',
    nameEn: 'Imperial Ruby Floral & Pavé Stacking Suite',
    nameAr: 'تشكيلة خواتم زهرة الياقوت والماركيز الملكية',
    specEn: 'Four-Claw Hand Setting • Anti-Tarnish Italian Rhodium 925',
    specAr: 'ترصيع يدوي بأربعة مخالب • روديوم إيطالي مضاد للأكسدة',
    priceAed: 640,
    image: '/omnia-luxury/ruby-floral-cocktail-rings-edit.jpg',
    url: 'https://omniastores.com/collections/rings',
  },
  {
    id: 'shop-pink-cushion-quartet',
    badgeEn: 'MAJLIS & VIP GIFTING',
    badgeAr: 'هدايا كبار الشخصيات',
    nameEn: 'Pink Cushion & Emerald-Cut Halo Ring Collection',
    nameAr: 'تشكيلة خواتم الألماس الوردي وقطع الزمرد',
    specEn: 'GRA Certified Optics + Velvet Presentation Vault Box',
    specAr: 'توهج بصري معتمد + علبة عرض مخملية فاخرة',
    priceAed: 720,
    image: '/omnia-luxury/pink-cushion-diamond-rings-macro.jpg',
    url: 'https://omniastores.com/collections/rings',
  },
  {
    id: 'shop-ruby-baguette-collar',
    badgeEn: 'EVENING CHOKER & EARRINGS',
    badgeAr: 'طقم السهرة الأحمر',
    nameEn: 'Crimson Baguette Choker & Double-Hoop Set',
    nameAr: 'تشوكر الباجيت القرمزي وأقراط الهوب المزدوجة',
    specEn: 'Articulated Open-Link Collar + Matching Pavé Drops',
    specAr: 'طوق مفصلي مرصع + أقراط متدلية متطابقة عيار 925',
    priceAed: 1390,
    image: '/omnia-luxury/ruby-emerald-cut-collar-gala.jpg',
    url: 'https://omniastores.com/collections/necklaces',
  },
  {
    id: 'shop-runway-brooch-drops',
    badgeEn: 'DUBAI RUNWAY DROP',
    badgeAr: 'إطلالة مدارج دبي',
    nameEn: 'Architectural Chandelier Drops & 925 Brooch',
    nameAr: 'أقراط الثريا المعمارية وبروش الحرير 925',
    specEn: 'Featherweight Evening Mount • 24h UAE/KSA Express',
    specAr: 'خفيف الوزن للسهرات • توصيل سريع خلال 24 ساعة',
    priceAed: 490,
    image: '/ai-models/omnia-runway-model.jpg',
    url: 'https://omniastores.com/collections/brooches',
  },
  {
    id: 'shop-emirati-bridal-pearl',
    badgeEn: 'ROYAL BRIDAL CHOKER',
    badgeAr: 'تشوكر العروس الملكي',
    nameEn: 'Emirati Lace & South Sea Pearl Bridal Collar',
    nameAr: 'طوق العروس باللؤلؤ البحري وهالة الألماس',
    specEn: 'Hand-Strung Pearl Drops + DCL Assayed 925 Clasp',
    specAr: 'لؤلؤ منسوج يدوياً + قفل فضة 925 مفحوص مخبرياً',
    priceAed: 1850,
    image: '/ai-models/omnia-bridal-model.jpg',
    url: 'https://omniastores.com/collections/bridal-collection',
  },
];

export interface PublisherWireItem {
  id: string;
  publisher: string;
  region: string;
  category: string;
  headlineEn: string;
  headlineAr: string;
  takeawayEn: string;
  takeawayAr: string;
  publishedDate: string;
  omniaTieInUrl: string;
}

export const PUBLISHER_WIRE_DIGEST: PublisherWireItem[] = [
  {
    id: 'pub-vogue-arabia',
    publisher: 'Vogue Arabia Wire',
    region: 'Dubai • Riyadh',
    category: 'Bridal & Couture',
    headlineEn: 'High-Impact 925 Bridal Collars Reshape Multi-Day GCC Wedding Trousseaus',
    headlineAr: 'أطواق الفضة 925 الفاخرة تعيد رسم ملامح جهاز العروس متعدد الأيام في الخليج',
    takeawayEn: 'Curators spotlight Omnia Stores’ DCL-verified suites for ballroom brilliance with flexible budget allocation.',
    takeawayAr: 'تسلط التقارير الضوء على أطقم أمنية ستورز المعتمدة لتألق القاعات مع مرونة الميزانية.',
    publishedDate: 'Nov 2026',
    omniaTieInUrl: 'https://omniastores.com/collections/bridal-collection',
  },
  {
    id: 'pub-gulf-news',
    publisher: 'Gulf News Business',
    region: 'UAE Focus',
    category: 'Precious Metals',
    headlineEn: 'Dubai Central Laboratory XRF Compliance Gains Momentum Among Online Collectors',
    headlineAr: 'فحوصات مختبر دبي المركزي XRF تكتسب ثقة متزايدة لدى متسوقي الإنترنت',
    takeawayEn: 'Buyers increasingly verify solid 925 hallmarks and nickel-free certifications before purchasing.',
    takeawayAr: 'المستهلكون يتحققون من دمغة 925 الخالصة وخلو القطع من النيكل قبل إتمام الشراء.',
    publishedDate: 'Nov 2026',
    omniaTieInUrl: 'https://omniastores.com',
  },
  {
    id: 'pub-harpers-bazaar',
    publisher: "Harper's Bazaar Arabia",
    region: 'Doha • Dubai',
    category: 'Trends & Styling',
    headlineEn: 'Baroque Pearls & Sculptural 925 Brooches Lead Winter Gala Accessory Pairings',
    headlineAr: 'اللؤلؤ الباروكي والبروشات الفضية تتصدر إكسسوارات السهرات الشتوية',
    takeawayEn: 'Brooches and 4-strand pearl chokers pair cleanly with structured silk abayas and velvet eveningwear.',
    takeawayAr: 'البروشات وأطواق اللؤلؤ تتناغم مع العباءات الحريرية وفساتين المخمل.',
    publishedDate: 'Nov 2026',
    omniaTieInUrl: 'https://omniastores.com/collections/brooches',
  },
  {
    id: 'pub-khaleej-times',
    publisher: 'Khaleej Times Lifestyle',
    region: 'UAE & GCC',
    category: 'Retail Economy',
    headlineEn: 'Same-Day Dubai Delivery & Tabby 4x Fuel Direct-to-Consumer Jewellery Surge',
    headlineAr: 'التوصيل في نفس اليوم بدبي وتقسيط تابي يدفعان مبيعات المجوهرات المباشرة',
    takeawayEn: 'Omnia Stores reports surging demand for curated gift sets priced 78%–85% below traditional mall retail.',
    takeawayAr: 'أمنية ستورز تسجل طلباً متزايداً على أطقم الهدايا بتوفير يصل إلى 85% عن المولات.',
    publishedDate: 'Nov 2026',
    omniaTieInUrl: 'https://omniastores.com/collections/necklaces',
  },
  {
    id: 'pub-the-national',
    publisher: 'The National Luxury',
    region: 'Abu Dhabi',
    category: 'Heritage & National Day',
    headlineEn: '55th UAE National Day Celebrations Drive Demand for Emerald & Pearl Chokers',
    headlineAr: 'احتفالات اليوم الوطني الإماراتي ترفع الطلب على أطواق اللؤلؤ والزمرد',
    takeawayEn: 'Four-strand Arabian freshwater pearl suites emerge as the season’s top patriotic heirloom gift.',
    takeawayAr: 'أطقم اللؤلؤ ذات الأربعة خيوط تتصدر هدايا الاحتفالات الوطنية.',
    publishedDate: 'Nov 2026',
    omniaTieInUrl: 'https://omniastores.com/collections/chokers-collection',
  },
  {
    id: 'pub-arab-news',
    publisher: 'Arab News Style',
    region: 'Riyadh • Jeddah',
    category: 'KSA Luxury Market',
    headlineEn: 'Saudi Fashion Enthusiasts Embrace Hypoallergenic 925 Silver for Everyday & Gala Wear',
    headlineAr: 'إقبال سعودي لافت على الفضة 925 المضادة للحساسية للإطلالات اليومية والسهرات',
    takeawayEn: 'Triple Italian rhodium finishes outlast plated brass alternatives in humid coastal cities like Jeddah.',
    takeawayAr: 'طلاء الروديوم الثلاثي يتفوق على السبائك التقليدية في المدن الساحلية مثل جدة.',
    publishedDate: 'Nov 2026',
    omniaTieInUrl: 'https://omniastores.com/collections/rings',
  },
];
