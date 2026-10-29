'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/context';
import { shopifyClient, ConnectionTestResult } from '@/lib/shopify/client';
import { Store, ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, Key, ExternalLink } from 'lucide-react';

export default function StoresPage() {
  const { activeStoreId, setActiveStoreId } = useStore();
  const [testingStore, setTestingStore] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, ConnectionTestResult>>({});

  const handleTestConnection = async (storeId: 'OMNIA_COM' | 'OMNIA_AE') => {
    setTestingStore(storeId);
    try {
      const res = await shopifyClient.testConnection(storeId);
      setTestResults((prev) => ({ ...prev, [storeId]: res }));
    } finally {
      setTestingStore(null);
    }
  };

  const storeConfigs = [
    {
      id: 'OMNIA_COM' as const,
      name: 'Omnia Stores Global',
      domain: 'omniastores.com',
      shopDomain: process.env.NEXT_PUBLIC_SHOPIFY_COM_DOMAIN || 'omniastores.myshopify.com',
      market: 'US, UK, GCC & International',
      currency: 'USD ($)',
      defaultLang: 'English (en)',
      envPrefix: 'SHOPIFY_COM_*',
    },
    {
      id: 'OMNIA_AE' as const,
      name: 'Omnia Stores UAE & GCC',
      domain: 'omniastores.ae',
      shopDomain: process.env.NEXT_PUBLIC_SHOPIFY_AE_DOMAIN || 'omniastores-ae.myshopify.com',
      market: 'United Arab Emirates, Saudi Arabia, GCC',
      currency: 'AED (د.إ)',
      defaultLang: 'Arabic (ar) / English',
      envPrefix: 'SHOPIFY_AE_*',
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-serif font-bold text-luxury-ivory">Multi-Store Shopify Connections</h1>
        <p className="text-xs text-luxury-muted mt-1">
          Independent configuration, least-privilege GraphQL scopes, and safety isolation between Omnia.com and Omnia.ae.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {storeConfigs.map((cfg) => {
          const isSelected = activeStoreId === cfg.id;
          const testRes = testResults[cfg.id];
          const isTesting = testingStore === cfg.id;

          return (
            <div
              key={cfg.id}
              className={`p-6 rounded-xl bg-[#16171d] border transition-all ${
                isSelected ? 'border-luxury-gold shadow-lg shadow-luxury-gold/5' : 'border-[#23252e]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-luxury-gold/15 text-luxury-gold flex items-center justify-center font-bold">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-luxury-ivory">{cfg.name}</h3>
                    <a
                      href={`https://${cfg.domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-luxury-gold hover:underline flex items-center gap-1"
                    >
                      {cfg.domain} <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => setActiveStoreId(cfg.id)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md border ${
                    isSelected
                      ? 'bg-luxury-gold/20 text-luxury-gold border-luxury-gold/40'
                      : 'bg-[#22242c] text-luxury-muted border-[#2c2f3a] hover:text-luxury-ivory'
                  }`}
                >
                  {isSelected ? 'Active Context' : 'Select'}
                </button>
              </div>

              <div className="mt-5 space-y-2.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-[#23252e]">
                  <span className="text-luxury-muted">Shopify Domain:</span>
                  <span className="font-mono text-luxury-platinum">{cfg.shopDomain}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#23252e]">
                  <span className="text-luxury-muted">Target Market:</span>
                  <span className="text-luxury-platinum">{cfg.market}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#23252e]">
                  <span className="text-luxury-muted">Default Currency:</span>
                  <span className="font-semibold text-luxury-gold">{cfg.currency}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#23252e]">
                  <span className="text-luxury-muted">Primary Language:</span>
                  <span className="text-luxury-platinum">{cfg.defaultLang}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#23252e]">
                  <span className="text-luxury-muted">Environment Keys:</span>
                  <span className="font-mono text-[11px] text-luxury-gold">{cfg.envPrefix}</span>
                </div>
              </div>

              {/* Connection Test Action */}
              <div className="mt-6 pt-4 border-t border-[#23252e] flex flex-col gap-3">
                <button
                  onClick={() => handleTestConnection(cfg.id)}
                  disabled={isTesting}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-xs font-semibold bg-[#22242c] hover:bg-[#2c2f3a] text-luxury-platinum border border-[#323644] transition-all disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin text-luxury-gold' : ''}`} />
                  <span>{isTesting ? 'Testing GraphQL Handshake...' : 'Test Connection & Scopes'}</span>
                </button>

                {testRes && (
                  <div
                    className={`p-3 rounded-lg text-xs flex items-start gap-2 ${
                      testRes.isConnected
                        ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-300'
                        : 'bg-amber-950/30 border border-amber-500/30 text-amber-300'
                    }`}
                  >
                    {testRes.isConnected ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-semibold">{testRes.message}</p>
                      {testRes.isConnected && (
                        <p className="text-[11px] text-emerald-400/80 mt-1">
                          Latency: {testRes.latencyMs}ms • Scopes: {testRes.scopes.join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
