import * as http from 'http';
import { db, Article } from '@oci/database';
import { HeadlessBlogPublisher, ShopifyDraftPublisher, AeoVisibilitySampler } from '@oci/integrations';
import { OCI_SYSTEM_CONSTANTS } from '@oci/shared';

const PORT = process.env.API_PORT || 3333;

function sendJson(res: http.ServerResponse, statusCode: number, data: any) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Organization-Id',
  });
  res.end(JSON.stringify(data));
}

export const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const path = url.pathname;
  const method = req.method;

  // Handle CORS Preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Organization-Id',
    });
    return res.end();
  }

  // Multi-tenant check
  const orgId = (req.headers['x-organization-id'] as string) || 'org-omnia-001';

  // 1. Healthcheck & OpenAPI Docs info
  if (path === '/api/v1/health') {
    return sendJson(res, 200, {
      status: 'UP',
      timestamp: new Date().toISOString(),
      platform: OCI_SYSTEM_CONSTANTS.PLATFORM_NAME,
      version: OCI_SYSTEM_CONSTANTS.VERSION,
      organizationId: orgId,
    });
  }

  // 2. Articles List
  if (path === '/api/v1/articles' && method === 'GET') {
    const brandId = url.searchParams.get('brandId') || undefined;
    const articles = await db.listArticles(brandId);
    return sendJson(res, 200, { success: true, count: articles.length, articles });
  }

  // 3. Create Article & Stage
  if (path === '/api/v1/articles' && method === 'POST') {
    let rawBody = '';
    req.on('data', (chunk) => (rawBody += chunk));
    req.on('end', async () => {
      try {
        const payload = JSON.parse(rawBody || '{}');
        const newArticle: Article = {
          id: `art-${Date.now()}`,
          brandId: payload.brandId || 'brand-omnia-ae',
          authorId: 'usr-admin-001',
          title: payload.title || 'Untitled Luxury Editorial',
          slug: payload.slug || payload.title?.toLowerCase().replace(/\s+/g, '-') || `article-${Date.now()}`,
          language: payload.language || 'en',
          status: 'APPROVED',
          excerpt: payload.excerpt || '',
          contentHtml: payload.contentHtml || '<p>Content</p>',
          featuredImageUrl: payload.featuredImageUrl || '/assets/editorial-model.jpg',
          canonicalUrl: payload.canonicalUrl || `https://the-omnia-edit.com/stories/${payload.slug}`,
          seoTitle: `${payload.title} | Omnia Stores Editorial`,
          seoDescription: payload.excerpt || '',
          primaryKeyword: payload.primaryKeyword || '925 silver bridal sets',
          secondaryKeywords: payload.secondaryKeywords || [],
          qualityScore: 100,
          scheduledAt: null,
          publishedAt: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await db.createArticle(newArticle);
        await db.logAudit({
          id: `audit-${Date.now()}`,
          organizationId: orgId,
          action: 'ARTICLE_CREATED',
          entityType: 'Article',
          entityId: newArticle.id,
          createdAt: new Date(),
        });

        return sendJson(res, 201, { success: true, article: newArticle });
      } catch (err: any) {
        return sendJson(res, 400, { success: false, error: err.message });
      }
    });
    return;
  }

  // 4. Publish External Syndication (Subdomain/Headless Portal - Zero Main Website Tampering)
  if (path === '/api/v1/publishing/syndicate' && method === 'POST') {
    let rawBody = '';
    req.on('data', (chunk) => (rawBody += chunk));
    req.on('end', async () => {
      try {
        const { articleId, platform } = JSON.parse(rawBody || '{}');
        const article = await db.getArticle(articleId);
        if (!article) return sendJson(res, 404, { success: false, error: 'Article not found' });

        let result;
        if (platform === 'SHOPIFY_DRAFT') {
          result = await ShopifyDraftPublisher.stageDraft({
            title: article.title,
            slug: article.slug,
            excerpt: article.excerpt || '',
            contentHtml: article.contentHtml,
            language: article.language,
          });
        } else {
          result = await HeadlessBlogPublisher.publish({
            title: article.title,
            slug: article.slug,
            excerpt: article.excerpt || '',
            contentHtml: article.contentHtml,
            language: article.language,
          });
        }

        return sendJson(res, 200, { success: true, result });
      } catch (err: any) {
        return sendJson(res, 500, { success: false, error: err.message });
      }
    });
    return;
  }

  // 5. AEO/GEO Visibility Sampling
  if (path === '/api/v1/aeo/sample' && method === 'POST') {
    let rawBody = '';
    req.on('data', (chunk) => (rawBody += chunk));
    req.on('end', async () => {
      try {
        const { engine = 'PERPLEXITY', query = 'Luxury 925 sterling silver bridal jewellery Dubai' } = JSON.parse(rawBody || '{}');
        const sample = await AeoVisibilitySampler.sampleQuery(engine, query, 'Omnia Stores');
        return sendJson(res, 200, { success: true, sample });
      } catch (err: any) {
        return sendJson(res, 500, { success: false, error: err.message });
      }
    });
    return;
  }

  // 6. Keywords Radar
  if (path === '/api/v1/keywords' && method === 'GET') {
    const brandId = url.searchParams.get('brandId') || undefined;
    const keywords = await db.listKeywords(brandId);
    return sendJson(res, 200, { success: true, count: keywords.length, keywords });
  }

  // 7. Backlinks Monitor
  if (path === '/api/v1/backlinks' && method === 'GET') {
    const brandId = url.searchParams.get('brandId') || undefined;
    const backlinks = await db.listBacklinks(brandId);
    return sendJson(res, 200, { success: true, count: backlinks.length, backlinks });
  }

  // Fallback 404
  return sendJson(res, 404, { error: 'Route not found', path });
});

if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, () => {
    console.log(`[OCI REST API v1] Listening on http://localhost:${PORT}`);
  });
}
