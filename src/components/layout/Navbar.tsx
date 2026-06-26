"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X } from "lucide-react";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { JacketProduct } from "@/types/jacket";
import { cn } from "@/lib/utils";

const leftLinks = [
  { href: "/collections/jackets", label: "Collections" },
  { href: "/collections/jackets", label: "Best Sellers" },
];

interface NavbarProps {
  jackets?: JacketProduct[];
}

export function Navbar({ jackets = [] }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isHeroTop = isHome && !scrolled && !mobileOpen;
  const showLogo = !isHeroTop;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isHeroTop
            ? "bg-transparent"
            : "bg-white/95 backdrop-blur-md border-b border-border shadow-sm"
        )}
      >
        <div className="container-luxury px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16 lg:h-[4.5rem] gap-3">
            {/* Left — mobile menu + desktop links */}
            <div className="flex items-center gap-4 lg:gap-8 min-w-0 flex-1">
              <button
                className="lg:hidden shrink-0 text-black p-1 -ml-1"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>

              <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
                {leftLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="label-caps text-black hover:text-muted transition-colors whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Center logo — hidden on homepage hero so image DOYA stays visible */}
            <Link
              href="/"
              className={cn(
                "shrink-0 transition-opacity duration-300 absolute left-1/2 -translate-x-1/2 text-center",
                showLogo ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
              aria-hidden={!showLogo}
              tabIndex={showLogo ? 0 : -1}
            >
              <span className="font-serif text-base sm:text-lg lg:text-xl font-bold tracking-[0.22em] text-black block">
                DOYA
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.3em] uppercase text-black/60 block mt-0.5">
                First Touch
              </span>
            </Link>

            {/* Right actions */}
            <div className="flex items-center justify-end gap-3 sm:gap-4 lg:gap-5 flex-1 min-w-0">
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden md:flex items-center gap-1.5 text-black hover:text-muted transition-colors"
                aria-label="Search"
              >
                <Search className="h-4 w-4 shrink-0" />
                <span className="label-caps hidden xl:inline">Search</span>
              </button>
              <button
                onClick={() => setSearchOpen(true)}
                className="md:hidden text-black p-1"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} jackets={jackets} />

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-white lg:hidden"
          >
            <div className="flex flex-col h-full p-5 sm:p-6">
              <div className="flex justify-between items-center mb-10 pt-2">
                <div className="text-center">
                  <span className="font-serif text-xl font-bold tracking-[0.2em] block">DOYA</span>
                  <span className="text-[9px] tracking-[0.3em] uppercase text-black/60 block mt-0.5">
                    First Touch
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-5">
                {leftLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-lg font-medium tracking-wide"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
