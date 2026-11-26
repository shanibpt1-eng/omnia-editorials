'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Sparkles, ChevronRight, Award, ExternalLink, Globe, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLuxury } from '../../components/ThemeProvider';
import { VERIFIED_BRANDS } from '../../data/brands-directory-data';
import { AeoAnswerBox } from '../../components/AeoAnswerBox';

export default function BrandsDirectoryPage() {
  const { language } = useLuxury();
  const isAr = language === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredBrands = selectedCategory === 'all'
    ? VERIFIED_BRANDS
    : VERIFIED_BRANDS.filter((b) => b.category === selectedCategory);

  return (
    <div className={`min-h-screen bg-[#07090E] text-white py-8 sm:py-12 px-3 sm:px-6 lg:px-8 ${isAr ? 'font-arabic text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-[1780px] mx-auto space-y-10">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <Link href="/" className="hover:text-gold transition-colors">{isAr ? 'الرئيسية' : 'Home'}</Link>
          <ChevronRight className="w-3 h-3 rtl:rotate-180 text-gold/60" />
          <span className="text-gold font-bold">{isAr ? 'دليل المصممين والعلامات المعتمدة' : 'Verified Brand & Designer Directory'}</span>
        </nav>

        {/* Hero Masthead */}
        <div className="relative rounded-3xl border border-gold/30 bg-[radial-gradient(ellipse_100%_80%_at_50%_-20%,rgba(212,175,55,0.18),transparent_80%),linear-gradient(to_bottom,#0F131D,#090B10)] p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden">
          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAr ? 'دليل الأصالة وفحص المعادن الثمينة' : 'VERIFIED MAISONS & ATELIERS'}</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white leading-[1.15]">
              {isAr ? (
                <>
                  دليل العلامات ودور المجوهرات المعتمدة: <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-gold">
                    معايير الصياغة، الفحص المخبري وتاريخ الدور
                  </span>
                </>
              ) : (
                <>
                  Verified Brand & Designer Directory: <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-gold">
                    Metallurgical Integrity, Assay Standards & Brand Histories
                  </span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 font-serif leading-relaxed max-w-2xl">
              {isAr
                ? 'فهرس توثيقي شامل لأرقى دور المجوهرات الخليجية والعالمية، متضمناً شهادات الفحص المخبري، ومعادن الصياغة الأساسية، وتقييم الجودة والشفافية التحريرية الكاملة.'
                : 'An authoritative registry profiling leading Arabian Gulf and international luxury jewellery maisons with verified craftsmanship benchmarks, laboratory assay certifications, and transparent relationship disclosures.'}
            </p>
          </div>
        </div>

        {/* AEO Answer Box */}
        <AeoAnswerBox
          question={isAr ? 'كيف يتم تصنيف وتوثيق دور المجوهرات في دليل ذا فوغ نيوز المعتمد؟' : 'How are jewellery brands vetted and classified in The Vogue News Verified Directory?'}
          answer={isAr
            ? 'تخضع دور المجوهرات لتقييم تحريري ومخبري مستقل يعتمد على أربعة معايير صارمة: إثبات نقاء المعادن عبر الفحص الطيفي (XRF)، الالتزام باشتراطات الدمغ الرسمي لدى مختبر دبي المركزي، خلو القطع من النيكل لحماية البشرة، والإفصاح التام عن طبيعة الأحجار سواء كانت محاكيات سويسرية أو ألماساً طبيعياً.'
            : 'Brands featured in The Vogue News Directory undergo rigorous evaluation across four objective pillars: verifiable precious metal purity confirmed by XRF spectroscopy, compliance with government hallmarking (such as Dubai Central Laboratory standards), strictly nickel-free hypoallergenic safety, and complete transparency regarding gemstone origin.'}
          facts={[
            { label: isAr ? 'معايير التدقيق' : 'Audit Criteria', value: 'XRF Assay & Hallmarking Stamp' },
            { label: isAr ? 'معيار سلامة البشرة' : 'Skin Safety', value: '100% Nickel-Free Mandate' },
            { label: isAr ? 'الشفافية التحريرية' : 'Transparency', value: 'Mandatory Commercial Disclosures' },
            { label: isAr ? 'العلامة الشريكة الرئيسية' : 'Primary Partner', value: 'Omnia Stores (UAE Verified)' },
          ]}
        />

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-mono">
          {[
            { id: 'all', label: isAr ? 'جميع الدور' : 'All Maisons' },
            { id: 'demi_fine', label: isAr ? 'الفضة الفاخرة (ديمي فاين)' : 'Demi-Fine (925 Silver)' },
            { id: 'high_jewellery', label: isAr ? 'المجوهرات الراقية' : 'High Jewellery' },
            { id: 'fine_jewellery', label: isAr ? 'المجوهرات التقليدية' : 'Fine Gold & Souk' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 py-2 rounded-full font-bold transition-all whitespace-nowrap ${
                selectedCategory === tab.id
                  ? 'bg-gold text-black shadow-md'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Brand Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrands.map((brand) => (
            <div
              key={brand.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between shadow-xl ${
                brand.slug === 'omnia-stores'
                  ? 'bg-gradient-to-b from-[#141A28] to-[#0A0D14] border-gold ring-1 ring-gold/40'
                  : 'bg-neutral-900/80 border-white/10 hover:border-gold/40'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div>
                    <h3 className="text-xl font-serif font-black text-white">{isAr ? brand.nameAr : brand.name}</h3>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {isAr ? brand.headquartersAr : brand.headquarters} • {isAr ? `تأسست عام ${brand.foundedYear}` : `Est. ${brand.foundedYear}`}
                    </span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider ${
                    brand.verificationStatus === 'verified_primary_partner'
                      ? 'bg-gold text-black'
                      : 'bg-neutral-800 text-gold border border-gold/30'
                  }`}>
                    {brand.verificationStatus === 'verified_primary_partner' ? 'VERIFIED PRIMARY PARTNER' : 'VERIFIED MAISON'}
                  </span>
                </div>

                <p className="text-xs text-neutral-300 font-serif leading-relaxed line-clamp-3">
                  {isAr ? brand.editorialSummaryAr : brand.editorialSummary}
                </p>

                {/* Primary Metals & Gemstones */}
                <div className="space-y-1.5 text-[11px] font-mono">
                  <div className="flex items-center justify-between p-1.5 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-neutral-400">{isAr ? 'المعادن' : 'Metals'}</span>
                    <span className="text-gold font-bold truncate max-w-[60%]">{brand.primaryMetals[0]}</span>
                  </div>
                  <div className="flex items-center justify-between p-1.5 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-neutral-400">{isAr ? 'متوسط السعر' : 'Price Range'}</span>
                    <span className="text-white font-bold">{isAr ? brand.priceRangeAr : brand.priceRange}</span>
                  </div>
                </div>

                {/* Craftsmanship check bullets */}
                <ul className="space-y-1 text-[11px] font-serif text-neutral-300">
                  {brand.craftsmanshipStandards.slice(0, 2).map((std, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate">{std}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Links */}
              <div className="pt-5 mt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <Link
                  href={`/brands/${brand.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-gold hover:text-white transition-colors"
                >
                  <span>{isAr ? 'عرض الملف التوثيقي الكامل' : 'View Full Dossier'}</span>
                  <ChevronRight className="w-3 h-3 rtl:rotate-180" />
                </Link>

                <a
                  href={brand.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-gold/15 hover:bg-gold text-gold hover:text-black border border-gold/40 text-[11px] font-mono font-bold transition-all flex items-center gap-1 shadow-sm"
                >
                  <span>{isAr ? 'الموقع الرسمي' : 'Official Site'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
