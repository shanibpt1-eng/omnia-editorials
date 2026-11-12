import { NextResponse } from 'next/server';
import { getBotAnalytics, recordBotVisit } from '../../../../lib/bot-detector';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = getBotAnalytics();
    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to retrieve crawler analytics' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const userAgent = req.headers.get('user-agent') || body.userAgent || '';
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const url = body.url || req.headers.get('referer') || '/';
    const statusCode = body.statusCode || 200;

    recordBotVisit({
      userAgent,
      url,
      ip,
      statusCode,
    });

    return NextResponse.json({ success: true, message: 'Bot visit recorded' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
