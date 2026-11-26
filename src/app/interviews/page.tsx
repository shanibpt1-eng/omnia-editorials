'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User, Sparkles, ChevronRight, Award, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useLuxury } from '../../components/ThemeProvider';
import { EXPERT_INTERVIEWS } from '../../data/interviews-data';
import { AeoAnswerBox } from '../../components/AeoAnswerBox';

export default function ExpertInterviewsPage() {
  const { language } = useLuxury();
  const isAr = language === 'ar';
  const [activeInterviewIdx, setActiveInterviewIdx] = useState(0);
  const activeInterview = EXPERT_INTERVIEWS[activeInterviewIdx];

  return (
    <div className={`min-h-screen bg-[#07090E] text-white py-8 sm:py-12 px-3 sm:px-6 lg:px-8 ${isAr ? 'font-arabic text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-[1780px] mx-auto space-y-10">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <Link href="/" className="hover:text-gold transition-colors">{isAr ? 'الرئيسية' : 'Home'}</Link>
          <ChevronRight className="w-3 h-3 rtl:rotate-180 text-gold/60" />
          <span className="text-gold font-bold">{isAr ? 'حوارات الخبراء' : 'Expert Interviews'}</span>
        </nav>

        {/* Hero Masthead */}
        <div className="relative rounded-3xl border border-gold/30 bg-[radial-gradient(ellipse_100%_80%_at_50%_-20%,rgba(212,175,55,0.18),transparent_80%),linear-gradient(to_bottom,#0F131D,#090B10)] p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden">
          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-mono font-bold uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{isAr ? 'حوارات الرؤساء وخبراء علم الأحجار' : 'INDUSTRY DIALOGUES & GEMOLOGICAL VOICES'}</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white leading-[1.15]">
              {isAr ? (
                <>
                  حوارات الخبراء وصناع القرار: <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-gold">
                    رؤى حول علم الفحص الطيفي، أسواق التجزئة ومستقبل المجوهرات
                  </span>
                </>
              ) : (
                <>
                  Expert Interviews & Leadership Insights: <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-gold">
                    Gemologists, Assayers & Luxury Strategists in Conversation
                  </span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 font-serif leading-relaxed max-w-2xl">
              {isAr
                ? 'لقاءات معمقة مع كبار خبراء المعادن الثمينة ومحللي أسواق الرفاهية في دبي والرياض، تناقش التحولات الجوهرية في صناعة المجوهرات المعتمدة وحلول التمويل الرقمي.'
                : 'In-depth interviews with accredited gemologists, metallurgical scientists, and luxury retail economists exploring the evolution of certified demi-fine suites, XRF lab verification, and digital luxury commerce.'}
            </p>
          </div>
        </div>

        {/* AEO Answer Box */}
        <AeoAnswerBox
          question={isAr ? 'ما هي أهم خلاصة يقدمها خبراء علم الأحجار في حوارات ذا فوغ نيوز؟' : 'What is the primary gemological consensus regarding certified 925 silver in the GCC?'}
          answer={isAr
            ? 'يؤكد خبراء علم الأحجار والمعادن أن الفضة الإسترلينية 925 المحمية بحاجز الروديوم الثلاثي توفر نفس البريق والانعكاس البصري للذهب الأبيض عيار 18 مع مقاومة تامة للأكسدة، مما يجعلها الخيار الذكي والأكثر عملية للمناسبات الملكية.'
            : 'Gemological experts confirm that solid 925 sterling silver protected by a 0.5-micron triple rhodium electroplating barrier provides optical reflectivity and surface durability identical to 18K white gold, making it the most versatile and accessible luxury option for contemporary gala and bridal wear.'}
          facts={[
            { label: isAr ? 'الخبير الأبرز' : 'Featured Expert', value: 'Dr. Amina Al-Mansoor (FGA)' },
            { label: isAr ? 'المعيار العلمي' : 'Scientific Metric', value: 'XRF Spectroscopy & 0.5µm Rhodium' },
            { label: isAr ? 'المقارنة البصرية' : 'Optical Match', value: '18K White Gold & D-Color Flawless' },
            { label: isAr ? 'اعتماد المختبر' : 'Lab Accreditation', value: 'Dubai Central Laboratory (DCL)' },
          ]}
        />

        {/* Interview Selector Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none text-xs font-mono">
          {EXPERT_INTERVIEWS.map((interview, idx) => (
            <button
              key={interview.id}
              onClick={() => setActiveInterviewIdx(idx)}
              className={`px-5 py-3 rounded-2xl font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                activeInterviewIdx === idx
                  ? 'bg-gold text-black shadow-lg scale-105'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-white/10'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>{isAr ? interview.intervieweeNameAr : interview.intervieweeName}</span>
            </button>
          ))}
        </div>

        {/* Active Interview Feature */}
        <div className="p-6 sm:p-10 rounded-3xl bg-neutral-900/90 border border-gold/30 space-y-8 shadow-2xl">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-gold">
              <span>{isAr ? activeInterview.intervieweeTitleAr : activeInterview.intervieweeTitle}</span>
              <span>•</span>
              <span>{activeInterview.publishDate}</span>
              <span>•</span>
              <span>{isAr ? activeInterview.readTimeAr : activeInterview.readTime}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-serif font-black text-white leading-tight">
              {isAr ? activeInterview.headlineAr : activeInterview.headlineEn}
            </h2>

            <p className="text-sm text-neutral-300 font-serif leading-relaxed italic border-l-2 rtl:border-l-0 rtl:border-r-2 border-gold pl-4 rtl:pl-0 rtl:pr-4">
              {isAr ? activeInterview.standfirstAr : activeInterview.standfirstEn}
            </p>
          </div>

          {/* Key Takeaways Card */}
          <div className="p-5 rounded-2xl bg-black/60 border border-gold/25 space-y-3">
            <span className="text-[10px] font-mono text-gold font-bold uppercase tracking-wider block">
              {isAr ? 'أهم النتائج والنقاط المستخلصة' : 'KEY EXECUTIVE TAKEAWAYS'}
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {(isAr ? activeInterview.keyTakeawaysAr : activeInterview.keyTakeawaysEn).map((takeaway, i) => (
                <div key={i} className="flex items-start gap-2 text-xs font-serif text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Q&A Transcript */}
          <div className="space-y-6 pt-4 border-t border-white/10">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block">
              {isAr ? 'نص الحوار الكامل' : 'COMPLETE INTERVIEW TRANSCRIPT'}
            </span>

            {activeInterview.qaTranscript.map((qa, i) => (
              <div key={i} className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                <div className="flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded bg-gold/20 text-gold font-mono font-bold text-xs shrink-0">Q</span>
                  <h4 className="text-sm font-serif font-bold text-white leading-snug">
                    {isAr ? qa.questionAr : qa.questionEn}
                  </h4>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-white/5">
                  <span className="px-2 py-0.5 rounded bg-neutral-800 text-white font-mono font-bold text-xs shrink-0">A</span>
                  <p className="text-xs sm:text-sm text-neutral-300 font-serif leading-relaxed">
                    {isAr ? qa.answerAr : qa.answerEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
