import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { server } from './main.js';

describe('OCI REST API Endpoints', () => {
  const testPort = 3338;

  beforeAll(async () => {
    await new Promise<void>((resolve) => server.listen(testPort, () => resolve()));
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });

  it('GET /api/v1/health returns system operational status', async () => {
    const res = await fetch(`http://localhost:${testPort}/api/v1/health`, {
      headers: { 'X-Organization-Id': 'org-omnia-001' },
    });
    expect(res.status).toBe(200);
    const data: any = await res.json();
    expect(data.status).toBe('UP');
    expect(data.platform).toContain('Omnia Content Intelligence');
  });

  it('GET /api/v1/articles returns seeded articles', async () => {
    const res = await fetch(`http://localhost:${testPort}/api/v1/articles`);
    expect(res.status).toBe(200);
    const data: any = await res.json();
    expect(data.success).toBe(true);
    expect(data.count).toBeGreaterThanOrEqual(1);
    expect(data.articles[0].title).toContain('Inside the Dubai Jewellery Brand');
  });

  it('POST /api/v1/publishing/syndicate syndicates article safely', async () => {
    const res = await fetch(`http://localhost:${testPort}/api/v1/publishing/syndicate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        articleId: 'art-001',
        platform: 'THE_OMNIA_EDIT',
      }),
    });
    expect(res.status).toBe(200);
    const data: any = await res.json();
    expect(data.success).toBe(true);
    expect(data.result.platform).toBe('THE_OMNIA_EDIT');
  });
});
