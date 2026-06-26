"use client";

import Link from "next/link";
import { useShop } from "@/context/ShopContext";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { formatPrice } from "@/components/ui/star-rating";

export function StickyCartButton() {
  const { cartCount, cartTotal, mounted } = useShop();

  return (
    <AnimatePresence>
      {mounted && cartCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <Link
            href="/cart"
            className="flex items-center gap-3 bg-[#111111] text-white pl-5 pr-6 py-3.5 shadow-2xl hover:bg-[#222] transition-colors group"
          >
            <div className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 h-4 w-4 bg-gold text-[#111111] text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] tracking-wider uppercase text-white/60">
                View Cart
              </span>
              <span className="text-sm font-medium group-hover:text-gold transition-colors">
                {formatPrice(cartTotal)}
              </span>
            </div>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
