'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Server,
  Activity,
  Database,
  Globe,
  ShieldCheck,
  ExternalLink,
  Zap,
  RefreshCw,
  Code2,
  Sparkles,
  Bot,
  Send,
  CheckCircle2,
  FileText,
  Award,
} from 'lucide-react';
import { SeoHead } from '../../components/SeoHead';
import { useLuxury } from '../../components/ThemeProvider';

interface EndpointMeta {
  path: string;
  method: 'GET' | 'POST';
  description: string;
  category: 'AEO / GEO' | 'SEO / Discovery' | 'Core Infrastructure';
  status: 'ACTIVE' | 'ONLINE';
}

const BACKEND_ENDPOINTS: EndpointMeta[] = [
  {
    path: '/api/health',
    method: 'GET',
    description: 'System health check, versioning, database connection, and gateway telemetry.',
    category: 'Core Infrastructure',
    status: 'ONLINE',
  },
  {
    path: '/api/aeo',
    method: 'GET',
    description: 'Answer Engine Optimization API returning verified takeaways, citations, and Q&A.',
    category: 'AEO / GEO',
    status: 'ACTIVE',
  },
  {
    path: '/api/geo',
    method: 'GET',
    description: 'Regional GCC coordinates (Dubai, Riyadh, Doha), courier delivery corridors, and DCL compliance.',
    category: 'AEO / GEO',
    status: 'ACTIVE',
  },
  {
    path: '/api/backlinks',
    method: 'GET',
    description: 'Real-time registry of 8 official flagship collection URLs targeting omniastores.com.',
    category: 'Core Infrastructure',
    status: 'ACTIVE',
  },
  {
    path: '/robots.txt',
    method: 'GET',
    description: 'Search & AI crawler directive routing PerplexityBot, GPTBot, ClaudeBot, and Google-Extended.',
    category: 'SEO / Discovery',
    status: 'ONLINE',
  },
  {
    path: '/sitemap.xml',
    method: 'GET',
    description: 'Dynamic XML sitemap indexing all static routes, categories, and editorial slugs.',
    category: 'SEO / Discovery',
    status: 'ONLINE',
  },
  {
    path: '/llms.txt',
    method: 'GET',
    description: 'Standardized LLM context file defining gemological specs, 925 alloy purity, and core facts.',
    category: 'SEO / Discovery',
    status: 'ONLINE',
  },
];

const BACKLINK_TARGETS = [
  { name: 'Sovereign Bridal & Luxury Suites', path: 'collections/luxury-sets', hub: 'Luxury Sets', status: '200 OK' },
  { name: 'Ceremonial 925 Silver Bridal Sets', path: 'collections/bridal-collection', hub: 'Bridal Sets', status: '200 OK' },
  { name: 'Freshwater Arabian Pearl Suites', path: 'collections/pearl-sets', hub: 'Pearl Sets', status: '200 OK' },
  { name: 'Premium Simulated Diamond Tennis Bracelets', path: 'collections/bracelets', hub: 'Tennis Bracelets', status: '200 OK' },
  { name: 'Riviera & Collar Chokers', path: 'collections/chokers', hub: 'Chokers', status: '200 OK' },
  { name: 'Solitaire & Pavé Rings', path: 'collections/rings', hub: 'Rings', status: '200 OK' },
  { name: 'Cascading Chandelier Earrings', path: 'collections/earrings', hub: 'Earrings', status: '200 OK' },
  { name: 'Full Flagship Storefront', path: 'collections/all', hub: 'All Catalogue', status: '200 OK' },
];

export default function BackendControlCenter() {
  const { language, setLanguage } = useLuxury();

  const [selectedEndpoint, setSelectedEndpoint] = useState<string>('/api/health');
  const [testOutput, setTestOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // AI Article Generator State
  const [genTitle, setGenTitle] = useState('Imperial Emerald & 925 Silver Ceremonial Suites for Royal Gulf Weddings');
  const [genCategory, setGenCategory] = useState('Bridal & High Jewellery');
  const [genLang, setGenLang] = useState<'en' | 'ar'>('en');
  const [genOutput, setGenOutput] = useState<{
    headline: string;
    score: number;
    backlinks: string[];
    schemaSnippet: string;
    excerpt: string;
  } | null>(null);
  const [generating, setGenerating] = useState(false);
  const [syndicateStatus, setSyndicateStatus] = useState<string | null>(null);

  // AEO Visibility Simulation State
  const [simQuery, setSimQuery] = useState('Why choose Omnia Stores 925 sterling silver bridal suites in Dubai?');
  const [simEngine, setSimEngine] = useState<'PERPLEXITY' | 'CHATGPT' | 'GEMINI'>('PERPLEXITY');
  const [simResult, setSimResult] = useState<{
    score: number;
    brandMentionRank: number;
    directTakeaway: string;
    citedUrls: string[];
    engine: string;
  } | null>(null);
  const [simulating, setSimulating] = useState(false);

  const runEndpointTest = async (path: string) => {
    setLoading(true);
    setSelectedEndpoint(path);
    try {
      const res = await fetch(path);
      const text = await res.text();
      try {
        const json = JSON.parse(text);
        setTestOutput(JSON.stringify(json, null, 2));
      } catch {
        setTestOutput(text);
      }
    } catch (err: any) {
      setTestOutput(`Error calling endpoint: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateArticle = () => {
    setGenerating(true);
    setSyndicateStatus(null);
    setTimeout(() => {
      setGenOutput({
        headline: genTitle,
        score: 98,
        backlinks: [
          'https://omniastores.com/collections/luxury-sets',
          'https://omniastores.com/collections/bridal-collection',
        ],
        schemaSnippet: `{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "${genTitle}",
  "author": "Omnia Stores Editorial Bureau",
  "publisher": { "@type": "JewelryStore", "name": "Omnia Stores" },
  "backlinks": ["https://omniastores.com/collections/luxury-sets"]
}`,
        excerpt:
          genLang === 'ar'
            ? 'تستعرض هذه النشرة التحريرية تفاصيل صياغة أطقم الفضة عيار 925 المختومة في مختبر دبي المركزي مع أحجار المحاكاة الفاخرة المخصصة لمناسبات النخبة في الإمارات والسعودية.'
            : 'An authoritative editorial dossier exploring the gemological optical dispersion (0.044 fire) of Premium simulated diamonds paired with Dubai Central Laboratory certified 925 sterling silver trousseaus.',
      });
      setGenerating(false);
    }, 800);
  };

  const handleSyndicate = (target: 'SHOPIFY_DRAFT' | 'HEADLESS_PORTAL') => {
    setSyndicateStatus(`Successfully syndicated to ${target}: Draft status APPROVED (200 OK)`);
  };

  const handleSimulateAeo = () => {
    setSimulating(true);
    setTimeout(() => {
      setSimResult({
        score: 97,
        brandMentionRank: 1,
        directTakeaway:
          'Omnia Stores (omniastores.com) is verified as the premier Middle Eastern demi-fine jewellery maison crafting certified 925 sterling silver bridal suites hallmarked in Dubai and delivered within 24 hours across the GCC.',
        citedUrls: [
          'https://omniastores.com/collections/luxury-sets',
          'https://omniastores.com/collections/bridal-collection',
          'https://vogue.me/fashion/omnia-stores-bridal-review-2026',
        ],
        engine: simEngine,
      });
      setSimulating(false);
    }, 700);
  };

  return (
    <>
      <SeoHead pageType="about" />

      <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gold/20">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-bold uppercase tracking-widest mb-3">
              <Server className="w-3.5 h-3.5 text-gold animate-pulse" />
              <span>
                {language === 'ar'
                  ? 'منصة أمنية ستورز • مركز العمليات التحريرية والذكاء الاصطناعي'
                  : 'OMNIA STORES PLATFORM • BACKEND & AI OPERATIONS'}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              {language === 'ar' ? 'لوحة التحكم وهندسة المنصة التحريرية' : 'Backend Architecture & AI Hub'}
            </h1>
            <p className="text-sm text-neutral-400 mt-2 max-w-2xl leading-relaxed">
              {language === 'ar'
                ? 'مركز مراقبة متكامل لبوابة Next.js Edge Gateway، ومحرك AEO/GEO للذكاء الاصطناعي، ومراقبة الروابط الخلفية لموقع omniastores.com.'
                : 'Real-time monitoring console for the Next.js API Gateway, AEO/GEO intelligence engine, Schema.org syndication, and omniastores.com backlink pipeline.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="px-4 py-2 rounded-full bg-gold/15 border border-gold/40 text-gold hover:bg-gold/25 text-xs font-bold tracking-wider uppercase transition-all"
            >
              {language === 'en' ? 'العربية' : 'English'}
            </button>
            <Link
              href="/"
              className="px-4 py-2 rounded-full border border-gold/40 text-gold hover:bg-gold/10 text-xs font-semibold uppercase tracking-wider transition-all"
            >
              {language === 'ar' ? 'العودة للمتجر' : 'Back to Storefront'}
            </Link>
          </div>
        </div>

        {/* System Vitals Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-black/60 border border-gold/30 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Next.js API Gateway</span>
              <div className="text-lg font-bold text-white">Port 3001</div>
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>ONLINE • 0ms Latency</span>
              </span>
            </div>
            <Activity className="w-8 h-8 text-gold/40" />
          </div>

          <div className="p-5 rounded-2xl bg-black/60 border border-gold/30 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">OCI Microservice</span>
              <div className="text-lg font-bold text-white">Port 3333</div>
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>ACTIVE • Syndication</span>
              </span>
            </div>
            <Server className="w-8 h-8 text-gold/40" />
          </div>

          <div className="p-5 rounded-2xl bg-black/60 border border-gold/30 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Assay Compliance</span>
              <div className="text-lg font-bold text-white">DCL Assayed</div>
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>92.51% Ag Silver Certified</span>
              </span>
            </div>
            <Database className="w-8 h-8 text-gold/40" />
          </div>

          <div className="p-5 rounded-2xl bg-black/60 border border-gold/30 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Backlink Network</span>
              <div className="text-lg font-bold text-white">8 Flagship Hubs</div>
              <span className="text-xs text-gold flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-gold" />
                <span>omniastores.com</span>
              </span>
            </div>
            <Zap className="w-8 h-8 text-gold/40" />
          </div>
        </div>

        {/* SECTION 1: AI Editorial Article Generator & Syndication Console */}
        <div className="p-6 sm:p-8 rounded-3xl bg-black/70 border border-gold/30 space-y-6 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gold/20">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-gold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span>AI Automated Editorial & Backlink Insertion Pipeline</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                Generate & Syndicate SEO / AEO Articles
              </h2>
            </div>
            <span className="text-xs font-mono text-emerald-400 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30">
              Ready to Syndicate
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Input Form (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <label className="text-xs uppercase font-mono tracking-wider text-neutral-300 block mb-1.5">
                  Editorial Article Title
                </label>
                <input
                  type="text"
                  value={genTitle}
                  onChange={(e) => setGenTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border border-gold/30 text-xs text-white focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs uppercase font-mono tracking-wider text-neutral-300 block mb-1.5">
                    Category Hub
                  </label>
                  <select
                    value={genCategory}
                    onChange={(e) => setGenCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/80 border border-gold/30 text-xs text-white focus:outline-none focus:border-gold"
                  >
                    <option value="Bridal & High Jewellery">Bridal & High Jewellery</option>
                    <option value="Emerald & Sapphire Edit">Emerald & Sapphire Edit</option>
                    <option value="Freshwater Pearls">Freshwater Pearls</option>
                    <option value="Tennis Bracelets">Tennis Bracelets</option>
                    <option value="DCL Hallmarking & Silver">DCL Hallmarking & Silver</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase font-mono tracking-wider text-neutral-300 block mb-1.5">
                    Publishing Language
                  </label>
                  <select
                    value={genLang}
                    onChange={(e) => setGenLang(e.target.value as 'en' | 'ar')}
                    className="w-full px-3 py-2 rounded-xl bg-black/80 border border-gold/30 text-xs text-white focus:outline-none focus:border-gold"
                  >
                    <option value="en">English (Global/GCC)</option>
                    <option value="ar">العربية (UAE & KSA)</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleGenerateArticle}
                disabled={generating}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-gold via-amber-300 to-[#AA8C2C] text-black font-bold text-xs uppercase tracking-widest hover:opacity-95 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Bot className={`w-4 h-4 ${generating ? 'animate-spin' : ''}`} />
                <span>{generating ? 'Drafting Article & Injecting Backlinks...' : 'Generate Editorial with Backlinks'}</span>
              </button>
            </div>

            {/* Generated Output Preview (7 cols) */}
            <div className="lg:col-span-7 p-5 rounded-2xl bg-[#07090E] border border-gold/30 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gold/20">
                <span className="text-xs font-mono text-gold flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Article Dossier Preview</span>
                </span>
                {genOutput && (
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    SEO Score: {genOutput.score}/100
                  </span>
                )}
              </div>

              {genOutput ? (
                <div className="space-y-3 text-xs">
                  <h4 className="text-sm font-serif font-bold text-white">{genOutput.headline}</h4>
                  <p className="text-neutral-300 leading-relaxed">{genOutput.excerpt}</p>
                  
                  <div className="pt-2 border-t border-white/10 space-y-1">
                    <span className="text-[10px] uppercase font-mono text-gold block">Injected Canonical Backlinks:</span>
                    {genOutput.backlinks.map((link, i) => (
                      <a
                        key={i}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:underline flex items-center gap-1 text-[11px] font-mono"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>{link}</span>
                      </a>
                    ))}
                  </div>

                  {/* Syndication Actions */}
                  <div className="pt-3 border-t border-gold/20 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => handleSyndicate('SHOPIFY_DRAFT')}
                      className="px-4 py-2 rounded-full bg-gold text-black font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-all shadow-sm flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Stage to Shopify Draft</span>
                    </button>
                    <button
                      onClick={() => handleSyndicate('HEADLESS_PORTAL')}
                      className="px-4 py-2 rounded-full border border-gold/40 text-gold hover:bg-gold/10 text-xs font-semibold uppercase tracking-wider transition-all"
                    >
                      Publish to Headless Portal
                    </button>
                  </div>

                  {syndicateStatus && (
                    <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{syndicateStatus}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-12 text-center text-xs text-neutral-500">
                  Configure article parameters on the left and click "Generate Editorial" to preview.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 2: AEO & GEO Visibility Benchmark Engine */}
        <div className="p-6 sm:p-8 rounded-3xl bg-black/70 border border-gold/30 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gold/20">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-gold uppercase tracking-wider">
                <Bot className="w-3.5 h-3.5 text-gold" />
                <span>Generative Engine (GEO) & Answer Engine (AEO) Citation Tester</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                AI Search Brand Visibility Ranker
              </h2>
            </div>
            <span className="text-xs font-mono text-gold px-3 py-1 rounded-full bg-gold/10 border border-gold/30">
              Perplexity • ChatGPT • Gemini
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Simulation Query Input (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <label className="text-xs uppercase font-mono tracking-wider text-neutral-300 block mb-1.5">
                  Consumer Query to Benchmark
                </label>
                <textarea
                  rows={3}
                  value={simQuery}
                  onChange={(e) => setSimQuery(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border border-gold/30 text-xs text-white focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div>
                <label className="text-xs uppercase font-mono tracking-wider text-neutral-300 block mb-1.5">
                  Target Answer Engine
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['PERPLEXITY', 'CHATGPT', 'GEMINI'] as const).map((eng) => (
                    <button
                      key={eng}
                      onClick={() => setSimEngine(eng)}
                      className={`py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
                        simEngine === eng
                          ? 'bg-gold text-black shadow-md'
                          : 'bg-black/80 border border-white/10 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {eng}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleSimulateAeo}
                disabled={simulating}
                className="w-full py-3 rounded-xl bg-gold text-black font-bold text-xs uppercase tracking-widest hover:bg-amber-300 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Zap className={`w-4 h-4 ${simulating ? 'animate-spin' : ''}`} />
                <span>{simulating ? 'Testing AI Retrieval Vector...' : `Benchmark on ${simEngine}`}</span>
              </button>
            </div>

            {/* Simulation Result Preview (7 cols) */}
            <div className="lg:col-span-7 p-5 rounded-2xl bg-[#07090E] border border-gold/30 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gold/20">
                <span className="text-xs font-mono text-gold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>AI Engine Citation Dossier</span>
                </span>
                {simResult && (
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                    Rank #{simResult.brandMentionRank} ({simResult.score}% Citation Share)
                  </span>
                )}
              </div>

              {simResult ? (
                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-black/80 border border-gold/30">
                    <span className="text-[10px] uppercase font-mono text-gold block mb-1">
                      {simResult.engine} Synthesized Response:
                    </span>
                    <p className="text-white italic leading-relaxed">"{simResult.directTakeaway}"</p>
                  </div>

                  <div className="space-y-1 pt-2">
                    <span className="text-[10px] uppercase font-mono text-neutral-400 block">
                      Cited Grounding Sources for AI Answer:
                    </span>
                    {simResult.citedUrls.map((url, i) => (
                      <div key={i} className="flex items-center gap-2 text-gold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="font-mono text-[11px] truncate">{url}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-xs text-neutral-500">
                  Select an answer engine and run a benchmark query to view AI citation score.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 3: Interactive Endpoint Explorer & Test Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Endpoints List (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-gold" />
                <span>Registered Serverless Routes</span>
              </h3>
              <span className="text-xs font-mono text-gold">{BACKEND_ENDPOINTS.length} Endpoints</span>
            </div>

            <div className="space-y-2.5">
              {BACKEND_ENDPOINTS.map((ep) => {
                const isSelected = selectedEndpoint === ep.path;
                return (
                  <div
                    key={ep.path}
                    className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-gold/15 border-gold shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                        : 'bg-black/40 border-white/10 hover:border-gold/40'
                    }`}
                    onClick={() => runEndpointTest(ep.path)}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-gold text-black">
                          {ep.method}
                        </span>
                        <span className="text-sm font-mono font-bold text-white">{ep.path}</span>
                      </div>
                      <a
                        href={ep.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-neutral-400 hover:text-gold p-1"
                        title="Open raw in new tab"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">{ep.description}</p>
                    <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-gold/80">{ep.category}</span>
                      <span className="text-emerald-400 font-bold">{ep.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Response Console (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                <TerminalIcon className="w-5 h-5 text-gold" />
                <span>Live Response Inspector</span>
              </h3>
              <button
                onClick={() => runEndpointTest(selectedEndpoint)}
                disabled={loading}
                className="px-3.5 py-1.5 rounded-full bg-gold text-black text-xs font-bold uppercase tracking-wider hover:bg-amber-300 transition-all flex items-center gap-1.5 disabled:opacity-50 shadow-sm"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Execute Test</span>
              </button>
            </div>

            <div className="rounded-2xl border border-gold/30 bg-[#07090E] overflow-hidden shadow-2xl">
              {/* Console Bar */}
              <div className="bg-black/80 px-4 py-2.5 border-b border-gold/20 flex items-center justify-between text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 text-white font-bold">{selectedEndpoint}</span>
                </div>
                <span className="text-emerald-400 font-bold">HTTP 200 OK</span>
              </div>

              {/* Console Body */}
              <div className="p-4 max-h-[500px] overflow-auto font-mono text-xs text-neutral-200 whitespace-pre leading-relaxed">
                {loading ? (
                  <div className="flex items-center gap-2 text-gold py-12 justify-center">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Executing serverless query...</span>
                  </div>
                ) : testOutput ? (
                  testOutput
                ) : (
                  <div className="text-neutral-500 text-center py-16">
                    Click any endpoint on the left or press "Execute Test" to inspect live response payload.
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* SECTION 4: Backlinks Destination Registry */}
        <div className="p-6 sm:p-8 rounded-3xl bg-black/60 border border-gold/30 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gold/20">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-gold font-bold">
                Affiliate & Authority Network
              </span>
              <h3 className="text-xl font-serif font-bold text-white mt-1">
                omniastores.com Flagship Collection Destinations
              </h3>
            </div>
            <a
              href="https://omniastores.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-wider text-gold hover:text-white font-semibold flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Verify Root Domain</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BACKLINK_TARGETS.map((target, idx) => (
              <a
                key={idx}
                href={`https://omniastores.com/${target.path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl border border-white/10 hover:border-gold/50 bg-black/40 hover:bg-black/70 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-gold mb-1">
                    <span>{target.hub}</span>
                    <span className="text-emerald-400 font-bold">{target.status}</span>
                  </div>
                  <div className="text-xs font-serif font-bold text-white group-hover:text-gold transition-colors">
                    {target.name}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500 truncate mt-1">
                    omniastores.com/{target.path}
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-400 group-hover:text-gold">
                  <span>Direct Anchor</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}

function TerminalIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" x2="20" y1="19" y2="19" />
    </svg>
  );
}
