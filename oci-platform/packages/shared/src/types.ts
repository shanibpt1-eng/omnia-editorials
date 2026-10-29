import { z } from 'zod';

export const UserRoleSchema = z.enum([
  'SUPER_ADMIN',
  'ORG_ADMIN',
  'EDITOR',
  'AUTHOR',
  'REVIEWER',
  'VIEWER',
]);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const ArticleStatusSchema = z.enum([
  'DRAFT',
  'IN_REVIEW',
  'APPROVED',
  'SCHEDULED',
  'PUBLISHED',
  'ARCHIVED',
]);
export type ArticleStatus = z.infer<typeof ArticleStatusSchema>;

export const LanguageCodeSchema = z.enum(['en', 'ar']);
export type LanguageCode = z.infer<typeof LanguageCodeSchema>;

export const PublishingPlatformSchema = z.enum([
  'HEADLESS_BLOG',
  'THE_OMNIA_EDIT',
  'EXTERNAL_PR_MEDIA',
  'SHOPIFY_STORE',
  'GHOST_CMS',
  'WORDPRESS',
  'WEBHOOK_RSS',
]);
export type PublishingPlatform = z.infer<typeof PublishingPlatformSchema>;

export const CitationEngineSchema = z.enum([
  'PERPLEXITY',
  'CHATGPT',
  'GEMINI',
  'CLAUDE',
  'GOOGLE_AI_OVERVIEWS',
]);
export type CitationEngine = z.infer<typeof CitationEngineSchema>;

export const BacklinkStatusSchema = z.enum([
  'ACTIVE',
  'LOST',
  'BROKEN',
  'FLAGGED_TOXIC',
  'DISAVOWED',
]);
export type BacklinkStatus = z.infer<typeof BacklinkStatusSchema>;

export const OutreachStatusSchema = z.enum([
  'IDENTIFIED',
  'PITCH_PREPARED',
  'PITCHED',
  'IN_NEGOTIATION',
  'ACCEPTED',
  'PUBLISHED',
  'REJECTED',
]);
export type OutreachStatus = z.infer<typeof OutreachStatusSchema>;

// DTO Schemas
export const CreateArticleDtoSchema = z.object({
  title: z.string().min(3).max(250),
  slug: z.string().min(2).max(150).optional(),
  language: LanguageCodeSchema.default('en'),
  excerpt: z.string().max(500).optional(),
  contentHtml: z.string().min(10),
  featuredImageUrl: z.string().url().optional(),
  primaryKeyword: z.string().optional(),
  secondaryKeywords: z.array(z.string()).default([]),
  canonicalUrl: z.string().url().optional(),
  brandId: z.string().uuid(),
});
export type CreateArticleDto = z.infer<typeof CreateArticleDtoSchema>;

export const ArticleFilterDtoSchema = z.object({
  brandId: z.string().uuid().optional(),
  language: LanguageCodeSchema.optional(),
  status: ArticleStatusSchema.optional(),
  search: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
});
export type ArticleFilterDto = z.infer<typeof ArticleFilterDtoSchema>;

export const KeywordAnalysisDtoSchema = z.object({
  keyword: z.string().min(2),
  country: z.string().length(2).default('AE'),
  language: LanguageCodeSchema.default('en'),
  searchVolume: z.number().int().nonnegative().optional(),
  difficulty: z.number().min(0).max(100).optional(),
  intent: z.enum(['INFORMATIONAL', 'COMMERCIAL', 'TRANSACTIONAL', 'NAVIGATIONAL']).default('COMMERCIAL'),
  cpc: z.number().nonnegative().optional(),
});
export type KeywordAnalysisDto = z.infer<typeof KeywordAnalysisDtoSchema>;

export const AiSamplingQueryDtoSchema = z.object({
  brandId: z.string().uuid(),
  engine: CitationEngineSchema,
  promptQuery: z.string().min(5),
  targetUrl: z.string().url().optional(),
  frequency: z.enum(['DAILY', 'WEEKLY', 'ON_DEMAND']).default('WEEKLY'),
});
export type AiSamplingQueryDto = z.infer<typeof AiSamplingQueryDtoSchema>;
