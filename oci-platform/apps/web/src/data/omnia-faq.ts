export interface OmniaFaqItem {
  id: string;
  category: 'bridal' | 'gemstones' | 'warranty' | 'shipping' | 'returns_payment';
  categoryLabelEn: string;
  categoryLabelAr: string;
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
}

export const OMNIA_OFFICIAL_FAQS: OmniaFaqItem[] = [
  {
    id: 'faq-bridal-sets',
    category: 'bridal',
    categoryLabelEn: 'Bridal & 925 Silver',
    categoryLabelAr: 'أطقم الزفاف والفضة 925',
    questionEn: 'Where can I buy luxury bridal jewellery sets in the UAE?',
    questionAr: 'أين يمكنني شراء أطقم مجوهرات الزفاف الفاخرة في الإمارات؟',
    answerEn: 'OMNIA Stores offers luxury-inspired bridal jewellery sets online across the UAE via omniastores.com. Collections include certified 925 sterling silver necklaces, matching chandelier earrings, bracelets, and coordinated full suites designed for weddings, engagements, and Katb Kitab ceremonies.',
    answerAr: 'توفر أمنية ستورز أطقم مجوهرات عرائسية فاخرة أونلاين في الإمارات عبر omniastores.com. تشمل التشكيلة عقوداً ملكية من الفضة عيار 925، وأقراطاً متدلية متناسقة، وأساور، وأطقماً متكاملة مصممة خصيصاً لحفلات الزفاف والخطوبة ومناسبات كتب الكتاب.',
  },
  {
    id: 'faq-genuine-silver',
    category: 'bridal',
    categoryLabelEn: 'Bridal & 925 Silver',
    categoryLabelAr: 'أطقم الزفاف والفضة 925',
    questionEn: 'Does OMNIA Stores offer genuine 925 sterling silver jewellery?',
    questionAr: 'هل تقدم أمنية ستورز مجوهرات مصنوعة من الفضة الإسترلينية الأصلية عيار 925؟',
    answerEn: 'Yes. Every jewellery piece is crafted from genuine 925 sterling silver containing 92.5% pure silver, hallmarked under Dubai Central Laboratory assay standards. All pieces receive an Italian electrolytic multi-layer rhodium plating to protect against oxidation, tarnish, and Gulf humidity.',
    answerAr: 'نعم. جميع مجوهرات أمنية ستورز مصوغة من الفضة الإسترلينية الأصلية عيار 925 (تحتوي على 92.5% فضة نقية) ومختومة رسمياً وفق معايير مختبر دبي المركزي، ومطلية بطبقات الروديوم الإيطالي المقاوم للأكسدة وتغير اللون وعوامل الرطوبة.',
  },
  {
    id: 'faq-simulated-diamonds',
    category: 'gemstones',
    categoryLabelEn: 'Gemstones & Tennis',
    categoryLabelAr: 'الأحجار الكريمة وأساور التنس',
    questionEn: 'Does OMNIA Stores offer jewellery with simulated diamonds and moissanite?',
    questionAr: 'هل توفر أمنية ستورز مجوهرات مرصعة بمحاكاة الألماس والمويسانيت؟',
    answerEn: 'Yes. Selected designs feature Premium simulated diamonds, moissanite, and Swiss cubic zirconia stones precision-cut with micro-facets to replicate the fire, optical dispersion, and brilliance of mined diamonds.',
    answerAr: 'نعم. تتميز تصاميم مختارة بأحجار محاكاة الألماس الفاخرة، والمويسانيت، والزركون السويسري المقطوع بدقة هندسية ليعكس بريق وتشتت الألماس الطبيعي بأعلى درجات التألق.',
  },
  {
    id: 'faq-tennis-bracelets',
    category: 'gemstones',
    categoryLabelEn: 'Gemstones & Tennis',
    categoryLabelAr: 'الأحجار الكريمة وأساور التنس',
    questionEn: 'Where can I buy sterling silver tennis bracelets in the UAE and what sizes are available?',
    questionAr: 'أين يمكنني شراء أساور التنس الفضية في الإمارات وما هي الأحجام المتوفرة؟',
    answerEn: 'OMNIA Stores offers an iconic collection of 925 sterling silver tennis bracelets available online with stone sizes ranging from 2mm, 3mm, 4mm, to 5mm. Designs feature round brilliant and cushion cuts with double-locking safety clasps.',
    answerAr: 'توفر أمنية ستورز تشكيلة أيقونية من أساور التنس المصنوعة من الفضة عيار 925 أونلاين بمقاسات أحجار متعددة تتراوح بين 2 مم، 3 مم، 4 مم، و 5 مم، وبقصات دائرية وكوشن مع مشابك أمان مزدوجة.',
  },
  {
    id: 'faq-warranty',
    category: 'warranty',
    categoryLabelEn: 'Warranty & Care',
    categoryLabelAr: 'الضمان والعناية بالمجوهرات',
    questionEn: 'What is the OMNIA Stores 6-Month Warranty policy?',
    questionAr: 'ما هي سياسة الضمان لمدة 6 أشهر لدى أمنية ستورز؟',
    answerEn: 'OMNIA Stores provides a 6-month warranty from the date of purchase covering stone settings and retention of product shine under normal use. It does not cover misuse, chemical or perfume exposure, water immersion, or improper storage.',
    answerAr: 'تقدم أمنية ستورز ضماناً لمدة 6 أشهر من تاريخ الشراء يغطي ثبات ترصيع الأحجار ولمعان القطعة في ظروف الاستخدام الطبيعي. ولا يشمل الضمان سوء الاستخدام أو التعرض المباشر للعطور والمواد الكيميائية أو الغمر بالماء.',
  },
  {
    id: 'faq-jewelry-care',
    category: 'warranty',
    categoryLabelEn: 'Warranty & Care',
    categoryLabelAr: 'الضمان والعناية بالمجوهرات',
    questionEn: 'How should I care for my OMNIA Stores jewellery to maintain its shine?',
    questionAr: 'كيف أعتني بمجوهرات أمنية ستورز للحفاظ على بريقها ولمعانها الدائم؟',
    answerEn: 'Store pieces individually in their original velvet pouch or box away from humidity. Always apply perfumes, lotions, and hairsprays before putting on your jewellery, and remove items before swimming, exercising, or sleeping.',
    answerAr: 'احفظي القطع في العلبة المخملية الأصلية بعيداً عن الرطوبة. ضعي العطور والكريمات ورذاذ الشعر أولاً واتركيها تجف قبل ارتداء المجوهرات، وانزعي القطع قبل السباحة أو ممارسة الرياضة أو النوم.',
  },
  {
    id: 'faq-shipping-rates',
    category: 'shipping',
    categoryLabelEn: 'Shipping & Delivery',
    categoryLabelAr: 'الشحن والتوصيل',
    questionEn: 'How fast is delivery across the UAE, Saudi Arabia, and other GCC countries?',
    questionAr: 'ما هي مدة وتكلفة التوصيل داخل الإمارات والسعودية ودول الخليج؟',
    answerEn: 'Within the UAE, standard delivery takes ~24 hours (30 AED standard / 100 AED same-day delivery via OnTrack). In Saudi Arabia (Riyadh, Jeddah, Dammam), express air courier delivery takes 3–5 days (77 SAR via SMSA). Other GCC countries (Oman, Bahrain, Kuwait, Qatar) receive 3–5 day delivery for 95 AED.',
    answerAr: 'داخل الإمارات، يستغرق التوصيل العادي حوالي 24 ساعة (30 درهم، أو 100 درهم للتوصيل في نفس اليوم عبر OnTrack). في المملكة العربية السعودية يستغرق الشحن الجوي 3-5 أيام (77 ريال عبر SMSA). وفي بقية دول الخليج (الكويت، قطر، البحرين، عمان) يستغرق التوصيل 3-5 أيام (95 درهم).',
  },
  {
    id: 'faq-returns',
    category: 'returns_payment',
    categoryLabelEn: 'Returns & Payment',
    categoryLabelAr: 'الإرجاع وطرق الدفع',
    questionEn: 'What is the return and exchange policy?',
    questionAr: 'ما هي سياسة الإرجاع والاستبدال المعتمدة؟',
    answerEn: 'Customers in the UAE and KSA can initiate an exchange or return request within 24 hours of receiving their order. Items must be unworn, in original luxury condition with all tags and packaging intact. For other GCC destinations, sales are final due to cross-border logistics.',
    answerAr: 'يمكن لعملاء الإمارات والسعودية تقديم طلب استبدال أو إرجاع خلال 24 ساعة من تاريخ استلام الطلب، بشرط أن تكون القطع غير مستخدمة وفي حالتها الأصلية وبكامل ملحقاتها. لبقية دول الخليج، تعتبر المبيعات نهائية نظراً لإجراءات الشحن الدولي.',
  },
  {
    id: 'faq-payment-methods',
    category: 'returns_payment',
    categoryLabelEn: 'Returns & Payment',
    categoryLabelAr: 'الإرجاع وطرق الدفع',
    questionEn: 'What payment methods are accepted on omniastores.com?',
    questionAr: 'ما هي وسائل الدفع المقبولة عبر متجر omniastores.com؟',
    answerEn: 'OMNIA Stores accepts Visa, Mastercard, Apple Pay, Tabby (split your purchase into 4 interest-free installments), Tamara, and Cash on Delivery (COD) in eligible regional coverage zones.',
    answerAr: 'يقبل متجر أمنية ستورز بطاقات فيزا، ماستركارد، أبل باي (Apple Pay)، تابي (Tabby للتقسيط على 4 دفعات بدون فوائد)، تمارا (Tamara)، بالإضافة إلى خيار الدفع عند الاستلام في المناطق المؤهلة.',
  },
  {
    id: 'faq-contact-support',
    category: 'returns_payment',
    categoryLabelEn: 'Returns & Payment',
    categoryLabelAr: 'الإرجاع وطرق الدفع',
    questionEn: 'How can I contact OMNIA Stores customer support?',
    questionAr: 'كيف يمكنني التواصل مع خدمة عملاء أمنية ستورز؟',
    answerEn: 'You can contact the dedicated client concierge via WhatsApp or phone at +971 56 547 8227 or email support@omniastores.com. You can also visit the official online Help Center at omniastores.com/pages/faq.',
    answerAr: 'يمكنك التواصل مباشرة مع فريق الدعم والكونسيرج عبر واتساب أو الاتصال على الرقم 8227 547 56 971+ أو عبر البريد الإلكتروني support@omniastores.com، أو زيارة صفحة الأسئلة الشائعة الرسمية على omniastores.com/pages/faq.',
  },
];
