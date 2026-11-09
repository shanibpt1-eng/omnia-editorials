const express = require('express');
const cors = require('cors');

// Use native fetch in Node 18+ or fallback to node-fetch if available
const fetchFn = typeof fetch !== 'undefined' ? fetch : require('node-fetch');

// Optional dotenv loader
try {
  require('dotenv').config({ path: '../.env.local' });
  require('dotenv').config();
} catch (e) {
  // Dotenv optional if env vars are set via process.env
}

const app = express();
const PORT = process.env.PORT || 5000;

// API key from NewsData.io via environment variables
const API_KEY = process.env.NEWS_API_KEY || process.env.NEWSDATA_API_KEY || 'pub_237440f77ad946f5a9497076484516b5';

// Strict CORS mapping for your domain & local environments
const ALLOWED_ORIGINS = [
  'https://blog.1fill.com',
  'https://1fill.com',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS not allowed for this origin: ' + origin));
  },
  methods: ['GET', 'POST']
}));

app.use(express.json());

// 1. Health Status Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    target_domain: 'omniastores.com',
    service: 'Omnia Stores Luxury Editorial & News Backend',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

const STORE_DISCOUNTED_ITEMS_URL = 'https://omniastores.com/collections/discounted-items';

const FALLBACK_GCC_ARTICLES = [
  {
    id: 'gcc-fallback-1',
    title: 'GCC Digital Commerce Accelerates Across UAE and Saudi Arabia with Next-Gen Automation',
    description: 'Enterprise operations across Dubai, Riyadh, and Doha are adopting unified logistics and autonomous dispatch platforms to streamline cross-border fulfillment.',
    source: 'GCC Business Desk',
    category: 'GCC & Middle East',
    url: STORE_DISCOUNTED_ITEMS_URL,
    publishedAt: new Date().toISOString(),
    brandTakeaway: 'Shop exclusive certified 925 sterling silver suites at factory-direct 11.11 savings.',
    utmUrl: `${STORE_DISCOUNTED_ITEMS_URL}?utm_source=editorial_wire&utm_medium=gcc_article&utm_campaign=11_11_mega_sale`
  },
  {
    id: 'gcc-fallback-2',
    title: 'Saudi Vision 2030 Drives Record Regional Growth in Cloud Integration and Borderless Logistics',
    description: 'Regional investments in scalable commerce infrastructure hit multi-billion dollar milestones across the Gulf economic corridor.',
    source: 'Riyadh Financial Desk',
    category: 'GCC & Middle East',
    url: STORE_DISCOUNTED_ITEMS_URL,
    publishedAt: new Date().toISOString(),
    brandTakeaway: 'Experience instant GCC insured courier delivery across Riyadh, Dubai, and Jeddah.',
    utmUrl: `${STORE_DISCOUNTED_ITEMS_URL}?utm_source=editorial_wire&utm_medium=gcc_article&utm_campaign=saudi_expansion`
  }
];

const FALLBACK_WORLD_ARTICLES = [
  {
    id: 'world-fallback-1',
    title: 'Global Supply Chains Turn to Real-Time Predictive AI to Counter Logistics Volatility',
    description: 'International freight and logistics leaders report widespread migration to automated dispatch and real-time replenishment systems worldwide.',
    source: 'Worldwide Desk',
    category: 'Worldwide',
    url: STORE_DISCOUNTED_ITEMS_URL,
    publishedAt: new Date().toISOString(),
    brandTakeaway: 'Omnia Stores guarantees certified hallmark authenticity on all 11.11 luxury orders.',
    utmUrl: `${STORE_DISCOUNTED_ITEMS_URL}?utm_source=editorial_wire&utm_medium=world_article&utm_campaign=global_supply`
  },
  {
    id: 'world-fallback-2',
    title: 'Cross-Border Digital Infrastructure Reaches New Peak in Intercontinental Trade Volume',
    description: 'Fintech and e-commerce leaders reveal exponential adoption of unified multi-currency workflows across EMEA and Asia.',
    source: 'Global Markets Wire',
    category: 'Worldwide',
    url: STORE_DISCOUNTED_ITEMS_URL,
    publishedAt: new Date().toISOString(),
    brandTakeaway: 'Unlock seamless multi-currency checkout with Tabby 4 split payments in AED and SAR.',
    utmUrl: `${STORE_DISCOUNTED_ITEMS_URL}?utm_source=editorial_wire&utm_medium=world_article&utm_campaign=borderless_trade`
  }
];

// 2. GCC News Route
app.get('/api/news/gcc', async (req, res) => {
  try {
    const url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&country=ae,sa,qa,kw,om,bh&language=en,ar&category=business,technology`;
    const response = await fetchFn(url);
    const data = await response.json();

    if (data.status === 'success' && Array.isArray(data.results) && data.results.length > 0) {
      const articles = data.results.map((item, index) => ({
        id: item.article_id || `gcc-${index}-${Date.now()}`,
        title: item.title,
        description: item.description || item.content || 'Live regional coverage from the GCC wire.',
        source: item.source_id || 'GCC Business Desk',
        category: 'GCC & Middle East',
        url: item.link,
        publishedAt: item.pubDate,
        brandTakeaway: 'Shop certified 925 sterling silver suites at factory-direct 11.11 savings.',
        utmUrl: `${STORE_DISCOUNTED_ITEMS_URL}?utm_source=editorial_wire&utm_medium=gcc_article&utm_campaign=${encodeURIComponent(item.title ? item.title.slice(0, 20) : 'gcc_news')}`
      }));

      return res.json({ success: true, count: articles.length, live: true, articles });
    }

    console.warn('NewsData.io returned no live results, using fallback cache:', data);
    res.json({ success: true, count: FALLBACK_GCC_ARTICLES.length, live: false, articles: FALLBACK_GCC_ARTICLES });
  } catch (error) {
    console.warn('GCC News API offline or unreachable, serving fallback:', error.message);
    res.json({ success: true, count: FALLBACK_GCC_ARTICLES.length, live: false, articles: FALLBACK_GCC_ARTICLES });
  }
});

// 3. Worldwide Breaking News Route
app.get('/api/news/world', async (req, res) => {
  try {
    const url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&language=en&category=technology,business&prioritydomain=top`;
    const response = await fetchFn(url);
    const data = await response.json();

    if (data.status === 'success' && Array.isArray(data.results) && data.results.length > 0) {
      const articles = data.results.map((item, index) => ({
        id: item.article_id || `world-${index}-${Date.now()}`,
        title: item.title,
        description: item.description || item.content || 'Global breaking news report.',
        source: item.source_id || 'Worldwide Desk',
        category: 'Worldwide',
        url: item.link,
        publishedAt: item.pubDate,
        brandTakeaway: 'Omnia Stores guarantees certified hallmark authenticity on all 11.11 luxury orders.',
        utmUrl: `${STORE_DISCOUNTED_ITEMS_URL}?utm_source=editorial_wire&utm_medium=world_article&utm_campaign=${encodeURIComponent(item.title ? item.title.slice(0, 20) : 'world_news')}`
      }));

      return res.json({ success: true, count: articles.length, live: true, articles });
    }

    console.warn('NewsData.io returned no live results, using fallback cache:', data);
    res.json({ success: true, count: FALLBACK_WORLD_ARTICLES.length, live: false, articles: FALLBACK_WORLD_ARTICLES });
  } catch (error) {
    console.warn('World News API offline or unreachable, serving fallback:', error.message);
    res.json({ success: true, count: FALLBACK_WORLD_ARTICLES.length, live: false, articles: FALLBACK_WORLD_ARTICLES });
  }
});

app.listen(PORT, () => {
  console.log(`1Fill Blog Backend running on port ${PORT}`);
});
