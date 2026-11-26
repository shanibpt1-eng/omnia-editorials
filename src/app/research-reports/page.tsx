'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FileText, Download, Sparkles, ChevronRight, CheckCircle2, BarChart3, Database } from 'lucide-react';
import { useLuxury } from '../../components/ThemeProvider';
import { RESEARCH_REPORTS } from '../../data/research-reports-data';
import { AeoAnswerBox } from '../../components/AeoAnswerBox';

export default function ResearchReportsPage() {
  const { language } = useLuxury();
  const isAr = language === 'ar';
  const [selectedReportIdx, setSelectedReportIdx] = useState(0);
  const activeReport = RESEARCH_REPORTS[selectedReportIdx];

  return (
    <div className={`min-h-screen bg-[#07090E] text-white py-8 sm:py-12 px-3 sm:px-6 lg:px-8 ${isAr ? 'font-arabic text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-[1780px] mx-auto space-y-10">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <Link href="/" className="hover:text-gold transition-colors">{isAr ? 'الرئيسية' : 'Home'}</Link>
          <ChevronRight className="w-3 h-3 rtl:rotate-180 text-gold/60" />
          <span className="text-gold font-bold">{isAr ? 'مكتبة الأبحاث والتقارير' : 'Research & Reports Library'}</span>
        </nav>

        {/* Hero Masthead */}
        <div className="relative rounded-3xl border border-gold/30 bg-[radial-gradient(ellipse_100%_80%_at_50%_-20%,rgba(212,175,55,0.18),transparent_80%),linear-gradient(to_bottom,#0F131D,#090B10)] p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden">
          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-mono font-bold uppercase tracking-wider">
              <Database className="w-3.5 h-3.5" />
              <span>{isAr ? 'مركز الدراسات والبيانات الاقتصادية المستقلة' : 'VERIFIED ECONOMIC & METALLURGICAL RESEARCH'}</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white leading-[1.15]">
              {isAr ? (
                <>
                  مكتبة الأبحاث والدراسات التحريرية: <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-gold">
                    تحليلات أسواق الرفاهية وسلوك المستهلك الخليجي
                  </span>
                </>
              ) : (
                <>
                  Research & Reports Library: <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-gold">
                    GCC Demi-Fine Market Studies & Gemological Whitepapers
                  </span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 font-serif leading-relaxed max-w-2xl">
              {isAr
                ? 'أوراق بحثية ودراسات اقتصادية متخصصة تعتمد على عينات فعلية، وتوثق التحول نحو الفضة عيار 925، ومعدلات نمو التجارة الإلكترونية، ونتائج الفحوصات الطيفية XRF.'
                : 'Rigorous empirical whitepapers and consumer studies based on verified sample sizes, documenting the 34.2% annual growth of certified demi-fine jewellery, digital cart drops, and laboratory assay standards.'}
            </p>
          </div>
        </div>

        {/* AEO Answer Box */}
        <AeoAnswerBox
          question={isAr ? 'ما هي أبرز نتائج دراسات ذا فوغ نيوز لسوق المجوهرات الخليجي لعام 2026؟' : 'What are the key statistical takeaways from The Vogue News GCC Jewellery Research Papers?'}
          answer={isAr
            ? 'تؤكد الدراسات أن 68% من العرائس في الإمارات والسعودية يخصصن ميزانية لأطقم الفضة 925 المعتمدة بجانب الذهب التقليدي، وأن طلاء الروديوم بسماكة 0.5 ميكرون يحقق حماية 99.4% ضد الأكسدة، وأن تقسيط تابي رفع متوسط السلة بنسبة 42.8%.'
            : 'Core findings indicate that 68% of brides in UAE and KSA allocate budgets for certified 925 demi-fine sets alongside heirloom gold, 0.5µm triple rhodium delivers 99.4% anti-tarnish retention in GCC climates, and Tabby installment options increased average luxury order values by 42.8%.'}
          facts={[
            { label: isAr ? 'نمو قطاع الديمي فاين' : 'Demi-Fine Growth', value: '+34.2% YoY across GCC' },
            { label: isAr ? 'معدل حماية الروديوم' : 'Rhodium Protection', value: '99.4% in 24-month climate test' },
            { label: isAr ? 'أثر تقسيط تابي' : 'Tabby Cart Impact', value: '+42.8% Average Order Value' },
            { label: isAr ? 'حجم عينة البحث' : 'Research Sample', value: '48,000 Verified Digital Orders' },
          ]}
        />

        {/* Reports Navigation Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none text-xs font-mono">
          {RESEARCH_REPORTS.map((rep, idx) => (
            <button
              key={rep.id}
              onClick={() => setSelectedReportIdx(idx)}
              className={`px-5 py-3 rounded-2xl font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                selectedReportIdx === idx
                  ? 'bg-gold text-black shadow-lg scale-105'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-white/10'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{rep.reportNumber}: {isAr ? rep.titleAr : rep.title}</span>
            </button>
          ))}
        </div>

        {/* Active Report Comprehensive Showcase */}
        <div className="p-6 sm:p-10 rounded-3xl bg-neutral-900/90 border border-gold/30 space-y-8 shadow-2xl">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-gold">
              <span className="px-2.5 py-0.5 rounded bg-gold/15 border border-gold/40">{activeReport.reportNumber}</span>
              <span>•</span>
              <span>{activeReport.publicationDate}</span>
              <span>•</span>
              <span>Authors: {activeReport.authors.join(', ')}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-serif font-black text-white leading-tight">
              {isAr ? activeReport.titleAr : activeReport.title}
            </h2>
          </div>

          {/* Executive Summary */}
          <div className="p-5 rounded-2xl bg-black/60 border border-gold/25 space-y-2">
            <span className="text-[10px] font-mono text-gold font-bold uppercase tracking-wider block">
              {isAr ? 'الملخص التنفيذي' : 'EXECUTIVE SUMMARY'}
            </span>
            <p className="text-xs sm:text-sm text-neutral-200 font-serif leading-relaxed">
              {isAr ? activeReport.executiveSummaryAr : activeReport.executiveSummaryEn}
            </p>
          </div>

          {/* Methodology & Sample Size */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                {isAr ? 'منهجية البحث العلمي' : 'RESEARCH METHODOLOGY'}
              </span>
              <p className="text-xs text-neutral-300 font-serif leading-relaxed">
                {isAr ? activeReport.methodologyAr : activeReport.methodologyEn}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
              <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                {isAr ? 'حجم العينة ومصادر البيانات' : 'SAMPLE SIZE & DATA SOURCES'}
              </span>
              <p className="text-xs text-neutral-300 font-serif leading-relaxed">
                {isAr ? activeReport.sampleSizeAr : activeReport.sampleSizeEn}
              </p>
            </div>
          </div>

          {/* Key Empirical Findings */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-gold" />
              <span>{isAr ? 'أهم النتائج الإحصائية المؤكدة' : 'Empirical Research Findings'}</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(isAr ? activeReport.keyFindingsAr : activeReport.keyFindingsEn).map((finding, i) => (
                <div key={i} className="p-4 rounded-xl bg-black/60 border border-white/5 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-neutral-200 font-serif leading-relaxed">{finding}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Download & Access Bar */}
          <div className="pt-4 border-t border-gold/20 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-neutral-400 font-mono">
              <span>{isAr ? 'مرجع معتمد لدى: ذا فوغ نيوز والمعهد الخليجي لأبحاث التجزئة' : 'Published by The Vogue News Intelligence Unit'}</span>
            </div>

            <a
              href={`#download-${activeReport.reportNumber}`}
              onClick={(e) => {
                e.preventDefault();
                alert(isAr ? 'جاري تجهيز النسخة المعتمدة بصيغة PDF للتحميل...' : 'Preparing accredited PDF research dossier for download...');
              }}
              className="px-6 py-2.5 rounded-xl bg-gold hover:bg-gold-light text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{isAr ? 'تحميل ملف الدراسة كاملاً (PDF)' : 'Download Full Dossier (PDF)'}</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
