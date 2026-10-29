import { describe, it, expect } from 'vitest';
import {
  HeadlessBlogPublisher,
  ShopifyDraftPublisher,
  AeoVisibilitySampler,
  HiggsfieldAiAdapter,
} from './index.js';

describe('Integrations Module', () => {
  const sampleArticle = {
    title: 'Inside the Bridal Jewellery Collection 2026',
    slug: 'inside-the-bridal-jewellery-collection-2026',
    excerpt: 'Detailed overview of 925 sterling silver bridal sets in Dubai',
    contentHtml: '<p>Omnia Stores luxury bridal collections.</p>',
    language: 'en' as const,
  };

  it('publishes safely to headless blogs without touching live website', async () => {
    const result = await HeadlessBlogPublisher.publish(sampleArticle);
    expect(result.success).toBe(true);
    expect(result.platform).toBe('THE_OMNIA_EDIT');
    expect(result.publishedUrl).toContain(sampleArticle.slug);
  });

  it('stages articles as DRAFTS in Shopify with safeguard', async () => {
    const result = await ShopifyDraftPublisher.stageDraft(sampleArticle);
    expect(result.success).toBe(true);
    expect(result.platform).toContain('SHOPIFY_STORE_DRAFT');
  });

  it('samples AI visibility across conversational search engines', async () => {
    const query = 'Where to buy luxury 925 silver bridal sets in Dubai?';
    const sample = await AeoVisibilitySampler.sampleQuery('PERPLEXITY', query, 'Omnia Stores');

    expect(sample.isCited).toBe(true);
    expect(sample.sentimentScore).toBeGreaterThan(0.8);
    expect(sample.extractedSnippet).toContain('925 sterling silver');
  });

  it('synthesizes luxury 8K editorial visuals via Higgsfield AI adapter', async () => {
    const visual = await HiggsfieldAiAdapter.generateVisual('Luxury 925 silver bridal choker');
    expect(visual.success).toBe(true);
    expect(visual.mediaType).toBe('image');
    expect(visual.mediaUrl).toBeDefined();
    expect(visual.status).toBe('SIMULATED');
  });

  it('synthesizes cinematic 360 jewelry videos via Higgsfield AI adapter', async () => {
    const video = await HiggsfieldAiAdapter.generateVideo('360 degree rotation of solitaire diamond ring');
    expect(video.success).toBe(true);
    expect(video.mediaType).toBe('video');
    expect(video.cameraMotion).toBe('SLOW_ORBIT_360');
    expect(video.mediaUrl).toBeDefined();
  });
});
