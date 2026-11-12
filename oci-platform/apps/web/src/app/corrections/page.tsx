'use client';

import React from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  ArrowLeft, 
  Clock, 
  FileText, 
  ShieldCheck, 
  AlertCircle,
  Mail
} from 'lucide-react';
import { useLuxury } from '../../components/ThemeProvider';
import { SeoHead } from '../../components/SeoHead';

export default function CorrectionsPage() {
  const { language } = useLuxury();
  const isAr = language === 'ar';

  const CORRECTIONS_LOG = [
    {
      id: 'cor-001',
      date: 'November 10, 2026',
      dateAr: '١٠ نوفمبر ٢٠٢٦',
      articleTitle: 'Vogue Arabia: Imperial Emerald Grandeur Suite',
      articleTitleAr: 'فوغ العربية: فخامة الزمرد الإمبراطوري',
      url: '/trending/vogue-arabia-imperial-emerald-grandeur',
      note: 'Updated technical specification from "hydrothermal emerald" to "Colombian-hue high-dispersion simulated emerald" to precisely reflect material science classifications.',
      noteAr: 'تم تحديث التوصيف التقني من «الزمرد الهيدروحراري» إلى «محاكاة الزمرد الكولومبي فائق النقاء» ليعكس التصنيف العلمي للمواد بدقة متناهية.',
    },
    {
      id: 'cor-002',
      date: 'October 25, 2026',
      dateAr: '٢٥ أكتوبر ٢٠٢٦',
      articleTitle: 'DCL Assay Standards: XRF Spectrometry Protocols',
      articleTitleAr: 'معايير فحص مختبر دبي المركزي: بروتوكولات مطيافية الأشعة السينية',
      url: '/editorials',
      note: 'Clarified the exact reference number of UAE Cabinet Resolution No. 23 governing hallmarking tolerances.',
      noteAr: 'تم توضيح رقم قرار مجلس الوزراء الإماراتي رقم 23 بدقة فيما يتعلق بنسب التفاوت المسموح بها في دمغ المعادن الثمينة.',
    },
  ];

  return (
    <>
      <SeoHead pageType="about" />

      <main className="min-h-screen bg-neutral-50 dark:bg-[#07090E] text-neutral-900 dark:text-neutral-100 transition-colors py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#8B6508] dark:text-gold uppercase tracking-wider hover:underline"
            >
              <ArrowLeft className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
              <span>{isAr ? 'العودة للرئيسية' : 'Back to The Vogue News'}</span>
            </Link>
          </div>

          <header className="space-y-4 border-b border-neutral-300 dark:border-neutral-800 pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isAr ? 'الشفافية والتصحيح' : 'EDITORIAL TRANSPARENCY'}</span>
            </div>

            <h1 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
              {isAr ? 'سياسة التصحيح وسجل التحديثات' : 'Corrections Policy & Public Register'}
            </h1>

            <p className="font-serif text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {isAr
                ? 'تلتزم «ذا فوغ نيوز» بالدقة التامة والشفافية الفورية. في حال وقوع أي خطأ، نعمل على تصحيحه بوضوح في المقال وسجل التصحيحات العام أدناه.'
                : 'The Vogue News is committed to unwavering accuracy. When errors occur in our reporting, we promptly correct them and log the details here for public accountability.'}
            </p>
          </header>

          {/* Submission Guidelines */}
          <section className="p-6 rounded-2xl bg-white dark:bg-[#0E121B] border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm">
            <h2 className="font-serif font-bold text-lg sm:text-xl text-neutral-950 dark:text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              <span>{isAr ? 'كيفية الإبلاغ عن خطأ تحريري' : 'How to Request a Correction'}</span>
            </h2>
            <p className="font-serif text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              {isAr
                ? 'إذا لاحظت خطأ في الحقائق أو الأسماء أو البيانات الفنية، يُرجى مراسلة مكتب التحرير مع رابط المقال والتصحيح المقترح.'
                : 'If you believe an article contains a factual inaccuracy, please submit a correction request detailing the article URL, the specific passage, and authoritative documentation.'}
            </p>
            <div className="pt-2">
              <a
                href="mailto:corrections@thevoguenews.com"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 text-white dark:bg-gold dark:text-black font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>corrections@thevoguenews.com</span>
              </a>
            </div>
          </section>

          {/* Public Corrections Log */}
          <section className="space-y-6">
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-neutral-950 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-gold" />
              <span>{isAr ? 'سجل التصحيحات الموثق' : 'Archived Corrections Log'}</span>
            </h2>

            <div className="space-y-4">
              {CORRECTIONS_LOG.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0B0F19] space-y-2 shadow-2xs"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#8B6508] dark:text-gold uppercase tracking-wider">
                    <span>{isAr ? item.dateAr : item.date}</span>
                    <span className="font-bold">ID: {item.id}</span>
                  </div>
                  <Link
                    href={item.url}
                    className="block font-serif font-bold text-sm sm:text-base text-neutral-950 dark:text-white hover:text-gold transition-colors"
                  >
                    {isAr ? item.articleTitleAr : item.articleTitle} →
                  </Link>
                  <p className="text-xs sm:text-sm font-serif text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {isAr ? item.noteAr : item.note}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
