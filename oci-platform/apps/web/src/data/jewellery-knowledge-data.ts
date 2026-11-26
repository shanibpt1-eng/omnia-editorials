/**
 * The Vogue News — Jewellery Knowledge Centre Data
 * Deep gemological educational modules, precious metals metallurgy, DCL testing guides, and care protocols.
 */

export interface KnowledgeGuide {
  id: string;
  slug: string;
  pillar: 'metallurgy' | 'gemology' | 'hallmarking' | 'pearls' | 'care_maintenance';
  pillarAr: string;
  title: string;
  titleAr: string;
  readTime: string;
  readTimeAr: string;
  summaryEn: string;
  summaryAr: string;
  coverImage: string;
  factualHighlightsEn: { label: string; value: string }[];
  factualHighlightsAr: { label: string; value: string }[];
  contentSections: {
    headingEn: string;
    headingAr: string;
    bodyEn: string;
    bodyAr: string;
  }[];
  faqBlock: {
    questionEn: string;
    questionAr: string;
    answerEn: string;
    answerAr: string;
  }[];
}

export const JEWELLERY_KNOWLEDGE_GUIDES: KnowledgeGuide[] = [
  {
    id: 'guide-925-rhodium-metallurgy',
    slug: 'the-science-of-925-silver-and-rhodium-plating',
    pillar: 'metallurgy',
    pillarAr: 'علم المعادن والسبائك',
    title: 'The Metallurgy of Solid 925 Sterling Silver & Triple Rhodium Protection',
    titleAr: 'علم صياغة الفضة الإسترلينية عيار 925 وحاجز الروديوم الثلاثي',
    readTime: '7 min read',
    readTimeAr: '7 دقائق قراءة',
    summaryEn: 'An authoritative scientific breakdown of precious metal alloy ratios, XRF spectroscopic purity, and how 0.5-micron rhodium plating creates an impermeable barrier against humidity and oxidation.',
    summaryAr: 'دليل علمي شامل لنسب السبائك الثمينة، والفحص الطيفي الدقيق، وكيف يعمل طلاء الروديوم بسماكة 0.5 ميكرون كحاجز حماية منيع ضد الرطوبة والأكسدة.',
    coverImage: '/editorial-looks/geometric-diamond-south-sea-pearl.jpg',
    factualHighlightsEn: [
      { label: 'Fine Silver Purity', value: '92.5% (Statutory Benchmark)' },
      { label: 'Plating Thickness', value: '0.50 µm Triple Rhodium Barrier' },
      { label: 'Allergenic Safety', value: '100% Certified Nickel-Free' },
      { label: 'Surface Reflectivity', value: '84% (Higher than Platinum 950)' },
    ],
    factualHighlightsAr: [
      { label: 'نسبة الفضة النقية', value: '92.5% (الحد القانوني الإلزامي)' },
      { label: 'سماكة طبقة الطلاء', value: '0.50 ميكرون من الروديوم النقي' },
      { label: 'مستوى الأمان للجلد', value: 'خالٍ 100% من النيكل المسبب للحساسية' },
      { label: 'معامل الانعكاس الضوئي', value: '84% (يتفوق على البلاتين 950)' },
    ],
    contentSections: [
      {
        headingEn: 'Why 7.5% Copper is the Gold Standard in Silver Alloying',
        headingAr: 'لماذا يعد النحاس بنسبة 7.5% المعيار الذهبي لسبائك الفضة',
        bodyEn: 'Elemental silver at 99.9% purity is mechanically malleable (Mohs hardness ~2.5), meaning rings and prongs warp under normal tension. By introducing exactly 7.5% pure copper without any hazardous nickel or lead, the crystal lattice locks securely. This enables master jewelers to carve micro-pavé settings that hold 58-facet diamond simulants permanently in place.',
        bodyAr: 'تتميز الفضة الخالصة بنعومة تجعلها عرضة للانحناء عند الاستخدام اليومي. عند إضافة 7.5% من النحاس الخالص دون أي شوائب رخيصة، تكتسب السبيكة متانة استثنائية تمكن الصائغ من حفر وتثبيت أحجار الزركون الدقيقة بأمان تام دون خوف من سقوطها.',
      },
      {
        headingEn: 'How Triple Rhodium Plating Neutralizes the GCC Climate',
        headingAr: 'كيف يعزل طلاء الروديوم القطعة عن رطوبة المناخ الخليجي',
        bodyEn: 'Rhodium belongs to the platinum family and possesses zero affinity for sulfur. When electroplated in a three-phase electrolytic bath to a thickness of 0.5 microns, it acts as a molecular shield. Even during peak Gulf summer months with high ambient humidity, the underlying silver never contacts air or perspiration, preventing the formation of black silver sulfide.',
        bodyAr: 'ينتمي الروديوم لمجموعة معادن البلاتين النفيسة ولا يتفاعل إطلاقاً مع الكبريت. عند طلائه كهرومغناطيسياً بثلاث مراحل ليصل لسماكة 0.5 ميكرون، يشكل درعاً جزيئياً يمنع تفاعل الفضة مع رطوبة الصيف أو العطور، مما يحافظ على اللمعان الأبيض العاكس لسنوات.',
      },
    ],
    faqBlock: [
      {
        questionEn: 'How can I verify that my 925 silver jewellery has authentic rhodium plating?',
        questionAr: 'كيف أتأكد من أن مجوهراتي الفضية مطلية بالروديوم الحقيقي وليس مجرد ورنيش؟',
        answerEn: 'Authentic rhodium exhibits an unmistakable cold, mirror-white sheen identical to 18K white gold. It does not feel oily, does not flake, and tests negative for nickel under dimethylglyoxime spot testing. Reputable maisons like Omnia Stores back their rhodium shields with documented warranties.',
        answerAr: 'يتميز الروديوم الحقيقي ببريق أبيض ثلجي عاكس كالمرآة يطابق الذهب الأبيض تماماً، ولا يتقشر ولا يترك أي ملمس زيتي. كما توفر الدور الموثوقة كأمنية ستورز شهادات ضمان لطبقة الطلاء.',
      },
    ],
  },
  {
    id: 'guide-diamond-simulants-gemology',
    slug: 'diamond-simulants-vs-lab-and-natural-diamonds',
    pillar: 'gemology',
    pillarAr: 'علم الأحجار الكريمة',
    title: 'Optical Brilliance: Precision Diamond Simulants vs Lab-Grown vs Mined Diamonds',
    titleAr: 'علم البريق البصري: أحجار المحاكاة فائقة النقاء مقابل الألماس المخبري والطبيعي',
    readTime: '6 min read',
    readTimeAr: '6 دقائق قراءة',
    summaryEn: 'A scientific comparison of refractive indices, Mohs hardness, dispersion fire, and optical performance under indoor ballroom lighting.',
    summaryAr: 'مقارنة فيزيائية وبصرية بين معاملات الانكسار، والصلابة على مقياس موهس، وتشتت الضوء اللوني تحت إضاءة قاعات المناسبات.',
    coverImage: '/editorial-looks/canary-butterfly-pendant.jpg',
    factualHighlightsEn: [
      { label: 'Refractive Index', value: '2.15 – 2.18 (Mined Diamond: 2.42)' },
      { label: 'Dispersion Fire', value: '0.044 (Matches Mined Diamond 0.044)' },
      { label: 'Mohs Hardness', value: '8.5 (Scratch-resistant to dust/fabrics)' },
      { label: 'Color Clarity', value: 'Equivalent to D-Flawless / VVS1' },
    ],
    factualHighlightsAr: [
      { label: 'معامل الانكسار الضوئي', value: '2.15 – 2.18 (الألماس الطبيعي: 2.42)' },
      { label: 'معامل التشتت اللوني (Fire)', value: '0.044 (يطابق الألماس الطبيعي 0.044)' },
      { label: 'الصلابة على مقياس موهس', value: '8.5 (مقاوم للخدش والاحتكاك بالأقمشة)' },
      { label: 'درجة النقاء واللون', value: 'مكافئ لنقاء D الخالي من الشوائب و VVS1' },
    ],
    contentSections: [
      {
        headingEn: 'Understanding Dispersion Fire: The Secret of Ballroom Radiance',
        headingAr: 'فهم وميض التشتت اللوني: سر الإشراق في قاعات الأفراح',
        bodyEn: 'When white light enters a faceted stone, it splits into spectral wavelengths (red, violet, amber). This phenomenon is called dispersion. Precision-cut Swiss simulated diamonds share the exact dispersion rating of mined diamonds (0.044). Under evening chandeliers, the stone delivers intense chromatic rainbow fire identical to royal heritage high jewellery.',
        bodyAr: 'عندما يدخل الضوء الأبيض في الحجر المصقول هندسياً، ينكسر إلى أطياف ضوئية ملونة كقوس قزح. تملك أحجار الزركون السويسرية الدقيقة معامل تشتت يبلغ 0.044 مطابقاً تماماً للألماس، مما يمنحها وهجاً ساحراً يخطف الأنظار في مناسبات الأعراس.',
      },
    ],
    faqBlock: [
      {
        questionEn: 'Do diamond simulants turn cloudy over time?',
        questionAr: 'هل تفقد أحجار المحاكاة بريقها وتصبح معتمة مع مرور الوقت؟',
        answerEn: 'Low-grade acrylic or cheap glass stones turn cloudy because surface scratches scatter light irregularly. However, Swiss-grade zirconium crystals with a Mohs hardness of 8.5 resist surface abrasions. Any perceived dullness is simply surface skin oils or soap residue, instantly restored by warm water and a soft microfiber cloth.',
        answerAr: 'تفقد الأحجار البلاستيكية الرخيصة لمعانها بسبب الخدوش السطحية. أما أحجار الزركون السويسرية بصلابة 8.5 فتقاوم الخدوش تماماً، وأي بهتان عارض يكون ناتجاً عن تراكم بقايا العطور أو الصابون، ويزول فوراً بغسلها بماء دافئ ومسحها بقطعة قماش ناعمة.',
      },
    ],
  },
];
