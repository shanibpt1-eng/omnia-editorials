'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowLeft, 
  Send, 
  Globe, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useLuxury } from '../../components/ThemeProvider';
import { SeoHead } from '../../components/SeoHead';

export default function ContactPage() {
  const { language } = useLuxury();
  const isAr = language === 'ar';

  const BUREAUS = [
    {
      city: 'Dubai (Headquarters)',
      cityAr: 'دبي (المقر الرئيسي)',
      address: 'DIFC Gate Precinct 4, Level 5, Dubai, United Arab Emirates',
      addressAr: 'مركز دبي المالي العالمي، البوابة 4، الطابق 5، دبي، الإمارات',
      phone: '+971 4 362 7000',
      email: 'dubai@thevoguenews.com',
      desk: 'GCC Central Newsroom & Assay Bureau',
      deskAr: 'غرفة الأخبار المركزية ومكتب الفحص المخبري',
    },
    {
      city: 'Riyadh Bureau',
      cityAr: 'مكتب الرياض',
      address: 'King Abdullah Financial District (KAFD), Tower 3, Riyadh, KSA',
      addressAr: 'مركز الملك عبد الله المالي (كافد)، البرج 3، الرياض، المملكة العربية السعودية',
      phone: '+966 11 200 8800',
      email: 'riyadh@thevoguenews.com',
      desk: 'Saudi Luxury Commerce & Sovereign Galas Desk',
      deskAr: 'مكتب التجارة الفاخرة والمناسبات الملكية السعودية',
    },
    {
      city: 'Abu Dhabi Bureau',
      cityAr: 'مكتب أبوظبي',
      address: 'Al Maryah Island Financial Free Zone, Abu Dhabi, UAE',
      addressAr: 'جزيرة المارية، المنطقة المالية الحرة، أبوظبي، الإمارات',
      phone: '+971 2 418 9000',
      email: 'abudhabi@thevoguenews.com',
      desk: 'State Heritage & Royal Protocol Desk',
      deskAr: 'مكتب التراث الوطني والمراسم الملكية',
    },
    {
      city: 'Doha & Kuwait Bureau',
      cityAr: 'مكتب الدوحة والكويت',
      address: 'West Bay Diplomatic Quarter, Doha / Al Hamra Tower, Kuwait',
      addressAr: 'الخليج الغربي، الحي الدبلوماسي، الدوحة / برج الحمراء، الكويت',
      phone: '+974 4499 5000',
      email: 'gulf@thevoguenews.com',
      desk: 'Arabian Gulf High Jewellery Wire',
      deskAr: 'سلك المجوهرات الراقية بالخليج العربي',
    },
  ];

  return (
    <>
      <SeoHead pageType="about" />

      <main className="min-h-screen bg-neutral-50 dark:bg-[#07090E] text-neutral-900 dark:text-neutral-100 transition-colors py-12 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#8B6508] dark:text-gold uppercase tracking-wider hover:underline"
            >
              <ArrowLeft className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
              <span>{isAr ? 'العودة للرئيسية' : 'Back to The Vogue News'}</span>
            </Link>
          </div>

          <header className="space-y-4 border-b border-neutral-300 dark:border-neutral-800 pb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/40 text-[10px] font-mono font-bold text-[#8B6508] dark:text-gold uppercase tracking-widest">
              <Globe className="w-3.5 h-3.5 text-gold" />
              <span>{isAr ? 'غرف الأخبار الإقليمية' : 'REGIONAL GCC BUREAUS'}</span>
            </div>

            <h1 className="font-serif font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
              {isAr ? 'تواصل مع هيئة تحرير «ذا فوغ نيوز»' : 'Contact The Vogue News Editorial Bureau'}
            </h1>

            <p className="font-serif text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">
              {isAr
                ? 'مكاتب التحرير المركزية ومراسلو المجوهرات الراقية في دبي والرياض وأبوظبي والدوحة والكويت. للتواصل الصحفي، إرسال البيانات الصحفية، أو طلبات فحص المعايير.'
                : 'Direct access to our editorial newsrooms, accredited jewellery curators, and standards auditors across Dubai, Riyadh, Abu Dhabi, Doha, and Kuwait.'}
            </p>
          </header>

          {/* Bureau Cards Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BUREAUS.map((bureau, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-[#0E121B] border border-neutral-200 dark:border-neutral-800 space-y-4 shadow-sm hover:border-gold/50 transition-all"
              >
                <div className="space-y-1">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8B6508] dark:text-gold">
                    {isAr ? bureau.deskAr : bureau.desk}
                  </div>
                  <h3 className="font-serif font-bold text-lg text-neutral-950 dark:text-white">
                    {isAr ? bureau.cityAr : bureau.city}
                  </h3>
                </div>

                <div className="space-y-2 text-xs font-serif text-neutral-600 dark:text-neutral-400">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                    <span>{isAr ? bureau.addressAr : bureau.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span className="font-mono">{bureau.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-gold shrink-0" />
                    <a href={`mailto:${bureau.email}`} className="text-gold font-mono hover:underline">
                      {bureau.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Press Inquiries & Editorial Submission Box */}
          <section className="p-8 rounded-2xl bg-neutral-900 text-white space-y-4 shadow-xl border border-gold/40">
            <div className="flex items-center gap-2 text-gold font-mono text-xs uppercase tracking-wider">
              <Send className="w-4 h-4" />
              <span>{isAr ? 'إرسال البيانات الصحفية والدراسات' : 'PRESS RELEASES & EDITORIAL SUBMISSIONS'}</span>
            </div>
            <h2 className="font-serif font-black text-xl sm:text-2xl">
              {isAr ? 'هل لديك دراسة أو تقرير فحص مخبري تود نشره؟' : 'Pitch a Story or Submit Lab Verification Findings'}
            </h2>
            <p className="font-serif text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl">
              {isAr
                ? 'ترحب هيئة التحرير بمساهمات الباحثين في علم الأحجار الكريمة، وتقارير مختبرات المعادن الثمينة، والبيانات الصحفية الحصرية من دور المجوهرات الفاخرة.'
                : 'Our editorial board evaluates original gemological research, metallurgic assay reports, and sovereign wedding collection briefs. Contact our desk at press@thevoguenews.com.'}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="mailto:press@thevoguenews.com"
                className="px-5 py-2.5 rounded-xl bg-gold text-black font-extrabold text-xs uppercase tracking-wider hover:bg-gold-light transition-all"
              >
                press@thevoguenews.com
              </a>
              <Link
                href="/editorial-policy"
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                {isAr ? 'مراجعة المعايير التحريرية' : 'Review Editorial Standards'}
              </Link>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
