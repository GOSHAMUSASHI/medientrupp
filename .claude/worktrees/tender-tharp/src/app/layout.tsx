import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { GlobalChatbot } from "@/components/ui/GlobalChatbot";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://www.medientrupp.de";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Medientrupp — Digitalagentur für den Mittelstand | Website, KI & Design",
    template: "%s | Medientrupp",
  },
  description:
    "Medientrupp ist Ihre Digitalagentur aus Gummersbach, NRW. Wir bauen High-Performance Websites, KI-Automatisierungen und starke Marken für den deutschen Mittelstand — zu transparenten Festpreisen. Go-Live in 4–6 Wochen.",
  keywords: [
    "Digitalagentur Mittelstand",
    "Webdesign Gummersbach",
    "Website erstellen lassen NRW",
    "KI Automatisierung Unternehmen",
    "Next.js Agentur Deutschland",
    "Festpreis Website",
    "Webentwicklung Oberbergischer Kreis",
    "KI Chatbot Mittelstand",
    "Corporate Identity Agentur",
    "DSGVO konforme Website",
    "Performance Website React",
    "Digitale Transformation Mittelstand",
  ],
  authors: [{ name: "Medientrupp", url: siteUrl }],
  creator: "Medientrupp",
  publisher: "Medientrupp",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Medientrupp — Website, KI & Design für den Mittelstand",
    description:
      "High-Performance Websites, KI-Systeme und Markendesign für den deutschen Mittelstand. Festpreise. Go-Live in 4–6 Wochen. 100% DSGVO-konform.",
    url: siteUrl,
    siteName: "Medientrupp",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Medientrupp — Digitalagentur für den Mittelstand",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medientrupp — Website, KI & Design für den Mittelstand",
    description:
      "High-Performance Websites, KI-Systeme und Markendesign für den deutschen Mittelstand.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "de-DE": siteUrl,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  category: "technology",
};

// ── JSON-LD Structured Data ───────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Medientrupp",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`,
        width: 200,
        height: 60,
      },
      description:
        "Digitalagentur für den deutschen Mittelstand. High-Performance Websites, KI-Automatisierung und Markendesign zu Festpreisen.",
      foundingLocation: {
        "@type": "Place",
        name: "Gummersbach, Nordrhein-Westfalen, Deutschland",
      },
      areaServed: {
        "@type": "Country",
        name: "Deutschland",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "impact@medientrupp.de",
        availableLanguage: "German",
      },
      sameAs: [
        "https://www.linkedin.com/company/medientrupp",
        "https://www.instagram.com/medientrupp",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${siteUrl}/#localbusiness`,
      name: "Medientrupp",
      image: `${siteUrl}/og-image.png`,
      url: siteUrl,
      email: "impact@medientrupp.de",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Gummersbach",
        addressRegion: "Nordrhein-Westfalen",
        postalCode: "51643",
        addressCountry: "DE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 51.0253,
        longitude: 7.5685,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      priceRange: "€€",
      servedCuisine: undefined,
      "@context": "https://schema.org",
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Medientrupp",
      description:
        "Digitalagentur für den deutschen Mittelstand — Website, KI & Design",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "de-DE",
    },
  ],
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="de" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* GEO Meta Tags */}
        <meta name="geo.region" content="DE-NW" />
        <meta name="geo.placename" content="Gummersbach" />
        <meta name="geo.position" content="51.0253;7.5685" />
        <meta name="ICBM" content="51.0253, 7.5685" />
        <meta name="language" content="de" />
        <meta name="revisit-after" content="7 days" />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <SiteHeader />
        <div className="flex-1">
          {children}
        </div>
        <GlobalChatbot />
        <SiteFooter />
      </body>
    </html>
  );
};

export default RootLayout;
