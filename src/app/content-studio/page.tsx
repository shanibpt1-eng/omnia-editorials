'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/context';
import {
  Sparkles,
  Send,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  FileText,
  Languages,
  Newspaper,
  BookOpen,
  Wand2,
  Image as ImageIcon,
  Film,
  Edit3,
  History,
  Trash2,
} from 'lucide-react';
import { ArticleEditModal } from '@/components/ArticleEditModal';
import { ArticleHistoryModal } from '@/components/ArticleHistoryModal';

export default function ContentStudioPage() {
  const {
    activeStoreId,
    language,
    setLanguage,
    articles,
    generateNewArticle,
    publishArticleDraft,
    publishToStorefront,
    unpublishFromStorefront,
    runDailyBlogAutomation,
    updateArticle,
  } = useStore();

  const [isGenerating, setIsGenerating] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublishingStorefront, setIsPublishingStorefront] = useState(false);
  const [isUnpublishing, setIsUnpublishing] = useState(false);
  const [unpublishMessage, setUnpublishMessage] = useState<string | null>(null);
  const [storefrontPublishResult, setStorefrontPublishResult] = useState<any | null>(null);
  const [isDailyRunning, setIsDailyRunning] = useState(false);
  const [dailyRunResult, setDailyRunResult] = useState<any | null>(null);
  const [isGeneratingVisual, setIsGeneratingVisual] = useState(false);
  const [visualStatus, setVisualStatus] = useState<string | null>(null);
  const [publishMessage, setPublishMessage] = useState<string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const activeArticle = articles.find((a) => a.id === selectedArticleId) || articles[0];

  const handlePublishToStorefront = async () => {
    if (!activeArticle) return;
    setIsPublishingStorefront(true);
    setStorefrontPublishResult(null);
    try {
      const res = await publishToStorefront(activeArticle);
      setStorefrontPublishResult(res);
    } catch (err: any) {
      setStorefrontPublishResult({ success: false, error: err.message });
    } finally {
      setIsPublishingStorefront(false);
    }
  };

  const handleUnpublishFromStorefront = async () => {
    if (!activeArticle) return;
    setIsUnpublishing(true);
    setUnpublishMessage(null);
    try {
      const res = await unpublishFromStorefront(activeArticle.slug || activeArticle.id);
      if (res.success) {
        setUnpublishMessage(`Successfully removed from Port 3001 storefront catalogue.`);
        setStorefrontPublishResult(null);
        updateArticle({ ...activeArticle, status: 'APPROVED' });
      } else {
        setUnpublishMessage(res.error || 'Failed to remove from storefront');
      }
    } catch (err: any) {
      setUnpublishMessage(err.message || 'Error unpublishing article');
    } finally {
      setIsUnpublishing(false);
    }
  };

  const handleRunDaily = async () => {
    setIsDailyRunning(true);
    setDailyRunResult(null);
    try {
      const res = await runDailyBlogAutomation();
      setDailyRunResult(res);
    } catch (err: any) {
      setDailyRunResult({ success: false, error: err.message });
    } finally {
      setIsDailyRunning(false);
    }
  };

  const handleGenerateHiggsfieldVisual = async () => {
    if (!activeArticle) return;
    setIsGeneratingVisual(true);
    setVisualStatus(null);
    try {
      const res = await fetch('/api/higgsfield/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Cinematic luxury editorial photography for ${activeArticle.title}, 925 sterling silver bridal jewellery, sparkling AAA cubic zirconia, soft warm candlelight, Vogue Middle East style, 8k resolution`,
          mode: 'image',
          aspectRatio: '16:9',
          style: 'LUXURY_EDITORIAL',
        }),
      });
      const data = await res.json();
      if (data.success && data.result) {
        activeArticle.featuredImageUrl = data.result.mediaUrl;
        setVisualStatus('Higgsfield.ai 8K Editorial Visual generated successfully!');
      } else {
        setVisualStatus(data.error || 'Failed to generate visual');
      }
    } catch (err: any) {
      setVisualStatus(`Error contacting Higgsfield: ${err.message}`);
    } finally {
      setIsGeneratingVisual(false);
    }
  };

  const handleGenerate = async (lang: 'en' | 'ar') => {
    setIsGenerating(true);
    setPublishMessage(null);
    try {
      const newArt = await generateNewArticle(lang);
      if (newArt?.id) setSelectedArticleId(newArt.id);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePublish = async () => {
    if (!activeArticle) return;
    setIsPublishing(true);
    setPublishMessage(null);
    try {
      const res = await publishArticleDraft(activeArticle.id);
      setPublishMessage(res.message);
    } catch (err: any) {
      setPublishMessage(`Draft publish notice: ${err.message}`);
    } finally {
      setIsPublishing(false);
    }
  };

  const verifiedLinks = activeArticle?.verifiedLinks || [];
  const qaBreakdown = activeArticle?.qualityAssessment?.breakdown || {};
  const isPassed = activeArticle?.qualityAssessment?.passed ?? true;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-luxury-ivory">Autonomous Content Studio</h1>
          <p className="text-xs text-luxury-muted mt-1">
            Bilingual AI article generation & official newspaper reports with live catalogue link injection and strict quality gate compliance.
          </p>
        </div>

        {/* Generate Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleRunDaily}
            disabled={isDailyRunning}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-amber-500 to-luxury-gold text-luxury-charcoal hover:from-amber-400 hover:to-luxury-gold-light transition-all disabled:opacity-50 shadow-md"
          >
            <Sparkles className={`w-3.5 h-3.5 text-luxury-charcoal ${isDailyRunning ? 'animate-spin' : ''}`} />
            <span>{isDailyRunning ? 'Running Daily Automation...' : '⚡ Daily Blog Automation (Auto-Publish to 3001)'}</span>
          </button>

          <button
            onClick={() => handleGenerate('en')}
            disabled={isGenerating}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#22242c] hover:bg-[#2c2f3a] text-luxury-platinum border border-[#323644] transition-all disabled:opacity-50 shadow-sm"
          >
            <Sparkles className={`w-3.5 h-3.5 text-luxury-gold ${isGenerating ? 'animate-spin' : ''}`} />
            <span>Generate English Guide</span>
          </button>

          <button
            onClick={() => handleGenerate('ar')}
            disabled={isGenerating}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-luxury-gold hover:bg-luxury-gold-light text-luxury-charcoal transition-all disabled:opacity-50 shadow-sm font-arabic"
          >
            <Sparkles className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>توليد دليل العروس (عربي)</span>
          </button>
        </div>
      </div>

      {dailyRunResult && (
        <div className={`p-4 rounded-xl border text-xs flex items-start justify-between gap-3 animate-fadeIn ${
          dailyRunResult.success ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' : 'bg-red-950/40 border-red-500/40 text-red-200'
        }`}>
          <div>
            <div className="flex items-center gap-2 font-bold mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Daily Blog Automation Completed Successfully!</span>
            </div>
            <p className="text-[11px] text-emerald-300">
              Topic: <strong>{dailyRunResult.article?.title}</strong>
            </p>
            {dailyRunResult.storefrontBridge?.publishedUrl && (
              <p className="mt-1">
                Published to Storefront: <a href={dailyRunResult.storefrontBridge.publishedUrl} target="_blank" rel="noopener noreferrer" className="underline font-bold text-luxury-gold">{dailyRunResult.storefrontBridge.publishedUrl} ↗</a>
              </p>
            )}
          </div>
          <a
            href={dailyRunResult.storefrontBridge?.publishedUrl || 'http://localhost:3001/editorials'}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-luxury-gold text-luxury-charcoal font-bold text-xs uppercase tracking-wider flex items-center gap-1 shadow shrink-0"
          >
            <span>View Live on 3001</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Article Switcher Pills (Newspaper Clippings & Generated Guides) */}
      {articles.length > 0 && (
        <div className="p-3 rounded-xl bg-[#16171d] border border-[#23252e] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-luxury-muted flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-luxury-gold" />
              Available Articles & Press Features ({articles.length})
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {articles.map((art) => {
              const isSelected = activeArticle?.id === art.id;
              const isPress = art.title.toLowerCase().includes('gulf news') || 
                              art.title.toLowerCase().includes('khaleej times') || 
                              art.title.toLowerCase().includes('bridal arabia') ||
                              art.title.toLowerCase().includes('luxury style') ||
                              art.title.toLowerCase().includes('زهرة الخليج');

              return (
                <button
                  key={art.id}
                  onClick={() => setSelectedArticleId(art.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                    isSelected
                      ? 'bg-luxury-gold text-luxury-charcoal font-bold shadow-sm'
                      : 'bg-[#121318] text-luxury-muted hover:text-luxury-platinum border border-[#23252e]'
                  }`}
                >
                  {isPress && <Newspaper className="w-3.5 h-3.5 text-current" />}
                  <span className="truncate max-w-[240px]">{art.title}</span>
                  <span className={`text-[10px] px-1 rounded uppercase ${
                    art.language === 'ar' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {art.language}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {activeArticle ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2 Cols): Article Content & Editor */}
          <div className="lg:col-span-2 space-y-4">
            <div className="p-6 rounded-xl bg-[#16171d] border border-[#23252e]">
              <div className="flex items-center justify-between pb-4 border-b border-[#23252e]">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      activeArticle.language === 'en'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {activeArticle.language.toUpperCase()}
                  </span>
                  <span className="text-xs text-luxury-muted font-medium">By: {activeArticle.author}</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#1d1f27] hover:bg-[#272a35] text-luxury-gold border border-luxury-gold/30 hover:border-luxury-gold transition-all shadow-sm"
                    title="Edit content, bilingual titles & AI photography"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-luxury-gold" />
                    <span>Edit Article</span>
                  </button>

                  <button
                    onClick={() => setIsHistoryModalOpen(true)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#1d1f27] hover:bg-[#272a35] text-luxury-platinum border border-[#323644] hover:border-luxury-gold/50 transition-all shadow-sm"
                    title="View history, detect mismatches & rollback"
                  >
                    <History className="w-3.5 h-3.5 text-luxury-gold" />
                    <span>History & Revert</span>
                  </button>

                  <span className="text-xs text-luxury-muted font-medium hidden sm:inline">Status:</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      activeArticle.status === 'PUBLISHED_SHOPIFY'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-luxury-gold/20 text-luxury-gold border border-luxury-gold/30'
                    }`}
                  >
                    {activeArticle.status}
                  </span>
                </div>
              </div>

              {/* Title & Excerpt */}
              <div className="mt-4 space-y-2">
                <h2
                  className={`text-xl font-serif font-bold text-luxury-ivory ${
                    activeArticle.language === 'ar' ? 'font-arabic text-right' : ''
                  }`}
                >
                  {activeArticle.title}
                </h2>
                <p
                  className={`text-xs text-luxury-muted italic ${
                    activeArticle.language === 'ar' ? 'font-arabic text-right' : ''
                  }`}
                >
                  {activeArticle.excerpt}
                </p>
              </div>

              {/* Higgsfield.ai Visual Generation Panel */}
              <div className="mt-4 p-3.5 rounded-xl bg-gradient-to-r from-[#171822] via-[#1c1e29] to-[#14151d] border border-luxury-gold/25 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-luxury-gold animate-pulse" />
                    <span className="text-xs font-semibold text-luxury-ivory flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
                      Higgsfield.ai 8K Editorial Visual Engine
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleGenerateHiggsfieldVisual}
                      disabled={isGeneratingVisual}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-luxury-gold hover:bg-luxury-gold-light text-luxury-charcoal transition-all disabled:opacity-50 shadow-sm"
                    >
                      <Wand2 className={`w-3.5 h-3.5 ${isGeneratingVisual ? 'animate-spin' : ''}`} />
                      <span>{isGeneratingVisual ? 'Synthesizing Visual...' : 'Generate 8K Visual with Higgsfield'}</span>
                    </button>

                    <a
                      href="/higgsfield"
                      className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-[#1e202a] hover:bg-[#282a38] text-luxury-platinum border border-[#313545] transition-all flex items-center gap-1"
                    >
                      <span>Studio</span>
                      <ExternalLink className="w-3 h-3 text-luxury-gold" />
                    </a>
                  </div>
                </div>

                {visualStatus && (
                  <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{visualStatus}</span>
                  </div>
                )}
              </div>

              {/* Featured Image if exists */}
              {activeArticle.featuredImageUrl && (
                <div className="mt-4 rounded-xl overflow-hidden border border-[#2a2c3a] max-h-96 relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeArticle.featuredImageUrl}
                    alt={activeArticle.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/75 backdrop-blur-sm border border-white/10 text-[10px] text-luxury-gold font-mono">
                    Higgsfield.ai Visual Asset
                  </div>
                </div>
              )}

              {/* Rendered HTML Preview */}
              <div
                className={`mt-6 pt-6 border-t border-[#23252e] prose prose-invert max-w-none text-xs leading-relaxed text-luxury-platinum space-y-3 ${
                  activeArticle.language === 'ar' ? 'font-arabic text-right' : ''
                }`}
                dangerouslySetInnerHTML={{ __html: activeArticle.contentHtml }}
              />

              {/* Publish Actions: Port 3001 Storefront & Shopify */}
              <div className="mt-8 pt-4 border-t border-[#23252e] space-y-3">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-luxury-muted">
                    {activeArticle.status === 'PUBLISHED_STOREFRONT' ? (
                      <span className="text-luxury-gold flex items-center gap-1 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Approved & Live on Port 3001 Customer Storefront
                      </span>
                    ) : activeArticle.shopifyArticleId ? (
                      <span className="text-emerald-400 flex items-center gap-1 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Deployed as Shopify Draft ({activeArticle.shopifyArticleId})
                      </span>
                    ) : (
                      <span>Ready for Instant Approval & Publication to Port 3001 Storefront</span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setIsEditModalOpen(true)}
                      className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-semibold bg-[#22242c] hover:bg-[#2c2f3a] text-luxury-gold border border-luxury-gold/30 hover:border-luxury-gold transition-all shadow-sm"
                      title="Edit article content, translations & AI photography"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-luxury-gold" />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => setIsHistoryModalOpen(true)}
                      className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-semibold bg-[#22242c] hover:bg-[#2c2f3a] text-luxury-platinum border border-[#323644] hover:border-luxury-gold/50 transition-all shadow-sm"
                      title="Article revision history & single-click rollback"
                    >
                      <History className="w-3.5 h-3.5 text-luxury-gold" />
                      <span>History & Revert</span>
                    </button>

                    <button
                      onClick={handlePublishToStorefront}
                      disabled={isPublishingStorefront || !isPassed}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold bg-gradient-to-r from-luxury-gold to-luxury-gold-dark hover:from-luxury-gold-light hover:to-luxury-gold text-luxury-charcoal transition-all disabled:opacity-40 shadow-md"
                    >
                      <Sparkles className={`w-3.5 h-3.5 text-luxury-charcoal ${isPublishingStorefront ? 'animate-spin' : ''}`} />
                      <span>{isPublishingStorefront ? 'Publishing to Port 3001...' : '🌟 Approve & Publish to Port 3001'}</span>
                    </button>

                    <button
                      onClick={handleUnpublishFromStorefront}
                      disabled={isUnpublishing}
                      className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-semibold bg-red-950/40 hover:bg-red-900/40 text-red-300 border border-red-500/30 hover:border-red-400 transition-all disabled:opacity-40 shadow-sm"
                      title="Remove this article from Port 3001 storefront"
                    >
                      <Trash2 className={`w-3.5 h-3.5 text-red-400 ${isUnpublishing ? 'animate-spin' : ''}`} />
                      <span>{isUnpublishing ? 'Removing...' : 'Remove from 3001'}</span>
                    </button>

                    <button
                      onClick={handlePublish}
                      disabled={isPublishing || !isPassed}
                      className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-semibold bg-[#22242c] hover:bg-[#2c2f3a] text-luxury-platinum border border-[#323644] transition-all disabled:opacity-40 shadow-sm"
                    >
                      <Send className={`w-3.5 h-3.5 ${isPublishing ? 'animate-spin' : ''}`} />
                      <span>{isPublishing ? 'Saving Draft...' : 'Stage Shopify Draft'}</span>
                    </button>
                  </div>
                </div>

                {/* Port 3001 Storefront Confirmation Box */}
                {storefrontPublishResult && (
                  <div className={`p-3.5 rounded-xl border text-xs flex items-center justify-between gap-3 animate-fadeIn ${
                    storefrontPublishResult.success
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                      : 'bg-red-950/40 border-red-500/40 text-red-300'
                  }`}>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{storefrontPublishResult.message || (storefrontPublishResult.success ? 'Published to Port 3001!' : 'Publication error')}</span>
                    </div>

                    {storefrontPublishResult.publishedUrl && (
                      <a
                        href={storefrontPublishResult.publishedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-luxury-gold text-luxury-charcoal font-bold text-xs uppercase tracking-wider flex items-center gap-1 shadow shrink-0"
                      >
                        <span>View Live on 3001 ↗</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                )}
              </div>

              {publishMessage && (
                <div className="mt-3 p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs">
                  {publishMessage}
                </div>
              )}

              {unpublishMessage && (
                <div className="mt-3 p-3 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{unpublishMessage}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Quality Assessment & SEO Metadata Scorecard */}
          <div className="space-y-4">
            {/* Quality Gate Score Card */}
            <div className="p-5 rounded-xl bg-[#16171d] border border-[#23252e] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-sm text-luxury-ivory">Quality Gate Policy</h3>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    isPassed
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}
                >
                  {isPassed ? 'PASSED' : 'HOLD'}
                </span>
              </div>

              {/* Big Score Gauge */}
              <div className="p-4 rounded-lg bg-[#121318] border border-[#22242c] flex items-center justify-between">
                <div>
                  <span className="text-xs text-luxury-muted block">Composite Score</span>
                  <span className="text-3xl font-serif font-bold text-luxury-gold">
                    {activeArticle.qualityScore || 100}
                    <span className="text-xs text-luxury-muted font-normal"> / 100</span>
                  </span>
                </div>
                {(activeArticle.qualityScore || 100) >= 80 ? (
                  <ShieldCheck className="w-8 h-8 text-emerald-400" />
                ) : (
                  <ShieldAlert className="w-8 h-8 text-amber-400" />
                )}
              </div>

              {/* Breakdown metrics */}
              <div className="space-y-2 text-xs">
                {Object.entries(qaBreakdown).map(([key, item]: [string, any]) => (
                  <div key={key} className="p-2.5 rounded bg-[#121318] border border-[#20222a] space-y-1">
                    <div className="flex justify-between font-medium">
                      <span className="capitalize text-luxury-platinum">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="font-mono text-luxury-gold">{item?.score ?? 100}%</span>
                    </div>
                    <p className="text-[11px] text-luxury-muted">{item?.message || 'Verified compliant.'}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified In-Text Links Card */}
            <div className="p-5 rounded-xl bg-[#16171d] border border-[#23252e] space-y-3">
              <h3 className="font-serif font-bold text-sm text-luxury-ivory">Tracked Catalogue Links</h3>
              <div className="space-y-2 text-xs">
                {verifiedLinks.length > 0 ? (
                  verifiedLinks.map((link: any, idx: number) => (
                    <div key={idx} className="p-2.5 rounded bg-[#121318] border border-[#20222a] space-y-0.5">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>{link.productTitle}</span>
                      </div>
                      <a
                        href={link.targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-luxury-muted hover:text-luxury-gold truncate block font-mono"
                      >
                        {link.targetUrl}
                      </a>
                    </div>
                  ))
                ) : (
                  <p className="text-[11px] text-luxury-muted">No links injected yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="p-12 text-center rounded-xl bg-[#16171d] border border-[#23252e] space-y-4">
          <div className="w-12 h-12 rounded-xl bg-luxury-gold/15 text-luxury-gold flex items-center justify-center mx-auto">
            <FileText className="w-6 h-6" />
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h3 className="font-serif font-bold text-base text-luxury-ivory">No articles generated for this store yet</h3>
            <p className="text-xs text-luxury-muted">
              Select English or Arabic above to synthesize a luxury bridal jewelry guide verified against live catalogue items.
            </p>
          </div>
          <button
            onClick={() => handleGenerate(language)}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-luxury-gold hover:bg-luxury-gold-light text-luxury-charcoal transition-all shadow-sm"
          >
            Generate First Article
          </button>
        </div>
      )}
      {activeArticle && (
        <>
          <ArticleEditModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            article={activeArticle}
            onSaved={(updated) => {
              updateArticle(updated);
            }}
          />

          <ArticleHistoryModal
            isOpen={isHistoryModalOpen}
            onClose={() => setIsHistoryModalOpen(false)}
            article={activeArticle}
            onReverted={(reverted) => {
              updateArticle(reverted);
            }}
            onUnpublished={(unpub) => {
              updateArticle({ ...unpub, status: 'APPROVED' });
            }}
          />
        </>
      )}
    </div>
  );
}
