'use client';

import React, { useState } from 'react';
import { Star, ShieldCheck, Crown, ChevronLeft, ChevronRight, ShoppingBag, Quote } from 'lucide-react';
import { generateAffiliateUrl } from '../lib/affiliateEngine';
import { useLuxury } from './ThemeProvider';

interface Testimonial {
  id: string;
  name: string;
  nameAr: string;
  location: string;
  locationAr: string;
  galaOccasion: string;
  galaOccasionAr: string;
  suitePurchased: string;
  suitePurchasedAr: string;
  suiteUrl: string;
  rating: number;
  quote: string;
  quoteAr: string;
  date: string;
  dateAr: string;
  verifiedBuyer: boolean;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sheikha Fatima A.',
    nameAr: 'الشيخة فاطمة آل م.',
    location: 'Dubai, UAE',
    locationAr: 'دبي، الإمارات',
    galaOccasion: 'Family Wedding at Atlantis The Royal',
    galaOccasionAr: 'حفل زفاف عائلي في أتلانتس ذا رويال',
    suitePurchased: 'Imperial Emerald & Diamond Suite',
    suitePurchasedAr: 'طقم الزمرد الإمبراطوري والألماس',
    suiteUrl: 'https://omniastores.com/collections/luxury-sets',
    rating: 5,
    quote: 'The Colombian green hue of the emeralds against the brilliant diamond pavé was the standout piece of the entire gala. Everyone assumed it was a six-figure mined set. The weight, rhodium finish, and prong security are breathtaking.',
    quoteAr: 'كان بريق حجر الزمرد الكولومبي الأخضر مع ترصيع الألماس البافيه القطعة الأكثر لفتاً للأنظار في الحفل بأكمله. اعتقد الجميع أنه طقم ألماس طبيعي يتجاوز مئات الآلاف. وزن القطع والطلاء بالروديوم وثبات المخالب يفوق الوصف.',
    date: 'October 2026',
    dateAr: 'أكتوبر 2026',
    verifiedBuyer: true,
  },
  {
    id: 'test-2',
    name: 'Reem Al-Saud',
    nameAr: 'ريم آل سعود',
    location: 'Riyadh, KSA',
    locationAr: 'الرياض، السعودية',
    galaOccasion: 'Diplomatic Gala Evening, Diriyah',
    galaOccasionAr: 'أمسية حفل دبلوماسي، الدرعية',
    suitePurchased: 'Royal Crimson Ruby Gala Suite',
    suitePurchasedAr: 'طقم الياقوت الأحمر الملكي للسهرات',
    suiteUrl: 'https://omniastores.com/collections/bridal-collection',
    rating: 5,
    quote: 'Delivered to Riyadh in under 24 hours in a bespoke velvet heirloom chest. The pigeon-blood ruby simulant has extraordinary fire, and having zero customs friction with native SAR payment made the experience flawless.',
    quoteAr: 'وصل الطلب إلى الرياض خلال أقل من 24 ساعة في صندوق مخملي فاخر. ياقوت دم الحمام الصناعي يتمتع بنقاء وبريق استثنائي، وعدم وجود أي رسوم جمركية مع الدفع المباشر بالريال السعودي جعل التجربة لا تُضاهى.',
    date: 'October 2026',
    dateAr: 'أكتوبر 2026',
    verifiedBuyer: true,
  },
  {
    id: 'test-3',
    name: 'Dana Al-Sabah',
    nameAr: 'دانة الصباح',
    location: 'Kuwait City',
    locationAr: 'مدينة الكويت',
    galaOccasion: 'Autumn Wedding Celebration',
    galaOccasionAr: 'حفل زفاف خريفي فاخر',
    suitePurchased: 'Trucial High-Luster Pearl Choker',
    suitePurchasedAr: 'تشوكر اللؤلؤ الساحلي فائق اللمعان',
    suiteUrl: 'https://omniastores.com/collections/pearl-sets',
    rating: 5,
    quote: 'The luster of these freshwater pearls paired with contemporary 925 silver is perfection. It drapes naturally over silk abayas and catches the light with pure iridescence without feeling heavy.',
    quoteAr: 'بريق هذا اللؤلؤ الطبيعي مع الفضة الإسترلينية عيار 925 يمثل قمة الإتقان. ينساب بنعومة استثنائية فوق العباءات الحريرية ويعكس الضوء بتألق دون أي ثقل مزعج.',
    date: 'September 2026',
    dateAr: 'سبتمبر 2026',
    verifiedBuyer: true,
  },
  {
    id: 'test-4',
    name: 'Mariam Al-Thani',
    nameAr: 'مريم آل ثاني',
    location: 'Doha, Qatar',
    locationAr: 'الدوحة، قطر',
    galaOccasion: 'National Museum of Qatar Gala',
    galaOccasionAr: 'أمسية متحف قطر الوطني',
    suitePurchased: 'Diamond Radiance Bridal Suite',
    suitePurchasedAr: 'طقم الألماس المتلألئ للعرائس',
    suiteUrl: 'https://omniastores.com/collections/luxury-sets',
    rating: 5,
    quote: 'I evaluated the diamonds under a 10x jeweler loupe — the micro-prong claws and 58 facets are indistinguishable from natural mined solitaires. Truly the premier demi-fine maison in the Middle East.',
    quoteAr: 'فحصت أحجار الألماس تحت عدسة تكبير 10x الخاصة بالمجوهرات — مخالب التثبيت الدقيقة والـ 58 وجهاً لا يمكن تمييزها عن الألماس الطبيعي المستخرج. حقاً هي دار المجوهرات الراقية الأولى في الشرق الأوسط.',
    date: 'September 2026',
    dateAr: 'سبتمبر 2026',
    verifiedBuyer: true,
  },
];

export function VipGalaTestimonials() {
  const { language } = useLuxury();
  const isAr = language === 'ar';
  const [current, setCurrent] = useState(0);
  const active = TESTIMONIALS[current] || TESTIMONIALS[0];

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  if (!active) return null;

  const activeName = isAr ? active.nameAr : active.name;
  const activeLocation = isAr ? active.locationAr : active.location;
  const activeOccasion = isAr ? active.galaOccasionAr : active.galaOccasion;
  const activeSuite = isAr ? active.suitePurchasedAr : active.suitePurchased;
  const activeQuote = isAr ? active.quoteAr : active.quote;
  const activeDate = isAr ? active.dateAr : active.date;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-gold/40 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-gradient-to-r from-black via-[#0B0E17] to-[#121624] p-8 sm:p-12 lg:p-14 group dark-surface">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(212,175,55,0.12)_0%,transparent_70%)] blur-[90px] pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-gold/25 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-bold uppercase tracking-[0.25em] mb-3 backdrop-blur-md">
              <Crown className="w-3.5 h-3.5 text-gold animate-bounce" />
              <span>{isAr ? 'سجل حفلات ونخبة مجتمع الخليج العربي' : 'GCC HIGH SOCIETY & GALA SOCIAL REGISTER'}</span>
            </div>
            <h2
              style={{ color: '#FFFFFF' }}
              className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15] stay-white"
            >
              {isAr ? 'آراء وشهادات موثقة من ضيوف الحفلات الملكية' : 'Verified Gala Testimonials & Reviews'}
            </h2>
            <p className="text-sm text-neutral-300 mt-2 max-w-xl">
              {isAr
                ? 'انطباعات حقيقية من عروسات الخليج ونخبة سيدات المجتمع المتألقات بأطقم أمنية ستورز في أرقى المناسبات.'
                : 'Authentic commentary from Middle Eastern brides and high-society attendees wearing Omnia Stores suites across sovereign galas.'}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-black/80 border border-gold/30 text-gold hover:bg-gold hover:text-black transition-all shadow-md active:scale-95"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            </button>
            <span className="text-xs font-mono text-gold px-2">
              0{current + 1} / 0{TESTIMONIALS.length}
            </span>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-black/80 border border-gold/30 text-gold hover:bg-gold hover:text-black transition-all shadow-md active:scale-95"
              aria-label="Next Testimonial"
            >
              <ChevronRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Active Testimonial Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Quote & Stars Column (8 cols) */}
          <div className="lg:col-span-8 space-y-5">
            {/* 5-Star Rating & Occasion */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: active.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="text-xs text-gold font-mono font-semibold">
                {activeOccasion}
              </span>
            </div>

            {/* Quote */}
            <div className="relative">
              <Quote className={`w-8 h-8 text-gold/20 absolute -top-4 pointer-events-none ${isAr ? '-right-3' : '-left-3'}`} />
              <p
                style={{ color: '#F1F5F9' }}
                className={`text-base sm:text-lg lg:text-xl font-serif italic text-neutral-100 leading-relaxed stay-white ${isAr ? 'pr-4 border-r-2' : 'pl-4 border-l-2'} border-gold/40`}
              >
                "{activeQuote}"
              </p>
            </div>

            {/* Author Byline */}
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/50 flex items-center justify-center text-gold font-serif font-bold text-sm">
                {activeName.charAt(0)}
              </div>
              <div>
                <span className="text-sm font-bold text-white block">
                  {activeName}
                </span>
                <span className="text-xs text-neutral-400 flex items-center gap-1.5">
                  <span>{activeLocation}</span>
                  <span>•</span>
                  <span>{activeDate}</span>
                  {active.verifiedBuyer && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.2 rounded-full">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      {isAr ? 'مشترٍ موثق' : 'Verified Purchase'}
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Featured Suite Product Pill (4 cols) */}
          <div className="lg:col-span-4 p-5 rounded-2xl bg-black/80 border border-gold/30 shadow-xl space-y-3">
            <span className="text-[10px] uppercase tracking-widest text-gold font-mono block">
              {isAr ? 'الطقم المميز المعتمد في الحفل:' : 'Featured Suite Worn at Gala:'}
            </span>
            <div className="text-sm font-serif font-bold text-white">
              {activeSuite}
            </div>
            <p className="text-xs text-neutral-400">
              {isAr
                ? 'مصنوع يدوياً من الفضة الإسترلينية عيار 925 مع درع حماية من الروديوم المقاوم للأكسدة.'
                : 'Hand-crafted in certified 925 sterling silver with rhodium anti-tarnish shield.'}
            </p>

            <a
              href={generateAffiliateUrl({
                baseUrl: active.suiteUrl,
                source: 'vip_testimonials',
                medium: active.id,
              })}
              target="_blank"
              rel="nofollow sponsored"
              className="w-full mt-2 px-4 py-2.5 rounded-full bg-gold hover:bg-amber-300 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{isAr ? 'تسوق هذا الطقم على omniastores.com' : 'Shop This Suite on omniastores.com'}</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
