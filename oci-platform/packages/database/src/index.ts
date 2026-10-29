import {
  Organization,
  Brand,
  User,
  Article,
  Keyword,
  Competitor,
  AiQuery,
  Backlink,
  OutreachTarget,
  AuditLog,
} from './models.js';

/**
 * High-performance In-Memory Repository & Supabase Client Bridge.
 * Allows instant execution without external container dependencies.
 */
class MemoryDatabase {
  private organizations: Map<string, Organization> = new Map();
  private brands: Map<string, Brand> = new Map();
  private users: Map<string, User> = new Map();
  private articles: Map<string, Article> = new Map();
  private keywords: Map<string, Keyword> = new Map();
  private competitors: Map<string, Competitor> = new Map();
  private aiQueries: Map<string, AiQuery> = new Map();
  private backlinks: Map<string, Backlink> = new Map();
  private outreaches: Map<string, OutreachTarget> = new Map();
  private auditLogs: AuditLog[] = [];

  constructor() {
    this.seedDefaultData();
  }

  private seedDefaultData() {
    // 1. Omnia Stores Organization
    const defaultOrg: Organization = {
      id: 'org-omnia-001',
      name: 'Omnia Stores Group',
      slug: 'omnia-stores',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.organizations.set(defaultOrg.id, defaultOrg);

    // 2. Default Brands
    const brandAe: Brand = {
      id: 'brand-omnia-ae',
      organizationId: defaultOrg.id,
      name: 'Omnia Stores UAE & GCC',
      slug: 'omnia-ae',
      domain: 'omniastores.ae',
      currency: 'AED',
      language: 'ar',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const brandCom: Brand = {
      id: 'brand-omnia-com',
      organizationId: defaultOrg.id,
      name: 'Omnia Stores Global',
      slug: 'omnia-com',
      domain: 'omniastores.com',
      currency: 'AED',
      language: 'en',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.brands.set(brandAe.id, brandAe);
    this.brands.set(brandCom.id, brandCom);

    // 3. Super Admin User
    const adminUser: User = {
      id: 'usr-admin-001',
      organizationId: defaultOrg.id,
      email: 'admin@omniastores.com',
      passwordHash: '$2b$10$abcdefghijklmnopqrstuvwxyz123456', // bcrypt mock
      fullName: 'Omnia Editorial Director',
      role: 'SUPER_ADMIN',
      mfaEnabled: true,
      mfaSecret: 'JBSWY3DPEHPK3PXP',
      isActive: true,
      lastLoginAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(adminUser.id, adminUser);

    // 4. Seeded Article
    const seedArticle: Article = {
      id: 'art-001',
      brandId: brandAe.id,
      authorId: adminUser.id,
      title: 'Inside the Dubai Jewellery Brand Building a GCC-Focused Collection',
      slug: 'inside-the-dubai-jewellery-brand-building-a-gcc-focused-collection',
      language: 'en',
      status: 'PUBLISHED',
      excerpt: 'A premium jewellery editorial featuring verified Omnia Stores collection categories, practical style ideas and official shopping links.',
      contentHtml: '<p>Dubai-based Omnia Stores offers an online-first look at jewellery for weddings, occasions and everyday styling.</p>',
      featuredImageUrl: '/assets/editorial-model.jpg',
      canonicalUrl: 'https://omniastores.com/blogs/news/inside-the-dubai-jewellery-brand-building-a-gcc-focused-collection',
      seoTitle: 'Inside the Dubai Jewellery Brand Building a GCC-Focused Collection | The Omnia Edit',
      seoDescription: 'A premium jewellery editorial featuring verified Omnia Stores collection categories.',
      primaryKeyword: 'dubai luxury silver jewellery',
      secondaryKeywords: ['bridal sets dubai', '925 sterling silver uae'],
      qualityScore: 100,
      scheduledAt: null,
      publishedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.articles.set(seedArticle.id, seedArticle);
  }

  // Repository Methods
  public async getOrganization(id: string): Promise<Organization | null> {
    return this.organizations.get(id) || null;
  }

  public async getBrand(id: string): Promise<Brand | null> {
    return this.brands.get(id) || null;
  }

  public async listBrands(orgId: string): Promise<Brand[]> {
    return Array.from(this.brands.values()).filter((b) => b.organizationId === orgId);
  }

  public async listArticles(brandId?: string): Promise<Article[]> {
    const all = Array.from(this.articles.values());
    if (!brandId) return all;
    return all.filter((a) => a.brandId === brandId);
  }

  public async getArticle(id: string): Promise<Article | null> {
    return this.articles.get(id) || null;
  }

  public async createArticle(article: Article): Promise<Article> {
    this.articles.set(article.id, article);
    return article;
  }

  public async updateArticle(id: string, updates: Partial<Article>): Promise<Article | null> {
    const existing = this.articles.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...updates, updatedAt: new Date() };
    this.articles.set(id, updated);
    return updated;
  }

  public async listKeywords(brandId?: string): Promise<Keyword[]> {
    const all = Array.from(this.keywords.values());
    return brandId ? all.filter((k) => k.brandId === brandId) : all;
  }

  public async listCompetitors(brandId?: string): Promise<Competitor[]> {
    const all = Array.from(this.competitors.values());
    return brandId ? all.filter((c) => c.brandId === brandId) : all;
  }

  public async listAiQueries(brandId?: string): Promise<AiQuery[]> {
    const all = Array.from(this.aiQueries.values());
    return brandId ? all.filter((q) => q.brandId === brandId) : all;
  }

  public async listBacklinks(brandId?: string): Promise<Backlink[]> {
    const all = Array.from(this.backlinks.values());
    return brandId ? all.filter((b) => b.brandId === brandId) : all;
  }

  public async listOutreach(brandId?: string): Promise<OutreachTarget[]> {
    const all = Array.from(this.outreaches.values());
    return brandId ? all.filter((o) => o.brandId === brandId) : all;
  }

  public async logAudit(log: AuditLog): Promise<void> {
    this.auditLogs.unshift(log);
  }

  public async listAuditLogs(orgId: string): Promise<AuditLog[]> {
    return this.auditLogs.filter((l) => l.organizationId === orgId);
  }
}

export const db = new MemoryDatabase();
export * from './models.js';
