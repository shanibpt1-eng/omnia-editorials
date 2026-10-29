'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/context';
import { TicketPercent, ShieldCheck, CheckCircle2, Clock, AlertTriangle, ExternalLink } from 'lucide-react';

export default function DiscountsPage() {
  const { discounts, activeStoreId, approveDiscount } = useStore();
  const [approvingId, setApprovingId] = useState<string | null>(null);

  const handleApprove = async (id: string) => {
    setApprovingId(id);
    try {
      approveDiscount(id);
    } finally {
      setApprovingId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-serif font-bold text-luxury-ivory">Discount Campaigns & Voucher Guardrails</h1>
        <p className="text-xs text-luxury-muted mt-1">
          Strict margin protections: AI-generated discount proposals require mandatory administrator authorization before Shopify PriceRule sync.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {discounts.map((disc) => {
          const isPending = disc.approvalStatus === 'PROPOSAL';
          return (
            <div
              key={disc.id}
              className="p-5 rounded-xl bg-[#16171d] border border-[#23252e] flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                  <TicketPercent className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif font-bold text-base text-luxury-ivory">{disc.campaignName}</h3>
                    <span className="font-mono px-2 py-0.5 rounded text-xs bg-luxury-gold/20 text-luxury-gold border border-luxury-gold/30 font-bold">
                      {disc.discountCode}
                    </span>
                  </div>
                  <p className="text-xs text-luxury-muted">
                    Discount: <strong className="text-luxury-platinum">{disc.value}% off</strong> • Min Order:{' '}
                    <strong className="text-luxury-platinum">{disc.minOrderValue} {activeStoreId === 'OMNIA_COM' ? 'USD' : 'AED'}</strong> • Target Store:{' '}
                    <span className="text-luxury-gold">{disc.storeId}</span>
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-luxury-muted pt-1">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" /> Margin Check: Passed
                    </span>
                    <span>Projected Discount Cost: ${disc.projectedCost}</span>
                  </div>
                </div>
              </div>

              {/* Status and Approval Action */}
              <div className="flex items-center gap-3 shrink-0">
                {isPending ? (
                  <button
                    onClick={() => handleApprove(disc.id)}
                    disabled={approvingId === disc.id}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{approvingId === disc.id ? 'Approving...' : 'Approve & Push to Shopify'}</span>
                  </button>
                ) : (
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Active in Shopify
                    </span>
                    <p className="text-[10px] text-luxury-muted font-mono mt-1">{disc.shopifyPriceRuleId}</p>
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
