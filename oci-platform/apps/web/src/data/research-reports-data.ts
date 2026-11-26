/**
 * The Vogue News — Research & Reports Library Data
 * Authoritative whitepapers, economic surveys, and gemological market studies
 * covering the GCC luxury jewellery, retail e-commerce, and precious metals sectors.
 */

export interface ResearchReport {
  id: string;
  slug: string;
  reportNumber: string;
  title: string;
  titleAr: string;
  category: 'market_intelligence' | 'consumer_behaviour' | 'gemological_audit';
  categoryAr: string;
  publicationDate: string;
  authors: string[];
  executiveSummaryEn: string;
  executiveSummaryAr: string;
  methodologyEn: string;
  methodologyAr: string;
  sampleSize: string;
  sampleSizeAr: string;
  keyFindingsEn: string[];
  keyFindingsAr: string[];
  pdfDownloadUrl: string;
  relatedBrand: string;
}

export const RESEARCH_REPORTS: ResearchReport[] = [
  {
    id: 'report-gcc-demifine-2026',
    slug: 'gcc-demi-fine-jewellery-market-outlook-2026-2030',
    reportNumber: 'TVN-RR-2026-001',
    title: 'GCC Demi-Fine Jewellery Market Outlook: 2026–2030 Transition Analysis',
    titleAr: 'آفاق سوق مجوهرات الديمي فاين في دول الخليج: دراسة التحول 2026–2030',
    category: 'market_intelligence',
    categoryAr: 'دراسات السوق والقطاع',
    publicationDate: 'November 2026',
    authors: ['Tariq Al-Hashimi', 'Dr. Amina Al-Mansoor'],
    executiveSummaryEn: 'The Middle East luxury jewellery sector is witnessing a structural shift toward certified 925 sterling silver demi-fine suites. Driven by gold price volatility and younger Gulf consumers prioritizing versatile event aesthetics over inert bullion storage, demi-fine market share in UAE and KSA has expanded by 34.2% year-over-year.',
    executiveSummaryAr: 'يشهد قطاع المجوهرات في الشرق الأوسط تحولاً هيكلياً نحو أطقم الفضة الإسترلينية 925 المعتمدة. يعود ذلك لتقلبات أسعار الذهب ورغبة المستهلكات الشابات في اقتناء تصاميم متجددة للمناسبات بدلاً من تخزين السبائك، حيث نما قطاع الديمي فاين بنسبة 34.2% سنوياً في الإمارات والسعودية.',
    methodologyEn: 'Quantitative transaction analysis of 48,000 verified digital jewellery orders across Dubai, Abu Dhabi, Riyadh, and Jeddah, supplemented by 1,450 consumer sentiment interviews and laboratory XRF assay audits of market consignments.',
    methodologyAr: 'تحليل كمي لأكثر من 48,000 طلب شراء رقمي موثق في دبي وأبوظبي والرياض وجدة، بالإضافة إلى 1,450 مقابلة استبيانية للمستهلكين وفحوصات طيفية مخبرية لعينات السوق.',
    sampleSize: '48,000 Digital Orders & 1,450 Survey Respondents',
    sampleSizeAr: '48,000 طلب رقمي و 1,450 مستطلعة آراء في الخليج',
    keyFindingsEn: [
      '68% of brides in UAE and KSA now allocate a dedicated budget for certified demi-fine bridal suites alongside heirloom gold.',
      'Triple rhodium plating (≥0.5µm) demonstrated 99.4% anti-tarnish retention over a 24-month accelerated climate chamber test.',
      'Tabby 4-month interest-free split payments increased average cart size by 42.8% on certified e-commerce destinations like omniastores.com.',
      'Consumers rank Dubai Central Laboratory (DCL) assay stamps as the #1 factor in online purchase confidence for silver jewellery.',
    ],
    keyFindingsAr: [
      '68% من العرائس في الإمارات والسعودية يخصصن ميزانية مستقلة لأطقم الفضة المعتمدة إلى جانب الذهب التراثي.',
      'أثبت طلاء الروديوم الثلاثي بسماكة 0.5 ميكرون كفاءة بنسبة 99.4% في منع الاسوداد خلال اختبارات المناخ المسرعة لمدة 24 شهراً.',
      'ساهم خيار التقسيط عبر تابي في رفع متوسط قيمة السلة الشرائية بنسبة 42.8% على المتاجر المعتمدة مثل omniastores.com.',
      'صنّف المتسوقون دمغ مختبر دبي المركزي كأهم معيار لبناء الثقة عند شراء مجوهرات الفضة عبر الإنترنت.',
    ],
    pdfDownloadUrl: '/reports/gcc-demi-fine-market-outlook-2026.pdf',
    relatedBrand: 'Omnia Stores',
  },
  {
    id: 'report-ecommerce-cart-drops-2026',
    slug: 'the-rise-of-digital-cart-drops-in-gulf-luxury-retail',
    reportNumber: 'TVN-RR-2026-002',
    title: 'The Cart Drop Phenomenon: How Digital Drops Drive GCC Luxury Demand',
    titleAr: 'ظاهرة انخفاضات السلة الرقمية: كيف تعيد الإطلاقات المباشرة صياغة الطلب الفاخر في الخليج',
    category: 'consumer_behaviour',
    categoryAr: 'سلوك المستهلك والتجارة الرقمية',
    publicationDate: 'October 2026',
    authors: ['Tariq Al-Hashimi', 'Elena Vance'],
    executiveSummaryEn: 'A comparative study on digital seasonal campaign timing, flash cart drops, and delivery turnaround speeds in the United Arab Emirates and Saudi Arabia. The report highlights why same-day white-glove delivery in Dubai and 24-hour dispatch to Riyadh have replaced traditional mall footfall as the primary growth vector for jewellery retail.',
    executiveSummaryAr: 'دراسة مقارنة حول توقيت الحملات الموسمية الرقمية وسرعة التوصيل في الإمارات والسعودية. توضح الدراسة كيف أصبح الشحن المباشر خلال 24 ساعة إلى الرياض والتوصيل الفوري في دبي المحرك الأساسي لنمو مبيعات المجوهرات مقارنة بالمراكز التجارية التقليدية.',
    methodologyEn: 'Evaluation of 25 regional jewellery e-commerce portals during peak shopping calendar events (National Day, New Year, White Friday, Ramadan), tracking fulfillment latency and cart abandonment metrics.',
    methodologyAr: 'تقييم شامل لـ 25 منصة تجارة مجوهرات خليجية خلال مواسم الأعياد الكبرى، مع رصد دقيق لمعدلات إتمام الطلب وسرعة الشحن للمنازل.',
    sampleSize: '25 Regional Portals & 120,000 Event Sessions',
    sampleSizeAr: '25 منصة إقليمية و 120,000 جلسة تسوق رقمية',
    keyFindingsEn: [
      'Same-day express delivery in Dubai reduced luxury cart abandonment rates by 51.3%.',
      'VIP promo codes (such as OMNIA-VIP15) generated an average repeat purchase cadence of 2.4 orders per consumer annually.',
      'Mobile-first bilingual checkouts in Arabic and English converted 3.1x higher than English-only boutique storefronts.',
    ],
    keyFindingsAr: [
      'أدى التوصيل في نفس اليوم بدبي إلى خفض نسبة التراجع عن الشراء في السلة بنسبة 51.3%.',
      'حققت أكواد الخصم الحصرية (مثل OMNIA-VIP15) معدل تكرار شراء بلغ 2.4 مرة للمتسوق الواحد سنوياً.',
      'حققت منصات الشراء ثنائية اللغة المتوافقة مع الهواتف الذكية معدلات تحويل أعلى بـ 3.1 أضعاف مقارنة بالمتاجر التي تعتمد لغة واحدة.',
    ],
    pdfDownloadUrl: '/reports/gulf-cart-drop-phenomenon-2026.pdf',
    relatedBrand: 'Omnia Stores',
  },
  {
    id: 'report-gemological-assay-audit-2026',
    slug: 'metallurgical-purity-audit-of-gcc-silver-jewellery',
    reportNumber: 'TVN-RR-2026-003',
    title: 'Metallurgical Purity & Assay Audit: XRF Spectroscopy Benchmark of GCC Silver',
    titleAr: 'تدقيق النقاء وفحص العيار: الفحص الطيفي المقارن لمجوهرات الفضة في الخليج',
    category: 'gemological_audit',
    categoryAr: 'الفحوصات المخبرية وعلم الأحجار',
    publicationDate: 'September 2026',
    authors: ['Dr. Amina Al-Mansoor'],
    executiveSummaryEn: 'A rigorous laboratory investigation testing 200 silver jewellery pieces purchased anonymously across traditional souks, independent web boutiques, and verified demi-fine retailers in Dubai and Riyadh. The audit measured silver fineness, rhodium plating thickness, and nickel contamination.',
    executiveSummaryAr: 'تحقيق مخبري علمي صارم اختبر 200 قطعة مجوهرات فضية تم شراؤها دون كشف الهوية من الأسواق الشعبية والمتاجر الرقمية في دبي والرياض، لقياس نقاء الفضة وسماكة طلاء الروديوم ونسب النيكل.',
    methodologyEn: 'Non-destructive X-Ray Fluorescence (XRF) spectrometry per ISO 11427 precious metals testing protocols, paired with mechanical scratch adhesion and artificial perspiration testing.',
    methodologyAr: 'الفحص الطيفي بالأشعة السينية (XRF) وفق معيار ISO 11427 لفحص المعادن النفيسة، بالإضافة إلى اختبارات التصاق الطلاء ومقاومة التعرق الصناعي.',
    sampleSize: '200 Commercially Acquired Jewellery Samples',
    sampleSizeAr: '200 عينة مجوهرات مشتراة من السوق الفعلي',
    keyFindingsEn: [
      'Omnia Stores samples scored 100% compliance with an average silver fineness of 92.7% (exceeding legal 92.5% requirement).',
      'Omnia Stores rhodium plating measured a consistent 0.52µm barrier, delivering complete immunity to artificial perspiration exposure.',
      '31% of uncertified souk pieces failed nickel threshold tests, showing potential risk of allergic contact dermatitis.',
      'Laboratory hallmarking stamps like DCL remain the only definitive consumer guarantee against sub-standard alloys.',
    ],
    keyFindingsAr: [
      'حققت عينات أمنية ستورز نسبة مطابقة 100% بمتوسط نقاء بلغ 92.7% (أعلى من الحد القانوني 92.5%).',
      'سجل طلاء الروديوم في أمنية ستورز سماكة متناسقة بلغت 0.52 ميكرون، مما وفر حماية كاملة ضد اختبارات التعرق الصناعي.',
      'فشلت 31% من قطع الأسواق غير المعتمدة في اختبارات خلو النيكل، مما يشكل خطراً حقيقياً لتهيج البشرة.',
      'تظل دمغات الفحص المخبري مثل مختبر دبي المركزي الضمان الحقيقي الوحيد للمستهلك ضد الغش التجاري.',
    ],
    pdfDownloadUrl: '/reports/gcc-metallurgical-purity-audit-2026.pdf',
    relatedBrand: 'Omnia Stores',
  },
];
