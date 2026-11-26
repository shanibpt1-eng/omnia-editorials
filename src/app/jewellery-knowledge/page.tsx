'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, ChevronRight, Award, BookOpen, Layers, CheckCircle2, ExternalLink } from 'lucide-react';
import { useLuxury } from '../../components/ThemeProvider';
import { JEWELLERY_KNOWLEDGE_GUIDES } from '../../data/jewellery-knowledge-data';
import { AeoAnswerBox } from '../../components/AeoAnswerBox';

export default function JewelleryKnowledgePage() {
  const { language } = useLuxury();
  const isAr = language === 'ar';
  const [activeGuideIndex, setActiveGuideIndex] = useState(0);
  const activeGuide = JEWELLERY_KNOWLEDGE_GUIDES[activeGuideIndex];

  return (
    <div className={`min-h-screen bg-[#07090E] text-white py-8 sm:py-12 px-3 sm:px-6 lg:px-8 ${isAr ? 'font-arabic text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-[1780px] mx-auto space-y-10">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <Link href="/" className="hover:text-gold transition-colors">{isAr ? 'الرئيسية' : 'Home'}</Link>
          <ChevronRight className="w-3 h-3 rtl:rotate-180 text-gold/60" />
          <span className="text-gold font-bold">{isAr ? 'مركز المعرفة بالمجوهرات' : 'Jewellery Knowledge Centre'}</span>
        </nav>

        {/* Hero Banner */}
        <div className="relative rounded-3xl border border-gold/30 bg-[radial-gradient(ellipse_100%_80%_at_50%_-20%,rgba(212,175,55,0.18),transparent_80%),linear-gradient(to_bottom,#0F131D,#090B10)] p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden">
          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAr ? 'الموسوعة العلمية لعلم الأحجار والمعادن' : 'GEMOLOGY & METALLURGY ACADEMY'}</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white leading-[1.15]">
              {isAr ? (
                <>
                  مركز المعرفة بعلوم المجوهرات والمعادن: <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-gold">
                    الفحص المخبري، الفضة 925 وبريق الألماس
                  </span>
                </>
              ) : (
                <>
                  The Jewellery Knowledge Centre: <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-gold">
                    925 Metallurgy, DCL Assay Standards & Gemological Science
                  </span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 font-serif leading-relaxed max-w-2xl">
              {isAr
                ? 'دليل تعليمي معتمد يوضح معايير الفحص الطيفي بالأشعة السينية، والفرق العلمي بين الفضة الإسترلينية 925 وسبائك النحاس الرخيصة، وخصائص طلاء الروديوم المضاد للأكسدة واشتراطات حماية المستهلك.'
                : 'An authoritative scientific repository explaining precious metal fineness, X-Ray Fluorescence spectroscopy protocols, triple rhodium electroplating mechanics, and how to verify legitimate government hallmarking stamps.'}
            </p>
          </div>
        </div>

        {/* AEO Answer Box */}
        <AeoAnswerBox
          question={isAr ? 'كيف يتم فحص والتأكد من نقاء الفضة الإسترلينية 925 في دولة الإمارات؟' : 'How is 925 sterling silver purity scientifically verified and certified in the UAE?'}
          answer={isAr
            ? 'تُفحص الفضة الإسترلينية 925 في دولة الإمارات بواسطة أجهزة الفحص الطيفي بالأشعة السينية (XRF) لدى مختبر دبي المركزي، حيث يتم قياس النقاء بنسبة لا تقل عن 92.5% من الفضة الخالصة والتأكد من خلو السبيكة من النيكل السام قبل منحها ختم الدمغ بالليزر المعتمد رسمياً.'
            : 'In the UAE, 925 sterling silver is authenticated through non-destructive X-Ray Fluorescence (XRF) spectroscopy conducted by the Dubai Central Laboratory (DCL). The assay verifies a fine silver composition of at least 92.5%, confirms strictly nickel-free hypoallergenic safety, and applies official laser hallmarking stamps.'}
          facts={[
            { label: isAr ? 'معيار الفضة القانوني' : 'Silver Threshold', value: '≥92.5% Pure Elemental Silver' },
            { label: isAr ? 'طريقة الفحص' : 'Testing Method', value: 'Non-Destructive XRF Spectrometry' },
            { label: isAr ? 'سماكة الروديوم' : 'Rhodium Shield', value: '0.50µm Triple Anti-Tarnish Barrier' },
            { label: isAr ? 'المختبر المعتمد' : 'Accredited Lab', value: 'Dubai Central Laboratory (DCL)' },
          ]}
        />

        {/* Interactive Guide Tabs */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {JEWELLERY_KNOWLEDGE_GUIDES.map((g, idx) => (
              <button
                key={g.id}
                onClick={() => setActiveGuideIndex(idx)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-mono font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeGuideIndex === idx
                    ? 'bg-gold text-black shadow-lg scale-105'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-white/10'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>{isAr ? g.titleAr : g.title}</span>
              </button>
            ))}
          </div>

          {/* Active Guide Content */}
          <div className="p-6 sm:p-10 rounded-3xl bg-neutral-900/90 border border-gold/30 space-y-8 shadow-2xl">
            <div>
              <span className="text-xs font-mono text-gold font-bold uppercase tracking-widest block">
                {isAr ? activeGuide.pillarAr : activeGuide.pillar.toUpperCase()} • {isAr ? activeGuide.readTimeAr : activeGuide.readTime}
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-black text-white mt-1">
                {isAr ? activeGuide.titleAr : activeGuide.title}
              </h2>
              <p className="text-sm text-neutral-300 font-serif mt-2 leading-relaxed">
                {isAr ? activeGuide.summaryAr : activeGuide.summaryEn}
              </p>
            </div>

            {/* Factual Highlights Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-white/10">
              {(isAr ? activeGuide.factualHighlightsAr : activeGuide.factualHighlightsEn).map((f, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-black/60 border border-gold/20">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">{f.label}</span>
                  <span className="text-xs sm:text-sm font-mono font-bold text-gold mt-1 block">{f.value}</span>
                </div>
              ))}
            </div>

            {/* Content Sections */}
            <div className="space-y-6 pt-4 border-t border-white/10">
              {activeGuide.contentSections.map((sec, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{isAr ? sec.headingAr : sec.headingEn}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-serif leading-relaxed">
                    {isAr ? sec.bodyAr : sec.bodyEn}
                  </p>
                </div>
              ))}
            </div>

            {/* FAQ Block */}
            <div className="p-5 rounded-2xl bg-black/75 border border-gold/30 space-y-3">
              <span className="text-[10px] font-mono text-gold font-bold uppercase tracking-wider block">
                {isAr ? 'أسئلة شائعة يجيب عنها الخبراء' : 'EXPERT VERIFIED FAQ'}
              </span>
              {activeGuide.faqBlock.map((faq, i) => (
                <div key={i} className="space-y-1">
                  <h4 className="text-sm font-serif font-bold text-white">
                    {isAr ? faq.questionAr : faq.questionEn}
                  </h4>
                  <p className="text-xs text-neutral-300 font-serif leading-relaxed">
                    {isAr ? faq.answerAr : faq.answerEn}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA to Omnia Stores Collections */}
            <div className="pt-4 border-t border-gold/20 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <Award className="w-4 h-4 text-gold" />
                <span>{isAr ? 'كافة التشكيلات المعروضة مدققة ومطابقة لمواصفات DCL' : 'All featured suites audited per official DCL assay protocols'}</span>
              </div>
              <a
                href="https://omniastores.com/collections/bridal-sets"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
              >
                <span>{isAr ? 'تسوق أطقم الفضة عيار 925 المعتمدة' : 'Shop Certified 925 Suites on Omnia Stores'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
