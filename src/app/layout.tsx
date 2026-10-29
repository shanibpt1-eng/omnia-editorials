import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/lib/store/context';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'Omnia Stores — Autonomous AI Growth Platform',
  description: 'Enterprise ecommerce content, SEO, and marketing intelligence platform for Omnia Stores.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/output.css" />
      </head>
      <body className="min-h-screen bg-[#0f1013] text-[#f4f5f7] flex font-sans antialiased">
        <StoreProvider>
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <Header />
            <main className="flex-1 p-6 overflow-y-auto">
              {children}
            </main>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
