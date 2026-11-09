'use client';

import React, { useState, useEffect } from 'react';

const getApiEndpoint = () => {
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:5001';
    }
  }
  return '';
};

const STORE_DISCOUNTED_ITEMS_URL = 'https://omniastores.com/collections/discounted-items';

interface NewsArticle {
  id: string;
  title: string;
  description?: string;
  source: string;
  category: string;
  url: string;
  publishedAt: string;
  brandTakeaway: string;
  utmUrl: string;
}

export default function BlogNewsFeed() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [filter, setFilter] = useState<'all' | 'gcc' | 'world'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAllNews() {
      setLoading(true);
      const apiBase = getApiEndpoint();

      const fetchWire = async (path: string) => {
        try {
          const res = await fetch(`${apiBase}${path}`);
          if (res.ok) return await res.json();
        } catch (e) {
          // Backend port offline, try same-origin relative Next.js API
        }
        try {
          const res = await fetch(path);
          if (res.ok) return await res.json();
        } catch (e) {
          console.warn(`Failed to fetch wire at ${path}`);
        }
        return { articles: [] };
      };

      try {
        const [gccRes, worldRes] = await Promise.all([
          fetchWire('/api/news/gcc'),
          fetchWire('/api/news/world'),
        ]);

        const combined: NewsArticle[] = [
          ...(gccRes.articles || []),
          ...(worldRes.articles || []),
        ];
        setArticles(combined);
      } catch (err) {
        console.error('Error fetching blog news feed:', err);
      } finally {
        setLoading(false);
      }
    }
    loadAllNews();
  }, []);

  const filtered = articles.filter((item) => {
    if (filter === 'gcc') return item.category === 'GCC & Middle East';
    if (filter === 'world') return item.category === 'Worldwide';
    return true;
  });

  return (
    <div style={{ background: '#090d16', color: '#f8fafc', padding: '24px', fontFamily: 'system-ui, sans-serif', minHeight: '100vh' }}>
      
      {/* Marquee Breaking Ticker */}
      <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '10px 16px', borderRadius: '8px', marginBottom: '24px', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <span style={{ background: '#D4AF37', color: '#000', fontWeight: 'bold', fontSize: '11px', padding: '4px 8px', borderRadius: '4px', marginRight: '12px', flexShrink: 0 }}>
          LIVE WIRE
        </span>
        <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', width: '100%' }}>
          {/* @ts-ignore */}
          <marquee style={{ color: '#94a3b8', fontSize: '14px', display: 'block' }}>
            {articles.length > 0
              ? articles.map((a) => `⚡ [${a.category}] ${a.title}`).join(' --- ')
              : '⚡ Connecting to live Omnia Stores Luxury News Wire...'}
          {/* @ts-ignore */}
          </marquee>
        </div>
      </div>

      {/* Region Filter Buttons */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button onClick={() => setFilter('all')} style={btnStyle(filter === 'all')}>🌐 All Live Wire</button>
        <button onClick={() => setFilter('gcc')} style={btnStyle(filter === 'gcc')}>🇦🇪 GCC & Middle East</button>
        <button onClick={() => setFilter('world')} style={btnStyle(filter === 'world')}>🌍 Worldwide</button>
      </div>

      {/* Grid of Articles */}
      {loading ? (
        <div style={{ padding: '40px 0', textAlign: 'center' }}>
          <p style={{ color: '#94a3b8', fontSize: '15px' }}>Loading live editorial news wire...</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {filtered.map((item) => (
            <div key={item.id} style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '20px', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', transition: 'transform 0.2s, border-color 0.2s' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', color: '#D4AF37', fontWeight: 'bold' }}>{item.category.toUpperCase()}</span>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>{item.source}</span>
                </div>
                <h2 style={{ fontSize: '18px', color: '#fff', margin: '10px 0', lineHeight: '1.4' }}>
                  <a 
                    href={item.url || STORE_DISCOUNTED_ITEMS_URL} 
                    target="_blank" 
                    rel="noreferrer" 
                    style={{ color: '#fff', textDecoration: 'none' }}
                    title="Read full article at source"
                  >
                    {item.title}
                  </a>
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '1.5' }}>
                  {item.description ? (item.description.length > 130 ? item.description.slice(0, 130) + '...' : item.description) : ''}
                </p>
              </div>

              {/* Integrated Brand Callout Box */}
              <div style={{ background: 'rgba(212, 175, 55, 0.08)', borderLeft: '3px solid #D4AF37', padding: '12px', marginTop: '16px', borderRadius: '4px' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#D4AF37' }}>💎 Omnia Stores 11.11 Highlight:</span>
                <p style={{ fontSize: '12px', color: '#cbd5e1', margin: '6px 0 10px 0', lineHeight: '1.4' }}>{item.brandTakeaway}</p>
                <a 
                  href={item.utmUrl || STORE_DISCOUNTED_ITEMS_URL} 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #AA8C2C 100%)', color: '#000', padding: '6px 14px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', textDecoration: 'none', display: 'inline-block' }}
                >
                  Shop 11:11 Discounted Items →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const btnStyle = (active: boolean): React.CSSProperties => ({
  background: active ? '#D4AF37' : '#1e293b',
  color: active ? '#000' : '#fff',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '6px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background 0.2s',
});
