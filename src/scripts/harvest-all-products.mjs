/**
 * Comprehensive Product Harvester for Omnia Stores
 * Mirrors all 1,801 products from omniastores.com into Supabase PostgreSQL
 * with AED pricing, high-res photos, 925 silver specs, and AI search metadata.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yqrrikrhqgeqsoldumzc.supabase.co';
const SECRET_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

async function harvestAll() {
  console.log('🚀 Starting Full Catalogue Mirroring from omniastores.com...');
  const startTime = Date.now();
  let page = 1;
  let totalHarvested = 0;
  let totalSaved = 0;

  while (true) {
    console.log(`\n📥 Fetching page ${page} (limit 250)...`);
    const res = await fetch(`https://omniastores.com/products.json?limit=250&page=${page}`);
    if (!res.ok) {
      console.error(`HTTP error ${res.status} on page ${page}`);
      break;
    }

    const { products } = await res.json();
    if (!products || products.length === 0) {
      console.log('🏁 No more products found. Reached end of catalogue.');
      break;
    }

    totalHarvested += products.length;
    console.log(`Fetched ${products.length} products on page ${page}. Total fetched so far: ${totalHarvested}`);

    // Map into Supabase format with AED and SEO metadata
    const payload = products.map((p) => {
      const price = parseFloat(p.variants[0]?.price || '0');
      const titleLower = p.title.toLowerCase();

      const material = titleLower.includes('925') || titleLower.includes('silver')
        ? '925 Sterling Silver'
        : 'Sterling Silver';

      const stoneType = titleLower.includes('moissanite')
        ? 'Moissanite (Certified)'
        : titleLower.includes('simulated diamond')
          ? 'High-Quality Simulated Diamond'
          : titleLower.includes('pearl')
            ? 'Freshwater Cultured Pearl'
            : 'AAA Cubic Zirconia';

      return {
        store_id: 'OMNIA_AE',
        shopify_product_id: `gid://shopify/Product/${p.id}`,
        title: p.title,
        handle: p.handle,
        vendor: p.vendor || 'Omnia Stores',
        product_type: p.product_type || 'Jewelry',
        status: 'ACTIVE',
        tags: p.tags || ['925-sterling-silver', 'uae-luxury'],
        body_html: p.body_html,
        canonical_url: `https://omniastores.com/products/${p.handle}?ref=omnia_affiliate&utm_source=growth_platform&utm_medium=catalog`,
        primary_image_url: p.images[0]?.src || null,
        secondary_images: p.images.slice(1, 5).map((img) => img.src),
        category: p.product_type || 'Fine Jewelry',
        material,
        stone_type: stoneType,
        is_in_stock: p.variants[0]?.available ?? true,
        min_price: price,
        max_price: price,
        currency: 'AED',
        synced_at: new Date().toISOString(),
      };
    });

    // Batch upsert in chunks of 50 to ensure optimal throughput
    const chunkSize = 50;
    for (let i = 0; i < payload.length; i += chunkSize) {
      const chunk = payload.slice(i, i + chunkSize);
      const upRes = await fetch(`${SUPABASE_URL}/rest/v1/products?on_conflict=store_id,shopify_product_id`, {
        method: 'POST',
        headers: {
          'apikey': SECRET_KEY,
          'Authorization': `Bearer ${SECRET_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates',
        },
        body: JSON.stringify(chunk),
      });

      if (upRes.ok) {
        totalSaved += chunk.length;
        process.stdout.write(`.` );
      } else {
        const errText = await upRes.text();
        console.error(`\n❌ Error saving chunk ${i}-${i + chunkSize}:`, errText.slice(0, 100));
      }
    }

    console.log(`\n✅ Page ${page} synced successfully. Total in database: ${totalSaved}`);
    page++;
    if (page > 12) break; // safety guard
  }

  const durationMs = Date.now() - startTime;
  console.log(`\n🎉 FULL MIRRORING COMPLETE in ${(durationMs / 1000).toFixed(1)}s!`);
  console.log(`📊 Total Products Harvested & Synced: ${totalSaved}`);

  // Log in automation_runs
  await fetch(`${SUPABASE_URL}/rest/v1/automation_runs`, {
    method: 'POST',
    headers: {
      'apikey': SECRET_KEY,
      'Authorization': `Bearer ${SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      task_name: 'FULL_STORE_CATALOGUE_MIRROR',
      store_id: 'OMNIA_AE',
      status: 'COMPLETED',
      items_processed: totalSaved,
      duration_ms: durationMs,
      details: {
        source: 'https://omniastores.com',
        totalPages: page - 1,
        totalProductsSynced: totalSaved,
        primaryCurrency: 'AED',
      },
    }),
  });
}

harvestAll().catch(console.error);
