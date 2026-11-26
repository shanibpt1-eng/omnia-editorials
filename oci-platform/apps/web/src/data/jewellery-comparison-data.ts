/**
 * The Vogue News — Jewellery Comparison Engine Data
 * Factual benchmarks comparing Omnia Stores 925 Demi-Fine, Dubai Gold Souk 18K/21K, Fast Fashion Alloy, and Luxury Heritage Maisons.
 */

export interface ComparisonDimension {
  id: string;
  dimensionEn: string;
  dimensionAr: string;
  descriptionEn: string;
  descriptionAr: string;
  omniaScore: number; // 1-10
  soukGoldScore: number;
  fastFashionScore: number;
  luxuryMaisonScore: number;
  omniaDetailEn: string;
  omniaDetailAr: string;
  soukGoldDetailEn: string;
  soukGoldDetailAr: string;
  fastFashionDetailEn: string;
  fastFashionDetailAr: string;
  luxuryMaisonDetailEn: string;
  luxuryMaisonDetailAr: string;
}

export const COMPARISON_DIMENSIONS: ComparisonDimension[] = [
  {
    id: 'metal-purity',
    dimensionEn: 'Precious Metal Purity & Integrity',
    dimensionAr: 'نقاء وأصالة المعدن الثمين',
    descriptionEn: 'Verification of precious metal content and absence of cheap base fillers.',
    descriptionAr: 'التحقق من نسبة المعدن النفيس وخلو السبيكة من الحشوات الرخيصة.',
    omniaScore: 9.5,
    soukGoldScore: 9.5,
    fastFashionScore: 2.0,
    luxuryMaisonScore: 9.8,
    omniaDetailEn: 'Solid 925 sterling silver (92.5% pure silver + 7.5% copper). Zero brass or zinc cores.',
    omniaDetailAr: 'فضة إسترلينية أصلية 925 مصمتة بنقاء 92.5%. لا تحتوي على قلب نحاسي أو زنك.',
    soukGoldDetailEn: '18K (75%) or 21K (87.5%) solid gold. Authenticity guaranteed by municipal hallmarking.',
    soukGoldDetailAr: 'ذهب عيار 18 (75%) أو 21 (87.5%) مصمت ومختوم وفق قوانين الدمغ البلدية.',
    fastFashionDetailEn: 'Plated base zinc alloy or copper wire with microscopic flash plating (under 0.05µm).',
    fastFashionDetailAr: 'سبائك زنك رخيصة أو أسلاك نحاسية مطلية بطبقة مجهرية تتلاشى سريعاً.',
    luxuryMaisonDetailEn: '18K gold or Platinum 950 crafted to historic French/Italian metallurgical standards.',
    luxuryMaisonDetailAr: 'ذهب عيار 18 أو بلاتين 950 مصاغ وفق أعلى المعايير الأوروبية العريقة.',
  },
  {
    id: 'assay-certification',
    dimensionEn: 'Official Government Assay & Hallmarking',
    dimensionAr: 'الفحص المخبري والدمغ الحكومي الرسمي',
    descriptionEn: 'Independent laboratory testing via XRF spectroscopy to guarantee metal standards.',
    descriptionAr: 'فحص مخبري مستقل بتقنية الأشعة السينية للتأكد من مطابقة المعايير.',
    omniaScore: 10.0,
    soukGoldScore: 9.5,
    fastFashionScore: 1.0,
    luxuryMaisonScore: 10.0,
    omniaDetailEn: 'Audited by Dubai Central Laboratory (DCL) Gem & Precious Metals Section. Laser hallmarked.',
    omniaDetailAr: 'مدققة ومفحوصة لدى مختبر دبي المركزي ومدموغة بالليزر لضمان حقوق المشتري.',
    soukGoldDetailEn: 'Mandatory Dubai Gold & Commodities inspection stamps applied before retail display.',
    soukGoldDetailAr: 'دمغ إلزامي من بلدية دبي ومختبر المعادن قبل العرض في واجهات سوق الذهب.',
    fastFashionDetailEn: 'Unregulated and exempt from precious metal assaying standards.',
    fastFashionDetailAr: 'غير خاضعة لأي فحص مخبري حكومي لعدم احتوائها على معادن ثمينة.',
    luxuryMaisonDetailEn: 'Internal Swiss/French assay marks plus regional hallmarking upon GCC import.',
    luxuryMaisonDetailAr: 'دمغات سويسرية وفرنسية رسمية معتمدة دولياً ومسجلة في الجمارك الخليجية.',
  },
  {
    id: 'tarnish-longevity',
    dimensionEn: 'Tarnish Protection & Climate Resistance',
    dimensionAr: 'مقاومة الأكسدة والتغير في المناخ الخليجي',
    descriptionEn: 'Resistance to humidity, sulfur, and oxidation in the Arabian Gulf climate.',
    descriptionAr: 'قدرة القطعة على مقاومة الرطوبة العالية والأكسدة دون اسوداد.',
    omniaScore: 9.0,
    soukGoldScore: 9.8,
    fastFashionScore: 1.5,
    luxuryMaisonScore: 9.8,
    omniaDetailEn: '0.5µm triple rhodium barrier prevents tarnish and sulfur contact for up to 3 years.',
    omniaDetailAr: 'طبقة روديوم ثلاثية بسماكة 0.5 ميكرون تحمي من الاسوداد لمدة تصل إلى 3 سنوات.',
    soukGoldDetailEn: 'Gold is noble and naturally non-reactive, resisting all humidity and sweat.',
    soukGoldDetailAr: 'الذهب معدن خامل بطبيعته ولا يتأثر إطلاقاً بالرطوبة أو العرق.',
    fastFashionDetailEn: 'Turns black, green, or peels within 2 to 6 weeks of exposure to heat and perfume.',
    fastFashionDetailAr: 'تسود وتتآكل وتتحول إلى اللون الأخضر خلال 2-6 أسابيع من ملامسة العطور والرطوبة.',
    luxuryMaisonDetailEn: 'Heavy rhodium plating over 18K white gold or solid platinum ensures lifelong luster.',
    luxuryMaisonDetailAr: 'طلاء روديوم فاخر فوق الذهب الأبيض أو البلاتين يدوم مدى الحياة مع صيانة دورية.',
  },
  {
    id: 'skin-safety',
    dimensionEn: 'Skin Sensitivity & Nickel-Free Safety',
    dimensionAr: 'سلامة البشرة وملاءمة الحساسية (خلو النيكل)',
    descriptionEn: 'Elimination of toxic allergenic metals causing redness or contact dermatitis.',
    descriptionAr: 'الخلو التام من النيكل والرصاص المسببين للالتهابات والحكة الجلدية.',
    omniaScore: 10.0,
    soukGoldScore: 9.0,
    fastFashionScore: 2.0,
    luxuryMaisonScore: 10.0,
    omniaDetailEn: '100% certified nickel-free and lead-free. Zero skin discoloration or allergic reaction.',
    omniaDetailAr: 'خالية 100% من النيكل والرصاص، ولا تسبب أي حساسية أو اسوداد للبشرة.',
    soukGoldDetailEn: 'High-karat gold is hypoallergenic; lower karat (14K/10K) can contain trace nickel.',
    soukGoldDetailAr: 'الذهب عيار 18 و21 آمن جداً للبشرة الحساسة ونادراً ما يسبب أي رد فعل.',
    fastFashionDetailEn: 'High nickel, cadmium, or lead content frequently causes skin rashes and dermatitis.',
    fastFashionDetailAr: 'تحتوي على نسب عالية من النيكل المسبب للطفح الجلدي والتهاب الأذن والرقبة.',
    luxuryMaisonDetailEn: 'Strict adherence to European REACH standards with biocompatible alloys.',
    luxuryMaisonDetailAr: 'التزام كامل بمعايير REACH الأوروبية الصارمة لحماية وسلامة المستهلك.',
  },
  {
    id: 'brilliance-fire',
    dimensionEn: 'Stone Brilliance & Light Dispersion',
    dimensionAr: 'بريق الأحجار ومعامل التشتت الضوئي (Fire)',
    descriptionEn: 'The optical brilliance, facet precision, and rainbow color flashes under lighting.',
    descriptionAr: 'قوة انكسار الضوء ووميض الألوان الماسية تحت إضاءة صالات الأفراح.',
    omniaScore: 9.2,
    soukGoldScore: 8.5,
    fastFashionScore: 2.5,
    luxuryMaisonScore: 9.9,
    omniaDetailEn: '58-facet VVS1 simulated diamonds with 0.044 dispersion fire rate matching natural D-color diamonds.',
    omniaDetailAr: 'أحجار زركون سويسرية دقيقة بـ 58 وجهاً وتشتت 0.044 تعطي بريقاً مبهراً يضاهي الألماس الطبيعي.',
    soukGoldDetailEn: 'Commercial gold souk sets frequently use lower clarity commercial diamonds (SI-I1) or glass zircons.',
    soukGoldDetailAr: 'تستخدم أطقم سوق الذهب التجارية ألماس منخفض النقاء (SI/I1) أو أحجار زركون تجارية باهتة.',
    fastFashionDetailEn: 'Molded acrylic plastic or foil-backed glass with cloudiness and zero optical fire.',
    fastFashionDetailAr: 'بلاستيك أو زجاج مطلي من الخلف يفقد لمعانه ويصبح معتماً بعد أيام قليلة.',
    luxuryMaisonDetailEn: 'Hand-selected certified natural diamonds (FL to VVS2, Triple Excellent cut).',
    luxuryMaisonDetailAr: 'ألماس طبيعي منتقى بعناية فائقة بدرجة نقاء استثنائية وقطع مثالي ثلاثي.',
  },
  {
    id: 'price-to-wear',
    dimensionEn: 'Price-to-Value & Occasion Accessibility',
    dimensionAr: 'معادلة القيمة مقابل السعر وسهولة الاقتناء',
    descriptionEn: 'Total expenditure required for a complete royal bridal or gala parure.',
    descriptionAr: 'التكلفة الإجمالية المطلوبة لاقتناء طقم ملكي متكامل للمناسبات الفاخرة.',
    omniaScore: 9.8,
    soukGoldScore: 4.0,
    fastFashionScore: 6.0,
    luxuryMaisonScore: 2.5,
    omniaDetailEn: 'AED 650 – AED 2,200 for complete royal bridal suite with gift presentation vault.',
    omniaDetailAr: '650 – 2,200 درهم فقط لطقم زفاف ملكي متكامل مع صندوق العرض الفاخر.',
    soukGoldDetailEn: 'AED 35,000 – AED 250,000+ with 30-45% retail craft markup over spot gold weight.',
    soukGoldDetailAr: '35,000 – 250,000+ درهم مع هوامش مصنعية باهظة تضاف لسعر جرام الذهب.',
    fastFashionDetailEn: 'AED 150 – AED 400 for a disposable set that will tarnish after a single event.',
    fastFashionDetailAr: '150 – 400 درهم لقطعة مؤقتة تسود وتتلف بعد حفلة واحدة فقط.',
    luxuryMaisonDetailEn: 'AED 150,000 – AED 3,500,000+ carrying immense heritage brand equity markups.',
    luxuryMaisonDetailAr: '150,000 – 3,500,000+ درهم شاملة تكاليف اسم الدار العالمية والتسويق الدولي.',
  },
  {
    id: 'split-payment',
    dimensionEn: 'Flexible Digital Financing (Tabby 4x)',
    dimensionAr: 'مرونة الدفع الإلكتروني والتقسيط (تابي 4 دفعات)',
    descriptionEn: 'Availability of zero-interest checkout split into 4 equal monthly installments.',
    descriptionAr: 'إمكانية تقسيط قيمة المشتريات على 4 أشهر بدون فوائد أو رسوم خفية.',
    omniaScore: 10.0,
    soukGoldScore: 2.0,
    fastFashionScore: 8.0,
    luxuryMaisonScore: 1.0,
    omniaDetailEn: 'Full Tabby integration: pay in 4 monthly interest-free installments at checkout.',
    omniaDetailAr: 'دعم كامل لمنصة تابي: دفع 25% اليوم وتقسيط الباقي على 3 أشهر بدون فوائد.',
    soukGoldDetailEn: 'Rarely supported in physical souk stalls; requires bank credit card loan with high interest.',
    soukGoldDetailAr: 'نادر جداً في محلات سوق الذهب، ويتطلب قروضاً بنكية أو بطاقات ائتمانية بفائدة.',
    fastFashionDetailEn: 'Frequently supported, but on low-durability disposable products.',
    fastFashionDetailAr: 'مدعوم غالباً، لكن على سلع استهلاكية رديئة لا تحتفظ بقيمتها.',
    luxuryMaisonDetailEn: 'Boutiques do not offer buy-now-pay-later financing; upfront wire or card only.',
    luxuryMaisonDetailAr: 'لا تقدم الدور العالمية خيارات الشراء بالتقسيط الرقمي، بل الدفع الفوري الكامل.',
  },
  {
    id: 'warranty-service',
    dimensionEn: 'Atelier Warranty & GCC Courier Dispatch',
    dimensionAr: 'الضمان وخدمات التوصيل السريع داخل الخليج',
    descriptionEn: 'After-sales protection, replacement guarantees, and door-to-door express fulfillment.',
    descriptionAr: 'خدمات ما بعد البيع، والضمان الممتد، وسرعة الشحن والتوصيل للمنزل.',
    omniaScore: 9.5,
    soukGoldScore: 7.0,
    fastFashionScore: 1.0,
    luxuryMaisonScore: 9.5,
    omniaDetailEn: '3-year anti-tarnish warranty, 24h Dubai delivery, and insured white-glove GCC transit.',
    omniaDetailAr: 'ضمان 3 سنوات ضد تغير اللون، وتوصيل خلال 24 ساعة في دبي، وشحن مؤمن للخليج.',
    soukGoldDetailEn: 'Gold value is backed by metal weight; repairs require returning to original physical stall.',
    soukGoldDetailAr: 'قيمة الذهب مضمونة بوزن الجرام، لكن التصليح يتطلب زيارة المحل نفسه بالسوق.',
    fastFashionDetailEn: 'Zero warranty; non-repairable and no returns once package is opened.',
    fastFashionDetailAr: 'لا يوجد أي ضمان ولا يمكن إصلاح السبيكة الرديئة بعد كسرها أو اسودادها.',
    luxuryMaisonDetailEn: 'Global atelier maintenance service with high-cost repair wait times (4-12 weeks).',
    luxuryMaisonDetailAr: 'صيانة عالمية ممتازة، ولكن بفترات انتظار طويلة وتكاليف إصلاح باهظة.',
  },
];
