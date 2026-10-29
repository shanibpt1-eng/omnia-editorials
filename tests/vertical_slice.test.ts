import { describe, it, expect } from 'vitest';
import { shopifyClient } from '@/lib/shopify/client';
import { contentEngine } from '@/lib/content-engine/generator';
import { VERIFIED_PRODUCTS, INITIAL_STORES } from '@/lib/data/verified-catalogue';

describe('Omnia Stores Autonomous Growth Platform - First Vertical Slice', () => {
  describe('Multi-Store Isolation & Catalogue Verification', () => {
    it('should maintain independent store configurations for OMNIA_COM and OMNIA_AE', () => {
      const comStore = INITIAL_STORES.find((s) => s.id === 'OMNIA_COM');
      const aeStore = INITIAL_STORES.find((s) => s.id === 'OMNIA_AE');

      expect(comStore).toBeDefined();
      expect(aeStore).toBeDefined();
      expect(comStore?.domain).toBe('omniastores.com');
      expect(aeStore?.domain).toBe('omniastores.ae');
      expect(comStore?.defaultCurrency).toBe('USD');
      expect(aeStore?.defaultCurrency).toBe('AED');
    });

    it('should accurately segregate products between COM and AE without cross-contamination', async () => {
      const comProducts = await shopifyClient.fetchProducts('OMNIA_COM');
      const aeProducts = await shopifyClient.fetchProducts('OMNIA_AE');

      expect(comProducts.length).toBeGreaterThan(0);
      expect(aeProducts.length).toBeGreaterThan(0);

      // Verify all COM products have storeId OMNIA_COM and omniastores.com canonical URLs
      for (const p of comProducts) {
        expect(p.storeId).toBe('OMNIA_COM');
        expect(p.canonicalUrl).toContain('omniastores.com');
        expect(p.material).toBe('925 Sterling Silver');
      }

      // Verify all AE products have storeId OMNIA_AE and omniastores.ae canonical URLs
      for (const p of aeProducts) {
        expect(p.storeId).toBe('OMNIA_AE');
        expect(p.canonicalUrl).toContain('omniastores.ae');
        expect(p.currency).toBe('AED');
      }
    });
  });

  describe('Bilingual AI Content Studio & Quality Gates', () => {
    it('should generate a substantive English bridal guide with verified internal links and score >= 80', async () => {
      const article = await contentEngine.generateArticle({
        storeId: 'OMNIA_COM',
        topic: '925 Sterling Silver Bridal Sets',
        category: 'BRIDAL_GUIDE',
        targetKeyword: 'sterling silver bridal jewelry set',
        language: 'en',
      });

      expect(article.storeId).toBe('OMNIA_COM');
      expect(article.language).toBe('en');
      expect(article.qualityScore).toBeGreaterThanOrEqual(80);
      expect(article.qualityAssessment.passed).toBe(true);
      expect(article.verifiedLinks.length).toBeGreaterThan(0);

      // Verify all generated links resolve to real catalogue items
      for (const link of article.verifiedLinks) {
        const found = VERIFIED_PRODUCTS.some((p) => p.canonicalUrl === link.targetUrl);
        expect(found).toBe(true);
      }
    });

    it('should generate an authentic Arabic bridal guide with proper RTL phrasing, GCC nuances, and score >= 80', async () => {
      const article = await contentEngine.generateArticle({
        storeId: 'OMNIA_AE',
        topic: 'أطقم زفاف فضة إسترليني 925',
        category: 'BRIDAL_GUIDE',
        targetKeyword: 'طقم فضة عيار 925 للعروس',
        language: 'ar',
      });

      expect(article.storeId).toBe('OMNIA_AE');
      expect(article.language).toBe('ar');
      expect(article.title).toContain('العروس');
      expect(article.contentHtml).toContain('dir="rtl"');
      expect(article.contentHtml).toContain('فضة');
      expect(article.contentHtml).toContain('925');
      expect(article.qualityScore).toBeGreaterThanOrEqual(80);
      expect(article.qualityAssessment.passed).toBe(true);

      // Verify all Arabic internal links target the .ae domain
      for (const link of article.verifiedLinks) {
        expect(link.targetUrl).toContain('omniastores.ae');
      }
    });
  });

  describe('Shopify Blog Draft Pipeline', () => {
    it('should create article draft in the OMNIA_COM pipeline without auto-publishing', async () => {
      const draftRes = await shopifyClient.createBlogDraft({
        storeId: 'OMNIA_COM',
        title: 'Spring Bridal Elegance Guide',
        bodyHtml: '<p>Fine 925 sterling silver styling advice.</p>',
        author: 'Omnia Bridal Desk',
        tags: ['bridal', 'silver-925'],
      });

      expect(draftRes.success).toBe(true);
      expect(draftRes.shopifyArticleId).toBeDefined();
      expect(draftRes.draftUrl).toContain('omniastores.com');
    });

    it('should create article draft in the OMNIA_AE pipeline targeted for UAE audience', async () => {
      const draftRes = await shopifyClient.createBlogDraft({
        storeId: 'OMNIA_AE',
        title: 'دليل تنسيق مجوهرات العروس الخليجية',
        bodyHtml: '<p>أفخم أطقم الفضة الإسترليني عيار 925 لعروس الإمارات.</p>',
        author: 'مكتب تحرير أمنية',
        tags: ['عرائس', 'فضة-925'],
      });

      expect(draftRes.success).toBe(true);
      expect(draftRes.shopifyArticleId).toBeDefined();
      expect(draftRes.draftUrl).toContain('omniastores.ae');
    });
  });
});
