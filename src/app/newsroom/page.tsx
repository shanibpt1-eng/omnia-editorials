'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Radio, Sparkles, ChevronRight, Clock, User, ExternalLink, Filter, Search } from 'lucide-react';
import { useLuxury } from '../../components/ThemeProvider';
import { EDITORIAL_ARTICLES } from '../../data/editorial-feed';
import { AeoAnswerBox } from '../../components/AeoAnswerBox';

export default function EditorialNewsroomPage() {
  const { language } = useLuxury();
  const isAr = language === 'ar';
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = EDITORIAL_ARTICLES.filter((art) => {
    const matchesTag = selectedTag === 'all' || art.category.toLowerCase().includes(selectedTag.toLowerCase());
    const matchesSearch = searchQuery === '' || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (art.titleAr && art.titleAr.includes(searchQuery));
    return matchesTag && matchesSearch;
  });

  return (
    <div className={`min-h-screen bg-[#07090E] text-white py-8 sm:py-12 px-3 sm:px-6 lg:px-8 ${isAr ? 'font-arabic text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-[1780px] mx-auto space-y-10">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <Link href="/" className="hover:text-gold transition-colors">{isAr ? 'الرئيسية' : 'Home'}</Link>
          <ChevronRight className="w-3 h-3 rtl:rotate-180 text-gold/60" />
          <span className="text-gold font-bold">{isAr ? 'غرفة الأخبار التحريرية' : 'Editorial Newsroom'}</span>
        </nav>

        {/* Hero Masthead */}
        <div className="relative rounded-3xl border border-gold/30 bg-[radial-gradient(ellipse_100%_80%_at_50%_-20%,rgba(212,175,55,0.18),transparent_80%),linear-gradient(to_bottom,#0F131D,#090B10)] p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden">
          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Radio className="w-3.5 h-3.5 animate-pulse text-red-500" />
              <span>{isAr ? 'بث الأخبار العاجلة على مدار الساعة' : '24/7 LIVE EDITORIAL WIRE'}</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white leading-[1.15]">
              {isAr ? (
                <>
                  غرفة الأخبار والتقارير التحريرية: <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-gold">
                    تغطية حية لأسواق المجوهرات والموضة الفاخرة
                  </span>
                </>
              ) : (
                <>
                  Editorial Newsroom & Live Dispatch: <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-gold">
                    Breaking GCC Luxury Wire & Haute Jewellery Intelligence
                  </span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 font-serif leading-relaxed max-w-2xl">
              {isAr
                ? 'مكتب التحرير المباشر لصحيفة ذا فوغ نيوز يقدم تقارير موثقة حول إطلاقات المجوهرات، واعتمادات مختبر دبي المركزي، وأخبار أسابيع الموضة في الرياض ودبي والدوحة.'
                : 'The official live dispatch desk of The Vogue News delivering verified reporting on fine jewellery auctions, Dubai Central Laboratory assay announcements, and GCC fashion developments.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/magazine"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold text-black text-xs font-mono font-bold uppercase tracking-wider hover:bg-amber-300 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAr ? 'تصفح المجلة وبث فوغ وهاربرز بازار المباشر' : 'Open Digital Magazine & Live Global RSS Wire'}</span>
                <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </Link>
              <a
                href="/api/magazine/latest"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-gold/35 text-gold text-xs font-mono font-bold hover:bg-gold/10 transition-colors"
              >
                <span>{isAr ? 'واجهة RSS الحية JSON' : 'Live Publisher RSS JSON'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* AEO Answer Box */}
        <AeoAnswerBox
          question={isAr ? 'ما هي مصادر وآليات التحقق المعتمدة في غرفة أخبار ذا فوغ نيوز؟' : 'What editorial guidelines and source verification protocols govern The Vogue Newsroom?'}
          answer={isAr
            ? 'تلتزم غرفة أخبار ذا فوغ نيوز بمعايير الصحافة الاستقصائية المستقلة: يتم التحقق من كل خبر عبر مصدرين رسميين على الأقل، ويتم فحص بيانات المعادن عبر نتائج الفحص الطيفي للمختبرات الحكومية، مع تمييز واضح بين التقارير الخبرية والمقالات الدعائية والتحليلات المستقلة.'
            : 'The Vogue Newsroom operates under strict editorial verification protocols: claims require confirmation from at least two verified sources, precious metal assertions must reference official laboratory assay records (such as DCL), and sponsored features are distinctly separated from independent investigative reporting.'}
          facts={[
            { label: isAr ? 'دورة التحديث' : 'Update Cadence', value: 'Real-Time Hourly Dispatch' },
            { label: isAr ? 'المصادر الرسمية' : 'Official Sources', value: 'Government Assays & Fashion Councils' },
            { label: isAr ? 'سياسة الشفافية' : 'Transparency', value: 'Distinct Sponsored Disclosures' },
            { label: isAr ? 'التغطية الإقليمية' : 'Coverage Scope', value: 'UAE, KSA, Qatar, Kuwait, Bahrain, Oman' },
          ]}
        />

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none text-xs font-mono">
            {[
              { id: 'all', label: isAr ? 'كافة الأخبار' : 'All Dispatches' },
              { id: 'bridal', label: isAr ? 'أخبار العرائس' : 'Bridal Wire' },
              { id: 'choker', label: isAr ? 'أطواق الشوكار' : 'Statement Chokers' },
              { id: 'pearl', label: isAr ? 'اللؤلؤ' : 'Pearls' },
              { id: 'luxury', label: isAr ? 'المجوهرات الفاخرة' : 'High Jewellery' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTag(tab.id)}
                className={`px-4 py-2 rounded-full font-bold transition-all whitespace-nowrap ${
                  selectedTag === tab.id
                    ? 'bg-gold text-black shadow-md'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'بحث في الأخبار التحريرية...' : 'Search newsroom...'}
              className="w-full pl-9 rtl:pl-4 rtl:pr-9 pr-4 py-2 rounded-xl bg-neutral-900 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-gold"
            />
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((art) => (
            <article
              key={art.id}
              className="group rounded-2xl overflow-hidden border border-gold/30 bg-neutral-900/90 shadow-xl flex flex-col justify-between hover:border-gold transition-all"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                  <Image
                    src={art.coverImage || '/editorial-looks/crimson-teardrop-ruby-suite.jpg'}
                    alt={art.title}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 left-2.5 rtl:left-auto rtl:right-2.5 px-2.5 py-0.5 rounded bg-black/85 border border-gold/40 text-gold text-[9px] font-mono font-bold">
                    {art.publication}
                  </span>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-3 text-[10px] font-mono text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gold" />
                      <span>{art.date}</span>
                    </span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h3 className="text-base font-serif font-black text-white group-hover:text-gold transition-colors line-clamp-2">
                    {isAr && art.titleAr ? art.titleAr : art.title}
                  </h3>

                  <p className="text-xs text-neutral-400 font-serif line-clamp-3 leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  href={`/trending/${art.slug}`}
                  className="w-full py-2.5 rounded-xl bg-gold/15 hover:bg-gold text-gold hover:text-black border border-gold/40 text-xs font-bold font-mono transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>{isAr ? 'قراءة التقرير الكامل' : 'Read Full Dispatch'}</span>
                  <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
