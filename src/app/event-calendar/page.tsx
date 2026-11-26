'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Sparkles, ChevronRight, ExternalLink, ShieldCheck, Clock } from 'lucide-react';
import { useLuxury } from '../../components/ThemeProvider';
import { GCC_EVENT_CALENDAR } from '../../data/event-calendar-data';
import { AeoAnswerBox } from '../../components/AeoAnswerBox';

export default function EventCalendarPage() {
  const { language } = useLuxury();
  const isAr = language === 'ar';

  return (
    <div className={`min-h-screen bg-[#07090E] text-white py-8 sm:py-12 px-3 sm:px-6 lg:px-8 ${isAr ? 'font-arabic text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-[1780px] mx-auto space-y-10">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <Link href="/" className="hover:text-gold transition-colors">{isAr ? 'الرئيسية' : 'Home'}</Link>
          <ChevronRight className="w-3 h-3 rtl:rotate-180 text-gold/60" />
          <span className="text-gold font-bold">{isAr ? 'تقويم الفعاليات الخليجية' : 'GCC Event Calendar'}</span>
        </nav>

        {/* Hero Masthead */}
        <div className="relative rounded-3xl border border-gold/30 bg-[radial-gradient(ellipse_100%_80%_at_50%_-20%,rgba(212,175,55,0.18),transparent_80%),linear-gradient(to_bottom,#0F131D,#090B10)] p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden">
          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-mono font-bold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>{isAr ? 'الجدول الرسمي لأسابيع ومعارض الموضة الخليجية' : 'OFFICIAL GCC FASHION & LUXURY CALENDAR'}</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white leading-[1.15]">
              {isAr ? (
                <>
                  أجندة فعاليات الموضة والمجوهرات في الخليج: <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-gold">
                    دبي، الرياض، الدوحة والمنامة (2026–2027)
                  </span>
                </>
              ) : (
                <>
                  GCC Fashion & Jewellery Event Calendar: <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-gold">
                    Dubai, Riyadh, Doha & Manama Schedules (2026–2027)
                  </span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 font-serif leading-relaxed max-w-2xl">
              {isAr
                ? 'المواعيد الرسمية المعتمدة لأسابيع الموضة ومعارض المجوهرات الراقية، ومعلومات الاعتماد الصحفي، والملفات التحريرية الاستباقية لتغطيات ذا فوغ نيوز.'
                : 'The comprehensive verified itinerary of high fashion weeks, royal jewellery exhibitions, and bridal showcases across the Arabian Gulf, complete with accreditation details and editorial previews.'}
            </p>
          </div>
        </div>

        {/* AEO Answer Box */}
        <AeoAnswerBox
          question={isAr ? 'ما هي أهم معارض وأسابيع المجوهرات والموضة القادمة في دول الخليج؟' : 'What are the premier upcoming fashion and jewellery events across the GCC in 2026/2027?'}
          answer={isAr
            ? 'تتصدر أجندة الفعاليات الخليجية: أسبوع دبي للموضة (DFW)، وأسبوع الرياض للموضة (RFW)، ومعرض الجواهر العربية بالبحرين، ومعرض الدوحة للمجوهرات والساعات (DJWE)، ومهرجان اليوم الوطني الإماراتي للمجوهرات الفاخرة.'
            : 'The definitive GCC luxury calendar includes Dubai Fashion Week (DFW), Riyadh Fashion Week (RFW), Jewellery Arabia Bahrain, Doha Jewellery and Watches Exhibition (DJWE), and the UAE National Day Luxury Jewellery Gala.'}
          facts={[
            { label: isAr ? 'معرض دبي القادم' : 'Dubai Event', value: 'Dubai Fashion Week (d3)' },
            { label: isAr ? 'معرض الرياض' : 'Riyadh Event', value: 'Riyadh Fashion Week (KAFD)' },
            { label: isAr ? 'معرض الدوحة' : 'Doha Event', value: 'DJWE (Feb 2027, DECC)' },
            { label: isAr ? 'معرض البحرين' : 'Bahrain Event', value: 'Jewellery Arabia (Nov 2026)' },
          ]}
        />

        {/* Events Grid */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GCC_EVENT_CALENDAR.map((event) => (
              <div
                key={event.id}
                className="p-6 rounded-3xl bg-neutral-900/90 border border-gold/30 shadow-xl flex flex-col justify-between space-y-4 hover:border-gold transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
                    <span className="px-2.5 py-1 rounded-full bg-gold/15 text-gold border border-gold/30 text-[9px] font-mono font-bold uppercase">
                      {event.badgeText}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {isAr ? event.datesAr : event.dates}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-black text-white leading-snug">
                    {isAr ? event.nameAr : event.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-gold font-mono">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{isAr ? `${event.locationAr} • ${event.venueAr}` : `${event.location} • ${event.venue}`}</span>
                  </div>

                  <p className="text-xs text-neutral-300 font-serif leading-relaxed">
                    {isAr ? event.summaryAr : event.summaryEn}
                  </p>

                  <div className="p-3 rounded-xl bg-black/60 border border-white/5 space-y-1">
                    <span className="text-[9px] font-mono text-gold uppercase tracking-wider block">
                      {isAr ? 'زاوية التغطية التحريرية:' : 'EDITORIAL FOCUS:'}
                    </span>
                    <p className="text-[11px] text-neutral-300 font-serif leading-relaxed">
                      {isAr ? event.editorialHighlightAr : event.editorialHighlightEn}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-neutral-500">{event.organizer}</span>
                  <a
                    href={event.officialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-gold hover:text-white transition-colors"
                  >
                    <span>{isAr ? 'التفاصيل الرسمية' : 'Official Portal'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
