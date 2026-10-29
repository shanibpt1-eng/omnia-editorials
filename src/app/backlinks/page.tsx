'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/context';
import { Link2, Mail, ExternalLink, ShieldCheck, Copy, Check, Sparkles, Newspaper, Send } from 'lucide-react';

export default function BacklinksPage() {
  const { backlinks } = useStore();
  const [activePitchModal, setActivePitchModal] = useState<any | null>(null);
  const [copiedPitch, setCopiedPitch] = useState(false);

  const gccPressOutreach = [
    {
      id: 'gn-1',
      publisherName: 'Gulf News Editorial Desk',
      domain: 'gulfnews.com',
      authorityScore: 89,
      contactName: 'Features & Lifestyle Editor',
      contactEmail: 'features@gulfnews.com',
      targetCategory: 'BRIDAL_EDITORIAL',
      country: 'AE',
      status: 'FEATURED_OCT_2026',
      targetUrl: 'https://omniastores.com/blogs/news/omnia-stores-luxury-sterling-silver-bridal-sets-from-dubai',
      pitchSubject: 'Follow-Up / Bridal Feature: Inside Omnia Stores (Featured on Page 7)',
      pitchBody: `Dear Gulf News Lifestyle Desk,\n\nFollowing our full-page feature in the Tuesday, October 20, 2026 edition of Gulf News ("Luxury Sterling Silver Bridal Sets from Dubai"), we would love to share high-resolution imagery and founder quotes from Omnia Fouad for your upcoming GCC Wedding Season Gift Guide.\n\nOur signature 925 sterling silver bridal sets (such as the Sudheena 5 Carat Ring and Al Malika Luxury Suite) offer certified accessible luxury with 24-hour delivery across UAE.\n\nRead the full feature overview: https://omniastores.com/blogs/news/omnia-stores-luxury-sterling-silver-bridal-sets-from-dubai\n\nBest regards,\nShanib Salam | Omnia Stores PR Desk\nWhatsApp: +971 56 547 8227`,
    },
    {
      id: 'kt-1',
      publisherName: 'Khaleej Times Lifestyle',
      domain: 'khaleejtimes.com',
      authorityScore: 86,
      contactName: 'Fashion & Style Desk',
      contactEmail: 'style@khaleejtimes.com',
      targetCategory: 'FASHION_STYLE',
      country: 'AE',
      status: 'QUALIFIED',
      targetUrl: 'https://omniastores.com/collections/bridal-collection',
      pitchSubject: 'Editorial Pitch: Why Dubai Brides are Turning to 925 Sterling Silver over Gold',
      pitchBody: `Dear Khaleej Times Style Team,\n\nWith gold prices at record highs across the UAE, a major bridal trend is unfolding in Dubai: brides are opting for rhodium-plated 925 sterling silver with certified simulated diamonds that mirror the brilliance of fine white gold at a fraction of the cost.\n\nOmnia Stores founder Omnia Fouad can provide commentary on this consumer shift across the UAE and Saudi Arabia.\n\nCollection Preview: https://omniastores.com/collections/bridal-collection\n\nWarm regards,\nOmnia Stores Editorial Team`,
    },
    {
      id: 'aw-1',
      publisherName: 'Arabia Weddings',
      domain: 'arabiaweddings.com',
      authorityScore: 74,
      contactName: 'Nour Al-Sayed (Editorial Director)',
      contactEmail: 'editor@arabiaweddings.com',
      targetCategory: 'BRIDAL_PORTAL',
      country: 'GCC',
      status: 'OUTREACH_DRAFTED',
      targetUrl: 'https://omniastores.ae/collections/bridal-sets-ae',
      pitchSubject: 'Exclusive Bridal Guide: Top 925 Sterling Silver Wedding Sets for Arab Brides',
      pitchBody: `Dear Nour,\n\nWe would love to submit an exclusive bridal guide for Arabia Weddings readers: "The 2026 Arab Bride's Guide to Choosing Rhodium-Plated Sterling Silver Suites".\n\nWe can provide styled photography of our Al Malika Luxury Set and 5 Carat certified rings, complete with special discount codes for Arabia Weddings readers.\n\nExplore our UAE collection: https://omniastores.ae/collections/bridal-sets-ae\n\nBest,\nOmnia Luxury Atelier`,
    },
    {
      id: 'say-1',
      publisherName: 'Sayidaty Magazine (مجلة سيدتي)',
      domain: 'sayidaty.net',
      authorityScore: 84,
      contactName: 'مكتب تحرير الأناقة والعروس',
      contactEmail: 'fashion@sayidaty.net',
      targetCategory: 'ARABIC_WOMEN_LUXURY',
      country: 'SA/AE',
      status: 'QUALIFIED',
      targetUrl: 'https://omniastores.ae/blogs/news/zahrat-al-khaleej-asrar-itlalat-al-arous-fedda-925',
      pitchSubject: 'ملف خاص لعروس سيدتي: تشكيلة مجوهرات الفضة الإسترليني عيار 925 لعرائس الخليج',
      pitchBody: `الأفاضل في مجلة سيدتي الموقرة،\n\nيسر متجر أمنية ستورز دبي (الذي أسسته رائدة الأعمال الإماراتية أمنية فؤاد عام 2018) أن يقدم لقارئات مجلة سيدتي ملفاً حصرياً وصوراً فائقة الدقة لأحدث أطقم الزفاف المصنوعة من الفضة الإسترليني 925 الخالصة والمطلية بالروديوم مع شهادات الفحص المعتمدة.\n\nرابط التغطية والكتالوج: https://omniastores.ae/collections/bridal-sets-ae\n\nمع فائق الاحترام والتقدير،\nفريق أمنية ستورز للمجوهرات الراقية`,
    },
  ];

  const copyPitchText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-serif font-bold text-luxury-ivory">Backlink Prospecting & Newspaper Outreach CRM</h1>
        <p className="text-xs text-luxury-muted mt-1">
          High-authority GCC media publishers, bridal portals, and magazine desks with pre-drafted pitches referencing the Gulf News feature.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {gccPressOutreach.map((b) => (
          <div key={b.id} className="p-5 rounded-xl bg-[#16171d] border border-[#23252e] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <Newspaper className="w-4 h-4 text-luxury-gold shrink-0" />
                <h3 className="font-serif font-bold text-base text-luxury-ivory">{b.publisherName}</h3>
                <span className="font-mono text-xs text-luxury-gold">({b.domain})</span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-luxury-gold/15 text-luxury-gold border border-luxury-gold/30">
                  DA: {b.authorityScore}
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-500/15 text-blue-400 border border-blue-500/30">
                  {b.country}
                </span>
              </div>
              <p className="text-xs text-luxury-muted">
                Contact: <strong className="text-luxury-platinum">{b.contactName}</strong> ({b.contactEmail}) • Target: {b.targetCategory}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded border ${
                b.status === 'FEATURED_OCT_2026' 
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                  : 'bg-[#22242c] text-luxury-platinum border-[#2c2f3a]'
              }`}>
                {b.status}
              </span>
              <button 
                onClick={() => setActivePitchModal(b)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-luxury-gold hover:bg-luxury-gold-light text-luxury-charcoal transition-all shadow-sm"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>View Pitch</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pitch Modal */}
      {activePitchModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#16171d] border border-luxury-gold/40 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#23252e] pb-3">
              <div>
                <h3 className="font-serif font-bold text-lg text-luxury-ivory">Outreach Pitch: {activePitchModal.publisherName}</h3>
                <p className="text-xs text-luxury-muted">To: {activePitchModal.contactEmail}</p>
              </div>
              <button 
                onClick={() => setActivePitchModal(null)}
                className="text-luxury-muted hover:text-luxury-ivory text-sm px-2 py-1 rounded"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-luxury-gold">Subject Line</label>
              <div className="p-2.5 rounded-lg bg-[#121318] border border-[#23252e] text-xs font-semibold text-luxury-ivory font-mono">
                {activePitchModal.pitchSubject}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-luxury-gold">Email Pitch Content</label>
              <pre className="p-4 rounded-lg bg-[#121318] border border-[#23252e] text-xs text-luxury-platinum whitespace-pre-wrap font-sans leading-relaxed max-h-64 overflow-y-auto">
                {activePitchModal.pitchBody}
              </pre>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => copyPitchText(`${activePitchModal.pitchSubject}\n\n${activePitchModal.pitchBody}`)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-luxury-gold hover:bg-luxury-gold-light text-luxury-charcoal transition-all shadow-sm font-bold"
              >
                {copiedPitch ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedPitch ? 'Copied to Clipboard!' : 'Copy Full Pitch'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
