export interface HiggsfieldGenerationOptions {
  prompt: string;
  mode?: 'image' | 'video';
  aspectRatio?: '16:9' | '9:16' | '1:1' | '4:3';
  style?: 'LUXURY_EDITORIAL' | 'STUDIO_PRODUCT' | 'CINEMATIC_MACRO' | 'ARABIC_BRIDAL_VOGUE' | 'RUNWAY_MODEL';
  cameraMotion?: 'SLOW_ORBIT_360' | 'ELEGANT_PAN' | 'DRAMATIC_ZOOM_IN' | 'SPARKLE_MACRO';
  durationSeconds?: number;
  customApiKey?: string;
}

export interface HiggsfieldGenerationResult {
  id: string;
  mediaUrl: string;
  imageUrl?: string; // backwards compatibility
  videoUrl?: string;
  mediaType: 'image' | 'video';
  prompt: string;
  enhancedPrompt: string;
  aspectRatio: string;
  style: string;
  cameraMotion?: string;
  status: 'COMPLETED' | 'SIMULATED';
  generatedAt: string;
  isSimulated: boolean;
}

export class HiggsfieldClient {
  private defaultApiKey: string | undefined;

  constructor() {
    this.defaultApiKey = process.env.HIGGSFIELD_API_KEY;
  }

  /**
   * Automatically enhances user brief with cinematic luxury jewelry prompt attributes
   */
  public enhancePrompt(prompt: string, style?: string, mode?: 'image' | 'video'): string {
    const base = prompt.trim();
    const styleEnhancers: Record<string, string> = {
      LUXURY_EDITORIAL:
        'Vogue Middle East editorial luxury lighting, 925 sterling silver hallmarked, flawless AAA cubic zirconia, polished rhodium reflection, soft warm candlelight, velvet background, 8k hyper-detail',
      STUDIO_PRODUCT:
        'High-end commercial jewelry studio shot on clean obsidian reflective surface, crystal clear facet cut precision, 100mm macro lens, sharp specular highlights, pristine anti-tarnish rhodium finish',
      CINEMATIC_MACRO:
        'Extreme macro cinematic depth of field, individual zirconia micro-facets refracting rainbow spectral dispersion, slow fluid light sweep, ultra-luxury high jewellery craftsmanship',
      ARABIC_BRIDAL_VOGUE:
        'Arabian Gulf royal wedding aesthetic, opulent cascading bridal choker and earrings, embroidered golden silk veil softly out of focus, ethereal bridal glow, dignified luxury poise',
      RUNWAY_MODEL:
        'High-fashion runway model wearing statement 925 sterling silver bridal suite, dramatic catwalk illumination, subtle movement blur, Paris Couture week fashion photography',
    };

    const chosenStyle = styleEnhancers[style || 'LUXURY_EDITORIAL'] || styleEnhancers.LUXURY_EDITORIAL;
    const motionSuffix =
      mode === 'video'
        ? ', slow cinematic 60fps motion, flawless camera stabilization, dynamic glistening reflections'
        : ', award-winning editorial still photography';

    return `${base} — ${chosenStyle}${motionSuffix}`;
  }

  /**
   * Generates photorealistic luxury visuals or cinematic video via Higgsfield.ai
   */
  public async generateMedia(options: HiggsfieldGenerationOptions): Promise<HiggsfieldGenerationResult> {
    const mode = options.mode || 'image';
    const style = options.style || 'LUXURY_EDITORIAL';
    const aspectRatio = options.aspectRatio || (mode === 'video' ? '9:16' : '16:9');
    const enhancedPrompt = this.enhancePrompt(options.prompt, style, mode);
    const activeKey = options.customApiKey || this.defaultApiKey;

    // If an official Higgsfield API Key is provided, dispatch to Higgsfield Cloud API
    if (activeKey && !activeKey.includes('xxxx') && activeKey.length > 8) {
      try {
        let keyId = activeKey;
        let keySecret = '';
        if (activeKey.includes(':')) {
          const parts = activeKey.split(':');
          keyId = parts[0];
          keySecret = parts[1];
        }

        const endpoint =
          mode === 'video'
            ? 'https://api.higgsfield.ai/v1/video/generate'
            : 'https://api.higgsfield.ai/recraft/v4.1/text-to-image';

        const payload =
          mode === 'video'
            ? {
                prompt: enhancedPrompt,
                aspect_ratio: aspectRatio,
                camera_motion: options.cameraMotion || 'SLOW_ORBIT_360',
                duration: options.durationSeconds || 5,
              }
            : {
                prompt: enhancedPrompt,
                aspect_ratio: aspectRatio,
                style_preset: 'luxury_photography',
              };

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Key ${keyId}`,
            'X-Higgsfield-Key-Id': keyId,
            'X-Higgsfield-Key-Secret': keySecret,
            'hf-api-key': keyId,
            'X-API-Key': keyId,
            'X-Higgsfield-Source': 'Omnia-Content-Intelligence',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();
          const mediaUrl =
            data.video_url ||
            data.video?.url ||
            data.images?.[0]?.url ||
            data.output_url ||
            data.result?.url;

          if (mediaUrl) {
            return {
              id: data.request_id || `hf-${Date.now()}`,
              mediaUrl,
              imageUrl: mode === 'image' ? mediaUrl : undefined,
              videoUrl: mode === 'video' ? mediaUrl : undefined,
              mediaType: mode,
              prompt: options.prompt,
              enhancedPrompt,
              aspectRatio,
              style,
              cameraMotion: options.cameraMotion,
              status: 'COMPLETED',
              generatedAt: new Date().toISOString(),
              isSimulated: false,
            };
          }
        } else {
          const errData = await response.json().catch(() => ({}));
          console.warn(`Higgsfield API response (${response.status}):`, errData);
        }
      } catch (err) {
        console.warn('Higgsfield API dispatch encountered an error, falling back to verified luxury cache:', err);
      }
    }

    // High-resolution verified luxury visual assets & photorealistic AI imagery for Omnia Stores
    const luxuryEditorialPool = [
      '/ai-luxury/royal-empress-vogue-model.jpg',
      '/ai-luxury/royal-empress-bridal-bust.jpg',
      '/ai-luxury/starlight-marquise-droplets-macro.jpg',
      '/hero/hero-emerald-grandeur.jpg',
      '/hero/hero-canary-yellow-suite.jpg',
      '/hero/hero-diamond-radiance.jpg',
      '/hero/hero-pearl-revival.jpg',
      '/hero/hero-ruby-statements.jpg',
      '/campaigns/01_timeless-elegance.png',
      '/campaigns/02_classic-brilliance.png',
      '/campaigns/03_royal-allure.png',
      '/campaigns/04_radiant-luxury.png',
      '/campaigns/07_heirloom-beauty.png',
      '/campaigns/08_floral-charm.png',
      '/campaigns/09_regal-rubies.png',
      '/campaigns/10_emerald-grandeur.png',
      '/campaigns/11_pearl-revival.png',
      '/campaigns/12_sapphire-sophistication.png',
    ];

    // Select asset based on hash of prompt to remain deterministic
    const hash = options.prompt.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const chosenVisual = luxuryEditorialPool[hash % luxuryEditorialPool.length];

    // For video simulation, provide a luxury looping video asset or animated preview
    const videoAsset = 'https://assets.mixkit.co/videos/preview/mixkit-glittering-diamond-ring-close-up-42777-large.mp4';
    const mediaUrl = mode === 'video' ? videoAsset : chosenVisual;

    return {
      id: `hf-${Date.now()}`,
      mediaUrl,
      imageUrl: chosenVisual,
      videoUrl: mode === 'video' ? videoAsset : undefined,
      mediaType: mode,
      prompt: options.prompt,
      enhancedPrompt,
      aspectRatio,
      style,
      cameraMotion: options.cameraMotion,
      status: 'SIMULATED',
      generatedAt: new Date().toISOString(),
      isSimulated: true,
    };
  }

  /**
   * Backwards-compatible bridal visual generation method
   */
  public async generateBridalVisual(options: HiggsfieldGenerationOptions): Promise<HiggsfieldGenerationResult> {
    return this.generateMedia({
      ...options,
      mode: 'image',
    });
  }

  /**
   * Connection health check
   */
  public hasConfiguredApiKey(): boolean {
    return Boolean(this.defaultApiKey && !this.defaultApiKey.includes('xxxx') && this.defaultApiKey.length > 8);
  }
}

export const higgsfieldClient = new HiggsfieldClient();
