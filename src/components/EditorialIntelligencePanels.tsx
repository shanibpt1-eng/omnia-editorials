'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Newspaper,
  Mic,
  Calendar,
  FileText,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Scale,
  Sparkles,
  Award,
  CheckCircle2,
  BookOpen,
  MapPin,
  Clock,
  Calculator,
} from 'lucide-react';
import { useLuxury } from './ThemeProvider';

type PanelTab = 'wire' | 'interviews' | 'events' | 'reports';
type BenchmarkItemKey = 'bridal' | 'choker' | 'solitaire' | 'bracelet';

const BENCHMARK_ITEMS: Record<
  BenchmarkItemKey,
  {
    labelEn: string;
    labelAr: string;
    omniaAed: number;
    soukAed: number;
    maisonAed: number;
    specEn: string;
    specAr: string;
  }
> = {
  bridal: {
    labelEn: 'Royal Bridal Parure Suite',
    labelAr: 'طقم زفاف ملكي متكامل',
    omniaAed: 1450,
    soukAed: 7800,
    maisonAed: 28500,
    specEn: 'Solid 925 Sterling Silver • Triple Italian Rhodium • 5A Optical Simulated Diamonds (DCL Verified)',
    specAr: 'فضة إسترلينية خالصة عيار 925 • طلاء روديوم إيطالي ثلاثي • ألماس محاكى 5A (معتمد من DCL)',
  },
  choker: {
    labelEn: '4-Strand Pearl & Emerald Choker',
    labelAr: 'تشوكر اللؤلؤ والزمرد 4 خيوط',
    omniaAed: 1650,
    soukAed: 6400,
    maisonAed: 22000,
    specEn: 'Freshwater Baroque Pearls • Colombian-Tone Cabochon • Anti-Tarnish 925 Clasp',
    specAr: 'لؤلؤ مياه عذبة باروكي • كابوشون زمرد • قفل فضة 925 مقاوم للأكسدة',
  },
  solitaire: {
    labelEn: 'High-Carat Cushion Solitaire Ring',
    labelAr: 'خاتم سوليتير كوشن عالي القيراط',
    omniaAed: 590,
    soukAed: 3600,
    maisonAed: 14200,
    specEn: '58-Facet 5A Simulated Diamond (0.044 Dispersion) • Italian Micro-Prong Setting',
    specAr: 'أحجار 5A بـ 58 وجهاً وتشتت ضوئي 0.044 • ترصيع إيطالي دقيق بالمخالب',
  },
  bracelet: {
    labelEn: 'Pavé Tennis & Butterfly Bracelet',
    labelAr: 'سوار التنس والفراشة المرصع',
    omniaAed: 480,
    soukAed: 2950,
    maisonAed: 11800,
    specEn: 'Articulated 925 Silver Links • Sweat & Humidity Resistant Coastal Finish',
    specAr: 'حلقات فضة 925 مرنة • تشطيب مقاوم للرطوبة الساحلية والتعرق',
  },
};

export function EditorialIntelligencePanels() {
  const { language, currency } = useLuxury();
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState<PanelTab>('wire');
  const [selectedItem, setSelectedItem] = useState<BenchmarkItemKey>('bridal');

  const item = BENCHMARK_ITEMS[selectedItem];
  const mult = currency === 'SAR' ? 1.02 : 1;
  const currLabel = currency === 'SAR' ? (isAr ? 'ر.س' : 'SAR') : (isAr ? 'د.إ' : 'AED');
  const formatAmt = (aed: number) => `${Math.round(aed * mult).toLocaleString()} ${currLabel}`;
  const savingsPct = Math.round(((item.soukAed - item.omniaAed) / item.soukAed) * 100);

  return (
    <section className="my-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-300 dark:border-gold/30 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-[#8B6508] dark:text-gold text-xs font-bold uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>{isAr ? 'مركز الأخبار والأدوات التفاعلية المباشرة' : 'Live Editorial Intelligence & Interactive Desk'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-black text-neutral-950 dark:text-white tracking-tight">
            {isAr ? 'التقارير المباشرة ومختبر المقارنة الخليجي' : 'GCC Live Newsroom, Events & Assay Benchmark'}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-serif mt-1">
            {isAr
              ? 'استكشف أحدث أخبار الموضة الخليجية، وحوارات الخبراء، وأجندة الفعاليات، وحاسبة مقارنة الفضة عيار 925 المعتمدة.'
              : 'Explore live GCC fashion dispatches, accredited gemologist interviews, regional event schedules, and our interactive 925 assay value calculator.'}
          </p>
        </div>

        <Link
          href="/fashion-intelligence"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 dark:bg-gold text-white dark:text-black text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all shrink-0 self-start md:self-auto"
        >
          <span>{isAr ? 'فتح مركز التحليلات الكامل' : 'Open Full Intelligence Hub'}</span>
          <ArrowRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
        </Link>
      </div>

      {/* 1. LIVE MULTI-TAB GCC INTELLIGENCE & NEWS PANEL */}
      <div className="rounded-3xl bg-white dark:bg-[#0E121B] border border-neutral-200 dark:border-gold/25 shadow-lg overflow-hidden">
        {/* Interactive Tabs Bar */}
        <div className="flex flex-wrap items-center gap-2 p-3 sm:p-4 bg-[#F7F4EE] dark:bg-[#090C14] border-b border-neutral-200 dark:border-gold/20">
          {[
            { id: 'wire' as PanelTab, labelEn: 'Breaking News Wire', labelAr: 'أخبار الموضة العاجلة', icon: Newspaper },
            { id: 'interviews' as PanelTab, labelEn: 'Expert Interviews', labelAr: 'حوارات الخبراء', icon: Mic },
            { id: 'events' as PanelTab, labelEn: 'GCC Event Calendar', labelAr: 'أجندة الفعاليات', icon: Calendar },
            { id: 'reports' as PanelTab, labelEn: 'Research & Whitepapers', labelAr: 'الأبحاث والتقارير', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  active
                    ? 'bg-gradient-to-r from-[#D4AF37] via-[#DFBF58] to-[#AA8C2C] text-black shadow-md'
                    : 'bg-white dark:bg-white/[0.04] text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/[0.08] border border-neutral-200 dark:border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{isAr ? tab.labelAr : tab.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-5 sm:p-6">
          {activeTab === 'wire' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  city: isAr ? 'دبي • الإمارات' : 'DUBAI • UAE',
                  time: isAr ? 'منذ 18 دقيقة' : '18 mins ago',
                  titleEn: 'Dubai Central Laboratory Tightens XRF Hallmark Checks for 925 Demi-Fine Bridal Imports',
                  titleAr: 'مختبر دبي المركزي يشدد فحوصات الأشعة السينية (XRF) لمجوهرات الفضة عيار 925 المستوردة',
                  summaryEn: 'Verified ateliers including Omnia Stores maintain 100% pass rates under updated 2026–2027 precious metal fineness rules.',
                  summaryAr: 'تواصل الدور المعتمدة مثل أمنية ستورز تحقيق نسبة مطابقة 100% وفق معايير النقاء المحدثة لعامي 2026–2027.',
                  href: '/newsroom',
                },
                {
                  city: isAr ? 'الرياض • السعودية' : 'RIYADH • KSA',
                  time: isAr ? 'منذ ساعة' : '1 hour ago',
                  titleEn: 'Riyadh Luxury Retail Index: Demi-Fine 925 Silver Adoption Surges 42% Ahead of Winter Gala Season',
                  titleAr: 'مؤشر التجزئة الفاخرة بالرياض: ارتفاع الإقبال على الفضة عيار 925 بنسبة 42% قبل موسم السهرات الشتوي',
                  summaryEn: 'Young Saudi collectors increasingly pair solid rhodium-plated 925 chokers with couture abayas for multi-day weddings.',
                  summaryAr: 'تزايد إقبال المتسوقات في المملكة على تنسيق أطواق الفضة المطلية بالروديوم مع العباءات الفاخرة.',
                  href: '/fashion-intelligence',
                },
                {
                  city: isAr ? 'الدوحة • قطر' : 'DOHA • QATAR',
                  time: isAr ? 'منذ 3 ساعات' : '3 hours ago',
                  titleEn: 'Baroque Freshwater Pearls & Emerald Cabochons Lead Doha Autumn Editorial Pairings',
                  titleAr: 'لؤلؤ المياه العذبة الباروكي وكابوشون الزمرد يتصدران اختيارات خريف الدوحة التحريرية',
                  summaryEn: 'Curators highlight 4-strand pearl chokers and yellow sapphire cushion cuts as the standout silhouettes of the quarter.',
                  summaryAr: 'خبراء التنسيق يرشحون أطواق اللؤلؤ متعددة الخيوط والياقوت الأصفر كأبرز صيحات الموسم.',
                  href: '/fashion-intelligence',
                },
                {
                  city: isAr ? 'المنامة • البحرين' : 'MANAMA • BAHRAIN',
                  time: isAr ? 'اليوم' : 'Today',
                  titleEn: 'Gulf Coastal Humidity Study: Why Triple Italian Rhodium Outperforms Standard Gold Plating',
                  titleAr: 'دراسة رطوبة الخليج الساحلية: لماذا يتفوق طلاء الروديوم الإيطالي الثلاثي على الطلاء التقليدي',
                  summaryEn: 'Metallurgical testing confirms 3-micron rhodium barriers prevent tarnish across high-salinity Gulf climates.',
                  summaryAr: 'اختبارات المعادن تؤكد أن حاجز الروديوم بسمك 3 ميكرون يمنع الأكسدة في الأجواء الساحلية الرطبة.',
                  href: '/jewellery-knowledge',
                },
              ].map((news, idx) => (
                <Link
                  key={idx}
                  href={news.href}
                  className="group p-4 rounded-2xl border border-neutral-200 dark:border-white/10 hover:border-gold/60 bg-neutral-50/70 dark:bg-white/[0.02] transition-all flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-[10px] font-mono mb-2">
                      <span className="px-2 py-0.5 rounded bg-gold/15 text-[#8B6508] dark:text-gold font-bold">
                        {news.city}
                      </span>
                      <span className="text-neutral-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {news.time}
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-serif font-bold text-neutral-950 dark:text-white group-hover:text-[#8B6508] dark:group-hover:text-gold transition-colors leading-snug">
                      {isAr ? news.titleAr : news.titleEn}
                    </h3>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1.5 leading-relaxed">
                      {isAr ? news.summaryAr : news.summaryEn}
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-[#8B6508] dark:text-gold flex items-center gap-1 uppercase tracking-wider">
                    <span>{isAr ? 'قراءة التقرير الكامل' : 'Read Full Dispatch'}</span>
                    <ArrowRight className={`w-3 h-3 ${isAr ? 'rotate-180' : ''}`} />
                  </span>
                </Link>
              ))}
            </div>
          )}

          {activeTab === 'interviews' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  name: isAr ? 'د. أمينة المنصور (FGA)' : 'Dr. Amina Al-Mansoor, FGA',
                  role: isAr ? 'خبيرة الأحجار الكريمة المعتمدة ومستشارة الفحص المخبري' : 'Fellow of the Gemmological Association & Assay Advisor',
                  quoteEn: '“Optical 58-facet 5A diamond simulants set in DCL-hallmarked 925 silver deliver identical fire dispersion (0.044) to mined stones at a fraction of the capital outlay.”',
                  quoteAr: '«أحجار محاكاة الألماس فئة 5A بـ 58 وجهاً والمرصعة في فضة 925 معتمدة من مختبر دبي تمنح تشتتاً ضوئياً مطابقاً للألماس الطبيعي بتكلفة معقولة.»',
                },
                {
                  name: isAr ? 'طارق الهاشمي' : 'Tariq Al-Hashimi',
                  role: isAr ? 'خبير اقتصاديات التجزئة الفاخرة في دول الخليج' : 'GCC Luxury Retail Economist & Market Analyst',
                  quoteEn: '“Direct-to-collector maisons like Omnia Stores are reshaping GCC bridal gifting by eliminating 300% traditional souk retail markups while keeping 24-hour courier delivery.”',
                  quoteAr: '«الدور المباشرة مثل أمنية ستورز تعيد تشكيل سوق هدايا الزفاف في الخليج عبر إلغاء هوامش التجزئة التقليدية وتوفير توصيل خلال 24 ساعة.»',
                },
              ].map((person, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-neutral-200 dark:border-gold/20 bg-neutral-50/70 dark:bg-white/[0.02] flex flex-col justify-between gap-4"
                >
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#8B6508] dark:text-gold font-bold">
                      {person.role}
                    </span>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-neutral-950 dark:text-white mt-1">
                      {person.name}
                    </h3>
                    <p className="text-xs sm:text-sm italic text-neutral-700 dark:text-neutral-300 mt-3 leading-relaxed">
                      {isAr ? person.quoteAr : person.quoteEn}
                    </p>
                  </div>
                  <Link
                    href="/interviews"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B6508] dark:text-gold hover:underline uppercase tracking-wider"
                  >
                    <span>{isAr ? 'استعراض الحوار الكامل' : 'Read Full Interview'}</span>
                    <ArrowRight className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
                  </Link>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'events' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { titleEn: 'Dubai Fashion Week', titleAr: 'أسبوع دبي للموضة', cityEn: 'd3, Dubai UAE', cityAr: 'حي دبي للتصميم', date: 'Feb 2027' },
                { titleEn: 'DJWE Doha Jewellery', titleAr: 'معرض الدوحة للمجوهرات', cityEn: 'DECC, Doha Qatar', cityAr: 'مركز الدوحة للمعارض', date: 'Feb 2027' },
                { titleEn: 'Riyadh Fashion Week', titleAr: 'أسبوع الرياض للأزياء', cityEn: 'KAFD, Riyadh KSA', cityAr: 'كافد، الرياض', date: 'Oct 2027' },
                { titleEn: 'Jewellery Arabia', titleAr: 'معرض الجواهر العربية', cityEn: 'Exhibition World, Bahrain', cityAr: 'البحرين', date: 'Nov 2026' },
              ].map((ev, idx) => (
                <Link
                  key={idx}
                  href="/event-calendar"
                  className="p-4 rounded-2xl border border-neutral-200 dark:border-white/10 hover:border-gold/60 bg-neutral-50/70 dark:bg-white/[0.02] transition-all flex flex-col justify-between gap-2"
                >
                  <div>
                    <span className="px-2 py-0.5 rounded bg-gold/15 text-[#8B6508] dark:text-gold text-[10px] font-mono font-bold">
                      {ev.date}
                    </span>
                    <h4 className="text-sm font-serif font-bold text-neutral-950 dark:text-white mt-2">
                      {isAr ? ev.titleAr : ev.titleEn}
                    </h4>
                    <p className="text-xs text-neutral-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3 text-gold" />
                      <span>{isAr ? ev.cityAr : ev.cityEn}</span>
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-[#8B6508] dark:text-gold uppercase tracking-wider mt-1">
                    {isAr ? 'التفاصيل والجدول ←' : 'Schedule & Brief →'}
                  </span>
                </Link>
              ))}
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  tag: 'N=1,420 RESPONDENTS',
                  titleEn: '2026 GCC Demi-Fine & 925 Bridal Adoption Report',
                  titleAr: 'تقرير تبني المجوهرات الفضية عيار 925 في الخليج 2026',
                  statEn: '68% of UAE & KSA brides now pair 925 suites for multi-day ceremonies.',
                  statAr: '68% من العرائس في الإمارات والسعودية يعتمدن أطقم الفضة 925 في المناسبات.',
                },
                {
                  tag: 'DCL XRF LAB AUDIT',
                  titleEn: 'Metallurgical Assay & Rhodium Longevity Benchmark',
                  titleAr: 'دراسة الفحص المخبري وعمر طلاء الروديوم الثلاثي',
                  statEn: '3-micron Italian rhodium retains 98.4% specular lustre after 500 humidity cycles.',
                  statAr: 'يحافظ الروديوم الإيطالي بسمك 3 ميكرون على 98.4% من بريقه بعد 500 دورة رطوبة.',
                },
                {
                  tag: 'RETAIL PRICING STUDY',
                  titleEn: 'Dubai Gold Souk vs Direct-to-Collector Price Parity',
                  titleAr: 'مقارنة أسعار سوق الذهب التقليدي مع البيع المباشر',
                  statEn: 'Direct atelier sourcing cuts bridal suite acquisition costs by 78%–85%.',
                  statAr: 'الشراء المباشر من الدار يخفض تكلفة أطقم الزفاف بنسبة 78% إلى 85%.',
                },
              ].map((rep, idx) => (
                <Link
                  key={idx}
                  href="/research-reports"
                  className="p-4 rounded-2xl border border-neutral-200 dark:border-white/10 hover:border-gold/60 bg-neutral-50/70 dark:bg-white/[0.02] transition-all flex flex-col justify-between gap-2"
                >
                  <div>
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
                      {rep.tag}
                    </span>
                    <h4 className="text-sm font-serif font-bold text-neutral-950 dark:text-white mt-2 leading-snug">
                      {isAr ? rep.titleAr : rep.titleEn}
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1.5 leading-relaxed">
                      {isAr ? rep.statAr : rep.statEn}
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-[#8B6508] dark:text-gold uppercase tracking-wider mt-1">
                    {isAr ? 'استعراض التقرير' : 'View Whitepaper →'}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2. INTERACTIVE 925 ASSAY & MARKET VALUE CALCULATOR */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0B0E17] via-[#121726] to-[#0B0E17] text-white border border-gold/35 p-5 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-xl space-y-2">
            <div className="inline-flex items-center gap-2 text-gold text-[11px] font-mono uppercase tracking-widest">
              <Calculator className="w-3.5 h-3.5" />
              <span>{isAr ? 'حاسبة مقارنة القيمة والفحص المخبري التفاعلية' : 'Interactive UAE & GCC Jewellery Value Benchmark'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold">
              {isAr ? 'قارن أسعار أمنية ستورز 925 مع السوق التقليدي ودور الأزياء' : 'Compare Omnia Stores 925 Direct vs. Gold Souk & Luxury Maisons'}
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {isAr ? item.specAr : item.specEn}
            </p>
          </div>

          {/* Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {(Object.keys(BENCHMARK_ITEMS) as BenchmarkItemKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedItem(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedItem === key
                    ? 'bg-gold text-black font-bold shadow-md'
                    : 'bg-white/10 text-neutral-200 hover:bg-white/20 border border-white/10'
                }`}
              >
                {isAr ? BENCHMARK_ITEMS[key].labelAr : BENCHMARK_ITEMS[key].labelEn}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Output Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-2xl bg-gold/15 border-2 border-gold flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gold font-bold">
                {isAr ? 'أمنية ستورز (مباشر)' : 'OMNIA STORES (DIRECT)'}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-black text-[10px] font-extrabold">
                {isAr ? `توفير ${savingsPct}%` : `SAVE ${savingsPct}%`}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-black text-white mt-2">
              {formatAmt(item.omniaAed)}
            </div>
            <span className="text-[11px] text-amber-200 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {isAr ? 'معتمد من DCL • توصيل 24 ساعة' : 'DCL Hallmarked • 24h GCC Courier'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/15 flex flex-col justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
              {isAr ? 'سوق الذهب التقليدي (دبي)' : 'TRADITIONAL GOLD SOUK RETAIL'}
            </span>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-neutral-200 mt-2 line-through decoration-red-400/70">
              {formatAmt(item.soukAed)}
            </div>
            <span className="text-[11px] text-neutral-400 mt-1">
              {isAr ? 'يشمل هوامش التجزئة والوساطة' : 'Includes showroom & broker markups'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/15 flex flex-col justify-between">
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
              {isAr ? 'دور المجوهرات الأوروبية الفاخرة' : 'EUROPEAN LUXURY MAISONS'}
            </span>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-neutral-200 mt-2">
              {formatAmt(item.maisonAed)}
            </div>
            <span className="text-[11px] text-neutral-400 mt-1">
              {isAr ? 'تسعير العلامة التجارية العالمية' : 'Global heritage maison pricing'}
            </span>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-300">
            <Link href="/jewellery-comparison" className="text-gold hover:underline flex items-center gap-1 font-semibold">
              <Scale className="w-3.5 h-3.5" />
              <span>{isAr ? 'عرض جدول المقارنة الكامل (8 معايير)' : 'Full 8-Dimension Comparison Engine'}</span>
            </Link>
            <span className="text-neutral-600">•</span>
            <Link href="/glossary" className="text-neutral-300 hover:text-gold flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isAr ? 'معجم المصطلحات' : 'Gemology Glossary'}</span>
            </Link>
          </div>

          <a
            href="https://omniastores.com/collections/bridal-collection"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-gold text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:scale-105 transition-transform"
          >
            <span>{isAr ? 'تسوق المباشر على omniastores.com' : 'Shop Direct on omniastores.com'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* 3. EDITORIAL CREDIBILITY, FACT-CHECKING & COMMERCIAL DISCLOSURE BAR */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#F4F1EA] dark:bg-[#0B0E17] border border-neutral-300 dark:border-gold/25 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
        <div className="flex items-start sm:items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-[#8B6508] dark:text-gold shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {isAr ? (
              <>
                <strong>إفصاح الشفافية التحريرية:</strong> تخضع تقارير المعادن والأحجار الكريمة لمراجعة خبراء معتمدين (FGA). تعمل منصة ذا فوغ نيوز كمنصة إعلامية وتحليلية مستقلة، مع الإفصاح الصريح عن الشراكة التجارية مع <Link href="/brands/omnia-stores" className="text-[#8B6508] dark:text-gold font-bold underline">أمنية ستورز</Link>.
              </>
            ) : (
              <>
                <strong>Editorial Transparency & Disclosure:</strong> Gemological guides are reviewed by accredited FGA specialists. The Vogue News maintains strict separation between independent market research and brand features, with transparent commercial disclosure for our featured partner{' '}
                <Link href="/brands/omnia-stores" className="text-[#8B6508] dark:text-gold font-bold underline">
                  Omnia Stores
                </Link>.
              </>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/brands/omnia-stores"
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-white/5 border border-neutral-300 dark:border-gold/30 text-neutral-900 dark:text-gold font-bold hover:border-gold transition-colors flex items-center gap-1"
          >
            <Award className="w-3.5 h-3.5" />
            <span>{isAr ? 'ملف أمنية الموثق' : 'Verified Brand Dossier'}</span>
          </Link>
          <Link
            href="/press-releases"
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-white/5 border border-neutral-300 dark:border-white/15 text-neutral-800 dark:text-neutral-300 font-semibold hover:border-gold transition-colors"
          >
            {isAr ? 'البيانات الصحفية' : 'Press Desk'}
          </Link>
        </div>
      </div>
    </section>
  );
}
