/**
 * The Vogue News — Fashion Intelligence Hub Data
 * Seasonal trend matrices, haute couture silhouette pairings, and GCC eveningwear styling guides.
 */

export interface FashionTrendMatrix {
  id: string;
  slug: string;
  season: string;
  seasonAr: string;
  title: string;
  titleAr: string;
  theme: string;
  themeAr: string;
  summaryEn: string;
  summaryAr: string;
  garmentSilhouettes: {
    name: string;
    nameAr: string;
    description: string;
    descriptionAr: string;
    recommendedJewelleryEn: string;
    recommendedJewelleryAr: string;
    recommendedUrl: string;
  }[];
  paletteColours: {
    name: string;
    nameAr: string;
    hex: string;
    gemstonePairing: string;
  }[];
  expertQuoteEn: string;
  expertQuoteAr: string;
  coverImage: string;
}

export const FASHION_INTELLIGENCE_TRENDS: FashionTrendMatrix[] = [
  {
    id: 'trend-winter-gala-2026',
    slug: 'winter-gala-necklines-and-statement-chokers-2026',
    season: 'Autumn/Winter 2026–2027',
    seasonAr: 'خريف وشتاء 2026–2027',
    title: 'The High Neckline & Statement Choker Renaissance',
    titleAr: 'عصر النهضة لأطواق الشوكار وخطوط العنق المرتفعة',
    theme: 'Architectural Regal Couture',
    themeAr: 'الهوت كوتور المعماري الملكي',
    summaryEn: 'Analysis of GCC red carpets revealing a shift from deep décolletage to structured high necklines, Mandarin collar abayas, and velvet drapes paired with wide pavé diamond chokers.',
    summaryAr: 'رصد شامل لمهرجانات السجادة الحمراء في الخليج يبرز التوجه نحو الياقات المرتفعة، والعبايات ذات القصات الهندسية، والمخمل الملكي المزين بأطواق الشوكار الماسية العريضة.',
    coverImage: '/editorial-looks/ruby-gala-parure.jpg',
    garmentSilhouettes: [
      {
        name: 'Crimson Velvet Column Gown',
        nameAr: 'فستان المخمل القرمزي العمودي',
        description: 'Deep jewel-toned velvet with plunging V-neckline or structured shoulder framing.',
        descriptionAr: 'قماش مخملي بلون الياقوت الأحمر مع فتحة عنق انسيابية وأكتاف محددة.',
        recommendedJewelleryEn: 'Cascading simulated ruby chandelier collar and emerald-cut solitaire ring.',
        recommendedJewelleryAr: 'طوق رقبة متدلي من الياقوت الأحمر والزركون اللامع مع خاتم زمردي مرصع.',
        recommendedUrl: 'https://omniastores.com/collections/chokers',
      },
      {
        name: 'Structured Raw Silk Abaya',
        nameAr: 'عباية الحرير الصخري المنحوتة',
        description: 'Clean architectural lines in jet black or desert sand with crisp lapels.',
        descriptionAr: 'خطوط هندسية نظيفة باللون الأسود الملكي أو بيج رمال الصحراء مع ياقات حادة.',
        recommendedJewelleryEn: 'Geometric pavé butterfly collar and South Sea baroque pearl drops in 925 silver.',
        recommendedJewelleryAr: 'طوق الفراشة الهندسي المرصوف وأقراط اللؤلؤ الباروكي المتدلية من الفضة 925.',
        recommendedUrl: 'https://omniastores.com/collections/bridal-sets',
      },
      {
        name: 'Off-Shoulder Taffeta Ballgown',
        nameAr: 'فستان التافتا الملكي مكشوف الكتفين',
        description: 'Voluminous gala ballgowns emphasizing bare collarbones and swan necklines.',
        descriptionAr: 'تصاميم واسعة تبرز عظام الترقوة وخط العنق الانسيابي.',
        recommendedJewelleryEn: 'Wide multi-row tennis collar in certified rhodium-plated sterling silver.',
        recommendedJewelleryAr: 'طوق التنس العريض متعدد الصفوف المصنوع من الفضة الإسترلينية المطلية بالروديوم.',
        recommendedUrl: 'https://omniastores.com/collections/luxury-sets',
      },
    ],
    paletteColours: [
      { name: 'Pigeon Blood Crimson', nameAr: 'أحمر قرمزي ملكي', hex: '#8B0000', gemstonePairing: 'Simulated Ruby & Rhodium Silver' },
      { name: 'Emirates Desert Dune', nameAr: 'ذهب كثبان الصحراء', hex: '#D4AF37', gemstonePairing: 'Canary Yellow Cushion Solitaires' },
      { name: 'Arabian Gulf Iridescence', nameAr: 'بريق مياه الخليج', hex: '#F0E6D2', gemstonePairing: 'Natural Baroque Pearls' },
      { name: 'Midnight Onyx Noir', nameAr: 'أسود الأونيكس الحالك', hex: '#0B0D13', gemstonePairing: 'D-Color Flawless Simulated Diamonds' },
    ],
    expertQuoteEn: '“The neck is the ultimate canvas of modern Arabian luxury. High-contrast demi-fine chokers create an instantly arresting visual focal point against midnight abayas.” — Elena Vance, Bureau Chief',
    expertQuoteAr: '«تمثل الرقبة المساحة الفنية الأرقى في إطلالات المرأة الخليجية. أطواق الشوكار الماسية تمنح حضوراً بصرياً باهراً يعكس فخامة العبايات المخملية.» — إيلينا فانس، رئيسة التحرير',
  },
];
