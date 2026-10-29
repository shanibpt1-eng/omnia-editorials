'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Award, CheckCircle2, UserCheck, ChevronDown, ChevronUp, Calendar, Clock, Sparkles } from 'lucide-react';
import { AuthorProfile, ReviewerProfile } from '../lib/types';
import { useLuxury } from './ThemeProvider';

interface AuthorBylineProps {
  author: AuthorProfile;
  factChecker?: ReviewerProfile;
  publishDate: string;
  readTime: string;
  publication: string;
}

export function AuthorBylineBox({
  author,
  factChecker,
  publishDate,
  readTime,
  publication,
}: AuthorBylineProps) {
  const [showBio, setShowBio] = useState(false);
  const { language } = useLuxury();
  const isAr = language === 'ar';

  return (
    <div
      className={`my-8 rounded-2xl glass-panel border border-neutral-200 dark:border-gold/30 bg-white dark:bg-[#0E121D] p-5 sm:p-6 shadow-md dark:shadow-xl relative overflow-hidden ${
        isAr ? 'font-arabic text-right' : ''
      }`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Subtle Gold Ambient Accent */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gold/5 rounded-full blur-[60px] pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        
        {/* Author Avatar & Identity (The "WHO") */}
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-gold/40 flex-shrink-0 shadow-md bg-black">
            <Image
              src={author.avatar || '/press/inside-luxury-bridal-sets-feature.jpg'}
              alt={author.name}
              fill
              unoptimized
              className="object-cover object-top"
            />
            {/* Verified Expertise Checkmark */}
            <div className={`absolute bottom-0 ${isAr ? 'left-0 rounded-tr-md' : 'right-0 rounded-tl-md'} w-4 h-4 bg-emerald-500 flex items-center justify-center`}>
              <CheckCircle2 className="w-3 h-3 text-black stroke-[3]" />
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-widest text-[#8B6508] dark:text-gold font-bold flex items-center gap-1">
                <Award className="w-3 h-3 text-[#8B6508] dark:text-gold" />
                <span>{isAr ? 'مؤلف وباحث مجوهرات معتمد' : 'VERIFIED AUTHOR & SPECIALIST'}</span>
              </span>
              <span className="text-neutral-400 dark:text-neutral-500">•</span>
              <span className="text-[11px] text-neutral-600 dark:text-neutral-400 font-mono">
                {author.experienceYears}+ {isAr ? 'سنوات خبرة في علم الأحجار' : 'YRS GEMOLOGY'}
              </span>
            </div>

            <h4 className="text-base sm:text-lg font-serif font-bold text-neutral-950 dark:text-white leading-tight">
              {author.name}
            </h4>

            <p className="text-xs text-neutral-700 dark:text-neutral-300 font-medium">
              {author.role}
            </p>

            <span className="text-[11px] text-[#8B6508] dark:text-gold-light/90 block mt-0.5 font-medium">
              {author.credentials}
            </span>
          </div>
        </div>

        {/* E-E-A-T Badges & Metadata */}
        <div className="flex flex-col items-start sm:items-end gap-2 border-t sm:border-t-0 border-neutral-200 dark:border-gold/15 pt-3 sm:pt-0 w-full sm:w-auto">
          {/* Fact-Checker Accreditations */}
          {factChecker && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-semibold">
              <UserCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>
                {isAr ? 'تم التحقق من العيار المخبري بواسطة:' : 'Assay Verified by:'} <strong>{factChecker.name}</strong>
              </span>
            </div>
          )}

          {/* Date & Read Time */}
          <div className="flex items-center gap-3 text-[11px] text-neutral-600 dark:text-neutral-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-[#8B6508] dark:text-gold" /> {publishDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#8B6508] dark:text-gold" /> {readTime}
            </span>
            <span>•</span>
            <span className="text-[#8B6508] dark:text-gold font-semibold uppercase">{publication}</span>
          </div>

          {/* Expand Bio Button */}
          <button
            onClick={() => setShowBio(!showBio)}
            className="text-[11px] text-[#8B6508] dark:text-gold hover:underline flex items-center gap-1 mt-1 font-semibold"
          >
            <span>
              {showBio
                ? isAr
                  ? 'إخفاء مؤهلات الكاتب'
                  : 'Hide Author Credentials'
                : isAr
                ? 'عرض المؤهلات الجيولوجية والتحليلية'
                : 'View Gemological Credentials'}
            </span>
            {showBio ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>

      </div>

      {/* Expanded Author Experience Bio (The "EXPERIENCE & EXPERTISE") */}
      {showBio && (
        <div className="mt-5 pt-4 border-t border-neutral-200 dark:border-gold/20 text-xs text-neutral-800 dark:text-neutral-300 leading-relaxed bg-neutral-50 dark:bg-black/40 p-4 rounded-xl space-y-2 border border-neutral-200 dark:border-gold/10">
          <div className="flex items-center gap-2 text-[#8B6508] dark:text-gold font-bold text-[11px] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {isAr
                ? 'مؤهلات الفحص العملي والاختبار الميداني للمؤلف:'
                : 'Author Hands-on Testing & Review Qualifications:'}
            </span>
          </div>
          <p>{author.bio}</p>
          {factChecker && (
            <p className="text-[11px] text-neutral-600 dark:text-neutral-400 pt-1 border-t border-neutral-200 dark:border-gold/10">
              <strong>{isAr ? 'المراجع التقني:' : 'Technical Reviewer:'}</strong> {factChecker.name} ({factChecker.role}) — {factChecker.affiliation}. {isAr ? 'تمت مطابقة وفحص نسب نقاء الفضة عيار 925 مع سجلات مقاييس الطيف الضوئي الرسمية.' : 'All alloy purity percentages cross-verified against official assay spectrometry records.'}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
