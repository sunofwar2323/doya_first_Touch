"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const { wishlist } = useShop();

  if (wishlist.length === 0) {
    return (
      <div className="pt-24 min-h-[70vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Heart className="h-16 w-16 text-border mx-auto mb-6" />
          <h1 className="font-serif text-3xl mb-4">Your Wishlist is Empty</h1>
          <p className="text-muted mb-8">
            Save your favorite pieces for later
          </p>
          <Button variant="default" asChild>
            <Link href="/shop">Explore Collection</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24">
      <div className="container-luxury px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-12">
          <Heart className="h-6 w-6 text-gold" />
          <h1 className="font-serif text-4xl font-light">My Wishlist</h1>
          <span className="text-muted text-sm">({wishlist.length} items)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlist.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" asChild>
            <Link href="/shop">
              <ShoppingBag className="h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
