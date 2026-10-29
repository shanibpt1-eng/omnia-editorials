'use client';

import React from 'react';
import { useStore } from '@/lib/store/context';
import { RefreshCw, Globe, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

export function Header() {
  const { activeStoreId, setActiveStoreId, language, setLanguage, isSyncing, syncStoreCatalogue, products } = useStore();

  const isArabic = language === 'ar';

  return (
    <header className="h-16 border-b border-[#23252e] bg-[#121318]/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Store Selector Tabs */}
      <div className="flex items-center gap-3">
        <div className="flex items-center bg-[#1a1c24] p-1 rounded-lg border border-[#262833]">
          <button
            onClick={() => setActiveStoreId('OMNIA_COM')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeStoreId === 'OMNIA_COM'
                ? 'bg-luxury-gold text-luxury-charcoal font-semibold shadow-sm'
                : 'text-luxury-muted hover:text-luxury-ivory'
            }`}
          >
            Omnia Global (.com)
          </button>
          <button
            onClick={() => setActiveStoreId('OMNIA_AE')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeStoreId === 'OMNIA_AE'
                ? 'bg-luxury-gold text-luxury-charcoal font-semibold shadow-sm'
                : 'text-luxury-muted hover:text-luxury-ivory'
            }`}
          >
            Omnia UAE & GCC (.ae)
          </button>
        </div>

        {/* Sync Status Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#181920] border border-[#23252e] text-xs text-luxury-muted">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Verified Catalogue: <strong className="text-luxury-platinum">{products.length} Items</strong></span>
        </div>
      </div>

      {/* Right: Actions & Language Switcher */}
      <div className="flex items-center gap-3">
        {/* Sync Trigger Button */}
        <button
          onClick={() => syncStoreCatalogue(activeStoreId)}
          disabled={isSyncing}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#1e2029] hover:bg-[#272935] text-luxury-platinum border border-[#2c2f3d] transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-luxury-gold' : 'text-luxury-muted'}`} />
          <span>{isSyncing ? (isArabic ? 'جاري المزامنة...' : 'Syncing...') : (isArabic ? 'مزامنة الكتالوج' : 'Sync Catalogue')}</span>
        </button>

        {/* Language Switcher */}
        <div className="flex items-center bg-[#1a1c24] p-1 rounded-lg border border-[#262833]">
          <button
            onClick={() => setLanguage('en')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              language === 'en' ? 'bg-[#282b36] text-luxury-gold font-bold' : 'text-luxury-muted hover:text-luxury-ivory'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage('ar')}
            className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
              language === 'ar' ? 'bg-[#282b36] text-luxury-gold font-bold font-arabic' : 'text-luxury-muted hover:text-luxury-ivory'
            }`}
          >
            عربي
          </button>
        </div>
      </div>
    </header>
  );
}
