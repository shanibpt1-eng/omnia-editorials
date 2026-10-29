'use client';

import React, { useState } from 'react';
import { Settings, ShieldCheck, Key, Lock, CheckCircle2, AlertCircle, Bell, Send, RefreshCw } from 'lucide-react';

export default function SettingsPage() {
  const [testingTelegram, setTestingTelegram] = useState(false);
  const [telegramStatus, setTelegramStatus] = useState<string | null>(null);
  const [testingHiggsfield, setTestingHiggsfield] = useState(false);
  const [higgsfieldStatus, setHiggsfieldStatus] = useState<string | null>(null);

  const handleTestTelegram = async () => {
    setTestingTelegram(true);
    setTelegramStatus(null);
    try {
      const res = await fetch('/api/telegram/test', { method: 'POST' });
      const data = await res.json();
      setTelegramStatus(data.status || 'Test notification dispatched successfully!');
    } catch (err: any) {
      setTelegramStatus(`Error testing Telegram: ${err.message}`);
    } finally {
      setTestingTelegram(false);
    }
  };

  const handleTestHiggsfield = async () => {
    setTestingHiggsfield(true);
    setHiggsfieldStatus(null);
    try {
      const res = await fetch('/api/higgsfield/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: 'Omnia Stores 925 sterling silver bridal suite studio connection probe',
          mode: 'image',
          aspectRatio: '16:9',
        }),
      });
      const data = await res.json();
      if (data.success) {
        setHiggsfieldStatus(
          `Higgsfield AI connection verified! Generated asset: ${data.result.id} (${data.result.status})`
        );
      } else {
        setHiggsfieldStatus(`Higgsfield notice: ${data.error}`);
      }
    } catch (err: any) {
      setHiggsfieldStatus(`Error probing Higgsfield: ${err.message}`);
    } finally {
      setTestingHiggsfield(false);
    }
  };

  const envServices = [
    {
      service: 'Telegram Instant Notification Bot',
      keys: ['TELEGRAM_BOT_TOKEN', 'TELEGRAM_CHAT_ID'],
      status: 'ACTIVE_DISPATCHER',
      recommendation: 'Configure your Telegram Bot token and channel Chat ID in .env.local for instant publication and policy alerts.',
      action: (
        <button
          onClick={handleTestTelegram}
          disabled={testingTelegram}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-luxury-gold hover:bg-luxury-gold-light text-luxury-charcoal transition-all disabled:opacity-50 shadow-sm"
        >
          <Bell className={`w-3.5 h-3.5 ${testingTelegram ? 'animate-bounce' : ''}`} />
          <span>{testingTelegram ? 'Dispatching...' : 'Send Test Telegram Alert'}</span>
        </button>
      ),
    },
    {
      service: 'NewsData.io Research & Trends Hub',
      keys: ['NEWSDATA_API_KEY'],
      status: 'GCC_STREAM_ACTIVE',
      recommendation: 'Powers automated discovery of trending bridal, jewelry, and wedding lifestyle news in UAE & Saudi Arabia.',
    },
    {
      service: 'Higgsfield AI Visual Engine',
      keys: ['HIGGSFIELD_API_KEY'],
      status: 'EDITORIAL_STUDIO_ACTIVE',
      recommendation: 'Synthesizes photorealistic luxury 925 sterling silver bridal jewelry editorial visuals for generated articles.',
      action: (
        <div className="flex items-center gap-2">
          <button
            onClick={handleTestHiggsfield}
            disabled={testingHiggsfield}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-luxury-gold hover:bg-luxury-gold-light text-luxury-charcoal transition-all disabled:opacity-50 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${testingHiggsfield ? 'animate-spin' : ''}`} />
            <span>{testingHiggsfield ? 'Testing...' : 'Test Higgsfield Probe'}</span>
          </button>
          <a
            href="/higgsfield"
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#22242e] hover:bg-[#2c2f3d] text-luxury-platinum border border-[#34384a] transition-all"
          >
            Open Studio
          </a>
        </div>
      ),
    },
    {
      service: 'Shopify Store 1 (Global .com)',
      keys: ['SHOPIFY_COM_SHOP_DOMAIN', 'SHOPIFY_COM_ACCESS_TOKEN'],
      status: 'VERIFIED_CACHE_ACTIVE',
      recommendation: 'Configure production Admin API access token in .env.local to enable live remote synchronization.',
    },
    {
      service: 'Shopify Store 2 (UAE / GCC .ae)',
      keys: ['SHOPIFY_AE_SHOP_DOMAIN', 'SHOPIFY_AE_ACCESS_TOKEN'],
      status: 'VERIFIED_CACHE_ACTIVE',
      recommendation: 'Configure production Admin API access token in .env.local for Arabic storefront draft creation.',
    },
    {
      service: 'AI Generation Engine',
      keys: ['OPENAI_API_KEY', 'OPENAI_MODEL'],
      status: 'LOCAL_HIGH_PRECISION_DRIVER',
      recommendation: 'Set OPENAI_API_KEY in .env.local for dynamic GPT-4o topic synthesis.',
    },
    {
      service: 'Make (Integromat) Webhook Hub',
      keys: ['MAKE_WEBHOOK_SECRET'],
      status: 'HMAC_VERIFICATION_ACTIVE',
      recommendation: 'Provide shared secret to validate HMAC signatures on incoming trigger webhooks.',
    },
    {
      service: 'Supabase PostgreSQL & Auth',
      keys: ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_ROLE_KEY'],
      status: 'SCHEMA_MIGRATION_READY',
      recommendation: 'PostgreSQL migration file generated at supabase/migrations/001_initial_schema.sql.',
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-serif font-bold text-luxury-ivory">Platform Security & Integrations Health</h1>
        <p className="text-xs text-luxury-muted mt-1">
          Zero-Secret Architecture: Secret tokens are resolved exclusively on the server side and never transmitted to client browsers.
        </p>
      </div>

      {telegramStatus && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{telegramStatus}</span>
        </div>
      )}

      {higgsfieldStatus && (
        <div className="p-4 rounded-xl bg-amber-950/40 border border-luxury-gold/40 text-luxury-gold-light text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-luxury-gold shrink-0" />
          <span>{higgsfieldStatus}</span>
        </div>
      )}

      <div className="space-y-4">
        {envServices.map((srv, idx) => (
          <div key={idx} className="p-5 rounded-xl bg-[#16171d] border border-[#23252e] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-luxury-gold" />
                <h3 className="font-serif font-bold text-base text-luxury-ivory">{srv.service}</h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-luxury-gold/15 text-luxury-gold border border-luxury-gold/30">
                  {srv.status}
                </span>
                {srv.action}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-luxury-muted">Environment variables:</span>
              <div className="flex gap-1.5 flex-wrap">
                {srv.keys.map((k) => (
                  <span key={k} className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#121318] border border-[#23252e] text-luxury-platinum">
                    {k}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-xs text-luxury-muted pt-1 border-t border-[#23252e]">
              {srv.recommendation}
            </p>
          </div>
        ))}
      </div>

      {/* Make.com Blueprints Card */}
      <div className="p-6 rounded-xl bg-gradient-to-br from-[#16171d] to-[#1a1b24] border border-luxury-gold/30 space-y-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-luxury-gold/15 flex items-center justify-center text-luxury-gold">
              <RefreshCw className="w-5 h-5 text-luxury-gold" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-luxury-ivory">Make.com Automation Blueprints</h2>
              <p className="text-xs text-luxury-muted">Pre-configured scenarios ready to import into your Make.com workspace.</p>
            </div>
          </div>
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            Export Ready
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-lg bg-[#121318] border border-[#23252e] space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="font-semibold text-sm text-luxury-ivory">1. GCC News Summarizer to Telegram</h4>
              <p className="text-xs text-luxury-muted mt-1">
                Fetches NewsData.io retail/ecommerce trends, prompts OpenAI GPT-4o-mini with luxury jewelry focus, and sends HTML alerts to your Telegram chat.
              </p>
            </div>
            <a
              href="/api/make/export?type=news_summarizer"
              download="omnia_news_to_telegram_mapped.json"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-[#23252e] hover:bg-[#2c2f3b] text-luxury-ivory border border-[#343746] transition-all"
            >
              <Send className="w-3.5 h-3.5 text-luxury-gold" />
              <span>Download News Summarizer Blueprint (.json)</span>
            </a>
          </div>

          <div className="p-4 rounded-lg bg-[#121318] border border-[#23252e] space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="font-semibold text-sm text-luxury-ivory">2. Autonomous Pipeline Auto-Pilot</h4>
              <p className="text-xs text-luxury-muted mt-1">
                Triggers the complete Omnia growth engine on a daily cron schedule: NewsData + Higgsfield + AI Writer + Quality Gate + Supabase + Telegram.
              </p>
            </div>
            <a
              href="/api/make/export?type=trigger"
              download="omnia_autonomous_growth_engine_trigger.json"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-luxury-gold hover:bg-luxury-gold-light text-luxury-charcoal transition-all font-bold shadow-sm"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Download Auto-Pilot Trigger Blueprint (.json)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
