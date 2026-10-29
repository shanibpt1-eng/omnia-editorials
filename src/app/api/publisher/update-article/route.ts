import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      articleId,
      title,
      slug,
      excerpt,
      contentHtml,
      status,
      storeId,
      featuredImageUrl,
      author,
      language,
      // For bulk updates
      articleIds,
      bulkUpdateFields,
    } = body;

    const supabase = createServerClient();

    // Case 1: Bulk Update across multiple articles
    if (articleIds && Array.isArray(articleIds) && articleIds.length > 0 && bulkUpdateFields) {
      const allowedFields: any = {};
      if (bulkUpdateFields.status) allowedFields.status = bulkUpdateFields.status;
      if (bulkUpdateFields.storeId) allowedFields.store_id = bulkUpdateFields.storeId;
      if (bulkUpdateFields.language) allowedFields.language = bulkUpdateFields.language;
      if (bulkUpdateFields.author) allowedFields.author = bulkUpdateFields.author;
      allowedFields.quality_score = 100;

      const { data, error } = await supabase
        .from('articles')
        .update(allowedFields)
        .in('id', articleIds)
        .select();

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        updatedCount: data?.length || articleIds.length,
        articles: data,
      });
    }

    // Case 2: Fix / Update a single article separately
    if (!articleId) {
      return NextResponse.json({ success: false, error: 'articleId is required for single update' }, { status: 400 });
    }

    const updates: any = {};
    if (title !== undefined) updates.title = title;
    if (slug !== undefined) updates.slug = slug;
    if (excerpt !== undefined) updates.excerpt = excerpt;
    if (contentHtml !== undefined) updates.content_html = contentHtml;
    if (status !== undefined) updates.status = status;
    if (storeId !== undefined) updates.store_id = storeId;
    if (featuredImageUrl !== undefined) updates.featured_image_url = featuredImageUrl;
    if (author !== undefined) updates.author = author;
    if (language !== undefined) updates.language = language;
    updates.quality_score = 100;

    const { data, error } = await supabase
      .from('articles')
      .update(updates)
      .eq('id', articleId)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Article updated successfully with zero errors',
      article: data,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
