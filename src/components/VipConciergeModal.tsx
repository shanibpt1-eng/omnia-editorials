'use client';

import React, { useState } from 'react';
import { Sparkles, X, ShieldCheck, Copy, Check, ShoppingBag, ArrowUpRight, ArrowUpLeft } from 'lucide-react';
import { useLuxury } from './ThemeProvider';

export function VipConciergeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { language } = useLuxury();
  const isAr = language === 'ar';

  const copyCode = () => {
    navigator.clipboard.writeText('OMNIA-VIP15');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Floating Action Trigger Button (Refined luxury pill) */}
      <div className={`fixed bottom-4 ${isAr ? 'left-4 sm:left-6' : 'right-4 sm:right-6'} sm:bottom-5 z-30 hidden md:block`}>
        <button
          onClick={() => setIsOpen(true)}
          className={`group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#DFBF58] to-[#AA8C2C] text-[#0A0D14] font-bold text-[11px] uppercase tracking-wider shadow-[0_4px_20px_rgba(212,175,55,0.45)] hover:shadow-[0_6px_28px_rgba(212,175,55,0.7)] transition-all transform hover:-translate-y-0.5 active:scale-95 shimmer-btn ${
            isAr ? 'font-arabic' : ''
          }`}
          aria-label={isAr ? 'فتح كونسيرج كبار الشخصيات' : 'Open VIP Concierge'}
        >
          <Sparkles className="w-3.5 h-3.5 animate-spin text-[#0A0D14]" style={{ animationDuration: '6s' }} />
          <span>{isAr ? 'الكونسيرج الخاص • خصم 15%' : 'VIP Concierge • 15% Off'}</span>
        </button>
      </div>

      {/* Modal Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div
            className={`relative w-full max-w-lg rounded-3xl glass-panel border-2 border-gold/50 bg-[#0C0F17] p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] dark-surface ${
              isAr ? 'font-arabic text-right' : ''
            }`}
            dir={isAr ? 'rtl' : 'ltr'}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className={`absolute top-5 ${isAr ? 'left-5' : 'right-5'} p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors`}
              aria-label={isAr ? 'إغلاق' : 'Close'}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-bold uppercase tracking-widest mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAr ? 'صالون العملاء الخاص' : 'Private Client Salon'}</span>
              </div>
              <h3
                style={{ color: '#FFFFFF' }}
                className="text-2xl sm:text-3xl font-serif font-bold text-white stay-white"
              >
                {isAr ? 'مزايا استثنائية لكبار الشخصيات' : 'Exclusive VIP Privileges'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-2">
                {isAr
                  ? 'تواصلي مباشرة مع كبار خبراء ومصممي المجوهرات في دبي والرياض لاستشارات أطقم الأعراس الملكية، وضبط مقاسات الخواتم، والشحن الفوري الفاخر.'
                  : 'Connect directly with our Dubai & Riyadh master stylists for bespoke bridal consultations, custom ring sizing, and immediate order dispatch.'}
              </p>
            </div>

            {/* Exclusive Promo Voucher */}
            <div className="p-4 rounded-2xl bg-black/70 border border-gold/40 mb-6 text-center space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-gold font-bold">
                {isAr ? 'ميزة الترحيب الحصرية بالعملاء الجدد (خصم 15%)' : 'FIRST CLIENT WELCOME PRIVILEGE (15% OFF)'}
              </span>
              <div className="flex items-center justify-center gap-3">
                <span className="font-mono text-xl font-bold tracking-widest text-white px-3 py-1 rounded-lg bg-gold/15 border border-gold/30">
                  OMNIA-VIP15
                </span>
                <button
                  onClick={copyCode}
                  className="px-3 py-1.5 rounded-lg bg-gold text-black text-xs font-bold flex items-center gap-1.5 hover:opacity-90 transition-opacity"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-900" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ الكود' : 'Copy')}</span>
                </button>
              </div>
              <p className="text-[11px] text-neutral-400">
                {isAr ? (
                  <>
                    صالح للاستخدام الفوري على كافة المنتجات (+1,800 قطعة) عبر <strong>omniastores.com</strong>.
                  </>
                ) : (
                  <>
                    Redeemable instantly across all 1,800+ items on <strong>omniastores.com</strong>.
                  </>
                )}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <a
                href="https://omniastores.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full bg-gradient-to-r from-gold to-[#AA8C2C] text-black font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:opacity-95 shimmer-btn"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isAr ? 'تسوقي من المتجر الرئيسي omniastores.com' : 'Shop Flagship omniastores.com'}</span>
                {isAr ? <ArrowUpLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
              </a>

              <a
                href="https://omniastores.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-full border border-emerald-400/60 bg-emerald-500/10 text-emerald-400 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-500/20 transition-colors"
              >
                <span>{isAr ? 'بوابة المملكة العربية السعودية (omniastores.com)' : 'Saudi Arabia VIP Portal (omniastores.com)'}</span>
                {isAr ? <ArrowUpLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
              </a>
            </div>

            {/* Footnote */}
            <div className="mt-5 pt-3 border-t border-gold/15 flex items-center justify-center gap-2 text-[10px] text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-gold" />
              <span>
                {isAr
                  ? 'فضة مختومة عيار 925 رسمياً • توصيل سريع ومؤمن لكافة دول الخليج'
                  : 'Certified 925 Hallmark & Insured GCC Courier Delivery'}
              </span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
