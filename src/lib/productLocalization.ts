/**
 * Comprehensive Luxury Product Localization Engine for Omnia Stores
 * Maps English product titles, badges, specs, and materials to elegant Arabic.
 */

const KNOWN_COLLECTIONS: Record<string, string> = {
  'Omnia Audrey': 'طقم أمنية أودري',
  'Liah': 'طقم لياء',
  'Nadirra': 'طقم نادرة',
  'Sylvia': 'طقم سيلفيا',
  'Lailah': 'طقم ليلى',
  'Myra': 'طقم مايرا',
  'Nicole': 'طقم نيكول',
  'Caliya': 'طقم كاليا',
  'Elena': 'طقم إيلينا',
  'Inara': 'طقم إنارة',
  'Zara': 'طقم زارا',
  'Amara': 'طقم أمارة',
  'Farah': 'طقم فرح',
  'Noor': 'طقم نور',
  'Riva': 'طقم ريفا',
  'Maya': 'طقم مايا',
  'Celine': 'طقم سيلين',
  'Kiara': 'طقم كيارا',
  'Sophia': 'طقم صوفيا',
  'Layla': 'طقم ليلى',
  'Aura': 'طقم أورا',
  'Seraphina': 'طقم سيرافينا',
  'Gia': 'طقم غيا',
  'Bella': 'طقم بيلا',
};

const COLOR_MAP: Record<string, string> = {
  'Ruby Red': 'باللون الأحمر الياقوتي',
  'Emerald Green': 'باللون الأخضر الزمردي',
  'Sapphire Blue': 'باللون الأزرق الياقوتي',
  'Multicolor': 'متعدد الألوان الساحر',
  'Blue': 'باللون الأزرق الملكي',
  'Yellow': 'باللون الأصفر الساطع',
  'White': 'باللون الأبيض النقي',
  'Red': 'باللون الأحمر الملكي',
  'Green': 'باللون الأخضر الزمردي',
  'Pink': 'باللون الوردي الفاخر',
  'Gold': 'باللون الذهبي الملكي',
  'Silver': 'بالفضة الإسترلينية النقية',
  'Black': 'باللون الأسود الملكي',
  'Purple': 'باللون الأرجواني الملكي',
};

export function getArabicProductTitle(englishTitle: string): string {
  if (!englishTitle) return '';

  // Extract collection name if present
  let matchedName = '';
  for (const name of Object.keys(KNOWN_COLLECTIONS)) {
    if (englishTitle.toLowerCase().includes(name.toLowerCase())) {
      matchedName = name;
      break;
    }
  }

  // Extract color if present
  let matchedColor = '';
  for (const color of Object.keys(COLOR_MAP)) {
    const reg = new RegExp(`\\b${color}\\b`, 'i');
    if (reg.test(englishTitle)) {
      matchedColor = COLOR_MAP[color] || '';
      break;
    }
  }

  // Detect type
  const isBridal = /bridal/i.test(englishTitle);
  const isFullSet = /full set|set/i.test(englishTitle);
  const isTennis = /tennis/i.test(englishTitle);
  const isBracelet = /bracelet/i.test(englishTitle);
  const isNecklace = /necklace/i.test(englishTitle);
  const isChoker = /choker/i.test(englishTitle);
  const isRing = /ring/i.test(englishTitle);
  const isEarring = /earring/i.test(englishTitle);

  let prefix = 'طقم مجوهرات فاخر';
  if (matchedName && KNOWN_COLLECTIONS[matchedName]) {
    prefix = KNOWN_COLLECTIONS[matchedName]!;
  }

  let typePhrase = '';
  if (isBridal && isFullSet) {
    typePhrase = 'العرائسي الملكي المتكامل';
  } else if (isBridal) {
    typePhrase = 'العرائسي الفاخر';
  } else if (isTennis && isBracelet) {
    typePhrase = 'إسوارة التنس الألماسية';
    if (matchedName) prefix = `إسوارة ${matchedName} التنس`;
  } else if (isBracelet) {
    typePhrase = 'الإسوارة الفاخرة';
    if (matchedName) prefix = `إسوارة ${matchedName}`;
  } else if (isChoker) {
    typePhrase = 'طوق الشوكر الفاخر';
    if (matchedName) prefix = `طوق شوكر ${matchedName}`;
  } else if (isNecklace) {
    typePhrase = 'العقد الفاخر';
    if (matchedName) prefix = `عقد ${matchedName}`;
  } else if (isRing) {
    typePhrase = 'الخاتم الملكي المرصع';
    if (matchedName) prefix = `خاتم ${matchedName}`;
  } else if (isEarring) {
    typePhrase = 'الأقراط المتدلية الفاخرة';
    if (matchedName) prefix = `أقراط ${matchedName}`;
  } else if (isFullSet) {
    typePhrase = 'المتكامل الفاخر';
  }

  // Stones and finish
  let stonePhrase = 'بأحجار الزركون السويسرية النقية';
  if (/simulated diamond/i.test(englishTitle)) {
    stonePhrase = 'بأحجار محاكاة الألماس الفاخرة';
  } else if (/cushion cut/i.test(englishTitle)) {
    stonePhrase = 'بأحجار بقصة كوشن معتمدة';
  } else if (/pearl/i.test(englishTitle)) {
    stonePhrase = 'بلؤلؤ المياه العذبة فائق اللمعان';
  }

  let finishPhrase = 'فضة إسترلينية 925 مطلية بالروديوم';

  // Assemble natural Arabic sentence
  const parts = [prefix];
  if (!matchedName && typePhrase) parts.push(typePhrase);
  if (matchedName && typePhrase && !prefix.includes(typePhrase)) parts.push(typePhrase);
  if (matchedColor) parts.push(matchedColor);
  parts.push(stonePhrase);
  parts.push(finishPhrase);

  return parts.join(' ');
}

export function getBadgeLabel(badge: string, isAr: boolean): string {
  if (!badge) return '';
  if (!isAr) return badge;

  const map: Record<string, string> = {
    'BRIDAL EDIT': 'مختارات الزفاف',
    'ROYAL GALA': 'حفل ملكي',
    'BESTSELLER': 'الأكثر مبيعاً',
    'EXCLUSIVE': 'حصري راقٍ',
    'NEW ARRIVAL': 'وصل حديثاً',
    'LIMITED EDITION': 'إصدار محدود',
    'HERITAGE': 'تراث فاخر',
    'HIGH JEWELRY': 'مجوهرات راقية',
    'TRENDING': 'الأكثر رواجاً',
    'SIGNATURE': 'توقيع أمنية',
    'TOP RATED': 'الأعلى تقييماً',
    'VERIFIED': 'معتمد ومختوم',
    'SALE': 'عرض خاص',
  };

  const upper = badge.trim().toUpperCase();
  if (map[upper]) return map[upper]!;

  if (upper.includes('BRIDAL')) return 'مختارات الزفاف';
  if (upper.includes('BEST')) return 'الأكثر مبيعاً';
  if (upper.includes('EXCLUSIVE')) return 'حصري راقٍ';
  if (upper.includes('ROYAL')) return 'إصدار ملكي';
  return badge;
}

export function getSpecLabel(spec: string, isAr: boolean): string {
  if (!spec) return '';
  if (!isAr) return spec;

  const exactMap: Record<string, string> = {
    'Laser Hallmarked 925': 'ختم ليزري عيار 925',
    'Anti-Tarnish Rhodium Shield': 'طلاء الروديوم المقاوم للأكسدة',
    'Micro-Claw Secure Setting': 'ترصيع بالمخالب المجهرية الدقيقة',
    'Premium Simulated Diamond': 'محاكاة ألماس فاخر',
    'Freshwater High-Luster Pearl': 'لؤلؤ طبيعي فائق اللمعان',
    'Certified DCL Dubai Assay': 'فحص مختبر دبي المركزي',
    'Complimentary Velvet Box': 'يشمل صندوق هدايا مخملي',
    'Italian Micro-Prong Claws': 'مخالب مجهرية إيطالية دقيقة',
    'Certified 925 Silver Hallmark': 'ختم فضة إسترلينية 925 معتمد',
    'Dubai Express Dispatch (24h)': 'شحن سريع من دبي (24 ساعة)',
    'Hand-Set Zirconia': 'ترصيع يدوي بحجر الزركونيا الفاخر',
    'Hypoallergenic Nickel-Free': 'خالٍ من النيكل ومضاد للحساسية',
    'Lifetime Polish Warranty': 'ضمان تلميع مدى الحياة',
    'Luxury Gift Packaging': 'تغليف هدايا ملكي مجاني',
    'Conflict-Free Certified': 'أحجار معتمدة خالية من النزاعات',
    'Precision Faceted Cuts': 'قص هندسي فائق الدقة والبريق',
  };

  if (exactMap[spec]) return exactMap[spec]!;

  const lower = spec.toLowerCase();
  if (lower.includes('italian micro-prong') || lower.includes('micro-claw')) return 'مخالب مجهرية إيطالية دقيقة';
  if (lower.includes('hallmark') || lower.includes('925')) return 'ختم فضة إسترلينية 925 معتمد';
  if (lower.includes('rhodium') || lower.includes('anti-tarnish')) return 'طلاء الروديوم المقاوم للأكسدة';
  if (lower.includes('express dispatch') || lower.includes('dubai')) return 'شحن سريع من دبي (24 ساعة)';
  if (lower.includes('diamond') || lower.includes('simulated')) return 'محاكاة ألماس فاخر';
  if (lower.includes('pearl')) return 'لؤلؤ طبيعي فائق اللمعان';
  if (lower.includes('velvet') || lower.includes('box') || lower.includes('gift')) return 'يشمل صندوق هدايا مخملي فاخر';
  if (lower.includes('nickel') || lower.includes('hypoallergenic')) return 'خالٍ من النيكل ومضاد للحساسية';
  if (lower.includes('warranty')) return 'ضمان تلميع أصلي معتمد';

  return spec;
}

export function getPublicationLabel(pub: string, isAr: boolean): string {
  if (!pub) return '';
  if (!isAr) return pub;
  const map: Record<string, string> = {
    'Vogue Arabia': 'فوغ العربية',
    "Harper's Bazaar Arabia": 'هاربرز بازار العربية',
    'Gulf News': 'جلف نيوز',
    'Khaleej Times': 'خليج تايمز',
    'The National': 'ذا ناشيونال',
    'Business Lifestyle': 'بزنس لايف ستايل',
    'Bridal Arabia': 'برايدل أرابيا',
    "L'Officiel Arabia": 'لوفيسيل أرابيا',
  };
  return map[pub] || pub;
}
