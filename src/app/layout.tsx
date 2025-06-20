import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AnalyticsWrapper } from '@/components/analytics/AnalyticsWrapper';

export const metadata: Metadata = {
  title: 'Font Previewer - Compare Google Fonts in Real-Time | Simple Font Compare',
  description: 'Compare 1,400+ Google Fonts side-by-side with instant preview. Adjust size, weight, spacing, and color. Find the perfect typography for your project in seconds.',
  keywords: 'google fonts, font comparison, font preview, typography tool, web fonts, font tester, font selector, compare fonts online',
  openGraph: {
    title: 'Font Previewer - Compare Google Fonts in Real-Time',
    description: 'Compare 1,400+ Google Fonts side-by-side with instant preview. Find the perfect typography for your project.',
    url: 'https://simplefontcompare.com',
    siteName: 'Simple Font Compare',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Font Previewer - Compare Google Fonts in Real-Time',
    description: 'Compare 1,400+ Google Fonts side-by-side with instant preview. Find the perfect typography for your project.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://simplefontcompare.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Simple Font Compare",
              "description": "Compare Google Fonts side-by-side with real-time preview and customization",
              "url": "https://simplefontcompare.com",
              "applicationCategory": "DesignApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "featureList": [
                "Compare multiple Google Fonts simultaneously",
                "Real-time font preview",
                "Adjust font size, weight, and spacing",
                "Color customization",
                "Live text preview with custom content"
              ]
            })
          }}
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
