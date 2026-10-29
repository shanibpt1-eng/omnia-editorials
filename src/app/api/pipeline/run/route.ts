import { NextResponse } from 'next/server';
import { newsResearchClient } from '@/lib/news/news-client';
import { higgsfieldClient } from '@/lib/higgsfield/client';
import { contentEngine } from '@/lib/content-engine/generator';
import { shopifyClient } from '@/lib/shopify/client';
import { telegramBot } from '@/lib/telegram/bot';
import { createServerClient } from '@/lib/supabase/server';
import { StoreId } from '@/types';

export async function POST(req: Request) {
  const start = Date.now();
  try {
    const body = await req.json().catch(() => ({}));
    const storeId: StoreId = body.storeId || 'OMNIA_COM';
    const language: 'en' | 'ar' = body.language || (storeId === 'OMNIA_AE' ? 'ar' : 'en');

    // 1. News Research via NewsData.io / GCC Regional Intelligence
    const newsStart = Date.now();
    const trendingTopics = await newsResearchClient.fetchTrendingTopics(storeId === 'OMNIA_AE' ? 'sa' : 'all');
    const selectedTopic = trendingTopics[0];
    const newsLatency = Date.now() - newsStart;

    // 2. Higgsfield AI Visual Synthesis
    const hfStart = Date.now();
    const visual = await higgsfieldClient.generateBridalVisual({
      prompt: `Cinematic editorial photography of a 925 sterling silver bridal suite for ${selectedTopic.title}, soft warm luxury lighting, 8k`,
      aspectRatio: '16:9',
      style: 'LUXURY_EDITORIAL',
    });
    const hfLatency = Date.now() - hfStart;

    // 3. AI Writer Generation with live catalogue links & trending news angle
    const writeStart = Date.now();
    const article = await contentEngine.generateArticle({
      storeId,
      topic: selectedTopic.title,
      category: 'BRIDAL_GUIDE',
      targetKeyword: language === 'en' ? '925 sterling silver bridal set' : 'طقم فضة 925 للعروس',
      language,
      newsHook: selectedTopic.suggestedAngle,
      featuredImageUrl: visual.imageUrl,
    });
    const writeLatency = Date.now() - writeStart;

    // 4. Quality Gate Policy Check
    const qualityPassed = article.qualityAssessment.passed;

    // 5. Shopify Draft Creation
    const shopifyStart = Date.now();
    let shopifyResult = null;
    if (qualityPassed) {
      shopifyResult = await shopifyClient.createBlogDraft({
        storeId,
        title: article.title,
        bodyHtml: article.contentHtml,
        summary: article.excerpt,
        author: article.author,
        tags: ['news-trend', 'bridal-season', '925-silver', 'omnia-editorial'],
      });
    }
    const shopifyLatency = Date.now() - shopifyStart;

    // 6. Telegram Instant Notification Dispatch
    const telegramStart = Date.now();
    const telegramRes = await telegramBot.sendNotification({
      title: `Pipeline Execution: ${selectedTopic.title.slice(0, 50)}...`,
      message: `Store: <b>${storeId}</b>\nLanguage: <b>${language.toUpperCase()}</b>\nQuality Score: <b>${article.qualityScore}/100</b> (${qualityPassed ? 'PASSED ✅' : 'HOLD ⚠️'})\nDraft ID: <code>${shopifyResult?.shopifyArticleId || 'N/A'}</code>\nVisual: <i>${visual.status} (Higgsfield)</i>`,
      level: qualityPassed ? 'SUCCESS' : 'WARNING',
      actionUrl: shopifyResult?.draftUrl || `https://${storeId === 'OMNIA_COM' ? 'omniastores.com' : 'omniastores.ae'}`,
      actionText: 'Review Shopify Draft',
    });
    const telegramLatency = Date.now() - telegramStart;

    const totalDurationMs = Date.now() - start;

    // 7. Supabase Real-time Cloud Persistence (Runs, Articles, Notifications)
    try {
      const supabase = createServerClient();
      
      // Persist automation run
      await supabase.from('automation_runs').insert({
        task_name: 'CONTENT_PIPELINE_EXECUTION',
        store_id: storeId,
        status: qualityPassed ? 'COMPLETED' : 'HELD_BY_POLICY',
        duration_ms: totalDurationMs,
        items_processed: 1,
        details: {
          topic: selectedTopic.title,
          language,
          qualityScore: article.qualityScore,
          qualityPassed,
          telegramStatus: telegramRes.status,
          visualStatus: visual.status,
          shopifyDraftId: shopifyResult?.shopifyArticleId || null,
        },
      });

      // Persist generated article record
      await supabase.from('articles').upsert({
        store_id: storeId,
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content_html: article.contentHtml,
        language: article.language,
        author: article.author,
        status: qualityPassed ? 'APPROVED' : 'QUALITY_CHECK',
        quality_score: article.qualityScore,
        quality_assessment: article.qualityAssessment,
        seo_title: article.seoTitle,
        seo_description: article.seoDescription,
        canonical_url: article.canonicalUrl,
        featured_image_url: article.featuredImageUrl,
        shopify_article_id: shopifyResult?.shopifyArticleId || null,
      }, { onConflict: 'store_id,slug,language' });

      // Persist in-app notification
      await supabase.from('notifications').insert({
        title: `Pipeline Finished (${storeId})`,
        message: `Generated "${article.title.slice(0, 40)}..." (Score: ${article.qualityScore})`,
        severity: qualityPassed ? 'SUCCESS' : 'WARNING',
        action_url: '/content-studio',
      });
    } catch (dbErr) {
      console.error('Supabase persistence notice:', dbErr);
    }

    return NextResponse.json({
      success: true,
      executionId: `exec-${Date.now()}`,
      storeId,
      language,
      totalDurationMs,
      steps: [
        { name: 'NewsData.io Research', status: 'COMPLETED', latencyMs: newsLatency, data: { topic: selectedTopic.title, source: selectedTopic.source } },
        { name: 'Higgsfield AI Visual', status: visual.status, latencyMs: hfLatency, data: { imageUrl: visual.imageUrl } },
        { name: 'Autonomous AI Writer', status: 'COMPLETED', latencyMs: writeLatency, data: { title: article.title, wordCount: article.contentHtml.length } },
        { name: 'Quality Gate Policy', status: qualityPassed ? 'PASSED' : 'HOLD', latencyMs: 0, data: { score: article.qualityScore } },
        { name: 'Shopify Draft Staging', status: shopifyResult ? 'COMPLETED' : 'SKIPPED', latencyMs: shopifyLatency, data: shopifyResult },
        { name: 'Telegram Notification', status: telegramRes.status, latencyMs: telegramLatency, data: telegramRes },
      ],
      article,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message || 'Pipeline execution failed',
      },
      { status: 500 }
    );
  }
}
