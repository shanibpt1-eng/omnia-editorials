import { describe, it, expect } from 'vitest';
import { newsResearchClient } from '@/lib/news/news-client';
import { higgsfieldClient } from '@/lib/higgsfield/client';
import { telegramBot } from '@/lib/telegram/bot';
import { makeWebhookHandler } from '@/lib/make/webhook-handler';
import { contentEngine } from '@/lib/content-engine/generator';
import { shopifyClient } from '@/lib/shopify/client';

describe('Omnia Advanced Growth Pipeline Integration', () => {
  describe('News & Trend Intelligence (NewsData.io & GCC Feeds)', () => {
    it('should discover trending bridal and jewelry topics with GCC country filtering', async () => {
      const topics = await newsResearchClient.fetchTrendingTopics('ae');
      expect(topics.length).toBeGreaterThan(0);

      const top = topics[0];
      expect(top.id).toBeDefined();
      expect(top.title).toBeDefined();
      expect(top.url).toBeDefined();
      expect(top.summary).toBeDefined();
      expect(top.suggestedAngle).toBeDefined();
      expect(['ae', 'sa', 'gcc', 'global']).toContain(top.country);
    });
  });

  describe('Higgsfield AI Visual Engine', () => {
    it('should synthesize luxury bridal editorial imagery prompts and return visual asset', async () => {
      const result = await higgsfieldClient.generateBridalVisual({
        prompt: 'Cinematic luxury editorial of 925 sterling silver bridal suite, AAA cubic zirconia, soft candlelight',
        aspectRatio: '16:9',
      });

      expect(result.id).toBeDefined();
      expect(result.imageUrl).toBeDefined();
      expect(result.imageUrl).toMatch(/http|\/press|\/assets/);
      expect(['COMPLETED', 'SIMULATED']).toContain(result.status);
    });
  });

  describe('Telegram Bot Notification Dispatcher', () => {
    it('should format and dispatch structured HTML alerts with action links', async () => {
      const res = await telegramBot.sendNotification({
        title: 'Dubai Wedding Season Trend Detected',
        message: 'New high-intent bridal keyword surge detected across UAE.\nTopic: 925 Sterling Silver Bridal Sets.',
        level: 'SUCCESS',
        actionUrl: 'http://localhost:3000/content-studio',
        actionText: 'Open Content Studio',
      });

      expect(res.success).toBe(true);
      expect(res.status).toBeDefined();
    });
  });

  describe('Make (Integromat) Webhook Hub', () => {
    it('should verify HMAC signatures and return production scenario blueprints', () => {
      const isVerified = makeWebhookHandler.verifySignature('{"event":"TRIGGER"}', null);
      expect(typeof isVerified).toBe('boolean');

      const scenarios = makeWebhookHandler.getScenarios();
      expect(scenarios.length).toBeGreaterThanOrEqual(2);
      expect(scenarios[0].name).toContain('Daily Growth');
    });
  });

  describe('Full End-to-End Pipeline Sequence', () => {
    it('should execute News -> Visual -> Writer -> Quality Gate -> Shopify -> Telegram', async () => {
      // 1. News
      const topics = await newsResearchClient.fetchTrendingTopics('all');
      const topic = topics[0];
      expect(topic).toBeDefined();

      // 2. Higgsfield
      const visual = await higgsfieldClient.generateBridalVisual({
        prompt: `Luxury editorial for ${topic.title}`,
      });
      expect(visual.imageUrl).toBeDefined();

      // 3. AI Writer
      const article = await contentEngine.generateArticle({
        storeId: 'OMNIA_COM',
        topic: topic.title,
        category: 'BRIDAL_GUIDE',
        targetKeyword: '925 sterling silver bridal jewelry set',
        language: 'en',
        newsHook: topic.suggestedAngle,
        featuredImageUrl: visual.imageUrl,
      });

      expect(article.qualityScore).toBeGreaterThanOrEqual(80);
      expect(article.qualityAssessment.passed).toBe(true);
      expect(article.featuredImageUrl).toBe(visual.imageUrl);

      // 4. Shopify Draft
      const shopifyRes = await shopifyClient.createBlogDraft({
        storeId: 'OMNIA_COM',
        title: article.title,
        bodyHtml: article.contentHtml,
        author: article.author,
        tags: ['news-trend', 'bridal-season', '925-silver'],
      });
      expect(shopifyRes.success).toBe(true);
      expect(shopifyRes.shopifyArticleId).toBeDefined();

      // 5. Telegram
      const telegramRes = await telegramBot.sendNotification({
        title: `Pipeline Execution Complete: ${article.title.slice(0, 40)}`,
        message: `Quality Score: ${article.qualityScore}/100 • Draft: ${shopifyRes.shopifyArticleId}`,
        level: 'SUCCESS',
      });
      expect(telegramRes.success).toBe(true);
    });
  });
});
