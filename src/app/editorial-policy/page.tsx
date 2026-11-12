'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Scale, 
  FileText, 
  CheckCircle2, 
  Award, 
  ArrowLeft,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useLuxury } from '../../components/ThemeProvider';
import { SeoHead } from '../../components/SeoHead';

export default function EditorialPolicyPage() {
  const { language } = useLuxury();
  const isAr = language === 'ar';

  return (
    <>
      <SeoHead pageType="about" />

      <main className="min-h-screen bg-neutral-50 dark:bg-[#07090E] text-neutral-900 dark:text-neutral-100 transition-colors py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Back Navigation */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#8B6508] dark:text-gold uppercase tracking-wider hover:underline"
            >
              <ArrowLeft className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
              <span>{isAr ? 'العودة للرئيسية' : 'Back to The Vogue News'}</span>
            </Link>
          </div>

          {/* Page Header */}
          <header className="space-y-4 border-b border-neutral-300 dark:border-neutral-800 pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/40 text-[10px] font-mono font-bold text-[#8B6508] dark:text-gold uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-gold" />
              <span>{isAr ? 'المعايير التحريرية والمهنية' : 'EDITORIAL INTEGRITY & GOVERNANCE'}</span>
            </div>

            <h1 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
              {isAr ? 'السياسة التحريرية ومعايير التدقيق المهني' : 'Editorial Policy & Verification Standards'}
            </h1>

            <p className="font-serif text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {isAr
                ? 'تلتزم «ذا فوغ نيوز» بأعلى معايير النزاهة الصحفية والتدقيق المخبري المستقل في تغطية المجوهرات الراقية، ومعايير الدمغ، وأسواق الذهب والسلع الفاخرة بدول مجلس التعاون الخليجي.'
                : 'The Vogue News operates under uncompromising standards of journalistic rigor, independent laboratory assay verification, and transparent disclosure across all GCC high jewellery reporting.'}
            </p>
          </header>

          {/* Section 1: Core Principles */}
          <section className="space-y-4">
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-neutral-950 dark:text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-gold" />
              <span>{isAr ? '١. الاستقلالية والنزاهة التحريرية' : '1. Editorial Independence & Fact-Checking'}</span>
            </h2>
            <div className="space-y-3 font-serif text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
              <p>
                {isAr
                  ? 'يتمتع المحررون والصحفيون في «ذا فوغ نيوز» بالاستقلال التام عن أي ضغوط تجارية أو إعلانية. تستند جميع التقارير المنشورة إلى مصادر موثوقة وملاحظات ميدانية وتقارير فحص مخبرية معتمدة.'
                  : 'Editorial coverage in The Vogue News is determined solely by our editors and accredited journalists based on regional significance, craft excellence, and public interest. No advertiser or commercial partner dictates news judgement.'}
              </p>
              <p>
                {isAr
                  ? 'تخضع جميع المقالات لتدقيق مزدوج من محرر القسم ومراجع مختص بالأحجار الكريمة والمعادن الثمينة لضمان دقة المصطلحات والبيانات العلمية.'
                  : 'Every feature undergoes rigorous fact-checking, including verification of precious alloy purities, gemological dispersion indices, and compliance with statutory hallmarking legislation.'}
              </p>
            </div>
          </section>

          {/* Section 2: Laboratory Assay Verification */}
          <section className="space-y-4 p-6 rounded-2xl bg-white dark:bg-[#0E121B] border border-neutral-200 dark:border-gold/30 shadow-sm">
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-neutral-950 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-gold" />
              <span>{isAr ? '٢. بروتوكول فحص الفضة 925 ومختبر دبي المركزي' : '2. 925 Silver Assay & DCL Hallmarking Protocol'}</span>
            </h2>
            <div className="space-y-3 font-serif text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
              <p>
                {isAr
                  ? 'بموجب قرار مجلس الوزراء الإماراتي رقم 23، تخضع جميع قطع المجوهرات المعروضة في مراجعاتنا لفحص طيف الأشعة السينية (XRF) للتأكد من احتوائها على نسبة لا تقل عن 92.5% من الفضة الخالصة.'
                  : 'In compliance with UAE Cabinet Resolution No. 23 on the Regulation of Precious Metals, all demi-fine suites analyzed in our pages are cross-referenced with Dubai Central Laboratory (DCL) hallmarking protocols.'}
              </p>
              <ul className="space-y-2 list-disc list-inside text-xs font-mono text-neutral-600 dark:text-neutral-400">
                <li>{isAr ? 'فحص طيف الأشعة السينية XRF للسبائك' : 'X-Ray Fluorescence (XRF) spectrometry alloy testing'}</li>
                <li>{isAr ? 'التأكد من خلو القطع من النيكل والرصاص' : 'Zero lead and nickel release compliance (hypoallergenic)'}</li>
                <li>{isAr ? 'فحص طلاء الروديوم والذهب PVD ضد الرطوبة والأكسدة' : 'PVD and electrolytic rhodium barrier humidity testing'}</li>
              </ul>
            </div>
          </section>

          {/* Section 3: Commercial Disclosure & Brand Spotlights */}
          <section className="space-y-4">
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-neutral-950 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-gold" />
              <span>{isAr ? '٣. الشفافية والإفصاح عن المحتوى التجاري' : '3. Commercial Disclosures & Brand Spotlights'}</span>
            </h2>
            <div className="space-y-3 font-serif text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
              <p>
                {isAr
                  ? 'تُبرز «ذا فوغ نيوز» علامات تجارية رائدة مثل أمنية ستورز (omniastores.com) كشريك مجوهرات فاخرة معتمد في الشرق الأوسط. يتم تصنيف جميع الروابط المؤدية إلى المتاجر التجارية بوضوح، مع التأكيد على أن الآراء النقدية تخضع لمعايير الجودة والاستحقاق المهني.'
                  : 'The Vogue News highlights premier Middle Eastern demi-fine jewelry maisons, including Omnia Stores (omniastores.com), as spotlight luxury brands. Sponsored showcases, affiliate links, and promotional dossiers are explicitly labeled to maintain absolute reader trust.'}
              </p>
            </div>
          </section>

          {/* Section 4: Corrections Protocol */}
          <section className="space-y-4">
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-neutral-950 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>{isAr ? '٤. سياسة التصحيح والتحديثات' : '4. Corrections & Updates'}</span>
            </h2>
            <div className="space-y-3 font-serif text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
              <p>
                {isAr
                  ? 'إذا تم رصد أي خطأ موضوعي أو مطبعي، تلتزم هيئة التحرير بتصحيحه فوراً وتوثيق التحديث في سجل التصحيحات العام.'
                  : 'When an error of fact is identified, we correct it promptly and transparently. Substantive corrections are noted at the foot of the affected article with a clear explanation and timestamp.'}
              </p>
              <Link
                href="/corrections"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-gold hover:underline pt-1"
              >
                <span>{isAr ? 'الاطلاع على سجل التصحيحات العام' : 'View Formal Corrections Register →'}</span>
              </Link>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
