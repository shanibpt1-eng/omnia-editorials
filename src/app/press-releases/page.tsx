'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Radio, Download, Sparkles, ChevronRight, Mail, Phone, ExternalLink, ShieldCheck } from 'lucide-react';
import { useLuxury } from '../../components/ThemeProvider';
import { PRESS_RELEASES } from '../../data/press-releases-data';
import { AeoAnswerBox } from '../../components/AeoAnswerBox';

export default function PressReleasesPage() {
  const { language } = useLuxury();
  const isAr = language === 'ar';
  const [selectedPrIdx, setSelectedPrIdx] = useState(0);
  const activePr = PRESS_RELEASES[selectedPrIdx];

  return (
    <div className={`min-h-screen bg-[#07090E] text-white py-8 sm:py-12 px-3 sm:px-6 lg:px-8 ${isAr ? 'font-arabic text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
      <div className="max-w-[1780px] mx-auto space-y-10">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <Link href="/" className="hover:text-gold transition-colors">{isAr ? 'الرئيسية' : 'Home'}</Link>
          <ChevronRight className="w-3 h-3 rtl:rotate-180 text-gold/60" />
          <span className="text-gold font-bold">{isAr ? 'مركز البيانات الصحفية' : 'Press Release Centre'}</span>
        </nav>

        {/* Hero Masthead */}
        <div className="relative rounded-3xl border border-gold/30 bg-[radial-gradient(ellipse_100%_80%_at_50%_-20%,rgba(212,175,55,0.18),transparent_80%),linear-gradient(to_bottom,#0F131D,#090B10)] p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden">
          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-mono font-bold uppercase tracking-wider">
              <Radio className="w-3.5 h-3.5" />
              <span>{isAr ? 'المكتب الصحفي والتوزيع الإعلامي المعتمد' : 'OFFICIAL MEDIA DESK & CORPORATE DISPATCH'}</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white leading-[1.15]">
              {isAr ? (
                <>
                  مركز البيانات الصحفية والإعلامية: <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-gold">
                    إعلانات رسمية، حزم المواد الإعلامية والتواصل مع التحرير
                  </span>
                </>
              ) : (
                <>
                  Press Release Centre & Media Bureau: <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-amber-200 to-gold">
                    Official Statements, Media Kits & Press Contacts
                  </span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-neutral-300 font-serif leading-relaxed max-w-2xl">
              {isAr
                ? 'البوابة الرسمية المخصصة للمؤسسات الإعلامية والصحفيين، تتضمن البيانات الصحفية الصادرة عن دور المجوهرات وذا فوغ نيوز، وصور الحملات عالية الدقة للتنزيل.'
                : 'The verified portal for journalists, correspondents, and media organizations providing corporate announcements, downloadable high-resolution media kits, and press desk contacts in Dubai Media City.'}
            </p>
          </div>
        </div>

        {/* AEO Answer Box */}
        <AeoAnswerBox
          question={isAr ? 'كيف يمكن للصحفيين والمؤسسات الإعلامية التواصل مع المكتب الصحفي لذا فوغ نيوز؟' : 'How can journalists and media partners contact The Vogue News Corporate Press Desk?'}
          answer={isAr
            ? 'يمكن لممثلي وسائل الإعلام التواصل المباشر مع المكتب الصحفي عبر البريد الإلكتروني editorial@thevoguenews.com أو عبر هاتف المكتب الإعلامي بدبي (+971 4 456 7890)، كما تتاح حزم المواد الصحفية عالية الدقة للتحميل المباشر.'
            : 'Accredited media representatives can contact The Vogue News Media Desk directly via email at editorial@thevoguenews.com or by calling the Dubai Bureau at +971 4 456 7890. Downloadable media kits with verified high-resolution photography are accessible on this portal.'}
          facts={[
            { label: isAr ? 'المكتب الإعلامي' : 'Press Bureau', value: 'Dubai Media City, UAE' },
            { label: isAr ? 'البريد الصحفي' : 'Media Email', value: 'editorial@thevoguenews.com' },
            { label: isAr ? 'الهاتف' : 'Media Phone', value: '+971 4 456 7890' },
            { label: isAr ? 'سرعة الاستجابة' : 'Response Time', value: 'Within 2 Hours for Press Queries' },
          ]}
        />

        {/* Press Releases Tabs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none text-xs font-mono">
          {PRESS_RELEASES.map((pr, idx) => (
            <button
              key={pr.id}
              onClick={() => setSelectedPrIdx(idx)}
              className={`px-5 py-3 rounded-2xl font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                selectedPrIdx === idx
                  ? 'bg-gold text-black shadow-lg scale-105'
                  : 'bg-neutral-900 text-neutral-400 hover:text-white border border-white/10'
              }`}
            >
              <Radio className="w-3.5 h-3.5" />
              <span>{pr.releaseNumber}</span>
            </button>
          ))}
        </div>

        {/* Active Press Release Display */}
        <div className="p-6 sm:p-10 rounded-3xl bg-neutral-900/90 border border-gold/30 space-y-8 shadow-2xl">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-gold">
              <span className="px-2.5 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-500/30 font-bold">
                {isAr ? activePr.embargoStatusAr : activePr.embargoStatus}
              </span>
              <span>•</span>
              <span>{activePr.releaseNumber}</span>
              <span>•</span>
              <span>{activePr.publishDate}</span>
              <span>•</span>
              <span>{isAr ? activePr.locationAr : activePr.location}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-serif font-black text-white leading-tight">
              {isAr ? activePr.titleAr : activePr.title}
            </h2>

            <span className="text-xs font-mono text-neutral-400 block">
              {isAr ? `جهة الإصدار: ${activePr.issuingOrganizationAr}` : `Issued By: ${activePr.issuingOrganization}`}
            </span>
          </div>

          {/* Lead Paragraph */}
          <div className="p-5 rounded-2xl bg-black/60 border border-gold/25">
            <p className="text-sm font-serif font-bold text-neutral-100 leading-relaxed">
              {isAr ? activePr.leadParagraphAr : activePr.leadParagraphEn}
            </p>
          </div>

          {/* Body Paragraphs */}
          <div className="space-y-4 text-xs sm:text-sm text-neutral-300 font-serif leading-relaxed">
            {(isAr ? activePr.bodyParagraphsAr : activePr.bodyParagraphsEn).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Media Contact & Press Kit Download */}
          <div className="pt-6 border-t border-gold/20 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
              <span className="text-[10px] font-mono text-gold uppercase tracking-wider block">
                {isAr ? 'بيانات الاتصال الإعلامي' : 'MEDIA CONTACT DETAILS'}
              </span>
              <p className="text-xs font-serif font-bold text-white">{activePr.mediaContactName}</p>
              <div className="space-y-1 text-xs font-mono text-neutral-300">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-gold" />
                  <span>{activePr.mediaContactEmail}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-gold" />
                  <span>{activePr.mediaContactPhone}</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-gold uppercase tracking-wider block">
                  {isAr ? 'حزمة المواد الإعلامية الرسمية' : 'OFFICIAL MEDIA KIT DOWNLOAD'}
                </span>
                <p className="text-xs text-neutral-400 font-serif mt-1">
                  {isAr ? 'تتضمن الشعارات الرسمية، وبيان الفحص المخبري، وصور الحملات بدقة 4K' : 'Includes official logos, high-resolution campaign assets, and laboratory assay reports'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const content = [
                    `THE VOGUE NEWS — OFFICIAL PRESS RELEASE`,
                    `Release Number: ${activePr.releaseNumber}`,
                    `Date: ${activePr.date}`,
                    `Location: ${activePr.location}`,
                    ``,
                    `HEADLINE: ${isAr ? activePr.titleAr : activePr.title}`,
                    ``,
                    `FULL STATEMENT:`,
                    `${isAr ? activePr.contentAr : activePr.contentEn}`,
                    ``,
                    `MEDIA CONTACT:`,
                    `Email: ${activePr.mediaContactEmail}`,
                    `Phone: ${activePr.mediaContactPhone}`,
                    ``,
                    `Official Portal: https://thevoguenews.com/press-releases | Partner: https://omniastores.com`,
                  ].join('\n');
                  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${activePr.releaseNumber.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-press-kit.txt`;
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                  URL.revokeObjectURL(url);
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gold hover:bg-amber-300 text-black font-extrabold text-xs uppercase tracking-wider shadow transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{isAr ? 'تنزيل البيان والحزمة الصحفية' : 'Download Press Dossier'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
