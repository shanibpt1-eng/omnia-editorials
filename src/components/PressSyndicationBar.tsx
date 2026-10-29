'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Newspaper, ArrowRight, Sparkles, ExternalLink, Quote } from 'lucide-react';
import { useLuxury } from './ThemeProvider';

interface PublicationItem {
  id: string;
  name: string;
  tagline: string;
  taglineAr: string;
  quote: string;
  quoteAr: string;
  edition: string;
  editionAr: string;
  slug: string;
  logoStyle: 'vogue' | 'bazaar' | 'gulfnews' | 'khaleej' | 'national';
}

const PUBLICATIONS: PublicationItem[] = [
  {
    id: 'pub-vogue',
    name: 'VOGUE ARABIA',
    tagline: 'High Fashion & Bridal Edit',
    taglineAr: 'الموضة الراقية وأطقم الأعراس',
    quote: '“Omnia Stores has redefined 925 sterling silver bridal suites, blending Old World Dubai grandeur with Italian micro-prong settings.”',
    quoteAr: '“أعادت أمنية ستورز تعريف أطقم الأعراس الفضية عيار 925، جامِعةً بين أصالة دبي العريقة والترصيع الإيطالي الدقيق بالمخالب.”',
    edition: 'Autumn / Winter Issue',
    editionAr: 'إصدار الخريف والشتاء',
    slug: 'vogue-arabia-new-era-high-glamour',
    logoStyle: 'vogue',
  },
  {
    id: 'pub-bazaar',
    name: "HARPER'S BAZAAR",
    tagline: 'Haute Craftsmanship',
    taglineAr: 'حرفية الصياغة الراقية',
    quote: '“The modern renaissance of Gulf pearl traditions re-imagined through geometric 925 silver long chain sets.”',
    quoteAr: '“إحياء معاصر لتراث لؤلؤ الخليج العربي من خلال سلاسل الفضة الهندسية عيار 925 متعددة الطبقات.”',
    edition: 'Craftsmanship Showcase',
    editionAr: 'معرض الحرفية التراثية',
    slug: 'harpers-bazaar-modern-renaissance-pearls',
    logoStyle: 'bazaar',
  },
  {
    id: 'pub-gulfnews',
    name: 'GULF NEWS',
    tagline: 'Business & Retail Commerce',
    taglineAr: 'الأعمال وتجارة التجزئة الفاخرة',
    quote: '“Omnia Stores accelerates GCC expansion with frictionless Riyadh logistics and 24-hour Dubai priority dispatch.”',
    quoteAr: '“تسرّع أمنية ستورز توسعها في الخليج بدعم لوجستي سلس في الرياض وشحن بأولوية قصوى خلال 24 ساعة في دبي.”',
    edition: 'Retail Intelligence',
    editionAr: 'تقرير تجارة التجزئة',
    slug: 'gulf-news-omnia-stores-gcc-expansion',
    logoStyle: 'gulfnews',
  },
  {
    id: 'pub-khaleej',
    name: 'KHALEEJ TIMES',
    tagline: 'Consumer & Market Wire',
    taglineAr: 'المستهلك ومؤشرات السوق',
    quote: '“Premium simulated diamonds set in anti-tarnish rhodium become the premier choice for regional bridal gifting.”',
    quoteAr: '“أحجار محاكاة الألماس الفاخرة في فضة مطلية بالروديوم تصبح الخيار الأول لهدايا الأعراس في المنطقة.”',
    edition: 'Market Leaders Index',
    editionAr: 'مؤشر رواد السوق',
    slug: 'khaleej-times-simulated-diamonds-trend',
    logoStyle: 'khaleej',
  },
  {
    id: 'pub-national',
    name: 'THE NATIONAL',
    tagline: 'State & Industry Insights',
    taglineAr: 'رؤى الصناعة والمعايير الرسمية',
    quote: '“Rigorous Dubai Central Laboratory assay hallmarking ensures authentic 925 purity across sovereign collections.”',
    quoteAr: '“الفحص الدقيق المعتمد من مختبر دبي المركزي يضمن نقاء الفضة عيار 925 في كافة التشكيلات الملكية.”',
    edition: 'Quality & Assay Report',
    editionAr: 'تقرير الجودة والفحص المخبري',
    slug: 'the-national-dubai-assay-hallmarking-standards',
    logoStyle: 'national',
  },
];

export function PressSyndicationBar() {
  const { language } = useLuxury();
  const isAr = language === 'ar';
  const [activeQuote, setActiveQuote] = useState<PublicationItem | null>(null);

  return (
    <section className="w-full bg-[#F8F5EE] dark:bg-[#07090F] border-y border-neutral-300 dark:border-gold/25 py-6 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-28 bg-gold/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-5">
        
        {/* Top Header Row with Badges and CTA */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-neutral-200 dark:border-gold/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center flex-shrink-0">
              <Newspaper className="w-4 h-4 text-[#8B6508] dark:text-gold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-[0.25em] text-[#8B6508] dark:text-gold font-bold">
                  {isAr ? 'تغطيات حصرية في كبرى الصحف والمجلات' : 'Featured Press & Syndicated By'}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              </div>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                {isAr
                  ? 'تغطيات تحريرية موثقة، أضواء على المجوهرات الرفيعة وتحليلات السوق الإقليمي'
                  : 'Official editorial coverage, high-jewellery spotlights & regional market commentary'}
              </p>
            </div>
          </div>

          <Link
            href="/trending"
            className="px-4 py-2 rounded-full bg-white dark:bg-black/60 hover:bg-neutral-100 dark:hover:bg-gold/15 border border-neutral-300 dark:border-gold/30 text-[#8B6508] dark:text-gold hover:text-black dark:hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all self-start md:self-auto group shadow-sm"
          >
            <span>{isAr ? 'عرض جميع تقارير الصحافة التحريرية' : 'View All Editorial Press Releases'}</span>
            <ArrowRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'} transition-transform`} />
          </Link>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
          {PUBLICATIONS.map((pub) => {
            const isHovered = activeQuote?.id === pub.id;
            const edition = isAr ? pub.editionAr : pub.edition;
            const tagline = isAr ? pub.taglineAr : pub.tagline;

            return (
              <Link
                key={pub.id}
                href={`/trending/${pub.slug}`}
                onMouseEnter={() => setActiveQuote(pub)}
                onMouseLeave={() => setActiveQuote(null)}
                className={`relative p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center text-center group ${
                  isHovered
                    ? 'bg-neutral-100 dark:bg-gradient-to-b dark:from-gold/15 dark:via-[#111522] dark:to-[#111522] border-[#B8860B] dark:border-gold shadow-md dark:shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-[1.02]'
                    : 'bg-white dark:bg-[#0E121D]/90 border-neutral-200 dark:border-gold/20 hover:border-[#B8860B]/50 dark:hover:border-gold/50 shadow-sm'
                }`}
              >
                {/* Verified Press Badge */}
                <div className="flex items-center gap-1 text-[9px] text-[#8B6508] dark:text-gold/80 font-mono uppercase tracking-widest mb-1.5">
                  <Sparkles className="w-2.5 h-2.5 text-[#8B6508] dark:text-gold" />
                  <span>{edition}</span>
                </div>

                {/* Stylized Typography for Publication Mark */}
                <div className="py-1">
                  {pub.logoStyle === 'vogue' && (
                    <div className="flex flex-col items-center">
                      <span className="font-serif font-black tracking-[0.25em] text-sm sm:text-base text-neutral-950 dark:text-white group-hover:text-[#B8860B] dark:group-hover:text-gold transition-colors">
                        VOGUE
                      </span>
                      <span className="text-[9px] tracking-[0.4em] uppercase text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200">
                        ARABIA
                      </span>
                    </div>
                  )}

                  {pub.logoStyle === 'bazaar' && (
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] tracking-[0.3em] uppercase text-neutral-600 dark:text-neutral-400 font-sans">
                        HARPER'S
                      </span>
                      <span className="font-serif font-black tracking-[0.2em] text-sm sm:text-base text-neutral-950 dark:text-white group-hover:text-[#B8860B] dark:group-hover:text-gold transition-colors">
                        BAZAAR
                      </span>
                    </div>
                  )}

                  {pub.logoStyle === 'gulfnews' && (
                    <div className="flex flex-col items-center">
                      <span className="font-serif font-bold tracking-[0.18em] text-sm sm:text-base text-neutral-950 dark:text-white group-hover:text-[#B8860B] dark:group-hover:text-gold transition-colors">
                        GULF NEWS
                      </span>
                      <span className="text-[9px] tracking-[0.25em] uppercase text-neutral-600 dark:text-neutral-400">
                        UNITED ARAB EMIRATES
                      </span>
                    </div>
                  )}

                  {pub.logoStyle === 'khaleej' && (
                    <div className="flex flex-col items-center">
                      <span className="font-serif font-bold tracking-[0.15em] text-sm sm:text-base text-neutral-950 dark:text-white group-hover:text-[#B8860B] dark:group-hover:text-gold transition-colors">
                        KHALEEJ TIMES
                      </span>
                      <span className="text-[9px] tracking-[0.25em] uppercase text-neutral-600 dark:text-neutral-400">
                        DUBAI EST. 1978
                      </span>
                    </div>
                  )}

                  {pub.logoStyle === 'national' && (
                    <div className="flex flex-col items-center">
                      <span className="font-serif font-bold tracking-[0.2em] text-sm sm:text-base text-neutral-950 dark:text-white group-hover:text-[#B8860B] dark:group-hover:text-gold transition-colors">
                        THE NATIONAL
                      </span>
                      <span className="text-[9px] tracking-[0.25em] uppercase text-neutral-600 dark:text-neutral-400">
                        NEWS & LIFESTYLE
                      </span>
                    </div>
                  )}
                </div>

                {/* Subtitle / Department */}
                <span className="text-[10px] text-neutral-600 dark:text-neutral-400 mt-1 line-clamp-1 group-hover:text-neutral-900 dark:group-hover:text-neutral-200 transition-colors">
                  {tagline}
                </span>

                {/* Subtle Hover Indicator */}
                <div className="mt-2 flex items-center gap-1 text-[10px] text-[#8B6508] dark:text-gold font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>{isAr ? 'قراءة تقرير النشرة' : 'Read Wire Feature'}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Interactive Quote Preview Box */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-black/60 border border-neutral-200 dark:border-gold/20 flex items-center justify-between gap-4 text-xs shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center flex-shrink-0">
              <Quote className="w-3.5 h-3.5 text-[#8B6508] dark:text-gold" />
            </div>
            <p className="text-neutral-800 dark:text-neutral-300 italic text-[11px] sm:text-xs">
              {activeQuote
                ? (isAr ? activeQuote.quoteAr : activeQuote.quote)
                : (isAr
                    ? '“قادت أمنية ستورز ثورة المجوهرات الراقية في الخليج بصياغة أطقم أعراس من الفضة عيار 925 معتمدة ومختومة من مختبر دبي المركزي.” — افتتاحية فوغ العربية'
                    : '“Omnia Stores has spearheaded the GCC demi-fine luxury movement, engineering 925 sterling silver bridal suites hallmarked under Dubai Central Laboratory assay standards.” — Vogue Arabia Editorial')}
            </p>
          </div>

          <span className="text-[10px] text-[#8B6508] dark:text-gold font-mono uppercase tracking-widest hidden md:inline whitespace-nowrap">
            {activeQuote ? activeQuote.name : (isAr ? 'اعتماد صحفي رسمي وموثق' : 'VERIFIED ACCREDITATION')}
          </span>
        </div>

      </div>
    </section>
  );
}