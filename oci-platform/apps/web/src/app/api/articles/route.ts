import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { EDITORIAL_ARTICLES } from '../../../data/editorial-feed';
import { EditorialArticle } from '../../../lib/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const PUBLISHED_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'published-articles.json');

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    // Load newly published articles directly from disk
    let publishedFromDisk: EditorialArticle[] = [];
    if (fs.existsSync(PUBLISHED_FILE_PATH)) {
      try {
        const raw = fs.readFileSync(PUBLISHED_FILE_PATH, 'utf-8');
        publishedFromDisk = JSON.parse(raw);
      } catch (e) {
        publishedFromDisk = [];
      }
    }

    // Merge disk articles with base articles (disk items take precedence)
    const combinedArticles = [...publishedFromDisk, ...EDITORIAL_ARTICLES];
    // Deduplicate by slug
    const seen = new Set<string>();
    const uniqueArticles: EditorialArticle[] = [];
    for (const a of combinedArticles) {
      if (!seen.has(a.slug)) {
        seen.add(a.slug);
        uniqueArticles.push(a);
      }
    }

    if (slug) {
      const match = uniqueArticles.find((a) => a.slug === slug);
      if (match) {
        return NextResponse.json({ success: true, article: match });
      }
      return NextResponse.json({ success: false, error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      total: uniqueArticles.length,
      articles: uniqueArticles,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
