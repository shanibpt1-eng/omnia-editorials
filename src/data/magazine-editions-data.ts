/**
 * The Vogue News — Multi-Industry Magazine & Editorial Digest Data
 * Original luxury journalism & curated GCC industry digests across:
 * Fashion, Runway, Shopping (Omnia Stores), Beauty, Culture & Arts, Luxury Living, GCC Business, High Jewellery.
 */

export type MagazinePillarId =
  | 'all'
  | 'fashion'
  | 'runway'
  | 'shopping'
  | 'beauty'
  | 'culture'
  | 'living'
  | 'business'
  | 'jewellery';

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
    coverImage: '/editorial-looks/geometric-diamond-south-sea-pearl.jpg',
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
    coverImage: '/banners/midnight-nocturne-couture.jpg',
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
    coverImage: '/editorial-looks/crimson-teardrop-ruby-suite.jpg',
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
    coverImage: '/editorial-looks/baroque-pearl-drop-diamond-flora-model.jpg',
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
    coverImage: '/editorial-looks/imperial-emerald-pearl-choker.jpg',
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
    coverImage: '/editorial-looks/canary-butterfly-pendant-model.jpg',
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
    coverImage: '/editorial-looks/pink-sapphire-halo-pendant.jpg',
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
    coverImage: '/banners/the-occasionwear-edit.jpg',
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
    coverImage: '/banners/the-statement-jewellery-edit.jpg',
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
