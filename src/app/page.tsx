'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store/context';
import {
  Gem,
  BookOpen,
  ShieldCheck,
  TicketPercent,
  Link2,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Play,
  Layers,
} from 'lucide-react';

export default function OverviewPage() {
  const {
    activeStoreId,
    products,
    articles,
    discounts,
    backlinks,
    automationRuns,
    generateNewArticle,
    publishArticleDraft,
    language,
  } = useStore();

  const [isGeneratingSlice, setIsGeneratingSlice] = useState(false);
  const [sliceResult, setSliceResult] = useState<string | null>(null);

  const isArabic = language === 'ar';

  const handleRunFirstVerticalSlice = async () => {
    setIsGeneratingSlice(true);
    setSliceResult(null);
    try {
      // 1. Generate bilingual article with live catalogue links
      const article = await generateNewArticle(language);
      // 2. Publish draft to Shopify pipeline
      const draftRes = await publishArticleDraft(article.id);
      setSliceResult(
        `Vertical Slice Complete: Created article "${article.title}" with Quality Score ${article.qualityScore}/100 and deployed draft to ${activeStoreId} Shopify pipeline!`
      );
    } catch (err: any) {
      setSliceResult(`Vertical slice execution notice: ${err.message}`);
    } finally {
      setIsGeneratingSlice(false);
    }
  };

  const pendingDiscounts = discounts.filter((d) => d.approvalStatus === 'PROPOSAL').length;
  const passedArticles = articles.filter((a) => a.qualityScore >= 80).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner: First Vertical Slice Showcase */}
      <div className="p-6 rounded-xl bg-gradient-to-r from-[#181920] via-[#1e1f2b] to-[#181920] border border-luxury-gold/30 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-gold/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-luxury-gold/20 text-luxury-gold border border-luxury-gold/40">
                Phase 1 & 2 Active
              </span>
              <span className="text-xs text-luxury-muted">Verified Luxury Jewellery Engine</span>
            </div>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-luxury-ivory">
              Omnia Stores Autonomous AI Growth Platform
            </h2>
            <p className="text-xs text-luxury-muted max-w-2xl">
              Targeting <strong className="text-luxury-platinum">{activeStoreId === 'OMNIA_COM' ? 'omniastores.com (Global)' : 'omniastores.ae (UAE & GCC)'}</strong>.
              Seamlessly synchronizing verified sterling silver catalogue items into quality-gated bilingual guides and automated Shopify drafts.
            </p>
          </div>

          <button
            onClick={handleRunFirstVerticalSlice}
            disabled={isGeneratingSlice}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-luxury-gold to-luxury-gold-dark hover:from-luxury-gold-light hover:to-luxury-gold text-luxury-charcoal shadow-md transition-all disabled:opacity-50 shrink-0"
          >
            <Sparkles className={`w-4 h-4 ${isGeneratingSlice ? 'animate-spin' : ''}`} />
            <span>{isGeneratingSlice ? 'Executing Vertical Slice...' : 'Run First Vertical Slice'}</span>
          </button>
        </div>

        {sliceResult && (
          <div className="mt-4 p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{sliceResult}</span>
          </div>
        )}
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Products in Catalogue */}
        <div className="p-5 rounded-xl bg-[#16171d] border border-[#23252e] hover:border-luxury-gold/40 transition-colors">
          <div className="flex items-center justify-between text-luxury-muted">
            <span className="text-xs font-medium uppercase tracking-wider">Verified Products</span>
            <Gem className="w-4 h-4 text-luxury-gold" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-luxury-ivory">{products.length}</span>
            <span className="text-xs text-emerald-400 font-medium">925 Silver Verified</span>
          </div>
          <p className="mt-1 text-[11px] text-luxury-muted">
            Synchronized with {activeStoreId} store
          </p>
        </div>

        {/* Generated Articles */}
        <div className="p-5 rounded-xl bg-[#16171d] border border-[#23252e] hover:border-luxury-gold/40 transition-colors">
          <div className="flex items-center justify-between text-luxury-muted">
            <span className="text-xs font-medium uppercase tracking-wider">Content Studio</span>
            <BookOpen className="w-4 h-4 text-luxury-gold" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-luxury-ivory">{articles.length}</span>
            <span className="text-xs text-luxury-gold font-medium">
              {passedArticles} Quality Passed
            </span>
          </div>
          <p className="mt-1 text-[11px] text-luxury-muted">
            Bilingual SEO & bridal buying guides
          </p>
        </div>

        {/* Voucher Guardrails */}
        <div className="p-5 rounded-xl bg-[#16171d] border border-[#23252e] hover:border-luxury-gold/40 transition-colors">
          <div className="flex items-center justify-between text-luxury-muted">
            <span className="text-xs font-medium uppercase tracking-wider">Voucher Approval</span>
            <TicketPercent className="w-4 h-4 text-luxury-gold" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-luxury-ivory">{discounts.length}</span>
            {pendingDiscounts > 0 ? (
              <span className="text-xs text-amber-400 font-medium">{pendingDiscounts} Needs Approval</span>
            ) : (
              <span className="text-xs text-emerald-400 font-medium">All Clean</span>
            )}
          </div>
          <p className="mt-1 text-[11px] text-luxury-muted">
            Margin safety rules enforced
          </p>
        </div>

        {/* Backlinks & PR */}
        <div className="p-5 rounded-xl bg-[#16171d] border border-[#23252e] hover:border-luxury-gold/40 transition-colors">
          <div className="flex items-center justify-between text-luxury-muted">
            <span className="text-xs font-medium uppercase tracking-wider">Backlink CRM</span>
            <Link2 className="w-4 h-4 text-luxury-gold" />
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-serif text-luxury-ivory">{backlinks.length}</span>
            <span className="text-xs text-luxury-platinum font-medium">High Authority</span>
          </div>
          <p className="mt-1 text-[11px] text-luxury-muted">
            Bridal magazines & luxury editors
          </p>
        </div>
      </div>

      {/* Main Grid: Storefront Synchronization & Automation Runs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Quick Access & Active Catalogue */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Storefront Live Products Preview */}
          <div className="p-5 rounded-xl bg-[#16171d] border border-[#23252e]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif font-bold text-base text-luxury-ivory">
                  Active Catalogue: {activeStoreId === 'OMNIA_COM' ? 'Omnia Stores (.com)' : 'Omnia Stores (.ae)'}
                </h3>
                <p className="text-xs text-luxury-muted">
                  Verified 925 sterling silver products currently eligible for AI internal linking
                </p>
              </div>
              <Link
                href="/products"
                className="text-xs font-semibold text-luxury-gold hover:text-luxury-gold-light flex items-center gap-1"
              >
                View All <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-[#23252e]">
              {products.slice(0, 3).map((prod) => (
                <div key={prod.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#22242c] border border-[#2c2f3a] flex items-center justify-center text-luxury-gold">
                      <Gem className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-luxury-platinum line-clamp-1">{prod.title}</h4>
                      <p className="text-[11px] text-luxury-muted">
                        {prod.material} • {prod.stoneType} • SKU: {prod.handle}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold font-mono text-luxury-gold">
                      {prod.minPrice} {prod.currency}
                    </span>
                    <span className="block text-[10px] text-emerald-400">In Stock</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Feature Workflows */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/content-studio"
              className="p-5 rounded-xl bg-[#16171d] border border-[#23252e] hover:border-luxury-gold/40 transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-luxury-gold/15 text-luxury-gold flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-sm text-luxury-ivory">Content Studio</h4>
              <p className="mt-1 text-xs text-luxury-muted">
                Generate high-scoring bilingual articles, inspect fact-checking metrics, and publish directly to Shopify.
              </p>
            </Link>

            <Link
              href="/discounts"
              className="p-5 rounded-xl bg-[#16171d] border border-[#23252e] hover:border-luxury-gold/40 transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                <TicketPercent className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-sm text-luxury-ivory">Discounts & Vouchers</h4>
              <p className="mt-1 text-xs text-luxury-muted">
                Safely propose, review, and approve discount codes with strict margin protection and Shopify sync.
              </p>
            </Link>
          </div>
        </div>

        {/* Right Column: Real-Time Automation Runs Log */}
        <div className="p-5 rounded-xl bg-[#16171d] border border-[#23252e] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif font-bold text-base text-luxury-ivory">Recent Automation Runs</h3>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto">
            {automationRuns.slice(0, 6).map((run) => (
              <div key={run.id} className="p-3 rounded-lg bg-[#121318] border border-[#20222a] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-luxury-platinum">{run.taskName}</span>
                  <span
                    className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-bold ${
                      run.status === 'COMPLETED'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : run.status === 'HELD_BY_POLICY'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {run.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-luxury-muted">
                  <span>Processed: {run.itemsProcessed} item(s)</span>
                  <span>{run.durationMs}ms</span>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/automation-runs"
            className="mt-4 pt-3 border-t border-[#23252e] text-center text-xs font-semibold text-luxury-gold hover:text-luxury-gold-light"
          >
            View Complete Audit Log →
          </Link>
        </div>
      </div>
    </div>
  );
}
