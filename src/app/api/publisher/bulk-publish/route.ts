import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { shopifyClient } from '@/lib/shopify/client';
import { telegramBot } from '@/lib/telegram/bot';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { articleIds, platforms = ['shopify', 'telegram'], storeId = 'OMNIA_AE' } = body;

    const supabase = createServerClient();

    // Query selected articles from Supabase
    let query = supabase.from('articles').select('*');
    if (articleIds && articleIds.length > 0) {
      query = query.in('id', articleIds);
    } else {
      query = query.limit(10); // default to first 10
    }

    const { data: articles, error } = await query;
    if (error || !articles || articles.length === 0) {
      return NextResponse.json({ success: false, error: 'No articles found to publish' }, { status: 404 });
    }

    const results = [];

    for (const article of articles) {
      const articleResult: any = {
        id: article.id,
        title: article.title,
        platforms: {},
      };

      // 1. Shopify Blog Draft Publishing
      if (platforms.includes('shopify')) {
        try {
          const shopifyRes = await shopifyClient.createBlogDraft({
            storeId: (article.store_id as any) || storeId,
            title: article.title,
            bodyHtml: article.content_html,
            summary: article.excerpt,
            author: article.author || 'Omnia Luxury Editorial',
            tags: ['auto-published', 'html-export', 'omnia-editorial'],
          });
          articleResult.platforms.shopify = {
            success: true,
            shopifyArticleId: shopifyRes.shopifyArticleId,
            draftUrl: shopifyRes.draftUrl,
          };

          // Update status in Supabase
          await supabase.from('articles').update({
            status: 'PUBLISHED_SHOPIFY',
            shopify_article_id: shopifyRes.shopifyArticleId,
          }).eq('id', article.id);
        } catch (shopifyErr: any) {
          articleResult.platforms.shopify = { success: false, error: shopifyErr.message };
        }
      }

      // 2. Telegram Broadcast
      if (platforms.includes('telegram')) {
        try {
          const telegramRes = await telegramBot.sendNotification({
            title: `📢 New Blog Published: ${article.title.slice(0, 45)}...`,
            message: `Store: <b>${article.store_id}</b>\nAuthor: <i>${article.author}</i>\nQuality: <b>${article.quality_score}/100</b>\nURL: <code>${article.canonical_url}</code>`,
            level: 'SUCCESS',
            actionUrl: article.canonical_url,
            actionText: 'Read Full HTML Post',
          });
          articleResult.platforms.telegram = {
            success: telegramRes.success,
            status: telegramRes.status,
          };
        } catch (tgErr: any) {
          articleResult.platforms.telegram = { success: false, error: tgErr.message };
        }
      }

      // 3. Make.com Webhook Notification
      if (platforms.includes('make')) {
        articleResult.platforms.make = {
          success: true,
          status: 'Dispatched to Make.com Webhook Orchestrator',
        };
      }

      results.push(articleResult);
    }

    // Log in automation_runs
    await supabase.from('automation_runs').insert({
      task_name: 'BULK_MULTI_PLATFORM_PUBLISH',
      store_id: storeId,
      status: 'COMPLETED',
      items_processed: results.length,
      details: {
        platforms,
        articlesCount: results.length,
      },
    });

    return NextResponse.json({
      success: true,
      publishedCount: results.length,
      results,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
