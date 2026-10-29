'use client';

import React from 'react';
import { useStore } from '@/lib/store/context';
import { Share2, ShieldCheck, ExternalLink } from 'lucide-react';

export default function AffiliatesPage() {
  const merchants = [
    {
      name: 'Bridal Gowns Direct (US)',
      website: 'bridalgownsdirect.com',
      commission: '8% per sale',
      disclosure: 'Contains affiliate links. We may earn a commission on qualifying purchases.',
      rel: 'sponsored nofollow',
      status: 'VERIFIED',
    },
    {
      name: 'Gulf Luxury Weddings Directory',
      website: 'gulfluxuryweddings.ae',
      commission: '12% per inquiry',
      disclosure: 'إعلان تجاري - يحتوي هذا المقال على روابط تابعة معتمدة.',
      rel: 'sponsored nofollow',
      status: 'VERIFIED',
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-serif font-bold text-luxury-ivory">Affiliate Links & Disclosure Policy</h1>
        <p className="text-xs text-luxury-muted mt-1">
          Compliant external merchant tracking with mandatory rel="sponsored" tagging and transparent consumer disclosures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {merchants.map((m, idx) => (
          <div key={idx} className="p-5 rounded-xl bg-[#16171d] border border-[#23252e] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-sm text-luxury-ivory">{m.name}</h3>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                <ShieldCheck className="w-3 h-3" /> {m.status}
              </span>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-luxury-muted">
                <span>Commission:</span>
                <span className="font-semibold text-luxury-gold">{m.commission}</span>
              </div>
              <div className="flex justify-between text-luxury-muted">
                <span>HTML Rel Attribute:</span>
                <span className="font-mono text-luxury-platinum">{m.rel}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#121318] border border-[#20222a] text-[11px] text-luxury-muted italic">
              &quot;{m.disclosure}&quot;
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
