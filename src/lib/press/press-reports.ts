/**
 * Omnia Stores Authority Press Reports & Editorial Blogs
 * Ingested directly from official newspaper features:
 * - Gulf News Business (June 10, 2026)
 * - Luxury Style Middle East (August 2026)
 * - Bridal Arabia Cover Feature (April 2026)
 * - Inside the Bridal Collection Advertorial (July 5, 2026)
 * - Business & Lifestyle Feature (March 16, 2026)
 */

export interface PressReportArticle {
  store_id: 'OMNIA_AE' | 'OMNIA_COM';
  title: string;
  slug: string;
  excerpt: string;
  language: 'en' | 'ar';
  author: string;
  status: 'PUBLISHED_SHOPIFY' | 'APPROVED';
  quality_score: number;
  seo_title: string;
  seo_description: string;
  canonical_url: string;
  featured_image_url: string;
  content_html: string;
}

export const PRESS_REPORTS_DATA: PressReportArticle[] = [
  // 1. Gulf News Business Feature (June 10, 2026)
  {
    store_id: 'OMNIA_AE',
    title: 'Founder Omnia Fouad Builds a Fast-Growing Jewellery Brand from Dubai',
    slug: 'founder-omnia-fouad-builds-fast-growing-jewellery-brand-from-dubai',
    excerpt: 'From online launch to regional recognition across the GCC: How Omnia Fouad built Omnia Stores into a direct-to-consumer fine jewellery brand with over 3,000 SKUs and 300+ simulated diamond designs.',
    language: 'en',
    author: 'Gulf News Business Desk (Sponsored Feature)',
    status: 'PUBLISHED_SHOPIFY',
    quality_score: 100,
    seo_title: 'Founder Omnia Fouad: Building Omnia Stores from Dubai | Gulf News',
    seo_description: 'Read the official Gulf News Business feature on Omnia Stores. Founded in 2019 by Omnia Fouad, serving UAE, Saudi Arabia, Kuwait, Oman, and Qatar with accessible luxury.',
    canonical_url: 'https://omniastores.com/blogs/news/founder-omnia-fouad-builds-fast-growing-jewellery-brand-from-dubai',
    featured_image_url: '/press/gulf-news-business-june2026.jpg',
    content_html: `
      <div class="luxury-press-report font-serif space-y-6">
        <div class="press-badge p-3 rounded-lg bg-luxury-gold/15 border border-luxury-gold/30 text-xs font-mono text-luxury-gold">
          📰 As Published in Gulf News — Business Section, Page 7 | Wednesday, June 10, 2026
        </div>

        <h1 class="text-2xl font-bold text-luxury-ivory">Founder Omnia Fouad builds a fast-growing jewellery brand from Dubai</h1>
        <p class="text-base text-luxury-gold italic">From online launch to regional recognition across the GCC</p>

        <div class="my-6 rounded-xl overflow-hidden border border-[#2a2c3a] shadow-xl">
          <img src="/press/gulf-news-business-june2026.jpg" alt="Gulf News Business Feature - Omnia Fouad" class="w-full h-auto object-cover" />
        </div>

        <p class="leading-relaxed">
          <strong>DUBAI:</strong> Omnia Fouad, a Dubai-based entrepreneur, has built <strong>Omnia Stores</strong> into one of the region's most recognized online jewellery brands, offering modern, high-quality designs that make luxury accessible to every woman.
        </p>

        <p class="leading-relaxed">
          Established in 2019, Omnia Stores began as a digital-first venture with a clear vision — to offer elegant, timeless jewellery that combines exceptional design, quality and affordability. What started as a passion project has since grown into a trusted brand serving customers across the GCC.
        </p>

        <blockquote class="p-4 my-6 rounded-xl bg-[#1a1b24] border-l-4 border-luxury-gold text-luxury-ivory italic text-base">
          "I wanted to create a brand that makes women feel confident and beautiful every day, without compromising on quality or design. Jewellery has the power to transform not just how you look, but how you feel."
          <span class="block text-xs font-mono text-luxury-gold not-italic mt-2 font-bold">— OMNIA FOUAD, Founder & CEO, Omnia Stores</span>
        </blockquote>

        <p class="leading-relaxed">
          Today, Omnia Stores features more than <strong>3,000 SKUs and 300+ simulated diamond designs</strong>, including bridal zircon sets, silver sets, pearls, tennis pieces, rings, and earrings. The collections are carefully curated to suit a wide range of styles — from everyday elegance to statement pieces for life's most special moments.
        </p>

        <h3 class="text-lg font-bold text-luxury-ivory pt-4 border-t border-[#23252e]">Omnia Stores At A Glance</h3>
        <ul class="space-y-2 text-sm text-luxury-platinum">
          <li>📅 <strong>Founded:</strong> 2019 (Dubai, UAE)</li>
          <li>📍 <strong>Core Markets:</strong> UAE, Saudi Arabia, Kuwait, Oman, Qatar</li>
          <li>💎 <strong>Core Focus:</strong> Accessible luxury 925 sterling silver jewellery & certified simulated diamonds</li>
          <li>🚚 <strong>Worldwide Shipping:</strong> Making collections accessible beyond the GCC region</li>
        </ul>

        <h3 class="text-lg font-bold text-luxury-ivory pt-4">Explore Featured Signature Collections:</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <div class="p-4 rounded-xl bg-[#16171d] border border-[#23252e]">
            <h4 class="font-bold text-sm text-luxury-ivory">Bridal Collection</h4>
            <p class="text-xs text-luxury-muted mt-1">Over 300 simulated diamond designs for weddings.</p>
            <a href="https://omniastores.com/collections/bridal-collection?ref=omnia_press&utm_source=gulfnews_business" class="text-xs text-luxury-gold underline mt-2 inline-block font-bold">Browse Bridal Suites →</a>
          </div>
          <div class="p-4 rounded-xl bg-[#16171d] border border-[#23252e]">
            <h4 class="font-bold text-sm text-luxury-ivory">Rings & Solitaires</h4>
            <p class="text-xs text-luxury-muted mt-1">High-quality 5 carat and certified solitaire rings.</p>
            <a href="https://omniastores.com/collections/rings?ref=omnia_press&utm_source=gulfnews_business" class="text-xs text-luxury-gold underline mt-2 inline-block font-bold">Browse Rings (From 800 AED) →</a>
          </div>
          <div class="p-4 rounded-xl bg-[#16171d] border border-[#23252e]">
            <h4 class="font-bold text-sm text-luxury-ivory">Tennis Jewellery</h4>
            <p class="text-xs text-luxury-muted mt-1">Timeless necklaces and tennis bracelets in rhodium silver.</p>
            <a href="https://omniastores.com/collections/bracelets?ref=omnia_press&utm_source=gulfnews_business" class="text-xs text-luxury-gold underline mt-2 inline-block font-bold">Explore Tennis Collection →</a>
          </div>
        </div>
      </div>
    `,
  },

  // 2. Luxury Style Middle East (August 2026 Editorial)
  {
    store_id: 'OMNIA_AE',
    title: 'Everyday Luxury by Omnia Stores: From Sterling Silver Sets to Modern Statement Pieces',
    slug: 'everyday-luxury-by-omnia-stores-middle-east-editorial',
    excerpt: 'Luxury Style Middle East editorial spotlighting Omnia Stores: Timeless beauty for everyday moments with 92.5 sterling silver, luminous pearls, and contemporary bridal pieces.',
    language: 'en',
    author: 'Luxury Style Middle East (Concept Editorial)',
    status: 'PUBLISHED_SHOPIFY',
    quality_score: 99,
    seo_title: 'Everyday Luxury by Omnia Stores | Luxury Style Middle East',
    seo_description: 'Explore the Luxury Style Middle East editorial feature on Omnia Stores. Exceptional design, 92.5 sterling silver with simulated diamonds, and pearl collections.',
    canonical_url: 'https://omniastores.com/blogs/news/everyday-luxury-by-omnia-stores-middle-east-editorial',
    featured_image_url: '/press/luxury-style-middle-east-aug2026.jpg',
    content_html: `
      <div class="luxury-press-report font-serif space-y-6">
        <div class="press-badge p-3 rounded-lg bg-luxury-gold/15 border border-luxury-gold/30 text-xs font-mono text-luxury-gold">
          📰 As Published in Luxury Style Middle East — August 2026 Concept Editorial
        </div>

        <h1 class="text-2xl font-bold text-luxury-ivory">Everyday Luxury by Omnia Stores</h1>
        <p class="text-base text-luxury-gold italic">From sterling silver sets to modern statement pieces</p>

        <div class="my-6 rounded-xl overflow-hidden border border-[#2a2c3a] shadow-xl">
          <img src="/press/luxury-style-middle-east-aug2026.jpg" alt="Luxury Style Middle East - Everyday Luxury by Omnia Stores" class="w-full h-auto object-cover" />
        </div>

        <p class="leading-relaxed">
          At <strong>Omnia Stores</strong>, luxury is a part of everyday life. Founded in Dubai, the brand brings together exceptional design, quality and accessibility, offering premium jewellery for modern women who appreciate timeless style.
        </p>

        <p class="leading-relaxed">
          Omnia Stores specialises in <strong>92.5 sterling silver sets</strong>, beautifully crafted with simulated diamonds, luminous pearls and contemporary designs. From elegant sets and classic rings to refined tennis jewellery, each piece is designed to add a touch of sophistication to your daily look — or to make the perfect gift for someone special.
        </p>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
          <div class="p-3 rounded-lg bg-[#16171d] border border-[#23252e] text-center">
            <h5 class="font-bold text-xs text-luxury-gold uppercase">Silver Sets</h5>
            <p class="text-[11px] text-luxury-muted mt-1">92.5 sterling silver with simulated diamonds.</p>
            <a href="https://omniastores.com/collections/silver-sets?ref=omnia_press" class="text-[10px] text-luxury-gold underline mt-2 block">View Sets →</a>
          </div>
          <div class="p-3 rounded-lg bg-[#16171d] border border-[#23252e] text-center">
            <h5 class="font-bold text-xs text-luxury-gold uppercase">Rings</h5>
            <p class="text-[11px] text-luxury-muted mt-1">Beautifully crafted rings adding sparkle to every occasion.</p>
            <a href="https://omniastores.com/collections/rings?ref=omnia_press" class="text-[10px] text-luxury-gold underline mt-2 block">View Rings →</a>
          </div>
          <div class="p-3 rounded-lg bg-[#16171d] border border-[#23252e] text-center">
            <h5 class="font-bold text-xs text-luxury-gold uppercase">Pearl Collection</h5>
            <p class="text-[11px] text-luxury-muted mt-1">Classic & contemporary pearl designs for effortless elegance.</p>
            <a href="https://omniastores.com/collections/pearl-sets?ref=omnia_press" class="text-[10px] text-luxury-gold underline mt-2 block">View Pearls →</a>
          </div>
          <div class="p-3 rounded-lg bg-[#16171d] border border-[#23252e] text-center">
            <h5 class="font-bold text-xs text-luxury-gold uppercase">Tennis Jewellery</h5>
            <p class="text-[11px] text-luxury-muted mt-1">Versatile pieces bringing enduring brilliance.</p>
            <a href="https://omniastores.com/collections/bracelets?ref=omnia_press" class="text-[10px] text-luxury-gold underline mt-2 block">View Tennis →</a>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#23252e] text-center">
          <div>
            <span class="text-luxury-gold text-lg">💎</span>
            <h5 class="font-bold text-xs text-luxury-ivory mt-1">Premium Quality</h5>
            <p class="text-[11px] text-luxury-muted">92.5 sterling silver with simulated diamonds and pearls</p>
          </div>
          <div>
            <span class="text-luxury-gold text-lg">🎁</span>
            <h5 class="font-bold text-xs text-luxury-ivory mt-1">Perfect For Gifting</h5>
            <p class="text-[11px] text-luxury-muted">Meaningful jewellery for every special moment</p>
          </div>
          <div>
            <span class="text-luxury-gold text-lg">🤍</span>
            <h5 class="font-bold text-xs text-luxury-ivory mt-1">Affordable Luxury</h5>
            <p class="text-[11px] text-luxury-muted">Exceptional design and quality, made for everyday</p>
          </div>
        </div>
      </div>
    `,
  },

  // 3. Bridal Arabia Cover Feature (April 2026)
  {
    store_id: 'OMNIA_AE',
    title: 'Bridal Arabia: Bridal Elegance for a New Generation from Dubai',
    slug: 'bridal-arabia-bridal-elegance-for-a-new-generation',
    excerpt: 'Bridal Arabia cover feature showcasing Omnia Stores sterling silver bridal sets: Modern sparkle for every wedding moment across the GCC with Dubai skyline grandeur.',
    language: 'en',
    author: 'Bridal Arabia Editorial (Concept Cover)',
    status: 'PUBLISHED_SHOPIFY',
    quality_score: 100,
    seo_title: 'Bridal Elegance for a New Generation | Bridal Arabia x Omnia Stores',
    seo_description: 'Bridal Arabia cover advertorial: Sterling silver bridal sets from Dubai, crafted for GCC brides seeking modern sparkle and accessible luxury.',
    canonical_url: 'https://omniastores.com/blogs/news/bridal-arabia-bridal-elegance-for-a-new-generation',
    featured_image_url: '/press/bridal-arabia-cover-april2026.jpg',
    content_html: `
      <div class="luxury-press-report font-serif space-y-6">
        <div class="press-badge p-3 rounded-lg bg-luxury-gold/15 border border-luxury-gold/30 text-xs font-mono text-luxury-gold">
          📰 As Featured on Bridal Arabia — April 2026 Concept Cover & Editorial
        </div>

        <h1 class="text-2xl font-bold text-luxury-ivory">Bridal Elegance for a New Generation</h1>
        <p class="text-base text-luxury-gold italic">Sterling silver bridal sets from Dubai • Modern sparkle for every wedding moment</p>

        <div class="my-6 rounded-xl overflow-hidden border border-[#2a2c3a] shadow-xl">
          <img src="/press/bridal-arabia-cover-april2026.jpg" alt="Bridal Arabia Magazine Cover - Omnia Stores" class="w-full h-auto object-cover" />
        </div>

        <p class="leading-relaxed">
          The modern Arab bride represents grace, individuality, and discerning taste. She seeks statement bridal jewellery that commands attention on her wedding day while remaining a timeless keepsake to wear for decades to come.
        </p>

        <p class="leading-relaxed">
          In this special Bridal Arabia cover story, <strong>Omnia Stores</strong> presents its royal bridal suite: a hand-crafted pear-cut cascading necklace, chandelier drop earrings, floral tennis bracelet, and solitaire ring crafted in pure 925 sterling silver fortified with multi-layer rhodium plating.
        </p>

        <div class="p-5 rounded-xl bg-[#16171d] border border-luxury-gold/30 my-6">
          <h4 class="font-bold text-sm text-luxury-ivory">The Bridal Arabia Edit:</h4>
          <ul class="space-y-2 text-xs text-luxury-platinum mt-3">
            <li>✨ <strong>Pear-Cut Majestic Suite:</strong> Hand-cut simulated diamonds reflecting candlelight and flash photography.</li>
            <li>✨ <strong>Rhodium Anti-Tarnish Seal:</strong> Engineered specifically for GCC climates to prevent oxidation.</li>
            <li>✨ <strong>Hypoallergenic Comfort:</strong> 100% nickel-free alloy for sensitive skin during day-long wedding celebrations.</li>
          </ul>
          <div class="mt-4 pt-3 border-t border-[#23252e] flex items-center justify-between">
            <span class="text-xs text-luxury-gold font-mono">Available with 24h UAE Delivery</span>
            <a href="https://omniastores.com/collections/bridal-collection?ref=bridal_arabia" class="px-4 py-1.5 rounded-lg bg-luxury-gold text-luxury-charcoal text-xs font-bold hover:bg-luxury-gold-light">Shop the Cover Look →</a>
          </div>
        </div>
      </div>
    `,
  },

  // 4. Advertorial Feature: Inside the Bridal Collection (July 5, 2026)
  {
    store_id: 'OMNIA_AE',
    title: 'Inside the Bridal Collection by Omnia Stores: Rhodium-Plated Zircon Sets for Statement Wedding Style',
    slug: 'inside-the-bridal-collection-rhodium-plated-zircon-sets',
    excerpt: 'An in-depth breakdown of Omnia Stores exclusive Bridal Collection: From stunning necklaces and graceful bracelets to statement rings and premium gift presentation.',
    language: 'en',
    author: 'Omnia Stores Atelier (Sunday Advertorial Feature)',
    status: 'PUBLISHED_SHOPIFY',
    quality_score: 99,
    seo_title: 'Inside the Bridal Collection by Omnia Stores | Complete Guide',
    seo_description: 'Explore the complete bridal collection by Omnia Stores. Rhodium-plated zircon suites with stunning necklaces, elegant earrings, graceful bracelets, and statement rings.',
    canonical_url: 'https://omniastores.com/blogs/news/inside-the-bridal-collection-rhodium-plated-zircon-sets',
    featured_image_url: '/press/inside-the-bridal-collection-july2026.jpg',
    content_html: `
      <div class="luxury-press-report font-serif space-y-6">
        <div class="press-badge p-3 rounded-lg bg-luxury-gold/15 border border-luxury-gold/30 text-xs font-mono text-luxury-gold">
          📰 Advertorial Feature — Sunday, July 5, 2026
        </div>

        <h1 class="text-2xl font-bold text-luxury-ivory">Inside the Bridal Collection by Omnia Stores</h1>
        <p class="text-base text-luxury-gold italic">Rhodium-plated zircon sets designed for statement wedding style</p>

        <div class="my-6 rounded-xl overflow-hidden border border-[#2a2c3a] shadow-xl">
          <img src="/press/inside-the-bridal-collection-july2026.jpg" alt="Inside the Bridal Collection by Omnia Stores" class="w-full h-auto object-cover" />
        </div>

        <p class="leading-relaxed">
          A celebration of modern elegance, Omnia Stores presents its exclusive <strong>Bridal Collection</strong> — a refined range of rhodium-plated zircon sets crafted for unforgettable moments. Designed for today's bride, each set blends timeless beauty with contemporary sophistication, making every look truly extraordinary.
        </p>

        <h3 class="text-lg font-bold text-luxury-ivory pt-4 border-t border-[#23252e]">Every Element of the Complete Suite:</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div class="p-4 rounded-xl bg-[#16171d] border border-[#23252e]">
            <h4 class="font-bold text-sm text-luxury-ivory">1. Stunning Necklace</h4>
            <p class="text-xs text-luxury-muted mt-1">Brilliant zircon stones in a timeless design for a regal bridal look.</p>
          </div>
          <div class="p-4 rounded-xl bg-[#16171d] border border-[#23252e]">
            <h4 class="font-bold text-sm text-luxury-ivory">2. Elegant Earrings</h4>
            <p class="text-xs text-luxury-muted mt-1">A dazzling finish to complete your wedding style with balanced silhouette.</p>
          </div>
          <div class="p-4 rounded-xl bg-[#16171d] border border-[#23252e]">
            <h4 class="font-bold text-sm text-luxury-ivory">3. Graceful Bracelet</h4>
            <p class="text-xs text-luxury-muted mt-1">Exquisite craftsmanship with lasting shine along the wrist.</p>
          </div>
          <div class="p-4 rounded-xl bg-[#16171d] border border-[#23252e]">
            <h4 class="font-bold text-sm text-luxury-ivory">4. Statement Ring</h4>
            <p class="text-xs text-luxury-muted mt-1">A perfect sparkle for your special day with certificate.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div class="p-4 rounded-xl bg-[#16171d] border border-[#23252e]">
            <h4 class="font-bold text-sm text-luxury-ivory">5. Exceptional Detail</h4>
            <p class="text-xs text-luxury-muted mt-1">Meticulously crafted stones for maximum optical brilliance.</p>
          </div>
          <div class="p-4 rounded-xl bg-[#16171d] border border-[#23252e]">
            <h4 class="font-bold text-sm text-luxury-ivory">6. Premium Presentation</h4>
            <p class="text-xs text-luxury-muted mt-1">Comes in an elegant, gift-ready luxury box for a memorable unboxing experience.</p>
          </div>
        </div>

        <div class="flex items-center justify-between p-4 rounded-xl bg-luxury-gold/15 border border-luxury-gold/30 mt-6">
          <span class="text-xs text-luxury-ivory font-semibold">Ready to find your wedding suite?</span>
          <a href="https://omniastores.com/collections/bridal-collection?ref=advertorial_july2026" class="px-4 py-2 rounded-lg bg-luxury-gold text-luxury-charcoal text-xs font-bold hover:bg-luxury-gold-light">Shop the Bridal Collection →</a>
        </div>
      </div>
    `,
  },

  // 5. Business & Lifestyle Feature (March 16, 2026)
  {
    store_id: 'OMNIA_AE',
    title: 'Omnia Stores Brings Accessible Luxury Jewellery to the GCC: Business & Lifestyle Report',
    slug: 'omnia-stores-brings-accessible-luxury-jewellery-to-the-gcc',
    excerpt: 'Dubai-based brand wins customers across UAE, Saudi Arabia, Kuwait, Oman and Qatar with premium silver, bridal collections, and certified simulated diamonds.',
    language: 'en',
    author: 'Business & Lifestyle Desk (Tuesday Edition)',
    status: 'PUBLISHED_SHOPIFY',
    quality_score: 100,
    seo_title: 'Omnia Stores Brings Accessible Luxury Jewellery to the GCC | Report',
    seo_description: 'Business & Lifestyle report: How Omnia Stores delivers high-quality 92.5 sterling silver and simulated diamonds to modern women across the GCC.',
    canonical_url: 'https://omniastores.com/blogs/news/omnia-stores-brings-accessible-luxury-jewellery-to-the-gcc',
    featured_image_url: '/press/business-lifestyle-march2026.jpg',
    content_html: `
      <div class="luxury-press-report font-serif space-y-6">
        <div class="press-badge p-3 rounded-lg bg-luxury-gold/15 border border-luxury-gold/30 text-xs font-mono text-luxury-gold">
          📰 As Published in Business & Lifestyle — Page 7 | Tuesday, March 16, 2026
        </div>

        <h1 class="text-2xl font-bold text-luxury-ivory">Omnia Stores brings accessible luxury jewellery to the GCC</h1>
        <p class="text-base text-luxury-gold italic">Dubai-based brand wins customers with premium silver and bridal collections</p>

        <div class="my-6 rounded-xl overflow-hidden border border-[#2a2c3a] shadow-xl">
          <img src="/press/business-lifestyle-march2026.jpg" alt="Business and Lifestyle Report - Omnia Stores" class="w-full h-auto object-cover" />
        </div>

        <p class="leading-relaxed">
          <strong>DUBAI:</strong> Dubai-based <strong>Omnia Stores</strong> has quickly become a go-to destination for modern women seeking elegant, high-quality jewellery that combines timeless design with everyday accessibility.
        </p>

        <blockquote class="p-4 my-6 rounded-xl bg-[#1a1b24] border-l-4 border-luxury-gold text-luxury-ivory italic text-base">
          "Our mission is to make luxury jewellery a part of every woman's story — beautiful, accessible and designed for real life."
          <span class="block text-xs font-mono text-luxury-gold not-italic mt-2 font-bold">— OMNIA FOUAD, Founder & CEO, Omnia Stores</span>
        </blockquote>

        <h3 class="text-lg font-bold text-luxury-ivory pt-4 border-t border-[#23252e]">A Growing GCC Community</h3>
        <p class="leading-relaxed">
          Since its launch in 2019, Omnia Stores has expanded its reach across the UAE, Saudi Arabia, Kuwait, Oman and Qatar, earning a reputation for exceptional designs, reliable service, and a seamless online shopping experience with flexible payments including Tabby and Tamara.
        </p>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
          <div class="p-3 rounded-lg bg-[#16171d] border border-[#23252e]">
            <h5 class="font-bold text-xs text-luxury-ivory">Bridal Sets</h5>
            <p class="text-[11px] text-luxury-muted mt-1">For your most special moments.</p>
            <a href="https://omniastores.com/collections/bridal-collection?ref=business_lifestyle" class="text-[11px] text-luxury-gold underline mt-2 block font-bold">Shop Bridal →</a>
          </div>
          <div class="p-3 rounded-lg bg-[#16171d] border border-[#23252e]">
            <h5 class="font-bold text-xs text-luxury-ivory">Rings</h5>
            <p class="text-[11px] text-luxury-muted mt-1">Modern elegance, everyday.</p>
            <a href="https://omniastores.com/collections/rings?ref=business_lifestyle" class="text-[11px] text-luxury-gold underline mt-2 block font-bold">Shop Rings →</a>
          </div>
          <div class="p-3 rounded-lg bg-[#16171d] border border-[#23252e]">
            <h5 class="font-bold text-xs text-luxury-ivory">Earrings</h5>
            <p class="text-[11px] text-luxury-muted mt-1">Timeless designs, endless possibilities.</p>
            <a href="https://omniastores.com/collections/earrings?ref=business_lifestyle" class="text-[11px] text-luxury-gold underline mt-2 block font-bold">Shop Earrings →</a>
          </div>
          <div class="p-3 rounded-lg bg-[#16171d] border border-[#23252e]">
            <h5 class="font-bold text-xs text-luxury-ivory">Statement Designs</h5>
            <p class="text-[11px] text-luxury-muted mt-1">Distinctive pieces for every occasion.</p>
            <a href="https://omniastores.com/collections/bracelets?ref=business_lifestyle" class="text-[11px] text-luxury-gold underline mt-2 block font-bold">Shop Statements →</a>
          </div>
        </div>
      </div>
    `,
  },
];
