export type StoreId = 'OMNIA_COM' | 'OMNIA_AE';

export interface Store {
  id: StoreId;
  name: string;
  domain: string;
  defaultLanguage: 'en' | 'ar';
  defaultCurrency: string;
  targetMarkets: string[];
  isActive: boolean;
}

export interface StoreConnection {
  storeId: StoreId;
  shopDomain: string;
  isConnected: boolean;
  connectionStatus: 'CONNECTED' | 'DISCONNECTED' | 'ERROR' | 'REVOKED';
  scopes: string[];
  lastSyncAt?: string;
  lastError?: string;
}

export interface ProductVariant {
  id: string;
  shopifyVariantId: string;
  title: string;
  sku?: string;
  price: number;
  compareAtPrice?: number;
  inventoryQuantity: number;
  isAvailable: boolean;
}

export interface Product {
  id: string;
  storeId: StoreId;
  shopifyProductId: string;
  title: string;
  handle: string;
  vendor?: string;
  brand?: string;
  productType: string;
  status: 'ACTIVE' | 'DRAFT' | 'ARCHIVED';
  tags: string[];
  bodyHtml?: string;
  canonicalUrl: string;
  primaryImageUrl: string;
  secondaryImages?: string[];
  category: string;
  material: string;
  stoneType?: string;
  isInStock: boolean;
  minPrice: number;
  maxPrice: number;
  currency: string;
  variants?: ProductVariant[];
  syncedAt: string;
}

export interface Collection {
  id: string;
  storeId: StoreId;
  shopifyCollectionId: string;
  title: string;
  handle: string;
  description?: string;
  imageUrl?: string;
  canonicalUrl: string;
  syncedAt: string;
}

export interface QualityAssessment {
  overallScore: number; // 0 - 100
  passed: boolean;
  breakdown: {
    factualAccuracy: { score: number; passed: boolean; message: string };
    uniqueness: { score: number; passed: boolean; message: string };
    internalLinkIntegrity: { score: number; passed: boolean; verifiedLinksCount: number; message: string };
    seoReadability: { score: number; passed: boolean; message: string };
    brandAlignment: { score: number; passed: boolean; message: string };
  };
  policyViolations: string[];
}

export interface ContentLink {
  productTitle: string;
  targetUrl: string;
  anchorText: string;
  isVerified: boolean;
}

export interface Article {
  id: string;
  storeId: StoreId;
  title: string;
  slug: string;
  excerpt: string;
  contentHtml: string;
  contentMarkdown?: string;
  language: 'en' | 'ar';
  author: string;
  status: 'DRAFT' | 'QUALITY_CHECK' | 'APPROVED' | 'PUBLISHED_SHOPIFY' | 'PUBLISHED_STOREFRONT' | 'REJECTED';
  qualityScore: number;
  qualityAssessment: QualityAssessment;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  featuredImageUrl?: string;
  verifiedLinks: ContentLink[];
  shopifyArticleId?: string;
  shopifyBlogId?: string;
  publishedAt?: string;
  createdAt: string;
}

export interface FAQItem {
  id: string;
  storeId: StoreId;
  questionEn: string;
  answerEn: string;
  questionAr?: string;
  answerAr?: string;
  category: 'PRODUCT_CARE' | 'SHIPPING_DELIVERY' | 'SIZING_MATERIALS' | 'RETURNS_WARRANTY';
  sourceEvidence: string;
  isVerified: boolean;
  isPublished: boolean;
}

export interface DiscountCampaign {
  id: string;
  storeId: StoreId;
  campaignName: string;
  discountCode: string;
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING';
  value: number;
  minOrderValue: number;
  appliesToCollections: string[];
  startsAt: string;
  endsAt?: string;
  usageLimit?: number;
  approvalStatus: 'PROPOSAL' | 'APPROVED' | 'REJECTED' | 'ACTIVE_SHOPIFY';
  projectedCost: number;
  marginSafetyPassed: boolean;
  shopifyPriceRuleId?: string;
}

export interface BacklinkProspect {
  id: string;
  domain: string;
  publisherName: string;
  contactName?: string;
  contactEmail?: string;
  authorityScore: number;
  targetCategory: string;
  status: 'DISCOVERED' | 'QUALIFIED' | 'OUTREACH_DRAFTED' | 'CONTACTED' | 'PLACEMENT_WON' | 'DECLINED';
  country: string;
  language: string;
  placementUrl?: string;
  isPlacementVerified?: boolean;
}

export interface AutomationRun {
  id: string;
  taskName: string;
  storeId?: StoreId;
  status: 'RUNNING' | 'COMPLETED' | 'FAILED' | 'HELD_BY_POLICY';
  itemsProcessed: number;
  durationMs: number;
  errorMessage?: string;
  details?: Record<string, any>;
  createdAt: string;
}
