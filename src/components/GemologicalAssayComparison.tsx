'use client';

import React, { useState } from 'react';
import { ShieldCheck, Sparkles, Award, ArrowUpRight, CheckCircle2, FlaskConical, Atom } from 'lucide-react';
import { generateAffiliateUrl } from '../lib/affiliateEngine';
import { useLuxury } from './ThemeProvider';

export function GemologicalAssayComparison() {
  const { t, language } = useLuxury();
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState<'dispersion' | 'alloy' | 'assay'>('dispersion');

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-gold/40 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-gradient-to-r from-black via-[#0B0E17] to-[#111624] p-6 sm:p-10 lg:p-14 group dark-surface">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(212,175,55,0.15)_0%,transparent_70%)] blur-[90px] pointer-events-none animate-aura-pulse" />
        <div className="absolute -bottom-10 left-10 w-96 h-96 bg-[radial-gradient(circle,rgba(243,229,171,0.08)_0%,transparent_70%)] blur-[90px] pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b border-gold/25 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-bold uppercase tracking-[0.25em] mb-3 backdrop-blur-md shadow-sm">
              <FlaskConical className="w-3.5 h-3.5 text-gold animate-spin" style={{ animationDuration: '8s' }} />
              <span>{isAr ? 'معلومات الفحص المخبري لمختبر دبي ومطابقة GIA' : 'GIA GEMOLOGICAL & DCL ASSAY INTELLIGENCE'}</span>
            </div>
            <h2
              style={{ color: '#FFFFFF' }}
              className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15] stay-white"
            >
              {t.assayTitle}
            </h2>
            <p className="text-sm text-neutral-300 mt-2 max-w-2xl leading-relaxed">
              {t.assaySubtitle}
            </p>
          </div>

          {/* Interactive Scientific Tabs */}
          <div className="flex items-center gap-2 bg-black/60 p-1.5 rounded-2xl border border-gold/30 shrink-0 self-start lg:self-auto">
            <button
              onClick={() => setActiveTab('dispersion')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === 'dispersion'
                  ? 'bg-gold text-black font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAr ? 'البريـق والتشتت' : 'Fire & Dispersion'}</span>
            </button>
            <button
              onClick={() => setActiveTab('alloy')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === 'alloy'
                  ? 'bg-gold text-black font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Atom className="w-3.5 h-3.5" />
              <span>{isAr ? 'نقاء عيار 925' : '925 Alloy Purity'}</span>
            </button>
            <button
              onClick={() => setActiveTab('assay')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === 'assay'
                  ? 'bg-gold text-black font-bold shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAr ? 'فحص مختبر دبي' : 'DCL Certification'}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Optical Dispersion & Fire Comparison */}
        {activeTab === 'dispersion' && (
          <div className="relative z-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-black/80 border-2 border-gold shadow-[0_0_25px_rgba(212,175,55,0.25)] relative overflow-hidden">
                <div className="absolute top-0 right-0 px-2.5 py-0.5 bg-gold text-black text-[9px] font-mono font-bold uppercase tracking-wider rounded-bl-lg">
                  {isAr ? 'مواصفات أمنية' : 'OMNIA SPEC'}
                </div>
                <span className="text-xs uppercase tracking-widest text-gold font-bold block mb-1">
                  {isAr ? 'أحجار محاكاة الفاخرة' : 'Premium Simulated Diamonds'}
                </span>
                <span className="text-2xl font-serif font-bold text-white block">
                  {isAr ? 'بريق 0.044' : '0.044 Fire'}
                </span>
                <span className="text-[11px] text-neutral-400 block mt-2">
                  {isAr
                    ? 'تطابق تام في التشتت البصري مع الألماس الطبيعي. خالية تماماً من العكارة، مقطوعة يدوياً بـ 58 وجهاً براقاً.'
                    : 'Exact optical dispersion match to natural diamonds. Zero milky cloudiness, hand-cut with 58 brilliant facets.'}
                </span>
                <div className="mt-4 pt-3 border-t border-gold/20 flex items-center justify-between text-xs font-mono text-gold">
                  <span>{isAr ? 'معامل الانكسار: 2.15' : 'Refraction: 2.15'}</span>
                  <span>{isAr ? 'الصلادة: 8.5 موهس' : 'Hardness: 8.5 Mohs'}</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-black/50 border border-white/10">
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold block mb-1">
                  {isAr ? 'الألماس الطبيعي المستخرج' : 'Natural Mined Diamond'}
                </span>
                <span className="text-2xl font-serif font-bold text-neutral-200 block">
                  {isAr ? 'بريق 0.044' : '0.044 Fire'}
                </span>
                <span className="text-[11px] text-neutral-400 block mt-2">
                  {isAr
                    ? 'تشتت بريقي متطابق. الألماس المستخرج يفرض هوامش ربح 10 إلى 50 ضعفاً مع متطلبات تأمين وحفظ في خزائن بنكية.'
                    : 'Identical fire dispersion. Mined diamonds incur 10x-50x retail markups and extensive security/vault requirements.'}
                </span>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>{isAr ? 'الانكسار: 2.42' : 'Refraction: 2.42'}</span>
                  <span>{isAr ? 'الصلادة: 10 موهس' : 'Hardness: 10 Mohs'}</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-black/50 border border-white/10">
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold block mb-1">
                  {isAr ? 'المويسانيت الاصطناعي' : 'Synthetic Moissanite'}
                </span>
                <span className="text-2xl font-serif font-bold text-neutral-200 block">
                  {isAr ? 'بريق 0.104' : '0.104 Fire'}
                </span>
                <span className="text-[11px] text-neutral-400 block mt-2">
                  {isAr
                    ? 'تشتت لوني مفرط يشبه قوس قزح يسهل تمييزه من قبل المراقبين كحجر غير تقليدي.'
                    : 'Over-dispersive "disco-ball" chromatic rainbow refraction, easily recognizable as non-traditional by observers.'}
                </span>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>{isAr ? 'الانكسار: 2.65' : 'Refraction: 2.65'}</span>
                  <span>{isAr ? 'الصلادة: 9.25 موهس' : 'Hardness: 9.25 Mohs'}</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-black/50 border border-white/10">
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold block mb-1">
                  {isAr ? 'الزجاج التجاري والستراس' : 'Commercial Glass / Strass'}
                </span>
                <span className="text-2xl font-serif font-bold text-neutral-200 block">
                  {isAr ? 'بريق 0.014' : '0.014 Fire'}
                </span>
                <span className="text-[11px] text-neutral-400 block mt-2">
                  {isAr
                    ? 'أحجار باهتة مثبتة بالغراء تتعرض للخدش وتفقد لونها سريعاً في الرطوبة الساحلية للخليج.'
                    : 'Dull, lifeless, glued-in stones that scratch and discolor rapidly in coastal Gulf humidity.'}
                </span>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>{isAr ? 'الانكسار: 1.52' : 'Refraction: 1.52'}</span>
                  <span>{isAr ? 'الصلادة: 5.5 موهس' : 'Hardness: 5.5 Mohs'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: 925 Alloy & Rhodium Shielding */}
        {activeTab === 'alloy' && (
          <div className="relative z-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-black/70 border border-gold/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/40 flex items-center justify-center text-gold font-mono font-bold">
                    Ag
                  </div>
                  <div>
                    <h4 className="text-base font-serif font-bold text-white">
                      {isAr ? '92.5% فضة نقية أصلية' : '92.5% Elemental Silver'}
                    </h4>
                    <span className="text-[10px] text-gold uppercase tracking-wider font-mono">
                      {isAr ? 'قاعدة من معدن ثمين نقي' : 'Solid Noble Metal Base'}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {isAr
                    ? 'جميع التشوكرات والقلائد والأقراط مصوغة من فضة إسترلينية عيار 925 معتمدة، خالية 100% من النحاس أو النيكل أو الرصاص ومضادة للحساسية طبيعياً.'
                    : 'Every bridal choker, necklace, and earring is cast from verified 925 sterling silver alloy. 100% free of brass, nickel, or lead. Naturally hypoallergenic.'}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-black/70 border border-gold/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/40 flex items-center justify-center text-gold font-mono font-bold">
                    Rh
                  </div>
                  <div>
                    <h4 className="text-base font-serif font-bold text-white">
                      {isAr ? 'درع حماية ثلاثي بالروديوم' : 'Triple Rhodium Shield'}
                    </h4>
                    <span className="text-[10px] text-gold uppercase tracking-wider font-mono">
                      {isAr ? 'حاجز بلاتيني فاخر' : 'Platinum-Family Barrier'}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {isAr
                    ? 'مطلي إلكتروليتياً بمعدن الروديوم النادر (أغلى بثلاثة أضعاف من البلاتين). يحمي من رطوبة وضباب ساحل الخليج العربي والأكسدة.'
                    : 'Electrolytically coated with rare rhodium (worth 3x more than platinum). Protects against Arabian Gulf coastal salt fog, perspiration, and humidity oxidation.'}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-black/70 border border-gold/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gold/15 border border-gold/40 flex items-center justify-center text-gold font-mono font-bold">
                    It
                  </div>
                  <div>
                    <h4 className="text-base font-serif font-bold text-white">
                      {isAr ? 'ترصيع بالمخالب الإيطالية الدقيقة' : 'Italian Micro-Prongs'}
                    </h4>
                    <span className="text-[10px] text-gold uppercase tracking-wider font-mono">
                      {isAr ? 'تثبيت ميكانيكي دقيق' : 'Mechanical Setting'}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {isAr
                    ? 'مخالب دقيقة مصنوعة يدوياً تُحكم تثبيت كل حجر تحت المجهر بدون أي غراء، مما يمنع سقوط الأحجار نهائياً أثناء المناسبات.'
                    : 'Hand-crafted micro-claws physically lock each stone in place under high magnification. Zero adhesive or glues, eliminating stone loss during ceremonial dancing.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: DCL Assay Compliance */}
        {activeTab === 'assay' && (
          <div className="relative z-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4">
                <h4 className="text-xl font-serif font-bold text-white">
                  {isAr ? 'معايير فحص مختبر دبي المركزي (DCL)' : 'Dubai Central Laboratory (DCL) Assaying Standard'}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {isAr
                    ? 'بموجب القوانين الاتحادية وأنظمة فحص المعادن الثمينة في دبي، تخضع أطقم المجوهرات لفحص دقيق بتقنية الفلورة بالأشعة السينية (XRF) لضمان مطابقتها الكيميائية قبل التوصيل.'
                    : 'Under UAE Federal Law and Dubai Assay regulations, precious metal demi-fine suites undergo strict X-Ray Fluorescence (XRF) spectrometry auditing to guarantee chemical compliance before consumer dispatch.'}
                </p>
                <div className="space-y-2 text-xs text-neutral-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{isAr ? 'فحص كيميائي بتقنية XRF معتمد: نسبة فضة نقية لا تقل عن 92.5%' : 'Certified XRF Spectrometry Elemental Composition: 92.5% Ag minimum'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{isAr ? 'اجتياز اختبار مقاومة التآكل بالضباب الملحي في غرف المحاكاة ASTM B117' : 'ASTM B117 Environmental Chamber Salt Fog Corrosion Test Passed'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{isAr ? 'تخليص جمركي مسبق عبر الممر اللوجستي السريع بين الإمارات والسعودية' : 'Pre-Cleared Regional Customs Corridor between UAE and KSA'}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-black/80 border border-gold/40 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gold/20">
                  <span className="text-xs font-mono font-bold text-gold">
                    {isAr ? 'شهادة تدقيق مختبر دبي المركزي #AE-2026' : 'DCL AUDIT CERTIFICATION #AE-2026'}
                  </span>
                  <Award className="w-5 h-5 text-gold" />
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase">
                      {isAr ? 'الجهة المصدرة' : 'Issuer'}
                    </span>
                    <span className="text-white font-semibold">
                      {isAr ? 'مختبر دبي المركزي' : 'Dubai Central Laboratory'}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase">
                      {isAr ? 'الفئة' : 'Category'}
                    </span>
                    <span className="text-white font-semibold">
                      {isAr ? 'فضة إسترلينية عيار 925' : '925 Sterling Silver'}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase">
                      {isAr ? 'نسبة النقاء' : 'Precious Purity'}
                    </span>
                    <span className="text-emerald-400 font-bold font-mono">
                      {isAr ? '92.51% فضة أصلية' : '92.51% elemental Ag'}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase">
                      {isAr ? 'جودة الطلاء' : 'Plating Quality'}
                    </span>
                    <span className="text-white font-semibold">
                      {isAr ? 'درع ثلاثي بالروديوم' : 'Triple Rhodium Shield'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA to Omnia Stores Flagship */}
        <div className="mt-8 pt-6 border-t border-gold/20 flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{isAr ? 'جميع التشكيلات مفحوصة ومضمونة 100% على omniastores.com' : 'All collections assayed and guaranteed on omniastores.com'}</span>
          </div>

          <a
            href={generateAffiliateUrl({
              baseUrl: 'https://omniastores.com/collections/luxury-sets',
              source: 'assay_comparison_widget',
              medium: 'cta_button',
            })}
            target="_blank"
            rel="nofollow sponsored"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-gold via-amber-300 to-[#AA8C2C] text-black font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all flex items-center gap-2 shimmer-btn"
          >
            <span>{isAr ? 'استكشف الأطقم المفحوصة على omniastores.com' : 'Explore Assayed Sets on omniastores.com'}</span>
            <ArrowUpRight className={`w-4 h-4 ${isAr ? 'rotate-[-90deg]' : ''}`} />
          </a>
        </div>

      </div>
    </section>
  );
}