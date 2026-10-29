import { describe, it, expect } from 'vitest';
import { OciQueueWorker } from './index.js';

describe('OCI Worker Queue Processor', () => {
  it('processes AEO_VISIBILITY_SCAN job with citation calculation', async () => {
    const jobRes = await OciQueueWorker.processJob({
      id: 'job-101',
      type: 'AEO_VISIBILITY_SCAN',
      data: {
        engine: 'PERPLEXITY',
        query: 'Authentic 925 sterling silver bridal jewellery Dubai',
        brand: 'Omnia Stores',
      },
    });

    expect(jobRes.success).toBe(true);
    expect(jobRes.result.isCited).toBe(true);
    expect(jobRes.result.sentimentScore).toBeGreaterThan(0.8);
  });

  it('processes SCHEDULED_SYNDICATION without website collision', async () => {
    const jobRes = await OciQueueWorker.processJob({
      id: 'job-102',
      type: 'SCHEDULED_SYNDICATION',
      data: {
        articleId: 'art-001',
        platform: 'THE_OMNIA_EDIT',
      },
    });

    expect(jobRes.success).toBe(true);
    expect(jobRes.result.platform).toBe('THE_OMNIA_EDIT');
  });
});
