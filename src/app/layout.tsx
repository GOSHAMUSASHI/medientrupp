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

export const metadata: Metadata = {
  title: "Medientrupp — Digitale Systeme für den Mittelstand",
  description:
    "Medientrupp baut digitale Lösungen für den deutschen Mittelstand. Websites, KI-Automatisierung, Markendesign — zu transparenten Festpreisen.",
  keywords: [
    "Digitalagentur",
    "Mittelstand",
    "Website",
    "KI Automatisierung",
    "Webdesign",
    "Deutschland",
  ],
  openGraph: {
    title: "Medientrupp — Digitale Systeme für den Mittelstand",
    description:
      "Digitale Lösungen für den deutschen Mittelstand. Festpreise. Schnelle Umsetzung.",
    locale: "de_DE",
    type: "website",
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
        <GlobalChatbot />
        <SiteFooter />
      </body>
    </html>
  );
};

export default RootLayout;
