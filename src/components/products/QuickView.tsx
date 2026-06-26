"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { StarRating, formatPrice } from "@/components/ui/star-rating";
import { Button } from "@/components/ui/button";
import { useShop } from "@/context/ShopContext";
import { ShoppingBag, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickViewProps {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuickView({ product, open, onOpenChange }: QuickViewProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const inWishlist = isInWishlist(product.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative aspect-square bg-ivory">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="400px"
            />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <h2 className="font-serif text-2xl text-[#111111] mb-2">
              {product.name}
            </h2>
            <StarRating rating={product.rating} className="mb-4" />
            <p className="text-muted text-sm leading-relaxed mb-6">
              {product.description}
            </p>
            <p className="text-2xl font-medium text-[#111111] mb-6">
              {formatPrice(product.price)}
            </p>

            <div className="mb-6">
              <span className="text-xs tracking-wider uppercase text-muted mb-3 block">
                Color
              </span>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "px-4 py-2 text-xs border transition-colors",
                      selectedColor === color
                        ? "border-gold bg-gold/5 text-[#111111]"
                        : "border-border text-muted hover:border-gold/50"
                    )}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="default"
                className="flex-1"
                onClick={() => {
                  addToCart(product, selectedColor);
                  onOpenChange(false);
                }}
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => toggleWishlist(product)}
                aria-label="Wishlist"
              >
                <Heart className={cn("h-4 w-4", inWishlist && "fill-gold text-gold")} />
              </Button>
            </div>

            <Link
              href={`/products/${product.slug}`}
              onClick={() => onOpenChange(false)}
              className="text-gold text-xs tracking-wider uppercase mt-6 hover:underline text-center"
            >
              View Full Details
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
