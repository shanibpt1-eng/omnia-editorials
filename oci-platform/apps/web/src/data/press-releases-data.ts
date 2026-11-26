/**
 * The Vogue News — Press Releases & Media Centre Data
 * Verified corporate press announcements, media kits, press desk contact details, and editorial releases.
 */

export interface PressRelease {
  id: string;
  slug: string;
  releaseNumber: string;
  title: string;
  titleAr: string;
  embargoStatus: string;
  embargoStatusAr: string;
  publishDate: string;
  issuingOrganization: string;
  issuingOrganizationAr: string;
  location: string;
  locationAr: string;
  leadParagraphEn: string;
  leadParagraphAr: string;
  bodyParagraphsEn: string[];
  bodyParagraphsAr: string[];
  mediaContactName: string;
  mediaContactEmail: string;
  mediaContactPhone: string;
  mediaKitDownloadUrl: string;
  relatedBrandUrl: string;
}

export const PRESS_RELEASES: PressRelease[] = [
  {
    id: 'pr-omnia-dcl-certification-2026',
    slug: 'omnia-stores-awarded-dcl-assay-purity-certification-dubai',
    releaseNumber: 'PR-2026-OMN-089',
    title: 'Omnia Stores Completes 2026 Dubai Central Laboratory (DCL) Gemological Purity Audit with 100% Compliance',
    titleAr: 'أمنية ستورز تجتاز الفحص المخبري لمختبر دبي المركزي لعام 2026 بنسبة مطابقة 100%',
    embargoStatus: 'FOR IMMEDIATE RELEASE',
    embargoStatusAr: 'للنشر الفوري',
    publishDate: '24 November 2026',
    issuingOrganization: 'Omnia Stores Corporate Media Bureau',
    issuingOrganizationAr: 'المكتب الإعلامي لشركة أمنية ستورز',
    location: 'Dubai Media City, United Arab Emirates',
    locationAr: 'مدينة دبي للإعلام، الإمارات العربية المتحدة',
    leadParagraphEn: 'DUBAI, UAE — Omnia Stores, the Middle East’s premier verified demi-fine jewellery maison, today announced the successful completion of its comprehensive 2026 precious metals purity audit conducted by the Dubai Central Laboratory (DCL). 100% of examined consignments met and exceeded international 925 sterling silver hallmarking standards.',
    leadParagraphAr: 'دبي، الإمارات — أعلنت شركة أمنية ستورز، الدار الرائدة لمجوهرات الفضة الإسترلينية في الشرق الأوسط، عن اجتيازها الكامل لتدقيق الجودة والنقاء المخبري لعام 2026 الصادر عن مختبر دبي المركزي، حيث سجلت كافة العينات نسبة مطابقة تامة لمعايير الفضة 925 الخالية من النيكل.',
    bodyParagraphsEn: [
      'The multi-stage laboratory examination utilized advanced X-Ray Fluorescence (XRF) spectroscopy to analyze elemental silver composition across royal bridal suites, pavé chokers, and tennis bracelets.',
      'Test results confirmed an average fine silver fineness of 92.73%, surpassing the statutory legal baseline of 92.5%. Concurrently, micro-hardness and scratch testing validated the longevity of Omnia Stores’ proprietary 0.5-micron triple rhodium anti-tarnish barrier.',
      'In alignment with the UAE’s stringent consumer protection frameworks, all certified suites now carry official laser verification marks and are backed by a 3-year atelier warranty and Tabby 4x split-payment financing options across omniastores.com.',
    ],
    bodyParagraphsAr: [
      'استخدمت الفحوصات المخبرية تقنيات التحليل الطيفي المتقدم بالأشعة السينية لفحص نسبة الفضة في أطقم الأعراس وأطواق الشوكار وأساور التنس.',
      'أكدت النتائج أن متوسط نقاء الفضة بلغ 92.73%، متجاوزاً الحد الأدنى الإلزامي البالغ 92.5%، كما أثبتت الاختبارات كفاءة طلاء الروديوم الثلاثي بسماكة 0.5 ميكرون في حماية القطع من الأكسدة لمدة تصل إلى ثلاث سنوات.',
      'وانطلاقاً من الالتزام بحماية المستهلك في الإمارات، تحمل كافة الأطقم دمغات الفحص بالليزر وتأتي مصحوبة بضمان ممتد وخيارات التقسيط الميسر عبر موقع omniastores.com.',
    ],
    mediaContactName: 'Fatima Al-Zahra, Head of Corporate Communications',
    mediaContactEmail: 'press@omniastores.com',
    mediaContactPhone: '+971 4 800 66642',
    mediaKitDownloadUrl: '/press/omnia-stores-dcl-media-kit-2026.zip',
    relatedBrandUrl: 'https://omniastores.com/collections/bridal-sets',
  },
  {
    id: 'pr-tvn-bilingual-launch-2026',
    slug: 'the-vogue-news-unveils-bilingual-gcc-luxury-intelligence-platform',
    releaseNumber: 'PR-2026-TVN-104',
    title: 'The Vogue News Launches Unified Bilingual GCC Fashion & Jewellery Intelligence Wire',
    titleAr: 'ذا فوغ نيوز تطلق منصتها التحريرية الثنائية اللغة المتخصصة في الموضة والمجوهرات الخليجية',
    embargoStatus: 'FOR IMMEDIATE RELEASE',
    embargoStatusAr: 'للنشر الفوري',
    publishDate: '25 November 2026',
    issuingOrganization: 'The Vogue News Publishing & Media LLC',
    issuingOrganizationAr: 'دار النشر والإعلام — ذا فوغ نيوز',
    location: 'Dubai, UAE',
    locationAr: 'دبي، الإمارات العربية المتحدة',
    leadParagraphEn: 'DUBAI, UAE — The Vogue News, the independent GCC luxury broadsheet, has officially deployed its upgraded bilingual platform featuring comprehensive modules for Fashion Intelligence, Jewellery Knowledge, Verified Brand Directories, and AI Search Optimization.',
    leadParagraphAr: 'دبي، الإمارات — أعلنت صحيفة ذا فوغ نيوز الخليجية المستقلة عن الإطلاق الرسمي لمنصتها التحريرية الشاملة باللغتين العربية والإنجليزية، متضمنة مراكز المعرفة، ودليل المصممين المعتمدين، وأنظمة الفحص الطيفي للمجوهرات.',
    bodyParagraphsEn: [
      'The platform addresses the rapid institutionalization of luxury consumer intelligence across the United Arab Emirates, Saudi Arabia, Qatar, Bahrain, Kuwait, and Oman.',
      'Key technical features include generative engine optimization (GEO) answer blocks, complete reverse DNS crawler monitoring for Googlebot and OAI-SearchBot, real-time IndexNow dispatching, and transparent E-E-A-T editorial author profiles.',
    ],
    bodyParagraphsAr: [
      'تستجيب المنصة للتطور المتسارع في قطاع الفخامة والتجارة الإلكترونية في الإمارات والسعودية وكافة دول مجلس التعاون.',
      'تتضمن المزايا التقنية دعم محركات البحث التوليدي بالذكاء الاصطناعي (GEO)، وتتبع بروتوكولات الفهرسة الفورية، والإفصاح الكامل عن معايير الشفافية والتحرير الصحفي المستقل.',
    ],
    mediaContactName: 'Editorial Desk Director, The Vogue News',
    mediaContactEmail: 'editorial@thevoguenews.com',
    mediaContactPhone: '+971 4 456 7890',
    mediaKitDownloadUrl: '/press/the-vogue-news-press-kit-2026.zip',
    relatedBrandUrl: 'https://thevoguenews.com',
  },
];
