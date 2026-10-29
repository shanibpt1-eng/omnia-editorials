'use client';

import React, { useState } from 'react';
import { Plane, ArrowUpRight } from 'lucide-react';
import { generateAffiliateUrl } from '../lib/affiliateEngine';
import { useLuxury } from './ThemeProvider';

interface CityTransit {
  id: string;
  city: string;
  cityAr: string;
  country: string;
  countryAr: string;
  flag: string;
  airport: string;
  timeframe: string;
  timeframeAr: string;
  status: string;
  statusAr: string;
  details: string;
  detailsAr: string;
  hub: string;
  hubAr: string;
}

const GCC_CITIES: CityTransit[] = [
  {
    id: 'city-dubai',
    city: 'Dubai',
    cityAr: 'دبي',
    country: 'United Arab Emirates',
    countryAr: 'الإمارات العربية المتحدة',
    flag: '🇦🇪',
    airport: 'DXB',
    timeframe: 'Same-Day (3 Hours)',
    timeframeAr: 'نفس اليوم (خلال 3 ساعات)',
    status: 'ACTIVE • EXPRESS DISPATCH',
    statusAr: 'نشط • شحن سريع',
    details: 'Doorstep white-glove courier from Dubai Industrial Hub with velvet presentation case.',
    detailsAr: 'توصيل فاخر بالقفاز الأبيض حتى باب المنزل من مركز دبي الرئيسي مع صندوق مخملي فاخر.',
    hub: 'Dubai Flagship Hub',
    hubAr: 'مركز دبي الرئيسي',
  },
  {
    id: 'city-abu-dhabi',
    city: 'Abu Dhabi',
    cityAr: 'أبوظبي',
    country: 'United Arab Emirates',
    countryAr: 'الإمارات العربية المتحدة',
    flag: '🇦🇪',
    airport: 'AUH',
    timeframe: 'Same-Day (Evening)',
    timeframeAr: 'نفس اليوم (مساءً)',
    status: 'ACTIVE • DAILY ROUTE',
    statusAr: 'نشط • خط يومي مباشر',
    details: 'Daily courier shuttle across Saadiyat, Al Reem & Corniche residences.',
    detailsAr: 'رحلات شحن يومية تغطي جزيرة السعديات، جزيرة الريم، والكورنيش.',
    hub: 'Dubai Flagship Hub',
    hubAr: 'مركز دبي الرئيسي',
  },
  {
    id: 'city-riyadh',
    city: 'Riyadh',
    cityAr: 'الرياض',
    country: 'Saudi Arabia',
    countryAr: 'المملكة العربية السعودية',
    flag: '🇸🇦',
    airport: 'RUH',
    timeframe: '24 Hours Priority',
    timeframeAr: 'أولوية خلال 24 ساعة',
    status: 'ACTIVE • PRE-CLEARED',
    statusAr: 'نشط • تخليص جمركي مسبق',
    details: 'Pre-cleared customs transit with native SAR settlement and zero import duty.',
    detailsAr: 'شحن بتخليص جمركي مسبق مع تسوية بالريال السعودي وبدون أي رسوم استيراد إضافية.',
    hub: 'Riyadh Logistics Gateway',
    hubAr: 'بوابة الرياض اللوجستية',
  },
  {
    id: 'city-jeddah',
    city: 'Jeddah',
    cityAr: 'جدة',
    country: 'Saudi Arabia',
    countryAr: 'المملكة العربية السعودية',
    flag: '🇸🇦',
    airport: 'JED',
    timeframe: '24–48 Hours',
    timeframeAr: 'خلال 24-48 ساعة',
    status: 'ACTIVE • AIR TRANSIT',
    statusAr: 'نشط • شحن جوي',
    details: 'Direct air dispatch to Western Province with serialized tamper-proof seal.',
    detailsAr: 'شحن جوي مباشر للمنطقة الغربية بأختام أمان مسلسلة ضد الفتح أو العبث.',
    hub: 'Riyadh Logistics Gateway',
    hubAr: 'بوابة الرياض اللوجستية',
  },
  {
    id: 'city-doha',
    city: 'Doha',
    cityAr: 'الدوحة',
    country: 'Qatar',
    countryAr: 'دولة قطر',
    flag: '🇶🇦',
    airport: 'DOH',
    timeframe: '48 Hours Express',
    timeframeAr: 'شحن سريع خلال 48 ساعة',
    status: 'ACTIVE • PRIORITY AIR',
    statusAr: 'نشط • أولوية جوية',
    details: 'Express courier delivery across The Pearl, West Bay, and Lusail.',
    detailsAr: 'توصيل سريع يغطي جزيرة اللؤلؤة، الخليج الغربي، ومدينة لوسيل.',
    hub: 'Gulf Air Express Hub',
    hubAr: 'مركز الشحن الجوي الخليجي',
  },
  {
    id: 'city-kuwait',
    city: 'Kuwait City',
    cityAr: 'مدينة الكويت',
    country: 'Kuwait',
    countryAr: 'دولة الكويت',
    flag: '🇰🇼',
    airport: 'KWI',
    timeframe: '48 Hours Express',
    timeframeAr: 'شحن سريع خلال 48 ساعة',
    status: 'ACTIVE • INSURED TRANSIT',
    statusAr: 'نشط • شحن مؤمن بالكامل',
    details: 'Full insured air courier with complimentary bespoke gifting presentation.',
    detailsAr: 'شحن جوي مؤمن بالكامل مع تغليف هدايا ملكي فاخر مجاناً.',
    hub: 'Gulf Air Express Hub',
    hubAr: 'مركز الشحن الجوي الخليجي',
  },
];

export function GccCityConciergeRibbon() {
  const { t, language } = useLuxury();
  const [selectedCity, setSelectedCity] = useState(0);
  const current = GCC_CITIES[selectedCity] || GCC_CITIES[0];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-gold/30 bg-gradient-to-r from-[#070A10] via-black to-[#070A10] p-6 sm:p-10 shadow-2xl dark-surface">
        
        {/* Subtle Ambient Beam */}
        <div className="absolute top-0 left-0 right-0 h-[2px] animate-shimmer-flow opacity-70" />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-gold/20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest mb-2">
              <Plane className="w-3.5 h-3.5 text-gold animate-pulse" />
              <span>{language === 'ar' ? 'الممر اللوجستي السريع لدول الخليج العربي' : 'GCC CROSS-BORDER WHITE-GLOVE LOGISTICS CORRIDOR'}</span>
            </div>
            <h3
              style={{ color: '#FFFFFF' }}
              className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight stay-white"
            >
              {t.conciergeTitle}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-xl">
              {t.conciergeSubtitle}
            </p>
          </div>

          <a
            href={generateAffiliateUrl({
              baseUrl: 'https://omniastores.com/policies/shipping-policy',
              source: 'gcc_concierge_ribbon',
              medium: 'shipping_policy_cta',
            })}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-wider text-gold hover:text-white font-semibold flex items-center gap-1 transition-colors self-start md:self-auto"
          >
            <span>{language === 'ar' ? 'سياسة الشحن الموثقة' : 'Verified GCC Transit Policy'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Interactive Cities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {GCC_CITIES.map((c, idx) => {
            const isSelected = idx === selectedCity;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCity(idx)}
                className={`p-3.5 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gold/20 border-gold shadow-[0_0_15px_rgba(212,175,55,0.35)] scale-[1.02]'
                    : 'bg-black/40 border-white/10 hover:border-gold/40 text-neutral-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-lg">{c.flag}</span>
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-gold text-black' : 'bg-white/10 text-neutral-300'
                  }`}>
                    {c.airport}
                  </span>
                </div>
                <div>
                  <span className={`text-xs font-bold block ${isSelected ? 'text-white' : 'text-neutral-300'}`}>
                    {language === 'ar' ? c.cityAr : c.city}
                  </span>
                  <span className="text-[10px] font-mono text-gold block mt-0.5">
                    {language === 'ar' ? c.timeframeAr : c.timeframe}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected City Detail Card */}
        {current && (
          <div className="p-5 sm:p-6 rounded-2xl bg-black/70 border border-gold/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center text-xl shrink-0">
                {current.flag}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-serif font-bold text-white">
                    {language === 'ar' ? `${current.cityAr}، ${current.countryAr}` : `${current.city}, ${current.country}`}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">
                    {language === 'ar' ? current.statusAr : current.status}
                  </span>
                </div>
                <p className="text-xs text-neutral-300 mt-1 max-w-xl">
                  {language === 'ar' ? current.detailsAr : current.details} {language === 'ar' ? 'يتم الشحن مباشرة من' : 'Dispatched from'} <strong>{language === 'ar' ? current.hubAr : current.hub}</strong>.
                </p>
              </div>
            </div>

            <a
              href={generateAffiliateUrl({
                baseUrl: 'https://omniastores.com',
                source: 'city_ribbon_selected',
                medium: current.city.toLowerCase(),
              })}
              target="_blank"
              rel="nofollow sponsored"
              className="px-5 py-2.5 rounded-full bg-gold text-black text-xs font-bold uppercase tracking-wider hover:bg-amber-300 transition-colors shrink-0 flex items-center gap-1.5 shadow-md self-start sm:self-auto"
            >
              <span>{language === 'ar' ? `طلب فوري إلى ${current.cityAr}` : `Order to ${current.city}`}</span>
              <ArrowUpRight className={`w-3.5 h-3.5 ${language === 'ar' ? 'rotate-[-90deg]' : ''}`} />
            </a>
          </div>
        )}

      </div>
    </section>
  );
}
