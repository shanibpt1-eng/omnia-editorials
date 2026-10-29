'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  History,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Trash2,
} from 'lucide-react';

interface ArticleHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: any;
  onReverted: (revertedArticle: any) => void;
  onUnpublished?: (article: any) => void;
}

export function ArticleHistoryModal({ isOpen, onClose, article, onReverted, onUnpublished }: ArticleHistoryModalProps) {
  const [historyList, setHistoryList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [revertingId, setRevertingId] = useState<string | null>(null);
  const [isUnpublishing, setIsUnpublishing] = useState(false);
  const [revertMessage, setRevertMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchHistory = async () => {
    if (!article) return;
    setIsLoading(true);
    try {
      const param = article.slug ? `slug=${encodeURIComponent(article.slug)}` : `articleId=${encodeURIComponent(article.id)}`;
      const res = await fetch(`/api/publisher/article-history?${param}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.history)) {
        setHistoryList(data.history);
      }
    } catch (e) {
      console.error('Failed to load history:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setRevertMessage(null);
      fetchHistory();
    }
  }, [isOpen, article?.slug]);

  if (!isOpen || !article) return null;

  const handleRevert = async (revisionId: string) => {
    setRevertingId(revisionId);
    setRevertMessage(null);

    try {
      const res = await fetch('/api/publisher/revert-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ revisionId, slug: article.slug }),
      });

      const data = await res.json();
      if (data.success && data.article) {
        setRevertMessage({
          type: 'success',
          text: `Successfully rolled back to version ${revisionId}. Port 3001 storefront updated!`,
        });
        onReverted(data.article);
        await fetchHistory();
      } else {
        setRevertMessage({
          type: 'error',
          text: data.error || 'Failed to revert to this version.',
        });
      }
    } catch (err: any) {
      setRevertMessage({
        type: 'error',
        text: err.message || 'Network error while attempting to revert.',
      });
    } finally {
      setRevertingId(null);
    }
  };

  const handleUnpublish = async () => {
    setIsUnpublishing(true);
    setRevertMessage(null);
    try {
      const res = await fetch('/api/publisher/unpublish-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: article.slug, articleId: article.id }),
      });
      const data = await res.json();
      if (data.success) {
        setRevertMessage({
          type: 'success',
          text: `Article "${article.title}" successfully unpublished and removed from Port 3001 storefront!`,
        });
        onUnpublished?.(article);
        await fetchHistory();
      } else {
        setRevertMessage({
          type: 'error',
          text: data.error || 'Failed to unpublish article from storefront.',
        });
      }
    } catch (err: any) {
      setRevertMessage({
        type: 'error',
        text: err.message || 'Network error unpublishing article.',
      });
    } finally {
      setIsUnpublishing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl my-auto bg-[#14151b] border border-luxury-gold/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#23252e] flex items-center justify-between bg-[#181a22]">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-luxury-gold/15 text-luxury-gold">
              <History className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-serif font-bold text-sm sm:text-base text-luxury-ivory">
                Version History & Revert Console
              </h3>
              <p className="text-[11px] text-luxury-muted truncate max-w-md">
                Tracking revisions for: <span className="text-luxury-platinum font-medium">{article.title}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback message */}
        {revertMessage && (
          <div
            className={`mx-4 sm:mx-6 mt-4 p-3 rounded-xl border flex items-center gap-2 text-xs ${
              revertMessage.type === 'success'
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                : 'bg-red-950/60 border-red-500/40 text-red-300'
            }`}
          >
            {revertMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{revertMessage.text}</span>
          </div>
        )}

        {/* Revisions Timeline List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {isLoading ? (
            <div className="py-12 text-center text-luxury-muted space-y-2">
              <Sparkles className="w-6 h-6 animate-spin mx-auto text-luxury-gold" />
              <p className="text-xs">Loading historical snapshots from backend archive...</p>
            </div>
          ) : historyList.length === 0 ? (
            <div className="py-12 text-center text-luxury-muted space-y-2">
              <Clock className="w-8 h-8 opacity-40 mx-auto text-luxury-gold" />
              <p className="text-xs">No prior revisions recorded for this article.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {historyList.map((rev: any, index: number) => {
                const isLive = rev.isCurrentlyLiveOnStorefront;
                const hasMismatch = rev.mismatchDetected;
                const dateStr = new Date(rev.timestamp).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <div
                    key={rev.revisionId || index}
                    className={`p-3.5 sm:p-4 rounded-xl border transition-all ${
                      isLive
                        ? 'bg-emerald-950/20 border-emerald-500/40 ring-1 ring-emerald-500/20'
                        : 'bg-[#181921] border-[#252834] hover:border-luxury-gold/40'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-start gap-3">
                        {/* Snapshot thumbnail preview */}
                        {rev.snapshot?.coverImage && (
                          <div className="w-14 h-14 rounded-lg overflow-hidden border border-luxury-gold/30 shrink-0 bg-black mt-0.5">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={rev.snapshot.coverImage}
                              alt="Revision"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                rev.action === 'INITIAL_PUBLISH'
                                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                  : rev.action === 'BACKEND_EDIT'
                                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                  : rev.action === 'REVERTED'
                                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              }`}
                            >
                              {rev.action}
                            </span>

                            <span className="text-[11px] text-luxury-muted flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {dateStr}
                            </span>

                            {isLive && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Active Live Version
                              </span>
                            )}
                          </div>

                          <h4 className="font-serif font-bold text-xs sm:text-sm text-luxury-ivory line-clamp-1">
                            {rev.snapshot?.title}
                          </h4>

                          <p className="text-[11px] text-luxury-muted line-clamp-1">
                            {rev.changeSummary || 'Version snapshot'}
                          </p>

                          {/* Mismatch warnings if any */}
                          {hasMismatch && rev.mismatchDetails && rev.mismatchDetails.length > 0 && (
                            <div className="text-[10px] text-amber-400/90 flex items-center gap-1.5 pt-1">
                              <AlertTriangle className="w-3 h-3 shrink-0" />
                              <span>Differs from current storefront: {rev.mismatchDetails.join(', ')}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Revert Action Button */}
                      <div className="w-full sm:w-auto flex items-center justify-end gap-2 shrink-0 pt-2 sm:pt-0">
                        {isLive ? (
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[11px] text-emerald-400 font-medium px-2 py-1">
                              ✓ Currently Live
                            </span>
                            <button
                              onClick={handleUnpublish}
                              disabled={isUnpublishing}
                              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-950/60 hover:bg-red-900/60 text-red-300 border border-red-500/40 hover:border-red-400 flex items-center gap-1.5 transition-all shadow-sm disabled:opacity-50"
                              title="Remove this article from Port 3001 storefront"
                            >
                              <Trash2 className="w-3 h-3 text-red-400" />
                              <span>{isUnpublishing ? 'Removing...' : 'Remove from Storefront'}</span>
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleRevert(rev.revisionId)}
                            disabled={revertingId === rev.revisionId}
                            className="w-full sm:w-auto px-3.5 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black flex items-center justify-center gap-1.5 shadow transition-all disabled:opacity-50"
                          >
                            <RotateCcw className={`w-3.5 h-3.5 ${revertingId === rev.revisionId ? 'animate-spin' : ''}`} />
                            <span>{revertingId === rev.revisionId ? 'Reverting...' : '↩️ Revert to this Version'}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-[#23252e] bg-[#181a22] flex items-center justify-between text-xs text-luxury-muted">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-luxury-gold" />
            <span>Dual-Transport Bridge Sync Active: Reverting writes directly to Storefront</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-[#2b2d38] text-neutral-300 hover:bg-white/5 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
