'use client';

import React from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { useLuxury } from './ThemeProvider';

export function GccCurrencyTicker() {
  const { currency, setCurrency, theme, language } = useLuxury();
  const isDark = theme === 'dark';
  const isAr = language === 'ar';

  const rates = [
    { code: 'AED', name: 'UAE Dirham', rate: '1.00', flag: '🇦🇪' },
    { code: 'SAR', name: 'Saudi Riyal', rate: '1.02', flag: '🇸🇦' },
    { code: 'QAR', name: 'Qatari Riyal', rate: '0.99', flag: '🇶🇦' },
    { code: 'KWD', name: 'Kuwaiti Dinar', rate: '0.084', flag: '🇰🇼' },
    { code: 'BHD', name: 'Bahraini Dinar', rate: '0.102', flag: '🇧🇭' },
    { code: 'OMR', name: 'Omani Rial', rate: '0.105', flag: '🇴🇲' },
  ];

  return (
    <div
      className={`w-full py-2.5 px-4 overflow-hidden relative border-y transition-colors duration-500 ${
        isDark
          ? 'bg-[#05070B] border-gold/20 text-neutral-300'
          : 'bg-[#F4EFE6] border-[#B8860B]/20 text-neutral-800'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Ticker Title */}
        <div
          className={`hidden sm:flex items-center gap-2 text-xs font-semibold uppercase tracking-wider flex-shrink-0 ${
            isDark ? 'text-gold' : 'text-[#8B6508]'
          }`}
        >
          <ArrowRightLeft className={`w-3.5 h-3.5 animate-pulse ${isDark ? 'text-gold' : 'text-[#8B6508]'}`} />
          <span>{isAr ? 'تطابق العملات الخليجية:' : 'GCC Currency Parity:'}</span>
        </div>

        {/* Scrolling Ticker of Currencies */}
        <div className="flex-1 overflow-hidden relative">
          <div className="flex items-center gap-6 whitespace-nowrap animate-ticker pause-hover text-xs">
            {rates.concat(rates).map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (item.code === 'AED' || item.code === 'SAR') {
                    setCurrency(item.code as 'AED' | 'SAR');
                  }
                }}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                  currency === item.code
                    ? isDark
                      ? 'bg-gold/20 text-gold border border-gold/40 font-bold'
                      : 'bg-[#B8860B]/20 text-[#8B6508] border border-[#B8860B]/40 font-bold'
                    : isDark
                      ? 'text-neutral-400 hover:text-white'
                      : 'text-neutral-600 hover:text-black'
                }`}
                title={`Click to set ${item.code} currency`}
              >
                <span>{item.flag}</span>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>{item.code}</span>
                <span className={`font-mono ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>1 AED = {item.rate} {item.code}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick UAE / KSA Switcher */}
        <div className="flex items-center gap-1 text-[11px] font-semibold flex-shrink-0">
          <span className={`hidden md:inline ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>Instant Switch:</span>
          <button
            onClick={() => setCurrency('AED')}
            className={`px-2 py-0.5 rounded text-xs transition-all ${
              currency === 'AED'
                ? 'bg-gold text-black font-bold'
                : isDark
                  ? 'text-neutral-400 hover:text-gold'
                  : 'text-neutral-600 hover:text-black'
            }`}
          >
            🇦🇪 AED
          </button>
          <button
            onClick={() => setCurrency('SAR')}
            className={`px-2 py-0.5 rounded text-xs transition-all ${
              currency === 'SAR'
                ? 'bg-gold text-black font-bold'
                : isDark
                  ? 'text-neutral-400 hover:text-gold'
                  : 'text-neutral-600 hover:text-black'
            }`}
          >
            🇸🇦 SAR
          </button>
        </div>
      </div>
    </div>
  );
}
