'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  ExternalLink,
  Search,
  BookOpen,
  ArrowRight,
  Layers,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Copy,
  Check,
  Globe2,
  ShieldCheck,
  FileArchive,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Trash2,
  Newspaper,
} from 'lucide-react';

export default function EditorialNetworkPage() {
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Zip Upload State
  const [showZipModal, setShowZipModal] = useState(false);
  const [isUploadingZip, setIsUploadingZip] = useState(false);
  const [zipUploadMessage, setZipUploadMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isDraggingZip, setIsDraggingZip] = useState(false);
  const zipInputRef = useRef<HTMLInputElement>(null);

  // Fetch paginated feed from API
  const fetchFeed = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '25',
        search: search,
        country: selectedCountry,
      });
      const res = await fetch(`/api/publisher/editorial-feed?${params.toString()}`);
      const data = await res.json();
      if (data.items) {
        setItems(data.items);
        setTotalItems(data.total);
        setTotalPages(data.totalPages);
        setCountries(data.countries || []);
        if (!selectedArticle && data.items.length > 0) {
          setSelectedArticle(data.items[0]);
        }
      }
    } catch (err) {
      console.error('Failed to load editorial feed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, [currentPage, search, selectedCountry]);

  const copyUrl = (file: string) => {
    const url = `${window.location.origin}/api/publisher/view-article?file=${encodeURIComponent(file)}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleResetDirectory = async () => {
    if (!confirm('Are you sure you want to clear all existing test articles? This will prepare a completely clean directory for your new official data archive.')) {
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch('/api/publisher/reset-directory', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        alert(data.message);
        setSelectedArticle(null);
        fetchFeed();
      } else {
        alert(data.error || 'Failed to clear directory');
      }
    } catch (err: any) {
      alert(`Error clearing directory: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleZipUpload = async (file: File) => {
    if (!file.name.endsWith('.zip')) {
      setZipUploadMessage({ type: 'error', text: 'Please select a valid .zip archive file.' });
      return;
    }

    setIsUploadingZip(true);
    setZipUploadMessage(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/publisher/upload-zip', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setZipUploadMessage({
          type: 'success',
          text: `Success! Extracted and indexed ${data.extractedCount} articles from ${file.name}. Updating directory...`,
        });
        setTimeout(() => {
          setShowZipModal(false);
          setZipUploadMessage(null);
          setCurrentPage(1);
          fetchFeed();
        }, 1200);
      } else {
        setZipUploadMessage({ type: 'error', text: `Upload failed: ${data.error}` });
      }
    } catch (err: any) {
      setZipUploadMessage({ type: 'error', text: `Network error: ${err.message}` });
    } finally {
      setIsUploadingZip(false);
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* Top Header & Overview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#23252e] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-serif font-bold text-luxury-ivory">
              Standalone Editorial Blog Network
            </h1>
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-luxury-gold/20 text-luxury-gold border border-luxury-gold/30">
              {totalItems.toLocaleString()} Indexed Stories
            </span>
          </div>
          <p className="text-xs text-luxury-muted mt-1">
            Separate external publishing portal across 25 country editions. Zero live storefront modification; 100% backlinked to Omnia Stores collections.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Zip Upload Button */}
          <button
            onClick={() => setShowZipModal(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold bg-[#22242c] hover:bg-[#2c2f3a] text-luxury-gold border border-luxury-gold/40 transition-all shadow-sm"
          >
            <FileArchive className="w-4 h-4 text-luxury-gold" />
            <span>Upload ZIP Archive</span>
          </button>

          {/* Reset / Clear Directory Button */}
          <button
            onClick={handleResetDirectory}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-[#221c1c] hover:bg-[#2c2020] text-red-400 border border-red-500/30 transition-all shadow-sm"
            title="Clear current data to upload clean fresh archive"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Old Data</span>
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#191b22] border border-[#262834] text-xs font-mono text-emerald-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Storefront Safe</span>
          </div>

          <a
            href="/newsroom"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1d1f2b] hover:bg-[#272a3b] text-luxury-gold border border-luxury-gold/40 shadow-md transition-all"
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>Digital Newspaper (news.1fill.com)</span>
          </a>

          <a
            href="http://localhost:3001"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-luxury-gold to-luxury-gold-dark text-luxury-charcoal hover:brightness-110 shadow-md"
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>Dedicated Portal (:3001)</span>
          </a>
        </div>
      </div>

      {/* Main Dual-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[calc(100vh-170px)]">
        {/* Left Column: 1,002 Articles Directory (5 cols) */}
        <div className="lg:col-span-5 space-y-3 flex flex-col h-full">
          <div className="p-4 rounded-xl bg-[#16171d] border border-[#23252e] space-y-3 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-luxury-gold flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                Editorial Directory ({totalItems.toLocaleString()} Stories)
              </span>
              <span className="text-[11px] font-mono text-emerald-400">25 Regional Editions</span>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-luxury-muted" />
              <input
                type="text"
                placeholder="Search stories by title, country or topic..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#101115] border border-[#262834] text-xs text-luxury-ivory focus:outline-none focus:border-luxury-gold/50"
              />
            </div>

            {/* Regional Filter Badges */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[10px] font-semibold">
              <button
                onClick={() => {
                  setSelectedCountry('all');
                  setCurrentPage(1);
                }}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedCountry === 'all'
                    ? 'bg-luxury-gold text-luxury-charcoal font-bold'
                    : 'bg-[#1a1b22] text-luxury-muted hover:text-luxury-platinum'
                }`}
              >
                All ({totalItems.toLocaleString()})
              </button>
              {countries.slice(0, 12).map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    setSelectedCountry(c);
                    setCurrentPage(1);
                  }}
                  className={`px-2.5 py-1 rounded-md whitespace-nowrap transition-colors ${
                    selectedCountry === c
                      ? 'bg-luxury-gold text-luxury-charcoal font-bold'
                      : 'bg-[#1a1b22] text-luxury-muted hover:text-luxury-platinum'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* List of Articles */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
            {isLoading ? (
              <div className="p-8 text-center text-luxury-muted text-xs flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-luxury-gold" />
                <span>Loading editorial stories...</span>
              </div>
            ) : items.length === 0 ? (
              <div className="p-8 text-center text-luxury-muted text-xs">
                No stories match your filter query.
              </div>
            ) : (
              items.map((item: any) => {
                const isSelected = selectedArticle?.file === item.file;
                return (
                  <div
                    key={item.file}
                    onClick={() => setSelectedArticle(item)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all space-y-1.5 ${
                      isSelected
                        ? 'bg-luxury-gold/15 border-luxury-gold/60 shadow-md'
                        : 'bg-[#16171d] hover:bg-[#1a1c24] border-[#23252e]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="px-1.5 py-0.5 rounded bg-luxury-gold/20 text-luxury-gold font-bold uppercase">
                        #{item.num} • {item.country}
                      </span>
                      <span className="text-luxury-muted">{item.sizeKb} KB</span>
                    </div>

                    <h3 className="text-xs font-bold text-luxury-ivory line-clamp-2 leading-snug">
                      {item.title}
                    </h3>

                    <div className="flex items-center justify-between text-[11px] pt-1 text-luxury-muted">
                      <span className="truncate max-w-[200px] font-mono text-[10px]">
                        {item.file}
                      </span>
                      <span className="text-luxury-gold flex items-center gap-1 font-semibold">
                        Preview <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination Controls */}
          <div className="p-3 bg-[#16171d] border border-[#23252e] rounded-xl flex items-center justify-between text-xs shrink-0">
            <span className="text-luxury-muted font-mono text-[11px]">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded bg-[#101115] hover:bg-[#20222a] disabled:opacity-30 text-luxury-platinum"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded bg-[#101115] hover:bg-[#20222a] disabled:opacity-30 text-luxury-platinum"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Standalone Magazine Viewer (7 cols) */}
        <div className="lg:col-span-7 flex flex-col min-h-[680px] lg:min-h-[820px] h-full space-y-3">
          {selectedArticle ? (
            <div className="flex-1 flex flex-col bg-[#16171d] border border-[#23252e] rounded-xl overflow-hidden shadow-2xl">
              {/* Header Bar */}
              <div className="p-3.5 border-b border-[#23252e] bg-[#121318] flex items-center justify-between gap-3 shrink-0">
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-luxury-gold uppercase tracking-wider">
                    Isolated External Editorial • #{selectedArticle.num}
                  </span>
                  <h2 className="text-xs font-bold text-luxury-ivory truncate max-w-xl">
                    {selectedArticle.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => copyUrl(selectedArticle.file)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#22242c] hover:bg-[#2c2f3a] text-luxury-gold border border-luxury-gold/30 transition-all shadow-sm"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied Link!' : 'Copy URL'}</span>
                  </button>

                  <a
                    href={`/api/publisher/view-article?file=${encodeURIComponent(selectedArticle.file)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-luxury-gold to-luxury-gold-dark text-luxury-charcoal hover:brightness-110 shadow-md"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Open in New Window</span>
                  </a>
                </div>
              </div>

              {/* Sandboxed Iframe (100% Fidelity, Zero CSS Bleed, Exact Same Layout) */}
              <div className="flex-1 min-h-[600px] lg:min-h-[750px] bg-[#060606] relative rounded-b-xl overflow-hidden">
                <iframe
                  title={selectedArticle.title}
                  src={`/api/publisher/view-article?file=${encodeURIComponent(selectedArticle.file)}`}
                  className="w-full h-full border-0 absolute inset-0"
                  allow="fullscreen"
                  loading="eager"
                />
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-12 text-center rounded-xl bg-[#16171d] border border-[#23252e]">
              <div className="space-y-2">
                <BookOpen className="w-10 h-10 text-luxury-gold mx-auto" />
                <h3 className="font-serif font-bold text-luxury-ivory text-base">
                  Select a Blog from the Directory to View
                </h3>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* ZIP FILE UPLOAD MODAL                                          */}
      {/* ============================================================== */}
      {showZipModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#15161c] border border-luxury-gold/50 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#23252e] pb-3">
              <div className="flex items-center gap-2">
                <FileArchive className="w-5 h-5 text-luxury-gold" />
                <h3 className="font-serif font-bold text-lg text-luxury-ivory">
                  Upload ZIP Editorial Archive
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowZipModal(false);
                  setZipUploadMessage(null);
                }}
                className="text-luxury-muted hover:text-luxury-ivory"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-luxury-muted">
              Upload any `.zip` archive containing your HTML articles, images, and styles. All files are automatically extracted, mapped, and indexed into the editorial directory.
            </p>

            {/* Drop Zone */}
            <div
              onDrop={(e) => {
                e.preventDefault();
                setIsDraggingZip(false);
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  handleZipUpload(e.dataTransfer.files[0]);
                }
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDraggingZip(true);
              }}
              onDragLeave={() => setIsDraggingZip(false)}
              onClick={() => zipInputRef.current?.click()}
              className={`p-8 border-2 border-dashed rounded-xl text-center cursor-pointer transition-all ${
                isDraggingZip
                  ? 'border-luxury-gold bg-luxury-gold/10'
                  : 'border-[#303342] hover:border-luxury-gold/50 bg-[#121318]'
              }`}
            >
              <input
                ref={zipInputRef}
                type="file"
                accept=".zip"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleZipUpload(e.target.files[0]);
                  }
                }}
              />
              <UploadCloud className="w-10 h-10 text-luxury-gold mx-auto mb-2 opacity-90" />
              <h4 className="text-sm font-bold text-luxury-ivory">
                {isUploadingZip ? 'Extracting & Indexing Archive...' : 'Click or Drag & Drop .zip File Here'}
              </h4>
              <p className="text-xs text-luxury-muted mt-1">
                Supports archives with hundreds or thousands of editorial blogs and webp/jpg assets.
              </p>
            </div>

            {/* Upload Feedback */}
            {zipUploadMessage && (
              <div
                className={`p-3 rounded-lg border text-xs flex items-center gap-2 ${
                  zipUploadMessage.type === 'success'
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                    : 'bg-red-950/30 border-red-500/40 text-red-300'
                }`}
              >
                {zipUploadMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                )}
                <span>{zipUploadMessage.text}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#23252e]">
              <button
                onClick={() => {
                  setShowZipModal(false);
                  setZipUploadMessage(null);
                }}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-luxury-muted hover:text-luxury-ivory"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
