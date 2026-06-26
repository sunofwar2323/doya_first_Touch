"use client";

import { ShopProvider } from "@/context/ShopContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { JacketProduct } from "@/types/jacket";

interface ClientLayoutProps {
  children: React.ReactNode;
  jackets: JacketProduct[];
}

export function ClientLayout({ children, jackets }: ClientLayoutProps) {
  return (
    <ShopProvider>
      <LoadingScreen />
      <Navbar jackets={jackets} />
      <main>{children}</main>
      <Footer />
    </ShopProvider>
  );
}
