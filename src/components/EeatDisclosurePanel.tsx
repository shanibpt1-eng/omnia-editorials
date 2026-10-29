'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FlaskConical, 
  Bot, 
  HeartHandshake, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2 
} from 'lucide-react';
import { TestingMethodology } from '../lib/types';
import { useLuxury } from './ThemeProvider';

interface EeatDisclosureProps {
  methodology: TestingMethodology;
}

export function EeatDisclosurePanel({ methodology }: EeatDisclosureProps) {
  const [isOpen, setIsOpen] = useState(true);
  const { language } = useLuxury();
  const isAr = language === 'ar';

  return (
    <div
      className={`my-8 rounded-2xl border border-neutral-200 dark:border-gold/30 bg-white dark:bg-[#0B0E17] shadow-md dark:shadow-xl overflow-hidden ${
        isAr ? 'font-arabic text-right' : ''
      }`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      
      {/* Header Accordion Bar (The 3 Ws Snapshot) */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-gold/5 transition-colors select-none"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gold/15 border border-gold/40 flex items-center justify-center flex-shrink-0">
            <FlaskConical className="w-5 h-5 text-[#8B6508] dark:text-gold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-[#8B6508] dark:text-gold font-bold">
                {isAr ? 'إفصاح الشفافية والاختبار التحريري E-E-A-T' : 'E-E-A-T Editorial & Testing Disclosure'}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/30 text-[9px] text-emerald-700 dark:text-emerald-400 font-semibold uppercase">
                {methodology.testingHours}+ {isAr ? 'ساعة فحص مخبري' : 'Hours Lab Tested'}
              </span>
            </div>
            <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-0.5">
              {isAr
                ? 'كيفية اختبارنا للمنتجات، واستقلاليتنا التحريرية، والتزامنا الصارم بتقديم محتوى موثوق للقارئ'
                : 'How we test, our editorial independence, and strict zero-filler reader commitment'}
            </p>
          </div>
        </div>

        <button 
          className="p-2 rounded-full bg-neutral-100 dark:bg-black/60 border border-neutral-300 dark:border-gold/20 text-[#8B6508] dark:text-gold hover:text-black dark:hover:text-white transition-all flex items-center gap-1.5 text-xs font-semibold"
          aria-label="Toggle E-E-A-T Disclosure"
        >
          <span className="hidden sm:inline">
            {isOpen
              ? isAr
                ? 'إخفاء الإطار'
                : 'Hide Framework'
              : isAr
              ? 'عرض الإطار'
              : 'View Framework'}
          </span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expanded Framework Details (Addressing the 3 Ws: HOW, WHY & TRUST) */}
      {isOpen && (
        <div className="p-5 sm:p-6 border-t border-neutral-200 dark:border-gold/20 bg-neutral-50 dark:bg-black/40 space-y-6 text-xs text-neutral-800 dark:text-neutral-300">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* 1. HOW: Real Testing & Methodology (Experience & Expertise) */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#0F1422] border border-neutral-200 dark:border-gold/20 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-2 text-[#8B6508] dark:text-gold font-bold uppercase tracking-wider text-[11px] mb-2.5">
                  <FlaskConical className="w-4 h-4" />
                  <span>{isAr ? 'كيف: بروتوكول الفحص والاختبار' : 'HOW: Testing Protocol'}</span>
                </div>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
                  {methodology.assayMethod}
                </p>
                <div className="space-y-1.5 text-[11px] text-neutral-600 dark:text-neutral-400 pt-2 border-t border-neutral-200 dark:border-gold/10">
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span><strong>{isAr ? 'المناخ:' : 'Climate:'}</strong> {methodology.humidityTest}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>{isAr ? 'المدة:' : 'Duration:'}</strong> {methodology.testingHours} {isAr ? 'ساعة اختبار ارتداء عملي' : 'hours physical wear testing'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. HOW: AI & Transparency Disclosure */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#0F1422] border border-neutral-200 dark:border-gold/20 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-2 text-[#8B6508] dark:text-gold font-bold uppercase tracking-wider text-[11px] mb-2.5">
                  <Bot className="w-4 h-4" />
                  <span>{isAr ? 'كيف: سياسة النزاهة والذكاء الاصطناعي' : 'HOW: AI & Integrity Policy'}</span>
                </div>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
                  {methodology.aiDisclosure}
                </p>
                <div className="space-y-1.5 text-[11px] text-neutral-600 dark:text-neutral-400 pt-2 border-t border-neutral-200 dark:border-gold/10">
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{isAr ? 'استنتاجات من خبراء أحجار بشريين 100%' : '100% human gemologist conclusions'}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{isAr ? 'خالٍ تماماً من الآراء المولدة بالذكاء الاصطناعي' : 'Zero AI synthetic opinion generation'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. WHY: Reader-First Purpose & Trust */}
            <div className="p-4 rounded-xl bg-white dark:bg-[#0F1422] border border-neutral-200 dark:border-gold/20 flex flex-col justify-between shadow-sm">
              <div>
                <div className="flex items-center gap-2 text-[#8B6508] dark:text-gold font-bold uppercase tracking-wider text-[11px] mb-2.5">
                  <HeartHandshake className="w-4 h-4" />
                  <span>{isAr ? 'لماذا: غاية القارئ والمصداقية' : 'WHY: Reader Purpose'}</span>
                </div>
                <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-3">
                  {methodology.editorialPurpose}
                </p>
                <div className="space-y-1.5 text-[11px] text-neutral-600 dark:text-neutral-400 pt-2 border-t border-neutral-200 dark:border-gold/10">
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{isAr ? 'خالٍ من الحشو أو تضخيم عدد الكلمات' : 'No filler content or artificial word count'}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{isAr ? 'إرشادات سعرية دقيقة للمجوهرات والفضة الخالصة' : 'Actionable bullion & jewelry price guidance'}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Trust & Affiliate Disclaimer */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-black/60 border border-neutral-200 dark:border-gold/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-700 dark:text-neutral-400 shadow-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#8B6508] dark:text-gold flex-shrink-0" />
              <span>{methodology.transparencyNotice}</span>
            </div>
            <span className="text-[#8B6508] dark:text-gold font-mono uppercase tracking-widest text-[10px] whitespace-nowrap">
              {isAr ? 'مدقق وفق معايير E-E-A-T 2026' : 'E-E-A-T AUDITED 2026'}
            </span>
          </div>

        </div>
      )}

    </div>
  );
}
