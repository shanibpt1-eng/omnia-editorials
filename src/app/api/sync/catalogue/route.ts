import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { VERIFIED_PRODUCTS, VERIFIED_COLLECTIONS, INITIAL_STORES } from '@/lib/data/verified-catalogue';

export async function POST() {
  try {
    const supabase = createServerClient();

    // 1. Ensure Stores are synced
    for (const store of INITIAL_STORES) {
      await supabase.from('stores').upsert({
        id: store.id,
        name: store.name,
        domain: store.domain,
        default_language: store.defaultLanguage,
        default_currency: store.defaultCurrency,
        target_markets: store.targetMarkets,
        is_active: store.isActive,
      }, { onConflict: 'id' });
    }

    // 2. Sync Collections
    const collectionResults = [];
    for (const col of VERIFIED_COLLECTIONS) {
      const { data, error } = await supabase.from('collections').upsert({
        store_id: col.storeId,
        shopify_collection_id: col.shopifyCollectionId,
        title: col.title,
        handle: col.handle,
        description: col.description,
        canonical_url: col.canonicalUrl,
        synced_at: col.syncedAt,
      }, { onConflict: 'store_id,handle' }).select();

      collectionResults.push({ handle: col.handle, success: !error, error: error?.message });
    }

    // 3. Sync Products
    const productResults = [];
    for (const prod of VERIFIED_PRODUCTS) {
      const { data, error } = await supabase.from('products').upsert({
        store_id: prod.storeId,
        shopify_product_id: prod.shopifyProductId,
        title: prod.title,
        handle: prod.handle,
        vendor: prod.vendor,
        product_type: prod.category,
        status: prod.status,
        tags: prod.tags,
        canonical_url: prod.canonicalUrl,
        primary_image_url: prod.primaryImageUrl,
        secondary_images: prod.secondaryImages,
        category: prod.category,
        material: prod.material,
        stone_type: prod.stoneType,
        is_in_stock: prod.isInStock,
        min_price: prod.minPrice,
        max_price: prod.maxPrice,
        currency: prod.currency,
        synced_at: prod.syncedAt,
      }, { onConflict: 'store_id,shopify_product_id' }).select();

      productResults.push({ handle: prod.handle, success: !error, error: error?.message });
    }

    // 4. Log in automation_runs
    await supabase.from('automation_runs').insert({
      task_name: 'CATALOGUE_SYNC',
      status: 'COMPLETED',
      items_processed: VERIFIED_PRODUCTS.length + VERIFIED_COLLECTIONS.length,
      details: {
        stores: INITIAL_STORES.length,
        collectionsSynced: collectionResults.filter(c => c.success).length,
        productsSynced: productResults.filter(p => p.success).length,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Verified catalogue sync finished',
      storesSynced: INITIAL_STORES.length,
      collectionResults,
      productResults,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Sync failed' },
      { status: 500 }
    );
  }
}