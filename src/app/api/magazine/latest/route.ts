import { NextRequest, NextResponse } from 'next/server';
import { getAggregatedMagazineWire } from '../../../../lib/magazine-wire';

export const revalidate = 900;

export async function GET(req: NextRequest) {
  const source = req.nextUrl.searchParams.get('source') || 'all';
  const pillar = req.nextUrl.searchParams.get('pillar') || 'all';
  const channelType = req.nextUrl.searchParams.get('type') || 'all';

  const payload = await getAggregatedMagazineWire({ source, pillar, channelType });
  return NextResponse.json(payload);
}
