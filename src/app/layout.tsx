import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/layout/ClientLayout";
import { getJacketCatalog } from "@/lib/jackets/catalog";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DOYA FIRST TOUCH | Premium Leather Jackets",
    template: "%s | DOYA FIRST TOUCH",
  },
  description:
    "Premium leather jackets — biker, cafe racer, flight jackets and vintage outerwear. Genuine leather craftsmanship for those who demand timeless style.",
  keywords: [
    "leather jackets",
    "biker jackets",
    "cafe racer",
    "flight jackets",
    "motorcycle jackets",
    "premium leather",
    "DOYA FIRST TOUCH",
  ],
  openGraph: {
    title: "DOYA FIRST TOUCH | Premium Leather Jackets",
    description: "Crafted for the Road. Premium leather outerwear.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jackets = getJacketCatalog();

  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased">
        <ClientLayout jackets={jackets}>{children}</ClientLayout>
      </body>
    </html>
  );
}
