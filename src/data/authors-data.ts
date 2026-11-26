/**
 * The Vogue News — Verified Authors and Contributors Directory
 * True E-E-A-T credentials, gemological certifications, and biographical dossiers.
 */

export interface AuthorProfile {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  affiliation: string;
  affiliationAr: string;
  bio: string;
  bioAr: string;
  credentials: string[];
  credentialsAr: string[];
  avatar: string;
  email: string;
  articlesCount: number;
  expertise: string[];
}

export const VERIFIED_AUTHORS: AuthorProfile[] = [
  {
    id: 'author-amina-almansoor',
    slug: 'dr-amina-al-mansoor',
    name: 'Dr. Amina Al-Mansoor',
    nameAr: 'د. أمينة المنصور',
    role: 'Senior Gemologist & Precious Metals Assayer',
    roleAr: 'كبير أخصائيي علم الأحجار الكريمة وفحص المعادن الثمينة',
    affiliation: 'GCC Precious Metals & Jewellery Council Advisor',
    affiliationAr: 'مستشارة مجلس الذهب والمعادن الثمينة الخليجي',
    bio: 'Dr. Amina Al-Mansoor holds a Ph.D. in Mineralogy and FGA certification. She has conducted over 1,200 spectroscopic assays of 925 sterling silver and natural pearls across Dubai, Abu Dhabi, and Riyadh.',
    bioAr: 'تحمل الدكتورة أمينة المنصور درجة الدكتوراه في علم المعادن وشهادة FGA المعتمدة دولياً. أشرفت على أكثر من 1,200 فحص طيفي للفضة الإسترلينية 925 واللؤلؤ الطبيعي في دبي وأبوظبي والرياض.',
    credentials: ['Ph.D. Mineralogy (King Saud University)', 'Fellow of Gemmological Association (FGA)', 'Dubai Central Lab Accredited Assayer'],
    credentialsAr: ['دكتوراه في علم المعادن (جامعة الملك سعود)', 'زمالة جمعية الأحجار الكريمة البريطانية (FGA)', 'فاحص معتمد لدى مختبر دبي المركزي'],
    avatar: '/brand/author-amina.jpg',
    email: 'a.almansoor@thevoguenews.com',
    articlesCount: 42,
    expertise: ['925 Sterling Silver Metallurgy', 'Diamond Simulants vs Lab Diamonds', 'Dubai DCL Assay Standards', 'Baroque Pearls'],
  },
  {
    id: 'author-elena-vance',
    slug: 'elena-vance',
    name: 'Elena Vance',
    nameAr: 'إيلينا فانس',
    role: 'Haute Horlogerie & High Jewellery Bureau Chief',
    roleAr: 'رئيسة مكتب المجوهرات الراقية والساعات الفاخرة',
    affiliation: 'The Vogue News International Desk',
    affiliationAr: 'مكتب الأخبار الدولي — ذا فوغ نيوز',
    bio: 'Former contributor to Harper’s Bazaar Arabia and Vogue International with over 15 years covering Place Vendôme high jewellery weeks, Doha DJWE, and Riyadh luxury showcases.',
    bioAr: 'صحفية متخصصة ومحررة سابقة في مجلات الموضة العالمية، تتمتع بخبرة تزيد عن 15 عاماً في تغطية أسبوع المجوهرات الراقية في باريس ومعارض الدوحة والرياض.',
    credentials: ['M.A. Fashion Journalism (Central Saint Martins)', 'GIA Graduate Diamonds Diploma', 'Arab Luxury Summit Panelist'],
    credentialsAr: ['ماجستير صحافة الأزياء (سنترال سانت مارتينز)', 'دبلوم تقييم الألماس من معهد GIA', 'متحدثة في القمة العربية للفخامة'],
    avatar: '/brand/author-elena.jpg',
    email: 'e.vance@thevoguenews.com',
    articlesCount: 68,
    expertise: ['Haute Couture Runway Pairing', 'Statement Chokers', 'Gulf Bridal Trends', 'Luxury Retail Analysis'],
  },
  {
    id: 'author-tariq-alhashimi',
    slug: 'tariq-al-hashimi',
    name: 'Tariq Al-Hashimi',
    nameAr: 'طارق الهاشمي',
    role: 'GCC Luxury Retail & E-Commerce Market Analyst',
    roleAr: 'محلل أسواق التجزئة والتجارة الإلكترونية الفاخرة',
    affiliation: 'Middle East Retail Intelligence Institute',
    affiliationAr: 'معهد أبحاث التجزئة في الشرق الأوسط',
    bio: 'Specialist in digital consumer behaviour across the GCC, tracking luxury cart drops, Tabby/Tamara split-payment adoption rates, and omnichannel jewelry retail transformation.',
    bioAr: 'خبير في سلوك المستهلك الرقمي بالخليج، يركز على دراسة مواسم الشراء الفاخرة، ومعدلات الدفع المقسم عبر تابي، وتحولات تجارة المجوهرات عبر الإنترنت.',
    credentials: ['M.Sc. Econometrics (LSE)', 'Certified Retail Management Analyst (CRMA)', 'GCC E-Commerce Index Contributor'],
    credentialsAr: ['ماجستير الاقتصاد القياسي (كلية لندن للاقتصاد)', 'محلل إدارة تجزئة معتمد (CRMA)', 'مساهم في مؤشر التجارة الإلكترونية الخليجي'],
    avatar: '/brand/author-tariq.jpg',
    email: 't.alhashimi@thevoguenews.com',
    articlesCount: 35,
    expertise: ['E-Commerce Cart Drops', 'Tabby Financing Economics', 'Dubai Gold Souk vs Demi-Fine Pricing', 'GCC Consumer Sentiment'],
  },
];
