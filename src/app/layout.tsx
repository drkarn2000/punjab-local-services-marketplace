import type { Metadata } from 'next';
import './globals.css';
import { MarketplaceProvider } from '@/context/MarketplaceContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Punjab Services | Local Home & Tech Services in Mohali, Chandigarh & Hoshiarpur',
  description:
    'Book verified Electricians, Plumbers, Carpenters, Computer/Laptop & Mobile Repair experts across Mohali, Chandigarh & Hoshiarpur with transparent estimates.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <MarketplaceProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </MarketplaceProvider>
      </body>
    </html>
  );
}
