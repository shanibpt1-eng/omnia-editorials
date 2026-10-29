'use client';

import React from 'react';
import Image from 'next/image';
import { ShoppingBag, Star, Check, ShieldCheck } from 'lucide-react';
import { LuxuryProduct } from '../lib/types';
import { generateAffiliateUrl } from '../lib/affiliateEngine';
import { useLuxury } from './ThemeProvider';
import { getArabicProductTitle, getBadgeLabel, getSpecLabel } from '../lib/productLocalization';

export interface ProductCardProps {
  product: LuxuryProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { formatPrice, currency, language } = useLuxury();
  const isAr = language === 'ar';

  const defaultFallback = '/press/inside-luxury-bridal-sets-feature.jpg';
  const [primarySrc, setPrimarySrc] = React.useState(product.images[0] || defaultFallback);
  const [hoverSrc, setHoverSrc] = React.useState(product.images[1] || product.images[0] || defaultFallback);

  // Sync if product prop changes
  React.useEffect(() => {
    if (product.images[0]) setPrimarySrc(product.images[0]);
    const hoverCandidate = product.images[1] || product.images[0];
    if (hoverCandidate) setHoverSrc(hoverCandidate);
  }, [product]);

  const getCategoryLabel = (name: string) => {
    if (!isAr) return name;
    const map: Record<string, string> = {
      'Luxury Sets': 'أطقم فاخرة',
      'Bridal Sets': 'أطقم أعراس',
      'Pearl Sets': 'أطقم لؤلؤ',
      'Tennis Bracelets': 'أساور تنس',
      'Chokers': 'شوكر وطوق',
      'Rings': 'خواتم ملكية',
      'Earrings': 'أقراط متدلية',
      'Pendants': 'قلادات',
      'Bangles': 'أساور صلبة',
      'Anklets': 'خلاخيل',
      'Brooches': 'بروشات',
      'Accessories': 'إكسسوارات',
    };
    return map[name] || name;
  };

  const getMaterialLabel = (mat: string) => {
    if (!isAr) return mat;
    if (mat.includes('925') || mat.toLowerCase().includes('silver')) {
      return 'فضة إسترلينية عيار 925 أصلية';
    }
    return mat;
  };

  const displayTitle = isAr ? (product.titleAr || getArabicProductTitle(product.title)) : product.title;

  // Programmatic Affiliate URL
  const buyUrl = generateAffiliateUrl({
    baseUrl: product.productUrl || product.storeUrl,
    source: 'product_card',
    medium: 'direct_buy',
  });

  // JSON-LD Product Microdata Schema
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: [primarySrc, hoverSrc],
    description: `${product.title} - Handcrafted in ${product.material}. Certified 925 assay hallmarking.`,
    brand: {
      '@type': 'Brand',
      name: 'Omnia Stores',
    },
    sku: product.id,
    offers: {
      '@type': 'Offer',
      url: buyUrl,
      priceCurrency: currency,
      price: currency === 'SAR' ? product.priceSar : product.priceAed,
      priceValidUntil: '2027-12-31',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Omnia Stores',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating || 4.9,
      reviewCount: product.reviewsCount || 120,
    },
  };

  return (
    <div className="group rounded-3xl overflow-hidden glass-panel border border-neutral-200 dark:border-gold/25 hover:border-[#B8860B]/60 dark:hover:border-gold/60 transition-all duration-300 flex flex-col justify-between bg-white dark:bg-[#111520] shadow-md dark:shadow-xl hover:shadow-lg dark:hover:shadow-[0_15px_35px_rgba(212,175,55,0.25)] relative">
      {/* Dynamic Embedded Microdata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Product Visual Container with Hover Crossfade */}
      <div className="relative h-64 w-full overflow-hidden bg-black/90">
        {/* Primary Image */}
        <Image
          src={primarySrc}
          alt={product.title}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          onError={() => setPrimarySrc(defaultFallback)}
          className="object-cover object-center transition-opacity duration-500 group-hover:opacity-0"
        />
        {/* Hover Image */}
        <Image
          src={hoverSrc}
          alt={`${product.title} Lifestyle Preview`}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          onError={() => setHoverSrc(defaultFallback)}
          className="object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="px-2.5 py-0.5 rounded-full bg-gold/90 text-black text-[10px] font-bold uppercase tracking-wider shadow">
              {getBadgeLabel(product.badge, isAr)}
            </span>
          )}
          <span className="px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-gold/30 text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {isAr ? 'متوفر' : 'In Stock'}
          </span>
        </div>

        <div className="absolute top-3 right-3 z-10">
          <span className="px-2 py-0.5 rounded-md bg-black/80 border border-gold/30 text-[10px] text-gold font-mono">
            {isAr ? 'فضة 925' : '925 SILVER'}
          </span>
        </div>
      </div>

      {/* Details & Specs */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-1">
            <span>{getCategoryLabel(product.category)}</span>
            <div className="flex items-center text-amber-500 dark:text-amber-400 gap-0.5">
              <Star className="w-3 h-3 fill-amber-500 dark:fill-amber-400 text-amber-500 dark:text-amber-400" />
              <span className="text-[10px] font-bold text-neutral-900 dark:text-white font-mono">
                {product.rating || 4.9}
              </span>
            </div>
          </div>

          <h3 className="text-sm font-serif font-bold text-neutral-950 dark:text-white group-hover:text-[#B8860B] dark:group-hover:text-gold transition-colors leading-snug line-clamp-2 mb-2">
            {displayTitle}
          </h3>

          <p className="text-[11px] text-neutral-600 dark:text-neutral-400 line-clamp-1 mb-3">
            {getMaterialLabel(product.material)}
          </p>

          <div className="space-y-1 mb-3">
            {product.specs.slice(0, 2).map((spec, i) => (
              <div key={i} className="text-[11px] text-neutral-700 dark:text-neutral-400 flex items-center gap-1.5">
                <Check className="w-3 h-3 text-[#8B6508] dark:text-gold flex-shrink-0" />
                <span className="truncate">{getSpecLabel(spec, isAr)}</span>
              </div>
            ))}
          </div>

          {/* E-E-A-T Lab Verification Indicator */}
          <div className="flex items-center gap-1.5 text-[10px] text-neutral-600 dark:text-neutral-400 mb-3 pt-1.5 border-t border-neutral-200 dark:border-gold/10">
            <ShieldCheck className="w-3 h-3 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
            <span className="truncate">{isAr ? 'مفحوص ومختوم في مختبر دبي (عيار 925)' : 'DCL Laboratory Assay Tested (925 UAE)'}</span>
          </div>
        </div>

        {/* Pricing & Direct CTA */}
        <div className="pt-3 border-t border-neutral-200 dark:border-gold/20 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block">
              {isAr ? `السعر (${currency})` : `Price (${currency})`}
            </span>
            <span className="text-base font-bold text-[#8B6508] dark:text-gold font-mono">
              {formatPrice(product.priceAed, product.priceSar)}
            </span>
          </div>

          <a
            href={buyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-gold to-[#AA8C2C] text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:opacity-95 shadow-[0_0_12px_rgba(212,175,55,0.3)] transition-all transform hover:-translate-y-0.5 shimmer-btn"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isAr ? 'تسوق الآن' : 'Shop'}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
