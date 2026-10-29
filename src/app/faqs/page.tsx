'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Copy,
  Check,
  Sparkles,
  Globe2,
  Bot,
  ExternalLink,
  Search,
  BookOpen,
  Filter,
  Layers,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { OFFICIAL_FAQS, FAQ_GOVERNANCE_RULES, OfficialFAQ } from '@/data/faqs';

export default function FAQsPage() {
  const [selectedTopic, setSelectedTopic] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [langView, setLangView] = useState<'BOTH' | 'EN' | 'AR'>('BOTH');
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [showRules, setShowRules] = useState(false);

  // Extract unique topics
  const topics = ['ALL', ...Array.from(new Set(OFFICIAL_FAQS.map((f) => f.topic)))];

  const filteredFaqs = OFFICIAL_FAQS.filter((faq) => {
    const matchTopic = selectedTopic === 'ALL' || faq.topic === selectedTopic;
    const query = searchQuery.toLowerCase().trim();
    const matchSearch =
      !query ||
      faq.id.toLowerCase().includes(query) ||
      faq.questionEn.toLowerCase().includes(query) ||
      faq.answerEn.toLowerCase().includes(query) ||
      faq.questionAr.includes(query) ||
      faq.answerAr.includes(query) ||
      faq.topic.toLowerCase().includes(query);

    return matchTopic && matchSearch;
  });

  // Generate Google / AEO / GEO JSON-LD Schema
  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': filteredFaqs.map((faq) => ({
      '@type': 'Question',
      'name': langView === 'AR' ? faq.questionAr : faq.questionEn,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': langView === 'AR' ? faq.answerAr : faq.answerEn,
      },
    })),
  };

  const copySchemaToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(jsonLdSchema, null, 2));
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-luxury-gold/15 text-luxury-gold border border-luxury-gold/30 font-bold">
              Official 80-Item Knowledge Hub
            </span>
            <span className="text-xs text-luxury-muted font-mono">Bilingual EN / AR</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-luxury-ivory">
            Omnia Stores Grounded FAQ & AEO Engine
          </h1>
          <p className="text-xs text-luxury-muted mt-1 max-w-2xl leading-relaxed">
            Verified, factual answers aligned with official product listings and warranty terms. Optimized for Google FAQPage Rich Snippets, Perplexity AI, ChatGPT Search, and Gemini AEO discovery.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowRules(!showRules)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#1a1b24] text-luxury-muted hover:text-white border border-[#2b2d3a] transition-all"
          >
            <BookOpen className="w-3.5 h-3.5 text-luxury-gold" />
            <span>10 AI Rules {showRules ? '▲' : '▼'}</span>
          </button>

          <button
            onClick={copySchemaToClipboard}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-luxury-gold to-luxury-gold-light text-luxury-charcoal hover:brightness-110 shadow-sm transition-all"
          >
            {copiedSchema ? <Check className="w-4 h-4 text-luxury-charcoal" /> : <Code2 className="w-4 h-4 text-luxury-charcoal" />}
            <span>{copiedSchema ? 'Schema Copied!' : 'Copy JSON-LD'}</span>
          </button>
        </div>
      </div>

      {/* Governance Rules Accordion */}
      {showRules && (
        <div className="p-5 rounded-2xl bg-[#111219] border border-luxury-gold/30 space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-[#222432] pb-2">
            <h4 className="text-xs font-bold text-luxury-gold uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              10 Mandatory FAQ & AI Discovery Governance Rules
            </h4>
            <span className="text-[10px] font-mono text-luxury-muted">High-Fidelity AI Constraints</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {FAQ_GOVERNANCE_RULES.map((rule) => (
              <div key={rule.priority} className="p-2.5 rounded-xl bg-[#161722] border border-[#252838] flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-luxury-gold/20 text-luxury-gold font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
                  {rule.priority}
                </span>
                <p className="text-[#c2baa8] leading-relaxed text-[11px]">{rule.rule}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search & Language Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-[#12131a] border border-[#232533]">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-luxury-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions, stones, returns, warranty..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#0e0f14] border border-[#2b2d3d] text-xs text-white placeholder-luxury-muted focus:border-luxury-gold focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs text-luxury-muted mr-1">Language:</span>
          <div className="inline-flex rounded-lg bg-[#0e0f14] p-0.5 border border-[#2b2d3d]">
            <button
              onClick={() => setLangView('BOTH')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                langView === 'BOTH' ? 'bg-luxury-gold text-luxury-charcoal' : 'text-luxury-muted hover:text-white'
              }`}
            >
              Both
            </button>
            <button
              onClick={() => setLangView('EN')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                langView === 'EN' ? 'bg-luxury-gold text-luxury-charcoal' : 'text-luxury-muted hover:text-white'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLangView('AR')}
              className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                langView === 'AR' ? 'bg-luxury-gold text-luxury-charcoal' : 'text-luxury-muted hover:text-white'
              }`}
            >
              العربية
            </button>
          </div>
        </div>
      </div>

      {/* Category / Topic Pills */}
      <div className="flex gap-2 flex-wrap">
        {topics.map((t) => {
          const count = t === 'ALL' ? OFFICIAL_FAQS.length : OFFICIAL_FAQS.filter((f) => f.topic === t).length;
          return (
            <button
              key={t}
              onClick={() => setSelectedTopic(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                selectedTopic === t
                  ? 'bg-luxury-gold text-luxury-charcoal font-bold shadow-sm'
                  : 'bg-[#15161f] text-luxury-muted hover:text-luxury-platinum border border-[#232532]'
              }`}
            >
              <span>{t === 'ALL' ? 'All Topics' : t}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${selectedTopic === t ? 'bg-black/30 text-luxury-charcoal' : 'bg-[#232532] text-luxury-muted'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Stats Counter */}
      <div className="text-xs text-luxury-muted font-mono flex items-center justify-between">
        <span>Showing {filteredFaqs.length} of {OFFICIAL_FAQS.length} grounded Q&As</span>
        <span className="text-emerald-400">All Sources Linked to omniastores.com</span>
      </div>

      {/* FAQs List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredFaqs.map((faq) => (
          <div key={faq.id} className="p-5 rounded-2xl bg-[#12131b] border border-[#222533] hover:border-luxury-gold/40 transition-all space-y-4 shadow-sm">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-luxury-gold/15 text-luxury-gold border border-luxury-gold/30 font-bold">
                  {faq.id} • {faq.topic}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1e202c] text-luxury-muted">
                  {faq.priority} Priority
                </span>
              </div>

              <a
                href={faq.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-luxury-gold hover:underline font-mono"
              >
                <span>Official Source</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="space-y-4">
              {/* English Version */}
              {(langView === 'BOTH' || langView === 'EN') && (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-luxury-gold font-mono">
                      English
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-white leading-snug">{faq.questionEn}</h3>
                  <p className="text-xs text-[#b8aca0] leading-relaxed">{faq.answerEn}</p>
                </div>
              )}

              {/* Arabic Version */}
              {(langView === 'BOTH' || langView === 'AR') && (
                <div
                  className={`space-y-1.5 ${langView === 'BOTH' ? 'pt-3.5 border-t border-[#1d202c]' : ''} text-right`}
                  dir="rtl"
                >
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-luxury-gold font-mono">
                      العربية (النسخة الخليجية الرسمية)
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white font-arabic leading-snug">{faq.questionAr}</h3>
                  <p className="text-xs text-[#b8aca0] leading-relaxed font-arabic">{faq.answerAr}</p>
                </div>
              )}
            </div>

            <div className="pt-2 text-[10px] text-luxury-muted font-mono flex items-center justify-between border-t border-[#1a1c27]">
              <span>Placement: {faq.placement}</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> {faq.reviewStatus}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
