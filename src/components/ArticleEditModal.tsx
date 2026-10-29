'use client';

import React, { useState } from 'react';
import { X, Save, Sparkles, Image as ImageIcon, Eye, CheckCircle2, AlertCircle } from 'lucide-react';

interface ArticleEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: any;
  onSaved: (updatedArticle: any) => void;
}

const AI_PHOTO_PRESETS = [
  { label: 'Vogue Model (AI)', url: '/ai-luxury/royal-empress-vogue-model.jpg' },
  { label: 'Velvet Bust (AI)', url: '/ai-luxury/royal-empress-bridal-bust.jpg' },
  { label: 'Marquise Macro (AI)', url: '/ai-luxury/starlight-marquise-droplets-macro.jpg' },
  { label: 'Emerald Grandeur', url: '/hero/hero-emerald-grandeur.jpg' },
  { label: 'Canary Yellow', url: '/hero/hero-canary-yellow-suite.jpg' },
  { label: 'Diamond Radiance', url: '/hero/hero-diamond-radiance.jpg' },
  { label: 'Freshwater Pearl', url: '/hero/hero-pearl-revival.jpg' },
  { label: 'Classic Tennis', url: '/campaigns/02_classic-brilliance.png' },
];

export function ArticleEditModal({ isOpen, onClose, article, onSaved }: ArticleEditModalProps) {
  if (!isOpen || !article) return null;

  const [title, setTitle] = useState(article.title || '');
  const [titleAr, setTitleAr] = useState(article.titleAr || '');
  const [excerpt, setExcerpt] = useState(article.excerpt || '');
  const [excerptAr, setExcerptAr] = useState(article.excerptAr || '');
  const [coverImage, setCoverImage] = useState(article.coverImage || article.featuredImageUrl || '');
  const [category, setCategory] = useState(article.category || 'High Jewellery');
  const [publication, setPublication] = useState(article.publication || 'Vogue Arabia');
  const [contentHtml, setContentHtml] = useState(article.contentHtml || '');
  const [changeSummary, setChangeSummary] = useState('');

  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage(null);

    try {
      const payload = {
        slug: article.slug,
        articleId: article.id,
        updates: {
          title,
          titleAr,
          excerpt,
          excerptAr,
          coverImage,
          category,
          publication,
          contentHtml,
          changeSummary: changeSummary.trim() || 'Backend manual edit & storefront synchronization',
        },
      };

      const res = await fetch('/api/publisher/edit-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.article) {
        setStatusMessage({ type: 'success', text: 'Article successfully updated and synced to Port 3001!' });
        onSaved(data.article);
        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        setStatusMessage({ type: 'error', text: data.error || 'Failed to update article.' });
      }
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Network error updating article.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl my-auto bg-[#14151b] border border-luxury-gold/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#23252e] flex items-center justify-between bg-[#181a22]">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-luxury-gold/15 text-luxury-gold">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-serif font-bold text-sm sm:text-base text-luxury-ivory">
                Backend Article Editor & Synchronizer
              </h3>
              <p className="text-[11px] text-luxury-muted">
                Live changes sync directly to Port 3001 Storefront with automated versioning
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

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs">
          {statusMessage && (
            <div
              className={`p-3 rounded-xl border flex items-center gap-2 ${
                statusMessage.type === 'success'
                  ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                  : 'bg-red-950/60 border-red-500/40 text-red-300'
              }`}
            >
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Title Inputs (Bilingual) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-luxury-platinum font-semibold block">Article Headline (English)</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg bg-[#0e0f14] border border-[#2b2d38] text-white focus:border-luxury-gold focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-luxury-platinum font-semibold block text-right font-arabic">
                العنوان الرئيسي (باللغة العربية)
              </label>
              <input
                type="text"
                dir="rtl"
                value={titleAr}
                onChange={(e) => setTitleAr(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0e0f14] border border-[#2b2d38] text-white focus:border-luxury-gold focus:outline-none font-arabic"
              />
            </div>
          </div>

          {/* Excerpt Inputs (Bilingual) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-luxury-platinum font-semibold block">Editorial Lead Excerpt (English)</label>
              <textarea
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0e0f14] border border-[#2b2d38] text-white focus:border-luxury-gold focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-luxury-platinum font-semibold block text-right font-arabic">
                الموجز الصحفي (باللغة العربية)
              </label>
              <textarea
                rows={3}
                dir="rtl"
                value={excerptAr}
                onChange={(e) => setExcerptAr(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0e0f14] border border-[#2b2d38] text-white focus:border-luxury-gold focus:outline-none font-arabic"
              />
            </div>
          </div>

          {/* Visual Asset Selector */}
          <div className="space-y-2">
            <label className="text-luxury-platinum font-semibold flex items-center justify-between">
              <span>Cover Photo Asset</span>
              <span className="text-[10px] text-luxury-gold">Choose from AI Presets or enter URL</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="/ai-luxury/royal-empress-vogue-model.jpg"
                className="flex-1 px-3 py-2 rounded-lg bg-[#0e0f14] border border-[#2b2d38] text-white focus:border-luxury-gold focus:outline-none font-mono text-[11px]"
              />
              {coverImage && (
                <div className="w-10 h-10 rounded-lg overflow-hidden border border-luxury-gold/40 shrink-0 bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={coverImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Quick AI preset selector pills */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {AI_PHOTO_PRESETS.map((p, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setCoverImage(p.url)}
                  className={`px-2 py-1 rounded text-[10px] font-medium transition-all ${
                    coverImage === p.url
                      ? 'bg-luxury-gold text-luxury-charcoal font-bold shadow'
                      : 'bg-[#1c1e27] text-luxury-platinum hover:bg-[#252834]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category & Publication */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-luxury-platinum font-semibold block">Syndicate Publication</label>
              <select
                value={publication}
                onChange={(e) => setPublication(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0e0f14] border border-[#2b2d38] text-white focus:border-luxury-gold focus:outline-none"
              >
                <option value="Vogue Arabia">Vogue Arabia</option>
                <option value="Harper's Bazaar Arabia">Harper&apos;s Bazaar Arabia</option>
                <option value="The National">The National</option>
                <option value="Gulf News">Gulf News</option>
                <option value="L'Officiel Arabia">L&apos;Officiel Arabia</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-luxury-platinum font-semibold block">Editorial Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#0e0f14] border border-[#2b2d38] text-white focus:border-luxury-gold focus:outline-none"
              />
            </div>
          </div>

          {/* Editorial Content HTML */}
          <div className="space-y-1.5">
            <label className="text-luxury-platinum font-semibold block">Article Body (HTML / Prose)</label>
            <textarea
              rows={5}
              value={contentHtml}
              onChange={(e) => setContentHtml(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#0e0f14] border border-[#2b2d38] text-white focus:border-luxury-gold focus:outline-none font-mono text-[11px]"
            />
          </div>

          {/* Change Note / Summary for History Log */}
          <div className="space-y-1.5">
            <label className="text-luxury-platinum font-semibold block">
              Version Change Summary (Recorded in Backend History)
            </label>
            <input
              type="text"
              value={changeSummary}
              onChange={(e) => setChangeSummary(e.target.value)}
              placeholder="e.g. Updated headline and refreshed cover photo with AI model"
              className="w-full px-3 py-2 rounded-lg bg-[#0e0f14] border border-[#2b2d38] text-white focus:border-luxury-gold focus:outline-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-[#23252e] flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg border border-[#2d303d] text-neutral-300 hover:bg-white/5 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-gradient-to-r from-luxury-gold to-luxury-gold-dark hover:from-luxury-gold-light hover:to-luxury-gold text-luxury-charcoal font-bold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              <Save className={`w-4 h-4 ${isSaving ? 'animate-spin' : ''}`} />
              <span>{isSaving ? 'Syncing to Port 3001...' : '💾 Save & Sync to Storefront'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
