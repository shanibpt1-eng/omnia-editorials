import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const file = searchParams.get('file');

    if (!file) {
      return new NextResponse('File parameter is required', { status: 400 });
    }

    const portalDir = path.join(process.cwd(), 'public', 'editorial-portal');

    // 1. Check direct path at public/editorial-portal/<file>
    let targetPath = path.join(portalDir, file);

    // 2. If not found directly, search recursively in any subfolder
    if (!fs.existsSync(targetPath)) {
      function findFileRecursively(dir: string, targetName: string): string | null {
        if (!fs.existsSync(dir)) return null;
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const full = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            const found = findFileRecursively(full, targetName);
            if (found) return found;
          } else if (entry.name === targetName || entry.name.toLowerCase() === targetName.toLowerCase()) {
            return full;
          }
        }
        return null;
      }

      const foundPath = findFileRecursively(portalDir, file);
      if (foundPath) {
        targetPath = foundPath;
      }
    }

    if (!fs.existsSync(targetPath)) {
      return new NextResponse(
        `<html><body style="background:#0e0f14;color:#a89d8f;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;"><div style="text-align:center;"><h2 style="color:#c6a769;margin-bottom:8px;">Article Staged in Queue</h2><p style="font-size:13px;">File [${file}] is ready for upload or currently synchronizing.</p></div></body></html>`,
        {
          status: 200,
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        }
      );
    }

    let rawHtml = fs.readFileSync(targetPath, 'utf-8');

    // Inject base href so that relative assets (assets/styles.css, assets/model-001.jpg)
    // always resolve perfectly to /editorial-portal/assets/ without breaking
    if (!rawHtml.includes('<base ') && rawHtml.includes('<head>')) {
      rawHtml = rawHtml.replace(
        '<head>',
        '<head>\n  <base href="/editorial-portal/assets/">\n  <style>.reveal { opacity: 1 !important; transform: none !important; }</style>'
      );
    } else if (rawHtml.includes('<head>')) {
      rawHtml = rawHtml.replace(
        '<head>',
        '<head>\n  <style>.reveal { opacity: 1 !important; transform: none !important; }</style>'
      );
    }

    return new NextResponse(rawHtml, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'X-Frame-Options': 'SAMEORIGIN',
      },
    });
  } catch (error: any) {
    console.error('View article error:', error);
    return new NextResponse(`Error rendering article: ${error.message}`, { status: 500 });
  }
}
