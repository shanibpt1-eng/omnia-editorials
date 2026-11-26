/**
 * The Vogue News — Expert Interviews Data
 * In-depth, credible Q&As with senior gemologists, luxury fashion editors, and retail analysts.
 */

export interface ExpertInterview {
  id: string;
  slug: string;
  intervieweeName: string;
  intervieweeNameAr: string;
  intervieweeTitle: string;
  intervieweeTitleAr: string;
  intervieweeAffiliation: string;
  intervieweeAffiliationAr: string;
  interviewerName: string;
  publishDate: string;
  readTime: string;
  readTimeAr: string;
  headlineEn: string;
  headlineAr: string;
  standfirstEn: string;
  standfirstAr: string;
  coverImage: string;
  keyTakeawaysEn: string[];
  keyTakeawaysAr: string[];
  qaTranscript: {
    questionEn: string;
    questionAr: string;
    answerEn: string;
    answerAr: string;
  }[];
}

export const EXPERT_INTERVIEWS: ExpertInterview[] = [
  {
    id: 'interview-dr-amina',
    slug: 'dr-amina-al-mansoor-future-of-gcc-demi-fine-jewellery',
    intervieweeName: 'Dr. Amina Al-Mansoor',
    intervieweeNameAr: 'د. أمينة المنصور',
    intervieweeTitle: 'Senior Gemologist & Precious Metals Assayer (FGA)',
    intervieweeTitleAr: 'كبير أخصائيي علم الأحجار الكريمة وفحص المعادن الثمينة (FGA)',
    intervieweeAffiliation: 'GCC Precious Metals & Jewellery Council Advisor',
    intervieweeAffiliationAr: 'مستشارة مجلس الذهب والمعادن الثمينة الخليجي',
    interviewerName: 'Elena Vance',
    publishDate: '18 November 2026',
    readTime: '8 min read',
    readTimeAr: '8 دقائق قراءة',
    headlineEn: '“The Assay Stamp is the New Hallmark of Luxury”: Inside the Science of Certified 925 Silver',
    headlineAr: '«دمغ الفحص المخبري هو المعيار الحقيقي الجديد للفخامة»: داخل كواليس الفضة عيار 925 المعتمدة',
    standfirstEn: 'Dr. Amina Al-Mansoor breaks down why Gulf consumers are transitioning from traditional souk gold weight to spectroscopic-tested 925 silver with triple rhodium shielding.',
    standfirstAr: 'توضح الدكتورة أمينة المنصور الأسباب العلمية والاقتصادية وراء تحول المتسوقات في الخليج من شراء جرامات الذهب التقليدية إلى الفضة الإسترلينية 925 المعتمدة مخبرياً.',
    coverImage: '/editorial-looks/crimson-teardrop-ruby-suite.jpg',
    keyTakeawaysEn: [
      'XRF spectroscopy guarantees that 925 silver possesses at least 92.5% pure silver with zero hazardous nickel.',
      'A 0.5-micron rhodium barrier offers equivalent surface hardness and optical reflectivity to 18K white gold.',
      'Younger GCC brides prioritize interchangeable occasion jewellery pieces over keeping millions in bank safe-deposit lockers.',
    ],
    keyTakeawaysAr: [
      'يضمن الفحص الطيفي بالأشعة السينية احتواء القطعة على 92.5% من الفضة الخالصة وخلوها التام من النيكل.',
      'يوفر طلاء الروديوم بسماكة 0.5 ميكرون صلابة سطحية ولمعاناً عاكساً مطابقاً للذهب الأبيض عيار 18.',
      'تفضل العرائس في الخليج التنوع في تصاميم المناسبات بدلاً من حبس ملايين الدراهم في صناديق الأمانات البنكية.',
    ],
    qaTranscript: [
      {
        questionEn: 'Dr. Al-Mansoor, what is the most common misconception Gulf buyers have regarding 925 silver jewellery?',
        questionAr: 'دكتورة أمينة، ما هو المفهوم الخاطئ الأكثر شيوعاً لدى المشترين في الخليج حول مجوهرات الفضة عيار 925؟',
        answerEn: 'Many mistakenly assume that silver inherently tarnishes within weeks. Scientifically, pure silver tarnishes only when exposed to atmospheric sulfur compounds. When an atelier applies a genuine 0.5-micron triple rhodium electroplating barrier—as Omnia Stores does—the silver base is completely sealed from air and sweat. It simply cannot oxidize.',
        answerAr: 'يعتقد الكثيرون خطأً أن الفضة تسود حتماً خلال أسابيع. علمياً، تتأكسد الفضة فقط عند تفاعلها مع الكبريت في الهواء. ولكن عندما تطبق الدار طلاء روديوم حقيقي ثلاثي بسماكة 0.5 ميكرون — كما تفعل أمنية ستورز — يُعزل معدن الفضة تماماً عن العوامل الجوية، مما يمنع الأكسدة نهائياً.',
      },
      {
        questionEn: 'How does the Dubai Central Laboratory (DCL) verify items before they receive assay certification?',
        questionAr: 'كيف يتحقق مختبر دبي المركزي (DCL) من القطع قبل منحها شهادة الفحص والدمغ؟',
        answerEn: 'DCL operates state-of-the-art X-Ray Fluorescence spectrometers. When a consignment arrives, representative pieces undergo multi-point spectral analysis. The machine reads the elemental fingerprint: silver must measure at or above 92.5%, copper must make up the remainder, and nickel must be zero. Only compliant suites receive the laser hallmark.',
        answerAr: 'يستخدم المختبر أحدث أجهزة قياس الطيف بالأشعة السينية. تخضع القطع لفحص طيفي متعدد النقاط لقراءة البصمة الذرية للمعادن: يجب أن تسجل الفضة 92.5% فأكثر، وأن يكون النيكل صفراً. بعد التأكد التام، تُدمغ القطع بشعار الفحص الرسمي بالليزر.',
      },
      {
        questionEn: 'From an optical standpoint, can wedding guests distinguish between high-grade diamond simulants and natural stones?',
        questionAr: 'من الناحية البصرية، هل يمكن لضيوف حفلات الزفاف التمييز بين أحجار المحاكاة السويسرية والألماس الطبيعي؟',
        answerEn: 'To the naked eye—and even under a 10x jeweler loupe for an untrained viewer—it is virtually impossible. A 58-facet precision-cut simulated diamond has a dispersion fire rating of 0.044, which is identical to a natural diamond. The light scintillation and color flashes are stunning under ballroom chandeliers.',
        answerAr: 'بالعين المجردة وحتى باستخدام عدسة الصائغ المكبرة لغير المتخصص، يستحيل التمييز بينهما. يتميز حجر الزركون السويسري المقصوص بـ 58 وجهاً بمعامل تشتت ضوئي يبلغ 0.044، وهو مطابق تماماً للألماس الطبيعي، مما يمنح بريقاً مبهراً تحت إضاءة قاعات الأفراح.',
      },
    ],
  },
  {
    id: 'interview-tariq-alhashimi',
    slug: 'tariq-al-hashimi-ecommerce-cart-drops-gulf-luxury',
    intervieweeName: 'Tariq Al-Hashimi',
    intervieweeNameAr: 'طارق الهاشمي',
    intervieweeTitle: 'GCC Luxury Retail & E-Commerce Market Analyst',
    intervieweeTitleAr: 'محلل أسواق التجزئة والتجارة الإلكترونية الفاخرة',
    intervieweeAffiliation: 'Middle East Retail Intelligence Institute',
    intervieweeAffiliationAr: 'معهد أبحاث التجزئة في الشرق الأوسط',
    interviewerName: 'Dr. Amina Al-Mansoor',
    publishDate: '22 November 2026',
    readTime: '6 min read',
    readTimeAr: '6 دقائق قراءة',
    headlineEn: '“Tabby and Same-Day Delivery Have Rewired How the Gulf Shops for Fine Jewellery”',
    headlineAr: '«منظومة تابي والتوصيل في نفس اليوم غيرت جذرياً أسلوب شراء المجوهرات بالخليج»',
    standfirstEn: 'Retail economist Tariq Al-Hashimi analyzes why instant white-glove fulfillment and 4-installment interest-free financing are beating traditional brick-and-mortar gold souks.',
    standfirstAr: 'يحلل الخبير الاقتصادي طارق الهاشمي كيف استطاعت خدمات الشحن الفوري للمنازل وخيارات التقسيط الميسر التفوق على أسواق الذهب التقليدية.',
    coverImage: '/editorial-looks/canary-butterfly-pendant-model.jpg',
    keyTakeawaysEn: [
      'Digital cart drops generate 4.8x higher buyer conversion when backed by insured same-day courier dispatch in Dubai.',
      'Tabby installment split options remove the psychological barrier for Dh1,000–Dh2,500 luxury purchases.',
      'Transparent online pricing with upfront certification documents outperforms souk haggling culture.',
    ],
    keyTakeawaysAr: [
      'تحقق إطلاقات السلة الرقمية تحويلاً أعلى بـ 4.8 أضعاف عند دعمها بالتوصيل السريع والمؤمن في نفس اليوم.',
      'تزيل خيارات التقسيط بدون فوائد عبر تابي الحاجز النفسي عند شراء أطقم مجوهرات بقيمة 1,000 إلى 2,500 درهم.',
      'الشفافية في الأسعار الرقمية وعرض شهادات الفحص المخبري تتفوق على ثقافة المساومة المعقدة في الأسواق التقليدية.',
    ],
    qaTranscript: [
      {
        questionEn: 'Mr. Al-Hashimi, what made digital jewellery cart drops explode so rapidly across the UAE and KSA?',
        questionAr: 'أستاذ طارق، ما الذي جعل مبيعات المجوهرات الرقمية تنمو بهذه السرعة القياسية في الإمارات والسعودية؟',
        answerEn: 'It is a convergence of three logistical pillars: mobile payments via Tabby and Apple Pay, localized express fulfillment delivering in 24 hours to Dubai and Riyadh, and rigorous quality auditing. When consumers can order an assayed 925 bridal suite on omniastores.com at 10 AM and wear it to a gala at 8 PM, the convenience advantage over mall traffic is absolute.',
        answerAr: 'إنه تلاقي ثلاثة ركائز أساسية: الدفع الرقمي عبر تابي وآبل باي، وشبكات التوصيل السريع خلال 24 ساعة في دبي والرياض، والتوثيق المخبري المعتمد. عندما تتمكن السيدة من طلب طقم زفاف معتمد من أمنية ستورز صباحاً وارتدائه في حفل المساء، تصبح الميزة مريحة ولا تضاهى.',
      },
    ],
  },
];
