import { NextResponse } from 'next/server';
import { omniaStoreHarvester } from '@/lib/harvester/omniastores-harvester';

export async function POST() {
  try {
    const result = await omniaStoreHarvester.syncToSupabase();
    return NextResponse.json({
      success: true,
      message: 'Successfully harvested omniastores.com and mirrored to Supabase PostgreSQL',
      data: result,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Harvest sync failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return POST();
}
