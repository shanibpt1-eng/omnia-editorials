'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, ShieldCheck, ArrowUpRight, ArrowUpLeft, ChevronDown, ChevronUp, CheckCircle2, Maximize2, X, ArrowRight, ExternalLink, HelpCircle } from 'lucide-react';
import { SeoHead } from '../../components/SeoHead';
import { useLuxury } from '../../components/ThemeProvider';
import { OMNIA_OFFICIAL_FAQS } from '../../data/omnia-faq';

export default function AboutOmniaStoresPage() {
  const { language } = useLuxury();
  const isAr = language === 'ar';
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>(OMNIA_OFFICIAL_FAQS[0]?.id || null);
  const [isSpreadModalOpen, setIsSpreadModalOpen] = useState(false);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const faqCategories = [
    { id: 'all', labelEn: 'All Questions (10)', labelAr: 'جميع الأسئلة (10)' },
    { id: 'bridal', labelEn: 'Bridal & 925 Silver', labelAr: 'أطقم الزفاف والفضة 925' },
    { id: 'gemstones', labelEn: 'Gemstones & Tennis', labelAr: 'الأحجار الكريمة والتنس' },
    { id: 'warranty', labelEn: 'Warranty & Care', labelAr: 'الضمان والعناية' },
    { id: 'shipping', labelEn: 'Shipping & Delivery', labelAr: 'الشحن والتوصيل' },
    { id: 'returns_payment', labelEn: 'Returns & Payment', labelAr: 'الإرجاع وطرق الدفع' },
  ];

  const filteredFaqs = selectedFaqCategory === 'all'
    ? OMNIA_OFFICIAL_FAQS
    : OMNIA_OFFICIAL_FAQS.filter((f) => f.category === selectedFaqCategory);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: OMNIA_OFFICIAL_FAQS.map((faq) => ({
      '@type': 'Question',
      name: isAr ? faq.questionAr : faq.questionEn,
      acceptedAnswer: {
        '@type': 'Answer',
        text: isAr ? faq.answerAr : faq.answerEn,
      },
    })),
  };

  return (
    <>
      <SeoHead pageType="about" />

      <div className={`py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto ${isAr ? 'font-arabic text-right' : ''}`} dir={isAr ? 'rtl' : 'ltr'}>
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-[#8B6508] dark:text-gold text-xs font-semibold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#8B6508] dark:text-gold" />
            <span>{isAr ? 'تراث الدار العريق • دبي، الإمارات العربية المتحدة' : 'The Maison Heritage • Est. Dubai, UAE'}</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold tracking-tight text-neutral-950 dark:text-white mb-6">
            {isAr ? 'إرث أمنية ستورز الملكي' : 'The Omnia Stores Legacy'}
          </h1>
          <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {isAr
              ? 'إعادة ابتكار فخامة المناسبات والأعراس الخليجية بفضة إسترلينية أصلية عيار 925، وهندسة محاكاة الألماس الملكي، ولوجستيات فائقة السرعة تغطي الخليج العربي.'
              : 'Redefining Middle Eastern ceremonial glamour through authentic 925 sterling silver, simulated diamond engineering, and seamless GCC logistics.'}
          </p>
        </div>

        {/* =========================================================================
            OFFICIAL FOUNDER & CEO EDITORIAL SPOTLIGHT: OMNIA FOUAD
        ========================================================================== */}
        <section className="mb-20">
          <div className="relative rounded-3xl overflow-hidden glass-panel border-2 border-gold/40 bg-gradient-to-br from-[#FAF7F2] via-white to-[#F4EFE6] dark:from-[#0E121C] dark:via-[#131926] dark:to-[#0A0D14] shadow-2xl p-6 sm:p-10">
            
            {/* Top Masthead Accent */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-neutral-300 dark:border-gold/20">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-gold animate-ping" />
                <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#8B6508] dark:text-gold">
                  {isAr ? 'الملف التعريفي للقيادة التنفيذية والمؤسس' : 'Official Leadership & Founder Profile'}
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-[11px] font-semibold text-[#8B6508] dark:text-gold uppercase tracking-wider">
                {isAr ? 'تأسست في دبي عام 2018' : 'Established Dubai • 2018'}
              </span>
            </div>

            {/* Main Editorial Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Visual: Founder Spread Graphic Card with Clickable Lightbox */}
              <div className="lg:col-span-5 relative group">
                <div 
                  onClick={() => setIsSpreadModalOpen(true)}
                  className="relative aspect-[1024/710] w-full rounded-2xl overflow-hidden border-2 border-[#B8860B]/50 dark:border-gold/40 shadow-xl cursor-pointer transition-transform duration-500 group-hover:scale-[1.02]"
                >
                  <Image
                    src="/press/omnia-fouad-founder-spread.png"
                    alt="Omnia Fouad - Founder & CEO of Omnia Stores"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 500px"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  
                  {/* Zoom Badge Trigger */}
                  <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-[10px] font-semibold flex items-center gap-1.5 border border-white/20 shadow">
                    <Maximize2 className="w-3 h-3 text-gold" />
                    <span>{isAr ? 'عرض اللوحة الكاملة' : 'Expand Feature'}</span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-500">
                  <span className="italic font-serif">
                    {isAr ? 'أمنية فؤاد، المؤسس والرئيس التنفيذي في استوديو دبي المطل على أفق المدينة' : 'Omnia Fouad, Founder & CEO overlooking the Dubai skyline'}
                  </span>
                </div>
              </div>

              {/* Narrative: Official Executive Story */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* Brand Logo & Statement Header */}
                <div>
                  <div className="text-xl sm:text-2xl font-serif font-black tracking-widest text-neutral-900 dark:text-white uppercase mb-1 flex items-center gap-2">
                    <span>OMNIA</span>
                    <span className="font-light text-xs tracking-widest text-[#8B6508] dark:text-gold lowercase">stores</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-neutral-950 dark:text-white leading-tight">
                    {isAr ? 'أطقم الفضة الإسترلينية العرائسية الفاخرة من دبي' : 'Luxury Sterling Silver Bridal Sets from Dubai'}
                  </h2>
                  <p className="text-xs sm:text-sm font-serif italic text-[#8B6508] dark:text-gold-light mt-1">
                    {isAr ? 'تصاميم استثنائية • بريق أخّاذ • فخامة في متناول يدك.' : 'Statement Design. Exceptional Sparkle. Accessible Luxury.'}
                  </p>
                </div>

                {/* Founder Byline Title */}
                <div className="pt-2 border-t border-neutral-300 dark:border-gold/20">
                  <h3 className="text-lg sm:text-xl font-serif font-black text-neutral-950 dark:text-white uppercase tracking-wider">
                    {isAr ? 'أمنية فؤاد' : 'OMNIA FOUAD'}
                  </h3>
                  <span className="text-xs uppercase tracking-widest text-[#8B6508] dark:text-gold font-bold">
                    {isAr ? 'المؤسس والرئيس التنفيذي | أمنية ستورز' : 'Founder & CEO | Omnia Stores'}
                  </span>
                </div>

                {/* Narrative Paragraphs */}
                <div className="space-y-3.5 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed font-serif">
                  <p>
                    {isAr
                      ? 'في قلب دار أمنية ستورز تنبض رؤية أمنية فؤاد، رائدة الأعمال المقيمة في دبي التي أسست العلامة في عام 2018، محولةً شغفاً ورؤية ذاتية التمويل إلى صرح تجاري مزدهر بملايين الدراهم يخدم العملاء في شتى أنحاء دول مجلس التعاون الخليجي.'
                      : 'At the heart of Omnia Stores is Omnia Fouad, a Dubai-based entrepreneur who founded the brand in 2018, transforming a self-funded vision into a thriving multimillion-dirham business serving customers across the GCC.'}
                  </p>
                  <p>
                    {isAr
                      ? 'بدافع من الشغف بالتصميم المبتكر والفخامة الراقية المتاحة، صاغت أمنية علامة تجارية فريدة تقدم أطقم أعراس من الفضة الإسترلينية الفاخرة، وإكسسوارات استثنائية، وتصاميم معاصرة تأسر القلوب.'
                      : 'Driven by a passion for design, innovation, and accessible luxury, Omnia has built a distinctive brand offering elegant sterling silver bridal sets, statement accessories, and contemporary designs.'}
                  </p>
                  <p>
                    {isAr
                      ? 'واليوم، تواصل قيادة مسيرة التوسع الإقليمي للدار، برؤية طموحة وراسخة لترسيخ مكانة أمنية ستورز كاسم رائد وموثوق في عالم الفخامة الراقية المتاحة عبر منطقة الشرق الأوسط.'
                      : "Today, she continues to lead the company's regional expansion, with a clear vision to establish Omnia Stores as a leading name in accessible luxury across the Middle East."}
                  </p>
                </div>

                {/* Direct Action Button */}
                <div className="pt-2">
                  <a
                    href="https://omniastores.com/collections/bridal-collection"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold to-[#AA8C2C] text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:opacity-95 transition-all transform hover:-translate-y-0.5"
                  >
                    <span>{isAr ? 'اكتشف تشكيلة أطقم الزفاف الملكية' : 'Discover the Bridal Collection'}</span>
                    <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
                  </a>
                </div>

                {/* Footer Sub-collections & Domain Anchor */}
                <div className="pt-4 border-t border-neutral-300 dark:border-gold/20 flex flex-wrap items-center justify-between text-[11px] text-neutral-600 dark:text-neutral-400 gap-2">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <a href="https://omniastores.com/collections/bridal-collection" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors font-medium">
                      {isAr ? 'أطقم فضة إسترلينية للعروس' : 'Sterling Silver Bridal Sets'}
                    </a>
                    <span>•</span>
                    <a href="https://omniastores.com/collections/luxury-sets" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors font-medium">
                      {isAr ? 'إكسسوارات زفاف فاخرة' : 'Luxury Bridal Accessories'}
                    </a>
                    <span>•</span>
                    <a href="https://omniastores.com/collections/full-sets" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors font-medium">
                      {isAr ? 'أطقم عرائسية متكاملة' : 'Complete Bridal Sets'}
                    </a>
                    <span>•</span>
                    <a href="https://omniastores.com/collections/all" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors font-medium">
                      {isAr ? 'مجوهرات مناسبات استثنائية' : 'Statement Wedding Accessories'}
                    </a>
                  </div>
                  <a
                    href="https://omniastores.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono font-bold text-[#8B6508] dark:text-gold hover:underline flex items-center gap-1"
                  >
                    <span>www.omniastores.com</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* Brand Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-20">
          <div className="relative h-96 rounded-3xl overflow-hidden border border-gold/30 shadow-2xl">
            <Image
              src="/press/brand-milestone-report-jan2027.jpg"
              alt="Omnia Stores Brand Milestone"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs text-gold uppercase tracking-widest font-semibold block mb-1">
                {isAr ? 'معايير الدار العالمية' : 'Maison Standards'}
              </span>
              <p className="text-sm font-serif font-bold text-white">
                {isAr ? 'صُممت خصيصاً للعروس الخليجية المعاصرة' : 'Handcrafted for the Modern Gulf Bride'}
              </p>
            </div>
          </div>

          <div className="space-y-6 text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <h2 className="text-2xl font-serif font-bold text-neutral-950 dark:text-white">
              {isAr ? 'إتاحة الفخامة الملكية دون أي مساومة' : 'Democratizing High Glamour Without Compromise'}
            </h2>
            <p>
              {isAr
                ? 'انطلقت أمنية ستورز من إدراك عميق لحاجة العروس الخليجية وسيدات المجتمع: استحقاق التألق الملكي ببريق الألماس في المناسبات الكبرى دون الحاجة إلى تكبيل مبالغ طائلة في خزائن مقفلة.'
                : 'Omnia Stores was born out of a profound realization: Middle Eastern brides and style curators deserved the regal sparkle of diamond high jewelry without having to lock away fortunes in vaults.'}
            </p>
            <p>
              {isAr
                ? 'من خلال دمج أحجار محاكاة الألماس الفاخرة، ولآلئ المياه العذبة الخليجية، والفضة الإسترلينية المصمتة عيار 925، نقدم روائع إبداعية تشع هيبة وسحراً تحت أضواء قاعات الاحتفالات.'
                : 'By fusing Premium simulated diamonds, lustrous Arabian Gulf freshwater pearls, and solid 925 sterling silver, we deliver masterpieces that radiate royal brilliance under ballroom chandeliers.'}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <ShieldCheck className="w-5 h-5 text-[#8B6508] dark:text-gold flex-shrink-0" />
              <span className="text-xs text-[#8B6508] dark:text-gold font-semibold tracking-wide">
                {isAr ? 'معتمدة ومختومة رسمياً عيار 925 • مختبر دبي المركزي للتحليل والمعايرة' : 'Certified 925 Assay Hallmarked • Dubai Central Laboratories'}
              </span>
            </div>
          </div>
        </div>

        {/* Key Metrics Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-20">
          <div className="p-6 rounded-2xl glass-panel border border-neutral-200 dark:border-gold/25 text-center bg-white dark:bg-[#111520]/80 shadow-sm">
            <div className="text-3xl sm:text-4xl font-serif font-bold text-[#8B6508] dark:text-gold font-mono mb-1">
              {isAr ? '+1,800' : '1,800+'}
            </div>
            <div className="text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
              {isAr ? 'تصميم مجوهرات استثنائي' : 'Jewellery Designs'}
            </div>
          </div>
          <div className="p-6 rounded-2xl glass-panel border border-neutral-200 dark:border-gold/25 text-center bg-white dark:bg-[#111520]/80 shadow-sm">
            <div className="text-3xl sm:text-4xl font-serif font-bold text-[#8B6508] dark:text-gold font-mono mb-1">
              {isAr ? '+20' : '20+'}
            </div>
            <div className="text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
              {isAr ? 'تغطية صحفية دولية' : 'Press Publications'}
            </div>
          </div>
          <div className="p-6 rounded-2xl glass-panel border border-neutral-200 dark:border-gold/25 text-center bg-white dark:bg-[#111520]/80 shadow-sm">
            <div className="text-3xl sm:text-4xl font-serif font-bold text-[#8B6508] dark:text-gold font-mono mb-1">
              {isAr ? '+10,000' : '10,000+'}
            </div>
            <div className="text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
              {isAr ? 'عروس خليجية متألقة' : 'GCC Brides Adorned'}
            </div>
          </div>
          <div className="p-6 rounded-2xl glass-panel border border-neutral-200 dark:border-gold/25 text-center bg-white dark:bg-[#111520]/80 shadow-sm">
            <div className="text-3xl sm:text-4xl font-serif font-bold text-[#8B6508] dark:text-gold font-mono mb-1">
              {isAr ? '24 ساعة' : '24H'}
            </div>
            <div className="text-xs uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
              {isAr ? 'تسليم دبي الفوري' : 'Dubai Dispatch'}
            </div>
          </div>
        </div>

        {/* Dual-Market Architecture UAE & KSA */}
        <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-gold/30 bg-gradient-to-r from-black via-[#111624] to-black mb-20 shadow-2xl dark-surface">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-xs uppercase tracking-[0.25em] text-gold font-bold block mb-2">
                {isAr ? 'البنية اللوجستية الإقليمية' : 'Regional Architecture'}
              </span>
              <h3
                style={{ color: '#FFFFFF' }}
                className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3 stay-white"
              >
                {isAr ? 'حضور سلس ومتكامل عبر الإمارات والمملكة العربية السعودية' : 'Seamless Presence Across UAE & Saudi Arabia'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {isAr ? (
                  <>
                    تدير أمنية ستورز شبكة مراكز إقليمية مزدوجة متزامنة: يخدم <strong>omniastores.com</strong> دولة الإمارات والوجهات العالمية، بينما يختص <strong>omniastores.com</strong> بالدعم اللوجستي السعودي والدفع المباشر بالريال وخدمة عملاء الرياض السريعة.
                  </>
                ) : (
                  <>
                    Omnia Stores operates a synchronized dual-hub network: <strong>omniastores.com</strong> delivers across the United Arab Emirates and international territories, while <strong>omniastores.com</strong> provides specialized Saudi logistics, direct SAR settlement, and localized Riyadh support.
                  </>
                )}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://omniastores.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-gold text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
              >
                <span>omniastores.com</span>
                {isAr ? <ArrowUpLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
              </a>
              <a
                href="https://omniastores.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full border border-emerald-400 text-emerald-400 hover:bg-emerald-500/10 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>omniastores.com</span>
                {isAr ? <ArrowUpLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
              </a>
            </div>
          </div>
        </div>

        {/* Embedded Schema.org FAQPage for SEO & Generative Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        {/* =========================================================================
            OFFICIAL OMNIA STORES FAQ SECTION (Source: omniastores.com/pages/faq)
        ========================================================================== */}
        <section className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-xs uppercase tracking-widest text-[#8B6508] dark:text-gold font-semibold mb-3">
              <HelpCircle className="w-4 h-4" />
              <span>{isAr ? 'المركز الرسمي للأسئلة الشائعة والدعم الفني' : 'Official Store FAQ & Knowledge Base'}</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-950 dark:text-white mb-3">
              {isAr ? 'الأسئلة الشائعة والأجوبة الرسمية' : 'Frequently Asked Questions'}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {isAr
                ? 'إجابات موثقة ومستخرجة مباشرة من متجر أمنية ستورز حول الفضة عيار 925، ومحاكاة الألماس، والضمان لمدة 6 أشهر، والشحن السريع داخل الإمارات ودول الخليج.'
                : 'Authoritative answers sourced directly from omniastores.com regarding 925 sterling silver bridal suites, simulated diamonds, 6-month warranty, and GCC shipping.'}
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://omniastores.com/pages/faq"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/40 bg-gold/10 hover:bg-gold/20 text-[#8B6508] dark:text-gold text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
              >
                <span>{isAr ? 'زيارة صفحة الأسئلة الشائعة على omniastores.com' : 'Visit Official FAQ on omniastores.com'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {faqCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedFaqCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  selectedFaqCategory === cat.id
                    ? 'bg-gold text-black font-bold shadow-md'
                    : 'bg-white dark:bg-[#111520] text-neutral-700 dark:text-neutral-400 hover:text-black dark:hover:text-white border border-neutral-300 dark:border-gold/20 shadow-sm'
                }`}
              >
                {isAr ? cat.labelAr : cat.labelEn}
              </button>
            ))}
          </div>

          {/* FAQ Accordion Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              const questionText = isAr ? faq.questionAr : faq.questionEn;
              const answerText = isAr ? faq.answerAr : faq.answerEn;
              const categoryTag = isAr ? faq.categoryLabelAr : faq.categoryLabelEn;

              return (
                <div
                  key={faq.id}
                  className="rounded-2xl glass-panel border border-neutral-200 dark:border-gold/25 overflow-hidden transition-all bg-white dark:bg-[#10141F] shadow-sm hover:border-gold/50"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className={`w-full p-5 flex items-start justify-between gap-3 transition-colors ${
                      isAr ? 'text-right' : 'text-left'
                    } ${isOpen ? 'bg-gold/5' : 'hover:bg-neutral-50 dark:hover:bg-white/5'}`}
                    aria-expanded={isOpen}
                  >
                    <div className="flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B6508] dark:text-gold block mb-1">
                        {categoryTag}
                      </span>
                      <span className="font-serif font-bold text-sm sm:text-base text-neutral-950 dark:text-white leading-snug">
                        {questionText}
                      </span>
                    </div>
                    <div className="pt-1 flex-shrink-0">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-[#8B6508] dark:text-gold" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-neutral-400" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-2 border-t border-neutral-200 dark:border-gold/15 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-3 animate-fadeIn bg-neutral-50/50 dark:bg-black/20">
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#8B6508] dark:text-gold flex-shrink-0 mt-1" />
                        <p>{answerText}</p>
                      </div>

                      <div className="pt-2 text-[11px] text-neutral-500 font-mono flex items-center justify-between border-t border-neutral-200 dark:border-neutral-800">
                        <span className="text-neutral-500 dark:text-neutral-400">omniastores.com/pages/faq</span>
                        <a
                          href="https://omniastores.com/pages/faq"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#8B6508] dark:text-gold hover:underline flex items-center gap-1 font-semibold"
                        >
                          <span>{isAr ? 'المصدر المعتمد' : 'Verified Policy'}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Lightbox Modal for Omnia Fouad Founder Spread */}
        {isSpreadModalOpen && (
          <div 
            onClick={() => setIsSpreadModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white dark:bg-[#0E121B] rounded-2xl overflow-hidden border border-gold/40 shadow-2xl p-4 sm:p-6"
            >
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-200 dark:border-neutral-800">
                <span className="font-serif font-bold text-sm text-neutral-900 dark:text-white">
                  {isAr ? 'الملصق التحريري الرسمي • أمنية فؤاد، المؤسس والرئيس التنفيذي' : 'Official Brand Feature • Omnia Fouad, Founder & CEO'}
                </span>
                <button
                  onClick={() => setIsSpreadModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-[1024/710] w-full rounded-xl overflow-hidden border border-gold/30">
                <Image
                  src="/press/omnia-fouad-founder-spread.png"
                  alt="Omnia Fouad - Founder & CEO of Omnia Stores Full Spread"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 900px"
                />
              </div>

              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-neutral-200 dark:border-neutral-800 text-xs">
                <span className="text-neutral-500 font-serif italic">
                  {isAr ? 'حقوق النشر © أمنية ستورز دبي • جميع الحقوق محفوظة' : 'Copyright © Omnia Stores Dubai • All Rights Reserved'}
                </span>
                <a
                  href="https://omniastores.com/collections/bridal-collection"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-full bg-gold text-black font-bold uppercase tracking-wider flex items-center gap-1.5 shadow"
                >
                  <span>{isAr ? 'تسوق تشكيلة الزفاف' : 'Shop Bridal Collection'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}
