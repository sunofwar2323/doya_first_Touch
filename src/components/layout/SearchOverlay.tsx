"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { JacketProduct } from "@/types/jacket";
import { searchJackets } from "@/lib/jackets/search";
import { formatJacketPrice } from "@/lib/jackets/utils";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
  jackets: JacketProduct[];
}

export function SearchOverlay({ open, onClose, jackets }: SearchOverlayProps) {
  const [query, setQuery] = useState("");

  const results = useMemo(
    () => searchJackets(jackets, query).slice(0, 8),
    [jackets, query]
  );

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, handleKey]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[80] bg-white"
        >
          <div className="container-luxury px-6 lg:px-8 py-8 h-full flex flex-col">
            <div className="flex items-center gap-6 border-b border-border pb-6">
              <Search className="h-5 w-5 text-muted shrink-0" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search jackets by name, style, size, leather…"
                className="flex-1 text-lg md:text-2xl font-light bg-transparent outline-none placeholder:text-muted/50"
              />
              <button
                onClick={onClose}
                className="p-2 hover:bg-warm-gray transition-colors"
                aria-label="Close search"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-8">
              {query && results.length === 0 ? (
                <p className="text-muted text-sm">No jackets found for &ldquo;{query}&rdquo;</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {(query ? results : jackets.slice(0, 8)).map((jacket) => (
                    <Link
                      key={jacket.slug}
                      href={`/jackets/${jacket.slug}`}
                      onClick={onClose}
                      className="group flex gap-4 items-center sm:flex-col sm:items-start"
                    >
                      <div className="relative w-20 h-24 sm:w-full sm:aspect-[3/4] shrink-0 bg-warm-gray overflow-hidden">
                        {jacket.images[0] && (
                          <Image
                            src={jacket.images[0]}
                            alt={jacket.name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="200px"
                          />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate group-hover:underline">
                          {jacket.name}
                        </p>
                        <p className="text-xs text-muted mt-1">
                          {formatJacketPrice(jacket.price)} · Size {jacket.size}
                        </p>
                        <p className="text-[10px] text-muted mt-0.5 uppercase tracking-wider">
                          {jacket.jacketType}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
