export type UserRole =
  | 'SUPER_ADMIN'
  | 'ORG_ADMIN'
  | 'EDITOR'
  | 'AUTHOR'
  | 'REVIEWER'
  | 'VIEWER';

export type ArticleStatus =
  | 'DRAFT'
  | 'IN_REVIEW'
  | 'APPROVED'
  | 'SCHEDULED'
  | 'PUBLISHED'
  | 'ARCHIVED';

export type LanguageCode = 'en' | 'ar';

export type PublishingPlatform =
  | 'HEADLESS_BLOG'
  | 'THE_OMNIA_EDIT'
  | 'EXTERNAL_PR_MEDIA'
  | 'SHOPIFY_STORE'
  | 'GHOST_CMS'
  | 'WORDPRESS'
  | 'WEBHOOK_RSS';

export type CitationEngine =
  | 'PERPLEXITY'
  | 'CHATGPT'
  | 'GEMINI'
  | 'CLAUDE'
  | 'GOOGLE_AI_OVERVIEWS';

export type BacklinkStatus =
  | 'ACTIVE'
  | 'LOST'
  | 'BROKEN'
  | 'FLAGGED_TOXIC'
  | 'DISAVOWED';

export type OutreachStatus =
  | 'IDENTIFIED'
  | 'PITCH_PREPARED'
  | 'PITCHED'
  | 'IN_NEGOTIATION'
  | 'ACCEPTED'
  | 'PUBLISHED'
  | 'REJECTED';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Brand {
  id: string;
  organizationId: string;
  name: string;
  slug: string;
  domain: string;
  currency: string;
  language: LanguageCode;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  organizationId: string;
  email: string;
  passwordHash: string;
  fullName: string;
  role: UserRole;
  mfaEnabled: boolean;
  mfaSecret?: string | null;
  isActive: boolean;
  lastLoginAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiKey {
  id: string;
  organizationId: string;
  name: string;
  keyPrefix: string;
  hashedSecret: string;
  expiresAt?: Date | null;
  lastUsedAt?: Date | null;
  createdAt: Date;
}

export interface Article {
  id: string;
  brandId: string;
  authorId: string;
  title: string;
  slug: string;
  language: LanguageCode;
  status: ArticleStatus;
  excerpt?: string | null;
  contentHtml: string;
  featuredImageUrl?: string | null;
  canonicalUrl?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  primaryKeyword?: string | null;
  secondaryKeywords: string[];
  qualityScore: number;
  scheduledAt?: Date | null;
  publishedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ArticleRevision {
  id: string;
  articleId: string;
  userId: string;
  title: string;
  contentHtml: string;
  changeLog?: string | null;
  createdAt: Date;
}

export interface Publication {
  id: string;
  articleId: string;
  platform: PublishingPlatform;
  externalId?: string | null;
  publishedUrl: string;
  status: string;
  responsePayload?: any;
  publishedAt: Date;
}

export interface Keyword {
  id: string;
  brandId: string;
  keyword: string;
  country: string;
  language: LanguageCode;
  searchVolume?: number | null;
  difficulty?: number | null;
  currentRank?: number | null;
  trackedUrl?: string | null;
  intent?: string | null;
  lastCheckedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Competitor {
  id: string;
  brandId: string;
  domain: string;
  brandName: string;
  marketShareEst?: number | null;
  domainRating?: number | null;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AiQuery {
  id: string;
  brandId: string;
  engine: CitationEngine;
  promptQuery: string;
  targetUrl?: string | null;
  isActive: boolean;
  lastRunAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AiCitation {
  id: string;
  aiQueryId: string;
  isCited: boolean;
  sentimentScore?: number | null;
  positionRank?: number | null;
  extractedSnippet?: string | null;
  responseRaw?: string | null;
  sampledAt: Date;
}

export interface Backlink {
  id: string;
  brandId: string;
  sourceUrl: string;
  targetUrl: string;
  anchorText?: string | null;
  isDofollow: boolean;
  domainAuthority?: number | null;
  status: BacklinkStatus;
  firstSeenAt: Date;
  lastCheckedAt: Date;
}

export interface OutreachTarget {
  id: string;
  brandId: string;
  publicationName: string;
  contactName?: string | null;
  contactEmail?: string | null;
  domain: string;
  authorityScore?: number | null;
  status: OutreachStatus;
  pitchNotes?: string | null;
  lastContactedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditLog {
  id: string;
  organizationId: string;
  userId?: string | null;
  action: string;
  entityType: string;
  entityId?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  metadata?: any;
  createdAt: Date;
}
