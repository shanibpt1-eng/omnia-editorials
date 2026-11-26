import { NextResponse } from 'next/server';
import { MONITORED_BACKLINKS, EDITORIAL_OUTREACH_PIPELINE } from '../../../data/backlink-intelligence-data';

export const dynamic = 'force-dynamic';

export async function GET() {
  const activeCount = MONITORED_BACKLINKS.filter((b) => b.status === 'active').length;
  const lostCount = MONITORED_BACKLINKS.filter((b) => b.status === 'lost').length;
  const brokenCount = MONITORED_BACKLINKS.filter((b) => b.status === 'broken').length;
  const totalReferralTraffic = MONITORED_BACKLINKS.reduce((acc, curr) => acc + (curr.referralSessionsCount || 0), 0);

  return NextResponse.json({
    success: true,
    data: {
      summary: {
        totalBacklinks: MONITORED_BACKLINKS.length,
        activeBacklinks: activeCount,
        lostBacklinks: lostCount,
        brokenBacklinks: brokenCount,
        totalReferralTraffic,
        averageDomainAuthority: Math.round(
          MONITORED_BACKLINKS.reduce((acc, b) => acc + (b.domainAuthorityEst || 50), 0) / MONITORED_BACKLINKS.length
        ),
      },
      backlinks: MONITORED_BACKLINKS,
      outreachPipeline: EDITORIAL_OUTREACH_PIPELINE,
      complianceNote: 'Strictly zero automated spam submissions. Genuine editorial press relationships only.',
    },
  });
}
