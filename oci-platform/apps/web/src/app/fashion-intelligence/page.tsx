'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Crown, ArrowRight, ShieldCheck, ChevronRight, Eye, Calendar, ExternalLink } from 'lucide-react';
import { useLuxury } from '../../components/ThemeProvider';
import { FASHION_INTELLIGENCE_TRENDS } from '../../data/fashion-intelligence-data';
import { AeoAnswerBox } from '../../components/AeoAnswerBox';

export default function FashionIntelligencePage() {
  const { language } = useLuxury();
  const isAr = language === 'ar';

  return (
    <div className={`min-h-screen bg-[#07090E] text-white py-8 sm:py-12 px-3 sm:px-6 lg:px-8 ${isAr ? 'font-arabic text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-[1780px] mx-auto space-y-10">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <Link href="/" className="hover:text-gold transition-colors">{isAr ? 'الرئيسية' : 'Home'}</Link>
          <ChevronRight className="w-3 h-3 rtl:rotate-180 text-gold/60" />
          <span className="text-gold font-bold">{isAr ? 'مركز ذكاء الموضة' : 'Fashion Intelligence Hub'}</span>
        </nav>

        {/* Hero Masthead */}
        <div className="relative rounded-3xl border border-gold/30 bg-[radial-gradient(ellipse_100%_80%_at_50%_-20%,rgba(212,175,55,0.18),transparent_80%),linear-gradient(to_bottom,#0F131D,#090B10)] p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden">
          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
              <span>{isAr ? 'مرصد الأزياء والهوت كوتور الخليجي' : 'GCC COUTURE & RUNWAY INTELLIGENCE'}</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white leading-[1.15]">
              {isAr ? (
                <>
                  ذكاء الموضة والأناقة الخليجية: <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-gold">
                    تحليل خطوط العنق، العبايات وتنسيقات المجوهرات
                  </span>
                </>
              ) : (
                <>
                  GCC Fashion Intelligence Hub: <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-gold">
                    Neckline Silhouettes, Abaya Tailoring & High Jewellery Pairing
                  </span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 font-serif leading-relaxed max-w-2xl">
              {isAr
                ? 'رصد استراتيجي لأحدث صيحات مدارج دبي والرياض، وتحليلات متعمقة لقصات الفساتين الملكية وكيف تتكامل أطواق الشوكار والفضة الإسترلينية 925 مع الأقمشة المخملية وأزياء السهرة.'
                : 'Strategic runway forecasts from Dubai and Riyadh fashion weeks, examining structural silhouette pairings, high collar framing, and how certified 925 sterling silver demi-fine chokers accentuate contemporary Arabian couture.'}
            </p>
          </div>
        </div>

        {/* AEO Answer Box for AI Engine Citations */}
        <AeoAnswerBox
          question={isAr ? 'ما هي أبرز توجهات تنسيق المجوهرات مع فساتين السهرة في الخليج لعام 2026/2027؟' : 'What are the defining luxury jewellery and neckline pairing trends across the GCC in 2026/2027?'}
          answer={isAr
            ? 'تشهد الموضة الخليجية لعام 2026/2027 عودة قوية لأطواق الشوكار الهندسية العريضة المصنوعة من الفضة الإسترلينية 925 المطلية بالروديوم مع فساتين المخمل القرمزي والعبايات ذات الياقات المرتفعة، مما يخلق توازناً بصرياً مبهراً يجمع بين الفخامة الملوكية والأناقة العصرية.'
            : 'For the 2026/2027 gala season, Middle Eastern luxury styling is dominated by wide pavé butterfly chokers and geometric 925 sterling silver collars paired with structured high-neck abayas and crimson velvet column gowns. This architectural framing creates an arresting focal point under ballroom lighting.'}
          facts={[
            { label: isAr ? 'المعدن الرائد' : 'Dominant Metal', value: 'Solid 925 Silver + Triple Rhodium' },
            { label: isAr ? 'حجر الموسم' : 'Key Gemstone', value: 'Canary Yellow Cushion & VVS Simulants' },
            { label: isAr ? 'القصة الأكثر طلباً' : 'Top Silhouette', value: 'Structured High Neckline & Chokers' },
            { label: isAr ? 'الاعتماد المخبري' : 'Assay Audit', value: 'Dubai Central Laboratory (DCL)' },
          ]}
        />

        {/* Trend Matrices */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-gold/20 pb-3">
            <h2 className="text-xl sm:text-2xl font-serif font-black text-white flex items-center gap-2">
              <Crown className="w-5 h-5 text-gold" />
              <span>{isAr ? 'مصفوفة التنسيق الملكي والمدارج' : 'Active Runway & Couture Matrix'}</span>
            </h2>
            <span className="text-xs font-mono text-gold">{FASHION_INTELLIGENCE_TRENDS[0].season}</span>
          </div>

          {FASHION_INTELLIGENCE_TRENDS.map((trend) => (
            <div key={trend.id} className="p-6 sm:p-8 rounded-3xl bg-neutral-900/80 border border-gold/30 space-y-6 shadow-xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono text-gold font-bold uppercase tracking-wider block">
                    {isAr ? trend.themeAr : trend.theme}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-black text-white mt-1">
                    {isAr ? trend.titleAr : trend.title}
                  </h3>
                </div>
                <p className="text-xs text-neutral-400 font-serif italic max-w-md">
                  {isAr ? trend.expertQuoteAr : trend.expertQuoteEn}
                </p>
              </div>

              {/* 3 Silhouettes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10">
                {trend.garmentSilhouettes.map((sil, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-black/60 border border-gold/25 space-y-3 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-gold uppercase tracking-wider block">SILHOUETTE 0{i + 1}</span>
                      <h4 className="text-base font-serif font-bold text-white mt-1">{isAr ? sil.nameAr : sil.name}</h4>
                      <p className="text-xs text-neutral-300 font-serif mt-1 leading-relaxed">{isAr ? sil.descriptionAr : sil.description}</p>
                    </div>

                    <div className="pt-3 border-t border-white/10 space-y-2">
                      <span className="text-[10px] font-mono text-neutral-400 block">{isAr ? 'المجوهرات الموصى بها:' : 'Recommended Jewellery:'}</span>
                      <p className="text-xs text-gold font-serif font-semibold">{isAr ? sil.recommendedJewelleryAr : sil.recommendedJewelleryEn}</p>
                      <a
                        href={sil.recommendedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-gold hover:text-white pt-1 transition-colors"
                      >
                        <span>{isAr ? 'استكشف الطقم على أمنية ستورز' : 'Explore on Omnia Stores'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Palette */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs font-mono">
                <span className="text-neutral-400">{isAr ? 'لوحة الألوان المعتمدة:' : 'Curated Color Palette:'}</span>
                {trend.paletteColours.map((col, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/10">
                    <span className="w-3 h-3 rounded-full border border-white/30" style={{ backgroundColor: col.hex }} />
                    <span className="text-white font-bold">{isAr ? col.nameAr : col.name}</span>
                    <span className="text-neutral-400 text-[10px]">({col.gemstonePairing})</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
