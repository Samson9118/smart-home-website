import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — Проектирование и монтаж беспроводного умного дома`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'умный дом',
    'беспроводной умный дом',
    'монтаж умного дома',
    'Zigbee',
    'Matter',
    'Thread',
    'Aqara',
    'Sonoff',
    'Sprut',
    'Tuya Zigbee',
    'Home Assistant',
    'Яндекс Алиса',
    'калькулятор умного дома',
  ],
  authors: [{ name: siteConfig.name }],
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: siteConfig.url,
    title: `${siteConfig.name} — Проектирование и монтаж умного дома`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="dark scroll-smooth">
      <body className="min-h-screen bg-dark-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
