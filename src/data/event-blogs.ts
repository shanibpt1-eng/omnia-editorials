export interface EventBlogProduct {
  id: string;
  nameEn: string;
  nameAr: string;
  priceAed: number;
  priceSar: number;
  originalPriceAed: number;
  originalPriceSar: number;
  discountPercentage: number;
  image: string;
  productUrl: string;
  sku: string;
  metal: string;
  gem: string;
  tagEn?: string;
  tagAr?: string;
  badgeEn?: string;
  badgeAr?: string;
  descEn?: string;
  descAr?: string;
  highlightsEn?: string[];
  highlightsAr?: string[];
}

export interface EventBlogFaq {
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
}

export interface EventBlogDetail {
  id: string;
  slug: string;
  eyebrowEn: string;
  eyebrowAr: string;
  titleEn: string;
  titleAr: string;
  standfirstEn: string;
  standfirstAr: string;
  authorEn: string;
  authorAr: string;
  dateEn: string;
  dateAr: string;
  readTimeEn: string;
  readTimeAr: string;
  audioDuration: string;
  coverImage: string;
  promoTagEn: string;
  promoTagAr: string;
  canonicalStoreUrl: string;
  collectionNameEn: string;
  collectionNameAr: string;
  publication: string;
  leadQuoteEn: string;
  leadQuoteAr: string;
  section1TitleEn: string;
  section1TitleAr: string;
  section1BodyEn: string;
  section1BodyAr: string;
  section2TitleEn: string;
  section2TitleAr: string;
  section2BodyEn: string;
  section2BodyAr: string;
  section3TitleEn: string;
  section3TitleAr: string;
  section3BodyEn: string;
  section3BodyAr: string;
  videoSrc?: string;
  videoTitleEn?: string;
  videoTitleAr?: string;
  videoBadgeEn?: string;
  videoBadgeAr?: string;
  videoCtaUrl?: string;
  videoCtaTextEn?: string;
  videoCtaTextAr?: string;
  featuredProducts: EventBlogProduct[];
  faqs: EventBlogFaq[];
  editorialBacklinks: {
    titleEn: string;
    titleAr: string;
    url: string;
    badgeEn: string;
    badgeAr: string;
  }[];
}

export const EVENT_BLOGS_DATA: EventBlogDetail[] = [
  {
    id: 'art-event-the-main-event-2026',
    slug: 'omnia-stores-main-event-luxury-jewellery-collections-uae',
    eyebrowEn: 'THE MAIN EVENT / SOVEREIGN GALA EDITORIAL / DUBAI & GCC',
    eyebrowAr: 'الحدث الرئيسي / افتتاحية الغالا الملكية / دبي والخليج',
    titleEn: 'The Main Event: Omnia Stores Unveils Sovereign Gala Collections & Exclusive Jewellery Offers',
    titleAr: 'الحدث الرئيسي: أمنية ستورز تكشف عن تشكيلات الغالا الملكية وعروض المجوهرات الحصرية',
    standfirstEn: 'Omnia Stores headlines The Main Event: An exclusive high-jewellery showcase spotlighting marquise floral parures, certified 925 sterling silver bridal collarets, and direct boutique shopping across the UAE and GCC. This comprehensive editorial pairs gala styling advice with direct links to the official jewellery catalogue.',
    standfirstAr: 'تتصدر أمنية ستورز الحدث الرئيسي: عرض حصري للمجوهرات الراقية يسلّط الضوء على أطقم الأزهار الماركيز المرصعة بمحاكاة الألماس الفاخر والفضة عيار 925 المعتمدة مع روابط مباشرة لمتجر omniastores.com وخدمة التوصيل السريع والتقسيط عبر تابي.',
    authorEn: 'Omnia Stores Editorial Studio & Gemological Research Desk',
    authorAr: 'استوديو أمنية ستورز التحريري ومكتب الأبحاث الجيمولوجية',
    dateEn: 'Prepared 12 November 2026',
    dateAr: 'أُعد في ١٢ نوفمبر ٢٠٢٦',
    readTimeEn: '5 min read',
    readTimeAr: '5 دقائق قراءة',
    audioDuration: '3:45',
    coverImage: '/events/main-event-luxury-gala.jpg',
    promoTagEn: 'THE MAIN EVENT • EXCLUSIVE OFFERS',
    promoTagAr: 'الحدث الرئيسي • عروض حصرية',
    canonicalStoreUrl: 'https://omniastores.com/collections/sets',
    collectionNameEn: 'Gala & Bridal Sets',
    collectionNameAr: 'أطقم الغالا والعرائس',
    publication: 'Vogue Arabia Special Edition',
    leadQuoteEn: '“The Main Event celebrates sovereign femininity, marrying architectural marquise geometry with pristine certified 925 sterling silver that commands attention at prestigious GCC galas.”',
    leadQuoteAr: '“يحتفي الحدث الرئيسي بالأنوثة السيادية الراقية، جامعاً بين الهندسة المعمارية لأحجار الماركيز والفضة الإسترلينية عيار 925 المعتمدة لتلفت الأنظار في كبرى مناسبات الخليج.”',
    section1TitleEn: 'Sovereign Haute Joaillerie & Architectural Brilliance',
    section1TitleAr: 'المجوهرات الراقية السيادية والبريق الهندسي الأخّاذ',
    section1BodyEn: `The Main Event marks the definitive luxury calendar moment of the season for Omnia Stores. Curated specifically for lavish grand galas, royal weddings, and evening banquets across Dubai, Abu Dhabi, and Riyadh, this collection revolves around precision-cut marquise floral clusters set in heavy solid 925 sterling silver with mirror rhodium plating. 

Each piece in the collection has undergone stringent X-Ray Fluorescence (XRF) spectrometry assay testing at Dubai Central Laboratories (DCL), ensuring an absolute 92.5% elemental silver base that resists tarnishing even under coastal Gulf humidity. Readers looking to explore the complete catalog can visit the official [Omnia Stores Bridal Sets](https://omniastores.com/collections/bridal-collection) storefront for immediate white-glove courier dispatch.`,
    section1BodyAr: `يمثل الحدث الرئيسي محطة الفخامة الأبرز لهذا الموسم لدى دار أمنية ستورز. صُممت هذه التشكيلة خصيصاً لحفلات السهرة الملكية والأعراس الكبرى في دبي وأبوظبي والرياض، متمحورة حول عناقيد أزهار الماركيز الدقيقة المصاغة من الفضة الإسترلينية الخالصة عيار 925 المطلية بطبقة الروديوم العاكس كالمرايا.

خضعت جميع قطع التشكيلة لفحوصات طيف الأشعة السينية (XRF) المعتمدة لدى مختبر دبي المركزي، مما يضمن نقاء الفضة بنسبة 92.5% ومقاومتها التامة للأكسدة حتى في الرطوبة الساحلية. يمكن للمتسوقين استعراض المجموعة الكاملة عبر [مجموعة أطقم العرائس من أمنية ستورز](https://omniastores.com/collections/bridal-collection).`,
    section2TitleEn: 'Neckline Pairing & Red Carpet Styling Protocols',
    section2TitleAr: 'تنسيق القلائد مع خطوط الياقات وبروتوكول السجادة الحمراء',
    section2BodyEn: `High jewellery stylists recommend pairing the multi-tiered floral collaret with plunging sweetheart or strapless architectural silk gowns. The organic cascade naturally draws the gaze towards the collarbones, while the matching drop earrings provide fluid movement that frames the jawline. 

For gala attendees who prefer modern minimalism, pairing an individual statement piece like the [Omnia 925 Silver Chokers](https://omniastores.com/collections/chokers-collection) with tailored evening velvet blazers creates an effortlessly sharp silhouette that bridges traditional Gulf heritage and contemporary high fashion.`,
    section2BodyAr: `يوصي خبراء الأزياء الراقية بتنسيق القلادة الزهرية متعددة المستويات مع فساتين السهرة الحريرية ذات الياقات المفتوحة أو المكشوفة الكتفين. يبرز انسياب العقد المتدرج جمال الرقبة والترقوة، بينما تمنح الأقراط المتدلية المتطابقة حركة متناغمة تؤطر ملامح الوجه بجاذبية ملكية.

أما لعشاق البساطة العصرية، فإن تنسيق قطعة منفردة مثل [تشوكرات الفضة عيار 925](https://omniastores.com/collections/chokers-collection) مع بليزر مخملي فاخر يخلق إطلالة حادة وأنيقة تجمع بين التراث الخليجي والموضة العالمية.`,
    section3TitleEn: 'Certified Lab Assays & Tabby Split Payment Flexibility',
    section3TitleAr: 'شهادات الفحص المخبري المعتمدة وتسهيلات التقسيط عبر تابي',
    section3BodyEn: `Omnia Stores eliminates the traditional barriers to owning genuine high jewellery. Every single parure arrives secured in an emerald-green embossed velvet chest containing the serialized assay certificate and care guidelines. 

Furthermore, GCC shoppers can split their purchases into 4 interest-free installments via Tabby at checkout, with zero added fees. Orders placed in Dubai, Sharjah, and Abu Dhabi qualify for guaranteed same-day or 24-hour express courier delivery. Direct orders are available now on [omniastores.com](https://omniastores.com).`,
    section3BodyAr: `تزيل أمنية ستورز العوائق التقليدية لامتلاك المجوهرات الراقية. تصل كل مجموعة مغلفة بعناية فائقة في صندوق مخملي فاخر يحمل شهادة الفحص المخبري التسلسلية وإرشادات العناية.

إضافة إلى ذلك، يمكن لعملاء الخليج تقسيط مشترياتهم على 4 دفعات بدون فوائد أو رسوم عبر تابي، مع توصيل سريع خلال 24 ساعة في دبي وأبوظبي. يمكنك الطلب الفوري عبر [المتجر الرسمي omniastores.com](https://omniastores.com).`,
    videoSrc: '/advertising/11-11-marketing-campaign.mp4',
    videoTitleEn: 'The Main Event Official Gala Runway Film',
    videoTitleAr: 'فيلم منصة العرض الرسمي لفعالية الحدث الرئيسي',
    videoBadgeEn: 'Main Event Runway Gala',
    videoBadgeAr: 'غالا الحدث الرئيسي',
    videoCtaUrl: 'https://omniastores.com/collections/sets',
    videoCtaTextEn: 'SHOP GALA SUITES ↗',
    videoCtaTextAr: 'تسوق أطقم الغالا ↗',
    featuredProducts: [
      {
        id: 'prod-main-event-pearl-cascade',
        nameEn: 'The Royal Empress Pearl Cascade & Pavé Diamond Bow',
        nameAr: 'طقم إمبراطورة اللؤلؤ الباروكي المتدفق وفيونكة الألماس',
        tagEn: 'HAUTE COUTURE PEARL SUITE',
        tagAr: 'طقم اللؤلؤ الإمبراطوري الفاخر',
        badgeEn: 'EXCLUSIVE RUNWAY MASTERPIECE',
        badgeAr: 'قطعة حصرية من منصة العرض',
        descEn: 'Hand-selected baroque freshwater pearls cascading into an articulated pavé simulated diamond bow brooch with matching waterfall earrings.',
        descAr: 'حبات لؤلؤ المياه العذبة الباروكية النقية المتدفقة في فيونكة مرصعة بألماس المحاكاة الفاخر مع أقراط الشلال المتدلية المطابقة.',
        priceAed: 1450,
        priceSar: 1480,
        originalPriceAed: 2450,
        originalPriceSar: 2490,
        discountPercentage: 40,
        image: '/advertising/pearl-cascade-couture-ad.jpg',
        productUrl: 'https://omniastores.com/collections/necklaces',
        sku: 'OMN-PRL-01',
        metal: 'Solid 925 Sterling Silver • Anti-Tarnish Rhodium Barrier',
        gem: 'Grade-AAA Baroque Freshwater Pearls & 5A Pavé Diamonds',
        highlightsEn: [
          'Solid 925 Sterling Silver core with electrolytic anti-tarnish rhodium barrier',
          'Lustrous Grade-AAA hand-threaded Arabian Gulf & Mediterranean pearl drop tassels',
          'Micro-claw pavé setting with maximum diamond dispersion and zero-glue architecture',
          'Guaranteed 24-hour express courier delivery across Dubai, Abu Dhabi, & GCC'
        ],
        highlightsAr: [
          'فضة إسترلينية أصلية عيار 925 مع طبقة روديوم كهربائية عازلة للأكسدة والرطوبة',
          'لؤلؤ طبيعي فائق البريق منتقى يدوياً بجودة AAA مع شراشيب متدفقة ساحرة',
          'ترصيع إيطالي بالمخالب الدقيقة لأحجار محاكاة الألماس بدون أي مواد لاصقة',
          'توصيل سريع ومضمون خلال 24 ساعة في دبي وأبوظبي وكافة دول الخليج'
        ]
      },
      {
        id: 'prod-main-event-chevron-diamond',
        nameEn: 'The Sovereign Chevron Diamond Collar & Winged Earrings',
        nameAr: 'طوق الشيفون الملكي المزدوج وأقراط الأجنحة المتلألئة',
        tagEn: 'SOVEREIGN HIGH JEWELLERY',
        tagAr: 'مجوهرات السيادة الراقية',
        badgeEn: 'ROYAL GALA EDITION',
        badgeAr: 'طبعة حفلات الغالا الملكية',
        descEn: 'Double-tier articulated chevron diamond choker designed with an ergonomic open-collar tension frame, paired with sculptural winged chandelier ear crawlers.',
        descAr: 'طوق شيفون مزدوج مرصع بألماس محاكاة فائق البريق بتصميم مفتوح ومريح، متناغم مع أقراط الأجنحة المتدلية الساحرة.',
        priceAed: 1850,
        priceSar: 1890,
        originalPriceAed: 3100,
        originalPriceSar: 3150,
        discountPercentage: 40,
        image: '/advertising/chevron-diamond-sovereign-ad.jpg',
        productUrl: 'https://omniastores.com/collections/bridal-collection',
        sku: 'OMN-CHV-02',
        metal: 'Precious Solid 925 Silver • 100% Nickel & Lead Free',
        gem: 'High-Refractive Simulated Diamonds (RI 2.65)',
        highlightsEn: [
          'High-refractive simulated diamonds (RI 2.65) cut to ideal round and pear proportions',
          'Flexible anatomical open-choker setting that rests naturally against the collarbone',
          'Hypoallergenic, 100% nickel-free and lead-free precious silver construction',
          'Delivered in an Omnia Stores signature velvet presentation case with authenticity dossier'
        ],
        highlightsAr: [
          'أحجار محاكاة الألماس ذات معامل انكسار ضوئي 2.65 بقطع كمثري ودائري مثالي',
          'هيكل طوق مفتوح مصمم هندسياً ليستقر بمرونة وانسيابية على عظام الترقوة',
          'مضاد تماماً للحساسية وخالٍ 100% من النيكل والرصاص المسبب لتصبغ البشرة',
          'يصل في علبة مخملية فاخرة مع ملف شهادة الفحص والأصالة المعتمدة'
        ]
      }
    ],
    faqs: [
      {
        questionEn: 'What makes The Main Event collection at Omnia Stores unique?',
        questionAr: 'ما الذي يجعل تشكيلة الحدث الرئيسي لدى أمنية ستورز فريدة من نوعها؟',
        answerEn: 'The Main Event collection features high-jewellery grade 5A simulated diamonds with exceptional optical dispersion, hand-set into solid 925 sterling silver protected with genuine electrolytic rhodium. Every piece is certified by Dubai Central Laboratories standards.',
        answerAr: 'تتميز التشكيلة بأحجار محاكاة الألماس درجة 5A ذات تشتت بصري مذهل، مرصعة يدوياً في فضة إسترلينية 925 ومحمية بالروديوم الحقيقي، مع شهادات فحص معتمدة من مختبر دبي المركزي.'
      },
      {
        questionEn: 'How fast is delivery across Dubai, Abu Dhabi, and Saudi Arabia?',
        questionAr: 'كم تبلغ مدة التوصيل في دبي وأبوظبي والمملكة العربية السعودية؟',
        answerEn: 'Orders in Dubai and Sharjah arrive within 24 hours. Deliveries across Abu Dhabi, Riyadh, Jeddah, and other GCC capitals arrive within 2 to 3 business days via insured express couriers.',
        answerAr: 'يتم تسليم الطلبات داخل دبي والشارقة خلال 24 ساعة، وتصل الطلبات إلى أبوظبي والرياض وجدة ومختلف مدن الخليج خلال 2 إلى 3 أيام عمل عبر شحن سريع ومؤمن.'
      },
      {
        questionEn: 'Can I split my payment across installments?',
        questionAr: 'هل يمكنني تقسيط قيمة المجوهرات على دفعات؟',
        answerEn: 'Yes. Omnia Stores partners with Tabby, allowing you to split your order total into 4 equal interest-free monthly payments directly at checkout.',
        answerAr: 'نعم، تتيح أمنية ستورز الدفع بالتقسيط على 4 دفعات شهرية ميسرة بدون فوائد أو رسوم خفية عبر خدمة تابي.'
      }
    ],
    editorialBacklinks: [
      {
        titleEn: 'Omnia Stores Full Jewellery Sets Catalogue',
        titleAr: 'كتالوج أطقم مجوهرات أمنية ستورز الكامل',
        url: 'https://omniastores.com/collections/sets',
        badgeEn: 'Full Suites',
        badgeAr: 'أطقم متكاملة'
      },
      {
        titleEn: 'Certified 925 Silver Bridal Collections',
        titleAr: 'مجموعات العرائس من الفضة الإسترلينية 925',
        url: 'https://omniastores.com/collections/bridal-collection',
        badgeEn: 'Bridal Masterpieces',
        badgeAr: 'روائع العرائس'
      },
      {
        titleEn: 'Discounted Items & Special Event Offers',
        titleAr: 'التخفيضات والعروض الحصرية للفعاليات',
        url: 'https://omniastores.com/collections/discounted-items',
        badgeEn: 'Limited Offers',
        badgeAr: 'عروض محدودة'
      }
    ]
  },
  {
    id: 'art-event-new-year-sale-2027',
    slug: 'new-year-sale-2027-welcome-elegance-omnia-stores-dubai',
    eyebrowEn: 'NEW YEAR 2027 / HAUTE HORLOGERIE & GALA SOIRÉE / DUBAI & RIYADH',
    eyebrowAr: 'رأس السنة 2027 / سهرات الغالا الفاخرة / دبي والرياض',
    titleEn: 'New Year Sale 2027: Welcome 2027 with Elegance & Up to 50% Off Gala Jewellery in Dubai & GCC',
    titleAr: 'تخفيضات رأس السنة 2027: استقبل عام 2027 بأناقة وخصومات تصل إلى 50% على مجوهرات السهرة الفاخرة',
    standfirstEn: 'Ring in the New Year with monumental brilliance: Omnia Stores announces the official New Year Sale 2027 offering up to 50% off cascading chandelier collarets, certified 925 silver cocktail rings, and midnight diamond suites across the UAE, Saudi Arabia, and Kuwait.',
    standfirstAr: 'استقبل العام الجديد ببريق ملكي استثنائي: أمنية ستورز تعلن رسمياً عن تخفيضات رأس السنة 2027 بخصم يصل إلى 50% على أطواق الثريا المتدفقة وخواتم الكوكتيل الفضية عيار 925 المعتمدة مع روابط مباشرة للشراء الفوري.',
    authorEn: 'Omnia Stores Haute Joaillerie Bureau',
    authorAr: 'مكتب المجوهرات الراقية بأمنية ستورز',
    dateEn: 'Prepared 28 December 2026',
    dateAr: 'أُعد في ٢٨ ديسمبر ٢٠٢٦',
    readTimeEn: '5 min read',
    readTimeAr: '5 دقائق قراءة',
    audioDuration: '4:10',
    coverImage: '/events/new-year-sale-2027-event.jpg',
    promoTagEn: 'NEW YEAR 2027 • UP TO 50% OFF',
    promoTagAr: 'رأس السنة 2027 • خصم حتى 50%',
    canonicalStoreUrl: 'https://omniastores.com/collections/discounted-items',
    collectionNameEn: 'New Year Discounted Items',
    collectionNameAr: 'تخفيضات رأس السنة الحصرية',
    publication: 'Khaleej Times Special Preview',
    leadQuoteEn: '“Welcoming 2027 demands jewellery that mirrors the fireworks of Burj Khalifa — cascading tiers of white fire diamond simulation that catch every candlelight angle.”',
    leadQuoteAr: '“استقبال عام 2027 يتطلب مجوهرات تعكس أضواء ألعاب برج خليفة — شلالات من بريق الألماس الأبيض المتدفق تلتقط النور من كل زاوية.”',
    section1TitleEn: 'Welcoming 2027: Fireworks of Light & Chandelier Cascades',
    section1TitleAr: 'استقبال 2027: بريق النور وشلالات الثريا الاحتفالية',
    section1BodyEn: `New Year’s Eve in Dubai and Riyadh is recognized worldwide as the ultimate summit of gala glamour. To celebrate this transition, Omnia Stores has launched its New Year 2027 campaign with reductions of up to 50% on signature gala collarets. 

Designed with articulated links that drape fluidly over the decolletage, these parures mimic the finest platinum estate creations. Discover the complete range of [Omnia Discounted Items](https://omniastores.com/collections/discounted-items) before inventory sells out for holiday galas.`,
    section1BodyAr: `تعتبر ليلة رأس السنة في دبي والرياض قمة احتفالات الموضة والأناقة العالمية. واحتفاءً بهذه المناسبة، أطلقت أمنية ستورز حملة رأس السنة 2027 بخصومات تصل إلى 50% على أشهر أطواق السهرة.

تتميز القطع بحلقات مفصلية مرنة تنساب بسلاسة فوق الرقبة، لتحاكي أثمن إبداعات البلاتين العالمية. تصفحي [عروض التخفيضات في أمنية ستورز](https://omniastores.com/collections/discounted-items) قبل نفاد الكميات المخصصة للموسم.`,
    section2TitleEn: 'Cocktail Hour & Midnight Gown Pairing',
    section2TitleAr: 'تنسيق مجوهرات ساعات السهرة وفساتين منتصف الليل',
    section2BodyEn: `Whether attending an opulent gala ballroom at the Burj Al Arab or an intimate rooftop soirée in Riyadh’s Diplomatic Quarter, midnight velvet gowns require high-contrast radiance. A multi-row collar paired with matching drop earrings from the [Omnia Stores Sets](https://omniastores.com/collections/sets) collection provides breathtaking visual balance.`,
    section2BodyAr: `سواء كنتِ تحضرين حفلاً باذخاً في برج العرب أو سهرة راقية في الحي الدبلوماسي بالرياض، فإن فساتين المخمل الأسود والداكن تحتاج إلى بريق فائق التباين. يمنحك طوق السهرة متعدد الصفوف المقترن بالأقراط المتطابقة من [مجموعة أطقم أمنية ستورز](https://omniastores.com/collections/sets) توازناً ساحراً.`,
    section3TitleEn: 'Safe Holiday Courier Delivery Guarantee',
    section3TitleAr: 'ضمان التوصيل السريع والمؤمن للأعياد',
    section3BodyEn: `With holiday festivities approaching, delivery precision is critical. Omnia Stores maintains dedicated logistics hubs in Dubai and Riyadh, guaranteeing that your New Year parure arrives in mint presentation packaging well ahead of December 31st. Visit [omniastores.com](https://omniastores.com) to lock in holiday promotional pricing.`,
    section3BodyAr: `مع اقتراب احتفالات نهاية العام، تشكل دقة التوصيل عاملاً حاسماً. توفر أمنية ستورز مراكز لوجستية متطورة في دبي والرياض، تضمن وصول مجوهرات رأس السنة بعلبها الفاخرة في وقت كافٍ قبل 31 ديسمبر عبر [omniastores.com](https://omniastores.com).`,
    featuredProducts: [
      {
        id: 'prod-ny-geometric-pearl',
        nameEn: 'The Royal Sovereign Geometric Diamond Collar & South Sea Pearl',
        nameAr: 'طوق السيادة الملكي الهندسي المرصع بالألماس ولؤلؤة بحر الجنوب',
        tagEn: 'AVANT-GARDE ARCHITECTURAL JEWELLERY',
        tagAr: 'مجوهرات معمارية هندسية مبتكرة',
        badgeEn: 'NEW YEAR 2027 RED CARPET HIGHLIGHT',
        badgeAr: 'نجمة السجادة الحمراء لرأس السنة 2027',
        descEn: 'Articulated openwork geometric collar featuring repeating chevron and pavé motifs, suspending a lustrous 14mm simulated South Sea pearl drop with matching earrings.',
        descAr: 'طوق هندسي مفرغ بتصميم شيفرون بافيه متكرر يعانق الرقبة بأناقة، تتدلى منه لؤلؤة بحر الجنوب الفاخرة بقطر 14 مم مع أقراط مطابقة.',
        priceAed: 1750,
        priceSar: 1785,
        originalPriceAed: 2950,
        originalPriceSar: 3009,
        discountPercentage: 40,
        image: '/editorial-looks/geometric-diamond-south-sea-pearl.jpg',
        productUrl: 'https://omniastores.com/collections/bridal-collection',
        sku: 'OMN-GEO-07',
        metal: 'Solid 925 Sterling Silver • Engineered Anatomical Frame',
        gem: '14mm Lustrous South Sea Pearl & 5A Pavé Diamonds',
        highlightsEn: [
          'Solid 925 Sterling Silver frame engineered for ergonomic neck contouring',
          'High-density micro-claw pavé diamonds with zero adhesive architecture',
          'Flawless 14mm teardrop pearl with deep orient and satin surface quality',
          'Express same-day courier dispatch in Dubai and Abu Dhabi with Tabby 4 Pay'
        ],
        highlightsAr: [
          'هيكل فضة إسترلينية 925 مصمم هندسياً ليستقر بمرونة على الرقبة',
          'ترصيع بافيه عالي الكثافة لألماس المحاكاة بدون أي غراء أو مواد لاصقة',
          'لؤلؤة كمثرية نقية مقاس 14 مم ببريق ساتاني عميق يأسر القلوب',
          'شحن سريع في نفس اليوم بدبي وأبوظبي مع تقسيط مريح عبر تابي'
        ]
      },
      {
        id: 'prod-ny-pearl-cascade',
        nameEn: 'The Royal Empress Pearl Cascade & Pavé Diamond Bow',
        nameAr: 'طقم إمبراطورة اللؤلؤ الباروكي المتدفق وفيونكة الألماس',
        tagEn: 'HAUTE COUTURE PEARL SUITE',
        tagAr: 'طقم اللؤلؤ الإمبراطوري الفاخر',
        badgeEn: 'EXCLUSIVE RUNWAY MASTERPIECE',
        badgeAr: 'قطعة حصرية من منصة العرض',
        descEn: 'Hand-selected baroque freshwater pearls cascading into an articulated pavé simulated diamond bow brooch with matching waterfall earrings.',
        descAr: 'حبات لؤلؤ المياه العذبة الباروكية النقية المتدفقة في فيونكة مرصعة بألماس المحاكاة الفاخر مع أقراط الشلال المتدلية المطابقة.',
        priceAed: 1450,
        priceSar: 1480,
        originalPriceAed: 2450,
        originalPriceSar: 2490,
        discountPercentage: 40,
        image: '/advertising/pearl-cascade-couture-ad.jpg',
        productUrl: 'https://omniastores.com/collections/necklaces',
        sku: 'OMN-PRL-NY27',
        metal: 'Solid 925 Sterling Silver • Anti-Tarnish Rhodium Barrier',
        gem: 'Grade-AAA Baroque Freshwater Pearls & 5A Pavé Diamonds',
        highlightsEn: [
          'Solid 925 Sterling Silver core with electrolytic anti-tarnish rhodium barrier',
          'Lustrous Grade-AAA hand-threaded Arabian Gulf & Mediterranean pearl drop tassels',
          'Micro-claw pavé setting with maximum diamond dispersion and zero-glue architecture',
          'Guaranteed 24-hour express courier delivery across Dubai, Abu Dhabi, & GCC'
        ],
        highlightsAr: [
          'فضة إسترلينية أصلية عيار 925 مع طبقة روديوم كهربائية عازلة للأكسدة والرطوبة',
          'لؤلؤ طبيعي فائق البريق منتقى يدوياً بجودة AAA مع شراشيب متدفقة ساحرة',
          'ترصيع إيطالي بالمخالب الدقيقة لأحجار محاكاة الألماس بدون أي مواد لاصقة',
          'توصيل سريع ومضمون خلال 24 ساعة في دبي وأبوظبي وكافة دول الخليج'
        ]
      }
    ],
    faqs: [
      {
        questionEn: 'Are New Year 2027 sale items covered by warranty?',
        questionAr: 'هل تشمل عروض رأس السنة 2027 الضمان الرسمي؟',
        answerEn: 'Yes. All discounted items sold during the New Year 2027 promotion include our full 1-year metal and setting warranty and official DCL hallmark certificates.',
        answerAr: 'نعم، تشمل جميع القطع المخفضة ضمن عروض رأس السنة 2027 ضماناً كاملاً لمدة عام على الفضة والترصيع مع شهادات الاعتماد الرسمية.'
      }
    ],
    editorialBacklinks: [
      {
        titleEn: 'Omnia Stores New Year Discounted Vault',
        titleAr: 'قسم التخفيضات الكبرى لرأس السنة',
        url: 'https://omniastores.com/collections/discounted-items',
        badgeEn: '50% Off',
        badgeAr: 'خصم 50%'
      },
      {
        titleEn: 'Evening & Gala Sets Collection',
        titleAr: 'مجموعة أطقم السهرة والغالا',
        url: 'https://omniastores.com/collections/sets',
        badgeEn: 'Gala Suites',
        badgeAr: 'أطقم سهرة'
      }
    ]
  },
  {
    id: 'art-event-christmas-sale-2026',
    slug: 'christmas-sale-holiday-jewelry-gifting-omnia-stores-gcc',
    eyebrowEn: 'FESTIVE HOLIDAY EDITORIAL / CHRISTMAS SALE / GCC & WORLDWIDE',
    eyebrowAr: 'افتتاحية موسم الأعياد / تخفيضات الكريسماس / الخليج والعالم',
    titleEn: 'Christmas Sale: Festive Holiday Glamour & Exclusive Jewellery Offers Up to 40% Off',
    titleAr: 'تخفيضات الكريسماس: بريق الأعياد الاستثنائي وعروض حصرية تصل إلى 40% على مجوهرات الفضة الفاخرة',
    standfirstEn: 'Omnia Stores unveils the official Christmas Holiday Jewellery Sale with up to 40% off multi-tiered fringe cascade parures, certified 925 sterling silver suites, and signature gift packaging for loved ones across Dubai, Abu Dhabi, Doha, and global destinations.',
    standfirstAr: 'تكشف أمنية ستورز عن عروض الكريسماس والأعياد الحصرية بخصم يصل إلى 40% على أطقم الشلالات الهامشية المتدرجة والفضة عيار 925 مع علب الهدايا المخملية وخدمة التوصيل السريع خلال 24 ساعة.',
    authorEn: 'Omnia Stores Holiday Gifting Desk',
    authorAr: 'مكتب هدايا الأعياد بأمنية ستورز',
    dateEn: 'Prepared 15 December 2026',
    dateAr: 'أُعد في ١٥ ديسمبر ٢٠٢٦',
    readTimeEn: '5 min read',
    readTimeAr: '5 دقائق قراءة',
    audioDuration: '3:55',
    coverImage: '/events/christmas-sale-holiday-event.jpg',
    promoTagEn: 'CHRISTMAS SALE • UP TO 40% OFF',
    promoTagAr: 'عروض الكريسماس • خصم حتى 40%',
    canonicalStoreUrl: 'https://omniastores.com/collections/sets',
    collectionNameEn: 'Festive Holiday Suites',
    collectionNameAr: 'أطقم الأعياد الفاخرة',
    publication: "Harper's Bazaar Arabia Festive Edition",
    leadQuoteEn: '“The Christmas holiday parure reimagines festive cheer into timeless heirlooms — fringe collarets that dance with light and celebrate love.”',
    leadQuoteAr: '“تعيد أطقم الأعياد صياغة بهجة الاحتفالات إلى قطع مقتنيات أبدية — قلائد هامشية تتراقص مع الضوء وتحتفي بمشاعر الود.”',
    section1TitleEn: 'The Art of Festive Gifting: Shimmering Cascade Parures',
    section1TitleAr: 'فن إهداء الأعياد: أطقم الشلالات البراقة الساحرة',
    section1BodyEn: `Selecting the ideal festive holiday gift requires timeless sentiment combined with flawless craftsmanship. Omnia Stores presents its curated Christmas Sale featuring multi-tier fringe cascade necklaces with matching drop earrings and tennis bracelets at up to 40% off. 

Every set is crafted from certified 925 silver and rhodium electroplated to ensure hypoallergenic wear and brilliant sparkle. Explore [Omnia Stores Festive Sets](https://omniastores.com/collections/sets) to discover holiday treasures ready for gifting.`,
    section1BodyAr: `يتطلب اختيار هدية العيد المثالية مزيجاً من المشاعر الدافئة والحرفية المتقنة. تقدم أمنية ستورز عروض الكريسماس الحصرية على القلائد الهامشية المتدرجة والأساور المتطابقة بخصومات تصل إلى 40%.

تُصاغ كل قطعة من الفضة عيار 925 المطلية بالروديوم لتكون آمنة على البشرة ومقاومة للحساسية مع بريق لا يخبو. تصفحي [أطقم أمنية ستورز للأعياد](https://omniastores.com/collections/sets) لاكتشاف هدايا الموسم.`,
    section2TitleEn: 'Festive Velvet Packaging & Complimentary Greeting Envelopes',
    section2TitleAr: 'علب الهدايا المخملية الفاخرة والبطاقات الترحيبية المجانية',
    section2BodyEn: `Holiday gifting at Omnia Stores is elevated by bespoke presentation: every Christmas purchase includes a festive emerald and gold velvet gift chest, satin ribbon wrapping, and personalized handwritten calligraphy cards upon request.`,
    section2BodyAr: `ترتقي تجربة الهدايا لدى أمنية ستورز بفضل التغليف الفاخر: يتضمن كل طلب علبة مخملية أنيقة بألوان الزمرد والذهب مع شرائط الساتان وبطاقة تهنئة مكتوبة بخط اليد عند الطلب.`,
    section3TitleEn: 'Global & Regional Holiday Courier Deadlines',
    section3TitleAr: 'مواعيد الشحن النهائية لموسم الأعياد',
    section3BodyEn: `To ensure on-time delivery under the tree, order by December 22 for UAE and GCC addresses, and December 18 for international destinations via DHL Express. Visit [omniastores.com](https://omniastores.com).`,
    section3BodyAr: `لضمان وصول الهدايا في الوقت المناسب، يُرجى تأكيد الطلب قبل 22 ديسمبر لدول الخليج وقبل 18 ديسمبر للطلبات الدولية عبر DHL Express من خلال [omniastores.com](https://omniastores.com).`,
    featuredProducts: [
      {
        id: 'prod-xmas-ruby-gala',
        nameEn: 'The Royal Crimson Ruby & Marquise Diamond Gala Suite',
        nameAr: 'طقم الياقوت القرمزي الملكي والماركيز الماسي لحفلات الغالا',
        tagEn: 'HAUTE JOAILLERIE RUBY SUITE',
        tagAr: 'طقم الياقوت الملكي الفاخر',
        badgeEn: 'ROYAL GALA RED CARPET EDITION',
        badgeAr: 'طبعة السجادة الحمراء لحفلات الغالا',
        descEn: 'Articulated cascading collar composed of graduated pigeon-blood simulated rubies bordered by precision-faceted marquise diamonds, with matching drop earrings and gala cuff.',
        descAr: 'طوق متدفق فاخر يتألف من أحجار ياقوت دم الحمام المحاكية المتدرجة والمحاطة بألماس الماركيز الدقيق، مع أقراط متدلية مطابقة وسوار عريض للسهرات.',
        priceAed: 1650,
        priceSar: 1683,
        originalPriceAed: 2750,
        originalPriceSar: 2805,
        discountPercentage: 40,
        image: '/editorial-looks/ruby-gala-parure.jpg',
        productUrl: 'https://omniastores.com/collections/sets',
        sku: 'OMN-RBY-01',
        metal: 'Certified 925 Sterling Silver • Rhodium Mirror Finish',
        gem: '5A Simulated Pigeon-Blood Rubies & Marquise Diamonds',
        highlightsEn: [
          'Solid 925 Sterling Silver hallmarked under Dubai Central Laboratory assay',
          'Precision-cut 5A simulated pigeon-blood rubies with vivid red saturation',
          'Anti-tarnish electrolytic mirror rhodium coating resistant to Gulf humidity',
          'Delivered in velvet boutique chest with serial certification & 24h courier'
        ],
        highlightsAr: [
          'فضة إسترلينية أصلية عيار 925 مختومة ومفحوصة لدى مختبر دبي المركزي',
          'أحجار ياقوت دم الحمام درجة 5A ذات لون أحمر قرمزي ملكي وبريق مشع',
          'طلاء روديوم عاكس كالمرايا معالج كيميائياً لمقاومة الرطوبة والأكسدة',
          'يصل في صندوق مخملي فاخر مع شهادة الفحص المعتمدة وتوصيل خلال 24 ساعة'
        ]
      },
      {
        id: 'prod-xmas-crimson-teardrop',
        nameEn: 'The Empress Teardrop Ruby & Solitaire Diamond Rivière',
        nameAr: 'عقد ريفيير الياقوت الإمبراطوري الكمثري وأقراط القطرة',
        tagEn: 'ROYAL RUBY RIVIÈRE',
        tagAr: 'طقم ريفيير الياقوت الملكي',
        badgeEn: 'LIMITED HOLIDAY EDITION',
        badgeAr: 'طبعة الأعياد المحدودة',
        descEn: 'Graduated teardrop simulated pigeon-blood rubies set in alternating bezel diamond links, culminating in a monumental pear-cut ruby focal pendant.',
        descAr: 'أحجار ياقوت كمثرية متدرجة ذات بريق أحمر ساحر تتناوب مع حلقات الألماس لتنتهي بحجر ياقوت كمثري ضخم متدفق.',
        priceAed: 1380,
        priceSar: 1408,
        originalPriceAed: 2300,
        originalPriceSar: 2346,
        discountPercentage: 40,
        image: '/editorial-looks/crimson-teardrop-ruby-suite.jpg',
        productUrl: 'https://omniastores.com/collections/sets',
        sku: 'OMN-RBY-04',
        metal: 'Certified 925 Silver • Electrolytic Rhodium Protective Barrier',
        gem: '5A Pear-Cut Simulated Rubies & Round Brilliant Diamonds',
        highlightsEn: [
          'Solid 925 Sterling Silver core with protective electrolytic rhodium barrier',
          'Flawless teardrop simulated rubies with intense optical clarity and brilliance',
          'Hypoallergenic, 100% lead and nickel-free certified precious construction',
          'Express courier fulfillment with insured delivery across UAE & Saudi Arabia'
        ],
        highlightsAr: [
          'هيكل فضة إسترلينية 925 مع طبقة روديوم كهربائية عازلة للأكسدة',
          'أحجار ياقوت كمثرية فائقة النقاء تمنحك إطلالة ملكية في المناسبات الكبرى',
          'خالٍ تماماً 100% من النيكل والرصاص المسبب لتحسس البشرة',
          'شحن سريع مؤمن وتوصيل مباشر خلال 24 ساعة في الإمارات والسعودية'
        ]
      }
    ],
    faqs: [
      {
        questionEn: 'Can I include a gift message with my order?',
        questionAr: 'هل يمكنني إرفاق رسالة إهداء خاصة مع طلبي؟',
        answerEn: 'Yes! Simply add your customized message during checkout on omniastores.com, and our studio will print or hand-scribe it on official stationery.',
        answerAr: 'نعم بكل تأكيد! يمكنك تدوين رسالتك الخاصة أثناء إتمام الطلب على الموقع وسيقوم استوديونا بكتابتها بخط أنيق داخل ظرف الإهداء.'
      }
    ],
    editorialBacklinks: [
      {
        titleEn: 'Shop Christmas Festive Jewellery Sets',
        titleAr: 'تسوق أطقم مجوهرات الكريسماس الفاخرة',
        url: 'https://omniastores.com/collections/sets',
        badgeEn: 'Holiday Edit',
        badgeAr: 'مختارات الأعياد'
      },
      {
        titleEn: 'Certified 925 Silver Collection',
        titleAr: 'تشكيلة الفضة عيار 925 المعتمدة',
        url: 'https://omniastores.com/collections/silver-sets',
        badgeEn: '925 Silver',
        badgeAr: 'فضة 925'
      }
    ]
  },
  {
    id: 'art-event-ramadan-sale-2027',
    slug: 'ramadan-sale-curated-festive-gathering-jewelry-omnia-stores',
    eyebrowEn: 'HOLY MONTH GATHERINGS / RAMADAN SALE / SUHOOR & IFTAR EDIT',
    eyebrowAr: 'لقاءات الشهر الفضيل / تخفيضات رمضان / مختارات السحور والإفطار',
    titleEn: 'Ramadan Sale: Elegance for Every Gathering — Curated Festive Picks Up to 35% Off at Omnia Stores',
    titleAr: 'تخفيضات رمضان: أناقة لكل سهرة ولقاء — مختارات رمضانية منتقاة بخصم يصل إلى 35% من أمنية ستورز',
    standfirstEn: 'Celebrate holy month gatherings and Suhoor galas with curated festive picks up to 35% off: crescent floral vine chokers, certified 925 silver parures, and bespoke gift packaging designed for modern modest elegance across the Gulf.',
    standfirstAr: 'احتفلي بسهرات الشهر الفضيل ولقاءات السحور العائلية مع مختارات رمضانية منتقاة بخصم يصل إلى 35% تشمل أطواق أزهار الهلال ومجوهرات الفضة عيار 925 المقاومة للأكسدة المصممة للأناقة المحتشمة الراقية.',
    authorEn: 'Omnia Stores Ramadan Heritage Studio',
    authorAr: 'استوديو التراث الرمضاني بأمنية ستورز',
    dateEn: 'Prepared 10 February 2027',
    dateAr: 'أُعد في ١٠ فبراير ٢٠٢٧',
    readTimeEn: '5 min read',
    readTimeAr: '5 دقائق قراءة',
    audioDuration: '4:20',
    coverImage: '/events/ramadan-sale-festive-event.jpg',
    promoTagEn: 'RAMADAN SALE • UP TO 35% OFF',
    promoTagAr: 'تخفيضات رمضان • خصم حتى 35%',
    canonicalStoreUrl: 'https://omniastores.com/collections/chokers-collection',
    collectionNameEn: 'Ramadan Chokers Collection',
    collectionNameAr: 'أطواق رمضان وتشوكرات السهرة',
    publication: 'Vogue Arabia Heritage Special',
    leadQuoteEn: '“Ramadan elegance celebrates cultural resonance — crescent curves and delicate botanical vine chokers that harmonize gracefully with embellished kaftans and abayas.”',
    leadQuoteAr: '“تتجسد أناقة رمضان في التناغم الثقافي الأصيل — منحنيات الأهلة وأطواق الأغصان الزهرية التي تتكامل بنعومة مع القفاطين والعبايات الفاخرة.”',
    section1TitleEn: 'Modest Glamour: The Suhoor & Iftar Jewellery Edit',
    section1TitleAr: 'الأناقة المحتشمة: تشكيلة مجوهرات السحور والإفطار',
    section1BodyEn: `Ramadan in the Arabian Peninsula is characterized by intimate family reunions, royal Suhoor tents, and cultural majlis evenings. Omnia Stores curates a Ramadan collection with up to 35% off crescent motifs, delicate pavé collars, and botanical motifs. 

These designs sit gracefully on high-neck abayas and embellished kaftans without snagging fine textiles. View the dedicated [Omnia Stores Ramadan Chokers](https://omniastores.com/collections/chokers-collection) selection.`,
    section1BodyAr: `تتميز سهرات شهر رمضان في الخليج العربي بالتجمعات العائلية الدافئة وخيم السحور والمجالس التراثية الراقية. تقدم أمنية ستورز تشكيلة رمضانية بخصم حتى 35% مستوحاة من أزهار الليل ومنحنيات الهلال.

صُممت القطع لتستقر بنعومة على ياقات العبايات والقفاطين المطرزة دون ملامسة الأقمشة الحساسة. استعرضي [مجموعة التشوكرات الرمضانية من أمنية ستورز](https://omniastores.com/collections/chokers-collection).`,
    section2TitleEn: 'Botanical Vines & Crescent Symmetry in 925 Silver',
    section2TitleAr: 'أغصان النباتات وتناظر الأهلة في فضة 925 المعتمدة',
    section2BodyEn: `Inspired by Islamic geometric symmetry and lush oasis flora, each piece incorporates certified 925 sterling silver with protective plating that prevents discoloration during extended evening celebrations. Pair with delicate studs from the [Omnia Stores Necklaces](https://omniastores.com/collections/necklaces) edit.`,
    section2BodyAr: `مستوحاة من التناظر الهندسي الإسلامي وطبيعة الواحات الغناء، صيغت كل قطعة من فضة 925 معتمدة ومطلية بطبقات حماية تمنع تغير اللون أثناء الأمسيات الرمضانية الطويلة، وتتناسق مع قلائد [أمنية ستورز للقلائد](https://omniastores.com/collections/necklaces).`,
    section3TitleEn: 'Ramadan Charity & Gifting Packaging',
    section3TitleAr: 'عطاء رمضان وتغليف الهدايا الرمضانية',
    section3BodyEn: `In the spirit of giving, every Ramadan order is packed in a midnight blue and gold presentation box. A portion of proceeds from the Ramadan collection supports regional educational initiatives. Order with Tabby on [omniastores.com](https://omniastores.com).`,
    section3BodyAr: `بروح العطاء والشهر الكريم، تُغلّف جميع الطلبات في علب زرقاء داكنة مزينة بنقوش ذهبية. يمكنك الطلب بالتقسيط عبر تابي من خلال [omniastores.com](https://omniastores.com).`,
    featuredProducts: [
      {
        id: 'prod-ram-baroque-pearl',
        nameEn: 'The Sovereign Baroque Pearl Drop & Diamond Flora Suite',
        nameAr: 'طقم لؤلؤ الباروك المتدلي مع زهرة الألماس الملكية',
        tagEn: 'NATURAL FRESHWATER PEARL SUITE',
        tagAr: 'طقم اللؤلؤ الطبيعي الفاخر',
        badgeEn: 'CERTIFIED 925 BRIDAL MASTERPIECE',
        badgeAr: 'تحفة العرائس المعتمدة من الفضة 925',
        descEn: 'Hand-selected baroque freshwater pearl pendant suspended from an articulated marquise diamond flower, paired with matching statement pearl drop earrings.',
        descAr: 'قطرة لؤلؤ مياه عذبة باروكية منتقاة يدوياً تتدلى من زهرة ألماس الماركيز المتلألئة، متناغمة مع أقراط لؤلؤ متدلية متطابقة.',
        priceAed: 1190,
        priceSar: 1214,
        originalPriceAed: 1980,
        originalPriceSar: 2020,
        discountPercentage: 40,
        image: '/editorial-looks/baroque-pearl-cascade.jpg',
        productUrl: 'https://omniastores.com/collections/pearl-sets',
        sku: 'OMN-BPRL-03',
        metal: 'Solid 925 Sterling Silver • Hypoallergenic Rhodium Plated',
        gem: 'Grade-AAA Baroque Freshwater Pearls & 5A Marquise Diamonds',
        highlightsEn: [
          'Grade-AAA lustrous hand-threaded baroque freshwater pearls with iridescent sheen',
          'Solid 925 Sterling Silver hallmarked under Dubai Central Laboratories (DCL)',
          'Micro-prong diamond cluster setting designed to capture and disperse ambient light',
          'Backed by Tabby 4 interest-free split payments and luxury gift packaging'
        ],
        highlightsAr: [
          'لؤلؤ باروكي طبيعي فائق البريق جودة AAA منتقى يدوياً بلون أبيض ناصع',
          'فضة إسترلينية أصلية عيار 925 معتمدة من مختبر دبي المركزي',
          'ترصيع عنقودي لألماس المحاكاة مصمم ليعكس الضوء بانعكاسات ساحرة',
          'متاح للتقسيط على 4 دفعات بدون فوائد عبر تابي مع تغليف هدايا فاخر'
        ]
      },
      {
        id: 'prod-ram-butterfly',
        nameEn: 'The Monarch Canary Yellow Pavé Diamond Butterfly Pendant',
        nameAr: 'قلادة الفراشة الماسية الصفراء بأحجار البافيه الكنارية',
        tagEn: 'WHIMSICAL NATURE HIGH JEWELLERY',
        tagAr: 'مجوهرات الطبيعة الساحرة الراقية',
        badgeEn: 'EXCLUSIVE SPRING RUNWAY EDITION',
        badgeAr: 'طبعة ربيع حصرية من منصة العرض',
        descEn: 'Dimensional butterfly silhouette pavé-set with canary yellow simulated sapphires and white brilliant-cut diamond accents on a delicate station chain.',
        descAr: 'تصميم فراشة ثلاثي الأبعاد مرصع بأحجار الياقوت الأصفر الكناري المحاكية مع لمسات من الألماس البافيه المتلألئ على سلسلة أنيقة.',
        priceAed: 690,
        priceSar: 704,
        originalPriceAed: 1150,
        originalPriceSar: 1173,
        discountPercentage: 40,
        image: '/editorial-looks/canary-butterfly-pendant.jpg',
        productUrl: 'https://omniastores.com/collections/necklaces',
        sku: 'OMN-BTF-RAM',
        metal: 'Solid 925 Sterling Silver • Dual 18K Yellow Gold & Rhodium Plating',
        gem: 'Simulated Canary Yellow Sapphires & Brilliant Diamonds',
        highlightsEn: [
          'Solid 925 Sterling Silver core with dual 18K yellow gold and rhodium immersion',
          'High-refractive simulated canary sapphires with micro-claw pavé setting',
          'Delicate adjustable cable chain accented with bezel-set solitaire diamonds',
          'Guaranteed 24-hour courier delivery across Dubai, Abu Dhabi & Riyadh'
        ],
        highlightsAr: [
          'هيكل من الفضة الإسترلينية 925 مع طلاء مزدوج بالذهب الأصفر عيار 18 والروديوم',
          'أحجار ياقوت كناري أصفر ذات بريق عالي وترصيع إيطالي بالمخالب الدقيقة',
          'سلسلة قابلة لتعديل الطول مزينة بألماسات محاكاة ذات إطار كلاسيكي فاخر',
          'توصيل سريع ومضمون خلال 24 ساعة في دبي وأبوظبي والرياض'
        ]
      }
    ],
    faqs: [
      {
        questionEn: 'Are the stones safe on delicate silk abayas?',
        questionAr: 'هل ترصيع الأحجار آمن ولا يتشابك مع حرير العبايات؟',
        answerEn: 'Yes. Omnia Stores uses micro-prong mirror settings that are hand-buffed to ensure a completely smooth reverse face that will not catch or pull delicate fabrics.',
        answerAr: 'نعم، تستخدم أمنية ستورز تقنية الترصيع الدقيق المصقولة يدوياً لضمان سطح خلفي فائق النعومة لا يتشابك إطلاقاً مع أقمشة الحرير والكتان.'
      }
    ],
    editorialBacklinks: [
      {
        titleEn: 'Ramadan Chokers & Necklaces Collection',
        titleAr: 'مجموعة أطواق وقلائد رمضان',
        url: 'https://omniastores.com/collections/chokers-collection',
        badgeEn: '35% Off',
        badgeAr: 'خصم 35%'
      },
      {
        titleEn: 'Delicate Pendants & Necklaces',
        titleAr: 'القلائد الناعمة وسلاسل الرقبة',
        url: 'https://omniastores.com/collections/necklaces',
        badgeEn: 'Necklaces',
        badgeAr: 'قلائد'
      }
    ]
  },
  {
    id: 'art-event-mothers-day-sale-2027',
    slug: 'mothers-day-sale-gift-her-elegance-omnia-stores-luxury',
    eyebrowEn: "ETERNAL MATERNAL GRATITUDE / MOTHER'S DAY SALE / HEIRLOOM GIFTING",
    eyebrowAr: 'وفاء الأمومة الأبدي / تخفيضات عيد الأم / هدايا المقتنيات الثمينة',
    titleEn: 'Mother’s Day Sale: Gift Her Elegance — Premium Picks She’ll Love Up to 30% Off',
    titleAr: 'تخفيضات عيد الأم: أهدِها الأناقة الملكية — اختيارات فاخرة ستعشقها بخصم يصل إلى 30%',
    standfirstEn: 'Honor her grace with heirloom-grade fine jewelry up to 30% off: rose-tinted pavé collarets, mother-of-pearl suites, and bespoke gift boxes with embossed certificates from Omnia Stores in Dubai and Riyadh.',
    standfirstAr: 'كرّم عطاءها بأرقى مجوهرات المقتنيات الثمينة بخصم يصل إلى 30% يشمل قلائد الورود المرصعة بالبافيه ومجموعات عرق اللؤلؤ الطبيعي بعلب هدايا مخملية فاخرة وشهادات موثقة من أمنية ستورز.',
    authorEn: 'Omnia Stores Maternal Gifting Bureau',
    authorAr: 'مكتب هدايا الأمومة بأمنية ستورز',
    dateEn: 'Prepared 10 March 2027',
    dateAr: 'أُعد في ١٠ مارس ٢٠٢٧',
    readTimeEn: '4 min read',
    readTimeAr: '4 دقائق قراءة',
    audioDuration: '3:30',
    coverImage: '/events/mothers-day-sale-gifting-event.jpg',
    promoTagEn: "MOTHER'S DAY • UP TO 30% OFF",
    promoTagAr: 'عيد الأم • خصم حتى 30%',
    canonicalStoreUrl: 'https://omniastores.com/collections/necklaces',
    collectionNameEn: 'Mother’s Day Necklaces & Pendants',
    collectionNameAr: 'قلائد وهدايا عيد الأم',
    publication: 'Gulf News Gifting Feature',
    leadQuoteEn: '“A mother’s love is the world’s most precious treasure; she deserves jewellery crafted with equal devotion and enduring brilliance.”',
    leadQuoteAr: '“حب الأم هو أثمن كنوز الوجود، وهي تستحق مجوهرات صيغت بنفس القدر من الإخلاص والبريق الخالد.”',
    section1TitleEn: 'Timeless Gratitude: Heirloom Pieces for Her Special Day',
    section1TitleAr: 'امتنان خالد: قطع مقتنيات ثمينة ليومها المميز',
    section1BodyEn: `Mother’s Day across the Middle East is a sacred celebration of selfless love. Omnia Stores curates a dedicated Mother’s Day sale offering up to 30% off floral medallions, natural mother-of-pearl suites, and timeless tennis necklaces. 

Every piece is designed to be cherished for generations, set in certified 925 sterling silver with a comfort-fit reverse face. Explore [Omnia Stores Mother’s Day Gifts](https://omniastores.com/collections/necklaces) for guaranteed delivery.`,
    section1BodyAr: `يمثل عيد الأم في الشرق الأوسط مناسبة مقدسة للاحتفاء بالحب والعطاء اللامحدود. تقدم أمنية ستورز تشكيلة عيد الأم بخصم يصل إلى 30% على قلائد الميداليات الزهرية وعرق اللؤلؤ وأساور التنس الكلاسيكية.

صيغت كل قطعة لتدوم عبر الأجيال في فضة إسترلينية 925 مريحة في الارتداء اليومي. تصفحي [هدايا عيد الأم من أمنية ستورز](https://omniastores.com/collections/necklaces).`,
    section2TitleEn: 'Personalized Engraving & Velvet Keepsake Chest',
    section2TitleAr: 'النقش المخصص وصندوق الذكريات المخملي',
    section2BodyEn: `Make her gift truly unique with complimentary laser engraving of initials or special dates on eligible medallion backs. Each order arrives housed in our plush blush-pink velvet keepsake chest.`,
    section2BodyAr: `اجعل هديتك فريدة من نوعها مع خدمة النقش بالليزر المجانية للأحرف الأولى أو التواريخ المميزة على ظهر القلائد المؤهلة، مع علبة هدايا مخملية بلون الورد الرقيق.`,
    section3TitleEn: 'Guaranteed On-Time Courier Delivery',
    section3TitleAr: 'توصيل سريع ومضمون في يوم الأم',
    section3BodyEn: `Never worry about last-minute delivery: enjoy 24-hour white-glove courier delivery in Dubai and express dispatch to Riyadh, Abu Dhabi, and Jeddah. Order now at [omniastores.com](https://omniastores.com).`,
    section3BodyAr: `لا داعي للقلق بشأن مواعيد التوصيل: تمتع بخدمة التوصيل خلال 24 ساعة في دبي والشحن السريع إلى الرياض وأبوظبي وجدة عبر [omniastores.com](https://omniastores.com).`,
    featuredProducts: [
      {
        id: 'prod-md-butterfly-pendant',
        nameEn: 'The Monarch Canary Yellow Pavé Diamond Butterfly Pendant',
        nameAr: 'قلادة الفراشة الماسية الصفراء بأحجار البافيه الكنارية',
        tagEn: 'WHIMSICAL NATURE HIGH JEWELLERY',
        tagAr: 'مجوهرات الطبيعة الساحرة الراقية',
        badgeEn: 'EXCLUSIVE SPRING RUNWAY EDITION',
        badgeAr: 'طبعة ربيع حصرية من منصة العرض',
        descEn: 'Dimensional butterfly silhouette pavé-set with canary yellow simulated sapphires and white brilliant-cut diamond accents on a delicate station chain.',
        descAr: 'تصميم فراشة ثلاثي الأبعاد مرصع بأحجار الياقوت الأصفر الكناري المحاكية مع لمسات من الألماس البافيه المتلألئ على سلسلة أنيقة.',
        priceAed: 690,
        priceSar: 704,
        originalPriceAed: 1150,
        originalPriceSar: 1173,
        discountPercentage: 40,
        image: '/editorial-looks/canary-butterfly-pendant.jpg',
        productUrl: 'https://omniastores.com/collections/necklaces',
        sku: 'OMN-BTF-02',
        metal: 'Solid 925 Sterling Silver • Dual 18K Yellow Gold & Rhodium Plating',
        gem: 'Simulated Canary Yellow Sapphires & Brilliant Diamonds',
        highlightsEn: [
          'Solid 925 Sterling Silver core with dual 18K yellow gold and rhodium immersion',
          'High-refractive simulated canary sapphires with micro-claw pavé setting',
          'Delicate adjustable cable chain accented with bezel-set solitaire diamonds',
          'Guaranteed 24-hour courier delivery across Dubai, Abu Dhabi & Riyadh'
        ],
        highlightsAr: [
          'هيكل من الفضة الإسترلينية 925 مع طلاء مزدوج بالذهب الأصفر عيار 18 والروديوم',
          'أحجار ياقوت كناري أصفر ذات بريق عالي وترصيع إيطالي بالمخالب الدقيقة',
          'سلسلة قابلة لتعديل الطول مزينة بألماسات محاكاة ذات إطار كلاسيكي فاخر',
          'توصيل سريع ومضمون خلال 24 ساعة في دبي وأبوظبي والرياض'
        ]
      },
      {
        id: 'prod-md-pink-sapphire',
        nameEn: 'The Rose Princess Oval Pink Sapphire & Diamond Halo Pendant',
        nameAr: 'قلادة الأميرة روز البيضاوية بالياقوت الوردي وهالة الألماس',
        tagEn: 'DEMI-FINE PASTEL JEWELLERY',
        tagAr: 'مجوهرات الباستيل الراقية',
        badgeEn: 'VALENTINE VIP EXCLUSIVE',
        badgeAr: 'حصري لمناسبات الإهداء الراقية',
        descEn: 'Centerpiece oval-cut simulated pink sapphire surrounded by an articulated scalloped halo of brilliant-cut diamonds on a delicate station chain.',
        descAr: 'حجر ياقوت وردي بيضاوي ناعم محاط بهالة مموجة ساحرة من أحجار الألماس البافيه على سلسلة ناعمة مرصعة بالمحطات الماسية.',
        priceAed: 590,
        priceSar: 602,
        originalPriceAed: 990,
        originalPriceSar: 1010,
        discountPercentage: 40,
        image: '/editorial-looks/pink-sapphire-halo-pendant.jpg',
        productUrl: 'https://omniastores.com/collections/necklaces',
        sku: 'OMN-PNK-05',
        metal: 'Solid 925 Sterling Silver • Multi-Layer Rhodium Polish',
        gem: 'Simulated Oval Pink Sapphire & Round Brilliant Diamonds',
        highlightsEn: [
          'Solid 925 Sterling Silver finished with multi-layer mirror rhodium polish',
          'High-clarity simulated pink sapphire with soft romantic hue and maximum fire',
          'Scalloped vintage-inspired micro-prong basket setting ensuring total stone security',
          'Available on Tabby 4 installments with complimentary velvet gift presentation'
        ],
        highlightsAr: [
          'فضة إسترلينية نقية عيار 925 مصقولة بطبقات الروديوم العاكس كالمرايا',
          'حجر ياقوت وردي محاكي فائق النقاوة يفيض بالرقة والأنوثة والبريق',
          'ترصيع تاجي كلاسيكي دقيق يثبت الأحجار بأمان تام دون أي مواد لاصقة',
          'إمكانية التقسيط على 4 دفعات مريحة عبر تابي مع علبة هدايا مخملية مجانية'
        ]
      }
    ],
    faqs: [
      {
        questionEn: 'Can I exchange the size if it doesn’t fit her?',
        questionAr: 'هل يمكن استبدال المقاس إذا لم يكن مناسباً لها؟',
        answerEn: 'Yes! Omnia Stores offers a hassle-free 14-day exchange policy across the UAE and GCC for all unworn Mother’s Day items in original packaging.',
        answerAr: 'نعم بكل تأكيد! توفر أمنية ستورز سياسة استبدال مرنة وسهلة خلال 14 يوماً في جميع أنحاء الخليج للقطع غير المستخدمة في تغليفها الأصلي.'
      }
    ],
    editorialBacklinks: [
      {
        titleEn: 'Mother’s Day Signature Necklaces',
        titleAr: 'قلائد وهدايا عيد الأم الحصرية',
        url: 'https://omniastores.com/collections/necklaces',
        badgeEn: '30% Off',
        badgeAr: 'خصم 30%'
      },
      {
        titleEn: 'Freshwater Pearls & Luminous Suites',
        titleAr: 'مجموعات اللؤلؤ الطبيعي والبريق الناعم',
        url: 'https://omniastores.com/collections/pearl-sets',
        badgeEn: 'Pearls',
        badgeAr: 'لؤلؤ'
      }
    ]
  },
  {
    id: 'art-event-11-11-mega-sale-2026',
    slug: 'omnia-stores-11-11-mega-sale-cart-drops-uae-gcc',
    eyebrowEn: 'GLOBAL SHOPPING FESTIVAL / 11.11 MEGA SALE / UAE & GCC WIRE',
    eyebrowAr: 'مهرجان التسوق العالمي / تخفيضات 11.11 الكبرى / موجز الخليج',
    titleEn: 'Omnia Stores 11.11 Mega Sale: Up to 50% Off Pavé Clover Suites & Signature 925 Silver',
    titleAr: 'تخفيضات 11.11 الكبرى من أمنية ستورز: خصم يصل إلى 50% على أطقم زهرة البرسيم والفضة الإسترلينية',
    standfirstEn: 'The year’s biggest online cart drops: up to 50% off four-leaf clover collarets, onyx and simulated diamond suites, and direct discounts across UAE and Saudi Arabia with exclusive promo code OMNIA1111 on omniastores.com.',
    standfirstAr: 'أضخم تخفيضات السلة لهذا العام: خصم يصل إلى 50% على قلائد زهرة البرسيم الرباعية وأطقم الأونيكس والألماس المحاكي مع شحن سريع في الإمارات والخليج وكود خصم OMNIA1111 عبر omniastores.com.',
    authorEn: 'Omnia Stores Commercial Retail & Fashion Wire',
    authorAr: 'قسم التجزئة والموضة بأمنية ستورز',
    dateEn: 'Prepared 11 November 2026',
    dateAr: 'أُعد في ١١ نوفمبر ٢٠٢٦',
    readTimeEn: '4 min read',
    readTimeAr: '4 دقائق قراءة',
    audioDuration: '3:40',
    coverImage: '/events/11-11-sale-exclusive-event.jpg',
    promoTagEn: '11.11 MEGA SALE • UP TO 50% OFF',
    promoTagAr: 'تخفيضات 11.11 • خصم حتى 50%',
    canonicalStoreUrl: 'https://omniastores.com/collections/discounted-items',
    collectionNameEn: '11.11 Discounted Items',
    collectionNameAr: 'عروض 11.11 المخفضة',
    publication: 'Gulf News Commerce Special',
    leadQuoteEn: '“11.11 represents the apex of online luxury cart drops — high jewellery that blends the luck of the four-leaf clover with genuine 925 sterling silver craftsmanship.”',
    leadQuoteAr: '“يمثل يوم 11.11 ذروة تخفيضات السلة الفاخرة — مجوهرات راقية تمزج بين رمزية زهرة البرسيم الرباعية وحرفية الفضة الإسترلينية 925 الخالصة.”',
    section1TitleEn: '11.11 Singles’ Day Phenomenon: Historic GCC Cart Drops',
    section1TitleAr: 'ظاهرة يوم العزاب 11.11: أضخم تخفيضات السلة بالخليج',
    section1BodyEn: `The 11.11 Global Shopping Festival has evolved into the GCC’s largest retail event. Omnia Stores leads the fine jewellery sector with up to 50% discounts on four-leaf clover parures, black onyx motifs, and diamond pavé bracelets. 

Shoppers can apply promotional code **OMNIA1111** for additional savings. Visit the [Omnia 11.11 Mega Sale Vault](https://omniastores.com/collections/discounted-items) to secure viral bestsellers before inventory is depleted.`,
    section1BodyAr: `تحول مهرجان 11.11 إلى أضخم حدث تسوق رقمي في الخليج. تقود أمنية ستورز قطاع المجوهرات الفاخرة بتخفيضات تصل إلى 50% على أطقم زهرة البرسيم الرباعية وأحجار الأونيكس الأسود وأساور البافيه الماسية.

يمكن للمتسوقين إدخال الرمز الترويجي **OMNIA1111** للحصول على خصومات إضافية. تصفح [قسم عروض 11.11 في أمنية ستورز](https://omniastores.com/collections/discounted-items) لاقتناص القطع الأكثر طلباً.`,
    section2TitleEn: 'Lucky Four-Leaf Clover & Onyx Contrast Styling',
    section2TitleAr: 'رمزية زهرة البرسيم والتباين الجذاب مع الأونيكس',
    section2BodyEn: `The four-leaf clover motif remains a staple of luxury jewellery, symbolizing faith, hope, love, and luck. By contrasting deep jet-black onyx against shimmering pavé borders, Omnia Stores provides an everyday luxury staple suitable for both workwear and gala evenings.`,
    section2BodyAr: `تعتبر زهرة البرسيم الرباعية أيقونة راسخة في عالم المجوهرات الراقية ترمز للأمل والحظ والوفاء. ومن خلال التباين الرائع بين حجر الأونيكس الأسود وإطار البافيه المتلألئ، تمنحك أمنية ستورز قطعة مفعمة بالحيوية تناسب العمل والسهرات.`,
    section3TitleEn: 'Instant Checkout with Tabby & Apple Pay',
    section3TitleAr: 'دفع فوري مرن عبر تابي وآبل باي',
    section3BodyEn: `Enjoy frictionless checkout using Apple Pay, credit cards, or split your purchase across 4 interest-free payments via Tabby on [omniastores.com](https://omniastores.com).`,
    section3BodyAr: `استمتع بتجربة دفع فائقة السلاسة عبر آبل باي أو البطاقات الائتمانية أو تقسيط السلة على 4 دفعات بدون فوائد عبر تابي من خلال [omniastores.com](https://omniastores.com).`,
    videoSrc: '/advertising/11-11-sale-reveal.mp4',
    videoTitleEn: '11:11 Official Sale Reveal',
    videoTitleAr: 'الإعلان الرسمي لتخفيضات 11:11 الكبرى',
    videoBadgeEn: '11:11 Official Sale Reveal',
    videoBadgeAr: 'كشف عروض 11:11',
    videoCtaUrl: 'https://omniastores.com/collections/discounted-items',
    videoCtaTextEn: '11:11 DIRECT DEALS ↗',
    videoCtaTextAr: 'صفقات 11:11 المباشرة ↗',
    featuredProducts: [
      {
        id: 'prod-11-11-chevron-diamond',
        nameEn: 'The Sovereign Chevron Diamond Collar & Winged Earrings',
        nameAr: 'طوق الشيفون الملكي المزدوج وأقراط الأجنحة المتلألئة',
        tagEn: 'SOVEREIGN HIGH JEWELLERY',
        tagAr: 'مجوهرات السيادة الراقية',
        badgeEn: 'ROYAL GALA EDITION',
        badgeAr: 'طبعة حفلات الغالا الملكية',
        descEn: 'Double-tier articulated chevron diamond choker designed with an ergonomic open-collar tension frame, paired with sculptural winged chandelier ear crawlers.',
        descAr: 'طوق شيفون مزدوج مرصع بألماس محاكاة فائق البريق بتصميم مفتوح ومريح، متناغم مع أقراط الأجنحة المتدلية الساحرة.',
        priceAed: 1850,
        priceSar: 1890,
        originalPriceAed: 3100,
        originalPriceSar: 3150,
        discountPercentage: 40,
        image: '/advertising/chevron-diamond-sovereign-ad.jpg',
        productUrl: 'https://omniastores.com/collections/bridal-collection',
        sku: 'OMN-CHV-1111',
        metal: 'Precious Solid 925 Silver • 100% Nickel & Lead Free',
        gem: 'High-Refractive Simulated Diamonds (RI 2.65)',
        highlightsEn: [
          'High-refractive simulated diamonds (RI 2.65) cut to ideal round and pear proportions',
          'Flexible anatomical open-choker setting that rests naturally against the collarbone',
          'Hypoallergenic, 100% nickel-free and lead-free precious silver construction',
          'Delivered in an Omnia Stores signature velvet presentation case with authenticity dossier'
        ],
        highlightsAr: [
          'أحجار محاكاة الألماس ذات معامل انكسار ضوئي 2.65 بقطع كمثري ودائري مثالي',
          'هيكل طوق مفتوح مصمم هندسياً ليستقر بمرونة وانسيابية على عظام الترقوة',
          'مضاد تماماً للحساسية وخالٍ 100% من النيكل والرصاص المسبب لتصبغ البشرة',
          'يصل في علبة مخملية فاخرة مع ملف شهادة الفحص والأصالة المعتمدة'
        ]
      },
      {
        id: 'prod-11-11-pearl-cascade',
        nameEn: 'The Royal Empress Pearl Cascade & Pavé Diamond Bow',
        nameAr: 'طقم إمبراطورة اللؤلؤ الباروكي المتدفق وفيونكة الألماس',
        tagEn: 'HAUTE COUTURE PEARL SUITE',
        tagAr: 'طقم اللؤلؤ الإمبراطوري الفاخر',
        badgeEn: 'EXCLUSIVE RUNWAY MASTERPIECE',
        badgeAr: 'قطعة حصرية من منصة العرض',
        descEn: 'Hand-selected baroque freshwater pearls cascading into an articulated pavé simulated diamond bow brooch with matching waterfall earrings.',
        descAr: 'حبات لؤلؤ المياه العذبة الباروكية النقية المتدفقة في فيونكة مرصعة بألماس المحاكاة الفاخر مع أقراط الشلال المتدلية المطابقة.',
        priceAed: 1450,
        priceSar: 1480,
        originalPriceAed: 2450,
        originalPriceSar: 2490,
        discountPercentage: 40,
        image: '/advertising/pearl-cascade-couture-ad.jpg',
        productUrl: 'https://omniastores.com/collections/necklaces',
        sku: 'OMN-PRL-1111',
        metal: 'Solid 925 Sterling Silver • Anti-Tarnish Rhodium Barrier',
        gem: 'Grade-AAA Baroque Freshwater Pearls & 5A Pavé Diamonds',
        highlightsEn: [
          'Solid 925 Sterling Silver core with electrolytic anti-tarnish rhodium barrier',
          'Lustrous Grade-AAA hand-threaded Arabian Gulf & Mediterranean pearl drop tassels',
          'Micro-claw pavé setting with maximum diamond dispersion and zero-glue architecture',
          'Guaranteed 24-hour express courier delivery across Dubai, Abu Dhabi, & GCC'
        ],
        highlightsAr: [
          'فضة إسترلينية أصلية عيار 925 مع طبقة روديوم كهربائية عازلة للأكسدة والرطوبة',
          'لؤلؤ طبيعي فائق البريق منتقى يدوياً بجودة AAA مع شراشيب متدفقة ساحرة',
          'ترصيع إيطالي بالمخالب الدقيقة لأحجار محاكاة الألماس بدون أي مواد لاصقة',
          'توصيل سريع ومضمون خلال 24 ساعة في دبي وأبوظبي وكافة دول الخليج'
        ]
      },
      {
        id: 'prod-11-11-clover-01',
        nameEn: 'Omnia 11.11 Pavé Lucky Clover Diamond & Onyx Suite',
        nameAr: 'طقم زهرة البرسيم الماسي مع الأونيكس لعروض 11.11',
        tagEn: '11.11 ICONIC BESTSELLER',
        tagAr: 'الأكثر مبيعاً في 11.11',
        badgeEn: 'MEGA SALE VIRAL DROP',
        badgeAr: 'عرض 11.11 الفيروسي',
        descEn: 'The four-leaf clover motif crafted with natural jet-black onyx bordered by micro-pavé simulated diamonds in lustrous 925 silver.',
        descAr: 'أيقونة زهرة البرسيم الرباعية المصنوعة من الأونيكس الأسود الطبيعي المحاط بألماس البافيه المتلألئ والفضة عيار 925.',
        priceAed: 790,
        priceSar: 806,
        originalPriceAed: 1580,
        originalPriceSar: 1612,
        discountPercentage: 50,
        image: '/events/11-11-sale-exclusive-event.jpg',
        productUrl: 'https://omniastores.com/collections/discounted-items',
        sku: 'OMN-1111-01',
        metal: 'Certified 925 Sterling Silver • Yellow Gold / Rhodium',
        gem: 'Natural Black Onyx & 5A Simulated Diamond Pavé',
        highlightsEn: [
          'Solid 925 Sterling Silver core assayed by Dubai Central Laboratory',
          'Genuine deep-black onyx stones paired with optical-clarity simulated diamonds',
          'Four-leaf clover lucky emblem designed for gala evenings and everyday luxury',
          'Eligible for 4 interest-free Tabby payments and express GCC courier'
        ],
        highlightsAr: [
          'فضة إسترلينية أصلية عيار 925 مفحوصة لدى مختبر دبي المركزي',
          'أحجار أونيكس سوداء طبيعية مع ترصيع ألماس المحاكاة فائق النقاوة',
          'رمز زهرة البرسيم الرباعية الجالب للحظ والأناقة للمناسبات واليوميات',
          'متاح للتقسيط على 4 دفعات بدون فوائد عبر تابي وشحن سريع بالخليج'
        ]
      }
    ],
    faqs: [
      {
        questionEn: 'How do I use the OMNIA1111 promo code?',
        questionAr: 'كيف يمكنني استخدام كود الخصم OMNIA1111؟',
        answerEn: 'Simply type OMNIA1111 in the discount box on the checkout page of omniastores.com, and an instant discount will be applied to eligible items.',
        answerAr: 'ما عليك سوى إدخال الرمز OMNIA1111 في خانة كود الخصم عند الدفع على موقع omniastores.com وسيتم تطبيق الخصم فوراً.'
      }
    ],
    editorialBacklinks: [
      {
        titleEn: 'Omnia Stores 11.11 Discounted Items',
        titleAr: 'عروض وتخفيضات 11.11 الكبرى',
        url: 'https://omniastores.com/collections/discounted-items',
        badgeEn: 'Up to 50% Off',
        badgeAr: 'خصم حتى 50%'
      },
      {
        titleEn: 'Signature Sets Collection',
        titleAr: 'مجموعة الأطقم المميزة',
        url: 'https://omniastores.com/collections/sets',
        badgeEn: 'Sets',
        badgeAr: 'أطقم'
      }
    ]
  },
  {
    id: 'art-event-uae-national-day-2026',
    slug: 'uae-national-day-jewelry-sale-omnia-stores-dubai',
    eyebrowEn: 'SPIRIT OF THE UNION / UAE NATIONAL DAY 2026 / HERITAGE & PRIDE',
    eyebrowAr: 'روح الاتحاد / اليوم الوطني الإماراتي 2026 / فخر وتراث',
    titleEn: 'UAE National Day 2026: Celebrate in Sovereign Style with Up to 40% Off Bridal Parures',
    titleAr: 'اليوم الوطني الإماراتي 2026: احتفل بأناقة سيادية وخصومات تصل إلى 40% على أطقم العرائس الفاخرة',
    standfirstEn: 'Honoring UAE sovereign heritage: Up to 40% off regal marquise crystal parures, certified 925 sterling silver bridal suites, and patriotic gala styling celebrating the Spirit of the Union in Dubai, Abu Dhabi, and across the Emirates.',
    standfirstAr: 'احتفاءً باليوم الوطني لدولة الإمارات: خصومات تصل إلى 40% على أطقم الألماس الماركيز المتدفقة والفضة عيار 925 المعتمدة من مختبر دبي المركزي للاحتفال بروح الاتحاد بأرقى حلل الأناقة.',
    authorEn: 'Omnia Stores Emirates Heritage Bureau',
    authorAr: 'مكتب التراث الإماراتي بأمنية ستورز',
    dateEn: 'Prepared 25 November 2026',
    dateAr: 'أُعد في ٢٥ نوفمبر ٢٠٢٦',
    readTimeEn: '4 min read',
    readTimeAr: '4 دقائق قراءة',
    audioDuration: '3:50',
    coverImage: '/events/uae-national-day-gala-event.jpg',
    promoTagEn: 'UAE NATIONAL DAY • UP TO 40% OFF',
    promoTagAr: 'اليوم الوطني • خصم حتى 40%',
    canonicalStoreUrl: 'https://omniastores.com/collections/sets',
    collectionNameEn: 'National Day Sets Collection',
    collectionNameAr: 'تشكيلة أطقم اليوم الوطني',
    publication: 'Vogue Arabia Special UAE Edition',
    leadQuoteEn: '“The Spirit of the Union shines through majestic craftsmanship — celebrating the Emirates with pure 925 silver and brilliant simulated diamonds that embody leadership and prestige.”',
    leadQuoteAr: '“تتألق روح الاتحاد من خلال الحرفية الفذة — نحتفي بالإمارات بفضة 925 نقية وألماس محاكي براق يجسد معاني الريادة والشموخ.”',
    section1TitleEn: 'Spirit of the Union: Sovereign Elegance for National Celebrations',
    section1TitleAr: 'روح الاتحاد: أناقة سيادية للاحتفالات الوطنية',
    section1BodyEn: `UAE National Day stands as a tribute to visionary unity and boundless prosperity. To celebrate the 55th National Day, Omnia Stores presents an exclusive collection featuring up to 40% off sovereign bridal and gala parures. 

Crafted with brilliant crystal marquise cuts set in heavy 925 silver, these pieces reflect the grandeur of UAE national galas. Shop the [Omnia Stores National Day Edit](https://omniastores.com/collections/sets).`,
    section1BodyAr: `يقف اليوم الوطني الإماراتي شاهداً على وحدة الرؤية والازدهار العظيم. واحتفالاً بهذه المناسبة الخالدة، تطلق أمنية ستورز عروضاً حصرية تصل إلى 40% على أطقم العرائس والغالا الملكية.

صيغت القطع بأحجار الماركيز البراقة والفضة الإسترلينية 925 المعتمدة لتعكس بهاء الاحتفالات الوطنية. استكشفي [مختارات اليوم الوطني في أمنية ستورز](https://omniastores.com/collections/sets).`,
    section2TitleEn: 'Styling for Official Galas & National Celebrations',
    section2TitleAr: 'تنسيق الإطلالات للمناسبات والاحتفالات الوطنية الرسمية',
    section2BodyEn: `Pair statement diamond collarets with rich emerald-green, crimson, or white silk gowns. The heavy rhodium coating ensures the metal maintains a liquid-platinum sheen under ballroom lighting.`,
    section2BodyAr: `نسقي أطواق الألماس البراقة مع فساتين الحرير الخضراء الزمردية أو القرمزية أو البيضاء، حيث تمنح طبقة الروديوم السميكة لمعاناً بلاتينياً ساحراً تحت أضواء قاعات الاحتفال.`,
    section3TitleEn: 'Guaranteed 24-Hour UAE White-Glove Courier',
    section3TitleAr: 'توصيل سريع مضمون خلال 24 ساعة في الإمارات',
    section3BodyEn: `Orders delivered in Dubai and Abu Dhabi arrive via white-glove courier within 24 hours. Shop direct at [omniastores.com](https://omniastores.com).`,
    section3BodyAr: `تصل الطلبات داخل دبي وأبوظبي خلال 24 ساعة عبر مندوبي التوصيل الفاخر. اطلبي الآن عبر [omniastores.com](https://omniastores.com).`,
    featuredProducts: [
      {
        id: 'prod-uae-emerald-choker',
        nameEn: 'The Imperial Heritage 4-Strand Pearl & Colombian Emerald Choker',
        nameAr: 'طوق التراث الإمبراطوري رباعي صفوف اللؤلؤ والزمرد الكولومبي',
        tagEn: 'NATIONAL HERITAGE HIGH JEWELLERY',
        tagAr: 'مجوهرات التراث الوطني الراقية',
        badgeEn: 'UAE NATIONAL DAY SIGNATURE SUITE',
        badgeAr: 'طقم اليوم الوطني لدولة الإمارات الحصري',
        descEn: 'Four uniform strands of lustrous freshwater pearls anchored by three floral diamond motif plaques suspending smooth cabochon emerald drops.',
        descAr: 'أربعة صفوف متناغمة من لؤلؤ المياه العذبة فائق اللمعان ترتبط بثلاثة أزهار ماسية ساحرة تتدلى منها قطرات الزمرد الكولومبي الناعمة.',
        priceAed: 1890,
        priceSar: 1928,
        originalPriceAed: 3150,
        originalPriceSar: 3213,
        discountPercentage: 40,
        image: '/editorial-looks/imperial-emerald-pearl-choker.jpg',
        productUrl: 'https://omniastores.com/collections/chokers-collection',
        sku: 'OMN-EMR-06',
        metal: 'Solid 925 Sterling Silver • Anti-Tarnish Rhodium Barrier',
        gem: 'Natural Luminous Pearls & Simulated Colombian Emeralds',
        highlightsEn: [
          'Over 180 hand-strung, hand-knotted luminous freshwater pearls with mirror luster',
          'Simulated Colombian emerald teardrops with rich verdant green saturation',
          'Heavy solid 925 silver clasp with dual safety catch and anti-tarnish rhodium',
          'Commemorative UAE National Day collector’s edition certificate from Omnia Stores'
        ],
        highlightsAr: [
          'أكثر من 180 حبة لؤلؤ مياه عذبة منتقاة ومعقودة يدوياً ببريق لؤلؤي أخّاذ',
          'قطرات زمرد كولومبي محاكاة بلون أخضر زمردي عميق تحاكي المجوهرات الملكية',
          'مشبك فضة عيار 925 متين مع قفل أمان مزدوج وطبقة عازلة للأكسدة',
          'شهادة إصدار تذكاري خاص لليوم الوطني الإماراتي من أمنية ستورز'
        ]
      },
      {
        id: 'prod-uae-national-day-suite',
        nameEn: 'The Sovereign Chevron Diamond Collar & Winged Earrings',
        nameAr: 'طوق الشيفون الملكي المزدوج وأقراط الأجنحة المتلألئة',
        tagEn: 'SOVEREIGN HIGH JEWELLERY',
        tagAr: 'مجوهرات السيادة الراقية',
        badgeEn: 'ROYAL GALA EDITION',
        badgeAr: 'طبعة حفلات الغالا الملكية',
        descEn: 'Double-tier articulated chevron diamond choker designed with an ergonomic open-collar tension frame, paired with sculptural winged chandelier ear crawlers.',
        descAr: 'طوق شيفون مزدوج مرصع بألماس محاكاة فائق البريق بتصميم مفتوح ومريح، متناغم مع أقراط الأجنحة المتدلية الساحرة.',
        priceAed: 1850,
        priceSar: 1890,
        originalPriceAed: 3100,
        originalPriceSar: 3150,
        discountPercentage: 40,
        image: '/advertising/chevron-diamond-sovereign-ad.jpg',
        productUrl: 'https://omniastores.com/collections/bridal-collection',
        sku: 'OMN-CHV-UAE',
        metal: 'Precious Solid 925 Silver • 100% Nickel & Lead Free',
        gem: 'High-Refractive Simulated Diamonds (RI 2.65)',
        highlightsEn: [
          'High-refractive simulated diamonds (RI 2.65) cut to ideal round and pear proportions',
          'Flexible anatomical open-choker setting that rests naturally against the collarbone',
          'Hypoallergenic, 100% nickel-free and lead-free precious silver construction',
          'Delivered in an Omnia Stores signature velvet presentation case with authenticity dossier'
        ],
        highlightsAr: [
          'أحجار محاكاة الألماس ذات معامل انكسار ضوئي 2.65 بقطع كمثري ودائري مثالي',
          'هيكل طوق مفتوح مصمم هندسياً ليستقر بمرونة وانسيابية على عظام الترقوة',
          'مضاد تماماً للحساسية وخالٍ 100% من النيكل والرصاص المسبب لتصبغ البشرة',
          'يصل في علبة مخملية فاخرة مع ملف شهادة الفحص والأصالة المعتمدة'
        ]
      }
    ],
    faqs: [
      {
        questionEn: 'Are the items hallmarked for silver purity?',
        questionAr: 'هل القطع مختومة وموثقة لنقاء الفضة؟',
        answerEn: 'Yes. Every piece is stamped with the official 925 hallmark and certified under Dubai Central Laboratories standards.',
        answerAr: 'نعم، تحمل جميع القطع ختم 925 الرسمي وشهادة الاعتماد المخبري لمطابقة معايير مختبر دبي المركزي.'
      }
    ],
    editorialBacklinks: [
      {
        titleEn: 'UAE National Day Jewellery Collection',
        titleAr: 'مجموعة مجوهرات اليوم الوطني الإماراتي',
        url: 'https://omniastores.com/collections/sets',
        badgeEn: 'National Day',
        badgeAr: 'اليوم الوطني'
      },
      {
        titleEn: 'Bridal Masterpieces & Full Sets',
        titleAr: 'روائع العرائس والأطقم الكاملة',
        url: 'https://omniastores.com/collections/bridal-collection',
        badgeEn: 'Bridal 925',
        badgeAr: 'عرائس 925'
      }
    ]
  },
  {
    id: 'art-event-year-end-sale-2026',
    slug: 'year-end-sale-last-chance-2026-omnia-stores-gala',
    eyebrowEn: 'ANNUAL LUXURY FINALE / YEAR-END SALE 2026 / COCKTAIL SUITES',
    eyebrowAr: 'ختام الفخامة السنوي / تخفيضات نهاية العام 2026 / أطقم الكوكتيل',
    titleEn: 'Year-End Sale 2026: Last Chance Up to 50% Off Canary Yellow Sapphire & Gala Cocktails',
    titleAr: 'تخفيضات نهاية العام 2026: الفرصة الأخيرة بخصم حتى 50% على الياقوت الكناري وأطقم السهرة',
    standfirstEn: 'Celebrate New Year gala glamour with up to 50% off imperial canary yellow sapphire and champagne diamond cocktail suites in solid 925 silver from Omnia Stores across Dubai, Riyadh, and the GCC.',
    standfirstAr: 'احتفل بسهرات نهاية العام الفاخرة مع خصومات تصل إلى 50% على أطقم الياقوت الأصفر الكناري والماس الشمبانيا في فضة 925 معتمدة من أمنية ستورز في دبي والرياض والخليج.',
    authorEn: 'Omnia Stores Gemological Fine Jewellery Bureau',
    authorAr: 'مكتب المجوهرات الجيمولوجية بأمنية ستورز',
    dateEn: 'Prepared 20 December 2026',
    dateAr: 'أُعد في ٢٠ ديسمبر ٢٠٢٦',
    readTimeEn: '4 min read',
    readTimeAr: '4 دقائق قراءة',
    audioDuration: '3:35',
    coverImage: '/events/year-end-sale-holiday-event.jpg',
    promoTagEn: 'YEAR END SALE • UP TO 50% OFF',
    promoTagAr: 'تخفيضات نهاية العام • خصم حتى 50%',
    canonicalStoreUrl: 'https://omniastores.com/collections/necklaces',
    collectionNameEn: 'Year-End Gala Necklaces',
    collectionNameAr: 'عقود وسلاسل نهاية العام',
    publication: 'Khaleej Times Year-End Review',
    leadQuoteEn: '“Canary yellow simulated sapphires capture the warmth of golden hour and the excitement of festive new beginnings.”',
    leadQuoteAr: '“يجسد الياقوت الأصفر الكناري دفء الساعات الذهبية وحماس البدايات الجديدة المشرقة.”',
    section1TitleEn: 'Canary Yellow Brilliance: The Year-End High Cocktail Edit',
    section1TitleAr: 'بريق الياقوت الكناري: تشكيلة الكوكتيل لختام العام',
    section1BodyEn: `As 2026 draws to a close, fashion connoisseurs look to warm, radiant gemstones that set the tone for holiday cocktails. Omnia Stores presents its Year-End Finale Sale with 50% off canary yellow simulated sapphires and champagne diamond pavé suites. 

Set in certified 925 sterling silver, these pieces deliver the warmth of fine fancy yellow diamonds. Browse [Omnia Stores Year-End Vault](https://omniastores.com/collections/necklaces).`,
    section1BodyAr: `مع اقتراب عام 2026 من نهايته، يتجه عشاق الموضة إلى الأحجار الكريمة الدافئة والمشرقة. تقدم أمنية ستورز تخفيضات نهاية العام بخصم 50% على أطقم الياقوت الكناري وألماس الشمبانيا.

صيغت القطع في فضة إسترلينية 925 لتمنحك فخامة الألماس الأصفر النادر. تصفحي [عروض نهاية العام في أمنية ستورز](https://omniastores.com/collections/necklaces).`,
    section2TitleEn: 'Styling Radiant Yellow Stones with Evening Couture',
    section2TitleAr: 'تنسيق الأحجار الصفراء المتألقة مع أزياء السهرة',
    section2BodyEn: `Canary stones pair magnificently with emerald green, deep navy, and jet black gowns. The warm yellow flashes create an unforgettable contrast that catches gala spotlights.`,
    section2BodyAr: `تتناغم الأحجار الكنارية بشكل مذهل مع فساتين الأخضر الزمردي والكحلي الداكن والأسود الفاحم، حيث تخلق ومضات الضوء الصفراء تبايناً ساحراً.`,
    section3TitleEn: 'Final Clearance & Immediate Courier Fulfillment',
    section3TitleAr: 'التصفية النهائية والتوصيل الفوري',
    section3BodyEn: `Year-end inventory is strictly limited. Order today at [omniastores.com](https://omniastores.com) to secure preferred styles before final clearance closes.`,
    section3BodyAr: `كميات نهاية العام محدودة للغاية. اطلبي اليوم عبر [omniastores.com](https://omniastores.com) قبل إغلاق التصفية السنوية.`,
    featuredProducts: [
      {
        id: 'prod-year-end-canary-01',
        nameEn: 'Omnia Imperial Canary Yellow Sapphire Cocktail Suite',
        nameAr: 'طقم الياقوت الكناري الإمبراطوري لسهرات الكوكتيل',
        priceAed: 950,
        priceSar: 969,
        originalPriceAed: 1900,
        originalPriceSar: 1938,
        discountPercentage: 50,
        image: '/events/year-end-sale-holiday-event.jpg',
        productUrl: 'https://omniastores.com/collections/necklaces',
        sku: 'OMN-YE-01',
        metal: 'Certified 925 Sterling Silver • Yellow Gold Accent',
        gem: 'Fancy Intense Canary Yellow Simulated Sapphire'
      }
    ],
    faqs: [
      {
        questionEn: 'Are the stones heat-resistant and durable?',
        questionAr: 'هل الأحجار مقاومة للحرارة والخدش وذات متانة عالية؟',
        answerEn: 'Yes. Our simulated sapphires achieve a Mohs hardness rating of 8.5–9, providing excellent scratch resistance for evening and frequent wear.',
        answerAr: 'نعم، تبلغ صلابة أحجارنا 8.5 إلى 9 على مقياس موس، مما يمنحها مقاومة فائقة للخدوش للاستخدام المتكرر في المناسبات.'
      }
    ],
    editorialBacklinks: [
      {
        titleEn: 'Year-End Clearance Necklaces & Cocktails',
        titleAr: 'تصفية نهاية العام للقلائد وأطقم السهرة',
        url: 'https://omniastores.com/collections/necklaces',
        badgeEn: '50% Off',
        badgeAr: 'خصم 50%'
      },
      {
        titleEn: 'Discounted Items Vault',
        titleAr: 'قسم القطع المخفضة الحصري',
        url: 'https://omniastores.com/collections/discounted-items',
        badgeEn: 'Clearance',
        badgeAr: 'تصفية'
      }
    ]
  },
  {
    id: 'art-event-white-friday-sale-2026',
    slug: 'white-friday-mega-sale-omnia-stores-gcc-discounts',
    eyebrowEn: 'CYBER LUXURY WEEK / WHITE FRIDAY 2026 / MIDDLE EAST EXCLUSIVE',
    eyebrowAr: 'أسبوع الفخامة الرقمي / الجمعة البيضاء 2026 / حصرياً في الشرق الأوسط',
    titleEn: 'White Friday 2026: Omnia Stores Unlocks Up to 50% Off Mega Cart Drops Across the GCC',
    titleAr: 'الجمعة البيضاء 2026: أمنية ستورز تطلق أضخم تخفيضات السلة بخصم حتى 50% في الخليج',
    standfirstEn: 'The Middle East’s biggest retail moment: up to 50% off grand empress pear-cut simulated diamond bridal suites, anti-tarnish tennis bracelets, and certified 925 silver masterworks across the UAE, Saudi Arabia, Kuwait, and Qatar.',
    standfirstAr: 'مهرجان الجمعة البيضاء الأضخم بالشرق الأوسط: خصم حتى 50% على أطقم إمبراطورة العرائس الماسية وأساور التنس الفضية المقاومة للأكسدة مع شحن سريع وتقسيط عبر تابي على omniastores.com.',
    authorEn: 'Omnia Stores E-Commerce Editorial Desk',
    authorAr: 'مكتب التحرير والتجارة الرقمية بأمنية ستورز',
    dateEn: 'Prepared 20 November 2026',
    dateAr: 'أُعد في ٢٠ نوفمبر ٢٠٢٦',
    readTimeEn: '4 min read',
    readTimeAr: '4 دقائق قراءة',
    audioDuration: '3:45',
    coverImage: '/events/white-friday-sale-luxury-event.jpg',
    promoTagEn: 'WHITE FRIDAY • UP TO 50% OFF',
    promoTagAr: 'الجمعة البيضاء • خصم حتى 50%',
    canonicalStoreUrl: 'https://omniastores.com/collections/discounted-items',
    collectionNameEn: 'White Friday Cart Drops',
    collectionNameAr: 'عروض الجمعة البيضاء المخفضة',
    publication: 'Gulf News E-Commerce Watch',
    leadQuoteEn: '“White Friday redefines luxury accessibility: genuine certified 925 silver crafted to royal bridal standards at historic regional savings.”',
    leadQuoteAr: '“تعيد الجمعة البيضاء تعريف سهولة اقتناء المجوهرات الراقية: فضة إسترلينية معتمدة بمعايير ملكية بخصومات تاريخية لا تتكرر.”',
    section1TitleEn: 'White Friday: The Middle East’s Premier Cyber Luxury Festival',
    section1TitleAr: 'الجمعة البيضاء: مهرجان الفخامة الرقمية الأول بالشرق الأوسط',
    section1BodyEn: `White Friday represents the single most anticipated cyber luxury shopping window across the Gulf. Omnia Stores opens its vault with unprecedented 50% markdowns across pear-cut bridal collarets, multi-carat simulated diamond rings, and tennis chokers. 

Every set is crafted with certified 925 silver hallmarked under DCL standards. Discover the [Omnia Stores White Friday Selection](https://omniastores.com/collections/discounted-items).`,
    section1BodyAr: `تعتبر الجمعة البيضاء فرصة التسوق الرقمي الأكثر ترقباً في الشرق الأوسط. تفتح أمنية ستورز خزائنها بتخفيضات غير مسبوقة تصل إلى 50% على قلائد الكمثرى للعرائس وخواتم السوليتير الفاخرة.

تأتي جميع القطع مصاغة من فضة 925 معتمدة ومختومة رسمياً. تصفحي [مختارات الجمعة البيضاء في أمنية ستورز](https://omniastores.com/collections/discounted-items).`,
    section2TitleEn: 'The Empress Pear-Cut: Architectural Geometry',
    section2TitleAr: 'قصة الكمثرى الإمبراطورية: هندسة معمارية خالدة',
    section2BodyEn: `The empress pear-cut combines the fire of a brilliant round cut with the elongated elegance of a marquise. Draping comfortably along the collarbones, this suite elevates both Western bridal gowns and traditional Gulf thobes.`,
    section2BodyAr: `تجمع قصة الكمثرى الإمبراطورية بين بريق القصة الدائرية ورشاقة قصة الماركيز، لتنساب بنعومة على الرقبة وتمنح فساتين الزفاف والأثواب الخليجية إشراقة ملكية.`,
    section3TitleEn: 'Tabby 4-Part Split & Instant Regional Shipping',
    section3TitleAr: 'تقسيط تابي على 4 دفعات وشحن إقليمي فوري',
    section3BodyEn: `Split your White Friday cart drops into 4 interest-free payments via Tabby. Orders ship same-day from Dubai. Shop now at [omniastores.com](https://omniastores.com).`,
    section3BodyAr: `قسّم مشتريات الجمعة البيضاء على 4 دفعات ميسرة بدون فوائد عبر تابي، مع شحن فوري في نفس اليوم من دبي عبر [omniastores.com](https://omniastores.com).`,
    featuredProducts: [
      {
        id: 'prod-wf-empress-01',
        nameEn: 'Omnia Empress Pear-Cut Diamond Bridal Parure',
        nameAr: 'طقم إمبراطورة العرائس الماسي بقصة الكمثرى',
        priceAed: 1390,
        priceSar: 1417,
        originalPriceAed: 2780,
        originalPriceSar: 2835,
        discountPercentage: 50,
        image: '/events/white-friday-sale-luxury-event.jpg',
        productUrl: 'https://omniastores.com/collections/discounted-items',
        sku: 'OMN-WF-01',
        metal: 'Solid 925 Sterling Silver • Platinum-Tone Rhodium',
        gem: 'Flawless Pear & Round Brilliant Simulated Diamonds'
      }
    ],
    faqs: [
      {
        questionEn: 'Are White Friday sales available in Saudi Arabia?',
        questionAr: 'هل عروض الجمعة البيضاء متاحة للمتسوقين في السعودية؟',
        answerEn: 'Yes! Shoppers across Riyadh, Jeddah, Dammam, and all Saudi cities enjoy full promotional pricing in SAR with express delivery via insured couriers.',
        answerAr: 'نعم بكل تأكيد! يستفيد عملاء الرياض وجدة والدمام ومختلف مدن المملكة من نفس الأسعار المخفضة بالريال السعودي مع شحن سريع ومؤمن.'
      }
    ],
    editorialBacklinks: [
      {
        titleEn: 'White Friday Discounted Items Directory',
        titleAr: 'دليل عروض وتخفيضات الجمعة البيضاء',
        url: 'https://omniastores.com/collections/discounted-items',
        badgeEn: '50% Off',
        badgeAr: 'خصم 50%'
      },
      {
        titleEn: 'Certified 925 Silver Sets Collection',
        titleAr: 'مجموعة أطقم الفضة عيار 925 المعتمدة',
        url: 'https://omniastores.com/collections/silver-sets',
        badgeEn: '925 Silver',
        badgeAr: 'فضة 925'
      }
    ]
  },
  {
    id: 'art-event-valentines-day-2027',
    slug: 'valentines-day-gift-love-in-style-omnia-stores-her',
    eyebrowEn: 'HIGH ROMANCE / VALENTINE’S DAY 2027 / TIMELESS DEVOTION',
    eyebrowAr: 'رومانسية راقية / عيد الحب 2027 / وفاء لا ينتهي',
    titleEn: 'Valentine’s Day 2027: Gift Love in Style with Up to 30% Off Romantic Morganite Suites',
    titleAr: 'عيد الحب 2027: أهدِ الحب بأناقة مع خصومات تصل إلى 30% على أطقم المورجانيت والقلوب الوردية',
    standfirstEn: 'Gift love in style with romantic blush morganite pear pendants, heart solitaires, and delicate rose suites packaged in signature velvet boxes with up to 30% off for Valentine’s Day at Omnia Stores.',
    standfirstAr: 'أهدِ الحب بأناقة مع قلائد المورجانيت الوردية الرقيقة، والقلوب الماسية، وأطقم الورد المخملية المصاغة بحرفية في فضة 925 معتمدة بخصم يصل إلى 30% من أمنية ستورز.',
    authorEn: 'Omnia Stores Romance & Fine Jewellery Bureau',
    authorAr: 'مكتب الرومانسية والمجوهرات الراقية بأمنية ستورز',
    dateEn: 'Prepared 01 February 2027',
    dateAr: 'أُعد في ١ فبراير ٢٠٢٧',
    readTimeEn: '4 min read',
    readTimeAr: '4 دقائق قراءة',
    audioDuration: '3:25',
    coverImage: '/events/valentines-day-gift-love-event.jpg',
    promoTagEn: "VALENTINE'S DAY • UP TO 30% OFF",
    promoTagAr: 'عيد الحب • خصم حتى 30%',
    canonicalStoreUrl: 'https://omniastores.com/collections/necklaces',
    collectionNameEn: 'Valentine Heart Necklaces',
    collectionNameAr: 'قلائد القلوب وأطقم الحب',
    publication: 'Harper’s Bazaar Romance Review',
    leadQuoteEn: '“Blush pink morganite and heart solitaires speak the language of eternal tenderness — a celebration of modern romance cast in pure silver.”',
    leadQuoteAr: '“يتحدث حجر المورجانيت الوردي وقلائد القلوب لغة الرقة الأبدية — احتفاء بالحب العصري المصاغ في فضة نقية.”',
    section1TitleEn: 'Romance Cast in Silver: The Valentine’s Day Edit',
    section1TitleAr: 'رومانسية مصاغة بالفضة: تشكيلة عيد الحب الفاخرة',
    section1BodyEn: `Valentine’s Day celebrates devoted love. Omnia Stores curates romantic blush morganite pear pendants, micro-pavé heart solitaires, and delicate eternity bands at up to 30% off. 

Set in certified 925 sterling silver with tarnish-proof rhodium and rose gold coats, these pieces create unforgettable gifting moments. Explore [Omnia Stores Valentine’s Gifts](https://omniastores.com/collections/necklaces).`,
    section1BodyAr: `يحتفي عيد الحب بالمشاعر الصادقة والوفاء. تقدم أمنية ستورز قلائد المورجانيت الوردية وقلائد القلوب المرصعة بالبافيه الدقيق وخواتم الأبدية بخصومات تصل إلى 30%.

صيغت كل قطعة من فضة 925 معتمدة ومطلية بطبقات الروديوم والذهب الوردي المقاوم للأكسدة. تصفحي [هدايا عيد الحب في أمنية ستورز](https://omniastores.com/collections/necklaces).`,
    section2TitleEn: 'Blush Morganite & Heart Pavé Symbolism',
    section2TitleAr: 'رمزية المورجانيت الوردي والقلوب المرصعة بالبافيه',
    section2BodyEn: `Known as the stone of divine love, morganite’s soft peach-pink tones promote emotional harmony. Combined with brilliant simulated diamonds, this suite offers subtle romantic fire suitable for everyday wear.`,
    section2BodyAr: `يُعرف حجر المورجانيت بحجر الحب والمودة بفضل درجاته الوردية الناعمة التي تعزز التناغم العاطفي. ومع بريق الألماس المحاكي، يمنح الطقم دفئاً رومانسياً استثنائياً.`,
    section3TitleEn: 'Discreet Valentine Delivery & Luxe Presentation',
    section3TitleAr: 'توصيل سري وتغليف هدايا فاخر للمفاجآت',
    section3BodyEn: `Planning a romantic surprise? Omnia Stores provides discreet outer shipping packaging so the recipient cannot guess what is inside. Inside lies a red velvet gift box with wax-sealed certification. Order now at [omniastores.com](https://omniastores.com).`,
    section3BodyAr: `هل تخطط لمفاجأة رومانسية؟ توفر أمنية ستورز تغليف شحن خارجي سري ومحايد لا يكشف المحتوى، بينما يحمل الصندوق الداخلي علبة مخملية حمراء فاخرة مختومة بالشمع عبر [omniastores.com](https://omniastores.com).`,
    featuredProducts: [
      {
        id: 'prod-val-pink-sapphire',
        nameEn: 'The Rose Princess Oval Pink Sapphire & Diamond Halo Pendant',
        nameAr: 'قلادة الأميرة روز البيضاوية بالياقوت الوردي وهالة الألماس',
        tagEn: 'DEMI-FINE PASTEL JEWELLERY',
        tagAr: 'مجوهرات الباستيل الراقية',
        badgeEn: 'VALENTINE VIP EXCLUSIVE',
        badgeAr: 'حصري لعيد الحب والمناسبات الرومانسية',
        descEn: 'Centerpiece oval-cut simulated pink sapphire surrounded by an articulated scalloped halo of brilliant-cut diamonds on a delicate station chain.',
        descAr: 'حجر ياقوت وردي بيضاوي ناعم محاط بهالة مموجة ساحرة من أحجار الألماس البافيه على سلسلة ناعمة مرصعة بالمحطات الماسية.',
        priceAed: 590,
        priceSar: 602,
        originalPriceAed: 990,
        originalPriceSar: 1010,
        discountPercentage: 40,
        image: '/editorial-looks/pink-sapphire-halo-pendant.jpg',
        productUrl: 'https://omniastores.com/collections/necklaces',
        sku: 'OMN-PNK-05',
        metal: 'Solid 925 Sterling Silver • Multi-Layer Rhodium Polish',
        gem: 'Simulated Oval Pink Sapphire & Round Brilliant Diamonds',
        highlightsEn: [
          'Solid 925 Sterling Silver finished with multi-layer mirror rhodium polish',
          'High-clarity simulated pink sapphire with soft romantic hue and maximum fire',
          'Scalloped vintage-inspired micro-prong basket setting ensuring total stone security',
          'Available on Tabby 4 installments with complimentary velvet gift presentation'
        ],
        highlightsAr: [
          'فضة إسترلينية نقية عيار 925 مصقولة بطبقات الروديوم العاكس كالمرايا',
          'حجر ياقوت وردي محاكي فائق النقاوة يفيض بالرقة والأنوثة والبريق',
          'ترصيع تاجي كلاسيكي دقيق يثبت الأحجار بأمان تام دون أي مواد لاصقة',
          'إمكانية التقسيط على 4 دفعات مريحة عبر تابي مع علبة هدايا مخملية مجانية'
        ]
      },
      {
        id: 'prod-val-ruby-suite',
        nameEn: 'The Empress Teardrop Ruby & Solitaire Diamond Rivière',
        nameAr: 'عقد ريفيير الياقوت الإمبراطوري الكمثري وأقراط القطرة',
        tagEn: 'ROYAL RUBY RIVIÈRE',
        tagAr: 'طقم ريفيير الياقوت الملكي',
        badgeEn: 'LIMITED HOLIDAY EDITION',
        badgeAr: 'طبعة الأعياد المحدودة',
        descEn: 'Graduated teardrop simulated pigeon-blood rubies set in alternating bezel diamond links, culminating in a monumental pear-cut ruby focal pendant.',
        descAr: 'أحجار ياقوت كمثرية متدرجة ذات بريق أحمر ساحر تتناوب مع حلقات الألماس لتنتهي بحجر ياقوت كمثري ضخم متدفق.',
        priceAed: 1380,
        priceSar: 1408,
        originalPriceAed: 2300,
        originalPriceSar: 2346,
        discountPercentage: 40,
        image: '/editorial-looks/crimson-teardrop-ruby-suite.jpg',
        productUrl: 'https://omniastores.com/collections/sets',
        sku: 'OMN-RBY-VAL',
        metal: 'Certified 925 Silver • Electrolytic Rhodium Protective Barrier',
        gem: '5A Pear-Cut Simulated Rubies & Round Brilliant Diamonds',
        highlightsEn: [
          'Solid 925 Sterling Silver core with protective electrolytic rhodium barrier',
          'Flawless teardrop simulated rubies with intense optical clarity and brilliance',
          'Hypoallergenic, 100% lead and nickel-free certified precious construction',
          'Express courier fulfillment with insured delivery across UAE & Saudi Arabia'
        ],
        highlightsAr: [
          'هيكل فضة إسترلينية 925 مع طبقة روديوم كهربائية عازلة للأكسدة',
          'أحجار ياقوت كمثرية فائقة النقاء تمنحك إطلالة ملكية في المناسبات الكبرى',
          'خالٍ تماماً 100% من النيكل والرصاص المسبب لتحسس البشرة',
          'شحن سريع مؤمن وتوصيل مباشر خلال 24 ساعة في الإمارات والسعودية'
        ]
      }
    ],
    faqs: [
      {
        questionEn: 'Can I order discreet packaging for a surprise gift?',
        questionAr: 'هل يمكنني طلب تغليف شحن سري لمفاجأة الشريكة؟',
        answerEn: 'Yes! All Valentine orders ship in plain courier boxes with no external branding, ensuring your surprise remains completely secret until opened.',
        answerAr: 'نعم بكل تأكيد! تُشحن جميع طلبات عيد الحب في صناديق خارجية محايدة بدون علامات تجارية لضمان سرية المفاجأة حتى لحظة فتحها.'
      }
    ],
    editorialBacklinks: [
      {
        titleEn: 'Valentine Heart Necklaces & Pendants',
        titleAr: 'قلائد وسلاسل القلوب لعيد الحب',
        url: 'https://omniastores.com/collections/necklaces',
        badgeEn: '30% Off',
        badgeAr: 'خصم 30%'
      },
      {
        titleEn: 'Bridal & Romance Parures Collection',
        titleAr: 'مجموعة أطقم العرائس والرومانسية',
        url: 'https://omniastores.com/collections/bridal-collection',
        badgeEn: 'Romance Suites',
        badgeAr: 'أطقم رومانسية'
      }
    ]
  }
];

export function getEventBlogBySlug(slug: string): EventBlogDetail | undefined {
  return EVENT_BLOGS_DATA.find((e) => e.slug === slug);
}
