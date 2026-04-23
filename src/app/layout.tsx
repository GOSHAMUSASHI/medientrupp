import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/ui/SiteHeader";
import { SiteFooter } from "@/components/ui/SiteFooter";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Medientrupp",
    default: "Medientrupp | Digitale Systeme für den Mittelstand",
  },
  description:
    "Medientrupp baut maßgeschneiderte digitale Vertriebsmaschinen. Premium Websites, KI-Automatisierung und Markendesign für den deutschen Mittelstand zu transparenten Festpreisen.",
  keywords: [
    "Digitalagentur",
    "B2B Webdesign",
    "KI Automatisierung",
    "Leadgenerierung",
    "Website Relaunch",
    "Premium Branding",
    "Mittelstand Digitalisierung"
  ],
  openGraph: {
    title: "Medientrupp | Digitale Systeme für den Mittelstand",
    description: "Medientrupp baut maßgeschneiderte digitale Vertriebsmaschinen. Premium Websites, KI-Automatisierung und Markendesign für den deutschen Mittelstand.",
    type: "website",
    locale: "de_DE",
    images: [
      {
        url: "/opengraph-image.webp",
        width: 1200,
        height: 630,
        alt: "Medientrupp Vorschau Bild",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="de" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        <SiteHeader />
        <div className="flex-1">
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  );
};

export default RootLayout;
