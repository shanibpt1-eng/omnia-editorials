'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Lock, Eye, FileText } from 'lucide-react';
import { useLuxury } from '../../components/ThemeProvider';
import { SeoHead } from '../../components/SeoHead';

export default function PrivacyPolicyPage() {
  const { language } = useLuxury();
  const isAr = language === 'ar';

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/40 text-[10px] font-mono font-bold text-[#8B6508] dark:text-gold uppercase tracking-widest">
              <Lock className="w-3.5 h-3.5 text-gold" />
              <span>{isAr ? 'حماية البيانات والخصوصية' : 'PRIVACY & DATA PROTECTION'}</span>
            </div>

            <h1 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
              {isAr ? 'سياسة الخصوصية وحماية بيانات القراء' : 'Privacy Policy & Data Protection'}
            </h1>

            <p className="font-serif text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {isAr
                ? 'تلتزم «ذا فوغ نيوز» بحماية خصوصية جميع زوار بوابتنا الإخبارية وقرائنا في الإمارات ودول مجلس التعاون الخليجي وحول العالم.'
                : 'The Vogue News is committed to safeguarding reader privacy and maintaining total transparency regarding data collection across our digital broadsheet platforms.'}
            </p>
          </header>

          <section className="space-y-4 font-serif text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
            <h2 className="font-bold text-xl text-neutral-950 dark:text-white">
              {isAr ? '١. جمع البيانات واستخدامها' : '1. Information We Collect'}
            </h2>
            <p>
              {isAr
                ? 'نحن لا نقوم بجمع أو تخزين أي بيانات شخصية حساسة دون موافقتك الصريحة. تقتصر البيانات التي نجمعها على تحليلات الأداء مجهولة المصدر لتحسين تجربة القراءة ومعايير تحميل المحتوى.'
                : 'We do not collect personal identifying information unless you voluntarily provide it (such as subscribing to our newsletter or emailing our newsroom). We employ anonymized telemetry to assess server performance and optimize reader delivery.'}
            </p>
          </section>

          <section className="space-y-4 font-serif text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
            <h2 className="font-bold text-xl text-neutral-950 dark:text-white">
              {isAr ? '٢. ملفات تعريف الارتباط (الكوكيز)' : '2. Cookies & Local Storage'}
            </h2>
            <p>
              {isAr
                ? 'نستخدم التخزين المحلي فقط لتذكر تفضيلاتك اللغوية (العربية أو الإنجليزية) والعملة المفضلة (الدرهم أو الريال) والمظهر الليلي.'
                : 'We use minimal local browser storage strictly to preserve your selected reading preferences (dark/light luxury theme, English/Arabic language toggle, and AED/SAR currency parity display).'}
            </p>
          </section>

          <section className="space-y-4 font-serif text-sm sm:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
            <h2 className="font-bold text-xl text-neutral-950 dark:text-white">
              {isAr ? '٣. الروابط الخارجية والمتاجر الشريكة' : '3. External Links & Merchant Disclosures'}
            </h2>
            <p>
              {isAr
                ? 'تتضمن بعض مقالاتنا روابط مباشرة إلى متجر أمنية ستورز (omniastores.com) لتسهيل اقتناء القطع المعروضة. تخضع عمليات الشراء لسياسة الخصوصية وشروط الخدمة الخاصة بمتجر omniastores.com.'
                : 'Our editorial dispatches include links to our certified merchant partner Omnia Stores (omniastores.com). Transactions conducted on omniastores.com are governed by their respective independent privacy and fulfillment terms.'}
            </p>
          </section>

        </div>
      </main>
    </>
  );
}
