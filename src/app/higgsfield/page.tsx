'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Film,
  Image as ImageIcon,
  Play,
  Download,
  Copy,
  Check,
  Key,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  Layers,
  Sliders,
  Wand2,
  Video,
  FileCode,
  Zap,
} from 'lucide-react';

interface GenerationItem {
  id: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  prompt: string;
  enhancedPrompt: string;
  aspectRatio: string;
  style: string;
  cameraMotion?: string;
  status: string;
  generatedAt: string;
  isSimulated: boolean;
}

const PRESET_PROMPTS = [
  {
    title: 'Royal Dubai Bridal Choker',
    titleAr: 'طقم شوكر زفاف ملكي دبي',
    prompt:
      'Cinematic luxury editorial photography of a 925 sterling silver cascading bridal choker set with AAA cubic zirconia, polished rhodium reflection, soft warm candlelight, velvet background, Vogue Middle East style, 8k resolution',
    mode: 'image' as const,
    aspectRatio: '16:9',
    style: 'LUXURY_EDITORIAL',
  },
  {
    title: '360° Macro Solitaire Sparkle (Reels / TikTok)',
    titleAr: 'دوران سينمائي 360° لخاتم السوليتير',
    prompt:
      'Extreme macro 360-degree rotation of a luxury 925 sterling silver diamond-cut solitaire ring, light refracting across cubic zirconia facets, floating sparkles, velvet cushion',
    mode: 'video' as const,
    aspectRatio: '9:16',
    style: 'CINEMATIC_MACRO',
    cameraMotion: 'SLOW_ORBIT_360',
  },
  {
    title: 'Arabian Gulf Golden Hour Bridal Suite',
    titleAr: 'جلسة تصوير عروس الخليج وقت الغروب',
    prompt:
      'Arabian Gulf royal wedding aesthetic, elegant model adorned in opulent cascading 925 silver bridal suite, sunset golden hour lighting, soft sheer bridal veil, ultra-luxury poise',
    mode: 'image' as const,
    aspectRatio: '16:9',
    style: 'ARABIC_BRIDAL_VOGUE',
  },
  {
    title: 'Rhodium Tennis Bracelet Studio Macro',
    titleAr: 'ماكرو استوديو لإسورة التنس الفاخرة',
    prompt:
      'High-end commercial jewelry studio shot of a 925 sterling silver tennis bracelet on obsidian black reflective glass, flawless AAA zircon stones, razor-sharp specular highlights',
    mode: 'image' as const,
    aspectRatio: '1:1',
    style: 'STUDIO_PRODUCT',
  },
  {
    title: 'High-Fashion Runway Model Jewelry Video',
    titleAr: 'فيديو عارضة أزياء ترتدي أطقم الفضة الفاخرة',
    prompt:
      'Paris couture fashion runway model walking gracefully wearing statement 925 sterling silver layered necklace and drop earrings, dramatic spotlight tracking, elegant slow motion',
    mode: 'video' as const,
    aspectRatio: '9:16',
    style: 'RUNWAY_MODEL',
    cameraMotion: 'ELEGANT_PAN',
  },
];

export default function HiggsfieldStudioPage() {
  const [mode, setMode] = useState<'image' | 'video'>('image');
  const [prompt, setPrompt] = useState(
    'Cinematic luxury editorial photography of a 925 sterling silver bridal jewelry set, sparkling AAA cubic zirconia, polished rhodium reflection, soft warm candlelight, silk velvet background, Vogue wedding editorial style, 8k resolution'
  );
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [style, setStyle] = useState('LUXURY_EDITORIAL');
  const [cameraMotion, setCameraMotion] = useState('SLOW_ORBIT_360');
  const [apiKey, setApiKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  const [currentResult, setCurrentResult] = useState<GenerationItem>({
    id: 'hf-seed-1',
    mediaUrl: '/press/inside-the-bridal-collection-july2026.jpg',
    mediaType: 'image',
    prompt:
      'Cinematic luxury editorial photography of a 925 sterling silver bridal jewelry set, sparkling AAA cubic zirconia, polished rhodium reflection, soft warm candlelight, silk velvet background, Vogue wedding editorial style, 8k resolution',
    enhancedPrompt:
      'Cinematic luxury editorial photography of a 925 sterling silver bridal jewelry set — Vogue Middle East editorial luxury lighting, 925 sterling silver hallmarked, flawless AAA cubic zirconia, polished rhodium reflection, soft warm candlelight, velvet background, 8k hyper-detail',
    aspectRatio: '16:9',
    style: 'LUXURY_EDITORIAL',
    status: 'COMPLETED',
    generatedAt: new Date().toISOString(),
    isSimulated: true,
  });

  const [history, setHistory] = useState<GenerationItem[]>([
    {
      id: 'hf-hist-1',
      mediaUrl: '/press/bridal-arabia-cover-april2026.jpg',
      mediaType: 'image',
      prompt: 'Arabian Gulf royal wedding aesthetic, elegant model adorned in opulent cascading 925 silver bridal suite',
      enhancedPrompt: 'Arabian Gulf royal wedding aesthetic — Arabian Gulf royal wedding aesthetic, opulent cascading bridal choker and earrings, embroidered golden silk veil softly out of focus',
      aspectRatio: '16:9',
      style: 'ARABIC_BRIDAL_VOGUE',
      status: 'COMPLETED',
      generatedAt: 'Today, 10:45 AM',
      isSimulated: true,
    },
    {
      id: 'hf-hist-2',
      mediaUrl: '/press/luxury-style-middle-east-aug2026.jpg',
      mediaType: 'image',
      prompt: 'High-end commercial jewelry studio shot of a 925 sterling silver tennis bracelet on obsidian black reflective glass',
      enhancedPrompt: 'High-end commercial jewelry studio shot on clean obsidian reflective surface, crystal clear facet cut precision, 100mm macro lens',
      aspectRatio: '1:1',
      style: 'STUDIO_PRODUCT',
      status: 'COMPLETED',
      generatedAt: 'Today, 09:30 AM',
      isSimulated: true,
    },
    {
      id: 'hf-hist-3',
      mediaUrl: '/press/business-lifestyle-march2026.jpg',
      mediaType: 'image',
      prompt: 'Luxury executive silver cuff and minimalist pendant necklace in Dubai boardroom',
      enhancedPrompt: 'Luxury executive silver cuff and minimalist pendant necklace — Vogue Middle East editorial luxury lighting',
      aspectRatio: '16:9',
      style: 'LUXURY_EDITORIAL',
      status: 'COMPLETED',
      generatedAt: 'Yesterday',
      isSimulated: true,
    },
  ]);

  // Load custom key from localStorage if present
  useEffect(() => {
    const saved = localStorage.getItem('OMNIA_HIGGSFIELD_API_KEY');
    if (saved) setApiKey(saved);
  }, []);

  const handleSaveKey = () => {
    if (apiKey) {
      localStorage.setItem('OMNIA_HIGGSFIELD_API_KEY', apiKey);
    } else {
      localStorage.removeItem('OMNIA_HIGGSFIELD_API_KEY');
    }
    setShowKeyInput(false);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);

    try {
      const res = await fetch('/api/higgsfield/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          mode,
          aspectRatio,
          style,
          cameraMotion: mode === 'video' ? cameraMotion : undefined,
          apiKey: apiKey || undefined,
        }),
      });

      const data = await res.json();
      if (data.success && data.result) {
        const newItem: GenerationItem = data.result;
        setCurrentResult(newItem);
        setHistory((prev) => [newItem, ...prev.slice(0, 9)]);
      } else {
        alert(data.error || 'Generation failed. Please try again.');
      }
    } catch (err: any) {
      alert(`Error contacting Higgsfield API: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const applyPreset = (preset: (typeof PRESET_PROMPTS)[0]) => {
    setPrompt(preset.prompt);
    setMode(preset.mode);
    setAspectRatio(preset.aspectRatio);
    setStyle(preset.style);
    if (preset.cameraMotion) setCameraMotion(preset.cameraMotion);
  };

  const copyToClipboard = (text: string, type: 'link' | 'embed') => {
    navigator.clipboard.writeText(text);
    if (type === 'link') {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else {
      setCopiedEmbed(true);
      setTimeout(() => setCopiedEmbed(false), 2000);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Studio Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-[#171822] via-[#1b1d28] to-[#14151c] border border-luxury-gold/30 shadow-xl relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-48 h-48 bg-luxury-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-1 z-10">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500/20 to-luxury-gold/20 text-luxury-gold border border-luxury-gold/30">
              Official Integration
            </span>
            <span className="text-xs text-luxury-muted font-mono">Higgsfield.ai v4.1</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-serif font-bold text-luxury-ivory tracking-wide flex items-center gap-3">
            <span>Higgsfield AI Visual & Video Studio</span>
            <Sparkles className="w-5 h-5 text-luxury-gold" />
          </h1>
          <p className="text-xs text-luxury-muted max-w-2xl leading-relaxed">
            Generate photorealistic 8K editorial jewelry visuals and cinematic 360° videos for Omnia Stores luxury 925 sterling silver bridal collections, social media reels, and blog articles.
          </p>
        </div>

        {/* API Key Status / Config Button */}
        <div className="flex items-center gap-3 z-10 shrink-0">
          <button
            onClick={() => setShowKeyInput(!showKeyInput)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium bg-[#1e2029] hover:bg-[#272a36] text-luxury-platinum border border-[#323647] transition-all shadow-sm"
          >
            <Key className="w-3.5 h-3.5 text-luxury-gold" />
            <span>{apiKey ? 'API Key Configured' : 'Configure API Key'}</span>
            <span className={`w-2 h-2 rounded-full ${apiKey ? 'bg-emerald-400' : 'bg-amber-400'}`} />
          </button>

          <a
            href="https://higgsfield.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-luxury-gold hover:bg-luxury-gold-light text-luxury-charcoal transition-all font-semibold shadow-sm"
          >
            <span>Higgsfield.ai</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* API Key Modal / Drawer if open */}
      {showKeyInput && (
        <div className="p-4 rounded-xl bg-[#1a1b24] border border-[#2e3142] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-luxury-gold" />
              <span className="text-xs font-semibold text-luxury-ivory">Higgsfield API Key Setup</span>
            </div>
            <span className="text-[11px] text-luxury-muted">Saved in secure browser local storage</span>
          </div>
          <div className="flex gap-2">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Paste your Higgsfield API key (e.g. hf_sec_...)"
              className="flex-1 bg-[#121319] border border-[#2a2d3d] rounded-lg px-3 py-2 text-xs text-luxury-ivory font-mono focus:outline-none focus:border-luxury-gold"
            />
            <button
              onClick={handleSaveKey}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-luxury-gold hover:bg-luxury-gold-light text-luxury-charcoal transition-all"
            >
              Save Key
            </button>
          </div>
        </div>
      )}

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Controls & Prompt Studio (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-[#16171d] border border-[#23252e] space-y-5 shadow-lg">
            {/* Mode Switcher */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-luxury-muted block mb-2">
                Generation Mode
              </label>
              <div className="grid grid-cols-2 gap-2 bg-[#121318] p-1.5 rounded-xl border border-[#23252e]">
                <button
                  type="button"
                  onClick={() => setMode('image')}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                    mode === 'image'
                      ? 'bg-luxury-gold text-luxury-charcoal shadow-sm'
                      : 'text-luxury-muted hover:text-luxury-platinum'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Editorial Visual</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMode('video')}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                    mode === 'video'
                      ? 'bg-luxury-gold text-luxury-charcoal shadow-sm'
                      : 'text-luxury-muted hover:text-luxury-platinum'
                  }`}
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Cinematic Video</span>
                </button>
              </div>
            </div>

            {/* Presets Carousel */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-luxury-muted block mb-2">
                Luxury Jewelry Presets
              </label>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {PRESET_PROMPTS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => applyPreset(p)}
                    className="px-3 py-1.5 rounded-lg text-xs bg-[#1a1c24] hover:bg-[#232633] text-luxury-platinum border border-[#2b2e3e] shrink-0 transition-all text-left"
                  >
                    <span className="font-semibold block truncate max-w-[200px]">{p.title}</span>
                    <span className="text-[10px] text-luxury-gold block">{p.mode.toUpperCase()} • {p.aspectRatio}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-luxury-muted">
                  Prompt Brief
                </label>
                <span className="text-[10px] text-luxury-gold font-mono">Higgsfield Auto-Enhancer Active</span>
              </div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={4}
                placeholder="Describe the jewelry piece, lighting, backdrop, and styling..."
                className="w-full bg-[#121318] border border-[#262835] rounded-xl p-3 text-xs text-luxury-ivory focus:outline-none focus:border-luxury-gold leading-relaxed resize-none"
              />
            </div>

            {/* Style Selector */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-luxury-muted block mb-2">
                Editorial Aesthetic Style
              </label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full bg-[#121318] border border-[#262835] rounded-xl px-3 py-2 text-xs text-luxury-ivory focus:outline-none focus:border-luxury-gold"
              >
                <option value="LUXURY_EDITORIAL">Vogue Middle East Editorial Lighting</option>
                <option value="STUDIO_PRODUCT">Clean Studio Macro (Obsidian Glass)</option>
                <option value="CINEMATIC_MACRO">Rainbow Spectral Dispersion Macro</option>
                <option value="ARABIC_BRIDAL_VOGUE">Royal Arabian Gulf Bridal Suite</option>
                <option value="RUNWAY_MODEL">Paris Couture Runway Model</option>
              </select>
            </div>

            {/* Aspect Ratio Buttons */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-luxury-muted block mb-2">
                Aspect Ratio
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: '16:9', label: '16:9', sub: 'Landscape' },
                  { id: '9:16', label: '9:16', sub: 'Reels / TikTok' },
                  { id: '1:1', label: '1:1', sub: 'Instagram' },
                  { id: '4:3', label: '4:3', sub: 'Classic' },
                ].map((ar) => (
                  <button
                    key={ar.id}
                    type="button"
                    onClick={() => setAspectRatio(ar.id)}
                    className={`py-2 px-1 text-center rounded-lg border transition-all ${
                      aspectRatio === ar.id
                        ? 'bg-luxury-gold/15 text-luxury-gold-light border-luxury-gold/50 font-bold'
                        : 'bg-[#121318] text-luxury-muted hover:text-luxury-platinum border-[#23252e]'
                    }`}
                  >
                    <span className="block text-xs font-mono">{ar.label}</span>
                    <span className="block text-[9px] text-luxury-muted truncate">{ar.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Video-Specific Controls (Camera Motion) */}
            {mode === 'video' && (
              <div className="p-3 rounded-xl bg-[#14151e] border border-amber-500/20 space-y-2">
                <div className="flex items-center gap-1.5 text-luxury-gold text-xs font-semibold">
                  <Film className="w-3.5 h-3.5" />
                  <span>Cinematic Camera Motion</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'SLOW_ORBIT_360', label: '360° Luxury Orbit' },
                    { id: 'ELEGANT_PAN', label: 'Smooth Horizontal Pan' },
                    { id: 'DRAMATIC_ZOOM_IN', label: 'Dramatic Zoom-In' },
                    { id: 'SPARKLE_MACRO', label: 'Sparkle Sweep' },
                  ].map((cam) => (
                    <button
                      key={cam.id}
                      type="button"
                      onClick={() => setCameraMotion(cam.id)}
                      className={`p-2 text-left rounded-lg text-[11px] border transition-all ${
                        cameraMotion === cam.id
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-semibold'
                          : 'bg-[#1a1b24] text-luxury-muted border-[#2a2c3a]'
                      }`}
                    >
                      {cam.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Generate Action Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-gradient-to-r from-luxury-gold via-luxury-gold-light to-amber-500 text-luxury-charcoal hover:brightness-110 active:scale-[0.99] transition-all disabled:opacity-50 shadow-lg flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Synthesizing with Higgsfield AI...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4" />
                  <span>
                    Generate {mode === 'video' ? 'Cinematic 360° Video' : '8K Editorial Visual'}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Live Showcase & Media Player (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-[#16171d] border border-[#23252e] space-y-4 shadow-lg">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-[#23252e] pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {currentResult.status}
                </span>
                <span className="text-xs text-luxury-muted font-mono">{currentResult.id}</span>
                <span className="text-xs text-luxury-muted">• {currentResult.aspectRatio}</span>
                <span className="text-xs text-luxury-muted">• {currentResult.style}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard(currentResult.mediaUrl, 'link')}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] bg-[#1e202a] hover:bg-[#282a38] text-luxury-platinum transition-colors"
                >
                  {copiedLink ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedLink ? 'Copied URL' : 'Copy URL'}</span>
                </button>

                <button
                  onClick={() =>
                    copyToClipboard(
                      `<img src="${currentResult.mediaUrl}" alt="${currentResult.prompt}" class="w-full rounded-xl shadow-lg" />`,
                      'embed'
                    )
                  }
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] bg-[#1e202a] hover:bg-[#282a38] text-luxury-platinum transition-colors"
                >
                  {copiedEmbed ? <Check className="w-3 h-3 text-emerald-400" /> : <FileCode className="w-3 h-3" />}
                  <span>{copiedEmbed ? 'Copied HTML' : 'Copy Embed HTML'}</span>
                </button>
              </div>
            </div>

            {/* Media Player / Image Viewer Frame */}
            <div className="relative rounded-xl overflow-hidden bg-black/60 border border-[#2c2f3e] min-h-[380px] flex items-center justify-center">
              {currentResult.mediaType === 'video' ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-4">
                  <video
                    src={currentResult.mediaUrl}
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="max-h-[460px] w-auto rounded-lg shadow-2xl"
                  />
                  <div className="mt-2 text-[11px] text-luxury-muted flex items-center gap-1.5">
                    <Film className="w-3 h-3 text-luxury-gold" />
                    <span>Camera Motion: {currentResult.cameraMotion || 'SLOW_ORBIT_360'}</span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentResult.mediaUrl}
                    alt={currentResult.prompt}
                    className="w-full max-h-[460px] object-cover object-center"
                  />
                </div>
              )}

              {/* Watermark / Badge */}
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[10px] text-luxury-ivory font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
                <span>Higgsfield.ai 8K Neural Synthesis</span>
              </div>
            </div>

            {/* Enhanced Prompt Details */}
            <div className="p-4 rounded-xl bg-[#121318] border border-[#23252e] space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-luxury-gold block">
                Enhanced Editorial Prompt Executed
              </span>
              <p className="text-xs text-luxury-platinum leading-relaxed font-mono">
                {currentResult.enhancedPrompt}
              </p>
            </div>

            {/* Media Actions */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <a
                  href={currentResult.mediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#22242f] hover:bg-[#2c2f3d] text-luxury-platinum border border-[#34384a] transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Master File</span>
                </a>

                <a
                  href="/content-studio"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-luxury-gold/15 hover:bg-luxury-gold/25 text-luxury-gold border border-luxury-gold/30 transition-all"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Use in Content Studio</span>
                </a>
              </div>

              <div className="text-[11px] text-luxury-muted font-mono">
                Synthesized: {currentResult.generatedAt}
              </div>
            </div>
          </div>

          {/* Recent Generations Gallery */}
          <div className="p-5 rounded-2xl bg-[#16171d] border border-[#23252e] space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-luxury-gold" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-luxury-ivory">
                  Recent Generation History ({history.length})
                </h3>
              </div>
              <span className="text-[11px] text-luxury-muted">Click thumbnail to inspect</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {history.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentResult(item)}
                  className={`group relative rounded-xl overflow-hidden border aspect-video transition-all ${
                    currentResult.id === item.id
                      ? 'border-luxury-gold ring-2 ring-luxury-gold/30 scale-[1.02]'
                      : 'border-[#262835] hover:border-luxury-gold/50'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.mediaUrl}
                    alt={item.prompt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end text-left">
                    <span className="text-[10px] text-white font-medium truncate">{item.style}</span>
                    <span className="text-[9px] text-luxury-gold uppercase">{item.mediaType}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
