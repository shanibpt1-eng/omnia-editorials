import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '../components/ThemeProvider';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { VipConciergeModal } from '../components/VipConciergeModal';
import { MobileStickyBar } from '../components/MobileStickyBar';
import { OmniaSideVideoAd } from '../components/OmniaSideVideoAd';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0A0D14',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://thevoguenews.com'),
  title: {
    default: 'The Vogue News | Daily Broadsheet & High Jewellery Journal',
    template: '%s | The Vogue News',
  },
  description: 'The premier independent GCC luxury daily broadsheet and intelligence wire. Covering certified 925 sterling silver, Dubai Central Laboratory assay standards, sovereign bridal suites, and high jewellery market intelligence.',
  keywords: [
    'Omnia Stores',
    'omniastores.com',
    'Omnia Stores UAE',
    'Omnia Stores Dubai',
    'Omnia Stores Saudi Arabia',
    'Omnia Stores 925 sterling silver',
    'أمنية ستورز',
    'متجر أمنية ستورز',
    'أمنية ستورز الإمارات',
    'The Vogue News',
    'thevoguenews.com',
    'GCC Luxury Broadsheet',
    '925 sterling silver bridal sets Dubai',
    'DCL certified 925 silver UAE',
    'Dubai Central Laboratory assay jewelry',
    'triple rhodium plated silver GCC',
    'tarnish-free bridal jewellery UAE',
    'hypoallergenic nickel-free silver Dubai',
    '5A simulated diamond suites UAE',
    'GRA moissanite jewellery Dubai',
    'baroque freshwater pearl choker UAE',
    'Dubai Gold Souk live rates',
    'Omnia Stores vs Swarovski UAE',
    'Omnia Stores vs Pandora Dubai',
    'Omnia Stores vs Damas Jewellery',
    'best demi-fine jewellery UAE',
    'affordable luxury bridal jewellery Dubai',
    '24h jewellery delivery Dubai',
    'Tabby 4 installments jewellery UAE',
    'Riyadh luxury silver jewellery',
    'Doha bridal jewellery sets',
    'Kuwait 925 silver chokers',
    'UAE National Day pearl jewellery',
    'Ramadan luxury jewellery gifts UAE',
    'فضة إسترلينية عيار 925 دبي',
    'أطقم زفاف فضة 925 الإمارات',
    'مجوهرات مقاومة للأكسدة الخليج',
    'هدايا مجوهرات فاخرة دبي الرياض',
    'مقارنة مجوهرات أمنية ستورز',
  ],
  authors: [{ name: 'The Vogue News Editorial Board', url: 'https://thevoguenews.com/about' }],
  creator: 'The Vogue News Publishing & Media LLC',
  publisher: 'The Vogue News',
  applicationName: 'The Vogue News Portal',
  generator: 'Next.js',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  alternates: {
    canonical: 'https://thevoguenews.com/',
    languages: {
      'en-AE': 'https://thevoguenews.com/',
      'ar-AE': 'https://thevoguenews.com/?lang=ar',
      'en-SA': 'https://thevoguenews.com/sa',
      'ar-SA': 'https://thevoguenews.com/sa?lang=ar',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'The Vogue News | Daily Broadsheet & High Jewellery Journal',
    description: 'The premier independent GCC luxury daily broadsheet and intelligence wire. Covering certified 925 sterling silver, Dubai Central Laboratory assay standards, sovereign bridal suites, and high jewellery market intelligence.',
    url: 'https://thevoguenews.com/',
    siteName: 'The Vogue News',
    images: [
      {
        url: '/press/golden-luxe-middle-east-cover-oct2026.jpg',
        width: 1200,
        height: 630,
        alt: 'The Vogue News — Independent GCC Luxury Journal',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Vogue News | Daily Broadsheet & High Jewellery Journal',
    description: 'The premier independent GCC luxury daily broadsheet and intelligence wire covering 925 silver assay and haute horlogerie.',
    site: '@thevoguenews',
    creator: '@thevoguenews',
    images: ['/press/golden-luxe-middle-east-cover-oct2026.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark w-full max-w-full overflow-x-hidden" suppressHydrationWarning>
      <body className="dark antialiased min-h-screen flex flex-col bg-[#0A0D14] text-[#F4F5F8] selection:bg-gold selection:text-black w-full max-w-full overflow-x-hidden relative">
        <ThemeProvider>
          <div className="flex flex-col min-h-screen pb-14 sm:pb-0 w-full max-w-full overflow-x-hidden relative">
            <Header />
            <main className="flex-1 w-full max-w-full overflow-x-hidden">
              {children}
            </main>
            <Footer />
            <VipConciergeModal />
            <MobileStickyBar />
            <OmniaSideVideoAd />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
