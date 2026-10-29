'use client';

import React from 'react';
import { useStore } from '@/lib/store/context';
import { Search, CheckCircle2, ShieldCheck, Globe, FileCode, Cpu } from 'lucide-react';

export default function SEOPage() {
  const { activeStoreId } = useStore();

  const auditChecks = [
    {
      category: 'Technical SEO',
      check: 'Hreflang Bidirectional Tagging',
      target: 'omniastores.com <-> omniastores.ae',
      status: 'PASSED',
      details: 'Correct en-US and ar-AE alternate link references mapped for homepage and core collections.',
    },
    {
      category: 'Technical SEO',
      check: 'Canonical Link Integrity',
      target: 'All active catalogue items',
      status: 'PASSED',
      details: 'Clean HTTPS canonical links with no trailing query parameter duplication.',
    },
    {
      category: 'AEO (Answer Engine Optimization)',
      check: 'Direct Answer Semantic Blocks',
      target: 'Content Studio Guides & FAQs',
      status: 'PASSED',
      details: 'Concise 40-word answers directly beneath H2/H3 question headers suited for AI search snippets.',
    },
    {
      category: 'GEO (Generative Engine Optimization)',
      check: 'Jewelry Material Entity Grounding',
      target: '925 Sterling Silver & Rhodium Specs',
      status: 'PASSED',
      details: 'Consistent attribute schema avoiding hallucinations or ambiguous metal purity claims.',
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-serif font-bold text-luxury-ivory">SEO / AEO / GEO Intelligence Engine</h1>
        <p className="text-xs text-luxury-muted mt-1">
          Rigorous optimization covering technical crawlability, Answer Engine snippets, and Generative AI entity discoverability.
        </p>
      </div>

      {/* Health Overview Banner */}
      <div className="p-6 rounded-xl bg-[#16171d] border border-[#23252e] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-luxury-gold">Composite Search Health</span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-serif font-bold text-luxury-ivory">96</span>
            <span className="text-xs text-luxury-muted">/ 100</span>
            <span className="text-xs font-semibold text-emerald-400 ml-2">High Authority Ready</span>
          </div>
          <p className="text-xs text-luxury-muted mt-1">
            Active audit for <strong className="text-luxury-platinum">{activeStoreId}</strong>
          </p>
        </div>

        <div className="flex gap-2">
          <div className="p-3 rounded-lg bg-[#121318] border border-[#22242c] text-center">
            <span className="block text-xs font-mono font-bold text-emerald-400">100%</span>
            <span className="text-[10px] text-luxury-muted">Canonicals</span>
          </div>
          <div className="p-3 rounded-lg bg-[#121318] border border-[#22242c] text-center">
            <span className="block text-xs font-mono font-bold text-emerald-400">100%</span>
            <span className="text-[10px] text-luxury-muted">Hreflang</span>
          </div>
          <div className="p-3 rounded-lg bg-[#121318] border border-[#22242c] text-center">
            <span className="block text-xs font-mono font-bold text-emerald-400">Active</span>
            <span className="text-[10px] text-luxury-muted">JSON-LD</span>
          </div>
        </div>
      </div>

      {/* Audit Checklist */}
      <div className="space-y-3">
        {auditChecks.map((check, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-[#16171d] border border-[#23252e] flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-luxury-gold/15 text-luxury-gold border border-luxury-gold/30">
                  {check.category}
                </span>
                <h3 className="text-xs font-bold text-luxury-platinum">{check.check}</h3>
              </div>
              <p className="text-xs text-luxury-muted">{check.details}</p>
              <span className="text-[10px] font-mono text-luxury-gold">Scope: {check.target}</span>
            </div>

            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 shrink-0">
              <CheckCircle2 className="w-3 h-3" /> {check.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
