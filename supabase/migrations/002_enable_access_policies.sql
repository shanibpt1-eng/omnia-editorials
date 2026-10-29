-- ====================================================================
-- OMNIA STORES AUTONOMOUS AI GROWTH PLATFORM
-- Migration 002: Row Level Security (RLS) Permissive Policies
-- ====================================================================
-- Run this in your Supabase SQL Editor to grant anon and authenticated
-- access to the platform tables for real-time reads and writes.

-- 1. STORES
ALTER TABLE IF EXISTS stores ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "stores_all_access" ON stores;
CREATE POLICY "stores_all_access" ON stores FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- 2. STORE CONNECTIONS
ALTER TABLE IF EXISTS store_connections ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "connections_all_access" ON store_connections;
CREATE POLICY "connections_all_access" ON store_connections FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- 3. PRODUCTS & VARIANTS
ALTER TABLE IF EXISTS products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "products_all_access" ON products;
CREATE POLICY "products_all_access" ON products FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

ALTER TABLE IF EXISTS product_variants ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "variants_all_access" ON product_variants;
CREATE POLICY "variants_all_access" ON product_variants FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- 4. ARTICLES
ALTER TABLE IF EXISTS articles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "articles_all_access" ON articles;
CREATE POLICY "articles_all_access" ON articles FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- 5. AUTOMATION RUNS
ALTER TABLE IF EXISTS automation_runs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "runs_all_access" ON automation_runs;
CREATE POLICY "runs_all_access" ON automation_runs FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- 6. FAQ ITEMS
ALTER TABLE IF EXISTS faq_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "faqs_all_access" ON faq_items;
CREATE POLICY "faqs_all_access" ON faq_items FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- 7. DISCOUNT CAMPAIGNS
ALTER TABLE IF EXISTS discount_campaigns ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "discounts_all_access" ON discount_campaigns;
CREATE POLICY "discounts_all_access" ON discount_campaigns FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- 8. NOTIFICATIONS & AUDIT LOGS
ALTER TABLE IF EXISTS notifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "notifs_all_access" ON notifications;
CREATE POLICY "notifs_all_access" ON notifications FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

ALTER TABLE IF EXISTS audit_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "audit_all_access" ON audit_logs;
CREATE POLICY "audit_all_access" ON audit_logs FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- 9. ANALYTICS SNAPSHOTS
ALTER TABLE IF EXISTS analytics_snapshots ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "analytics_all_access" ON analytics_snapshots;
CREATE POLICY "analytics_all_access" ON analytics_snapshots FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

-- 10. AFFILIATE CREATORS & CLICKS
ALTER TABLE IF EXISTS affiliate_creators ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "affiliates_all_access" ON affiliate_creators;
CREATE POLICY "affiliates_all_access" ON affiliate_creators FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);

ALTER TABLE IF EXISTS affiliate_clicks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "clicks_all_access" ON affiliate_clicks;
CREATE POLICY "clicks_all_access" ON affiliate_clicks FOR ALL TO anon, authenticated USING (true) WITH CHECK (true);
