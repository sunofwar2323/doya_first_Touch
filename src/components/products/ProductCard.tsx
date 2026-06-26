"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import { StarRating, formatPrice } from "@/components/ui/star-rating";
import { Button } from "@/components/ui/button";
import { useShop } from "@/context/ShopContext";
import { QuickView } from "@/components/products/QuickView";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const inWishlist = isInWishlist(product.id);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-ivory mb-5">
          <Link href={`/products/${product.slug}`}>
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          </Link>

          {product.originalPrice && (
            <span className="absolute top-4 left-4 bg-gold text-[#111111] text-[10px] tracking-wider uppercase px-3 py-1 font-semibold">
              Sale
            </span>
          )}

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex gap-2">
              <Button
                variant="default"
                size="sm"
                className="flex-1"
                onClick={() => addToCart(product)}
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="bg-white border-white hover:bg-gold hover:border-gold"
                onClick={() => setQuickViewOpen(true)}
                aria-label="Quick view"
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "bg-white border-white hover:bg-gold hover:border-gold",
                  inWishlist && "bg-gold border-gold"
                )}
                onClick={() => toggleWishlist(product)}
                aria-label="Add to wishlist"
              >
                <Heart
                  className={cn("h-4 w-4", inWishlist && "fill-[#111111]")}
                />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-serif text-lg text-[#111111] hover:text-gold transition-colors">
              {product.name}
            </h3>
          </Link>
          <StarRating rating={product.rating} />
          <div className="flex items-center gap-3">
            <span className="text-[#111111] font-medium">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-muted line-through text-sm">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      <QuickView
        product={product}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
      />
    </>
  );
}
