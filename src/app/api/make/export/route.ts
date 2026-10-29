import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'news_summarizer';

    const filename = type === 'trigger' 
      ? 'omnia_autonomous_growth_engine_trigger.json' 
      : 'omnia_news_to_telegram_mapped.json';

    const filePath = path.join(process.cwd(), 'make_blueprints', filename);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Blueprint file not found' }, { status: 404 });
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const json = JSON.parse(content);

    return new Response(JSON.stringify(json, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
