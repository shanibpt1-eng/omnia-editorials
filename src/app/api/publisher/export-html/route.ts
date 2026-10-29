import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const articleId = searchParams.get('articleId');
    const format = searchParams.get('format') || 'html';

    const supabase = createServerClient();

    if (articleId) {
      // Single Article HTML Export
      const { data: article } = await supabase.from('articles').select('*').eq('id', articleId).single();
      if (!article) return NextResponse.json({ error: 'Article not found' }, { status: 404 });

      const fullHtmlDocument = `<!DOCTYPE html>
<html lang="${article.language}" dir="${article.language === 'ar' ? 'rtl' : 'ltr'}">
<head>
  <meta charset="utf-8">
  <title>${article.seo_title || article.title}</title>
  <meta name="description" content="${article.seo_description || article.excerpt}">
  <link rel="canonical" href="${article.canonical_url}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 800px; margin: 40px auto; padding: 0 20px; }
    h1, h2, h3 { color: #111; }
    img { max-width: 100%; height: auto; border-radius: 8px; }
    a { color: #b89146; text-decoration: underline; }
    .press-badge { background: #fdf6e7; border: 1px solid #e2c275; padding: 12px; border-radius: 8px; font-size: 13px; font-weight: bold; color: #855d14; margin-bottom: 24px; }
    blockquote { border-left: 4px solid #b89146; margin: 20px 0; padding-left: 16px; font-style: italic; color: #444; }
  </style>
</head>
<body>
  <article>
    ${article.content_html}
  </article>
</body>
</html>`;

      return new Response(fullHtmlDocument, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Content-Disposition': `attachment; filename="${article.slug}.html"`,
        },
      });
    }

    // Bulk All Articles JSON/HTML Export
    const { data: articles } = await supabase.from('articles').select('*').order('created_at', { ascending: false });

    return NextResponse.json({
      success: true,
      count: articles?.length || 0,
      exportedAt: new Date().toISOString(),
      articles: (articles || []).map((a) => ({
        id: a.id,
        title: a.title,
        slug: a.slug,
        language: a.language,
        canonicalUrl: a.canonical_url,
        contentHtml: a.content_html,
      })),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
