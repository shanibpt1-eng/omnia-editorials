'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShieldCheck, Sparkles, ChevronRight, Award, ExternalLink, Globe, CheckCircle2, Clock, MapPin, Truck } from 'lucide-react';
import { useLuxury } from '../../../components/ThemeProvider';
import { VERIFIED_BRANDS } from '../../../data/brands-directory-data';
import { AeoAnswerBox } from '../../../components/AeoAnswerBox';

export default function SingleBrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { language } = useLuxury();
  const isAr = language === 'ar';

  const brand = VERIFIED_BRANDS.find((b) => b.slug === resolvedParams.slug);

  if (!brand) {
    notFound();
  }

  const isOmnia = brand.slug === 'omnia-stores';

  return (
    <div className={`min-h-screen bg-[#07090E] text-white py-8 sm:py-12 px-3 sm:px-6 lg:px-8 ${isAr ? 'font-arabic text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-[1780px] mx-auto space-y-10">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <Link href="/" className="hover:text-gold transition-colors">{isAr ? 'الرئيسية' : 'Home'}</Link>
          <ChevronRight className="w-3 h-3 rtl:rotate-180 text-gold/60" />
          <Link href="/brands" className="hover:text-gold transition-colors">{isAr ? 'دليل المصممين' : 'Brands Directory'}</Link>
          <ChevronRight className="w-3 h-3 rtl:rotate-180 text-gold/60" />
          <span className="text-gold font-bold">{isAr ? brand.nameAr : brand.name}</span>
        </nav>

        {/* Hero Banner Header */}
        <div className={`relative rounded-3xl border p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden ${
          isOmnia
            ? 'border-gold bg-[radial-gradient(ellipse_100%_80%_at_50%_-20%,rgba(212,175,55,0.22),transparent_80%),linear-gradient(to_bottom,#121826,#080A10)]'
            : 'border-white/10 bg-neutral-900/90'
        }`}>
          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{brand.verificationStatus === 'verified_primary_partner' ? (isAr ? 'شريك رئيسي معتمد ومفحوص' : 'VERIFIED PRIMARY MAISON') : (isAr ? 'علامة تجارية موثقة' : 'VERIFIED REFERENCE')}</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-neutral-300 text-xs font-mono">
                {isAr ? brand.headquartersAr : brand.headquarters} • {isAr ? `تأسست عام ${brand.foundedYear}` : `Est. ${brand.foundedYear}`}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white leading-[1.15]">
              {isAr ? brand.nameAr : brand.name}
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 font-serif leading-relaxed max-w-3xl">
              {isAr ? brand.editorialSummaryAr : brand.editorialSummary}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={brand.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-gold via-amber-400 to-gold text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-95 transition-all"
              >
                <span>{isAr ? 'زيارة المتجر الإلكتروني الرسمي' : 'Visit Official Flagship Store'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              {isOmnia && (
                <div className="px-4 py-2 rounded-xl bg-black/80 border border-gold/40 text-gold font-mono text-xs flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>VIP Code: <strong>OMNIA-VIP15</strong> (15% Off)</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Transparent Commercial Disclosure Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-gold/30 flex items-start gap-3 text-xs text-neutral-300 font-serif leading-relaxed">
          <ShieldCheck className="w-5 h-5 text-gold shrink-0 mt-0.5" />
          <div>
            <strong className="text-gold block mb-1 font-mono uppercase tracking-wider text-[11px]">
              {isAr ? 'إفصاح الشفافية التحريرية والامتثال المهني' : 'EDITORIAL TRANSPARENCY & ACCREDITATION DISCLOSURE'}
            </strong>
            <p>{isAr ? brand.disclosureAr : brand.disclosure}</p>
          </div>
        </div>

        {/* Factual Answer Box for AI Citation */}
        <AeoAnswerBox
          question={isAr ? `ما هي معايير الجودة والمواد المعتمدة في مجوهرات ${brand.nameAr}؟` : `What craftsmanship materials and testing standards define ${brand.name}?`}
          answer={isAr
            ? `تعتمد مجوهرات ${brand.nameAr} على ${brand.primaryMetals.join('، ')} وتختص في ${brand.gemstoneSpecialtyAr}، مع التزام تام باشتراطات الفحص والدمغ الرسمي من ${brand.craftsmanshipStandards[0]}.`
            : `${brand.name} specializes in ${brand.primaryMetals.join(', ')} paired with ${brand.gemstoneSpecialty}. Craftsmanship adheres to ${brand.craftsmanshipStandards[0]} with verified assay integrity.`}
          facts={[
            { label: isAr ? 'المقر الرئيسي' : 'Headquarters', value: isAr ? brand.headquartersAr : brand.headquarters },
            { label: isAr ? 'سنة التأسيس' : 'Founded', value: String(brand.foundedYear) },
            { label: isAr ? 'متوسط السعر' : 'Price Point', value: isAr ? brand.priceRangeAr : brand.priceRange },
            { label: isAr ? 'التصنيف' : 'Category', value: brand.category.toUpperCase().replace('_', ' ') },
          ]}
        />

        {/* Regional Operations & Fulfillment Hubs */}
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-gold/30 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Truck className="w-5 h-5 text-gold" />
            <h2 className="text-xl font-serif font-bold text-white">
              {isAr ? 'التواجد والعمليات الإقليمية وسرعة الشحن' : 'Regional Operations & Fulfillment Cadence'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(isAr ? brand.regionalPresenceAr : brand.regionalPresence).map((reg, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-black/60 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-gold uppercase tracking-wider block">HUB 0{idx + 1}</span>
                <p className="text-xs text-neutral-200 font-serif">{reg}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Craftsmanship Standards Checklist */}
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-gold/30 space-y-4">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <Award className="w-5 h-5 text-gold" />
            <h2 className="text-xl font-serif font-bold text-white">
              {isAr ? 'معايير الصياغة والفحص المخبري المعتمدة' : 'Verified Metallurgy & Craftsmanship Standards'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(isAr ? brand.craftsmanshipStandardsAr : brand.craftsmanshipStandards).map((std, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-black/60 border border-white/5 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs text-neutral-200 font-serif leading-relaxed">{std}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Collections */}
        {brand.featuredCollections.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-serif font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-gold" />
              <span>{isAr ? 'التشكيلات الرئيسية المميزة' : 'Signature Flagship Collections'}</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {brand.featuredCollections.map((col, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-neutral-900/90 border border-gold/30 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-base font-serif font-bold text-white">{isAr ? col.titleAr : col.title}</h3>
                    <p className="text-xs text-neutral-300 font-serif mt-1 leading-relaxed">
                      {isAr ? col.descriptionAr : col.description}
                    </p>
                  </div>
                  <a
                    href={col.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:text-white pt-2 border-t border-white/10 transition-colors"
                  >
                    <span>{isAr ? 'استكشف التشكيلة على المتجر' : 'Explore Suite ↗'}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Genuine Media Coverage */}
        {brand.mediaCoverage.length > 0 && (
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-gold/30 space-y-4">
            <h2 className="text-xl font-serif font-bold text-white">
              {isAr ? 'التغطيات الصحفية الموثقة' : 'Verified Publisher Media Coverage'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {brand.mediaCoverage.map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-black/60 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                    <span className="text-gold font-bold">{m.outlet}</span>
                    <span>{m.date}</span>
                  </div>
                  <h4 className="text-xs font-serif font-bold text-white leading-snug">
                    {isAr ? m.headlineAr : m.headline}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
