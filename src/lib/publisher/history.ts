import fs from 'fs';
import path from 'path';

export interface ArticleRevision {
  revisionId: string;
  articleId: string;
  slug: string;
  timestamp: string;
  action: 'INITIAL_PUBLISH' | 'BACKEND_EDIT' | 'DAILY_AUTOMATION' | 'REVERTED' | 'SYNC_RESTORE' | 'REMOVED_FROM_STOREFRONT';
  changeSummary: string;
  authorName?: string;
  snapshot: any;
  mismatchDetected?: boolean;
}

const HISTORY_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'article-history.json');
const PUBLISHED_JSON_PATH = path.join(
  process.cwd(),
  'oci-platform',
  'apps',
  'web',
  'src',
  'data',
  'published-articles.json'
);

/**
 * Reads all revisions from disk
 */
export function readHistory(): ArticleRevision[] {
  if (!fs.existsSync(HISTORY_FILE_PATH)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(HISTORY_FILE_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading article history:', err);
    return [];
  }
}

/**
 * Saves all revisions to disk
 */
export function writeHistory(history: ArticleRevision[]): void {
  const dir = path.dirname(HISTORY_FILE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(HISTORY_FILE_PATH, JSON.stringify(history, null, 2), 'utf-8');
}

/**
 * Reads current published articles on Port 3001 storefront
 */
export function readPublishedArticles(): any[] {
  if (!fs.existsSync(PUBLISHED_JSON_PATH)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(PUBLISHED_JSON_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading published articles:', err);
    return [];
  }
}

/**
 * Writes current published articles to Port 3001 storefront
 */
export function writePublishedArticles(articles: any[]): void {
  const dir = path.dirname(PUBLISHED_JSON_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(PUBLISHED_JSON_PATH, JSON.stringify(articles, null, 2), 'utf-8');
}

/**
 * Detects if the current storefront article differs from the provided snapshot/version
 */
export function detectMismatch(currentStorefrontArticle: any, targetArticle: any): {
  hasMismatch: boolean;
  differences: string[];
} {
  if (!currentStorefrontArticle) {
    return { hasMismatch: true, differences: ['Article not found on storefront (404)'] };
  }

  const differences: string[] = [];

  if (currentStorefrontArticle.title !== targetArticle.title) {
    differences.push(`Title changed: "${currentStorefrontArticle.title}" vs "${targetArticle.title}"`);
  }
  if (currentStorefrontArticle.titleAr !== targetArticle.titleAr) {
    differences.push('Arabic Title mismatch');
  }
  if (currentStorefrontArticle.coverImage !== targetArticle.coverImage) {
    differences.push(`Cover image changed: ${currentStorefrontArticle.coverImage}`);
  }
  if (currentStorefrontArticle.excerpt !== targetArticle.excerpt) {
    differences.push('Excerpt updated');
  }
  if (
    currentStorefrontArticle.contentHtml &&
    targetArticle.contentHtml &&
    currentStorefrontArticle.contentHtml.length !== targetArticle.contentHtml.length
  ) {
    differences.push('Content body changed');
  }

  return {
    hasMismatch: differences.length > 0,
    differences,
  };
}

/**
 * Records a new historical revision for an article
 */
export function recordRevision(
  article: any,
  action: ArticleRevision['action'],
  changeSummary: string
): ArticleRevision {
  const history = readHistory();
  const revisionId = `rev-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const newRevision: ArticleRevision = {
    revisionId,
    articleId: article.id || `art-${Date.now()}`,
    slug: article.slug,
    timestamp: new Date().toISOString(),
    action,
    changeSummary,
    authorName: article.author?.name || 'Omnia Luxury Editorial Desk',
    snapshot: JSON.parse(JSON.stringify(article)),
  };

  history.unshift(newRevision);
  writeHistory(history);
  return newRevision;
}

/**
 * Reverts an article to a specific historical revision
 */
export function revertToRevision(
  revisionId: string,
  slug?: string
): { success: boolean; article?: any; error?: string } {
  const history = readHistory();
  const targetRevision = history.find(
    (rev) => rev.revisionId === revisionId || (slug && rev.slug === slug && rev.revisionId === revisionId)
  );

  if (!targetRevision || !targetRevision.snapshot) {
    return { success: false, error: `Revision ${revisionId} not found in history archive.` };
  }

  const restoredArticle = targetRevision.snapshot;

  // 1. Update Port 3001 published-articles.json
  const currentArticles = readPublishedArticles();
  const filtered = currentArticles.filter(
    (a) => a.id !== restoredArticle.id && a.slug !== restoredArticle.slug
  );
  filtered.unshift(restoredArticle);
  writePublishedArticles(filtered);

  // 2. Record this revert action in history
  recordRevision(
    restoredArticle,
    'REVERTED',
    `Reverted to version from ${new Date(targetRevision.timestamp).toLocaleString()} (${targetRevision.changeSummary})`
  );

  return {
    success: true,
    article: restoredArticle,
  };
}

/**
 * Updates an article's content in backend and pushes to storefront
 */
export function updateArticleContent(
  articleIdOrSlug: string,
  updates: Partial<any>
): { success: boolean; article?: any; error?: string } {
  const currentArticles = readPublishedArticles();
  const index = currentArticles.findIndex(
    (a) => a.id === articleIdOrSlug || a.slug === articleIdOrSlug
  );

  if (index === -1) {
    // Article not yet in storefront published-articles.json: add it and initialize
    const newArticle = {
      id: articleIdOrSlug.startsWith('art-') ? articleIdOrSlug : `art-${Date.now()}`,
      slug: updates.slug || articleIdOrSlug,
      title: updates.title || 'Omnia Luxury Editorial',
      titleAr: updates.titleAr || updates.title || 'افتتاحية أمنية الفاخرة',
      category: updates.category || 'High Jewellery',
      coverImage: updates.coverImage || '/ai-luxury/royal-empress-vogue-model.jpg',
      publication: updates.publication || 'Vogue Arabia',
      excerpt: updates.excerpt || '',
      excerptAr: updates.excerptAr || '',
      contentHtml: updates.contentHtml || '',
      ...updates,
      date: updates.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    };

    currentArticles.unshift(newArticle);
    writePublishedArticles(currentArticles);

    recordRevision(
      newArticle,
      'BACKEND_EDIT',
      updates.changeSummary || 'Initial article creation & publication from backend'
    );

    return {
      success: true,
      article: newArticle,
    };
  }

  const existing = currentArticles[index];
  const updatedArticle = {
    ...existing,
    ...updates,
    date: updates.date || existing.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
  };

  // Replace in storefront list
  currentArticles[index] = updatedArticle;
  writePublishedArticles(currentArticles);

  // Record revision
  recordRevision(
    updatedArticle,
    'BACKEND_EDIT',
    updates.changeSummary || 'Custom edit applied from Growth Intelligence Backend'
  );

  return {
    success: true,
    article: updatedArticle,
  };
}

/**
 * Unpublishes and removes an article from Port 3001 storefront catalogue
 * and records a REMOVED_FROM_STOREFRONT snapshot in history for safe recovery.
 */
export function unpublishArticleFromStorefront(
  articleIdOrSlug: string,
  reason?: string
): { success: boolean; removedArticle?: any; remainingCount: number; error?: string } {
  const currentArticles = readPublishedArticles();
  const targetIndex = currentArticles.findIndex(
    (a) => a.id === articleIdOrSlug || a.slug === articleIdOrSlug
  );

  if (targetIndex === -1) {
    return {
      success: false,
      remainingCount: currentArticles.length,
      error: `Article "${articleIdOrSlug}" is not currently published on the storefront.`,
    };
  }

  const [removed] = currentArticles.splice(targetIndex, 1);
  writePublishedArticles(currentArticles);

  // Record unpublish event in history for rollback/restoration
  recordRevision(
    removed,
    'REMOVED_FROM_STOREFRONT',
    reason || `Article "${removed.title}" unpublished and removed from Port 3001 storefront`
  );

  return {
    success: true,
    removedArticle: removed,
    remainingCount: currentArticles.length,
  };
}
