-- ====================================================================
-- OMNIA STORES AUTONOMOUS AI GROWTH PLATFORM
-- Migration 001: Initial Core Schema (24 Relational Tables + RLS)
-- ====================================================================

-- 1. STORES & MULTI-STORE CONNECTIONS
CREATE TABLE IF NOT EXISTS stores (
    id TEXT PRIMARY KEY, -- 'OMNIA_COM', 'OMNIA_AE'
    name TEXT NOT NULL,
    domain TEXT NOT NULL,
    default_language TEXT NOT NULL DEFAULT 'en', -- 'en' or 'ar'
    default_currency TEXT NOT NULL DEFAULT 'AED', -- 'USD', 'AED', 'SAR'
    target_markets TEXT[] NOT NULL DEFAULT ARRAY['AE', 'SA', 'GCC'],
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS store_connections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id TEXT NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    shop_domain TEXT NOT NULL,
    access_token_encrypted TEXT,
    scopes TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    is_connected BOOLEAN NOT NULL DEFAULT FALSE,
    connection_status TEXT NOT NULL DEFAULT 'DISCONNECTED', -- 'CONNECTED', 'ERROR', 'REVOKED'
    last_sync_at TIMESTAMPTZ,
    last_error TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_store_connection UNIQUE (store_id)
);

-- 2. PRODUCTS, VARIANTS, COLLECTIONS & BRANDS
CREATE TABLE IF NOT EXISTS brands (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id TEXT NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_brand_slug UNIQUE (store_id, slug)
);

CREATE TABLE IF NOT EXISTS collections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id TEXT NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    shopify_collection_id TEXT,
    title TEXT NOT NULL,
    handle TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    canonical_url TEXT,
    synced_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_collection_handle UNIQUE (store_id, handle)
);

CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id TEXT NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    shopify_product_id TEXT NOT NULL,
    title TEXT NOT NULL,
    handle TEXT NOT NULL,
    vendor TEXT,
    brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
    product_type TEXT,
    status TEXT NOT NULL DEFAULT 'ACTIVE', -- 'ACTIVE', 'DRAFT', 'ARCHIVED'
    tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    body_html TEXT,
    canonical_url TEXT NOT NULL,
    primary_image_url TEXT,
    secondary_images TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    category TEXT,
    material TEXT DEFAULT '925 Sterling Silver',
    stone_type TEXT,
    is_in_stock BOOLEAN NOT NULL DEFAULT TRUE,
    min_price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    max_price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    currency TEXT NOT NULL DEFAULT 'AED',
    synced_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_shopify_product UNIQUE (store_id, shopify_product_id)
);

CREATE TABLE IF NOT EXISTS product_variants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    shopify_variant_id TEXT NOT NULL,
    title TEXT NOT NULL,
    sku TEXT,
    barcode TEXT,
    price NUMERIC(10, 2) NOT NULL,
    compare_at_price NUMERIC(10, 2),
    inventory_quantity INT NOT NULL DEFAULT 0,
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. CONTENT TOPICS, ARTICLES & TRANSLATIONS
CREATE TABLE IF NOT EXISTS content_topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id TEXT NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    target_keyword TEXT NOT NULL,
    secondary_keywords TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    intent TEXT NOT NULL DEFAULT 'INFORMATIONAL', -- 'INFORMATIONAL', 'COMMERCIAL', 'TRANSACTIONAL'
    category TEXT NOT NULL, -- 'BRIDAL_JEWELRY', 'SILVER_CARE', 'STYLE_GUIDES', 'GIFTING'
    difficulty_score INT DEFAULT 50,
    search_volume_estimate INT DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'RESEARCHED', -- 'RESEARCHED', 'BRIEFED', 'GENERATED', 'PUBLISHED', 'ARCHIVED'
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id TEXT NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    topic_id UUID REFERENCES content_topics(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slug TEXT NOT NULL,
    excerpt TEXT,
    content_html TEXT NOT NULL,
    content_markdown TEXT,
    language TEXT NOT NULL DEFAULT 'en', -- 'en', 'ar'
    author TEXT NOT NULL DEFAULT 'Omnia Editorial Team',
    status TEXT NOT NULL DEFAULT 'DRAFT', -- 'DRAFT', 'QUALITY_CHECK', 'APPROVED', 'PUBLISHED_SHOPIFY', 'REJECTED'
    quality_score INT DEFAULT 0,
    quality_assessment JSONB DEFAULT '{}'::JSONB,
    seo_title TEXT,
    seo_description TEXT,
    canonical_url TEXT,
    featured_image_url TEXT,
    shopify_article_id TEXT,
    shopify_blog_id TEXT,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_article_slug UNIQUE (store_id, slug, language)
);

CREATE TABLE IF NOT EXISTS article_translations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
    target_language TEXT NOT NULL DEFAULT 'ar',
    title TEXT NOT NULL,
    excerpt TEXT,
    content_html TEXT NOT NULL,
    seo_title TEXT,
    seo_description TEXT,
    is_reviewed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_article_translation UNIQUE (article_id, target_language)
);

CREATE TABLE IF NOT EXISTS content_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    collection_id UUID REFERENCES collections(id) ON DELETE SET NULL,
    anchor_text TEXT NOT NULL,
    target_url TEXT NOT NULL,
    link_type TEXT NOT NULL DEFAULT 'INTERNAL_PRODUCT', -- 'INTERNAL_PRODUCT', 'INTERNAL_COLLECTION', 'AFFILIATE_EXTERNAL'
    is_verified BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. FAQ ENGINE
CREATE TABLE IF NOT EXISTS faq_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id TEXT NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    collection_id UUID REFERENCES collections(id) ON DELETE CASCADE,
    question_en TEXT NOT NULL,
    answer_en TEXT NOT NULL,
    question_ar TEXT,
    answer_ar TEXT,
    category TEXT NOT NULL DEFAULT 'PRODUCT_CARE', -- 'PRODUCT_CARE', 'SHIPPING_DELIVERY', 'SIZING_MATERIALS', 'RETURNS_WARRANTY'
    source_evidence TEXT,
    is_verified BOOLEAN NOT NULL DEFAULT TRUE,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    shopify_metafield_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. AFFILIATE ENGINE & PARTNER PROGRAM
CREATE TABLE IF NOT EXISTS affiliate_merchants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    website_url TEXT NOT NULL,
    commission_rate TEXT,
    disclosure_policy TEXT NOT NULL DEFAULT 'Contains affiliate links. We may earn a commission on qualifying purchases.',
    status TEXT NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS affiliate_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    merchant_id UUID NOT NULL REFERENCES affiliate_merchants(id) ON DELETE CASCADE,
    product_name TEXT NOT NULL,
    destination_url TEXT NOT NULL,
    tracking_url TEXT NOT NULL,
    rel_attributes TEXT NOT NULL DEFAULT 'sponsored nofollow',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    click_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS affiliate_partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    channel_type TEXT NOT NULL DEFAULT 'CREATOR', -- 'CREATOR', 'WEDDING_PLANNER', 'EDITORIAL'
    referral_code TEXT NOT NULL UNIQUE,
    custom_discount_code TEXT,
    commission_rate NUMERIC(5, 2) NOT NULL DEFAULT 10.00,
    payout_status TEXT NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS affiliate_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    partner_id UUID NOT NULL REFERENCES affiliate_partners(id) ON DELETE CASCADE,
    store_id TEXT NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    shopify_order_id TEXT NOT NULL,
    order_amount NUMERIC(10, 2) NOT NULL,
    commission_amount NUMERIC(10, 2) NOT NULL,
    currency TEXT NOT NULL DEFAULT 'AED',
    status TEXT NOT NULL DEFAULT 'PENDING', -- 'PENDING', 'APPROVED', 'PAID', 'CANCELLED'
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. VOUCHERS & DISCOUNT PROPOSALS
CREATE TABLE IF NOT EXISTS discount_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id TEXT NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    campaign_name TEXT NOT NULL,
    discount_code TEXT NOT NULL,
    discount_type TEXT NOT NULL DEFAULT 'PERCENTAGE', -- 'PERCENTAGE', 'FIXED_AMOUNT', 'FREE_SHIPPING'
    value NUMERIC(10, 2) NOT NULL,
    min_order_value NUMERIC(10, 2) DEFAULT 0.00,
    applies_to_collections TEXT[] DEFAULT ARRAY[]::TEXT[],
    starts_at TIMESTAMPTZ NOT NULL,
    ends_at TIMESTAMPTZ,
    usage_limit INT,
    approval_status TEXT NOT NULL DEFAULT 'PROPOSAL', -- 'PROPOSAL', 'APPROVED', 'REJECTED', 'ACTIVE_SHOPIFY'
    approved_by TEXT,
    shopify_price_rule_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_discount_code UNIQUE (store_id, discount_code)
);

-- 7. BACKLINK CRM
CREATE TABLE IF NOT EXISTS backlink_prospects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain TEXT NOT NULL UNIQUE,
    publisher_name TEXT NOT NULL,
    contact_name TEXT,
    contact_email TEXT,
    authority_score INT DEFAULT 0,
    target_category TEXT NOT NULL, -- 'WEDDING_MAGAZINE', 'BRIDAL_BLOG', 'FASHION_LIFESTYLE'
    status TEXT NOT NULL DEFAULT 'DISCOVERED', -- 'DISCOVERED', 'QUALIFIED', 'OUTREACH_DRAFTED', 'CONTACTED', 'PLACEMENT_WON', 'DECLINED'
    country TEXT DEFAULT 'AE',
    language TEXT DEFAULT 'en',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS outreach_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prospect_id UUID NOT NULL REFERENCES backlink_prospects(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    body_text TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'DRAFT', -- 'DRAFT', 'APPROVED', 'SENT', 'REPLIED'
    sent_at TIMESTAMPTZ,
    placement_url TEXT,
    is_placement_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. AUTOMATION SCHEDULES, RUNS & AUDIT LOGS
CREATE TABLE IF NOT EXISTS automation_schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id TEXT NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    task_type TEXT NOT NULL, -- 'CATALOGUE_SYNC', 'TOPIC_DISCOVERY', 'CONTENT_GENERATION', 'FAQ_REFRESH', 'SEO_AUDIT'
    cron_expression TEXT NOT NULL,
    is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    last_run_at TIMESTAMPTZ,
    next_run_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS automation_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    schedule_id UUID REFERENCES automation_schedules(id) ON DELETE SET NULL,
    task_name TEXT NOT NULL,
    store_id TEXT REFERENCES stores(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'RUNNING', -- 'RUNNING', 'COMPLETED', 'FAILED', 'HELD_BY_POLICY'
    details JSONB DEFAULT '{}'::JSONB,
    items_processed INT DEFAULT 0,
    error_message TEXT,
    duration_ms INT DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS approval_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type TEXT NOT NULL, -- 'ARTICLE', 'DISCOUNT', 'OUTREACH'
    entity_id UUID NOT NULL,
    action TEXT NOT NULL, -- 'APPROVED', 'REJECTED', 'REQUEST_CHANGES'
    reviewer_email TEXT NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS analytics_snapshots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    store_id TEXT NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
    metric_date DATE NOT NULL,
    organic_impressions INT DEFAULT 0,
    organic_clicks INT DEFAULT 0,
    average_ctr NUMERIC(5, 2) DEFAULT 0.00,
    indexed_pages_count INT DEFAULT 0,
    articles_published_count INT DEFAULT 0,
    affiliate_revenue NUMERIC(10, 2) DEFAULT 0.00,
    metrics_source TEXT NOT NULL DEFAULT 'SYSTEM_CALCULATED',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_store_daily_metrics UNIQUE (store_id, metric_date)
);

CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    severity TEXT NOT NULL DEFAULT 'INFO', -- 'INFO', 'WARNING', 'CRITICAL', 'SUCCESS'
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    action_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_email TEXT,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- SEED INITIAL DATA: MULTI-STORE BASE RECORDS
-- ====================================================================
INSERT INTO stores (id, name, domain, default_language, default_currency, target_markets)
VALUES 
    ('OMNIA_COM', 'Omnia Stores Global', 'omniastores.com', 'en', 'USD', ARRAY['US', 'UK', 'GCC', 'GLOBAL']),
    ('OMNIA_AE', 'Omnia Stores UAE & GCC', 'omniastores.ae', 'ar', 'AED', ARRAY['AE', 'SA', 'KW', 'QA', 'BH', 'OM'])
ON CONFLICT (id) DO UPDATE SET 
    name = EXCLUDED.name,
    domain = EXCLUDED.domain;

INSERT INTO store_connections (store_id, shop_domain, connection_status)
VALUES 
    ('OMNIA_COM', 'omniastores.myshopify.com', 'DISCONNECTED'),
    ('OMNIA_AE', 'omniastores-ae.myshopify.com', 'DISCONNECTED')
ON CONFLICT (store_id) DO NOTHING;

-- INDEXES FOR HIGH-THROUGHPUT QUERIES
CREATE INDEX IF NOT EXISTS idx_products_store ON products(store_id);
CREATE INDEX IF NOT EXISTS idx_products_handle ON products(handle);
CREATE INDEX IF NOT EXISTS idx_articles_store_lang ON articles(store_id, language);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_faq_store ON faq_items(store_id);
CREATE INDEX IF NOT EXISTS idx_automation_runs_task ON automation_runs(task_name, status);
