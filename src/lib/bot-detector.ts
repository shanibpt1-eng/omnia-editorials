/**
 * The Vogue News — AI Crawler Recognition & Bot Verification Engine
 * Classifies search indexers, user-triggered fetchers, and AI model crawlers.
 */

import fs from 'fs';
import path from 'path';

export type BotCategory = 'search_indexer' | 'user_fetcher' | 'ai_training' | 'human_or_unknown';

export interface BotSignature {
  name: string;
  category: BotCategory;
  patterns: string[];
  docUrl: string;
}

export interface BotLogEntry {
  id: string;
  timestamp: string;
  botName: string;
  category: BotCategory;
  url: string;
  statusCode: number;
  ip: string;
  userAgent: string;
  isVerified: boolean;
}

const KNOWN_BOTS: BotSignature[] = [
  {
    name: 'Googlebot',
    category: 'search_indexer',
    patterns: ['googlebot', 'googlebot-news', 'google-inspectiontool'],
    docUrl: 'https://developers.google.com/search/docs/crawling-indexing/googlebot',
  },
  {
    name: 'Bingbot',
    category: 'search_indexer',
    patterns: ['bingbot', 'msnbot', 'bingpreview'],
    docUrl: 'https://www.bing.com/webmasters/help/which-crawlers-does-bing-use-8c184ec0',
  },
  {
    name: 'OAI-SearchBot',
    category: 'search_indexer',
    patterns: ['oai-searchbot'],
    docUrl: 'https://platform.openai.com/docs/bots',
  },
  {
    name: 'ChatGPT-User',
    category: 'user_fetcher',
    patterns: ['chatgpt-user'],
    docUrl: 'https://platform.openai.com/docs/bots',
  },
  {
    name: 'PerplexityBot',
    category: 'search_indexer',
    patterns: ['perplexitybot', 'perplexity-ai'],
    docUrl: 'https://docs.perplexity.ai',
  },
  {
    name: 'Claude-SearchBot',
    category: 'search_indexer',
    patterns: ['claude-searchbot'],
    docUrl: 'https://support.anthropic.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-it',
  },
  {
    name: 'ClaudeBot',
    category: 'ai_training',
    patterns: ['claudebot', 'anthropic-ai'],
    docUrl: 'https://support.anthropic.com',
  },
  {
    name: 'GPTBot',
    category: 'ai_training',
    patterns: ['gptbot'],
    docUrl: 'https://platform.openai.com/docs/gptbot',
  },
  {
    name: 'Applebot',
    category: 'search_indexer',
    patterns: ['applebot', 'applebot-extended'],
    docUrl: 'https://support.apple.com/en-us/119829',
  },
  {
    name: 'Google-Extended',
    category: 'ai_training',
    patterns: ['google-extended'],
    docUrl: 'https://developers.google.com/search/docs/crawling-indexing/google-extended',
  },
  {
    name: 'CCBot',
    category: 'ai_training',
    patterns: ['ccbot', 'commoncrawl'],
    docUrl: 'https://commoncrawl.org/connect/blog/common-crawl-crawler',
  },
];

const BOT_LOGS_PATH = path.join(process.cwd(), 'src', 'data', 'bot-crawl-logs.json');

// In-memory ring buffer (fast, zero disk contention)
let botLogsCache: BotLogEntry[] = [];

function loadLogs(): BotLogEntry[] {
  if (botLogsCache.length > 0) return botLogsCache;
  try {
    if (fs.existsSync(BOT_LOGS_PATH)) {
      const data = fs.readFileSync(BOT_LOGS_PATH, 'utf-8');
      botLogsCache = JSON.parse(data);
      return botLogsCache;
    }
  } catch (err) {
    console.error('Failed to read bot logs:', err);
  }
  return [];
}

/**
 * Identify bot from User-Agent string
 */
export function identifyBot(userAgent: string): { name: string; category: BotCategory } {
  if (!userAgent) return { name: 'Unknown', category: 'human_or_unknown' };
  const uaLower = userAgent.toLowerCase();

  for (const b of KNOWN_BOTS) {
    if (b.patterns.some((p) => uaLower.includes(p))) {
      return { name: b.name, category: b.category };
    }
  }

  if (uaLower.includes('bot') || uaLower.includes('crawler') || uaLower.includes('spider')) {
    return { name: 'Generic Crawler', category: 'human_or_unknown' };
  }

  return { name: 'Human Reader', category: 'human_or_unknown' };
}

/**
 * Log bot visit into ring buffer
 */
export function recordBotVisit(params: {
  userAgent: string;
  url: string;
  ip: string;
  statusCode?: number;
}) {
  const { name, category } = identifyBot(params.userAgent);
  if (category === 'human_or_unknown' && name === 'Human Reader') {
    return; // Do not log ordinary human readers to protect privacy
  }

  const entry: BotLogEntry = {
    id: `crawl-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toISOString(),
    botName: name,
    category,
    url: params.url,
    statusCode: params.statusCode || 200,
    ip: params.ip.replace(/(\d+)\.(\d+)\.(\d+)\.(\d+)/, '$1.$2.***.***'), // Anonymize IP
    userAgent: params.userAgent.slice(0, 180),
    isVerified: ['Googlebot', 'Bingbot', 'OAI-SearchBot', 'PerplexityBot'].includes(name),
  };

  const logs = loadLogs();
  logs.unshift(entry);
  botLogsCache = logs.slice(0, 500); // Keep last 500 records

  try {
    const dir = path.dirname(BOT_LOGS_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(BOT_LOGS_PATH, JSON.stringify(botLogsCache, null, 2), 'utf-8');
  } catch (err) {
    // Non-blocking log failure
  }
}

/**
 * Get aggregated analytics on crawler visits
 */
export function getBotAnalytics() {
  const logs = loadLogs();
  
  // Count by bot
  const byBot: Record<string, number> = {};
  const byCategory: Record<string, number> = {
    search_indexer: 0,
    user_fetcher: 0,
    ai_training: 0,
  };
  const byStatus: Record<string, number> = {};
  const urlHits: Record<string, number> = {};

  for (const l of logs) {
    byBot[l.botName] = (byBot[l.botName] || 0) + 1;
    if (byCategory[l.category] !== undefined) {
      byCategory[l.category]++;
    }
    const statusKey = String(l.statusCode);
    byStatus[statusKey] = (byStatus[statusKey] || 0) + 1;
    urlHits[l.url] = (urlHits[l.url] || 0) + 1;
  }

  const topUrls = Object.entries(urlHits)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([url, count]) => ({ url, count }));

  return {
    totalRequests: logs.length,
    byBot,
    byCategory,
    byStatus,
    topUrls,
    recentLogs: logs.slice(0, 50),
  };
}
