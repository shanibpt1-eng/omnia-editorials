'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { ShoppingBag, ArrowUpRight, Sparkles, ShieldCheck, Truck, CheckCircle2 } from 'lucide-react';
import { useLuxury } from './ThemeProvider';
import { generateAffiliateUrl } from '../lib/affiliateEngine';

interface StoreAdvert {
  id: string;
  headline: string;
  headlineAr: string;
  subheadline: string;
  subheadlineAr: string;
  category: string;
  categoryAr: string;
  badge: string;
  badgeAr: string;
  image: string;
  aspectRatio?: string;
  startingPriceAed: number;
  startingPriceSar: number;
  storeUrl: string;
  features: string[];
  featuresAr: string[];
}

export function OmniaStoreAdvertSpreads() {
  const { formatPrice, language } = useLuxury();
  const isAr = language === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const adverts: StoreAdvert[] = useMemo(() => [
    // 1. Cobalt Couture (819x1024 Native)
    {
      id: 'ad-cobalt-couture',
      headline: 'Cobalt Couture',
      headlineAr: 'كوبالت كوتور الأزرق الملكي',
      subheadline: 'Layered blue statements for a signature Omnia look. Multi-strand royal sapphire and simulated diamond collar with matching brooch.',
      subheadlineAr: 'طبقات فاخرة من الياقوت الأزرق لإطلالة استثنائية من أمنية. طوق ملكي متعدد الخيوط مع بروش مرصع بالألماس.',
      category: 'Emerald & Sapphire',
      categoryAr: 'الزمرد والياقوت الأزرق',
      badge: 'PREMIUM COLLECTION',
      badgeAr: 'تشكيلة استثنائية فاخرة',
      image: '/campaigns/cobalt-couture.jpg',
      aspectRatio: 'aspect-[819/1024]',
      startingPriceAed: 1550,
      startingPriceSar: 1580,
      storeUrl: 'https://omniastores.com/collections/luxury-sets',
      features: ['Layered Sapphire Blue Statement Collar', 'Floral Sapphire & Diamond Brooch', 'Triple-Layer Anti-Tarnish Rhodium'],
      featuresAr: ['طوق ياقوت أزرق ملكي متعدد الطبقات', 'بروش زهرة الياقوت والألماس الفاخر', 'طلاء ثلاثي بالروديوم المقاوم للأكسدة'],
    },
    // 2. Emerald Prestige (819x1024 Native)
    {
      id: 'ad-emerald-prestige',
      headline: 'Emerald Prestige',
      headlineAr: 'برستيج الزمرد الفاخر',
      subheadline: 'Bold colour with a refined high-jewellery mood. Cascading Colombian-hue emerald chandelier earrings, pendant, and ruby bow brooch.',
      subheadlineAr: 'ألوان عميقة تحاكي أجواء المجوهرات الراقية. أقراط ثريا متدلية بلون الزمرد الكولومبي مع قلادة وبروش فيونكة الياقوت.',
      category: 'Emerald & Sapphire',
      categoryAr: 'الزمرد والياقوت الأزرق',
      badge: 'HIGH-JEWELLERY MOOD',
      badgeAr: 'طابع المجوهرات الراقية',
      image: '/campaigns/emerald-prestige.jpg',
      aspectRatio: 'aspect-[819/1024]',
      startingPriceAed: 1650,
      startingPriceSar: 1682,
      storeUrl: 'https://omniastores.com/collections/luxury-sets',
      features: ['Cascading Emerald Chandelier Suite', 'Couture Ruby & Diamond Bow Brooch', 'Dubai Central Laboratories Assayed'],
      featuresAr: ['طقم ثريا الزمرد الكولومبي المتدفق', 'بروش فيونكة كوتور الياقوت والألماس', 'مفحوص في مختبر دبي المركزي'],
    },
    // 3. Rosé Brilliance (819x1024 Native)
    {
      id: 'ad-rose-brilliance',
      headline: 'Rosé Brilliance',
      headlineAr: 'إشراقة الياقوت الوردي',
      subheadline: 'A romantic palette crafted for graceful statement dressing. Pastel pink sapphire simulants in flexible multi-tier chandelier draping.',
      subheadlineAr: 'لوحة ألوان رومانسية مصممة لإطلالة رقيقة وآسرة. أحجار محاكاة الياقوت الوردي الباستيل بانسدال ثريا متعدد الطبقات.',
      category: 'Ruby & Colour Gem',
      categoryAr: 'الياقوت والأحجار الملونة',
      badge: 'PINK STONE EDIT',
      badgeAr: 'تشكيلة الأحجار الوردية',
      image: '/campaigns/rose-brilliance.jpg',
      aspectRatio: 'aspect-[819/1024]',
      startingPriceAed: 1320,
      startingPriceSar: 1346,
      storeUrl: 'https://omniastores.com/collections/luxury-sets',
      features: ['Graceful Pastel Pink Sapphire Cascade', 'Matching Chandelier Drop Earrings', 'Hypoallergenic Solid 925 Silver Base'],
      featuresAr: ['انسدال الياقوت الوردي الباستيل الانسيابي', 'أقراط ثريا متطابقة متدلية', 'قاعدة من الفضة الإسترلينية 925 المضادة للحساسية'],
    },
    // 4. Golden Lumière (819x1024 Native)
    {
      id: 'ad-golden-lumiere',
      headline: 'Golden Lumière',
      headlineAr: 'لوميير الذهبي الساحر',
      subheadline: 'Warm brilliance for elevated day-to-evening style. Canary yellow oval gemstone pendant with cascading diamond drop earrings.',
      subheadlineAr: 'بريق دافئ لإطلالات أنيقة من الصباح حتى المساء. قلادة بيضاوية بحجر أصفر كناري مع أقراط ألماس متدلية.',
      category: 'Bridal Suites',
      categoryAr: 'أطقم الأعراس',
      badge: 'YELLOW GEM EDIT',
      badgeAr: 'تشكيلة الأحجار الصفراء',
      image: '/campaigns/golden-lumiere.jpg',
      aspectRatio: 'aspect-[819/1024]',
      startingPriceAed: 1420,
      startingPriceSar: 1448,
      storeUrl: 'https://omniastores.com/collections/bridal-collection',
      features: ['Canary Yellow Oval Gemstone Suite', 'Italian Micro-Prong Cluster Setting', 'Complimentary Bespoke Presentation Case'],
      featuresAr: ['طقم الأحجار الصفراء البيضاوية الكناري', 'ترصيع بالمخالب الإيطالية العنقودية الدقيقة', 'صندوق تقديم هدايا ملكي فاخر مجاناً'],
    },
    // 5. Golden Nocturne (819x1024 Native)
    {
      id: 'ad-golden-nocturne',
      headline: 'Golden Nocturne',
      headlineAr: 'نوكتورن المساء الذهبي',
      subheadline: 'Evening glamour with luminous gemstone accents. Canary yellow statement necklace paired with artisanal panther gemstone brooch.',
      subheadlineAr: 'سحر المساء بأحجار كريمة متوهجة. عقد أصفر كناري مميز مقترن ببروش النمر المرصع بالأحجار الكريمة.',
      category: 'Curated Accessories',
      categoryAr: 'الإكسسوارات الفاخرة',
      badge: 'EVENING EDIT',
      badgeAr: 'تشكيلة السهرات الملكية',
      image: '/campaigns/golden-nocturne.jpg',
      aspectRatio: 'aspect-[819/1024]',
      startingPriceAed: 1390,
      startingPriceSar: 1417,
      storeUrl: 'https://omniastores.com/collections/luxury-sets',
      features: ['Artisanal Yellow Gemstone Panther Pin', 'Cascading Diamond Chandelier Drops', '24h Express Air Dispatch UAE & KSA'],
      featuresAr: ['دبوس بروش النمر الحرفي المرصع', 'أقراط ثريا ألماسية متدفقة', 'شحن جوي سريع خلال 24 ساعة للإمارات والسعودية'],
    },
    // 6. Turquoise Radiance (819x1024 Native)
    {
      id: 'ad-turquoise-radiance',
      headline: 'Turquoise Radiance',
      headlineAr: 'إشراقة الفيروز العربي',
      subheadline: 'Fresh colour. Fine sparkle. Effortless glamour. Premium simulated diamonds paired with vibrant turquoise droplet suites.',
      subheadlineAr: 'لون متجدد وبريق رفيع. أحجار محاكاة الألماس الفاخرة مقترنة بقطرات الفيروز الأزرق الحيوي.',
      category: 'Turquoise & Blue Stone',
      categoryAr: 'الفيروز والأحجار الزرقاء',
      badge: 'STATEMENT EARRINGS',
      badgeAr: 'أقراط مميزة للسهرات',
      image: '/campaigns/turquoise-radiance.jpg',
      aspectRatio: 'aspect-[819/1024]',
      startingPriceAed: 1380,
      startingPriceSar: 1407,
      storeUrl: 'https://omniastores.com/collections/luxury-sets',
      features: ['Vibrant Turquoise & Diamond Cascade', 'Handcrafted Solid 925 Silver Base', 'Dubai Central Laboratories Hallmarked'],
      featuresAr: ['تدفق الفيروز الحيوي والألماس البراق', 'صناعة يدوية من الفضة الإسترلينية 925', 'مختوم ومعتمد من مختبر دبي المركزي'],
    },
    // 7. Pearl Bloom (819x1024 Native)
    {
      id: 'ad-pearl-bloom',
      headline: 'Pearl Bloom',
      headlineAr: 'تفتح أزهار اللؤلؤ',
      subheadline: 'Classic pearls reimagined with a modern touch. Hand-selected lustrous freshwater pearls with ruby floral brooch accents.',
      subheadlineAr: 'اللؤلؤ الكلاسيكي برؤية عصرية راقية. لؤلؤ مياه عذبة براق مختار يدوياً مع لمسات بروش الياقوت الزهري.',
      category: 'Pearl Jewellery',
      categoryAr: 'مجوهرات اللؤلؤ',
      badge: 'PEARL EDIT',
      badgeAr: 'تشكيلة اللؤلؤ الطبيعي',
      image: '/campaigns/pearl-bloom.jpg',
      aspectRatio: 'aspect-[819/1024]',
      startingPriceAed: 1250,
      startingPriceSar: 1275,
      storeUrl: 'https://omniastores.com/collections/pearl-sets',
      features: ['High-Luster Freshwater Pearl Pendant', 'Detachable Ruby Floral Motif Pin', 'Complimentary Bespoke Presentation Case'],
      featuresAr: ['قلادة لؤلؤ مياه عذبة فائق اللمعان', 'بروش زهرة الياقوت قابل للفصل', 'صندوق تقديم مخملي فاخر مجاناً'],
    },
    // 8. Sapphire Signature (819x1024 Native)
    {
      id: 'ad-sapphire-signature',
      headline: 'Sapphire Signature',
      headlineAr: 'توقيع الياقوت الأزرق الملكي',
      subheadline: 'A refined blue statement for elevated occasions. Deep royal sapphire emerald-cut gemstones framed in brilliant simulated diamonds.',
      subheadlineAr: 'إطلالة زرقاء راقية للمناسبات الرفيعة. أحجار ياقوت أزرق ملكي بقطع الزمرد محاطة بهالات الألماس البراق.',
      category: 'Emerald & Sapphire',
      categoryAr: 'الزمرد والياقوت الأزرق',
      badge: 'BLUE STONE EDIT',
      badgeAr: 'تشكيلة الأحجار الزرقاء',
      image: '/campaigns/sapphire-signature.jpg',
      aspectRatio: 'aspect-[819/1024]',
      startingPriceAed: 1480,
      startingPriceSar: 1509,
      storeUrl: 'https://omniastores.com/collections/luxury-sets',
      features: ['Emerald-Cut Midnight Royal Sapphires', 'Italian Micro-Prong Claws', 'Triple-Layer Anti-Tarnish Rhodium Shield'],
      featuresAr: ['ياقوت أزرق ليلي ملكي بقطع الزمرد', 'مخالب ترصيع إيطالية فائقة الدقة', 'درع حماية ثلاثي من الروديوم المقاوم للأكسدة'],
    },
    // 9. Azure Pendant Edit (819x1024 Native)
    {
      id: 'ad-azure-pendant-edit',
      headline: 'Azure Pendant Edit',
      headlineAr: 'قلادة اللازورد الأزرق الملكي',
      subheadline: 'Modern polish with a jewellery-first finish. Vibrant emerald-cut azure blue pendant on sterling silver chain with couture floral brooch.',
      subheadlineAr: 'أناقة عصرية بلمسة المجوهرات الراقية. قلادة لازورد أزرق متوهج بقص الزمرد على سلسلة فضية مع بروش زهرة كوتور.',
      category: 'Curated Accessories',
      categoryAr: 'الإكسسوارات الفاخرة',
      badge: 'CURATED ACCESSORIES',
      badgeAr: 'إكسسوارات فاخرة منتقاة',
      image: '/campaigns/azure-pendant-edit.jpg',
      aspectRatio: 'aspect-[819/1024]',
      startingPriceAed: 1120,
      startingPriceSar: 1142,
      storeUrl: 'https://omniastores.com/collections/luxury-sets',
      features: ['Vibrant Azure Emerald-Cut Solitaire', 'Handcrafted Scarf & Lapel Floral Brooch', '24h Express Delivery UAE & KSA'],
      featuresAr: ['سوليتير أزرق لازوردي بقص الزمرد', 'بروش زهرة فاخر للشالات والياقات', 'توصيل سريع خلال 24 ساعة للإمارات والسعودية'],
    },
    // 10. Timeless Elegance
    {
      id: 'ad-timeless-elegance',
      headline: 'Timeless Elegance',
      headlineAr: 'الأناقة الخالدة',
      subheadline: 'A refined jewellery set that redefines modern elegance. Certified 925 sterling silver with rhodium anti-tarnish shielding.',
      subheadlineAr: 'طقم مجوهرات رفيع يعيد تعريف الأناقة العصرية. فضة إسترلينية عيار 925 معتمدة مع طلاء الروديوم.',
      category: 'Bridal Suites',
      categoryAr: 'أطقم الأعراس',
      badge: 'VOGUE ARABIA SPOTLIGHT',
      badgeAr: 'إشادة فوغ العربية',
      image: '/campaigns/01_timeless-elegance.png',
      aspectRatio: 'aspect-[376/306]',
      startingPriceAed: 1250,
      startingPriceSar: 1275,
      storeUrl: 'https://omniastores.com/collections/bridal-collection',
      features: ['Certified 925 Silver Hallmark', 'Anti-Tarnish Rhodium Dipped', 'Complimentary Velvet Chest'],
      featuresAr: ['ختم فضة عيار 925 المعتمد', 'مطلي بالروديوم المقاوم للأكسدة', 'صندوق مخملي فاخر مجاناً'],
    },
    // 11. Classic Brilliance
    {
      id: 'ad-classic-brilliance',
      headline: 'Classic Brilliance',
      headlineAr: 'البريق الكلاسيكي',
      subheadline: 'Sophisticated designs for life’s most precious moments. Handset Premium simulated diamonds with Italian micro-prong claws.',
      subheadlineAr: 'تصاميم رفيعة لأثمن لحظات الحياة. أحجار محاكاة الألماس الفاخرة مرصعة بمخالب إيطالية دقيقة.',
      category: 'Simulated Diamond',
      categoryAr: 'محاكاة الألماس',
      badge: 'HARPER’S BAZAAR EDIT',
      badgeAr: 'مختارات هاربرز بازار',
      image: '/campaigns/02_classic-brilliance.png',
      aspectRatio: 'aspect-[376/306]',
      startingPriceAed: 1150,
      startingPriceSar: 1173,
      storeUrl: 'https://omniastores.com/collections/simulated-diamonds',
      features: ['Flawless D-Color Clarity', 'Solid 925 Silver Base', 'Laser Hallmarked 925'],
      featuresAr: ['نقاء فائق بلون D الألماسي', 'قاعدة من الفضة الخالصة عيار 925', 'ختم ليزري عيار 925'],
    },
    // 12. Royal Allure
    {
      id: 'ad-royal-allure',
      headline: 'Royal Allure',
      headlineAr: 'الجاذبية الملكية',
      subheadline: 'A celebration of colour, crafted for extraordinary women. Vibrant ruby and sapphire accents in rhodium-plated sterling silver.',
      subheadlineAr: 'احتفاء بالألوان مصمم للمرأة الاستثنائية. لمسات الياقوت الأحمر والأزرق في فضة مطلية بالروديوم.',
      category: 'Ruby & Colour Gem',
      categoryAr: 'الياقوت والأحجار الملونة',
      badge: 'GALA EXCLUSIVE',
      badgeAr: 'حصري للحفلات الكبرى',
      image: '/campaigns/03_royal-allure.png',
      aspectRatio: 'aspect-[376/306]',
      startingPriceAed: 1450,
      startingPriceSar: 1479,
      storeUrl: 'https://omniastores.com/collections/luxury-sets',
      features: ['Vibrant Royal Gemstones', 'Handset Italian Prong Claws', 'Double Security Clasp'],
      featuresAr: ['أحجار كريمة ملكية متوهجة', 'ترصيع بمخالب إيطالية دقيقة', 'قفل أمان مزدوج عالي الحماية'],
    },
    // 13. Radiant Luxury
    {
      id: 'ad-radiant-luxury',
      headline: 'Radiant Luxury',
      headlineAr: 'الفخامة المتوهجة',
      subheadline: 'Brilliant canary yellow and diamond statement suites engineered for weddings and high-profile GCC galas.',
      subheadlineAr: 'أطقم الألماس والأصفر الكناري البراقة المصممة للأعراس وحفلات النخبة في الخليج.',
      category: 'Bridal Suites',
      categoryAr: 'أطقم الأعراس',
      badge: 'TOP GCC BESTSELLER',
      badgeAr: 'الأكثر مبيعاً في الخليج',
      image: '/campaigns/04_radiant-luxury.png',
      aspectRatio: 'aspect-[376/306]',
      startingPriceAed: 1350,
      startingPriceSar: 1377,
      storeUrl: 'https://omniastores.com/collections/luxury-sets',
      features: ['Canary Yellow Cushion Suite', 'Triple-Layer Rhodium Coating', '24-Hour Express Courier'],
      featuresAr: ['طقم أصفر كناري بقطع الوسادة', 'طلاء ثلاثي بالروديوم', 'شحن سريع خلال 24 ساعة'],
    },
    // 14. Modern Romance
    {
      id: 'ad-modern-romance',
      headline: 'Modern Romance',
      headlineAr: 'الرومانسية المعاصرة',
      subheadline: 'Romantic pastel sparkle designed for modern celebrations with delicate pink sapphire and morganite simulants.',
      subheadlineAr: 'بريق باستيل رومانسي مصمم للاحتفالات العصرية مع أحجار محاكاة المورغانيت والياقوت الوردي الرقيقة.',
      category: 'Bridal Suites',
      categoryAr: 'أطقم الأعراس',
      badge: 'ROMANTIC BRIDAL COLLECTION',
      badgeAr: 'تشكيلة الأعراس الرومانسية',
      image: '/campaigns/06_modern-romance.png',
      aspectRatio: 'aspect-[376/306]',
      startingPriceAed: 1180,
      startingPriceSar: 1203,
      storeUrl: 'https://omniastores.com/collections/bridal-collection',
      features: ['Pastel Morganite & Sapphire', 'Delicate Micro-Prong Detailing', 'Complimentary Gift Packaging'],
      featuresAr: ['مورغانيت وياقوت وردي باستيل', 'تفاصيل ترصيع مايكرو دقيقة', 'تغليف هدايا ملكي فاخر'],
    },
    // 16. Heirloom Beauty
    {
      id: 'ad-heirloom-beauty',
      headline: 'Heirloom Beauty',
      headlineAr: 'جمال الإرث المتوارث',
      subheadline: 'Enduring artisanal craftsmanship passed down through generations, honoring Trucial craftsmanship and vintage filigree.',
      subheadlineAr: 'حرفية يدوية خالدة تتوارثها الأجيال، تكريماً للتراث العربي وتفاصيل الصياغة التقليدية الدقيقة.',
      category: 'Curated Accessories',
      categoryAr: 'الإكسسوارات الفاخرة',
      badge: 'HERITAGE COUTURE',
      badgeAr: 'كوتور التراث الأصيل',
      image: '/campaigns/07_heirloom-beauty.png',
      aspectRatio: 'aspect-[376/306]',
      startingPriceAed: 980,
      startingPriceSar: 999,
      storeUrl: 'https://omniastores.com/collections/luxury-sets',
      features: ['Arabesque Heritage Motifs', 'Solid 925 Sterling Silver', 'Certificate of Authenticity'],
      featuresAr: ['زخارف أرابيسك تراثية راقية', 'فضة إسترلينية أصلية عيار 925', 'شهادة توثيق معتمدة'],
    },
    // 17. Floral Charm
    {
      id: 'ad-floral-charm',
      headline: 'Floral Charm',
      headlineAr: 'سحر الأزهار الطبيعية',
      subheadline: 'Nature-inspired petal formations handset with brilliant simulated diamond sparkle for breathtaking bridal radiance.',
      subheadlineAr: 'تكوينات بتلات مستوحاة من الطبيعة مرصعة بأحجار محاكاة الألماس البراقة لبريق عرائسي يخطف الأبصار.',
      category: 'Bridal Suites',
      categoryAr: 'أطقم الأعراس',
      badge: 'SPRING/SUMMER EDITION',
      badgeAr: 'إصدار الربيع والصيف',
      image: '/campaigns/08_floral-charm.png',
      aspectRatio: 'aspect-[376/306]',
      startingPriceAed: 1220,
      startingPriceSar: 1244,
      storeUrl: 'https://omniastores.com/collections/bridal-collection',
      features: ['Petal Cut Zircon Stones', 'Flexible Ergonomic Draping', 'Zero-Snag Finishing'],
      featuresAr: ['أحجار زركون مقطوعة على شكل بتلات', 'انسدال مرن ومريح للجسم', 'صقل ناعم لا يعلق بالأقمشة الحريرية'],
    },
    // 18. Regal Rubies
    {
      id: 'ad-regal-rubies',
      headline: 'Regal Rubies',
      headlineAr: 'الياقوت القرمزي المهيب',
      subheadline: 'Dramatic crimson statement suites for unforgettable evenings. Vibrant pigeon-blood simulated rubies with pavé clusters.',
      subheadlineAr: 'أطقم قرمزي دراماتيكية لسهرات لا تُنسى. ياقوت محاكى بلون دم الحمام مع مجموعات بافيه متلألئة.',
      category: 'Ruby & Colour Gem',
      categoryAr: 'الياقوت والأحجار الملونة',
      badge: 'AFTER-DARK ELEGANCE',
      badgeAr: 'أناقة السهرات الخاصة',
      image: '/campaigns/09_regal-rubies.png',
      aspectRatio: 'aspect-[376/306]',
      startingPriceAed: 1450,
      startingPriceSar: 1479,
      storeUrl: 'https://omniastores.com/collections/luxury-sets',
      features: ['Pigeon-Blood Ruby Simulants', 'Italian Pavé Setting', 'Insured Air Transit'],
      featuresAr: ['أحجار محاكاة ياقوت دم الحمام', 'ترصيع بافيه إيطالي فاخر', 'شحن جوي مؤمن بالكامل'],
    },
    // 19. Emerald Grandeur
    {
      id: 'ad-emerald-grandeur',
      headline: 'Emerald Grandeur',
      headlineAr: 'فخامة الزمرد الأخضر',
      subheadline: 'Majestic deep-green simulated emeralds framed in brilliant simulated diamonds and rhodium-finished 925 silver.',
      subheadlineAr: 'أحجار زمرد خضراء ملكية عميقة محاطة بالألماس البراق وفضة 925 مطلية بالروديوم المقاوم للأكسدة.',
      category: 'Emerald & Sapphire',
      categoryAr: 'الزمرد والياقوت الأزرق',
      badge: 'ROYAL SOVEREIGN SUITE',
      badgeAr: 'طقم الملوك والأمراء',
      image: '/campaigns/10_emerald-grandeur.png',
      aspectRatio: 'aspect-[376/306]',
      startingPriceAed: 1380,
      startingPriceSar: 1407,
      storeUrl: 'https://omniastores.com/collections/luxury-sets',
      features: ['Deep Colombian Emerald Hue', 'Rhodium Tarnish Shield', 'Dubai Central Lab Certified'],
      featuresAr: ['لون زمرد كولومبي عميق ونادر', 'درع روديوم مقاوم للأكسدة', 'معتمد من مختبر دبي المركزي'],
    },
    // 20. Pearl Revival
    {
      id: 'ad-pearl-revival',
      headline: 'Pearl Revival',
      headlineAr: 'إحياء تراث اللؤلؤ',
      subheadline: 'Arabian maritime pearl heritage re-imagined for modern wardrobes with high-luster freshwater pearls and diamond accents.',
      subheadlineAr: 'إرث اللؤلؤ البحري العربي برؤية عصرية تناسب الإطلالات الراقية مع لؤلؤ مياه عذبة براق وتفاصيل ألماسية.',
      category: 'Pearl Jewellery',
      categoryAr: 'مجوهرات اللؤلؤ',
      badge: 'HARPER’S BAZAAR EDIT',
      badgeAr: 'مختارات هاربرز بازار',
      image: '/campaigns/11_pearl-revival.png',
      aspectRatio: 'aspect-[376/306]',
      startingPriceAed: 850,
      startingPriceSar: 867,
      storeUrl: 'https://omniastores.com/collections/pearl-sets',
      features: ['High-Luster Natural Pearls', '75cm Layerable Rope Chain', 'Authentic Trucial Coast Design'],
      featuresAr: ['لؤلؤ طبيعي فائق اللمعان', 'سلسلة حبلية بطول 75 سم للطبقات', 'تصميم أصيل مستوحى من ساحل الخليج'],
    },
    // 21. Sapphire Sophistication
    {
      id: 'ad-sapphire-sophistication',
      headline: 'Sapphire Sophistication',
      headlineAr: 'رقي الياقوت الأزرق',
      subheadline: 'Timeless royal blue brilliance with refined evening charm. Deep royal sapphire simulants framed in handcrafted 925 sterling silver.',
      subheadlineAr: 'بريق أزرق ملكي خالد بسحر مسائي رفيع. أحجار ياقوت أزرق محاكاة بإطارات فضة إسترلينية 925 مصوغة يدوياً.',
      category: 'Emerald & Sapphire',
      categoryAr: 'الزمرد والياقوت الأزرق',
      badge: 'LIMITED ARTISAN RUN',
      badgeAr: 'إصدار حرفي محدود',
      image: '/campaigns/12_sapphire-sophistication.png',
      aspectRatio: 'aspect-[376/306]',
      startingPriceAed: 1320,
      startingPriceSar: 1346,
      storeUrl: 'https://omniastores.com/collections/luxury-sets',
      features: ['Deep Midnight Royal Sapphire', 'Brilliant Pavé Clusters', '24-Hour Priority Dispatch'],
      featuresAr: ['ياقوت أزرق داكن ملكي فاخر', 'مجموعات بافيه شديدة اللمعان', 'أولوية شحن خلال 24 ساعة'],
    },
  ], []);

  const categories = useMemo(() => {
    return [
      { key: 'All', en: 'All', ar: 'الكل' },
      { key: 'Emerald & Sapphire', en: 'Emerald & Sapphire', ar: 'الزمرد والياقوت الأزرق' },
      { key: 'Turquoise & Blue Stone', en: 'Turquoise & Blue Stone', ar: 'الفيروز والأحجار الزرقاء' },
      { key: 'Bridal Suites', en: 'Bridal Suites', ar: 'أطقم الأعراس' },
      { key: 'Ruby & Colour Gem', en: 'Ruby & Colour Gem', ar: 'الياقوت والأحجار الملونة' },
      { key: 'Pearl Jewellery', en: 'Pearl Jewellery', ar: 'مجوهرات اللؤلؤ' },
      { key: 'Curated Accessories', en: 'Curated Accessories', ar: 'الإكسسوارات الفاخرة' },
      { key: 'Simulated Diamond', en: 'Simulated Diamond', ar: 'محاكاة الألماس' },
    ];
  }, []);

  const filteredAdverts = useMemo(() => {
    if (selectedCategory === 'All') return adverts;
    return adverts.filter((ad) => ad.category === selectedCategory);
  }, [adverts, selectedCategory]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-gold/25 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-gold animate-spin" style={{ animationDuration: '6s' }} />
            <span>{isAr ? 'الحملات الإعلانية التجارية الرسمية • omniastores.com' : 'Official Commercial Campaigns • omniastores.com'}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-neutral-950 dark:text-white">
            {isAr ? 'إعلانات وحملات أمنية ستورز التجارية' : 'Omnia Stores Commercial Advertisements'}
          </h2>
          <p className="text-sm text-neutral-700 dark:text-neutral-400 mt-2 max-w-2xl">
            {isAr
              ? 'استكشف تشكيلات الحملات الإعلانية والتحريرية المميزة. تتصل كل حملة مباشرة بالمجموعات المعتمدة على المتجر الرسمي omniastores.com.'
              : 'Explore our signature editorial advertising spreads. Every campaign connects directly to official store collections on omniastores.com.'}
          </p>
        </div>

        <a
          href="https://omniastores.com/collections/luxury-sets"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold to-[#AA8C2C] text-black font-bold text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:opacity-95 transition-all transform hover:-translate-y-0.5 shimmer-btn shrink-0"
        >
          <span>{isAr ? 'تسوق التشكيلة الكاملة على المتجر الرئيسي' : 'Shop Entire Flagship Catalogue'}</span>
          <ArrowUpRight className={`w-4 h-4 ${isAr ? 'rotate-[-90deg]' : ''}`} />
        </a>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-4 mb-8">
        {categories.map((cat) => {
          const count = cat.key === 'All' ? adverts.length : adverts.filter((a) => a.category === cat.key).length;
          const isActive = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 ${
                isActive
                  ? 'bg-gold text-black shadow-md font-bold'
                  : 'bg-neutral-100 dark:bg-white/5 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-white/10 border border-neutral-200 dark:border-white/10'
              }`}
            >
              <span>{isAr ? cat.ar : cat.en}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                isActive ? 'bg-black text-gold font-mono' : 'bg-black/20 text-neutral-400 font-mono'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid of Commercial Advertisements */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredAdverts.map((ad) => {
          const headline = isAr ? ad.headlineAr : ad.headline;
          const subheadline = isAr ? ad.subheadlineAr : ad.subheadline;
          const category = isAr ? ad.categoryAr : ad.category;
          const badge = isAr ? ad.badgeAr : ad.badge;
          const features = isAr ? ad.featuresAr : ad.features;

          return (
            <div
              key={ad.id}
              className="group flex flex-col rounded-3xl overflow-hidden glass-panel border border-neutral-200 dark:border-gold/30 hover:border-[#B8860B]/70 dark:hover:border-gold/70 transition-all duration-300 bg-white dark:bg-[#0E121C] shadow-md dark:shadow-2xl hover:shadow-lg dark:hover:shadow-[0_15px_40px_rgba(212,175,55,0.25)]"
            >
              {/* Visual Image Banner: Exact Native Ratio, 100% Uncropped */}
              <a
                href={generateAffiliateUrl({
                  baseUrl: ad.storeUrl,
                  source: 'commercial_advert_visual',
                  medium: ad.id,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className={`block relative ${ad.aspectRatio || 'aspect-[819/1024]'} w-full overflow-hidden bg-black cursor-pointer group/img`}
                aria-label={`Explore ${headline} on Omnia Stores`}
              >
                <Image
                  src={ad.image}
                  alt={headline}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-contain object-center group-hover/img:scale-[1.02] transition-transform duration-500"
                />
              </a>

              {/* Content & Features */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] text-[#8B6508] dark:text-gold uppercase tracking-widest font-semibold block">
                      {category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-gold/15 border border-gold/30 text-[10px] font-mono font-bold text-[#8B6508] dark:text-gold">
                      {isAr ? `ابتداءً من ${formatPrice(ad.startingPriceAed, ad.startingPriceSar)}` : `From ${formatPrice(ad.startingPriceAed, ad.startingPriceSar)}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/80 dark:bg-gold/90 text-gold dark:text-black border border-gold/30 dark:border-transparent text-[9px] font-extrabold uppercase tracking-widest shadow-sm">
                      {badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-neutral-950 dark:text-white group-hover:text-[#B8860B] dark:group-hover:text-gold transition-colors leading-snug mb-2">
                    {headline}
                  </h3>
                  <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                    {subheadline}
                  </p>

                  {/* Features Checkmarks */}
                  <div className="space-y-1.5 pt-2 border-t border-neutral-200 dark:border-gold/15 mb-4">
                    {features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8B6508] dark:text-gold flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Buy Button to omniastores.com */}
                <div className="pt-3 border-t border-neutral-200 dark:border-gold/20 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-neutral-600 dark:text-neutral-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#8B6508] dark:text-gold" />
                    <span>{isAr ? 'فحص عيار 925' : '925 Assayed'}</span>
                  </div>

                  <a
                    href={generateAffiliateUrl({
                      baseUrl: ad.storeUrl,
                      source: 'commercial_advert_spreads',
                      medium: ad.id,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-gold to-[#AA8C2C] text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_12px_rgba(212,175,55,0.3)] hover:opacity-95 transition-all transform hover:-translate-y-0.5 shimmer-btn"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>{isAr ? 'تسوق على omniastores.com' : 'Shop on omniastores.com'}</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust & Guarantee Banner Bar */}
      <div className="mt-14 p-6 sm:p-8 rounded-3xl glass-panel border border-gold/30 bg-gradient-to-r from-black via-[#111624] to-black flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl dark-surface">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="p-3.5 rounded-2xl bg-gold/15 border border-gold/40 text-gold flex-shrink-0">
            <Truck className="w-8 h-8" />
          </div>
          <div>
            <h4
              style={{ color: '#FFFFFF' }}
              className="text-lg font-serif font-bold text-white stay-white"
            >
              {isAr ? 'ضمان التوصيل الرسمي للمتجر • omniastores.com' : 'Official Store Delivery Guarantee • omniastores.com'}
            </h4>
            <p className="text-xs text-neutral-300 mt-1 max-w-xl">
              {isAr
                ? 'توصيل سريع بالقفاز الأبيض خلال 24 ساعة في دبي، أبوظبي، والشارقة. شحن جوي مؤمن ومباشر إلى الرياض، جدة، وكافة مدن المملكة العربية السعودية عبر omniastores.com.'
                : '24-hour white-glove express courier across Dubai, Abu Dhabi & Sharjah. Direct insured air courier across Riyadh, Jeddah, and the Kingdom of Saudi Arabia via omniastores.com.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://omniastores.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-gold text-black font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-lg hover:opacity-95"
          >
            <span>{isAr ? 'زيارة المتجر omniastores.com' : 'Visit omniastores.com'}</span>
            <ArrowUpRight className={`w-4 h-4 ${isAr ? 'rotate-[-90deg]' : ''}`} />
          </a>
        </div>
      </div>
    </section>
  );
}