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
    'The Vogue News',
    'thevoguenews',
    'thevoguenews.com',
    'GCC Luxury Broadsheet',
    '925 sterling silver bridal sets',
    'Dubai Central Laboratory assay jewelry',
    'Dubai Gold Souk live rates',
    'simulated diamond suites',
    'Vogue Arabia high jewellery features',
    'Omnia Stores',
    'omniastores.com',
    'GCC high jewellery trends',
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
