import { NextRequest, NextResponse } from 'next/server';
import { readHistory, readPublishedArticles, detectMismatch } from '@/lib/publisher/history';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const articleId = searchParams.get('articleId');

    const history = readHistory();
    const publishedArticles = readPublishedArticles();

    let filtered = history;
    if (slug) {
      filtered = filtered.filter((rev) => rev.slug === slug);
    } else if (articleId) {
      filtered = filtered.filter((rev) => rev.articleId === articleId);
    }

    // Attach mismatch detection for the latest live storefront version
    const enriched = filtered.map((rev) => {
      const liveArticle = publishedArticles.find(
        (a) => a.slug === rev.slug || a.id === rev.articleId
      );
      const mismatch = detectMismatch(liveArticle, rev.snapshot);
      return {
        ...rev,
        mismatchDetected: mismatch.hasMismatch,
        mismatchDetails: mismatch.differences,
        isCurrentlyLiveOnStorefront: !mismatch.hasMismatch,
      };
    });

    return NextResponse.json({
      success: true,
      totalRevisions: enriched.length,
      history: enriched,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to fetch article history' },
      { status: 500 }
    );
  }
}
