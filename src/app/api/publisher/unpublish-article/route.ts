import { NextRequest, NextResponse } from 'next/server';
import { unpublishArticleFromStorefront } from '@/lib/publisher/history';
import { createServerClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { slug, articleId, reason } = body;
    const identifier = slug || articleId;

    if (!identifier) {
      return NextResponse.json(
        { success: false, error: 'slug or articleId is required to unpublish article' },
        { status: 400 }
      );
    }

    const result = unpublishArticleFromStorefront(identifier, reason);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 404 }
      );
    }

    // Audit log in Supabase
    try {
      const supabase = createServerClient();
      await supabase.from('automation_runs').insert({
        task_name: 'STOREFRONT_ARTICLE_UNPUBLISHED',
        store_id: 'OMNIA_COM',
        status: 'COMPLETED',
        details: {
          slug: result.removedArticle?.slug,
          title: result.removedArticle?.title,
          reason: reason || 'Manual removal from backend',
          remainingStorefrontCount: result.remainingCount,
        },
      });
    } catch (e) {
      // non-fatal
    }

    return NextResponse.json({
      success: true,
      message: `Article "${result.removedArticle?.title}" successfully removed from Port 3001 storefront.`,
      removedArticle: result.removedArticle,
      remainingStorefrontArticles: result.remainingCount,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to unpublish article' },
      { status: 500 }
    );
  }
}
