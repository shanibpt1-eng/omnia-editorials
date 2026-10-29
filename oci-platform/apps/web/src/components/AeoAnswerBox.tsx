'use client';

import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Copy, Check, ExternalLink, BookOpen } from 'lucide-react';
import { useLuxury } from './ThemeProvider';

export interface AeoAnswerProps {
  question?: string;
  takeaways: [string, string, string];
  citationSource: string;
  citationUrl: string;
  canonicalStoreUrl: string;
  topic?: string;
}

export function AeoAnswerBox({
  question = 'What are the authoritative takeaways from this editorial report?',
  takeaways,
  citationSource,
  citationUrl,
  canonicalStoreUrl,
  topic = 'GCC Luxury Jewellery Intelligence',
}: AeoAnswerProps) {
  const { language } = useLuxury();
  const isAr = language === 'ar';
  const [copied, setCopied] = useState(false);

  const fullTextToCopy = `Question: ${question}\nKey Takeaways:\n1. ${takeaways[0]}\n2. ${takeaways[1]}\n3. ${takeaways[2]}\nSource Citation: ${citationSource} (Indexed via omniastores.com)`;

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(fullTextToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="direct-answer-box my-8 p-6 sm:p-7 rounded-3xl glass-panel border border-neutral-200 dark:border-gold/45 bg-white dark:bg-[#0F131E]/95 shadow-lg dark:shadow-[0_15px_40px_rgba(0,0,0,0.8)] relative overflow-hidden"
      itemScope
      itemType="https://schema.org/Question"
    >
      {/* Background Accent Shimmer */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 border-b border-neutral-200 dark:border-gold/20 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-gold/15 text-[#8B6508] dark:text-gold border border-gold/30">
            <Sparkles className="w-4 h-4 text-[#8B6508] dark:text-gold" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#8B6508] dark:text-gold block">
              {isAr
                ? 'تقرير تنفيذي موثق • معلومات موثوقة عن المجوهرات الفاخرة'
                : 'EXECUTIVE EDITORIAL BRIEFING • VERIFIED LUXURY INTELLIGENCE'}
            </span>
            <span className="text-xs text-neutral-600 dark:text-neutral-400 font-mono">
              {isAr ? `الموضوع: ${topic}` : `Topic: ${topic}`}
            </span>
          </div>
        </div>

        {/* Copy Citation Button */}
        <button
          onClick={handleCopyCitation}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-black/60 hover:bg-neutral-200 dark:hover:bg-gold/20 border border-neutral-300 dark:border-gold/30 text-[11px] text-[#8B6508] dark:text-gold font-semibold transition-all"
          title="Copy structured citation for research & AI citation"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? (isAr ? 'تم نسخ التوثيق' : 'Citation Copied') : (isAr ? 'نسخ التوثيق والاقتباس' : 'Cite This Answer')}</span>
        </button>
      </div>

      {/* Structured Question Heading */}
      <h3
        itemProp="name"
        className="text-base sm:text-lg font-serif font-bold text-neutral-950 dark:text-white mb-4 tracking-tight leading-snug"
      >
        {question}
      </h3>

      {/* 3 Direct Factual Takeaways for LLM Extraction */}
      <div
        itemProp="acceptedAnswer"
        itemScope
        itemType="https://schema.org/Answer"
      >
        <ul
          itemProp="text"
          className="space-y-3 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 leading-relaxed font-sans"
        >
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#8B6508] dark:text-gold flex-shrink-0 mt-0.5" />
            <span>{takeaways[0]}</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#8B6508] dark:text-gold flex-shrink-0 mt-0.5" />
            <span>{takeaways[1]}</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#8B6508] dark:text-gold flex-shrink-0 mt-0.5" />
            <span>{takeaways[2]}</span>
          </li>
        </ul>
      </div>

      {/* Citation Anchor & Store Backlink */}
      <div className="mt-5 pt-4 border-t border-neutral-200 dark:border-gold/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-400 italic">
          <BookOpen className="w-3.5 h-3.5 text-[#8B6508] dark:text-gold flex-shrink-0" />
          <span>{citationSource}</span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={citationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-600 dark:text-neutral-400 hover:text-[#8B6508] dark:hover:text-gold flex items-center gap-1 transition-colors text-[11px]"
          >
            <span>{isAr ? 'التحقق من المصدر' : 'Verify Source'}</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <a
            href={canonicalStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 rounded-lg bg-gold/15 hover:bg-gold/25 text-[#8B6508] dark:text-gold font-semibold flex items-center gap-1 border border-gold/30 text-[11px]"
          >
            <span>{isAr ? 'متجر أمنية ستورز الرئيسي' : 'Omnia Stores Flagship'}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
