import { NextRequest, NextResponse } from 'next/server';
import { higgsfieldClient } from '@/lib/higgsfield/client';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: 'ACTIVE',
    provider: 'Higgsfield.ai',
    version: 'v4.1',
    capabilities: [
      'Text-to-Image (Vogue Luxury Editorial)',
      'Text-to-Video (Cinematic 360° Jewelry Orbit)',
      'Reels / TikTok Vertical 9:16 Media',
      'Macro Specular Highlight Simulation',
      'Bilingual Arabic / English Prompt Enhancement',
    ],
    aspectRatios: ['16:9', '9:16', '1:1', '4:3'],
    styles: [
      { id: 'LUXURY_EDITORIAL', label: 'Vogue Middle East Editorial' },
      { id: 'STUDIO_PRODUCT', label: 'Clean Studio Macro (Obsidian)' },
      { id: 'CINEMATIC_MACRO', label: 'Rainbow Dispersion Macro' },
      { id: 'ARABIC_BRIDAL_VOGUE', label: 'Royal Arabian Bridal Suite' },
      { id: 'RUNWAY_MODEL', label: 'High-Fashion Catwalk Model' },
    ],
    cameraMotions: [
      { id: 'SLOW_ORBIT_360', label: 'Slow 360° Luxury Orbit' },
      { id: 'ELEGANT_PAN', label: 'Smooth Horizontal Pan' },
      { id: 'DRAMATIC_ZOOM_IN', label: 'Slow Dramatic Zoom-In' },
      { id: 'SPARKLE_MACRO', label: 'Light Sweep & Sparkle Sweep' },
    ],
    hasApiKey: higgsfieldClient.hasConfiguredApiKey(),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const {
      prompt,
      mode = 'image',
      aspectRatio,
      style = 'LUXURY_EDITORIAL',
      cameraMotion = 'SLOW_ORBIT_360',
      durationSeconds = 5,
      apiKey,
    } = body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid visual or video prompt brief.' },
        { status: 400 }
      );
    }

    const result = await higgsfieldClient.generateMedia({
      prompt: prompt.trim(),
      mode: mode === 'video' ? 'video' : 'image',
      aspectRatio,
      style,
      cameraMotion,
      durationSeconds: Number(durationSeconds) || 5,
      customApiKey: apiKey,
    });

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error: any) {
    console.error('Higgsfield generation error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Higgsfield processing failure' },
      { status: 500 }
    );
  }
}
