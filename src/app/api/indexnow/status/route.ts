import { NextResponse } from 'next/server';
import { getIndexNowStatus } from '../../../../lib/indexnow';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const status = getIndexNowStatus();
    return NextResponse.json({
      success: true,
      data: status,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to retrieve IndexNow status' },
      { status: 500 }
    );
  }
}
