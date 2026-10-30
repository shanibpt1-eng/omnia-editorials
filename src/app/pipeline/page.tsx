'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/context';
import {
  Sparkles,
  Play,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Send,
  Newspaper,
  Image as ImageIcon,
  Cpu,
  ShieldCheck,
  Bell,
  RefreshCw,
  Clock,
  Layers,
  Edit3,
  History,
  Maximize2,
  X,
} from 'lucide-react';
import { ArticleEditModal } from '@/components/ArticleEditModal';
import { ArticleHistoryModal } from '@/components/ArticleHistoryModal';

export default function PipelinePage() {
  const { activeStoreId, language, setLanguage, publishToStorefront, runDailyBlogAutomation, updateArticle } = useStore();
  const [isRunning, setIsRunning] = useState(false);
  const [pipelineData, setPipelineData] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [isDailyRunning, setIsDailyRunning] = useState(false);
  const [dailyRunResult, setDailyRunResult] = useState<any | null>(null);

  const [isPublishingStorefront, setIsPublishingStorefront] = useState(false);
  const [storefrontPublishResult, setStorefrontPublishResult] = useState<any | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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

  const handlePublishPipelineToStorefront = async () => {
    if (!pipelineData?.article) return;
    setIsPublishingStorefront(true);
    setStorefrontPublishResult(null);
    try {
      const res = await publishToStorefront(pipelineData.article);
      setStorefrontPublishResult(res);
    } catch (err: any) {
      setStorefrontPublishResult({ success: false, error: err.message });
    } finally {
      setIsPublishingStorefront(false);
    }
  };

  const handleRunPipeline = async () => {
    setIsRunning(true);
    setErrorMsg(null);
    try {
      const res = await fetch('/api/pipeline/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeId: activeStoreId,
          language,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Pipeline execution failed');
      setPipelineData(data);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-luxury-gold/20 text-luxury-gold border border-luxury-gold/40">
              Autonomous Orchestration
            </span>
            <span className="text-xs text-luxury-muted">Make • NewsData.io • AI Writer • Higgsfield • Telegram</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-luxury-ivory mt-1">
            End-to-End Growth Pipeline
          </h1>
          <p className="text-xs text-luxury-muted">
            Monitors GCC bridal news trends, synthesizes SEO guides with verified Omnia catalogue items, generates Higgsfield visuals, validates quality, and alerts via Telegram.
          </p>
        </div>

        {/* Trigger Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleRunDaily}
            disabled={isDailyRunning}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-xs font-bold bg-gradient-to-r from-amber-500 to-luxury-gold hover:from-amber-400 hover:to-luxury-gold-light text-luxury-charcoal shadow-md transition-all disabled:opacity-50 shrink-0"
          >
            <Sparkles className={`w-4 h-4 text-luxury-charcoal ${isDailyRunning ? 'animate-spin' : ''}`} />
            <span>{isDailyRunning ? 'Running Daily Automation...' : '⚡ Daily Blog Automation (Auto-Publish to 3001)'}</span>
          </button>

          <button
            onClick={handleRunPipeline}
            disabled={isRunning}
            className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-xs font-semibold bg-[#22242c] hover:bg-[#2c2f3a] text-luxury-platinum border border-[#323644] shadow-md transition-all disabled:opacity-50 shrink-0"
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-luxury-gold" />
                <span>Executing Pipeline Sequence...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current text-luxury-gold" />
                <span>Trigger Full Pipeline</span>
              </>
            )}
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
              <span>Daily Blog Automation Completed & Connected!</span>
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

      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Live Pipeline Flow Diagram */}
      <div className="p-5 rounded-xl bg-[#16171d] border border-[#23252e]">
        <h3 className="font-serif font-bold text-sm text-luxury-ivory mb-4">Pipeline Orchestration Map</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {[
            { step: '1. Research', label: 'NewsData.io', icon: Newspaper, desc: 'GCC Bridal Trends' },
            { step: '2. Visuals', label: 'Higgsfield AI', icon: ImageIcon, desc: 'Editorial Banners' },
            { step: '3. Writer', label: 'Bilingual AI', icon: Cpu, desc: '925 Silver Grounding' },
            { step: '4. Quality', label: 'Policy Engine', icon: ShieldCheck, desc: '5-Point Gates' },
            { step: '5. Shopify', label: 'GraphQL Staging', icon: Layers, desc: 'Draft Isolation' },
            { step: '6. Alerts', label: 'Telegram Bot', icon: Bell, desc: 'Instant Dispatch' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-3 rounded-lg bg-[#121318] border border-[#20222a] text-center space-y-1 relative"
              >
                <div className="w-8 h-8 rounded-full bg-luxury-gold/15 text-luxury-gold flex items-center justify-center mx-auto mb-2">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="block text-[10px] font-mono text-luxury-gold uppercase font-bold">{item.step}</span>
                <h4 className="text-xs font-semibold text-luxury-platinum">{item.label}</h4>
                <p className="text-[10px] text-luxury-muted">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Execution Results View */}
      {pipelineData && (
        <div className="space-y-6">
          {/* Summary Banner */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-[#181920] to-[#14151b] border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-luxury-ivory">Pipeline Executed Successfully</h3>
                <p className="text-xs text-luxury-muted">
                  Execution ID: <span className="font-mono text-luxury-platinum">{pipelineData.executionId}</span> • Total Latency:{' '}
                  <span className="font-mono text-luxury-gold">{pipelineData.totalDurationMs}ms</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                All 6 Stages Completed
              </span>
            </div>
          </div>

          {/* Steps Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pipelineData.steps.map((step: any, idx: number) => (
              <div key={idx} className="p-4 rounded-xl bg-[#16171d] border border-[#23252e] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-luxury-platinum">{step.name}</span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-bold">
                    {step.status}
                  </span>
                </div>
                <div className="text-xs text-luxury-muted font-mono flex justify-between">
                  <span>Latency: {step.latencyMs}ms</span>
                </div>
                {step.data?.topic && (
                  <p className="text-xs text-luxury-muted line-clamp-2 italic pt-1 border-t border-[#23252e]">
                    &quot;{step.data.topic}&quot;
                  </p>
                )}
                {step.data?.imageUrl && (
                  <div className="pt-2">
                    <div
                      onClick={() => setPreviewImage(step.data.imageUrl)}
                      className="group relative w-full aspect-[16/10] sm:aspect-video rounded-lg overflow-hidden border border-[#2c2f3a] bg-gradient-to-b from-[#181a24] to-[#0c0d12] flex items-center justify-center cursor-pointer transition-all hover:border-luxury-gold/50 shadow-inner"
                      title="Click to expand high-resolution asset"
                    >
                      <img
                        src={step.data.imageUrl}
                        alt="Higgsfield Generated Visual"
                        className="w-full h-full object-contain p-1 transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                      {/* Top luxury badge */}
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[9px] font-mono text-luxury-gold border border-luxury-gold/30 flex items-center gap-1 shadow">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Higgsfield 8K</span>
                      </div>

                      {/* Hover action overlay */}
                      <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <span className="px-2.5 py-1.5 rounded-lg bg-black/85 border border-luxury-gold/50 text-[11px] font-mono text-luxury-gold flex items-center gap-1.5 shadow-xl font-semibold">
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>View Full Master</span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                {step.data?.shopifyArticleId && (
                  <div className="pt-1 text-[11px] font-mono text-emerald-400 flex items-center justify-between">
                    <span>Draft: {step.data.shopifyArticleId.split('/').pop()}</span>
                    <a
                      href={step.data.draftUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-luxury-gold hover:underline flex items-center gap-1"
                    >
                      Staging <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Generated Article Preview Card */}
          <div className="p-6 rounded-xl bg-[#16171d] border border-[#23252e] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#23252e]">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-luxury-gold">
                  Generated Article & Staging Preview
                </span>
                <h3 className="font-serif font-bold text-lg text-luxury-ivory">{pipelineData.article.title}</h3>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="text-right mr-1">
                  <span className="text-[10px] text-luxury-muted block">Quality Score</span>
                  <span className="text-lg font-serif font-bold text-luxury-gold">
                    {pipelineData.article.qualityScore}/100
                  </span>
                </div>

                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#22242c] hover:bg-[#2c2f3a] text-luxury-gold border border-luxury-gold/30 hover:border-luxury-gold transition-all shadow-sm"
                  title="Edit generated draft before or after publishing"
                >
                  <Edit3 className="w-3.5 h-3.5 text-luxury-gold" />
                  <span>Edit Draft</span>
                </button>

                <button
                  onClick={() => setIsHistoryModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#22242c] hover:bg-[#2c2f3a] text-luxury-platinum border border-[#323644] hover:border-luxury-gold/50 transition-all shadow-sm"
                  title="Article revision history & rollback"
                >
                  <History className="w-3.5 h-3.5 text-luxury-gold" />
                  <span>History & Revert</span>
                </button>

                <button
                  onClick={handlePublishPipelineToStorefront}
                  disabled={isPublishingStorefront}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-luxury-gold to-luxury-gold-dark hover:from-luxury-gold-light hover:to-luxury-gold text-luxury-charcoal shadow-md transition-all disabled:opacity-50"
                >
                  <Sparkles className={`w-3.5 h-3.5 text-luxury-charcoal ${isPublishingStorefront ? 'animate-spin' : ''}`} />
                  <span>{isPublishingStorefront ? 'Publishing to 3001...' : '🌟 Approve & Publish to Port 3001'}</span>
                </button>
              </div>
            </div>

            {/* Storefront Publish Feedback */}
            {storefrontPublishResult && (
              <div className={`p-3.5 rounded-xl border text-xs flex items-center justify-between gap-3 animate-fadeIn ${
                storefrontPublishResult.success
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  : 'bg-red-950/40 border-red-500/40 text-red-300'
              }`}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{storefrontPublishResult.message || (storefrontPublishResult.success ? 'Approved & Published to Port 3001 Storefront!' : 'Publication error')}</span>
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

            {/* Featured Hero Banner if present */}
            {pipelineData.article?.featuredImageUrl && (
              <div
                onClick={() => setPreviewImage(pipelineData.article.featuredImageUrl)}
                className="rounded-xl overflow-hidden border border-[#2a2c3a] bg-[#0c0d12] max-h-96 relative group shadow-lg cursor-pointer flex items-center justify-center"
                title="Click to view full master"
              >
                <img
                  src={pipelineData.article.featuredImageUrl}
                  alt={pipelineData.article.title}
                  className="w-full max-h-88 object-contain sm:object-cover object-top transition-transform duration-300 group-hover:scale-[1.01]"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[10px] text-luxury-gold font-mono flex items-center gap-1.5 shadow">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Higgsfield.ai 8K Editorial Asset</span>
                </div>
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-luxury-gold/40 text-[10px] text-luxury-platinum font-mono opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 shadow">
                  <Maximize2 className="w-3 h-3 text-luxury-gold" />
                  <span>Click to Expand</span>
                </div>
              </div>
            )}

            <div
              className={`prose prose-invert max-w-none text-xs leading-relaxed text-luxury-platinum space-y-3 ${
                pipelineData.language === 'ar' ? 'font-arabic text-right' : ''
              }`}
              dangerouslySetInnerHTML={{ __html: pipelineData.article.contentHtml }}
            />
          </div>

          <ArticleEditModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            article={pipelineData.article}
            onSaved={(updated) => {
              updateArticle(updated);
              setPipelineData((prev: any) => ({
                ...prev,
                article: {
                  ...prev.article,
                  ...updated,
                },
              }));
            }}
          />

          <ArticleHistoryModal
            isOpen={isHistoryModalOpen}
            onClose={() => setIsHistoryModalOpen(false)}
            article={pipelineData.article}
            onReverted={(reverted) => {
              updateArticle(reverted);
              setPipelineData((prev: any) => ({
                ...prev,
                article: {
                  ...prev.article,
                  ...reverted,
                },
              }));
            }}
            onUnpublished={(unpub) => {
              updateArticle({ ...unpub, status: 'APPROVED' });
              setStorefrontPublishResult(null);
            }}
          />

          {/* Lightbox Modal for Higgsfield Full Master Visual */}
          {previewImage && (
            <div
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
              onClick={() => setPreviewImage(null)}
            >
              <div
                className="relative max-w-5xl w-full bg-[#121319] border border-luxury-gold/40 rounded-2xl overflow-hidden shadow-2xl space-y-4 p-5"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#23252e]">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-luxury-gold/20 text-luxury-gold border border-luxury-gold/40 text-[10px] font-mono uppercase font-bold">
                      Higgsfield.ai 8K Neural Visual
                    </span>
                    <span className="text-xs text-luxury-muted font-mono hidden sm:inline">Uncropped Full-Scale Luxury Asset</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={previewImage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-[#1f212a] hover:bg-[#282a36] text-luxury-platinum text-xs font-mono flex items-center gap-1.5 border border-[#323644] transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-luxury-gold" />
                      <span>Open Master</span>
                    </a>
                    <button
                      onClick={() => setPreviewImage(null)}
                      className="p-1.5 rounded-lg bg-[#1f212a] hover:bg-[#282a36] text-luxury-muted hover:text-white transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Full Visual Container */}
                <div className="w-full max-h-[75vh] flex items-center justify-center overflow-hidden rounded-xl bg-black/70 border border-[#23252e] p-2">
                  <img
                    src={previewImage}
                    alt="Higgsfield Master Visual"
                    className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
                  />
                </div>

                {/* Footer specs */}
                <div className="flex flex-wrap items-center justify-between text-xs text-luxury-muted font-mono pt-1">
                  <span>Aspect: Complete Editorial Standard • Uncropped</span>
                  <span className="text-emerald-400">Status: Verified & Staged for Storefront</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
