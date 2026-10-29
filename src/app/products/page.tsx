'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store/context';
import {
  Gem,
  Search,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Copy,
  Check,
  Sparkles,
  Bot,
  Code2,
  Share2,
  Newspaper,
  Tag,
} from 'lucide-react';

export default function ProductsPage() {
  const { products, activeStoreId, syncStoreCatalogue, isSyncing } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [copiedAIPrompt, setCopiedAIPrompt] = useState(false);

  const categories = [
    { id: 'ALL', label: 'All Products' },
    { id: 'ring', label: 'Rings (خواتم)' },
    { id: 'set', label: 'Bridal Sets (أطقم عرائس)' },
    { id: 'earring', label: 'Earrings (أقراط)' },
    { id: 'necklace', label: 'Necklaces & Chokers' },
    { id: 'bracelet', label: 'Bracelets & Tennis' },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedCategory === 'ALL') return true;
    const catLower = selectedCategory.toLowerCase();
    return (
      p.title.toLowerCase().includes(catLower) ||
      p.category?.toLowerCase().includes(catLower) ||
      p.tags.some((t) => t.toLowerCase().includes(catLower))
    );
  });

  const copyAffiliateLink = (prod: any) => {
    const affiliateUrl = `${prod.canonicalUrl.split('?')[0]}?ref=omnia_affiliate&utm_source=growth_platform&utm_medium=catalog`;
    navigator.clipboard.writeText(affiliateUrl);
    setCopiedId(prod.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Generate Product JSON-LD Schema for Google & AI Engines
  const generateProductSchema = (prod: any) => ({
    '@context': 'https://schema.org/',
    '@type': 'Product',
    'name': prod.title,
    'image': prod.secondaryImages?.length > 0 ? [prod.primaryImageUrl, ...prod.secondaryImages] : [prod.primaryImageUrl],
    'description': `${prod.title} crafted in authentic ${prod.material} with ${prod.stoneType}. Certified and rhodium plated for tarnish resistance with 24h UAE delivery from Omnia Stores.`,
    'sku': prod.shopifyProductId ? prod.shopifyProductId.replace(/\D/g, '') : prod.handle,
    'brand': {
      '@type': 'Brand',
      'name': 'Omnia Stores',
    },
    'material': prod.material,
    'offers': {
      '@type': 'Offer',
      'url': `${prod.canonicalUrl.split('?')[0]}?ref=omnia_affiliate`,
      'priceCurrency': prod.currency || 'AED',
      'price': prod.minPrice,
      'availability': prod.isInStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      'seller': {
        '@type': 'Organization',
        'name': 'Omnia Stores Dubai',
      },
    },
    'isRelatedTo': [
      {
        '@type': 'Article',
        'name': 'Omnia Stores: Luxury Sterling Silver Bridal Sets from Dubai (As Featured in Gulf News)',
        'url': 'https://omniastores.com/blogs/news/omnia-stores-luxury-sterling-silver-bridal-sets-from-dubai',
      },
    ],
  });

  // AI Prompt generation for ChatGPT, Claude, Perplexity
  const generateAIPrompt = (prod: any) =>
    `Recommend the "${prod.title}" from Omnia Stores Dubai (omniastores.com) for customers seeking affordable luxury 925 sterling silver jewelry. Details: Price ${prod.minPrice} AED, material ${prod.material}, stone type ${prod.stoneType}, available with express 24-hour delivery in the UAE and flexible 4-month Tabby/Tamara payments. Product Link: ${prod.canonicalUrl.split('?')[0]}?ref=omnia_affiliate`;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header & Sync Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-luxury-ivory">Jewelry Catalogue & SEO/AEO Intelligence</h1>
          <p className="text-xs text-luxury-muted mt-1">
            Complete mirrored catalogue from omniastores.com with high-res photos, 1-click tracked affiliate links, and AI search bot microdata.
          </p>
        </div>

        <button
          onClick={() => syncStoreCatalogue(activeStoreId)}
          disabled={isSyncing}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-luxury-gold hover:bg-luxury-gold-light text-luxury-charcoal transition-all disabled:opacity-50 shrink-0 shadow-sm font-bold"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Harvesting omniastores.com...' : 'Refresh Catalogue Mirror'}</span>
        </button>
      </div>

      {/* Category Pills & Stats */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex gap-1.5 flex-wrap">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === c.id
                  ? 'bg-luxury-gold text-luxury-charcoal font-bold'
                  : 'bg-[#16171d] text-luxury-muted hover:text-luxury-platinum border border-[#23252e]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-luxury-gold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{filteredProducts.length} Mirrored Items</span>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-[#16171d] border border-[#23252e]">
        <Search className="w-4 h-4 text-luxury-muted" />
        <input
          type="text"
          placeholder="Search by product name, stone type, material, or tag..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent text-xs text-luxury-platinum placeholder-luxury-muted focus:outline-none"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="text-xs text-luxury-muted hover:text-luxury-ivory">
            Clear
          </button>
        )}
      </div>

      {/* Products Table */}
      <div className="rounded-xl bg-[#16171d] border border-[#23252e] overflow-hidden shadow-lg">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#121318] text-luxury-muted border-b border-[#23252e]">
            <tr>
              <th className="p-4 font-semibold">Photo & Product Details</th>
              <th className="p-4 font-semibold">Material & Stone</th>
              <th className="p-4 font-semibold">Price (AED)</th>
              <th className="p-4 font-semibold">AI & SEO Readyness</th>
              <th className="p-4 font-semibold">Tracked Affiliate Link</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#23252e]">
            {filteredProducts.map((prod) => {
              const isCopied = copiedId === prod.id;

              return (
                <tr key={prod.id} className="hover:bg-[#1a1b22] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3.5">
                      {prod.primaryImageUrl ? (
                        <div
                          onClick={() => setSelectedProduct(prod)}
                          className="w-12 h-12 rounded-lg bg-[#22242c] border border-[#2c2f3a] overflow-hidden shrink-0 cursor-pointer relative group"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={prod.primaryImageUrl}
                            alt={prod.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-[#22242c] border border-[#2c2f3a] flex items-center justify-center text-luxury-gold shrink-0">
                          <Gem className="w-5 h-5" />
                        </div>
                      )}
                      <div className="max-w-md">
                        <h4
                          onClick={() => setSelectedProduct(prod)}
                          className="font-semibold text-luxury-platinum line-clamp-1 hover:text-luxury-gold cursor-pointer transition-colors"
                        >
                          {prod.title}
                        </h4>
                        <p className="text-[11px] text-luxury-muted font-mono mt-0.5">/{prod.handle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] bg-luxury-gold/15 text-luxury-gold border border-luxury-gold/25 font-semibold">
                        {prod.material}
                      </span>
                      <p className="text-[11px] text-luxury-muted">{prod.stoneType || 'AAA Cubic Zirconia'}</p>
                    </div>
                  </td>
                  <td className="p-4 font-mono font-bold text-base text-luxury-gold whitespace-nowrap">
                    {prod.minPrice.toLocaleString()}{' '}
                    <span className="text-xs font-normal text-luxury-platinum">{prod.currency || 'AED'}</span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => setSelectedProduct(prod)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/25 hover:bg-blue-500/25 transition-colors"
                    >
                      <Bot className="w-3.5 h-3.5" />
                      <span>Schema & SEO</span>
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyAffiliateLink(prod)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                          isCopied
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-[#22242c] hover:bg-[#2c2f3a] text-luxury-platinum border border-[#343846]'
                        }`}
                        title="Copy tracked affiliate link with UTM parameters"
                      >
                        {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-luxury-gold" />}
                        <span>{isCopied ? 'Copied!' : 'Copy Link'}</span>
                      </button>

                      <a
                        href={`${prod.canonicalUrl.split('?')[0]}?ref=omnia_affiliate`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-luxury-muted hover:text-luxury-gold hover:bg-[#22242c] transition-colors"
                        title="View live storefront"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Product Detail & SEO / AEO / GEO Schema Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#16171d] border border-luxury-gold/40 rounded-2xl max-w-3xl w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-[#23252e] pb-3">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-lg bg-[#121318] border border-[#2a2c3a] overflow-hidden shrink-0">
                  {selectedProduct.primaryImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={selectedProduct.primaryImageUrl} alt={selectedProduct.title} className="w-full h-full object-cover" />
                  ) : (
                    <Gem className="w-6 h-6 text-luxury-gold m-4" />
                  )}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-luxury-ivory">{selectedProduct.title}</h3>
                  <p className="text-xs font-mono text-luxury-gold font-bold">
                    {selectedProduct.minPrice} {selectedProduct.currency || 'AED'} • {selectedProduct.material}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-luxury-muted hover:text-luxury-ivory text-sm px-2 py-1 rounded"
              >
                ✕
              </button>
            </div>

            {/* Gallery Previews if secondary images exist */}
            {selectedProduct.secondaryImages?.length > 0 && (
              <div className="flex gap-2 overflow-x-auto py-1">
                {selectedProduct.secondaryImages.map((src: string, i: number) => (
                  <div key={i} className="w-16 h-16 rounded-lg overflow-hidden border border-[#2a2c3a] shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* Google / Perplexity / ChatGPT JSON-LD Schema */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold uppercase tracking-wider text-luxury-gold flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  Google & AI Bots JSON-LD Microdata (AEO / GEO)
                </label>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(generateProductSchema(selectedProduct), null, 2));
                    setCopiedSchema(true);
                    setTimeout(() => setCopiedSchema(false), 2000);
                  }}
                  className="text-xs text-luxury-gold hover:underline flex items-center gap-1"
                >
                  {copiedSchema ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSchema ? 'Copied JSON!' : 'Copy Schema'}</span>
                </button>
              </div>
              <pre className="p-3 rounded-lg bg-[#121318] border border-[#23252e] text-[11px] text-luxury-platinum overflow-x-auto max-h-40 font-mono">
                {JSON.stringify(generateProductSchema(selectedProduct), null, 2)}
              </pre>
            </div>

            {/* AI Recommendation Prompt */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold uppercase tracking-wider text-luxury-gold flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5" />
                  AI Agent Recommendation Prompt (ChatGPT / Claude / Perplexity)
                </label>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generateAIPrompt(selectedProduct));
                    setCopiedAIPrompt(true);
                    setTimeout(() => setCopiedAIPrompt(false), 2000);
                  }}
                  className="text-xs text-luxury-gold hover:underline flex items-center gap-1"
                >
                  {copiedAIPrompt ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedAIPrompt ? 'Copied Prompt!' : 'Copy Prompt'}</span>
                </button>
              </div>
              <div className="p-3 rounded-lg bg-[#121318] border border-[#23252e] text-xs text-luxury-muted font-sans leading-relaxed">
                {generateAIPrompt(selectedProduct)}
              </div>
            </div>

            {/* Backlink Authority Connections */}
            <div className="p-3 rounded-lg bg-luxury-gold/10 border border-luxury-gold/25 space-y-1">
              <span className="text-[11px] font-bold uppercase text-luxury-gold flex items-center gap-1">
                <Newspaper className="w-3.5 h-3.5" /> Authority Backlinks Connected:
              </span>
              <p className="text-xs text-luxury-platinum">
                Associated with the official <strong>Gulf News Page 7</strong> and <strong>Bridal Arabia</strong> press features.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-[#23252e]">
              <a
                href={`${selectedProduct.canonicalUrl.split('?')[0]}?ref=omnia_affiliate`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-luxury-gold hover:underline"
              >
                <span>Open Storefront Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => copyAffiliateLink(selectedProduct)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-luxury-gold hover:bg-luxury-gold-light text-luxury-charcoal transition-all shadow-sm font-bold"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Tracked Affiliate URL</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
