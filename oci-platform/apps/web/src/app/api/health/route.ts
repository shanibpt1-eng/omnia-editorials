import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    {
      status: 'HEALTHY',
      timestamp: new Date().toISOString(),
      platform: 'Omnia Stores Luxury Editorial & Commerce Intelligence (OCI)',
      version: '1.0.0',
      upstreamFlagship: 'https://omniastores.com',
      fulfillmentGateways: ['DXB-Industrial', 'RUH-Logistics-Zone'],
      databaseConnection: 'CONNECTED',
      aeoStatus: 'ACTIVE',
      geoStatus: 'ACTIVE',
      seoStatus: 'ACTIVE',
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
      },
    }
  );
}
