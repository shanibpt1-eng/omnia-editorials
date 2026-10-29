import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '../components/ThemeProvider';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { VipConciergeModal } from '../components/VipConciergeModal';
import { MobileStickyBar } from '../components/MobileStickyBar';

export const metadata: Metadata = {
  title: 'Omnia Stores Luxury Editorial & GCC Wire | 925 Sterling Silver & Haute Horlogerie',
  description: 'GCC Luxury Editorial & Content Intelligence Hub covering Vogue Arabia, Harper’s Bazaar, Gulf News, and Khaleej Times features. Handcrafted 925 sterling silver bridal suites and simulated diamonds from Dubai & Riyadh.',
  keywords: [
    'Omnia Stores',
    '925 sterling silver bridal sets',
    'simulated diamond necklaces',
    'Vogue Arabia Omnia Stores',
    'Dubai fashion trends',
    'omniastores.com',
    'omniastores.com',
    'GCC luxury jewellery',
  ],
  metadataBase: new URL('https://omniastores.com'),
  openGraph: {
    title: 'Omnia Stores Luxury Editorial & GCC Wire',
    description: 'Real-time aggregated and AI-summarized GCC luxury intelligence, high jewellery trends, and direct boutique showcase.',
    url: 'https://omniastores.com',
    siteName: 'Omnia Stores Editorial',
    images: [
      {
        url: '/press/golden-luxe-middle-east-cover-oct2026.jpg',
        width: 1200,
        height: 630,
        alt: 'Omnia Stores Luxury Editorial',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="dark antialiased min-h-screen flex flex-col bg-[#0A0D14] text-[#F4F5F8] selection:bg-gold selection:text-black">
        <ThemeProvider>
          <div className="flex flex-col min-h-screen pb-14 sm:pb-0">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <VipConciergeModal />
            <MobileStickyBar />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
