import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const portalDir = path.join(process.cwd(), 'public', 'editorial-portal');
    const indexPublicPath = path.join(process.cwd(), 'public', 'editorial-index.json');
    const indexSrcPath = path.join(process.cwd(), 'src', 'editorial-index.json');

    let deletedCount = 0;

    // Remove all HTML files in public/editorial-portal, preserving assets directory
    if (fs.existsSync(portalDir)) {
      const files = fs.readdirSync(portalDir);
      for (const file of files) {
        if (file.endsWith('.html') || file.endsWith('.htm')) {
          fs.unlinkSync(path.join(portalDir, file));
          deletedCount++;
        }
      }
    }

    // Reset index files to empty array
    fs.writeFileSync(indexPublicPath, JSON.stringify([], null, 2), 'utf-8');
    if (fs.existsSync(path.dirname(indexSrcPath))) {
      fs.writeFileSync(indexSrcPath, JSON.stringify([], null, 2), 'utf-8');
    }

    return NextResponse.json({
      success: true,
      deletedCount,
      totalIndexedStories: 0,
      message: `Cleared ${deletedCount} test articles. Editorial directory is clean and ready for your new data archive.`,
    });
  } catch (error: any) {
    console.error('Reset directory error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to clear directory' },
      { status: 500 }
    );
  }
}
