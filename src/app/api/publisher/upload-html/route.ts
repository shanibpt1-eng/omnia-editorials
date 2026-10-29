import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { parseHtmlArticle } from '@/lib/publisher/html-importer';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { articles, rawHtml, filename, storeId = 'OMNIA_AE' } = body;

    const supabase = createServerClient();
    const inserted = [];

    // Case 1: Raw HTML passed directly
    if (rawHtml) {
      const parsed = parseHtmlArticle(rawHtml, filename || 'uploaded-editorial.html');
      const record = {
        store_id: storeId,
        title: parsed.title,
        slug: parsed.slug,
        excerpt: parsed.excerpt,
        content_html: parsed.contentHtml,
        language: parsed.language,
        author: parsed.author,
        status: 'APPROVED',
        quality_score: 100,
        seo_title: `${parsed.title} | The Omnia Edit`,
        seo_description: parsed.excerpt,
        canonical_url: parsed.canonicalUrl,
        featured_image_url: parsed.featuredImageUrl,
      };

      const { data, error } = await supabase
        .from('articles')
        .upsert(record, { onConflict: 'store_id,slug,language' })
        .select();

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        insertedCount: 1,
        articles: [record],
        parsed,
      });
    }

    // Case 2: Batch / Array of articles or files
    if (!articles || !Array.isArray(articles) || articles.length === 0) {
      return NextResponse.json({ success: false, error: 'No articles payload provided' }, { status: 400 });
    }

    for (const item of articles) {
      let title = item.title;
      let slug = item.slug;
      let excerpt = item.excerpt;
      let contentHtml = item.contentHtml || item.html;
      let language = item.language || 'en';
      let author = item.author || 'Omnia Stores Editorial Studio';
      let featuredImageUrl = item.featuredImageUrl || '/press/gulf-news-business-june2026.jpg';
      let canonicalUrl = item.canonicalUrl;

      // If item provided as raw HTML file contents
      if (item.rawHtml && (!title || !contentHtml)) {
        const parsed = parseHtmlArticle(item.rawHtml, item.filename || 'article.html');
        title = parsed.title;
        slug = parsed.slug;
        excerpt = parsed.excerpt;
        contentHtml = parsed.contentHtml;
        language = parsed.language;
        author = parsed.author;
        featuredImageUrl = parsed.featuredImageUrl;
        canonicalUrl = parsed.canonicalUrl;
      }

      slug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      const record = {
        store_id: storeId,
        title,
        slug,
        excerpt: excerpt || title,
        content_html: contentHtml || '<p>Editorial Content</p>',
        language,
        author,
        status: 'APPROVED',
        quality_score: 100,
        seo_title: `${title} | The Omnia Edit`,
        seo_description: excerpt || title,
        canonical_url: canonicalUrl || `https://omniastores.com/blogs/news/${slug}`,
        featured_image_url: featuredImageUrl,
      };

      const { error } = await supabase
        .from('articles')
        .upsert(record, { onConflict: 'store_id,slug,language' });

      if (!error) {
        inserted.push(record);
      }
    }

    return NextResponse.json({
      success: true,
      insertedCount: inserted.length,
      articles: inserted,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
