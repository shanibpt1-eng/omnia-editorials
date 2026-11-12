/**
 * The Vogue News — IndexNow Protocol Client & Submission Engine
 * Supports Bing, Yandex, Naver, Seznam and participating search engines.
 */

import fs from 'fs';
import path from 'path';
import { SEO_CONFIG } from './seo-config';

export interface IndexNowSubmissionRecord {
  id: string;
  timestamp: string;
  urls: string[];
  status: 'success' | 'failed' | 'pending';
  httpStatus?: number;
  engine: string;
  responseMessage?: string;
  retries: number;
}

const HISTORY_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'indexnow-history.json');

// In-memory cache for ultra-fast access
let inMemoryHistory: IndexNowSubmissionRecord[] = [];

function loadHistory(): IndexNowSubmissionRecord[] {
  if (inMemoryHistory.length > 0) return inMemoryHistory;
  try {
    if (fs.existsSync(HISTORY_FILE_PATH)) {
      const data = fs.readFileSync(HISTORY_FILE_PATH, 'utf-8');
      inMemoryHistory = JSON.parse(data);
      return inMemoryHistory;
    }
  } catch (err) {
    console.error('Failed to read IndexNow history:', err);
  }
  return [];
}

function saveHistory(record: IndexNowSubmissionRecord) {
  try {
    const list = loadHistory();
    list.unshift(record);
    // Keep last 200 submissions
    inMemoryHistory = list.slice(0, 200);
    const dir = path.dirname(HISTORY_FILE_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(HISTORY_FILE_PATH, JSON.stringify(inMemoryHistory, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save IndexNow history:', err);
  }
}

/**
 * Submit URLs directly to IndexNow endpoint with retry backoff
 */
export async function submitToIndexNow(rawUrls: string[]): Promise<{
  success: boolean;
  submittedUrls: string[];
  results: Record<string, any>;
  message: string;
}> {
  // Normalize & deduplicate
  const cleanUrls = Array.from(
    new Set(
      rawUrls
        .map((u) => u.trim())
        .filter((u) => u.length > 0)
        .map((u) => (u.startsWith('http') ? u : `${SEO_CONFIG.siteUrl}${u.startsWith('/') ? '' : '/'}${u}`))
    )
  );

  if (cleanUrls.length === 0) {
    return {
      success: false,
      submittedUrls: [],
      results: {},
      message: 'No valid URLs provided for IndexNow submission.',
    };
  }

  const payload = {
    host: 'thevoguenews.com',
    key: SEO_CONFIG.indexNow.key,
    keyLocation: SEO_CONFIG.indexNow.keyLocation,
    urlList: cleanUrls.slice(0, 10000), // Max 10,000 per RFC
  };

  const engines = [
    { name: 'IndexNow Central', url: SEO_CONFIG.indexNow.endpoint },
    { name: 'Bing IndexNow', url: SEO_CONFIG.indexNow.bingEndpoint },
  ];

  const results: Record<string, any> = {};
  let overallSuccess = false;

  for (const engine of engines) {
    let retries = 0;
    let lastError = '';
    let statusCode = 0;
    let done = false;

    while (retries <= 2 && !done) {
      try {
        const response = await fetch(engine.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'User-Agent': 'TheVogueNews-IndexNow/1.0',
          },
          body: JSON.stringify(payload),
        });

        statusCode = response.status;
        const text = await response.text();

        // 200 OK or 202 Accepted means submission was received
        if (response.ok || response.status === 200 || response.status === 202) {
          results[engine.name] = {
            status: 'success',
            code: response.status,
            message: 'URLs accepted for indexing pipeline',
          };
          done = true;
          overallSuccess = true;
        } else if (response.status === 429) {
          // Rate limited, wait with backoff
          retries++;
          await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, retries)));
        } else {
          lastError = `HTTP ${response.status}: ${text.slice(0, 100)}`;
          retries++;
        }
      } catch (err: any) {
        lastError = err.message || 'Network fetch failed';
        retries++;
        await new Promise((r) => setTimeout(r, 500 * retries));
      }
    }

    if (!done) {
      results[engine.name] = {
        status: 'failed',
        code: statusCode || 500,
        message: lastError,
      };
    }

    // Record in history log
    saveHistory({
      id: `idx-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      urls: cleanUrls,
      status: done ? 'success' : 'failed',
      httpStatus: statusCode || (done ? 200 : 500),
      engine: engine.name,
      responseMessage: done ? 'Accepted by search engine' : lastError,
      retries,
    });
  }

  return {
    success: overallSuccess,
    submittedUrls: cleanUrls,
    results,
    message: overallSuccess
      ? `Successfully submitted ${cleanUrls.length} URL(s) to search engine discovery pipes.`
      : 'IndexNow submission failed across attempted endpoints.',
  };
}

/**
 * Get recent IndexNow submission history and analytics
 */
export function getIndexNowStatus() {
  const history = loadHistory();
  const totalSubmissions = history.length;
  const successfulSubmissions = history.filter((h) => h.status === 'success').length;
  const failedSubmissions = history.filter((h) => h.status === 'failed').length;
  const uniqueUrlsSubmitted = new Set(history.flatMap((h) => h.urls)).size;
  const lastSubmission = history[0] || null;

  return {
    key: SEO_CONFIG.indexNow.key,
    keyLocation: SEO_CONFIG.indexNow.keyLocation,
    host: 'thevoguenews.com',
    totalSubmissions,
    successfulSubmissions,
    failedSubmissions,
    uniqueUrlsSubmitted,
    lastSubmissionTime: lastSubmission?.timestamp || null,
    recentHistory: history.slice(0, 30),
  };
}
