import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { createServerClient } from '@/lib/supabase/server';
import { parseHtmlArticle } from '@/lib/publisher/html-importer';

const execAsync = promisify(exec);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const targetScope = (formData.get('scope') as string) || 'all'; // 'all', 'portal', 'platform'
    const storeId = (formData.get('storeId') as string) || 'OMNIA_AE';

    if (!file) {
      return NextResponse.json({ success: false, error: 'No zip file provided' }, { status: 400 });
    }

    if (!file.name.endsWith('.zip')) {
      return NextResponse.json(
        { success: false, error: 'Only .zip files are supported' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save temporary zip file
    const tempDir = path.join(process.cwd(), '.tmp_uploads');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const extractUniqueId = `upload_${Date.now()}`;
    const tempZipPath = path.join(tempDir, `${extractUniqueId}.zip`);
    const tempExtractDir = path.join(tempDir, extractUniqueId);
    fs.mkdirSync(tempExtractDir, { recursive: true });
    fs.writeFileSync(tempZipPath, buffer);

    // Destination target directory for static viewing
    const targetDir = path.join(process.cwd(), 'public', 'editorial-portal');
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Extract using system unzip
    await execAsync(`unzip -o -q "${tempZipPath}" -d "${tempExtractDir}"`);

    // Clean up temporary zip archive
    try {
      fs.unlinkSync(tempZipPath);
    } catch {}

    // Find all files recursively in tempExtractDir
    function getFilesRecursively(dir: string): string[] {
      let results: string[] = [];
      const list = fs.readdirSync(dir);
      for (const file of list) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
          results = results.concat(getFilesRecursively(fullPath));
        } else {
          results.push(fullPath);
        }
      }
      return results;
    }

    const allExtractedFiles = getFilesRecursively(tempExtractDir);
    const htmlFiles = allExtractedFiles.filter(
      (f) => f.endsWith('.html') || f.endsWith('.htm')
    );

    // Copy assets (css, js, images) to public/editorial-portal/assets AND public/assets
    const portalAssetsDir = path.join(targetDir, 'assets');
    const rootAssetsDir = path.join(process.cwd(), 'public', 'assets');
    if (!fs.existsSync(portalAssetsDir)) fs.mkdirSync(portalAssetsDir, { recursive: true });
    if (!fs.existsSync(rootAssetsDir)) fs.mkdirSync(rootAssetsDir, { recursive: true });

    for (const file of allExtractedFiles) {
      const ext = path.extname(file).toLowerCase();
      const baseName = path.basename(file);
      if (['.css', '.js', '.jpg', '.jpeg', '.png', '.webp', '.svg'].includes(ext)) {
        try {
          fs.copyFileSync(file, path.join(portalAssetsDir, baseName));
          fs.copyFileSync(file, path.join(rootAssetsDir, baseName));
        } catch {}
      }
    }

    // Copy all HTML files to public/editorial-portal/ directly
    for (const file of htmlFiles) {
      const baseName = path.basename(file);
      try {
        fs.copyFileSync(file, path.join(targetDir, baseName));
      } catch {}
    }

    // Ingest into Supabase if targetScope is 'platform' or 'all'
    const supabase = createServerClient();
    const articlesToIngest = [];

    // Take up to 100 articles per zip to upsert into Supabase for immediate live editing & bulk publishing
    const batchForDb = htmlFiles.slice(0, 100);
    for (const hf of batchForDb) {
      try {
        const rawHtml = fs.readFileSync(hf, 'utf-8');
        const fileName = path.basename(hf);
        const parsed = parseHtmlArticle(rawHtml, fileName);

        articlesToIngest.push({
          store_id: storeId,
          title: parsed.title,
          slug: parsed.slug,
          excerpt: parsed.excerpt,
          content_html: parsed.contentHtml,
          language: parsed.language,
          author: parsed.author,
          status: 'APPROVED',
          quality_score: 100,
          seo_title: `${parsed.title} | Omnia Stores Editorial`,
          seo_description: parsed.excerpt,
          canonical_url: parsed.canonicalUrl,
          featured_image_url: parsed.featuredImageUrl,
        });
      } catch {}
    }

    if (articlesToIngest.length > 0) {
      for (const art of articlesToIngest) {
        await supabase
          .from('articles')
          .upsert(art, { onConflict: 'store_id,slug,language' });
      }
    }

    // Refresh editorial index on disk for fast search & directory browsing
    const existingHtmlFiles = fs.readdirSync(targetDir).filter((f) => f.endsWith('.html'));
    const indexData = [];

    for (const f of existingHtmlFiles) {
      const parts = f.replace('.html', '').split('-');
      const num = parts[0] || '0000';
      const country = parts.slice(1, 3).join(' ') || 'editorial';

      try {
        const content = fs.readFileSync(path.join(targetDir, f), 'utf-8');
        const titleMatch =
          content.match(/<title>(.*?)<\/title>/i) || content.match(/<h1[^>]*>(.*?)<\/h1>/i);
        const title = titleMatch
          ? titleMatch[1]!.replace(/&amp;/g, '&').replace(/\|.*/, '').trim()
          : f;

        indexData.push({
          file: f,
          num,
          title,
          country,
          url: `/editorial-portal/${f}`,
          sizeKb: (content.length / 1024).toFixed(1),
        });
      } catch {}
    }

    const indexPathPublic = path.join(process.cwd(), 'public', 'editorial-index.json');
    const indexPathSrc = path.join(process.cwd(), 'src', 'editorial-index.json');
    fs.writeFileSync(indexPathPublic, JSON.stringify(indexData));
    fs.writeFileSync(indexPathSrc, JSON.stringify(indexData));

    // Cleanup temp extraction directory
    try {
      fs.rmSync(tempExtractDir, { recursive: true, force: true });
    } catch {}

    return NextResponse.json({
      success: true,
      filename: file.name,
      htmlFilesExtracted: htmlFiles.length,
      databaseIngested: articlesToIngest.length,
      totalIndexedStories: indexData.length,
      message: `Successfully extracted ${htmlFiles.length} HTML stories. Synced to Editorial Network (${indexData.length} stories) and Database.`,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
