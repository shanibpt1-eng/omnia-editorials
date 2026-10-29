'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Sparkles, 
  Crown, 
  ArrowUpRight, 
  Copy, 
  Check, 
  Truck, 
  ShieldCheck, 
  Gift, 
  ExternalLink,
  Plane,
  Gem,
  Award,
  CheckCircle2
} from 'lucide-react';
import { generateAffiliateUrl } from '../lib/affiliateEngine';
import { useLuxury } from './ThemeProvider';

interface VaultLook {
  id: string;
  name: string;
  nameAr: string;
  image: string;
  badge: string;
  badgeAr: string;
  desc: string;
  descAr: string;
}

const VAULT_LOOKS: VaultLook[] = [
  {
    id: 'vault-emerald',
    name: 'Imperial Emerald',
    nameAr: 'الزمرد الإمبراطوري',
    image: '/hero/hero-emerald-grandeur.jpg',
    badge: 'COLOMBIAN HUE',
    badgeAr: 'تدرج كولومبي نادر',
    desc: 'Simulated Colombian emeralds set with Premium diamond accents in 925 silver.',
    descAr: 'زمرد كولومبي محاكى مرصع بألماس فائق النقاء الفاخرة في فضة 925.',
  },
  {
    id: 'vault-diamond',
    name: 'Diamond Radiance',
    nameAr: 'إشراقة الألماس',
    image: '/hero/hero-diamond-radiance.jpg',
    badge: 'ROYAL BRIDAL',
    badgeAr: 'أعراس ملكية',
    desc: 'High-carat cascading pear drops with Italian micro-prong claws.',
    descAr: 'قطرات إجاصية متساقطة بأوزان قيراطية عالية ومخالب إيطالية فائقة الدقة.',
  },
  {
    id: 'vault-ruby',
    name: 'Gala Ruby',
    nameAr: 'ياقوت السهرات',
    image: '/hero/hero-ruby-statements.jpg',
    badge: 'CRIMSON RED',
    badgeAr: 'أحمر قرمزي ملكي',
    desc: 'Square-cut royal pigeon-blood simulants with brilliant pavé clusters.',
    descAr: 'أحجار محاكاة ياقوت دم الحمام الملكي بقصات مربعة ومجموعات بافيه متلألئة.',
  },
  {
    id: 'vault-canary',
    name: 'Canary Yellow',
    nameAr: 'الأصفر الكناري',
    image: '/hero/hero-canary-yellow-suite.jpg',
    badge: 'RADIANT GLOW',
    badgeAr: 'توهج ساطع',
    desc: 'Warm cushion-cut fancy yellow stones with electrolytic rhodium shielding.',
    descAr: 'أحجار صفراء بقطع الوسادة الدافئة مع درع حماية بالروديوم الإلكتروليتي.',
  },
];

export function PremiumTrendyAdvertBanners() {
  const { formatPrice, language } = useLuxury();
  const isAr = language === 'ar';
  const [activeVaultLook, setActiveVaultLook] = useState(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const currentLook = VAULT_LOOKS[activeVaultLook] ?? VAULT_LOOKS[0]!;
  const currentLookName = isAr ? currentLook.nameAr : currentLook.name;
  const currentLookBadge = isAr ? currentLook.badgeAr : currentLook.badge;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      
      {/* 1. Large High-Fashion Editorial Billboard (The Sovereign Bridal & Gala Vault) */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-gold/40 shadow-[0_25px_60px_rgba(0,0,0,0.85)] bg-gradient-to-r from-black via-[#0B0E17] to-[#121624] group dark-surface">
        {/* Animated Gold Radial Radiant Auroras */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(212,175,55,0.18)_0%,transparent_70%)] rounded-full blur-[90px] pointer-events-none animate-pulse" />
        <div className="absolute -bottom-10 left-10 w-96 h-96 bg-[radial-gradient(circle,rgba(243,229,171,0.1)_0%,transparent_70%)] rounded-full blur-[90px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* Left Text & Commercial Copy (6 cols) */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 z-10 flex flex-col justify-between">
            <div>
              {/* Trend Tag with Rotating Sparkle */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-bold uppercase tracking-[0.25em] mb-5 backdrop-blur-md shadow-[0_0_15px_rgba(212,175,55,0.25)]">
                <Crown className="w-3.5 h-3.5 text-gold animate-bounce" />
                <span>{isAr ? 'الحملة الرسمية لخريف وشتاء 2026/27' : 'OFFICIAL AUTUMN / WINTER 2026/27 CAMPAIGN'}</span>
              </div>

              {/* Big Fashion Headline */}
              <h2
                style={{ color: '#FFFFFF' }}
                className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.12] mb-4 stay-white"
              >
                {isAr ? (
                  <>خزينة <span className="gold-gradient-text">الأعراس والحفلات الملكية</span> السيادية</>
                ) : (
                  <>The Sovereign <span className="gold-gradient-text">Bridal & Gala</span> Vault</>
                )}
              </h2>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                {isAr
                  ? 'الارتقاء بأناقة المناسبات الخليجية بأطقم أعراس من الفضة الإسترلينية عيار 925 المصنوعة يدوياً، وتشوكرات بالمخالب الإيطالية الدقيقة، وأحجار محاكاة الألماس المعتمدة الفاخرة. متألقة في أرقى مجتمعات دبي، أبوظبي، والرياض.'
                  : 'Elevating Middle Eastern ceremonial fashion with master-crafted 925 sterling silver bridal suites, micro-prong choker necklaces, and certified Premium simulated diamonds. Featured across Dubai, Abu Dhabi, and Riyadh high society.'}
              </p>

              {/* Interactive Look Switcher Tabs */}
              <div className="mb-6 pb-6 border-b border-gold/20">
                <span className="text-[10px] uppercase tracking-widest text-gold font-mono block mb-2.5">
                  {isAr ? 'اختر طقم السهرة الملكي المميز:' : 'Select Featured Sovereign Gala Suite:'}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {VAULT_LOOKS.map((look, idx) => (
                    <button
                      key={look.id}
                      onClick={() => setActiveVaultLook(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 border ${
                        idx === activeVaultLook
                          ? 'bg-gold text-black border-gold font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                          : 'bg-black/60 text-neutral-300 border-white/10 hover:border-gold/40 hover:text-white'
                      }`}
                    >
                      <Gem className="w-3 h-3" />
                      <span>{isAr ? look.nameAr : look.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Perks Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-black/60 border border-gold/25 flex items-center gap-3 shadow-md hover:border-gold/50 transition-colors">
                  <ShieldCheck className="w-5 h-5 text-gold flex-shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {isAr ? 'ختم عيار 925' : '925 Assay'}
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      {isAr ? 'معتمد ومختوم في الإمارات' : 'Certified UAE Hallmarked'}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-black/60 border border-gold/25 flex items-center gap-3 shadow-md hover:border-gold/50 transition-colors">
                  <Truck className="w-5 h-5 text-gold flex-shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {isAr ? 'نفس اليوم بالإمارات' : 'Same-Day UAE'}
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      {isAr ? 'الرياض خلال 24-48 ساعة' : 'Riyadh in 24-48h'}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-black/60 border border-gold/25 flex items-center gap-3 shadow-md hover:border-gold/50 transition-colors">
                  <Gift className="w-5 h-5 text-gold flex-shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {isAr ? 'صندوق مخملي' : 'Velvet Chest'}
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      {isAr ? 'تغليف هدايا ملكي مجاناً' : 'Complimentary Gifting'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs & Discount Copier */}
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-gold/20">
              <a
                href={generateAffiliateUrl({
                  baseUrl: 'https://omniastores.com/collections/luxury-sets',
                  source: 'trendy_billboard_sovereign',
                  medium: 'hero_cta',
                })}
                target="_blank"
                rel="nofollow sponsored"
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-gold via-amber-300 to-[#AA8C2C] text-black font-bold text-xs sm:text-sm uppercase tracking-widest shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] transition-all transform hover:-translate-y-0.5 shimmer-btn flex items-center gap-2"
              >
                <span>{isAr ? 'تسوق الأطقم السيادية على omniastores.com' : 'Shop Sovereign Sets on omniastores.com'}</span>
                <ArrowUpRight className={`w-4 h-4 ${isAr ? 'rotate-[-90deg]' : ''}`} />
              </a>

              {/* VIP Code Copier with Animated Feedback */}
              <button
                onClick={() => handleCopy('OMNIA-VIP15')}
                className="px-4 py-3 rounded-full bg-black/80 border border-gold/50 text-gold hover:text-white text-xs font-mono font-semibold tracking-wider flex items-center gap-2 hover:bg-gold/20 hover:border-gold transition-all shadow-[0_0_12px_rgba(212,175,55,0.2)] active:scale-95"
                title="Click to copy coupon code"
              >
                {copiedCode === 'OMNIA-VIP15' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400 animate-scale-up" />
                    <span className="text-emerald-400 font-bold">
                      {isAr ? 'تم نسخ الكود (خصم 15%)' : 'Code Copied (15% Off)'}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-gold" />
                    <span>{isAr ? 'استخدم الكود:' : 'Use Code:'} <strong className="text-white">OMNIA-VIP15</strong></span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Visual (6 cols) with High-Definition Photoshoot Visual */}
          <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 relative">
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden border-2 border-gold/40 shadow-2xl bg-black group/visual">
              <Image
                key={currentLook.id}
                src={currentLook.image}
                alt={currentLookName}
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover object-center filter brightness-95 transition-all duration-1000 group-hover/visual:scale-105"
                priority
              />

              {/* High-Fashion Golden Radial Sheen */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25 pointer-events-none" />

              {/* Floating Top Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-gold border border-gold/40 text-[10px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-gold" />
                  <span>{currentLookBadge} • {isAr ? 'مجوهرات فاخرة' : 'HIGH JEWELLERY'}</span>
                </span>
              </div>

              {/* Floating Bottom Stamp */}
              <div className="absolute bottom-4 left-4 right-4 z-20 p-3.5 rounded-2xl bg-black/85 backdrop-blur-md border border-gold/40 shadow-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gold uppercase tracking-widest block font-mono font-bold">
                    {currentLookName}
                  </span>
                  <span className="text-xs font-serif text-white">
                    {isAr ? 'مختارات فوغ العربية وهاربرز بازار' : "Vogue Arabia & Harper's Bazaar Selected"}
                  </span>
                </div>

                <a
                  href={generateAffiliateUrl({
                    baseUrl: 'https://omniastores.com/collections/luxury-sets',
                    source: 'trendy_billboard_sovereign_image',
                    medium: currentLook.id,
                  })}
                  target="_blank"
                  rel="nofollow sponsored"
                  className="px-3 py-1 rounded-full bg-gold text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1 hover:bg-amber-300 transition-colors shadow-md"
                >
                  <span>{isAr ? 'استكشف' : 'Explore'}</span>
                  <ArrowUpRight className={`w-3 h-3 ${isAr ? 'rotate-[-90deg]' : ''}`} />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>


      {/* 2. Dual Trendy Split-Screen Banners */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Banner A: The Chokers & Long Chain Layering Edit */}
        <div className="relative rounded-3xl overflow-hidden glass-panel border border-gold/40 bg-[#0E121E] group p-8 sm:p-10 flex flex-col justify-between min-h-[500px] hover:border-gold/70 transition-all dark-surface shadow-xl">
          {/* Visual Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/banners/how-to-wear-statement-sets.jpg"
              alt="Long Chain Edit"
              fill
              unoptimized
              className="object-cover object-center filter brightness-90 transition-transform duration-[6000ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090C14] via-[#090C14]/90 to-[#090C14]/65" />
          </div>

          {/* Card Header & Content */}
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold text-[10px] font-bold uppercase tracking-widest inline-flex items-center gap-1.5 shadow-sm backdrop-blur-md">
                <Gem className="w-3 h-3 text-gold" />
                {isAr ? 'تشكيلة الموسم • تألق الطبقات المتعددة' : 'TRENDING EDIT • LAYERED GLAMOUR'}
              </span>

              <span className="px-3 py-1 rounded-full bg-black/80 border border-gold/30 text-gold text-xs font-bold font-mono">
                {isAr ? `ابتداءً من ${formatPrice(399, 407)}` : `From ${formatPrice(399, 407)}`}
              </span>
            </div>

            <h3
              style={{ color: '#FFFFFF' }}
              className="text-2xl sm:text-3xl font-serif font-bold text-white leading-snug group-hover:text-gold transition-colors stay-white drop-shadow-md"
            >
              {isAr ? 'تشوكرات ملكية وسلاسل بطول 75 سم' : 'Imperial Chokers & 75cm Long Chains'}
            </h3>

            <p className="text-xs sm:text-sm text-neutral-200 max-w-md leading-relaxed">
              {isAr
                ? 'مصممة خصيصاً لتنسدل بفخامة وانسيابية فوق العباءات والياقات الراقية. حلقات فضية عيار 925 مصقولة يدوياً مع سوليتير الألماس بمخالب دقيقة.'
                : 'Designed specifically for modest abaya draping and open-collar evening blazers. Hand-polished 925 silver links with micro-claw diamond solitaires.'}
            </p>

            {/* Rich Feature Checklist */}
            <div className="space-y-1.5 pt-2 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>{isAr ? 'فضة إسترلينية أصلية عيار 925 معتمدة (معايير دبي)' : 'Certified 925 Sterling Silver Assayed (Dubai Standards)'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>{isAr ? 'سلاسل إيطالية بطول 75 سم بتنسيق هندسي متعدد الطبقات' : '75cm Layerable Italian Link Geometric Draping'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>{isAr ? 'مخالب إيطالية دقيقة لترصيع سوليتير الألماس' : 'Italian Micro-Claw Diamond Solitaire Claws'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>{isAr ? 'طلاء روديوم إلكتروليتي مضاد للأكسدة والرطوبة' : 'Anti-Tarnish Rhodium Electrolytic Shielding'}</span>
              </div>
            </div>
          </div>

          {/* Card Footer: Live Pricing, Coupon & CTAs */}
          <div className="relative z-10 pt-5 mt-6 border-t border-gold/25 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => handleCopy('CHOKER15')}
              className="px-3.5 py-1.5 rounded-full bg-black/80 border border-gold/40 text-gold hover:text-white text-xs font-mono font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            >
              {copiedCode === 'CHOKER15' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">
                    {isAr ? 'تم نسخ كود خصم 15%' : '15% Off Copied'}
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-gold" />
                  <span>{isAr ? 'الكود:' : 'Code:'} <strong className="text-white">CHOKER15</strong></span>
                </>
              )}
            </button>

            <div className="flex items-center gap-2">
              <a
                href={generateAffiliateUrl({
                  baseUrl: 'https://omniastores.com/collections/chokers-collection',
                  source: 'split_banner_choker',
                  medium: 'direct_cta',
                })}
                target="_blank"
                rel="nofollow sponsored"
                className="px-4 py-2.5 rounded-full bg-gradient-to-r from-gold to-[#AA8C2C] text-black text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow transition-all shimmer-btn"
              >
                {isAr ? 'تسوق التشوكرات' : 'Shop Chokers'}
              </a>
              <a
                href={generateAffiliateUrl({
                  baseUrl: 'https://omniastores.com/collections/long-chain-sets',
                  source: 'split_banner_longchain',
                  medium: 'secondary_cta',
                })}
                target="_blank"
                rel="nofollow sponsored"
                className="px-4 py-2.5 rounded-full border border-gold/40 text-gold hover:bg-gold/15 text-xs font-bold uppercase tracking-wider transition-all"
              >
                {isAr ? 'السلاسل الطويلة' : 'Long Chains'}
              </a>
            </div>
          </div>
        </div>

        {/* Banner B: The Arabian Gulf Pearl & Tennis Edit */}
        <div className="relative rounded-3xl overflow-hidden glass-panel border border-gold/40 bg-[#0E121E] group p-8 sm:p-10 flex flex-col justify-between min-h-[500px] hover:border-gold/70 transition-all dark-surface shadow-xl">
          {/* Visual Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero/hero-pearl-revival.jpg"
              alt="The Pearl Edit"
              fill
              unoptimized
              className="object-cover object-center filter brightness-90 transition-transform duration-[6000ms] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090C14] via-[#090C14]/90 to-[#090C14]/65" />
          </div>

          {/* Card Header & Content */}
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold uppercase tracking-widest inline-flex items-center gap-1.5 shadow-sm backdrop-blur-md">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                {isAr ? 'إرث عريق • بريق اللؤلؤ الاستثنائي' : 'TIMELESS HEIRLOOM • HIGH LUSTER'}
              </span>

              <span className="px-3 py-1 rounded-full bg-black/80 border border-gold/30 text-gold text-xs font-bold font-mono">
                {isAr ? `ابتداءً من ${formatPrice(480, 489)}` : `From ${formatPrice(480, 489)}`}
              </span>
            </div>

            <h3
              style={{ color: '#FFFFFF' }}
              className="text-2xl sm:text-3xl font-serif font-bold text-white leading-snug group-hover:text-gold transition-colors stay-white drop-shadow-md"
            >
              {isAr ? 'لؤلؤ براق وأساور التنس الكلاسيكية' : 'Lustrous Pearls & Tennis Bracelets'}
            </h3>

            <p className="text-xs sm:text-sm text-neutral-200 max-w-md leading-relaxed">
              {isAr
                ? 'الجمع بين إرث اللؤلؤ البحري لساحل الخليج مع خطوط التنس العصرية بقفل الأمان المزدوج. لؤلؤ مياه عذبة مختار بعناية لبريقه وقوس قزحه المذهل.'
                : 'Bridging Trucial maritime pearl heritage with contemporary double-safety latch eternity lines. Certified freshwater pearls graded for exceptional surface iridescence.'}
            </p>

            {/* Rich Feature Checklist */}
            <div className="space-y-1.5 pt-2 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>{isAr ? 'لؤلؤ باروك مياه عذبة مختار يدوياً فائق البريق' : 'Selected High-Luster Freshwater Baroque Pearls'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>{isAr ? 'أساور تنس بحلقات متصلة وقفل أمان صندوقي مزدوج' : 'Double-Safety Box Clasp Eternity Tennis Lines'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>{isAr ? 'ثلاث طبقات من طلاء الروديوم المقاوم للتآكل' : 'Triple-Layer Anti-Corrosion Rhodium Shield'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold shrink-0" />
                <span>{isAr ? 'صندوق مخملي فاخر لحفظ المجوهرات مشمول مجاناً' : 'Complimentary Velvet Presentation Vault Included'}</span>
              </div>
            </div>
          </div>

          {/* Card Footer: Live Pricing, Coupon & CTAs */}
          <div className="relative z-10 pt-5 mt-6 border-t border-gold/25 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => handleCopy('PEARL15')}
              className="px-3.5 py-1.5 rounded-full bg-black/80 border border-gold/40 text-gold hover:text-white text-xs font-mono font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            >
              {copiedCode === 'PEARL15' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">
                    {isAr ? 'تم نسخ كود خصم 15%' : '15% Off Copied'}
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-gold" />
                  <span>{isAr ? 'الكود:' : 'Code:'} <strong className="text-white">PEARL15</strong></span>
                </>
              )}
            </button>

            <div className="flex items-center gap-2">
              <a
                href={generateAffiliateUrl({
                  baseUrl: 'https://omniastores.com/collections/pearl-sets',
                  source: 'split_banner_pearl',
                  medium: 'direct_cta',
                })}
                target="_blank"
                rel="nofollow sponsored"
                className="px-4 py-2.5 rounded-full bg-gradient-to-r from-gold to-[#AA8C2C] text-black text-xs font-bold uppercase tracking-wider hover:opacity-95 shadow transition-all shimmer-btn"
              >
                {isAr ? 'تسوق اللؤلؤ' : 'Shop Pearls'}
              </a>
              <a
                href={generateAffiliateUrl({
                  baseUrl: 'https://omniastores.com/collections/tennis-bracelet',
                  source: 'split_banner_tennis',
                  medium: 'secondary_cta',
                })}
                target="_blank"
                rel="nofollow sponsored"
                className="px-4 py-2.5 rounded-full border border-gold/40 text-gold hover:bg-gold/15 text-xs font-bold uppercase tracking-wider transition-all"
              >
                {isAr ? 'أساور التنس' : 'Tennis Lines'}
              </a>
            </div>
          </div>
        </div>

      </div>


      {/* 3. Sleek Trendy Commercial White-Glove Dispatch Banner with Live Flight Radar */}
      <div className="rounded-3xl p-6 sm:p-8 glass-panel border border-gold/40 bg-gradient-to-r from-[#0C101A] via-black to-[#0C101A] flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group dark-surface">
        {/* Animated Flight Path Line */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
        
        <div className="flex items-center gap-5 z-10">
          <div className="w-14 h-14 rounded-2xl bg-gold/15 border border-gold/40 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            <Plane className="w-7 h-7 text-gold transform -rotate-45 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <h4
                style={{ color: '#FFFFFF' }}
                className="text-base sm:text-lg font-serif font-bold text-white stay-white"
              >
                {isAr
                  ? 'شحن جوي وتوصيل فاخر بالقفاز الأبيض: دبي ✈ الرياض خلال 24 ساعة'
                  : 'Direct White-Glove Courier: Dubai (DXB) ✈ Riyadh (RUH) in 24 Hours'}
              </h4>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
            </div>
            <p className="text-xs text-neutral-300 max-w-2xl leading-relaxed">
              {isAr
                ? 'توصيل فاخر حتى باب المنزل في الإمارات، السعودية، قطر، الكويت، البحرين وعُمان. شحن مؤمن بالكامل 100% مع أختام فحص مسلسلة وتخليص جمركي مسبق.'
                : 'White-glove doorstep dispatch for UAE, KSA, Qatar, Kuwait, Bahrain & Oman. 100% insured transit with serialized assay tamper seals and priority customs pre-clearance.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 z-10 shrink-0">
          <a
            href={generateAffiliateUrl({
              baseUrl: 'https://omniastores.com',
              source: 'footer_courier_banner',
              medium: 'direct_flagship',
            })}
            target="_blank"
            rel="nofollow sponsored"
            className="px-7 py-3 rounded-full bg-gradient-to-r from-gold via-amber-300 to-[#AA8C2C] text-black text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap shadow-[0_0_20px_rgba(212,175,55,0.35)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] flex items-center gap-2 shimmer-btn"
          >
            <span>{isAr ? 'اطلب الآن على omniastores.com' : 'Order on omniastores.com'}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

    </section>
  );
}